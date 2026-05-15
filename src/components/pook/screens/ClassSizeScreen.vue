<script setup>
import { strategyCopy } from "../../../data/pookData";
import { usePookAppStore } from "../../../composables/usePookApp";

const sizeLabels = {
  1: "陪伴探索",
  2: "轮流合作",
  3: "小组推理",
  4: "角色协作",
};

const store = usePookAppStore();
</script>

<template>
  <section class="screen" :class="{ active: store.currentScreen.value === 'class-size' }" data-screen="class-size">
    <div class="class-size-layout">
      <section class="class-size-panel">
        <p>今天有几位小朋友一起上课？</p>
        <div class="size-options" role="group" aria-label="选择人数">
          <button
            v-for="(item, size) in strategyCopy"
            :key="size"
            class="size-option"
            :class="{ active: store.classSize.value === Number(size) }"
            @click="store.selectClassSize(size)"
          >
            {{ size }}
            <span>{{ sizeLabels[size] }}</span>
          </button>
        </div>
        <div class="strategy-card">
          <strong>{{ store.strategy.value.title }}</strong>
          <p>{{ store.strategy.value.text }}</p>
          <div>
            <span v-for="role in store.strategy.value.roles" :key="role">{{ role }}</span>
          </div>
        </div>
        <button class="cta-button" @click="store.navigateTo('team-photo')">确认人数</button>
      </section>
      <aside class="agent-stage">
        <div class="voice-badge"></div>
        <div class="agent-mini"></div>
        <p>我会根据人数调整问题和分工</p>
      </aside>
    </div>
  </section>
</template>
