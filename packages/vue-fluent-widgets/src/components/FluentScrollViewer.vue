<template>
  <div 
    class="fluent-scroll-viewer"
    :class="{ 
      'is-horizontal': horizontal,
      'is-vertical': !horizontal 
    }"
  >
    <div 
      class="scroll-viewer-viewport"
      @scroll="onScroll"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  horizontal: { type: Boolean, default: false }
})

const emit = defineEmits(['scroll'])

const onScroll = (event) => {
  emit('scroll', event)
}
</script>

<style scoped>
.fluent-scroll-viewer {
  position: relative;
  width: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.scroll-viewer-viewport {
  width: 100%;
  min-width: 0;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

.fluent-scroll-viewer.is-horizontal .scroll-viewer-viewport {
  overflow-x: auto;
  overflow-y: hidden;
}

.fluent-scroll-viewer.is-horizontal .scroll-viewer-viewport > :deep(*) {
  width: max-content;
  min-width: max-content;
}

/* 自定义滚动条样式 */
.scroll-viewer-viewport::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.scroll-viewer-viewport::-webkit-scrollbar-track {
  background: transparent;
}

.scroll-viewer-viewport::-webkit-scrollbar-thumb {
  background: var(--text-muted);
  border-radius: 4px;
}

.scroll-viewer-viewport::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary);
}

.scroll-viewer-viewport::-webkit-scrollbar-corner {
  background: transparent;
}
</style>
