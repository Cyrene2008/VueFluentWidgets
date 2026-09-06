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
import { getMaterialStyles, MaterialPresets } from '../utils/material'

const props = defineProps({
  theme: { type: String, default: 'system' },
  material: { type: String, default: 'acrylic' },
  /** 全局壁纸地址（material="mica"/"mica-alt" 时作为桌面壁纸采样源） */
  wallpaper: { type: String, default: '' },
  accentColor: { type: String, default: '' },
  locale: { type: String, default: 'zh-CN' }
})

const emit = defineEmits(['theme-change', 'material-change'])

// 计算实际主题
const effectiveTheme = computed(() => {
  if (props.theme === 'system') {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return props.theme
})

// 主题类名
const themeClasses = computed(() => ({
  [`theme-${effectiveTheme.value}`]: true,
  [`material-${props.material}`]: true
}))

// 主题样式：材质变量统一走工具函数（含降级回退），Mica 壁纸独立注入
const themeStyles = computed(() => {
  const styles = getMaterialStyles(props.material, effectiveTheme.value)

  if (props.accentColor) {
    styles['--fluent-accent'] = props.accentColor === 'system' ? 'AccentColor' : props.accentColor
  }

  // 全局壁纸变量：Mica 材质层会读取它
  if (props.wallpaper) {
    styles['--mica-wallpaper'] = props.wallpaper
  }

  // 兼容旧用法：--bg-material / --material-blur 仍然可用
  if (props.material === 'acrylic') {
    styles['--bg-material'] = 'var(--bg-acrylic)'
    styles['--material-blur'] = styles['--material-blur'] || '30px'
  } else if (props.material === 'mica') {
    styles['--bg-material'] = 'var(--bg-mica)'
  } else if (props.material === 'mica-alt') {
    styles['--bg-material'] = 'var(--bg-mica-alt)'
  } else {
    styles['--bg-material'] = 'var(--bg-card)'
  }

  return styles
})

// 提供给子组件
provide('theme', effectiveTheme)
provide('material', computed(() => props.material))
provide('locale', computed(() => props.locale))

// 监听系统主题变化
if (props.theme === 'system' && typeof window !== 'undefined') {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', () => {
    emit('theme-change', effectiveTheme.value)
  })
}

watch(
  () => props.material,
  value => emit('material-change', value)
)
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
  backdrop-filter: blur(var(--material-blur, 30px));
  -webkit-backdrop-filter: blur(var(--material-blur, 30px));
}

.material-mica,
.material-mica-alt {
  /* Mica 使用桌面壁纸颜色，这里用 --mica-wallpaper 或渐变模拟 */
  background-attachment: fixed;
}
</style>
