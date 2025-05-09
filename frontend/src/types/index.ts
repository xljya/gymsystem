export interface Trainer {
  coachId: string;
  coachName: string;
  courseType: string;
  coachAvatar: string;
  coachAge?: number;
  gender?: number;
  coachStatus?: number;
  createTime?: string;
  entryDate?: string;
  rating?: number; // 前端展示用，非后端数据
  experience?: number; // 前端展示用，非后端数据
}

export interface FitnessClass {
  id: string; // 转换自courseId
  title: string; // 转换自courseName
  category: string; // 转换自categoryName
  description: string;
  image: string; // 转换自imageUrl
  duration: number;
  intensity: 'low' | 'medium' | 'high'; // 转换自difficultyLevel
  coachId: string; // 转换自coachId
  sellingPrice?: number;
  schedule: {
    scheduleId: string;
    day: string;
    time: string;
  }[];
}

export type CategoryType = '全部' | '有氧运动' | '力量训练' | '瑜伽' | '普拉提' | '格斗' | '舞蹈';

export interface LinkedCategory {
  id: string; // 用于URL路径，例如 '1', '2', ...
  name: CategoryType; // 分类的显示名称
}
