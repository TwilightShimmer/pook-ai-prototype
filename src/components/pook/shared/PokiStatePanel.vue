<script setup>
import { computed } from "vue";
import PokiCharacter from "./PokiCharacter.vue";

const props = defineProps({
  state: {
    type: String,
    default: "guide",
  },
  message: {
    type: String,
    default: "",
  },
  detail: {
    type: String,
    default: "",
  },
  compact: {
    type: Boolean,
    default: false,
  },
});

const stateMeta = {
  guide: { emoji: "👀", label: "POKI 正在引导" },
  waiting: { emoji: "⏳", label: "POKI 等你完成" },
  observing: { emoji: "📷", label: "POKI 正在看" },
  ready_to_speak: { emoji: "💬", label: "轮到你说了" },
  listening: { emoji: "👂", label: "POKI 正在听" },
  heard: { emoji: "✅", label: "POKI 听清了" },
  thinking: { emoji: "💭", label: "POKI 正在想" },
  speaking: { emoji: "🔊", label: "POKI 正在回应" },
  success: { emoji: "⭐", label: "完成啦" },
  no_speech: { emoji: "👂❓", label: "还没有听到" },
  asr_retry: { emoji: "💬❓", label: "刚才没听清" },
  vision_retry: { emoji: "📷❗", label: "还没有看清" },
  network_error: { emoji: "🔌", label: "连接开小差了" },
  teacher_paused: { emoji: "⏸️", label: "老师暂停了一下" },
};

const meta = computed(() => stateMeta[props.state] ?? stateMeta.guide);
</script>

<template>
  <aside
    class="poki-state-panel"
    :class="[`state-${state}`, { compact }]"
    :aria-label="meta.label"
    aria-live="polite"
  >
    <div class="poki-state-stage">
      <PokiCharacter variant="full" decorative />
      <span class="poki-state-badge" aria-hidden="true">{{ meta.emoji }}</span>
    </div>
    <div class="poki-state-content">
      <span class="poki-state-label">{{ meta.label }}</span>
      <strong v-if="message">{{ message }}</strong>
      <p v-if="detail">{{ detail }}</p>
      <div v-if="$slots.default" class="poki-state-actions">
        <slot />
      </div>
    </div>
  </aside>
</template>

