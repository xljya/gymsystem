/* eslint-disable react/button-has-type */
import { PageContainer } from '@ant-design/pro-components';
import CategoryFilter from './fitness/CategoryFilter';
import ClassCard from './fitness/ClassCard';
import HeroSection from './fitness/HeroSection';
import ScheduleSection from './fitness/ScheduleSection';
import { useState, useEffect } from 'react';
import { useParams, useModel } from '@umijs/max';
import type { FitnessClass, Trainer, CategoryType, LinkedCategory } from '@/types';
import type { API } from '@/services/ant-design-pro/typings';
import { fetchCategories, fetchCourses, fetchTrainers } from '@/pages/Course/fitness/api';
import { Spin, message } from 'antd';

const CourseIndex = () => {
  const params = useParams<{ id?: string }>();
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser as API.LoginMemberVO | undefined;
  const [loading, setLoading] = useState<boolean>(true);
  const [courses, setCourses] = useState<FitnessClass[]>([]);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [categories, setCategories] = useState<LinkedCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('全部');

  // 获取特定分类的课程
  const fetchCoursesByCategory = async (categoryId: string) => {
    try {
      setLoading(true);
      const coursesData = await fetchCourses(categoryId);
      setCourses(coursesData);
    } catch (error) {
      console.error('获取分类课程失败:', error);
      message.error('获取课程失败，请刷新页面重试');
    } finally {
      setLoading(false);
    }
  };

  // 获取所有数据
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [categoriesData, coursesData, trainersData] = await Promise.all([
          fetchCategories(),
          fetchCourses(),
          fetchTrainers()
        ]);
        
        setCategories(categoriesData);
        setCourses(coursesData);
        setTrainers(trainersData);
      } catch (error) {
        console.error('获取数据失败:', error);
        message.error('获取数据失败，请刷新页面重试');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // 处理分类ID变化
  useEffect(() => {
    if (params.id) {
      // 根据URL参数查找分类名称
      const category = categories.find(cat => cat.id === params.id);
      if (category) {
        setSelectedCategory(category.name);
        
        // 如果不是"全部"分类，获取该分类的课程
        if (category.name !== '全部') {
          fetchCoursesByCategory(params.id);
        }
      }
    } else {
      // 默认选中"全部"
      setSelectedCategory('全部');
    }
  }, [params.id, categories]);

  // 根据选中的分类过滤课程
  const filteredCourses = selectedCategory === '全部'
    ? courses
    : courses.filter(course => course.category === selectedCategory);

  // 根据ID获取教练信息
  const getTrainerById = (id: string) => {
    return trainers.find(trainer => trainer.coachId === id);
  };

  return (
    <>
      {/* 顶部大图部分 - 不放入PageContainer */}
      <HeroSection />

      {/* Classes Section */}
      <PageContainer header={{ title: false }} style={{ backgroundColor: 'rgb(249,250,251)' }}>
        <section id="classes" className="py-12 bg-gray-50">
          <div className="fitness-container">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold">探索我们的课程</h2>
                <p className="text-fitness-gray mt-2">找到最适合你的健身课程，开始你的健康之旅</p>
              </div>
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={(categoryName) => {
                  setSelectedCategory(categoryName);
                }}
              />
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Spin size="large" tip="加载课程中..." />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((fitnessClass: FitnessClass) => (
                    <ClassCard
                      key={fitnessClass.id}
                      fitnessClass={fitnessClass}
                      trainer={getTrainerById(fitnessClass.coachId)}
                      currentUser={currentUser}
                    />
                  ))}
                </div>

                {filteredCourses.length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-xl font-medium text-fitness-gray">没有找到相关课程</h3>
                    <p className="mt-2">请尝试选择其他类别</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </PageContainer>

      {/* Schedule Section */}
      <PageContainer header={{ title: false }} style={{ backgroundColor: 'rgb(241, 241, 241)'}}>
        <ScheduleSection 
          classes={courses} 
          currentUser={currentUser}
        />
      </PageContainer>
    </>
  );
};

export default CourseIndex;
