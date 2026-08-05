<template>
  <div class="fluent-date-picker" :class="{ 'is-disabled': disabled }">
    <div v-if="label" class="date-picker-label">{{ label }}</div>
    <div class="date-picker-container">
      <input
        type="date"
        class="date-picker-input"
        :value="modelValue"
        :min="min"
        :max="max"
        :disabled="disabled"
        :placeholder="placeholder"
        @input="onInput"
        @change="onChange"
      />
      <FluentIcon icon="calendar-16-regular" :width="16" class="date-picker-icon" />
    </div>
    <div v-if="error" class="date-picker-error">{{ error }}</div>
  </div>
</template>

<script setup>
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '选择日期' },
  min: { type: String, default: '' },
  max: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  error: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'change'])

const onInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const onChange = (event) => {
  emit('change', event.target.value)
}
</script>

<style scoped>
.fluent-date-picker {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.fluent-date-picker.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.date-picker-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.date-picker-container {
  position: relative;
  display: flex;
  align-items: center;
}

.date-picker-input {
  width: 100%;
  height: 36px;
  padding: 8px 12px;
  padding-right: 36px;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  background: var(--bg-card-solid);
  color: var(--text-primary);
  font-size: 14px;
  font-family: var(--font-ui);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.date-picker-input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 2px rgba(0, 120, 212, 0.2);
}

.date-picker-input:disabled {
  background: var(--bg-card);
  color: var(--text-muted);
}

.date-picker-input::-webkit-calendar-picker-indicator {
  opacity: 0;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.date-picker-icon {
  position: absolute;
  right: 10px;
  color: var(--text-secondary);
  pointer-events: none;
}

.date-picker-error {
  font-size: 12px;
  color: #c42b1c;
}
</style>