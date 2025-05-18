import React from 'react';
// import type { API } from '@/types';
import type { FitnessClass, Trainer } from '@/types/index';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// import {
// Dialog,
// DialogContent,
// DialogTrigger,
// } from '@/components/ui/dialog';
// import CourseBookingForm from '../components/CourseBookingForm';

// 课程卡片组件
interface ClassCardProps {
  fitnessClass: FitnessClass;
  trainer?: Trainer;
  currentUser?: API.LoginMemberVO;
}

const getIntensityColor = (intensity: 'low' | 'medium' | 'high') => {
  switch (intensity) {
    case 'low':
      return 'bg-green-100 text-green-800 hover:bg-green-200';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    case 'high':
      return 'bg-red-100 text-red-800 hover:bg-red-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};

const getIntensityText = (intensity: 'low' | 'medium' | 'high') => {
  switch (intensity) {
    case 'low':
      return '低强度';
    case 'medium':
      return '中强度';
    case 'high':
      return '高强度';
    default:
      return '未知';
  }
};

const ClassCard: React.FC<ClassCardProps> = ({ fitnessClass, trainer /*, currentUser */ }) => {
  // const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  let imageUrl = fitnessClass.image;
  if (imageUrl.includes('img.28082003.com') && !imageUrl.includes('!/fw/300')) {
    const [base, query] = imageUrl.split('?');
    imageUrl = `${base}!/fw/300${query ? '?' + query : ''}`;
  }

  return (
    // <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
    //   <DialogTrigger asChild>
    <Card className="fitness-card h-full flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48">
        <img 
          src={imageUrl} 
          alt={fitnessClass.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className={`${getIntensityColor(fitnessClass.intensity)} transition-colors`}>
            {getIntensityText(fitnessClass.intensity)}
          </Badge>
        </div>
      </div>
      <CardContent className="flex flex-col flex-grow p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold group-hover:text-fitness-red transition-colors">{fitnessClass.title}</h3>
          <Badge variant="outline" className="border-fitness-red text-fitness-red">
            {fitnessClass.duration}分钟
          </Badge>
        </div>
        <p className="text-sm text-fitness-gray mb-4">{fitnessClass.category}</p>
        <p className="text-sm line-clamp-3 mb-4 flex-grow text-gray-600">{fitnessClass.description}</p>
        <div className="mt-auto pt-3 border-t border-gray-200">
          <div className="flex justify-between items-center">
            {trainer && (
              <div className="flex items-center">
                <img 
                  src={trainer.coachAvatar} 
                  alt={trainer.coachName} 
                  className="w-8 h-8 rounded-full mr-2 border border-gray-200"
                />
                <span className="text-sm font-medium text-gray-700">{trainer.coachName}</span>
              </div>
            )}
            {/* <div className="text-fitness-red font-medium text-sm hover:underline">
              立即预约 &rarr;
            </div> */}
          </div>
        </div>
      </CardContent>
    </Card>
    //   </DialogTrigger>
    //   <DialogContent className="sm:max-w-[450px] p-0">
    //     <CourseBookingForm
    //       courseId={fitnessClass.id.toString()}
    //       courseName={fitnessClass.title}
    //       coachId={trainer?.coachId?.toString()}
    //       currentUser={currentUser}
    //       onSuccess={() => {
    //         setIsBookingModalOpen(false);
    //       }}
    //       onClose={() => setIsBookingModalOpen(false)}
    //     />
    //   </DialogContent>
    // </Dialog>
  );
};

export default ClassCard;
