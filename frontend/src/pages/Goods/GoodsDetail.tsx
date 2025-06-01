import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Package, ShoppingCart, PackageSearch } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Spin, message, Empty } from "antd";
import { getGoodsVoByIdUsingGet } from "@/api/goodsController";
import { addGoodsTransactionsUsingPost } from "@/api/goodsTransactionsController";
import { useModel } from '@umijs/max';

const GoodsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser as API.LoginMemberVO | undefined;

  const [goods, setGoods] = useState<API.GoodsVO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      const fetchGoodsDetail = async () => {
        setLoading(true);
        try {
          const goodsId = Number(id);
          if (isNaN(goodsId)) {
            message.error("无效的商品ID");
            setGoods(null);
            navigate("/goods");
            return;
          }
          const response = await getGoodsVoByIdUsingGet({ goodsId });
          let goodsData: API.GoodsVO | null | undefined = null;

          if (response && typeof (response as any).code === 'number') {
            if ((response as API.BaseResponseGoodsVO_).code === 0) {
              goodsData = (response as API.BaseResponseGoodsVO_).data;
            } else {
              message.error((response as API.BaseResponseGoodsVO_).message || "获取商品详情失败");
            }
          } else if (response && (response as API.GoodsVO).goodsId) {
            goodsData = response as API.GoodsVO;
          }

          if (goodsData) {
            setGoods(goodsData);
          } else {
            if (!(response && typeof (response as any).code === 'number')) {
                message.error("获取商品详情失败或数据为空");
            }
            setGoods(null);
          }
        } catch (error: any) {
          console.error("获取商品详情失败:", error);
          message.error(error?.message || "获取商品详情失败，请稍后重试");
          setGoods(null);
        } finally {
          setLoading(false);
        }
      };
      fetchGoodsDetail();
    } else {
        message.error("未提供商品ID");
        setLoading(false);
        navigate("/goods");
    }
  }, [id, navigate]);

  const handleQuantityChange = (change: number) => {
    if (!goods || goods.inventory === undefined) return;
    const newQuantity = quantity + change;
    if (newQuantity > 0 && newQuantity <= goods.inventory) {
      setQuantity(newQuantity);
    }
  };
  
  const handlePurchase = async () => {
    if (!goods || goods.goodsId === undefined || goods.sellPrice === undefined) {
      toast({ title: "商品信息错误", description: "无法完成购买", variant: "destructive" });
      return;
    }

    if (!currentUser || currentUser.id === undefined) {
      toast({ title: "用户未登录", description: "请登录后购买", variant: "destructive" });
      return;
    }

    if (goods.inventory === undefined || quantity > goods.inventory) {
      toast({
        title: "库存不足",
        description: `当前库存仅剩${goods.inventory === undefined ? '未知' : goods.inventory}件`,
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const transactionData: API.GoodsTransactionsAddRequest = {
        goodsId: goods.goodsId,
        count: quantity,
        memberId: currentUser.id,
        price: goods.sellPrice * quantity,
      };

      const responseData = await addGoodsTransactionsUsingPost(transactionData);
      console.log('Response data in handlePurchase as received:', responseData);

      if (responseData && !isNaN(Number(responseData))) {
        toast({
          title: "购买成功!",
          description: `您已成功购买 ${quantity} 件 ${goods.goodsName || '商品'}`,
          variant: "default",
        });
        setQuantity(1);
        if (id) {
          const goodsId = Number(id);
          const updatedGoodsResponse = await getGoodsVoByIdUsingGet({ goodsId });
          let updatedGoodsData: API.GoodsVO | null | undefined = null;
          if (updatedGoodsResponse && typeof (updatedGoodsResponse as any).code === 'number') {
            if ((updatedGoodsResponse as API.BaseResponseGoodsVO_).code === 0) {
              updatedGoodsData = (updatedGoodsResponse as API.BaseResponseGoodsVO_).data;
            }
          } else if (updatedGoodsResponse && (updatedGoodsResponse as API.GoodsVO).goodsId) {
            updatedGoodsData = updatedGoodsResponse as API.GoodsVO;
          }
          if (updatedGoodsData) setGoods(updatedGoodsData);
        }
      } else {
        throw new Error("购买失败，请稍后重试");
      }
    } catch (error: any) {
      console.error("购买失败:", error);
      toast({
        title: "购买失败",
        description: error.message || "请稍后再试",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
        <Spin size="large" tip="加载商品详情中..." />
      </div>
    );
  }
  
  if (!goods) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center p-8">
        <Empty
          image={<PackageSearch className="w-24 h-24 text-gym-gray opacity-50 mx-auto" />}
          description={
            <>
              <h2 className="text-2xl font-bold mb-3 text-gym-gray-dark">商品未找到</h2>
              <p className="text-gym-gray mb-6">抱歉，您查找的商品不存在或已被移除。</p>
            </>
          }
        >
          <Button 
            onClick={() => navigate("/goods")}
            className="bg-gym-primary hover:bg-gym-primary/90"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回商品列表
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
              onClick={() => navigate("/goods")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回商品列表
            </Button>
          </div>

          <div className="bg-white shadow-xl rounded-lg p-6 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="space-y-4">
                <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 border p-2 flex items-center justify-center">
                  {goods.goodAvatar ? (
                    <img 
                      src={goods.goodAvatar}
                      alt={goods.goodsName || '商品图片'}
                      className="max-w-full max-h-[500px] object-contain"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder-image.png'; }}
                    />
                  ) : (
                    <Package size={64} className="text-gray-400" />
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                {goods.categoryName && (
                  <p className="text-sm text-gym-accent font-medium mb-1">{goods.categoryName}</p>
                )}
                <h1 className="text-3xl md:text-4xl font-bold text-gym-primary-dark mb-2">{goods.goodsName || '商品名称'}</h1>
                
                <p className="text-gym-accent text-2xl font-bold mb-2">
                  ¥{goods.sellPrice !== undefined ? goods.sellPrice.toFixed(2) : '价格待定'}
                  {goods.unit && <span className="text-sm text-gray-500"> /{goods.unit}</span>}
                </p>
                <p className="text-gym-gray mb-1">
                  库存: {goods.inventory !== undefined ? goods.inventory : '未知'} {goods.unit || '件'}
                </p>
                
                <Separator className="my-5" />

                {renderSection("商品特点", goods.features)}
                {renderSection("规格参数", goods.specifications)}
                {renderSection("备注信息", goods.remark)}

                {goods.createTime && (
                    <p className="text-xs text-gray-500 mt-4">
                      上架日期: {new Date(goods.createTime).toLocaleDateString()}
                    </p>
                )}
                
                <div className="mt-auto pt-8">
                  {goods.inventory !== undefined && goods.inventory > 0 ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="quantity" className="text-base">购买数量:</Label>
                        <div className="flex items-center">
                          <Button 
                            variant="outline"
                            size="icon"
                            className="w-10 h-10 rounded-full"                            
                            onClick={() => handleQuantityChange(-1)}
                            disabled={quantity <= 1}
                          >
                            -
                          </Button>
                          <Input
                            id="quantity"
                            type="number"
                            className="w-16 h-10 mx-2 text-center text-base appearance-none [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            value={quantity}
                            min={1}
                            max={goods.inventory || 1}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              const maxInventory = goods.inventory !== undefined ? goods.inventory : 1;
                              if (!isNaN(val) && val > 0 && val <= maxInventory) {
                                setQuantity(val);
                              } else if (e.target.value === '') {
                                 setQuantity(1); 
                              }
                            }}
                            onBlur={(e) => { 
                                const val = parseInt(e.target.value);
                                if (e.target.value === '' || isNaN(val) || val < 1) {
                                    setQuantity(1);
                                }
                            }}
                          />
                          <Button 
                            variant="outline"
                            size="icon"
                            className="w-10 h-10 rounded-full"
                            onClick={() => handleQuantityChange(1)}
                            disabled={quantity >= (goods.inventory || 0)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      
                      <Button 
                        size="lg" 
                        className="w-full bg-gym-primary hover:bg-gym-primary/90 text-white py-3 flex items-center gap-2"
                        onClick={handlePurchase}
                        disabled={isSubmitting || goods.inventory === 0}
                      >
                        {isSubmitting ? <Spin size="small" /> : <ShoppingCart className="w-5 h-5"/>}
                        {isSubmitting ? "正在处理订单..." : "立即购买"}
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      size="lg" 
                      className="w-full bg-gray-400 cursor-not-allowed text-white py-3"
                      disabled
                    >
                      暂时缺货
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
   
    </div>
  );
};

export default GoodsDetail;
