<template>
  <div class="fluent-data-grid" :class="{ 'is-loading': loading }">
    <div class="data-grid-toolbar" v-if="$slots.toolbar">
      <slot name="toolbar"></slot>
    </div>
    
    <div class="data-grid-container">
      <table class="data-grid-table">
        <thead>
          <tr>
            <th v-if="selectable" class="grid-header-checkbox">
              <FluentCheckBox 
                :model-value="isAllSelected" 
                @update:model-value="toggleSelectAll"
              />
            </th>
            <th 
              v-for="(column, index) in columns" 
              :key="index"
              class="grid-header-cell"
              :style="getHeaderStyle(column)"
              @click="column.sortable && sortColumn(column)"
            >
              <div class="header-content">
                <span class="header-label">{{ column.label }}</span>
                <FluentIcon 
                  v-if="column.sortable && sortKey === column.key" 
                  :icon="sortDirection === 'asc' ? 'arrow-up-20-regular' : 'arrow-down-20-regular'" 
                  :width="16" 
                  class="sort-icon"
                />
              </div>
            </th>
            <th v-if="$slots.actions" class="grid-header-actions">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(row, rowIndex) in sortedData" 
            :key="rowIndex"
            class="grid-row"
            :class="{ 'is-selected': isRowSelected(row) }"
            @click="selectRow(row)"
          >
            <td v-if="selectable" class="grid-cell-checkbox">
              <FluentCheckBox 
                :model-value="isRowSelected(row)" 
                @update:model-value="toggleRowSelection(row)"
              />
            </td>
            <td 
              v-for="(column, colIndex) in columns" 
              :key="colIndex"
              class="grid-cell"
              :style="getCellStyle(column)"
            >
              <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
                <span>{{ formatCellValue(row[column.key], column) }}</span>
              </slot>
            </td>
            <td v-if="$slots.actions" class="grid-cell-actions">
              <slot name="actions" :row="row"></slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div v-if="paginated" class="data-grid-pagination">
      <div class="pagination-info">
        显示 {{ paginationRange }} 共 {{ filteredData.length }} 条
      </div>
      <div class="pagination-controls">
        <button 
          class="pagination-button"
          :disabled="currentPage <= 1"
          @click="currentPage--"
        >
          <FluentIcon icon="chevron-left-20-regular" :width="16" />
        </button>
        <span class="pagination-page">{{ currentPage }} / {{ totalPages }}</span>
        <button 
          class="pagination-button"
          :disabled="currentPage >= totalPages"
          @click="currentPage++"
        >
          <FluentIcon icon="chevron-right-20-regular" :width="16" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import FluentCheckBox from './FluentCheckBox.vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  data: { type: Array, required: true },
  columns: { type: Array, required: true },
  selectable: { type: Boolean, default: false },
  selectedRows: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  paginated: { type: Boolean, default: false },
  pageSize: { type: Number, default: 10 }
})

const emit = defineEmits(['update:selectedRows', 'row-click', 'row-dblclick', 'sort'])

const sortKey = ref('')
const sortDirection = ref('asc')
const currentPage = ref(1)

const filteredData = computed(() => {
  return props.data
})

const sortedData = computed(() => {
  let data = [...filteredData.value]
  
  if (sortKey.value) {
    data.sort((a, b) => {
      const aVal = a[sortKey.value]
      const bVal = b[sortKey.value]
      
      if (aVal < bVal) return sortDirection.value === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDirection.value === 'asc' ? 1 : -1
      return 0
    })
  }
  
  if (props.paginated) {
    const start = (currentPage.value - 1) * props.pageSize
    data = data.slice(start, start + props.pageSize)
  }
  
  return data
})

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / props.pageSize)
})

const paginationRange = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize + 1
  const end = Math.min(currentPage.value * props.pageSize, filteredData.value.length)
  return `${start}-${end}`
})

const isAllSelected = computed(() => {
  return filteredData.value.length > 0 && 
    filteredData.value.every(row => props.selectedRows.includes(row))
})

const isRowSelected = (row) => {
  return props.selectedRows.includes(row)
}

const selectRow = (row) => {
  if (!props.selectable) return
  emit('row-click', row)
}

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    emit('update:selectedRows', [])
  } else {
    emit('update:selectedRows', [...filteredData.value])
  }
}

const toggleRowSelection = (row) => {
  const newSelection = [...props.selectedRows]
  const index = newSelection.indexOf(row)
  
  if (index > -1) {
    newSelection.splice(index, 1)
  } else {
    newSelection.push(row)
  }
  
  emit('update:selectedRows', newSelection)
}

const sortColumn = (column) => {
  if (sortKey.value === column.key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = column.key
    sortDirection.value = 'asc'
  }
  emit('sort', { key: sortKey.value, direction: sortDirection.value })
}

const formatCellValue = (value, column) => {
  if (column.formatter) {
    return column.formatter(value)
  }
  if (value === null || value === undefined) return ''
  return String(value)
}

const getHeaderStyle = (column) => ({
  width: column.width || 'auto',
  minWidth: column.minWidth || 'auto',
  textAlign: column.align || 'left'
})

const getCellStyle = (column) => ({
  textAlign: column.align || 'left'
})

watch(() => props.paginated, () => {
  currentPage.value = 1
})
</script>

<style scoped>
.fluent-data-grid {
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.fluent-data-grid.is-loading {
  opacity: 0.7;
  pointer-events: none;
}

.data-grid-toolbar {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-strong);
}

.data-grid-container {
  overflow-x: auto;
}

.data-grid-table {
  width: 100%;
  border-collapse: collapse;
}

.grid-header-cell {
  padding: 12px 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-strong);
  white-space: nowrap;
  cursor: default;
}

.grid-header-cell:hover {
  background: var(--bg-hover);
}

.grid-header-checkbox,
.grid-header-actions {
  width: 48px;
  padding: 12px 16px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-strong);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sort-icon {
  color: var(--accent);
}

.grid-row {
  transition: background 0.2s ease;
}

.grid-row:hover {
  background: var(--bg-hover);
}

.grid-row.is-selected {
  background: rgba(0, 120, 212, 0.1);
}

.grid-cell-checkbox,
.grid-cell-actions {
  width: 48px;
  padding: 12px 16px;
  text-align: center;
  border-bottom: 1px solid var(--border-strong);
}

.grid-cell {
  padding: 12px 16px;
  font-size: 14px;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-strong);
}

.data-grid-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-top: 1px solid var(--border-strong);
}

.pagination-info {
  font-size: 14px;
  color: var(--text-secondary);
}

.pagination-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pagination-button {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  cursor: pointer;
  transition: background 0.2s ease;
}

.pagination-button:hover {
  background: var(--bg-hover);
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-page {
  font-size: 14px;
  color: var(--text-primary);
}
</style>