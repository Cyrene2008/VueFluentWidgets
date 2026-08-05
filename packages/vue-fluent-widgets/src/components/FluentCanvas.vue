<template>
  <div class="fluent-canvas" :style="canvasStyle">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  width: { type: [Number, String], default: 'auto' },
  height: { type: [Number, String], default: 'auto' },
  background: { type: String, default: 'transparent' }
})

const cssLength = (value) => {
  if (typeof value === 'number') return `${value}px`
  return value
}

const canvasStyle = computed(() => ({
  width: cssLength(props.width),
  height: cssLength(props.height),
  background: props.background
}))
</script>

<style scoped>
.fluent-canvas {
  position: relative;
}
</style>