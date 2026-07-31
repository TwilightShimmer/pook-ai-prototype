<script setup>
import { usePookAppStore } from "../../composables/usePookApp";
import PokiCharacter from "./shared/PokiCharacter.vue";

const store = usePookAppStore();
</script>

<template>
  <section v-if="store.pageTransition.visible" class="page-transition-overlay" aria-live="polite">
    <div class="page-transition-card">
      <PokiCharacter class="page-transition-robot" variant="avatar" decorative />
      <strong>{{ store.pageTransition.message }}</strong>
      <div class="page-transition-dots" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </section>
</template>
