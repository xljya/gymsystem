import { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import HeroSection from './components/HeroSection';
import InstructorGrid from './components/InstructorGrid';
import { fetchTrainers } from '@/pages/Course/fitness/api';
import type { Trainer } from '@/types';
import { Spin, message } from 'antd';

const CoachPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleSearch = (term: string) => {
    setSearchTerm(term);

    // Scroll to the instructors section
    const instructorsSection = document.getElementById('instructors-section');
    if (instructorsSection) {
      instructorsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchTrainers();
        setTrainers(data);
      } catch (err) {
        console.error('获取教练失败:', err);
        message.error('获取教练失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <>
      <HeroSection onSearch={handleSearch} />

      <PageContainer header={{ title: false }} style={{ backgroundColor: 'rgb(249,250,251)' }}>
        <section id="instructors-section" className="bg-gray-50">
          <div className="fitness-container">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Spin size="large" tip="加载教练中..." />
              </div>
            ) : (
              <InstructorGrid searchTerm={searchTerm} trainers={trainers} />
            )}
          </div>
        </section>
      </PageContainer>
    </>
  );
};

export default CoachPage;
