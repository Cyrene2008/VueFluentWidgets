<template>
  <div 
    class="fluent-swipe-control"
    :class="{ 'is-swiping': isSwiping }"
    :style="{ '--swipe-action-width': `${Math.max(0, threshold)}px` }"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <div class="swipe-actions left-actions" v-if="leftActions.length > 0">
      <button
        v-for="action in leftActions"
        :key="action.id"
        class="swipe-action"
        :style="{ background: action.color || 'var(--accent)' }"
        @click="onAction(action)"
      >
        <FluentIcon v-if="action.icon" :icon="action.icon" :width="16" />
        <span v-if="action.label">{{ action.label }}</span>
      </button>
    </div>
    
    <div class="swipe-content" :style="contentStyle">
      <slot></slot>
    </div>
    
    <div class="swipe-actions right-actions" v-if="rightActions.length > 0">
      <button
        v-for="action in rightActions"
        :key="action.id"
        class="swipe-action"
        :style="{ background: action.color || 'var(--accent)' }"
        @click="onAction(action)"
      >
        <FluentIcon v-if="action.icon" :icon="action.icon" :width="16" />
        <span v-if="action.label">{{ action.label }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  leftActions: { type: Array, default: () => [] },
  rightActions: { type: Array, default: () => [] },
  threshold: { type: Number, default: 80 },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['action'])

const startX = ref(0)
const currentX = ref(0)
const isSwiping = ref(false)
const swipeOffset = ref(0)

const contentStyle = computed(() => ({
  transform: `translateX(${swipeOffset.value}px)`,
  transition: isSwiping.value ? 'none' : 'transform 0.3s ease'
}))

const onTouchStart = (event) => {
  if (props.disabled) return
  startX.value = event.touches[0].clientX
  isSwiping.value = true
}

const onTouchMove = (event) => {
  if (!isSwiping.value || props.disabled) return
  currentX.value = event.touches[0].clientX
  const diff = currentX.value - startX.value
  
  // 限制滑动范围
  const maxLeft = props.leftActions.length > 0 ? props.threshold : 0
  const maxRight = props.rightActions.length > 0 ? -props.threshold : 0
  
  swipeOffset.value = Math.max(maxRight, Math.min(maxLeft, diff))
}

const onTouchEnd = () => {
  if (!isSwiping.value) return
  isSwiping.value = false
  
  // 根据滑动距离决定是否显示操作按钮
  if (swipeOffset.value >= props.threshold && props.leftActions.length > 0) {
    swipeOffset.value = props.threshold
  } else if (swipeOffset.value <= -props.threshold && props.rightActions.length > 0) {
    swipeOffset.value = -props.threshold
  } else {
    swipeOffset.value = 0
  }
}

const onAction = (action) => {
  emit('action', action)
  swipeOffset.value = 0
}
</script>

<style scoped>
.fluent-swipe-control {
  position: relative;
  min-width: 0;
  overflow: hidden;
  border-radius: var(--radius-md);
  touch-action: pan-y;
}

.swipe-actions {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  width: var(--swipe-action-width);
}

.left-actions {
  left: 0;
}

.right-actions {
  right: 0;
}

.swipe-action {
  display: flex;
  min-width: 0;
  flex: 1 1 0;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 100%;
  padding: 0 16px;
  background: var(--accent);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.swipe-content {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  height: 100%;
  min-height: 100%;
  background: var(--bg-card);
}
</style>
