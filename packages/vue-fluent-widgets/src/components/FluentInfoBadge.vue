<template>
  <div 
    class="fluent-info-badge"
    :class="[`severity-${severity}`, { 'has-value': hasValue }]"
  >
    <span v-if="hasValue" class="badge-value">{{ displayValue }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: { type: [Number, String], default: null },
  severity: { type: String, default: 'attention' } // attention, success, caution, critical
})

const hasValue = computed(() => props.value !== null && props.value !== undefined && props.value !== '')

const displayValue = computed(() => {
  if (typeof props.value === 'number' && props.value > 999) {
    return '999+'
  }
  return props.value
})
</script>

<style scoped>
.fluent-info-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  height: 16px;
  border-radius: 8px;
  padding: 0 4px;
}

.fluent-info-badge.has-value {
  background: var(--accent);
  color: white;
}

.fluent-info-badge.severity-attention {
  background: var(--accent);
}

.fluent-info-badge.severity-success {
  background: #0f7b0f;
}

.fluent-info-badge.severity-caution {
  background: #9d5d00;
}

.fluent-info-badge.severity-critical {
  background: #c42b1c;
}

.badge-value {
  font-size: 10px;
  font-weight: 600;
  line-height: 1;
}
</style>