<script setup>
import { usePookAppStore } from "../../composables/usePookApp";

const store = usePookAppStore();
</script>

<template>
  <Transition name="update-announcement">
    <div v-if="store.updateAnnouncementVisible.value" class="update-announcement-layer" role="dialog" aria-modal="true">
      <section class="update-announcement-card" aria-label="版本更新公告">
        <header class="update-announcement-head">
          <span aria-hidden="true">📣</span>
          <h2>版本更新公告</h2>
        </header>

        <div class="update-announcement-body">
          <p>POKI 已经准备好新的课堂体验啦。</p>
          <ul>
            <li>首页外观调整为更温暖的课堂氛围。</li>
            <li>课程环节改成更清爽的冷色系，方便小朋友专注。</li>
            <li>成长卡和奖励卡片继续保留暖色奖励感。</li>
          </ul>
        </div>

        <footer class="update-announcement-actions">
          <button type="button" :disabled="!store.updateAnnouncementClosable.value" @click="store.closeUpdateAnnouncement">
            {{ store.updateAnnouncementClosable.value ? "我知道啦" : "请先看一下" }}
          </button>
        </footer>
      </section>
    </div>
  </Transition>
</template>
