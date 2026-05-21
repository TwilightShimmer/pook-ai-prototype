<script setup>
import { usePookAppStore } from "../../../composables/usePookApp";

const store = usePookAppStore();
</script>

<template>
  <section class="screen" :class="{ active: store.currentScreen.value === 'team-select' }" data-screen="team-select">
    <div class="team-entry-layout">
      <section class="team-entry-hero">
        <span class="team-entry-robot" aria-hidden="true">🤖</span>
        <p>老师好，今天是哪支小队来上课？</p>
        <h1>先选择本次上课小队</h1>
        <small>选好后，星星、经验、宝石和成长卡都会进入对应小队。</small>
      </section>

      <section class="team-entry-grid" aria-label="选择本次上课小队">
        <button
          v-for="team in store.teamRecords.value"
          :key="team.id"
          class="team-entry-card"
          type="button"
          @click="store.selectTeamAndEnterHome(team.id)"
        >
          <span class="team-entry-number">{{ team.number }}</span>
          <strong>{{ team.name }}</strong>
          <small>{{ team.members }} 位小朋友</small>
          <em>{{ team.lastPerformance }}</em>
        </button>
      </section>
    </div>
  </section>
</template>
