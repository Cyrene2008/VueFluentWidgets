<template>
  <div class="fluent-row" :style="rowStyle">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  gutter: { type: [Number, Array], default: 0 },
  justify: { type: String, default: 'start' }, // start, end, center, space-between, space-around, space-evenly
  align: { type: String, default: 'top' }, // top, middle, bottom, stretch
  wrap: { type: Boolean, default: true }
})

const rowStyle = computed(() => {
  const style = {
    justifyContent: props.justify,
    alignItems: props.align
  }
  
  if (props.wrap) {
    style.flexWrap = 'wrap'
  }
  
  if (Array.isArray(props.gutter)) {
    style.columnGap = `${props.gutter[0]}px`
    style.rowGap = `${props.gutter[1] || props.gutter[0]}px`
  } else if (props.gutter > 0) {
    style.gap = `${props.gutter}px`
  }
  
  return style
})
</script>

<style scoped>
.fluent-row {
  display: flex;
  width: 100%;
}
</style>