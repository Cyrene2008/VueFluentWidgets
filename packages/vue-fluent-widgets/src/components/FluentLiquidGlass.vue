<template>
  <div 
    class="fluent-liquid-glass"
    :class="[`variant-${variant}`, { 'is-animated': animated }]"
    :style="glassStyle"
  >
    <div class="glass-layer glass-refraction"></div>
    <div class="glass-layer glass-tint"></div>
    <div class="glass-layer glass-highlight"></div>
    <div class="glass-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'light' }, // light, dark, colored, accent
  blur: { type: Number, default: 20 },
  opacity: { type: Number, default: 0.7 },
  animated: { type: Boolean, default: true },
  accentColor: { type: String, default: '#0078d4' }
})

const glassStyle = computed(() => ({
  '--glass-blur': `${props.blur}px`,
  '--glass-opacity': props.opacity,
  '--accent-color': props.accentColor,
  '--accent-color-rgb': hexToRgb(props.accentColor)
}))

function hexToRgb(value) {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value)
  return match ? `${parseInt(match[1], 16)}, ${parseInt(match[2], 16)}, ${parseInt(match[3], 16)}` : '0, 120, 212'
}
</script>

<style scoped>
.fluent-liquid-glass {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  isolation: isolate;
  background-clip: padding-box;
  transform: translateZ(0);
}

.fluent-liquid-glass::after {
  position: absolute;
  inset: 1px;
  z-index: 0;
  border: 1px solid rgba(255, 255, 255, .38);
  border-radius: calc(var(--radius-md) - 1px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .62), inset 1px 0 0 rgba(255, 255, 255, .24);
  content: '';
  pointer-events: none;
}

.glass-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* Light variant */
.variant-light {
  background: linear-gradient(145deg, rgba(255, 255, 255, .62), rgba(255, 232, 247, .28) 48%, rgba(221, 244, 255, .34));
  backdrop-filter: blur(var(--glass-blur)) saturate(190%) contrast(108%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(190%) contrast(108%);
  border: 1px solid rgba(255, 255, 255, .7);
  box-shadow: 
    0 16px 38px rgba(135, 65, 112, .16),
    0 3px 9px rgba(234, 94, 193, .12),
    inset 0 1px 0 rgba(255, 255, 255, .88),
    inset 0 -1px 0 rgba(166, 98, 146, .12);
}

.variant-light .glass-tint {
  background: linear-gradient(125deg, rgba(255, 255, 255, .34), rgba(255, 148, 220, .08) 52%, rgba(94, 205, 255, .1));
}

.variant-light .glass-highlight {
  background: radial-gradient(circle at 18% 0%, rgba(255,255,255,.9), transparent 34%), linear-gradient(110deg, transparent 28%, rgba(255,255,255,.22) 42%, transparent 56%);
}

/* Dark variant */
.variant-dark {
  background: linear-gradient(145deg, rgba(54, 35, 50, .82), rgba(23, 18, 29, .72));
  backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.variant-dark .glass-tint {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.05) 0%, 
    transparent 50%, 
    rgba(255, 255, 255, 0.02) 100%);
}

.variant-dark .glass-highlight {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 30%
  );
}

/* Colored variant */
.variant-colored {
  background: linear-gradient(
    135deg,
    rgba(246, 107, 204, .5) 0%,
    rgba(113, 188, 255, .36) 48%,
    rgba(163, 105, 236, .46) 100%
  );
  backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

/* Accent variant */
.variant-accent {
  background: linear-gradient(
    135deg,
    rgba(var(--accent-color-rgb), 0.3) 0%,
    rgba(var(--accent-color-rgb), 0.1) 100%
  );
  backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  border: 1px solid rgba(var(--accent-color-rgb), 0.2);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* Refraction effect */
.glass-refraction {
  background:
    radial-gradient(circle at 8% 15%, rgba(255,255,255,.54), transparent 22%),
    radial-gradient(circle at 92% 82%, rgba(119,213,255,.16), transparent 30%),
    linear-gradient(135deg, rgba(255,255,255,.18), transparent 44%, rgba(255,255,255,.08));
  filter: saturate(130%);
}

/* Animation */
.fluent-liquid-glass.is-animated {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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

/* Content */
.glass-content {
  position: relative;
  z-index: 1;
}
</style>
