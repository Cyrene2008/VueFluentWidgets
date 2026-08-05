<template>
  <div 
    class="fluent-pull-to-refresh"
    :class="{ 'is-pulling': isPulling, 'is-refreshing': isRefreshing }"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <div class="pull-indicator" :style="indicatorStyle">
      <div class="indicator-icon" :class="{ 'is-spinning': isRefreshing }">
        <FluentIcon icon="arrow-sync-20-regular" :width="20" />
      </div>
      <span class="indicator-text">{{ indicatorText }}</span>
    </div>
    <div class="pull-content" :style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  threshold: { type: Number, default: 80 },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['refresh'])

const startY = ref(0)
const currentY = ref(0)
const isPulling = ref(false)
const isRefreshing = ref(false)
const pullDistance = ref(0)

const indicatorText = computed(() => {
  if (isRefreshing.value) return '刷新中...'
  if (pullDistance.value >= props.threshold) return '释放刷新'
  return '下拉刷新'
})

const indicatorStyle = computed(() => ({
  transform: `translateY(${Math.min(pullDistance.value, props.threshold)}px)`,
  opacity: isPulling.value || isRefreshing.value ? 1 : 0
}))

const contentStyle = computed(() => ({
  transform: `translateY(${isPulling.value ? pullDistance.value : 0}px)`,
  transition: isPulling.value ? 'none' : 'transform 0.3s ease'
}))

const onTouchStart = (event) => {
  if (props.disabled || isRefreshing.value) return
  startY.value = event.touches[0].clientY
  isPulling.value = true
}

const onTouchMove = (event) => {
  if (!isPulling.value || props.disabled) return
  currentY.value = event.touches[0].clientY
  const diff = currentY.value - startY.value
  if (diff > 0) {
    pullDistance.value = Math.min(diff * 0.5, props.threshold * 1.5)
  }
}

const onTouchEnd = () => {
  if (!isPulling.value) return
  isPulling.value = false
  
  if (pullDistance.value >= props.threshold) {
    isRefreshing.value = true
    emit('refresh', () => {
      isRefreshing.value = false
      pullDistance.value = 0
    })
  } else {
    pullDistance.value = 0
  }
}
</script>

<style scoped>
.fluent-pull-to-refresh {
  position: relative;
  overflow: hidden;
}

.pull-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  color: var(--text-secondary);
  font-size: 14px;
  transition: opacity 0.2s ease;
}

.indicator-icon {
  transition: transform 0.3s ease;
}

.indicator-icon.is-spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.pull-content {
  min-height: 100%;
}
</style>