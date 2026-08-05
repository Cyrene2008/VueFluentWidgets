<template>
  <div class="hyperlink-button-demo">
    <div class="page-header">
      <h1>HyperlinkButton 超链接按钮</h1>
      <p>Fluent 超链接按钮组件，用于导航链接或操作。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentHyperlinkButton 
            label="访问 GitHub" 
            href="https://github.com"
            target="_blank"
          />
          <FluentHyperlinkButton 
            label="内部链接" 
            @click="onInternalClick"
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
          <FluentHyperlinkButton 
            label="禁用链接" 
            href="https://example.com"
            disabled
          />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="不同目标" 
      :source-code="targetCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentHyperlinkButton 
            label="新窗口打开" 
            href="https://github.com"
            target="_blank"
          />
          <FluentHyperlinkButton 
            label="当前窗口" 
            href="https://github.com"
            target="_self"
          />
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { FluentHyperlinkButton, FluentControlExample } from 'vue-fluent-widgets'

const onInternalClick = () => {
  alert('内部链接被点击')
}

const basicCode = `<FluentHyperlinkButton 
  label="访问 GitHub" 
  href="https://github.com"
  target="_blank"
/>
<FluentHyperlinkButton 
  label="内部链接" 
  @click="onInternalClick"
/>`

const disabledCode = `<FluentHyperlinkButton 
  label="禁用链接" 
  href="https://example.com"
  disabled
/>`

const targetCode = `<FluentHyperlinkButton 
  label="新窗口打开" 
  href="https://github.com"
  target="_blank"
/>
<FluentHyperlinkButton 
  label="当前窗口" 
  href="https://github.com"
  target="_self"
/>`
</script>

<style scoped>
.hyperlink-button-demo {
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
  gap: 16px;
  flex-wrap: wrap;
}
</style>