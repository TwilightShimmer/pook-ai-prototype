<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const emit = defineEmits(["enter-app"]);

const activePanel = ref("choice");
const currentStage = ref("opening");
const toastVisible = ref(false);
const toastMessage = ref("");
const loginPending = ref(false);
const videoRef = ref(null);

let loginTimer = 0;

function setPanel(panel) {
  activePanel.value = panel;
}

function showToast(message) {
  toastMessage.value = message;
  toastVisible.value = true;
}

function hideToast() {
  toastVisible.value = false;
}

function revealLogin() {
  if (currentStage.value !== "opening") return;
  currentStage.value = "login";
  activePanel.value = "choice";
}

function clearLoginTimer() {
  if (loginTimer) {
    window.clearTimeout(loginTimer);
    loginTimer = 0;
  }
}

function submitAccountLogin() {
  if (loginPending.value) return;
  loginPending.value = true;
  showToast("登录成功，正在进入首页……");
  clearLoginTimer();
  loginTimer = window.setTimeout(() => {
    hideToast();
    loginPending.value = false;
    emit("enter-app");
  }, 2000);
}

function skipOpening() {
  videoRef.value?.pause();
  revealLogin();
}

onMounted(() => {
  const playPromise = videoRef.value?.play();
  if (playPromise?.catch) {
    playPromise.catch(revealLogin);
  }
});

onBeforeUnmount(() => {
  clearLoginTimer();
});
</script>

<template>
  <section v-if="currentStage === 'opening'" class="opening-screen" aria-label="开屏视频">
    <video
      ref="videoRef"
      class="opening-video"
      autoplay
      muted
      playsinline
      preload="auto"
      @ended="revealLogin"
      @error="revealLogin"
    >
      <source src="/resources/opening.mp4" type="video/mp4" />
    </video>
    <button class="skip-button" type="button" @click="skipOpening">跳过</button>
  </section>

  <section v-else class="login-stage" aria-label="登录方式选择">
    <div class="login-backdrop"></div>
    <div class="login-card">
      <div v-show="activePanel === 'choice'" class="login-panel">
        <div class="brand-mark" aria-hidden="true">POOK</div>
        <p class="eyebrow">POOK AI CLASSROOM</p>
        <h1>欢迎进入课堂端</h1>
        <p class="login-copy">请选择登录方式后进入应用。</p>
        <div class="login-options" role="group" aria-label="登录方式">
          <button class="login-option account-login" type="button" @click="setPanel('account')">
            <span class="option-icon" aria-hidden="true">#</span>
            <span class="option-body">
              <strong>账密登录</strong>
              <small>使用教师账号和密码登录</small>
            </span>
          </button>
          <button class="login-option wechat-login" type="button" @click="setPanel('qrcode')">
            <span class="option-icon" aria-hidden="true">W</span>
            <span class="option-body">
              <strong>微信扫码登录</strong>
              <small>使用微信扫码快速进入</small>
            </span>
          </button>
        </div>
      </div>

      <div v-show="activePanel === 'account'" class="login-panel">
        <button class="panel-back" type="button" @click="setPanel('choice')">返回</button>
        <div class="brand-mark" aria-hidden="true">POOK</div>
        <p class="eyebrow">ACCOUNT LOGIN</p>
        <h1>账号密码登录</h1>
        <p class="login-copy">请输入教师账号和密码进入课堂端。</p>
        <form class="account-form" @submit.prevent="submitAccountLogin">
          <label class="field">
            <span>账号</span>
            <input type="text" value="guest" />
          </label>
          <label class="field">
            <span>密码</span>
            <input type="password" value="123456" />
          </label>
          <button class="primary-action" :disabled="loginPending" type="submit">登录</button>
        </form>
      </div>

      <div v-show="activePanel === 'qrcode'" class="login-panel">
        <button class="panel-back" type="button" @click="setPanel('choice')">返回</button>
        <div class="brand-mark" aria-hidden="true">POOK</div>
        <p class="eyebrow">WECHAT LOGIN</p>
        <h1>微信扫码登录</h1>
        <p class="login-copy">使用微信扫描下方二维码完成登录。</p>
        <div class="qr-shell" aria-hidden="true">
          <div class="qr-code">
            <span class="finder finder-a"></span>
            <span class="finder finder-b"></span>
            <span class="finder finder-c"></span>
          </div>
        </div>
        <p class="qr-caption">请打开微信进行扫码</p>
      </div>
    </div>
  </section>

  <div :class="['toast', { show: toastVisible }]" role="status" aria-live="polite">
    {{ toastMessage }}
  </div>
</template>

