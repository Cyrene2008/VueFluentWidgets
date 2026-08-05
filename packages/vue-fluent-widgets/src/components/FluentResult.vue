<template>
  <div class="fluent-result" :class="[`status-${status}`]">
    <div class="result-icon">
      <FluentIcon :icon="statusIcon" :width="48" />
    </div>
    <div v-if="title" class="result-title">{{ title }}</div>
    <div v-if="description" class="result-description">{{ description }}</div>
    <div v-if="$slots.action" class="result-action">
      <slot name="action"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  status: { type: String, default: 'info' }, // info, success, warning, error, 404, 403, 500
  title: { type: String, default: '' },
  description: { type: String, default: '' }
})

const statusIcon = computed(() => {
  const icons = {
    info: 'info-20-regular',
    success: 'checkmark-circle-20-regular',
    warning: 'warning-20-regular',
    error: 'dismiss-circle-20-regular',
    '404': 'error-circle-20-regular',
    '403': 'lock-closed-20-regular',
    '500': 'error-circle-20-regular'
  }
  return icons[props.status] || icons.info
})
</script>

<style scoped>
.fluent-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
}

.result-icon {
  margin-bottom: 24px;
}

.status-info .result-icon {
  color: var(--accent);
}

.status-success .result-icon {
  color: #0f7b0f;
}

.status-warning .result-icon {
  color: #9d5d00;
}

.status-error .result-icon,
.status-404 .result-icon,
.status-500 .result-icon {
  color: #c42b1c;
}

.status-403 .result-icon {
  color: #9d5d00;
}

.result-title {
  font-size: 28px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.result-description {
  font-size: 14px;
  color: var(--text-secondary);
  max-width: 400px;
  line-height: 1.5;
}

.result-action {
  margin-top: 32px;
}
</style>