import React from 'react';
import { Search } from 'lucide-react';

// HeroSection 组件的 props 类型定义，要求传入一个 onSearch 回调函数
interface HeroSectionProps {
  onSearch: (searchTerm: string) => void; // 搜索回调，参数为搜索关键词
}

// HeroSection 组件定义
const HeroSection = ({ onSearch }: HeroSectionProps) => {
  /**
   * 处理表单提交事件
   * @param e 表单提交事件对象
   * 阻止默认提交行为，获取输入框内容并调用 onSearch 回调
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 阻止表单默认刷新页面
    const form = e.currentTarget; // 获取当前表单元素
    const formData = new FormData(form); // 创建 FormData 对象以获取表单数据
    const searchTerm = formData.get('search') as string; // 获取名为 'search' 的输入值
    onSearch(searchTerm); // 调用父组件传入的搜索回调
  };

  return (
    // 顶部 hero 区域，渐变背景，白色文字，内边距适配不同屏幕
    <section className="relative bg-gradient-to-r from-lesmills-black to-lesmills-red text-white py-16 md:py-24">
      {/* 半透明黑色遮罩，提升文字可读性 */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {/* 内容容器，居中显示，z-10 保证在遮罩之上 */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* 主标题 */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            发现您的理想教练
          </h1>
          {/* 副标题 */}
          <p className="text-lg md:text-xl mb-8">
            探索我们专业认证的教练网络，找到适合您健身需求的专家
          </p>
          {/* 搜索表单，最大宽度限制，居中显示 */}
          <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto">
            <div className="flex items-center">
              {/* 输入框容器，flex-grow 使其填满剩余空间 */}
              <div className="relative flex-grow">
                {/* 搜索图标，绝对定位在输入框左侧 */}
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                {/* 搜索输入框，左侧留出图标空间，圆角左侧，聚焦时高亮 */}
                <input
                  type="text"
                  name="search"
                  placeholder="搜索教练名称、专长（如'力量训练'）或城市"
                  className="w-full py-3 pl-10 pr-4 rounded-l-md text-lesmills-black focus:outline-none focus:ring-2 focus:ring-lesmills-red"
                />
              </div>
              {/* 搜索按钮，红色背景，右侧圆角，悬停变色 */}
              <button 
                type="submit" 
                className="bg-lesmills-red hover:bg-red-700 text-white px-6 py-3 rounded-r-md font-medium transition-colors"
              >
                搜索
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
