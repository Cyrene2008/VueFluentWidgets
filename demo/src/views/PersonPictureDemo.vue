<template>
  <div class="person-picture-demo">
    <div class="page-header">
      <h1>PersonPicture 人物图片</h1>
      <p>Fluent 人物图片组件，用于显示用户头像。</p>
    </div>

    <FluentControlExample 
      header-text="不同尺寸" 
      :source-code="sizesCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentPersonPicture :size="24" display-name="张三" />
          <FluentPersonPicture :size="32" display-name="李四" />
          <FluentPersonPicture :size="48" display-name="王五" />
          <FluentPersonPicture :size="64" display-name="赵六" />
          <FluentPersonPicture :size="96" display-name="钱七" />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="不同形状" 
      :source-code="shapesCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentPersonPicture :size="64" display-name="张三" shape="circle" />
          <FluentPersonPicture :size="64" display-name="李四" shape="square" />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="图片和首字母" 
      :source-code="typesCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentPersonPicture :size="64" src="/images/avatar.webp" display-name="Cyrene2008" />
          <FluentPersonPicture :size="64" display-name="张三" />
          <FluentPersonPicture :size="64" initials="AB" />
          <FluentPersonPicture :size="64" />
        </div>
        <FluentInfoBar severity="info" title="版权声明" description="头像仅供非商业用途展示使用，版权归米哈游所有" />
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="自定义颜色" 
      :source-code="customCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentPersonPicture :size="64" display-name="张三" class="custom-color-1" />
          <FluentPersonPicture :size="64" display-name="李四" class="custom-color-2" />
          <FluentPersonPicture :size="64" display-name="王五" class="custom-color-3" />
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { FluentPersonPicture, FluentInfoBar, FluentControlExample } from 'vue-fluent-widgets'

const sizesCode = `<FluentPersonPicture :size="24" display-name="张三" />
<FluentPersonPicture :size="32" display-name="李四" />
<FluentPersonPicture :size="48" display-name="王五" />
<FluentPersonPicture :size="64" display-name="赵六" />
<FluentPersonPicture :size="96" display-name="钱七" />`

const shapesCode = `<FluentPersonPicture :size="64" display-name="张三" shape="circle" />
<FluentPersonPicture :size="64" display-name="李四" shape="square" />`

const typesCode = `<FluentPersonPicture :size="64" src="avatar.jpg" display-name="Cyrene2008" />
<FluentPersonPicture :size="64" display-name="张三" />
<FluentPersonPicture :size="64" initials="AB" />
<FluentPersonPicture :size="64" />`

const customCode = `<FluentPersonPicture :size="64" display-name="张三" class="custom-color-1" />
<FluentPersonPicture :size="64" display-name="李四" class="custom-color-2" />

.custom-color-1 { background: linear-gradient(135deg, #ff6b6b, #ee5a24); }
.custom-color-2 { background: linear-gradient(135deg, #a29bfe, #6c5ce7); }`
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
}

:deep(.custom-color-1) {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24) !important;
}

:deep(.custom-color-2) {
  background: linear-gradient(135deg, #a29bfe, #6c5ce7) !important;
}

:deep(.custom-color-3) {
  background: linear-gradient(135deg, #ffeaa7, #fdcb6e) !important;
}
</style>