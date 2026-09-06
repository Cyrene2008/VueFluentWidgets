/**
 * Fluent Material System
 *
 * 对齐 WinUI 3 / Windows 11 材质模型（Mica、Mica Alt、Acrylic、Liquid Glass）：
 * - Acrylic：tint 层 + luminosity 层 + blur + 噪点纹理，不支持 backdrop-filter 时回退为纯色
 * - Mica：采样"壁纸"着色层（Web 中用 wallpaper 图片或渐变模拟桌面壁纸），无模糊
 * - Liquid Glass：折射层 + 边缘色散 + 动态高光 + 噪点（近似 WinUI 液态玻璃）
 *
 * 使用方式：
 * 1. 全局设置：在 App.vue 中使用 <FluentTheme material="acrylic">
 * 2. 局部覆盖：在组件上使用 <FluentCard material="acrylic">
 * 3. CSS 变量：直接使用 var(--bg-material) / var(--material-noise)
 */

// 材质类型
export type MaterialType = 'solid' | 'acrylic' | 'mica' | 'mica-alt' | 'liquid-glass' | 'none'

// 材质配置
export interface MaterialConfig {
  type: MaterialType
  /** 色彩层颜色（Acrylic 的 tint、Mica 的着色层） */
  tintColor?: string
  tintOpacity?: number
  /** 亮度层颜色（Acrylic 的 luminosity layer） */
  luminosityColor?: string
  luminosityOpacity?: number
  /** 背景模糊强度 */
  blurAmount?: number
  /** 饱和度增强 */
  saturate?: number
  /** 噪点纹理强度 (0~1) */
  noiseOpacity?: number
  /** 壁纸地址（Mica 用；不传则使用全局 --mica-wallpaper 或渐变模拟） */
  wallpaper?: string
  /** backdrop-filter 不可用时的回退纯色（默认取主题背景） */
  fallbackColor?: string
}

// 内置噪点纹理（SVG feTurbulence，WinUI Acrylic 的 grain 噪声等效物）
let noiseDataUriCache: string | null = null

