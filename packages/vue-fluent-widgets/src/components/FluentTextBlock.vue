<template>
  <span 
    class="fluent-text-block"
    :class="[sizeClass, weightClass, { 'is-selectable': selectable }]"
    :style="textStyle"
  >
    <slot>{{ text }}</slot>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  text: { type: [String, Number], default: '' },
  size: { type: String, default: 'body' },
  weight: { type: String, default: 'regular' },
  color: { type: String, default: '' },
  align: { type: String, default: 'left' },
  wrap: { type: Boolean, default: false },
  selectable: { type: Boolean, default: false },
  maxLines: { type: Number, default: 0 }
})

const sizeClass = computed(() => {
  const sizes = {
    caption: 'size-caption',
    body: 'size-body',
    'body-large': 'size-body-large',
    subtitle: 'size-subtitle',
    title: 'size-title',
    'title-large': 'size-title-large',
    display: 'size-display'
  }
  return sizes[props.size] || 'size-body'
})

const weightClass = computed(() => {
  const weights = {
    light: 'weight-light',
    regular: 'weight-regular',
    semibold: 'weight-semibold',
    bold: 'weight-bold'
  }
  return weights[props.weight] || 'weight-regular'
})

const textStyle = computed(() => {
  const style = {}
  
  if (props.color) {
    style.color = props.color
  }
  
  if (props.align) {
    style.textAlign = props.align
  }
  
  if (props.wrap) {
    style.whiteSpace = 'normal'
    style.wordBreak = 'break-word'
  }
  
  if (props.maxLines > 0) {
    style.display = '-webkit-box'
    style.webkitLineClamp = props.maxLines
    style.webkitBoxOrient = 'vertical'
    style.overflow = 'hidden'
  }
  
  return style
})
</script>

<style scoped>
.fluent-text-block {
  display: inline;
  color: var(--text-primary);
  font-family: var(--font-ui);
  line-height: 1.5;
}

/* 尺寸 */
.size-caption {
  font-size: 12px;
  line-height: 16px;
}

.size-body {
  font-size: 14px;
  line-height: 20px;
}

.size-body-large {
  font-size: 16px;
  line-height: 22px;
}

.size-subtitle {
  font-size: 20px;
  line-height: 28px;
}

.size-title {
  font-size: 28px;
  line-height: 36px;
}

.size-title-large {
  font-size: 40px;
  line-height: 52px;
}

.size-display {
  font-size: 68px;
  line-height: 92px;
}

/* 字重 */
.weight-light {
  font-weight: 300;
}

.weight-regular {
  font-weight: 400;
}

.weight-semibold {
  font-weight: 600;
}

.weight-bold {
  font-weight: 700;
}

/* 可选择 */
.is-selectable {
  user-select: text;
  cursor: text;
}
</style>