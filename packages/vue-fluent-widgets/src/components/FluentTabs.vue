<template>
  <div class="fluent-tabs">
    <div class="fluent-tabs-list" role="tablist">
    <button
      v-for="option in normalizedOptions"
      :key="option.value"
      class="fluent-tab"
      :class="{ active: modelValue === option.value, disabled: option.disabled }"
      type="button"
      role="tab"
      :aria-selected="modelValue === option.value"
      :disabled="option.disabled"
      @click="selectTab(option)"
    >
      <FluentIcon v-if="option.icon" :icon="option.icon" :width="16" />
      <span v-else-if="option.symbol" class="fluent-tab-symbol" aria-hidden="true">{{ option.symbol }}</span>
      <span>{{ option.label }}</span>
    </button>
    </div>
    <div v-if="$slots[modelValue]" class="fluent-tab-panel" role="tabpanel">
      <slot :name="modelValue" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  modelValue: { type: [String, Number], required: true },
  options: { type: Array, default: () => [] },
  tabs: { type: Array, default: () => [] }
})

const emit = defineEmits(['update:modelValue'])

const normalizedOptions = computed(() => (props.tabs.length ? props.tabs : props.options).map(option => ({
  ...option,
  value: option.value ?? option.key
})))

const selectTab = option => {
  if (!option.disabled) emit('update:modelValue', option.value)
}
</script>

<style scoped>
.fluent-tabs { display: flex; flex-direction: column; gap: 4px; padding: 4px; background: var(--bg-hover); border: 1px solid var(--border-default); border-radius: var(--radius-md); }
.fluent-tabs-list { display: flex; gap: 4px; }
.fluent-tab { position: relative; min-height: 34px; flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 7px; padding: 0 12px; border: 0; border-radius: var(--radius-sm); background: transparent; color: var(--text-secondary); font: inherit; font-size: 13px; cursor: pointer; transition: color var(--duration-normal) var(--ease-standard), background var(--duration-normal) var(--ease-standard), transform var(--duration-fast) var(--ease-standard); }
.fluent-tab::before { content: ''; position: absolute; left: 4px; top: 8px; bottom: 8px; width: 3px; border-radius: 2px; background: var(--accent); transform: scaleY(0); transform-origin: center; transition: transform var(--duration-normal) var(--ease-standard); }
.fluent-tab:hover { background: var(--bg-card); color: var(--text-primary); }
.fluent-tab:active { transform: scale(0.98); }
.fluent-tab.active { background: var(--bg-card-solid); color: var(--text-primary); box-shadow: var(--shadow-2); }
.fluent-tab.active::before { transform: scaleY(1); }
.fluent-tab:disabled { opacity: 0.5; cursor: default; }
.fluent-tab-symbol { width: 16px; font-family: "Segoe UI Symbol", sans-serif; font-size: 18px; font-weight: 600; line-height: 1; text-align: center; flex-shrink: 0; }
.fluent-tab-panel { padding: 16px 4px 4px; color: var(--text-secondary); }
</style>
