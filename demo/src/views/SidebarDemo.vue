<template>
  <div class="sidebar-demo">
    <div class="demo-section">
      <h2>Sidebar 侧边栏菜单</h2>
      <p>Fluent 侧边栏菜单组件，用于导航。</p>
      
      <h3>基本用法</h3>
      <div class="demo-row">
        <FluentButton @click="open1 = !open1">切换侧边栏</FluentButton>
        <div class="sidebar-container">
          <SecondarySidebarMenu :open="open1" :items="menuItems" />
        </div>
      </div>

      <h3>带图标</h3>
      <div class="demo-row">
        <FluentButton @click="open2 = !open2">切换侧边栏</FluentButton>
        <div class="sidebar-container">
          <SecondarySidebarMenu :open="open2" :items="menuItemsWithIcons" />
        </div>
      </div>

      <div class="demo-code">
        <pre><code>&lt;FluentButton @click="open = !open"&gt;切换侧边栏&lt;/FluentButton&gt;
&lt;SecondarySidebarMenu :open="open" :items="menuItems" /&gt;

const menuItems = [
  { id: 'home', label: '首页', to: '/' },
  { id: 'settings', label: '设置', to: '/settings' },
  { id: 'profile', label: '个人资料', to: '/profile' }
]

const menuItemsWithIcons = [
  { id: 'home', label: '首页', icon: 'home', to: '/' },
  { id: 'settings', label: '设置', icon: 'settings', to: '/settings' },
  { id: 'profile', label: '个人资料', icon: 'person', to: '/profile' }
]</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const open1 = ref(false)
const open2 = ref(false)

const menuItems = [
  { id: 'home', label: '首页', to: '/' },
  { id: 'button', label: '按钮', to: '/button' },
  { id: 'material', label: '材质系统', to: '/material' },
  { id: 'about', label: '关于组件库', to: '/typography' }
]

const menuItemsWithIcons = [
  { id: 'home', label: '首页', icon: 'home', to: '/' },
  { id: 'button', label: '按钮', icon: 'button', to: '/button' },
  { id: 'material', label: '材质系统', icon: 'material', to: '/material' },
  { id: 'about', label: '关于组件库', icon: 'info', to: '/typography' }
]
</script>

<style scoped>
.sidebar-demo {
  max-width: 800px;
}

.sidebar-container {
  position: relative;
  width: 250px;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-2);
  min-height: 300px;
  overflow: hidden;
}
</style>
