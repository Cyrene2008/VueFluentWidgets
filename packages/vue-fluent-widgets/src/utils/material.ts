/**
 * Fluent Material System
 * 
 * 使用方式：
 * 1. 全局设置：在 App.vue 中使用 <FluentTheme material="mica">
 * 2. 局部覆盖：在组件上使用 <FluentCard material="acrylic">
 * 3. CSS 变量：直接使用 var(--bg-material)
 */

// 材质类型
export type MaterialType = 'solid' | 'acrylic' | 'mica' | 'mica-alt' | 'none'

// 材质配置
export interface MaterialConfig {
  type: MaterialType
  tintOpacity?: number
  luminosityOpacity?: number
  blurAmount?: number
}

// 预设材质
export const MaterialPresets = {
  solid: {
    type: 'solid' as const,
    tintOpacity: 1,
    luminosityOpacity: 1,
    blurAmount: 0
  },
  acrylic: {
    type: 'acrylic' as const,
    tintOpacity: 0.8,
    luminosityOpacity: 0.65,
    blurAmount: 30
  },
  mica: {
    type: 'mica' as const,
    tintOpacity: 0.8,
    luminosityOpacity: 0.75,
    blurAmount: 0
  },
  'mica-alt': {
    type: 'mica-alt' as const,
    tintOpacity: 0.75,
    luminosityOpacity: 0.7,
    blurAmount: 0
  },
  none: {
    type: 'none' as const,
    tintOpacity: 0,
    luminosityOpacity: 0,
    blurAmount: 0
  }
}

// 生成材质 CSS 变量
export function getMaterialStyles(material: MaterialType | MaterialConfig): Record<string, string> {
  const config = typeof material === 'string' 
    ? MaterialPresets[material] || MaterialPresets.solid
    : material

  return {
    '--material-type': config.type,
    '--material-tint-opacity': String(config.tintOpacity ?? 1),
    '--material-luminosity-opacity': String(config.luminosityOpacity ?? 1),
    '--material-blur': `${config.blurAmount ?? 0}px`
  }
}
