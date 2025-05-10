import Footer from "@/components/Footer";
import { Dumbbell } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <div className="bg-gym-primary text-white py-16">
        <div className="gym-container text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">关于我们</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            专业的健身器械展示平台，为您的健身需求提供最佳解决方案
          </p>
        </div>
      </div>
      <main className="flex-grow py-12">
        <div className="gym-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">我们的使命</h2>
              <p className="text-gray-700 mb-4">
                我们致力于为健身爱好者和专业健身场所提供高品质的健身器械解决方案。通过我们的专业展示平台，您可以了解各类健身器械的详细信息，帮助您做出明智的选择。
              </p>
              <p className="text-gray-700">
                无论您是想打造家庭健身房，还是建设专业的商业健身中心，我们都能为您提供专业的建议和解决方案，让您的健身环境更加完善。
              </p>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1534258936925-c58bed479fcb?q=80&w=2631&auto=format&fit=crop"
                alt="健身房环境" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          
          <div className="text-center mb-16">
            <Dumbbell className="w-16 h-16 text-gym-accent mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">我们的优势</h2>
            <p className="text-gray-700 max-w-2xl mx-auto mb-10">
              多年来，我们一直专注于健身器械领域，积累了丰富的经验和专业知识
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gym-light p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">专业知识</h3>
                <p className="text-gray-700">
                  我们的团队拥有多年的健身行业经验，对各类健身器械有深入的了解
                </p>
              </div>
              <div className="bg-gym-light p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">优质器材</h3>
                <p className="text-gray-700">
                  我们只展示高品质的健身器械，确保您获得最佳的健身体验
                </p>
              </div>
              <div className="bg-gym-light p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">专业服务</h3>
                <p className="text-gray-700">
                  我们提供专业的咨询服务，帮助您选择最适合的健身器械
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1 rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=2670&auto=format&fit=crop" 
                alt="专业团队" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">我们的团队</h2>
              <p className="text-gray-700 mb-4">
                我们的团队由健身行业的专业人士组成，包括健身教练、器械工程师和健身顾问。他们拥有丰富的经验和专业知识，可以为您提供最专业的建议。
              </p>
              <p className="text-gray-700">
                无论您是健身初学者还是资深健身爱好者，我们的团队都能理解您的需求，为您提供最适合的健身器械解决方案。
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
