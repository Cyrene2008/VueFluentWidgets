<template>
  <div class="fluent-grid" :style="gridStyle">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  columns: { type: [Number, String], default: 1 },
  rows: { type: [Number, String], default: 'auto' },
  columnSpacing: { type: Number, default: 0 },
  rowSpacing: { type: Number, default: 0 },
  padding: { type: [String, Number], default: 0 }
})

const cssLength = (value) => {
  if (typeof value === 'number') return `${value}px`
  return value
}

const gridStyle = computed(() => {
  const style = {
    display: 'grid',
    padding: cssLength(props.padding),
    columnGap: `${props.columnSpacing}px`,
    rowGap: `${props.rowSpacing}px`
  }

  if (typeof props.columns === 'number') {
    style.gridTemplateColumns = `repeat(${props.columns}, 1fr)`
  } else {
    style.gridTemplateColumns = props.columns
  }

  if (typeof props.rows === 'number') {
    style.gridTemplateRows = `repeat(${props.rows}, 1fr)`
  } else {
    style.gridTemplateRows = props.rows
  }

  return style
})
</script>

<style scoped>
.fluent-grid {
  display: grid;
}
</style>