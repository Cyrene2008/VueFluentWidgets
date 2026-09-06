<template>
  <div class="fluent-flyout-wrapper" ref="wrapperRef">
    <div class="flyout-trigger" @click="toggle">
      <slot name="trigger">
        <FluentButton>打开弹出框</FluentButton>
      </slot>
    </div>
    
    <Teleport to="body">
      <Transition name="flyout">
        <div v-if="isOpen" class="fluent-flyout-overlay" @click.self="closeOnOverlay">
          <div 
            ref="flyoutRef"
            class="fluent-flyout"
            :class="[`placement-${placement}`]"
            :style="flyoutStyle"
          >
            <div v-if="title" class="flyout-header">
              <h3 class="flyout-title">{{ title }}</h3>
              <button v-if="closable" class="flyout-close" @click="close">
                <FluentIcon icon="dismiss-16-regular" :width="16" />
              </button>
            </div>
            <div class="flyout-content">
              <slot></slot>
            </div>
            <div v-if="$slots.footer" class="flyout-footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import FluentIcon from './FluentIcon.vue'
import FluentButton from './FluentButton.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: undefined },
  title: { type: String, default: '' },
  placement: { type: String, default: 'bottom' },
  closable: { type: Boolean, default: true },
  closeOnEscape: { type: Boolean, default: true },
  closeOnOverlay: { type: Boolean, default: true }
})

const emit = defineEmits(['update:modelValue', 'open', 'close'])

const wrapperRef = ref(null)
const flyoutRef = ref(null)
const localIsOpen = ref(false)
const position = ref({ top: 0, left: 0 })

const isOpen = computed(() => props.modelValue ?? localIsOpen.value)

const flyoutStyle = computed(() => ({
  top: `${position.value.top}px`,
  left: `${position.value.left}px`
}))

const toggle = () => {
  if (isOpen.value) {
    close()
  } else {
    open()
  }
}

const open = () => {
  localIsOpen.value = true
  emit('update:modelValue', true)
  emit('open')
  nextTick(() => {
    updatePosition()
  })
}

const close = () => {
  localIsOpen.value = false
  emit('update:modelValue', false)
  emit('close')
}

const updatePosition = () => {
  if (!wrapperRef.value || !flyoutRef.value) return
  
  const triggerRect = wrapperRef.value.getBoundingClientRect()
  const flyoutRect = flyoutRef.value.getBoundingClientRect()
  const gap = 8
  
  let top = 0
  let left = 0
  
  switch (props.placement) {
    case 'top':
      top = triggerRect.top - flyoutRect.height - gap
      left = triggerRect.left + (triggerRect.width - flyoutRect.width) / 2
      break
    case 'bottom':
      top = triggerRect.bottom + gap
      left = triggerRect.left + (triggerRect.width - flyoutRect.width) / 2
      break
    case 'left':
      top = triggerRect.top + (triggerRect.height - flyoutRect.height) / 2
      left = triggerRect.left - flyoutRect.width - gap
      break
    case 'right':
      top = triggerRect.top + (triggerRect.height - flyoutRect.height) / 2
      left = triggerRect.right + gap
      break
  }
  
  // 确保不超出视口
  top = Math.max(gap, Math.min(top, window.innerHeight - flyoutRect.height - gap))
  left = Math.max(gap, Math.min(left, window.innerWidth - flyoutRect.width - gap))
  
  position.value = { top, left }
}

const onKeyDown = (event) => {
  if (event.key === 'Escape' && props.closeOnEscape && isOpen.value) {
    close()
  }
}

watch(() => props.modelValue, (value) => {
  if (value) {
    nextTick(() => updatePosition())
  }
})

onMounted(() => {
  document.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeyDown)
})
</script>

<style scoped>
.fluent-flyout-wrapper {
  display: inline-flex;
}

.flyout-trigger {
  cursor: pointer;
}

.fluent-flyout-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
}

.fluent-flyout {
  position: absolute;
  z-index: 1001;
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.14);
  min-width: 200px;
  max-width: 400px;
  max-height: 80vh;
  overflow: hidden;
}

.flyout-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid var(--border-strong);
}

.flyout-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.flyout-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: background 0.2s ease;
}

.flyout-close:hover {
  background: var(--bg-hover);
}

.flyout-content {
  padding: 16px;
  overflow-y: auto;
  max-height: calc(80vh - 120px);
}

.flyout-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid var(--border-strong);
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
