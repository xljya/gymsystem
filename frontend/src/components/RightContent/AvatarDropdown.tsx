import { memberLogoutUsingPost } from '@/api/memberController';
import { LogoutOutlined, SettingOutlined, UserOutlined, CalendarOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Spin, message } from 'antd';
import { createStyles } from 'antd-style';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  return <span className="anticon">{currentUser?.memberName}</span>;
};

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
    avatar: {
      marginRight: '8px',
      verticalAlign: 'top',
      background: 'rgba(255, 255, 255, 0.85)',
    },
    name: {
      verticalAlign: 'middle',
    },
  };
});

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu, children }) => {
  const { styles } = useStyles();
  const { initialState, setInitialState } = useModel('@@initialState');

  const loginOut = async () => {
    try {
      // 先调用退出登录接口
      const res = await memberLogoutUsingPost();
      console.log('退出登录响应:', res);
      
      // 无论接口返回什么，都执行退出操作
      // 清除本地存储的 token
      localStorage.removeItem('token');
      
      // 使用 flushSync 同步更新状态
      flushSync(() => {
        setInitialState((s) => ({ ...s, currentUser: undefined }));
      });
      
      message.success('退出登录成功');
      // 使用 replace 而不是 push，避免浏览器历史记录堆积
      history.replace('/member/login');
    } catch (error) {
      console.error('退出登录失败:', error);
      // 即使接口调用失败，也执行退出操作
      localStorage.removeItem('token');
      setInitialState((s) => ({ ...s, currentUser: undefined }));
      history.replace('/member/login');
      message.success('退出登录成功');
    }
  };

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        loginOut();
        return;
      }
      if (key === 'my-bookings') {
        history.push('/member/bookings');
        return;
      }
      if (key === 'settings') {
        history.push('/member/settings');
        return;
      }
      history.push(`/account/${key}`);
    },
    [],
  );

  const loading = (
    <span className={styles.action}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.memberName) {
    return loading;
  }

  const menuItems = [
    ...(menu
      ? [
          {
            key: 'center',
            icon: <UserOutlined />,
            label: '个人中心',
          },
          {
            type: 'divider' as const,
          },
        ]
      : []),
    ...(currentUser?.memberRole !== 'admin'
      ? [
          {
            key: 'my-bookings',
            icon: <CalendarOutlined />,
            label: '我的预约',
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: '个人设置',
          },
        ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  return (
    <HeaderDropdown
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
    >
      {children}
    </HeaderDropdown>
  );
};
