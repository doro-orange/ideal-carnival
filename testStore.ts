import { create } from 'zustand';

interface TestState {
  answers: Record<number, string>;
  currentQuestion: number;
  totalQuestions: number;
  addAnswer: (questionId: number, answer: string) => void;
  nextQuestion: () => void;
  resetTest: () => void;
  getMBTIType: () => string;
}

export const useTestStore = create<TestState>((set, get) => ({
  answers: {},
  currentQuestion: 0,
  totalQuestions: 20,
  addAnswer: (questionId, answer) => set((state) => ({
    answers: { ...state.answers, [questionId]: answer }
  })),
  nextQuestion: () => set((state) => ({
    currentQuestion: state.currentQuestion + 1
  })),
  resetTest: () => set({
    answers: {},
    currentQuestion: 0
  }),
  getMBTIType: () => {
    const { answers } = get();
    
    // 计算各维度得分
    const dimensions = {
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0
    };
    
    // 简化的MBTI计算逻辑
    Object.values(answers).forEach(answer => {
      if (answer.startsWith('E')) dimensions.E++;
      if (answer.startsWith('I')) dimensions.I++;
      if (answer.startsWith('S')) dimensions.S++;
      if (answer.startsWith('N')) dimensions.N++;
      if (answer.startsWith('T')) dimensions.T++;
      if (answer.startsWith('F')) dimensions.F++;
      if (answer.startsWith('J')) dimensions.J++;
      if (answer.startsWith('P')) dimensions.P++;
    });
    
    // 确定最终类型
    const E_I = dimensions.E > dimensions.I ? 'E' : 'I';
    const S_N = dimensions.S > dimensions.N ? 'S' : 'N';
    const T_F = dimensions.T > dimensions.F ? 'T' : 'F';
    const J_P = dimensions.J > dimensions.P ? 'J' : 'P';
    
    return E_I + S_N + T_F + J_P;
  }
}));

