
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";


import { goodsData } from "@/data/goodsData";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Package, Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";


const GoodsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [userCode, setUserCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const goods = goodsData.find(item => item.id === id);
  
  if (!goods) {
    return (
      <div className="min-h-screen flex flex-col">
      
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">商品未找到</h2>
            <p className="text-gray-600 mb-8">抱歉，您查找的商品不存在或已被移除</p>
            <Button 
              onClick={() => navigate("/goods")}
              className="bg-gym-primary hover:bg-gym-primary/90"
            >
              返回商品列表
            </Button>
          </div>
        </div>
        
      </div>
    );
  }
  
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0 && newQuantity <= goods.inventory) {
      setQuantity(newQuantity);
    }
  };
  
  const handlePurchase = async () => {
    if (userCode !== "liucf") {
      toast({
        title: "验证错误",
        description: "请输入正确的购买码",
        variant: "destructive"
      });
      return;
    }
    
    if (quantity > goods.inventory) {
      toast({
        title: "库存不足",
        description: `当前库存仅剩${goods.inventory}件`,
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // 模拟 API 请求
      await new Promise(resolve => {setTimeout(resolve, 1000)});
      
      // 这里是模拟 addGoodsTransactionsUsingPost 请求
      // 实际集成时替换为真实 API 调用
      console.log("购买成功", {
        goodsId: goods.id,
        quantity: quantity,
        totalPrice: goods.sellPrice * quantity
      });
      
      toast({
        title: "购买成功",
        description: `您已成功购买${quantity}件${goods.goodsName}`,
        variant: "default"
      });
      
      setQuantity(1);
      setUserCode("");
    } catch (error) {
      console.error("购买失败", error);
      toast({
        title: "购买失败",
        description: "请稍后再试",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <Link to="/goods">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回商品列表
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left: Image */}
            <div className="aspect-square overflow-hidden rounded-lg bg-gym-light">
              <img 
                src={goods.remark} 
                alt={goods.goodsName} 
                className="w-full h-full object-contain"
              />
            </div>

            {/* Right: Info */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{goods.goodsName}</h1>
              <p className="text-gym-accent text-2xl font-bold mb-2">¥{goods.sellPrice}</p>
              <p className="text-gym-gray mb-4">
                库存: {goods.inventory} 件
              </p>
              <p className="text-lg mb-6">{goods.description}</p>
              
              <Separator className="my-6" />
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="quantity">购买数量</Label>
                  <div className="flex items-center">
                    <Button 
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <Input
                      id="quantity"
                      type="number"
                      className="w-20 mx-2 text-center"
                      value={quantity}
                      min={1}
                      max={goods.inventory}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val) && val > 0 && val <= goods.inventory) {
                          setQuantity(val);
                        }
                      }}
                    />
                    <Button 
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= goods.inventory}
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="code">购买码</Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="输入 'liucf' 进行购买"
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                  />
                  <p className="text-sm text-gym-gray">提示: 输入 "liucf" 即可购买</p>
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full bg-gym-primary hover:bg-gym-primary/90"
                  onClick={handlePurchase}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "处理中..." : "立即购买"}
                </Button>
              </div>
              
              <Separator className="my-6" />
              
              <Tabs defaultValue="features">
                <TabsList className="mb-6">
                  <TabsTrigger value="features">商品特点</TabsTrigger>
                  <TabsTrigger value="specifications">规格参数</TabsTrigger>
                </TabsList>
                
                <TabsContent value="features">
                  <Card>
                    <CardContent className="pt-6">
                      <ul className="space-y-2">
                        {goods.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-gym-accent rounded-full mt-2 flex-shrink-0"></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="specifications">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(goods.specifications).map(([key, value]) => (
                          <div key={key} className="border-b pb-2">
                            <span className="font-medium">{key}:</span> {value}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    
    </div>
  );
};

export default GoodsDetail;
