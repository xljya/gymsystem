
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Package, Box, Gift } from "lucide-react";

const categories = [{
  id: "electronics",
  name: "电子产品",
  description: "高科技电子设备，提升生活品质",
  icon: <Package className="w-10 h-10 text-blue-500" />,
  image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2669&auto=format&fit=crop"
}, {
  id: "clothing",
  name: "服饰鞋包",
  description: "时尚服装鞋包，展现个人风采",
  icon: <ShoppingBag className="w-10 h-10 text-blue-500" />,
  image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=2670&auto=format&fit=crop"
}, {
  id: "household",
  name: "家居用品",
  description: "精美家居用品，打造温馨家园",
  icon: <Box className="w-10 h-10 text-blue-500" />,
  image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=2574&auto=format&fit=crop"
}, {
  id: "gifts",
  name: "礼品专区",
  description: "精选礼品，让心意传递更有温度",
  icon: <Gift className="w-10 h-10 text-blue-500" />,
  image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2340&auto=format&fit=crop"
}];

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
          {categories.map((category, index) => (
            <Link to={`/goods/all?category=${category.id}`} key={category.id} className="hover-scale">
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
