<script setup>
import { onBeforeUnmount, onMounted } from "vue";
import { createPookAppStore, providePookAppStore } from "../../composables/usePookApp";
import "../../styles/pook-app.css";
import AppChrome from "./AppChrome.vue";
import AppDock from "./AppDock.vue";
import ExitLessonConfirm from "./ExitLessonConfirm.vue";
import LessonDebugJump from "./LessonDebugJump.vue";
import LessonNav from "./LessonNav.vue";
import LessonToast from "./LessonToast.vue";
import PageTransitionOverlay from "./PageTransitionOverlay.vue";
import RewardChestOverlay from "./RewardChestOverlay.vue";
import TaskOverlay from "./TaskOverlay.vue";
import TeacherGateOverlay from "./TeacherGateOverlay.vue";
import TeamSwitchGateOverlay from "./TeamSwitchGateOverlay.vue";
import TutorialGuide from "./TutorialGuide.vue";
import UpdateAnnouncement from "./UpdateAnnouncement.vue";
import BlocksScreen from "./screens/BlocksScreen.vue";
import BuildScreen from "./screens/BuildScreen.vue";
import ClassSizeScreen from "./screens/ClassSizeScreen.vue";
import CourseScreen from "./screens/CourseScreen.vue";
import FreeBuildScreen from "./screens/FreeBuildScreen.vue";
import GoalsScreen from "./screens/GoalsScreen.vue";
import GrowthScreen from "./screens/GrowthScreen.vue";
import HomeTestScreen from "./screens/HomeTestScreen.vue";
import MeetScreen from "./screens/MeetScreen.vue";
import ProfileScreen from "./screens/ProfileScreen.vue";
import QuestionScreen from "./screens/QuestionScreen.vue";
import ResultScreen from "./screens/ResultScreen.vue";
import ShareScreen from "./screens/ShareScreen.vue";
import ShopScreen from "./screens/ShopScreen.vue";
import TeacherScreen from "./screens/TeacherScreen.vue";
import TeamSelectScreen from "./screens/TeamSelectScreen.vue";
import WelcomeScreen from "./screens/WelcomeScreen.vue";

const emit = defineEmits(["logout"]);
const props = defineProps({
  loginIdentity: {
    type: Object,
    default: () => ({
      id: "guest",
      displayName: "guest",
      method: "account",
    }),
  },
});

const store = createPookAppStore({
  onLogout: () => emit("logout"),
  loginIdentity: props.loginIdentity,
});
providePookAppStore(store);

function handleKeydown(event) {
  if (event.key === "ArrowRight" && !store.navState.value.nextDisabled) {
    store.nextScreen();
  }
  if (event.key === "ArrowLeft") {
    store.prevScreen();
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
  store.dispose();
});
</script>

<template>
  <div
    class="pook-app-shell"
    :class="{
      'theme-cold': store.usesColdTheme.value,
      'theme-warm': !store.usesColdTheme.value,
    }"
  >
    <main
      class="pook-app"
      :class="{
        immersive: store.isImmersive.value,
        'theme-cold': store.usesColdTheme.value,
        'theme-warm': !store.usesColdTheme.value,
      }"
      aria-label="POOK AI App 体验原型"
    >
      <AppChrome v-if="store.currentScreen.value !== 'team-select'" />
      <AppDock v-if="store.currentScreen.value !== 'team-select'" />

      <TeamSelectScreen />
      <HomeTestScreen />
      <ShopScreen />
      <CourseScreen />
      <ClassSizeScreen />
      <MeetScreen />
      <WelcomeScreen />
      <GoalsScreen />
      <QuestionScreen />
      <BlocksScreen />
      <BuildScreen />
      <FreeBuildScreen />
      <ShareScreen />
      <ResultScreen />
      <GrowthScreen />
      <ProfileScreen />
      <TeacherScreen />

      <LessonNav />
      <LessonDebugJump />
      <LessonToast />
      <PageTransitionOverlay />
      <RewardChestOverlay />
      <TaskOverlay />
      <TeacherGateOverlay />
      <TeamSwitchGateOverlay />
      <ExitLessonConfirm />
      <UpdateAnnouncement />
      <TutorialGuide :visible="store.currentScreen.value === 'home'" />
    </main>
  </div>
</template>
