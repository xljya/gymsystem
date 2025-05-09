import { 
  getCourseVoByIdWithScheduleUsingGet, 
  listCoursesByCategoryIdWithScheduleUsingGet,
  listAllCoursesUsingGet
} from '@/api/courseController';
import { getCoachVoByIdUsingGet, listCoachVoByPageUsingPost } from '@/api/coachController';
import { listCategoryByPageUsingPost } from '@/api/courseCategoryController';
import { 
  listScheduleByCourseIdUsingPost 
} from '@/api/courseScheduleController';
import { FitnessClass, Trainer, CategoryType, LinkedCategory } from '@/types';
import { message } from 'antd';

// 辅助函数：将后端难度级别转换为前端强度
function mapDifficultyToIntensity(difficultyLevel?: string): 'low' | 'medium' | 'high' {
  if (!difficultyLevel) return 'medium';
  
  switch (difficultyLevel.toLowerCase()) {
    case 'high':
    case '高':
    case 'hard':
      return 'high';
    case 'low':
    case '低':
    case 'easy':
      return 'low';
    default:
      return 'medium';
  }
}

// 获取所有课程分类
export async function fetchCategories(): Promise<LinkedCategory[]> {
  try {
    const response = await listCategoryByPageUsingPost({
      current: 1,
      pageSize: 100, // 获取足够多的分类
    });
    
    const defaultCategory = { id: '0', name: '全部' as CategoryType };

    // 首先检查response对象本身是否存在
    if (!response) {
      console.error('获取分类失败: API响应为空');
      message.error('获取分类信息失败，响应为空');
      return [defaultCategory];
    }

    // 判断成功：code === 0 或 code === undefined(被 umi-request 自动解包)
    if (response.code === 0 || response.code === undefined) {
      const dataAny = (response.code === undefined ? response : (response.data as any));
      const rawList: any[] = Array.isArray(dataAny)
        ? dataAny
        : (dataAny && Array.isArray(dataAny.records) ? dataAny.records : []);
      const apiCategories = rawList
        .filter((cat: any) => cat && cat.categoryId && cat.categoryName)
        .map((cat: any) => ({
          id: String(cat.categoryId),
          name: cat.categoryName as any
        }));
      return [defaultCategory, ...apiCategories];
    }
    // 只有code !== 0才会走到这里
    const errorCode = response.code === undefined ? '未定义' : response.code;
    const errorMessage = response.message === undefined ? '未提供' : response.message;
    console.error(`获取分类数据失败，错误码: ${errorCode}, 信息: ${errorMessage}`, response);
    message.error(`获取分类数据失败 (代码: ${errorCode})`);
    return [defaultCategory];
  } catch (error) {
    console.error('获取分类时发生异常:', error);
    message.error('获取分类信息时发生异常');
    return [{ id: '0', name: '全部' as CategoryType }];
  }
}

// 获取所有课程或特定分类的课程
export async function fetchCourses(categoryId?: string): Promise<FitnessClass[]> {
  try {
    let response;
    if (categoryId && categoryId !== '0') {
      response = await listCoursesByCategoryIdWithScheduleUsingGet({ 
        categoryId: parseInt(categoryId) 
      });
    } else {
      response = await listAllCoursesUsingGet();
    }

    // 首先检查response对象本身是否存在
    if (!response) {
      console.error('获取课程失败: API响应为空');
      message.error('获取课程信息失败，响应为空');
      return [];
    }
    
    if (response.code === 0 || response.code === undefined) {
      const dataAny = (response.code === undefined ? response : (response.data as any));
      const rawList: any[] = Array.isArray(dataAny)
        ? dataAny
        : (dataAny && Array.isArray(dataAny.records) ? dataAny.records : []);
      if (rawList.length > 0) {
        return rawList
          .filter((course: any) => course && course.courseId)
          .map((course: any) => ({
            id: String(course.courseId || 0),
            title: course.courseName || '未命名课程',
            category: course.categoryName || '未分类',
            description: course.description || '暂无描述',
            image: course.imageUrl || 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
            duration: course.duration || 60,
            intensity: mapDifficultyToIntensity(course.difficultyLevel),
            coachId: String(course.coachId || 0),
            sellingPrice: course.sellingPrice,
            schedule: Array.isArray(course.schedule) ? course.schedule.map((s: any) => ({
              scheduleId: s.scheduleId || '未知',
              day: s.day || '未知',
              time: s.time || '未知'
            })) : []
          }));
      }
      return [];
    }
    // 只有code !== 0才会走到这里
    const errorCode = response.code === undefined ? '未定义' : response.code;
    const errorMessage = response.message === undefined ? '未提供' : response.message;
    console.error(`获取课程数据失败，错误码: ${errorCode}, 信息: ${errorMessage}`, response);
    message.error(`获取课程数据失败 (代码: ${errorCode})`);
    return [];
  } catch (error) {
    console.error('获取课程时发生异常:', error);
    message.error('获取课程信息时发生异常');
    return []; 
  }
}

