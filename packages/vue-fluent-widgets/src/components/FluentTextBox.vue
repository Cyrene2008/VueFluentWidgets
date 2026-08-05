<template>
  <div class="fluent-text-box" :class="{ 'is-disabled': disabled, 'is-focused': isFocused }">
    <div v-if="label" class="text-box-label">{{ label }}</div>
    <div class="text-box-container">
      <div v-if="prefix || $slots.prefix" class="text-box-prefix">
        <slot name="prefix">{{ prefix }}</slot>
      </div>
      <input
        ref="inputRef"
        :type="type"
        class="text-box-input"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxLength"
        @input="onInput"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
        @keydown="onKeydown"
      />
      <div v-if="suffix || $slots.suffix" class="text-box-suffix">
        <slot name="suffix">{{ suffix }}</slot>
      </div>
      <button v-if="clearable && modelValue" class="text-box-clear" @click="clear">
        <FluentIcon icon="dismiss-16-regular" :width="12" />
      </button>
    </div>
    <div v-if="error" class="text-box-error">{{ error }}</div>
    <div v-if="description" class="text-box-description">{{ description }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  modelValue: { type: [String, Number], default: '' },
  type: { type: String, default: 'text' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  clearable: { type: Boolean, default: false },
  maxLength: { type: Number, default: undefined },
  error: { type: String, default: '' },
  description: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'change', 'focus', 'blur', 'keydown', 'clear'])

const inputRef = ref(null)
const isFocused = ref(false)

const onInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const onChange = (event) => {
  emit('change', event.target.value)
}

const onFocus = (event) => {
  isFocused.value = true
  emit('focus', event)
}

const onBlur = (event) => {
  isFocused.value = false
  emit('blur', event)
}

const onKeydown = (event) => {
  emit('keydown', event)
}

const clear = () => {
  emit('update:modelValue', '')
  emit('change', '')
  emit('clear')
  inputRef.value?.focus()
}

const focus = () => {
  inputRef.value?.focus()
}

const blur = () => {
  inputRef.value?.blur()
}

defineExpose({ focus, blur })
</script>

<style scoped>
.fluent-text-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.fluent-text-box.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.text-box-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.text-box-container {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  background: var(--bg-card-solid);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.text-box-container:hover {
  border-color: var(--text-muted);
}

.fluent-text-box.is-focused .text-box-container {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px rgba(0, 120, 212, 0.2);
}

.text-box-prefix,
.text-box-suffix {
  padding: 0 12px;
  color: var(--text-muted);
  font-size: 14px;
}

.text-box-input {
  flex: 1;
  height: 36px;
  padding: 8px 12px;
  border: none;
  background: transparent;
  color: var(--text-primary);
  font-size: 14px;
  font-family: var(--font-ui);
  outline: none;
}

.text-box-input::placeholder {
  color: var(--text-muted);
}

.text-box-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: 8px;
  background: transparent;
  border: none;
  border-radius: 50%;
  color: var(--text-muted);
  cursor: pointer;
  transition: background 0.2s ease;
}

.text-box-clear:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.text-box-error {
  font-size: 12px;
  color: #c42b1c;
}

.text-box-description {
  font-size: 12px;
  color: var(--text-secondary);
}
</style>