<template>
  <div class="fluent-menu-flyout-wrapper" ref="wrapperRef">
    <div @click="toggle">
      <slot name="trigger"></slot>
    </div>
    
    <Teleport to="body">
      <Transition name="flyout">
        <div v-if="isOpen" class="fluent-menu-flyout-overlay" @click.self="close">
          <div 
            ref="flyoutRef"
            class="fluent-menu-flyout"
            :style="flyoutStyle"
          >
            <template v-for="(item, index) in items" :key="index">
              <div v-if="item.type === 'separator'" class="menu-separator"></div>
              <div v-else-if="item.type === 'header'" class="menu-header">{{ item.label }}</div>
              <button
                v-else
                class="menu-item"
                :class="{ 'is-disabled': item.disabled, 'is-danger': item.danger }"
                :disabled="item.disabled"
                @click="onItemClick(item)"
              >
                <FluentIcon v-if="item.icon" :icon="item.icon" :width="16" class="menu-item-icon" />
                <span class="menu-item-label">{{ item.label }}</span>
                <span v-if="item.shortcut" class="menu-item-shortcut">{{ item.shortcut }}</span>
              </button>
            </template>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: undefined },
  items: { type: Array, required: true },
  placement: { type: String, default: 'bottom-start' }
})

const emit = defineEmits(['update:modelValue', 'select', 'open', 'close'])

const wrapperRef = ref(null)
const flyoutRef = ref(null)
const isOpen = ref(false)
const position = ref({ top: 0, left: 0 })

const flyoutStyle = computed(() => ({
  top: `${position.value.top}px`,
  left: `${position.value.left}px`
}))

const toggle = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    emit('open')
    nextTick(updatePosition)
  } else {
    emit('close')
  }
}

const close = () => {
  isOpen.value = false
  emit('close')
}

const updatePosition = () => {
  if (!wrapperRef.value || !flyoutRef.value) return
  
  const triggerRect = wrapperRef.value.getBoundingClientRect()
  const flyoutRect = flyoutRef.value.getBoundingClientRect()
  const gap = 4
  
  let top = 0
  let left = 0
  
  if (props.placement.includes('bottom')) {
    top = triggerRect.bottom + gap
  } else {
    top = triggerRect.top - flyoutRect.height - gap
  }
  
  if (props.placement.includes('start')) {
    left = triggerRect.left
  } else if (props.placement.includes('end')) {
    left = triggerRect.right - flyoutRect.width
  } else {
    left = triggerRect.left + (triggerRect.width - flyoutRect.width) / 2
  }
  
  // 确保不超出视口
  top = Math.max(gap, Math.min(top, window.innerHeight - flyoutRect.height - gap))
  left = Math.max(gap, Math.min(left, window.innerWidth - flyoutRect.width - gap))
  
  position.value = { top, left }
}

const onItemClick = (item) => {
  if (item.disabled) return
  close()
  emit('select', item)
  if (item.click) {
    item.click()
  }
}

const onKeyDown = (event) => {
  if (event.key === 'Escape' && isOpen.value) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeyDown)
})
</script>

<style scoped>
.fluent-menu-flyout-wrapper {
  display: inline-flex;
}

.fluent-menu-flyout-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
}

.fluent-menu-flyout {
  position: absolute;
  z-index: 1001;
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.14);
  min-width: 200px;
  padding: 4px 0;
}

.menu-separator {
  height: 1px;
  background: var(--border-strong);
  margin: 4px 0;
}

.menu-header {
  padding: 8px 16px 4px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 8px 16px;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 14px;
  font-family: var(--font-ui);
  cursor: pointer;
  transition: background 0.2s ease;
  text-align: left;
}

.menu-item:hover {
  background: var(--bg-hover);
}

.menu-item:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.menu-item.is-danger {
  color: #c42b1c;
}

.menu-item-icon {
  flex-shrink: 0;
  color: var(--text-secondary);
}

.menu-item-label {
  flex: 1;
}

.menu-item-shortcut {
  font-size: 12px;
  color: var(--text-muted);
  margin-left: 24px;
}

.flyout-enter-active {
  transition: all 0.2s ease;
}

.flyout-leave-active {
  transition: all 0.15s ease;
}

.flyout-enter-from,
.flyout-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>