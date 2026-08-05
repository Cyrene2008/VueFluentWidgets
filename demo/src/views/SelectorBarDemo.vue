<template>
  <div class="selector-bar-demo">
    <div class="page-header">
      <h1>SelectorBar 选择器栏</h1>
      <p>Fluent 选择器栏组件，用于在多个选项中选择一个。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentSelectorBar v-model="selectedTab" :items="tabs" />
          <div class="demo-content">
            <p v-if="selectedTab === 0">选项 1 的内容</p>
            <p v-else-if="selectedTab === 1">选项 2 的内容</p>
            <p v-else>选项 3 的内容</p>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="带图标" 
      :source-code="iconCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentSelectorBar v-model="selectedIconTab" :items="iconTabs" />
          <div class="demo-content">
            <p>当前选中: {{ iconTabs[selectedIconTab]?.label }}</p>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="禁用选项" 
      :source-code="disabledCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentSelectorBar v-model="selectedDisabledTab" :items="disabledTabs" />
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentSelectorBar, FluentControlExample } from 'vue-fluent-widgets'

const selectedTab = ref(0)
const selectedIconTab = ref(0)
const selectedDisabledTab = ref(0)

const tabs = [
  { label: '选项 1' },
  { label: '选项 2' },
  { label: '选项 3' }
]

const iconTabs = [
  { label: '主页', icon: 'home-20-regular' },
  { label: '搜索', icon: 'search-20-regular' },
  { label: '设置', icon: 'settings-20-regular' }
]

const disabledTabs = [
  { label: '可用选项' },
  { label: '禁用选项', disabled: true },
  { label: '另一个选项' }
]

const basicCode = `<FluentSelectorBar v-model="selectedTab" :items="tabs" />

const selectedTab = ref(0)
const tabs = [
  { label: '选项 1' },
  { label: '选项 2' },
  { label: '选项 3' }
]`

const iconCode = `<FluentSelectorBar v-model="selectedTab" :items="iconTabs" />

const iconTabs = [
  { label: '主页', icon: 'home-20-regular' },
  { label: '搜索', icon: 'search-20-regular' },
  { label: '设置', icon: 'settings-20-regular' }
]`

const disabledCode = `<FluentSelectorBar v-model="selectedTab" :items="disabledTabs" />

const disabledTabs = [
  { label: '可用选项' },
  { label: '禁用选项', disabled: true },
  { label: '另一个选项' }
]`
</script>

<style scoped>
.selector-bar-demo {
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
  gap: 16px;
}

.demo-content {
  padding: 16px;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-strong);
}

.demo-content p {
  margin: 0;
  color: var(--text-primary);
}
</style>