// 获取特定教练的详情
export async function fetchTrainer(coachId: string): Promise<Trainer | null> {
  try {
    if (!coachId || coachId === '0') {
      console.warn('尝试获取无效的教练ID:', coachId);
      return null;
    }
    
    const response = await getCoachVoByIdUsingGet({ 
      coachId: parseInt(coachId) 
    });

    if (!response) {
      console.error(`获取教练(ID: ${coachId})失败: API响应为空`);
      message.error(`获取教练(ID: ${coachId})信息失败，响应为空`);
      return null;
    }
    
    if (response.code === 0 || response.code === undefined) {
      const coach = (response.code === undefined ? response : response.data) as any;
      if (coach) {
        return {
          coachId: String(coach.coachId || 0),
          coachName: coach.coachName || '未知教练',
          courseType: coach.courseType || '通用课程',
          coachAvatar: coach.coachAvatar || `https://randomuser.me/api/portraits/${coach.gender === 1 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
          coachAge: coach.coachAge,
          gender: coach.gender,
          coachStatus: coach.coachStatus,
          createTime: coach.createTime,
          entryDate: coach.entryDate,
          rating: 4.5 + Math.random() * 0.5,
          experience: coach.entryDate ? Math.max(1, Math.floor((Date.now() - new Date(coach.entryDate).getTime()) / (1000 * 60 * 60 * 24 * 365))) : undefined,
          coachAddress: coach.coachAddress || coach.address || '未知',
        };
      }
      return null;
    }
    // 只有code !== 0才会走到这里
    const errorCode = response.code === undefined ? '未定义' : response.code;
    const errorMessage = response.message === undefined ? '未提供' : response.message;
    console.error(`获取教练(ID: ${coachId})数据失败，错误码: ${errorCode}, 信息: ${errorMessage}`, response);
    message.error(`获取教练(ID: ${coachId})数据失败 (代码: ${errorCode})`);
    return null;
  } catch (error) {
    console.error(`获取教练(ID: ${coachId})时发生异常:`, error);
    message.error(`获取教练(ID: ${coachId})信息时发生异常`);
    return null;
  }
}

// 获取所有教练
export async function fetchTrainers(): Promise<Trainer[]> {
  try {
    const response = await listCoachVoByPageUsingPost({
      current: 1,
      pageSize: 100, // 获取足够多的教练
      coachStatus: 0 
    });

    if (!response) {
      console.error('获取教练列表失败: API响应为空');
      message.warning('获取教练列表失败，响应为空，将使用备用数据');
      // Fallback to mock data
      return [
        { coachId: "12", coachName: "李明", courseType: "力量训练", coachAvatar: "https://randomuser.me/api/portraits/men/32.jpg", rating: 4.8, experience: 5 },
        { coachId: "13", coachName: "王芳", courseType: "瑜伽", coachAvatar: "https://randomuser.me/api/portraits/women/44.jpg", rating: 4.9, experience: 7 },
      ];
    }
    
    if (response.code === 0 || response.code === undefined) {
      const dataAny = (response.code === undefined ? response : (response.data as any));
      const rawList: any[] = Array.isArray(dataAny)
        ? dataAny
        : (dataAny && Array.isArray(dataAny.records) ? dataAny.records : []);
      if (rawList.length > 0) {
        return rawList
          .filter((coach: any) => coach && coach.coachId)
          .map((coach: any) => ({
            coachId: String(coach.coachId || 0),
            coachName: coach.coachName || '未知教练',
            courseType: coach.courseType || '通用课程',
            coachAvatar: coach.coachAvatar || `https://randomuser.me/api/portraits/${coach.gender === 1 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
            coachAge: coach.coachAge,
            gender: coach.gender,
            coachStatus: coach.coachStatus,
            createTime: coach.createTime,
            entryDate: coach.entryDate,
            rating: 4.5 + Math.random() * 0.5,
            experience: coach.entryDate ? Math.max(1, Math.floor((Date.now() - new Date(coach.entryDate).getTime()) / (1000 * 60 * 60 * 24 * 365))) : undefined,
            coachAddress: coach.coachAddress || coach.address || '未知',
          }));
      }
      return []; // 如果没有教练记录，返回空数组
    }
    // 只有code !== 0才会走到这里
    const errorCode = response.code === undefined ? '未定义' : response.code;
    const errorMessage = response.message === undefined ? '未提供' : response.message;
    console.warn(`获取教练列表失败 (code: ${errorCode}, msg: ${errorMessage})，将使用备用数据`, response);
    message.warning(`获取教练列表失败 (code: ${errorCode})，将使用备用数据`);

  } catch (error) {
    console.error('获取教练列表API请求失败:', error);
    message.warning('获取教练列表API请求失败，将使用备用数据');
  }
  // Fallback mock data
  return [
    { coachId: "12", coachName: "李明", courseType: "力量训练", coachAvatar: "https://randomuser.me/api/portraits/men/32.jpg", rating: 4.8, experience: 5 },
    { coachId: "13", coachName: "王芳", courseType: "瑜伽", coachAvatar: "https://randomuser.me/api/portraits/women/44.jpg", rating: 4.9, experience: 7 },
  ];
}

