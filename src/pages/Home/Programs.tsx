import { Button, Card } from 'antd';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './Programs.module.css';
import { Link } from '@umijs/max';

// 定义健身课程数据
const programsList = [
  {
    id: 1,
    title: '全部课程',
    description: '全部课程。',
    image:
      'https://cdn.jsdelivr.net/gh/xljya/image/post/xlimg_1749058985653_0.jpg',
    color: 'bg-red-500',
    link: '/course/0',
  },
  {
    id: 2,
    title: '瑜伽',
    description: '瑜伽。',
    image:
      'https://cdn.jsdelivr.net/gh/xljya/image/post/xlimg_1749058985655_1.jpg',
    color: 'bg-blue-500',
    link: '/course/1',
  },
  {
    id: 3,
    title: '格斗',
    description: '格斗。',
    image:
      'https://cdn.jsdelivr.net/gh/xljya/image/post/xlimg_1749058985656_2.jpg',
    color: 'bg-yellow-500',
    link: '/course/7',
  },
  {
    id: 4,
    title: '力量训练',
    description: '力量训练。',
    image:
      'https://cdn.jsdelivr.net/gh/xljya/image/post/xlimg_1749058985656_3.jpg',
    color: 'bg-green-500',
    link: '/course/2',
  },
];

const Programs = () => {
  return (
    <section id="programs" className="py-20 bg-lesmills-lightgray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-lesmills-black mb-4">
            我们的健身课程
          </h2>
          <p className="text-xl text-lesmills-darkgray max-w-3xl mx-auto">
            探索世界级的训练课程，重塑您的身体，焕发您的活力
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          spaceBetween={30}
        >
          {programsList.map((program) => (
            <SwiperSlide key={program.id}>
              <Link to={program.link} style={{ textDecoration: 'none' }}>
                <div className={styles.programCardContainer}>
                  <Card
                    className={styles.programCard}
                    cover={
                      <div className={styles.programImage}>
                        <img
                          src={program.image}
                          alt={program.title}
                          className={styles.programImage}
                        />
                      </div>
                    }
                  >
                    <div className={`${program.color} h-2 -mt-6 mb-4`}></div>
                    <Card.Meta
                      title={<h3 className="text-xl font-bold px-6 pb-4 text-center">{program.title}</h3>}
                    />
                  </Card>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default Programs;
