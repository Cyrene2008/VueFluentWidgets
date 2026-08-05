<template>
  <button 
    class="fluent-app-bar-toggle-button"
    :class="{ 
      'is-disabled': disabled, 
      'is-compact': compact,
      'is-checked': isChecked 
    }"
    :disabled="disabled"
    @click="toggle"
  >
    <span class="app-bar-button-icon">
      <slot name="icon">
        <FluentIcon v-if="icon" :icon="icon" :width="20" />
      </slot>
    </span>
    <span v-if="!compact && label" class="app-bar-button-label">{{ label }}</span>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  icon: { type: String, default: '' },
  label: { type: String, default: '' },
  modelValue: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  compact: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'change'])

const isChecked = computed(() => props.modelValue)

const toggle = () => {
  if (props.disabled) return
  const newValue = !props.modelValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>

<style scoped>
.fluent-app-bar-toggle-button {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: 68px;
  height: 56px;
  padding: 8px 12px;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background 0.2s ease;
  color: var(--text-primary);
}

.fluent-app-bar-toggle-button:hover {
  background: var(--bg-hover);
}

.fluent-app-bar-toggle-button:active {
  background: var(--bg-card);
}

.fluent-app-bar-toggle-button.is-checked {
  background: rgba(0, 120, 212, 0.1);
  color: var(--accent);
}

.fluent-app-bar-toggle-button.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.fluent-app-bar-toggle-button.is-compact {
  min-width: 40px;
  height: 40px;
  padding: 8px;
}

.app-bar-button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-bar-button-label {
  font-size: 12px;
  line-height: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
</style>