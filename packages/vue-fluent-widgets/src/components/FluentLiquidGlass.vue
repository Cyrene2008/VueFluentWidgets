<template>
  <div
    class="fluent-liquid-glass"
    :class="[`variant-${variant}`, { 'is-animated': animated }]"
    :style="glassStyle"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <!-- 折射层：模拟光在玻璃中的弯曲 -->
    <div class="glass-layer glass-refraction"></div>

    <!-- 动态高光层：镜面光斑跟随指针 -->
    <div class="glass-layer glass-specular"></div>

    <!-- 色彩层 -->
    <div class="glass-layer glass-tint"></div>

    <!-- 噪点纹理层（对齐 WinUI 材质 grain） -->
    <div v-if="noise" class="glass-layer glass-noise"></div>

    <!-- 色散层：边缘光谱偏移（红/青） -->
    <div v-if="dispersion" class="glass-layer glass-dispersion"></div>

    <!-- 边缘高光 -->
    <div class="glass-edge"></div>

    <div class="glass-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { getNoiseDataUri } from '../utils/material'

const props = defineProps({
  variant: { type: String, default: 'light' }, // light, dark, colored, accent, clear
  blur: { type: Number, default: 20 },
  opacity: { type: Number, default: 0.7 },
  animated: { type: Boolean, default: true },
  accentColor: { type: String, default: '#0078d4' },
  /** 是否启用噪点纹理 */
  noise: { type: Boolean, default: true },
  /** 是否启用边缘色散（光谱偏移） */
  dispersion: { type: Boolean, default: true },
  /** 是否启用边缘折射扭曲 */
  refraction: { type: Boolean, default: true },
  /** 边缘色散强度 (0~1) */
  dispersionStrength: { type: Number, default: 0.5 },
  /** 是否启用指针跟踪高光 */
  pointerTracking: { type: Boolean, default: true },
  radius: { type: String, default: '' }
})

const pointer = ref({ x: 50, y: 50, active: false })

const glassStyle = computed(() => ({
  '--glass-blur': `${props.blur}px`,
  '--glass-opacity': props.opacity,
  '--glass-x': `${pointer.value.x}%`,
  '--glass-y': `${pointer.value.y}%`,
  '--glass-accent': props.accentColor,
  '--glass-accent-rgb': hexToRgb(props.accentColor),
  '--glass-dispersion': String(props.dispersionStrength),
  '--glass-noise-image': getNoiseDataUri()
}))

function hexToRgb(value) {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value)
  return match
    ? `${parseInt(match[1], 16)}, ${parseInt(match[2], 16)}, ${parseInt(match[3], 16)}`
    : '0, 120, 212'
}

function onPointerMove(event) {
  if (!props.pointerTracking) return
  const rect = event.currentTarget.getBoundingClientRect()
  pointer.value = {
    x: ((event.clientX - rect.left) / rect.width) * 100,
    y: ((event.clientY - rect.top) / rect.height) * 100,
    active: true
  }
}

function onPointerLeave() {
  if (!props.pointerTracking) return
  pointer.value = { ...pointer.value, active: false }
}

onMounted(() => {
  // 预载噪点纹理 URL（避免首帧闪烁）
  void getNoiseDataUri()
})
</script>

<style scoped>
.fluent-liquid-glass {
  position: relative;
  border-radius: var(--radius-md, 8px);
  overflow: hidden;
  isolation: isolate;
  background-clip: padding-box;
  transform: translateZ(0);
  --glass-radius: var(--radius-md, 8px);
}

.fluent-liquid-glass[style*='--glass-radius'] {
  border-radius: var(--glass-radius);
}

.glass-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* —— 折射层：用明暗条纹 + 弯曲渐变模拟光线穿过玻璃 —— */
.glass-refraction {
  z-index: 1;
  opacity: var(--glass-refraction-opacity, 1);
  background:
    radial-gradient(circle at 8% 15%, rgba(255, 255, 255, 0.42), transparent 24%),
    radial-gradient(circle at 92% 82%, rgba(120, 200, 255, 0.14), transparent 32%),
    conic-gradient(
      from 215deg at 50% 50%,
      transparent 0deg,
      rgba(255, 255, 255, 0.08) 28deg,
      transparent 55deg,
      rgba(255, 255, 255, 0.05) 90deg,
      transparent 120deg,
      rgba(140, 210, 255, 0.07) 200deg,
      transparent 235deg,
      rgba(255, 255, 255, 0.06) 300deg,
      transparent 360deg
    );
  filter: saturate(1.3);
}

