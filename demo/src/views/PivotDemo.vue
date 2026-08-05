<template>
  <div class="pivot-demo">
    <div class="page-header">
      <h1>Pivot 枢轴</h1>
      <p>Fluent 枢轴组件，用于在不同的内容视图之间切换。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentPivot v-model="selectedTab" :items="tabs">
            <template #tab-0>
              <div class="tab-content">
                <h3>首页内容</h3>
                <p>这是首页的内容。</p>
              </div>
            </template>
            <template #tab-1>
              <div class="tab-content">
                <h3>个人资料</h3>
                <p>这是个人资料的内容。</p>
              </div>
            </template>
            <template #tab-2>
              <div class="tab-content">
                <h3>设置</h3>
                <p>这是设置的内容。</p>
              </div>
            </template>
          </FluentPivot>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="带图标" 
      :source-code="iconCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentPivot v-model="selectedIconTab" :items="iconTabs">
            <template #tab-0>
              <div class="tab-content">
                <h3>主页</h3>
                <p>欢迎来到主页。</p>
              </div>
            </template>
            <template #tab-1>
              <div class="tab-content">
                <h3>搜索</h3>
                <p>在这里搜索内容。</p>
              </div>
            </template>
            <template #tab-2>
              <div class="tab-content">
                <h3>设置</h3>
                <p>配置应用程序设置。</p>
              </div>
            </template>
          </FluentPivot>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="禁用标签" 
      :source-code="disabledCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentPivot v-model="selectedDisabledTab" :items="disabledTabs">
            <template #tab-0>
              <div class="tab-content">
                <h3>可用标签</h3>
                <p>这个标签是可用的。</p>
              </div>
            </template>
            <template #tab-1>
              <div class="tab-content">
                <h3>禁用标签</h3>
                <p>这个标签被禁用了。</p>
              </div>
            </template>
          </FluentPivot>
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentPivot, FluentControlExample } from 'vue-fluent-widgets'

const selectedTab = ref(0)
const selectedIconTab = ref(0)
const selectedDisabledTab = ref(0)

const tabs = [
  { label: '首页' },
  { label: '个人资料' },
  { label: '设置' }
]

const iconTabs = [
  { label: '主页', icon: 'home-20-regular' },
  { label: '搜索', icon: 'search-20-regular' },
  { label: '设置', icon: 'settings-20-regular' }
]

const disabledTabs = [
  { label: '可用标签' },
  { label: '禁用标签', disabled: true }
]

const basicCode = `<FluentPivot v-model="selectedTab" :items="tabs">
  <template #tab-0>
    <div class="tab-content">
      <h3>首页内容</h3>
      <p>这是首页的内容。</p>
    </div>
  </template>
  <template #tab-1>
    <div class="tab-content">
      <h3>个人资料</h3>
      <p>这是个人资料的内容。</p>
    </div>
  </template>
</FluentPivot>

const selectedTab = ref(0)
const tabs = [
  { label: '首页' },
  { label: '个人资料' },
  { label: '设置' }
]`

const iconCode = `<FluentPivot v-model="selectedTab" :items="iconTabs">
  <template #tab-0>
    <div class="tab-content">
      <h3>主页</h3>
      <p>欢迎来到主页。</p>
    </div>
  </template>
</FluentPivot>

const iconTabs = [
  { label: '主页', icon: 'home-20-regular' },
  { label: '搜索', icon: 'search-20-regular' },
  { label: '设置', icon: 'settings-20-regular' }
]`

const disabledCode = `<FluentPivot v-model="selectedTab" :items="disabledTabs">
  <template #tab-0>
    <div class="tab-content">
      <h3>可用标签</h3>
      <p>这个标签是可用的。</p>
    </div>
  </template>
  <template #tab-1>
    <div class="tab-content">
      <h3>禁用标签</h3>
      <p>这个标签被禁用了。</p>
    </div>
  </template>
</FluentPivot>

const disabledTabs = [
  { label: '可用标签' },
  { label: '禁用标签', disabled: true }
]`
</script>

<style scoped>
.pivot-demo {
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

.tab-content {
  padding: 16px;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-strong);
}

.tab-content h3 {
  margin-bottom: 8px;
  color: var(--text-primary);
}

.tab-content p {
  color: var(--text-secondary);
}
</style>