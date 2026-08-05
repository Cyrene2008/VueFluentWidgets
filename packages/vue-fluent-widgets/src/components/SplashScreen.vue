<template>
  <Transition name="splash">
    <div v-if="modelValue" class="fluent-splash-screen">
      <div class="splash-content">
        <div v-if="logo" class="splash-logo">
          <img :src="logo" alt="Logo" />
        </div>
        <div v-if="title" class="splash-title">{{ title }}</div>
        <div v-if="subtitle" class="splash-subtitle">{{ subtitle }}</div>
        <FluentProgressRing v-if="showProgress" :size="32" />
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { watch } from 'vue'
import FluentProgressRing from './FluentProgressRing.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  logo: { type: String, default: '' },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  showProgress: { type: Boolean, default: true },
  duration: { type: Number, default: 0 }
})

const emit = defineEmits(['update:modelValue', 'done'])

watch(() => props.modelValue, (value) => {
  if (value && props.duration > 0) {
    setTimeout(() => {
      emit('update:modelValue', false)
      emit('done')
    }, props.duration)
  }
})
</script>

<style scoped>
.fluent-splash-screen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-base);
}

.splash-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.splash-logo img {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

.splash-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
}

.splash-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
}

.splash-enter-active {
  transition: opacity 0.3s ease;
}

.splash-leave-active {
  transition: opacity 0.5s ease;
}

.splash-enter-from,
.splash-leave-to {
  opacity: 0;
}
</style>