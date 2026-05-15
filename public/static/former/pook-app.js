const screens = [
  { id: "home", title: "POOK 星球活动" },
  { id: "shop", title: "套件商城" },
  { id: "course", title: "课程中心" },
  { id: "class-size", title: "选择上课人数" },
  { id: "team-photo", title: "让 POKI 看一看" },
  { id: "story", title: "绘本动画" },
  { id: "question", title: "互动问答" },
  { id: "blocks", title: "找一找积木" },
  { id: "build", title: "3D 拼搭引导" },
  { id: "build-talk", title: "拼搭问答" },
  { id: "free-build", title: "自由拼搭" },
  { id: "photo", title: "拍一拍你的作品" },
  { id: "share", title: "分享拼搭结果" },
  { id: "result", title: "课程完成" },
  { id: "growth", title: "成长中心" },
  { id: "profile", title: "我的 POOK AI" },
  { id: "teacher", title: "课堂辅助设置" },
];

const linearFlow = [
  "course",
  "class-size",
  "team-photo",
  "story",
  "question",
  "blocks",
  "build",
  "build-talk",
  "free-build",
  "photo",
  "share",
  "result",
];

const dockClassScreens = [
  "class-size",
  "team-photo",
  "story",
  "question",
  "blocks",
  "build",
  "build-talk",
  "free-build",
  "photo",
  "share",
  "result",
];

const immersiveScreens = [
  "course",
  "class-size",
  "team-photo",
  "story",
  "question",
  "blocks",
  "build",
  "build-talk",
  "free-build",
  "photo",
  "share",
  "result",
];

const progressLabels = {
  course: "选课",
  "class-size": "组队",
  "team-photo": "入镜",
  story: "故事",
  question: "问答",
  blocks: "找积木",
  build: "搭建",
  "build-talk": "复盘",
  "free-build": "创作",
  photo: "拍照",
  share: "分享",
  result: "完成",
};

const strategyCopy = {
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

const courseSteps = [
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
    options: [
      { label: "为犀牛洗澡", desc: "工程思维 · 推拉结构 · 30-40min", visual: "rhino" },
      { label: "这是谁的房间？", desc: "生命科学 · 动物栖息地 · 30-40min", visual: "polar" },
    ],
  },
];

const cues = {
  "team-photo": {
    type: "任务开始",
    title: "先让 POKI 认识小队",
    body: "请三位小朋友一起进入画面。POKI 会记住大家的号码，并分配观察员、搭建员和讲述员。",
  },
  story: {
    type: "故事开始",
    title: "先看一段绘本动画",
    body: "请小朋友先观察故事里的动物、房间和线索。看完后 POKI 会请大家回答问题。",
  },
  question: {
    type: "互动开始",
    title: "开始连续小问答",
    body: "这一段每次只做一题，答对后立刻进入下一题。",
  },
  blocks: {
    type: "实体任务",
    title: "开始逐个找材料",
    body: "先完成一个材料目标，再切下一个，不用一次记住全部材料。",
  },
  build: {
    type: "拼搭开始",
    title: "一次只搭一步",
    body: "底座、墙面、屋顶分开完成，每一步确认后再继续。",
  },
  "build-talk": {
    type: "作品观察",
    title: "说说你们搭出了什么",
    body: "POKI 会围绕刚刚搭好的模型提问，请小队轮流观察、解释和补充。",
  },
  "free-build": {
    type: "自由创作",
    title: "先完成三个小创作目标",
    body: "先做保暖，再做入口，最后补一个玩耍区域，最后它们会拼成完整作品。",
  },
  photo: {
    type: "作品记录",
    title: "按角度逐张拍",
    body: "先拍正面，再拍侧面和背面，每张都确认一次。",
  },
  share: {
    type: "作品分享",
    title: "一人一句轮流说",
    body: "每位小朋友只说一句，按句式说清楚名字、结构和用途。",
  },
  result: {
    type: "任务完成",
    title: "课程完成啦",
    body: "POKI 已经根据问答、拼搭和分享表现生成了今天的小队评价。",
  },
};

