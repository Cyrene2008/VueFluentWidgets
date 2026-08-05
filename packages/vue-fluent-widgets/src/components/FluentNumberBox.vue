<template>
  <div class="fluent-number-box" :class="{ 'is-disabled': disabled }">
    <div v-if="label" class="number-box-label">{{ label }}</div>
    <div class="number-box-container">
      <input
        ref="inputRef"
        type="number"
        class="number-box-input"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :min="min"
        :max="max"
        :step="step"
        @input="onInput"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
        @keydown="onKeydown"
      />
      <div v-if="showSpinButtons" class="number-box-spin-buttons">
        <button 
          class="spin-button spin-up"
          type="button"
          :disabled="disabled || !canIncrease"
          @click="increase"
        >
          <FluentIcon icon="chevron-up-16-regular" :width="12" />
        </button>
        <button 
          class="spin-button spin-down"
          type="button"
          :disabled="disabled || !canDecrease"
          @click="decrease"
        >
          <FluentIcon icon="chevron-down-16-regular" :width="12" />
        </button>
      </div>
    </div>
    <div v-if="error" class="number-box-error">{{ error }}</div>
    <div v-if="description" class="number-box-description">{{ description }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  min: { type: Number, default: -Infinity },
  max: { type: Number, default: Infinity },
  step: { type: Number, default: 1 },
  showSpinButtons: { type: Boolean, default: true },
  error: { type: String, default: '' },
  description: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'change', 'focus', 'blur'])

const inputRef = ref(null)

const canIncrease = computed(() => {
  return props.modelValue < props.max
})

const canDecrease = computed(() => {
  return props.modelValue > props.min
})

const onInput = (event) => {
  const value = parseFloat(event.target.value)
  if (!isNaN(value)) {
    emit('update:modelValue', value)
  }
}

const onChange = (event) => {
  const value = parseFloat(event.target.value)
  if (!isNaN(value)) {
    emit('change', value)
  }
}

const onFocus = (event) => {
  emit('focus', event)
}

const onBlur = (event) => {
  emit('blur', event)
}

const onKeydown = (event) => {
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    increase()
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    decrease()
  }
}

const increase = () => {
  if (canIncrease.value) {
    const newValue = Math.min(props.max, props.modelValue + props.step)
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
}

const decrease = () => {
  if (canDecrease.value) {
    const newValue = Math.max(props.min, props.modelValue - props.step)
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
}
</script>

<style scoped>
.fluent-number-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.fluent-number-box.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.number-box-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.number-box-container {
  position: relative;
  display: flex;
  align-items: center;
}

.number-box-input {
  width: 100%;
  height: 36px;
  padding: 8px 12px;
  padding-right: 40px;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  background: var(--bg-card-solid);
  color: var(--text-primary);
  font-size: 14px;
  font-family: var(--font-ui);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.number-box-input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 2px rgba(0, 120, 212, 0.2);
}

.number-box-input:disabled {
  background: var(--bg-card);
  color: var(--text-muted);
}

.number-box-input::placeholder {
  color: var(--text-muted);
}

.number-box-input::-webkit-inner-spin-button,
.number-box-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.number-box-input[type='number'] {
  -moz-appearance: textfield;
}

.number-box-spin-buttons {
  position: absolute;
  right: 2px;
  top: 2px;
  bottom: 2px;
  width: 32px;
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--border-strong);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  overflow: hidden;
}

.spin-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.spin-button:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.spin-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.spin-button:active {
  background: var(--bg-card);
}

.number-box-error {
  font-size: 12px;
  color: #c42b1c;
}

.number-box-description {
  font-size: 12px;
  color: var(--text-secondary);
}
</style>