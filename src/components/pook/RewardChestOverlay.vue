<script setup>
import { usePookAppStore } from "../../composables/usePookApp";

const store = usePookAppStore();
</script>

<template>
  <div v-if="store.reward.visible" class="reward-chest-overlay show" aria-live="polite">
    <section class="star-reward-card" :class="{ flying: store.reward.flying }">
      <span class="reward-chip">环节完成</span>
      <strong>{{ store.reward.stepLabel }}完成啦</strong>

      <button class="reward-star-button" type="button" @click="store.claimStepReward">
        <span class="reward-star">⭐</span>
        <small>+{{ store.reward.xpAwarded }} XP</small>
      </button>

      <div class="reward-jar-row">
        <div class="reward-star-jar" aria-hidden="true">
          <span>⭐</span>
        </div>
        <div class="reward-counts">
          <span>星星：{{ store.reward.starsCollected }}/{{ store.reward.totalStars }}</span>
          <span>经验：{{ store.reward.xpCollected }}/{{ store.reward.xpTotal }}</span>
        </div>
      </div>

      <p>点一下星星，把它收进星星罐子里。</p>
    </section>
  </div>
</template>
