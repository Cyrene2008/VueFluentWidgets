<template>
  <div 
    class="fluent-space"
    :class="[`direction-${direction}`, `align-${align}`, { 'wrap': wrap }]"
    :style="spaceStyle"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  direction: { type: String, default: 'horizontal' }, // horizontal, vertical
  size: { type: [Number, String, Array], default: 8 },
  align: { type: String, default: 'start' }, // start, end, center, baseline
  wrap: { type: Boolean, default: false }
})

const cssLength = (value) => {
  if (typeof value === 'number') return `${value}px`
  return value
}

const spaceStyle = computed(() => {
  const style = {}
  
  if (Array.isArray(props.size)) {
    style.columnGap = cssLength(props.size[0])
    style.rowGap = cssLength(props.size[1] || props.size[0])
  } else {
    style.gap = cssLength(props.size)
  }
  
  return style
})
</script>

<style scoped>
.fluent-space {
  display: flex;
}

.direction-horizontal {
  flex-direction: row;
}

.direction-vertical {
  flex-direction: column;
}

.align-start {
  align-items: flex-start;
}

.align-end {
  align-items: flex-end;
}

.align-center {
  align-items: center;
}

.align-baseline {
  align-items: baseline;
}

.wrap {
  flex-wrap: wrap;
}
</style>