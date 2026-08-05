<template>
  <div class="fluent-toggle-switch" :class="{ 'is-checked': isChecked, 'is-disabled': disabled }">
    <label v-if="label" class="toggle-switch-label" :for="switchId">{{ label }}</label>
    <button
      :id="switchId"
      class="toggle-switch-track"
      role="switch"
      :aria-checked="isChecked"
      :disabled="disabled"
      @click="toggle"
    >
      <span class="toggle-switch-thumb"></span>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'change'])

const switchId = `toggle-switch-${Math.random().toString(36).substr(2, 9)}`
const isChecked = computed(() => props.modelValue)

const toggle = () => {
  if (props.disabled) return
  const newValue = !isChecked.value
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>

<style scoped>
.fluent-toggle-switch {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.toggle-switch-label {
  font-size: 14px;
  color: var(--text-primary);
  cursor: pointer;
}

.toggle-switch-track {
  position: relative;
  width: 40px;
  height: 20px;
  background: var(--text-muted);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.toggle-switch-track:hover {
  background: var(--text-secondary);
}

.toggle-switch-track:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.toggle-switch-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s ease;
}

.fluent-toggle-switch.is-checked .toggle-switch-track {
  background: var(--accent);
}

.fluent-toggle-switch.is-checked .toggle-switch-track:hover {
  background: var(--accent-dark);
}

.fluent-toggle-switch.is-checked .toggle-switch-thumb {
  transform: translateX(20px);
}

.fluent-toggle-switch.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>