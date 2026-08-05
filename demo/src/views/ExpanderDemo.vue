<template>
  <div class="expander-demo">
    <div class="page-header">
      <h1>Expander 折叠面板</h1>
      <p>Fluent 折叠面板组件，用于显示和隐藏内容。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentExpander header="基本折叠面板">
            <div class="expander-content">
              <p>这是折叠面板的内容。点击标题可以展开或折叠。</p>
            </div>
          </FluentExpander>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="带描述" 
      :source-code="descriptionCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentExpander 
            header="带描述的折叠面板" 
            description="这是描述文本，提供额外信息。"
          >
            <div class="expander-content">
              <p>这是折叠面板的内容。</p>
            </div>
          </FluentExpander>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="带图标" 
      :source-code="iconCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentExpander 
            header="带图标的折叠面板" 
            icon="settings"
          >
            <div class="expander-content">
              <p>这是折叠面板的内容。</p>
            </div>
          </FluentExpander>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="默认展开" 
      :source-code="defaultExpandedCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentExpander 
            header="默认展开的折叠面板" 
            :model-value="true"
          >
            <div class="expander-content">
              <p>这个折叠面板默认是展开状态。</p>
            </div>
          </FluentExpander>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="受控模式" 
      :source-code="controlledCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentExpander 
            v-model="isExpanded" 
            header="受控模式的折叠面板"
            description="通过外部控制展开状态"
          >
            <div class="expander-content">
              <p>这个折叠面板的展开状态由外部控制。</p>
            </div>
          </FluentExpander>
          <div class="demo-row">
            <FluentButton @click="isExpanded = true" size="sm">展开</FluentButton>
            <FluentButton @click="isExpanded = false" size="sm">折叠</FluentButton>
          </div>
          <div class="demo-info">
            <p>当前状态: {{ isExpanded ? '展开' : '折叠' }}</p>
          </div>
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentExpander, FluentButton, FluentControlExample } from 'vue-fluent-widgets'

const isExpanded = ref(false)

const basicCode = `<FluentExpander header="基本折叠面板">
  <div class="expander-content">
    <p>这是折叠面板的内容。</p>
  </div>
</FluentExpander>`

const descriptionCode = `<FluentExpander 
  header="带描述的折叠面板" 
  description="这是描述文本，提供额外信息。"
>
  <div class="expander-content">
    <p>这是折叠面板的内容。</p>
  </div>
</FluentExpander>`

const iconCode = `<FluentExpander 
  header="带图标的折叠面板" 
  icon="settings"
>
  <div class="expander-content">
    <p>这是折叠面板的内容。</p>
  </div>
</FluentExpander>`

const defaultExpandedCode = `<FluentExpander 
  header="默认展开的折叠面板" 
  :model-value="true"
>
  <div class="expander-content">
    <p>这个折叠面板默认是展开状态。</p>
  </div>
</FluentExpander>`

const controlledCode = `<FluentExpander 
  v-model="isExpanded" 
  header="受控模式的折叠面板"
  description="通过外部控制展开状态"
>
  <div class="expander-content">
    <p>这个折叠面板的展开状态由外部控制。</p>
  </div>
</FluentExpander>

const isExpanded = ref(false)`
</script>

<style scoped>
.expander-demo {
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

.expander-content {
  padding: 8px 0;
}

.expander-content p {
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: var(--text-primary);
}
</style>