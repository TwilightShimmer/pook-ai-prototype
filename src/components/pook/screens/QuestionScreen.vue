<script setup>
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { usePookAppStore } from "../../../composables/usePookApp";
import { useStepFeedback } from "../../../composables/useStepFeedback";
import FeedbackMessage from "../shared/FeedbackMessage.vue";

const store = usePookAppStore();
const { feedback, showFeedback, clearFeedback, clearFeedbackAfter } = useStepFeedback();
const wrongAnswerIndex = ref(null);
const questionPhase = ref("look");
const hintIndex = ref(0);
let hintTimer = 0;

const state = computed(() => store.lessonState.question);
const step = computed(() => state.value.steps[state.value.index]);
const lesson = computed(() => store.currentLesson.value);
const phaseOrder = ["look", "speak", "choose"];
const phaseIndex = computed(() => phaseOrder.indexOf(questionPhase.value));
const isActive = computed(() => store.currentScreen.value === "question");

const speakHints = ["说颜色", "说身体", "说角角", "说脏脏的"];
const answerCards = computed(() => [
  { icon: "🦏", label: "有角", index: 0 },
  { icon: "🐭", label: "小小的", index: 1 },
  { icon: "🪽", label: "会飞", index: 2 },
]);

const phaseCopy = computed(() => {
  if (questionPhase.value === "look") {
    return {
      tag: "看一看",
      title: "小犀牛怎么啦？",
      speech: "宝贝们，先看一看。小犀牛身上有什么呀？",
      action: "我看到了",
    };
  }
  if (questionPhase.value === "speak") {
    return {
      tag: "说一说",
      title: "说一个发现",
      speech: `可以说一个你看到的地方。比如：${speakHints[hintIndex.value]}。`,
      action: "听到了",
    };
  }
  return {
    tag: "选一选",
    title: "点一点你看到的",
    speech: "刚刚我们说了很多发现。现在点一点，你看到的是哪一个？",
    action: "",
  };
});

function stopHintTimer() {
  window.clearInterval(hintTimer);
  hintTimer = 0;
}

function startHintTimer() {
  stopHintTimer();
  hintTimer = window.setInterval(() => {
    hintIndex.value = (hintIndex.value + 1) % speakHints.length;
  }, 1400);
}

function setPhase(phase) {
  questionPhase.value = phase;
  if (phase === "speak") {
    hintIndex.value = 0;
    startHintTimer();
    return;
  }
  stopHintTimer();
}

function selectAnswer(index) {
  const result = store.answerQuestion(index);
  showFeedback(result);
  if (result.type === "error") {
    wrongAnswerIndex.value = index;
    clearFeedbackAfter(900);
    window.setTimeout(() => {
      wrongAnswerIndex.value = null;
    }, 900);
  } else {
    wrongAnswerIndex.value = null;
  }
}

function nextStep() {
  clearFeedback();
  store.nextQuestionStep();
}

watch(
  isActive,
  (active) => {
    if (active) {
      setPhase("look");
      wrongAnswerIndex.value = null;
      clearFeedback();
    } else {
      stopHintTimer();
    }
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  stopHintTimer();
});
</script>

<template>
  <section class="screen" :class="{ active: isActive }" data-screen="question">
    <div class="question-observe-shell">
      <section class="question-observe-main">
        <div class="question-observe-head">
          <span class="beta-chip">{{ phaseCopy.tag }}</span>
          <div>
            <h2>{{ phaseCopy.title }}</h2>
            <p>先看，再说，最后点一点。</p>
          </div>
        </div>

        <div class="question-observe-stage" :class="`phase-${questionPhase}`">
          <div class="question-visual-card">
            <i class="choice-visual beta-lesson-visual" :class="lesson.welcomeVisual"></i>
            <span class="question-visual-word">{{ questionPhase === "choose" ? "选一选" : "看一看" }}</span>
          </div>

          <div v-if="questionPhase === 'speak'" class="question-listening-card">
            <div class="question-wave"><span></span><span></span><span></span></div>
            <strong>POKI 在听</strong>
            <small>{{ speakHints[hintIndex] }}</small>
          </div>

          <div v-if="questionPhase === 'choose'" class="question-picture-options">
            <button
              v-for="card in answerCards"
              :key="card.label"
              type="button"
              :disabled="state.answered"
              :class="{
                correct: state.answered && card.index === step.correct,
                wrong: wrongAnswerIndex === card.index,
              }"
              @click="selectAnswer(card.index)"
            >
              <b>{{ card.icon }}</b>
              <strong>{{ card.label }}</strong>
            </button>
          </div>
        </div>

        <div class="question-phase-tabs" aria-label="看一看流程">
          <span :class="{ active: phaseIndex === 0 }">看</span>
          <span :class="{ active: phaseIndex === 1 }">说</span>
          <span :class="{ active: phaseIndex === 2 }">选</span>
        </div>
      </section>

      <aside class="question-poki-panel">
        <div class="question-poki-avatar">🤖</div>
        <div class="question-poki-bubble">
          <span>POKI 说</span>
          <strong>{{ phaseCopy.speech }}</strong>
        </div>

        <div class="question-mini-hints">
          <span>可以这样说</span>
          <b v-for="hint in speakHints" :key="hint" :class="{ active: questionPhase === 'speak' && hint === speakHints[hintIndex] }">
            {{ hint }}
          </b>
        </div>

        <FeedbackMessage :feedback="feedback" />

        <button v-if="questionPhase === 'look'" class="cta-button question-action-button" type="button" @click="setPhase('speak')">
          {{ phaseCopy.action }}
        </button>
        <button v-else-if="questionPhase === 'speak'" class="cta-button question-action-button" type="button" @click="setPhase('choose')">
          {{ phaseCopy.action }}
        </button>
        <button v-else-if="state.answered && !state.completed" class="cta-button question-action-button" type="button" @click="nextStep">
          继续
        </button>
      </aside>
    </div>
  </section>
</template>
