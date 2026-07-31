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

const state = computed(() => store.lessonState.build);
const step = computed(() => state.value.steps[state.value.index]);

function confirmStep() {
  const result = store.confirmBuildStep();
  showFeedback(result);
  if (!state.value.completed) {
    clearFeedbackAfter(650);
  }
}
</script>

<template>
  <section class="screen" :class="{ active: store.currentScreen.value === 'build' }" data-screen="build">
    <div class="classroom-layout">
      <section class="content-panel build-panel">
        <PanelRibbon title="3D 拼搭引导" />
        <MicroProgress :total="state.steps.length" :current-index="state.index" />
        <TaskCueCard :title="step.title" :body="step.body" extra-class="build-task-card" />
        <div class="build-stage">
          <div class="model-view" :data-build-stage="state.index">
            <div class="model-base"></div>
            <div class="model-wall"></div>
            <div class="model-roof"></div>
            <div class="rotate-ring"></div>
          </div>
          <div class="build-steps">
            <span v-for="(item, index) in state.steps" :key="item.title" :class="{ active: index === state.index, done: index < state.index }">
              第 {{ index + 1 }} 步
            </span>
          </div>
        </div>
        <FeedbackMessage :feedback="feedback" />
        <button class="micro-cta" type="button" @click="confirmStep">
          {{ state.index === state.steps.length - 1 ? "模型搭好了" : "这一步完成了" }}
        </button>
        <div class="role-strip">
          <span>{{ step.roles[0] }}</span><span>{{ step.roles[1] }}</span><span>{{ step.roles[2] }}</span>
        </div>
      </section>
      <AgentStage state="waiting" :text="step.aside" />
    </div>
  </section>
</template>
