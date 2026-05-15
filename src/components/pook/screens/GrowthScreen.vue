<script setup>
import { usePookAppStore } from "../../../composables/usePookApp";

const store = usePookAppStore();
</script>

<template>
  <section class="screen" :class="{ active: store.currentScreen.value === 'growth' }" data-screen="growth">
    <div class="growth-layout">
      <section class="growth-hero">
        <p>{{ store.currentTeam.value.name }} · 成长中心</p>
        <h2>只展示当前小队的课程记录、纪念卡和奖励账户</h2>

        <div class="team-inline-switch">
          <button
            v-for="team in store.teamRecords.value"
            :key="team.id"
            :class="{ active: store.activeTeamId.value === team.id }"
            @click="store.openTeamSwitchGate()"
          >
            {{ team.number }}号
          </button>
        </div>

        <div class="growth-stats">
          <article><strong>{{ store.collectedLessonCards.value.length }}</strong><span>已收集纪念卡</span></article>
          <article><strong>{{ store.currentTeam.value.stars }}</strong><span>累计星星</span></article>
          <article><strong>{{ store.currentTeam.value.xp }}</strong><span>累计经验</span></article>
        </div>
        <div class="growth-stats">
          <article><strong>{{ store.gemBalance.value }}</strong><span>当前宝石积分</span></article>
          <article><strong>{{ store.currentTeam.value.completedLessons }}</strong><span>完成课程</span></article>
          <article><strong>{{ store.currentCompletionReward.value.gemsAwarded }}</strong><span>上次课程奖励</span></article>
        </div>

        <div class="team-result-card">
          <div class="portfolio-art animal"></div>
          <strong>数字展馆：{{ store.currentTeam.value.name }} 的纪念卡</strong>
          <span>完成课程后，卡片只归属当前小队。重复上同一节课不会重复发卡，但仍可继续获得宝石积分。</span>
        </div>
      </section>
      <section class="highlight-grid">
        <article v-for="card in store.collectedLessonCards.value" :key="card.id">
          <div class="child-highlight-shot" :class="card.visual || 'one'"></div>
          <strong>{{ card.title }}</strong>
          <span>{{ card.theme }} · {{ card.badge }} · {{ card.earnedAt }}</span>
        </article>
        <article v-if="store.collectedLessonCards.value.length === 0">
          <div class="child-highlight-shot one"></div>
          <strong>{{ store.currentTeam.value.name }} 还没有纪念卡</strong>
          <span>先用这个小队完成一节课程，成长中心里就会出现第一张课程纪念卡。</span>
        </article>
      </section>
    </div>
  </section>
</template>
