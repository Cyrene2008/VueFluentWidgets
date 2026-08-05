<template>
  <div 
    ref="containerRef"
    class="fluent-items-view" 
    :class="{ 'is-selectable': selectionMode !== 'none' }"
    role="listbox"
    :aria-multiselectable="selectionMode === 'multiple'"
  >
    <div class="items-view-layout" :style="layoutStyle">
      <div
        v-for="(item, index) in items"
        :key="getItemKey(item, index)"
        class="items-view-item"
        :class="{
          'is-selected': isSelected(item),
          'is-invokable': itemInvokedEnabled
        }"
        :data-index="index"
        :aria-selected="isSelected(item)"
        :tabindex="0"
        role="option"
        @click="onItemClick(item, index)"
        @dblclick="invokeItem(item, index)"
        @keydown.enter.prevent="invokeItem(item, index)"
        @keydown.space.prevent="onItemClick(item, index)"
      >
        <div v-if="selectionMode === 'multiple'" class="item-checkbox" @click.stop>
          <FluentCheckBox :model-value="isSelected(item)" @update:model-value="onCheckboxChange($event, item)" />
        </div>
        <slot :item="item" :index="index">
          <div class="item-default">
            <span class="item-label">{{ item.label || item.title || String(item) }}</span>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FluentCheckBox from './FluentCheckBox.vue'

const props = defineProps({
  items: { type: Array, required: true },
  layout: { type: String, default: 'stack' }, // stack, grid
  columns: { type: Number, default: 4 },
  selectionMode: { type: String, default: 'none' }, // none, single, multiple
  selectedItems: { type: Array, default: () => [] },
  itemInvokedEnabled: { type: Boolean, default: false },
  itemKey: { type: String, default: 'id' }
})

const emit = defineEmits(['select', 'invoke', 'update:selectedItems'])

const containerRef = ref(null)

const layoutStyle = computed(() => {
  if (props.layout === 'grid') {
    return {
      display: 'grid',
      gridTemplateColumns: `repeat(${props.columns}, 1fr)`,
      gap: '12px'
    }
  }
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  }
})

const getItemKey = (item, index) => {
  if (typeof item === 'object' && item !== null) {
    return item[props.itemKey] || index
  }
  return index
}

const isSelected = (item) => {
  return props.selectedItems.some(selected => {
    if (typeof item === 'object' && typeof selected === 'object') {
      return item[props.itemKey] === selected[props.itemKey]
    }
    return item === selected
  })
}

const onItemClick = (item, index) => {
  if (props.selectionMode === 'none') return
  
  if (props.selectionMode === 'single') {
    emit('update:selectedItems', [item])
    emit('select', { item, index, selected: [item] })
  } else if (props.selectionMode === 'multiple') {
    const newSelected = [...props.selectedItems]
    const existingIndex = newSelected.findIndex(s => {
      if (typeof item === 'object' && typeof s === 'object') {
        return item[props.itemKey] === s[props.itemKey]
      }
      return item === s
    })
    
    if (existingIndex > -1) {
      newSelected.splice(existingIndex, 1)
    } else {
      newSelected.push(item)
    }
    
    emit('update:selectedItems', newSelected)
    emit('select', { item, index, selected: newSelected })
  }
}

const invokeItem = (item, index) => {
  if (props.itemInvokedEnabled) {
    emit('invoke', { item, index })
  }
}

const onCheckboxChange = (checked, item) => {
  const newSelected = [...props.selectedItems]
  const existingIndex = newSelected.findIndex(s => {
    if (typeof item === 'object' && typeof s === 'object') {
      return item[props.itemKey] === s[props.itemKey]
    }
    return item === s
  })
  
  if (checked && existingIndex === -1) {
    newSelected.push(item)
  } else if (!checked && existingIndex > -1) {
    newSelected.splice(existingIndex, 1)
  }
  
  emit('update:selectedItems', newSelected)
}
</script>

<style scoped>
.fluent-items-view {
  width: 100%;
}

.items-view-layout {
  width: 100%;
}

.items-view-item {
  padding: 12px 16px;
  border-radius: var(--radius-md);
  transition: background 0.2s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
}

.items-view-item:hover {
  background: var(--bg-hover);
}

.items-view-item:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.items-view-item.is-selected {
  background: rgba(0, 120, 212, 0.1);
}

.items-view-item.is-invokable {
  cursor: pointer;
}

.items-view-item.is-invokable:active {
  background: rgba(0, 120, 212, 0.2);
}

.item-checkbox {
  flex-shrink: 0;
}

.item-default {
  display: flex;
  align-items: center;
}

.item-label {
  font-size: 14px;
  color: var(--text-primary);
}
</style>