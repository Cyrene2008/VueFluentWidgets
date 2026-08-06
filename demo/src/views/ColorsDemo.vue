<template>
  <div class="colors-demo">
    <div class="page-header">
      <h1>颜色系统</h1>
      <p>Fluent 设计系统的颜色体系。</p>
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
</style>