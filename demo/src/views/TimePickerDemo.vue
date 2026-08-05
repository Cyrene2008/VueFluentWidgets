<template>
  <div class="time-picker-demo">
    <div class="page-header">
      <h1>TimePicker 时间选择器</h1>
      <p>Fluent 时间选择器组件，用于选择时间。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentTimePicker v-model="basicTime" label="选择时间" />
          <div class="demo-info">
            <p>选中的时间: {{ basicTime || '未选择' }}</p>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="禁用状态" 
      :source-code="disabledCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentTimePicker v-model="disabledTime" label="禁用的时间选择器" disabled />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="错误状态" 
      :source-code="errorCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentTimePicker 
            v-model="errorTime" 
            label="带错误的时间选择器" 
            error="请选择一个有效的时间" 
          />
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentTimePicker, FluentControlExample } from 'vue-fluent-widgets'

const basicTime = ref('')
const disabledTime = ref('14:30')
const errorTime = ref('')

const basicCode = `<FluentTimePicker v-model="time" label="选择时间" />

const time = ref('')`

const disabledCode = `<FluentTimePicker v-model="time" label="禁用的时间选择器" disabled />

const time = ref('14:30')`

const errorCode = `<FluentTimePicker 
  v-model="time" 
  label="带错误的时间选择器" 
  error="请选择一个有效的时间" 
/>

const time = ref('')`
</script>

<style scoped>
.time-picker-demo {
  max-width: 800px;
}

.page-header {
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.page-header p {
  color: var(--text-secondary);
  font-size: 14px;
}

.demo-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.demo-info {
  margin-top: 16px;
  padding: 12px;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-strong);
}

.demo-info p {
  margin: 0;
  font-size: 14px;
  color: var(--text-secondary);
}
</style>