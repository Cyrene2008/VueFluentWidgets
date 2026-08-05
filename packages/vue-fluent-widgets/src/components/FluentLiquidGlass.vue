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
  '--accent-color': props.accentColor
}))
</script>

<style scoped>
.fluent-liquid-glass {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  isolation: isolate;
}

.glass-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* Light variant */
.variant-light {
  background: rgba(255, 255, 255, var(--glass-opacity));
  backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.variant-light .glass-tint {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.1) 0%, 
    transparent 50%, 
    rgba(255, 255, 255, 0.05) 100%);
}

.variant-light .glass-highlight {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.3) 0%,
    transparent 30%,
    transparent 70%,
    rgba(255, 255, 255, 0.1) 100%
  );
}

/* Dark variant */
.variant-dark {
  background: rgba(0, 0, 0, var(--glass-opacity));
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
    rgba(0, 120, 212, 0.3) 0%,
    rgba(99, 0, 212, 0.3) 100%
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
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15) 0%,
    transparent 50%,
    rgba(255, 255, 255, 0.05) 100%
  );
}

/* Animation */
.fluent-liquid-glass.is-animated {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fluent-liquid-glass.is-animated:hover {
  transform: translateY(-2px) scale(1.01);
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