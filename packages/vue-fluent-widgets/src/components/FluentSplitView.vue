<template>
  <div class="fluent-split-view" :class="{ 'is-pane-open': isPaneOpen }">
    <div class="split-view-pane" :style="paneStyle">
      <slot name="pane"></slot>
    </div>
    <div class="split-view-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  paneWidth: { type: [Number, String], default: 250 },
  isPaneOpen: { type: Boolean, default: true },
  panePlacement: { type: String, default: 'left' } // left, right
})

const cssLength = (value) => {
  if (typeof value === 'number') return `${value}px`
  return value
}

const paneStyle = computed(() => ({
  width: cssLength(props.paneWidth),
  [props.panePlacement]: 0
}))
</script>

<style scoped>
.fluent-split-view {
  display: flex;
  position: relative;
  overflow: hidden;
}

.split-view-pane {
  flex-shrink: 0;
  background: var(--bg-card);
  border-right: 1px solid var(--border-strong);
  overflow-y: auto;
  transition: width 0.3s ease, margin 0.3s ease;
}

.split-view-content {
  flex: 1;
  overflow-y: auto;
}
</style>