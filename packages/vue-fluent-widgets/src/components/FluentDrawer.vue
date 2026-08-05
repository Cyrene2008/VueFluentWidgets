<template>
  <Teleport to="body">
    <Transition name="drawer">
      <div v-if="modelValue" class="fluent-drawer-overlay" @click.self="closeOnOverlay && close()">
        <div 
          class="fluent-drawer"
          :class="[`placement-${placement}`, `size-${size}`]"
        >
          <div v-if="title || closable" class="drawer-header">
            <slot name="header">
              <h3 class="drawer-title">{{ title }}</h3>
            </slot>
            <button v-if="closable" class="drawer-close" @click="close">
              <FluentIcon icon="dismiss-16-regular" :width="16" />
            </button>
          </div>
          <div class="drawer-body">
            <slot></slot>
          </div>
          <div v-if="$slots.footer" class="drawer-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { watch } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
  placement: { type: String, default: 'right' }, // left, right, top, bottom
  size: { type: String, default: 'medium' }, // small, medium, large
  closable: { type: Boolean, default: true },
  closeOnOverlay: { type: Boolean, default: true },
  closeOnEscape: { type: Boolean, default: true }
})

const emit = defineEmits(['update:modelValue', 'open', 'close'])

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const onKeyDown = (event) => {
  if (event.key === 'Escape' && props.closeOnEscape && props.modelValue) {
    close()
  }
}

watch(() => props.modelValue, (value) => {
  if (value) {
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    emit('open')
  } else {
    document.removeEventListener('keydown', onKeyDown)
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.fluent-drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: flex;
}

.fluent-drawer {
  background: var(--bg-card);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Placements */
.placement-right {
  margin-left: auto;
  height: 100%;
}

.placement-left {
  margin-right: auto;
  height: 100%;
}

.placement-top {
  margin-bottom: auto;
  width: 100%;
}

.placement-bottom {
  margin-top: auto;
  width: 100%;
}

/* Sizes */
.size-small {
  width: 280px;
}

.size-medium {
  width: 400px;
}

.size-large {
  width: 600px;
}

.placement-top.size-small,
.placement-bottom.size-small {
  height: 200px;
  width: 100%;
}

.placement-top.size-medium,
.placement-bottom.size-medium {
  height: 300px;
  width: 100%;
}

.placement-top.size-large,
.placement-bottom.size-large {
  height: 400px;
  width: 100%;
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-strong);
}

.drawer-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.drawer-close {
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

.drawer-close:hover {
  background: var(--bg-hover);
}

.drawer-body {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.drawer-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--border-strong);
}

/* Transitions */
.drawer-enter-active {
  transition: all 0.3s ease;
}

.drawer-leave-active {
  transition: all 0.2s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

.drawer-enter-from .fluent-drawer,
.drawer-leave-to .fluent-drawer {
  transform: translateX(100%);
}

.placement-left .drawer-enter-from .fluent-drawer,
.placement-left .drawer-leave-to .fluent-drawer {
  transform: translateX(-100%);
}

.placement-top .drawer-enter-from .fluent-drawer,
.placement-top .drawer-leave-to .fluent-drawer {
  transform: translateY(-100%);
}

.placement-bottom .drawer-enter-from .fluent-drawer,
.placement-bottom .drawer-leave-to .fluent-drawer {
  transform: translateY(100%);
}
</style>