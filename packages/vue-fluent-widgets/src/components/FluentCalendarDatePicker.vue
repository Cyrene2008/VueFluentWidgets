<template>
  <div class="fluent-calendar-date-picker" :class="{ 'is-disabled': disabled }">
    <div v-if="label" class="calendar-date-picker-label">{{ label }}</div>
    <div class="calendar-date-picker-container">
      <div class="calendar-date-picker-input" @click="toggleCalendar">
        <span class="input-text" :class="{ 'has-value': displayValue }">
          {{ displayValue || placeholder }}
        </span>
        <FluentIcon icon="calendar-16-regular" :width="16" class="input-icon" />
      </div>
      
      <Transition name="dropdown">
        <div v-if="isOpen" class="calendar-dropdown">
          <div class="calendar-header">
            <button class="nav-button" @click="prevMonth">
              <FluentIcon icon="chevron-left-20-regular" :width="16" />
            </button>
            <span class="header-title">{{ headerTitle }}</span>
            <button class="nav-button" @click="nextMonth">
              <FluentIcon icon="chevron-right-20-regular" :width="16" />
            </button>
          </div>
          
          <div class="calendar-weekdays">
            <span v-for="day in weekdays" :key="day" class="weekday">{{ day }}</span>
          </div>
          
          <div class="calendar-days">
            <button
              v-for="day in calendarDays"
              :key="day.date"
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
        </div>
      </Transition>
    </div>
    <div v-if="error" class="calendar-date-picker-error">{{ error }}</div>
    <div v-if="description" class="calendar-date-picker-description">{{ description }}</div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
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
const currentDate = ref(new Date())

const weekdays = ['日', '一', '二', '三', '四', '五', '六']

const headerTitle = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth() + 1
  return `${year}年${month}月`
})

const displayValue = computed(() => {
  if (!props.modelValue) return ''
  const date = new Date(props.modelValue)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
})

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
  isOpen.value = !isOpen.value
}

const prevMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const selectDate = (dateStr) => {
  if (isDayDisabled(dateStr)) return
  emit('update:modelValue', dateStr)
  emit('change', dateStr)
  isOpen.value = false
}

const onClickOutside = (event) => {
  if (!event.target.closest('.fluent-calendar-date-picker')) {
    isOpen.value = false
  }
}

watch(() => props.modelValue, (value) => {
  if (value) {
    currentDate.value = new Date(value)
  }
})

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  if (props.modelValue) {
    currentDate.value = new Date(props.modelValue)
  }
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
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
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  margin-top: 4px;
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
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

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