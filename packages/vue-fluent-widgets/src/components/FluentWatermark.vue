<template>
  <div class="fluent-watermark" ref="containerRef">
    <slot></slot>
    <div class="watermark-overlay" :style="overlayStyle"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: { type: String, default: '' },
  font: { type: String, default: '16px Segoe UI' },
  color: { type: String, default: 'rgba(0, 0, 0, 0.1)' },
  rotate: { type: Number, default: -22 },
  gap: { type: Array, default: () => [100, 100] },
  offset: { type: Array, default: () => [0, 0] }
})

const overlayStyle = computed(() => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  
  const text = props.text
  ctx.font = props.font
  const metrics = ctx.measureText(text)
  const textWidth = metrics.width
  const textHeight = 20
  
  const gapX = props.gap[0]
  const gapY = props.gap[1]
  
  canvas.width = textWidth + gapX
  canvas.height = textHeight + gapY
  
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate((props.rotate * Math.PI) / 180)
  ctx.font = props.font
  ctx.fillStyle = props.color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, 0, 0)
  
  return {
    backgroundImage: `url(${canvas.toDataURL()})`,
    backgroundSize: `${canvas.width}px ${canvas.height}px`,
    backgroundPosition: `${props.offset[0]}px ${props.offset[1]}px`
  }
})
</script>

<style scoped>
.fluent-watermark {
  position: relative;
}

.watermark-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}
</style>