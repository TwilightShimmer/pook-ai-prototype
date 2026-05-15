import { ref } from "vue";

export function useStepFeedback() {
  const feedback = ref({ show: false, type: "", message: "" });

  function showFeedback(result) {
    if (!result) return;
    feedback.value = {
      show: Boolean(result.message),
      type: result.type ?? "",
      message: result.message ?? "",
    };
  }

  function clearFeedback() {
    feedback.value = { show: false, type: "", message: "" };
  }

  function clearFeedbackAfter(delay) {
    window.setTimeout(clearFeedback, delay);
  }

  return {
    feedback,
    showFeedback,
    clearFeedback,
    clearFeedbackAfter,
  };
}
