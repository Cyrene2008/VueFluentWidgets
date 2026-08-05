<template>
  <div class="fluent-image-viewer" :class="{ 'is-loading': isLoading, 'has-error': hasError, clickable }">
    <img
      v-if="!hasError"
      :src="src"
      :alt="alt"
      :style="imageStyle"
      loading="lazy"
      decoding="async"
      @load="onLoad"
      @error="onError"
      @click="onImageClick"
    />
    <div v-if="isLoading" class="image-loading">
      <FluentProgressRing :size="32" />
    </div>
    <div v-if="hasError" class="image-error">
      <FluentIcon icon="image-20-regular" :width="24" />
      <span>图片加载失败</span>
    </div>
    <div v-if="caption" class="image-caption">{{ caption }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FluentIcon from './FluentIcon.vue'
import FluentProgressRing from './FluentProgressRing.vue'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  caption: { type: String, default: '' },
  width: { type: [Number, String], default: 'auto' },
  height: { type: [Number, String], default: 'auto' },
  fit: { type: String, default: 'contain' },
  clickable: { type: Boolean, default: false }
})

const emit = defineEmits(['click', 'load', 'error'])

const isLoading = ref(true)
const hasError = ref(false)

const cssLength = (value) => {
  if (typeof value === 'number') return `${value}px`
  return value
}

const imageStyle = computed(() => ({
  width: cssLength(props.width),
  height: cssLength(props.height),
  objectFit: props.fit,
  cursor: props.clickable ? 'pointer' : 'default'
}))

const onLoad = () => {
  isLoading.value = false
  hasError.value = false
  emit('load')
}

const onError = () => {
  isLoading.value = false
  hasError.value = true
  emit('error')
}

const onImageClick = () => {
  if (props.clickable) {
    emit('click')
  }
}
</script>

<style scoped>
.fluent-image-viewer {
  position: relative;
  display: inline-block;
  overflow: hidden;
  border-radius: var(--radius-md);
  background: var(--bg-card);
}

.fluent-image-viewer img {
  display: block;
  max-width: 100%;
  height: auto;
  transition: transform 0.3s ease;
}

.fluent-image-viewer.clickable img:hover {
  transform: scale(1.05);
}

.image-loading,
.image-error {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--text-muted);
  font-size: 14px;
}

.image-caption {
  padding: 8px 12px;
  font-size: 12px;
  color: var(--text-secondary);
  text-align: center;
  background: var(--bg-card);
  border-top: 1px solid var(--border-strong);
}
</style>
