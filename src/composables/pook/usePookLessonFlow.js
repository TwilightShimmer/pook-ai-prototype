import { reactive } from "vue";
import { createInitialLessonState } from "../../data/pookData";

export function createPookLessonFlow({ showToast }) {
  const lessonState = reactive(createInitialLessonState());

  function resetLessonFlow() {
    const initial = createInitialLessonState();
    for (const key of Object.keys(initial)) {
      lessonState[key] = initial[key];
    }
  }

  function canAdvance(screenId) {
    if (screenId === "question") return lessonState.question.completed;
    if (screenId === "blocks") return lessonState.blocks.completed;
    if (screenId === "build") return lessonState.build.completed;
    if (screenId === "free-build") return lessonState["free-build"].completed;
    if (screenId === "photo") return lessonState.photo.completed;
    if (screenId === "share") return lessonState.share.completed;
    return true;
  }

  function answerQuestion(index) {
    const state = lessonState.question;
    const step = state.steps[state.index];
    if (state.answered) return { type: "idle", message: "" };
    if (index === step.correct) {
      state.answered = true;
      if (state.index === state.steps.length - 1) state.completed = true;
      showToast("答对了");
      return { type: "success", message: step.success };
    }
    return { type: "error", message: step.error };
  }

  function nextQuestionStep() {
    const state = lessonState.question;
    if (!state.answered) return;
    if (state.index < state.steps.length - 1) {
      state.index += 1;
      state.answered = false;
      return;
    }
    state.completed = true;
    showToast("问答完成");
  }

  function selectBlock(key) {
    const state = lessonState.blocks;
    const step = state.steps[state.index];
    if (state.completed) return { type: "idle", message: "" };
    if (key === step.key) {
      if (!state.found.includes(key)) state.found.push(key);
      showToast("找到了");
      if (state.index < state.steps.length - 1) {
        const message = step.success;
        state.index += 1;
        return { type: "success", message };
      }
      state.completed = true;
      showToast("材料准备完成");
      return { type: "success", message: step.success };
    }
    return { type: "error", message: "这不是当前要找的材料，先完成眼前这一项。" };
  }

  function advanceSimpleFlow(key, successToast) {
    const state = lessonState[key];
    const step = state.steps[state.index];
    const message = step.success;
    if (successToast) showToast(successToast(step));
    if (state.index < state.steps.length - 1) {
      state.index += 1;
      return { type: "success", message };
    }
    state.completed = true;
    return { type: "success", message };
  }

  function confirmBuildStep() {
    return advanceSimpleFlow("build", () => "这一步完成了");
  }

  function confirmFreeBuildStep() {
    return advanceSimpleFlow("free-build", (step) => `${step.label}完成`);
  }

  function confirmPhotoStep() {
    return advanceSimpleFlow("photo", (step) => `${step.tab}已记录`);
  }

  function confirmShareStep() {
    return advanceSimpleFlow("share", (step) => `${step.label}已完成`);
  }

  return {
    lessonState,
    resetLessonFlow,
    canAdvance,
    answerQuestion,
    nextQuestionStep,
    selectBlock,
    confirmBuildStep,
    confirmFreeBuildStep,
    confirmPhotoStep,
    confirmShareStep,
  };
}
