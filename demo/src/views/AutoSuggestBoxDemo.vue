<template>
  <div class="auto-suggest-box-demo">
    <div class="page-header">
      <h1>AutoSuggestBox 自动建议框</h1>
      <p>Fluent 自动建议框组件，用于输入时显示建议。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentAutoSuggestBox 
            v-model="value" 
            :suggestions="fruits"
            label="搜索水果"
            placeholder="请输入水果名称"
            icon="search-16-regular"
            @select="onSelect"
          />
          <div class="demo-info">
            <p>选中的水果: {{ selected || '无' }}</p>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="对象数组" 
      :source-code="objectCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentAutoSuggestBox 
            v-model="value2" 
            :suggestions="users"
            label="搜索用户"
            placeholder="请输入用户名"
            value-key="name"
            @select="onSelectUser"
          />
          <div class="demo-info">
            <p>选中的用户: {{ selectedUser?.name || '无' }}</p>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="自定义过滤" 
      :source-code="filterCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentAutoSuggestBox 
            v-model="value3" 
            :suggestions="colors"
            label="搜索颜色"
            placeholder="请输入颜色名称"
            :filter-method="customFilter"
          />
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentAutoSuggestBox, FluentControlExample } from 'vue-fluent-widgets'

const value = ref('')
const value2 = ref('')
const value3 = ref('')
const selected = ref('')
const selectedUser = ref(null)

const fruits = ['苹果', '香蕉', '橙子', '葡萄', '草莓', '西瓜', '芒果', '菠萝']

const users = [
  { name: '张三', age: 25 },
  { name: '李四', age: 30 },
  { name: '王五', age: 28 },
  { name: '赵六', age: 35 },
  { name: '钱七', age: 22 }
]

const colors = ['红色', '蓝色', '绿色', '黄色', '紫色', '橙色', '粉色', '白色', '黑色']

const onSelect = (item) => {
  selected.value = item
}

const onSelectUser = (item) => {
  selectedUser.value = item
}

const customFilter = (query, items) => {
  const lowerQuery = query.toLowerCase()
  return items.filter(item => {
    const text = typeof item === 'string' ? item : item.name
    return text.toLowerCase().startsWith(lowerQuery)
  })
}

const basicCode = `<FluentAutoSuggestBox 
  v-model="value" 
  :suggestions="fruits"
  label="搜索水果"
  placeholder="请输入水果名称"
  icon="search-16-regular"
  @select="onSelect"
/>

const fruits = ['苹果', '香蕉', '橙子', '葡萄', '草莓']

const onSelect = (item) => {
  console.log('选中:', item)
}`

const objectCode = `<FluentAutoSuggestBox 
  v-model="value" 
  :suggestions="users"
  label="搜索用户"
  placeholder="请输入用户名"
  value-key="name"
  @select="onSelectUser"
/>

const users = [
  { name: '张三', age: 25 },
  { name: '李四', age: 30 }
]`

const filterCode = `<FluentAutoSuggestBox 
  v-model="value" 
  :suggestions="colors"
  label="搜索颜色"
  :filter-method="customFilter"
/>

const customFilter = (query, items) => {
  return items.filter(item => item.startsWith(query))
}`
</script>

<style scoped>
.auto-suggest-box-demo {
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
  max-width: 400px;
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