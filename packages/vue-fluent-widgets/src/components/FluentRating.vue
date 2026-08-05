<template>
  <div
    class="fluent-rating"
    :class="stateClasses"
    role="slider"
    :aria-valuemin="0"
    :aria-valuemax="maxRating"
    :aria-valuenow="displayedValue"
    :aria-readonly="readonly"
    :aria-disabled="disabled"
    :tabindex="disabled ? -1 : 0"
    @keydown="onKeyDown"
  >
    <div class="rating-items-container">
      <div
        ref="itemsRef"
        class="rating-items"
        @pointerenter="onPointerEnter"
        @pointermove="onPointerMove"
        @pointerleave="onPointerLeave"
        @pointerdown="onPointerDown"
        @pointerup="onPointerUp"
      >
        <span
          v-for="index in itemIndexes"
          :key="`bg-${index}`"
          class="rating-item rating-background"
          aria-hidden="true"
        >
          <FluentIcon icon="star-20-regular" :width="iconSize" />
        </span>
      </div>
      
      <div class="rating-foreground" aria-hidden="true">
        <div class="rating-foreground-items">
          <span
            v-for="index in itemIndexes"
            :key="`fg-${index}`"
            class="rating-item rating-foreground-item"
            :style="foregroundStyle(index)"
          >
            <FluentIcon icon="star-20-filled" :width="iconSize" />
          </span>
        </div>
      </div>
    </div>
    
    <span v-if="caption" class="rating-caption">{{ caption }}</span>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  modelValue: { type: Number, default: -1 },
  maxRating: { type: Number, default: 5 },
  placeholderValue: { type: Number, default: -1 },
  caption: { type: String, default: '' },
  iconSize: { type: Number, default: 20 },
  initialValue: { type: Number, default: 1 },
  clearEnabled: { type: Boolean, default: true },
  readonly: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'change'])

const itemsRef = ref(null)
const isPointerOver = ref(false)
const isPointerDown = ref(false)
const pointerRating = ref(0)
const internalValue = ref(-1)

const maxRating = computed(() => Math.max(1, Math.trunc(props.maxRating)))
const itemIndexes = computed(() => Array.from({ length: maxRating.value }, (_, i) => i + 1))
const actualValue = computed(() => internalValue.value)
const initialValue = computed(() => Math.max(1, Math.min(maxRating.value, Math.trunc(props.initialValue))))

watch(() => props.modelValue, (val) => {
  internalValue.value = coerceValue(val)
}, { immediate: true })

const coerceValue = (value) => {
  const num = Number(value)
  if (!Number.isFinite(num) || num < 0) return -1
  if (num < 1) return 1
  if (num > maxRating.value) return maxRating.value
  return num
}

const displayedValue = computed(() => {
  if (isPointerOver.value && !props.readonly && !props.disabled) {
    return Math.max(0, Math.min(maxRating.value, pointerRating.value))
  }
  if (actualValue.value > -1) return actualValue.value
  if (props.placeholderValue > -1) return props.placeholderValue
  return 0
})

const stateClasses = computed(() => ({
  'is-readonly': props.readonly,
  'is-disabled': props.disabled,
  'is-pointer-over': isPointerOver.value && !props.readonly && !props.disabled,
  'is-set': actualValue.value > -1,
  'is-placeholder': actualValue.value <= -1 && props.placeholderValue > -1
}))

const foregroundStyle = (index) => {
  const amount = Math.max(0, Math.min(1, displayedValue.value - (index - 1)))
  return { clipPath: `inset(0 ${(1 - amount) * 100}% 0 0)` }
}

const ratingFromPointer = (event) => {
  const rect = itemsRef.value?.getBoundingClientRect()
  if (!rect || rect.width <= 0) return 0
  const ratio = (event.clientX - rect.left) / rect.width
  return Math.max(0, Math.min(maxRating.value, Math.ceil(ratio * maxRating.value)))
}

const updatePointer = (event) => {
  pointerRating.value = ratingFromPointer(event)
}

const commitRating = (newRating, fromMouse = false) => {
  const oldValue = actualValue.value
  const bounded = Math.max(0, Math.min(maxRating.value, newRating))
  let next = oldValue

  if (oldValue > -1 || bounded !== 0) {
    if (!props.clearEnabled && bounded <= 0) {
      next = 1
    } else if (bounded === oldValue && props.clearEnabled && (bounded !== maxRating.value || fromMouse)) {
      next = -1
    } else if (bounded > 0) {
      next = bounded
    } else {
      next = -1
    }
  }

  if (next !== oldValue) {
    internalValue.value = next
    emit('update:modelValue', next)
    emit('change', next)
  }
}

const changeBy = (amount, fromMouse = false) => {
  if (amount === 0) return
  let val
  if (actualValue.value > -1) {
    if (Math.trunc(actualValue.value) !== actualValue.value) {
      val = amount === -1 ? Math.trunc(actualValue.value) : Math.trunc(actualValue.value) + amount
    } else {
      val = actualValue.value + amount
    }
  } else {
    val = initialValue.value
  }
  commitRating(val, fromMouse)
}

const onPointerEnter = () => { isPointerOver.value = true }
const onPointerMove = (e) => { if (!props.readonly && !props.disabled) updatePointer(e) }
const onPointerLeave = () => { isPointerOver.value = false }
const onPointerDown = (e) => {
  if (props.readonly || props.disabled) return
  isPointerDown.value = true
  updatePointer(e)
}
const onPointerUp = () => {
  if (props.readonly || props.disabled) return
  isPointerDown.value = false
  commitRating(pointerRating.value, true)
}

const onKeyDown = (e) => {
  if (props.readonly || props.disabled) return
  switch (e.key) {
    case 'ArrowRight':
    case 'ArrowUp':
      e.preventDefault()
      changeBy(1)
      break
    case 'ArrowLeft':
    case 'ArrowDown':
      e.preventDefault()
      changeBy(-1)
      break
    case 'Home':
      e.preventDefault()
      commitRating(1)
      break
    case 'End':
      e.preventDefault()
      commitRating(maxRating.value)
      break
    case 'Delete':
    case 'Backspace':
      if (props.clearEnabled) {
        e.preventDefault()
        commitRating(-1)
      }
      break
  }
}
</script>

<style scoped>
.fluent-rating {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  outline: none;
}

.fluent-rating:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: var(--radius-md);
}

.fluent-rating.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.rating-items-container {
  position: relative;
  display: inline-flex;
}

.rating-items {
  display: inline-flex;
  gap: 2px;
  cursor: pointer;
}

.fluent-rating.is-readonly .rating-items,
.fluent-rating.is-disabled .rating-items {
  cursor: default;
}

.rating-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  transition: transform 0.15s ease;
}

.rating-items:hover .rating-item {
  transform: scale(1.05);
}

.rating-foreground {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.rating-foreground-items {
  display: inline-flex;
  gap: 2px;
}

.rating-foreground-item {
  color: #ffb900;
}

.rating-caption {
  font-size: 14px;
  color: var(--text-secondary);
}
</style>