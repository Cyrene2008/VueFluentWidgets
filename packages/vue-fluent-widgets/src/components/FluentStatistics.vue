<template>
  <div class="fluent-statistics">
    <div v-if="title" class="statistics-title">{{ title }}</div>
    <div class="statistics-value" :class="{ 'is-loading': loading }">
      <span class="value">{{ displayValue }}</span>
      <span v-if="suffix" class="suffix">{{ suffix }}</span>
      <span v-if="prefix" class="prefix">{{ prefix }}</span>
    </div>
    <div v-if="description" class="statistics-description">
      <span v-if="trend" class="trend" :class="`trend-${trend}`">
        <FluentIcon :icon="trendIcon" :width="12" />
        {{ trendValue }}
      </span>
      {{ description }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  value: { type: [Number, String], required: true },
  title: { type: String, default: '' },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' },
  description: { type: String, default: '' },
  trend: { type: String, default: '' }, // up, down, neutral
  trendValue: { type: String, default: '' },
  precision: { type: Number, default: 0 },
  loading: { type: Boolean, default: false }
})

const displayValue = computed(() => {
  if (typeof props.value === 'number') {
    return props.value.toFixed(props.precision)
  }
  return props.value
})

const trendIcon = computed(() => {
  const icons = {
    up: 'arrow-up-20-regular',
    down: 'arrow-down-20-regular',
    neutral: 'subtract-20-regular'
  }
  return icons[props.trend] || icons.neutral
})
</script>

<style scoped>
.fluent-statistics {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.statistics-title {
  font-size: 14px;
  color: var(--text-secondary);
}

.statistics-value {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.statistics-value.is-loading {
  opacity: 0.5;
}

.value {
  font-size: 28px;
  font-weight: 600;
  color: var(--text-primary);
}

.prefix,
.suffix {
  font-size: 14px;
  color: var(--text-secondary);
}

.statistics-description {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text-secondary);
}

.trend {
  display: flex;
  align-items: center;
  gap: 4px;
}

.trend-up {
  color: #0f7b0f;
}

.trend-down {
  color: #c42b1c;
}

.trend-neutral {
  color: var(--text-secondary);
}
</style>