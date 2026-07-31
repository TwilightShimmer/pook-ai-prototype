<script setup>
import { computed } from "vue";
import { strategyCopy } from "../../../data/pookData";
import { usePookAppStore } from "../../../composables/usePookApp";
import PokiCharacter from "../shared/PokiCharacter.vue";

const sizeLabels = {
  1: "POKI 陪我闯关",
  2: "两人轮流合作",
  3: "三人一起发现",
  4: "四人小队出发",
};

const store = usePookAppStore();

const sizeCards = computed(() =>
  Object.keys(strategyCopy).map((size) => ({
    size: Number(size),
    label: sizeLabels[size],
    children: Array.from({ length: Number(size) }),
  })),
);
</script>

<template>
  <section class="screen" :class="{ active: store.currentScreen.value === 'class-size' }" data-screen="class-size">
    <div class="class-size-layout class-size-page">
      <section class="class-size-panel class-size-main-panel">
        <div class="class-size-kicker">
          <PokiCharacter variant="avatar" decorative />
          POKI 要认识今天的小队
        </div>
        <h2>今天有几位小朋友来闯关呢？</h2>
        <p>点一下今天到场的人数，POKI 会按人数安排角色和合作任务。</p>

        <div class="size-options class-size-card-grid" role="group" aria-label="选择今天上课的小朋友人数">
          <button
            v-for="card in sizeCards"
            :key="card.size"
            class="size-option"
            :class="{ active: store.classSize.value === card.size }"
            @click="store.selectClassSize(card.size)"
          >
            <strong>{{ card.size }}</strong>
            <span>位小朋友</span>
            <div class="size-child-row" aria-hidden="true">
              <i v-for="(_, index) in card.children" :key="index">🧒</i>
            </div>
            <small>{{ card.label }}</small>
          </button>
        </div>

        <button class="cta-button class-size-confirm" @click="store.navigateTo('meet')">开始闯关</button>
      </section>

      <aside class="class-size-side-panel">
        <PokiCharacter class="class-size-poki" variant="square" decorative />
        <div class="class-size-strategy-copy">
          <strong>{{ store.strategy.value.title }}</strong>
          <p>{{ store.strategy.value.text }}</p>
          <div class="class-size-role-list">
            <span v-for="role in store.strategy.value.roles" :key="role">{{ role }}</span>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>
