<template>
  <div class="teaching-tip-demo">
    <div class="page-header">
      <h1>TeachingTip 教学提示</h1>
      <p>Fluent 教学提示组件，用于向用户介绍新功能或提供指导。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentButton @click="showTip1 = true">显示教学提示</FluentButton>
          <FluentTeachingTip 
            v-model="showTip1" 
            title="欢迎使用 Vue Fluent Widgets"
            subtitle="这是一个功能强大的 Fluent 组件库"
            icon="heart-20-regular"
          >
            <p>这里可以放置任何内容，包括文本、图片或其他组件。</p>
          </FluentTeachingTip>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="带操作按钮" 
      :source-code="actionsCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentButton @click="showTip2 = true">带操作按钮</FluentButton>
          <FluentTeachingTip 
            v-model="showTip2" 
            title="新功能介绍"
            subtitle="我们添加了一个强大的新功能"
            icon="star-20-regular"
          >
            <p>这个功能可以帮助您更高效地完成工作。</p>
            <template #actions>
              <FluentButton variant="primary" @click="showTip2 = false">了解更多</FluentButton>
              <FluentButton variant="secondary" @click="showTip2 = false">稍后再说</FluentButton>
            </template>
          </FluentTeachingTip>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="不同位置" 
      :source-code="placementCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentButton @click="showTip3 = true">上方显示</FluentButton>
          <FluentTeachingTip 
            v-model="showTip3" 
            title="上方提示"
            placement="top"
          >
            <p>这个提示显示在按钮上方。</p>
          </FluentTeachingTip>
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentTeachingTip, FluentButton, FluentControlExample } from 'vue-fluent-widgets'

const showTip1 = ref(false)
const showTip2 = ref(false)
const showTip3 = ref(false)

const basicCode = `<FluentButton @click="showTip = true">显示教学提示</FluentButton>
<FluentTeachingTip 
  v-model="showTip" 
  title="欢迎使用 Vue Fluent Widgets"
  subtitle="这是一个功能强大的 Fluent 组件库"
  icon="heart-20-regular"
>
  <p>这里可以放置任何内容。</p>
</FluentTeachingTip>

const showTip = ref(false)`

const actionsCode = `<FluentTeachingTip 
  v-model="showTip" 
  title="新功能介绍"
  subtitle="我们添加了一个强大的新功能"
  icon="star-20-regular"
>
  <p>这个功能可以帮助您更高效地完成工作。</p>
  <template #actions>
    <FluentButton variant="primary" @click="showTip = false">了解更多</FluentButton>
    <FluentButton variant="secondary" @click="showTip = false">稍后再说</FluentButton>
  </template>
</FluentTeachingTip>`

const placementCode = `<FluentTeachingTip 
  v-model="showTip" 
  title="上方提示"
  placement="top"
>
  <p>这个提示显示在按钮上方。</p>
</FluentTeachingTip>`
</script>

<style scoped>
.teaching-tip-demo {
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

.demo-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
</style>