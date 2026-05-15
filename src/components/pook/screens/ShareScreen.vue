<script setup>
import { computed } from "vue";
import { shareQueueCopy } from "../../../data/pookData";
import { usePookAppStore } from "../../../composables/usePookApp";
import { useStepFeedback } from "../../../composables/useStepFeedback";
import MicroProgress from "../MicroProgress.vue";
import AgentStage from "../shared/AgentStage.vue";
import FeedbackMessage from "../shared/FeedbackMessage.vue";
import PanelRibbon from "../shared/PanelRibbon.vue";

const store = usePookAppStore();
const { feedback, showFeedback, clearFeedbackAfter } = useStepFeedback();

const state = computed(() => store.lessonState.share);
const step = computed(() => state.value.steps[state.value.index]);

function confirmStep() {
  const result = store.confirmShareStep();
  showFeedback(result);
  if (!state.value.completed) {
    clearFeedbackAfter(650);
  }
}
</script>

<template>
  <section class="screen" :class="{ active: store.currentScreen.value === 'share' }" data-screen="share">
    <div class="classroom-layout">
      <section class="content-panel share-panel">
        <PanelRibbon title="分享拼搭结果" />
        <MicroProgress :total="state.steps.length" :current-index="state.index" />
        <div class="agent-state-bar listening">
          <span></span>
          <strong>{{ step.stateTitle }}</strong>
          <small>{{ step.stateBody }}</small>
        </div>
        <div class="share-queue">
          <article v-for="(item, index) in shareQueueCopy" :key="item.title" :class="{ active: index === state.index, done: index < state.index }">
            <strong>{{ item.title }}</strong>
            <span>{{ item.body }}</span>
          </article>
        </div>
        <FeedbackMessage :feedback="feedback" />
        <div class="agent-hint">
          <strong>POKI 提示</strong>
          <span>{{ step.hint }}</span>
        </div>
        <button class="micro-cta" type="button" @click="confirmStep">
          {{ state.index === state.steps.length - 1 ? "全组分享完成" : "这一位说完了" }}
        </button>
      </section>
      <AgentStage :text="step.aside" />
    </div>
  </section>
</template>
