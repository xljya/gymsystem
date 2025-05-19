/* eslint-disable react/button-has-type */

import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import { equipmentData } from "@/data/equipmentData";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

// 器械详情页
const EquipmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  
  const equipment = equipmentData.find(item => item.id === id);
  
  if (!equipment) {
    return (
      <div className="min-h-screen flex flex-col">
      
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">器械未找到</h2>
            <p className="text-gray-600 mb-8">抱歉，您查找的器械不存在或已被移除</p>
            <Button 
              onClick={() => navigate("/equipment")}
              className="bg-gym-primary hover:bg-gym-primary/90"
            >
              返回器械列表
            </Button>
          </div>
        </div>
        
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-grow py-12">
        <div className="gym-container">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              className="flex items-center text-gym-gray hover:text-gym-primary"
              asChild
            >
              <Link to="/equipment/all">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回器械列表
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left: Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-gym-light">
                <img 
                  src={equipment.images[activeImage]} 
                  alt={equipment.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex gap-3 overflow-x-auto py-2">
                {equipment.images.map((img, index) => (
                  <button
                    key={index}
                    className={`rounded-md overflow-hidden border-2 flex-shrink-0 w-20 h-20 ${
                      activeImage === index ? "border-gym-accent" : "border-transparent"
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img 
                      src={img} 
                      alt={`${equipment.name} - 图片 ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Info */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{equipment.name}</h1>
              <p className="text-gym-gray mb-4">
                分类: {
                  {"cardio": "有氧器械", 
                  "strength": "力量器械", 
                  "functional": "功能性训练器械", 
                  "accessories": "健身配件"}[equipment.category]
                }
              </p>
              <p className="text-lg mb-6">{equipment.shortDescription}</p>
              
              <Separator className="my-6" />
              
              <Tabs defaultValue="description">
                <TabsList className="mb-6">
                  <TabsTrigger value="description">详细描述</TabsTrigger>
                  <TabsTrigger value="specifications">技术参数</TabsTrigger>
                  <TabsTrigger value="features">特点</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="text-gray-700 space-y-4">
                  <p>{equipment.description}</p>
                </TabsContent>
                
                <TabsContent value="specifications">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(equipment.specifications).map(([key, value]) => (
                          <div key={key} className="border-b pb-2">
                            <span className="font-medium">{key}:</span> {value}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="features">
                  <Card>
                    <CardContent className="pt-6">
                      <ul className="space-y-2">
                        {equipment.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-gym-accent rounded-full mt-2 flex-shrink-0"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              <div className="mt-10 space-y-4">
                <Button 
                  size="lg" 
                  className="w-full bg-gym-primary hover:bg-gym-primary/90"
                >
                  联系我们了解更多
                </Button>
                
                <p className="text-sm text-center text-gym-gray">
                  需要更多信息？请联系我们的销售团队
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EquipmentDetail;
