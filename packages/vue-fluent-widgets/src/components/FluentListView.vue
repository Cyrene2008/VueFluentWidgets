<template>
  <div 
    ref="containerRef"
    class="fluent-list-view" 
    :class="{ 
      'is-selectable': selectionMode !== 'none',
      'is-grouped': isGrouped 
    }"
  >
    <div v-if="header" class="list-view-header">
      <slot name="header">
        <span class="header-text">{{ header }}</span>
      </slot>
    </div>
    
    <div class="list-view-items">
      <template v-if="isGrouped">
        <div v-for="(group, gIndex) in items" :key="gIndex" class="list-group">
          <div v-if="showGroupHeaders" class="group-header" :class="{ 'is-sticky': stickyHeaders }">
            <slot name="group-header" :group="group">
              <span class="group-header-text">{{ group.key || group.label }}</span>
            </slot>
          </div>
          <div
            v-for="(item, index) in group.items"
            :key="getItemKey(item, index)"
            class="list-view-item"
            :class="{ 'is-selected': isSelected(item) }"
            @click="onItemClick(item, index)"
          >
            <div v-if="selectionMode !== 'none'" class="item-selection">
              <div v-if="selectionMode === 'multiple'" class="item-checkbox">
                <FluentCheckBox :model-value="isSelected(item)" @update:model-value="onCheckboxChange($event, item)" />
              </div>
              <div v-else class="item-radio" :class="{ 'is-selected': isSelected(item) }"></div>
            </div>
            <slot :item="item" :index="index">
              <div class="item-content">
                <FluentIcon v-if="item.icon" :icon="item.icon" :width="20" />
                <div class="item-text">
                  <span class="item-label">{{ item.label || item.title }}</span>
                  <span v-if="item.description" class="item-description">{{ item.description }}</span>
                </div>
              </div>
            </slot>
          </div>
        </div>
      </template>
      
      <template v-else>
        <div
          v-for="(item, index) in items"
          :key="getItemKey(item, index)"
          class="list-view-item"
          :class="{ 'is-selected': isSelected(item) }"
          @click="onItemClick(item, index)"
          @dblclick="onItemDoubleClick(item, index)"
        >
          <div v-if="selectionMode !== 'none'" class="item-selection">
            <div v-if="selectionMode === 'multiple'" class="item-checkbox">
              <FluentCheckBox :model-value="isSelected(item)" @update:model-value="onCheckboxChange($event, item)" />
            </div>
            <div v-else class="item-radio" :class="{ 'is-selected': isSelected(item) }"></div>
          </div>
          <slot :item="item" :index="index">
            <div class="item-content">
              <FluentIcon v-if="item.icon" :icon="item.icon" :width="20" />
              <div class="item-text">
                <span class="item-label">{{ item.label || item.title }}</span>
                <span v-if="item.description" class="item-description">{{ item.description }}</span>
              </div>
            </div>
          </slot>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FluentIcon from './FluentIcon.vue'
import FluentCheckBox from './FluentCheckBox.vue'

const props = defineProps({
  items: { type: Array, required: true },
  header: { type: String, default: '' },
  selectionMode: { type: String, default: 'none' }, // none, single, multiple
  selectedItems: { type: Array, default: () => [] },
  isGrouped: { type: Boolean, default: false },
  showGroupHeaders: { type: Boolean, default: true },
  stickyHeaders: { type: Boolean, default: false },
  itemKey: { type: String, default: 'id' }
})

const emit = defineEmits(['select', 'invoke', 'update:selectedItems'])

const containerRef = ref(null)

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

const onItemDoubleClick = (item, index) => {
  emit('invoke', { item, index })
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
.fluent-list-view {
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.list-view-header {
  padding: 12px 16px;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-strong);
}

.header-text {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.list-view-items {
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow-y: auto;
}

.group-header {
  padding: 8px 16px;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-strong);
}

.group-header.is-sticky {
  position: sticky;
  top: 0;
  z-index: 1;
}

.group-header-text {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
}

.list-view-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-strong);
  transition: background 0.2s ease;
}

.list-view-item:last-child {
  border-bottom: none;
}

.list-view-item:hover {
  background: var(--bg-hover);
}

.fluent-list-view.is-selectable .list-view-item {
  cursor: pointer;
}

.list-view-item.is-selected {
  background: rgba(0, 120, 212, 0.1);
}

.item-selection {
  margin-right: 12px;
}

.item-radio {
  width: 20px;
  height: 20px;
  border: 2px solid var(--text-muted);
  border-radius: 50%;
  transition: all 0.2s ease;
}

.item-radio.is-selected {
  border-color: var(--accent);
  background: var(--accent);
  box-shadow: inset 0 0 0 4px var(--bg-card);
}

.item-content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.item-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-label {
  font-size: 14px;
  color: var(--text-primary);
}

.item-description {
  font-size: 12px;
  color: var(--text-secondary);
}
</style>
