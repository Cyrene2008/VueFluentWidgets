<template>
  <div
    class="fluent-checkbox"
    :class="{
      'is-checked': isChecked,
      'is-indeterminate': isIndeterminate,
      'is-disabled': disabled
    }"
    @click="toggle"
    @keydown.space.prevent="toggle"
    @keydown.enter.prevent="toggle"
  >
    <div class="checkbox-box">
      <FluentIcon 
        v-if="isChecked" 
        icon="checkmark-16-regular" 
        :width="12" 
        class="checkbox-check"
      />
      <div v-else-if="isIndeterminate" class="checkbox-indeterminate"></div>
    </div>
    <label v-if="label || $slots.default" class="checkbox-label">
      <slot>{{ label }}</slot>
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  modelValue: { type: [Boolean, null], default: undefined },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  indeterminate: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'change'])

const isChecked = computed(() => props.modelValue === true)
const isIndeterminate = computed(() => props.indeterminate && props.modelValue === null)

const toggle = () => {
  if (props.disabled) return
  
  let newValue
  if (props.indeterminate) {
    if (props.modelValue === null) newValue = true
    else if (props.modelValue === true) newValue = false
    else newValue = null
  } else {
    newValue = !props.modelValue
  }
  
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>

<style scoped>
.fluent-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  min-height: 32px;
  padding: 4px 0;
}

.fluent-checkbox.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.checkbox-box {
  width: 20px;
  height: 20px;
  border: 2px solid var(--text-secondary);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.fluent-checkbox:hover .checkbox-box {
  border-color: var(--accent);
}

.fluent-checkbox.is-checked .checkbox-box {
  background: var(--accent);
  border-color: var(--accent);
}

.fluent-checkbox.is-indeterminate .checkbox-box {
  background: var(--accent);
  border-color: var(--accent);
}

.checkbox-check {
  color: white;
}

.checkbox-indeterminate {
  width: 10px;
  height: 2px;
  background: white;
  border-radius: 1px;
}

.checkbox-label {
  font-size: 14px;
  color: var(--text-primary);
  line-height: 20px;
}

.fluent-checkbox:focus-visible .checkbox-box {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
</style>