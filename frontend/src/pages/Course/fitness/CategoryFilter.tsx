import React from 'react';
import { Link } from '@umijs/max';
import { CategoryType, LinkedCategory } from '@/types/index';
import { cn } from '@/lib/utils';

// 分类筛选组件
interface CategoryFilterProps {
  categories: LinkedCategory[];
  selectedCategory: CategoryType;
  onSelectCategory: (category: CategoryType) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <Link 
          key={category.id} 
          to={`/course/${category.id}`} 
          style={{ textDecoration: 'none' }}
          onClick={() => onSelectCategory(category.name)}
        >
          <button
            type="button"
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all w-full h-full",
              selectedCategory === category.name
                ? "bg-fitness-red text-white"
                : "bg-gray-100 text-fitness-dark hover:bg-gray-200"
            )}
          >
            {category.name}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default CategoryFilter;
