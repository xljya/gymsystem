import { PageContainer } from '@ant-design/pro-components';
import CategorySection from './Components/CategorySection';
import FeaturedEquipment from './Components/FeaturedEquipment';
import FeaturesBanner from './Components/FeaturesBanner';
import HeroSection from './Components/HeroSection';


const Index = () => {
  return (
    <>
    <HeroSection />
    <PageContainer header={{ title: false }} style={{ backgroundColor: 'rgb(249,250,251)' }}>
        
        <CategorySection />
        <FeaturedEquipment />
      <FeaturesBanner />
    </PageContainer>
    </>
    
  );
};

export default Index;
