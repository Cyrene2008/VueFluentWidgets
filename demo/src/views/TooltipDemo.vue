<template>
  <div class="tooltip-demo">
    <div class="page-header">
      <h1>Tooltip 工具提示</h1>
      <p>Fluent 工具提示组件，用于显示额外信息。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentTooltip content="这是一个工具提示">
            <FluentButton>悬停查看</FluentButton>
          </FluentTooltip>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="不同位置" 
      :source-code="placementCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentTooltip content="顶部提示" placement="top">
            <FluentButton>顶部</FluentButton>
          </FluentTooltip>
          <FluentTooltip content="底部提示" placement="bottom">
            <FluentButton>底部</FluentButton>
          </FluentTooltip>
          <FluentTooltip content="左侧提示" placement="left">
            <FluentButton>左侧</FluentButton>
          </FluentTooltip>
          <FluentTooltip content="右侧提示" placement="right">
            <FluentButton>右侧</FluentButton>
          </FluentTooltip>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="自定义内容" 
      :source-code="customCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentTooltip>
            <FluentButton>自定义内容</FluentButton>
            <template #content>
              <div class="custom-tooltip">
                <strong>自定义标题</strong>
                <p>这是自定义的工具提示内容。</p>
              </div>
            </template>
          </FluentTooltip>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="禁用状态" 
      :source-code="disabledCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentTooltip content="禁用的工具提示" disabled>
            <FluentButton>禁用提示</FluentButton>
          </FluentTooltip>
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { FluentTooltip, FluentButton, FluentControlExample } from 'vue-fluent-widgets'

const basicCode = `<FluentTooltip content="这是一个工具提示">
  <FluentButton>悬停查看</FluentButton>
</FluentTooltip>`

const placementCode = `<FluentTooltip content="顶部提示" placement="top">
  <FluentButton>顶部</FluentButton>
</FluentTooltip>
<FluentTooltip content="底部提示" placement="bottom">
  <FluentButton>底部</FluentButton>
</FluentTooltip>
<FluentTooltip content="左侧提示" placement="left">
  <FluentButton>左侧</FluentButton>
</FluentTooltip>
<FluentTooltip content="右侧提示" placement="right">
  <FluentButton>右侧</FluentButton>
</FluentTooltip>`

const customCode = `<FluentTooltip>
  <FluentButton>自定义内容</FluentButton>
  <template #content>
    <div class="custom-tooltip">
      <strong>自定义标题</strong>
      <p>这是自定义的工具提示内容。</p>
    </div>
  </template>
</FluentTooltip>`

const disabledCode = `<FluentTooltip content="禁用的工具提示" disabled>
  <FluentButton>禁用提示</FluentButton>
</FluentTooltip>`
</script>

<style scoped>
.tooltip-demo {
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

.custom-tooltip {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.custom-tooltip strong {
  font-size: 14px;
  font-weight: 600;
}

.custom-tooltip p {
  margin: 0;
  font-size: 12px;
  color: var(--text-secondary);
}
</style>