const lessonState = {
  question: {
    index: 0,
    completed: false,
    answered: false,
    steps: [
      {
        prompt: "企鹅更适合住在哪里？",
        hint: "先看有没有冰雪，再想一想企鹅喜欢什么环境。",
        bubble: "1 号先说环境线索。",
        stateTitle: "POKI 正在听 1 号小朋友回答",
        stateBody: "先选出企鹅适合生活的地方。",
        options: ["冰雪很多的地方", "很热的沙漠", "高高的树上"],
        correct: 0,
        success: "答对了，企鹅住在寒冷、有冰雪的地方。",
        error: "再看看故事里的冰屋和雪地。",
      },
      {
        prompt: "为什么企鹅更适合住在这样的地方？",
        hint: "想一想企鹅的身体和它需要的温度。",
        bubble: "2 号补一句原因，3 号可以帮忙总结。",
        stateTitle: "POKI 正在听 2 号和 3 号补充",
        stateBody: "第二题说出原因，不用说很长。",
        options: ["因为企鹅适应寒冷环境", "因为企鹅喜欢沙子", "因为树上更容易睡觉"],
        correct: 0,
        success: "很好，你们把环境和原因连起来了。",
        error: "再想想企鹅为什么会长出适合寒冷的身体。",
      },
    ],
  },
  blocks: {
    index: 0,
    completed: false,
    found: [],
    steps: [
      { key: "white", title: "第 1 个材料", body: "先找到 5 个白色砖块，找到后点一下对应材料卡。", aside: "1 号先找白色，找到后全组确认。", success: "找到白色砖块了，继续下一种。" },
      { key: "teal", title: "第 2 个材料", body: "再找到 2 个蓝绿色砖块，找到后马上确认。", aside: "2 号找蓝绿色，3 号检查数量。", success: "蓝绿色砖块也齐了。" },
      { key: "blue", title: "第 3 个材料", body: "最后找到 12 个蓝色长砖，材料就准备好了。", aside: "最后一项是蓝色长砖，找到后就能进入搭建。", success: "材料准备完成，可以开始搭建了。" },
    ],
  },
  build: {
    index: 0,
    completed: false,
    steps: [
      { title: "第 1 步：先搭底座", body: "1 号放底板，2 号递蓝色件，3 号检查方向，对齐后再确认。", roles: ["1 号搭底座", "2 号递蓝色件", "3 号检查方向"], aside: "先把底座搭稳，这一步只看方向。", success: "底座搭好了，继续加墙面。" },
      { title: "第 2 步：把墙面围起来", body: "这一步把四周围起来，留出企鹅可以进去的入口。", roles: ["1 号摆白色墙面", "2 号补齐两侧", "3 号留出入口"], aside: "墙面围好后先看入口是不是留出来了。", success: "墙面完成了，最后加屋顶。" },
      { title: "第 3 步：盖上屋顶", body: "把顶部件盖上去，确认屋顶稳稳地落在墙面上。", roles: ["1 号扶住墙面", "2 号放顶部件", "3 号检查稳不稳"], aside: "最后一步只要稳稳合上，房间就搭好了。", success: "搭建完成，模型已经可以观察了。" },
    ],
  },
  "free-build": {
    index: 0,
    completed: false,
    steps: [
      { title: "创作挑战 1", body: "先给企鹅加一个更保暖的地方，完成后再做下一项。", aside: "保暖先做出来，别同时改别的地方。", success: "保暖部分完成了。", label: "保暖" },
      { title: "创作挑战 2", body: "再给企鹅加一个更容易进出的入口。", aside: "入口只做一处，先保证能看出来。", success: "入口也做好了。", label: "入口" },
      { title: "创作挑战 3", body: "最后补一个可以玩耍或休息的区域。", aside: "最后加一个让作品更有趣的小区域。", success: "三个创作目标都完成了。", label: "玩耍" },
    ],
  },
  photo: {
    index: 0,
    completed: false,
    steps: [
      { title: "先拍作品正面", body: "把作品放在画面中间，拍完这一面再继续下一面。", aside: "先拍正面，再慢慢转到侧面。", success: "正面拍好了。", tab: "正面" },
      { title: "再拍作品侧面", body: "轻轻转动作品，拍到侧面结构。", aside: "侧面要拍到入口和墙面。", success: "侧面拍好了。", tab: "侧面" },
      { title: "最后拍作品背面", body: "最后拍背面，三张都完成后进入分享。", aside: "拍完背面，这一关就完成了。", success: "三张照片都拍好了。", tab: "背面" },
    ],
  },
  share: {
    index: 0,
    completed: false,
    steps: [
      { stateTitle: "POKI 正在听 1 号分享", stateBody: "先说作品名字。", hint: "直接说：我的作品叫____。", aside: "先轮到 1 号，只说作品名字。", success: "1 号分享完成。", label: "1 号" },
      { stateTitle: "POKI 正在听 2 号分享", stateBody: "再说一个最特别的结构。", hint: "直接说：我最喜欢的结构是____。", aside: "现在轮到 2 号，说一个结构就够了。", success: "2 号分享完成。", label: "2 号" },
      { stateTitle: "POKI 正在听 3 号分享", stateBody: "最后说它怎么帮助企鹅。", hint: "直接说：它可以帮助企鹅____。", aside: "最后轮到 3 号，说用途就结束。", success: "全组分享完成。", label: "3 号" },
    ],
  },
};

