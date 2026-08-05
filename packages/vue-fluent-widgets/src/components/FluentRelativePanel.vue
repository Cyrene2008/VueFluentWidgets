<template>
  <div class="fluent-relative-panel" :style="panelStyle">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  padding: { type: [String, Number], default: 0 },
  background: { type: String, default: 'transparent' }
})

const cssLength = (value) => {
  if (typeof value === 'number') return `${value}px`
  return value
}

const panelStyle = computed(() => ({
  padding: cssLength(props.padding),
  background: props.background
}))
</script>

<style scoped>
.fluent-relative-panel {
  position: relative;
}
</style>