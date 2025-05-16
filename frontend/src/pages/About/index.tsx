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
            专业的健身房系统，为您的健身需求提供最佳解决方案
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
                我们致力于为健身爱好者和专业健身场所提供高品质的健身器械解决方案。通过我们的专业展示平台，您可以了解各类健身器械的详细信息，帮助您做出明智的选择。
              </p>
              <p className="text-gym-gray">
                无论您是想打造家庭健身房，还是建设专业的商业健身中心，我们都能为您提供专业的建议和解决方案，让您的健身环境更加完善。
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://img.28082003.com//xlxlimg_1747424592095_15.jpg"
                alt="健身房环境"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="text-center mb-16">
            <Dumbbell className="w-16 h-16 text-gym-accent mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">我们的优势</h2>
            <p className="text-gym-gray max-w-2xl mx-auto mb-10">
              多年来，我们一直专注于健身器械领域，积累了丰富的经验和专业知识
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: '专业知识',
                  description: '我们的团队拥有多年的健身行业经验，对各类健身器械有深入的了解',
                },
                {
                  title: '优质器材',
                  description: '我们只展示高品质的健身器械，确保您获得最佳的健身体验',
                },
                {
                  title: '专业服务',
                  description: '我们提供专业的咨询服务，帮助您选择最适合的健身器械',
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
                src="https://img.28082003.com//xlxlimg_1747424592093_13.jpg"
                alt="专业团队"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="order-1 lg:order-2 text-left lg:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">我们的团队</h2>
              <p className="text-gym-gray mb-4">
                我们的团队由健身行业的专业人士组成，包括健身教练、器械工程师和健身顾问。他们拥有丰富的经验和专业知识，可以为您提供最专业的建议。
              </p>
              <p className="text-gym-gray">
                无论您是健身初学者还是资深健身爱好者，我们的团队都能理解您的需求，为您提供最适合的健身器械解决方案。
              </p>
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default About;
