<template>
  <div class="fluent-pips-pager" :class="{ 'is-disabled': disabled, 'is-vertical': vertical }">
    <button
      v-if="showNavigation"
      class="pager-button previous-button"
      :disabled="disabled || modelValue <= 0"
      @click="previousPage"
      aria-label="上一页"
    >
      <FluentIcon :icon="vertical ? 'chevron-up-20-regular' : 'chevron-left-20-regular'" :width="12" />
    </button>

    <div class="pips-container">
      <div class="pips-track">
        <button
          v-for="page in visiblePages"
          :key="page"
          class="pip"
          :class="{ 'is-selected': page === modelValue }"
          :disabled="disabled"
          @click="selectPage(page)"
          :aria-label="`第 ${page + 1} 页`"
          :aria-current="page === modelValue ? 'page' : undefined"
        >
          <span class="pip-dot"></span>
        </button>
      </div>
    </div>

    <button
      v-if="showNavigation"
      class="pager-button next-button"
      :disabled="disabled || modelValue >= totalPages - 1"
      @click="nextPage"
      aria-label="下一页"
    >
      <FluentIcon :icon="vertical ? 'chevron-down-20-regular' : 'chevron-right-20-regular'" :width="12" />
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  totalPages: { type: Number, required: true },
  maxVisiblePips: { type: Number, default: 7 },
  showNavigation: { type: Boolean, default: true },
  vertical: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'change'])

const visiblePages = computed(() => {
  const pages = []
  const half = Math.floor(props.maxVisiblePips / 2)
  
  let start = Math.max(0, props.modelValue - half)
  let end = Math.min(props.totalPages - 1, start + props.maxVisiblePips - 1)
  
  if (end - start + 1 < props.maxVisiblePips) {
    start = Math.max(0, end - props.maxVisiblePips + 1)
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const selectPage = (page) => {
  if (props.disabled) return
  emit('update:modelValue', page)
  emit('change', page)
}

const previousPage = () => {
  if (props.disabled || props.modelValue <= 0) return
  selectPage(props.modelValue - 1)
}

const nextPage = () => {
  if (props.disabled || props.modelValue >= props.totalPages - 1) return
  selectPage(props.modelValue + 1)
}
</script>

<style scoped>
.fluent-pips-pager {
  display: flex;
  align-items: center;
  gap: 4px;
}

.fluent-pips-pager.is-vertical {
  flex-direction: column;
}

.fluent-pips-pager.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.pager-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.pager-button:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.pager-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pips-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pips-track {
  display: flex;
  gap: 4px;
}

.fluent-pips-pager.is-vertical .pips-track {
  flex-direction: column;
}

.pip {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background 0.2s ease;
}

.pip:hover {
  background: var(--bg-hover);
}

.pip-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-muted);
  transition: background 0.2s ease, transform 0.2s ease;
}

.pip.is-selected .pip-dot {
  background: var(--accent);
  transform: scale(1.25);
}
</style>