<template>
  <button
    class="fluent-repeat-button"
    :class="{ 'is-disabled': disabled }"
    :disabled="disabled"
    @pointerdown="start"
    @pointerup="stop"
    @pointerleave="stop"
    @pointercancel="stop"
    @contextmenu.prevent
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup>
import { onBeforeUnmount } from 'vue'

const props = defineProps({
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  delay: { type: Number, default: 500 },
  interval: { type: Number, default: 100 }
})

const emit = defineEmits(['click'])

let delayTimer = null
let intervalTimer = null

const start = (event) => {
  if (props.disabled) return
  
  event.currentTarget.setPointerCapture(event.pointerId)
  
  emit('click')
  
  delayTimer = setTimeout(() => {
    intervalTimer = setInterval(() => {
      emit('click')
    }, props.interval)
  }, props.delay)
}

const stop = () => {
  if (delayTimer) {
    clearTimeout(delayTimer)
    delayTimer = null
  }
  if (intervalTimer) {
    clearInterval(intervalTimer)
    intervalTimer = null
  }
}

onBeforeUnmount(() => {
  stop()
})
</script>

<style scoped>
.fluent-repeat-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0 16px;
  background: var(--bg-card-solid);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 14px;
  font-family: var(--font-ui);
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.fluent-repeat-button:hover {
  background: var(--bg-hover);
  border-color: var(--text-muted);
}

.fluent-repeat-button:active {
  background: var(--bg-card);
}

.fluent-repeat-button.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>