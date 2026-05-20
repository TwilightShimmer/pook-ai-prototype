<script setup>
import { computed, onBeforeUnmount, ref } from "vue";
import { usePookAppStore } from "../../../composables/usePookApp";

const store = usePookAppStore();

const activeDialog = ref(null);
const micStatus = ref("idle");
const hasVoice = ref(false);
const soundTestDone = ref(false);
const micTestDone = ref(false);

const canConfirmDeviceReady = computed(() => soundTestDone.value && micTestDone.value);
const readyHint = computed(() => {
  if (canConfirmDeviceReady.value) return "两项设备测试已完成";
  if (!soundTestDone.value && !micTestDone.value) return "请先完成声音测试和麦克风测试";
  if (!soundTestDone.value) return "还需要完成声音测试";
  return "还需要完成麦克风测试";
});

let micStream = null;
let audioContext = null;
let analyser = null;
let micAnimationFrame = 0;

function openSoundTest() {
  activeDialog.value = "sound";
  soundTestDone.value = true;
}

function openMicTest() {
  activeDialog.value = "mic";
  micStatus.value = "idle";
  hasVoice.value = false;
  micTestDone.value = true;
}

function confirmDeviceReady() {
  if (!canConfirmDeviceReady.value) return;
  store.navigateTo("home");
}

function closeDialog() {
  activeDialog.value = null;
  stopMicTest();
}

function stopMicTest() {
  window.cancelAnimationFrame(micAnimationFrame);
  micAnimationFrame = 0;
  hasVoice.value = false;
  micStatus.value = activeDialog.value === "mic" ? "idle" : micStatus.value;
  micStream?.getTracks().forEach((track) => track.stop());
  micStream = null;
  audioContext?.close();
  audioContext = null;
  analyser = null;
}

function detectVoice() {
  if (!analyser) return;
  const data = new Uint8Array(analyser.fftSize);
  analyser.getByteTimeDomainData(data);
  const volume = data.reduce((sum, value) => sum + Math.abs(value - 128), 0) / data.length;
  hasVoice.value = volume > 4;
  micAnimationFrame = window.requestAnimationFrame(detectVoice);
}

async function startMicTest() {
  if (micStatus.value === "listening") return;
  try {
    micStatus.value = "requesting";
    micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContextConstructor();
    const source = audioContext.createMediaStreamSource(micStream);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    micStatus.value = "listening";
    detectVoice();
  } catch (error) {
    micStatus.value = "error";
    hasVoice.value = false;
  }
}

onBeforeUnmount(() => {
  stopMicTest();
});
</script>

<template>
  <section class="screen" :class="{ active: store.currentScreen.value === 'teacher' }" data-screen="teacher">
    <div class="teacher-layout compact-settings-layout">
      <section class="teacher-panel settings-device-panel">
        <div class="settings-heading">
          <span aria-hidden="true">⚙</span>
          <div>
            <h2>设备测试</h2>
            <p>上课前确认声音、视频和麦克风可以正常使用。</p>
          </div>
        </div>

        <div class="teacher-grid settings-test-grid">
          <button type="button" :class="{ done: soundTestDone }" @click="openSoundTest">
            <span aria-hidden="true">▶</span>
            <strong>声音测试</strong>
            <small>{{ soundTestDone ? "已点击测试" : "播放一段测试音视频" }}</small>
          </button>
          <button type="button" :class="{ done: micTestDone }" @click="openMicTest">
            <span aria-hidden="true">🎙</span>
            <strong>麦克风测试</strong>
            <small>{{ micTestDone ? "已点击测试" : "长按麦克风检测声音" }}</small>
          </button>
        </div>

        <p class="settings-ready-hint">{{ readyHint }}</p>
        <button
          class="settings-ready-button"
          type="button"
          :disabled="!canConfirmDeviceReady"
          @click="confirmDeviceReady"
        >
          我测试好啦，设备可以正常上课啦~
        </button>
      </section>
    </div>

    <div v-if="activeDialog" class="settings-test-overlay" @click.self="closeDialog">
      <section v-if="activeDialog === 'sound'" class="settings-test-dialog sound-test-dialog" aria-label="声音测试">
        <button class="settings-dialog-close" type="button" aria-label="关闭" @click="closeDialog">×</button>
        <span class="settings-dialog-icon" aria-hidden="true">▶</span>
        <h3>声音测试</h3>
        <p>下面正在播放测试音视频</p>
        <video class="settings-test-video" controls autoplay playsinline>
          <source src="/resources/opening.mp4" type="video/mp4" />
        </video>
      </section>

      <section v-else class="settings-test-dialog mic-test-dialog" aria-label="麦克风测试">
        <button class="settings-dialog-close" type="button" aria-label="关闭" @click="closeDialog">×</button>
        <span class="settings-dialog-icon" aria-hidden="true">🎙</span>
        <h3>麦克风测试</h3>
        <p>长按麦克风测试说话</p>

        <div class="mic-wave" :class="{ active: hasVoice }" aria-hidden="true">
          <span v-for="bar in 9" :key="bar"></span>
        </div>

        <button
          class="mic-hold-button"
          type="button"
          @pointerdown.prevent="startMicTest"
          @pointerup.prevent="stopMicTest"
          @pointerleave.prevent="stopMicTest"
          @pointercancel.prevent="stopMicTest"
        >
          <span aria-hidden="true">🎙</span>
        </button>

        <small v-if="micStatus === 'idle'">按住按钮后开始检测</small>
        <small v-else-if="micStatus === 'requesting'">正在请求麦克风权限...</small>
        <small v-else-if="micStatus === 'listening'">
          {{ hasVoice ? "检测到声音，麦克风正常" : "正在听，请对着麦克风说话" }}
        </small>
        <small v-else>没有拿到麦克风权限，请检查浏览器权限。</small>
      </section>
    </div>
  </section>
</template>
