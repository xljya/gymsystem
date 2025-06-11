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
  coachAddress?: string; // 新增教练地址
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

// 器械数据类型定义
export interface Equipment {
  // 器械唯一标识
  id: string;
  // 器械名称
  name: string;
  // 器械分类（如：cardio, strength等）
  category: string;
  // 简短描述
  shortDescription: string;
  // 详细描述
  description: string;
  // 技术参数，键值对形式
  specifications: {
    [key: string]: string;
  };
  // 产品特点列表
  features: string[];
  // 主图URL
  image: string;
  // 轮播图URL数组
  images: string[];
  // 是否首页推荐
  featured: boolean;
}

export interface GoodsItem {
  id: string;
  goodsName: string;
  goodAvatar: string; // 图片链接
  sellPrice: number;
  inventory: number;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  /**
   * 商品类别
   * supplements  营养补剂
   * apparel      运动服饰
   * accessories  健身配件
   * gear         训练装备/小型器械
   */
  category: "supplements" | "apparel" | "accessories" | "gear";
}
