<script setup>
import { usePookAppStore } from "../../composables/usePookApp";

const store = usePookAppStore();
</script>

<template>
  <div class="lesson-toast" :class="{ show: store.toast.visible }" aria-live="polite">
    {{ store.toast.message }}
  </div>
</template>
