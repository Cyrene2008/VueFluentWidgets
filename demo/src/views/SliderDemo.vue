<template>
  <div class="slider-demo">
    <div class="page-header">
      <h1>Slider 滑块</h1>
      <p>Fluent 滑块组件，用于选择数值范围。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentSlider v-model="basicValue" label="基本滑块" />
          <div class="demo-info">
            <p>当前值: {{ basicValue }}</p>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="自定义范围" 
      :source-code="rangeCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentSlider v-model="rangeValue" :min="0" :max="200" :step="10" label="自定义范围 (0-200)" />
          <div class="demo-info">
            <p>当前值: {{ rangeValue }}</p>
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
          <FluentSlider v-model="disabledValue" label="禁用的滑块" disabled />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="垂直滑块" 
      :source-code="verticalCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentSlider v-model="verticalValue1" vertical label="垂直滑块 1" />
          <FluentSlider v-model="verticalValue2" vertical label="垂直滑块 2" />
          <FluentSlider v-model="verticalValue3" vertical label="垂直滑块 3" />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="隐藏值显示" 
      :source-code="hideValueCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentSlider v-model="hideValueValue" :show-value="false" label="隐藏值显示" />
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentSlider, FluentControlExample } from 'vue-fluent-widgets'

const basicValue = ref(50)
const rangeValue = ref(100)
const disabledValue = ref(30)
const verticalValue1 = ref(25)
const verticalValue2 = ref(50)
const verticalValue3 = ref(75)
const hideValueValue = ref(40)

const basicCode = `<FluentSlider v-model="value" label="基本滑块" />

const value = ref(50)`

const rangeCode = `<FluentSlider v-model="value" :min="0" :max="200" :step="10" label="自定义范围 (0-200)" />

const value = ref(100)`

const disabledCode = `<FluentSlider v-model="value" label="禁用的滑块" disabled />

const value = ref(30)`

const verticalCode = `<FluentSlider v-model="value" vertical label="垂直滑块" />

const value = ref(50)`

const hideValueCode = `<FluentSlider v-model="value" :show-value="false" label="隐藏值显示" />

const value = ref(40)`
</script>

<style scoped>
.slider-demo {
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

.demo-row {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
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