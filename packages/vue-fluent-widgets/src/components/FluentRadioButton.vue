<template>
  <div class="fluent-radio-buttons" :class="{ 'is-disabled': disabled }">
    <div v-if="label" class="radio-buttons-label">{{ label }}</div>
    <div class="radio-buttons-items">
      <label
        v-for="(item, index) in normalizedItems"
        :key="index"
        class="fluent-radio-button"
        :class="{ 'is-checked': selectedIndex === index, 'is-disabled': disabled }"
      >
        <input
          class="radio-input"
          type="radio"
          :name="groupName"
          :checked="selectedIndex === index"
          :disabled="disabled"
          @change="select(index)"
        />
        <span class="radio-glyph">
          <span v-if="selectedIndex === index" class="radio-check"></span>
        </span>
        <span class="radio-content">{{ item.label }}</span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: [String, Number, Boolean, Object], default: undefined },
  items: { type: Array, required: true },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  selectedIndex: { type: Number, default: undefined }
})

const emit = defineEmits(['update:modelValue', 'update:selectedIndex', 'change'])

const groupName = `fluent-radio-buttons-${Math.random().toString(36).slice(2)}`

const normalizedItems = computed(() => {
  return props.items.map(item => {
    if (typeof item === 'string' || typeof item === 'number') {
      return { label: String(item), value: item }
    }
    return {
      label: item.label || item.text || String(item.value),
      value: item.value
    }
  })
})

const selectedIndex = computed(() => {
  if (props.selectedIndex !== undefined) return props.selectedIndex
  if (props.modelValue !== undefined) {
    return normalizedItems.value.findIndex(item => item.value === props.modelValue)
  }
  return -1
})

const select = (index) => {
  if (props.disabled) return
  
  const item = normalizedItems.value[index]
  emit('update:modelValue', item.value)
  emit('update:selectedIndex', index)
  emit('change', { value: item.value, index })
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

.fluent-radio-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  user-select: none;
  min-height: 32px;
  padding: 4px 0;
}

.fluent-radio-button.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.radio-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.radio-glyph {
  width: 20px;
  height: 20px;
  border: 2px solid var(--text-secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.fluent-radio-button:hover .radio-glyph {
  border-color: var(--accent);
}

.fluent-radio-button.is-checked .radio-glyph {
  border-color: var(--accent);
  border-width: 2px;
}

.radio-check {
  width: 10px;
  height: 10px;
  background: var(--accent);
  border-radius: 50%;
}

.radio-content {
  font-size: 14px;
  color: var(--text-primary);
  line-height: 20px;
}

.fluent-radio-button:focus-visible .radio-glyph {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
</style>