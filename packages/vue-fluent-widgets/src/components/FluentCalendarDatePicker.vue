<template>
  <div class="fluent-calendar-date-picker" :class="{ 'is-disabled': disabled }">
    <div v-if="label" class="calendar-date-picker-label">{{ label }}</div>
    <div ref="containerRef" class="calendar-date-picker-container">
      <div ref="triggerRef" class="calendar-date-picker-input" @click="toggleCalendar">
        <span class="input-text" :class="{ 'has-value': displayValue }">
          {{ displayValue || placeholder }}
        </span>
        <FluentIcon icon="calendar-16-regular" :width="16" class="input-icon" />
      </div>
      
      <Teleport to="body">
        <Transition name="dropdown" @after-enter="updateDropdownPosition">
        <div v-if="isOpen" ref="dropdownRef" class="calendar-dropdown" :style="dropdownStyle">
          <div class="calendar-header">
            <button type="button" class="nav-button" @click="previousPeriod">
              <FluentIcon icon="chevron-left-20-regular" :width="16" />
            </button>
            <button type="button" class="header-title" @click="cycleView">{{ headerTitle }}</button>
            <button type="button" class="nav-button" @click="nextPeriod">
              <FluentIcon icon="chevron-right-20-regular" :width="16" />
            </button>
          </div>

          <template v-if="view === 'days'">
            <div class="calendar-weekdays">
              <span v-for="day in weekdays" :key="day" class="weekday">{{ day }}</span>
            </div>
            <div class="calendar-days">
              <button
                v-for="day in calendarDays"
                :key="day.date"
                type="button"
                class="day-button"
                :class="{
                  'is-today': day.isToday,
                  'is-selected': day.date === modelValue,
                  'is-other-month': !day.isCurrentMonth,
                  'is-disabled': isDayDisabled(day.date)
                }"
                :disabled="isDayDisabled(day.date)"
                @click="selectDate(day.date)"
              >
                {{ day.day }}
              </button>
            </div>
          </template>
          <div v-else-if="view === 'months'" class="calendar-options">
            <button v-for="(month, index) in monthNames" :key="month" type="button" class="period-button" :class="{ selected: index === currentDate.getMonth() }" @click="selectMonth(index)">{{ month }}</button>
          </div>
          <div v-else class="calendar-options year-options">
            <button v-for="year in yearOptions" :key="year" type="button" class="period-button" :class="{ selected: year === currentDate.getFullYear() }" @click="selectYear(year)">{{ year }}</button>
          </div>
        </div>
        </Transition>
      </Teleport>
    </div>
    <div v-if="error" class="calendar-date-picker-error">{{ error }}</div>
    <div v-if="description" class="calendar-date-picker-description">{{ description }}</div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '选择日期' },
  disabled: { type: Boolean, default: false },
  min: { type: String, default: '' },
  max: { type: String, default: '' },
  error: { type: String, default: '' },
  description: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'change'])

const isOpen = ref(false)
const view = ref('days')
const currentDate = ref(new Date())
const containerRef = ref(null)
const triggerRef = ref(null)
const dropdownRef = ref(null)
const dropdownStyle = ref({ top: '-10000px', left: '-10000px' })

const weekdays = ['日', '一', '二', '三', '四', '五', '六']

const headerTitle = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth() + 1
  if (view.value === 'months') return `${year}年`
  if (view.value === 'years') {
    const start = Math.floor(year / 10) * 10 - 1
    return `${start} - ${start + 11}年`
  }
  return `${year}年${month}月`
})

const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
const yearOptions = computed(() => {
  const year = currentDate.value.getFullYear()
  const start = Math.floor(year / 10) * 10 - 1
  return Array.from({ length: 12 }, (_, index) => start + index)
})

const displayValue = computed(() => {
  if (!props.modelValue) return ''
  const date = parseDateValue(props.modelValue)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
})

const parseDateValue = value => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  return match ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])) : new Date(value)
}

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const today = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  const days = []
  
  // 上个月的日期
  const startDay = firstDay.getDay()
  for (let i = startDay - 1; i >= 0; i--) {
    const date = new Date(year, month, -i)
    const dateStr = formatDate(date)
    days.push({
      date: dateStr,
      day: date.getDate(),
      isCurrentMonth: false,
      isToday: dateStr === todayStr
    })
  }
  
  // 本月的日期
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i)
    const dateStr = formatDate(date)
    days.push({
      date: dateStr,
      day: i,
      isCurrentMonth: true,
      isToday: dateStr === todayStr
    })
  }
  
  // 下个月的日期
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(year, month + 1, i)
    const dateStr = formatDate(date)
    days.push({
      date: dateStr,
      day: i,
      isCurrentMonth: false,
      isToday: dateStr === todayStr
    })
  }
  
  return days
})

const formatDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const isDayDisabled = (dateStr) => {
  if (props.min && dateStr < props.min) return true
  if (props.max && dateStr > props.max) return true
  return false
}

const toggleCalendar = () => {
  if (props.disabled) return
  if (isOpen.value) {
    isOpen.value = false
    return
  }
  setEstimatedDropdownPosition()
  view.value = 'days'
  isOpen.value = true
}

