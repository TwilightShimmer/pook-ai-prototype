<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const emit = defineEmits(["enter-app"]);

const activePanel = ref("choice");
const currentStage = ref("opening");
const loginPending = ref(false);
const openingVideoRef = ref(null);
const loadingVideoRef = ref(null);

let loginTimer = 0;
let lastVideoTapAt = 0;

function setPanel(panel) {
  activePanel.value = panel;
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

function playLoadingVideo() {
  window.requestAnimationFrame(() => {
    const playPromise = loadingVideoRef.value?.play();
    if (playPromise?.catch) {
      playPromise.catch(enterApp);
    }
  });
}

function submitAccountLogin() {
  if (loginPending.value) return;
  loginPending.value = true;
  clearLoginTimer();
  currentStage.value = "loadingIntro";
  loginTimer = window.setTimeout(() => {
    currentStage.value = "loading";
    playLoadingVideo();
  }, 1100);
}

function enterApp() {
  clearLoginTimer();
  openingVideoRef.value?.pause();
  loadingVideoRef.value?.pause();
  loginPending.value = false;
  emit("enter-app");
}

function skipOpening() {
  openingVideoRef.value?.pause();
  revealLogin();
}

function skipCurrentVideo() {
  if (currentStage.value === "opening") {
    skipOpening();
    return;
  }
  if (currentStage.value === "loadingIntro") {
    clearLoginTimer();
    currentStage.value = "loading";
    playLoadingVideo();
    return;
  }
  if (currentStage.value === "loading") {
    enterApp();
  }
}

function handleVideoTap() {
  const now = Date.now();
  if (now - lastVideoTapAt <= 500) {
    lastVideoTapAt = 0;
    skipCurrentVideo();
    return;
  }
  lastVideoTapAt = now;
}

onMounted(() => {
  const playPromise = openingVideoRef.value?.play();
  if (playPromise?.catch) {
    playPromise.catch(revealLogin);
  }
});

onBeforeUnmount(() => {
  clearLoginTimer();
});
</script>

<template>
  <div class="login-shell">
    <main class="login-frame">
  <section
    v-if="currentStage === 'opening'"
    class="video-stage"
    aria-label="开屏视频"
    @click="handleVideoTap"
  >
    <video
      ref="openingVideoRef"
      class="stage-video"
      autoplay
      muted
      playsinline
      preload="auto"
      @ended="revealLogin"
      @error="revealLogin"
    >
      <source src="/resources/opening.mp4" type="video/mp4" />
    </video>
    <div class="video-tap-hint">双击屏幕可跳过</div>
    <button class="skip-icon-button" type="button" aria-label="跳过视频" @click.stop="skipOpening">
      <span aria-hidden="true">⏭</span>
    </button>
  </section>

  <section
    v-else-if="currentStage === 'loading'"
    class="video-stage"
    aria-label="登录过场动画"
    @click="handleVideoTap"
  >
    <video
      ref="loadingVideoRef"
      class="stage-video"
      autoplay
      muted
      playsinline
      preload="auto"
      @ended="enterApp"
      @error="enterApp"
    >
      <source src="/resources/loading.mp4" type="video/mp4" />
    </video>
    <div class="video-tap-hint">双击屏幕可跳过</div>
    <button class="skip-icon-button" type="button" aria-label="跳过视频" @click.stop="enterApp">
      <span aria-hidden="true">⏭</span>
    </button>
  </section>

  <section
    v-else-if="currentStage === 'loadingIntro'"
    class="loading-intro-stage"
    aria-label="POKI进入课堂引导"
    @click="handleVideoTap"
  >
    <div class="intro-glow" aria-hidden="true"></div>
    <div class="poki-guide">
      <div class="poki-avatar" aria-hidden="true">🤖</div>
      <div class="poki-speech">
        <p>我去准备今天的课堂啦！</p>
        <span>POKI 正在带你进入课堂</span>
      </div>
    </div>
    <div class="intro-progress" aria-hidden="true">
      <span></span>
    </div>
    <div class="video-tap-hint">双击屏幕可跳过</div>
    <button class="skip-icon-button" type="button" aria-label="跳过引导" @click.stop="skipCurrentVideo">
      <span aria-hidden="true">⏭</span>
    </button>
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
    </main>
  </div>
</template>

<style scoped>
.login-shell {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: #030814;
}

.login-frame {
  position: relative;
  width: min(100vw, calc(100vh * 2200 / 1440));
  height: min(100vh, calc(100vw * 1440 / 2200));
  aspect-ratio: 2200 / 1440;
  container-type: size;
  overflow: hidden;
}

.video-stage,
.loading-intro-stage,
.login-stage {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.video-stage {
  background: #000;
}

.loading-intro-stage {
  display: grid;
  place-items: center;
  background:
    radial-gradient(circle at 50% 38%, rgba(95, 213, 255, 0.22), transparent 28%),
    radial-gradient(circle at 44% 56%, rgba(53, 208, 143, 0.16), transparent 24%),
    linear-gradient(180deg, #071322 0%, #030814 100%);
}

.intro-glow {
  position: absolute;
  width: min(52cqw, 420px);
  height: min(52cqw, 420px);
  background: rgba(95, 213, 255, 0.16);
  border-radius: 999px;
  filter: blur(12px);
  animation: introPulse 1.1s ease-in-out infinite alternate;
}

.poki-guide {
  position: relative;
  z-index: 1;
  display: grid;
  justify-items: center;
  gap: 20px;
  transform: translateY(-10px);
  animation: guideEnter 520ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

.poki-avatar {
  display: grid;
  width: clamp(112px, 18cqw, 168px);
  height: clamp(112px, 18cqw, 168px);
  place-items: center;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(95, 213, 255, 0.8));
  border: 8px solid rgba(255, 255, 255, 0.5);
  border-radius: 34px;
  box-shadow: 0 28px 70px rgba(0, 0, 0, 0.34);
  font-size: clamp(58px, 9cqw, 88px);
  animation: pokiTalk 720ms ease-in-out infinite alternate;
}

.poki-speech {
  max-width: min(62cqw, 560px);
  padding: 18px 24px;
  color: #04101f;
  text-align: center;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 26px;
  box-shadow: 0 20px 52px rgba(0, 0, 0, 0.22);
}

.poki-speech p {
  margin: 0;
  font-size: clamp(24px, 3.2cqw, 34px);
  font-weight: 1000;
  line-height: 1.2;
}

.poki-speech span {
  display: block;
  margin-top: 8px;
  color: rgba(4, 16, 31, 0.68);
  font-size: clamp(14px, 1.55cqw, 18px);
  font-weight: 900;
}

.intro-progress {
  position: absolute;
  left: 50%;
  bottom: clamp(48px, 7cqh, 72px);
  z-index: 1;
  width: min(38cqw, 360px);
  height: 10px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  transform: translateX(-50%);
}

.intro-progress span {
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #5fd5ff, #35d08f);
  border-radius: inherit;
  transform-origin: left center;
  animation: introLoad 1.1s linear both;
}

.stage-video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@keyframes guideEnter {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(-10px) scale(1);
  }
}

@keyframes introPulse {
  from {
    opacity: 0.5;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1.04);
  }
}

@keyframes pokiTalk {
  from {
    transform: translateY(0) scale(1);
  }
  to {
    transform: translateY(-5px) scale(1.025);
  }
}

@keyframes introLoad {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.skip-icon-button {
  position: absolute;
  top: clamp(18px, 3.2vh, 30px);
  right: clamp(18px, 3.2vh, 30px);
  z-index: 3;
  display: grid;
  width: 54px;
  height: 54px;
  place-items: center;
  padding: 0;
  color: #fff;
  background: rgba(7, 17, 31, 0.46);
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 999px;
  backdrop-filter: blur(16px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
}

.skip-icon-button span {
  font-size: 25px;
  line-height: 1;
}

.video-tap-hint {
  position: absolute;
  left: 50%;
  top: clamp(22px, 4vh, 38px);
  z-index: 2;
  padding: 8px 14px;
  color: rgba(255, 255, 255, 0.88);
  background: rgba(7, 17, 31, 0.42);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 0;
  backdrop-filter: blur(14px);
  transform: translateX(-50%);
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
</style>
