<script setup>
import { usePookAppStore } from "../../../composables/usePookApp";

const store = usePookAppStore();
</script>

<template>
  <section class="screen" :class="{ active: store.currentScreen.value === 'profile' }" data-screen="profile">
    <div class="profile-layout teacher-team-layout">
      <section class="profile-card teacher-team-card">
        <div class="profile-kicker">{{ store.isSoloMode.value ? "个人冒险档案" : "合作机构课堂" }}</div>
        <div class="teacher-team-head">
          <div class="avatar-orb">{{ store.currentTeam.value.number }}</div>
          <div>
            <p>{{ store.isSoloMode.value ? "当前冒险家" : "当前上课小队" }}</p>
            <h2>{{ store.currentTeam.value.name }}</h2>
            <span>{{ store.isSoloMode.value ? "1 位冒险家" : `${store.currentTeam.value.members} 位小朋友` }} · {{ store.currentTeam.value.teacherNote }}</span>
          </div>
        </div>

        <div v-if="!store.isSoloMode.value" class="team-switch-grid" aria-label="选择本次上课小队">
          <button
            v-for="team in store.teamRecords.value"
            :key="team.id"
            class="team-switch-card"
            :class="{ active: store.activeTeamId.value === team.id }"
            @click="store.selectTeam(team.id)"
          >
            <strong>{{ team.number }}号</strong>
            <span>{{ team.members }}人</span>
            <small>{{ team.lastPerformance }}</small>
          </button>
        </div>

        <div class="profile-actions">
          <button @click="store.navigateTo('home')">{{ store.isSoloMode.value ? "继续个人挑战" : "用当前小队开始上课" }}</button>
          <button @click="store.navigateTo('growth')">{{ store.isSoloMode.value ? "查看个人成长记录" : "查看当前小队成长记录" }}</button>
          <button @click="store.navigateTo('teacher')">课堂辅助设置</button>
        </div>
      </section>

      <section class="device-card teacher-team-overview">
        <h2>{{ store.isSoloMode.value ? "冒险家账户" : "小队账户" }}</h2>
        <div class="team-account-stats">
          <article>
            <strong>{{ store.currentTeam.value.stars }}</strong>
            <span>累计星星</span>
          </article>
          <article>
            <strong>{{ store.currentTeam.value.xp }}</strong>
            <span>累计经验</span>
          </article>
          <article>
            <strong>{{ store.gemBalance.value }}</strong>
            <span>宝石积分</span>
          </article>
          <article>
            <strong>{{ store.collectedLessonCards.value.length }}</strong>
            <span>纪念卡</span>
          </article>
        </div>

        <div class="status-list">
          <span>当前机构：POOK AI 合作课堂</span>
          <span>数据归属：{{ store.currentTeam.value.name }}</span>
          <span>奖励独立：星星 / 经验 / 宝石 / 卡片</span>
          <span>{{ store.isSoloMode.value ? "当前为单人挑战模式" : "进入课程前先选择小队" }}</span>
          <span>{{ store.isSoloMode.value ? "成长中心展示个人数据" : "成长中心按当前小队展示" }}</span>
          <span>{{ store.isSoloMode.value ? "商城兑换消耗个人宝石" : "商城兑换消耗当前小队宝石" }}</span>
        </div>
      </section>
    </div>
  </section>
</template>
