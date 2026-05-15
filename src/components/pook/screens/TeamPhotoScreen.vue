<script setup>
import { usePookAppStore } from "../../../composables/usePookApp";
import AgentStage from "../shared/AgentStage.vue";
import PanelRibbon from "../shared/PanelRibbon.vue";
import TaskCueCard from "../shared/TaskCueCard.vue";
const store = usePookAppStore();
</script>

<template>
  <section class="screen" :class="{ active: store.currentScreen.value === 'team-photo' }" data-screen="team-photo">
    <div class="classroom-layout">
      <section class="content-panel camera-panel">
        <PanelRibbon title="让 POKI 看一看" />
        <TaskCueCard title="任务开始前" body="请三位小朋友坐在画面里，POKI 会给大家分配号码和角色。" />
        <div class="camera-frame">
          <div class="child-face girl">1</div>
          <div class="child-face curly">2</div>
          <div class="child-face boy">3</div>
          <div class="scan-line"></div>
        </div>
        <div class="recognition-status ok">
          <span></span>
          <strong>拍好啦！三位小朋友都入镜了</strong>
          <small>1 号观察员 · 2 号搭建员 · 3 号讲述员</small>
        </div>
      </section>
      <AgentStage text="请记住自己的号码哦" />
    </div>
  </section>
</template>