// MBTI类型数据
export const mbtiTypes = {
  INFP: {
    code: "INFP",
    name: "调停者",
    description: "理想主义者，富有创造力和同理心，重视个人价值观和意义。",
    loveStyle: "追求深度的情感连接，注重精神共鸣和共同的价值观。",
    strengths: ["富有同理心", "忠诚", "创造力", "理想主义"],
    weaknesses: ["过度理想化", "敏感", "犹豫不决", "自我怀疑"],
    compatibility: {
      ENFJ: 95,
      ENTJ: 75,
      INFJ: 90,
      INTJ: 85,
      ENFP: 80,
      ESTP: 60,
      ESFP: 65,
      ISFP: 85,
      ISTP: 70,
      ENTP: 75,
      ESTJ: 60,
      ESFJ: 70,
      ISTJ: 65,
      ISFJ: 75,
      INTP: 80
    },
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cartoon%20character%20for%20INFP%20personality%2C%20idealistic%2C%20creative%2C%20peaceful%2C%20watercolor%20style&image_size=square"
  },
  INFJ: {
    code: "INFJ",
    name: "倡导者",
    description: "洞察力强，有远见，致力于帮助他人和改善世界。",
    loveStyle: "寻求深刻的精神连接，重视真诚和相互理解。",
    strengths: ["洞察力", "同理心", "忠诚", "理想主义"],
    weaknesses: ["过于理想化", "自我牺牲", "难以表达情感", "对批评敏感"],
    compatibility: {
      ENFP: 95,
      ENTP: 85,
      INFP: 90,
      INTJ: 85,
      ENFJ: 80,
      ENTJ: 75,
      ESTP: 60,
      ESFP: 65,
      ISFP: 75,
      ISTP: 70,
      ESTJ: 60,
      ESFJ: 70,
      ISTJ: 65,
      ISFJ: 80,
      INTP: 80
    },
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cartoon%20character%20for%20INFJ%20personality%2C%20insightful%2C%20visionary%2C%20compassionate%2C%20watercolor%20style&image_size=square"
  },
  INTJ: {
    code: "INTJ",
    name: "建筑师",
    description: "理性、独立，具有战略思维和创新能力。",
    loveStyle: "寻求智力匹配和共同目标，重视效率和逻辑。",
    strengths: ["逻辑思维", "战略规划", "独立性", "创新能力"],
    weaknesses: ["过于理性", "固执", "缺乏耐心", "对情感表达不擅长"],
    compatibility: {
      ENFP: 85,
      ENTP: 90,
      INFP: 85,
      INFJ: 85,
      ENFJ: 75,
      ENTJ: 90,
      ESTP: 65,
      ESFP: 60,
      ISFP: 70,
      ISTP: 80,
      ESTJ: 75,
      ESFJ: 65,
      ISTJ: 80,
      ISFJ: 70,
      INTP: 95
    },
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cartoon%20character%20for%20INTJ%20personality%2C%20strategic%2C%20independent%2C%20rational%2C%20watercolor%20style&image_size=square"
  },
  INTP: {
    code: "逻辑学家",
    name: "逻辑学家",
    description: "好奇心强，善于分析，追求知识和真理。",
    loveStyle: "寻求智力刺激和自由，重视思想交流和独立性。",
    strengths: ["逻辑分析", "好奇心", "创造力", "独立性"],
    weaknesses: ["过度分析", "社交困难", "缺乏实践", "对情感不敏感"],
    compatibility: {
      ENFP: 90,
      ENTP: 95,
      INFP: 80,
      INFJ: 80,
      ENFJ: 70,
      ENTJ: 85,
      ESTP: 70,
      ESFP: 65,
      ISFP: 65,
      ISTP: 90,
      ESTJ: 65,
      ESFJ: 60,
      ISTJ: 75,
      ISFJ: 65
    },
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cartoon%20character%20for%20INTP%20personality%2C%20analytical%2C%20curious%2C%20logical%2C%20watercolor%20style&image_size=square"
  },
  ENFP: {
    code: "竞选者",
    name: "竞选者",
    description: "热情、富有创造力，善于社交和激励他人。",
    loveStyle: "寻求充满激情和创意的关系，重视自由和多样性。",
    strengths: ["热情", "创造力", "社交能力", "乐观"],
    weaknesses: ["注意力分散", "过于理想化", "决策困难", "对批评敏感"],
    compatibility: {
      INFJ: 95,
      INTJ: 85,
      ENFJ: 85,
      ENTJ: 75,
      INFP: 80,
      INTP: 90,
      ESTP: 70,
      ESFP: 80,
      ISFP: 85,
      ISTP: 75,
      ENTP: 90,
      ESTJ: 65,
      ESFJ: 75,
      ISTJ: 65,
      ISFJ: 70
    },
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cartoon%20character%20for%20ENFP%20personality%2C%20enthusiastic%2C%20creative%2C%20social%2C%20watercolor%20style&image_size=square"
  },
  ENFJ: {
    code: "主人公",
    name: "主人公",
    description: "富有魅力和领导力，善于理解和激励他人。",
    loveStyle: "寻求深刻的情感连接，重视和谐和共同成长。",
    strengths: ["领导力", "同理心", "社交能力", "责任感"],
    weaknesses: ["过度投入", "对批评敏感", "忽视个人需求", "理想化"],
    compatibility: {
      INFP: 95,
      INTP: 70,
      ENFP: 85,
      ENTP: 75,
      INFJ: 80,
      INTJ: 75,
      ESTP: 65,
      ESFP: 75,
      ISFP: 70,
      ISTP: 65,
      ESTJ: 70,
      ESFJ: 85,
      ISTJ: 65,
      ISFJ: 80
    },
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cartoon%20character%20for%20ENFJ%20personality%2C%20charismatic%2C%20leadership%2C%20compassionate%2C%20watercolor%20style&image_size=square"
  },
  ENTJ: {
    code: "指挥官",
    name: "指挥官",
    description: "果断、有领导力，善于制定计划和实现目标。",
    loveStyle: "寻求有能力和目标的伴侣，重视效率和共同成就。",
    strengths: ["领导力", "果断", "战略思维", "效率"],
    weaknesses: ["过于强势", "缺乏耐心", "忽视情感", "固执"],
    compatibility: {
      INFP: 75,
      INTP: 85,
      ENFP: 75,
      ENTP: 90,
      INFJ: 75,
      INTJ: 90,
      ESTP: 80,
      ESFP: 65,
      ISFP: 65,
      ISTP: 75,
      ESTJ: 95,
      ESFJ: 70,
      ISTJ: 85,
      ISFJ: 70
    },
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cartoon%20character%20for%20ENTJ%20personality%2C%20decisive%2C%20leadership%2C%20goal-oriented%2C%20watercolor%20style&image_size=square"
  },
  ENTP: {
    code: "辩论家",
    name: "辩论家",
    description: "聪明、好奇，善于分析和辩论。",
    loveStyle: "寻求智力挑战和刺激，重视自由和多样性。",
    strengths: ["智力", "创造力", "灵活性", "幽默感"],
    weaknesses: ["过于辩论", "缺乏专注", "忽视细节", "对情感不敏感"],
    compatibility: {
      INFJ: 85,
      INTJ: 90,
      ENFJ: 75,
      ENTJ: 90,
      INFP: 75,
      INTP: 95,
      ESTP: 85,
      ESFP: 70,
      ISFP: 65,
      ISTP: 90,
      ESTJ: 75,
      ESFJ: 65,
      ISTJ: 70,
      ISFJ: 65
    },
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cartoon%20character%20for%20ENTP%20personality%2C%20clever%2C%20debater%2C%20curious%2C%20watercolor%20style&image_size=square"
  },
  ISFP: {
    code: "探险家",
    name: "探险家",
    description: "敏感、艺术，善于欣赏美和体验生活。",
    loveStyle: "寻求和谐和真实的情感连接，重视个人空间和自由。",
    strengths: ["敏感", "艺术感", "灵活性", "同情心"],
    weaknesses: ["过于敏感", "决策困难", "缺乏规划", "对冲突回避"],
    compatibility: {
      ENFP: 85,
      ENTP: 65,
      ESFP: 90,
      ESTP: 85,
      ISFP: 85,
      ISTP: 90,
      INFP: 85,
      INTP: 65,
      ENFJ: 70,
      ENTJ: 65,
      INFJ: 75,
      INTJ: 70,
      ESFJ: 80,
      ESTJ: 65,
      ISFJ: 85,
      ISTJ: 70
    },
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cartoon%20character%20for%20ISFP%20personality%2C%20artistic%2C%20sensitive%2C%20adventurous%2C%20watercolor%20style&image_size=square"
  },
  ISTP: {
    code: "鉴赏家",
    name: "鉴赏家",
    description: "实用、冷静，善于解决问题和动手操作。",
    loveStyle: "寻求独立和自由，重视行动和体验。",
    strengths: ["实用技能", "冷静", "独立", "适应性"],
    weaknesses: ["过于独立", "对情感不敏感", "缺乏规划", "冲动"],
    compatibility: {
      ESFP: 85,
      ESTP: 95,
      ISFP: 90,
      ISTP: 90,
      INFP: 70,
      INTP: 90,
      ENFP: 75,
      ENTP: 90,
      ESFJ: 65,
      ESTJ: 80,
      ISFJ: 65,
      ISTJ: 85,
      ENFJ: 65,
      ENTJ: 75,
      INFJ: 70,
      INTJ: 80
    },
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cartoon%20character%20for%20ISTP%20personality%2C%20practical%2C%20calm%2C%20hands-on%2C%20watercolor%20style&image_size=square"
  },
  ESFP: {
    code: "表演者",
    name: "表演者",
    description: "热情、活泼，善于社交和享受生活。",
    loveStyle: "寻求充满乐趣和激情的关系，重视当下的体验。",
    strengths: ["热情", "社交能力", "灵活性", "乐观"],
    weaknesses: ["冲动", "缺乏规划", "对批评敏感", "注意力分散"],
    compatibility: {
      ISFP: 90,
      ISTP: 85,
      ESFP: 85,
      ESTP: 90,
      ENFP: 80,
      ENTP: 70,
      INFP: 65,
      INTP: 65,
      ESFJ: 85,
      ESTJ: 75,
      ISFJ: 80,
      ISTJ: 70,
      ENFJ: 75,
      ENTJ: 65,
      INFJ: 65,
      INTJ: 60
    },
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cartoon%20character%20for%20ESFP%20personality%2C%20enthusiastic%2C%20social%2C%20performer%2C%20watercolor%20style&image_size=square"
  },
  ESTP: {
    code: "企业家",
    name: "企业家",
    description: "冒险、实用，善于抓住机会和解决问题。",
    loveStyle: "寻求刺激和行动，重视自由和多样性。",
    strengths: ["冒险精神", "实用技能", "灵活性", "自信"],
    weaknesses: ["冲动", "缺乏规划", "对情感不敏感", "风险偏好"],
    compatibility: {
      ISFP: 85,
      ISTP: 95,
      ESFP: 90,
      ESTP: 90,
      ENFP: 70,
      ENTP: 85,
      INFP: 60,
      INTP: 70,
      ESFJ: 70,
      ESTJ: 90,
      ISFJ: 65,
      ISTJ: 80,
      ENFJ: 65,
      ENTJ: 80,
      INFJ: 60,
      INTJ: 65
    },
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cartoon%20character%20for%20ESTP%20personality%2C%20adventurous%2C%20practical%2C%20entrepreneur%2C%20watercolor%20style&image_size=square"
  },
  ISFJ: {
    code: "守卫者",
    name: "守卫者",
    description: "忠诚、负责，善于照顾他人和维护和谐。",
    loveStyle: "寻求稳定和安全的关系，重视承诺和相互支持。",
    strengths: ["忠诚", "责任感", "同情心", "组织能力"],
    weaknesses: ["过度奉献", "对批评敏感", "缺乏灵活性", "难以表达情感"],
    compatibility: {
      ESFJ: 90,
      ESTJ: 85,
      ISFJ: 85,
      ISTJ: 90,
      INFJ: 80,
      INTJ: 70,
      ENFJ: 80,
      ENTJ: 70,
      ISFP: 85,
      ISTP: 65,
      ESFP: 80,
      ESTP: 65,
      INFP: 75,
      INTP: 65,
      ENFP: 70,
      ENTP: 65
    },
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cartoon%20character%20for%20ISFJ%20personality%2C%20loyal%2C%20caring%2C%20protective%2C%20watercolor%20style&image_size=square"
  },
  ISTJ: {
    code: "logistician",
    name: "物流师",
    description: "务实、可靠，善于组织和执行计划。",
    loveStyle: "寻求稳定和可预测的关系，重视忠诚和责任。",
    strengths: ["可靠", "组织能力", "责任感", "逻辑性"],
    weaknesses: ["过于传统", "缺乏灵活性", "对情感不敏感", "固执"],
    compatibility: {
      ESFJ: 85,
      ESTJ: 95,
      ISFJ: 90,
      ISTJ: 90,
      INFJ: 65,
      INTJ: 80,
      ENFJ: 65,
      ENTJ: 85,
      ISFP: 70,
      ISTP: 85,
      ESFP: 70,
      ESTP: 80,
      INFP: 65,
      INTP: 75,
      ENFP: 65,
      ENTP: 70
    },
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cartoon%20character%20for%20ISTJ%20personality%2C%20practical%2C%20reliable%2C%20organized%2C%20watercolor%20style&image_size=square"
  },
  ESFJ: {
    code: "执政官",
    name: "执政官",
    description: "热情、负责，善于照顾他人和维护和谐。",
    loveStyle: "寻求和谐和相互支持的关系，重视传统和承诺。",
    strengths: ["热情", "责任感", "社交能力", "组织能力"],
    weaknesses: ["过度奉献", "对批评敏感", "缺乏灵活性", "过于传统"],
    compatibility: {
      ISFJ: 90,
      ISTJ: 85,
      ESFJ: 85,
      ESTJ: 90,
      ENFJ: 85,
      ENTJ: 70,
      INFJ: 70,
      INTJ: 65,
      ESFP: 85,
      ESTP: 70,
      ISFP: 80,
      ISTP: 65,
      ENFP: 75,
      ENTP: 65,
      INFP: 70,
      INTP: 60
    },
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cartoon%20character%20for%20ESFJ%20personality%2C%20warm%2C%20caring%2C%20organized%2C%20watercolor%20style&image_size=square"
  },
  ESTJ: {
    code: "总经理",
    name: "总经理",
    description: "务实、果断，善于组织和领导。",
    loveStyle: "寻求稳定和有结构的关系，重视责任和成就。",
    strengths: ["领导力", "责任感", "组织能力", "果断"],
    weaknesses: ["过于强势", "缺乏灵活性", "对情感不敏感", "过于传统"],
    compatibility: {
      ISFJ: 85,
      ISTJ: 95,
      ESFJ: 90,
      ESTJ: 90,
      ENFJ: 70,
      ENTJ: 95,
      INFJ: 60,
      INTJ: 75,
      ESFP: 75,
      ESTP: 90,
      ISFP: 65,
      ISTP: 80,
      ENFP: 65,
      ENTP: 75,
      INFP: 60,
      INTP: 65
    },
    image: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20cartoon%20character%20for%20ESTJ%20personality%2C%20practical%2C%20decisive%2C%20leadership%2C%20watercolor%20style&image_size=square"
  }
} as const;

