// HomePage.tsx
import { PageContainer } from '@ant-design/pro-components';
import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CustomCarousel from './CustomCarousel';
import styles from './HomePage.module.css';
import PartnersSection from './PartnersSection';
import Programs from './Programs';

const images = [
  'https://image.liucf.com/images/2025/04/432f02f157d8bcdb87aba0ffcb94bd72.jpg',
  'https://image.liucf.com/images/2025/04/b11b212ca4ce5bdfa335fb946bdccb0d.jpg',
  'https://image.liucf.com/images/2025/04/5ae0501c13a43d599eb16976c1a53693.jpg',
  'https://image.liucf.com/images/2025/04/afa5cf032bf8244b348581245473e76a.jpg',
];

const HomePage: React.FC = () => {
  return (
    <>
      {/* 首页大轮播图 */}
      <div className={`${styles['home-swiper-container']} home-swiper-container`}>
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          pagination={{
            el: '.home-swiper-container .swiper-pagination',
            clickable: true,
          }}
          className={styles['home-swiper']}
        >
          {images.map((url, index) => (
            <SwiperSlide key={index}>
              <img src={url} alt={`slide-${index}`} className={styles['home-slide-image']} />
            </SwiperSlide>
          ))}
          {/* 分页器容器 */}
          <div className="swiper-pagination"></div>
        </Swiper>
      </div>

      {/* 页面内容区 */}
      <PageContainer header={{ title: false }} style={{ backgroundColor: 'rgb(250, 250, 250)' }}>
        <div style={{ padding: '24px' }}>
          <Programs />
        </div>
      </PageContainer>

      <PageContainer header={{ title: false }} style={{ backgroundColor: 'rgb(241, 241, 241)' }}>
         <div style={{ padding: '24px' }}>
          <CustomCarousel />
    </div>
      </PageContainer>

      <PageContainer header={{ title: false }} style={{ backgroundColor: 'rgb(250, 250, 250)' }}>
        <div style={{ padding: '24px' }}>
          <PartnersSection />
        </div>
      </PageContainer>
    </>
  );
};

export default HomePage;
