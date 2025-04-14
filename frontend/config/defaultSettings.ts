import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 修改主题色为更醒目的蓝色
  colorPrimary: '#1677ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '健身房管理系统',
  pwa: true,
  logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  iconfontUrl: '',
  token: {
    // 修改菜单样式
    sider: {
      colorMenuBackground: '#fff',
      colorTextMenu: 'rgba(0, 0, 0, 0.85)',
      colorTextMenuSecondary: 'rgba(0, 0, 0, 0.65)',
      colorTextMenuSelected: '#1677ff',
      colorBgMenuItemSelected: '#e6f4ff',
      colorTextMenuActive: '#1677ff',
      colorTextMenuItemHover: '#1677ff',
    },
    // 修改布局样式
    layout: {
      colorBgHeader: '#fff',
      colorBgBody: '#f5f5f5',
    },
  },
};

export default Settings;
