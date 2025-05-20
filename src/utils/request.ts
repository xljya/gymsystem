/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { message } from "antd";
import { history } from "@@/core/history";

/**
 * 配置request请求时的默认参数
 */
const request = extend({
    credentials: 'include', // 默认请求是否带上cookie
    prefix: process.env.NODE_ENV === 'production' ? 'https://gym-backend.28082003.com' : undefined
    // requestType: 'form',
});

/**
 * 所以请求拦截器
 */
request.interceptors.request.use((url, options): any => {
    console.log(`do request url = ${url}`);
    
    // 从 localStorage 获取 token
    const token = localStorage.getItem('token');
    
    return {
        url,
        options: {
            ...options,
            headers: {
                ...options.headers,
                Authorization: token ? `Bearer ${token}` : '',
            },
        },
    };
});

/**
 * 所有响应拦截器
 */
request.interceptors.response.use(async (response): Promise<any> => {
    const res = await response.clone().json();
    console.log('响应数据:', res);
    
    if (res.code === 0) {
        // 如果是登录接口，保存token并返回完整响应
        if (response.url.includes('/member/login')) {
            if (res.data?.token) {
                localStorage.setItem('token', res.data.token);
            }
            return res;
        }
        return res.data;
    }
    
    if (res.code === 40100) {
        // 清除token
        localStorage.removeItem('token');
        message.error('请先登录');
        history.replace('/member/login');
        return Promise.reject(new Error('请先登录'));
    } else {
        return Promise.reject(new Error(res.message || '请求失败'));
    }
});

export default request;
