<template>
  <div class="fluent-combo-box" :class="{ 'is-open': isOpen, 'is-disabled': disabled }">
    <div v-if="label" class="combo-box-label">{{ label }}</div>
    <div class="combo-box-container" ref="containerRef">
      <div class="combo-box-input" @click="toggleDropdown">
        <input
          ref="inputRef"
          type="text"
          :value="displayText"
          :placeholder="placeholder"
          :disabled="disabled"
          readonly
          class="combo-box-field"
        />
        <FluentIcon icon="chevron-down-20-regular" :width="16" class="combo-box-chevron" />
      </div>
      
      <Transition name="dropdown">
        <div v-if="isOpen" class="combo-box-dropdown">
          <div class="dropdown-items">
            <div
              v-for="(item, index) in items"
              :key="index"
              class="dropdown-item"
              :class="{ 'is-selected': isSelected(item), 'is-highlighted': highlightedIndex === index }"
              @click="selectItem(item)"
              @mouseenter="highlightedIndex = index"
            >
              <slot name="item" :item="item">
                <span>{{ getItemLabel(item) }}</span>
              </slot>
            </div>
          </div>
        </div>
      </Transition>
    </div>
    <div v-if="error" class="combo-box-error">{{ error }}</div>
    <div v-if="description" class="combo-box-description">{{ description }}</div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  modelValue: { type: [String, Number, Object], default: null },
  items: { type: Array, required: true },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '请选择' },
  labelKey: { type: String, default: 'label' },
  valueKey: { type: String, default: 'value' },
  disabled: { type: Boolean, default: false },
  error: { type: String, default: '' },
  description: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'change'])

const containerRef = ref(null)
const inputRef = ref(null)
const isOpen = ref(false)
const highlightedIndex = ref(-1)

const displayText = computed(() => {
  if (!props.modelValue) return ''
  if (typeof props.modelValue === 'object') {
    return props.modelValue[props.labelKey] || ''
  }
  const item = props.items.find(i => getItemValue(i) === props.modelValue)
  return item ? getItemLabel(item) : ''
})

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

const toggleDropdown = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    highlightedIndex.value = props.items.findIndex(i => isSelected(i))
  }
}

const selectItem = (item) => {
  const value = getItemValue(item)
  emit('update:modelValue', value)
  emit('change', value)
  isOpen.value = false
}

const onClickOutside = (event) => {
  if (!event.target.closest('.fluent-combo-box')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>

<style scoped>
.fluent-combo-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.fluent-combo-box.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.combo-box-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.combo-box-container {
  position: relative;
}

.combo-box-input {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.combo-box-field {
  flex: 1;
  height: 36px;
  padding: 8px 12px;
  padding-right: 36px;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  background: var(--bg-card-solid);
  color: var(--text-primary);
  font-size: 14px;
  font-family: var(--font-ui);
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.combo-box-field:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 2px rgba(0, 120, 212, 0.2);
}

.combo-box-chevron {
  position: absolute;
  right: 10px;
  color: var(--text-muted);
  pointer-events: none;
  transition: transform 0.2s ease;
}

.fluent-combo-box.is-open .combo-box-chevron {
  transform: rotate(180deg);
}

.combo-box-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  margin-top: 4px;
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.14);
  max-height: 200px;
  overflow-y: auto;
}

.dropdown-items {
  padding: 4px 0;
}

.dropdown-item {
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: 14px;
  color: var(--text-primary);
}

.dropdown-item:hover,
.dropdown-item.is-highlighted {
  background: var(--bg-hover);
}

.dropdown-item.is-selected {
  background: rgba(0, 120, 212, 0.1);
  color: var(--accent);
}

.combo-box-error {
  font-size: 12px;
  color: #c42b1c;
}

.combo-box-description {
  font-size: 12px;
  color: var(--text-secondary);
}

.dropdown-enter-active {
  transition: all 0.2s ease;
}

.dropdown-leave-active {
  transition: all 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>