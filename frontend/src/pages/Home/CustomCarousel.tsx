// 导入React和相关依赖
import React, { useRef } from 'react';
// 导入Swiper组件和Slide组件
import { Swiper, SwiperSlide } from 'swiper/react';
// 导入Swiper所需功能模块
import SwiperCore from 'swiper';
import { Autoplay, Pagination } from 'swiper/modules';
// 导入样式文件
import styles from './CustomCarousel.module.css';
// 导入Swiper基础样式
import 'swiper/css';
import 'swiper/css/pagination';

// 自定义SVG箭头
const ArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M12 15L6 9L12 3"
      stroke="#060606"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M6 3L12 9L6 15"
      stroke="#060606"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 定义轮播图组件
const CustomCarousel: React.FC = () => {
  const swiperRef = useRef<SwiperCore>();

  // 定义轮播图数据
  const slides = [
    {
      id: 1,
      title: 'BODYPUMP',
      description: '...', // 内容不再显示，可以保留数据或移除
      image:
        'https://cdn.jsdelivr.net/gh/xljya/image/post/lm-workouts-bodypump-equipment-960x560.jpg',
      link: '/equipment/all?category=strength',
    },
    {
      id: 2,
      title: 'BODYCOMBAT',
      description: '...',
      image: 'https://cdn.jsdelivr.net/gh/xljya/image/post/20250605010316215.png',
      link: '/equipment/all?category=functional',
    },
    {
      id: 3,
      title: 'SHAPES',
      description: '...',
      image: 'https://cdn.jsdelivr.net/gh/xljya/image/post/xlxlimg_1747424592088_9.jpg',
      link: '/equipment/all?category=accessories',
    },
  ];

  return (
    <div className={`${styles.carouselContainer} custom-carousel-container`}>
      {/* 添加标题和描述 */}
      <div className="text-center mb-8 mt-[60px]">
        <h2 className="text-3xl md:text-5xl font-bold text-lesmills-black mb-4">
          探索我们的训练器械
        </h2>
        <p className="text-xl text-lesmills-darkgray max-w-3xl mx-auto">
          体验顶级的训练设备，助您达成健身目标，塑造理想体型
        </p>
      </div>

      {/* 左箭头按钮 */}
      <button
        type="button"
        className={styles.customArrow + ' ' + styles.customArrowLeft}
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="上一张"
      >
        <ArrowLeft />
      </button>
      {/* 右箭头按钮 */}
      <button
        type="button"
        className={styles.customArrow + ' ' + styles.customArrowRight}
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="下一张"
      >
        <ArrowRight />
      </button>
      <div className={styles.outerContainer}>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
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
                <p className={styles.placeholderDescription}></p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CustomCarousel;
