<template>
  <div class="card-demo">
    <div class="page-header">
      <h1>Card 卡片</h1>
      <p>Fluent 卡片组件，用于内容分组展示。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentCard>
            <h3>卡片标题</h3>
            <p>这是卡片内容，可以包含任何内容。</p>
          </FluentCard>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="带操作的卡片" 
      :source-code="actionsCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentCard>
            <h3>设置</h3>
            <p>配置您的应用程序设置。</p>
            <div class="card-actions">
              <FluentButton variant="primary" size="sm">编辑</FluentButton>
              <FluentButton variant="secondary" size="sm">取消</FluentButton>
            </div>
          </FluentCard>
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { FluentCard, FluentButton, FluentControlExample } from 'vue-fluent-widgets'

const basicCode = `<FluentCard>
  <h3>卡片标题</h3>
  <p>这是卡片内容。</p>
</FluentCard>`

const actionsCode = `<FluentCard>
  <h3>设置</h3>
  <p>配置您的应用程序设置。</p>
  <div class="card-actions">
    <FluentButton variant="primary" size="sm">编辑</FluentButton>
    <FluentButton variant="secondary" size="sm">取消</FluentButton>
  </div>
</FluentCard>`
</script>

<style scoped>
.card-demo {
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

.card-actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}
</style>