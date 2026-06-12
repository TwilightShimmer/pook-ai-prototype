import { reactive } from "vue";
import { cues, rewardGemAmount } from "../../data/pookData";

export function createPookUiControllers({ gemBalance, prototypeDemoMode = false }) {
  const taskCue = reactive({
    show: false,
    type: "任务开始",
    title: "准备开始",
    body: "POKI 会告诉小朋友下一步要做什么。",
  });
  const reward = reactive({
    visible: false,
    flying: false,
    opened: false,
    claimed: false,
    stepLabel: "",
    starsCollected: 0,
    totalStars: 0,
    xpAwarded: 0,
    xpCollected: 0,
    xpTotal: 0,
  });
  const toast = reactive({ visible: false, message: "" });
  const pageTransition = reactive({
    visible: false,
    message: "POKI 正在带你过去",
  });
  const teacherGate = reactive({
    visible: false,
    question: "",
    answer: 0,
    input: "",
    error: "",
  });

  let toastTimer = 0;
  let taskCueTimer = 0;
  let transitionTimer = 0;
  let cueDelayTimer = 0;
  let rewardTimer = 0;
  let lastCueKey = "";

  function resetTimer(handle) {
    if (handle) {
      window.clearTimeout(handle);
    }
  }

  function showToast(message) {
    toast.message = message;
    toast.visible = true;
    resetTimer(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.visible = false;
    }, 1400);
  }

  function closeTaskCue() {
    resetTimer(taskCueTimer);
    taskCue.show = false;
  }

  function showPageTransition(message = "POKI 正在带你过去") {
    if (prototypeDemoMode) return;
    pageTransition.message = message;
    pageTransition.visible = true;
    taskCue.show = false;
    resetTimer(transitionTimer);
    transitionTimer = window.setTimeout(() => {
      pageTransition.visible = false;
    }, 2400);
  }

  function openTeacherGate() {
    const useDivision = Math.random() > 0.5;
    if (useDivision) {
      const answer = Math.floor(Math.random() * 5) + 3;
      const divisor = Math.floor(Math.random() * 3) + 2;
      teacherGate.answer = answer;
      teacherGate.question = `${answer * divisor} ÷ ${divisor} = ?`;
    } else {
      const left = Math.floor(Math.random() * 6) + 4;
      const right = Math.floor(Math.random() * 4) + 3;
      teacherGate.answer = left * right;
      teacherGate.question = `${left} × ${right} = ?`;
    }
    teacherGate.input = "";
    teacherGate.error = "";
    teacherGate.visible = true;
    taskCue.show = false;
  }

  function closeTeacherGate() {
    teacherGate.visible = false;
    teacherGate.input = "";
    teacherGate.error = "";
  }

  function setTeacherGateInput(value) {
    teacherGate.input = value.replace(/[^\d]/g, "").slice(0, 3);
    teacherGate.error = "";
  }

  function validateTeacherGate() {
    if (Number(teacherGate.input) === teacherGate.answer) {
      closeTeacherGate();
      return true;
    }
    teacherGate.error = "再算一次，答对才能进入老师设置。";
    return false;
  }

  function maybeShowCue(screenId, overrides = {}) {
    const cue = {
      ...(cues[screenId] ?? {}),
      ...(overrides[screenId] ?? {}),
    };
    if (!cue.title) return;
    const cueKey = `${screenId}:${cue.title}`;
    if (lastCueKey === cueKey) return;
    lastCueKey = cueKey;
    taskCue.type = cue.type;
    taskCue.title = cue.title;
    taskCue.body = cue.body;
    taskCue.show = true;
    resetTimer(taskCueTimer);
    taskCueTimer = window.setTimeout(() => {
      taskCue.show = false;
    }, 3000);
  }

  function showCueAfterTransition(screenId) {
    resetTimer(cueDelayTimer);
    cueDelayTimer = window.setTimeout(() => {
      maybeShowCue(screenId);
    }, 2500);
  }

  function resetReward() {
    resetTimer(rewardTimer);
    reward.visible = false;
    reward.flying = false;
    reward.opened = false;
  }

  function showStepReward(payload) {
    resetReward();
    reward.stepLabel = payload.stepLabel;
    reward.starsCollected = payload.starsCollected;
    reward.totalStars = payload.totalStars;
    reward.xpAwarded = payload.xpAwarded;
    reward.xpCollected = payload.xpCollected;
    reward.xpTotal = payload.xpTotal;
    reward.visible = true;
  }

  function startRewardFlight() {
    reward.flying = true;
  }

  function finishStepReward(payload) {
    reward.starsCollected = payload.starsCollected;
    reward.xpCollected = payload.xpCollected;
    reward.visible = false;
    reward.flying = false;
  }

  function scheduleReward() {
    resetReward();
    rewardTimer = window.setTimeout(() => {
      reward.visible = true;
      showToast("小队宝箱已解锁");
    }, 3000);
  }

  function openRewardChest() {
    if (reward.opened) return;
    reward.opened = true;
    if (!reward.claimed) {
      gemBalance.value += rewardGemAmount;
      reward.claimed = true;
    }
    showToast(`上课小队获得 +${rewardGemAmount} 宝石积分`);
  }

  function claimReward() {
    reward.visible = false;
  }

  function dispose() {
    resetTimer(toastTimer);
    resetTimer(taskCueTimer);
    resetTimer(transitionTimer);
    resetTimer(cueDelayTimer);
    resetTimer(rewardTimer);
  }

  return {
    taskCue,
    reward,
    toast,
    pageTransition,
    teacherGate,
    showToast,
    closeTaskCue,
    showPageTransition,
    openTeacherGate,
    closeTeacherGate,
    setTeacherGateInput,
    validateTeacherGate,
    maybeShowCue,
    showCueAfterTransition,
    resetReward,
    showStepReward,
    startRewardFlight,
    finishStepReward,
    scheduleReward,
    openRewardChest,
    claimReward,
    dispose,
  };
}
