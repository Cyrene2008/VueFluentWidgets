<template>
  <div class="navigation-view-demo">
    <div class="page-header">
      <h1>NavigationView 导航视图</h1>
      <p>Fluent 导航视图组件，用于应用的主要导航结构。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
      :show-source-code="false"
    >
      <template #example>
        <div class="navigation-demo-container">
          <FluentNavigationView 
            :menu-items="menuItems"
            pane-title="我的应用"
          >
            <div class="navigation-content">
              <h2>内容区域</h2>
              <p>这是导航视图的内容区域。点击左侧菜单项可以切换内容。</p>
            </div>
          </FluentNavigationView>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="菜单项类型" 
      :source-code="menuTypesCode"
    >
      <template #example>
        <div class="demo-column">
          <div class="demo-info">
            <p>NavigationView 支持多种菜单项类型：</p>
            <ul>
              <li><strong>普通菜单项</strong> - 可点击的导航项</li>
              <li><strong>分隔符</strong> - 用于分组的水平线</li>
              <li><strong>标题</strong> - 用于标注菜单分组</li>
              <li><strong>带子菜单的项</strong> - 可展开/折叠的父级菜单</li>
              <li><strong>带徽章的项</strong> - 显示数字或状态标识</li>
            </ul>
          </div>
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { FluentNavigationView, FluentControlExample } from 'vue-fluent-widgets'

const menuItems = [
  { id: 'home', label: '首页', icon: 'home-20-regular', to: '/navigationview' },
  { id: 'separator1', type: 'separator' },
  { id: 'basic-input-header', type: 'header', label: '基础输入' },
  { id: 'button', label: '按钮', icon: 'button-20-regular', to: '/button' },
  { id: 'checkbox', label: '复选框', icon: 'checkbox-20-regular', to: '/checkbox' },
  { id: 'input', label: '输入框', icon: 'text-field-20-regular', to: '/input' },
  { id: 'separator2', type: 'separator' },
  { id: 'layout-header', type: 'header', label: '布局' },
  { id: 'card', label: '卡片', icon: 'card-20-regular', to: '/card' },
  { id: 'expander', label: '折叠面板', icon: 'chevron-down-20-regular', to: '/expander' },
  { id: 'separator3', type: 'separator' },
  { id: 'feedback-header', type: 'header', label: '反馈' },
  { id: 'modal', label: '模态框', icon: 'window-20-regular', to: '/modal', badge: '3' },
  { id: 'toast', label: '消息提示', icon: 'alert-20-regular', to: '/toast' },
  { id: 'separator4', type: 'separator' },
  { id: 'settings', label: '设置', icon: 'settings-20-regular', to: '/material' }
]

const basicCode = `<FluentNavigationView 
  :menu-items="menuItems"
  pane-title="我的应用"
>
  <div class="content">
    <h2>内容区域</h2>
    <p>这是导航视图的内容区域。</p>
  </div>
</FluentNavigationView>

const menuItems = [
  { id: 'home', label: '首页', icon: 'home-20-regular', to: '/' },
  { id: 'button', label: '按钮', icon: 'button-20-regular', to: '/button' },
  { id: 'settings', label: '设置', icon: 'settings-20-regular', to: '/settings' }
]`

const menuTypesCode = `// 分隔符
{ id: 'sep', type: 'separator' }

// 标题
{ id: 'header', type: 'header', label: '分组标题' }

// 带徽章的项
{ id: 'item', label: '菜单项', badge: '5' }

// 带子菜单的项
{ id: 'parent', label: '父级', children: [
  { id: 'child1', label: '子项1' },
  { id: 'child2', label: '子项2' }
]}`
</script>

<style scoped>
.navigation-view-demo {
  max-width: 1000px;
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

.navigation-demo-container {
  height: 500px;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.navigation-content {
  padding: 24px;
}

.navigation-content h2 {
  margin-bottom: 12px;
  color: var(--text-primary);
}

.navigation-content p {
  color: var(--text-secondary);
}

.demo-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.demo-info {
  padding: 16px;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-strong);
}

.demo-info p {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: var(--text-secondary);
}

.demo-info ul {
  margin: 0;
  padding-left: 20px;
}

.demo-info li {
  font-size: 14px;
  color: var(--text-primary);
  line-height: 24px;
}
</style>