let current = "course";
let lastCueKey = "";
let courseStepIndex = 0;
let coursePath = [];
let resultChestTimer = null;
let gemBalanceValue = 1280;
let rewardClaimed = false;
const rewardGemAmount = 120;

const app = document.querySelector(".pook-app");
const title = document.querySelector("#screenTitle");
const backBtn = document.querySelector("#backBtn");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");
const dots = document.querySelector("#progressDots");
const strategyCard = document.querySelector("#strategyCard");
const taskOverlay = document.querySelector("#taskOverlay");
const cueType = document.querySelector("#cueType");
const cueTitle = document.querySelector("#cueTitle");
const cueBody = document.querySelector("#cueBody");
const cueCloseBtn = document.querySelector("#cueCloseBtn");
const courseBackBtn = document.querySelector("#courseBackBtn");
const courseBreadcrumb = document.querySelector("#courseBreadcrumb");
const courseStepTitle = document.querySelector("#courseStepTitle");
const courseChoiceStage = document.querySelector("#courseChoiceStage");
const lessonToast = document.querySelector("#lessonToast");
const lessonNav = document.querySelector(".lesson-nav");
const rewardChestOverlay = document.querySelector("#rewardChestOverlay");
const rewardChestCard = document.querySelector("#rewardChestCard");
const rewardChestBtn = document.querySelector("#rewardChestBtn");
const rewardChestCopy = document.querySelector("#rewardChestCopy");
const rewardClaimBtn = document.querySelector("#rewardClaimBtn");
const gemBalance = document.querySelector("#gemBalance");

function getLinearIndex(id = current) {
  const index = linearFlow.indexOf(id);
  return index >= 0 ? index : 0;
}

function showToast(message) {
  if (!lessonToast) return;
  lessonToast.textContent = message;
  lessonToast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    lessonToast.classList.remove("show");
  }, 1400);
}

function renderGemBalance() {
  if (gemBalance) gemBalance.textContent = String(gemBalanceValue);
}

function resetResultReward() {
  if (resultChestTimer) {
    window.clearTimeout(resultChestTimer);
    resultChestTimer = null;
  }
  rewardClaimed = false;
  if (rewardChestOverlay) rewardChestOverlay.classList.remove("show");
  if (rewardChestCard) rewardChestCard.classList.remove("opened");
  if (rewardChestCopy) rewardChestCopy.textContent = "打开宝箱，领取本节课的小队宝石积分。";
}

