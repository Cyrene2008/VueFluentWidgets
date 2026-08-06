<template>
  <Transition name="infobar">
    <div 
      v-if="isVisible" 
      class="fluent-info-bar"
      :class="[`severity-${severity}`, { 'is-closable': closable }]"
      role="alert"
    >
      <div class="info-bar-icon">
        <FluentIcon :icon="iconName" :width="16" />
      </div>
      <div class="info-bar-content">
        <div v-if="title" class="info-bar-title">{{ title }}</div>
        <div v-if="message" class="info-bar-message">{{ message }}</div>
        <slot></slot>
      </div>
      <div v-if="action" class="info-bar-action">
        <FluentButton variant="subtle" size="sm" @click="onAction">
          {{ action }}
        </FluentButton>
      </div>
      <button v-if="closable" class="info-bar-close" @click="close">
        <FluentIcon icon="dismiss-16-regular" :width="16" />
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import FluentIcon from './FluentIcon.vue'
import FluentButton from './FluentButton.vue'

const props = defineProps({
  title: { type: String, default: '' },
  message: { type: String, default: '' },
  severity: { type: String, default: 'info' },
  closable: { type: Boolean, default: true },
  action: { type: String, default: '' },
  modelValue: { type: Boolean, default: true }
})

const emit = defineEmits(['update:modelValue', 'close', 'action'])

const isVisible = ref(props.modelValue)

watch(() => props.modelValue, value => {
  isVisible.value = value
})

const iconName = computed(() => {
  switch (props.severity) {
    case 'success': return 'checkmark-circle-16-regular'
    case 'warning': return 'warning-16-regular'
    case 'error': return 'dismiss-circle-16-regular'
    default: return 'info-16-regular'
  }
})

const close = () => {
  isVisible.value = false
  emit('update:modelValue', false)
  emit('close')
}

const onAction = () => {
  emit('action')
}
</script>

<style scoped>
.fluent-info-bar {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  border: 1px solid;
  background: var(--bg-card);
}

.severity-info {
  border-color: #0078d4;
  background: #f0f6ff;
}

.severity-success {
  border-color: #0f7b0f;
  background: #dff6dd;
}

.severity-warning {
  border-color: #9d5d00;
  background: #fff4ce;
}

.severity-error {
  border-color: #c42b1c;
  background: #fde7e9;
}

.info-bar-icon {
  flex-shrink: 0;
  margin-top: 2px;
}

.severity-info .info-bar-icon {
  color: #0078d4;
}

.severity-success .info-bar-icon {
  color: #0f7b0f;
}

.severity-warning .info-bar-icon {
  color: #9d5d00;
}

.severity-error .info-bar-icon {
  color: #c42b1c;
}

.info-bar-content {
  flex: 1;
  min-width: 0;
}

.info-bar-title {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: var(--text-primary);
}

.severity-info .info-bar-title,
.severity-info .info-bar-message,
.severity-success .info-bar-title,
.severity-success .info-bar-message,
.severity-warning .info-bar-title,
.severity-warning .info-bar-message,
.severity-error .info-bar-title,
.severity-error .info-bar-message {
  color: #1f1f1f;
}

.info-bar-message {
  font-size: 14px;
  line-height: 20px;
  color: var(--text-secondary);
  margin-top: 2px;
}

.info-bar-action {
  flex-shrink: 0;
  margin-top: 2px;
}

.info-bar-close {
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

.info-bar-close:hover {
  background: var(--bg-hover);
}

.infobar-enter-active {
  transition: all 0.3s ease;
}

.infobar-leave-active {
  transition: all 0.2s ease;
}

.infobar-enter-from,
.infobar-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
