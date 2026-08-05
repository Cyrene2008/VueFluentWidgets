<template>
  <div class="fluent-radio-buttons" :class="{ 'is-disabled': disabled }">
    <div v-if="label" class="radio-buttons-label">{{ label }}</div>
    <div class="radio-buttons-items">
      <label
        v-for="(item, index) in items"
        :key="index"
        class="radio-button-item"
        :class="{ 'is-selected': isSelected(item), 'is-disabled': item.disabled || disabled }"
      >
        <input
          type="radio"
          :name="groupName"
          :value="getItemValue(item)"
          :checked="isSelected(item)"
          :disabled="item.disabled || disabled"
          class="radio-input"
          @change="selectItem(item)"
        />
        <span class="radio-indicator"></span>
        <span class="radio-label">{{ getItemLabel(item) }}</span>
      </label>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: [String, Number, Object], default: null },
  items: { type: Array, required: true },
  label: { type: String, default: '' },
  labelKey: { type: String, default: 'label' },
  valueKey: { type: String, default: 'value' },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'change'])

const groupName = `radio-group-${Math.random().toString(36).substr(2, 9)}`

const getItemLabel = (item) => {
  if (typeof item === 'string') return item
  return item[props.labelKey] || ''
}

const getItemValue = (item) => {
  if (typeof item === 'string') return item
  return item[props.valueKey] || item
}

const isSelected = (item) => {
  if (!props.modelValue) return false
  if (typeof props.modelValue === 'object') {
    return props.modelValue[props.valueKey] === getItemValue(item)
  }
  return props.modelValue === getItemValue(item)
}

const selectItem = (item) => {
  if (props.disabled || item.disabled) return
  const value = getItemValue(item)
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<style scoped>
.fluent-radio-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.fluent-radio-buttons.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.radio-buttons-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.radio-buttons-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.radio-button-item {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 4px 0;
}

.radio-button-item.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.radio-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.radio-indicator {
  width: 20px;
  height: 20px;
  border: 2px solid var(--text-muted);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.radio-indicator::after {
  content: '';
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: transparent;
  transition: background 0.2s ease;
}

.radio-button-item:hover .radio-indicator {
  border-color: var(--accent);
}

.radio-button-item.is-selected .radio-indicator {
  border-color: var(--accent);
}

.radio-button-item.is-selected .radio-indicator::after {
  background: var(--accent);
}

.radio-button-item:focus-visible .radio-indicator {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.radio-label {
  font-size: 14px;
  color: var(--text-primary);
}
</style>