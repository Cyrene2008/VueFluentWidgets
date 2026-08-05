<template>
  <div class="number-box-demo">
    <div class="page-header">
      <h1>NumberBox 数字输入框</h1>
      <p>Fluent 数字输入框组件，用于输入数字。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentNumberBox 
            v-model="value" 
            label="数字"
            placeholder="请输入数字"
          />
          <div class="demo-info">
            <p>当前值: {{ value }}</p>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="范围限制" 
      :source-code="rangeCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentNumberBox 
            v-model="value2" 
            label="范围 0-100"
            :min="0"
            :max="100"
            :step="5"
          />
          <div class="demo-info">
            <p>当前值: {{ value2 }}</p>
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
          <FluentNumberBox 
            v-model="disabledValue" 
            label="禁用的数字输入框"
            disabled
          />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="隐藏增减按钮" 
      :source-code="hideButtonsCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentNumberBox 
            v-model="value3" 
            label="隐藏增减按钮"
            :show-spin-buttons="false"
          />
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentNumberBox, FluentControlExample } from 'vue-fluent-widgets'

const value = ref(0)
const value2 = ref(50)
const value3 = ref(0)
const disabledValue = ref(42)

const basicCode = `<FluentNumberBox 
  v-model="value" 
  label="数字"
  placeholder="请输入数字"
/>

const value = ref(0)`

const rangeCode = `<FluentNumberBox 
  v-model="value" 
  label="范围 0-100"
  :min="0"
  :max="100"
  :step="5"
/>

const value = ref(50)`

const disabledCode = `<FluentNumberBox 
  v-model="value" 
  label="禁用的数字输入框"
  disabled
/>

const value = ref(42)`

const hideButtonsCode = `<FluentNumberBox 
  v-model="value" 
  label="隐藏增减按钮"
  :show-spin-buttons="false"
/>

const value = ref(0)`
</script>

<style scoped>
.number-box-demo {
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
  gap: 16px;
  max-width: 400px;
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