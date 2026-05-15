<script setup>
import { computed } from "vue";
import { usePookAppStore } from "../../../composables/usePookApp";

const store = usePookAppStore();
const lesson = computed(() => store.currentLesson.value);
const completionReward = computed(() => store.currentCompletionReward.value);
</script>

<template>
  <section class="screen" :class="{ active: store.currentScreen.value === 'result' }" data-screen="result">
    <div class="result-layout beta-growth-layout">
      <section class="result-card beta-growth-card">
        <div class="badge-top">{{ store.currentTeam.value.name }} · 课后成长卡</div>
        <div class="beta-growth-head">
          <div>
            <p>{{ lesson.theme }}</p>
            <h2>{{ lesson.title }}</h2>
          </div>
          <span class="beta-badge-pill">{{ lesson.badge }}</span>
        </div>

        <div class="beta-growth-photo">
          <i class="choice-visual beta-lesson-visual" :class="lesson.welcomeVisual"></i>
          <strong>作品照片占位</strong>
          <small>这里展示课堂拍摄的作品图</small>
        </div>

        <div class="beta-growth-section">
          <h3>{{ store.currentTeam.value.name }} 完成了</h3>
          <ul>
            <li v-for="item in lesson.currentTasks" :key="item">{{ item }}</li>
          </ul>
        </div>

        <div class="beta-growth-section">
          <h3>本节课点亮能力</h3>
          <div class="beta-tag-row">
            <span v-for="tag in lesson.abilityTags" :key="tag" class="beta-tag">{{ tag }}</span>
          </div>
        </div>

        <div class="agent-hint beta-growth-quote">
          <strong>POOKI 评价</strong>
          <span>{{ lesson.encouragement }}</span>
        </div>

        <div class="beta-growth-section beta-reward-section">
          <h3>这次进入小队账户的奖励</h3>
          <div class="beta-reward-grid">
            <article class="beta-reward-card gem-reward-card">
              <small>宝石奖励</small>
              <strong>+{{ completionReward.gemsAwarded }}</strong>
              <span>自动进入 {{ store.currentTeam.value.name }} 的小队账户</span>
            </article>
            <article class="beta-reward-card card-reward-card">
              <small>纪念卡片</small>
              <strong>{{ completionReward.awardedCard?.title ?? lesson.title }}</strong>
              <span>
                {{ completionReward.isNewCard ? "首次完成，已解锁新纪念卡" : "这张纪念卡已经在当前小队展馆里收藏了" }}
              </span>
            </article>
          </div>
        </div>

        <div class="beta-growth-actions">
          <button class="nav-step ghost" type="button">保存</button>
          <button class="nav-step ghost" type="button">分享</button>
          <button class="cta-button" @click="store.navigateTo('home')">返回首页</button>
        </div>
      </section>
    </div>
  </section>
</template>
