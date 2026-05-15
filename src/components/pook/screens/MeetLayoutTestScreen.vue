<script setup>
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { meetRoleProfiles } from "../../../data/pookData";
import { usePookAppStore } from "../../../composables/usePookApp";

const store = usePookAppStore();
const stage = ref("scan");
const revealedRoleCount = ref(0);
let stageTimer = 0;
let revealTimer = 0;

const isActive = computed(() => store.currentScreen.value === "meet-test");
const teamMembers = computed(() =>
  meetRoleProfiles.map((role, index) => ({
    number: index + 1,
    role,
  })),
);
const ipPlaceholders = Array.from({ length: 8 }, () => "🤖");
const currentSpeech = computed(() => {
  if (stage.value === "scan") return "POKI 正在认识今天的小队友。";
  if (revealedRoleCount.value === 0) return "我来给大家分配今天的小任务。";
  const member = teamMembers.value[revealedRoleCount.value - 1];
  return `${member.number}号小朋友是${member.role.title}。`;
});

function clearStageTimer() {
  if (stageTimer) {
    clearTimeout(stageTimer);
    stageTimer = 0;
  }
  if (revealTimer) {
    clearTimeout(revealTimer);
    revealTimer = 0;
  }
}

function revealNextRole() {
  if (stage.value !== "result") return;
  if (revealedRoleCount.value >= teamMembers.value.length) return;
  revealTimer = window.setTimeout(() => {
    revealedRoleCount.value += 1;
    revealNextRole();
  }, revealedRoleCount.value === 0 ? 520 : 920);
}

function enterResultStage() {
  clearStageTimer();
  stage.value = "result";
  revealedRoleCount.value = 0;
  revealNextRole();
}

function startDemo() {
  clearStageTimer();
  stage.value = "scan";
  revealedRoleCount.value = 0;
  stageTimer = window.setTimeout(() => {
    enterResultStage();
  }, 2400);
}

function toggleStage() {
  clearStageTimer();
  if (stage.value === "scan") {
    enterResultStage();
    return;
  }
  stage.value = "scan";
  revealedRoleCount.value = 0;
}

watch(
  isActive,
  (active) => {
    if (active) {
      startDemo();
      return;
    }
    clearStageTimer();
    stage.value = "scan";
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  clearStageTimer();
});
</script>

<template>
  <section class="screen" :class="{ active: isActive }" data-screen="meet-test">
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
          </div>

          <div class="meet-test-status">
            <span>{{ stage === "scan" ? "识别中" : "已分工" }}</span>
            <strong>{{ stage === "scan" ? "POKI 正在看今天的小队友" : "今天的小队准备好啦" }}</strong>
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
              :key="`test-role-${member.number}`"
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

        <button class="meet-test-toggle" type="button" @click="toggleStage">
          {{ stage === "scan" ? "查看分工" : "重新识别" }}
        </button>
      </section>
    </div>
  </section>
</template>
