<template>
  <div class="fluent-segmented" :class="{ 'is-disabled': disabled }">
    <div class="segmented-items" ref="itemsRef">
      <div 
        class="segmented-indicator" 
        :style="indicatorStyle"
      ></div>
      <button
        v-for="(item, index) in items"
        :key="index"
        class="segmented-item"
        :class="{ 'is-selected': selectedIndex === index }"
        :disabled="disabled"
        @click="selectItem(index)"
      >
        <FluentIcon v-if="item.icon" :icon="item.icon" :width="16" />
        <span v-if="item.label" class="segmented-item-label">{{ item.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  items: { type: Array, required: true },
  modelValue: { type: [String, Number], default: 0 },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'change'])

const itemsRef = ref(null)
const selectedIndex = computed(() => {
  if (typeof props.modelValue === 'string') {
    return props.items.findIndex(item => item.value === props.modelValue)
  }
  return props.modelValue
})

const indicatorStyle = computed(() => {
  const width = 100 / props.items.length
  return {
    width: `${width}%`,
    transform: `translateX(${selectedIndex.value * 100}%)`
  }
})

const selectItem = (index) => {
  if (props.disabled) return
  const item = props.items[index]
  const value = item.value !== undefined ? item.value : index
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<style scoped>
.fluent-segmented {
  display: inline-flex;
}

.fluent-segmented.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.segmented-items {
  display: flex;
  position: relative;
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  padding: 2px;
}

.segmented-indicator {
  position: absolute;
  top: 2px;
  bottom: 2px;
  left: 2px;
  background: var(--accent);
  border-radius: calc(var(--radius-md) - 1px);
  transition: transform 0.2s ease;
}

.segmented-item {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 6px 16px;
  background: transparent;
  border: none;
  border-radius: calc(var(--radius-md) - 1px);
  color: var(--text-primary);
  font-size: 14px;
  font-family: var(--font-ui);
  cursor: pointer;
  transition: color 0.2s ease;
  position: relative;
  z-index: 1;
  white-space: nowrap;
}

.segmented-item:hover {
  color: var(--text-primary);
}

.segmented-item.is-selected {
  color: var(--text-on-accent);
}

.segmented-item-label {
  font-weight: 500;
}
</style>