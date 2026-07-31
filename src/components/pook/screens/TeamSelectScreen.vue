<script setup>
import { ref } from "vue";
import { usePookAppStore } from "../../../composables/usePookApp";
import PokiCharacter from "../shared/PokiCharacter.vue";

const store = usePookAppStore();
const entryMode = ref("team");
const soloUsername = ref("root");
const soloPassword = ref("123456");
const soloError = ref("");

function submitSoloLogin() {
  const result = store.selectSoloAndEnterHome(soloUsername.value, soloPassword.value);
  soloError.value = result.ok ? "" : result.message;
}
</script>

<template>
  <section class="screen" :class="{ active: store.currentScreen.value === 'team-select' }" data-screen="team-select">
    <div class="team-entry-session" aria-label="当前登录人">
      <span>{{ store.loginIdentity.value.method === "wechat" ? "微信登录" : "账号登录" }}</span>
      <strong>{{ store.loginIdentity.value.displayName }}</strong>
    </div>

    <div v-if="entryMode === 'team'" class="team-entry-layout">
      <section class="team-entry-hero">
        <PokiCharacter class="team-entry-robot" variant="avatar" decorative />
        <p>{{ store.loginIdentity.value.displayName }}，今天是哪支小队来上课？</p>
        <h1>先选择本次上课小队</h1>
        <small>选好后，星星、经验、宝石和成长卡都会进入对应小队。</small>
      </section>

      <section class="team-entry-grid" aria-label="选择本次上课小队">
        <button
          v-for="team in store.teamRecords.value"
          :key="team.id"
          class="team-entry-card"
          type="button"
          @click="store.selectTeamAndEnterHome(team.id)"
        >
          <span class="team-entry-number">{{ team.number }}</span>
          <strong>{{ team.name }}</strong>
          <small>{{ team.members }} 位小朋友</small>
          <em>{{ team.lastPerformance }}</em>
        </button>
      </section>
    </div>

    <div v-else class="solo-entry-layout">
      <section class="solo-entry-card">
        <PokiCharacter class="solo-entry-poki" variant="avatar" decorative />
        <div class="solo-entry-copy">
          <span class="solo-entry-kicker">SOLO ADVENTURE</span>
          <h1>一个人，也能和 POKI 一起闯关</h1>
          <p>填写冒险家的称呼和你的闯关暗号开始挑战！</p>
        </div>

        <form class="solo-entry-form" @submit.prevent="submitSoloLogin">
          <label>
            <span>冒险家的称呼</span>
            <input v-model="soloUsername" type="text" autocomplete="username" placeholder="例如 root" />
          </label>
          <label>
            <span>闯关暗号</span>
            <input
              v-model="soloPassword"
              type="password"
              autocomplete="current-password"
              placeholder="请输入闯关暗号"
            />
          </label>
          <p v-if="soloError" class="solo-entry-error">{{ soloError }}</p>
          <button type="submit">开始单人挑战</button>
        </form>
        <small class="solo-entry-demo">体验账号：root / 123456　或　admin / 123456</small>
      </section>
    </div>

    <nav class="entry-mode-dock" aria-label="选择闯关模式">
      <span class="entry-mode-glow" :class="`mode-${entryMode}`"></span>
      <button :class="{ active: entryMode === 'team' }" type="button" @click="entryMode = 'team'">
        <b aria-hidden="true">👥</b>
        <span><strong>小队闯关模式</strong><small>一起合作完成挑战</small></span>
      </button>
      <button :class="{ active: entryMode === 'solo' }" type="button" @click="entryMode = 'solo'">
        <b aria-hidden="true">🧭</b>
        <span><strong>单人挑战模式</strong><small>登录个人冒险档案</small></span>
      </button>
    </nav>
  </section>
</template>
