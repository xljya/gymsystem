import { Card, CardContent } from '@/components/ui/card';
import { PageContainer } from '@ant-design/pro-components';
import { Dumbbell } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div
        className="bg-gym-primary text-white py-16 w-full"
        style={{
          position: 'relative',
          zIndex: 10,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          paddingTop: '8rem',
          paddingBottom: '4rem',
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">关于我们</h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            一站式健身房管理系统，为您的健身之旅提供全方位支持
          </p>
        </div>
      </div>

      <PageContainer
        header={{
          title: false,
          breadcrumb: {},
        }}
        style={{
          backgroundColor: 'transparent',
          padding: 0,
        }}
      >
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">我们的使命</h2>
              <p className="text-gym-gray mb-4">
                我们致力于打造一个全方位的健身体验平台，集多样化课程、专业教练指导、优质器械展示和健身用品销售于一体。我们的目标是让每一位会员都能找到适合自己的健身方式，实现健康生活。
              </p>
              <p className="text-gym-gray">
                无论您是健身初学者还是资深健身爱好者，我们的平台都能为您提供从课程预约、教练选择到器械指导的一站式服务，让您的健身之旅更加便捷和高效。
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://cdn.jsdelivr.net/gh/xljya/image/post/xlimg_1749058855565_17.jpg"
                alt="健身房环境"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="text-center mb-16">
            <Dumbbell className="w-16 h-16 text-gym-accent mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">我们的优势</h2>
            <p className="text-gym-gray max-w-2xl mx-auto mb-10">
              多年来，我们不断创新和完善，为会员提供卓越的健身体验
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: '多样化课程',
                  description: '提供从瑜伽、力量训练到有氧运动等多种类型的专业课程，满足不同会员的健身需求',
                },
                {
                  title: '专业教练团队',
                  description: '拥有经验丰富的教练团队，提供一对一指导和小组课程，帮助会员科学健身',
                },
                {
                  title: '综合服务体系',
                  description: '集课程预约、器械展示、商品销售于一体，为会员提供便捷的一站式健身服务',
                },
              ].map((advantage) => (
                <Card
                  key={advantage.title}
                  className="overflow-hidden hover-scale border border-gray-200 rounded-lg shadow-md text-left"
                >
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-black mb-3">{advantage.title}</h3>
                    <p className="text-gym-gray">{advantage.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1 rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://cdn.jsdelivr.net/gh/xljya/image/post/xlimg_1749058855563_15.jpg"
                alt="专业团队"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="order-1 lg:order-2 text-left lg:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">我们的团队</h2>
              <p className="text-gym-gray mb-4">
                我们的团队由健身行业的专业人士组成，包括资深教练、健身顾问和客户服务专家。他们不仅拥有专业知识，更致力于为每位会员提供个性化的健身指导。
              </p>
              <p className="text-gym-gray">
                从会员注册到课程选择，从器械使用到健身计划制定，我们的团队将全程陪伴您的健身旅程，确保您获得最佳的健身效果和体验。
              </p>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default About;
