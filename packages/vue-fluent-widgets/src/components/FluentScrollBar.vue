<template>
  <div 
    class="fluent-scroll-bar"
    :class="[`orientation-${orientation}`]"
    @pointerenter="showThumb = true"
    @pointerleave="hideThumb"
  >
    <div class="scroll-bar-track" @click="onTrackClick">
      <div 
        class="scroll-bar-thumb"
        :class="{ 'is-visible': showThumb || isDragging }"
        :style="thumbStyle"
        @pointerdown.prevent="onThumbDown"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  orientation: { type: String, default: 'vertical' },
  value: { type: Number, default: 0 },
  minimum: { type: Number, default: 0 },
  maximum: { type: Number, default: 100 },
  viewportSize: { type: Number, default: 0 }
})

const emit = defineEmits(['update:value', 'scroll'])

const showThumb = ref(false)
const isDragging = ref(false)
const trackRef = ref(null)
const startPos = ref(0)
const startValue = ref(0)

const thumbSize = computed(() => {
  if (props.viewportSize <= 0) return 20
  const ratio = props.viewportSize / (props.maximum - props.minimum + props.viewportSize)
  return Math.max(20, ratio * 100)
})

const thumbPosition = computed(() => {
  const range = props.maximum - props.minimum
  if (range <= 0) return 0
  const ratio = (props.value - props.minimum) / range
  return ratio * (100 - thumbSize.value)
})

const thumbStyle = computed(() => ({
  [props.orientation === 'vertical' ? 'height' : 'width']: `${thumbSize.value}%`,
  [props.orientation === 'vertical' ? 'top' : 'left']: `${thumbPosition.value}%`
}))

const hideThumb = () => {
  if (!isDragging.value) {
    showThumb.value = false
  }
}

const onTrackClick = (event) => {
  const rect = event.currentTarget.getBoundingClientRect()
  const pos = props.orientation === 'vertical' 
    ? (event.clientY - rect.top) / rect.height
    : (event.clientX - rect.left) / rect.width
  
  const newValue = props.minimum + pos * (props.maximum - props.minimum)
  emit('update:value', Math.max(props.minimum, Math.min(props.maximum, newValue)))
}

const onThumbDown = (event) => {
  isDragging.value = true
  startPos.value = props.orientation === 'vertical' ? event.clientY : event.clientX
  startValue.value = props.value
  
  document.addEventListener('pointermove', onThumbMove)
  document.addEventListener('pointerup', onThumbUp)
}

const onThumbMove = (event) => {
  if (!isDragging.value) return
  
  const track = event.target.closest('.fluent-scroll-bar')?.querySelector('.scroll-bar-track')
  if (!track) return
  
  const rect = track.getBoundingClientRect()
  const currentPos = props.orientation === 'vertical' ? event.clientY : event.clientX
  const diff = currentPos - startPos.value
  const trackSize = props.orientation === 'vertical' ? rect.height : rect.width
  
  const range = props.maximum - props.minimum
  const valueDiff = (diff / trackSize) * range
  const newValue = Math.max(props.minimum, Math.min(props.maximum, startValue.value + valueDiff))
  
  emit('update:value', newValue)
}

const onThumbUp = () => {
  isDragging.value = false
  document.removeEventListener('pointermove', onThumbMove)
  document.removeEventListener('pointerup', onThumbUp)
}

onUnmounted(() => {
  document.removeEventListener('pointermove', onThumbMove)
  document.removeEventListener('pointerup', onThumbUp)
})
</script>

<style scoped>
.fluent-scroll-bar {
  position: relative;
}

.fluent-scroll-bar.orientation-vertical {
  width: 12px;
  height: 100%;
}

.fluent-scroll-bar.orientation-horizontal {
  width: 100%;
  height: 12px;
}

.scroll-bar-track {
  position: absolute;
  inset: 0;
  background: transparent;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.scroll-bar-track:hover {
  background: rgba(0, 0, 0, 0.05);
}

.scroll-bar-thumb {
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  opacity: 0;
  transition: opacity 0.2s ease, background 0.2s ease;
  cursor: pointer;
}

.scroll-bar-thumb.is-visible {
  opacity: 1;
}

.scroll-bar-thumb:hover {
  background: rgba(0, 0, 0, 0.5);
}

.scroll-bar-thumb:active {
  background: rgba(0, 0, 0, 0.7);
}

.orientation-vertical .scroll-bar-thumb {
  left: 2px;
  right: 2px;
}

.orientation-horizontal .scroll-bar-thumb {
  top: 2px;
  bottom: 2px;
}
</style>