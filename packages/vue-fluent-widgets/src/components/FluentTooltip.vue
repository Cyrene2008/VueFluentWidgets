<template>
  <div class="fluent-tooltip-wrapper" @mouseenter="show" @mouseleave="hide">
    <slot></slot>
    <Transition name="tooltip">
      <div 
        v-if="isVisible" 
        class="fluent-tooltip"
        :class="[`placement-${placement}`]"
        :style="tooltipStyle"
      >
        <slot name="content">
          <span class="tooltip-text">{{ content }}</span>
        </slot>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  content: { type: String, default: '' },
  placement: { type: String, default: 'top' },
  disabled: { type: Boolean, default: false },
  delay: { type: Number, default: 300 }
})

const isVisible = ref(false)
let showTimer = null
let hideTimer = null

const tooltipStyle = computed(() => {
  const style = {}
  return style
})

const show = () => {
  if (props.disabled) return
  clearTimeout(hideTimer)
  showTimer = setTimeout(() => {
    isVisible.value = true
  }, props.delay)
}

const hide = () => {
  clearTimeout(showTimer)
  hideTimer = setTimeout(() => {
    isVisible.value = false
  }, 100)
}
</script>

<style scoped>
.fluent-tooltip-wrapper {
  position: relative;
  display: inline-flex;
}

.fluent-tooltip {
  position: absolute;
  z-index: 1000;
  padding: 8px 12px;
  background: var(--bg-card-solid);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.14);
  font-size: 12px;
  line-height: 16px;
  color: var(--text-primary);
  white-space: nowrap;
  pointer-events: none;
}

.tooltip-text {
  display: block;
}

/* 位置样式 */
.placement-top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 8px;
}

.placement-bottom {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 8px;
}

.placement-left {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 8px;
}

.placement-right {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 8px;
}

/* 动画 */
.tooltip-enter-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.tooltip-leave-active {
  transition: opacity 0.1s ease, transform 0.1s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(4px);
}

.placement-top.tooltip-enter-from,
.placement-top.tooltip-leave-to {
  transform: translateX(-50%) translateY(4px);
}

.placement-bottom.tooltip-enter-from,
.placement-bottom.tooltip-leave-to {
  transform: translateX(-50%) translateY(-4px);
}

.placement-left.tooltip-enter-from,
.placement-left.tooltip-leave-to {
  transform: translateY(-50%) translateX(4px);
}

.placement-right.tooltip-enter-from,
.placement-right.tooltip-leave-to {
  transform: translateY(-50%) translateX(-4px);
}
</style>