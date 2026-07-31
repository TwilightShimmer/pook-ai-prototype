<script setup>
import { ref } from "vue";
import LoginShell from "./components/login/LoginShell.vue";
import PookApp from "./components/pook/PookApp.vue";

const stage = ref("opening");
const loginIdentity = ref({
  id: "guest",
  displayName: "guest",
  method: "account",
});

function handleEnterApp(identity) {
  loginIdentity.value = identity ?? loginIdentity.value;
  stage.value = "app";
}

function handleLogout() {
  stage.value = "login";
}
</script>

<template>
  <LoginShell v-if="stage !== 'app'" :start-at-login="stage === 'login'" @enter-app="handleEnterApp" />
  <PookApp v-else :login-identity="loginIdentity" @logout="handleLogout" />
</template>
