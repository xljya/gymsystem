
import React from 'react';
import { Trainer } from '@/types';
import { Card, CardContent } from '@/components/ui/card';

// 教练卡片组件

interface TrainerCardProps {
  trainer: Trainer;
}

const TrainerCard: React.FC<TrainerCardProps> = ({ trainer }) => {
  return (
    <Card className="fitness-card h-full overflow-hidden">
      <div className="h-60 overflow-hidden">
        <img 
          src={trainer.image} 
          alt={trainer.name} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-bold mb-1">{trainer.name}</h3>
        <p className="text-sm text-fitness-gray mb-2">{trainer.specialty}</p>
        <div className="flex justify-between text-sm">
          <span>⭐ {trainer.rating}/5.0</span>
          <span>{trainer.experience}年经验</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainerCard;
