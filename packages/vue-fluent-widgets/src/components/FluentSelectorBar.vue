<template>
  <div class="fluent-selector-bar" :class="{ 'is-disabled': disabled }">
    <div class="selector-bar-items" role="tablist">
      <button
        v-for="(item, index) in items"
        :key="index"
        class="selector-bar-item"
        :class="{ 'is-selected': selectedIndex === index, 'is-disabled': item.disabled }"
        role="tab"
        :aria-selected="selectedIndex === index"
        :aria-disabled="item.disabled || disabled"
        :disabled="item.disabled || disabled"
        @click="selectItem(index)"
      >
        <FluentIcon v-if="item.icon" :icon="item.icon" :width="16" />
        <span class="selector-bar-item-text">{{ item.label }}</span>
        <div class="selector-bar-indicator"></div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  items: { type: Array, required: true },
  modelValue: { type: Number, default: 0 },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'change'])

const selectedIndex = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
    emit('change', value)
  }
})

const selectItem = (index) => {
  if (props.disabled || props.items[index]?.disabled) return
  selectedIndex.value = index
}
</script>

<style scoped>
.fluent-selector-bar {
  display: flex;
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  padding: 4px;
}

.fluent-selector-bar.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.selector-bar-items {
  display: flex;
  gap: 4px;
  width: 100%;
}

.selector-bar-item {
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
  transition: background 0.2s ease, color 0.2s ease;
  flex: 1;
  justify-content: center;
}

.selector-bar-item:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.selector-bar-item.is-selected {
  background: var(--accent);
  color: var(--text-on-accent);
}

.selector-bar-item.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.selector-bar-item-text {
  font-weight: 500;
}

.selector-bar-indicator {
  display: none;
}
</style>