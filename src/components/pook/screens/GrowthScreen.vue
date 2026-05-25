<script setup>
import { computed, ref } from "vue";
import { scienceThemeLessons, scienceThemes } from "../../../data/pookData";
import { usePookAppStore } from "../../../composables/usePookApp";

const store = usePookAppStore();
const activeBookTab = ref("cards");
const activeThemeKey = ref("life");

const bookTabs = [
  { id: "cards", label: "卡片收集册", short: "卡片", icon: "✦" },
  { id: "records", label: "成长记录册", short: "记录", icon: "★" },
  { id: "overview", label: "小队总览", short: "总览", icon: "◆" },
];

const themeIconMap = {
  life: "◆",
  nature: "✹",
  engineering: "▣",
  humanity: "◇",
};

const activeTheme = computed(
  () => scienceThemes.find((theme) => theme.key === activeThemeKey.value) ?? scienceThemes[0],
);

const collectedCardsByTheme = computed(() => {
  const cards = store.collectedLessonCards.value ?? [];
  return scienceThemes.reduce((result, theme) => {
    result[theme.key] = cards.filter((card) => card.theme === theme.label || card.theme === theme.shortLabel);
    return result;
  }, {});
});

const activeThemeCards = computed(() => {
  const collected = collectedCardsByTheme.value[activeThemeKey.value] ?? [];
  const lessons = scienceThemeLessons[activeThemeKey.value] ?? [];
  return lessons.map((lesson, index) => {
    const owned = collected.find((card) => card.title === lesson.label);
    return {
      id: `${activeThemeKey.value}-${lesson.label}`,
      title: lesson.label,
      level: lesson.level,
      desc: lesson.difficultyText,
      visual: lesson.visual,
      owned: Boolean(owned),
      isFlashCard: Boolean(owned?.isFlashCard),
      earnedAt: owned?.earnedAt ?? "",
      badge: owned?.badge ?? (index === 0 ? "等待解锁" : "未收集"),
    };
  });
});

const growthRecords = computed(() => {
  const cards = store.collectedLessonCards.value ?? [];
  if (cards.length) {
    return cards.map((card, index) => ({
      id: card.id,
      title: card.title,
      theme: card.theme,
      date: card.earnedAt || "刚刚完成",
      image: card.visual || "rhino",
      tags: [card.badge || "完成课程", card.isFlashCard ? "闪卡升级" : "纪念卡"],
      summary: `${store.currentTeam.value.name}完成了这节课，留下了一张课堂成长卡。`,
      stats: [`星星 +${Math.max(1, store.lessonStarCount.value || 1)}`, `经验 +${Math.max(10, store.lessonXp.value || 10)}`],
      featured: index === 0,
    }));
  }
  return [
    {
      id: "empty-record-1",
      title: "等待第一堂课程风采",
      theme: activeTheme.value.label,
      date: "还未开始",
      image: "rhino",
      tags: ["课堂照片", "成长卡", "作品展示"],
      summary: "完成一节课程后，这里会出现本次课堂的成长卡内容。",
      stats: ["星星记录", "经验记录"],
      featured: true,
    },
  ];
});

function setBookTab(tabId) {
  activeBookTab.value = tabId;
}

function setTheme(themeKey) {
  activeThemeKey.value = themeKey;
}
</script>

