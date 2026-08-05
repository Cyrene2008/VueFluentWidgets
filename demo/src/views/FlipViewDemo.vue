<template>
  <div class="flip-view-demo">
    <div class="page-header">
      <h1>FlipView 翻转视图</h1>
      <p>Fluent 翻转视图组件，用于在多个项目之间切换。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentFlipView v-model="currentIndex" :items="items" style="height: 300px;">
            <template #default="{ item }">
              <div class="flip-item" :style="{ background: item.color }">
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
            </template>
          </FluentFlipView>
          <div class="demo-info">
            <p>当前项目: {{ currentIndex + 1 }} / {{ items.length }}</p>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="垂直模式" 
      :source-code="verticalCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentFlipView v-model="verticalIndex" :items="items" vertical style="height: 300px;">
            <template #default="{ item }">
              <div class="flip-item" :style="{ background: item.color }">
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
            </template>
          </FluentFlipView>
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentFlipView, FluentControlExample } from 'vue-fluent-widgets'

const currentIndex = ref(0)
const verticalIndex = ref(0)

const items = [
  { title: '项目 1', description: '这是第一个项目', color: '#0078d4' },
  { title: '项目 2', description: '这是第二个项目', color: '#107c10' },
  { title: '项目 3', description: '这是第三个项目', color: '#d83b01' },
  { title: '项目 4', description: '这是第四个项目', color: '#b4009e' }
]

const basicCode = `<FluentFlipView v-model="currentIndex" :items="items" style="height: 300px;">
  <template #default="{ item }">
    <div class="flip-item" :style="{ background: item.color }">
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
    </div>
  </template>
</FluentFlipView>

const currentIndex = ref(0)
const items = [
  { title: '项目 1', description: '这是第一个项目', color: '#0078d4' },
  { title: '项目 2', description: '这是第二个项目', color: '#107c10' }
]`

const verticalCode = `<FluentFlipView v-model="currentIndex" :items="items" vertical style="height: 300px;">
  <template #default="{ item }">
    <div class="flip-item" :style="{ background: item.color }">
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
    </div>
  </template>
</FluentFlipView>`
</script>

<style scoped>
.flip-view-demo {
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

.flip-item {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 24px;
  text-align: center;
}

.flip-item h3 {
  font-size: 24px;
  margin-bottom: 8px;
}

.flip-item p {
  font-size: 16px;
  opacity: 0.9;
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