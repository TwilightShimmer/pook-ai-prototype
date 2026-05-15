<script setup>
import { usePookAppStore } from "../../composables/usePookApp";

const store = usePookAppStore();
</script>

<template>
  <section v-if="store.pageTransition.visible" class="page-transition-overlay" aria-live="polite">
    <div class="page-transition-card">
      <span class="page-transition-robot" aria-hidden="true">🤖</span>
      <strong>{{ store.pageTransition.message }}</strong>
      <div class="page-transition-dots" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </section>
</template>