<template>
  <section class="screen" :class="{ active: store.currentScreen.value === 'growth' }" data-screen="growth">
    <div class="growth-book-shell">
      <aside class="growth-bookmarks" aria-label="成长中心页签">
        <button
          v-for="tab in bookTabs"
          :key="tab.id"
          class="growth-bookmark"
          :class="{ active: activeBookTab === tab.id }"
          type="button"
          @click="setBookTab(tab.id)"
        >
          <span>{{ tab.icon }}</span>
          <strong>{{ tab.short }}</strong>
        </button>
      </aside>

      <section class="growth-book" :class="{ 'content-wide': activeBookTab !== 'overview' }">
        <div class="growth-book-spine" aria-hidden="true"></div>
        <div v-if="activeBookTab === 'overview'" class="growth-book-page left-page">
          <header class="growth-book-cover">
            <p>{{ store.currentTeam.value.name }} · 成长中心</p>
            <h2>小队总览</h2>
            <span>这里集中展示当前小队的星星、经验、宝石和课程完成情况，不再挤占卡片册和记录册的展示空间。</span>
          </header>

          <div class="growth-book-stats">
            <article><strong>{{ store.collectedLessonCards.value.length }}</strong><span>纪念卡</span></article>
            <article><strong>{{ store.currentTeam.value.stars }}</strong><span>星星</span></article>
            <article><strong>{{ store.currentTeam.value.xp }}</strong><span>经验</span></article>
            <article><strong>{{ store.gemBalance.value }}</strong><span>宝石</span></article>
          </div>

          <div class="growth-book-note">
            <b>当前小队</b>
            <span>所有奖励、纪念卡和成长记录都会绑定到当前小队。切换小队后，这里的数据也会一起切换。</span>
          </div>
        </div>

        <div class="growth-book-page right-page">
          <template v-if="activeBookTab === 'cards'">
            <header class="growth-content-title">
              <p>{{ store.currentTeam.value.name }} · 卡片收集册</p>
              <h2>每个主题的纪念卡</h2>
              <span>重复上同一节课不会重复获得同一张卡片。</span>
            </header>

            <div class="growth-theme-switch" aria-label="课程主题切换">
              <button
                v-for="theme in scienceThemes"
                :key="theme.key"
                type="button"
                :class="{ active: activeThemeKey === theme.key }"
                @click="setTheme(theme.key)"
              >
                <span>{{ themeIconMap[theme.key] }}</span>
                <strong>{{ theme.shortLabel }}</strong>
              </button>
            </div>

            <section class="growth-collection-head">
              <p>{{ activeTheme.label }}</p>
              <h3>主题卡片收集</h3>
              <span>{{ activeThemeCards.filter((card) => card.owned).length }} / {{ activeThemeCards.length }}</span>
            </section>

            <div class="growth-card-album">
              <article
                v-for="card in activeThemeCards"
                :key="card.id"
                class="growth-album-card"
                :class="[{ locked: !card.owned, flash: card.isFlashCard }, card.visual]"
              >
                <div class="growth-album-visual">
                  <span v-if="card.owned">✓</span>
                  <span v-else>?</span>
                </div>
                <strong>{{ card.title }}</strong>
                <small>{{ card.owned ? card.badge : card.level }}</small>
                <em>{{ card.owned ? card.earnedAt : "完成课程后解锁" }}</em>
              </article>
            </div>
          </template>

          <template v-else-if="activeBookTab === 'records'">
            <header class="growth-content-title">
              <p>{{ store.currentTeam.value.name }} · 成长记录册</p>
              <h2>每堂课程的风采展示</h2>
              <span>每次完成课程后，成长卡会按当前小队沉淀到这里。</span>
            </header>

            <section class="growth-record-head">
              <p>每堂课程的风采展示</p>
              <h3>{{ store.currentTeam.value.name }} 的课堂成长卡</h3>
              <span>按完成课程的时间沉淀。</span>
            </section>

            <div class="growth-record-list">
              <article
                v-for="record in growthRecords"
                :key="record.id"
                class="growth-record-card"
                :class="{ featured: record.featured }"
              >
                <div class="growth-record-photo" :class="record.image">
                  <span>{{ record.featured ? "今日" : "记录" }}</span>
                </div>
                <div class="growth-record-copy">
                  <p>{{ record.date }} · {{ record.theme }}</p>
                  <h4>{{ record.title }}</h4>
                  <strong>{{ record.summary }}</strong>
                  <div class="growth-record-tags">
                    <span v-for="tag in record.tags" :key="tag">{{ tag }}</span>
                  </div>
                  <div class="growth-record-stats">
                    <b v-for="stat in record.stats" :key="stat">{{ stat }}</b>
                  </div>
                </div>
              </article>
            </div>
          </template>

          <template v-else>
            <header class="growth-content-title">
              <p>{{ store.currentTeam.value.name }} · 小队总览</p>
              <h2>这支小队的成长资产</h2>
              <span>总览页只负责看数据，不再挤占卡片和成长记录的展示空间。</span>
            </header>

            <div class="growth-overview-panel">
              <article>
                <span>最近表现</span>
                <strong>{{ store.currentTeam.value.lastPerformance }}</strong>
              </article>
              <article>
                <span>完成课程</span>
                <strong>{{ store.currentTeam.value.completedLessons }} 节</strong>
              </article>
              <article>
                <span>上次课程奖励</span>
                <strong>+{{ store.currentCompletionReward.value.gemsAwarded || 0 }} 宝石</strong>
              </article>
              <article>
                <span>当前收藏</span>
                <strong>{{ store.collectedLessonCards.value.length }} 张纪念卡</strong>
              </article>
            </div>
          </template>
        </div>
      </section>
    </div>
  </section>
</template>