// 获取课程详情
export async function fetchCourseDetail(courseId: string): Promise<FitnessClass | null> {
  try {
    if (!courseId || courseId === '0') {
      console.warn('尝试获取无效的课程ID:', courseId);
      return null;
    }
    const response = await getCourseVoByIdWithScheduleUsingGet({ 
      id: parseInt(courseId) 
    });

    if (!response) {
      console.error(`获取课程(ID: ${courseId})详情失败: API响应为空`);
      message.error(`获取课程(ID: ${courseId})详情失败，响应为空`);
      return null;
    }
    
    if (response.code === 0 || response.code === undefined) {
      const course = (response.code === undefined ? response : response.data) as any;
      if (course) {
        return {
          id: String(course.courseId || 0),
          title: course.courseName || '未命名课程',
          category: course.categoryName || '未分类',
          description: course.description || '暂无描述',
          image: course.imageUrl || 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
          duration: course.duration || 60,
          intensity: mapDifficultyToIntensity(course.difficultyLevel),
          coachId: String(course.coachId || 0),
          sellingPrice: course.sellingPrice,
          schedule: Array.isArray(course.schedule) ? course.schedule.map((s: any) => ({
            day: s.day || '未知',
            time: s.time || '未知'
          })) : []
        };
      }
      return null; // 课程未找到
    }
    // 只有code !== 0才会走到这里
    const errorCode = response.code === undefined ? '未定义' : response.code;
    const errorMessage = response.message === undefined ? '未提供' : response.message;
    console.error(`获取课程(ID: ${courseId})详情失败，错误码: ${errorCode}, 信息: ${errorMessage}`, response);
    message.error(`获取课程(ID: ${courseId})详情失败 (代码: ${errorCode})`);
    return null;
  } catch (error) {
    console.error(`获取课程(ID: ${courseId})详情时发生异常:`, error);
    message.error(`获取课程(ID: ${courseId})详情时发生异常`);
    return null;
  }
}

// 获取课程安排
export async function fetchCourseSchedules(courseId: string): Promise<{day: string, time: string}[]> {
  try {
    const response = await listScheduleByCourseIdUsingPost({
      courseId: parseInt(courseId)
    });

    if (!response) {
      console.error(`获取课程 ${courseId} 的安排失败: API响应为空`);
      message.warning(`获取课程 ${courseId} 的安排失败，响应为空，返回默认安排`);
      // Fallback to default schedule
      return [
        { day: "周一", time: "18:00" },
        { day: "周三", time: "18:00" },
        { day: "周五", time: "18:00" },
      ];
    }
    
    if (response.code === 0 || response.code === undefined) {
      const dataAny = (response.code === undefined ? response : (response.data as any));
      const rawList: any[] = Array.isArray(dataAny)
        ? dataAny
        : (dataAny && Array.isArray(dataAny.records) ? dataAny.records : []);
      if (rawList.length > 0) {
        return rawList.map((schedule: any) => {
          const startTime = schedule.startTime ? new Date(schedule.startTime) : null;
          const day = startTime ? ['周日','周一','周二','周三','周四','周五','周六'][startTime.getDay()] : '未知';
          const time = startTime ? `${startTime.getHours().toString().padStart(2,'0')}:${startTime.getMinutes().toString().padStart(2,'0')}` : '未知';
          return { day, time };
        });
      }
      return []; // 如果没有课程安排，返回空数组
    }
    // 只有code !== 0才会走到这里
    const errorCode = response.code === undefined ? '未定义' : response.code;
    const errorMessage = response.message === undefined ? '未提供' : response.message;
    console.warn(`获取课程 ${courseId} 的安排失败 (code: ${errorCode}, msg: ${errorMessage})，返回默认安排`, response);
    message.warning(`获取课程 ${courseId} 的安排失败 (code: ${errorCode})，返回默认安排`);

  } catch (error) {
    console.error(`获取课程 ${courseId} 的安排失败:`, error);
    message.warning(`获取课程 ${courseId} 的安排API请求失败，返回默认安排`);
  }
  // API调用失败或无数据时的默认/备用安排
  return [
    { day: "周一", time: "18:00" },
    { day: "周三", time: "18:00" },
    { day: "周五", time: "18:00" },
  ];

  
} 
