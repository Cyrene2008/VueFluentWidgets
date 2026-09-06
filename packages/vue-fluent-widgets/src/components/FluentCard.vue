<template>
  <div
    :class="['fluent-card', `material-${material}`, { hoverable, padding: true }]"
    @click="$emit('click', $event)"
  >
    <FluentMaterialBackdrop :material="material" :theme="theme" class="fluent-card-backdrop" />
    <div class="fluent-card-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
import FluentMaterialBackdrop from './FluentMaterialBackdrop.vue'

const props = defineProps({
  hoverable: { type: Boolean, default: false },
  material: { type: String, default: 'acrylic' },
  /** 壁纸地址（仅 mica / mica-alt 生效） */
  wallpaper: { type: String, default: '' }
})

defineEmits(['click'])

// 继承 FluentTheme 的主题，未嵌套时默认 light
const injectedTheme = inject('theme', null)
const theme = computed(() => {
  if (injectedTheme && typeof injectedTheme.value === 'string') return injectedTheme.value
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
})
</script>

<style scoped>
.fluent-card {
  position: relative;
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-4);
  transition: all var(--duration-normal) var(--ease-standard);
  overflow: hidden;
}

.fluent-card-backdrop {
  position: absolute;
  inset: 0;
}

.fluent-card-content {
  position: relative;
  z-index: 1;
}

.fluent-card.material-solid {
  background: var(--bg-card-solid);
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.fluent-card.material-solid .fluent-card-backdrop {
  display: none;
}

.fluent-card.material-mica,
.fluent-card.material-mica-alt {
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.fluent-card.padding {
  padding: 20px;
}

.fluent-card.hoverable:hover {
  box-shadow: var(--shadow-8);
  border-color: var(--border-strong);
  transform: translateY(-1px);
}

.fluent-card.hoverable:active {
  transform: translateY(0);
  box-shadow: var(--shadow-4);
}
</style>
