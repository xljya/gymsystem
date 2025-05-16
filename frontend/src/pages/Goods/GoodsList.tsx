import { useState } from "react";
import { useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { goodsData } from "@/data/goodsData";
import { Package, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PageContainer } from "@ant-design/pro-components"

const GoodsList = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  
  // 获取 URL 中的 category 查询参数
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get("category");

  const filteredGoods = goodsData.filter(item => {
    const matchName = item.goodsName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = currentCategory ? item.category === currentCategory : true;
    return matchName && matchCategory;
  });

  return (
    <div style={{ 
      position: 'relative',
      margin: '-24px -24px 0',
      width: 'calc(100% + 48px)'
    }}>
      {/* 顶部展示区域 */}
      <div className="bg-gym-primary text-white py-16 w-full" 
           style={{
             position: 'relative',
             zIndex: 10,
             boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
             paddingTop: '8rem',
             paddingBottom: '4rem',
             marginTop: '2rem'
           }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">商品展示</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            探索我们丰富多样的健身商品，为您的健身生活提供全面支持
          </p>
        </div>
      </div>
      
      <PageContainer 
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
          {/* Search Bar */}
          <div className="flex items-center gap-4 mb-10 max-w-md mx-auto">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gym-gray" />
              <Input
                type="text"
                placeholder="搜索商品..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            {searchQuery && (
              <Button 
                variant="outline" 
                onClick={() => setSearchQuery("")}
                className="shrink-0"
              >
                清除
              </Button>
            )}
          </div>
          
          {/* Goods Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGoods.map((item) => (
              <Card key={item.id} className="overflow-hidden hover-scale">
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={item.remark} 
                    alt={item.goodsName} 
                    className="w-full h-full object-cover"
                  />
                  {item.inventory <= 10 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded-md">
                      库存紧张: {item.inventory}件
                    </div>
                  )}
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">{item.goodsName}</h3>
                  <p className="text-gym-accent font-bold text-lg">¥{item.sellPrice}</p>
                  <p className="text-gym-gray text-sm">库存: {item.inventory}件</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full border-gym-primary text-gym-primary hover:bg-gym-primary hover:text-white"
                    asChild
                  >
                    <Link to={`/goods/${item.id}`}>查看详情</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredGoods.length === 0 && (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-gym-gray mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">未找到商品</h3>
              <p className="text-gym-gray">
                没有找到符合搜索条件的商品
              </p>
              <Button 
                className="mt-4 bg-gym-primary hover:bg-gym-primary/90"
                onClick={() => setSearchQuery("")}
              >
                查看所有商品
              </Button>
            </div>
          )}
        </div>
      </PageContainer>
      
    </div>
  );
};

export default GoodsList;
