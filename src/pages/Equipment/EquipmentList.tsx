import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Dumbbell, Bike, HelpCircle } from "lucide-react";
import { PageContainer } from "@ant-design/pro-components";
import { Spin, message, Empty } from "antd";
import { listEquipmentVoByPageUsingPost } from "@/api/equipmentController";
import { listEquipmentCategoryVoByPageUsingPost } from "@/api/equipmentCategoryController";

// Interface for frontend display categories
interface DisplayCategory {
  id: string; // Store all IDs as strings for consistency ('0' for all)
  name: string;
  icon?: JSX.Element;
}

// Original static categories with icons for mapping
const staticCategoriesWithIcons = [
  { id: "all", name: "全部", icon: <Dumbbell className="w-5 h-5" /> }, // This will be manually added
  { name: "有氧器械", icon: <Bike className="w-5 h-5" /> },
  { name: "力量器械", icon: <Dumbbell className="w-5 h-5" /> },
  { name: "功能性训练器械", icon: <Dumbbell className="w-5 h-5" /> }, // Matched by name
  { name: "健身配件", icon: <Bike className="w-5 h-5" /> }, // Matched by name
];

const getIconForCategory = (categoryName?: string): JSX.Element => {
  if (!categoryName) return <HelpCircle className="w-5 h-5" />;
  const found = staticCategoriesWithIcons.find(sc => sc.name === categoryName);
  return found && found.icon ? found.icon : <HelpCircle className="w-5 h-5" />;
};

