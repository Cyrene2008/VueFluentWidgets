<template>
  <div class="fluent-password-box" :class="{ 'is-disabled': disabled }">
    <div v-if="label" class="password-box-label">{{ label }}</div>
    <div class="password-box-container">
      <input
        ref="inputRef"
        :type="inputType"
        class="password-box-input"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxLength"
        @input="onInput"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
      />
      <button 
        v-if="modelValue && showRevealButton"
        class="password-box-reveal"
        type="button"
        :disabled="disabled"
        @mousedown="startPeek"
        @mouseup="stopPeek"
        @mouseleave="stopPeek"
        @click="toggleVisible"
      >
        <FluentIcon :icon="revealIcon" :width="16" />
      </button>
    </div>
    <div v-if="error" class="password-box-error">{{ error }}</div>
    <div v-if="description" class="password-box-description">{{ description }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '输入密码' },
  disabled: { type: Boolean, default: false },
  maxLength: { type: Number, default: 0 },
  showRevealButton: { type: Boolean, default: true },
  revealMode: { type: String, default: 'peek' },
  error: { type: String, default: '' },
  description: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'change', 'focus', 'blur'])

const inputRef = ref(null)
const isPeeking = ref(false)
const isToggledVisible = ref(false)

const inputType = computed(() => {
  if (props.revealMode === 'visible') return 'text'
  if (isPeeking.value || isToggledVisible.value) return 'text'
  return 'password'
})

const revealIcon = computed(() => {
  if (isPeeking.value || isToggledVisible.value) {
    return 'eye-hide-16-regular'
  }
  return 'eye-16-regular'
})

const onInput = (event) => {
  emit('update:modelValue', event.target.value)
}

const onChange = (event) => {
  emit('change', event.target.value)
}

const onFocus = (event) => {
  emit('focus', event)
}

const onBlur = (event) => {
  emit('blur', event)
}

const startPeek = () => {
  if (props.revealMode === 'peek') {
    isPeeking.value = true
  }
}

const stopPeek = () => {
  isPeeking.value = false
}

const toggleVisible = () => {
  if (props.revealMode === 'click') {
    isToggledVisible.value = !isToggledVisible.value
  }
}
</script>

<style scoped>
.fluent-password-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.fluent-password-box.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.password-box-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.password-box-container {
  position: relative;
  display: flex;
  align-items: center;
}

.password-box-input {
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

.password-box-input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 2px rgba(0, 120, 212, 0.2);
}

.password-box-input:disabled {
  background: var(--bg-card);
  color: var(--text-muted);
}

.password-box-input::placeholder {
  color: var(--text-muted);
}

.password-box-reveal {
  position: absolute;
  right: 8px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.password-box-reveal:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.password-box-reveal:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.password-box-error {
  font-size: 12px;
  color: #c42b1c;
}

.password-box-description {
  font-size: 12px;
  color: var(--text-secondary);
}
</style>