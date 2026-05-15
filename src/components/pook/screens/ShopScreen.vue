<script setup>
import { computed, reactive, ref } from "vue";
import { usePookAppStore } from "../../../composables/usePookApp";
import { shopRewardCatalog } from "../../../data/pookData";

const store = usePookAppStore();
const selectedTab = ref("featured");

const shopPanels = {
  featured: {
    title: "推荐套件",
    cards: [
      { price: "¥899", title: "乐高 Science 科学系列", desc: "适合 5 岁+ · 配套 30+ 节课程", boxClass: "" },
      { price: "¥399", title: "POOK 3D 打印探索套件", desc: "适合 6 岁+ · 机构拓展包", boxClass: "printed" },
    ],
  },
  lego: {
    title: "乐高教育",
    cards: [
      { price: "¥899", title: "Science 科学系列", desc: "动物、环境、工程观察", boxClass: "" },
      { price: "¥1299", title: "SPIKE 科创套装", desc: "编程、机械、机器人启蒙", boxClass: "spike" },
    ],
  },
  pook3d: {
    title: "POOK 3D",
    cards: [
      { price: "¥399", title: "3D 打印探索套件", desc: "结构观察、简单组合、创意模型", boxClass: "printed" },
      { price: "¥699", title: "主题模型拓展包", desc: "补充更多课堂可用模型零件", boxClass: "theme-pack" },
    ],
  },
  supplies: {
    title: "耗材补充",
    cards: [
      { price: "¥59", title: "基础积木补充包", desc: "高频缺失零件一包补齐", boxClass: "supply-block" },
      { price: "¥89", title: "打印耗材补充包", desc: "课堂常用材料统一补货", boxClass: "supply-print" },
    ],
  },
};

const currentShopPanel = computed(() => shopPanels[selectedTab.value] ?? shopPanels.featured);

const rewardItems = computed(() =>
  shopRewardCatalog.map((item) => ({
    ...item,
    redeemed: store.redeemedRewardIds.value.includes(item.id),
    affordable: store.gemBalance.value >= item.cost,
  })),
);

const redeemDialog = reactive({
  show: false,
  item: null,
  answer: "",
  expectedAnswer: 0,
  prompt: "",
});

function buildChallenge() {
  const left = Math.floor(Math.random() * 4) + 6;
  const right = Math.floor(Math.random() * 3) + 2;
  const multiplier = Math.floor(Math.random() * 3) + 3;
  return {
    prompt: `请先完成验证：(${left} + ${right}) × ${multiplier} = ?`,
    expectedAnswer: (left + right) * multiplier,
  };
}

function openRedeemDialog(item) {
  if (item.redeemed) {
    store.showToast("这个小奖励已经兑换过了");
    return;
  }
  if (!item.affordable) {
    store.showToast("宝石积分不够，先去上课收集更多吧");
    return;
  }
  const challenge = buildChallenge();
  redeemDialog.item = item;
  redeemDialog.answer = "";
  redeemDialog.expectedAnswer = challenge.expectedAnswer;
  redeemDialog.prompt = challenge.prompt;
  redeemDialog.show = true;
}

function closeRedeemDialog() {
  redeemDialog.show = false;
  redeemDialog.item = null;
  redeemDialog.answer = "";
  redeemDialog.expectedAnswer = 0;
  redeemDialog.prompt = "";
}

function confirmRedeem() {
  const answer = Number(redeemDialog.answer);
  if (!Number.isFinite(answer) || answer !== redeemDialog.expectedAnswer) {
    store.showToast("二级确认失败，请再验算一次");
    return;
  }
  store.redeemShopReward(redeemDialog.item);
  closeRedeemDialog();
}
</script>

<template>
  <section class="screen" :class="{ active: store.currentScreen.value === 'shop' }" data-screen="shop">
    <div class="selection-layout shop-layout">
      <aside class="filter-rail">
        <h2>套件商城</h2>
        <button class="rail-pill" :class="{ active: selectedTab === 'featured' }" @click="selectedTab = 'featured'">推荐</button>
        <button class="rail-pill" :class="{ active: selectedTab === 'lego' }" @click="selectedTab = 'lego'">乐高教育</button>
        <button class="rail-pill" :class="{ active: selectedTab === 'pook3d' }" @click="selectedTab = 'pook3d'">POOK 3D</button>
        <button class="rail-pill" :class="{ active: selectedTab === 'supplies' }" @click="selectedTab = 'supplies'">耗材补充</button>
        <button class="rail-pill" :class="{ active: selectedTab === 'points' }" @click="selectedTab = 'points'">积分商城</button>
      </aside>

      <section class="shop-showcase">
        <div v-if="selectedTab !== 'points'" class="shop-panel">
          <header class="shop-panel-header">
            <p>{{ currentShopPanel.title }}</p>
          </header>
          <div class="kit-grid">
            <button
              v-for="(card, index) in currentShopPanel.cards"
              :key="`${selectedTab}-${card.title}`"
              class="kit-card"
              :class="{ active: index === 0 }"
            >
              <span>{{ card.price }}</span>
              <div class="kit-box" :class="card.boxClass"></div>
              <strong>{{ card.title }}</strong>
              <small>{{ card.desc }}</small>
            </button>
          </div>
        </div>

        <section v-if="selectedTab === 'points'" class="points-mall">
          <div class="points-mall-header">
            <div>
              <p>积分商城</p>
              <h3>用宝石积分换一点可以带走的小奖励</h3>
            </div>
            <div class="points-wallet">
              <span>当前可用</span>
              <strong>{{ store.gemBalance.value }}</strong>
            </div>
          </div>

          <div class="reward-grid">
            <article
              v-for="item in rewardItems"
              :key="item.id"
              class="reward-card"
              :class="[item.tone, { redeemed: item.redeemed, locked: !item.affordable && !item.redeemed }]"
            >
              <span class="reward-badge">{{ item.badge }}</span>
              <div class="reward-token">{{ item.type }}</div>
              <strong>{{ item.name }}</strong>
              <p>{{ item.note }}</p>
              <div class="reward-meta">
                <small>{{ item.cost }} 积分</small>
                <button
                  :disabled="item.redeemed || !item.affordable"
                  @click="openRedeemDialog(item)"
                >
                  {{ item.redeemed ? "已兑换" : item.affordable ? "立即兑换" : "积分不足" }}
                </button>
              </div>
            </article>
          </div>
        </section>
      </section>
    </div>

    <div class="task-overlay" :class="{ show: redeemDialog.show }">
      <div class="task-modal redeem-modal">
        <span>二级确认</span>
        <h2>{{ redeemDialog.item?.name }}</h2>
        <p>为了防止小朋友误操作，兑换前需要先完成一道复杂算式验证。</p>
        <strong class="redeem-challenge">{{ redeemDialog.prompt }}</strong>
        <input
          v-model="redeemDialog.answer"
          class="redeem-input"
          inputmode="numeric"
          placeholder="请输入答案"
        />
        <div class="redeem-actions">
          <button class="redeem-cancel" @click="closeRedeemDialog">先不换了</button>
          <button class="redeem-confirm" @click="confirmRedeem">确认兑换</button>
        </div>
      </div>
    </div>
  </section>
</template>
