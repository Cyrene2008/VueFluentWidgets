<template>
  <div class="list-box-demo">
    <div class="page-header">
      <h1>ListBox 列表框</h1>
      <p>Fluent 列表框组件，用于从列表中选择一个或多个项目。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentListBox 
            :items="fruits" 
            v-model="selectedFruit"
            label-key="name"
            @change="onFruitChange"
          />
          <div class="demo-info">
            <p>选中的水果: {{ selectedFruit?.name || '无' }}</p>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="多选" 
      :source-code="multipleCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentListBox 
            :items="colors" 
            v-model="selectedColors"
            multiple
            label-key="name"
            @change="onColorChange"
          />
          <div class="demo-info">
            <p>选中的颜色: {{ selectedColors.map(c => c.name).join(', ') || '无' }}</p>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="简单列表" 
      :source-code="simpleCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentListBox 
            :items="simpleItems" 
            v-model="selectedSimple"
          />
          <div class="demo-info">
            <p>选中的项目: {{ selectedSimple || '无' }}</p>
          </div>
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentListBox, FluentControlExample } from 'vue-fluent-widgets'

const fruits = [
  { name: '苹果', value: 'apple' },
  { name: '香蕉', value: 'banana' },
  { name: '橙子', value: 'orange' },
  { name: '葡萄', value: 'grape' },
  { name: '草莓', value: 'strawberry' }
]

const colors = [
  { name: '红色', value: 'red' },
  { name: '蓝色', value: 'blue' },
  { name: '绿色', value: 'green' },
  { name: '黄色', value: 'yellow' },
  { name: '紫色', value: 'purple' }
]

const simpleItems = ['项目 1', '项目 2', '项目 3', '项目 4', '项目 5']

const selectedFruit = ref(null)
const selectedColors = ref([])
const selectedSimple = ref(null)

const onFruitChange = (item) => {
  console.log('选中的水果:', item)
}

const onColorChange = (items) => {
  console.log('选中的颜色:', items)
}

const basicCode = `<FluentListBox 
  :items="fruits" 
  v-model="selectedFruit"
  label-key="name"
  @change="onFruitChange"
/>

const fruits = [
  { name: '苹果', value: 'apple' },
  { name: '香蕉', value: 'banana' },
  { name: '橙子', value: 'orange' }
]

const selectedFruit = ref(null)`

const multipleCode = `<FluentListBox 
  :items="colors" 
  v-model="selectedColors"
  multiple
  label-key="name"
  @change="onColorChange"
/>

const colors = [
  { name: '红色', value: 'red' },
  { name: '蓝色', value: 'blue' },
  { name: '绿色', value: 'green' }
]

const selectedColors = ref([])`

const simpleCode = `<FluentListBox 
  :items="simpleItems" 
  v-model="selectedSimple"
/>

const simpleItems = ['项目 1', '项目 2', '项目 3', '项目 4', '项目 5']

const selectedSimple = ref(null)`
</script>

<style scoped>
.list-box-demo {
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
  gap: 12px;
  max-width: 300px;
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