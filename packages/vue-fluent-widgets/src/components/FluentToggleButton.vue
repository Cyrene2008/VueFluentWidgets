<template>
  <button
    class="fluent-toggle-button"
    :class="{
      'is-checked': isChecked,
      'is-disabled': disabled,
      [`variant-${variant}`]: true
    }"
    :disabled="disabled"
    @click="toggle"
  >
    <span v-if="$slots.icon || icon" class="toggle-button-icon">
      <slot name="icon">
        <FluentIcon v-if="icon" :icon="icon" :width="16" />
      </slot>
    </span>
    <span v-if="$slots.default || label" class="toggle-button-content">
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: undefined },
  checked: { type: Boolean, default: undefined },
  label: { type: String, default: '' },
  icon: { type: String, default: '' },
  variant: { type: String, default: 'secondary' }, // primary, secondary, subtle
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'update:checked', 'change'])

const isChecked = computed(() => props.modelValue ?? props.checked ?? false)

const toggle = () => {
  if (props.disabled) return
  const newValue = !isChecked.value
  emit('update:modelValue', newValue)
  emit('update:checked', newValue)
  emit('change', newValue)
}
</script>

<style scoped>
.fluent-toggle-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 32px;
  padding: 0 16px;
  background: var(--bg-card-solid);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 14px;
  font-family: var(--font-ui);
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.fluent-toggle-button:hover {
  background: var(--bg-hover);
}

.fluent-toggle-button:active {
  background: var(--bg-card);
}

/* Checked state */
.fluent-toggle-button.is-checked {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--text-on-accent);
}

.fluent-toggle-button.is-checked:hover {
  background: var(--accent-dark);
}

/* Variants */
.fluent-toggle-button.variant-primary.is-checked {
  background: var(--accent);
  border-color: var(--accent);
}

.fluent-toggle-button.variant-secondary.is-checked {
  background: rgba(0, 120, 212, 0.1);
  border-color: var(--accent);
  color: var(--accent);
}

.fluent-toggle-button.variant-subtle.is-checked {
  background: transparent;
  border-color: transparent;
  color: var(--accent);
  text-decoration: underline;
}

/* Disabled */
.fluent-toggle-button.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
</style>