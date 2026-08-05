<template>
  <div class="fluent-col" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  span: { type: Number, default: 24 },
  offset: { type: Number, default: 0 },
  push: { type: Number, default: 0 },
  pull: { type: Number, default: 0 }
})

const colStyle = computed(() => ({
  flex: `0 0 ${(props.span / 24) * 100}%`,
  maxWidth: `${(props.span / 24) * 100}%`,
  marginLeft: props.offset ? `${(props.offset / 24) * 100}%` : '',
  position: props.push || props.pull ? 'relative' : '',
  left: props.push ? `${(props.push / 24) * 100}%` : '',
  right: props.pull ? `${(props.pull / 24) * 100}%` : ''
}))
</script>

<style scoped>
.fluent-col {
  box-sizing: border-box;
}
</style>