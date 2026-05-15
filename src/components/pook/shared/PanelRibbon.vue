<script setup>
defineProps({
  title: { type: String, required: true },
});
</script>

<template>
  <div class="panel-ribbon">{{ title }}</div>
</template>
