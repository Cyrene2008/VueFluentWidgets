<template>
  <div class="fluent-viewbox" :style="viewboxStyle">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  stretch: { type: String, default: 'uniform' }, // none, fill, uniform, uniformToFill
  width: { type: [Number, String], default: 'auto' },
  height: { type: [Number, String], default: 'auto' }
})

const cssLength = (value) => {
  if (typeof value === 'number') return `${value}px`
  return value
}

const viewboxStyle = computed(() => ({
  width: cssLength(props.width),
  height: cssLength(props.height),
  overflow: 'hidden'
}))
</script>

<style scoped>
.fluent-viewbox {
  display: flex;
  align-items: center;
  justify-content: center;
}

.fluent-viewbox > * {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>