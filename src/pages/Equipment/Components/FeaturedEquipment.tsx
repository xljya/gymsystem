
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { equipmentData } from "@/data/equipmentData";

const FeaturedEquipment = () => {
  // Get 4 featured items
  const featuredItems = equipmentData.filter(item => item.featured).slice(0, 4);
  
  return (
    <section className="py-16" style={{ backgroundColor: "#F9FAFB" }}>
      <div className="gym-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">精选器械</h2>
          <p className="text-lg text-gym-gray max-w-2xl mx-auto">
            高品质的健身器械助您实现健身目标，打造理想身材
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item) => (
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
        
        <div className="text-center mt-10">
          <Button 
            size="lg"
            className="bg-gym-primary hover:bg-gym-primary/90"
            asChild
          >
            <Link to="/equipment/all">
              <span>浏览全部器械</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEquipment;
