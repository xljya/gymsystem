/**
 * 网络请求工具
 * 基于 umi-request 封装的请求工具，提供统一的请求配置和拦截器处理
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { message } from "antd";
import { history } from "@@/core/history";

/**
 * 创建请求实例并配置默认参数
 */
const request = extend({
    credentials: 'include', // 默认请求携带 cookie，用于处理 session 认证
    // 根据环境设置 API 基础路径：生产环境使用线上地址，开发环境使用本地代理
    prefix: process.env.NODE_ENV === 'production' ? 'https://gym-backend.28082003.com' : undefined
    // requestType: 'form', // 可选：设置请求体类型为表单数据
});

/**
 * 请求拦截器
 * 在每个请求发送前自动添加认证头信息
 */
request.interceptors.request.use((url, options): any => {
    // 控制台输出请求地址，便于调试
    console.log(`发起请求: ${url}`);
    
    // 从浏览器本地存储获取用户登录 token
    const token = localStorage.getItem('token');
    
    // 返回修改后的请求配置
    return {
        url,
        options: {
            ...options,
            headers: {
                ...options.headers,
                // 如果存在 token，则在请求头中添加 Authorization 字段
                // 使用 Bearer Token 认证方式
                Authorization: token ? `Bearer ${token}` : '',
            },
        },
    };
});

/**
 * 响应拦截器
 * 统一处理所有 HTTP 响应，包括成功和错误情况
 */
request.interceptors.response.use(async (response): Promise<any> => {
    // 克隆响应对象并解析为 JSON，避免流被消费后无法再次读取
    const res = await response.clone().json();
    console.log('响应数据:', res);
    
    // 判断业务状态码：0 表示成功
    if (res.code === 0) {
        // 特殊处理登录接口：需要保存 token 并返回完整响应数据
        if (response.url.includes('/member/login')) {
            // 检查响应中是否包含 token
            if (res.data?.token) {
                // 将 token 保存到本地存储，用于后续请求的身份认证
                localStorage.setItem('token', res.data.token);
            }
            // 登录接口返回完整的响应数据（包含 code、data、message）
            return res;
        }
        // 其他接口只返回 data 部分，简化业务层的数据处理
        return res.data;
    }
    
    // 处理未授权错误：40100 表示用户未登录或 token 失效
    if (res.code === 40100) {
        // 清除本地存储的无效 token
        localStorage.removeItem('token');
        // 显示错误提示信息
        message.error('请先登录');
        // 跳转到登录页面
        history.replace('/member/login');
        // 抛出错误，中断请求链
        return Promise.reject(new Error('请先登录'));
    } else {
        // 处理其他业务错误：显示服务器返回的错误信息或默认提示
        return Promise.reject(new Error(res.message || '请求失败'));
    }
});

// 导出配置好的请求实例，供全局使用
export default request;
