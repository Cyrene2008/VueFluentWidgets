<template>
  <div class="fluent-list-box" :class="{ 'is-multiple': multiple }">
    <div class="list-box-items">
      <div 
        v-for="(item, index) in items" 
        :key="index"
        class="list-box-item"
        :class="{ 'is-selected': isSelected(item, index) }"
        @click="selectItem(item, index)"
      >
        <slot name="item" :item="item" :index="index">
          <span class="list-box-item-label">{{ getItemLabel(item) }}</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  items: { type: Array, required: true },
  modelValue: { type: [Object, String, Number, Boolean, Array], default: null },
  selectedIndex: { type: Number, default: -1 },
  multiple: { type: Boolean, default: false },
  labelKey: { type: String, default: 'label' },
  valueKey: { type: String, default: 'value' }
})

const emit = defineEmits(['update:modelValue', 'update:selectedIndex', 'change'])

const isSelected = (item, index) => {
  if (props.multiple && Array.isArray(props.modelValue)) {
    return props.modelValue.some(selected => isSame(selected, item))
  }
  return props.selectedIndex === index || isSame(props.modelValue, item)
}

const isSame = (a, b) => {
  if (typeof a === 'object' && a !== null && typeof b === 'object' && b !== null) {
    return a[props.valueKey] === b[props.valueKey]
  }
  return a === b
}

const getItemLabel = (item) => {
  if (typeof item === 'object' && item !== null) {
    return item[props.labelKey] || item[props.valueKey] || String(item)
  }
  return String(item)
}

const selectItem = (item, index) => {
  if (props.multiple) {
    const current = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const existingIndex = current.findIndex(selected => isSame(selected, item))
    
    if (existingIndex > -1) {
      current.splice(existingIndex, 1)
    } else {
      current.push(item)
    }
    
    emit('update:modelValue', current)
    emit('change', current)
  } else {
    emit('update:modelValue', item)
    emit('update:selectedIndex', index)
    emit('change', { item, index })
  }
}
</script>

<style scoped>
.fluent-list-box {
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  background: var(--bg-card);
  overflow: hidden;
}

.list-box-items {
  display: flex;
  flex-direction: column;
}

.list-box-item {
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
  border-bottom: 1px solid var(--border-strong);
}

.list-box-item:last-child {
  border-bottom: none;
}

.list-box-item:hover {
  background: var(--bg-hover);
}

.list-box-item.is-selected {
  background: var(--accent);
  color: var(--text-on-accent);
}

.list-box-item-label {
  font-size: 14px;
  line-height: 20px;
}
</style>