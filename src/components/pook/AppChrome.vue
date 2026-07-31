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
      <button
        class="team-wallet identity-wallet"
        :class="{ solo: store.isSoloMode.value }"
        type="button"
        :aria-label="store.isSoloMode.value ? '当前登录冒险家' : '当前登录人和上课小队'"
        @click="!store.isSoloMode.value && store.openTeamSwitchGate()"
      >
        <span class="identity-avatar">{{ store.currentViewer.value.avatar }}</span>
        <span class="identity-copy">
          <small>{{ store.currentViewer.value.context }}</small>
          <strong>{{ store.currentViewer.value.name }}</strong>
        </span>
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
