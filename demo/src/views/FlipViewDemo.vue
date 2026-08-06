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
              <article class="flip-item">
                <img v-if="item.kind === 'image'" :src="item.src" :alt="item.title" />
                <video v-else-if="item.kind === 'video'" :src="item.src" :poster="item.poster" controls muted preload="metadata" />
                <div v-else class="flip-content">
                  <FluentIcon icon="apps-list-detail-20-regular" :width="34" />
                  <h3>{{ item.title }}</h3>
                  <p>{{ item.description }}</p>
                  <FluentButton size="sm">执行自定义操作</FluentButton>
                </div>
                <div v-if="item.kind !== 'content'" class="flip-caption"><strong>{{ item.title }}</strong><span>{{ item.description }}</span></div>
              </article>
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
              <div class="flip-item">
                <div class="flip-content">
                  <FluentIcon icon="arrow-sort-20-regular" :width="30" />
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
                </div>
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
import { FluentButton, FluentFlipView, FluentIcon, FluentControlExample } from 'vue-fluent-widgets'

const currentIndex = ref(0)
const verticalIndex = ref(0)
const asset = path => `${import.meta.env.BASE_URL}${path}`

const items = [
  { kind: 'image', title: '图片内容', description: 'slot 中放置响应式图片', src: asset('images/Cyrene01.webp') },
  { kind: 'video', title: '视频内容', description: 'slot 中放置视频或媒体组件', src: asset('loop.mp4'), poster: asset('images/Cyrene02.webp') },
  { kind: 'content', title: '业务内容', description: '按钮、表单、图表和其他 Vue 组件都可以组合' }
]

const basicCode = `<FluentFlipView v-model="currentIndex" :items="items" style="height: 300px;">
  <template #default="{ item }">
    <img v-if="item.kind === 'image'" :src="item.src" :alt="item.title" />
    <video v-else-if="item.kind === 'video'" :src="item.src" controls />
    <YourBusinessCard v-else :item="item" />
  </template>
</FluentFlipView>

const currentIndex = ref(0)
const items = [
  { kind: 'image', src: '/images/example.webp' },
  { kind: 'video', src: '/media/example.mp4' },
  { kind: 'content', title: '自己的业务组件' }
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
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--bg-card-solid);
}

.flip-item > img,
.flip-item > video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.flip-content {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: var(--text-primary);
  padding: 24px;
  text-align: center;
}

.flip-content h3 {
  font-size: 24px;
  margin: 0;
}

.flip-content p {
  font-size: 16px;
  color: var(--text-secondary);
  opacity: 0.9;
}

.flip-caption {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 30px 16px 14px;
  background: linear-gradient(transparent, rgba(0, 0, 0, .74));
  color: #fff;
}

.flip-caption span { font-size: 12px; opacity: .82; }

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
