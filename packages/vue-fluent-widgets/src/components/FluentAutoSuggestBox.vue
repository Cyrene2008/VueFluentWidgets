<template>
  <div class="fluent-auto-suggest-box" :class="{ 'is-open': isOpen }">
    <div v-if="label" class="auto-suggest-label">{{ label }}</div>
    <div class="auto-suggest-container">
      <div class="auto-suggest-input-wrapper">
        <FluentIcon v-if="icon" :icon="icon" :width="16" class="auto-suggest-icon" />
        <input
          ref="inputRef"
          type="text"
          class="auto-suggest-input"
          :value="modelValue"
          :placeholder="placeholder"
          :disabled="disabled"
          @input="onInput"
          @focus="onFocus"
          @blur="onBlur"
          @keydown="onKeydown"
        />
        <button 
          v-if="modelValue && clearable"
          class="auto-suggest-clear"
          type="button"
          @mousedown.prevent
          @click="clear"
        >
          <FluentIcon icon="dismiss-16-regular" :width="12" />
        </button>
      </div>
      
      <Transition name="dropdown">
        <div v-if="isOpen && filteredSuggestions.length > 0" class="auto-suggest-dropdown">
          <div 
            v-for="(suggestion, index) in filteredSuggestions" 
            :key="index"
            class="auto-suggest-item"
            :class="{ 'is-highlighted': highlightedIndex === index }"
            @mousedown.prevent
            @click="selectSuggestion(suggestion)"
            @mouseenter="highlightedIndex = index"
          >
            <slot name="suggestion" :suggestion="suggestion">
              <span class="auto-suggest-item-text">{{ getSuggestionText(suggestion) }}</span>
            </slot>
          </div>
        </div>
      </Transition>
    </div>
    <div v-if="error" class="auto-suggest-error">{{ error }}</div>
    <div v-if="description" class="auto-suggest-description">{{ description }}</div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  suggestions: { type: Array, default: () => [] },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '' },
  icon: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  clearable: { type: Boolean, default: true },
  valueKey: { type: String, default: '' },
  filterMethod: { type: Function, default: null },
  error: { type: String, default: '' },
  description: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'change', 'select', 'search', 'focus', 'blur'])

const inputRef = ref(null)
const isOpen = ref(false)
const highlightedIndex = ref(-1)

const filteredSuggestions = computed(() => {
  if (!props.modelValue) return props.suggestions
  
  if (props.filterMethod) {
    return props.filterMethod(props.modelValue, props.suggestions)
  }
  
  const query = props.modelValue.toLowerCase()
  return props.suggestions.filter(suggestion => {
    const text = getSuggestionText(suggestion).toLowerCase()
    return text.includes(query)
  })
})

const getSuggestionText = (suggestion) => {
  if (typeof suggestion === 'string' || typeof suggestion === 'number') {
    return String(suggestion)
  }
  if (props.valueKey && suggestion[props.valueKey]) {
    return String(suggestion[props.valueKey])
  }
  return String(suggestion)
}

const onInput = (event) => {
  const value = event.target.value
  emit('update:modelValue', value)
  emit('change', value)
  emit('search', value)
  highlightedIndex.value = -1
}

const onFocus = (event) => {
  isOpen.value = true
  emit('focus', event)
}

const onBlur = (event) => {
  setTimeout(() => {
    isOpen.value = false
    highlightedIndex.value = -1
  }, 200)
  emit('blur', event)
}

const onKeydown = (event) => {
  if (!isOpen.value) return
  
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      highlightedIndex.value = Math.min(highlightedIndex.value + 1, filteredSuggestions.value.length - 1)
      break
    case 'ArrowUp':
      event.preventDefault()
      highlightedIndex.value = Math.max(highlightedIndex.value - 1, -1)
      break
    case 'Enter':
      event.preventDefault()
      if (highlightedIndex.value >= 0) {
        selectSuggestion(filteredSuggestions.value[highlightedIndex.value])
      }
      break
    case 'Escape':
      isOpen.value = false
      highlightedIndex.value = -1
      break
  }
}

const selectSuggestion = (suggestion) => {
  const value = getSuggestionText(suggestion)
  emit('update:modelValue', value)
  emit('change', value)
  emit('select', suggestion)
  isOpen.value = false
  highlightedIndex.value = -1
}

const clear = () => {
  emit('update:modelValue', '')
  emit('change', '')
  inputRef.value?.focus()
}

watch(() => props.modelValue, () => {
  highlightedIndex.value = -1
})
</script>

<style scoped>
.fluent-auto-suggest-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.auto-suggest-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.auto-suggest-container {
  position: relative;
}

.auto-suggest-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.auto-suggest-icon {
  position: absolute;
  left: 12px;
  color: var(--text-muted);
  pointer-events: none;
}

.auto-suggest-input {
  width: 100%;
  height: 36px;
  padding: 8px 12px;
  padding-left: 36px;
  padding-right: 36px;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  background: var(--bg-card-solid);
  color: var(--text-primary);
  font-size: 14px;
  font-family: var(--font-ui);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.auto-suggest-input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 2px rgba(0, 120, 212, 0.2);
}

.auto-suggest-input:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.auto-suggest-input::placeholder {
  color: var(--text-muted);
}

.auto-suggest-clear {
  position: absolute;
  right: 8px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  color: var(--text-muted);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.auto-suggest-clear:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.auto-suggest-dropdown {
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

.auto-suggest-item {
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.auto-suggest-item:hover {
  background: var(--bg-hover);
}

.auto-suggest-item.is-highlighted {
  background: var(--accent);
  color: var(--text-on-accent);
}

.auto-suggest-item-text {
  font-size: 14px;
  line-height: 20px;
}

.auto-suggest-error {
  font-size: 12px;
  color: #c42b1c;
}

.auto-suggest-description {
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