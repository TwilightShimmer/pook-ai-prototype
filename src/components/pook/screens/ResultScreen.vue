<script setup>
import { computed, onUnmounted, ref, watch } from "vue";
import { usePookAppStore } from "../../../composables/usePookApp";

const store = usePookAppStore();
const lesson = computed(() => store.currentLesson.value);
const completionReward = computed(() => store.currentCompletionReward.value);
const rewardPopup = ref("none");
const gemFlying = ref(false);
const homeCountdown = ref(15);
const rewardCollected = ref(false);

let gemTimer = 0;
let homeCountdownTimer = 0;

function stopHomeCountdown() {
  window.clearInterval(homeCountdownTimer);
  homeCountdownTimer = 0;
}

function goHome() {
  stopHomeCountdown();
  store.navigateTo("home");
}

function startHomeCountdown() {
  stopHomeCountdown();
  rewardCollected.value = true;
  homeCountdown.value = 15;

  homeCountdownTimer = window.setInterval(() => {
    homeCountdown.value -= 1;
    if (homeCountdown.value <= 0) {
      goHome();
    }
  }, 1000);
}

watch(
  () => store.currentScreen.value,
  (screenId) => {
    window.clearTimeout(gemTimer);
    stopHomeCountdown();
    gemFlying.value = false;
    rewardCollected.value = false;
    homeCountdown.value = 15;
    rewardPopup.value = screenId === "result" ? "card" : "none";
  },
  { immediate: true },
);

onUnmounted(() => {
  window.clearTimeout(gemTimer);
  stopHomeCountdown();
});

const resultTasks = computed(() => ["看", "找", "搭", "说"]);

const abilityBadges = computed(() =>
  lesson.value.abilityTags.map((tag, index) => ({
    tag,
    icon: ["👀", "✋", "🤝", "🎤", "⭐"][index % 5],
  })),
);

const rewardCards = computed(() => [
  {
    key: "stars",
    label: "星星",
    value: `${completionReward.value.starsAwarded}/${completionReward.value.totalStars}`,
    desc: "每关完成奖励",
    icon: "⭐",
  },
  {
    key: "xp",
    label: "经验",
    value: `+${completionReward.value.xpAwarded}`,
    desc: `最高 ${completionReward.value.totalXp} XP`,
    icon: "XP",
  },
  {
    key: "gems",
    label: "宝石",
    value: `+${completionReward.value.gemsAwarded}`,
    desc: `进入 ${store.currentTeam.value.name}`,
    icon: "◆",
  },
]);

const cardStateText = computed(() => {
  if (completionReward.value.isNewCard) return "解锁新卡";
  return "已收藏";
});

const flashStateText = computed(() => {
  if (completionReward.value.isFlashCard) return "闪卡已点亮";
  return "继续挑战闪卡";
});

function showGemReward() {
  rewardPopup.value = "gem";
  gemFlying.value = false;
}

function openGemChest() {
  if (gemFlying.value) return;
  gemFlying.value = true;
  gemTimer = window.setTimeout(() => {
    rewardPopup.value = "none";
    gemFlying.value = false;
    startHomeCountdown();
  }, 1500);
}
</script>

