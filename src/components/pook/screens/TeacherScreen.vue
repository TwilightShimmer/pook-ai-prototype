<script setup>
import { usePookAppStore } from "../../../composables/usePookApp";
const store = usePookAppStore();
</script>

<template>
  <section class="screen" :class="{ active: store.currentScreen.value === 'teacher' }" data-screen="teacher">
    <div class="teacher-layout">
      <section class="teacher-panel">
        <h2>课堂辅助设置</h2>
        <div class="teacher-grid">
          <button>设备检查</button>
          <button>重新选择人数</button>
          <button>课程难度</button>
          <button>声音测试</button>
          <button>网络状态</button>
          <button>查看课后日志</button>
        </div>
      </section>
      <section class="teacher-panel">
        <h2>课堂状态</h2>
        <div class="status-list">
          <span>人数：3 人</span>
          <span>默认进入：主页面</span>
          <span>课堂中：隐藏辅助设置</span>
          <span>设备：摄像头、麦克风正常</span>
        </div>
      </section>
      <section class="teacher-panel teacher-cue-panel">
        <h2>POKI 阶段提醒</h2>
        <div class="teacher-cue-editor">
          <article v-for="cue in store.editableLessonCues.value" :key="cue.id">
            <span>{{ cue.label }}</span>
            <input
              :value="cue.title"
              aria-label="阶段提醒标题"
              @input="store.updateLessonCue(cue.id, 'title', $event.target.value)"
            />
            <textarea
              :value="cue.body"
              aria-label="阶段提醒内容"
              rows="2"
              @input="store.updateLessonCue(cue.id, 'body', $event.target.value)"
            ></textarea>
          </article>
        </div>
      </section>
    </div>
  </section>
</template>
