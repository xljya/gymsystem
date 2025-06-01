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

export const goodsData: GoodsItem[] = [
  // -------------------- supplements --------------------
  {
    id: "g001",
    goodsName: "高效乳清蛋白粉（巧克力味）",
    goodAvatar: "https://img.28082003.com//xl20250512013748084.png",
    sellPrice: 299,
    inventory: 120,
    description: "每份含25g优质乳清蛋白，促进肌肉增长与修复，低脂低糖，口感顺滑易溶解。",
    features: [
      "25g 乳清蛋白/份",
      "添加BCAA 支链氨基酸",
      "低脂低糖配方",
      "易溶解不结块"
    ],
    specifications: {
      "净含量": "908g/桶",
      "口味": "巧克力",
      "产地": "美国",
      "保质期": "24个月"
    },
    category: "supplements"
  },
  {
    id: "g002",
    goodsName: "BCAA 支链氨基酸粉（西瓜味）",
    goodAvatar: "https://img.28082003.com//xlxlimg_1747424606382_0.jpg",
    sellPrice: 229,
    inventory: 90,
    description: "2:1:1黄金比例BCAA，缓解运动疲劳，加速肌肉恢复，0糖0脂，清爽西瓜味。",
    features: [
      "2:1:1 黄金比例",
      "0糖0脂",
      "添加电解质配方",
      "快速溶解"
    ],
    specifications: {
      "净含量": "400g/罐",
      "口味": "西瓜",
      "每份含量": "7g BCAA",
      "适用人群": "力量与耐力训练者"
    },
    category: "supplements"
  },
  {
    id: "g003",
    goodsName: "能量蛋白棒（巧克力焦糖）",
    goodAvatar: "https://img.28082003.com//xlxlimg_1747424606384_1.jpg",
    sellPrice: 25,
    inventory: 300,
    description: "即食高蛋白能量棒，每根含20g蛋白质，外出携带方便，随时补充能量。",
    features: [
      "20g 蛋白质/根",
      "高纤维低糖",
      "无麸质配方",
      "口感香浓"
    ],
    specifications: {
      "单根质量": "60g",
      "口味": "巧克力焦糖",
      "保存方式": "阴凉干燥处",
      "产地": "中国"
    },
    category: "supplements"
  },

  // -------------------- apparel --------------------
  {
    id: "g004",
    goodsName: "速干运动T恤（男款）",
    goodAvatar: "https://img.28082003.com//xlxlimg_1747424606385_2.jpg",
    sellPrice: 149,
    inventory: 200,
    description: "高性能速干面料，排汗透气，保持运动干爽，剪裁贴合展现身形。",
    features: [
      "排汗速干面料",
      "四向弹力",
      "轻盈透气",
      "多色可选"
    ],
    specifications: {
      "尺码": "S-XXL",
      "面料": "聚酯纤维+氨纶",
      "颜色": "黑/灰/蓝",
      "洗涤": "30℃ 机洗"
    },
    category: "apparel"
  },
  {
    id: "g005",
    goodsName: "透气运动短裤（女款）",
    goodAvatar: "https://img.28082003.com//xlxlimg_1747424606386_3.jpg",
    sellPrice: 129,
    inventory: 180,
    description: "轻盈速干面料配合内置安全短裤，运动更自如，适合跑步、训练及日常穿搭。",
    features: [
      "两层设计防走光",
      "速干透气",
      "高腰收腹",
      "弹力舒适"
    ],
    specifications: {
      "尺码": "XS-L",
      "面料": "锦纶+氨纶",
      "颜色": "黑/粉/军绿",
      "洗涤": "手洗或轻柔机洗"
    },
    category: "apparel"
  },
  {
    id: "g006",
    goodsName: "高腰瑜伽紧身裤",
    goodAvatar: "https://img.28082003.com//xlxlimg_1747424606388_4.jpg",
    sellPrice: 199,
    inventory: 150,
    description: "无缝针织技术，高弹贴合，塑形显瘦，适合瑜伽、普拉提与力量训练。",
    features: [
      "无缝一体织",
      "高腰设计",
      "四向弹力",
      "不透光材质"
    ],
    specifications: {
      "尺码": "S-XL",
      "面料": "锦纶+氨纶",
      "颜色": "深灰/紫/湖蓝",
      "洗涤": "与同色衣物冷水洗"
    },
    category: "apparel"
  },

  // -------------------- accessories --------------------
  {
    id: "g007",
    goodsName: "专业泡沫轴",
    goodAvatar: "https://img.28082003.com//xlxlimg_1747424606389_5.jpg",
    sellPrice: 99,
    inventory: 110,
    description: "EVA 高密度泡沫轴，帮助筋膜放松，缓解肌肉紧张，提升运动表现。",
    features: [
      "高密度 EVA",
      "耐压不易变形",
      "防滑纹理",
      "重量轻便携"
    ],
    specifications: {
      "长度": "45cm",
      "直径": "14cm",
      "材质": "EVA",
      "颜色": "黑/蓝/粉"
    },
    category: "accessories"
  },
  {
    id: "g008",
    goodsName: "多功能弹力带套装",
    goodAvatar: "https://img.28082003.com//xlxlimg_1747424606390_6.jpg",
    sellPrice: 159,
    inventory: 140,
    description: "五档阻力等级，天然乳胶，满足力量训练、康复训练等多种需求，附便携收纳袋。",
    features: [
      "5 档阻力",
      "天然乳胶",
      "附训练手册",
      "轻巧好收纳"
    ],
    specifications: {
      "阻力范围": "5-40kg",
      "材质": "乳胶",
      "套装": "5 条 + 收纳袋",
      "颜色": "多色"
    },
    category: "accessories"
  },
  {
    id: "g009",
    goodsName: "防滑健身手套",
    goodAvatar: "https://img.28082003.com//xlxlimg_1747424606392_7.jpg",
    sellPrice: 89,
    inventory: 90,
    description: "透气网眼设计与硅胶防滑掌垫，提供抓握力并减少茧子，魔术贴方便调节松紧。",
    features: [
      "硅胶防滑",
      "透气速干",
      "掌心加厚",
      "魔术贴固定"
    ],
    specifications: {
      "尺码": "S-XL",
      "材质": "合成革+网眼布",
      "颜色": "黑/红",
      "产地": "中国"
    },
    category: "accessories"
  },

  // -------------------- gear --------------------
  {
    id: "g010",
    goodsName: "专业调速钢丝跳绳",
    goodAvatar: "https://img.28082003.com//xlxlimg_1747424606393_8.jpg",
    sellPrice: 79,
    inventory: 100,
    description: "轴承连接旋转顺畅，长度可调，适合高强度间歇训练与燃脂。",
    features: [
      "钢丝绳体",
      "轴承360°旋转",
      "长度可调",
      "轻量手柄"
    ],
    specifications: {
      "长度": "2.8-3.2m 可调",
      "材质": "钢丝+铝合金",
      "重量": "280g",
      "颜色": "黑/银"
    },
    category: "gear"
  },
  {
    id: "g011",
    goodsName: "环保TPE瑜伽垫",
    goodAvatar: "https://img.28082003.com//xlxlimg_1747424606395_9.jpg",
    sellPrice: 139,
    inventory: 120,
    description: "6mm 双层结构，防滑纹理，提供优异支撑与缓冲，附便携背带。",
    features: [
      "环保 TPE",
      "双层加厚",
      "防滑纹理",
      "配背带"
    ],
    specifications: {
      "尺寸": "183×61cm",
      "厚度": "6mm",
      "重量": "1.1kg",
      "颜色": "紫/蓝/黑"
    },
    category: "gear"
  },
  {
    id: "g012",
    goodsName: "8KG 涂层壶铃",
    goodAvatar: "https://image.liucf.com/images/2025/05/6c7b2438179189a4a766a78ee01d55f1.png",
    sellPrice: 249,
    inventory: 60,
    description: "铸铁材质外覆彩色乙烯基涂层，保护地面，人体工学把手舒适易握。",
    features: [
      "铸铁一体成型",
      "乙烯基涂层防锈",
      "把手舒适防滑",
      "重量精准"
    ],
    specifications: {
      "重量": "8kg ±3%",
      "材质": "铸铁+乙烯基",
      "颜色": "蓝",
      "手柄直径": "33mm"
    },
    category: "gear"
  }
];