/* —— 动态高光：镜面光斑跟随指针 —— */
.glass-specular {
  z-index: 2;
  background:
    radial-gradient(
      circle at var(--glass-x, 50%) var(--glass-y, 50%),
      rgba(255, 255, 255, 0.32) 0%,
      rgba(255, 255, 255, 0.1) 14%,
      transparent 34%
    );
  opacity: 0;
  transition: opacity 0.4s ease;
}

.fluent-liquid-glass:hover .glass-specular,
.fluent-liquid-glass.specular-active .glass-specular {
  opacity: 1;
}

/* —— 色彩层 —— */
.glass-tint {
  z-index: 3;
}

/* —— 噪点层 —— */
.glass-noise {
  z-index: 4;
  background-image: var(--glass-noise-image);
  background-size: 160px 160px;
  opacity: 0.05;
  mix-blend-mode: overlay;
}

/* —— 边缘色散：红/青光谱偏移，模拟棱镜效果 —— */
.glass-dispersion {
  z-index: 5;
  opacity: calc(var(--glass-dispersion, 0.5) * 0.35);
  box-shadow:
    inset 1px 0 0 rgba(255, 90, 90, 0.35),
    inset -1px 0 0 rgba(80, 180, 255, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.22);
}

/* —— 边缘高光（玻璃厚度感） —— */
.glass-edge {
  position: absolute;
  inset: 1px;
  z-index: 6;
  border: 1px solid rgba(255, 255, 255, 0.38);
  border-radius: calc(var(--glass-radius) - 1px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.62),
    inset 1px 0 0 rgba(255, 255, 255, 0.24);
  pointer-events: none;
}

/* =============== 变体 =============== */

/* Light：透亮白玻璃 */
.variant-light {
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.6),
    rgba(255, 232, 247, 0.26) 48%,
    rgba(221, 244, 255, 0.32)
  );
  backdrop-filter: blur(var(--glass-blur)) saturate(190%) contrast(108%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(190%) contrast(108%);
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow:
    0 16px 38px rgba(135, 65, 112, 0.16),
    0 3px 9px rgba(234, 94, 193, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.88),
    inset 0 -1px 0 rgba(166, 98, 146, 0.12);
}

.variant-light .glass-tint {
  background: linear-gradient(
    125deg,
    rgba(255, 255, 255, 0.32),
    rgba(255, 148, 220, 0.07) 52%,
    rgba(94, 205, 255, 0.09)
  );
}

/* Dark：夜色玻璃 */
.variant-dark {
  background: linear-gradient(145deg, rgba(54, 35, 50, 0.82), rgba(23, 18, 29, 0.72));
  backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.variant-dark .glass-tint {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.05) 0%,
    transparent 50%,
    rgba(255, 255, 255, 0.02) 100%
  );
}

.variant-dark .glass-specular {
  background: radial-gradient(
    circle at var(--glass-x, 50%) var(--glass-y, 50%),
    rgba(255, 255, 255, 0.18) 0%,
    rgba(255, 255, 255, 0.06) 14%,
    transparent 34%
  );
}

/* Colored：彩色渐变玻璃 */
.variant-colored {
  background: linear-gradient(
    135deg,
    rgba(246, 107, 204, 0.5) 0%,
    rgba(113, 188, 255, 0.36) 48%,
    rgba(163, 105, 236, 0.46) 100%
  );
  backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.variant-colored .glass-tint {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    transparent 55%,
    rgba(255, 255, 255, 0.05)
  );
}

/* Accent：主题色玻璃 */
.variant-accent {
  background: linear-gradient(
    135deg,
    rgba(var(--glass-accent-rgb), 0.3) 0%,
    rgba(var(--glass-accent-rgb), 0.1) 100%
  );
  backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  border: 1px solid rgba(var(--glass-accent-rgb), 0.2);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* Clear：最小化玻璃（近乎透明，仅保留折射与高光） */
.variant-clear {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(var(--glass-blur)) saturate(160%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.32);
  box-shadow:
    0 6px 24px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.variant-clear .glass-tint {
  background: transparent;
}

.variant-clear .glass-noise {
  opacity: 0.03;
}

/* =============== 动画 =============== */
.fluent-liquid-glass.is-animated {
  transition: box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fluent-liquid-glass.is-animated:hover {
  transform: translateY(-3px) scale(1.012);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.fluent-liquid-glass.is-animated:active {
  transform: scale(0.99);
}

/* =============== 内容 =============== */
.glass-content {
  position: relative;
  z-index: 7;
}
</style>
