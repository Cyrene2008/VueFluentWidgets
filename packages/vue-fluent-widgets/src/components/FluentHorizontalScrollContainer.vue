<template>
  <div 
    class="fluent-horizontal-scroll-container"
    ref="containerRef"
    @scroll="onScroll"
  >
    <div class="scroll-content" :style="contentStyle">
      <slot></slot>
    </div>
    
    <button 
      v-if="showLeftButton" 
      class="scroll-button left-button"
      @click="scrollLeft"
    >
      <FluentIcon icon="chevron-left-20-regular" :width="16" />
    </button>
    
    <button 
      v-if="showRightButton" 
      class="scroll-button right-button"
      @click="scrollRight"
    >
      <FluentIcon icon="chevron-right-20-regular" :width="16" />
    </button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  scrollAmount: { type: Number, default: 200 }
})

const containerRef = ref(null)
const scrollLeft = ref(0)
const showLeftButton = ref(false)
const showRightButton = ref(false)

const contentStyle = computed(() => ({
  transform: `translateX(-${scrollLeft.value}px)`
}))

const updateButtons = () => {
  if (!containerRef.value) return
  const { scrollLeft: sl, scrollWidth, clientWidth } = containerRef.value
  showLeftButton.value = sl > 0
  showRightButton.value = sl < scrollWidth - clientWidth
}

const onScroll = () => {
  if (!containerRef.value) return
  scrollLeft.value = containerRef.value.scrollLeft
  updateButtons()
}

const scrollLeftAction = () => {
  if (!containerRef.value) return
  containerRef.value.scrollBy({ left: -props.scrollAmount, behavior: 'smooth' })
}

const scrollRightAction = () => {
  if (!containerRef.value) return
  containerRef.value.scrollBy({ left: props.scrollAmount, behavior: 'smooth' })
}

onMounted(() => {
  updateButtons()
  window.addEventListener('resize', updateButtons)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateButtons)
})
</script>

<style scoped>
.fluent-horizontal-scroll-container {
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.fluent-horizontal-scroll-container::-webkit-scrollbar {
  display: none;
}

.scroll-content {
  display: flex;
  gap: 8px;
  transition: transform 0.3s ease;
}

.scroll-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: 50%;
  color: var(--text-primary);
  cursor: pointer;
  z-index: 1;
  transition: background 0.2s ease;
  box-shadow: var(--shadow-2);
}

.scroll-button:hover {
  background: var(--bg-hover);
}

.left-button {
  left: 8px;
}

.right-button {
  right: 8px;
}
</style>