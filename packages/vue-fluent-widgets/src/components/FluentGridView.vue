<template>
  <div 
    ref="containerRef"
    class="fluent-grid-view" 
    :class="{ 
      'is-selectable': selectionMode !== 'none',
      'is-dragging': isDragging 
    }"
  >
    <div class="grid-view-items" :style="gridStyle">
      <div
        v-for="(item, index) in items"
        :key="getItemKey(item, index)"
        class="grid-view-item"
        :class="{
          'is-selected': isSelected(item),
          'is-dragging-source': isDragging && dragIndices.includes(index)
        }"
        :draggable="canDrag"
        @click="onItemClick(item, index)"
        @dblclick="onItemDoubleClick(item, index)"
        @dragstart="onDragStart($event, index)"
        @dragend="onDragEnd"
        @dragover.prevent="onDragOver($event, index)"
        @drop.prevent="onDrop($event, index)"
      >
        <div v-if="selectionMode === 'multiple'" class="item-checkbox" @click.stop>
          <FluentCheckBox :model-value="isSelected(item)" @update:model-value="onCheckboxChange($event, item)" />
        </div>
        <slot :item="item" :index="index">
          <div class="grid-item-default">
            <FluentIcon v-if="item.icon" :icon="item.icon" :width="24" />
            <span class="grid-item-label">{{ item.label || item.title }}</span>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FluentIcon from './FluentIcon.vue'
import FluentCheckBox from './FluentCheckBox.vue'

const props = defineProps({
  items: { type: Array, required: true },
  columns: { type: Number, default: 4 },
  selectionMode: { type: String, default: 'none' }, // none, single, multiple
  selectedItems: { type: Array, default: () => [] },
  canDrag: { type: Boolean, default: false },
  canReorder: { type: Boolean, default: false },
  itemKey: { type: String, default: 'id' },
  itemWidth: { type: [String, Number], default: 'auto' }
})

const emit = defineEmits(['select', 'invoke', 'update:selectedItems', 'reorder'])

const containerRef = ref(null)
const isDragging = ref(false)
const dragIndices = ref([])
const dragOverIndex = ref(-1)

const gridStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: props.itemWidth === 'auto' 
    ? `repeat(${props.columns}, 1fr)` 
    : `repeat(auto-fill, minmax(${typeof props.itemWidth === 'number' ? props.itemWidth + 'px' : props.itemWidth}, 1fr))`,
  gap: '12px'
}))

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

const onDragStart = (event, index) => {
  if (!props.canDrag) return
  isDragging.value = true
  dragIndices.value = [index]
  event.dataTransfer.effectAllowed = 'move'
}

const onDragEnd = () => {
  isDragging.value = false
  dragIndices.value = []
  dragOverIndex.value = -1
}

const onDragOver = (event, index) => {
  if (!props.canReorder) return
  dragOverIndex.value = index
}

const onDrop = (event, index) => {
  if (!props.canReorder || dragIndices.value.length === 0) return
  emit('reorder', { from: dragIndices.value[0], to: index })
}
</script>

<style scoped>
.fluent-grid-view {
  width: 100%;
}

.grid-view-items {
  width: 100%;
}

.grid-view-item {
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  position: relative;
}

.fluent-grid-view.is-selectable .grid-view-item {
  cursor: pointer;
}

.grid-view-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-4);
}

.grid-view-item.is-selected {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.grid-view-item.is-dragging-source {
  opacity: 0.5;
}

.item-checkbox {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 1;
}

.grid-item-default {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  min-height: 100px;
}

.grid-item-label {
  font-size: 14px;
  color: var(--text-primary);
  text-align: center;
}
</style>