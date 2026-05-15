<script setup>
defineProps({
  total: { type: Number, required: true },
  currentIndex: { type: Number, required: true },
});
</script>

<template>
  <div class="micro-progress">
    <span
      v-for="index in total"
      :key="index"
      :class="{
        done: index - 1 < currentIndex,
        active: index - 1 === currentIndex,
      }"
    ></span>
  </div>
</template>