<style scoped>
.opening-screen,
.login-stage {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.opening-screen {
  background: #000;
}

.opening-video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.skip-button {
  position: absolute;
  top: 28px;
  right: 28px;
  z-index: 2;
  min-width: 84px;
  height: 44px;
  padding: 0 18px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  background: rgba(7, 17, 31, 0.4);
  backdrop-filter: blur(16px);
}

.login-stage {
  display: grid;
  place-items: center;
  padding: 32px;
}

.login-backdrop {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 25%, rgba(95, 213, 255, 0.18), transparent 24%),
    radial-gradient(circle at 78% 18%, rgba(53, 208, 143, 0.12), transparent 22%),
    linear-gradient(180deg, rgba(3, 8, 20, 0.46), rgba(3, 8, 20, 0.82));
}

.login-card {
  position: relative;
  z-index: 1;
  width: min(460px, calc(100vw - 48px));
  padding: 34px 32px 30px;
  background: rgba(9, 18, 34, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  box-shadow: var(--shadow);
  backdrop-filter: blur(24px);
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 76px;
  height: 32px;
  padding: 0 12px;
  color: #04101f;
  background: linear-gradient(135deg, var(--cyan), #ffffff);
  border-radius: 999px;
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 0.08em;
}

.eyebrow {
  margin: 24px 0 8px;
  color: rgba(245, 248, 255, 0.5);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
}

h1 {
  margin: 0;
  font-size: 34px;
  line-height: 1.15;
}

.login-copy {
  margin: 12px 0 28px;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.6;
}

.login-options,
.account-form {
  display: grid;
  gap: 14px;
}

.login-option {
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr);
  gap: 16px;
  align-items: center;
  width: 100%;
  min-height: 92px;
  padding: 18px;
  text-align: left;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--line);
  border-radius: 18px;
}

.option-icon {
  display: grid;
  width: 56px;
  height: 56px;
  place-items: center;
  border-radius: 16px;
  font-size: 24px;
  font-weight: 800;
}

.account-login .option-icon {
  background: linear-gradient(135deg, rgba(95, 213, 255, 0.24), rgba(46, 120, 255, 0.42));
}

.wechat-login .option-icon {
  background: linear-gradient(135deg, rgba(53, 208, 143, 0.24), rgba(53, 208, 143, 0.42));
}

.option-body {
  display: grid;
  gap: 6px;
}

.option-body strong {
  font-size: 20px;
}

.option-body small {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.5;
}

.panel-back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 72px;
  height: 36px;
  margin-bottom: 16px;
  padding: 0 12px;
  color: rgba(245, 248, 255, 0.82);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
}

.field {
  display: grid;
  gap: 8px;
}

.field span {
  color: rgba(245, 248, 255, 0.72);
  font-size: 13px;
  font-weight: 700;
}

.field input {
  width: 100%;
  height: 52px;
  padding: 0 16px;
  color: var(--text);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  outline: none;
}

.primary-action {
  width: 100%;
  height: 52px;
  margin-top: 6px;
  color: #04101f;
  background: linear-gradient(135deg, var(--cyan), #dff7ff);
  border: 0;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 800;
}

.qr-shell {
  display: grid;
  place-items: center;
  padding: 18px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
}

.qr-code {
  position: relative;
  width: 228px;
  height: 228px;
  background:
    linear-gradient(90deg, transparent 12%, #0a0f19 12% 16%, transparent 16% 20%, #0a0f19 20% 28%, transparent 28% 34%, #0a0f19 34% 38%, transparent 38% 44%, #0a0f19 44% 52%, transparent 52% 58%, #0a0f19 58% 62%, transparent 62% 68%, #0a0f19 68% 76%, transparent 76% 82%, #0a0f19 82% 86%, transparent 86%),
    linear-gradient(transparent 10%, #0a0f19 10% 14%, transparent 14% 18%, #0a0f19 18% 26%, transparent 26% 30%, #0a0f19 30% 34%, transparent 34% 42%, #0a0f19 42% 50%, transparent 50% 56%, #0a0f19 56% 60%, transparent 60% 66%, #0a0f19 66% 72%, transparent 72% 78%, #0a0f19 78% 84%, transparent 84%);
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
}

.finder {
  position: absolute;
  width: 56px;
  height: 56px;
  border: 8px solid #0a0f19;
  background: #fff;
}

.finder::after {
  position: absolute;
  inset: 10px;
  content: "";
  background: #0a0f19;
}

.finder-a { top: 14px; left: 14px; }
.finder-b { top: 14px; right: 14px; }
.finder-c { bottom: 14px; left: 14px; }

.qr-caption {
  margin: 18px 0 0;
  color: rgba(245, 248, 255, 0.78);
  text-align: center;
  font-size: 15px;
}

.toast {
  position: fixed;
  left: 50%;
  bottom: 42px;
  z-index: 30;
  min-width: 280px;
  max-width: calc(100vw - 40px);
  padding: 14px 18px;
  text-align: center;
  background: rgba(5, 14, 28, 0.9);
  border: 1px solid rgba(95, 213, 255, 0.18);
  border-radius: 16px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.38);
  backdrop-filter: blur(18px);
  opacity: 0;
  pointer-events: none;
  transform: translateX(-50%) translateY(16px);
  transition: opacity 180ms ease, transform 180ms ease;
}

.toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
</style>
