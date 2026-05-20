export const betaLessonCatalog = {
  "为犀牛洗澡": {
    theme: "工程科学",
    title: "为犀牛洗澡",
    atmosphere: "帮助犀牛搭建洗澡场景",
    welcomeFirst: [
      "你好呀，欢迎来到 POOK AI 课堂！",
      "今天我们要一起帮助犀牛完成洗澡任务。",
      "准备好和 Pooki 一起开始了吗？",
    ],
    welcomeBack: [
      "欢迎回来！",
      "上次我们一起完成了小推车和泥坑。",
      "今天，我们要继续帮助犀牛完成洗澡任务。",
    ],
    previousLesson: ["小推车", "泥坑"],
    currentTasks: ["找到需要的积木", "搭建犀牛洗澡场景", "分享你的作品"],
    abilityTags: ["动手能力", "空间理解", "勇敢表达"],
    badge: "洗澡任务小勇士",
    encouragement: "你今天认真完成了搭建任务，还勇敢介绍了自己的作品，太棒啦！",
    welcomeVisual: "rhino",
  },
  "这是谁的房间？": {
    theme: "生命科学",
    title: "这是谁的房间？",
    atmosphere: "帮助动物找到合适的家",
    welcomeFirst: [
      "你好呀，欢迎来到 POOK AI 课堂！",
      "今天我们要一起帮小动物找到合适的房间。",
      "准备好和 Pooki 一起开始了吗？",
    ],
    welcomeBack: [
      "欢迎回来！",
      "上次我们一起观察了冰雪和房间线索。",
      "今天，我们要继续帮动物找到合适的家。",
    ],
    previousLesson: ["冰雪观察", "房间线索"],
    currentTasks: ["看看动物喜欢什么环境", "找到需要的积木", "分享你的作品"],
    abilityTags: ["观察能力", "动手能力", "勇敢表达"],
    badge: "动物小侦探",
    encouragement: "你今天认真观察了环境，还能说出自己的想法，真不错！",
    welcomeVisual: "polar",
  },
  "风从哪里来？": {
    theme: "自然科学",
    title: "风从哪里来？",
    atmosphere: "一起观察风和天气变化",
    welcomeFirst: [
      "你好呀，欢迎来到 POOK AI 课堂！",
      "今天我们要一起观察风从哪里来。",
      "准备好和 Pooki 一起开始了吗？",
    ],
    welcomeBack: [
      "欢迎回来！",
      "上次我们一起看了云朵和天气线索。",
      "今天，我们要继续观察风的变化。",
    ],
    previousLesson: ["云朵线索", "天气变化"],
    currentTasks: ["观察风的方向", "找到需要的积木", "搭出风的场景"],
    abilityTags: ["观察能力", "空间理解", "勇敢表达"],
    badge: "天气观察员",
    encouragement: "你今天观察得很认真，还能把自己的发现说出来，继续保持！",
    welcomeVisual: "wind",
  },
  "热闹的社区": {
    theme: "社会人文",
    title: "热闹的社区",
    atmosphere: "一起搭一个热闹的小社区",
    welcomeFirst: [
      "你好呀，欢迎来到 POOK AI 课堂！",
      "今天我们要一起搭建一个热闹的社区。",
      "准备好和 Pooki 一起开始了吗？",
    ],
    welcomeBack: [
      "欢迎回来！",
      "上次我们一起认识了社区里的不同角色。",
      "今天，我们要继续把社区搭出来。",
    ],
    previousLesson: ["社区角色", "场景观察"],
    currentTasks: ["找到需要的积木", "搭建社区场景", "介绍你的作品"],
    abilityTags: ["合作能力", "动手能力", "勇敢表达"],
    badge: "社区搭建小能手",
    encouragement: "你今天搭出了自己的社区，还能介绍作品，表现很棒！",
    welcomeVisual: "community",
  },
};

export const defaultBetaLesson = betaLessonCatalog["为犀牛洗澡"];

export const homeTestQuickActions = [
  { id: "shop", label: "商城", note: "新套件", route: "shop", tone: "cyan" },
  { id: "growth", label: "成长", note: "看记录", route: "growth", tone: "mint" },
  { id: "profile", label: "我的", note: "小档案", route: "profile", tone: "violet" },
  { id: "teacher", label: "老师", note: "辅助台", route: "teacher", tone: "orange" },
  { id: "course", label: "探索", note: "更多课", route: "course", tone: "pink" },
];

export const shopRewardCatalog = [
  {
    id: "sticker-pack",
    name: "POKI 贴纸包",
    type: "贴纸",
    cost: 18,
    note: "把上课小成就贴在你的手帐上",
    badge: "快速兑换",
    tone: "mint",
  },
  {
    id: "theme-medal",
    name: "课程小勋章",
    type: "勋章",
    cost: 36,
    note: "完成一节课之后，很适合用来留纪念",
    badge: "热门奖励",
    tone: "orange",
  },
  {
    id: "lesson-card",
    name: "主题卡片实物版",
    type: "卡片",
    cost: 48,
    note: "把数字展馆里的课程卡带回家",
    badge: "展馆同款",
    tone: "cyan",
  },
  {
    id: "flash-pack",
    name: "闪卡小礼盒",
    type: "礼盒",
    cost: 88,
    note: "包含闪卡贴纸、小勋章和预备卡套",
    badge: "限定兑换",
    tone: "violet",
  },
];

export const meetRoleProfiles = [
  {
    id: "builder",
    title: "建造家",
    note: "负责把想法真的搭出来",
    color: "mint",
  },
  {
    id: "director",
    title: "指挥者",
    note: "负责提醒步骤和安排顺序",
    color: "orange",
  },
  {
    id: "observer",
    title: "观察员",
    note: "负责发现细节和给出线索",
    color: "cyan",
  },
  {
    id: "sharer",
    title: "分享员",
    note: "负责介绍作品和表达想法",
    color: "violet",
  },
];

export const meetStageCopy = {
  introTitle: "先和 Pooki 见个面",
  introBody: "Pooki 会先看看今天是谁来上课，再帮大家排好编号和角色。",
  scanning: "正在识别今天的小队友…",
  captured: "拍好啦，Pooki 正在安排今天的角色分工",
  splitTitle: "今天的小队角色",
  autoAdvance: "角色确认完成后，会自动进入本节课目标",
};
