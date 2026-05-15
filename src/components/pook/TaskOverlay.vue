<script setup>
import { usePookAppStore } from "../../composables/usePookApp";

const store = usePookAppStore();
</script>

<template>
  <section v-if="store.taskCue.show" class="task-overlay show" aria-live="polite" @click.self="store.closeTaskCue">
    <div class="task-modal">
      <span>{{ store.taskCue.type }}</span>
      <h2>{{ store.taskCue.title }}</h2>
      <p>{{ store.taskCue.body }}</p>
      <button @click="store.closeTaskCue">我知道啦</button>
    </div>
  </section>
</template>
