// 导入React Router的Link组件用于页面导航
import { Link } from "react-router-dom";

/**
 * MemberFooter组件 - 网站底部导航栏
 * 包含公司信息、社交媒体链接、课程项目、公司信息和帮助支持等部分
 */
const MemberFooter = () => {
  return (
    // 底部容器，黑色背景白色文字
    <footer className="bg-black text-white">
      {/* 内容区域，最大宽度限制，响应式内边距 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 网格布局，在中等屏幕以上分为4列 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 公司信息区域 */}
          <div>
            <h3 className="text-xl font-bold mb-4">健身房系统</h3>
            <p className="text-gray-400 mb-6">
              这个系统会员页面主要参考的是莱美LES MILLS的中英文官网。
            </p>
            {/* 社交媒体链接区域 */}
            <div className="flex space-x-4">
              {/* Email图标 */}
              <a href="mailto:gym@liucf.com" className="text-white hover:text-lesmills-red">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              {/* GitHub图标 */}
              <a href="https://github.com/xljya" className="text-white hover:text-lesmills-red">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">关于</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                  查找课程
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                  教练员
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                  查看器械
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                  隐私条款
                </Link>
              </li>
            </ul>
          </div>

          {/* 更新后的三列“健身课程” */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* 列 1: Fitness Classes */}
            <div>
              <h3 className="text-lg font-bold mb-4">健身课程</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                    健身课程：
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                    身体攻击
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                    BODYBALANCE 身体平衡
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                    BODYCOMBAT （人体战斗）
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                    BODYJAM 公司
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                    BODYPUMP （身体泵）
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                    BODYSTEP
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                    功能强度
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                    LES MILLS CORE
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                    LES MILLS 颁奖典礼
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                    LES MILLS 普拉提
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                    LES MILLS 形状
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                    LES MILLS 蓬勃发展
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                    LES MILLS 调色
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                    转速
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                    实力发展
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                    旅行
                  </Link>
                </li>
              </ul>
            </div>
            {/* 列 2: HIIT Workouts */}
            <div>
              <h3 className="text-lg font-bold mb-4 invisible">高强度间歇性课程</h3>{' '}
              {/* 隐藏标题以对齐 */}
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                    高强度间歇性课程：
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                    LES MILLS GRIT ATHLETIC
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                    LES MILLS GRIT CARDIO
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                    LES MILLS 砂砾强度
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                    莱美冲刺赛
                  </Link>
                </li>
              </ul>
            </div>
            {/* 列 3: Youth Classes */}
            <div>
              <h3 className="text-lg font-bold mb-4 invisible">青少年趣动课程</h3>{' '}
              {/* 隐藏标题以对齐 */}
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                    青少年趣动课程：
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                    为搬家而生 2-3 岁
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                    为运动而生 4-5 岁
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                    为运动而生 6-7 岁
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                    为运动而生 8-12 岁
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-gray-400 hover:text-lesmills-red">
                    为运动而生 13-16 岁
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Les Mills China. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MemberFooter; 