// HomePage.tsx
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Typography } from 'antd';
import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './HomePage.module.css';

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

      <PageContainer>
        <div style={{ padding: '24px' }}>
          <ProCard title={<Title level={3}>健身小贴士</Title>} style={{ marginBottom: 24 }}>
            <div style={{ padding: '16px' }}>
              <div style={{ marginBottom: '16px' }}>
                <Title level={4}>科学健身，健康生活</Title>
                <ul style={{ fontSize: '16px', lineHeight: '2' }}>
                  <li>1. 运动前请做好充分的热身准备</li>
                  <li>2. 根据个人情况选择合适的运动强度</li>
                  <li>3. 保持规律的锻炼习惯</li>
                  <li>4. 注意补充水分和营养</li>
                  <li>5. 运动后做好拉伸放松</li>
                </ul>
              </div>
              <div>
                <Title level={4}>健身注意事项</Title>
                <ul style={{ fontSize: '16px', lineHeight: '2' }}>
                  <li>1. 穿着合适的运动服装和鞋子</li>
                  <li>2. 注意运动姿势的正确性</li>
                  <li>3. 循序渐进，不要急于求成</li>
                  <li>4. 保持充足的睡眠和休息</li>
                  <li>5. 定期进行身体检查</li>
                </ul>
              </div>
            </div>
          </ProCard>
        </div>
      </PageContainer>
    </>
  );
};

export default HomePage;
