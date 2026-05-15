<script setup>
defineProps({
  text: { type: String, required: true },
  activeAgent: { type: Boolean, default: false },
});
</script>

<template>
  <aside class="agent-stage" :class="{ 'active-agent': activeAgent }">
    <div class="voice-badge"></div>
    <div class="agent-mini"></div>
    <slot name="extra"></slot>
    <p v-if="text">{{ text }}</p>
  </aside>
</template>
