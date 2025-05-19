
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const features = [
  {
    title: "高品质器械",
    description: "采用优质材料，耐用可靠"
  },
  {
    title: "专业定制",
    description: "根据场地需求提供定制方案"
  },
  {
    title: "完善服务",
    description: "提供专业安装和维护服务"
  },
  {
    title: "器械培训",
    description: "提供专业的使用指导和培训"
  }
];

const FeaturesBanner = () => {
  return (
    <section className="py-16 bg-gym-primary text-white">
      <div className="gym-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">我们的优势</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            为什么选择我们的健身器械
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white/5 border-none text-white">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <CheckCircle className="w-12 h-12 text-gym-accent mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
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