const EquipmentList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [displayCategories, setDisplayCategories] = useState<DisplayCategory[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  const [activeCategoryId, setActiveCategoryId] = useState<string>(() => searchParams.get("category_id") || "0");

  const [equipments, setEquipments] = useState<API.EquipmentVO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 12,
    total: 0,
  });

  useEffect(() => {
    console.log("[EquipmentList] Initial activeCategoryId from state/URL:", activeCategoryId);
  }, []); // Log initial activeCategoryId once

  useEffect(() => {
    const fetchAndSetDisplayCategories = async () => {
      console.log("[EquipmentList] Fetching equipment categories...");
      setCategoriesLoading(true);
      try {
        // Type assertion to any because the actual API response might not match the generated type perfectly
        const response = await listEquipmentCategoryVoByPageUsingPost({ current: 1, pageSize: 50 }) as any;
        console.log("[EquipmentList] Raw categories response:", JSON.stringify(response, null, 2));
        
        let fetchedCategories: DisplayCategory[] = [];
        // Adjusting to handle direct records or nested under data.records
        const records = response?.records || response?.data?.records as any[];

        if (records && Array.isArray(records)) {
          console.log("[EquipmentList] Records array found, length:", records.length);
          console.log("[EquipmentList] First record example:", records[0]);
          
          fetchedCategories = records.map((cat: any, index: number) => {
            console.log(`[EquipmentList] Processing record ${index}:`, cat);
            console.log(`[EquipmentList] cat.eqcategoryId:`, cat.eqcategoryId);
            console.log(`[EquipmentList] cat.categoryName:`, cat.categoryName);
            
            const mappedCategory = {
              id: String(cat.eqcategoryId), 
              name: cat.categoryName || "未知分类", 
              icon: getIconForCategory(cat.categoryName),
            };
            console.log(`[EquipmentList] Mapped category ${index}:`, mappedCategory);
            return mappedCategory;
          });
          console.log("[EquipmentList] All mapped fetchedCategories:", fetchedCategories);
        } else {
          console.log("[EquipmentList] No records found or records is not an array. Response:", response);
        }

        const allCategory: DisplayCategory = { id: "0", name: "全部", icon: getIconForCategory("全部") };
        const newDisplayCategories = [allCategory, ...fetchedCategories];
        console.log("[EquipmentList] Final displayCategories to set:", newDisplayCategories);
        setDisplayCategories(newDisplayCategories);
        console.log("[EquipmentList] setDisplayCategories called with:", newDisplayCategories.length, "categories");

      } catch (error) {
        console.error("[EquipmentList] 获取器械分类失败:", error);
        message.error("获取器械分类失败");
        setDisplayCategories([{ id: "0", name: "全部", icon: getIconForCategory("全部") }]);
      } finally {
        setCategoriesLoading(false);
        console.log("[EquipmentList] Categories loading finished.");
      }
    };
    fetchAndSetDisplayCategories();
  }, []);

  useEffect(() => {
    // This effect updates activeCategoryId based on URL changes AFTER categories are loaded.
    if (!categoriesLoading && displayCategories.length > 0) {
        const categoryIdFromUrl = searchParams.get("category_id");
        console.log("[EquipmentList] URL category_id param:", categoryIdFromUrl);
        if (categoryIdFromUrl && displayCategories.find(cat => cat.id === categoryIdFromUrl)) {
            if (activeCategoryId !== categoryIdFromUrl) {
                console.log("[EquipmentList] Setting activeCategoryId from URL param:", categoryIdFromUrl);
                setActiveCategoryId(categoryIdFromUrl);
            }
        } else if (!categoryIdFromUrl && activeCategoryId !== "0") {
            console.log("[EquipmentList] No category_id in URL, defaulting activeCategoryId to '0'.");
            setActiveCategoryId("0");
        }
    }
  }, [searchParams, displayCategories, categoriesLoading, activeCategoryId]);

  const fetchData = async (categoryIdToQuery: string, currentPage: number, pageSize: number) => {
    console.log(`[EquipmentList] Fetching data for category ID: ${categoryIdToQuery}, page: ${currentPage}`);
    setLoading(true);
    try {
      const queryParams: API.EquipmentQueryRequest = {
        current: currentPage,
        pageSize,
        // Using 'as any' for eqcategoryId temporarily. IMPORTANT: Resolve Linter/type issue.
        eqcategoryId: categoryIdToQuery === "0" ? undefined : Number(categoryIdToQuery) as any,
      };
      const response = await listEquipmentVoByPageUsingPost(queryParams) as API.PageEquipmentVO_;
      console.log("[EquipmentList] Equipments API response:", JSON.stringify(response, null, 2));
      
      if (response && response.records) {
        setEquipments(response.records);
        setPagination(prev => ({
          ...prev,
          total: response.total || 0,
          current: currentPage,
        }));
      } else {
        message.error((response as any)?.message || "获取器械列表失败或列表为空");
        setEquipments([]);
        setPagination(prev => ({ ...prev, total: 0, current: 1 }));
      }
    } catch (error: any) {
      console.error("[EquipmentList] 获取器械列表失败:", error);
      message.error(error?.message || "获取器械列表失败，请稍后重试");
      setEquipments([]);
      setPagination(prev => ({ ...prev, total: 0, current: 1 }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!categoriesLoading) {
      console.log("[EquipmentList] Fetching equipments based on activeCategoryId:", activeCategoryId, "Page:", pagination.current);
      fetchData(activeCategoryId, pagination.current, pagination.pageSize);
    }
  }, [activeCategoryId, pagination.current, pagination.pageSize, categoriesLoading]);

  const handleCategoryChange = (newCategoryId: string) => {
    console.log("[EquipmentList] Category changed to:", newCategoryId);
    // No need to set activeCategoryId here, it will be set by the useEffect watching searchParams
    // setActiveCategoryId(newCategoryId); 
    setPagination(prev => ({ ...prev, current: 1 }));
    if (newCategoryId === "0") {
      setSearchParams({});
    } else {
      setSearchParams({ category_id: newCategoryId });
    }
  };
  
  // Log when displayCategories changes
  useEffect(() => {
    console.log("[EquipmentList] displayCategories state updated:", displayCategories);
  }, [displayCategories]);

  return (
    <div style={{ 
      position: 'relative',
      margin: '-24px -24px 0',
      width: 'calc(100% + 48px)'
    }}>
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
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">器械展示</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            探索我们丰富多样的健身器械，为您的健身房打造完美配置
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
          {categoriesLoading ? (
            <div className="flex justify-center items-center py-10">
              <Spin tip="加载分类中..." />
            </div>
          ) : (
            <div className="flex flex-wrap gap-3 mb-10 justify-center">
              {displayCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategoryId === category.id ? "default" : "outline"}
                  className={`flex items-center gap-2 ${
                    activeCategoryId === category.id 
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
          )}
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Spin size="large" tip="加载器械中..." />
            </div>
          ) : (
            <>
              {equipments.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {equipments.map((item: any) => ( // Using item: any temporarily for image and categoryName
                    <Card key={item.eqId} className="overflow-hidden hover-scale flex flex-col">
                      <div className="relative h-60 overflow-hidden bg-gray-100 border flex items-center justify-center p-1">
                        <img 
                          src={item.image || '/placeholder-image.png'} 
                          alt={item.eqName || '器械图片'}
                          className="w-full h-full object-contain"
                          onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder-image.png'; }}
                        />
                      </div>
                      <CardContent className="pt-6 flex-grow">
                        {item.categoryName && (
                          <p className="text-xs text-gym-primary mb-1">{item.categoryName}</p>
                        )}
                        <h3 className="text-xl font-bold mb-2 truncate" title={item.eqName || ''}>{item.eqName}</h3>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          variant="outline" 
                          className="w-full border-gym-primary text-gym-primary hover:bg-gym-primary hover:text-white"
                          asChild
                        >
                          <Link to={`/equipment/${item.eqId}`}>查看详情</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Empty description={false} image={<Dumbbell className="w-16 h-16 text-gym-gray mx-auto mb-4" />} >
                    <h3 className="text-2xl font-bold mb-2">未找到器械</h3>
                    <p className="text-gym-gray">
                      当前分类下没有可用的器械，请尝试其他分类
                    </p>
                    <Button 
                      className="mt-4 bg-gym-primary hover:bg-gym-primary/90"
                      onClick={() => handleCategoryChange("0")}
                    >
                      查看所有器械
                    </Button>
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

export default EquipmentList;
