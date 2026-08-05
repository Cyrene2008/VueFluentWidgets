<template>
  <div class="scroll-viewer-demo">
    <div class="page-header">
      <h1>ScrollViewer 滚动视图</h1>
      <p>Fluent 滚动视图组件，用于显示可滚动的内容。</p>
    </div>

    <FluentControlExample 
      header-text="垂直滚动" 
      :source-code="verticalCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentScrollViewer style="height: 200px;">
            <div class="scroll-content">
              <p v-for="n in 20" :key="n">这是第 {{ n }} 行内容。</p>
            </div>
          </FluentScrollViewer>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="水平滚动" 
      :source-code="horizontalCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentScrollViewer horizontal style="height: 100px;">
            <div class="scroll-content-horizontal">
              <div v-for="n in 20" :key="n" class="horizontal-item">
                项目 {{ n }}
              </div>
            </div>
          </FluentScrollViewer>
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { FluentScrollViewer, FluentControlExample } from 'vue-fluent-widgets'

const verticalCode = `<FluentScrollViewer style="height: 200px;">
  <div class="scroll-content">
    <p v-for="n in 20" :key="n">这是第 {{ n }} 行内容。</p>
  </div>
</FluentScrollViewer>`

const horizontalCode = `<FluentScrollViewer horizontal style="height: 100px;">
  <div class="scroll-content-horizontal">
    <div v-for="n in 20" :key="n" class="horizontal-item">
      项目 {{ n }}
    </div>
  </div>
</FluentScrollViewer>`
</script>

<style scoped>
.scroll-viewer-demo {
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
  width: 100%;
  min-width: 0;
  gap: 16px;
}

.scroll-content {
  padding: 16px;
}

.scroll-content p {
  margin: 0 0 8px 0;
  color: var(--text-primary);
}

.scroll-content-horizontal {
  display: flex;
  gap: 12px;
  padding: 16px;
  width: max-content;
}

.horizontal-item {
  width: 150px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-strong);
  color: var(--text-primary);
}
</style>
