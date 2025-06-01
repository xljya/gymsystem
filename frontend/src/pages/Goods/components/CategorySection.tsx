import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Package, Box, Gift } from "lucide-react";

const categories = [
  {
    id: '1',
    name: '营养补剂',
    description: '蛋白粉、BCAA 等运动营养补给',
    icon: <Package className="w-10 h-10 text-blue-500" />,
    image:
      'https://img.28082003.com//xlxlimg_1747424875211_0.jpg',
  },
  {
    id: '2',
    name: '运动服饰',
    description: '速干 T 恤、运动短裤、瑜伽裤等专业服饰',
    icon: <ShoppingBag className="w-10 h-10 text-blue-500" />,
    image:
      'https://img.28082003.com//xlxlimg_1747424875212_1.jpg',
  },
  {
    id: '3',
    name: '健身配件',
    description: '泡沫轴、弹力带、护具手套等辅助配件',
    icon: <Box className="w-10 h-10 text-blue-500" />,
    image:
      'https://img.28082003.com//xlxlimg_1747424875214_2.jpg',
  },
  {
    id: '4',
    name: '训练装备',
    description: '跳绳、壶铃、瑜伽垫等小型器械',
    icon: <Gift className="w-10 h-10 text-blue-500" />,
    image:
      'https://img.28082003.com//xlxlimg_1747424875215_3.jpg',
  },
];

const CategorySection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="gym-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-black">商品类别</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            探索我们多样化的商品类别，总有一款适合您
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link to={`/goods/all?goods_category_id=${category.id}`} key={category.id} className="hover-scale">
              <Card className="h-full overflow-hidden border border-gray-200 rounded-lg shadow-md">
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {category.icon}
                    <h3 className="text-xl font-bold text-black">{category.name}</h3>
                  </div>
                  <p className="text-gray-600">{category.description}</p>
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
