import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Package, Search, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PageContainer } from "@ant-design/pro-components";
import { Spin, message, Empty } from "antd";
import { listGoodsVoByPageUsingPost } from "@/api/goodsController";
import { listGoodsCategoryVoByPageUsingPost } from "@/api/goodsCategoryController";

// Temporary interface if API.GoodsVO is not up-to-date
// interface ExtendedGoodsVO extends API.GoodsVO {
//   goodAvatar?: string;
//   categoryName?: string;
// }

// Interface for frontend display categories (can be shared or defined locally)
interface DisplayCategory {
  id: string; 
  name: string;
  icon?: JSX.Element;
}

const GoodsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");

  const [displayGoodsCategories, setDisplayGoodsCategories] = useState<DisplayCategory[]>([]);
  const [goodsCategoriesLoading, setGoodsCategoriesLoading] = useState<boolean>(true);
  const [activeGoodsCategoryId, setActiveGoodsCategoryId] = useState<string>(() => searchParams.get("goods_category_id") || "0");

  const [goods, setGoods] = useState<API.GoodsVO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 12,
    total: 0,
  });

  useEffect(() => {
    console.log("[GoodsList] Initial activeGoodsCategoryId from state/URL:", activeGoodsCategoryId);
  }, []); // Log initial activeGoodsCategoryId once

  // Fetch and set goods categories
  useEffect(() => {
    const fetchAndSetDisplayGoodsCategories = async () => {
      console.log("[GoodsList] Fetching goods categories...");
      setGoodsCategoriesLoading(true);
      try {
        // Type assertion to any because the actual API response might not match the generated type perfectly
        const response = await listGoodsCategoryVoByPageUsingPost({ current: 1, pageSize: 50 }) as any;
        console.log("[GoodsList] Raw goods categories response:", JSON.stringify(response, null, 2));
        
        let fetchedCategories: DisplayCategory[] = [];
        // Adjusting to handle direct records or nested under data.records
        const records = response?.records || response?.data?.records as any[];

        if (records && Array.isArray(records)) {
          console.log("[GoodsList] Records array found, length:", records.length);
          console.log("[GoodsList] First record example:", records[0]);
          
          fetchedCategories = records.map((cat: any, index: number) => {
            console.log(`[GoodsList] Processing record ${index}:`, cat);
            console.log(`[GoodsList] cat.gdcategoryId:`, cat.gdcategoryId);
            console.log(`[GoodsList] cat.categoryName:`, cat.categoryName);
            
            const mappedCategory = {
              id: String(cat.gdcategoryId),
              name: cat.categoryName || "未知分类",
              icon: <ShoppingBag className="w-4 h-4 mr-2 opacity-70" /> 
            };
            console.log(`[GoodsList] Mapped category ${index}:`, mappedCategory);
            return mappedCategory;
          });
          console.log("[GoodsList] All mapped fetchedCategories:", fetchedCategories);
        } else {
          console.log("[GoodsList] No records found or records is not an array. Response:", response);
        }
        
        const allCategory: DisplayCategory = { id: "0", name: "全部商品", icon: <ShoppingBag className="w-4 h-4 mr-2 opacity-70" /> };
        const newDisplayCategories = [allCategory, ...fetchedCategories];
        console.log("[GoodsList] Final displayGoodsCategories to set:", newDisplayCategories);
        setDisplayGoodsCategories(newDisplayCategories);
        console.log("[GoodsList] setDisplayGoodsCategories called with:", newDisplayCategories.length, "categories");

      } catch (error) {
        console.error("[GoodsList] 获取商品分类失败:", error);
        message.error("获取商品分类失败");
        setDisplayGoodsCategories([{ id: "0", name: "全部商品", icon: <ShoppingBag className="w-4 h-4 mr-2 opacity-70" /> }]);
      } finally {
        setGoodsCategoriesLoading(false);
        console.log("[GoodsList] Goods categories loading finished.");
      }
    };
    fetchAndSetDisplayGoodsCategories();
  }, []);

  // Update activeGoodsCategoryId from URL when categories are loaded
  useEffect(() => {
    if (!goodsCategoriesLoading && displayGoodsCategories.length > 0) {
        const categoryIdFromUrl = searchParams.get("goods_category_id");
        console.log("[GoodsList] URL goods_category_id param:", categoryIdFromUrl);
        if (categoryIdFromUrl && displayGoodsCategories.find(cat => cat.id === categoryIdFromUrl)) {
            if (activeGoodsCategoryId !== categoryIdFromUrl) {
                console.log("[GoodsList] Setting activeGoodsCategoryId from URL param:", categoryIdFromUrl);
                setActiveGoodsCategoryId(categoryIdFromUrl);
            }
        } else if (!categoryIdFromUrl && activeGoodsCategoryId !== "0") {
            console.log("[GoodsList] No goods_category_id in URL, defaulting activeGoodsCategoryId to '0'.");
            setActiveGoodsCategoryId("0");
        }
    }
  }, [searchParams, displayGoodsCategories, goodsCategoriesLoading, activeGoodsCategoryId]);

  const fetchData = async (categoryIdToQuery: string, goodsNameToSearch: string, currentPage: number, pageSize: number) => {
    console.log(`[GoodsList] Fetching data for category ID: ${categoryIdToQuery}, query: ${goodsNameToSearch}, page: ${currentPage}`);
    setLoading(true);
    try {
      const queryParams: API.GoodsQueryRequest = {
        current: currentPage,
        pageSize,
        gdcategoryId: categoryIdToQuery === "0" ? undefined : Number(categoryIdToQuery) as any,
        goodsName: goodsNameToSearch || undefined,
      };
      const response = await listGoodsVoByPageUsingPost(queryParams) as API.PageGoodsVO_;
      console.log("[GoodsList] Goods API response:", JSON.stringify(response, null, 2));
      
      if (response && response.records) {
        setGoods(response.records);
        setPagination(prev => ({
          ...prev,
          total: response.total || 0,
          current: currentPage,
        }));
      } else {
        message.error((response as any)?.message || "获取商品列表失败或列表为空");
        setGoods([]);
        setPagination(prev => ({ ...prev, total: 0, current: 1 }));
      }
    } catch (error: any) {
      console.error("[GoodsList] 获取商品列表失败:", error);
      message.error(error?.message || "获取商品列表失败，请稍后重试");
      setGoods([]);
      setPagination(prev => ({ ...prev, total: 0, current: 1 }));
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch goods when active category or pagination changes
  useEffect(() => {
    if (!goodsCategoriesLoading) {
      console.log("[GoodsList] Fetching goods based on activeGoodsCategoryId:", activeGoodsCategoryId, "searchQuery:", searchQuery, "Page:", pagination.current);
      fetchData(activeGoodsCategoryId, searchQuery, pagination.current, pagination.pageSize);
    }
  }, [activeGoodsCategoryId, searchQuery, pagination.current, pagination.pageSize, goodsCategoriesLoading]);

  const handleGoodsCategoryChange = (newCategoryId: string) => {
    console.log("[GoodsList] Category changed to:", newCategoryId);
    // Clear search when changing category, just like Equipment does
    setSearchQuery("");
    setPagination(prev => ({ ...prev, current: 1 }));
    if (newCategoryId === "0") {
      setSearchParams({});
    } else {
      setSearchParams({ goods_category_id: newCategoryId });
    }
  };

  // Simple search handler without debouncing for now
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPagination(prev => ({ ...prev, current: 1 }));
  };

  // Log when displayGoodsCategories changes
  useEffect(() => {
    console.log("[GoodsList] displayGoodsCategories state updated:", displayGoodsCategories);
  }, [displayGoodsCategories]);

  return (
    <div style={{ 
      position: 'relative',
      margin: '-24px -24px 0',
      width: 'calc(100% + 48px)'
    }}>
      {/* Top Banner */}
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
        <div className="container mx-auto px-4 py-8">
          {/* Category Filters */} 
          {goodsCategoriesLoading ? (
            <div className="flex justify-center items-center py-5 mb-6">
              <Spin tip="加载分类中..." />
            </div>
          ) : (
            <div className="flex flex-wrap gap-3 mb-8 justify-center">
              {displayGoodsCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeGoodsCategoryId === category.id ? "default" : "outline"}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full ${
                    activeGoodsCategoryId === category.id 
                      ? "bg-gym-primary hover:bg-gym-primary/90 text-white"
                      : "border-gym-gray/40 text-gym-gray hover:border-gym-primary hover:text-gym-primary"
                  }`}
                  onClick={() => handleGoodsCategoryChange(category.id)}
                >
                  {category.icon}
                  {category.name}
                </Button>
              ))}
            </div>
          )}

          {/* Search Bar */}
          <div className="flex items-center gap-4 mb-8 max-w-md mx-auto">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gym-gray" />
              <Input
                type="text"
                placeholder="搜索商品名称..."
                value={searchQuery}
                onChange={handleSearchChange}
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
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Spin size="large" tip="加载商品中..." />
            </div>
          ) : (
            <>
              {goods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {goods.map((item) => {
                    return (
                      <Card key={item.goodsId} className="overflow-hidden hover-scale flex flex-col">
                        <div className="relative h-60 overflow-hidden bg-gray-100 border flex items-center justify-center">
                          {item.goodAvatar ? (
                  <img 
                    src={item.goodAvatar} 
                              alt={item.goodsName || '商品图片'}
                    className="w-full h-full object-cover"
                              onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder-image.png'; }}
                            />
                          ) : (
                            <Package size={48} className="text-gray-400" />
                          )}
                        </div>
                        {item.inventory !== undefined && item.inventory <= 10 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded-md">
                      库存紧张: {item.inventory}件
                    </div>
                  )}
                        <CardContent className="pt-6 flex-grow">
                          {item.categoryName && (
                            <p className="text-xs text-gym-primary mb-1">{item.categoryName}</p>
                          )}
                          <h3 className="text-xl font-bold mb-2 truncate" title={item.goodsName || ''}>{item.goodsName}</h3>
                          <p className="text-gym-accent font-bold text-lg mb-1">
                            ¥{item.sellPrice !== undefined ? item.sellPrice.toFixed(2) : 'N/A'}
                          </p>
                          <p className="text-gym-gray text-sm mb-2">
                            库存: {item.inventory !== undefined ? `${item.inventory}件` : 'N/A'}
                          </p>
                          {item.remark && (
                             <p className="text-xs text-gray-500 line-clamp-2" title={item.remark}>{item.remark}</p>
                          )}
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full border-gym-primary text-gym-primary hover:bg-gym-primary hover:text-white"
                    asChild
                  >
                            <Link to={`/goods/${item.goodsId}`}>查看详情</Link>
                  </Button>
                </CardFooter>
              </Card>
                    );
                  })}
          </div>
              ) : (
            <div className="text-center py-16">
                  <Empty description={false} image={<Package className="w-16 h-16 text-gym-gray mx-auto mb-4" />}>
              <h3 className="text-2xl font-bold mb-2">未找到商品</h3>
              <p className="text-gym-gray">
                      没有找到符合搜索条件的商品，请尝试其他关键词或分类。
              </p>
                    { (searchQuery || activeGoodsCategoryId !== '0') && (
              <Button 
                className="mt-4 bg-gym-primary hover:bg-gym-primary/90"
                        onClick={() => {
                          setSearchQuery("");
                          handleGoodsCategoryChange("0"); // Reset category to all
                        }}
              >
                        清除所有筛选条件
              </Button>
                    )}
                  </Empty>
            </div>
              )}
            </>
          )}
        </div>
      </PageContainer>
    </div>
  );
};

export default GoodsList;
