<template>
  <button
    class="fluent-selector-bar-item"
    :class="{ 'is-selected': isSelected, 'is-disabled': disabled }"
    :disabled="disabled"
    @click="select"
  >
    <FluentIcon v-if="icon" :icon="icon" :width="16" />
    <span class="item-label">{{ label }}</span>
  </button>
</template>

<script setup>
import { computed, inject } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  itemKey: { type: [String, Number], required: true },
  label: { type: String, default: '' },
  icon: { type: String, default: '' },
  disabled: { type: Boolean, default: false }
})

const selectorBar = inject('selectorBar')
const isSelected = computed(() => selectorBar?.selectedKey === props.itemKey)

const select = () => {
  if (!props.disabled) {
    selectorBar?.select(props.itemKey)
  }
}
</script>

<style scoped>
.fluent-selector-bar-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  font-size: 14px;
  font-family: var(--font-ui);
  cursor: pointer;
  transition: all 0.2s ease;
}

.fluent-selector-bar-item:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.fluent-selector-bar-item.is-selected {
  background: var(--accent);
  color: var(--text-on-accent);
}

.fluent-selector-bar-item.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.item-label {
  font-weight: 500;
}
</style>