<template>
  <section class="screen" :class="{ active: store.currentScreen.value === 'result' }" data-screen="result">
    <div class="result-layout growth-card-layout">
      <section class="result-card growth-card-main compact-growth-card">
        <div class="badge-top">{{ store.currentTeam.value.name }} · 成长卡</div>

        <header class="growth-card-header">
          <div>
            <p>{{ lesson.theme }} · {{ lesson.badge }}</p>
            <h2>{{ lesson.title }}</h2>
            <span>奖励已进入 {{ store.currentTeam.value.name }}</span>
          </div>
          <div class="growth-card-team-badge">
            <b>{{ store.currentTeam.value.number }}</b>
            <small>{{ store.currentTeam.value.name }}</small>
          </div>
        </header>

        <section class="growth-card-body">
          <div class="growth-card-photo-panel">
            <div class="growth-card-photo">
              <i class="choice-visual beta-lesson-visual" :class="lesson.welcomeVisual"></i>
              <strong>作品照片</strong>
            </div>
            <div class="growth-card-poki">
              <span aria-hidden="true">🤖</span>
              <p>{{ lesson.encouragement }}</p>
            </div>
          </div>

          <div class="growth-card-info-panel">
            <section class="growth-card-section compact-finish-section">
              <h3>今天完成啦</h3>
              <div class="growth-task-list task-icon-row">
                <span v-for="item in resultTasks" :key="item">{{ item }}</span>
              </div>
            </section>

            <section class="growth-card-section compact-badge-section">
              <h3>解锁徽章</h3>
              <div class="growth-badge-row">
                <article v-for="badge in abilityBadges" :key="badge.tag">
                  <b>{{ badge.icon }}</b>
                  <span>{{ badge.tag }}</span>
                </article>
              </div>
            </section>

            <section class="growth-card-section compact-reward-section">
              <h3>本节奖励</h3>
              <div class="growth-reward-row">
                <article v-for="item in rewardCards" :key="item.key" class="growth-reward-tile">
                  <b>{{ item.icon }}</b>
                  <small>{{ item.label }}</small>
                  <strong>{{ item.value }}</strong>
                  <span>{{ item.desc }}</span>
                </article>
              </div>
            </section>
          </div>
        </section>

        <footer class="growth-card-actions">
          <button class="cta-button" type="button" @click="goHome">
            回首页
            <span v-if="rewardCollected">（{{ homeCountdown }}S）</span>
          </button>
        </footer>
      </section>

      <aside class="growth-card-reward-panel compact-card-panel">
        <span class="reward-panel-chip">纪念卡</span>
        <div class="lesson-collection-card" :class="{ flash: completionReward.isFlashCard }">
          <div class="lesson-card-shine" aria-hidden="true"></div>
          <div class="child-highlight-shot" :class="completionReward.awardedCard?.visual || lesson.welcomeVisual"></div>
          <strong>{{ completionReward.awardedCard?.title ?? lesson.title }}</strong>
          <small>{{ completionReward.awardedCard?.theme ?? lesson.theme }}</small>
        </div>

        <div class="card-status-list">
          <article :class="{ active: completionReward.isNewCard }">
            <b>{{ completionReward.isNewCard ? "新" : "收" }}</b>
            <span>{{ cardStateText }}</span>
          </article>
          <article :class="{ active: completionReward.isFlashCard }">
            <b>闪</b>
            <span>{{ flashStateText }}</span>
          </article>
          <article>
            <b>{{ store.collectedLessonCards.value.length }}</b>
            <span>已收集</span>
          </article>
        </div>
      </aside>

      <div
        v-if="rewardPopup !== 'none'"
        class="completion-reward-overlay"
        :class="`stage-${rewardPopup}`"
        aria-live="polite"
      >
        <section v-if="rewardPopup === 'card'" class="completion-card-dialog">
          <span class="reward-panel-chip">纪念卡奖励</span>
          <div class="lesson-collection-card reward-popup-card" :class="{ flash: completionReward.isFlashCard }">
            <div class="lesson-card-shine" aria-hidden="true"></div>
            <div class="child-highlight-shot" :class="completionReward.awardedCard?.visual || lesson.welcomeVisual"></div>
            <strong>{{ completionReward.awardedCard?.title ?? lesson.title }}</strong>
            <small>{{ cardStateText }}</small>
          </div>
          <button class="cta-button completion-reward-button" type="button" @click="showGemReward">
            继续领取宝石
          </button>
        </section>

        <section v-else class="completion-card-dialog gem-chest-dialog" :class="{ opened: gemFlying }">
          <span class="reward-panel-chip">积分奖励</span>
          <strong>+{{ completionReward.gemsAwarded }} 宝石</strong>
          <p>点宝箱收进账户</p>

          <button class="completion-chest-button" type="button" @click="openGemChest">
            <span class="completion-chest-icon" aria-hidden="true">
              <i></i>
              <b></b>
            </span>
          </button>

          <div class="completion-gem-flight" :class="{ flying: gemFlying }" aria-hidden="true">
            <span v-for="index in 9" :key="index">◆</span>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>