function scheduleResultReward() {
  resetResultReward();
  resultChestTimer = window.setTimeout(() => {
    rewardChestOverlay.classList.add("show");
    showToast("小队宝箱已解锁");
  }, 3000);
}

function renderStageDots() {
  dots.innerHTML = "";
  linearFlow.forEach((id) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = id === current ? "active" : "";
    dot.textContent = progressLabels[id] || id;
    dot.setAttribute("aria-label", `前往 ${screens.find((screen) => screen.id === id).title}`);
    dot.addEventListener("click", () => goTo(id));
    dots.appendChild(dot);
  });
}

function updateDockState(id) {
  document.querySelectorAll(".dock-item").forEach((item) => {
    const dockTarget = item.dataset.next;
    item.classList.toggle("active", dockTarget === id || (dockTarget === "course" && dockClassScreens.includes(id)));
  });
}

function canAdvance(id = current) {
  if (id === "question") return lessonState.question.completed;
  if (id === "blocks") return lessonState.blocks.completed;
  if (id === "build") return lessonState.build.completed;
  if (id === "free-build") return lessonState["free-build"].completed;
  if (id === "photo") return lessonState.photo.completed;
  if (id === "share") return lessonState.share.completed;
  return true;
}

function updateNavState(id) {
  const atFirstFlow = id === linearFlow[0];
  const atResult = id === "result";
  const inLinearFlow = linearFlow.includes(id);
  const preClassScreens = ["course", "home", "shop", "growth", "profile", "teacher"];
  backBtn.style.visibility = atFirstFlow ? "hidden" : "visible";
  prevBtn.style.visibility = atFirstFlow || !inLinearFlow || preClassScreens.includes(id) ? "hidden" : "visible";
  nextBtn.style.visibility = atResult || !inLinearFlow || preClassScreens.includes(id) ? "hidden" : "visible";
  nextBtn.disabled = !canAdvance(id);
  dots.style.visibility = inLinearFlow ? "visible" : "hidden";
  lessonNav.style.visibility = inLinearFlow ? "visible" : "hidden";
  lessonNav.style.opacity = inLinearFlow ? "1" : "0";
  lessonNav.style.pointerEvents = inLinearFlow ? "auto" : "none";
  app.classList.toggle("immersive", immersiveScreens.includes(id));
}

function goTo(id) {
  const target = screens.find((screen) => screen.id === id);
  if (!target) return;

  current = id;
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.screen === id);
  });

  title.textContent = target.title;
  updateDockState(id);
  updateNavState(id);
  renderStageDots();
  maybeShowCue(id);
  if (id === "result") {
    scheduleResultReward();
  } else {
    resetResultReward();
  }

  if (id === "course") renderCourseStep();
  if (id === "question") renderQuestionStep();
  if (id === "blocks") renderBlocksStep();
  if (id === "build") renderBuildStep();
  if (id === "free-build") renderFreeBuildStep();
  if (id === "photo") renderPhotoStep();
  if (id === "share") renderShareStep();
}

function nextScreen() {
  const index = getLinearIndex();
  goTo(linearFlow[Math.min(index + 1, linearFlow.length - 1)]);
}

function prevScreen() {
  const index = getLinearIndex();
  goTo(linearFlow[Math.max(index - 1, 0)]);
}

function updateStrategy(size) {
  const strategy = strategyCopy[size];
  strategyCard.innerHTML = `
    <strong>${strategy.title}</strong>
    <p>${strategy.text}</p>
    <div>${strategy.roles.map((role) => `<span>${role}</span>`).join("")}</div>
  `;
}

function maybeShowCue(id) {
  const cue = cues[id];
  if (!cue) return;
  const cueKey = `${id}:${cue.title}`;
  if (lastCueKey === cueKey) return;
  lastCueKey = cueKey;
  cueType.textContent = cue.type;
  cueTitle.textContent = cue.title;
  cueBody.textContent = cue.body;
  taskOverlay.classList.add("show");
}

