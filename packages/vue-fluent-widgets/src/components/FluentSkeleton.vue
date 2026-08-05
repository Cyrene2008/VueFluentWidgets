<template>
  <div 
    class="fluent-skeleton"
    :class="[`shape-${shape}`, { 'is-animated': animated }]"
    :style="skeletonStyle"
  >
    <div class="skeleton-shimmer"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  width: { type: [String, Number], default: '100%' },
  height: { type: [String, Number], default: '16px' },
  shape: { type: String, default: 'rect' }, // rect, circle, rounded
  animated: { type: Boolean, default: true }
})

const cssLength = (value) => {
  if (typeof value === 'number') return `${value}px`
  return value
}

const skeletonStyle = computed(() => ({
  width: cssLength(props.width),
  height: cssLength(props.height)
}))
</script>

<style scoped>
.fluent-skeleton {
  background: var(--bg-hover);
  position: relative;
  overflow: hidden;
}

.fluent-skeleton.shape-circle {
  border-radius: 50%;
}

.fluent-skeleton.shape-rounded {
  border-radius: var(--radius-md);
}

.fluent-skeleton.shape-rect {
  border-radius: 2px;
}

.skeleton-shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.3) 50%,
    transparent 100%
  );
  transform: translateX(-100%);
}

.fluent-skeleton.is-animated .skeleton-shimmer {
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>