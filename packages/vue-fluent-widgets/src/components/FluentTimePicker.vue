<template>
  <div ref="containerRef" class="fluent-time-picker" :class="{ 'is-disabled': disabled }">
    <div v-if="label" class="time-picker-label">{{ label }}</div>
    <button ref="triggerRef" type="button" class="time-picker-trigger" :aria-expanded="isOpen" :disabled="disabled" @click="toggle">
      <span :class="{ 'has-value': modelValue }">{{ modelValue || placeholder }}</span>
      <FluentIcon icon="clock-16-regular" :width="16" />
    </button>
    <Teleport to="body">
      <Transition name="dropdown">
        <div v-if="isOpen" ref="dropdownRef" class="time-picker-dropdown" :style="dropdownStyle" @click.stop>
          <div class="time-picker-columns">
            <label><span>时</span><select v-model="hour"><option v-for="value in 24" :key="value" :value="value - 1">{{ pad(value - 1) }}</option></select></label>
            <span class="time-separator">:</span>
            <label><span>分</span><select v-model="minute"><option v-for="value in minuteValues" :key="value" :value="value">{{ pad(value) }}</option></select></label>
            <template v-if="showSeconds">
              <span class="time-separator">:</span>
              <label><span>秒</span><select v-model="second"><option v-for="value in 60" :key="value" :value="value - 1">{{ pad(value - 1) }}</option></select></label>
            </template>
          </div>
          <div class="time-picker-footer"><button type="button" @click="setNow">现在</button><button type="button" class="time-confirm" @click="confirm">完成</button></div>
        </div>
      </Transition>
    </Teleport>
    <div v-if="error" class="time-picker-error">{{ error }}</div>
    <div v-if="description" class="time-picker-description">{{ description }}</div>
  </div>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '选择时间' },
  disabled: { type: Boolean, default: false },
  showSeconds: { type: Boolean, default: false },
  minuteStep: { type: Number, default: 1 },
  error: { type: String, default: '' },
  description: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'change'])
const containerRef = ref(null)
const triggerRef = ref(null)
const dropdownRef = ref(null)
const dropdownStyle = ref({ top: '-10000px', left: '-10000px' })
const isOpen = ref(false)
const hour = ref(0)
const minute = ref(0)
const second = ref(0)

const pad = value => String(value).padStart(2, '0')
const minuteValues = Array.from({ length: Math.ceil(60 / Math.max(1, props.minuteStep)) }, (_, index) => Math.min(59, index * Math.max(1, props.minuteStep)))

function syncValue(value = props.modelValue) {
  const match = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(value)
  if (!match) return
  hour.value = Math.min(23, Number(match[1]))
  minute.value = Math.min(59, Number(match[2]))
  second.value = Math.min(59, Number(match[3] || 0))
}

function formattedValue() { return `${pad(hour.value)}:${pad(minute.value)}${props.showSeconds ? `:${pad(second.value)}` : ''}` }

function updateDropdownPosition() {
  const trigger = triggerRef.value?.getBoundingClientRect()
  const dropdown = dropdownRef.value
  if (!trigger || !dropdown) return
  const margin = 8
  const height = dropdown.offsetHeight || 145
  const width = Math.min(dropdown.offsetWidth || 220, window.innerWidth - margin * 2)
  const above = trigger.top > height + margin
  const top = above ? trigger.top - height - 4 : Math.min(window.innerHeight - height - margin, trigger.bottom + 4)
  const left = Math.max(margin, Math.min(trigger.left, window.innerWidth - width - margin))
  dropdownStyle.value = { position: 'fixed', top: `${top}px`, left: `${left}px`, zIndex: 100000 }
}

function toggle() {
  if (props.disabled) return
  if (isOpen.value) {
    isOpen.value = false
    return
  }
  syncValue()
  setEstimatedDropdownPosition()
  isOpen.value = true
  nextTick(() => requestAnimationFrame(updateDropdownPosition))
}

