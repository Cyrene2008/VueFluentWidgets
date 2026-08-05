<template>
  <Teleport to="body">
    <Transition name="teaching-tip">
      <div
        v-if="isOpen"
        ref="tipRef"
        class="fluent-teaching-tip"
        :class="[`placement-${placement}`]"
        :style="tipStyle"
        role="dialog"
      >
        <div v-if="icon" class="teaching-tip-icon">
          <FluentIcon :icon="icon" :width="24" />
        </div>
        <div class="teaching-tip-content">
          <h3 v-if="title" class="teaching-tip-title">{{ title }}</h3>
          <p v-if="subtitle" class="teaching-tip-subtitle">{{ subtitle }}</p>
          <div class="teaching-tip-body">
            <slot></slot>
          </div>
        </div>
        <button v-if="closable" class="teaching-tip-close" @click="close">
          <FluentIcon icon="dismiss-16-regular" :width="16" />
        </button>
        <div v-if="$slots.actions" class="teaching-tip-actions">
          <slot name="actions"></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: undefined },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  icon: { type: String, default: '' },
  target: { type: [String, Object], default: null },
  placement: { type: String, default: 'bottom' },
  closable: { type: Boolean, default: true },
  closeOnEscape: { type: Boolean, default: true },
  closeOnOverlay: { type: Boolean, default: true }
})

const emit = defineEmits(['update:modelValue', 'open', 'close'])

const tipRef = ref(null)
const localIsOpen = ref(false)

const isOpen = computed(() => props.modelValue ?? localIsOpen.value)

const tipStyle = ref({ visibility: 'hidden' })

const targetElement = () => {
  const target = typeof props.target === 'string' ? document.querySelector(props.target) : props.target
  return target?.$el || target
}

const updatePosition = async () => {
  if (!isOpen.value) return
  await nextTick()
  const target = targetElement()
  const tip = tipRef.value
  if (!target || !tip?.getBoundingClientRect) return
  const targetRect = target.getBoundingClientRect()
  const tipRect = tip.getBoundingClientRect()
  const gap = 12
  let top = targetRect.bottom + gap
  let left = targetRect.left + (targetRect.width - tipRect.width) / 2
  if (props.placement === 'top') top = targetRect.top - tipRect.height - gap
  if (props.placement === 'left') {
    top = targetRect.top + (targetRect.height - tipRect.height) / 2
    left = targetRect.left - tipRect.width - gap
  }
  if (props.placement === 'right') {
    top = targetRect.top + (targetRect.height - tipRect.height) / 2
    left = targetRect.right + gap
  }
  left = Math.max(12, Math.min(window.innerWidth - tipRect.width - 12, left))
  top = Math.max(12, Math.min(window.innerHeight - tipRect.height - 12, top))
  tipStyle.value = { top: `${top}px`, left: `${left}px`, visibility: 'visible' }
}

const open = () => {
  localIsOpen.value = true
  emit('update:modelValue', true)
  emit('open')
}

const close = () => {
  localIsOpen.value = false
  emit('update:modelValue', false)
  emit('close')
}

const onKeyDown = (event) => {
  if (event.key === 'Escape' && props.closeOnEscape && isOpen.value) {
    close()
  }
}

const onPointerDown = event => {
  if (!isOpen.value || !props.closeOnOverlay) return
  const target = targetElement()
  if (!tipRef.value?.contains(event.target) && !target?.contains(event.target)) close()
}

watch(isOpen, (value) => {
  if (value) {
    tipStyle.value = { visibility: 'hidden' }
    updatePosition()
  }
})

watch(() => [props.target, props.placement], () => updatePosition())

// 添加键盘事件监听
onMounted(() => {
  document.addEventListener('keydown', onKeyDown)
  document.addEventListener('pointerdown', onPointerDown)
  window.addEventListener('resize', updatePosition)
  window.addEventListener('scroll', updatePosition, true)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeyDown)
  document.removeEventListener('pointerdown', onPointerDown)
  window.removeEventListener('resize', updatePosition)
  window.removeEventListener('scroll', updatePosition, true)
})
</script>

<style scoped>
.fluent-teaching-tip {
  position: fixed;
  z-index: 1000;
  background: var(--bg-card-solid);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.14);
  max-width: min(360px, calc(100vw - 24px));
  width: max-content;
  overflow: visible;
}

.fluent-teaching-tip::before {
  position: absolute;
  width: 12px;
  height: 12px;
  border: inherit;
  background: var(--bg-card-solid);
  content: '';
  transform: rotate(45deg);
}

.placement-bottom::before { top: -7px; left: calc(50% - 6px); border-right: 0; border-bottom: 0; }
.placement-top::before { bottom: -7px; left: calc(50% - 6px); border-top: 0; border-left: 0; }
.placement-left::before { right: -7px; top: calc(50% - 6px); border-bottom: 0; border-left: 0; }
.placement-right::before { left: -7px; top: calc(50% - 6px); border-top: 0; border-right: 0; }

.teaching-tip-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin: 16px auto;
  background: var(--accent);
  color: var(--text-on-accent);
  border-radius: 50%;
}

.teaching-tip-content {
  padding: 0 24px 24px;
  text-align: center;
}

.teaching-tip-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px 0;
}

.teaching-tip-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0 0 16px 0;
}

.teaching-tip-body {
  font-size: 14px;
  line-height: 20px;
  color: var(--text-primary);
}

.teaching-tip-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: background 0.2s ease;
}

.teaching-tip-close:hover {
  background: var(--bg-hover);
}

.teaching-tip-actions {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 0 24px 24px;
}

.teaching-tip-enter-active {
  transition: all 0.3s ease;
}

.teaching-tip-leave-active {
  transition: all 0.2s ease;
}

.teaching-tip-enter-from,
.teaching-tip-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
