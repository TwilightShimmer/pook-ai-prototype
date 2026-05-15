<script setup>
import { ref } from "vue";
import LoginShell from "./components/login/LoginShell.vue";
import PookApp from "./components/pook/PookApp.vue";

const stage = ref("opening");

function handleEnterApp() {
  stage.value = "app";
}
</script>

<template>
  <LoginShell v-if="stage !== 'app'" @enter-app="handleEnterApp" />
  <PookApp v-else />
</template>
