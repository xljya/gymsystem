import { AvatarDropdown, AvatarName, Footer, Question } from '@/components';
import { LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import {RequestConfig} from "@@/plugin-request/request";
import { Link, history } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { getLoginMemberUsingGet } from '@/api/memberController';
import { SYSTEM_LOGO } from '@/constants';

/**
 * 判断当前是否为开发环境
 */
const isDev = process.env.NODE_ENV === 'development';

/**
 * 登录页面路径
 */
const loginPath = '/member/login';

/**
 * 不需要登录就可以访问的页面白名单
 */
const NO_NEED_LOGIN_WHITE_LIST = ['/member/register', loginPath];

/**
 * 请求配置
 * 设置请求超时时间为1000000毫秒
 */
export const request: RequestConfig = {
  timeout: 1000000,
};

/**
 * 获取应用初始状态
 * 这个函数会在应用启动时被调用，用于初始化全局状态
 * @returns 包含设置、当前会员信息、加载状态和获取会员信息函数的对象
 */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.LoginMemberVO;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.LoginMemberVO | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const res = await getLoginMemberUsingGet();
      console.log('获取用户信息响应:', res);
      
      if (res) {
        return {
          ...res,
          memberAvatar: res.memberAvatar || SYSTEM_LOGO,
        };
      }
      return undefined;
    } catch (error) {
      console.error('获取会员信息失败:', error);
      return undefined;
    }
  };

  // 如果不是登录页面，执行
  if (history.location.pathname !== '/member/login') {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

/**
 * 布局配置
 * 配置应用的布局、菜单、权限等
 */
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  // 如果是登录页面或注册页面，不显示布局
  if (history.location.pathname === '/member/login' || history.location.pathname === '/member/register') {
    return {
      pure: true,
      menuRender: false,
      headerRender: false,
      footerRender: false,
    };
  }

  // 未登录时跳转到登录页
  if (!initialState?.currentUser) {
    history.replace('/member/login');
    return {
      pure: true,
      menuRender: false,
      headerRender: false,
      footerRender: false,
    };
  }

  return {
    // 右上角操作区
    actionsRender: () => [<Question key="doc" />],
    // 头像配置
    avatarProps: {
      src: initialState?.currentUser?.memberAvatar || SYSTEM_LOGO,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    // 水印配置
    waterMarkProps: {
      content: initialState?.currentUser?.memberName,
    },
    // 页脚配置
    footerRender: () => <Footer />,
    // 页面切换时的处理
    onPageChange: () => {
      const { location } = history;
      // 如果是登录页面或注册页面，不需要检查登录状态
      if (location.pathname === '/member/login' || location.pathname === '/member/register') {
        return;
      }
      // 未登录时跳转到登录页
      if (!initialState?.currentUser) {
        history.replace('/member/login');
      }
    },
    // 不显示菜单头部
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      return (
        <>
          {children}
          {/* 开发环境下显示设置抽屉 */}
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
// export const request = {
//   ...errorConfig,
// };
