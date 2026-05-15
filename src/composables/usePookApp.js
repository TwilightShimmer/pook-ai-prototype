import { computed, inject, provide, reactive, ref } from "vue";
import {
  cues,
  dockClassScreens,
  immersiveScreens,
  initialGemBalance,
  lessonJourneyMeta,
  linearFlow,
  progressLabels,
  rewardGemAmount,
  screens,
  strategyCopy,
} from "../data/pookData";
import { createPookCourseController } from "./pook/usePookCourse";
import { createPookLessonFlow } from "./pook/usePookLessonFlow";
import { createPookUiControllers } from "./pook/usePookUi";

const pookAppStoreKey = Symbol("pook-app-store");

export function createPookAppStore() {
  const currentScreen = ref("home");
  const previousScreen = ref("home");
  const classSize = ref(3);
  const activeTeamId = ref("team-1");
  const teamRecords = ref([
    {
      id: "team-1",
      number: 1,
      name: "1号小队",
      teacherNote: "今天默认上课小队",
      members: 4,
      gems: initialGemBalance,
      stars: 0,
      xp: 0,
      completedLessons: 0,
      redeemedRewardIds: [],
      collectedLessonCards: [],
      lastPerformance: "等待开始今天的课程",
    },
    {
      id: "team-2",
      number: 2,
      name: "2号小队",
      teacherNote: "同机构课堂小队",
      members: 4,
      gems: 12,
      stars: 2,
      xp: 30,
      completedLessons: 1,
      redeemedRewardIds: [],
      collectedLessonCards: [],
      lastPerformance: "上次完成了观察和表达任务",
    },
    {
      id: "team-3",
      number: 3,
      name: "3号小队",
      teacherNote: "同机构课堂小队",
      members: 3,
      gems: 8,
      stars: 1,
      xp: 20,
      completedLessons: 1,
      redeemedRewardIds: [],
      collectedLessonCards: [],
      lastPerformance: "上次需要更多找积木引导",
    },
    {
      id: "team-4",
      number: 4,
      name: "4号小队",
      teacherNote: "同机构课堂小队",
      members: 4,
      gems: 0,
      stars: 0,
      xp: 0,
      completedLessons: 0,
      redeemedRewardIds: [],
      collectedLessonCards: [],
      lastPerformance: "还没有课程记录",
    },
  ]);
  const lessonRunId = ref(0);
  const rewardedRunIds = ref([]);
  const rewardedStepIds = ref([]);
  const lessonStarCount = ref(0);
  const lessonXpCount = ref(0);
  const pendingStepReward = ref(null);
  const lessonCueOverrides = ref({});
  const exitLessonConfirm = ref(false);
  const currentCompletionReward = ref({
    gemsAwarded: 0,
    awardedCard: null,
    isNewCard: false,
  });
  const teamSwitchGate = reactive({
    visible: false,
    step: "challenge",
    targetScreen: null,
    question: "",
    answer: 0,
    input: "",
    error: "",
  });

  const currentTeam = computed(
    () => teamRecords.value.find((team) => team.id === activeTeamId.value) ?? teamRecords.value[0],
  );

  function updateCurrentTeam(patch) {
    teamRecords.value = teamRecords.value.map((team) =>
      team.id === currentTeam.value.id ? { ...team, ...patch } : team,
    );
  }

  const gemBalance = computed({
    get: () => currentTeam.value?.gems ?? 0,
    set: (value) => updateCurrentTeam({ gems: Math.max(0, Number(value) || 0) }),
  });

  const redeemedRewardIds = computed({
    get: () => currentTeam.value?.redeemedRewardIds ?? [],
    set: (value) => updateCurrentTeam({ redeemedRewardIds: Array.isArray(value) ? value : [] }),
  });

  const collectedLessonCards = computed({
    get: () => currentTeam.value?.collectedLessonCards ?? [],
    set: (value) => updateCurrentTeam({ collectedLessonCards: Array.isArray(value) ? value : [] }),
  });

  const ui = createPookUiControllers({ gemBalance });
  const lessonFlow = createPookLessonFlow({ showToast: ui.showToast });
  const rewardableFlow = linearFlow.filter((screenId) => !["course", "result"].includes(screenId));
  const stepRewardXp = 10;
  let stepRewardTimer = 0;
  let stepRewardAutoTimer = 0;

  function startLessonSession() {
    lessonRunId.value += 1;
    rewardedStepIds.value = [];
    lessonStarCount.value = 0;
    lessonXpCount.value = 0;
    pendingStepReward.value = null;
    currentCompletionReward.value = {
      gemsAwarded: 0,
      awardedCard: null,
      isNewCard: false,
    };
    lessonFlow.resetLessonFlow();
  }

  function maybeTriggerStepReward(fromScreenId, toScreenId) {
    const fromIndex = linearFlow.indexOf(fromScreenId);
    const toIndex = linearFlow.indexOf(toScreenId);
    if (fromIndex < 0 || toIndex <= fromIndex) return false;
    if (!rewardableFlow.includes(fromScreenId)) return false;
    if (rewardedStepIds.value.includes(fromScreenId)) return false;

    pendingStepReward.value = fromScreenId;
    ui.showStepReward({
      stepLabel: progressLabels[fromScreenId] ?? "课程环节",
      starsCollected: lessonStarCount.value,
      totalStars: rewardableFlow.length,
      xpAwarded: stepRewardXp,
      xpCollected: lessonXpCount.value,
      xpTotal: rewardableFlow.length * stepRewardXp,
    });
    window.clearTimeout(stepRewardAutoTimer);
    stepRewardAutoTimer = window.setTimeout(() => {
      claimStepReward();
    }, 3000);
    return true;
  }

  function claimStepReward() {
    if (!pendingStepReward.value || ui.reward.flying) return;
    const screenId = pendingStepReward.value;
    window.clearTimeout(stepRewardAutoTimer);
    ui.startRewardFlight();
    window.clearTimeout(stepRewardTimer);
    stepRewardTimer = window.setTimeout(() => {
      if (!rewardedStepIds.value.includes(screenId)) {
        rewardedStepIds.value = [...rewardedStepIds.value, screenId];
        lessonStarCount.value += 1;
        lessonXpCount.value += stepRewardXp;
      }
      pendingStepReward.value = null;
      ui.finishStepReward({
        starsCollected: lessonStarCount.value,
        xpCollected: lessonXpCount.value,
      });
    }, 720);
  }

  const course = createPookCourseController({
    navigateTo,
    showToast: ui.showToast,
    startLesson: startLessonSession,
  });

  function buildTeamGateChallenge() {
    if (Math.random() > 0.5) {
      const answer = Math.floor(Math.random() * 6) + 4;
      const divisor = Math.floor(Math.random() * 3) + 2;
      return {
        question: `${answer * divisor} ÷ ${divisor} = ?`,
        answer,
      };
    }
    const left = Math.floor(Math.random() * 6) + 5;
    const right = Math.floor(Math.random() * 4) + 3;
    return {
      question: `${left} × ${right} = ?`,
      answer: left * right,
    };
  }

  function openTeamSwitchGate(options = {}) {
    const challenge = buildTeamGateChallenge();
    teamSwitchGate.visible = true;
    teamSwitchGate.step = "challenge";
    teamSwitchGate.targetScreen = options.targetScreen ?? null;
    teamSwitchGate.question = challenge.question;
    teamSwitchGate.answer = challenge.answer;
    teamSwitchGate.input = "";
    teamSwitchGate.error = "";
    ui.resetReward();
  }

  function closeTeamSwitchGate() {
    teamSwitchGate.visible = false;
    teamSwitchGate.step = "challenge";
    teamSwitchGate.targetScreen = null;
    teamSwitchGate.input = "";
    teamSwitchGate.error = "";
  }

  function setTeamSwitchGateInput(value) {
    teamSwitchGate.input = value.replace(/[^\d]/g, "").slice(0, 3);
    teamSwitchGate.error = "";
  }

  function submitTeamSwitchGate() {
    if (Number(teamSwitchGate.input) !== teamSwitchGate.answer) {
      teamSwitchGate.error = "再算一次，答对后老师才能切换小队。";
      return;
    }
    if (teamSwitchGate.targetScreen === "profile") {
      const isScreenChanged = currentScreen.value !== "profile";
      if (isScreenChanged) {
        previousScreen.value = currentScreen.value;
      }
      currentScreen.value = "profile";
      closeTeamSwitchGate();
      ui.showPageTransition("POKI 正在打开老师的小队管理台");
      return;
    }
    teamSwitchGate.step = "switch";
    teamSwitchGate.error = "";
  }

  function confirmTeamSwitch(teamId) {
    selectTeam(teamId);
    closeTeamSwitchGate();
  }

  function grantLessonCompletionRewards() {
    const runId = lessonRunId.value;
    if (!runId || rewardedRunIds.value.includes(runId)) return;

    rewardedRunIds.value = [...rewardedRunIds.value, runId];
    gemBalance.value += rewardGemAmount;

    const lesson = course.currentLesson.value;
    const cardId = `${lesson.theme}:${lesson.title}`;
    const existingCard = collectedLessonCards.value.find((card) => card.id === cardId) ?? null;

    let awardedCard = existingCard;
    let isNewCard = false;

    if (!existingCard) {
      awardedCard = {
        id: cardId,
        title: lesson.title,
        theme: lesson.theme,
        badge: lesson.badge,
        visual: lesson.welcomeVisual,
        earnedAt: "刚刚获得",
      };
      collectedLessonCards.value = [awardedCard, ...collectedLessonCards.value];
      isNewCard = true;
    }

    currentCompletionReward.value = {
      gemsAwarded: rewardGemAmount,
      awardedCard,
      isNewCard,
      teamName: currentTeam.value.name,
    };

    updateCurrentTeam({
      stars: currentTeam.value.stars + lessonStarCount.value,
      xp: currentTeam.value.xp + lessonXpCount.value,
      completedLessons: currentTeam.value.completedLessons + 1,
      lastPerformance: `刚刚完成《${lesson.title}》，获得 ${lessonStarCount.value} 颗星星和 ${lessonXpCount.value} 经验`,
    });

    if (isNewCard) {
      ui.showToast(`获得纪念卡《${lesson.title}》和 +${rewardGemAmount} 宝石积分`);
      return;
    }
    ui.showToast(`本次获得 +${rewardGemAmount} 宝石积分，纪念卡已在展馆收藏`);
  }

  function navigateTo(screenId) {
    if (!screens.some((screen) => screen.id === screenId)) return;
    const isScreenChanged = currentScreen.value !== screenId;
    if (screenId === "teacher" && isScreenChanged) {
      ui.openTeacherGate();
      return;
    }
    if (screenId === "profile" && isScreenChanged) {
      openTeamSwitchGate({ targetScreen: "profile" });
      return;
    }
    if (screenId === "course" && currentScreen.value !== "course") {
      course.resetSelection();
    }
    if (screenId === "result") {
      grantLessonCompletionRewards();
    }
    const stepRewardTriggered = isScreenChanged ? maybeTriggerStepReward(currentScreen.value, screenId) : false;
    if (isScreenChanged) {
      previousScreen.value = currentScreen.value;
    }
    currentScreen.value = screenId;
    if (isScreenChanged) {
      if (screenId !== "course" && linearFlow.includes(screenId)) {
        ui.maybeShowCue(screenId, lessonCueOverrides.value);
      } else {
        ui.showPageTransition();
      }
    } else {
      ui.maybeShowCue(screenId, lessonCueOverrides.value);
    }
    if (!stepRewardTriggered) {
      ui.resetReward();
    }
  }

  function requestTopBack() {
    if (inLinearFlow.value && currentScreen.value !== "course") {
      exitLessonConfirm.value = true;
      return;
    }
    goBackToPreviousPage();
  }

  function cancelExitLesson() {
    exitLessonConfirm.value = false;
  }

  function confirmExitLesson() {
    exitLessonConfirm.value = false;
    navigateTo("home");
  }

  function submitTeacherGate() {
    if (!ui.validateTeacherGate()) return;
    previousScreen.value = currentScreen.value;
    currentScreen.value = "teacher";
    ui.showPageTransition("POKI 正在打开老师设置");
    ui.resetReward();
  }

  function updateLessonCue(screenId, field, value) {
    if (!cues[screenId] || !["title", "body"].includes(field)) return;
    lessonCueOverrides.value = {
      ...lessonCueOverrides.value,
      [screenId]: {
        ...(lessonCueOverrides.value[screenId] ?? {}),
        [field]: value,
      },
    };
  }

  const editableLessonCues = computed(() =>
    linearFlow
      .filter((screenId) => cues[screenId])
      .map((screenId) => ({
        id: screenId,
        label: progressLabels[screenId] ?? screenId,
        title: lessonCueOverrides.value[screenId]?.title ?? cues[screenId].title,
        body: lessonCueOverrides.value[screenId]?.body ?? cues[screenId].body,
      })),
  );

  const currentScreenMeta = computed(() => screens.find((screen) => screen.id === currentScreen.value) ?? screens[0]);
  const currentLinearIndex = computed(() => linearFlow.indexOf(currentScreen.value));
  const inLinearFlow = computed(() => currentLinearIndex.value >= 0);
  const isImmersive = computed(() => immersiveScreens.includes(currentScreen.value));
  const strategy = computed(() => strategyCopy[classSize.value]);
  const canAdvanceCurrent = computed(() => lessonFlow.canAdvance(currentScreen.value));
  const lessonJourney = computed(() =>
    linearFlow.map((screenId, index) => ({
      id: screenId,
      label: lessonJourneyMeta[screenId]?.short ?? progressLabels[screenId] ?? screenId,
      status:
        currentLinearIndex.value < 0
          ? "upcoming"
          : index < currentLinearIndex.value
            ? "done"
            : index === currentLinearIndex.value
              ? "active"
              : "upcoming",
    })),
  );
  const currentJourneyMeta = computed(
    () => lessonJourneyMeta[currentScreen.value] ?? { short: "", action: "", reward: "" },
  );
  const lessonXp = computed(() => lessonXpCount.value);
  const lessonTotalStars = computed(() => rewardableFlow.length);
  const lessonTotalXp = computed(() => rewardableFlow.length * stepRewardXp);
  const nextActionLabel = computed(() => {
    const screenId = currentScreen.value;
    if (screenId === "course") return "开始任务";
    if (screenId === "welcome") return "查看今天的任务";
    if (screenId === "goals") return "进入课堂";
    if (screenId === "result") return "成长卡已完成";
    if (!canAdvanceCurrent.value) return "完成当前挑战";
    return "继续闯关";
  });

  const navState = computed(() => {
    const atFirstFlow = currentScreen.value === linearFlow[0];
    const atResult = currentScreen.value === "result";
    const showJourneyNav = inLinearFlow.value && currentScreen.value !== "course";
    return {
      show: showJourneyNav,
      showBack: !atFirstFlow,
      showPrev: inLinearFlow.value && !atFirstFlow,
      showNext: inLinearFlow.value && !atResult,
      nextDisabled: !canAdvanceCurrent.value,
    };
  });

  function nextScreen() {
    const index = currentLinearIndex.value;
    if (index < 0 || !canAdvanceCurrent.value) return;
    navigateTo(linearFlow[Math.min(index + 1, linearFlow.length - 1)]);
  }

  function prevScreen() {
    if (currentScreen.value === "meet") {
      exitLessonConfirm.value = true;
      return;
    }
    if (currentScreen.value === "course") {
      navigateTo("home");
      return;
    }
    const index = currentLinearIndex.value;
    if (index < 0) {
      goBackToPreviousPage();
      return;
    }
    navigateTo(linearFlow[Math.max(index - 1, 0)]);
  }

  function goBackToPreviousPage() {
    const target = previousScreen.value;
    if (!target || target === currentScreen.value || !screens.some((screen) => screen.id === target)) return;
    navigateTo(target);
  }

  function selectClassSize(size) {
    classSize.value = Number(size);
  }

  function selectTeam(teamId) {
    if (!teamRecords.value.some((team) => team.id === teamId)) return;
    activeTeamId.value = teamId;
    ui.showToast(`已切换到 ${currentTeam.value.name}`);
  }

  function redeemShopReward(reward) {
    if (!reward?.id) return false;
    if (redeemedRewardIds.value.includes(reward.id)) {
      ui.showToast("这个小奖励已经兑换过了");
      return false;
    }
    if (gemBalance.value < reward.cost) {
      ui.showToast("宝石积分不够，先去上课收集更多吧");
      return false;
    }
    gemBalance.value -= reward.cost;
    redeemedRewardIds.value = [...redeemedRewardIds.value, reward.id];
    ui.showToast(`已兑换 ${reward.name}`);
    return true;
  }

  function dispose() {
    window.clearTimeout(stepRewardTimer);
    window.clearTimeout(stepRewardAutoTimer);
    ui.dispose();
  }

  return {
    currentScreen,
    previousScreen,
    currentScreenMeta,
    classSize,
    strategy,
    activeTeamId,
    teamRecords,
    currentTeam,
    gemBalance,
    navState,
    linearFlow,
    progressLabels,
    lessonJourney,
    currentJourneyMeta,
    lessonXp,
    lessonStarCount,
    lessonTotalStars,
    lessonTotalXp,
    nextActionLabel,
    dockClassScreens,
    isImmersive,
    lessonState: lessonFlow.lessonState,
    taskCue: ui.taskCue,
    reward: ui.reward,
    toast: ui.toast,
    pageTransition: ui.pageTransition,
    teacherGate: ui.teacherGate,
    teamSwitchGate,
    showToast: ui.showToast,
    setTeacherGateInput: ui.setTeacherGateInput,
    closeTeacherGate: ui.closeTeacherGate,
    openTeamSwitchGate,
    closeTeamSwitchGate,
    setTeamSwitchGateInput,
    submitTeamSwitchGate,
    confirmTeamSwitch,
    redeemedRewardIds,
    collectedLessonCards,
    currentCompletionReward,
    exitLessonConfirm,
    courseStepIndex: course.courseStepIndex,
    courseStep: course.courseStep,
    courseBreadcrumb: course.courseBreadcrumb,
    courseOptions: course.courseOptions,
    scienceThemeTabs: course.scienceThemeTabs,
    selectedScienceTheme: course.selectedScienceTheme,
    activeScienceTheme: course.activeScienceTheme,
    currentLesson: course.currentLesson,
    isReturningStudent: course.isReturningStudent,
    selectedAge: course.selectedAge,
    navigateTo,
    requestTopBack,
    cancelExitLesson,
    confirmExitLesson,
    nextScreen,
    prevScreen,
    submitTeacherGate,
    editableLessonCues,
    updateLessonCue,
    selectClassSize,
    selectTeam,
    setCourseAge: course.setCourseAge,
    setScienceTheme: course.setScienceTheme,
    startBetaLessonByTheme: course.startBetaLessonByTheme,
    selectCourseOption: course.selectCourseOption,
    goCourseBack: course.goCourseBack,
    answerQuestion: lessonFlow.answerQuestion,
    nextQuestionStep: lessonFlow.nextQuestionStep,
    selectBlock: lessonFlow.selectBlock,
    confirmBuildStep: lessonFlow.confirmBuildStep,
    confirmFreeBuildStep: lessonFlow.confirmFreeBuildStep,
    confirmPhotoStep: lessonFlow.confirmPhotoStep,
    confirmShareStep: lessonFlow.confirmShareStep,
    closeTaskCue: ui.closeTaskCue,
    openRewardChest: ui.openRewardChest,
    claimReward: ui.claimReward,
    claimStepReward,
    redeemShopReward,
    dispose,
  };
}

export function providePookAppStore(store) {
  provide(pookAppStoreKey, store);
}

export function usePookAppStore() {
  const store = inject(pookAppStoreKey);
  if (!store) {
    throw new Error("Pook app store not provided");
  }
  return store;
}
