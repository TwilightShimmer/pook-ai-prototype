export const strategyCopy = {
  1: {
    title: "1 人课堂策略",
    text: "POKI 会更像陪伴型老师，问题更具体，提示更及时，让孩子独立完成探索。",
    roles: ["小小工程师"],
  },
  2: {
    title: "2 人课堂策略",
    text: "POKI 会安排轮流表达，一个小朋友先说，另一个小朋友补充，拼搭任务交替完成。",
    roles: ["观察员", "搭建员"],
  },
  3: {
    title: "3 人课堂策略",
    text: "POKI 会让每位小朋友都有一次观察机会，再请小队一起选出最合理的答案。",
    roles: ["观察员", "搭建员", "讲述员"],
  },
  4: {
    title: "4 人课堂策略",
    text: "POKI 会使用更清楚的角色轮换，控制抢答，让每个孩子都能参与表达和操作。",
    roles: ["观察员", "材料员", "搭建员", "总结员"],
  },
};

export const courseSteps = [
  {
    title: "选择年龄和套件大类",
    breadcrumb: "课程中心",
    isAgeKitStep: true,
    options: [
      { label: "积木", desc: "5岁+ 推荐：乐高教具、AI 积木、通用积木", visual: "lego-dots" },
      { label: "3D 打印", desc: "5岁+ 推荐：结构观察、简单组合、创意模型", visual: "print-cube" },
      { label: "绘本", desc: "5岁+ 推荐：故事互动、角色扮演、表达训练", visual: "book-shape" },
    ],
  },
  {
    title: "选择积木类别",
    breadcrumb: "5岁+ / 积木",
    options: [
      { label: "乐高教育", desc: "Science、SPIKE、AI 套件", visual: "lego-brand" },
      { label: "POOK AI 积木", desc: "POOK 自研互动教具", visual: "pook-block" },
      { label: "其他积木", desc: "兼容更多课堂已有教具", visual: "common-block" },
    ],
  },
  {
    title: "选择乐高教育套件",
    breadcrumb: "5岁+ / 积木 / 乐高教育",
    options: [
      { label: "Science 科学系列", desc: "动物、环境、工程观察", visual: "science", tag: "45620" },
      { label: "AI 套件", desc: "感知、判断、智能控制", visual: "ai", tag: "AI" },
      { label: "SPIKE 科创套装", desc: "编程、机械、机器人", visual: "spike", tag: "SPIKE" },
    ],
  },
  {
    title: "Science 对应课程",
    breadcrumb: "5岁+ / 积木 / 乐高教育 / Science",
    isLessonStep: true,
    isScienceThemeStep: true,
    options: [],
  },
];

export const scienceThemes = [
  {
    key: "life",
    label: "生命科学",
    stars: 1,
    summary: "课程主题",
    art: "life",
    shortLabel: "生命",
  },
  {
    key: "nature",
    label: "自然科学",
    stars: 2,
    summary: "课程主题",
    art: "nature",
    shortLabel: "自然",
  },
  {
    key: "engineering",
    label: "工程科学",
    stars: 3,
    summary: "课程主题",
    art: "engineering",
    shortLabel: "工程",
  },
  {
    key: "humanity",
    label: "社会人文",
    stars: 4,
    summary: "课程主题",
    art: "humanity",
    shortLabel: "人文",
  },
];

export const defaultScienceThemeKey = "life";

export const scienceThemeLessons = {
  humanity: [
    {
      label: "热闹的社区",
      desc: "社会人文 · 合作分工 · 30-40min",
      visual: "community",
      level: "L1",
      difficultyText: "入门",
    },
    {
      label: "一起开商店",
      desc: "社会人文 · 交换体验 · 30-40min",
      visual: "community",
      level: "L2",
      difficultyText: "入门+",
    },
    {
      label: "我的小小职业城",
      desc: "社会人文 · 角色配合 · 30-40min",
      visual: "community",
      level: "L3",
      difficultyText: "进阶",
    },
    {
      label: "一起设计便利站",
      desc: "社会人文 · 场景表达 · 30-40min",
      visual: "community",
      level: "L4",
      difficultyText: "进阶+",
    },
    {
      label: "我们的城市一天",
      desc: "社会人文 · 主题讲述 · 30-40min",
      visual: "community",
      level: "L5",
      difficultyText: "挑战",
    },
  ],
  engineering: [
    {
      label: "为犀牛洗澡",
      desc: "工程科学 · 推拉结构 · 30-40min",
      visual: "rhino",
      level: "L1",
      difficultyText: "入门",
    },
    {
      label: "让门开起来",
      desc: "工程科学 · 简单联动 · 30-40min",
      visual: "rhino",
      level: "L2",
      difficultyText: "入门+",
    },
    {
      label: "帮小车过桥",
      desc: "工程科学 · 稳定结构 · 30-40min",
      visual: "rhino",
      level: "L3",
      difficultyText: "进阶",
    },
    {
      label: "让装置动起来",
      desc: "工程科学 · 联动设计 · 30-40min",
      visual: "rhino",
      level: "L4",
      difficultyText: "进阶+",
    },
    {
      label: "搭一台运输机",
      desc: "工程科学 · 组合机械 · 30-40min",
      visual: "rhino",
      level: "L5",
      difficultyText: "挑战",
    },
  ],
  nature: [
    {
      label: "风从哪里来？",
      desc: "自然科学 · 风力观察 · 30-40min",
      visual: "wind",
      level: "L1",
      difficultyText: "入门",
    },
    {
      label: "下雨前发生了什么",
      desc: "自然科学 · 天气线索 · 30-40min",
      visual: "wind",
      level: "L2",
      difficultyText: "入门+",
    },
    {
      label: "云朵会去哪儿",
      desc: "自然科学 · 天气变化 · 30-40min",
      visual: "wind",
      level: "L3",
      difficultyText: "进阶",
    },
    {
      label: "四季小站",
      desc: "自然科学 · 季节特征 · 30-40min",
      visual: "wind",
      level: "L4",
      difficultyText: "进阶+",
    },
    {
      label: "太阳和影子",
      desc: "自然科学 · 光影观察 · 30-40min",
      visual: "wind",
      level: "L5",
      difficultyText: "挑战",
    },
  ],
  life: [
    {
      label: "这是谁的房间？",
      desc: "生命科学 · 动物栖息地 · 30-40min",
      visual: "polar",
      level: "L1",
      difficultyText: "入门",
    },
    {
      label: "谁住在水边",
      desc: "生命科学 · 环境观察 · 30-40min",
      visual: "polar",
      level: "L2",
      difficultyText: "入门+",
    },
    {
      label: "谁需要喝水",
      desc: "生命科学 · 生长需求 · 30-40min",
      visual: "polar",
      level: "L3",
      difficultyText: "进阶",
    },
    {
      label: "动物的冬天准备",
      desc: "生命科学 · 适应环境 · 30-40min",
      visual: "polar",
      level: "L4",
      difficultyText: "进阶+",
    },
    {
      label: "小生命会长大",
      desc: "生命科学 · 成长变化 · 30-40min",
      visual: "polar",
      level: "L5",
      difficultyText: "挑战",
    },
  ],
};
