<template>
  <div class="fluent-pivot" :class="{ 'is-disabled': disabled }">
    <div class="pivot-header" role="tablist">
      <button
        v-for="(item, index) in items"
        :key="index"
        class="pivot-header-item"
        :class="{ 'is-selected': selectedIndex === index, 'is-disabled': item.disabled }"
        role="tab"
        :aria-selected="selectedIndex === index"
        :aria-disabled="item.disabled || disabled"
        :disabled="item.disabled || disabled"
        @click="selectItem(index)"
      >
        <FluentIcon v-if="item.icon" :icon="item.icon" :width="16" />
        <span class="pivot-header-text">{{ item.label }}</span>
        <div class="pivot-indicator"></div>
      </button>
    </div>
    <div class="pivot-content" role="tabpanel">
      <slot :name="`tab-${selectedIndex}`" :item="items[selectedIndex]" :index="selectedIndex">
        <slot :item="items[selectedIndex]" :index="selectedIndex"></slot>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
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
.fluent-pivot {
  display: flex;
  flex-direction: column;
}

.fluent-pivot.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.pivot-header {
  display: flex;
  border-bottom: 1px solid var(--border-strong);
  overflow-x: auto;
}

.pivot-header-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--text-secondary);
  font-size: 14px;
  font-family: var(--font-ui);
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease;
  white-space: nowrap;
}

.pivot-header-item:hover {
  color: var(--text-primary);
}

.pivot-header-item.is-selected {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.pivot-header-item.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pivot-header-text {
  font-weight: 500;
}

.pivot-indicator {
  display: none;
}

.pivot-content {
  padding: 16px 0;
}
</style>