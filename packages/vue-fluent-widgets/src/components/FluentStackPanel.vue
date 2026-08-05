<template>
  <div 
    class="fluent-stack-panel"
    :class="[`orientation-${orientation}`]"
    :style="panelStyle"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  orientation: { type: String, default: 'vertical' }, // vertical, horizontal
  spacing: { type: Number, default: 0 },
  padding: { type: [String, Number], default: 0 },
  horizontalAlignment: { type: String, default: 'stretch' },
  verticalAlignment: { type: String, default: 'top' }
})

const cssLength = (value) => {
  if (typeof value === 'number') return `${value}px`
  return value
}

const panelStyle = computed(() => ({
  gap: `${props.spacing}px`,
  padding: cssLength(props.padding),
  alignItems: props.horizontalAlignment,
  justifyContent: props.verticalAlignment
}))
</script>

<style scoped>
.fluent-stack-panel {
  display: flex;
}

.fluent-stack-panel.orientation-vertical {
  flex-direction: column;
}

.fluent-stack-panel.orientation-horizontal {
  flex-direction: row;
}
</style>