import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { equipmentData } from "@/data/equipmentData";
import { Dumbbell, Bike } from "lucide-react";
import { PageContainer } from "@ant-design/pro-components"

const categories = [
  { id: "all", name: "全部", icon: <Dumbbell className="w-5 h-5" /> },
  { id: "cardio", name: "有氧器械", icon: <Bike className="w-5 h-5" /> },
  { id: "strength", name: "力量器械", icon: <Dumbbell className="w-5 h-5" /> },
  { id: "functional", name: "功能性训练器械", icon: <Dumbbell className="w-5 h-5" /> },
  { id: "accessories", name: "健身配件", icon: <Bike className="w-5 h-5" /> }
];

const EquipmentList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredEquipment, setFilteredEquipment] = useState(equipmentData);

  useEffect(() => {
    const category = searchParams.get("category") || "all";
    setActiveCategory(category);
    
    if (category === "all") {
      setFilteredEquipment(equipmentData);
    } else {
      setFilteredEquipment(equipmentData.filter(item => item.category === category));
    }
  }, [searchParams]);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    if (categoryId === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: categoryId });
    }
  };

  return (
    <div style={{ 
      position: 'relative',
      margin: '-24px -24px 0', // 抵消antd默认边距
      width: 'calc(100% + 48px)'
    }}>
      {/* 顶部展示区域 */}
      <div className="bg-gym-primary text-white py-16 w-full" 
           style={{
             position: 'relative',
             zIndex: 10,
             boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
             paddingTop: '8rem',   // 增加上内边距
    paddingBottom: '4rem',// 减少下内边距
    marginTop: '2rem'     // 新增外边距
           }}>
        <div className="container mx-auto px-4 text-center">
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">器械展示</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            探索我们丰富多样的健身器械，为您的健身房打造完美配置
          </p>
        </div>
      </div>

      {/* 内容区域 */}
      <PageContainer 
        // 隐藏小导航栏
        header={{ 
          title: false,
          breadcrumb: { items: [] }
        }}
        style={{
          backgroundColor: 'transparent',
          padding: 0,
          marginTop: '-24px'
        }}
      >
        <div className="container mx-auto px-4">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mb-10 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={`flex items-center gap-2 ${
                  activeCategory === category.id 
                    ? "bg-gym-primary hover:bg-gym-primary/90" 
                    : "border-gym-gray/30 text-gym-primary"
                }`}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.icon}
                {category.name}
              </Button>
            ))}
          </div>
          
          {/* Equipment Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredEquipment.map((item) => (
              <Card key={item.id} className="overflow-hidden hover-scale">
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-gym-gray line-clamp-2">{item.shortDescription}</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full border-gym-primary text-gym-primary hover:bg-gym-primary hover:text-white"
                    asChild
                  >
                    <Link to={`/equipment/${item.id}`}>查看详情</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredEquipment.length === 0 && (
            <div className="text-center py-16">
              <Dumbbell className="w-16 h-16 text-gym-gray mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">未找到器械</h3>
              <p className="text-gym-gray">
                当前分类下没有可用的器械，请尝试其他分类
              </p>
              <Button 
                className="mt-4 bg-gym-primary hover:bg-gym-primary/90"
                onClick={() => handleCategoryChange("all")}
              >
                查看所有器械
              </Button>
            </div>
          )}
        </div>
      </PageContainer>
      
    </div>
  );
};

export default EquipmentList;
