<template>
  <div class="flyout-demo">
    <div class="page-header">
      <h1>Flyout 弹出框</h1>
      <p>Fluent 弹出框组件，用于显示临时内容或操作。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentFlyout v-model="isOpen1" title="弹出框标题">
            <template #trigger>
              <FluentButton>打开弹出框</FluentButton>
            </template>
            <p>这是弹出框的内容。可以包含任何内容。</p>
            <template #footer>
              <FluentButton variant="secondary" @click="isOpen1 = false">取消</FluentButton>
              <FluentButton variant="primary" @click="isOpen1 = false">确认</FluentButton>
            </template>
          </FluentFlyout>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="不同位置" 
      :source-code="placementCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentFlyout placement="top">
            <template #trigger>
              <FluentButton>上方</FluentButton>
            </template>
            <p>在上方显示的弹出框</p>
          </FluentFlyout>
          <FluentFlyout placement="bottom">
            <template #trigger>
              <FluentButton>下方</FluentButton>
            </template>
            <p>在下方显示的弹出框</p>
          </FluentFlyout>
          <FluentFlyout placement="left">
            <template #trigger>
              <FluentButton>左侧</FluentButton>
            </template>
            <p>在左侧显示的弹出框</p>
          </FluentFlyout>
          <FluentFlyout placement="right">
            <template #trigger>
              <FluentButton>右侧</FluentButton>
            </template>
            <p>在右侧显示的弹出框</p>
          </FluentFlyout>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="无标题" 
      :source-code="noHeaderCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentFlyout>
            <template #trigger>
              <FluentButton>无标题弹出框</FluentButton>
            </template>
            <p>这是没有标题的弹出框。</p>
          </FluentFlyout>
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentFlyout, FluentButton, FluentControlExample } from 'vue-fluent-widgets'

const isOpen1 = ref(false)

const basicCode = `<FluentFlyout v-model="isOpen" title="弹出框标题">
  <template #trigger>
    <FluentButton>打开弹出框</FluentButton>
  </template>
  <p>这是弹出框的内容。</p>
  <template #footer>
    <FluentButton variant="secondary" @click="isOpen = false">取消</FluentButton>
    <FluentButton variant="primary" @click="isOpen = false">确认</FluentButton>
  </template>
</FluentFlyout>

const isOpen = ref(false)`

const placementCode = `<FluentFlyout placement="top">
  <template #trigger>
    <FluentButton>上方</FluentButton>
  </template>
  <p>在上方显示的弹出框</p>
</FluentFlyout>

<FluentFlyout placement="bottom">
  <template #trigger>
    <FluentButton>下方</FluentButton>
  </template>
  <p>在下方显示的弹出框</p>
</FluentFlyout>`

const noHeaderCode = `<FluentFlyout>
  <template #trigger>
    <FluentButton>无标题弹出框</FluentButton>
  </template>
  <p>这是没有标题的弹出框。</p>
</FluentFlyout>`
</script>

<style scoped>
.flyout-demo {
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