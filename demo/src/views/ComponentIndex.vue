<template>
  <div class="docs-page component-index">
    <div class="page-header">
      <h1>{{ text('组件索引', 'Component index') }}</h1>
      <p>{{ text('公共导出中的每一个组件都列在这里。已有专属交互页的组件会直接进入示例，其余组件可以在 Playground 中试用。', 'Every documented public component is listed here. Open a dedicated demo when available, or edit the generated template in Playground.') }}</p>
    </div>

    <div class="component-toolbar">
      <input v-model="query" type="search" :placeholder="text('搜索组件名称', 'Search components')" :aria-label="text('搜索组件名称', 'Search components')" />
      <span>{{ filteredComponents.length }} / {{ componentCatalog.length }}</span>
    </div>

    <div class="component-groups">
      <section v-for="group in groups" :key="group.name" class="component-group">
        <h2>{{ categoryLabel(group.name) }}</h2>
        <div class="component-grid">
          <article v-for="component in group.items" :key="component.name" class="component-item">
            <router-link :to="component.docsRoute" class="component-item__main">
              <FluentIcon :icon="iconFor(component)" :width="18" />
              <span class="component-item__name">
                <strong>{{ component.name }}</strong>
                <small v-if="language === 'zh'">{{ component.chineseName }}</small>
              </span>
            </router-link>
            <div class="component-item__meta">
              <span v-if="component.api.slots.length">slots: {{ component.api.slots.map(slot => slot.name).join(', ') }}</span>
              <router-link :to="component.hasDemo ? component.route : '/playground?component=' + component.name">{{ component.hasDemo ? text('交互示例', 'Demo') : 'Playground' }}</router-link>
            </div>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { FluentIcon } from 'vue-fluent-widgets'
import { componentCatalog } from '../data/componentCatalog'
import { useDemoLocale } from '../composables/useDemoLocale.js'

const { language, text } = useDemoLocale()
const query = ref('')
const filteredComponents = computed(() => {
  const value = query.value.trim().toLowerCase()
  return value ? componentCatalog.filter(item => item.name.toLowerCase().includes(value)) : componentCatalog
})
const groups = computed(() => [...new Set(filteredComponents.value.map(item => item.category))].map(name => ({
  name,
  items: filteredComponents.value.filter(item => item.category === name)
})))
const iconFor = item => ({
  '基础输入': 'options-20-regular',
  '布局与内容': 'layout-column-two-20-regular',
  '反馈与状态': 'info-20-regular',
  导航: 'navigation-20-regular',
  集合与数据: 'apps-list-20-regular',
  媒体与系统: 'window-20-regular'
}[item.category] || 'code-20-regular')
const categoryLabel = name => ({
  基础输入: 'Basic input', '布局与内容': 'Layout and content', '反馈与状态': 'Feedback and status', 导航: 'Navigation', '集合与数据': 'Collections and data', '媒体与系统': 'Media and system', 其他: 'Other'
}[name] && language.value === 'en' ? ({
  基础输入: 'Basic input', '布局与内容': 'Layout and content', '反馈与状态': 'Feedback and status', 导航: 'Navigation', '集合与数据': 'Collections and data', '媒体与系统': 'Media and system', 其他: 'Other'
}[name]) : name)
</script>

<style scoped>
.docs-page { max-width: 1100px; }
.page-header { margin-bottom: 24px; }
.page-header h1 { margin: 0 0 8px; color: var(--text-primary); font-size: 30px; }
.page-header p { max-width: 760px; color: var(--text-secondary); line-height: 1.7; }
.component-toolbar { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
.component-toolbar input { flex: 1; min-width: 0; height: 38px; padding: 0 12px; border: 1px solid var(--border-strong); border-radius: var(--radius-md); background: var(--bg-card-solid); color: var(--text-primary); font: inherit; }
.component-toolbar span { color: var(--text-muted); font-size: 13px; white-space: nowrap; }
.component-group { margin-bottom: 28px; }
.component-group h2 { margin: 0 0 12px; color: var(--text-primary); font-size: 18px; }
.component-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.component-item { display: flex; min-height: 64px; flex-direction: column; justify-content: center; gap: 5px; padding: 12px; border: 1px solid var(--border-strong); border-radius: var(--radius-md); background: var(--bg-card); color: var(--text-primary); text-decoration: none; }
.component-item:hover { border-color: var(--accent); background: var(--bg-hover); }
.component-item__main { display: flex; align-items: center; gap: 8px; min-width: 0; color: var(--text-primary); text-decoration: none; }
.component-item__name { display: flex; min-width: 0; flex-direction: column; gap: 2px; }
.component-item__name strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.component-item__name small, .component-item__meta { color: var(--text-muted); font-size: 12px; }
.component-item__meta { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding-left: 26px; }
.component-item__meta a { color: var(--accent); text-decoration: none; white-space: nowrap; }
@media (max-width: 760px) { .component-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 480px) { .component-grid { grid-template-columns: 1fr; } .component-toolbar { align-items: stretch; flex-direction: column; } }
</style>
