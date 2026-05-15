<script setup>
import { ref, computed } from "vue";
import { blockCards } from "../../../data/pookData";
import { usePookAppStore } from "../../../composables/usePookApp";
import { useStepFeedback } from "../../../composables/useStepFeedback";
import MicroProgress from "../MicroProgress.vue";
import AgentStage from "../shared/AgentStage.vue";
import FeedbackMessage from "../shared/FeedbackMessage.vue";
import PanelRibbon from "../shared/PanelRibbon.vue";
import TaskCueCard from "../shared/TaskCueCard.vue";

const store = usePookAppStore();
const { feedback, showFeedback, clearFeedbackAfter } = useStepFeedback();
const lastWrongKey = ref("");

const state = computed(() => store.lessonState.blocks);
const step = computed(() => state.value.steps[state.value.index]);

function selectBlock(key) {
  const result = store.selectBlock(key);
  showFeedback(result);
  lastWrongKey.value = result.type === "error" ? key : "";
  if (result.type === "success" && !state.value.completed) {
    clearFeedbackAfter(550);
  }
}
</script>

<template>
  <section class="screen" :class="{ active: store.currentScreen.value === 'blocks' }" data-screen="blocks">
    <div class="classroom-layout">
      <section class="content-panel blocks-panel">
        <PanelRibbon title="找一找积木" />
        <MicroProgress :total="state.steps.length" :current-index="state.index" />
        <TaskCueCard :title="step.title" :body="step.body" />
        <div class="timer-strip"><span></span><strong>01:20</strong></div>
        <div class="block-grid">
          <article
            v-for="item in blockCards"
            :key="item.key"
            :class="{
              completed: state.found.includes(item.key),
              wrong: lastWrongKey === item.key,
              correct: step.key === item.key && state.found.includes(item.key),
            }"
            @click="selectBlock(item.key)"
          >
            <span>{{ item.count }}</span>
            <div class="brick" :class="item.brickClass"></div>
            <strong>{{ item.label }}</strong>
          </article>
        </div>
        <FeedbackMessage :feedback="feedback" />
        <div class="role-strip">
          <span>1 号找白色</span><span>2 号找蓝绿色</span><span>3 号检查数量</span>
        </div>
      </section>
      <AgentStage :text="step.aside" />
    </div>
  </section>
</template>
