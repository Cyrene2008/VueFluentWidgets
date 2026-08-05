<template>
  <div 
    class="fluent-animated-icon"
    :class="{ 'is-animating': isAnimating }"
    @mouseenter="onHover"
    @mouseleave="onLeave"
    @click="onClick"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  animation: { type: String, default: 'bounce' },
  duration: { type: Number, default: 300 },
  trigger: { type: String, default: 'hover' } // hover, click, auto
})

const emit = defineEmits(['animation-start', 'animation-end'])

const isAnimating = ref(false)
let animationTimer = null

const startAnimation = () => {
  isAnimating.value = true
  emit('animation-start')
  
  if (animationTimer) clearTimeout(animationTimer)
  animationTimer = setTimeout(() => {
    isAnimating.value = false
    emit('animation-end')
  }, props.duration)
}

const onHover = () => {
  if (props.trigger === 'hover') {
    startAnimation()
  }
}

const onLeave = () => {
  // 可以添加鼠标离开时的逻辑
}

const onClick = () => {
  if (props.trigger === 'click') {
    startAnimation()
  }
}

// 自动播放
if (props.trigger === 'auto') {
  const interval = setInterval(() => {
    startAnimation()
  }, props.duration * 3)
  
  // 组件卸载时清除定时器
  onUnmounted(() => {
    clearInterval(interval)
  })
}
</script>

<style scoped>
.fluent-animated-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.fluent-animated-icon.is-animating {
  animation: bounce 0.3s ease;
}

@keyframes bounce {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}
</style>