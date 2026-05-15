<script setup>
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { usePookAppStore } from "../../../composables/usePookApp";

const store = usePookAppStore();
const lesson = computed(() => store.currentLesson.value);
const activeLineIndex = ref(0);
const videoRef = ref(null);
const videoStarted = ref(false);
let lineTimer = 0;
let videoStartTimer = 0;

const welcomeLines = computed(() =>
  store.isReturningStudent.value ? lesson.value.welcomeBack : lesson.value.welcomeFirst,
);

const talkLines = computed(() => [
  {
    tag: "今天主题",
    emoji: "🤖",
    speech: `今天我们要一起完成《${lesson.value.title}》。`,
    detail: lesson.value.atmosphere,
  },
  {
    tag: "先看一看",
    emoji: "👀",
    speech: welcomeLines.value[1] ?? "先看图，再听 POKI 说今天要做什么。",
    detail: "POKI 会先说，画面会帮小朋友理解。",
  },
  {
    tag: "马上开始",
    emoji: "🧱",
    speech: "等一下我们会开始今天的小任务。",
    detail: lesson.value.currentTasks?.[0] ?? "先从最简单的一步开始。",
  },
]);

const visibleTalkLines = computed(() => talkLines.value.slice(0, activeLineIndex.value + 1));
const currentTalkLine = computed(() => talkLines.value[Math.min(activeLineIndex.value, talkLines.value.length - 1)]);
const isActive = computed(() => store.currentScreen.value === "welcome");

function resetTalkTimer() {
  window.clearInterval(lineTimer);
  window.clearTimeout(videoStartTimer);
  activeLineIndex.value = 0;
  videoStarted.value = false;
  if (videoRef.value) {
    videoRef.value.pause();
    videoRef.value.currentTime = 0;
  }
  if (!isActive.value) return;
  lineTimer = window.setInterval(() => {
    activeLineIndex.value = Math.min(activeLineIndex.value + 1, talkLines.value.length - 1);
    if (activeLineIndex.value >= talkLines.value.length - 1) {
      window.clearInterval(lineTimer);
      videoStartTimer = window.setTimeout(() => {
        videoStarted.value = true;
        videoRef.value?.play?.();
      }, 1400);
    }
  }, 1800);
}

watch(isActive, (active) => {
  if (active) {
    resetTalkTimer();
  } else {
    window.clearInterval(lineTimer);
    window.clearTimeout(videoStartTimer);
    videoStarted.value = false;
    videoRef.value?.pause?.();
  }
}, { immediate: true });

onBeforeUnmount(() => {
  window.clearInterval(lineTimer);
  window.clearTimeout(videoStartTimer);
});
</script>

<template>
  <section class="screen" :class="{ active: isActive }" data-screen="welcome">
    <div class="welcome-flow-shell">
      <section class="welcome-main-card">
        <div class="welcome-media-layer">
          <div class="welcome-window-bar">
            <span></span>
            <span></span>
            <span></span>
            <strong>今天要学什么？</strong>
          </div>

          <div class="welcome-media-body">
            <video
              ref="videoRef"
              class="welcome-topic-video"
              :class="{ playing: videoStarted }"
              src="/resources/opening.mp4"
              muted
              loop
              playsinline
              preload="auto"
            ></video>
            <div v-if="!videoStarted" class="welcome-video-pause-mask">
              <span>🤖</span>
              <strong>POKI 先讲一讲</strong>
            </div>
            <div class="welcome-topic-overlay">
              <span class="welcome-topic-badge">{{ lesson.theme }}</span>
              <h2>{{ lesson.title }}</h2>
              <p>{{ lesson.atmosphere }}</p>
            </div>
          </div>
        </div>

        <aside class="welcome-poki-panel" aria-live="polite">
          <div class="welcome-poki-avatar">🤖</div>
          <div class="welcome-speech">
            <span>{{ currentTalkLine.tag }}</span>
            <strong>{{ currentTalkLine.speech }}</strong>
          </div>

          <div class="welcome-info-stack">
            <article
              v-for="(item, index) in visibleTalkLines"
              :key="item.tag"
              class="welcome-info-card"
              :style="{ '--delay': `${index * 90}ms` }"
            >
              <b>{{ item.emoji }}</b>
              <span>{{ item.detail }}</span>
            </article>
          </div>

          <button class="cta-button welcome-start-button" type="button" @click="store.nextScreen">
            开始任务
          </button>
        </aside>
      </section>
    </div>
  </section>
</template>
