<script setup>
import { usePookAppStore } from "../../composables/usePookApp";

const store = usePookAppStore();
</script>

<template>
  <section v-if="store.teamSwitchGate.visible" class="teacher-gate-overlay team-gate-overlay" aria-live="polite">
    <div class="teacher-gate-card team-gate-card">
      <span class="teacher-gate-robot" aria-hidden="true">🤖</span>

      <template v-if="store.teamSwitchGate.step === 'challenge'">
        <strong>老师小队验证</strong>
        <p>请老师先算一下，再进入小队管理。</p>
        <div class="teacher-gate-question">{{ store.teamSwitchGate.question }}</div>
        <input
          :value="store.teamSwitchGate.input"
          inputmode="numeric"
          autocomplete="off"
          aria-label="输入计算答案"
          @input="store.setTeamSwitchGateInput($event.target.value)"
          @keydown.enter="store.submitTeamSwitchGate"
        />
        <small v-if="store.teamSwitchGate.error">{{ store.teamSwitchGate.error }}</small>
        <div class="teacher-gate-actions">
          <button class="ghost" @click="store.closeTeamSwitchGate">取消</button>
          <button @click="store.submitTeamSwitchGate">继续</button>
        </div>
      </template>

      <template v-else>
        <strong>切换上课小队</strong>
        <p>选择当前正在上课的小队，后续奖励会进入对应小队账户。</p>
        <div class="team-gate-grid">
          <button
            v-for="team in store.teamRecords.value"
            :key="team.id"
            :class="{ active: store.activeTeamId.value === team.id }"
            @click="store.confirmTeamSwitch(team.id)"
          >
            <b>{{ team.number }}号</b>
            <span>{{ team.name }}</span>
            <small>{{ team.members }}位小朋友</small>
          </button>
        </div>
        <div class="teacher-gate-actions">
          <button class="ghost" @click="store.closeTeamSwitchGate">取消</button>
        </div>
      </template>
    </div>
  </section>
</template>
