<template>
  <div class="date-picker-demo">
    <div class="page-header">
      <h1>DatePicker 日期选择器</h1>
      <p>Fluent 日期选择器组件，用于选择日期。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentDatePicker v-model="basicDate" label="选择日期" />
          <div class="demo-info">
            <p>选中的日期: {{ basicDate || '未选择' }}</p>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="带范围限制" 
      :source-code="rangeCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentDatePicker 
            v-model="rangeDate" 
            label="选择日期（2024年）" 
            min="2024-01-01" 
            max="2024-12-31" 
          />
          <div class="demo-info">
            <p>选中的日期: {{ rangeDate || '未选择' }}</p>
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
          <FluentDatePicker v-model="disabledDate" label="禁用的日期选择器" disabled />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="错误状态" 
      :source-code="errorCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentDatePicker 
            v-model="errorDate" 
            label="带错误的日期选择器" 
            error="请选择一个有效的日期" 
          />
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentDatePicker, FluentControlExample } from 'vue-fluent-widgets'

const basicDate = ref('')
const rangeDate = ref('')
const disabledDate = ref('2024-01-15')
const errorDate = ref('')

const basicCode = `<FluentDatePicker v-model="date" label="选择日期" />

const date = ref('')`

const rangeCode = `<FluentDatePicker 
  v-model="date" 
  label="选择日期（2024年）" 
  min="2024-01-01" 
  max="2024-12-31" 
/>

const date = ref('')`

const disabledCode = `<FluentDatePicker v-model="date" label="禁用的日期选择器" disabled />

const date = ref('2024-01-15')`

const errorCode = `<FluentDatePicker 
  v-model="date" 
  label="带错误的日期选择器" 
  error="请选择一个有效的日期" 
/>

const date = ref('')`
</script>

<style scoped>
.date-picker-demo {
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