<script setup>
import { usePookAppStore } from "../../../composables/usePookApp";
import AgentStage from "../shared/AgentStage.vue";
import PanelRibbon from "../shared/PanelRibbon.vue";
const store = usePookAppStore();
</script>

<template>
  <section class="screen" :class="{ active: store.currentScreen.value === 'story' }" data-screen="story">
    <div class="classroom-layout">
      <section class="content-panel story-panel">
        <PanelRibbon title="绘本动画" />
        <div class="storybook-scene">
          <div class="ice-house"></div>
          <div class="penguin"></div>
          <div class="warm-house"></div>
        </div>
        <div class="agent-state-bar">
          <span></span>
          <strong>POKI 正在讲故事</strong>
          <small>课程节点：lesson_import · 播放 AIGC 绘本动画</small>
        </div>
      </section>
      <AgentStage text="请每位小朋友找一个你看到的线索" />
    </div>
  </section>
</template>
