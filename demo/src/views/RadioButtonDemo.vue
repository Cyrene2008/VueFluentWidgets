<template>
  <div class="radio-button-demo">
    <div class="page-header">
      <h1>RadioButton 单选按钮</h1>
      <p>Fluent 单选按钮组件，用于单选操作。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentRadioButton 
            v-model="selectedOption" 
            :items="options" 
            label="选择一个选项"
          />
          <div class="demo-info">
            <p>选中的选项: {{ selectedOption }}</p>
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
          <FluentRadioButton 
            v-model="disabledSelected" 
            :items="disabledOptions" 
            label="禁用的单选按钮组"
            disabled
          />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="自定义选项" 
      :source-code="customCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentRadioButton 
            v-model="customSelected" 
            :items="customOptions" 
            label="自定义选项"
          />
          <div class="demo-info">
            <p>选中的值: {{ customSelected }}</p>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="水平布局" 
      :source-code="horizontalCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentRadioButton 
            v-model="horizontalSelected" 
            :items="horizontalOptions" 
            label="水平布局"
            class="horizontal-radio"
          />
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentRadioButton, FluentControlExample } from 'vue-fluent-widgets'

const selectedOption = ref('option1')
const options = [
  { label: '选项 1', value: 'option1' },
  { label: '选项 2', value: 'option2' },
  { label: '选项 3', value: 'option3' }
]

const disabledSelected = ref('option1')
const disabledOptions = [
  { label: '选项 1', value: 'option1' },
  { label: '选项 2', value: 'option2' },
  { label: '选项 3', value: 'option3' }
]

const customSelected = ref(null)
const customOptions = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' }
]

const horizontalSelected = ref('option1')
const horizontalOptions = [
  { label: '选项 1', value: 'option1' },
  { label: '选项 2', value: 'option2' },
  { label: '选项 3', value: 'option3' }
]

const basicCode = `<FluentRadioButton 
  v-model="selectedOption" 
  :items="options" 
  label="选择一个选项"
/>

const selectedOption = ref('option1')
const options = [
  { label: '选项 1', value: 'option1' },
  { label: '选项 2', value: 'option2' },
  { label: '选项 3', value: 'option3' }
]`

const disabledCode = `<FluentRadioButton 
  v-model="selected" 
  :items="options" 
  label="禁用的单选按钮组"
  disabled
/>`

const customCode = `<FluentRadioButton 
  v-model="selected" 
  :items="options" 
  label="自定义选项"
/>

const options = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
  { label: '橙子', value: 'orange' }
]`

const horizontalCode = `<FluentRadioButton 
  v-model="selected" 
  :items="options" 
  label="水平布局"
  class="horizontal-radio"
/>

.horizontal-radio :deep(.radio-buttons-items) {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
}`
</script>

<style scoped>
.radio-button-demo {
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

.horizontal-radio :deep(.radio-buttons-items) {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
}
</style>