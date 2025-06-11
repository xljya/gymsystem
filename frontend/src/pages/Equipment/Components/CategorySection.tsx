import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell, Bike } from "lucide-react";

const categories = [
  {
    id: '1',
    name: '有氧器械',
    description: '提升心肺功能，增强耐力',
    icon: <Bike className="w-10 h-10 text-gym-accent" />,
    image: 'https://cdn.jsdelivr.net/gh/xljya/image/post/xlimg_1749058925165_0.jpeg',
  },
  {
    id: '2',
    name: '力量器械',
    description: '增强肌肉力量，塑造身体线条',
    icon: <Dumbbell className="w-10 h-10 text-gym-accent" />,
    image:
      'https://cdn.jsdelivr.net/gh/xljya/image/post/xlimg_1749058925167_1.jpg',
  },
  {
    id: '3',
    name: '功能性训练器械',
    description: '提高身体协调性和灵活性',
    icon: <Dumbbell className="w-10 h-10 text-gym-accent" />,
    image:
      'https://cdn.jsdelivr.net/gh/xljya/image/post/xlimg_1749058925167_2.jpg',
  },
  {
    id: '4',
    name: '健身配件',
    description: '辅助训练，提高健身效果',
    icon: <Bike className="w-10 h-10 text-gym-accent" />,
    image:
      'https://cdn.jsdelivr.net/gh/xljya/image/post/xlimg_1749058855560_11.jpg',
  },
];

const CategorySection = () => {
  return (
    <section className="py-16">
      <div className="gym-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">器械分类</h2>
          <p className="text-lg text-gym-gray max-w-2xl mx-auto">
            多样化的器械分类，满足不同训练需求
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={`/equipment/all?category_id=${category.id}`}>
              <Card className="h-full overflow-hidden hover-scale">
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-xl font-bold">{category.name}</h3>
                    </div>
                  </div>
                </div>
                <CardContent className="flex items-center gap-4 p-6">
                  {category.icon}
                  <div>
                    <h3 className="font-bold text-lg">{category.name}</h3>
                    <p className="text-gym-gray text-sm">{category.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
