import { getLoginMemberUsingGet } from '@/api/memberController';
import { AvatarDropdown, AvatarName } from '@/components';
import AdminFooter from '@/components/Footer';
import MemberFooter from '@/components/Footer/MemberFooter';
import { SYSTEM_LOGO } from '@/constants';
import { RequestConfig } from '@@/plugin-request/request';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import defaultSettings, { memberSettings } from '../config/defaultSettings';
import { Toaster } from "@/components/ui/toaster";

/**
 * 判断当前是否为开发环境
 */
const isDev = process.env.NODE_ENV === 'development';

/**
 * 登录页面路径
 */
const loginPath = '/member/login';

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
/**
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
  // 当访问路径不是登录页时执行初始化逻辑
  if (history.location.pathname !== '/member/login') {
    // 获取当前登录用户信息
    const currentUser = await fetchUserInfo();

    // 返回初始化状态对象
    return {
      fetchUserInfo,
      currentUser,
      settings:
        currentUser?.memberRole === 'admin'
          ? defaultSettings // 管理员使用默认配置
          : memberSettings, // 会员使用会员配置
    };
  }
}

/**
 * 布局配置
 * 配置应用的布局、菜单、权限等
 */
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  // 定义不需要布局的路由白名单
  const layoutWhitelist = [
    '/member/login',
    '/member/register',
    // 可以在此添加其他不需要默认布局的路由
  ];

  // 检查当前路径是否在白名单中
  const isInWhitelist = layoutWhitelist.some(
    (path) =>
      history.location.pathname === path || history.location.pathname.startsWith(path + '/'),
  );

  // 如果是白名单页面，不显示布局
  if (isInWhitelist) {
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

  // 根据用户角色动态设置布局
  const layoutSettings =
    initialState?.currentUser?.memberRole === 'admin' ? defaultSettings : memberSettings;

  return {
    // 右上角操作区
    // 头像配置
    avatarProps: {
      src: initialState?.currentUser?.memberAvatar || SYSTEM_LOGO,
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    // 页脚配置 - 根据用户角色显示不同的页脚
    footerRender: () =>
      initialState?.currentUser?.memberRole === 'admin' ? <AdminFooter /> : <MemberFooter />,
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
        // 页脚始终保持在底部
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ flex: 1 }}>{children}</div>
          {/* 开发环境下显示设置抽屉 */}
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={layoutSettings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
          <Toaster />
        </div>
      );
    },
    ...layoutSettings,
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

export function onRouteChange({ location, clientRoutes, routes, action }) {
  if (typeof window !== 'undefined') {
    let targetPath = location.pathname;
    let shouldScrollToOffset = false;

    // 检查是否需要重定向
    if (location.pathname === '/course/0') {
      history.replace('/course');
      targetPath = '/course'; // 更新目标路径，用于后续滚动判断
      // 注意：此处不直接滚动，等待history.replace生效后，action === 'REPLACE'时由后续逻辑处理
    }

    if (action === 'PUSH' || action === 'REPLACE') {
      // 判断是否为 /course 或 /course/:id (非/course/0) 路径，以应用偏移
      // 之前的重定向已将 /course/0 转换为 /course，所以这里只需判断 targetPath
      if (
        targetPath.startsWith('/course/') &&
        targetPath.length > '/course/'.length &&
        targetPath[targetPath.length - 1] !== '/'
      ) {
        shouldScrollToOffset = true;
      } else if (targetPath === '/course') {
        // 当路径是 /course (包括从 /course/0 重定向而来)，也应用偏移
        shouldScrollToOffset = true;
      }

      const contentElement =
        document.querySelector('.ant-pro-layout-content') ||
        document.querySelector('.ant-pro-page-container-children-content') ||
        document.querySelector('#root main > section');
      const fixedOffset = 450;
      let scrollTop = 0;

      if (shouldScrollToOffset) {
        if (contentElement) {
          scrollTop = contentElement.getBoundingClientRect().top + window.pageYOffset + fixedOffset;
        } else {
          scrollTop = fixedOffset;
        }
      } else {
        // 其他路径，默认滚动到页面最顶部 (0)
        scrollTop = 0;
      }

      requestAnimationFrame(() => {
        window.scrollTo(0, scrollTop);
      });
    }
  }
}
