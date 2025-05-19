import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import CategorySection from './components/CategorySection';
import FeaturesBanner from './components/FeaturesBanner';
import HeroSection from './components/HeroSection';

const Index = () => {
  return (
    <>
      <HeroSection />
      <PageContainer header={{ title: false }} style={{ backgroundColor: 'rgb(255,255,255)' }}>
        <CategorySection />
        <FeaturesBanner />
      </PageContainer>
    </>
  );
};

export default Index; 