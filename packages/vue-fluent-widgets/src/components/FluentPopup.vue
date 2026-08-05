<template>
  <Teleport to="body">
    <Transition name="popup">
      <div 
        v-if="isOpen" 
        class="fluent-popup-overlay"
        @click.self="closeOnOverlay && close()"
      >
        <div 
          ref="popupRef"
          class="fluent-popup"
          :class="[`placement-${placement}`]"
          :style="popupStyle"
        >
          <slot></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  placement: { type: String, default: 'bottom' },
  target: { type: [Object, String], default: null },
  offset: { type: Number, default: 8 },
  closeOnOverlay: { type: Boolean, default: true },
  closeOnEscape: { type: Boolean, default: true }
})

const emit = defineEmits(['update:modelValue', 'open', 'close'])

const popupRef = ref(null)
const position = ref({ top: 0, left: 0 })

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
    if (value) {
      emit('open')
      nextTick(updatePosition)
    } else {
      emit('close')
    }
  }
})

const popupStyle = computed(() => ({
  top: `${position.value.top}px`,
  left: `${position.value.left}px`
}))

const updatePosition = () => {
  if (!popupRef.value) return
  
  let targetEl = null
  if (props.target) {
    targetEl = typeof props.target === 'string' 
      ? document.querySelector(props.target) 
      : props.target
  }
  
  if (!targetEl) {
    position.value = { top: window.innerHeight / 2, left: window.innerWidth / 2 }
    return
  }
  
  const rect = targetEl.getBoundingClientRect()
  const popupRect = popupRef.value.getBoundingClientRect()
  
  let top = 0
  let left = 0
  
  switch (props.placement) {
    case 'top':
      top = rect.top - popupRect.height - props.offset
      left = rect.left + (rect.width - popupRect.width) / 2
      break
    case 'bottom':
      top = rect.bottom + props.offset
      left = rect.left + (rect.width - popupRect.width) / 2
      break
    case 'left':
      top = rect.top + (rect.height - popupRect.height) / 2
      left = rect.left - popupRect.width - props.offset
      break
    case 'right':
      top = rect.top + (rect.height - popupRect.height) / 2
      left = rect.right + props.offset
      break
  }
  
  // 确保不超出视口
  top = Math.max(props.offset, Math.min(top, window.innerHeight - popupRect.height - props.offset))
  left = Math.max(props.offset, Math.min(left, window.innerWidth - popupRect.width - props.offset))
  
  position.value = { top, left }
}

const close = () => {
  isOpen.value = false
}

const onKeyDown = (event) => {
  if (event.key === 'Escape' && props.closeOnEscape && isOpen.value) {
    close()
  }
}

watch(() => props.modelValue, (value) => {
  if (value) {
    nextTick(updatePosition)
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
.fluent-popup-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
}

.fluent-popup {
  position: absolute;
  z-index: 1001;
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.14);
  min-width: 100px;
  min-height: 50px;
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
}

.popup-enter-active {
  transition: all 0.2s ease;
}

.popup-leave-active {
  transition: all 0.15s ease;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>