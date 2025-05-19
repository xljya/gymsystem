import React from 'react';
import type { Trainer } from '@/types';
import { Card } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

// 定义 InstructorCard 组件的 props 类型，要求传入一个 Trainer 类型的对象
interface InstructorCardProps {
  trainer: Trainer;
}

// InstructorCard 组件，接收一个 trainer 对象作为参数
const InstructorCard = ({ trainer }: InstructorCardProps) => {
  return (
    // Card 组件作为外层容器，添加溢出隐藏和悬浮阴影效果
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* 顶部图片区域，relative 方便后续绝对定位经验标签 */}
      <div className="relative">
        {/* 教练头像区域，固定高度，背景灰色，溢出隐藏 */}
        <div className="w-full h-48 bg-gray-200 overflow-hidden">
          <img 
            src={trainer.coachAvatar} // 教练头像图片地址
            alt={trainer.coachName}   // 图片的替代文本为教练姓名
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" // 图片自适应填充，悬浮时放大
          />
        </div>
        {/* 如果有经验年数，则显示经验标签 */}
        {trainer.experience !== undefined && (
          <span className="absolute top-3 right-3 bg-lesmills-red text-white text-xs font-semibold px-2 py-1 rounded">
            {trainer.experience} 年经验
          </span>
        )}
      </div>
      
      {/* 下方信息区域，内边距 5 */}
      <div className="p-5">
        {/* 教练姓名，字体加粗加大，flex-1 占满剩余空间 */}
        <div className="flex items-center mb-2">
          <h3 className="text-xl font-bold text-lesmills-black flex-1">{trainer.coachName}</h3>
        </div>
        
        {/* 教练所在城市，带有地图图标，若无地址则显示“未知城市” */}
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <MapPin size={16} className="mr-1" /> {/* 地图图标，右侧间距 */}
          <span>{trainer.coachAddress || '未知城市'}</span>
        </div>
        
        {/* 教练课程类型简介，若无则显示“暂无补充信息”，最多显示两行 */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 line-clamp-2">
            {trainer.courseType || '暂无补充信息'}
          </p>
        </div>
      </div>
    </Card>
  );
};

// 导出 InstructorCard 组件，供其他文件使用
export default InstructorCard;
