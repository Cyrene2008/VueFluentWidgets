<template>
  <div class="person-picture-demo">
    <div class="page-header">
      <h1>PersonPicture 人物图片</h1>
      <p>Fluent 人物图片组件，用于显示用户头像。</p>
    </div>

    <FluentControlExample 
      header-text="使用图片" 
      :source-code="imageCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentPersonPicture :size="48" :src="asset('images/avatar.webp')" display-name="Cyrene2008" />
          <FluentPersonPicture :size="64" :src="asset('images/avatar.webp')" display-name="Cyrene2008" />
          <FluentPersonPicture :size="96" :src="asset('images/avatar.webp')" display-name="Cyrene2008" />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="不同形状" 
      :source-code="shapesCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentPersonPicture :size="64" :src="asset('images/avatar.webp')" display-name="Cyrene2008" shape="circle" />
          <FluentPersonPicture :size="64" :src="asset('images/avatar.webp')" display-name="Cyrene2008" shape="square" />
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { FluentPersonPicture, FluentControlExample } from 'vue-fluent-widgets'

const asset = path => `${import.meta.env.BASE_URL}${path}`

const imageCode = `<FluentPersonPicture :size="48" :src="asset('images/avatar.webp')" display-name="Cyrene2008" />
<FluentPersonPicture :size="64" :src="asset('images/avatar.webp')" display-name="Cyrene2008" />
<FluentPersonPicture :size="96" :src="asset('images/avatar.webp')" display-name="Cyrene2008" />`

const shapesCode = `<FluentPersonPicture :size="64" :src="asset('images/avatar.webp')" display-name="Cyrene2008" shape="circle" />
<FluentPersonPicture :size="64" :src="asset('images/avatar.webp')" display-name="Cyrene2008" shape="square" />`
</script>

<style scoped>
.person-picture-demo {
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
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 16px;
}
</style>
