<script setup>
import { usePookAppStore } from "../../composables/usePookApp";

const store = usePookAppStore();
</script>

<template>
  <header class="app-chrome">
    <button
      class="round-button"
      :class="{ 'logout-button': store.currentScreen.value === 'home' }"
      :aria-label="store.currentScreen.value === 'home' ? '退出登录' : '返回'"
      @click="store.requestTopBack"
    >
      <span aria-hidden="true">{{ store.currentScreen.value === "home" ? "⏻" : "‹" }}</span>
    </button>
    <div class="title-plaque">
      <span>{{ store.currentScreenMeta.value.title }}</span>
    </div>
    <div class="topbar-actions">
      <div class="poki-status-pill" aria-label="POKI 状态">
        <i aria-hidden="true"></i>
        <span>POKI 在线</span>
      </div>
      <button class="team-wallet" type="button" aria-label="切换当前小队" @click="store.openTeamSwitchGate()">
        <span>{{ store.currentTeam.value.number }}号</span>
        <strong>{{ store.currentTeam.value.name }}</strong>
      </button>
      <div class="gem-wallet" aria-label="当前宝石账户余额">
        <span class="gem-wallet-icon" aria-hidden="true"></span>
        <strong>{{ store.gemBalance.value }}</strong>
      </div>
      <button class="round-button settings-button" type="button" aria-label="设置" @click="store.navigateTo('teacher')">
        <span aria-hidden="true">⚙</span>
      </button>
    </div>
  </header>
</template>
