<template>
  <div class="color-picker-demo">
    <div class="page-header">
      <h1>ColorPicker 颜色选择器</h1>
      <p>Fluent 颜色选择器组件，用于选择颜色。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentColorPicker v-model="color1" label="选择颜色" />
          <div class="demo-info">
            <p>选中的颜色: {{ color1 }}</p>
            <div class="color-preview" :style="{ background: color1 }"></div>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="预设颜色" 
      :source-code="presetsCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentColorPicker v-model="color2" label="带预设颜色" :show-presets="true" />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="禁用状态" 
      :source-code="disabledCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentColorPicker v-model="color3" label="禁用的颜色选择器" disabled />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="带描述和错误" 
      :source-code="descriptionCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentColorPicker 
            v-model="color4" 
            label="主题颜色"
            description="选择应用程序的主题颜色"
          />
          <FluentColorPicker 
            v-model="color5" 
            label="错误示例"
            error="请选择一个有效的颜色"
          />
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentColorPicker, FluentControlExample } from 'vue-fluent-widgets'

const color1 = ref('#0078d4')
const color2 = ref('#ff6b6b')
const color3 = ref('#4CAF50')
const color4 = ref('#2196F3')
const color5 = ref('#ff0000')

const basicCode = `<FluentColorPicker v-model="color" label="选择颜色" />

const color = ref('#0078d4')`

const presetsCode = `<FluentColorPicker v-model="color" label="带预设颜色" :show-presets="true" />`

const disabledCode = `<FluentColorPicker v-model="color" label="禁用的颜色选择器" disabled />`

const descriptionCode = `<FluentColorPicker 
  v-model="color" 
  label="主题颜色"
  description="选择应用程序的主题颜色"
/>
<FluentColorPicker 
  v-model="color" 
  label="错误示例"
  error="请选择一个有效的颜色"
/>`
</script>

<style scoped>
.color-picker-demo {
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
  display: flex;
  align-items: center;
  gap: 12px;
}

.demo-info p {
  margin: 0;
  font-size: 14px;
  color: var(--text-secondary);
  flex: 1;
}

.color-preview {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-strong);
}
</style>