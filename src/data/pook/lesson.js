export const blockCards = [
  { key: "white", count: "4 个", label: "白色砖块", brickClass: "white" },
  { key: "teal", count: "2 个", label: "蓝绿色砖块", brickClass: "teal" },
  { key: "blue", count: "6 个", label: "蓝色长砖", brickClass: "blue" },
  { key: "yellow", count: "2 个", label: "黄色顶部件", brickClass: "yellow" },
  { key: "red", count: "2 个", label: "红色连接件", brickClass: "red" },
  { key: "teal-small", count: "2 个", label: "透明小零件", brickClass: "teal small" },
];

export const shareQueueCopy = [
  { title: "第 1 句", body: "我的作品叫____。" },
  { title: "第 2 句", body: "它最特别的地方是____。" },
  { title: "第 3 句", body: "它可以帮助犀牛____。" },
];

export function createInitialLessonState() {
  return {
    question: {
      index: 0,
      completed: false,
      answered: false,
      steps: [
        {
          prompt: "犀牛长得什么样子？",
          hint: "可以看看它的身体、角和颜色，先说一个你看到的地方就可以。",
          bubble: "我们先一起观察，再回答。",
          stateTitle: "Pooki 正在等待小朋友观察犀牛",
          stateBody: "先看看犀牛的身体，再说一个你看到的特点。",
          options: ["身体大大的，头上有角", "身体很小，住在树上", "它会在空中飞"],
          correct: 0,
          success: "说得对，犀牛身体大大的，头上还有角。",
          error: "再看看犀牛的身体和头上的角。",
        },
      ],
    },
    question2: {
      index: 0,
      completed: false,
      answered: false,
      steps: [
        {
          prompt: "刚刚我们拼出来的是什么？",
          hint: "可以先看一看作品，它是给小犀牛用来洗澡的地方。",
          bubble: "拼完以后，我们要知道自己搭出了什么。",
          stateTitle: "Pooki 正在听小朋友介绍刚刚的作品",
          stateBody: "先说它是什么，再说它帮小犀牛做什么。",
          options: ["小犀牛的洗澡池", "会飞的火箭", "小老鼠的房间"],
          correct: 0,
          success: "说对啦，这是给小犀牛洗澡用的地方。",
          error: "再看看刚刚拼的作品，它是帮小犀牛洗澡的。",
        },
      ],
    },
    blocks: {
      index: 0,
      completed: false,
      found: [],
      steps: [
        {
          key: "white",
          title: "先找白色砖块",
          body: "先找到 4 个白色砖块，找到后再点一下确认。",
          aside: "一次只找一种积木，先从白色开始。",
          success: "白色砖块找到了。",
        },
        {
          key: "blue",
          title: "再找蓝色长砖",
          body: "再找到 6 个蓝色长砖，数量对了再继续。",
          aside: "现在只看蓝色长砖，不要一次拿太多别的积木。",
          success: "蓝色长砖也找齐了。",
        },
        {
          key: "yellow",
          title: "最后找黄色顶部件",
          body: "最后找到 2 个黄色顶部件，材料就准备好了。",
          aside: "这一步完成后，就可以进入固定拼搭。",
          success: "材料准备完成，可以开始拼搭。",
        },
      ],
    },
    build: {
      index: 0,
      completed: false,
      steps: [
        {
          title: "第 1 步：先搭泥坑底座",
          body: "先把底座铺好，给犀牛留出可以站进去的位置。",
          roles: ["1 号放底座", "2 号递蓝色件", "3 号检查方向"],
          aside: "这一步先看位置对不对，不着急加太多零件。",
          success: "底座搭好了。",
        },
        {
          title: "第 2 步：围出洗澡区域",
          body: "把洗澡区域围起来，留出犀牛可以进去的入口。",
          roles: ["1 号摆白色砖块", "2 号补两侧", "3 号留出入口"],
          aside: "围起来后，先看看入口有没有留出来。",
          success: "洗澡区域围好了。",
        },
        {
          title: "第 3 步：加上洗澡装置",
          body: "最后把上面的装置加上去，让场景更像犀牛的澡池。",
          roles: ["1 号扶住底座", "2 号放顶部件", "3 号检查稳不稳"],
          aside: "最后一步只要稳稳装好，固定拼搭就完成了。",
          success: "固定拼搭完成了。",
        },
      ],
    },
    "free-build": {
      index: 0,
      completed: false,
      steps: [
        {
          title: "创作挑战 1",
          body: "先给犀牛加一个更舒服的洗澡区。",
          aside: "先做一个最明显的变化，再想下一步。",
          success: "洗澡区补充完成了。",
          label: "洗澡区",
        },
        {
          title: "创作挑战 2",
          body: "再给犀牛加一条能走进去的小路。",
          aside: "把小路做出来，作品会更像真实场景。",
          success: "小路做好了。",
          label: "小路",
        },
        {
          title: "创作挑战 3",
          body: "最后加一个你觉得最特别的小细节。",
          aside: "最后一个小细节可以是装饰，也可以是帮助犀牛的东西。",
          success: "自由创作完成了。",
          label: "细节",
        },
      ],
    },
    photo: {
      index: 0,
      completed: false,
      steps: [],
    },
    share: {
      index: 0,
      completed: false,
      steps: [
        {
          stateTitle: "Pooki 正在听第 1 位小朋友分享",
          stateBody: "先说作品名字。",
          hint: "可以直接说：我的作品叫____。",
          aside: "先说名字，短一点也可以。",
          success: "第 1 句完成了。",
          label: "第 1 句",
        },
        {
          stateTitle: "Pooki 正在听第 2 位小朋友分享",
          stateBody: "再说一个最特别的地方。",
          hint: "可以直接说：它最特别的地方是____。",
          aside: "现在只说一个最特别的结构就够了。",
          success: "第 2 句完成了。",
          label: "第 2 句",
        },
        {
          stateTitle: "Pooki 正在听第 3 位小朋友分享",
          stateBody: "最后说它怎么帮助犀牛。",
          hint: "可以直接说：它可以帮助犀牛____。",
          aside: "最后说用途，说完这句就完成分享。",
          success: "作品分享完成了。",
          label: "第 3 句",
        },
      ],
    },
  };
}
