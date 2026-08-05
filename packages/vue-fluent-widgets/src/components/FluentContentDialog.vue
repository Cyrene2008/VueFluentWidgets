<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div v-if="modelValue" class="fluent-content-dialog-overlay" @click.self="closeOnOverlay && close()">
        <div class="fluent-content-dialog" :class="[`size-${size}`]">
          <div v-if="title || icon" class="dialog-header">
            <div class="header-icon" v-if="icon">
              <FluentIcon :icon="icon" :width="24" />
            </div>
            <div class="header-text">
              <h2 v-if="title" class="dialog-title">{{ title }}</h2>
              <p v-if="subtitle" class="dialog-subtitle">{{ subtitle }}</p>
            </div>
            <button v-if="closable" class="dialog-close" @click="close">
              <FluentIcon icon="dismiss-16-regular" :width="16" />
            </button>
          </div>
          
          <div class="dialog-body">
            <slot></slot>
          </div>
          
          <div v-if="$slots.footer || primaryButtonText || secondaryButtonText" class="dialog-footer">
            <slot name="footer">
              <FluentButton 
                v-if="secondaryButtonText" 
                variant="secondary" 
                @click="onSecondaryClick"
              >
                {{ secondaryButtonText }}
              </FluentButton>
              <FluentButton 
                v-if="primaryButtonText" 
                variant="primary" 
                @click="onPrimaryClick"
              >
                {{ primaryButtonText }}
              </FluentButton>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { watch } from 'vue'
import FluentIcon from './FluentIcon.vue'
import FluentButton from './FluentButton.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  icon: { type: String, default: '' },
  size: { type: String, default: 'standard' }, // standard, large, fullscreen
  closable: { type: Boolean, default: true },
  closeOnOverlay: { type: Boolean, default: true },
  closeOnEscape: { type: Boolean, default: true },
  primaryButtonText: { type: String, default: '' },
  secondaryButtonText: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'close', 'primary-click', 'secondary-click'])

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const onPrimaryClick = () => {
  emit('primary-click')
  close()
}

const onSecondaryClick = () => {
  emit('secondary-click')
  close()
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
  } else {
    document.removeEventListener('keydown', onKeyDown)
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.fluent-content-dialog-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.fluent-content-dialog {
  background: var(--bg-card);
  border-radius: var(--radius-md);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.size-standard {
  width: 100%;
  max-width: 450px;
}

.size-large {
  width: 100%;
  max-width: 600px;
}

.size-fullscreen {
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;
  border-radius: 0;
}

.dialog-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 24px 24px 0;
}

.header-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent);
  color: white;
  border-radius: 50%;
}

.header-text {
  flex: 1;
  min-width: 0;
}

.dialog-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.4;
}

.dialog-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 4px 0 0 0;
}

.dialog-close {
  flex-shrink: 0;
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

.dialog-close:hover {
  background: var(--bg-hover);
}

.dialog-body {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 16px 24px;
  border-top: 1px solid var(--border-strong);
}

/* Transitions */
.dialog-enter-active {
  transition: all 0.3s ease;
}

.dialog-leave-active {
  transition: all 0.2s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-from .fluent-content-dialog,
.dialog-leave-to .fluent-content-dialog {
  transform: scale(0.95);
}
</style>