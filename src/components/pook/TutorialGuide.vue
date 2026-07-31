<script setup>
import { computed, ref } from "vue";
import PokiCharacter from "./shared/PokiCharacter.vue";
import PokiStatePanel from "./shared/PokiStatePanel.vue";

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const open = ref(false);
const spotlightActive = ref(true);
const stepIndex = ref(0);
const selectedCard = ref("");

const steps = [
  {
    id: "welcome",
    eyebrow: "第一次来？",
    title: "和 POKI 练一遍吧",
    body: "我们会一起看、说、找、搭和分享。课堂会自己带你往前走。",
    state: "speaking",
    visual: "✨",
    action: "开始练习",
  },
  {
    id: "auto",
    eyebrow: "自动继续",
    title: "跟着 POKI 就可以",
    body: "小动画结束后，课堂会自己进入下一步，不需要一直找按钮。",
    state: "guide",
    visual: "▶️",
    action: "我看懂了",
  },
  {
    id: "navigation",
    eyebrow: "没跟上也没关系",
    title: "上一步和下一步",
    body: "想再看一次就点上一步；已经做好了，就点下一步提前出发。",
    state: "waiting",
    visual: "↔️",
    action: "继续",
  },
  {
    id: "question",
    eyebrow: "看 · 说 · 选",
    title: "可以说，也可以点图片",
    body: "POKI 会先听你说。不知道或不想说时，点一张图片也能继续。",
    state: selectedCard.value ? "heard" : "listening",
    visual: "👂",
    action: "我会了",
    cards: ["🦏 有角", "💦 脏脏的", "🛁 想洗澡"],
  },
  {
    id: "blocks",
    eyebrow: "找一找",
    title: "找到一块，就点一下",
    body: "屏幕里的积木会变暗，全部找到后就会自动继续。",
    state: "waiting",
    visual: "🧱",
    action: "找到啦",
  },
  {
    id: "build",
    eyebrow: "跟着搭",
    title: "动画结束会自动继续",
    body: "没看清可以回到上一步；搭得快也可以点下一步。",
    state: "guide",
    visual: "🛠️",
    action: "搭好了",
  },
  {
    id: "camera",
    eyebrow: "给 POKI 看",
    title: "把作品放进框里",
    body: "POKI 看清后会问一个小问题。没看清时会告诉你怎么调整。",
    state: "observing",
    visual: "📷",
    action: "展示作品",
  },
  {
    id: "share",
    eyebrow: "分享一下",
    title: "告诉 POKI 你的想法",
    body: "说一句就可以。POKI 会认真听，也会根据作品继续和你聊。",
    state: "ready_to_speak",
    visual: "🎤",
    action: "完成练习",
  },
  {
    id: "complete",
    eyebrow: "练习完成",
    title: "现在可以开始正式课程啦",
    body: "跟着 POKI，没跟上点上一步，做得快点下一步。",
    state: "success",
    visual: "⭐",
    action: "回到首页",
  },
];

const currentStep = computed(() => {
  const step = steps[stepIndex.value];
  if (step.id !== "question") return step;
  return {
    ...step,
    state: selectedCard.value ? "heard" : "listening",
    body: selectedCard.value
      ? `POKI 收到啦：${selectedCard.value}。不说话时也可以这样完成。`
      : step.body,
  };
});

function startTutorial() {
  spotlightActive.value = false;
  stepIndex.value = 0;
  selectedCard.value = "";
  open.value = true;
}

function closeTutorial() {
  open.value = false;
}

function previousStep() {
  if (stepIndex.value > 0) {
    stepIndex.value -= 1;
    selectedCard.value = "";
  }
}

function nextStep() {
  if (stepIndex.value >= steps.length - 1) {
    closeTutorial();
    return;
  }
  stepIndex.value += 1;
  selectedCard.value = "";
}
</script>

<template>
  <div
    v-if="visible && spotlightActive"
    class="tutorial-spotlight"
    role="dialog"
    aria-modal="true"
    aria-label="请点击新手教程入口"
    @click.stop.prevent
    @pointerdown.stop.prevent
  ></div>

  <div v-if="visible" class="tutorial-entry" :class="{ spotlight: spotlightActive }">
    <div v-if="spotlightActive" class="tutorial-entry-hint" aria-hidden="true">
      <span>👇</span>
      <strong>从这里开始</strong>
    </div>
    <button type="button" class="tutorial-entry-button" @click="startTutorial">
      <PokiCharacter variant="avatar" decorative />
      <span class="tutorial-entry-new">新</span>
      <span class="tutorial-entry-copy">
        <strong>第一次来？</strong>
        <small>和 POKI 练一遍吧</small>
      </span>
    </button>
  </div>

  <div v-if="open" class="tutorial-overlay" role="dialog" aria-modal="true" aria-label="POKI完整课堂流程引导课">
    <div class="tutorial-shell">
      <header class="tutorial-header">
        <button type="button" aria-label="退出新手教程" @click="closeTutorial">‹</button>
        <div>
          <span>POOK AI 新手教程</span>
          <strong>{{ stepIndex + 1 }} / {{ steps.length }}</strong>
        </div>
      </header>

      <main class="tutorial-content">
        <section class="tutorial-task-card">
          <span class="tutorial-eyebrow">{{ currentStep.eyebrow }}</span>
          <div class="tutorial-visual" aria-hidden="true">{{ currentStep.visual }}</div>
          <h2>{{ currentStep.title }}</h2>
          <p>{{ currentStep.body }}</p>

          <div v-if="currentStep.cards" class="tutorial-answer-cards">
            <button
              v-for="card in currentStep.cards"
              :key="card"
              type="button"
              :class="{ active: selectedCard === card }"
              @click="selectedCard = card"
            >
              {{ card }}
            </button>
          </div>

          <div class="tutorial-progress" aria-label="引导课进度">
            <span
              v-for="(_, index) in steps"
              :key="index"
              :class="{ active: index === stepIndex, done: index < stepIndex }"
            ></span>
          </div>
        </section>

        <PokiStatePanel
          :state="currentStep.state"
          :message="currentStep.title"
          :detail="currentStep.body"
        >
          <button
            v-if="currentStep.id === 'question' && !selectedCard"
            type="button"
            class="poki-secondary-action"
            @click="selectedCard = currentStep.cards[0]"
          >
            我不知道
          </button>
        </PokiStatePanel>
      </main>

      <footer class="tutorial-footer">
        <button type="button" class="tutorial-back" :disabled="stepIndex === 0" @click="previousStep">
          上一步
        </button>
        <button type="button" class="tutorial-next" @click="nextStep">
          {{ currentStep.action }}
        </button>
      </footer>
    </div>
  </div>
</template>
