<template>
  <div class="progress-bar-demo">
    <div class="page-header">
      <h1>ProgressBar 进度条</h1>
      <p>Fluent 进度条组件，用于显示操作进度。</p>
    </div>

    <FluentControlExample 
      header-text="确定进度" 
      :source-code="determinateCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentProgressBar :value="progress" />
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
      header-text="不确定进度" 
      :source-code="indeterminateCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentProgressBar indeterminate />
          <div class="demo-info">
            <p>不确定进度条会一直循环动画，直到操作完成。</p>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="错误状态" 
      :source-code="errorCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentProgressBar :value="65" error />
          <div class="demo-info">
            <p>错误状态的进度条，用于表示操作失败。</p>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="暂停状态" 
      :source-code="pausedCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentProgressBar :value="40" paused />
          <div class="demo-info">
            <p>暂停状态的进度条，用于表示操作暂停。</p>
          </div>
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentProgressBar, FluentButton, FluentControlExample } from 'vue-fluent-widgets'

const progress = ref(30)

const increase = () => {
  progress.value = Math.min(100, progress.value + 10)
}

const decrease = () => {
  progress.value = Math.max(0, progress.value - 10)
}

const determinateCode = `<FluentProgressBar :value="progress" />

const progress = ref(30)`

const indeterminateCode = `<FluentProgressBar indeterminate />`

const errorCode = `<FluentProgressBar :value="65" error />`

const pausedCode = `<FluentProgressBar :value="40" paused />`
</script>

<style scoped>
.progress-bar-demo {
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
  gap: 8px;
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