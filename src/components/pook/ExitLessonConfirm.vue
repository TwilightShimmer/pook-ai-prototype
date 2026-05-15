<script setup>
import { usePookAppStore } from "../../composables/usePookApp";

const store = usePookAppStore();
</script>

<template>
  <section v-if="store.exitLessonConfirm.value" class="exit-lesson-overlay" aria-live="polite">
    <div class="exit-lesson-card">
      <span aria-hidden="true">🤖</span>
      <strong>要退出这节课吗？</strong>
      <p>退出后会回到首页，当前课堂流程会暂停。</p>
      <div>
        <button class="ghost" @click="store.cancelExitLesson">继续上课</button>
        <button @click="store.confirmExitLesson">退出课程</button>
      </div>
    </div>
  </section>
</template>
