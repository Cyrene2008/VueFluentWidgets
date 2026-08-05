<template>
  <div class="fluent-command-bar-flyout-wrapper" ref="wrapperRef">
    <div @click="toggle">
      <slot name="trigger"></slot>
    </div>
    
    <Teleport to="body">
      <Transition name="flyout">
        <div v-if="isOpen" class="fluent-command-bar-flyout-overlay" @click.self="close">
          <div 
            ref="flyoutRef"
            class="fluent-command-bar-flyout"
            :style="flyoutStyle"
          >
            <div class="flyout-commands">
              <template v-for="(command, index) in commands" :key="index">
                <div v-if="command.type === 'separator'" class="command-separator"></div>
                <button
                  v-else
                  class="command-item"
                  :class="{ 'is-disabled': command.disabled }"
                  :disabled="command.disabled"
                  @click="onCommandClick(command)"
                >
                  <FluentIcon v-if="command.icon" :icon="command.icon" :width="16" />
                  <span class="command-label">{{ command.label }}</span>
                </button>
              </template>
            </div>
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
  commands: { type: Array, required: true },
  placement: { type: String, default: 'bottom-end' }
})

const emit = defineEmits(['command', 'open', 'close'])

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
  
  if (props.placement.includes('end')) {
    left = triggerRect.right - flyoutRect.width
  } else {
    left = triggerRect.left
  }
  
  // 确保不超出视口
  top = Math.max(gap, Math.min(top, window.innerHeight - flyoutRect.height - gap))
  left = Math.max(gap, Math.min(left, window.innerWidth - flyoutRect.width - gap))
  
  position.value = { top, left }
}

const onCommandClick = (command) => {
  if (command.disabled) return
  close()
  emit('command', command)
  if (command.click) {
    command.click()
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
.fluent-command-bar-flyout-wrapper {
  display: inline-flex;
}

.fluent-command-bar-flyout-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
}

.fluent-command-bar-flyout {
  position: absolute;
  z-index: 1001;
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.14);
  min-width: 200px;
  padding: 4px 0;
}

.command-separator {
  height: 1px;
  background: var(--border-strong);
  margin: 4px 0;
}

.command-item {
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

.command-item:hover {
  background: var(--bg-hover);
}

.command-item:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.command-label {
  flex: 1;
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