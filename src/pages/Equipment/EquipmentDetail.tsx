/* eslint-disable react/button-has-type */

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, PackageSearch } from "lucide-react";
import { Spin, message, Empty } from "antd";
import { getEquipmentVoByIdUsingGet } from "@/api/equipmentController";

// 器械详情页
const EquipmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [equipment, setEquipment] = useState<API.EquipmentVO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      const fetchDetail = async () => {
        setLoading(true);
        try {
          const equipmentId = Number(id);
          if (isNaN(equipmentId)) {
            message.error("无效的器械ID");
            setEquipment(null);
            navigate("/equipment");
            return;
          }
          const response = await getEquipmentVoByIdUsingGet({ eqId: equipmentId });
          let equipmentData: API.EquipmentVO | null | undefined = null;
          if (response && typeof (response as any).code === 'number') {
            if ((response as API.BaseResponseEquipmentVO_).code === 0) {
              equipmentData = (response as API.BaseResponseEquipmentVO_).data;
            } else {
              message.error((response as API.BaseResponseEquipmentVO_).message || "获取器械详情失败");
            }
          } else if (response && (response as API.EquipmentVO).eqId) {
            equipmentData = response as API.EquipmentVO;
          }

          if (equipmentData) {
            setEquipment(equipmentData);
          } else {
            if (!(response && typeof (response as any).code === 'number')) {
                message.error("获取器械详情失败或数据为空");
            }
            setEquipment(null);
          }
        } catch (error: any) {
          console.error("获取器械详情失败:", error);
          message.error(error?.message || "获取器械详情失败，请稍后重试");
          setEquipment(null);
        } finally {
          setLoading(false);
        }
      };
      fetchDetail();
    } else {
      message.error("未提供器械ID");
      setLoading(false);
      navigate("/equipment");
    }
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
        <Spin size="large" tip="加载器械详情中..." />
      </div>
    );
  }
  
  if (!equipment) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center p-8">
        <Empty
          image={<PackageSearch className="w-24 h-24 text-gym-gray opacity-50 mx-auto" />}
          description={
            <>
              <h2 className="text-2xl font-bold mb-3 text-gym-gray-dark">器械未找到</h2>
              <p className="text-gym-gray mb-6">抱歉，您查找的器械不存在或已被移除。</p>
            </>
          }
        >
          <Button 
            onClick={() => navigate("/equipment")}
            className="bg-gym-primary hover:bg-gym-primary/90"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回器械列表
          </Button>
        </Empty>
      </div>
    );
  }
  
  const renderSection = (title: string, content: string | undefined | null) => {
    if (!content) return null;
    return (
      <div>
        <h3 className="text-lg font-semibold text-gym-primary mb-1 mt-3">{title}</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-150px)] flex flex-col">
      <main className="flex-grow py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button 
              variant="outline"
              className="flex items-center text-gym-gray hover:text-gym-primary border-gym-gray/30 hover:border-gym-primary"
              onClick={() => navigate("/equipment")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回器械列表
            </Button>
          </div>

          <div className="bg-white shadow-xl rounded-lg p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-4">
                <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 border p-2 flex items-center justify-center">
                  <img 
                    src={equipment.image || '/placeholder-image.png'}
                    alt={equipment.eqName || '器械图片'}
                    className="max-w-full max-h-[500px] object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder-image.png'; }}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                {equipment.categoryName && (
                  <p className="text-sm text-gym-accent font-medium mb-1">{equipment.categoryName}</p>
                )}
                <h1 className="text-3xl md:text-4xl font-bold text-gym-primary-dark mb-3">{equipment.eqName}</h1>
                
                {equipment.shortDescription && (
                  <p className="text-gray-600 text-lg mb-4">{equipment.shortDescription}</p>
                )}

                <Separator className="my-6" />
                
                <div className="space-y-4 text-sm">
                  <p>
                    <span className="font-semibold text-gray-600">设备ID:</span> {equipment.eqId}
                  </p>
                  {renderSection("详细描述", equipment.description)}
                  {renderSection("特性", equipment.features)}
                  {renderSection("规格参数", equipment.specifications)}
                  {equipment.createTime && (
                    <p className="mt-3">
                      <span className="font-semibold text-gray-600">上架日期:</span> {new Date(equipment.createTime).toLocaleDateString()}
                    </p>
                  )}
                </div>
                
                <div className="mt-auto pt-8">
                  <Button 
                    size="lg" 
                    className="w-full bg-gym-primary hover:bg-gym-primary/90 text-white py-3"
                    onClick={() => message.info('如需帮助或报修，请联系管理员。')}
                  >
                    获取帮助 / 报修
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EquipmentDetail;
