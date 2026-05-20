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
const introQuestion = computed(() =>
  lesson.value.question?.prompt
  ?? store.lessonState.question.steps[store.lessonState.question.index]?.prompt
  ?? "视频里发生了什么？",
);

const talkLines = computed(() => [
  {
    tag: "先记问题",
    emoji: "🤖",
    speech: `等下看视频时，帮 POKI 找一找：${introQuestion.value}`,
    detail: "先记住这个小问题，再开始看视频。",
  },
  {
    tag: "看视频找答案",
    emoji: "👀",
    speech: welcomeLines.value[1] ?? "一边看，一边找答案。",
    detail: lesson.value.atmosphere,
  },
  {
    tag: "看完就回答",
    emoji: "🧱",
    speech: "视频看完，我们马上一起回答这个问题。",
    detail: "可以先说出来，再看图片选答案。",
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
            <strong>带着问题看视频</strong>
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
              <strong>先听 POKI 的小问题</strong>
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
            去回答问题
          </button>
        </aside>
      </section>
    </div>
  </section>
</template>
