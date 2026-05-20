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
import BlocksScreen from "./screens/BlocksScreen.vue";
import BuildScreen from "./screens/BuildScreen.vue";
import CourseScreen from "./screens/CourseScreen.vue";
import FreeBuildScreen from "./screens/FreeBuildScreen.vue";
import GoalsScreen from "./screens/GoalsScreen.vue";
import GrowthScreen from "./screens/GrowthScreen.vue";
import HomeTestScreen from "./screens/HomeTestScreen.vue";
import MeetLayoutTestScreen from "./screens/MeetLayoutTestScreen.vue";
import MeetScreen from "./screens/MeetScreen.vue";
import ProfileScreen from "./screens/ProfileScreen.vue";
import QuestionScreen from "./screens/QuestionScreen.vue";
import ResultScreen from "./screens/ResultScreen.vue";
import ShareScreen from "./screens/ShareScreen.vue";
import ShopScreen from "./screens/ShopScreen.vue";
import TeacherScreen from "./screens/TeacherScreen.vue";
import WelcomeScreen from "./screens/WelcomeScreen.vue";

const store = createPookAppStore();
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
  <div class="pook-app-shell">
    <main class="pook-app" :class="{ immersive: store.isImmersive.value }" aria-label="POOK AI App 体验原型">
      <AppChrome />
      <AppDock />

      <HomeTestScreen />
      <ShopScreen />
      <CourseScreen />
      <MeetLayoutTestScreen />
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
    </main>
  </div>
</template>
