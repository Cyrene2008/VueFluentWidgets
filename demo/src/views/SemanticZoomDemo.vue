<template>
  <div class="semantic-zoom-demo">
    <div class="page-header">
      <h1>SemanticZoom 语义缩放</h1>
      <p>Fluent 语义缩放组件，用于在两种不同的视图之间切换。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentSemanticZoom v-model="isZoomedIn" style="height: 300px;">
            <template #zoomed-in>
              <div class="zoomed-in-content">
                <h3>放大视图</h3>
                <p>这是详细视图，显示完整的内容。</p>
                <div class="item-grid">
                  <div v-for="n in 12" :key="n" class="grid-item">
                    项目 {{ n }}
                  </div>
                </div>
              </div>
            </template>
            <template #zoomed-out>
              <div class="zoomed-out-content">
                <h3>缩小视图</h3>
                <p>这是概览视图，显示缩略内容。</p>
                <div class="thumbnail-grid">
                  <div v-for="n in 12" :key="n" class="thumbnail-item">
                    {{ n }}
                  </div>
                </div>
              </div>
            </template>
          </FluentSemanticZoom>
          <div class="demo-info">
            <p>当前状态: {{ isZoomedIn ? '放大视图' : '缩小视图' }}</p>
            <FluentButton @click="isZoomedIn = !isZoomedIn" size="sm">
              {{ isZoomedIn ? '切换到缩小视图' : '切换到放大视图' }}
            </FluentButton>
          </div>
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentSemanticZoom, FluentButton, FluentControlExample } from 'vue-fluent-widgets'

const isZoomedIn = ref(true)

const basicCode = `<FluentSemanticZoom v-model="isZoomedIn">
  <template #zoomed-in>
    <div class="zoomed-in-content">
      <h3>放大视图</h3>
      <p>详细内容...</p>
    </div>
  </template>
  <template #zoomed-out>
    <div class="zoomed-out-content">
      <h3>缩小视图</h3>
      <p>概览内容...</p>
    </div>
  </template>
</FluentSemanticZoom>

const isZoomedIn = ref(true)`
</script>

<style scoped>
.semantic-zoom-demo {
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

.zoomed-in-content,
.zoomed-out-content {
  padding: 24px;
  text-align: center;
}

.zoomed-in-content h3,
.zoomed-out-content h3 {
  margin-bottom: 12px;
  color: var(--text-primary);
}

.zoomed-in-content p,
.zoomed-out-content p {
  color: var(--text-secondary);
  margin-bottom: 16px;
}

.item-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.grid-item {
  padding: 16px;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-strong);
  text-align: center;
}

.thumbnail-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.thumbnail-item {
  padding: 12px;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-strong);
  text-align: center;
  font-size: 12px;
}

.demo-info {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-strong);
}

.demo-info p {
  margin: 0;
  font-size: 14px;
  color: var(--text-secondary);
  flex: 1;
}
</style>