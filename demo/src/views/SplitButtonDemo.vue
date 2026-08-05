<template>
  <div class="split-button-demo">
    <div class="page-header">
      <h1>SplitButton 分割按钮</h1>
      <p>Fluent 分割按钮组件，用于主要操作和次要操作的组合。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentSplitButton 
            label="发送" 
            :items="sendOptions"
            @click="onSendClick"
            @select="onSendSelect"
          />
          <div class="demo-info">
            <p>最后选择: {{ lastAction || '无' }}</p>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="带图标" 
      :source-code="iconCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentSplitButton 
            label="保存" 
            :items="saveOptions"
            @click="onSaveClick"
            @select="onSaveSelect"
          />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="禁用状态" 
      :source-code="disabledCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentSplitButton 
            label="操作" 
            :items="disabledOptions"
            disabled
          />
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentSplitButton, FluentControlExample } from 'vue-fluent-widgets'

const lastAction = ref('')

const sendOptions = [
  { label: '发送', icon: 'send-20-regular' },
  { label: '稍后发送', icon: 'clock-20-regular' },
  { type: 'separator' },
  { label: '发送设置', icon: 'settings-20-regular' }
]

const saveOptions = [
  { label: '保存', icon: 'save-20-regular' },
  { label: '另存为', icon: 'save-as-20-regular' },
  { label: '保存所有', icon: 'save-all-20-regular' }
]

const disabledOptions = [
  { label: '选项 1' },
  { label: '选项 2' },
  { label: '选项 3' }
]

const onSendClick = () => {
  lastAction.value = '发送'
}

const onSendSelect = (item) => {
  lastAction.value = item.label
}

const onSaveClick = () => {
  lastAction.value = '保存'
}

const onSaveSelect = (item) => {
  lastAction.value = item.label
}

const basicCode = `<FluentSplitButton 
  label="发送" 
  :items="sendOptions"
  @click="onSendClick"
  @select="onSendSelect"
/>

const sendOptions = [
  { label: '发送', icon: 'send-20-regular' },
  { label: '稍后发送', icon: 'clock-20-regular' },
  { type: 'separator' },
  { label: '发送设置', icon: 'settings-20-regular' }
]`

const iconCode = `<FluentSplitButton 
  label="保存" 
  :items="saveOptions"
  @click="onSaveClick"
  @select="onSaveSelect"
/>

const saveOptions = [
  { label: '保存', icon: 'save-20-regular' },
  { label: '另存为', icon: 'save-as-20-regular' },
  { label: '保存所有', icon: 'save-all-20-regular' }
]`

const disabledCode = `<FluentSplitButton 
  label="操作" 
  :items="options"
  disabled
/>`
</script>

<style scoped>
.split-button-demo {
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

.demo-row {
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
}

.demo-info {
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