export function getNoiseDataUri(): string {
  if (noiseDataUriCache) return noiseDataUriCache
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="160" height="160" filter="url(#n)" opacity="0.55"/></svg>`
  noiseDataUriCache = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
  return noiseDataUriCache
}

// 检测当前环境是否支持 backdrop-filter（用于降级回退）
let backdropSupportCache: boolean | null = null

export function supportsBackdropFilter(): boolean {
  if (backdropSupportCache !== null) return backdropSupportCache
  if (typeof window === 'undefined') return false
  const style = getComputedStyle(document.documentElement)
  backdropSupportCache = typeof style.backdropFilter === 'string' || typeof (style as any).webkitBackdropFilter === 'string'
  return backdropSupportCache
}

// 预设材质（分主题，对齐 WinUI 官方建议值）
export interface MaterialPreset {
  type: MaterialType
  tintColor: string
  tintOpacity: number
  luminosityColor: string
  luminosityOpacity: number
  blurAmount: number
  saturate: number
  noiseOpacity: number
  fallbackColor: string
}

export const MaterialPresets: Record<MaterialType, MaterialPreset> & {
  light: Record<string, Partial<MaterialPreset>>
  dark: Record<string, Partial<MaterialPreset>>
} = {
  solid: {
    type: 'solid',
    tintColor: 'transparent',
    tintOpacity: 1,
    luminosityColor: 'transparent',
    luminosityOpacity: 0,
    blurAmount: 0,
    saturate: 1,
    noiseOpacity: 0,
    fallbackColor: '#ffffff'
  },
  acrylic: {
    type: 'acrylic',
    tintColor: '#fcfcfc',
    tintOpacity: 0.8,
    luminosityColor: '#fcfcfc',
    luminosityOpacity: 0.65,
    blurAmount: 30,
    saturate: 1.4,
    noiseOpacity: 0.06,
    fallbackColor: '#f7f7f7'
  },
  mica: {
    type: 'mica',
    tintColor: '#f3f3f3',
    tintOpacity: 0.9,
    luminosityColor: 'transparent',
    luminosityOpacity: 0,
    blurAmount: 0,
    saturate: 1,
    noiseOpacity: 0,
    fallbackColor: '#f3f3f3'
  },
  'mica-alt': {
    type: 'mica-alt',
    tintColor: '#ececec',
    tintOpacity: 0.92,
    luminosityColor: 'transparent',
    luminosityOpacity: 0,
    blurAmount: 0,
    saturate: 1,
    noiseOpacity: 0,
    fallbackColor: '#ececec'
  },
  'liquid-glass': {
    type: 'liquid-glass',
    tintColor: '#ffffff',
    tintOpacity: 0.5,
    luminosityColor: '#ffffff',
    luminosityOpacity: 0.28,
    blurAmount: 24,
    saturate: 1.8,
    noiseOpacity: 0.05,
    fallbackColor: 'rgba(255, 255, 255, 0.75)'
  },
  none: {
    type: 'none',
    tintColor: 'transparent',
    tintOpacity: 0,
    luminosityColor: 'transparent',
    luminosityOpacity: 0,
    blurAmount: 0,
    saturate: 1,
    noiseOpacity: 0,
    fallbackColor: 'transparent'
  },
  // 主题覆写（深色下 WinUI 使用更暗的 tint）
  light: {
    acrylic: {
      tintColor: '#fcfcfc',
      luminosityColor: '#fcfcfc',
      fallbackColor: '#f7f7f7'
    },
    mica: { tintColor: '#f3f3f3', fallbackColor: '#f3f3f3' },
    'mica-alt': { tintColor: '#ececec', fallbackColor: '#ececec' }
  },
  dark: {
    acrylic: {
      tintColor: '#2c2c2c',
      luminosityColor: '#1c1c1c',
      tintOpacity: 0.85,
      luminosityOpacity: 0.5,
      fallbackColor: '#202020'
    },
    mica: { tintColor: '#202020', fallbackColor: '#202020' },
    'mica-alt': { tintColor: '#2b2b2b', fallbackColor: '#2b2b2b' },
    'liquid-glass': {
      tintColor: '#1f1f1f',
      tintOpacity: 0.6,
      luminosityColor: '#141414',
      luminosityOpacity: 0.3,
      fallbackColor: 'rgba(32, 32, 32, 0.8)'
    }
  }
}

function resolveConfig(material: MaterialType | MaterialConfig, theme: 'light' | 'dark' = 'light'): MaterialPreset {
  const base: MaterialPreset =
    typeof material === 'string'
      ? { ...MaterialPresets[material] || MaterialPresets.solid }
      : {
          ...(MaterialPresets[material.type] || MaterialPresets.solid),
          ...material
        }

  const themeOverride = typeof material === 'string' ? MaterialPresets[theme][material] : undefined
  if (themeOverride) {
    Object.assign(base, themeOverride)
    base.type = typeof material === 'string' ? material : material.type
  }
  return base
}

// 生成材质 CSS 变量
export function getMaterialStyles(
  material: MaterialType | MaterialConfig,
  theme: 'light' | 'dark' = 'light'
): Record<string, string> {
  const config = resolveConfig(material, theme)
  const useFallback = config.type !== 'none' && !supportsBackdropFilter()

  const styles: Record<string, string> = {
    '--material-type': config.type,
    '--material-tint-color': config.tintColor,
    '--material-tint-opacity': String(config.tintOpacity ?? 1),
    '--material-luminosity-color': config.luminosityColor || 'transparent',
    '--material-luminosity-opacity': String(config.luminosityOpacity ?? 0),
    '--material-blur': `${config.blurAmount ?? 0}px`,
    '--material-saturate': String(config.saturate ?? 1),
    '--material-noise-opacity': String(config.noiseOpacity ?? 0),
    '--material-noise': getNoiseDataUri()
  }

  // 降级：不支持 backdrop-filter 时用纯色回退（WinUI Acrylic fallback 行为）
  if (useFallback) {
    styles['--material-blur'] = '0px'
    styles['--material-tint-opacity'] = '1'
    styles['--material-luminosity-opacity'] = '0'
    styles['--material-noise-opacity'] = '0'
    styles['--material-fallback'] = config.fallbackColor
  }

  return styles
}

// 生成用于 <FluentCard> 类名的材质类
export function getMaterialClass(material: MaterialType | MaterialConfig): string {
  const type = typeof material === 'string' ? material : material.type
  return `material-${type}`
}
