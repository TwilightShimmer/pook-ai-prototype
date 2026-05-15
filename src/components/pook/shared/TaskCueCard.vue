<script setup>
defineProps({
  title: { type: String, required: true },
  body: { type: String, required: true },
  extraClass: { type: String, default: "" },
});
</script>

<template>
  <div class="task-cue-card" :class="extraClass">
    <strong>{{ title }}</strong>
    <span>{{ body }}</span>
  </div>
</template>
