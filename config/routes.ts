const routes = [
  {
    path: '/',
    name: '主页',
    component: './Home',
    access: 'canMember',
  },
  {
    path: '/course',
    name: '课程',
    component: './Course',
    exact: true,
    access: 'canMember',
  },
  {
    path: '/course/:id',
    component: './Course',
    access: 'canMember',
    hideInMenu: true,
  },
  {
    path: '/coach',
    name: '教练',
    component: './Coach',
    access: 'canMember',
  },
  {
    path: '/equipment',
    name: '健身器械',
    component: './Equipment',
    access: 'canMember',
  },
  {
    path: '/equipment/all',
    name: '健身器械列表',
    component: './Equipment/EquipmentList',
    hideInMenu: true,
  },
  {
    path: '/equipment/:id',
    name: '健身器械详情',
    component: './Equipment/EquipmentDetail',
    hideInMenu: true,
  },
  {
    path: '/goods',
    name: '运动商品',
    component: './Goods',
    access: 'canMember',
  },
  {
    path: '/goods/:id',
    name: '运动商品详情',
    component: './Goods/GoodsDetail',
    hideInMenu: true,
  },
  {
    path: '/goods/all',
    name: '运动商品列表',
    component: './Goods/GoodsList',
    hideInMenu: true,
  },
  {
    path: '/about',
    name: '关于我们',
    component: './About',
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
    path: '/member/bookings',
    name: '我的预约',
    component: './Member/Bookings',
    hideInMenu: true,
    access: 'canMember',
  },
  {
    path: '/member/settings',
    name: '个人设置',
    component: './Member/Settings',
    hideInMenu: true,
    access: 'canMember',
  },
  {
    path: '/admin/memberManage',
    name: '会员管理',
    icon: 'UserOutlined',
    component: './Admin/MemberManage',
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
    path: '/admin/category',
    name: '课程类别管理',
    icon: 'AppstoreOutlined',
    component: './Admin/CourseCategoryManage',
    access: 'canAdmin',
  },
  {
    path: '/admin/schedule',
    name: '课程排期管理',
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
    path: '/admin/course-purchase-manage',
    name: '课程购买记录管理',
    icon: 'CreditCardOutlined', // ShoppingOutlined 可换成 CreditCardOutlined，更贴合购买记录
    component: './Admin/CoursePurchaseManage',
    access: 'canAdmin',
    hideInMenu: true,
  },
  {
    path: '/admin/coachManage',
    name: '教练管理',
    icon: 'TeamOutlined',
    component: './Admin/CoachManage',
    access: 'canAdmin',
  },

  {
    path: '/admin/equipment-manage',
    name: '器械管理',
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
    name: '商品销售管理',
    icon: 'TransactionOutlined', // ShoppingOutlined 可换成 TransactionOutlined，更贴合交易/记录
    component: './Admin/GoodsTransactionsManage',
    access: 'canAdmin',
  },
  
  {
    path: '*',
    layout: false,
    component: './404',
  },
];

export default routes;
