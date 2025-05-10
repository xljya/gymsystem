
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ShoppingBag, Package, Box, Gift } from "lucide-react";

const features = [
  {
    title: "高品质商品",
    description: "采用优质材料，品质保证",
    icon: <Package className="h-12 w-12 text-blue-400" />
  },
  {
    title: "专业定制",
    description: "根据需求提供定制方案",
    icon: <ShoppingBag className="h-12 w-12 text-blue-400" />
  },
  {
    title: "完善服务",
    description: "提供专业咨询和售后服务",
    icon: <Gift className="h-12 w-12 text-blue-400" />
  },
  {
    title: "便捷购买",
    description: "简单快速的购买流程",
    icon: <Box className="h-12 w-12 text-blue-400" />
  }
];

const FeaturesBanner = () => {
  return (
    <section className="py-16 bg-black text-white">
      <div className="gym-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">我们的优势</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            为什么选择我们的商品
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/5 border-none text-white hover-scale">
              <CardContent className="p-6 flex flex-col items-center text-center">
                {feature.icon}
                <h3 className="text-xl font-bold mb-2 mt-4">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesBanner;
