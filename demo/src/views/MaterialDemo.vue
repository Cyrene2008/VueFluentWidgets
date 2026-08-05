<template>
  <div class="material-demo-page">
    <div class="page-header">
      <h1>材质系统</h1>
      <p>Fluent 设计系统的材质效果，包括 Solid、Acrylic、Mica 和 Liquid Glass。</p>
    </div>

    <FluentControlExample 
      header-text="材质对比" 
      :source-code="comparisonCode"
    >
      <template #example>
        <div class="material-comparison">
          <div class="material-card">
            <FluentCard material="solid" class="demo-card">
              <h3>Solid</h3>
              <p>默认不透明背景</p>
            </FluentCard>
            <span class="material-label">Solid</span>
          </div>
          
          <div class="material-card">
            <FluentCard material="acrylic" class="demo-card acrylic-bg">
              <h3>Acrylic</h3>
              <p>半透明模糊效果</p>
            </FluentCard>
            <span class="material-label">Acrylic</span>
          </div>
          
          <div class="material-card">
            <FluentCard material="mica" class="demo-card mica-bg">
              <h3>Mica</h3>
              <p>使用壁纸颜色</p>
            </FluentCard>
            <span class="material-label">Mica</span>
          </div>
          
          <div class="material-card">
            <FluentLiquidGlass variant="light" class="demo-card">
              <h3>Liquid Glass</h3>
              <p>液态玻璃效果</p>
            </FluentLiquidGlass>
            <span class="material-label">Liquid Glass</span>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="液态玻璃变体" 
      :source-code="glassCode"
    >
      <template #example>
        <div class="glass-variants">
          <div class="glass-variant-item">
            <img :src="asset('images/Cyrene01.webp')" alt="示例图片" class="glass-bg-image" />
            <FluentLiquidGlass variant="light" class="glass-overlay">
              <h3>Light</h3>
              <p>浅色液态玻璃</p>
            </FluentLiquidGlass>
          </div>
          
          <div class="glass-variant-item">
            <img :src="asset('images/Cyrene02.webp')" alt="示例图片" class="glass-bg-image" />
            <FluentLiquidGlass variant="dark" class="glass-overlay">
              <h3>Dark</h3>
              <p>深色液态玻璃</p>
            </FluentLiquidGlass>
          </div>
          
          <div class="glass-variant-item">
            <img :src="asset('images/Cyrene03.webp')" alt="示例图片" class="glass-bg-image" />
            <FluentLiquidGlass variant="colored" class="glass-overlay">
              <h3>Colored</h3>
              <p>彩色液态玻璃</p>
            </FluentLiquidGlass>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="材质卡片应用" 
      :source-code="cardCode"
    >
      <template #example>
        <div class="material-cards">
          <FluentLiquidGlass variant="light" class="settings-card">
            <FluentSettingsCard title="外观设置" description="自定义应用程序的外观" icon="paint-brush-20-regular">
              <FluentToggle v-model="darkMode" label="深色模式" />
            </FluentSettingsCard>
          </FluentLiquidGlass>
          
          <FluentLiquidGlass variant="dark" class="settings-card">
            <FluentSettingsCard title="通知设置" description="管理通知偏好" icon="alert-20-regular">
              <FluentToggle v-model="notifications" label="启用通知" />
            </FluentSettingsCard>
          </FluentLiquidGlass>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="使用方式" 
      :source-code="usageCode"
    >
      <template #example>
        <div class="usage-section">
          <h3>1. Liquid Glass 组件</h3>
          <pre><code>&lt;FluentLiquidGlass variant="light" :blur="20" :opacity="0.7"&gt;
  &lt;h3&gt;标题&lt;/h3&gt;
  &lt;p&gt;内容&lt;/p&gt;
&lt;/FluentLiquidGlass&gt;</code></pre>
          
          <h3>2. 变体选项</h3>
          <ul>
            <li><code>light</code> - 浅色液态玻璃</li>
            <li><code>dark</code> - 深色液态玻璃</li>
            <li><code>colored</code> - 彩色渐变液态玻璃</li>
            <li><code>accent</code> - 主题色液态玻璃</li>
          </ul>
          
          <h3>3. 属性</h3>
          <ul>
            <li><code>blur</code> - 模糊程度 (默认: 20)</li>
            <li><code>opacity</code> - 透明度 (默认: 0.7)</li>
            <li><code>animated</code> - 是否启用动画 (默认: true)</li>
          </ul>
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  FluentLiquidGlass, 
  FluentCard, 
  FluentSettingsCard, 
  FluentToggle, 
  FluentControlExample 
} from 'vue-fluent-widgets'

const darkMode = ref(false)
const notifications = ref(true)
const asset = path => `${import.meta.env.BASE_URL}${path}`

const comparisonCode = `<FluentCard material="solid">Solid</FluentCard>
<FluentCard material="acrylic">Acrylic</FluentCard>
<FluentCard material="mica">Mica</FluentCard>
<FluentLiquidGlass variant="light">Liquid Glass</FluentLiquidGlass>`

const glassCode = `<FluentLiquidGlass variant="light">
  <h3>Light</h3>
</FluentLiquidGlass>

<FluentLiquidGlass variant="dark">
  <h3>Dark</h3>
</FluentLiquidGlass>

<FluentLiquidGlass variant="colored">
  <h3>Colored</h3>
</FluentLiquidGlass>`

const cardCode = `<FluentLiquidGlass variant="light">
  <FluentSettingsCard title="设置" description="描述">
    <FluentToggle v-model="value" label="选项" />
  </FluentSettingsCard>
</FluentLiquidGlass>`

const usageCode = `// 基础用法
<FluentLiquidGlass variant="light">
  内容
</FluentLiquidGlass>

// 自定义参数
<FluentLiquidGlass variant="dark" :blur="30" :opacity="0.8">
  内容
</FluentLiquidGlass>`
</script>

<style scoped>
.material-demo-page {
  max-width: 1000px;
}

.page-header {
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
}

.page-header p {
  color: var(--text-secondary);
}

.material-comparison {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  width: 100%;
  padding: 28px;
  border-radius: var(--radius-lg);
  background:
    radial-gradient(circle at 16% 20%, rgba(234, 94, 193, .2), transparent 30%),
    radial-gradient(circle at 84% 76%, rgba(76, 194, 255, .2), transparent 32%),
    linear-gradient(135deg, #f6d9eb, #dcefff);
}

.material-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.demo-card {
  width: 100%;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
}

.demo-card h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
}

.demo-card p {
  margin: 0;
  color: var(--text-secondary);
}

.acrylic-bg {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
}

.mica-bg {
  background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
}

.material-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.glass-variants {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.glass-variant-item {
  position: relative;
  height: 200px;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.glass-bg-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.glass-overlay {
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  padding: 16px;
}

.glass-overlay h3 {
  margin: 0 0 4px 0;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.glass-overlay p {
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.material-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.settings-card {
  padding: 0;
}

.usage-section h3 {
  margin: 24px 0 12px 0;
  font-size: 16px;
}

.usage-section pre {
  background: #f5f5f5;
  padding: 16px;
  border-radius: var(--radius-md);
  overflow-x: auto;
}

.usage-section code {
  font-family: 'Consolas', monospace;
  font-size: 14px;
}

.usage-section ul {
  padding-left: 24px;
  margin: 8px 0;
}

.usage-section li {
  margin: 4px 0;
  line-height: 1.6;
}
</style>
