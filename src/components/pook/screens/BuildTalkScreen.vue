<script setup>
import { usePookAppStore } from "../../../composables/usePookApp";
import AgentStage from "../shared/AgentStage.vue";
import PanelRibbon from "../shared/PanelRibbon.vue";
const store = usePookAppStore();
</script>

<template>
  <section class="screen" :class="{ active: store.currentScreen.value === 'build-talk' }" data-screen="build-talk">
    <div class="classroom-layout">
      <section class="content-panel question-panel">
        <PanelRibbon title="拼搭问答" />
        <div class="agent-state-bar listening">
          <span></span>
          <strong>POKI 正在围绕模型提问</strong>
          <small>问答反馈工作流 · 拼搭节点观察问题</small>
        </div>
        <h2>你们搭好的房间里，哪一部分最适合企鹅住？为什么？</h2>
        <div class="turn-row">
          <span class="student-token active">1 号说结构</span>
          <span class="student-token">2 号说原因</span>
          <span class="student-token">3 号补充改进</span>
        </div>
        <div class="agent-hint">
          <strong>POKI 提示</strong>
          <span>可以从温度、入口、空间大小和安全性这几个方向观察。</span>
        </div>
      </section>
      <AgentStage text="每位小朋友都说一个不同发现" />
    </div>
  </section>
</template>
