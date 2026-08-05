<template>
  <div 
    class="fluent-theme-wrapper"
    :class="[`theme-${effectiveTheme}`]"
    :style="themeStyle"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  theme: { type: String, default: 'system' }, // light, dark, system
  accentColor: { type: String, default: '' },
  fontFamily: { type: String, default: '' }
})

const effectiveTheme = computed(() => {
  if (props.theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return props.theme
})

const themeStyle = computed(() => {
  const style = {}
  
  if (props.accentColor) {
    style['--accent'] = props.accentColor
  }
  
  if (props.fontFamily) {
    style['--font-ui'] = props.fontFamily
  }
  
  return style
})
</script>

<style scoped>
.fluent-theme-wrapper {
  color-scheme: light dark;
}

.theme-light {
  color-scheme: light;
}

.theme-dark {
  color-scheme: dark;
}
</style>