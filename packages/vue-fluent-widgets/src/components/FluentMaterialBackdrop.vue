<template>
  <div
    class="fluent-material-backdrop"
    :class="[`mb-${materialType}`, { 'mb-no-blur': !blurSupported }]"
    :style="backdropStyles"
  >
    <!-- Mica: 壁纸层（wallpaper / 渐变模拟桌面壁纸） -->
    <div v-if="hasWallpaperLayer" class="mb-layer mb-wallpaper" aria-hidden="true"></div>

    <!-- 色彩层 (tint) -->
    <div v-if="showTint" class="mb-layer mb-tint" aria-hidden="true"></div>

    <!-- 亮度层 (luminosity) -->
    <div v-if="showLuminosity" class="mb-layer mb-luminosity" aria-hidden="true"></div>

    <!-- 噪点纹理层 (grain) -->
    <div v-if="showNoise" class="mb-layer mb-noise" aria-hidden="true"></div>

    <!-- 折射/高光层（Liquid Glass 专用） -->
    <div v-if="isLiquidGlass" class="mb-layer mb-refraction" aria-hidden="true"></div>

    <!-- 模糊层：承载 backdrop-filter -->
    <div v-if="showBlur" class="mb-layer mb-blur" aria-hidden="true"></div>

    <!-- 内容 -->
    <div class="mb-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { getMaterialStyles, supportsBackdropFilter } from '../utils/material'

const props = defineProps({
  material: { type: [String, Object], default: 'acrylic' },
  theme: { type: String, default: 'light' }, // light | dark
  wallpaper: { type: String, default: '' }
})

// —— 背景降级检测：不支持 backdrop-filter 时回退纯色（WinUI Acrylic fallback 行为）——
const blurSupported = ref(true)
if (typeof window !== 'undefined') {
  blurSupported.value = supportsBackdropFilter()
}

const materialType = computed(() =>
  typeof props.material === 'string' ? props.material : props.material.type
)

const config = computed(() => {
  const styles = getMaterialStyles(props.material, props.theme === 'dark' ? 'dark' : 'light')
  return styles
})

const isAcrylic = computed(() => materialType.value === 'acrylic')
const isMica = computed(() => materialType.value === 'mica' || materialType.value === 'mica-alt')
const isLiquidGlass = computed(() => materialType.value === 'liquid-glass')
const isSolid = computed(() => materialType.value === 'solid' || materialType.value === 'none')

const hasWallpaperLayer = computed(() => isMica.value)

const showTint = computed(() => {
  if (isSolid.value) return false
  return parseFloat(config.value['--material-tint-opacity'] || '1') > 0
})

const showLuminosity = computed(() => {
  if (isSolid.value || isMica.value) return false
  return parseFloat(config.value['--material-luminosity-opacity'] || '0') > 0
})

const showNoise = computed(() => {
  if (isSolid.value || isMica.value) return false
  return parseFloat(config.value['--material-noise-opacity'] || '0') > 0
})

const showBlur = computed(() => {
  if (isSolid.value || isMica.value) return false
  return blurSupported.value && parseFloat(config.value['--material-blur'] || '0') > 0
})

const backdropStyles = computed(() => {
  const styles = { ...config.value }

  // 壁纸：优先组件 prop，其次使用者通过 CSS 配置 --mica-wallpaper，最后渐变模拟
  if (isMica.value) {
    const wallpaper = props.wallpaper || ''
    styles['--mb-wallpaper-mode'] = wallpaper ? 'image' : 'auto'
    if (wallpaper) styles['--mb-wallpaper'] = wallpaper
  }

  return styles
})
</script>

<style scoped>
.fluent-material-backdrop {
  position: relative;
  isolation: isolate;
  border-radius: inherit;
  overflow: hidden;
  transform: translateZ(0);
}

.mb-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* 壁纸层：Mica 采样桌面壁纸的 Web 等效物 */
.mb-wallpaper {
  z-index: 0;
}

/* image 模式：使用组件 prop 传入的壁纸 */
.fluent-material-backdrop[style*='--mb-wallpaper-mode: image'] .mb-wallpaper {
  background-image: var(--mb-wallpaper);
  background-size: cover;
  background-position: center;
  filter: brightness(1) saturate(0.9);
}

/* auto 模式：使用全局 --mica-wallpaper（FluentTheme wallpaper 提供），无则渐变模拟 */
.fluent-material-backdrop[style*='--mb-wallpaper-mode: auto'] .mb-wallpaper {
  background-image: var(--mica-wallpaper, none);
  background-size: cover;
  background-position: center;
}

.fluent-material-backdrop[style*='--mb-wallpaper-mode: auto'] .mb-wallpaper:not([style]) {
  background-image: var(--mica-wallpaper, linear-gradient(135deg, #e8e8e8, #d8d8d8));
}

/* tint 层 */
.mb-tint {
  z-index: 1;
  background: var(--material-tint-color, transparent);
  opacity: var(--material-tint-opacity, 1);
}

/* luminosity 层 */
.mb-luminosity {
  z-index: 2;
  background: var(--material-luminosity-color, transparent);
  opacity: var(--material-luminosity-opacity, 0);
  mix-blend-mode: screen;
}

/* 噪点纹理层（WinUI grain） */
.mb-noise {
  z-index: 3;
  background-image: var(--material-noise, none);
  background-size: 160px 160px;
  opacity: var(--material-noise-opacity, 0);
}

/* 折射层（液态玻璃：高光 + 边缘色散 + 折射条纹） */
.mb-refraction {
  z-index: 4;
  background:
    radial-gradient(circle at 18% 0%, rgba(255, 255, 255, 0.5), transparent 30%),
    radial-gradient(circle at 82% 100%, rgba(160, 210, 255, 0.14), transparent 36%),
    linear-gradient(115deg, transparent 30%, rgba(255, 255, 255, 0.18) 46%, transparent 58%);
  filter: saturate(1.25);
}

/* 模糊层 */
.mb-blur {
  z-index: 5;
  backdrop-filter: blur(var(--material-blur)) saturate(var(--material-saturate));
  -webkit-backdrop-filter: blur(var(--material-blur)) saturate(var(--material-saturate));
}

/* 降级：无 backdrop-filter → 纯色回退 */
.mb-no-blur {
  background: var(--material-fallback, var(--bg-card-solid));
}

.mb-content {
  position: relative;
  z-index: 6;
}
</style>
