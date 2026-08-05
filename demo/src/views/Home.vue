<template>
  <div class="home-page">
    <div class="hero-section">
      <h1>Vue Fluent Widgets</h1>
      <p class="hero-description">
        基于 Fluent Design System 的 Vue 3 组件库，提供 100+ 组件，支持 Acrylic、Mica、Liquid Glass 等材质效果。
      </p>
      <div class="hero-actions">
        <FluentButton variant="primary" size="lg" @click="$router.push('/button')">
          开始使用
        </FluentButton>
        <FluentButton variant="secondary" size="lg" @click="$router.push('/material')">
          查看材质效果
        </FluentButton>
      </div>
    </div>

    <div class="stats-section">
      <div class="stat-item">
        <span class="stat-value">112+</span>
        <span class="stat-label">组件</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">4</span>
        <span class="stat-label">材质效果</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">Vue 3</span>
        <span class="stat-label">框架</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">TypeScript</span>
        <span class="stat-label">支持</span>
      </div>
    </div>

    <div class="features-section">
      <h2>主要特性</h2>
      <div class="features-grid">
        <div class="feature-card">
          <FluentIcon icon="paint-brush-20-regular" :width="32" />
          <h3>Fluent Design</h3>
          <p>完全遵循微软 Fluent Design System 设计规范</p>
        </div>
        <div class="feature-card">
          <FluentIcon icon="material-20-regular" :width="32" />
          <h3>材质效果</h3>
          <p>支持 Solid、Acrylic、Mica、Liquid Glass 等材质</p>
        </div>
        <div class="feature-card">
          <FluentIcon icon="code-20-regular" :width="32" />
          <h3>Vue 3 原生</h3>
          <p>使用 Composition API，完美支持 TypeScript</p>
        </div>
        <div class="feature-card">
          <FluentIcon icon="accessibility-20-regular" :width="32" />
          <h3>无障碍访问</h3>
          <p>完整的 ARIA 支持，键盘导航友好</p>
        </div>
      </div>
    </div>

    <div class="categories-section">
      <h2>组件分类</h2>
      <div class="categories-grid">
        <div v-for="category in categories" :key="category.id" class="category-card">
          <h3>{{ category.label }}</h3>
          <ul>
            <li v-for="item in category.items" :key="item.id">
              <router-link :to="item.to">{{ item.label }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="material-preview-section">
      <h2>材质效果预览</h2>
      <div class="material-preview-grid">
        <div class="material-preview-item">
          <FluentCard material="solid" class="material-card">
            <h3>Solid</h3>
            <p>默认不透明背景</p>
          </FluentCard>
        </div>
        <div class="material-preview-item">
          <FluentLiquidGlass variant="light" class="material-card">
            <h3>Liquid Glass</h3>
            <p>液态玻璃效果</p>
          </FluentLiquidGlass>
        </div>
        <div class="material-preview-item">
          <FluentLiquidGlass variant="dark" class="material-card">
            <h3>Dark Glass</h3>
            <p>深色液态玻璃</p>
          </FluentLiquidGlass>
        </div>
      </div>
    </div>

    <DemoFooter />
  </div>
</template>

<script setup>
import { FluentIcon, FluentButton, FluentCard, FluentLiquidGlass } from 'vue-fluent-widgets'
import DemoFooter from '../components/DemoFooter.vue'

const categories = [
  {
    id: 'basic-input',
    label: '基础输入',
    items: [
      { id: 'button', label: 'Button', to: '/button' },
      { id: 'checkbox', label: 'CheckBox', to: '/checkbox' },
      { id: 'input', label: 'Input', to: '/input' },
      { id: 'select', label: 'Select', to: '/select' }
    ]
  },
  {
    id: 'feedback',
    label: '反馈',
    items: [
      { id: 'modal', label: 'Modal', to: '/modal' },
      { id: 'toast', label: 'Toast', to: '/toast' },
      { id: 'infobar', label: 'InfoBar', to: '/infobar' },
      { id: 'tooltip', label: 'Tooltip', to: '/tooltip' }
    ]
  },
  {
    id: 'navigation',
    label: '导航',
    items: [
      { id: 'navigationview', label: 'NavigationView', to: '/navigationview' },
      { id: 'menubar', label: 'MenuBar', to: '/menubar' },
      { id: 'tabs', label: 'Tabs', to: '/tabs' },
      { id: 'treeview', label: 'TreeView', to: '/treeview' }
    ]
  },
  {
    id: 'advanced',
    label: '高级功能',
    items: [
      { id: 'material', label: '材质系统', to: '/material' },
      { id: 'mediaplayer', label: '媒体播放器', to: '/mediaplayer' },
      { id: 'datagrid', label: 'DataGrid', to: '/datagrid' },
      { id: 'rating', label: 'Rating', to: '/rating' }
    ]
  }
]
</script>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section {
  text-align: center;
  padding: 60px 0;
}

.hero-section h1 {
  font-size: 48px;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 16px;
}

.hero-description {
  font-size: 18px;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto 32px;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.stats-section {
  display: flex;
  justify-content: center;
  gap: 48px;
  padding: 32px 0;
  border-top: 1px solid var(--border-strong);
  border-bottom: 1px solid var(--border-strong);
  margin-bottom: 48px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: var(--accent);
}

.stat-label {
  font-size: 14px;
  color: var(--text-secondary);
}

.features-section,
.categories-section,
.material-preview-section {
  margin-bottom: 48px;
}

.features-section h2,
.categories-section h2,
.material-preview-section h2 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 24px;
  text-align: center;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.feature-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-strong);
}

.feature-card h3 {
  margin: 16px 0 8px;
  font-size: 18px;
}

.feature-card p {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.5;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.category-card {
  padding: 24px;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-strong);
}

.category-card h3 {
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 600;
}

.category-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-card li {
  margin-bottom: 8px;
}

.category-card a {
  color: var(--accent);
  text-decoration: none;
  font-size: 14px;
}

.category-card a:hover {
  text-decoration: underline;
}

.material-preview-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.material-preview-item {
  height: 200px;
}

.material-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.material-card h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
}

.material-card p {
  margin: 0;
  color: var(--text-secondary);
}
</style>