const setEstimatedDropdownPosition = () => {
  const trigger = triggerRef.value?.getBoundingClientRect()
  if (!trigger) return
  const margin = 8
  const width = Math.min(280, window.innerWidth - margin * 2)
  const height = 340
  const below = window.innerHeight - trigger.bottom - margin
  const above = trigger.top - margin
  const opensAbove = below < height && above > below
  const top = opensAbove
    ? Math.max(margin, trigger.top - height - 4)
    : Math.max(margin, Math.min(window.innerHeight - height - margin, trigger.bottom + 4))
  const left = Math.max(margin, Math.min(trigger.left, window.innerWidth - width - margin))
  dropdownStyle.value = { position: 'fixed', top: `${top}px`, left: `${left}px`, maxWidth: `calc(100vw - ${margin * 2}px)`, zIndex: 100000 }
}

const updateDropdownPosition = () => {
  const trigger = triggerRef.value?.getBoundingClientRect()
  const dropdown = dropdownRef.value
  if (!trigger || !dropdown) return
  const margin = 8
  const width = Math.min(dropdown.offsetWidth || 280, window.innerWidth - margin * 2)
  const height = dropdown.offsetHeight || 340
  const below = window.innerHeight - trigger.bottom - margin
  const above = trigger.top - margin
  const opensAbove = below < height && above > below
  const top = opensAbove
    ? Math.max(margin, trigger.top - height - 4)
    : Math.min(window.innerHeight - height - margin, trigger.bottom + 4)
  const left = Math.max(margin, Math.min(trigger.left, window.innerWidth - width - margin))
  dropdownStyle.value = { position: 'fixed', top: `${top}px`, left: `${left}px`, maxWidth: `calc(100vw - ${margin * 2}px)`, zIndex: 100000 }
}

const previousPeriod = () => {
  if (view.value === 'years') currentDate.value = new Date(currentDate.value.getFullYear() - 12, currentDate.value.getMonth(), 1)
  else if (view.value === 'months') currentDate.value = new Date(currentDate.value.getFullYear() - 1, currentDate.value.getMonth(), 1)
  else currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextPeriod = () => {
  if (view.value === 'years') currentDate.value = new Date(currentDate.value.getFullYear() + 12, currentDate.value.getMonth(), 1)
  else if (view.value === 'months') currentDate.value = new Date(currentDate.value.getFullYear() + 1, currentDate.value.getMonth(), 1)
  else currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const cycleView = () => {
  view.value = view.value === 'days' ? 'months' : view.value === 'months' ? 'years' : 'days'
}

const selectMonth = month => {
  currentDate.value = new Date(currentDate.value.getFullYear(), month, 1)
  view.value = 'days'
}

const selectYear = year => {
  currentDate.value = new Date(year, currentDate.value.getMonth(), 1)
  view.value = 'months'
}

const selectDate = (dateStr) => {
  if (isDayDisabled(dateStr)) return
  emit('update:modelValue', dateStr)
  emit('change', dateStr)
  isOpen.value = false
}

const onClickOutside = (event) => {
  if (!containerRef.value?.contains(event.target) && !dropdownRef.value?.contains(event.target)) {
    isOpen.value = false
  }
}

watch(isOpen, async open => {
  if (!open) return
  await nextTick()
  updateDropdownPosition()
  requestAnimationFrame(updateDropdownPosition)
})

watch(() => props.modelValue, (value) => {
  if (value) {
    currentDate.value = parseDateValue(value)
  }
})

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  window.addEventListener('resize', updateDropdownPosition)
  window.addEventListener('scroll', updateDropdownPosition, true)
  if (props.modelValue) {
    currentDate.value = parseDateValue(props.modelValue)
  }
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  window.removeEventListener('resize', updateDropdownPosition)
  window.removeEventListener('scroll', updateDropdownPosition, true)
})
</script>

<style scoped>
.fluent-calendar-date-picker {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.fluent-calendar-date-picker.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.calendar-date-picker-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.calendar-date-picker-container {
  position: relative;
}

.calendar-date-picker-input {
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 12px;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  background: var(--bg-card-solid);
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.calendar-date-picker-input:hover {
  border-color: var(--accent);
}

.input-text {
  flex: 1;
  font-size: 14px;
  color: var(--text-muted);
}

.input-text.has-value {
  color: var(--text-primary);
}

.input-icon {
  color: var(--text-muted);
}

.calendar-dropdown {
  position: fixed;
  z-index: 100000;
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.14);
  padding: 16px;
  min-width: 280px;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.nav-button {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  color: var(--text-primary);
  cursor: pointer;
  transition: background 0.2s ease;
}

.nav-button:hover {
  background: var(--bg-hover);
}

.header-title {
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.header-title:hover { color: var(--accent); }
.calendar-options { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
.period-button { min-height: 38px; padding: 5px 4px; border: 0; border-radius: var(--radius-md); color: var(--text-primary); background: transparent; cursor: pointer; font-size: 12px; }
.period-button:hover, .period-button.selected { color: var(--accent); background: var(--accent-50); }
.year-options { grid-template-columns: repeat(4, 1fr); }

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
}

.weekday {
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  padding: 8px 0;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.day-button {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--text-primary);
  cursor: pointer;
  transition: background 0.2s ease;
}

.day-button:hover {
  background: var(--bg-hover);
}

.day-button.is-today {
  font-weight: 600;
  color: var(--accent);
}

.day-button.is-selected {
  background: var(--accent);
  color: white;
}

.day-button.is-other-month {
  color: var(--text-muted);
}

.day-button.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.calendar-date-picker-error {
  font-size: 12px;
  color: #c42b1c;
}

.calendar-date-picker-description {
  font-size: 12px;
  color: var(--text-secondary);
}

.dropdown-enter-active {
  transition: all 0.2s ease;
}

.dropdown-leave-active {
  transition: all 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
