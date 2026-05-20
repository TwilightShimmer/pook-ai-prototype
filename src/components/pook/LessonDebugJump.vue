<script setup>
import { ref } from "vue";
import { usePookAppStore } from "../../composables/usePookApp";

const store = usePookAppStore();
const open = ref(false);

function jumpTo(screenId) {
  store.debugJumpToLessonStep(screenId);
  open.value = false;
}
</script>

<template>
  <aside
    class="lesson-debug-jump"
    :class="{ open }"
    :style="{
      visibility: store.navState.value.show ? 'visible' : 'hidden',
      opacity: store.navState.value.show ? '1' : '0',
      pointerEvents: store.navState.value.show ? 'auto' : 'none',
    }"
  >
    <button class="lesson-debug-toggle" type="button" @click="open = !open">
      <span aria-hidden="true">⚡</span>
      <strong>调试直达</strong>
    </button>

    <div v-if="open" class="lesson-debug-panel">
      <button
        v-for="item in store.lessonDebugSteps.value"
        :key="item.id"
        type="button"
        :class="{ active: store.currentScreen.value === item.id }"
        @click="jumpTo(item.id)"
      >
        <span>{{ item.index }}</span>
        <strong>{{ item.label }}</strong>
      </button>
    </div>
  </aside>
</template>
