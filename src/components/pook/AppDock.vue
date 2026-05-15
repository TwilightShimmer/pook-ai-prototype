<script setup>
import { dockItems, dockClassScreens } from "../../data/pookData";
import { usePookAppStore } from "../../composables/usePookApp";

const store = usePookAppStore();

function isActive(id) {
  return store.currentScreen.value === id || (id === "course" && dockClassScreens.includes(store.currentScreen.value));
}
</script>

<template>
  <nav class="app-dock" aria-label="App 主导航">
    <button
      v-for="item in dockItems"
      :key="item.id"
      class="dock-item"
      :class="{ active: isActive(item.id) }"
      @click="store.navigateTo(item.id)"
    >
      <span class="dock-emoji" aria-hidden="true">{{ item.emoji }}</span>
      <span class="dock-label">{{ item.label }}</span>
    </button>
  </nav>
</template>
