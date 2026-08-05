<template>
  <button class="fluent-fullscreen-toggle" @click="toggle" :title="isFullscreen ? '退出全屏' : '全屏'">
    <FluentIcon :icon="isFullscreen ? 'full-screen-minimize-20-regular' : 'full-screen-maximize-20-regular'" :width="16" />
  </button>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import FluentIcon from './FluentIcon.vue'

const isFullscreen = ref(false)

function toggle() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {})
  } else {
    document.exitFullscreen().catch(() => {})
  }
}

function onChange() {
  isFullscreen.value = !!document.fullscreenElement
}

onMounted(() => document.addEventListener('fullscreenchange', onChange))
onBeforeUnmount(() => document.removeEventListener('fullscreenchange', onChange))
</script>

<style scoped>
.fluent-fullscreen-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.fluent-fullscreen-toggle:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}
</style>