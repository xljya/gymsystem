// 导入React和相关依赖
import React from 'react';
// 导入Swiper组件和Slide组件
import { Swiper, SwiperSlide } from 'swiper/react';
// 导入Swiper所需功能模块
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
// 导入样式文件
import styles from './CustomCarousel.module.css';
// 导入Swiper基础样式
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// 定义轮播图组件
const CustomCarousel: React.FC = () => {
  // 定义轮播图数据
  const slides = [
    {
      id: 1,
      title: 'BODYPUMP',
      description:
        'The full-body weights workout that uses high-repetition resistance training gets you strong, toned and fit – fast.',
      image:
        'https://lmimirroralphapvr.azureedge.net/static/media/32448/d96dbe7e-e65c-43cc-b570-693385c7f7f4/lm-workouts-bodypump-equipment-960x560.jpg',
      link: '/workouts/bodypump',
    },
    {
      id: 2,
      title: 'BODYCOMBAT',
      description:
        'The high-energy, martial arts-inspired, non-contact workout. Punch, kick and strike your way to fitness.',
      image:
        'https://lmimirroralphapvr.azureedge.net/static/media/37079/cd493b18-ca8b-44e3-9c65-3e0f587b3c83/bodycombat-homepage-image.jpg',
      link: '/workouts/bodycombat',
    },
    {
      id: 3,
      title: 'LES MILLS SHAPES',
      description:
        'This is the workout you never knew you needed. An invigorating blend of Pilates, sculpt, and power yoga set to modern beats.',
      image:
        'https://lmimirroralphapvr.azureedge.net/static/media/37080/377b49d8-3800-47cc-b3a1-fc343fa5023/les-mills-shapes-homepage-image.jpg',
      link: '/workouts/shapes',
    },
  ];

  return (
    <div className={`${styles.carouselContainer} custom-carousel-container`}>
      <div className={styles.outerContainer}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 7000 }}
          loop
          className={styles.carousel}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className={styles.slideContent}>
                <a href={slide.link} title={slide.title}>
                  <img src={slide.image} alt={slide.title} />
                </a>
                <h3>{slide.title}</h3>
                <p>{slide.description}</p>
                <a href={slide.link} title={slide.title}>
                  <strong>了解更多</strong>
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CustomCarousel;
