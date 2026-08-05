<template>
  <div class="typography-demo">
    <div class="page-header">
      <h1>字体排版</h1>
      <p>Fluent 设计系统的字体排版体系。</p>
    </div>

    <FluentControlExample 
      header-text="标题样式" 
      :source-code="headingsCode"
    >
      <template #example>
        <div class="typography-example">
          <h1>标题 1</h1>
          <h2>标题 2</h2>
          <h3>标题 3</h3>
          <h4>标题 4</h4>
          <h5>标题 5</h5>
          <h6>标题 6</h6>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="正文样式" 
      :source-code="bodyCode"
    >
      <template #example>
        <div class="typography-example">
          <p class="body-large">大号正文文本，用于重要段落。</p>
          <p class="body">标准正文文本，用于主要内容。</p>
          <p class="body-small">小号正文文本，用于辅助信息。</p>
          <p class="caption">说明文字，用于注释和说明。</p>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="字体权重" 
      :source-code="weightsCode"
    >
      <template #example>
        <div class="typography-example">
          <p class="weight-light">轻量字体 (Light)</p>
          <p class="weight-regular">常规字体 (Regular)</p>
          <p class="weight-semibold">半粗字体 (Semibold)</p>
          <p class="weight-bold">粗体字体 (Bold)</p>
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { FluentControlExample } from 'vue-fluent-widgets'

const headingsCode = `<h1>标题 1</h1>
<h2>标题 2</h2>
<h3>标题 3</h3>
<h4>标题 4</h4>
<h5>标题 5</h5>
<h6>标题 6</h6>`

const bodyCode = `<p class="body-large">大号正文文本</p>
<p class="body">标准正文文本</p>
<p class="body-small">小号正文文本</p>
<p class="caption">说明文字</p>`

const weightsCode = `<p class="weight-light">轻量字体 (Light)</p>
<p class="weight-regular">常规字体 (Regular)</p>
<p class="weight-semibold">半粗字体 (Semibold)</p>
<p class="weight-bold">粗体字体 (Bold)</p>`
</script>

<style scoped>
.typography-demo {
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

.typography-example {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.typography-example h1 {
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
}

.typography-example h2 {
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
}

.typography-example h3 {
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
}

.typography-example h4 {
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
}

.typography-example h5 {
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
}

.typography-example h6 {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
}

.body-large {
  font-size: 18px;
  line-height: 24px;
}

.body {
  font-size: 14px;
  line-height: 20px;
}

.body-small {
  font-size: 12px;
  line-height: 16px;
}

.caption {
  font-size: 12px;
  line-height: 16px;
  color: var(--text-secondary);
}

.weight-light {
  font-weight: 300;
}

.weight-regular {
  font-weight: 400;
}

.weight-semibold {
  font-weight: 600;
}

.weight-bold {
  font-weight: 700;
}
</style>