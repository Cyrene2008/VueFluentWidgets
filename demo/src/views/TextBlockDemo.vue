<template>
  <div class="text-block-demo">
    <div class="page-header">
      <h1>TextBlock 文本块</h1>
      <p>Fluent 文本块组件，用于显示文本内容。</p>
    </div>

    <FluentControlExample 
      header-text="文本尺寸" 
      :source-code="sizesCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentTextBlock text="Caption 文本" size="caption" />
          <FluentTextBlock text="Body 文本" size="body" />
          <FluentTextBlock text="Body Large 文本" size="body-large" />
          <FluentTextBlock text="Subtitle 文本" size="subtitle" />
          <FluentTextBlock text="Title 文本" size="title" />
          <FluentTextBlock text="Title Large 文本" size="title-large" />
          <FluentTextBlock text="Display 文本" size="display" />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="字重" 
      :source-code="weightsCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentTextBlock text="Light 字重" weight="light" size="body-large" />
          <FluentTextBlock text="Regular 字重" weight="regular" size="body-large" />
          <FluentTextBlock text="Semibold 字重" weight="semibold" size="body-large" />
          <FluentTextBlock text="Bold 字重" weight="bold" size="body-large" />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="颜色" 
      :source-code="colorsCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentTextBlock text="默认颜色" size="body-large" />
          <FluentTextBlock text="自定义颜色" size="body-large" color="#0078d4" />
          <FluentTextBlock text="错误颜色" size="body-large" color="#c42b1c" />
          <FluentTextBlock text="成功颜色" size="body-large" color="#0f7b0f" />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="文本换行" 
      :source-code="wrapCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentTextBlock 
            text="这是一段很长的文本，用于演示文本换行功能。当文本内容超出容器宽度时，文本会自动换行显示。" 
            size="body" 
            wrap 
          />
          <FluentTextBlock 
            text="这是一段很长的文本，用于演示最大行数限制。当文本内容超出指定行数时，文本会被截断并显示省略号。" 
            size="body" 
            wrap 
            :max-lines="2"
          />
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { FluentTextBlock, FluentControlExample } from 'vue-fluent-widgets'

const sizesCode = `<FluentTextBlock text="Caption 文本" size="caption" />
<FluentTextBlock text="Body 文本" size="body" />
<FluentTextBlock text="Body Large 文本" size="body-large" />
<FluentTextBlock text="Subtitle 文本" size="subtitle" />
<FluentTextBlock text="Title 文本" size="title" />
<FluentTextBlock text="Title Large 文本" size="title-large" />
<FluentTextBlock text="Display 文本" size="display" />`

const weightsCode = `<FluentTextBlock text="Light 字重" weight="light" size="body-large" />
<FluentTextBlock text="Regular 字重" weight="regular" size="body-large" />
<FluentTextBlock text="Semibold 字重" weight="semibold" size="body-large" />
<FluentTextBlock text="Bold 字重" weight="bold" size="body-large" />`

const colorsCode = `<FluentTextBlock text="默认颜色" size="body-large" />
<FluentTextBlock text="自定义颜色" size="body-large" color="#0078d4" />
<FluentTextBlock text="错误颜色" size="body-large" color="#c42b1c" />
<FluentTextBlock text="成功颜色" size="body-large" color="#0f7b0f" />`

const wrapCode = `<FluentTextBlock 
  text="这是一段很长的文本，用于演示文本换行功能。" 
  size="body" 
  wrap 
/>
<FluentTextBlock 
  text="这是一段很长的文本，用于演示最大行数限制。" 
  size="body" 
  wrap 
  :max-lines="2"
/>`
</script>

<style scoped>
.text-block-demo {
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
}
</style>