<template>
  <div class="fluent-image" :class="{ 'is-loading': isLoading, 'has-error': hasError }">
    <img
      v-if="!hasError"
      :src="src"
      :alt="alt"
      :style="imageStyle"
      @load="onLoad"
      @error="onError"
    />
    <div v-if="isLoading" class="image-placeholder">
      <FluentProgressRing :size="32" />
    </div>
    <div v-if="hasError" class="image-error">
      <FluentIcon icon="image-20-regular" :width="24" />
      <span>图片加载失败</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FluentIcon from './FluentIcon.vue'
import FluentProgressRing from './FluentProgressRing.vue'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  width: { type: [Number, String], default: 'auto' },
  height: { type: [Number, String], default: 'auto' },
  fit: { type: String, default: 'contain' } // contain, cover, fill, none
})

const isLoading = ref(true)
const hasError = ref(false)

const cssLength = (value) => {
  if (typeof value === 'number') return `${value}px`
  return value
}

const imageStyle = computed(() => ({
  width: cssLength(props.width),
  height: cssLength(props.height),
  objectFit: props.fit
}))

const onLoad = () => {
  isLoading.value = false
  hasError.value = false
}

const onError = () => {
  isLoading.value = false
  hasError.value = true
}
</script>

<style scoped>
.fluent-image {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: var(--bg-card);
  border-radius: var(--radius-md);
}

.fluent-image img {
  max-width: 100%;
  max-height: 100%;
  display: block;
}

.image-placeholder,
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
</style>