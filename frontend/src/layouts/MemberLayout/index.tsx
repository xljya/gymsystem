import { AvatarDropdown, AvatarName, Footer } from '@/components';
import { SYSTEM_LOGO } from '@/constants';
import { HomeOutlined, ExperimentOutlined } from '@ant-design/icons';
import { ProLayout } from '@ant-design/pro-components';
import { Link, useModel } from '@umijs/max';
import React from 'react';

const MemberLayout: React.FC<{
  children: React.ReactNode;
  initialState: any;
}> = ({ children, initialState }) => {
  const { currentUser } = initialState || {};
  const { setInitialState } = useModel('@@initialState');

  return (
    <ProLayout
      title="健身房管理系统"
      logo={SYSTEM_LOGO}
      avatarProps={{
        src: currentUser?.memberAvatar || SYSTEM_LOGO,
        title: <AvatarName />,
        render: (_, avatarChildren) => {
          return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
        },
      }}
      headerContentRender={() => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/" style={{ marginRight: 24 }}>
              <HomeOutlined /> 主页
            </Link>
            <Link to="/test">
              <ExperimentOutlined /> 测试页面
            </Link>
          </div>
        );
      }}
      footerRender={() => <Footer />}
      onPageChange={() => {
        if (!initialState?.currentUser) {
          history.replace('/member/login');
        }
      }}
      siderWidth={0}
      fixedHeader
      contentStyle={{
        marginTop: '64px',
      }}
      layout="top"
      splitMenus={false}
      menuRender={false}
    >
      {children}
    </ProLayout>
  );
};

export default MemberLayout;
