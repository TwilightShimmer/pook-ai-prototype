<script setup>
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { usePookAppStore } from "../../../composables/usePookApp";

const store = usePookAppStore();
const lesson = computed(() => store.currentLesson.value);
const goalPhase = ref("mission");
let goalTimer = 0;

const isActive = computed(() => store.currentScreen.value === "goals");
const phaseOrder = ["mission", "power", "path"];
const phaseIndex = computed(() => phaseOrder.indexOf(goalPhase.value));

const missionCopy = computed(() => {
  if (lesson.value.welcomeVisual === "rhino") {
    return {
      need: "小犀牛脏脏啦",
      help: "帮它搭个洗澡池",
      speech: "宝贝们看一看，小犀牛身上脏脏啦。我们一起帮它搭一个可以洗澡的地方，好不好呀？",
    };
  }
  return {
    need: "它需要帮忙",
    help: lesson.value.atmosphere,
    speech: "宝贝们看一看，今天有一个小朋友需要我们帮忙。我们一起试试看，好不好呀？",
  };
});

const powerCards = [
  { icon: "👀", title: "看一看" },
  { icon: "🧱", title: "搭一搭" },
  { icon: "🤝", title: "一起做" },
  { icon: "🎤", title: "说一说" },
];

const pathCards = [
  { icon: "👀", title: "看" },
  { icon: "🔎", title: "找" },
  { icon: "🧱", title: "搭" },
  { icon: "🎤", title: "说" },
];

const goalCopy = computed(() => {
  if (goalPhase.value === "mission") {
    return {
      tag: "小使命",
      title: "一起帮帮它",
      body: missionCopy.value.speech,
      poki: "先听 POKI 说一个小任务。",
    };
  }
  if (goalPhase.value === "power") {
    return {
      tag: "小本领",
      title: "今天会用到",
      body: "等一下，我们会用小眼睛看一看，用小手搭一搭，还要和小伙伴一起做、一起说。",
      poki: "这些都是今天的小本领。",
    };
  }
  return {
    tag: "小路线",
    title: "一步一步来",
    body: "先看一看，再找一找，然后一起搭，最后勇敢说出来。POKI 会陪着你们一步一步来。",
    poki: "不用着急，我们慢慢来。",
  };
});

function resetGoalPreview() {
  window.clearTimeout(goalTimer);
  goalPhase.value = "mission";
  if (!isActive.value) return;
  goalTimer = window.setTimeout(() => {
    goalPhase.value = "power";
    goalTimer = window.setTimeout(() => {
      goalPhase.value = "path";
    }, 10000);
  }, 10000);
}

watch(isActive, (active) => {
  if (active) {
    resetGoalPreview();
  } else {
    window.clearTimeout(goalTimer);
  }
}, { immediate: true });

onBeforeUnmount(() => {
  window.clearTimeout(goalTimer);
});
</script>

<template>
  <section class="screen" :class="{ active: isActive }" data-screen="goals">
    <div class="goals-preview-shell">
      <section class="goals-preview-main">
        <div class="goals-preview-head">
          <span class="beta-chip">目标</span>
          <div>
            <h2>{{ goalCopy.title }}</h2>
            <p>{{ goalCopy.poki }}</p>
          </div>
        </div>

        <div class="goals-stage-card" :class="`phase-${goalPhase}`">
          <article class="goals-mission-preview">
            <span class="goals-stage-label">{{ goalCopy.tag }}</span>
            <div class="goals-mission-scene">
              <i class="choice-visual beta-lesson-visual" :class="lesson.welcomeVisual"></i>
              <div class="goals-mission-arrow">→</div>
              <div class="goals-mission-build">
                <div class="model-view goals-mini-model" data-build-stage="2">
                  <div class="model-base"></div>
                  <div class="model-wall"></div>
                  <div class="model-roof"></div>
                  <div class="rotate-ring"></div>
                </div>
              </div>
            </div>
            <div class="goals-question-copy">
              <strong>{{ missionCopy.need }}</strong>
              <small>{{ missionCopy.help }}</small>
            </div>
          </article>

          <article class="goals-power-preview">
            <span class="goals-stage-label">{{ goalCopy.tag }}</span>
            <div class="goals-power-grid">
              <section v-for="item in powerCards" :key="item.title" class="goals-power-card">
                <b>{{ item.icon }}</b>
                <strong>{{ item.title }}</strong>
              </section>
            </div>
          </article>

          <article class="goals-path-preview">
            <span class="goals-stage-label">{{ goalCopy.tag }}</span>
            <div class="goals-path-line">
              <section v-for="(item, index) in pathCards" :key="item.title" class="goals-path-card">
                <b>{{ item.icon }}</b>
                <strong>{{ item.title }}</strong>
                <i>{{ index + 1 }}</i>
              </section>
            </div>
          </article>
        </div>

        <div class="goals-step-tabs" aria-label="目标页阶段">
          <span :class="{ active: phaseIndex === 0 }">使命</span>
          <span :class="{ active: phaseIndex === 1 }">本领</span>
          <span :class="{ active: phaseIndex === 2 }">路线</span>
        </div>
      </section>

      <aside class="goals-poki-panel">
        <div class="goals-poki-avatar">🤖</div>
        <div class="goals-poki-bubble">
          <span>POKI 说</span>
          <strong>{{ goalCopy.body }}</strong>
        </div>

        <div class="goals-knowledge-list">
          <span>今天用到</span>
          <b v-for="item in powerCards" :key="item.title">{{ item.title }}</b>
        </div>

        <button class="cta-button goals-start-button" type="button" @click="store.nextScreen">
          进入课堂
        </button>
      </aside>
    </div>
  </section>
</template>