function setEstimatedDropdownPosition() {
  const trigger = triggerRef.value?.getBoundingClientRect()
  if (!trigger) return
  const margin = 8
  const width = Math.min(220, window.innerWidth - margin * 2)
  const height = 145
  const top = trigger.top >= height + margin ? trigger.top - height - 4 : Math.max(margin, Math.min(window.innerHeight - height - margin, trigger.bottom + 4))
  const left = Math.max(margin, Math.min(trigger.left, window.innerWidth - width - margin))
  dropdownStyle.value = { position: 'fixed', top: `${top}px`, left: `${left}px`, zIndex: 100000 }
}

function confirm() {
  const value = formattedValue()
  emit('update:modelValue', value)
  emit('change', value)
  isOpen.value = false
}

function setNow() {
  const date = new Date()
  hour.value = date.getHours()
  minute.value = Math.floor(date.getMinutes() / props.minuteStep) * props.minuteStep
  second.value = date.getSeconds()
}

function onClickOutside(event) {
  if (!containerRef.value?.contains(event.target) && !dropdownRef.value?.contains(event.target)) isOpen.value = false
}

watch(() => props.modelValue, syncValue)
onMounted(() => {
  syncValue()
  document.addEventListener('click', onClickOutside)
  window.addEventListener('resize', updateDropdownPosition)
  window.addEventListener('scroll', updateDropdownPosition, true)
})
onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  window.removeEventListener('resize', updateDropdownPosition)
  window.removeEventListener('scroll', updateDropdownPosition, true)
})
</script>

<style scoped>
.fluent-time-picker { display: flex; flex-direction: column; gap: 8px; }.fluent-time-picker.is-disabled { opacity: .5; }.time-picker-label { color: var(--text-primary); font-size: 14px; font-weight: 600; }.time-picker-trigger { display: flex; align-items: center; justify-content: space-between; width: 100%; min-height: 36px; padding: 0 11px; border: 1px solid var(--border-strong); border-radius: var(--radius-md); color: var(--text-muted); background: var(--bg-card-solid); cursor: pointer; text-align: left; }.time-picker-trigger:hover, .time-picker-trigger:focus-visible { border-color: var(--accent); outline: none; }.time-picker-trigger span.has-value { color: var(--text-primary); }.time-picker-trigger svg { color: var(--text-muted); }.time-picker-error, .time-picker-description { font-size: 12px; }.time-picker-error { color: #c42b1c; }.time-picker-description { color: var(--text-secondary); }
</style>

<style>
.time-picker-dropdown { min-width: 220px; padding: 12px; border: 1px solid var(--border-strong); border-radius: var(--radius-md); background: var(--bg-card-solid); box-shadow: var(--shadow-8); }.time-picker-columns { display: flex; align-items: end; justify-content: center; gap: 7px; }.time-picker-columns label { display: grid; gap: 5px; color: var(--text-muted); font-size: 10px; text-align: center; }.time-picker-columns select { width: 52px; height: 38px; border: 1px solid var(--border-strong); border-radius: var(--radius-sm); color: var(--text-primary); background: var(--bg-card); font-variant-numeric: tabular-nums; text-align: center; }.time-picker-columns select:focus { border-color: var(--accent); outline: none; }.time-separator { padding-bottom: 9px; color: var(--text-secondary); font-weight: 700; }.time-picker-footer { display: flex; justify-content: space-between; margin-top: 12px; padding-top: 10px; border-top: 1px solid var(--border-subtle); }.time-picker-footer button { padding: 5px 9px; border: 0; border-radius: var(--radius-sm); color: var(--accent); background: transparent; cursor: pointer; font-size: 12px; }.time-picker-footer button:hover { background: var(--bg-hover); }.time-picker-footer .time-confirm { color: var(--text-on-accent); background: var(--accent); }.time-picker-footer .time-confirm:hover { background: var(--accent-hover); }
</style>