function renderCourseStep() {
  const step = courseSteps[courseStepIndex];
  courseBreadcrumb.textContent = step.breadcrumb;
  courseStepTitle.textContent = step.title;
  courseBackBtn.style.visibility = courseStepIndex === 0 ? "hidden" : "visible";

  courseChoiceStage.className = `course-choice-stage step-${courseStepIndex}${step.isLessonStep ? " lesson-stage" : ""}${step.isAgeKitStep ? " age-kit-stage" : ""}`;
  const ageTabs = step.isAgeKitStep ? `
    <div class="course-age-switch" role="group" aria-label="年龄分类">
      <button class="active" data-age="5">5岁+</button>
      <button data-age="8">8岁+</button>
      <button data-age="11">11岁+</button>
    </div>
  ` : "";

  const cards = step.options.map((option, index) => {
    const tag = option.tag ? `<span class="choice-tag">${option.tag}</span>` : "";
    const action = step.isLessonStep && index === 0 ? `<span class="cta-button course-start-cta" data-course-start="true">开始学习</span>` : "";
    const cardClass = step.isLessonStep ? "course-choice-card course-lesson-choice" : "course-choice-card";
    return `
      <button class="${cardClass}" data-course-option="${index}">
        ${tag}
        <i class="choice-visual ${option.visual}"></i>
        <span class="choice-copy">
          <strong>${option.label}</strong>
          <small>${option.desc}</small>
          ${action}
        </span>
      </button>
    `;
  }).join("");
  courseChoiceStage.innerHTML = ageTabs + `<div class="course-choice-grid">${cards}</div>`;

  courseChoiceStage.querySelectorAll("[data-age]").forEach((button) => {
    button.addEventListener("click", () => {
      courseChoiceStage.querySelectorAll("[data-age]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      const age = button.dataset.age;
      const suffix = age === "5" ? "基础观察和表达" : age === "8" ? "协作推理和结构挑战" : "项目制创造和编程拓展";
      courseChoiceStage.querySelectorAll(".course-choice-card small").forEach((small, index) => {
        const names = ["积木", "3D 打印", "绘本"];
        small.textContent = `${age}岁+ 推荐：${names[index]} · ${suffix}`;
      });
      courseBreadcrumb.textContent = `${age}岁+`;
    });
  });

  courseChoiceStage.querySelectorAll("[data-course-option]").forEach((card) => {
    card.addEventListener("click", () => {
      if (step.isLessonStep && card.dataset.courseOption === "0") {
        goTo("class-size");
        return;
      }
      if (step.isLessonStep) return;
      const index = Number(card.dataset.courseOption);
      coursePath.push(step.options[index].label);
      courseStepIndex = Math.min(courseStepIndex + 1, courseSteps.length - 1);
      renderCourseStep();
    });
  });
}

function goCourseBack() {
  if (courseStepIndex === 0) return;
  courseStepIndex -= 1;
  coursePath.pop();
  renderCourseStep();
}

function renderMicroProgress(container, total, currentIndex) {
  if (!container) return;
  container.innerHTML = "";
  for (let index = 0; index < total; index += 1) {
    const item = document.createElement("span");
    if (index < currentIndex) item.classList.add("done");
    if (index === currentIndex) item.classList.add("active");
    container.appendChild(item);
  }
}

function showInlineFeedback(element, message, type = "success") {
  if (!element) return;
  element.textContent = message;
  element.className = `micro-feedback show ${type}`;
}

function renderQuestionStep() {
  const state = lessonState.question;
  const step = state.steps[state.index];
  document.querySelector("#questionFeedback").className = "micro-feedback";
  renderMicroProgress(document.querySelector("#questionProgress"), state.steps.length, state.index);
  document.querySelector("#questionStateTitle").textContent = step.stateTitle;
  document.querySelector("#questionStateBody").textContent = step.stateBody;
  document.querySelector("#questionPrompt").textContent = step.prompt;
  document.querySelector("#questionHint").textContent = step.hint;
  document.querySelector("#questionBubble").textContent = step.bubble;

  const turns = document.querySelectorAll("#questionTurns .student-token");
  turns.forEach((item, index) => item.classList.toggle("active", index === state.index));

  const answers = document.querySelector("#questionAnswers");
  answers.innerHTML = step.options.map((option, index) => `
    <button data-answer-index="${index}" type="button">${option}</button>
  `).join("");

  answers.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => handleQuestionAnswer(Number(button.dataset.answerIndex)));
  });

  const nextButton = document.querySelector("#questionNextBtn");
  nextButton.classList.toggle("hidden", !state.answered || state.completed);
  nextButton.textContent = state.index === state.steps.length - 1 ? "问答完成" : "下一题";
  updateNavState(current);
}

