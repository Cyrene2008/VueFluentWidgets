<template>
  <div class="breadcrumb-bar-demo">
    <div class="page-header">
      <h1>BreadcrumbBar 面包屑导航</h1>
      <p>Fluent 面包屑导航组件，用于显示当前页面的路径。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentBreadcrumbBar :items="breadcrumbs" @item-click="onItemClick" />
          <div class="demo-info">
            <p>当前路径: {{ currentPath }}</p>
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
          <FluentBreadcrumbBar :items="iconBreadcrumbs" @item-click="onIconItemClick" />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="禁用项" 
      :source-code="disabledCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentBreadcrumbBar :items="disabledBreadcrumbs" />
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { FluentBreadcrumbBar, FluentControlExample } from 'vue-fluent-widgets'

const clickedItem = ref(null)

const breadcrumbs = [
  { label: '首页', href: '/' },
  { label: '文档', href: '/docs' },
  { label: '组件', href: '/components' },
  { label: '面包屑导航' }
]

const iconBreadcrumbs = [
  { label: '首页', icon: 'home-20-regular', href: '/' },
  { label: '文档', icon: 'document-20-regular', href: '/docs' },
  { label: '组件', icon: 'library-20-regular', href: '/components' },
  { label: '面包屑导航', icon: 'breadcrumb-20-regular' }
]

const disabledBreadcrumbs = [
  { label: '首页', href: '/' },
  { label: '禁用项', disabled: true },
  { label: '当前页' }
]

const currentPath = computed(() => {
  if (clickedItem.value) {
    return breadcrumbs.slice(0, clickedItem.value.index + 1).map(i => i.label).join(' > ')
  }
  return breadcrumbs.map(i => i.label).join(' > ')
})

const onItemClick = ({ item, index }) => {
  clickedItem.value = { item, index }
  console.log('点击:', item.label)
}

const onIconItemClick = ({ item, index }) => {
  console.log('点击图标项:', item.label)
}

const basicCode = `<FluentBreadcrumbBar :items="breadcrumbs" @item-click="onItemClick" />

const breadcrumbs = [
  { label: '首页', href: '/' },
  { label: '文档', href: '/docs' },
  { label: '组件', href: '/components' },
  { label: '面包屑导航' }
]`

const iconCode = `<FluentBreadcrumbBar :items="iconBreadcrumbs" @item-click="onItemClick" />

const iconBreadcrumbs = [
  { label: '首页', icon: 'home-20-regular', href: '/' },
  { label: '文档', icon: 'document-20-regular', href: '/docs' },
  { label: '组件', icon: 'library-20-regular', href: '/components' },
  { label: '面包屑导航', icon: 'breadcrumb-20-regular' }
]`

const disabledCode = `<FluentBreadcrumbBar :items="disabledBreadcrumbs" />

const disabledBreadcrumbs = [
  { label: '首页', href: '/' },
  { label: '禁用项', disabled: true },
  { label: '当前页' }
]`
</script>

<style scoped>
.breadcrumb-bar-demo {
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