// 测试题目
export const questions = [
  {
    id: 1,
    text: "在社交场合中，你更倾向于：",
    options: [
      { value: "E", text: "主动与他人交流，享受社交活动" },
      { value: "I", text: "观察为主，需要时间独处恢复能量" }
    ],
    dimension: "E/I"
  },
  {
    id: 2,
    text: "当做出决策时，你更依赖：",
    options: [
      { value: "T", text: "逻辑分析和客观事实" },
      { value: "F", text: "个人价值观和情感因素" }
    ],
    dimension: "T/F"
  },
  {
    id: 3,
    text: "你更关注：",
    options: [
      { value: "S", text: "当前的具体事实和细节" },
      { value: "N", text: "未来的可能性和抽象概念" }
    ],
    dimension: "S/N"
  },
  {
    id: 4,
    text: "你更喜欢：",
    options: [
      { value: "J", text: "有计划、有条理的生活" },
      { value: "P", text: "灵活、即兴的生活方式" }
    ],
    dimension: "J/P"
  },
  {
    id: 5,
    text: "在团队中，你更擅长：",
    options: [
      { value: "E", text: "协调人际关系，促进团队和谐" },
      { value: "I", text: "专注于个人任务，独立完成工作" }
    ],
    dimension: "E/I"
  },
  {
    id: 6,
    text: "面对冲突时，你更倾向于：",
    options: [
      { value: "T", text: "理性分析问题，寻找解决方案" },
      { value: "F", text: "考虑各方感受，寻求和谐" }
    ],
    dimension: "T/F"
  },
  {
    id: 7,
    text: "学习新事物时，你更倾向于：",
    options: [
      { value: "S", text: "通过实践和具体例子学习" },
      { value: "N", text: "通过理论和概念理解学习" }
    ],
    dimension: "S/N"
  },
  {
    id: 8,
    text: "对于未完成的任务，你会：",
    options: [
      { value: "J", text: "尽快完成，避免拖延" },
      { value: "P", text: "灵活安排，在最后期限前完成" }
    ],
    dimension: "J/P"
  },
  {
    id: 9,
    text: "你更享受：",
    options: [
      { value: "E", text: "与朋友聚会，参加社交活动" },
      { value: "I", text: "在家读书，享受安静时光" }
    ],
    dimension: "E/I"
  },
  {
    id: 10,
    text: "在评价他人时，你更看重：",
    options: [
      { value: "T", text: "能力和成就" },
      { value: "F", text: "品德和人际关系" }
    ],
    dimension: "T/F"
  },
  {
    id: 11,
    text: "你更关注：",
    options: [
      { value: "S", text: "事物的实际用途和效果" },
      { value: "N", text: "事物的象征意义和可能性" }
    ],
    dimension: "S/N"
  },
  {
    id: 12,
    text: "你更喜欢：",
    options: [
      { value: "J", text: "提前规划，做好准备" },
      { value: "P", text: "随机应变，适应变化" }
    ],
    dimension: "J/P"
  },
  {
    id: 13,
    text: "在社交中，你更像是：",
    options: [
      { value: "E", text: "主动发起对话的人" },
      { value: "I", text: "等待他人主动的人" }
    ],
    dimension: "E/I"
  },
  {
    id: 14,
    text: "做决定时，你更考虑：",
    options: [
      { value: "T", text: "客观公正的原则" },
      { value: "F", text: "个人和他人的感受" }
    ],
    dimension: "T/F"
  },
  {
    id: 15,
    text: "你更相信：",
    options: [
      { value: "S", text: "可观察到的事实" },
      { value: "N", text: "直觉和预感" }
    ],
    dimension: "S/N"
  },
  {
    id: 16,
    text: "对于生活，你更倾向于：",
    options: [
      { value: "J", text: "有明确的目标和计划" },
      { value: "P", text: "随遇而安，享受过程" }
    ],
    dimension: "J/P"
  },
  {
    id: 17,
    text: "你更擅长：",
    options: [
      { value: "E", text: "表达自己的想法和感受" },
      { value: "I", text: "倾听他人的想法和感受" }
    ],
    dimension: "E/I"
  },
  {
    id: 18,
    text: "在解决问题时，你更注重：",
    options: [
      { value: "T", text: "效率和结果" },
      { value: "F", text: "过程和参与感" }
    ],
    dimension: "T/F"
  },
  {
    id: 19,
    text: "你更关注：",
    options: [
      { value: "S", text: "当下的体验和感受" },
      { value: "N", text: "未来的发展和可能性" }
    ],
    dimension: "S/N"
  },
  {
    id: 20,
    text: "你更喜欢：",
    options: [
      { value: "J", text: "结构清晰，有章可循" },
      { value: "P", text: "灵活多变，自由发挥" }
    ],
    dimension: "J/P"
  }
];
