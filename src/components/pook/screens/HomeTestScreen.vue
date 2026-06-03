<script setup>
import { computed, ref } from "vue";
import { scienceThemeLessons, scienceThemes } from "../../../data/pookData";
import { usePookAppStore } from "../../../composables/usePookApp";

const store = usePookAppStore();
const selectedThemeKey = ref("life");
const bubblesCollapsed = ref(false);
const activeActivityId = ref(null);
const activityExternalUrl = "https://www.baidu.com";

const activityItems = [
  {
    id: "offline",
    label: "线下活动",
    title: "POKI 线下活动",
    emoji: "🎪",
    tone: "cyan",
    summary: "亲子公开课、校园体验日、主题搭建挑战，都放在这里。",
    bullets: ["本周主题：犀牛洗澡", "适合 4-6 岁小朋友", "完成活动可获得纪念卡"],
  },
  {
    id: "idea",
    label: "产品理念",
    title: "玩着学，慢慢会",
    emoji: "💡",
    tone: "mint",
    summary: "POKI 用语音、图像和动手任务，把学习变成一次小冒险。",
    bullets: ["少文字，多画面", "先体验，再理解", "孩子主导，老师控场"],
  },
  {
    id: "gallery",
    label: "风采展馆",
    title: "小队风采展馆",
    emoji: "🌟",
    tone: "violet",
    summary: "展示其它小队的课堂高光、作品照片和闪卡成果。",
    bullets: ["本周高光小队", "优秀作品墙", "主题闪卡展示"],
  },
];

const selectedLessons = computed(() => scienceThemeLessons[selectedThemeKey.value] ?? []);
const floatingBubbles = computed(() => activityItems);
const activeActivity = computed(
  () => activityItems.find((item) => item.id === activeActivityId.value) ?? null,
);
const bubbleCount = activityItems.length;
const themeEmojiMap = {
  life: "🐣",
  nature: "🌦️",
  engineering: "🛠️",
  humanity: "🏘️",
};
const lessonEmojiMap = {
  polar: "🐻‍❄️",
  wind: "🌬️",
  rhino: "🦏",
  community: "🏘️",
};

function startThemeLesson(themeKey, lessonIndex = 0) {
  if (lessonIndex > 0) {
    store.showToast("先从亮起来的小圆点开始吧");
    return;
  }
  selectedThemeKey.value = themeKey;
  store.startBetaLessonByTheme(themeKey, lessonIndex);
}

function openActivity(item) {
  window.open(activityExternalUrl, "_blank", "noopener,noreferrer");
}

function toggleBubbles() {
  bubblesCollapsed.value = !bubblesCollapsed.value;
  if (bubblesCollapsed.value) {
    activeActivityId.value = null;
  }
}

function bubbleAnimationStyle(index) {
  const delayIndex = bubblesCollapsed.value ? bubbleCount - index - 1 : index;
  return {
    transitionDelay: `${delayIndex * 80}ms`,
  };
}

function themeArtClass(theme) {
  return `theme-${theme.art || theme.key}`;
}

function themeEmoji(theme) {
  return themeEmojiMap[theme.key] ?? "✨";
}

function lessonEmoji(lesson) {
  return lessonEmojiMap[lesson.visual] ?? "✨";
}
</script>

<template>
  <section class="screen" :class="{ active: store.currentScreen.value === 'home' }" data-screen="home">
    <div class="home-test-layout">
      <section class="home-test-main">
        <div class="home-hud-strip" aria-hidden="true">
          <span>AI COURSE MAP</span>
          <b>POKI SYNC</b>
          <i>ONLINE</i>
        </div>
        <div class="home-test-course-stage">
          <aside class="home-test-theme-rail" aria-label="课程主题">
            <button
              v-for="theme in scienceThemes"
              :key="theme.key"
              class="home-test-theme-tab"
              :class="{ active: selectedThemeKey === theme.key }"
              :aria-label="theme.label"
              @click="selectedThemeKey = theme.key"
            >
              <span class="home-test-theme-art" :class="themeArtClass(theme)" aria-hidden="true">
                {{ themeEmoji(theme) }}
              </span>
              <span class="home-test-theme-pill">{{ theme.shortLabel }}</span>
              <span class="home-test-theme-stars" aria-hidden="true">{{ theme.stars }}★</span>
            </button>
          </aside>

          <div class="home-test-panel">
            <div class="home-test-lesson-map">
              <div
                v-for="(lesson, index) in selectedLessons"
                :key="`${selectedThemeKey}-${lesson.label}`"
                class="home-test-lesson-node"
                :class="[`node-${index + 1}`, { locked: index > 0, featured: index === 0 }]"
              >
                <button class="home-test-node-core" @click="startThemeLesson(selectedThemeKey, index)">
                  <span v-if="index === 0" class="home-test-node-guide">
                    <span class="home-test-node-guide-emoji">🤖</span>
                    <span>跟 POKI 来</span>
                  </span>
                  <span v-if="index === 0" class="home-test-node-status">AI 已点亮</span>
                  <span class="home-test-node-level">{{ lesson.level }}</span>
                  <span class="home-test-node-visual" aria-hidden="true">{{ lessonEmoji(lesson) }}</span>
                </button>
                <div class="home-test-node-copy">
                  <strong>{{ index === 0 ? lesson.label : "待解锁" }}</strong>
                  <small>{{ index === 0 ? "开始" : "锁定" }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="home-test-bubble-cluster" :class="{ collapsed: bubblesCollapsed }">
        <div class="home-test-floating-rail">
          <button
            v-for="(item, index) in floatingBubbles"
            :key="item.id"
            class="home-test-bubble"
            :class="[item.tone, { active: activeActivityId === item.id }]"
            :style="bubbleAnimationStyle(index)"
            @click="openActivity(item)"
          >
            <strong aria-hidden="true">{{ item.emoji }}</strong>
            <small>{{ item.label }}</small>
          </button>
        </div>
        <button class="home-test-bubble-toggle" @click="toggleBubbles">
          {{ bubblesCollapsed ? "《" : "》" }}
        </button>
      </div>

      <aside
        v-if="activeActivity"
        class="home-test-activity-drawer"
        :class="activeActivity.tone"
        aria-live="polite"
      >
        <button
          class="home-test-activity-close"
          type="button"
          aria-label="关闭活动面板"
          @click="activeActivityId = null"
        >
          ×
        </button>
        <span class="home-test-activity-emoji" aria-hidden="true">{{ activeActivity.emoji }}</span>
        <p>{{ activeActivity.label }}</p>
        <h2>{{ activeActivity.title }}</h2>
        <strong>{{ activeActivity.summary }}</strong>
        <div class="home-test-activity-list">
          <span v-for="item in activeActivity.bullets" :key="item">{{ item }}</span>
        </div>
      </aside>
    </div>
  </section>
</template>
