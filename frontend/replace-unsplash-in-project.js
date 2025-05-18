const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { PicGo } = require('picgo');

const projectDir = './src';
const downloadDir = './temp';
if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir, { recursive: true });

const validExtensions = ['.js', '.jsx', '.ts', '.tsx', '.html', '.css'];
const urlMapPath = './url-map.json';
let urlMap = {};

// 加载历史映射
try {
  if (fs.existsSync(urlMapPath)) {
    const fileContent = fs.readFileSync(urlMapPath, 'utf-8');
    if (fileContent) {
      // Ensure content is not empty
      urlMap = JSON.parse(fileContent);
    }
  }
} catch (err) {
  console.error(`❌ 加载 url-map.json 失败: ${err.message}. 将使用空的映射.`);
  urlMap = {};
}

// 获取所有前端文件
function getAllFiles(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        results = results.concat(getAllFiles(fullPath));
      } else if (validExtensions.includes(path.extname(file))) {
        results.push(fullPath);
      }
    });
  } catch (error) {
    console.error(`❌ 读取目录 ${dir} 出错: ${error.message}`);
  }
  return results;
}

// 下载图片
async function downloadImage(url, index) {
  const safeUrl = encodeURI(url);
  let ext = '.jpg'; // Default extension
  try {
    // Try to get a more accurate extension from URL path
    const pathname = new URL(safeUrl).pathname;
    const potentialExt = path.extname(pathname).split('?')[0];
    if (potentialExt) {
      ext = potentialExt;
    }
  } catch (e) {
    console.warn(`⚠️ 无法从 URL 解析扩展名: ${url}. 将使用默认扩展名 ${ext}`);
  }

  const filePath = path.join(downloadDir, `xlimg_${Date.now()}_${index}${ext}`); // Add timestamp to avoid name collision in concurrent downloads

  try {
    const res = await axios.get(safeUrl, { responseType: 'arraybuffer' });
    fs.writeFileSync(filePath, res.data);
    console.log(`✅ 下载成功: ${url} -> ${filePath}`);
    return filePath;
  } catch (err) {
    console.error(`❌ 下载失败: ${url} - ${err.message}`);
    return null; // Indicate failure
  }
}

