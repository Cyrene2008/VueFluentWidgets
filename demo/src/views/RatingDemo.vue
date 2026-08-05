<template>
  <div class="rating-demo">
    <div class="page-header">
      <h1>Rating 评分</h1>
      <p>Fluent 评分组件，用于让用户进行评分。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentRating v-model="rating1" @change="onRatingChange" />
          <div class="demo-info">
            <p>当前评分: {{ rating1 }}</p>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="不同尺寸" 
      :source-code="sizesCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentRating v-model="rating2" :icon-size="16" />
          <FluentRating v-model="rating2" :icon-size="20" />
          <FluentRating v-model="rating2" :icon-size="24" />
          <FluentRating v-model="rating2" :icon-size="32" />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="自定义最大值" 
      :source-code="maxCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentRating v-model="rating3" :max-rating="3" />
          <FluentRating v-model="rating4" :max-rating="5" />
          <FluentRating v-model="rating5" :max-rating="10" />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="只读和禁用" 
      :source-code="readonlyCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentRating v-model="rating6" readonly />
          <FluentRating v-model="rating7" disabled />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="带标题" 
      :source-code="captionCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentRating v-model="rating8" caption="请为我们的服务评分" />
          <FluentRating v-model="rating9" :max-rating="10" caption="10分制评分" />
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentRating, FluentControlExample } from 'vue-fluent-widgets'

const rating1 = ref(3)
const rating2 = ref(4)
const rating3 = ref(2)
const rating4 = ref(3)
const rating5 = ref(7)
const rating6 = ref(4)
const rating7 = ref(2)
const rating8 = ref(0)
const rating9 = ref(5)

const onRatingChange = (value) => {
  console.log('评分变化:', value)
}

const basicCode = `<FluentRating v-model="rating" @change="onRatingChange" />

const rating = ref(3)
const onRatingChange = (value) => {
  console.log('评分变化:', value)
}`

const sizesCode = `<FluentRating v-model="rating" :icon-size="16" />
<FluentRating v-model="rating" :icon-size="20" />
<FluentRating v-model="rating" :icon-size="24" />
<FluentRating v-model="rating" :icon-size="32" />`

const maxCode = `<FluentRating v-model="rating" :max="3" />
<FluentRating v-model="rating" :max="5" />
<FluentRating v-model="rating" :max="10" />`

const readonlyCode = `<FluentRating v-model="rating" readonly />
<FluentRating v-model="rating" disabled />`

const captionCode = `<FluentRating v-model="rating" caption="请为我们的服务评分" />
<FluentRating v-model="rating" :max="10" caption="10分制评分" />`
</script>

<style scoped>
.rating-demo {
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

.demo-row {
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
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
