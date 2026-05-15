<script setup>
defineProps({
  feedback: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="micro-feedback" :class="{ show: feedback.show, [feedback.type]: feedback.show }" aria-live="polite">
    {{ feedback.message }}
  </div>
</template>
