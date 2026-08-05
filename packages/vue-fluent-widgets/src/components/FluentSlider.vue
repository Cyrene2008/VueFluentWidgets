<template>
  <div class="fluent-slider" :class="{ 'is-disabled': disabled, 'is-vertical': vertical }">
    <div v-if="label" class="slider-label">{{ label }}</div>
    <div class="slider-container">
      <input
        type="range"
        class="slider-input"
        :min="min"
        :max="max"
        :step="step"
        :value="modelValue"
        :disabled="disabled"
        :vertical="vertical"
        @input="onInput"
        @change="onChange"
      />
      <div class="slider-track">
        <div class="slider-fill" :style="fillStyle"></div>
      </div>
      <div class="slider-thumb" :style="thumbStyle"></div>
    </div>
    <div v-if="showValue" class="slider-value">{{ modelValue }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: { type: Number, default: 1 },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  vertical: { type: Boolean, default: false },
  showValue: { type: Boolean, default: true }
})

const emit = defineEmits(['update:modelValue', 'change'])

const percentage = computed(() => {
  if (props.max === props.min) return 0
  return ((props.modelValue - props.min) / (props.max - props.min)) * 100
})

const fillStyle = computed(() => {
  if (props.vertical) {
    return { height: `${percentage.value}%` }
  }
  return { width: `${percentage.value}%` }
})

const thumbStyle = computed(() => {
  if (props.vertical) {
    return { bottom: `${percentage.value}%` }
  }
  return { left: `${percentage.value}%` }
})

const onInput = (event) => {
  const value = Number(event.target.value)
  emit('update:modelValue', value)
}

const onChange = (event) => {
  const value = Number(event.target.value)
  emit('change', value)
}
</script>

<style scoped>
.fluent-slider {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 200px;
}

.fluent-slider.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.slider-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.slider-container {
  position: relative;
  height: 32px;
  display: flex;
  align-items: center;
}

.fluent-slider.is-vertical .slider-container {
  width: 32px;
  height: 200px;
  flex-direction: column;
}

.slider-input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
}

.fluent-slider.is-vertical .slider-input {
  writing-mode: vertical-lr;
  direction: rtl;
  width: 100%;
  height: 100%;
}

.slider-track {
  position: absolute;
  width: 100%;
  height: 4px;
  background: var(--border-strong);
  border-radius: 2px;
  overflow: hidden;
}

.fluent-slider.is-vertical .slider-track {
  width: 4px;
  height: 100%;
}

.slider-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 2px;
  transition: width 0.1s ease;
}

.fluent-slider.is-vertical .slider-fill {
  width: 100%;
  height: auto;
  transition: height 0.1s ease;
}

.slider-thumb {
  position: absolute;
  width: 20px;
  height: 20px;
  background: var(--bg-card-solid);
  border: 2px solid var(--accent);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}

.fluent-slider.is-vertical .slider-thumb {
  transform: translate(-50%, 50%);
  left: 50%;
  top: auto;
}

.slider-input:hover ~ .slider-thumb {
  transform: translate(-50%, -50%) scale(1.1);
  box-shadow: 0 0 0 4px rgba(0, 120, 212, 0.1);
}

.fluent-slider.is-vertical .slider-input:hover ~ .slider-thumb {
  transform: translate(-50%, 50%) scale(1.1);
}

.slider-input:active ~ .slider-thumb {
  transform: translate(-50%, -50%) scale(0.95);
}

.fluent-slider.is-vertical .slider-input:active ~ .slider-thumb {
  transform: translate(-50%, 50%) scale(0.95);
}

.slider-value {
  font-size: 14px;
  color: var(--text-secondary);
  text-align: center;
}

.fluent-slider.is-vertical .slider-value {
  text-align: left;
}
</style>