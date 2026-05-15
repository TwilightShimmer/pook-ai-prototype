<script setup>
import { computed } from "vue";
import { usePookAppStore } from "../../../composables/usePookApp";
import { useStepFeedback } from "../../../composables/useStepFeedback";
import MicroProgress from "../MicroProgress.vue";
import AgentStage from "../shared/AgentStage.vue";
import FeedbackMessage from "../shared/FeedbackMessage.vue";
import PanelRibbon from "../shared/PanelRibbon.vue";

const store = usePookAppStore();
const { feedback, showFeedback, clearFeedbackAfter } = useStepFeedback();

const state = computed(() => store.lessonState.photo);
const step = computed(() => state.value.steps[state.value.index]);

function confirmStep() {
  const result = store.confirmPhotoStep();
  showFeedback(result);
  if (!state.value.completed) {
    clearFeedbackAfter(650);
  }
}
</script>

<template>
  <section class="screen" :class="{ active: store.currentScreen.value === 'photo' }" data-screen="photo">
    <div class="classroom-layout">
      <section class="content-panel camera-panel work-photo">
        <PanelRibbon title="拍作品" />
        <MicroProgress :total="state.steps.length" :current-index="state.index" />
        <div class="agent-state-bar watching">
          <span></span>
          <strong>POKI 正在看作品</strong>
          <small>当前拍{{ step.tab }}，拍好后再继续下一面。</small>
        </div>
        <div class="photo-tabs">
          <span v-for="(item, index) in state.steps" :key="item.tab" :class="{ active: index === state.index, done: index < state.index }">
            {{ item.tab }}
          </span>
        </div>
        <div class="work-frame">
          <div class="lego-build"></div>
          <div class="child-shadow"></div>
        </div>
        <FeedbackMessage :feedback="feedback" />
        <div class="recognition-status">
          <span></span>
          <strong>{{ step.title }}</strong>
          <small>{{ step.body }}</small>
        </div>
        <button class="micro-cta" type="button" @click="confirmStep">
          {{ state.index === state.steps.length - 1 ? "三面都拍好了" : "这一面拍好了" }}
        </button>
      </section>
      <AgentStage :text="step.aside" />
    </div>
  </section>
</template>
