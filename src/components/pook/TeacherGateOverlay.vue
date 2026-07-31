<script setup>
import { usePookAppStore } from "../../composables/usePookApp";
import PokiCharacter from "./shared/PokiCharacter.vue";

const store = usePookAppStore();
</script>

<template>
  <section v-if="store.teacherGate.visible" class="teacher-gate-overlay" aria-live="polite">
    <div class="teacher-gate-card">
      <PokiCharacter class="teacher-gate-robot" variant="avatar" decorative />
      <strong>老师设置验证</strong>
      <p>请老师算一下：</p>
      <div class="teacher-gate-question">{{ store.teacherGate.question }}</div>
      <input
        :value="store.teacherGate.input"
        inputmode="numeric"
        autocomplete="off"
        aria-label="输入计算答案"
        @input="store.setTeacherGateInput($event.target.value)"
        @keydown.enter="store.submitTeacherGate"
      />
      <small v-if="store.teacherGate.error">{{ store.teacherGate.error }}</small>
      <div class="teacher-gate-actions">
        <button class="ghost" @click="store.closeTeacherGate">取消</button>
        <button @click="store.submitTeacherGate">进入</button>
      </div>
    </div>
  </section>
</template>
