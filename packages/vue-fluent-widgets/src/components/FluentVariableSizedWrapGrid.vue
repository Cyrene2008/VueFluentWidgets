<template>
  <div class="fluent-variable-sized-wrap-grid" :style="gridStyle">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  itemWidth: { type: Number, default: 100 },
  itemHeight: { type: Number, default: 100 },
  orientation: { type: String, default: 'horizontal' }, // horizontal, vertical
  horizontalChildrenAlignment: { type: String, default: 'left' },
  verticalChildrenAlignment: { type: String, default: 'top' },
  padding: { type: [String, Number], default: 0 }
})

const cssLength = (value) => {
  if (typeof value === 'number') return `${value}px`
  return value
}

const gridStyle = computed(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  flexDirection: props.orientation === 'horizontal' ? 'row' : 'column',
  padding: cssLength(props.padding),
  gap: '8px'
}))
</script>

<style scoped>
.fluent-variable-sized-wrap-grid {
  display: flex;
  flex-wrap: wrap;
}
</style>