<script setup>
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { usePookAppStore } from "../../../composables/usePookApp";
import { useStepFeedback } from "../../../composables/useStepFeedback";
import FeedbackMessage from "../shared/FeedbackMessage.vue";
import PokiStatePanel from "../shared/PokiStatePanel.vue";

const store = usePookAppStore();
const { feedback, showFeedback, clearFeedback, clearFeedbackAfter } = useStepFeedback();
const wrongAnswerIndex = ref(null);
const questionPhase = ref("look");
const question2Phase = ref("observe");
const hintIndex = ref(0);
let hintTimer = 0;

const isQuestion2 = computed(() => store.currentScreen.value === "question2");
const flowKey = computed(() => (isQuestion2.value ? "question2" : "question"));
const state = computed(() => store.lessonState[flowKey.value]);
const step = computed(() => state.value.steps[state.value.index]);
const lesson = computed(() => store.currentLesson.value);
const phaseOrder = ["look", "speak", "choose"];
const phaseIndex = computed(() => phaseOrder.indexOf(questionPhase.value));
const isActive = computed(() => ["question", "question2"].includes(store.currentScreen.value));
const pokiState = computed(() => {
  if (state.value.answered) return "success";
  if (questionPhase.value === "look") return "guide";
  if (questionPhase.value === "speak") return "listening";
  return "waiting";
});

const speakHints = computed(() =>
  isQuestion2.value
    ? ["说作品", "说用途", "说小犀牛", "说洗澡"]
    : ["说颜色", "说身体", "说角角", "说脏脏的"],
);
const answerCards = computed(() =>
  isQuestion2.value
    ? [
        { icon: "🛁", label: "洗澡池", index: 0 },
        { icon: "🚀", label: "火箭", index: 1 },
        { icon: "🏠", label: "房间", index: 2 },
      ]
    : [
        { icon: "🦏", label: "有角", index: 0 },
        { icon: "🐭", label: "小小的", index: 1 },
        { icon: "🪽", label: "会飞", index: 2 },
      ],
);

const phaseCopy = computed(() => {
  if (questionPhase.value === "look") {
    return isQuestion2.value ? {
      tag: "问答2",
      title: "刚刚搭出了什么？",
      speech: "宝贝们，先看一看刚刚拼好的作品。它像什么？它可以帮小犀牛做什么？",
      action: "我看好了",
    } : {
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
      speech: `可以说一个你看到的地方。比如：${speakHints.value[hintIndex.value]}。`,
      action: "听到了",
    };
  }
  return {
    tag: "选一选",
    title: isQuestion2.value ? "点一点作品是什么" : "点一点你看到的",
    speech: isQuestion2.value
      ? "刚刚我们说了作品的故事。现在点一点，它是什么？"
      : "刚刚我们说了很多发现。现在点一点，你看到的是哪一个？",
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
    hintIndex.value = (hintIndex.value + 1) % speakHints.value.length;
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
  const result = store.answerQuestion(index, flowKey.value);
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
  store.nextQuestionStep(flowKey.value);
}

function completeQuestion2() {
  const result = store.answerQuestion(step.value.correct, "question2");
  showFeedback(result);
  if (result.type === "success" || state.value.completed) {
    question2Phase.value = "complete";
  }
}

watch(
  () => store.currentScreen.value,
  (screen) => {
    const active = ["question", "question2"].includes(screen);
    if (active) {
      setPhase("look");
      question2Phase.value = "observe";
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
  <section class="screen" :class="{ active: isActive }" :data-screen="store.currentScreen.value">
    <div v-if="!isQuestion2" class="question-observe-shell">
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
            <span class="question-visual-word">{{ questionPhase === "choose" ? "选一选" : isQuestion2 ? "作品" : "看一看" }}</span>
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

      <PokiStatePanel
        :state="pokiState"
        :message="phaseCopy.speech"
        :detail="isQuestion2 ? '说作品、用途或小犀牛都可以。' : '可以说颜色、身体、角角或脏脏的。'"
      >
        <div class="question-mini-hints">
          <span>{{ isQuestion2 ? "可以这样说作品" : "可以这样说" }}</span>
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
        <button
          v-if="questionPhase === 'speak'"
          class="poki-secondary-action"
          type="button"
          @click="setPhase('choose')"
        >
          我不知道
        </button>
      </PokiStatePanel>
    </div>

    <div v-else class="question2-share-shell">
      <section class="question2-work-panel">
        <div class="question-observe-head">
          <span class="beta-chip">问答2 · 作品分享</span>
          <div>
            <h2>把刚刚的作品介绍给 POKI</h2>
            <p>展示固定作品，围绕作品直接说一说。</p>
          </div>
        </div>

        <div class="question2-work-stage" :class="`phase-${question2Phase}`">
          <img src="/resources/2.jpg" alt="小组刚刚完成的拼搭作品" />
          <span class="question2-camera-corner corner-a"></span>
          <span class="question2-camera-corner corner-b"></span>
          <span class="question2-camera-corner corner-c"></span>
          <span class="question2-camera-corner corner-d"></span>
          <div class="question2-live-state">
            <span>{{ question2Phase === "observe" ? "👀" : question2Phase === "speak" ? "🎤" : "✅" }}</span>
            <strong>
              {{ question2Phase === "observe"
                ? "POKI 正在看作品"
                : question2Phase === "speak"
                  ? "POKI 正在听你介绍"
                  : "POKI 听明白了" }}
            </strong>
          </div>
        </div>

        <div class="question2-share-queue">
          <article :class="{ active: question2Phase === 'observe', done: question2Phase !== 'observe' }">
            <b>👀</b>
            <span><strong>展示作品</strong><small>让 POKI 看清楚</small></span>
          </article>
          <article :class="{ active: question2Phase === 'speak', done: question2Phase === 'complete' }">
            <b>💬</b>
            <span><strong>介绍作品</strong><small>它是什么？</small></span>
          </article>
          <article :class="{ active: question2Phase === 'complete' }">
            <b>🦏</b>
            <span><strong>说说用途</strong><small>它怎样帮助小犀牛？</small></span>
          </article>
        </div>
      </section>

      <PokiStatePanel
        :state="question2Phase === 'complete' ? 'success' : question2Phase === 'speak' ? 'listening' : 'guide'"
        :message="question2Phase === 'observe'
          ? '请把刚刚拼好的作品放到画面里，让我先认真看一看。'
          : question2Phase === 'speak'
            ? '我在听！告诉我它是什么，又能怎样帮助小犀牛吧。'
            : step.success"
        detail="不需要选答案，像分享环节一样直接介绍作品。"
      >
        <div class="question2-speaking-prompts">
          <span>可以这样说</span>
          <b>这是一个……</b>
          <b>它可以帮助小犀牛……</b>
        </div>

        <FeedbackMessage :feedback="feedback" />

        <button
          v-if="question2Phase === 'observe'"
          class="cta-button question-action-button"
          type="button"
          @click="question2Phase = 'speak'"
        >
          作品放好了
        </button>
        <button
          v-else-if="question2Phase === 'speak'"
          class="cta-button question-action-button"
          type="button"
          @click="completeQuestion2"
        >
          我介绍完了
        </button>
        <div v-else class="question2-complete-note">
          <span>🎉</span>
          <strong>作品分享完成</strong>
        </div>
      </PokiStatePanel>
    </div>
  </section>
</template>
