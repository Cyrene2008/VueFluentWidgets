<template>
  <div class="fluent-pivot-item" v-show="isActive">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'

const props = defineProps({
  itemKey: { type: [String, Number], required: true },
  label: { type: String, default: '' },
  icon: { type: String, default: '' },
  disabled: { type: Boolean, default: false }
})

const pivot = inject('pivot')
const isActive = computed(() => pivot?.activeKey === props.itemKey)
</script>

<style scoped>
.fluent-pivot-item {
  padding: 16px 0;
}
</style>