<template>
  <div 
    class="fluent-progress-bar" 
    :class="{ 
      'is-indeterminate': indeterminate, 
      'is-error': error, 
      'is-paused': paused 
    }"
    role="progressbar"
    :aria-valuenow="indeterminate ? undefined : percentage"
    :aria-valuemin="indeterminate ? undefined : 0"
    :aria-valuemax="indeterminate ? undefined : 100"
  >
    <div class="progress-track">
      <div v-if="!indeterminate" class="progress-fill" :style="fillStyle"></div>
      <div v-if="indeterminate" class="progress-indeterminate"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: { type: Number, default: 0 },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  indeterminate: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
  paused: { type: Boolean, default: false }
})

const percentage = computed(() => {
  if (props.max === props.min) return 0
  return ((props.value - props.min) / (props.max - props.min)) * 100
})

const fillStyle = computed(() => ({
  width: `${percentage.value}%`
}))
</script>

<style scoped>
.fluent-progress-bar {
  width: 100%;
  height: 4px;
  overflow: hidden;
}

.progress-track {
  width: 100%;
  height: 100%;
  background: var(--border-strong);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.fluent-progress-bar.is-error .progress-fill {
  background: #c42b1c;
}

.fluent-progress-bar.is-paused .progress-fill {
  background: var(--text-secondary);
}

.progress-indeterminate {
  position: absolute;
  width: 30%;
  height: 100%;
  background: var(--accent);
  border-radius: 2px;
  animation: indeterminate 1.5s infinite ease-in-out;
}

.fluent-progress-bar.is-error .progress-indeterminate {
  background: #c42b1c;
}

.fluent-progress-bar.is-paused .progress-indeterminate {
  background: var(--text-secondary);
  animation-play-state: paused;
}

@keyframes indeterminate {
  0% {
    left: -30%;
  }
  100% {
    left: 100%;
  }
}
</style>