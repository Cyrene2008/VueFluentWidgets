<template>
  <div 
    class="fluent-flip-view"
    :class="{ 'is-vertical': vertical }"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    @wheel.prevent="onWheel"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <div class="flip-view-track" :style="trackStyle">
      <div v-for="(item, index) in items" :key="index" class="flip-view-item">
        <slot :item="item" :index="index"></slot>
      </div>
    </div>
    
    <button 
      v-show="hover && modelValue > 0" 
      class="flip-button prev-button"
      @click="prev"
      aria-label="上一个"
    >
      <FluentIcon :icon="vertical ? 'chevron-up-20-regular' : 'chevron-left-20-regular'" :width="16" />
    </button>
    
    <button 
      v-show="hover && modelValue < items.length - 1" 
      class="flip-button next-button"
      @click="next"
      aria-label="下一个"
    >
      <FluentIcon :icon="vertical ? 'chevron-down-20-regular' : 'chevron-right-20-regular'" :width="16" />
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  items: { type: Array, required: true },
  modelValue: { type: Number, default: 0 },
  vertical: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'change'])

const hover = ref(false)
let touchStart = 0

const trackStyle = computed(() => {
  if (props.vertical) {
    return { transform: `translateY(-${props.modelValue * 100}%)` }
  }
  return { transform: `translateX(-${props.modelValue * 100}%)` }
})

const setSelectedIndex = (index) => {
  if (props.disabled) return
  const bounded = Math.max(0, Math.min(props.items.length - 1, index))
  if (bounded === props.modelValue) return
  emit('update:modelValue', bounded)
  emit('change', bounded)
}

const prev = () => {
  if (props.modelValue > 0) {
    setSelectedIndex(props.modelValue - 1)
  }
}

const next = () => {
  if (props.modelValue < props.items.length - 1) {
    setSelectedIndex(props.modelValue + 1)
  }
}

const onWheel = (event) => {
  if (props.disabled) return
  const delta = props.vertical ? event.deltaY : (event.deltaX || event.deltaY)
  if (delta > 0) next()
  else if (delta < 0) prev()
}

const onTouchStart = (event) => {
  const touch = event.touches[0]
  touchStart = props.vertical ? touch.clientY : touch.clientX
}

const onTouchEnd = (event) => {
  const touch = event.changedTouches[0]
  const end = props.vertical ? touch.clientY : touch.clientX
  const diff = touchStart - end
  if (diff > 30) next()
  else if (diff < -30) prev()
}
</script>

<style scoped>
.fluent-flip-view {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  touch-action: none;
}

.flip-view-track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.fluent-flip-view.is-vertical .flip-view-track {
  flex-direction: column;
}

.flip-view-item {
  min-width: 100%;
  min-height: 100%;
  flex-shrink: 0;
}

.flip-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: 50%;
  color: var(--text-primary);
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease, background 0.2s ease;
  z-index: 10;
}

.fluent-flip-view:hover .flip-button {
  opacity: 1;
}

.flip-button:hover {
  background: var(--bg-hover);
}

.prev-button {
  left: 12px;
}

.next-button {
  right: 12px;
}

.fluent-flip-view.is-vertical .flip-button {
  top: auto;
  transform: none;
}

.fluent-flip-view.is-vertical .prev-button {
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
}

.fluent-flip-view.is-vertical .next-button {
  bottom: 12px;
  top: auto;
  left: 50%;
  transform: translateX(-50%);
}
</style>