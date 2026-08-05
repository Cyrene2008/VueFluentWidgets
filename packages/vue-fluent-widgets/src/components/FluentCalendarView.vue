<template>
  <div class="fluent-calendar-view" :class="{ 'is-disabled': disabled }">
    <div class="calendar-header">
      <button class="nav-button" @click="prevMonth">
        <FluentIcon icon="chevron-left-20-regular" :width="16" />
      </button>
      <button class="header-title" @click="toggleYearMonth">
        {{ headerTitle }}
      </button>
      <button class="nav-button" @click="nextMonth">
        <FluentIcon icon="chevron-right-20-regular" :width="16" />
      </button>
    </div>
    
    <div v-if="showYearMonth" class="year-month-selector">
      <div class="year-selector">
        <button 
          v-for="year in yearRange" 
          :key="year"
          class="year-button"
          :class="{ 'is-selected': year === currentYear }"
          @click="selectYear(year)"
        >
          {{ year }}
        </button>
      </div>
      <div class="month-selector">
        <button 
          v-for="(month, index) in months" 
          :key="index"
          class="month-button"
          :class="{ 'is-selected': index === currentMonth }"
          @click="selectMonth(index)"
        >
          {{ month }}
        </button>
      </div>
    </div>
    
    <div v-else class="calendar-body">
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
            'is-selected': isSelected(day.date),
            'is-other-month': !day.isCurrentMonth,
            'is-disabled': isDayDisabled(day.date)
          }"
          :disabled="isDayDisabled(day.date)"
          @click="selectDate(day)"
        >
          {{ day.day }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  modelValue: { type: [String, Array], default: '' },
  selectionMode: { type: String, default: 'single' }, // single, multiple, range
  disabled: { type: Boolean, default: false },
  min: { type: String, default: '' },
  max: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'change'])

const currentDate = ref(new Date())
const showYearMonth = ref(false)

const weekdays = ['日', '一', '二', '三', '四', '五', '六']
const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']

const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonth = computed(() => currentDate.value.getMonth())

const headerTitle = computed(() => {
  return `${currentYear.value}年 ${months[currentMonth.value]}`
})

const yearRange = computed(() => {
  const start = currentYear.value - 10
  const end = currentYear.value + 10
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

const calendarDays = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value
  const today = new Date()
  const todayStr = formatDate(today)
  
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

const isSelected = (dateStr) => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.includes(dateStr)
  }
  return props.modelValue === dateStr
}

const isDayDisabled = (dateStr) => {
  if (props.min && dateStr < props.min) return true
  if (props.max && dateStr > props.max) return true
  return false
}

const prevMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1)
}

const toggleYearMonth = () => {
  showYearMonth.value = !showYearMonth.value
}

const selectYear = (year) => {
  currentDate.value = new Date(year, currentMonth.value, 1)
}

const selectMonth = (month) => {
  currentDate.value = new Date(currentYear.value, month, 1)
  showYearMonth.value = false
}

const selectDate = (day) => {
  if (isDayDisabled(day.date)) return
  
  if (props.selectionMode === 'single') {
    emit('update:modelValue', day.date)
    emit('change', day.date)
  } else if (props.selectionMode === 'multiple') {
    const current = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const index = current.indexOf(day.date)
    
    if (index > -1) {
      current.splice(index, 1)
    } else {
      current.push(day.date)
    }
    
    emit('update:modelValue', current)
    emit('change', current)
  }
}
</script>

<style scoped>
.fluent-calendar-view {
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  padding: 16px;
  min-width: 280px;
}

.fluent-calendar-view.is-disabled {
  opacity: 0.5;
  pointer-events: none;
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
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: var(--radius-md);
  transition: background 0.2s ease;
}

.header-title:hover {
  background: var(--bg-hover);
}

.year-month-selector {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.year-selector,
.month-selector {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.year-button,
.month-button {
  padding: 8px;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  font-size: 14px;
  color: var(--text-primary);
  cursor: pointer;
  transition: background 0.2s ease;
}

.year-button:hover,
.month-button:hover {
  background: var(--bg-hover);
}

.year-button.is-selected,
.month-button.is-selected {
  background: var(--accent);
  color: white;
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
</style>