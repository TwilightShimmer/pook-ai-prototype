<script setup>
import { usePookAppStore } from "../../composables/usePookApp";

const store = usePookAppStore();
</script>

<template>
  <footer
    class="lesson-nav"
    :style="{
      visibility: store.navState.value.show ? 'visible' : 'hidden',
      opacity: store.navState.value.show ? '1' : '0',
      pointerEvents: store.navState.value.show ? 'auto' : 'none',
    }"
  >
    <button
      class="nav-step ghost journey-side-button journey-side-button-left"
      :style="{ visibility: store.navState.value.showPrev ? 'visible' : 'hidden' }"
      @click="store.prevScreen"
    >
      上一步
    </button>

    <div class="lesson-journey-nav">
      <div class="journey-summary">
        <span class="journey-chip">玩学闯关</span>
        <strong>{{ store.currentJourneyMeta.value.action }}</strong>
        <small>本关奖励：{{ store.currentJourneyMeta.value.reward }}</small>
      </div>

      <div class="journey-track" aria-label="课程闯关进度">
        <div class="journey-progress-line"></div>
        <div v-for="item in store.lessonJourney.value" :key="item.id" class="journey-node" :class="item.status">
          <span class="journey-node-dot"></span>
          <b>{{ item.label }}</b>
        </div>
      </div>

      <div class="journey-status">
        <div class="journey-stat star-jar-stat">
          <span>星星罐子</span>
          <strong>
            <i class="star-jar-icon" aria-hidden="true">⭐</i>
            {{ store.lessonStarCount.value }}/{{ store.lessonTotalStars.value }}
          </strong>
        </div>
        <div class="journey-stat">
          <span>XP</span>
          <strong>{{ store.lessonXp.value }}/{{ store.lessonTotalXp.value }}</strong>
        </div>
      </div>
    </div>

    <button
      class="nav-step primary journey-side-button journey-side-button-right"
      :disabled="store.navState.value.nextDisabled"
      :style="{ visibility: store.navState.value.showNext ? 'visible' : 'hidden' }"
      @click="store.currentScreen.value === 'result' ? store.goHomeFromResult() : store.nextScreen()"
    >
      <template v-if="store.currentScreen.value === 'result'">
        回首页
        <span v-if="store.resultRewardCollected.value">（{{ store.resultHomeCountdown.value }}S）</span>
      </template>
      <template v-else>下一步</template>
    </button>
  </footer>
</template>
