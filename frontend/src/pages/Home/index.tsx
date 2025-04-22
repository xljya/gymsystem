// HomePage.tsx
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Typography } from 'antd';
import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './HomePage.module.css';
import PartnersSection from './PartnersSection'; // 导入合作伙伴组件

const { Title } = Typography;

const images = [
  'https://image.liucf.com/images/2025/04/432f02f157d8bcdb87aba0ffcb94bd72.jpg',
  'https://image.liucf.com/images/2025/04/b11b212ca4ce5bdfa335fb946bdccb0d.jpg',
  'https://image.liucf.com/images/2025/04/5ae0501c13a43d599eb16976c1a53693.jpg',
  'https://image.liucf.com/images/2025/04/afa5cf032bf8244b348581245473e76a.jpg',
];

const HomePage: React.FC = () => {
  return (
    <>
      <div className={styles.swiperContainer}>
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          pagination={{
            el: '.swiper-pagination',
            clickable: true,
          }}
          className={styles.swiper}
        >
          {images.map((url, index) => (
            <SwiperSlide key={index}>
              <img src={url} alt={`slide-${index}`} className={styles.slideImage} />
            </SwiperSlide>
          ))}
          {/* 分页器容器：这行必须保留，否则不会显示 */}
          <div className="swiper-pagination"></div>
        </Swiper>
      </div>

      <PageContainer 
        header={{ title: false }} 
        style={{ backgroundColor: 'rgb(250, 250, 250)' }}
      >
        <div style={{ padding: '24px' }}>
          
          
          {/* 在这里添加合作伙伴区块 */}
          <PartnersSection />
        </div>
      </PageContainer>
    </>
  );
};

export default HomePage;
