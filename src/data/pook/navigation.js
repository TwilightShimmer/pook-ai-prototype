export const screens = [
  { id: "home", title: "POOK 玩学首页" },
  { id: "shop", title: "套件商城" },
  { id: "course", title: "探索更多课程" },
  { id: "meet-test", title: "见面布局Test" },
  { id: "meet", title: "见面" },
  { id: "welcome", title: "课前欢迎" },
  { id: "goals", title: "本节课目标" },
  { id: "question", title: "互动问答" },
  { id: "blocks", title: "找一找积木" },
  { id: "build", title: "固定拼搭" },
  { id: "free-build", title: "自由拼搭" },
  { id: "share", title: "作品分享" },
  { id: "result", title: "课后成长卡" },
  { id: "growth", title: "成长中心" },
  { id: "profile", title: "我的 POOK AI" },
  { id: "teacher", title: "课堂辅助设置" },
];

export const linearFlow = [
  "course",
  "meet",
  "welcome",
  "goals",
  "question",
  "blocks",
  "build",
  "free-build",
  "share",
  "result",
];

export const dockClassScreens = [
  "meet",
  "welcome",
  "goals",
  "question",
  "blocks",
  "build",
  "free-build",
  "share",
  "result",
];

export const immersiveScreens = [...linearFlow, "meet-test"];

export const progressLabels = {
  course: "选课",
  meet: "见面",
  welcome: "欢迎",
  goals: "目标",
  question: "问答",
  blocks: "找积木",
  build: "拼搭",
  "free-build": "创作",
  share: "分享",
  result: "成长卡",
};

export const lessonJourneyMeta = {
  course: { short: "选课", action: "选择今天的课程主题", reward: "进入课堂" },
  meet: { short: "见面", action: "让 Pooki 看见今天来上课的小队友", reward: "完成编号和分工" },
  welcome: { short: "欢迎", action: "和 Pooki 一起准备开始", reward: "建立熟悉感" },
  goals: { short: "目标", action: "回顾上次完成内容并确认今天任务", reward: "明确课堂目标" },
  question: { short: "问答", action: "先观察，再回答第一个小问题", reward: "点亮观察力" },
  blocks: { short: "找积木", action: "找到今天要用的积木", reward: "解锁搭建" },
  build: { short: "拼搭", action: "按步骤完成基础作品", reward: "点亮动手能力" },
  "free-build": { short: "创作", action: "继续补充作品场景和细节", reward: "点亮创造力" },
  share: { short: "分享", action: "说出你的作品和想法", reward: "点亮表达力" },
  result: { short: "成长卡", action: "查看今天完成了什么", reward: "生成成长记录" },
};

export const dockItems = [
  { id: "home", label: "首页", emoji: "🏠" },
  { id: "course", label: "探索", emoji: "🧭" },
  { id: "meet-test", label: "见面", emoji: "📷" },
  { id: "shop", label: "商城", emoji: "🎁" },
  { id: "growth", label: "成长", emoji: "🌱" },
  { id: "profile", label: "我的", emoji: "⭐" },
];
