<template>
  <div 
    ref="containerRef"
    class="fluent-semantic-zoom" 
    :class="{ 'is-zoomed-out': !isZoomedInViewActive }"
  >
    <button 
      v-if="showZoomOutButton && isZoomedInViewActive && canChangeViews" 
      class="zoom-out-button"
      @click="toggleZoom"
      aria-label="切换到缩略视图"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M2 2h5v1H3v4H2V2zm7 0h5v5h-1V3H9V2zM2 14h5v-1H3v-4H2v5zm12 0h-5v-1h4v-4h1v5z"/>
      </svg>
    </button>

    <Transition name="zoom-fade">
      <div 
        v-show="isZoomedInViewActive" 
        class="zoom-view zoomed-in-view"
        @click="handleZoomedInClick"
        @wheel="handleWheel"
      >
        <slot name="zoomed-in"></slot>
      </div>
    </Transition>

    <Transition name="zoom-fade">
      <div 
        v-show="!isZoomedInViewActive" 
        class="zoom-view zoomed-out-view"
        @click="handleZoomedOutClick"
      >
        <slot name="zoomed-out"></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: true },
  showZoomOutButton: { type: Boolean, default: true },
  canChangeViews: { type: Boolean, default: true },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'view-change-started', 'view-change-completed'])

const containerRef = ref(null)
const isAnimating = ref(false)

const isZoomedInViewActive = computed({
  get: () => props.modelValue,
  set: (value) => {
    if (!props.canChangeViews || isAnimating.value || props.disabled) return
    
    const startedArgs = {
      sourceIsZoomedInView: props.modelValue,
      targetIsZoomedInView: value
    }
    emit('view-change-started', startedArgs)
    
    isAnimating.value = true
    emit('update:modelValue', value)
    
    setTimeout(() => {
      isAnimating.value = false
      emit('view-change-completed', {
        sourceIsZoomedInView: startedArgs.targetIsZoomedInView,
        targetIsZoomedInView: value
      })
    }, 300)
  }
})

const toggleZoom = () => {
  isZoomedInViewActive.value = !isZoomedInViewActive.value
}

const handleZoomedInClick = (event) => {
  // 可以在这里处理放大视图的点击事件
}

const handleZoomedOutClick = (event) => {
  // 点击缩略视图项时切换到放大视图
  if (event.target.closest('.zoom-item-clickable')) {
    isZoomedInViewActive.value = true
  }
}

const handleWheel = (event) => {
  if (props.disabled) return
  // Ctrl+滚轮切换视图
  if (event.ctrlKey) {
    event.preventDefault()
    if (event.deltaY > 0 && isZoomedInViewActive.value) {
      isZoomedInViewActive.value = false
    } else if (event.deltaY < 0 && !isZoomedInViewActive.value) {
      isZoomedInViewActive.value = true
    }
  }
}
</script>

<style scoped>
.fluent-semantic-zoom {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.zoom-out-button {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  cursor: pointer;
  transition: background 0.2s ease;
  box-shadow: var(--shadow-2);
}

.zoom-out-button:hover {
  background: var(--bg-hover);
}

.zoom-view {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.zoom-fade-enter-active {
  transition: all 0.3s ease;
}

.zoom-fade-leave-active {
  transition: all 0.2s ease;
}

.zoom-fade-enter-from,
.zoom-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>