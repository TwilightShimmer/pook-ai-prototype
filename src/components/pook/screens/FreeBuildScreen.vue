<script setup>
import { computed } from "vue";
import { usePookAppStore } from "../../../composables/usePookApp";
import { useStepFeedback } from "../../../composables/useStepFeedback";
import MicroProgress from "../MicroProgress.vue";
import AgentStage from "../shared/AgentStage.vue";
import FeedbackMessage from "../shared/FeedbackMessage.vue";
import PanelRibbon from "../shared/PanelRibbon.vue";
import TaskCueCard from "../shared/TaskCueCard.vue";

const store = usePookAppStore();
const { feedback, showFeedback, clearFeedbackAfter } = useStepFeedback();

const state = computed(() => store.lessonState["free-build"]);
const step = computed(() => state.value.steps[state.value.index]);

function confirmStep() {
  const result = store.confirmFreeBuildStep();
  showFeedback(result);
  if (!state.value.completed) {
    clearFeedbackAfter(650);
  }
}
</script>

<template>
  <section class="screen" :class="{ active: store.currentScreen.value === 'free-build' }" data-screen="free-build">
    <div class="classroom-layout">
      <section class="content-panel free-build-panel">
        <PanelRibbon title="自由拼搭" />
        <MicroProgress :total="state.steps.length" :current-index="state.index" />
        <TaskCueCard :title="step.title" :body="step.body" />
        <div class="inspiration-grid">
          <article v-for="(item, index) in state.steps" :key="item.label" :class="{ active: index === state.index, done: index < state.index }">
            <strong>{{ item.label }}</strong>
            <span>{{ index === 0 ? "冰屋、围墙、挡风" : index === 1 ? "门洞、斜坡、桥" : "小鱼池、休息区" }}</span>
          </article>
        </div>
        <FeedbackMessage :feedback="feedback" />
        <button class="micro-cta" type="button" @click="confirmStep">
          {{ state.index === state.steps.length - 1 ? "创作完成了" : "这个挑战完成了" }}
        </button>
        <div class="timer-strip"><span></span><strong>10:00</strong></div>
      </section>
      <AgentStage :text="step.aside" />
    </div>
  </section>
</template>
