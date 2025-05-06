const routes = [
  {
    path: '/',
    name: '主页',
    component: './Home',
    access: 'canMember',
  },
  {
    path: '/test',
    name: '测试页面',
    component: './Member/Test',
    access: 'canMember',
  },
  {
    path: '/admin/welcome',
    name: '欢迎',
    component: './Admin/Welcome',
    icon: 'CrownOutlined', // 建议统一使用 Ant Design 的 Icon 组件命名风格
    access: 'canAdmin',
  },
  {
    path: '/member/login',
    name: '会员登录',
    component: './Member/Login',
    hideInMenu: true,
    access: 'guest',
  },
  {
    path: '/member/register',
    name: '会员注册',
    component: './Member/Register',
    hideInMenu: true,
    access: 'guest',
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
    icon: 'ReadOutlined', // BookOutlined 可换成 ReadOutlined，更贴合课程/阅读
    component: './Admin/CourseManage',
    access: 'canAdmin',
  },
  {
    path: '/admin/course-purchase-manage',
    name: '课程购买记录管理',
    icon: 'CreditCardOutlined', // ShoppingOutlined 可换成 CreditCardOutlined，更贴合购买记录
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
    icon: 'ShoppingOutlined', // ShoppingCartOutlined 可换成 ShoppingOutlined，更通用
    component: './Admin/GoodsManage',
    access: 'canAdmin',
  },
  {
    path: '/admin/goods-transactions-manage',
    name: '商品销售记录',
    icon: 'TransactionOutlined', // ShoppingOutlined 可换成 TransactionOutlined，更贴合交易/记录
    component: './Admin/GoodsTransactionsManage',
    access: 'canAdmin',
  },
  {
    path: '/admin/category',
    name: '课程类别管理',
    icon: 'AppstoreOutlined',
    component: './Admin/CourseCategoryManage',
    access: 'canAdmin',
  },
  {
    path: '/admin/schedule',
    name: '课程安排管理',
    icon: 'CalendarOutlined',
    component: './Admin/CourseScheduleManage',
    access: 'canAdmin',
  },
  {
    path: '/admin/booking',
    name: '课程预约管理',
    icon: 'ScheduleOutlined',
    component: './Admin/CourseBookingManage',
    access: 'canAdmin',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];

export default routes;
