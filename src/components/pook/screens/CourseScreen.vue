<script setup>
import { nextTick, ref } from "vue";
import { usePookAppStore } from "../../../composables/usePookApp";
const store = usePookAppStore();
const scienceStageRef = ref(null);
const lastThemeSwitchAt = ref(0);

function shouldShowGuide(index) {
  if (index !== 0) return false;
  if (store.courseStepIndex.value === 0 && store.selectedAge.value === 5) return true;
  if (store.courseStepIndex.value === 1) return true;
  if (store.courseStepIndex.value === 2) return true;
  return false;
}

function renderStars(count) {
  return "★".repeat(count) + "☆".repeat(Math.max(0, 4 - count));
}

function scienceNodeClass(index) {
  const pattern = ["lane-a", "lane-b", "lane-c", "lane-d", "lane-e"];
  return pattern[index % pattern.length];
}

function scienceNodeStyle(index) {
  const offsets = ["10%", "52%", "70%", "26%", "58%"];
  return { "--node-offset": offsets[index % offsets.length] };
}

function handleScienceStageWheel(event) {
  if (!store.courseStep.value.isScienceThemeStep || event.deltaY === 0) return;
  const container = scienceStageRef.value;
  if (!container) return;

  const now = Date.now();
  if (now - lastThemeSwitchAt.value < 500) return;

  const themes = store.scienceThemeTabs.value;
  const currentIndex = themes.findIndex((theme) => theme.key === store.selectedScienceTheme.value);
  if (currentIndex < 0) return;

  const reachedBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 4;
  const reachedTop = container.scrollTop <= 4;

  let nextThemeKey = "";
  if (event.deltaY > 0 && reachedBottom && currentIndex < themes.length - 1) {
    nextThemeKey = themes[currentIndex + 1].key;
  }
  if (event.deltaY < 0 && reachedTop && currentIndex > 0) {
    nextThemeKey = themes[currentIndex - 1].key;
  }
  if (!nextThemeKey) return;

  lastThemeSwitchAt.value = now;
  store.setScienceTheme(nextThemeKey);
  nextTick(() => {
    if (scienceStageRef.value) {
      scienceStageRef.value.scrollTop = event.deltaY > 0 ? 0 : 0;
    }
  });
}
</script>

<template>
  <section class="screen" :class="{ active: store.currentScreen.value === 'course' }" data-screen="course">
    <div class="course-funnel">
      <header class="course-funnel-header">
        <button class="course-back" :style="{ visibility: store.courseStepIndex.value === 0 ? 'hidden' : 'visible' }" @click="store.goCourseBack">
          上一级
        </button>
        <div>
          <p>{{ store.courseBreadcrumb.value }}</p>
          <h2>{{ store.courseStep.value.title }}</h2>
        </div>
        <div></div>
      </header>
      <section
        ref="scienceStageRef"
        class="course-choice-stage"
        :class="{
          'lesson-stage': store.courseStep.value.isLessonStep,
          'age-kit-stage': store.courseStep.value.isAgeKitStep,
          'science-map-stage': store.courseStep.value.isScienceThemeStep,
        }"
        aria-live="polite"
        @wheel="handleScienceStageWheel"
      >
        <div v-if="store.courseStep.value.isAgeKitStep" class="course-age-switch" role="group" aria-label="年龄分类">
          <button
            v-for="age in [5, 8, 11]"
            :key="age"
            :class="{ active: store.selectedAge.value === age }"
            @click="store.setCourseAge(age)"
          >
            {{ age }}岁+
          </button>
        </div>
        <div
          v-if="store.courseStep.value.isScienceThemeStep"
          class="science-theme-layout"
        >
          <aside class="filter-rail science-theme-rail" aria-label="课程主题">
            <button
              v-for="theme in store.scienceThemeTabs.value"
              :key="theme.key"
              class="rail-pill science-theme-tab"
              :class="{ active: store.selectedScienceTheme.value === theme.key }"
              @click="store.setScienceTheme(theme.key)"
            >
              <span class="science-theme-tab-copy">
                <small>{{ theme.summary }}</small>
                <strong>{{ theme.label }}</strong>
                <span class="science-theme-stars">难度 {{ renderStars(theme.stars) }}</span>
              </span>
            </button>
          </aside>
          <div class="science-theme-panel">
            <header class="science-theme-header">
              <p>课程主题</p>
              <h3>{{ store.activeScienceTheme.value.label }}</h3>
              <span class="science-theme-header-stars">难度 {{ renderStars(store.activeScienceTheme.value.stars) }}</span>
            </header>
            <div class="science-course-journey">
              <div
                v-for="(option, index) in store.courseOptions.value"
                :key="`${store.activeScienceTheme.value.key}-${option.label}-${index}`"
                class="science-course-node"
                :class="[scienceNodeClass(index), { locked: !option.unlocked, latest: option.latestUnlocked }]"
                :style="scienceNodeStyle(index)"
              >
                <button
                  class="science-node-button"
                  :class="{ locked: !option.unlocked }"
                  @click="store.selectCourseOption(index)"
                >
                  <span class="science-node-core">
                    <i class="choice-visual science-node-visual" :class="option.visual"></i>
                    <span class="science-node-level">{{ option.level }}</span>
                  </span>
                  <span v-if="option.latestUnlocked" class="science-node-guide" aria-hidden="true">
                    <span class="course-card-guide-emoji">☝️</span>
                    <span>点这里开始</span>
                  </span>
                </button>
                <div class="science-node-copy">
                  <strong>{{ option.label }}</strong>
                  <small>{{ option.desc }}</small>
                  <span class="science-node-pill">{{ option.difficultyText }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!store.courseStep.value.isScienceThemeStep" class="course-choice-grid">
          <div
            v-for="(option, index) in store.courseOptions.value"
            :key="`${option.label}-${index}`"
            class="course-choice-item"
          >
            <button
              class="course-choice-card"
              :class="{ 'course-lesson-choice': store.courseStep.value.isLessonStep }"
              @click="store.selectCourseOption(index)"
            >
              <span v-if="option.tag" class="choice-tag">{{ option.tag }}</span>
              <i class="choice-visual" :class="option.visual"></i>
              <span class="choice-copy">
                <strong>{{ option.label }}</strong>
                <small>{{ option.desc }}</small>
                <span v-if="store.courseStep.value.isLessonStep && index === 0" class="cta-button course-start-cta">开始学习</span>
              </span>
            </button>
            <div
              v-if="shouldShowGuide(index)"
              class="course-card-guide"
              aria-hidden="true"
            >
              <span class="course-card-guide-emoji">☝️</span>
              <span>点这里开始</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>
