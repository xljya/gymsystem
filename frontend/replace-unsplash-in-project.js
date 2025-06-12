// 导入所需模块
const fs = require('fs'); // 文件系统模块
const path = require('path'); // 路径处理模块
const axios = require('axios'); // HTTP 请求模块
const { PicGo } = require('picgo'); // PicGo 核心模块

// 定义项目目录和临时下载目录
const projectDir = './src'; // 需要扫描的项目目录
const downloadDir = './temp'; // 图片下载的临时目录
// 如果临时下载目录不存在，则创建它
if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir, { recursive: true });

// 定义有效的文件扩展名和 URL 映射文件路径
const validExtensions = ['.js', '.jsx', '.ts', '.tsx', '.html', '.css']; // 只处理这些类型的文件
const urlMapPath = './url-map.json'; // 存储已处理图片 URL 映射的文件
let urlMap = {}; // 用于存储旧 URL 到新 URL 的映射

// 加载历史映射：尝试从 url-map.json 文件中加载之前保存的 URL 映射
try {
  if (fs.existsSync(urlMapPath)) {
    const fileContent = fs.readFileSync(urlMapPath, 'utf-8');
    if (fileContent) { // 确保文件内容不为空
      urlMap = JSON.parse(fileContent);
    }
  }
} catch (err) {
  console.error(`❌ 加载 url-map.json 失败: ${err.message}. 将使用空的映射.`);
  urlMap = {}; // 加载失败则使用空映射
}

// 获取所有前端文件：递归遍历指定目录，返回所有符合 validExtensions 的文件路径列表
function getAllFiles(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir); // 读取目录内容
    list.forEach((file) => {
      const fullPath = path.join(dir, file); // 获取完整路径
      const stat = fs.statSync(fullPath); // 获取文件/目录状态
      if (stat.isDirectory()) { // 如果是目录，则递归调用
        results = results.concat(getAllFiles(fullPath));
      } else if (validExtensions.includes(path.extname(file))) { // 如果是文件且扩展名有效，则添加到结果列表
        results.push(fullPath);
      }
    });
  } catch (error) {
    console.error(`❌ 读取目录 ${dir} 出错: ${error.message}`);
  }
  return results;
}

// 下载图片：从给定的 URL 下载图片到本地临时目录
async function downloadImage(url, index, retries = 3, delay = 1000) {
  const safeUrl = encodeURI(url); // 对 URL 进行编码，防止特殊字符问题
  let ext = '.jpg'; // 默认图片扩展名

  // 尝试从 URL 中解析图片扩展名
  try {
    const pathname = new URL(safeUrl).pathname;
    const potentialExt = path.extname(pathname).split('?')[0]; // 去除查询参数
    if (potentialExt) {
      ext = potentialExt;
    }
  } catch (e) {
    console.warn(`⚠️ 无法从 URL 解析扩展名: ${url}. 将使用默认扩展名 ${ext}`);
  }

  // 构建本地保存路径
  const filePath = path.join(downloadDir, `xlimg_${Date.now()}_${index}${ext}`);

  // 尝试下载图片，支持重试机制
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await axios.get(safeUrl, {
        responseType: 'arraybuffer', // 以二进制数组形式接收响应数据
        timeout: 15000 // 设置 15 秒超时
      });
      fs.writeFileSync(filePath, res.data); // 将图片数据写入文件
      console.log(`✅ 下载成功 (尝试 ${attempt}/${retries}): ${url} -> ${filePath}`);
      return filePath; // 返回下载后的文件路径
    } catch (err) {
      console.error(`❌ 下载失败 (尝试 ${attempt}/${retries}): ${url} - ${err.message}`);
      if (err.code) console.error(`   错误代码: ${err.code}`);
      // console.error(err); // 可以取消注释以打印完整错误对象进行调试
      if (attempt === retries) { // 如果所有重试都失败
        console.error(`   所有 ${retries} 次下载尝试均失败: ${url}`);
        return null; // 返回 null 表示下载失败
      }
      console.log(`   将在 ${delay / 1000} 秒后重试...`);
      await new Promise(resolve => { setTimeout(resolve, delay); }); // 等待一段时间后重试
    }
  }
  return null; // 所有重试均失败后返回 null
}

