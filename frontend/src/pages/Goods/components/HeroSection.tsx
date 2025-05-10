
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gym-primary overflow-hidden">
      {/* Background overlay with image */}
      <div 
        className="absolute inset-0 bg-black opacity-50 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2670&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "overlay"
        }}
      ></div>
      
      <div className="gym-container relative z-10 py-20 md:py-32">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            专业商品<span className="text-blue-500">展示平台</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/80">
            提供高品质商品展示，助您购买心仪的产品
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-md"
              asChild
            >
              <Link to="/goods/all" className="flex items-center">
                <ShoppingBag className="mr-2 h-4 w-4" />
                <span>浏览商品</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white/10"
              asChild
            >
              <Link to="/about">了解更多</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
