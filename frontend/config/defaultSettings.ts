import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */

// 管理员布局配置
export const adminSettings: ProLayoutProps = {
  navTheme: 'light',
  colorPrimary: '#1677ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: '健身房管理系统',
  pwa: true,
  logo: '/icons/logo.png',
  iconfontUrl: '',
  token: {
    sider: {
      colorMenuBackground: '#fff',
      colorTextMenu: 'rgba(0, 0, 0, 0.85)',
      colorTextMenuSecondary: 'rgba(0, 0, 0, 0.65)',
      colorTextMenuSelected: '#1677ff',
      colorBgMenuItemSelected: '#e6f4ff',
      colorTextMenuActive: '#1677ff',
      colorTextMenuItemHover: '#1677ff',
    },
    header: {
      colorBgHeader: '#fff',
      colorHeaderTitle: 'rgba(0, 0, 0, 0.85)',
    },
  },
};

// 会员布局配置
export const memberSettings: ProLayoutProps = {
  navTheme: 'light',
  colorPrimary: '#1677ff',
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: false,
  pwa: true,
  title: '健身房会员页面',
  logo: '/icons/logo.png',
  className: 'member-layout',
  token: {
    sider: {
      colorMenuBackground: '#fff',
      colorTextMenu: 'rgba(0, 0, 0, 0.85)',
      colorTextMenuSecondary: 'rgba(0, 0, 0, 0.65)',
      colorTextMenuSelected: '#1677ff',
      colorBgMenuItemSelected: '#e6f4ff',
      colorTextMenuActive: '#1677ff',
      colorTextMenuItemHover: '#1677ff',
    },
    header: {
      colorBgHeader: '#fff',
      colorHeaderTitle: 'rgba(0, 0, 0, 0.85)',
    },
  },
  splitMenus: false,
  siderMenuType: 'sub',
};

// 默认导出管理员布局配置
export default adminSettings;