// 替换文件中的图片链接：处理单个文件，查找、下载、上传并替换图片链接
async function processFile(filePath, picgoInstance) {
  let content;
  // 读取文件内容
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch (readError) {
    console.error(`❌ 读取文件失败: ${filePath} - ${readError.message}`);
    return; // 读取失败则跳过此文件
  }

  // 定义正则表达式以匹配目标图片 URL
  const regex = /https:\/\/(?:img\.28082003\.com\/\/xl|image\.liucf\.com\/images\/)[^\s"'\\)]+/g;
  const matches = [...content.matchAll(regex)]; // 查找所有匹配的 URL

  if (matches.length === 0) {
    // console.log(`ℹ️ 文件中未找到 Unsplash 链接: ${filePath}`);
    return; // 如果未找到匹配的 URL，则跳过此文件
  }

  let changed = false; // 标记文件内容是否被修改
  const newUrls = {}; // 存储当前文件中原始 URL 到新上传 URL 的映射
  const urlsToProcess = []; // 存储需要下载和上传的 URL

  // 遍历所有匹配到的 URL
  for (const match of matches) {
    const originalUrl = match[0];
    if (urlMap[originalUrl]) { // 如果 URL 已在全局映射中存在
      newUrls[originalUrl] = urlMap[originalUrl]; // 直接使用已有的映射
    } else if (!urlsToProcess.some((item) => item.originalUrl === originalUrl)) {
      // 如果 URL 不在全局映射中，且尚未添加到待处理列表，则添加
      urlsToProcess.push({ originalUrl, index: urlsToProcess.length });
    }
  }

  // 如果有需要处理的新 URL
  if (urlsToProcess.length > 0) {
    console.log(`⏳ 准备下载 ${urlsToProcess.length} 张图片 (文件: ${filePath})`);
    // 并行下载所有图片
    const downloadPromises = urlsToProcess.map((item) =>
      downloadImage(item.originalUrl, item.index),
    );
    const downloadedFilePaths = await Promise.all(downloadPromises);

    const localPathsToUpload = []; // 存储成功下载的图片路径及其原始 URL
    for (let i = 0; i < urlsToProcess.length; i++) {
      if (downloadedFilePaths[i]) { // 检查下载是否成功
        localPathsToUpload.push({
          originalUrl: urlsToProcess[i].originalUrl,
          filePath: downloadedFilePaths[i],
        });
      }
    }

    // 如果有成功下载的图片需要上传
    if (localPathsToUpload.length > 0) {
      try {
        console.log(`⏫ 准备上传 ${localPathsToUpload.length} 张图片到 PicGo (文件: ${filePath})`);
        // 使用 PicGo 上传图片
        const uploadedResults = await picgoInstance.upload(
          localPathsToUpload.map((x) => x.filePath), // 获取所有待上传的文件路径
        );

        // 处理上传结果
        for (let i = 0; i < localPathsToUpload.length; i++) {
          const { originalUrl } = localPathsToUpload[i];
          const uploadedInfo = uploadedResults[i];
          // PicGo 不同版本或插件返回的 URL 字段可能不同
          const uploadedUrl = uploadedInfo?.imgUrl || uploadedInfo?.url;

          if (uploadedUrl) {
            console.log(`🔗 映射成功: ${originalUrl} -> ${uploadedUrl}`);
            urlMap[originalUrl] = uploadedUrl; // 更新全局 URL 映射
            newUrls[originalUrl] = uploadedUrl; // 更新当前文件的 URL 映射
          } else {
            console.error(
              `❌ 上传后未获取到 URL: ${originalUrl}, 返回: ${JSON.stringify(uploadedInfo)}`,
            );
          }
        }
        // 每次成功处理完一个文件的图片上传后，保存一次全局 URL 映射
        fs.writeFileSync(urlMapPath, JSON.stringify(urlMap, null, 2));
      } catch (uploadError) {
        console.error(`❌ PicGo 上传失败 (文件: ${filePath}): ${uploadError.message}`);
        console.error(uploadError); // 打印完整的上传错误对象
      }
    }
  }

  // 替换文件内容中的旧 URL 为新 URL
  // 遍历 newUrls（包含预先映射的和新映射的 URL）
  Object.keys(newUrls).forEach((oldUrl) => {
    const newUrl = newUrls[oldUrl];
    if (content.includes(oldUrl) && oldUrl !== newUrl) { // 确保旧 URL 存在且与新 URL 不同
      content = content.split(oldUrl).join(newUrl); // 替换所有出现的旧 URL
      changed = true; // 标记文件内容已更改
    }
  });

  // 如果文件内容已更改，则备份原文件并写入新内容
  if (changed) {
    try {
      fs.copyFileSync(filePath, filePath + '.bak'); // 创建备份文件
      fs.writeFileSync(filePath, content); // 写入修改后的内容
      console.log(`✅ 替换完成并备份: ${filePath}`);
    } catch (writeError) {
      console.error(`❌ 写入或备份文件失败: ${filePath} - ${writeError.message}`);
    }
  } else if (matches.length > 0 && Object.keys(newUrls).length === 0 && urlsToProcess.length > 0) {
    // 情况：文件中存在目标 URL，但所有 URL 都未能成功处理（下载/上传失败）
    console.warn(`⚠️ 文件中存在目标链接，但未能成功处理或替换: ${filePath}`);
  } else if (matches.length > 0 && !changed) {
    // 情况：找到了 URL，也进行了映射（无论是新的还是已有的），但文件内容未实际更改
    // (例如，旧 URL 与新 URL 相同，或者其他逻辑问题)
    console.log(`ℹ️ 链接已映射但文件内容未实际更改: ${filePath}`);
  }
}

// 主入口：脚本的执行起点
(async () => {
  const files = getAllFiles(projectDir); // 获取项目目录下所有待处理的文件
  if (files.length === 0) {
    console.log('🤷 未在指定目录找到需要处理的文件。');
    return;
  }
  console.log(`📂 正在处理 ${files.length} 个前端文件`);

  const picgo = new PicGo(); // 创建 PicGo 实例，只需创建一次

  // 依次处理每个文件
  // 注意：这里是顺序处理。如果需要并发处理，可以考虑 Promise.all 配合 map，
  // 或者使用 p-limit 等库来控制并发数量。
  for (let i = 0; i < files.length; i++) {
    console.log(`\n📄 (${i + 1}/${files.length}) 开始处理文件: ${files[i]}`);
    await processFile(files[i], picgo); // 调用 processFile 处理单个文件
  }

  console.log('\n🚀 所有图片链接已处理完毕');

  // 可选：清理临时下载目录
  try {
    // 注意：使用 rmdirSync 或 rmSync 时要小心，确保这是你想要的操作
    // fs.rmSync(downloadDir, { recursive: true, force: true }); // 强制递归删除目录
    // console.log(`🧹 临时下载目录 ${downloadDir} 已清理`);
  } catch (cleanupError) {
    console.error(`❌ 清理临时目录 ${downloadDir} 失败: ${cleanupError.message}`);
  }
})();
