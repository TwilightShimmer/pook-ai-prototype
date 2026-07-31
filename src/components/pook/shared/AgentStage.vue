<script setup>
import PokiStatePanel from "./PokiStatePanel.vue";

defineProps({
  text: { type: String, required: true },
  activeAgent: { type: Boolean, default: false },
  state: { type: String, default: "waiting" },
});
</script>

<template>
  <PokiStatePanel
    class="agent-stage"
    :class="{ 'active-agent': activeAgent }"
    :state="state"
    :message="text"
  >
    <slot name="extra"></slot>
  </PokiStatePanel>
</template>