function handleQuestionAnswer(index) {
  const state = lessonState.question;
  const step = state.steps[state.index];
  const buttons = document.querySelectorAll("#questionAnswers button");
  if (!buttons.length) return;

  buttons.forEach((button) => {
    const answerIndex = Number(button.dataset.answerIndex);
    button.disabled = true;
    button.classList.remove("correct", "wrong");
    if (answerIndex === step.correct) button.classList.add("correct");
  });

  if (index === step.correct) {
    state.answered = true;
    showInlineFeedback(document.querySelector("#questionFeedback"), step.success, "success");
    showToast("答对了");
    document.querySelector("#questionNextBtn").classList.remove("hidden");
    if (state.index === state.steps.length - 1) {
      state.completed = true;
      nextBtn.disabled = false;
    }
  } else {
    buttons[index].classList.add("wrong");
    showInlineFeedback(document.querySelector("#questionFeedback"), step.error, "error");
    window.setTimeout(renderQuestionStep, 900);
  }
}

function advanceQuestionStep() {
  const state = lessonState.question;
  if (!state.answered) return;
  if (state.index < state.steps.length - 1) {
    state.index += 1;
    state.answered = false;
    document.querySelector("#questionFeedback").className = "micro-feedback";
    renderQuestionStep();
    return;
  }
  state.completed = true;
  showToast("问答完成");
  updateNavState(current);
}

function renderBlocksStep() {
  const state = lessonState.blocks;
  const step = state.steps[state.index];
  document.querySelector("#blocksFeedback").className = "micro-feedback";
  renderMicroProgress(document.querySelector("#blocksProgress"), state.steps.length, state.index);
  document.querySelector("#blocksTaskTitle").textContent = step.title;
  document.querySelector("#blocksTaskBody").textContent = step.body;
  document.querySelector("#blocksAside").textContent = step.aside;

  document.querySelectorAll("#blockGrid article").forEach((card) => {
    const key = card.dataset.blockKey;
    card.classList.remove("correct", "wrong", "completed");
    if (state.found.includes(key)) {
      card.classList.add("completed");
    }
  });

  updateNavState(current);
}

function handleBlockSelect(key) {
  const state = lessonState.blocks;
  const step = state.steps[state.index];
  const targetCard = document.querySelector(`#blockGrid article[data-block-key="${key}"]`);
  if (!targetCard || state.completed) return;

  document.querySelectorAll("#blockGrid article").forEach((card) => card.classList.remove("wrong", "correct"));

  if (key === step.key) {
    targetCard.classList.add("correct", "completed");
    state.found.push(key);
    showInlineFeedback(document.querySelector("#blocksFeedback"), step.success, "success");
    showToast("找到了");
    if (state.index < state.steps.length - 1) {
      state.index += 1;
      window.setTimeout(renderBlocksStep, 550);
    } else {
      state.completed = true;
      nextBtn.disabled = false;
      showToast("材料准备完成");
      updateNavState(current);
    }
    return;
  }

  targetCard.classList.add("wrong");
  showInlineFeedback(document.querySelector("#blocksFeedback"), "这不是当前要找的材料，先完成眼前这一项。", "error");
}

