<template>
  <div class="gestures-demo">
    <div class="page-header">
      <h1>手势交互</h1>
      <p>Fluent 设计系统的手势交互效果。</p>
    </div>

    <FluentControlExample 
      header-text="点击效果" 
      :source-code="clickCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentButton @click="handleClick">点击我</FluentButton>
          <span v-if="clickCount > 0">点击次数: {{ clickCount }}</span>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="长按效果" 
      :source-code="longPressCode"
    >
      <template #example>
        <div class="demo-row">
          <div 
            class="gesture-box"
            @mousedown="startLongPress"
            @mouseup="endLongPress"
            @mouseleave="endLongPress"
            @touchstart="startLongPress"
            @touchend="endLongPress"
          >
            {{ longPressText }}
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="拖拽效果" 
      :source-code="dragCode"
    >
      <template #example>
        <div class="demo-row">
          <div 
            class="draggable"
            :style="{ transform: `translate(${dragX}px, ${dragY}px)` }"
            @pointerdown="startDrag"
            @pointermove="onDrag"
            @pointerup="stopDrag"
            @pointercancel="stopDrag"
            @lostpointercapture="stopDrag"
          >
            拖拽我
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="悬停效果" 
      :source-code="hoverCode"
    >
      <template #example>
        <div class="demo-row">
          <div class="hover-box">
            <span>悬停查看效果</span>
            <div class="hover-content">这是悬停时显示的内容</div>
          </div>
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { FluentButton, FluentControlExample } from 'vue-fluent-widgets'

const clickCount = ref(0)
const longPressText = ref('长按我')
let longPressTimer = null
const dragX = ref(0)
const dragY = ref(0)
let isDragging = false
let dragPointerId = null
let startX = 0
let startY = 0

const handleClick = () => {
  clickCount.value++
}

const startLongPress = () => {
  longPressText.value = '长按中...'
  longPressTimer = setTimeout(() => {
    longPressText.value = '长按成功！'
    setTimeout(() => {
      longPressText.value = '长按我'
    }, 1000)
  }, 1000)
}

const endLongPress = () => {
  if (longPressTimer) {
    clearTimeout(longPressTimer)
    longPressTimer = null
  }
  longPressText.value = '长按我'
}

const startDrag = (e) => {
  if (e.pointerType === 'mouse' && e.button !== 0) return
  isDragging = true
  dragPointerId = e.pointerId
  startX = e.clientX - dragX.value
  startY = e.clientY - dragY.value
  e.currentTarget.setPointerCapture(e.pointerId)
}

const onDrag = (e) => {
  if (!isDragging || e.pointerId !== dragPointerId) return
  dragX.value = e.clientX - startX
  dragY.value = e.clientY - startY
}

const stopDrag = (e) => {
  if (e?.pointerId != null && e.pointerId !== dragPointerId) return
  if (e?.currentTarget?.hasPointerCapture?.(dragPointerId)) e.currentTarget.releasePointerCapture(dragPointerId)
  isDragging = false
  dragPointerId = null
}

onUnmounted(() => {
  if (longPressTimer) {
    clearTimeout(longPressTimer)
  }
  isDragging = false
  dragPointerId = null
})

const clickCode = `<FluentButton @click="handleClick">点击我</FluentButton>
<span v-if="clickCount > 0">点击次数: {{ clickCount }}</span>

const clickCount = ref(0)
const handleClick = () => {
  clickCount.value++
}`

const longPressCode = `<div 
  @mousedown="startLongPress"
  @mouseup="endLongPress"
  @mouseleave="endLongPress"
  @touchstart="startLongPress"
  @touchend="endLongPress"
>
  {{ longPressText }}
</div>

const startLongPress = () => {
  longPressText.value = '长按中...'
  longPressTimer = setTimeout(() => {
    longPressText.value = '长按成功！'
  }, 1000)
}

const endLongPress = () => {
  clearTimeout(longPressTimer)
  longPressText.value = '长按我'
}`

const dragCode = `<div 
  class="draggable"
  :style="{ transform: \`translate(\${dragX}px, \${dragY}px)\` }"
  @pointerdown="startDrag"
  @pointermove="onDrag"
  @pointerup="stopDrag"
  @pointercancel="stopDrag"
>
  拖拽我
</div>

const startDrag = (e) => {
  isDragging = true
  dragPointerId = e.pointerId
  startX = e.clientX - dragX.value
  startY = e.clientY - dragY.value
  e.currentTarget.setPointerCapture(e.pointerId)
}`

const hoverCode = `<div class="hover-box">
  <span>悬停查看效果</span>
  <div class="hover-content">这是悬停时显示的内容</div>
</div>

.hover-box:hover .hover-content {
  opacity: 1;
  visibility: visible;
}`
</script>

<style scoped>
.gestures-demo {
  max-width: 800px;
}

.page-header {
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.page-header p {
  color: var(--text-secondary);
  font-size: 14px;
}

.gesture-box {
  padding: 20px;
  background: var(--bg-card);
  border: 2px dashed var(--border-strong);
  border-radius: var(--radius-md);
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;
}

.gesture-box:hover {
  border-color: var(--accent);
  background: var(--bg-hover);
}

.draggable {
  padding: 20px;
  background: var(--accent);
  color: white;
  border-radius: var(--radius-md);
  cursor: grab;
  user-select: none;
  touch-action: none;
  transition: box-shadow 0.2s ease;
}

.draggable:active {
  cursor: grabbing;
  box-shadow: var(--shadow-8);
}

.hover-box {
  position: relative;
  padding: 20px;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  cursor: pointer;
}

.hover-content {
  position: absolute;
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 12px;
  background: var(--text-primary);
  color: var(--bg-card);
  border-radius: var(--radius-md);
  font-size: 12px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  z-index: 2;
}

.hover-box:hover .hover-content {
  opacity: 1;
  visibility: visible;
}
</style>
