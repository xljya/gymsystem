
export interface GoodsItem {
  id: string;
  goodsName: string;
  remark: string; // 图片链接
  sellPrice: number;
  inventory: number;
  description: string;
  features: string[];
  specifications: Record<string, string>;
}

export const goodsData: GoodsItem[] = [
  {
    id: "g001",
    goodsName: "专业健身手套",
    remark: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2670&auto=format&fit=crop",
    sellPrice: 99,
    inventory: 50,
    description: "专业健身手套采用高弹性材质，有效保护手部皮肤，增强抓握力，减少运动中的手部伤害。",
    features: [
      "防滑耐磨表面",
      "透气网眼设计",
      "加厚掌垫保护",
      "可水洗易清洁"
    ],
    specifications: {
      "材质": "合成革 + 网眼布",
      "尺寸": "S/M/L/XL",
      "颜色": "黑色/红色",
      "产地": "中国"
    }
  },
  {
    id: "g002",
    goodsName: "蛋白质粉 - 巧克力味",
    remark: "https://images.unsplash.com/photo-1594498653385-d5172c532c00?q=80&w=2574&auto=format&fit=crop",
    sellPrice: 299,
    inventory: 100,
    description: "高品质蛋白质粉，每份含有25克优质蛋白质，促进肌肉恢复和生长，是健身训练后的理想补充品。",
    features: [
      "优质乳清蛋白",
      "低脂低糖配方",
      "添加BCAA支链氨基酸",
      "易溶解不结块"
    ],
    specifications: {
      "净重": "908克/桶",
      "口味": "巧克力",
      "每份含量": "25克蛋白质",
      "适用人群": "成人健身爱好者"
    }
  },
  {
    id: "g003",
    goodsName: "专业跳绳",
    remark: "https://images.unsplash.com/photo-1598289431512-b98b2cbade6f?q=80&w=2574&auto=format&fit=crop",
    sellPrice: 79,
    inventory: 30,
    description: "专业跳绳采用高强度钢丝绳，轴承连接，旋转流畅，适合各类训练需求，是燃脂减脂的理想工具。",
    features: [
      "高强度钢丝绳",
      "人体工学手柄",
      "可调节长度",
      "轻量化设计"
    ],
    specifications: {
      "材质": "钢丝 + 合金手柄",
      "长度": "可调节 2.8-3.2米",
      "重量": "280克",
      "适用身高": "1.5-2.0米"
    }
  },
  {
    id: "g004",
    goodsName: "瑜伽垫",
    remark: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2670&auto=format&fit=crop",
    sellPrice: 129,
    inventory: 45,
    description: "环保TPE瑜伽垫，双层结构，提供优异的缓冲和支撑，防滑设计确保安全练习，适合瑜伽、普拉提等多种训练。",
    features: [
      "环保TPE材质",
      "双层加厚设计",
      "防滑纹理表面",
      "便携式设计带背带"
    ],
    specifications: {
      "材质": "TPE环保材质",
      "尺寸": "183cm x 61cm",
      "厚度": "6mm",
      "重量": "1.1kg"
    }
  },
  {
    id: "g005",
    goodsName: "健身弹力带套装",
    remark: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2670&auto=format&fit=crop",
    sellPrice: 159,
    inventory: 70,
    description: "五件套弹力带，不同阻力等级，适合各种训练需求，便携设计，室内室外均可使用，是居家健身的理想选择。",
    features: [
      "5种不同阻力等级",
      "天然乳胶材质",
      "便携收纳袋",
      "附带训练指南"
    ],
    specifications: {
      "材质": "天然乳胶",
      "阻力范围": "5-40kg",
      "套装内容": "5条不同阻力弹力带+收纳袋+训练指南",
      "颜色": "多彩"
    }
  }
];