function renderBuildStep() {
  const state = lessonState.build;
  const step = state.steps[state.index];
  document.querySelector("#buildFeedback").className = "micro-feedback";
  renderMicroProgress(document.querySelector("#buildProgress"), state.steps.length, state.index);
  document.querySelector("#buildTaskTitle").textContent = step.title;
  document.querySelector("#buildTaskBody").textContent = step.body;
  document.querySelector("#buildAside").textContent = step.aside;
  document.querySelector("#buildRoleA").textContent = step.roles[0];
  document.querySelector("#buildRoleB").textContent = step.roles[1];
  document.querySelector("#buildRoleC").textContent = step.roles[2];

  const modelView = document.querySelector(".model-view");
  modelView.dataset.buildStage = String(state.index);
  document.querySelectorAll("#buildSteps span").forEach((item, index) => {
    item.classList.toggle("active", index === state.index);
    item.classList.toggle("done", index < state.index);
  });
  document.querySelector("#buildConfirmBtn").textContent = state.index === state.steps.length - 1 ? "模型搭好了" : "这一步完成了";
  updateNavState(current);
}

function advanceBuildStep() {
  const state = lessonState.build;
  const step = state.steps[state.index];
  showInlineFeedback(document.querySelector("#buildFeedback"), step.success, "success");
  showToast("这一步完成了");
  if (state.index < state.steps.length - 1) {
    state.index += 1;
    window.setTimeout(renderBuildStep, 650);
    return;
  }
  state.completed = true;
  nextBtn.disabled = false;
  updateNavState(current);
}

function renderFreeBuildStep() {
  const state = lessonState["free-build"];
  const step = state.steps[state.index];
  document.querySelector("#freeBuildFeedback").className = "micro-feedback";
  renderMicroProgress(document.querySelector("#freeBuildProgress"), state.steps.length, state.index);
  document.querySelector("#freeBuildTaskTitle").textContent = step.title;
  document.querySelector("#freeBuildTaskBody").textContent = step.body;
  document.querySelector("#freeBuildAside").textContent = step.aside;

  document.querySelectorAll("#freeBuildGrid article").forEach((item, index) => {
    item.classList.toggle("active", index === state.index);
    item.classList.toggle("done", index < state.index);
  });
  document.querySelector("#freeBuildConfirmBtn").textContent = state.index === state.steps.length - 1 ? "创作完成了" : "这个挑战完成了";
  updateNavState(current);
}

function advanceFreeBuildStep() {
  const state = lessonState["free-build"];
  const step = state.steps[state.index];
  showInlineFeedback(document.querySelector("#freeBuildFeedback"), step.success, "success");
  showToast(`${step.label}完成`);
  if (state.index < state.steps.length - 1) {
    state.index += 1;
    window.setTimeout(renderFreeBuildStep, 650);
    return;
  }
  state.completed = true;
  nextBtn.disabled = false;
  updateNavState(current);
}

function renderPhotoStep() {
  const state = lessonState.photo;
  const step = state.steps[state.index];
  document.querySelector("#photoFeedback").className = "micro-feedback";
  renderMicroProgress(document.querySelector("#photoProgress"), state.steps.length, state.index);
  document.querySelector("#photoTaskTitle").textContent = step.title;
  document.querySelector("#photoTaskBody").textContent = step.body;
  document.querySelector("#photoAside").textContent = step.aside;
  document.querySelector("#photoStateTitle").textContent = "POKI 正在看作品";
  document.querySelector("#photoStateBody").textContent = `当前拍${step.tab}，拍好后再继续下一面。`;

  document.querySelectorAll("#photoTabs span").forEach((item, index) => {
    item.classList.toggle("active", index === state.index);
    item.classList.toggle("done", index < state.index);
  });
  document.querySelector("#photoConfirmBtn").textContent = state.index === state.steps.length - 1 ? "三面都拍好了" : "这一面拍好了";
  updateNavState(current);
}

