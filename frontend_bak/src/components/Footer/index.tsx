/**
 * 网站页脚组件
 * 包含版权声明和相关链接
 */
import { PLANET_LINK } from '@/constants'; // 引入常量配置
import { GithubOutlined } from '@ant-design/icons'; // Ant Design 图标
import { DefaultFooter } from '@ant-design/pro-components'; // ProComponents 的页脚组件
import React from 'react'; // React 基础库

/**
 * 页脚组件
 * 使用 Ant Design Pro 的 DefaultFooter 组件构建
 * 包含三个主要链接：个人主页、GitHub 和博客
 */
const Footer: React.FC = () => {
  const defaultMessage = 'Powered by Ant Design'; // 版权声明文本
  
  return (
    <DefaultFooter
      copyright={defaultMessage} // 底部版权信息
      style={{ background: 'none' }} // 清除默认背景色
      links={[
        // 个人主页链接（配置在常量文件中）
        {
          key: 'planet',
          title: '个人主页', 
          href: PLANET_LINK,
          blankTarget: true // 新标签页打开
        },
        // GitHub 仓库链接（带图标）
        {
          key: 'github',
          title: <GithubOutlined />, // 使用 GitHub 图标
          href: 'https://github.com/xljya',
          blankTarget: true
        },
        // 博客链接
        {
          key: 'codeNav',
          title: 'Blog',
          href: 'https://blog.liucf.com',
          blankTarget: true
        }
      ]}
    />
  );
};

export default Footer;
