import { PLANET_LINK } from '@/constants';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = 'Powered by Ant Design';
  return (
    <DefaultFooter
      copyright={defaultMessage}
      style={{
        margin: '48px 0 24px',
        padding: '0 16px',
        textAlign: 'center',
      }}
      links={[
        {
          key: 'planet',
          title: '个人主页',
          href: PLANET_LINK,
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/xljya',
          blankTarget: true,
        },
        {
          key: 'codeNav',
          title: 'Blog',
          href: 'https://blog.liucf.com',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
