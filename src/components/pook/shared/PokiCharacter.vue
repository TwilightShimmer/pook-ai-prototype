<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "avatar",
  },
  alt: {
    type: String,
    default: "POKI AI老师",
  },
  decorative: {
    type: Boolean,
    default: false,
  },
});

const sources = {
  avatar: "/assets/poki-avatar-v231.png",
  square: "/assets/poki-character-square-v231.png",
  full: "/assets/poki-character-full-v231.png",
};

const source = computed(() => sources[props.variant] ?? sources.avatar);
</script>

<template>
  <span class="poki-character" :class="`poki-character-${variant}`">
    <img
      :src="source"
      :alt="decorative ? '' : alt"
      :aria-hidden="decorative ? 'true' : undefined"
    />
  </span>
</template>

