<template>
  <div class="progress-ring-demo">
    <div class="page-header">
      <h1>ProgressRing 进度环</h1>
      <p>Fluent 进度环组件，用于显示操作进度。</p>
    </div>

    <FluentControlExample 
      header-text="不确定进度" 
      :source-code="indeterminateCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentProgressRing />
          <FluentProgressRing :size="48" />
          <FluentProgressRing :size="64" />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="确定进度" 
      :source-code="determinateCode"
    >
      <template #example>
        <div class="demo-column">
          <div class="demo-row">
            <FluentProgressRing :value="progress" :indeterminate="false" />
            <FluentProgressRing :value="progress" :indeterminate="false" :size="48" />
          </div>
          <div class="demo-row">
            <FluentButton @click="decrease" size="sm">减少</FluentButton>
            <FluentButton @click="increase" size="sm">增加</FluentButton>
          </div>
          <div class="demo-info">
            <p>当前进度: {{ progress }}%</p>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="错误状态" 
      :source-code="errorCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentProgressRing error />
          <FluentProgressRing :value="65" :indeterminate="false" error />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="暂停状态" 
      :source-code="pausedCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentProgressRing paused />
          <FluentProgressRing :value="40" :indeterminate="false" paused />
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentProgressRing, FluentButton, FluentControlExample } from 'vue-fluent-widgets'

const progress = ref(30)

const increase = () => {
  progress.value = Math.min(100, progress.value + 10)
}

const decrease = () => {
  progress.value = Math.max(0, progress.value - 10)
}

const indeterminateCode = `<FluentProgressRing />
<FluentProgressRing :size="48" />
<FluentProgressRing :size="64" />`

const determinateCode = `<FluentProgressRing :value="progress" :indeterminate="false" />

const progress = ref(30)`

const errorCode = `<FluentProgressRing error />
<FluentProgressRing :value="65" :indeterminate="false" error />`

const pausedCode = `<FluentProgressRing paused />
<FluentProgressRing :value="40" :indeterminate="false" paused />`
</script>

<style scoped>
.progress-ring-demo {
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
  gap: 24px;
  align-items: center;
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