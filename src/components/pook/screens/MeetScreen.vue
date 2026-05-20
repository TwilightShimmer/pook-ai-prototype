<script setup>
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { meetRoleProfiles } from "../../../data/pookData";
import { usePookAppStore } from "../../../composables/usePookApp";

const store = usePookAppStore();
const stage = ref("greet");
const revealedRoleCount = ref(0);
const meetTiming = {
  greetToScan: 8000,
  scanToResult: 5000,
  roleReveal: 5000,
  autoAdvance: 5000,
};
let stageTimer = 0;
let revealTimer = 0;
let advanceTimer = 0;

const isActive = computed(() => store.currentScreen.value === "meet");
const teamCount = computed(() => Math.max(1, Math.min(4, Number(store.classSize.value) || 1)));
const teamMembers = computed(() =>
  Array.from({ length: teamCount.value }, (_, index) => ({
    number: index + 1,
    role: meetRoleProfiles[index] ?? meetRoleProfiles[0],
  })),
);
const ipPlaceholders = Array.from({ length: 8 }, () => "🤖");
const currentSpeech = computed(() => {
  if (stage.value === "greet") return `${store.currentTeam.value.name}，POKI 好想你们呀！`;
  if (stage.value === "scan") return "POKI 正在认识今天的小队友。";
  if (revealedRoleCount.value === 0) return "我来给大家分配今天的小任务。";
  const member = teamMembers.value[revealedRoleCount.value - 1];
  return `${member.number}号小朋友是${member.role.title}。`;
});
const greetingCopy = computed(() => {
  const performance = store.currentTeam.value.lastPerformance || "上次你们表现得很认真";
  return {
    title: `${store.currentTeam.value.name}回来啦！`,
    body: `POKI 好开心又见到你们。${performance}。今天也一起加油吧！`,
    action: "先让 POKI 看看今天是哪几位小朋友来了。",
  };
});

function clearTimers() {
  if (stageTimer) {
    clearTimeout(stageTimer);
    stageTimer = 0;
  }
  if (revealTimer) {
    clearTimeout(revealTimer);
    revealTimer = 0;
  }
  if (advanceTimer) {
    clearTimeout(advanceTimer);
    advanceTimer = 0;
  }
}

function scheduleAutoAdvance() {
  advanceTimer = window.setTimeout(() => {
    if (store.currentScreen.value === "meet") {
      store.navigateTo("goals");
    }
  }, meetTiming.autoAdvance);
}

function revealNextRole() {
  if (stage.value !== "result") return;
  if (revealedRoleCount.value >= teamMembers.value.length) {
    scheduleAutoAdvance();
    return;
  }
  revealTimer = window.setTimeout(() => {
    revealedRoleCount.value += 1;
    revealNextRole();
  }, meetTiming.roleReveal);
}

function enterResultStage() {
  clearTimers();
  stage.value = "result";
  revealedRoleCount.value = 0;
  revealNextRole();
}

function startSequence() {
  clearTimers();
  stage.value = "greet";
  revealedRoleCount.value = 0;
  stageTimer = window.setTimeout(() => {
    stage.value = "scan";
    stageTimer = window.setTimeout(() => {
      enterResultStage();
    }, meetTiming.scanToResult);
  }, meetTiming.greetToScan);
}

watch(
  isActive,
  (active) => {
    if (active) {
      startSequence();
      return;
    }
    clearTimers();
    stage.value = "greet";
    revealedRoleCount.value = 0;
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  clearTimers();
});
</script>

<template>
  <section class="screen" :class="{ active: isActive }" data-screen="meet">
    <div class="meet-test-shell" :class="`stage-${stage}`">
      <section class="meet-test-main-card">
        <div class="meet-test-video-layer">
          <div class="meet-test-camera-bar">
            <span></span>
            <span></span>
            <span></span>
            <strong>POKI Camera</strong>
          </div>

          <div class="meet-test-video-body">
            <img class="meet-test-classroom-photo" src="/resources/1.jpeg" alt="课堂画面占位" />
            <div v-if="stage === 'scan'" class="meet-test-scan-line"></div>
            <div v-if="stage === 'greet'" class="meet-greeting-overlay" aria-live="polite">
              <span aria-hidden="true">🤖</span>
              <div>
                <strong>{{ greetingCopy.title }}</strong>
                <p>{{ greetingCopy.body }}</p>
                <small>{{ greetingCopy.action }}</small>
              </div>
            </div>
          </div>

          <div class="meet-test-status">
            <span>{{ stage === "greet" ? "欢迎回来" : stage === "scan" ? "识别中" : "已分工" }}</span>
            <strong>
              {{
                stage === "greet"
                  ? "POKI 正在和小队打招呼"
                  : stage === "scan"
                    ? "POKI 正在看今天的小队友"
                    : "今天的小队准备好啦"
              }}
            </strong>
          </div>
        </div>

        <div class="meet-test-number-row" aria-label="识别到的小朋友编号">
          <span v-for="member in teamMembers" :key="`number-${member.number}`">{{ member.number }}</span>
        </div>

        <aside class="meet-test-role-panel" aria-label="识别结果与角色分工">
          <div class="meet-test-ip-grid" aria-label="POKI IP 形象占位">
            <span
              v-for="(emoji, index) in ipPlaceholders"
              :key="`robot-${index}`"
              :class="{ speaking: index === 0 }"
              aria-hidden="true"
            >
              {{ emoji }}
            </span>
          </div>

          <div class="meet-test-speech-bubble" aria-live="polite">
            {{ currentSpeech }}
          </div>

          <div class="meet-test-role-list">
            <article
              v-for="(member, index) in teamMembers"
              :key="`role-${member.number}`"
              :class="`tone-${member.role.color}`"
              v-show="index < revealedRoleCount"
            >
              <b>{{ member.number }}号</b>
              <div>
                <strong>{{ member.role.title }}</strong>
                <span>{{ member.role.note }}</span>
              </div>
            </article>
          </div>
        </aside>
      </section>
    </div>
  </section>
</template>
