<template>
  <div class="fluent-parallax-view" ref="containerRef" @scroll="onScroll">
    <div class="parallax-content" :style="contentStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  speed: { type: Number, default: 0.5 },
  direction: { type: String, default: 'vertical' }
})

const containerRef = ref(null)
const scrollPosition = ref(0)

const contentStyle = computed(() => {
  const offset = scrollPosition.value * props.speed
  if (props.direction === 'vertical') {
    return { transform: `translateY(${offset}px)` }
  }
  return { transform: `translateX(${offset}px)` }
})

const onScroll = () => {
  if (containerRef.value) {
    scrollPosition.value = containerRef.value.scrollTop
  }
}

onMounted(() => {
  containerRef.value?.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  containerRef.value?.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.fluent-parallax-view {
  overflow: auto;
  position: relative;
}

.parallax-content {
  will-change: transform;
}
</style>