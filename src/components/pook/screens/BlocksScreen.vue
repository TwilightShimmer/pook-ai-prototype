<script setup>
import { computed, ref, watch } from "vue";
import { blockCards } from "../../../data/pookData";
import { usePookAppStore } from "../../../composables/usePookApp";
import { useStepFeedback } from "../../../composables/useStepFeedback";
import MicroProgress from "../MicroProgress.vue";
import FeedbackMessage from "../shared/FeedbackMessage.vue";
import PanelRibbon from "../shared/PanelRibbon.vue";
import TaskCueCard from "../shared/TaskCueCard.vue";

const store = usePookAppStore();
const { feedback, showFeedback, clearFeedbackAfter } = useStepFeedback();

const state = computed(() => store.lessonState.blocks);
const step = computed(() => state.value.steps[state.value.index]);
const currentBlock = computed(
  () => blockCards.find((item) => item.key === step.value?.key) ?? blockCards[0],
);
const poppedBubbles = ref([]);
const advancing = ref(false);

const requiredCount = computed(() => {
  const parsed = Number.parseInt(currentBlock.value.count, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
});
const remainingCount = computed(() => Math.max(0, requiredCount.value - poppedBubbles.value.length));
const bubbleIndexes = computed(() => Array.from({ length: requiredCount.value }, (_, index) => index));

function finishCurrentBlockGroup() {
  const result = store.selectBlock(currentBlock.value.key);
  showFeedback(result);
  if (result.type === "success" && !state.value.completed) {
    clearFeedbackAfter(550);
  }
  advancing.value = false;
}

function popBubble(index) {
  if (advancing.value || poppedBubbles.value.includes(index)) return;
  poppedBubbles.value = [...poppedBubbles.value, index];
  if (poppedBubbles.value.length >= requiredCount.value) {
    advancing.value = true;
    window.setTimeout(finishCurrentBlockGroup, 520);
  }
}

watch(
  () => step.value?.key,
  () => {
    poppedBubbles.value = [];
    advancing.value = false;
  },
);
</script>

<template>
  <section class="screen" :class="{ active: store.currentScreen.value === 'blocks' }" data-screen="blocks">
    <div class="classroom-layout blocks-focus-layout">
      <section class="content-panel blocks-panel">
        <PanelRibbon title="找一找积木" />
        <MicroProgress :total="state.steps.length" :current-index="state.index" />
        <TaskCueCard :title="step.title" :body="step.body" />
        <div class="timer-strip"><span></span><strong>01:20</strong></div>

        <div class="single-block-stage">
          <div class="single-block-poki">
            <span aria-hidden="true">🤖</span>
            <strong>{{ step.aside }}</strong>
          </div>

          <div class="block-bubble-stage" :class="{ advancing }">
            <button
              v-for="index in bubbleIndexes"
              :key="`${currentBlock.key}-${index}`"
              class="block-bubble"
              type="button"
              :class="[{ popped: poppedBubbles.includes(index) }, currentBlock.brickClass]"
              :style="{ '--bubble-index': index }"
              :aria-label="`找到第${index + 1}个${currentBlock.label}`"
              @click="popBubble(index)"
            >
              <div class="brick bubble-brick" :class="currentBlock.brickClass"></div>
            </button>
          </div>

          <div class="block-bubble-summary">
            <span>{{ currentBlock.count }}</span>
            <strong>{{ currentBlock.label }}</strong>
            <small>
              {{
                state.completed
                  ? "材料准备完成"
                  : remainingCount === 0
                    ? "太棒啦，准备下一种"
                    : `找到一个，就戳破一个泡泡。还差 ${remainingCount} 个`
              }}
            </small>
          </div>
        </div>

        <FeedbackMessage :feedback="feedback" />
        <div class="role-strip">
          <span>{{ state.index + 1 }} / {{ state.steps.length }}</span>
          <span>一次只找这一种</span>
          <span>找到一个戳破一个泡泡</span>
        </div>
      </section>
    </div>
  </section>
</template>