// 替换文件中的图片链接
async function processFile(filePath, picgoInstance) {
  let content;
  try {
    content = fs.readFileSync(filePath, 'utf-8');
  } catch (readError) {
    console.error(`❌ 读取文件失败: ${filePath} - ${readError.message}`);
    return;
  }

  const regex = /https:\/\/[\w.-]*unsplash\.com\/[^\s"'\\)]+/g;
  const matches = [...content.matchAll(regex)];

  if (matches.length === 0) {
    // console.log(`ℹ️ 文件中未找到 Unsplash 链接: ${filePath}`);
    return;
  }

  let changed = false;
  const newUrls = {}; // Stores originalUrl -> newUploadedUrl mapping for this file
  const urlsToProcess = []; // URLs that need downloading and uploading

  for (const match of matches) {
    const originalUrl = match[0];
    if (urlMap[originalUrl]) {
      newUrls[originalUrl] = urlMap[originalUrl]; // Already processed and mapped globally
    } else if (!urlsToProcess.some((item) => item.originalUrl === originalUrl)) {
      // Avoid duplicates in this batch
      urlsToProcess.push({ originalUrl, index: urlsToProcess.length });
    }
  }

  if (urlsToProcess.length > 0) {
    console.log(`⏳ 准备下载 ${urlsToProcess.length} 张图片 (文件: ${filePath})`);
    const downloadPromises = urlsToProcess.map((item) =>
      downloadImage(item.originalUrl, item.index),
    );
    const downloadedFilePaths = await Promise.all(downloadPromises);

    const localPathsToUpload = [];
    for (let i = 0; i < urlsToProcess.length; i++) {
      if (downloadedFilePaths[i]) {
        // Check if download was successful
        localPathsToUpload.push({
          originalUrl: urlsToProcess[i].originalUrl,
          filePath: downloadedFilePaths[i],
        });
      }
    }

    if (localPathsToUpload.length > 0) {
      try {
        console.log(`⏫ 准备上传 ${localPathsToUpload.length} 张图片到 PicGo (文件: ${filePath})`);
        const uploadedResults = await picgoInstance.upload(
          localPathsToUpload.map((x) => x.filePath),
        );

        for (let i = 0; i < localPathsToUpload.length; i++) {
          const { originalUrl } = localPathsToUpload[i];
          const uploadedInfo = uploadedResults[i];
          const uploadedUrl = uploadedInfo?.imgUrl || uploadedInfo?.url; // PicGo v1 vs v2 or different uploader plugins

          if (uploadedUrl) {
            console.log(`🔗 映射成功: ${originalUrl} -> ${uploadedUrl}`);
            urlMap[originalUrl] = uploadedUrl;
            newUrls[originalUrl] = uploadedUrl;
          } else {
            console.error(
              `❌ 上传后未获取到 URL: ${originalUrl}, 返回: ${JSON.stringify(uploadedInfo)}`,
            );
          }
        }
        // Save map after each successful batch of uploads for a file
        fs.writeFileSync(urlMapPath, JSON.stringify(urlMap, null, 2));
      } catch (uploadError) {
        console.error(`❌ PicGo 上传失败 (文件: ${filePath}): ${uploadError.message}`, uploadError);
      }
    }
  }

  // 替换文件内容
  // Need to iterate based on keys in newUrls which contains both pre-mapped and newly mapped URLs
  Object.keys(newUrls).forEach((oldUrl) => {
    const newUrl = newUrls[oldUrl];
    if (content.includes(oldUrl) && oldUrl !== newUrl) {
      // Ensure there's something to replace and it's a different URL
      content = content.split(oldUrl).join(newUrl);
      changed = true;
    }
  });

  if (changed) {
    try {
      fs.copyFileSync(filePath, filePath + '.bak');
      fs.writeFileSync(filePath, content);
      console.log(`✅ 替换完成并备份: ${filePath}`);
    } catch (writeError) {
      console.error(`❌ 写入或备份文件失败: ${filePath} - ${writeError.message}`);
    }
  } else if (matches.length > 0 && Object.keys(newUrls).length === 0 && urlsToProcess.length > 0) {
    // This case means there were Unsplash URLs, but none could be processed (download/upload failed for all)
    console.warn(`⚠️ 文件中存在 Unsplash 链接，但未能成功处理或替换: ${filePath}`);
  } else if (matches.length > 0 && !changed) {
    // This means URLs were found, mapped (either new or existing map), but content didn't change (e.g. oldUrl was same as newUrl, or some other logic flaw)
    console.log(`ℹ️ 链接已映射但文件内容未实际更改: ${filePath}`);
  }
}

// 主入口
(async () => {
  const files = getAllFiles(projectDir);
  if (files.length === 0) {
    console.log('🤷 未在指定目录找到需要处理的文件。');
    return;
  }
  console.log(`📂 正在处理 ${files.length} 个前端文件`);

  const picgo = new PicGo(); // Create PicGo instance once

  // Concurrently process files, e.g., in batches or all at once
  // For simplicity, still sequential here. For true concurrency, consider Promise.all with a map
  // or a queue system (like p-limit) to control concurrency.
  for (let i = 0; i < files.length; i++) {
    console.log(`\n📄 (${i + 1}/${files.length}) 开始处理文件: ${files[i]}`);
    await processFile(files[i], picgo);
  }

  console.log('\n🚀 所有图片链接已处理完毕');

  // Optional: Clean up downloadDir
  try {
    // Be careful with rmdirSync, ensure it's what you want
    // fs.rmSync(downloadDir, { recursive: true, force: true });
    // console.log(`🧹 临时下载目录 ${downloadDir} 已清理`);
  } catch (cleanupError) {
    console.error(`❌ 清理临时目录 ${downloadDir} 失败: ${cleanupError.message}`);
  }
})();
