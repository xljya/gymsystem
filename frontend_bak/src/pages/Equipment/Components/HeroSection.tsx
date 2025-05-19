import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-gym-primary overflow-hidden">
      {/* Background overlay with image */}
      <div 
        className="absolute inset-0 bg-black opacity-50 z-0"
        style={{
          backgroundImage: "url('https://img.28082003.com//xlxlimg_1747424873151_0.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "overlay"
        }}
      ></div>
      
      <div className="gym-container relative z-10 py-20 md:py-32">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            专业健身器械<span className="text-gym-accent">展示平台</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/80">
            提供高品质健身器材展示，助您打造理想的健身环境
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-gym-accent hover:bg-gym-accent/90 text-white rounded-md"
              asChild
            >
              <Link to="/equipment/all">
                <span>浏览器械</span>
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
