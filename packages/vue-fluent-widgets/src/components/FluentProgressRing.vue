<template>
  <div 
    class="fluent-progress-ring" 
    :class="{ 
      'is-indeterminate': indeterminate, 
      'is-error': error, 
      'is-paused': paused 
    }"
    :style="ringStyle"
    role="progressbar"
    :aria-valuenow="indeterminate ? undefined : percentage"
    :aria-valuemin="indeterminate ? undefined : 0"
    :aria-valuemax="indeterminate ? undefined : 100"
  >
    <svg class="progress-ring-svg" viewBox="0 0 100 100">
      <circle
        class="progress-ring-track"
        cx="50"
        cy="50"
        r="42"
      />
      <circle
        v-if="!indeterminate"
        class="progress-ring-fill"
        cx="50"
        cy="50"
        r="42"
        :style="fillStyle"
      />
      <circle
        v-if="indeterminate"
        class="progress-ring-indeterminate"
        cx="50"
        cy="50"
        r="42"
      />
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: { type: Number, default: 0 },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  indeterminate: { type: Boolean, default: true },
  error: { type: Boolean, default: false },
  paused: { type: Boolean, default: false },
  size: { type: [Number, String], default: 32 }
})

const percentage = computed(() => {
  if (props.max === props.min) return 0
  return ((props.value - props.min) / (props.max - props.min)) * 100
})

const circumference = 2 * Math.PI * 42
const strokeDashoffset = computed(() => {
  return circumference - (percentage.value / 100) * circumference
})

const fillStyle = computed(() => ({
  strokeDasharray: `${circumference}`,
  strokeDashoffset: `${strokeDashoffset.value}`
}))

const ringStyle = computed(() => ({
  width: typeof props.size === 'number' ? `${props.size}px` : props.size,
  height: typeof props.size === 'number' ? `${props.size}px` : props.size
}))
</script>

<style scoped>
.fluent-progress-ring {
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.progress-ring-svg {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.progress-ring-track {
  fill: none;
  stroke: var(--border-strong);
  stroke-width: 6;
}

.progress-ring-fill {
  fill: none;
  stroke: var(--accent);
  stroke-width: 6;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.3s ease;
}

.fluent-progress-ring.is-error .progress-ring-fill {
  stroke: #c42b1c;
}

.fluent-progress-ring.is-paused .progress-ring-fill {
  stroke: var(--text-secondary);
}

.progress-ring-indeterminate {
  fill: none;
  stroke: var(--accent);
  stroke-width: 6;
  stroke-linecap: round;
  stroke-dasharray: 72 192;
  animation: indeterminate 1s infinite linear;
  transform-origin: center;
}

.fluent-progress-ring.is-error .progress-ring-indeterminate {
  stroke: #c42b1c;
}

.fluent-progress-ring.is-paused .progress-ring-indeterminate {
  stroke: var(--text-secondary);
  animation-play-state: paused;
}

@keyframes indeterminate {
  to { transform: rotate(360deg); }
}
</style>
