const routes = [
  {
    path: '/',
    name: '主页',
    component: './Home',
  },
  {
    path: '/member/login',
    name: '会员登录',
    component: './Member/Login',
    hideInMenu: true,
  },
  {
    path: '/member/register',
    name: '会员注册',
    component: './Member/Register',
    hideInMenu: true,
  },
  {
    path: '/admin/memberManage',
    name: '会员管理',
    icon: 'UserOutlined',
    component: './Admin/MemberManage',
    access: 'canAdmin',
  },
  {
    path: '/admin/coachManage',
    name: '教练管理',
    icon: 'TeamOutlined',
    component: './Admin/CoachManage',
    access: 'canAdmin',
  },
  {
    path: '/admin/course-manage',
    name: '课程管理',
    icon: 'BookOutlined',
    component: './Admin/CourseManage',
    access: 'canAdmin',
  },
  {
    path: '/admin/course-purchase-manage',
    name: '课程购买记录管理',
    icon: 'ShoppingOutlined',
    component: './Admin/CoursePurchaseManage',
    access: 'canAdmin',
  },
  {
    path: '/admin/equipment-manage',
    name: '器材管理',
    icon: 'ToolOutlined',
    component: './Admin/EquipmentManage',
    access: 'canAdmin',
  },
  {
    path: '/admin/goods-manage',
    name: '商品管理',
    icon: 'ShoppingCartOutlined',
    component: './Admin/GoodsManage',
    access: 'canAdmin',
  },
  {
    path: '/admin/goods-transactions-manage',
    name: '商品销售记录',
    icon: 'ShoppingOutlined',
    component: './Admin/GoodsTransactionsManage',
    access: 'canAdmin',
  },
  {
    path: '/welcome',
    name: '欢迎',
    component: './Welcome',
    hideInMenu: true,
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];

export default routes;

