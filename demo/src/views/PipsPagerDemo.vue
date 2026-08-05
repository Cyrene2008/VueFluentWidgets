<template>
  <div class="pips-pager-demo">
    <div class="page-header">
      <h1>PipsPager 分页指示器</h1>
      <p>Fluent 分页指示器组件，用于显示当前页面位置。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentPipsPager v-model="currentPage" :total-pages="totalPages" />
          <div class="demo-info">
            <p>当前页: {{ currentPage + 1 }} / {{ totalPages }}</p>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="垂直方向" 
      :source-code="verticalCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentPipsPager v-model="verticalPage" :total-pages="5" vertical />
          <div class="demo-info">
            <p>当前页: {{ verticalPage + 1 }} / 5</p>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="隐藏导航按钮" 
      :source-code="noNavCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentPipsPager v-model="noNavPage" :total-pages="8" :show-navigation="false" />
          <div class="demo-info">
            <p>当前页: {{ noNavPage + 1 }} / 8</p>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="禁用状态" 
      :source-code="disabledCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentPipsPager v-model="disabledPage" :total-pages="5" disabled />
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentPipsPager, FluentControlExample } from 'vue-fluent-widgets'

const currentPage = ref(2)
const totalPages = 10
const verticalPage = ref(1)
const noNavPage = ref(3)
const disabledPage = ref(2)

const basicCode = `<FluentPipsPager v-model="currentPage" :total-pages="totalPages" />

const currentPage = ref(2)
const totalPages = 10`

const verticalCode = `<FluentPipsPager v-model="page" :total-pages="5" vertical />`

const noNavCode = `<FluentPipsPager v-model="page" :total-pages="8" :show-navigation="false" />`

const disabledCode = `<FluentPipsPager v-model="page" :total-pages="5" disabled />`
</script>

<style scoped>
.pips-pager-demo {
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