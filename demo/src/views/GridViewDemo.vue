<template>
  <div class="grid-view-demo">
    <div class="page-header">
      <h1>GridView 网格视图</h1>
      <p>Fluent 网格视图组件，用于以网格形式展示数据。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentGridView :items="items" :columns="4">
            <template #default="{ item }">
              <div class="grid-item" :style="{ background: item.color }">
                <FluentIcon :icon="item.icon" :width="24" />
                <span>{{ item.label }}</span>
              </div>
            </template>
          </FluentGridView>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="可选择" 
      :source-code="selectableCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentGridView 
            :items="selectableItems" 
            :columns="3" 
            selectable
            v-model:selected-items="selectedItems"
          >
            <template #default="{ item }">
              <div class="grid-item selectable-item">
                <FluentIcon :icon="item.icon" :width="24" />
                <span>{{ item.label }}</span>
              </div>
            </template>
          </FluentGridView>
          <div class="demo-info">
            <p>选中的项目: {{ selectedItems.map(i => i.label).join(', ') || '无' }}</p>
          </div>
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentGridView, FluentIcon, FluentControlExample } from 'vue-fluent-widgets'

const items = [
  { label: '主页', icon: 'home-20-regular', color: '#0078d4' },
  { label: '搜索', icon: 'search-20-regular', color: '#107c10' },
  { label: '设置', icon: 'settings-20-regular', color: '#d83b01' },
  { label: '用户', icon: 'person-20-regular', color: '#b4009e' },
  { label: '邮件', icon: 'mail-20-regular', color: '#0063b1' },
  { label: '日历', icon: 'calendar-20-regular', color: '#c239b3' },
  { label: '文件', icon: 'folder-20-regular', color: '#ff8c00' },
  { label: '图片', icon: 'image-20-regular', color: '#e81123' }
]

const selectableItems = [
  { label: '项目 1', icon: 'heart-20-regular' },
  { label: '项目 2', icon: 'star-20-regular' },
  { label: '项目 3', icon: 'bookmark-20-regular' },
  { label: '项目 4', icon: 'flag-20-regular' },
  { label: '项目 5', icon: 'pin-20-regular' },
  { label: '项目 6', icon: 'tag-20-regular' }
]

const selectedItems = ref([])

const basicCode = `<FluentGridView :items="items" :columns="4">
  <template #default="{ item }">
    <div class="grid-item" :style="{ background: item.color }">
      <FluentIcon :icon="item.icon" :width="24" />
      <span>{{ item.label }}</span>
    </div>
  </template>
</FluentGridView>

const items = [
  { label: '主页', icon: 'home-20-regular', color: '#0078d4' },
  { label: '搜索', icon: 'search-20-regular', color: '#107c10' }
]`

const selectableCode = `<FluentGridView 
  :items="items" 
  :columns="3" 
  selectable
  v-model:selected-items="selectedItems"
>
  <template #default="{ item }">
    <div class="grid-item">
      <FluentIcon :icon="item.icon" :width="24" />
      <span>{{ item.label }}</span>
    </div>
  </template>
</FluentGridView>

const selectedItems = ref([])`
</script>

<style scoped>
.grid-view-demo {
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

.grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px;
  border-radius: var(--radius-md);
  color: white;
  min-height: 100px;
}

.selectable-item {
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  color: var(--text-primary);
}

.demo-info {
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