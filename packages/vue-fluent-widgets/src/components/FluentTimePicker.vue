<template>
  <div class="fluent-time-picker" :class="{ 'is-disabled': disabled }">
    <div v-if="label" class="time-picker-label">{{ label }}</div>
    <div class="time-picker-container" @click="openPicker">
      <input
        ref="inputRef"
        type="time"
        class="time-picker-input"
        :value="modelValue"
        :disabled="disabled"
        :placeholder="placeholder"
        @input="onInput"
        @change="onChange"
      />
      <button type="button" class="time-picker-button" :disabled="disabled" aria-label="打开时间选择器" @click.stop="openPicker">
        <FluentIcon icon="clock-16-regular" :width="16" />
      </button>
    </div>
    <div v-if="error" class="time-picker-error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '选择时间' },
  disabled: { type: Boolean, default: false },
  error: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'change'])
const inputRef = ref(null)

const openPicker = () => {
  if (props.disabled || !inputRef.value) return
  inputRef.value.focus()
  try {
    if (typeof inputRef.value.showPicker === 'function') inputRef.value.showPicker()
    else inputRef.value.click()
  } catch {}
}

const onInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const onChange = (event) => {
  emit('change', event.target.value)
}
</script>

<style scoped>
.fluent-time-picker {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.fluent-time-picker.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.time-picker-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.time-picker-container {
  position: relative;
  display: flex;
  align-items: center;
}

.time-picker-input {
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

.time-picker-input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 2px rgba(0, 120, 212, 0.2);
}

.time-picker-input:disabled {
  background: var(--bg-card);
  color: var(--text-muted);
}

.time-picker-input::-webkit-calendar-picker-indicator {
  opacity: 0;
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.time-picker-button {
  position: absolute;
  right: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
}

.time-picker-button:hover { background: var(--bg-hover); color: var(--accent); }

.time-picker-error {
  font-size: 12px;
  color: #c42b1c;
}
</style>
