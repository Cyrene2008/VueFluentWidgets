<template>
  <div class="button-demo">
    <div class="page-header">
      <h1>Button 按钮</h1>
      <p>Fluent 按钮组件，支持多种变体和尺寸。</p>
    </div>

    <FluentControlExample 
      header-text="变体" 
      :source-code="variantCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentButton variant="primary">主要按钮</FluentButton>
          <FluentButton variant="secondary">次要按钮</FluentButton>
          <FluentButton variant="subtle">微妙按钮</FluentButton>
          <FluentButton variant="danger">危险按钮</FluentButton>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="尺寸" 
      :source-code="sizeCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentButton size="sm">小按钮</FluentButton>
          <FluentButton size="md">中按钮</FluentButton>
          <FluentButton size="lg">大按钮</FluentButton>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="禁用状态" 
      :source-code="disabledCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentButton disabled>禁用按钮</FluentButton>
          <FluentButton variant="secondary" disabled>禁用按钮</FluentButton>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="图标按钮" 
      :source-code="iconCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentButton icon-only>
            <FluentIcon icon="add" />
          </FluentButton>
          <FluentButton variant="secondary" icon-only>
            <FluentIcon icon="settings" />
          </FluentButton>
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { FluentButton, FluentIcon, FluentControlExample } from 'vue-fluent-widgets'

const variantCode = `<FluentButton variant="primary">主要按钮</FluentButton>
<FluentButton variant="secondary">次要按钮</FluentButton>
<FluentButton variant="subtle">微妙按钮</FluentButton>
<FluentButton variant="danger">危险按钮</FluentButton>`

const sizeCode = `<FluentButton size="sm">小按钮</FluentButton>
<FluentButton size="md">中按钮</FluentButton>
<FluentButton size="lg">大按钮</FluentButton>`

const disabledCode = `<FluentButton disabled>禁用按钮</FluentButton>
<FluentButton variant="secondary" disabled>禁用按钮</FluentButton>`

const iconCode = `<FluentButton icon-only>
  <FluentIcon icon="add" />
</FluentButton>
<FluentButton variant="secondary" icon-only>
  <FluentIcon icon="settings" />
</FluentButton>`
</script>

<style scoped>
.button-demo {
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
</style>