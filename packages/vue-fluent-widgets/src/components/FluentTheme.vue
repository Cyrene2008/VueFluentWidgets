<template>
  <div 
    class="fluent-theme" 
    :class="themeClasses"
    :style="themeStyles"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { computed, provide, watch } from 'vue'

const props = defineProps({
  theme: { type: String, default: 'system' },
  material: { type: String, default: 'acrylic' },
  accentColor: { type: String, default: '' },
  locale: { type: String, default: 'zh-CN' }
})

const emit = defineEmits(['theme-change', 'material-change'])

// 计算实际主题
const effectiveTheme = computed(() => {
  if (props.theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return props.theme
})

// 主题类名
const themeClasses = computed(() => ({
  [`theme-${effectiveTheme.value}`]: true,
  [`material-${props.material}`]: true
}))

// 主题样式
const themeStyles = computed(() => {
  const styles = {}
  
  if (props.accentColor) {
    styles['--fluent-accent'] = props.accentColor === 'system' ? 'AccentColor' : props.accentColor
  }
  
  // 材质相关变量
  switch (props.material) {
    case 'acrylic':
      styles['--bg-material'] = 'var(--bg-acrylic)'
      styles['--material-blur'] = '30px'
      break
    case 'mica':
      styles['--bg-material'] = 'var(--bg-mica)'
      styles['--material-blur'] = '0px'
      break
    case 'mica-alt':
      styles['--bg-material'] = 'var(--bg-mica-alt)'
      styles['--material-blur'] = '0px'
      break
    default:
      styles['--bg-material'] = 'var(--bg-card)'
      styles['--material-blur'] = '0px'
  }
  
  return styles
})

// 提供给子组件
provide('theme', effectiveTheme)
provide('material', computed(() => props.material))
provide('locale', computed(() => props.locale))

// 监听系统主题变化
if (props.theme === 'system') {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', () => {
    emit('theme-change', effectiveTheme.value)
  })
}
</script>

<style scoped>
.fluent-theme {
  min-height: 100%;
  background: var(--bg-material, transparent);
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* 主题变量在全局CSS中定义，这里只是确保应用 */
.theme-light {
  color-scheme: light;
}

.theme-dark {
  color-scheme: dark;
}

/* 材质效果类 */
.material-acrylic {
  background: var(--bg-material);
  backdrop-filter: blur(var(--material-blur, 30px));
  -webkit-backdrop-filter: blur(var(--material-blur, 30px));
}

.material-mica,
.material-mica-alt {
  background: var(--bg-material);
  /* Mica 使用桌面壁纸颜色，这里用渐变模拟 */
  background-attachment: fixed;
}
</style>
