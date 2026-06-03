<script setup>
import { ref } from "vue";
import LoginShell from "./components/login/LoginShell.vue";
import PookApp from "./components/pook/PookApp.vue";

const stage = ref("opening");

function handleEnterApp() {
  stage.value = "app";
}

function handleLogout() {
  stage.value = "login";
}
</script>

<template>
  <LoginShell v-if="stage !== 'app'" :start-at-login="stage === 'login'" @enter-app="handleEnterApp" />
  <PookApp v-else @logout="handleLogout" />
</template>
