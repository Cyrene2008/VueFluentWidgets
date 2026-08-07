<template>
  <div class="colors-demo">
    <div class="page-header">
      <h1>颜色系统</h1>
      <p>Fluent 设计系统的颜色体系，包含主题色、中性色和内置预设主题。</p>
    </div>

    <FluentControlExample
      header-text="主题色"
      :source-code="themeColorsCode"
    >
      <template #example>
        <div class="color-grid">
          <div class="color-item" v-for="color in themeColors" :key="color.name">
            <div class="color-swatch" :style="{ background: color.value }"></div>
            <div class="color-info">
              <div class="color-name">{{ color.name }}</div>
              <div class="color-value">{{ color.value }}</div>
            </div>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample
      header-text="中性色"
      :source-code="neutralColorsCode"
    >
      <template #example>
        <div class="color-grid">
          <div class="color-item" v-for="color in neutralColors" :key="color.name">
            <div class="color-swatch" :style="{ background: color.value }"></div>
            <div class="color-info">
              <div class="color-name">{{ color.name }}</div>
              <div class="color-value">{{ color.value }}</div>
            </div>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample
      header-text="状态色"
      :source-code="statusColorsCode"
    >
      <template #example>
        <div class="color-grid">
          <div class="color-item" v-for="color in statusColors" :key="color.name">
            <div class="color-swatch" :style="{ background: color.value }"></div>
            <div class="color-info">
              <div class="color-name">{{ color.name }}</div>
              <div class="color-value">{{ color.value }}</div>
            </div>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample
      header-text="内置预设主题"
      :source-code="presetThemesCode"
    >
      <template #example>
        <div class="preset-themes">
          <div class="preset-card" v-for="theme in presetThemes" :key="theme.name">
            <div class="preset-header">
              <div class="preset-swatches">
                <div class="preset-swatch" :style="{ background: theme.accent }"></div>
                <div class="preset-swatch" :style="{ background: theme.bg }"></div>
                <div class="preset-swatch" :style="{ background: theme.text }"></div>
              </div>
              <div class="preset-name">{{ theme.name }}</div>
            </div>
            <p class="preset-desc">{{ theme.description }}</p>
            <div class="preset-details">
              <span><strong>Accent:</strong> {{ theme.accent }}</span>
              <span><strong>Class:</strong> <code>{{ theme.className }}</code></span>
            </div>
            <pre class="preset-code"><code>{{ theme.usage }}</code></pre>
          </div>
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { FluentControlExample } from 'vue-fluent-widgets'

const themeColors = [
  { name: 'Accent', value: '#0078d4' },
  { name: 'Accent Dark', value: '#006cbd' },
  { name: 'Accent Light', value: '#429ce3' }
]

const neutralColors = [
  { name: 'Black', value: '#000000' },
  { name: 'Gray 190', value: '#1a1a1a' },
  { name: 'Gray 160', value: '#333333' },
  { name: 'Gray 130', value: '#4d4d4d' },
  { name: 'Gray 90', value: '#7a7a7a' },
  { name: 'Gray 60', value: '#999999' },
  { name: 'Gray 40', value: '#b3b3b3' },
  { name: 'Gray 30', value: '#cccccc' },
  { name: 'Gray 20', value: '#e6e6e6' },
  { name: 'Gray 10', value: '#f3f3f3' },
  { name: 'White', value: '#ffffff' }
]

const statusColors = [
  { name: 'Success', value: '#0f7b0f' },
  { name: 'Warning', value: '#9d5d00' },
  { name: 'Error', value: '#c42b1c' },
  { name: 'Info', value: '#0078d4' }
]

const presetThemes = [
  {
    name: 'Fluent Blue (默认)',
    accent: '#0078d4',
    bg: '#f3f3f3',
    text: '#1b1b1b',
    className: '(默认，无需额外类)',
    description: '组件库默认主题，使用 Fluent Design 标准蓝色和中性灰色背景。',
    usage: `<!-- 默认主题，开箱即用 -->\n<FluentButton variant="primary">按钮</FluentButton>`
  },
  {
    name: 'Peach Pink 蜜桃粉',
    accent: '#ea5ec1',
    bg: '#fdf5fa',
    text: '#3d1a2e',
    className: '.peach / .theme-peach',
    description: '蜜桃粉主题，粉色调 accent 和暖色中性背景。需要在根元素添加 .peach 类。',
    usage: `<!-- 方式一：在 HTML 根元素添加类 -->\n<html class="peach">\n\n<!-- 方式二：通过 FluentTheme -->\n<FluentTheme class="peach">\n  <App />\n</FluentTheme>`
  },
  {
    name: 'Custom Accent 自定义色',
    accent: '#6b69d6',
    bg: '#f3f3f3',
    text: '#1b1b1b',
    className: '自定义 --fluent-accent',
    description: '通过 CSS 变量覆盖 accent 色，中性背景保持默认灰色。',
    usage: `:root {\n  --fluent-accent: #6b69d6;\n}`
  }
]

const themeColorsCode = `const themeColors = [
  { name: 'Accent', value: '#0078d4' },
  { name: 'Accent Dark', value: '#006cbd' },
  { name: 'Accent Light', value: '#429ce3' }
]`

const neutralColorsCode = `const neutralColors = [
  { name: 'Black', value: '#000000' },
  { name: 'Gray 190', value: '#1a1a1a' },
  // ... 更多中性色
]`

const statusColorsCode = `const statusColors = [
  { name: 'Success', value: '#0f7b0f' },
  { name: 'Warning', value: '#9d5d00' },
  { name: 'Error', value: '#c42b1c' },
  { name: 'Info', value: '#0078d4' }
]`

const presetThemesCode = `<!-- 使用内置预设主题 -->

<!-- Fluent Blue（默认，无需额外类） -->
<FluentButton variant="primary">按钮</FluentButton>

<!-- Peach Pink 蜜桃粉 -->
<html class="peach">
  <FluentButton variant="primary">按钮</FluentButton>
</html>

<!-- 自定义 Accent -->
<style>
:root { --fluent-accent: #6b69d6; }
</style>`
</script>

<style scoped>
.colors-demo {
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

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 16px;
}

.color-item {
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-2);
}

.color-swatch {
  height: 60px;
  width: 100%;
}

.color-info {
  padding: 12px;
  background: var(--bg-card);
}

.color-name {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  color: var(--text-primary);
}

.color-value {
  font-size: 12px;
  color: var(--text-secondary);
  font-family: monospace;
}

.preset-themes {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.preset-card {
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  padding: 20px;
  background: var(--bg-card);
}

.preset-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 10px;
}

.preset-swatches {
  display: flex;
  gap: 4px;
}

.preset-swatch {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid var(--border-strong);
}

.preset-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
}

.preset-desc {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 12px;
  line-height: 1.5;
}

.preset-details {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.preset-details code {
  background: var(--bg-code);
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 12px;
}

.preset-code {
  background: var(--bg-code);
  color: var(--text-code);
  border-radius: var(--radius-md);
  padding: 14px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.5;
}
</style>
