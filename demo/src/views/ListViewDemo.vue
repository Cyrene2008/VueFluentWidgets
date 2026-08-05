<template>
  <div class="list-view-demo">
    <div class="page-header">
      <h1>ListView 列表视图</h1>
      <p>Fluent 列表视图组件，用于以列表形式展示数据。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentListView :items="items" style="max-height: 300px;">
            <template #default="{ item }">
              <div class="list-item">
                <FluentIcon :icon="item.icon" :width="20" />
                <div class="item-info">
                  <span class="item-name">{{ item.name }}</span>
                  <span class="item-description">{{ item.description }}</span>
                </div>
              </div>
            </template>
          </FluentListView>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="带标题" 
      :source-code="headerCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentListView :items="items" header="联系人列表" style="max-height: 300px;">
            <template #default="{ item }">
              <div class="list-item">
                <FluentPersonPicture :size="32" :display-name="item.name" />
                <div class="item-info">
                  <span class="item-name">{{ item.name }}</span>
                  <span class="item-description">{{ item.email }}</span>
                </div>
              </div>
            </template>
          </FluentListView>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="可选择" 
      :source-code="selectableCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentListView 
            :items="selectableItems" 
            selectable
            v-model:selected-items="selectedItems"
            header="选择项目"
            style="max-height: 300px;"
          />
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
import { FluentListView, FluentIcon, FluentPersonPicture, FluentControlExample } from 'vue-fluent-widgets'

const items = [
  { name: '张三', description: '前端开发工程师', icon: 'person-20-regular', email: 'zhangsan@example.com' },
  { name: '李四', description: '后端开发工程师', icon: 'person-20-regular', email: 'lisi@example.com' },
  { name: '王五', description: 'UI设计师', icon: 'person-20-regular', email: 'wangwu@example.com' },
  { name: '赵六', description: '产品经理', icon: 'person-20-regular', email: 'zhaoliu@example.com' },
  { name: '钱七', description: '测试工程师', icon: 'person-20-regular', email: 'qianqi@example.com' }
]

const selectableItems = [
  { label: '项目 1', icon: 'heart-20-regular' },
  { label: '项目 2', icon: 'star-20-regular' },
  { label: '项目 3', icon: 'bookmark-20-regular' },
  { label: '项目 4', icon: 'flag-20-regular' },
  { label: '项目 5', icon: 'pin-20-regular' }
]

const selectedItems = ref([])

const basicCode = `<FluentListView :items="items" style="max-height: 300px;">
  <template #default="{ item }">
    <div class="list-item">
      <FluentIcon :icon="item.icon" :width="20" />
      <div class="item-info">
        <span class="item-name">{{ item.name }}</span>
        <span class="item-description">{{ item.description }}</span>
      </div>
    </div>
  </template>
</FluentListView>`

const headerCode = `<FluentListView :items="items" header="联系人列表">
  <template #default="{ item }">
    <div class="list-item">
      <FluentPersonPicture :size="32" :display-name="item.name" />
      <div class="item-info">
        <span class="item-name">{{ item.name }}</span>
        <span class="item-description">{{ item.email }}</span>
      </div>
    </div>
  </template>
</FluentListView>`

const selectableCode = `<FluentListView 
  :items="items" 
  selectable
  v-model:selected-items="selectedItems"
  header="选择项目"
/>

const selectedItems = ref([])`
</script>

<style scoped>
.list-view-demo {
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

.list-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.item-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
}

.item-description {
  font-size: 12px;
  color: var(--text-secondary);
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