function advancePhotoStep() {
  const state = lessonState.photo;
  const step = state.steps[state.index];
  showInlineFeedback(document.querySelector("#photoFeedback"), step.success, "success");
  showToast(`${step.tab}已记录`);
  if (state.index < state.steps.length - 1) {
    state.index += 1;
    window.setTimeout(renderPhotoStep, 650);
    return;
  }
  state.completed = true;
  nextBtn.disabled = false;
  updateNavState(current);
}

function renderShareStep() {
  const state = lessonState.share;
  const step = state.steps[state.index];
  document.querySelector("#shareFeedback").className = "micro-feedback";
  renderMicroProgress(document.querySelector("#shareProgress"), state.steps.length, state.index);
  document.querySelector("#shareStateTitle").textContent = step.stateTitle;
  document.querySelector("#shareStateBody").textContent = step.stateBody;
  document.querySelector("#shareHint").textContent = step.hint;
  document.querySelector("#shareAside").textContent = step.aside;

  document.querySelectorAll("#shareQueue article").forEach((item, index) => {
    item.classList.toggle("active", index === state.index);
    item.classList.toggle("done", index < state.index);
  });
  document.querySelector("#shareConfirmBtn").textContent = state.index === state.steps.length - 1 ? "全组分享完成" : "这一位说完了";
  updateNavState(current);
}

function advanceShareStep() {
  const state = lessonState.share;
  const step = state.steps[state.index];
  showInlineFeedback(document.querySelector("#shareFeedback"), step.success, "success");
  showToast(`${step.label}已完成`);
  if (state.index < state.steps.length - 1) {
    state.index += 1;
    window.setTimeout(renderShareStep, 650);
    return;
  }
  state.completed = true;
  nextBtn.disabled = false;
  updateNavState(current);
}

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => goTo(button.dataset.next));
});

document.querySelectorAll(".size-option").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".size-option").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    updateStrategy(button.dataset.size);
  });
});

document.querySelectorAll("#blockGrid article").forEach((card) => {
  card.addEventListener("click", () => handleBlockSelect(card.dataset.blockKey));
});

document.querySelector("#questionNextBtn").addEventListener("click", advanceQuestionStep);
document.querySelector("#buildConfirmBtn").addEventListener("click", advanceBuildStep);
document.querySelector("#freeBuildConfirmBtn").addEventListener("click", advanceFreeBuildStep);
document.querySelector("#photoConfirmBtn").addEventListener("click", advancePhotoStep);
document.querySelector("#shareConfirmBtn").addEventListener("click", advanceShareStep);

backBtn.addEventListener("click", prevScreen);
prevBtn.addEventListener("click", prevScreen);
nextBtn.addEventListener("click", nextScreen);
cueCloseBtn.addEventListener("click", () => taskOverlay.classList.remove("show"));
courseBackBtn.addEventListener("click", goCourseBack);
taskOverlay.addEventListener("click", (event) => {
  if (event.target === taskOverlay) taskOverlay.classList.remove("show");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" && canAdvance(current)) nextScreen();
  if (event.key === "ArrowLeft") prevScreen();
});

goTo(current);
renderGemBalance();

rewardChestBtn.addEventListener("click", () => {
  if (rewardChestCard.classList.contains("opened")) return;
  rewardChestCard.classList.add("opened");
  rewardChestCopy.textContent = "宝箱打开了，本节课的小队奖励已经到账。";
  if (!rewardClaimed) {
    gemBalanceValue += rewardGemAmount;
    rewardClaimed = true;
    renderGemBalance();
  }
  showToast(`上课小队获得 +${rewardGemAmount} 宝石积分`);
});

rewardClaimBtn.addEventListener("click", () => {
  rewardChestOverlay.classList.remove("show");
});
