<template>
  <div class="component-detail">
    <div class="page-header">
      <div class="eyebrow">{{ text('组件文档', 'Component docs') }}</div>
      <h1>{{ component?.name || text('组件', 'Component') }} <small v-if="component?.chineseName && language === 'zh'">{{ component.chineseName }}</small></h1>
      <p>{{ text('查看完整 API 契约和全部 Props 示例，再打开交互示例或 Playground 尝试组合。', 'Review the complete API and all-props example, then open the interactive demo or Playground.') }}</p>
    </div>

    <section class="api-section">
      <h2>{{ text('完整 Props 示例', 'All-props example') }}</h2>
      <pre><code>{{ component?.api.example }}</code></pre>
    </section>

    <div class="api-columns">
      <section v-if="component?.api.slots.length" class="api-section">
        <h2>Slots</h2>
        <div class="api-table-wrap"><table class="api-table"><thead><tr><th>{{ text('名称', 'Name') }}</th><th>{{ text('作用域参数', 'Scope props') }}</th></tr></thead><tbody>
          <tr v-for="slot in component.api.slots" :key="slot.name"><td><code>{{ slot.name }}</code></td><td>{{ slot.props?.join(', ') || text('无', 'None') }}</td></tr>
        </tbody></table></div>
      </section>
      <section class="api-section api-section--props">
        <h2>Props</h2>
        <div v-if="component?.api.props.length" class="api-table-wrap"><table class="api-table api-table--props"><thead><tr><th>{{ text('名称', 'Name') }}</th><th>{{ text('类型', 'Type') }}</th><th>{{ text('必填', 'Required') }}</th><th>{{ text('默认值', 'Default') }}</th><th>{{ text('示例值', 'Example') }}</th></tr></thead><tbody>
          <tr v-for="prop in component.api.props" :key="prop.name">
            <td><code>{{ prop.name }}</code></td>
            <td>{{ prop.types?.join(' | ') || 'unknown' }}</td>
            <td>{{ prop.required ? text('是', 'Yes') : text('否', 'No') }}</td>
            <td><code>{{ prop.default ?? text('未设置', 'Not set') }}</code></td>
            <td><code>{{ displaySample(prop.sample) }}</code><small v-if="prop.values?.length" class="allowed-values">{{ text('可选', 'Values') }}：{{ prop.values.join(', ') }}</small></td>
          </tr>
        </tbody></table></div>
        <p v-else class="muted">{{ text('该组件没有声明 Props。', 'This component declares no props.') }}</p>
      </section>
      <section class="api-section">
        <h2>Events</h2>
        <ul v-if="component?.api.events.length"><li v-for="event in component.api.events" :key="event"><code>{{ event }}</code></li></ul>
        <p v-else class="muted">{{ text('该组件没有声明事件。', 'This component declares no events.') }}</p>
        <template v-if="component?.api.exposed?.length">
          <h2 class="subheading">Expose</h2>
          <ul><li v-for="method in component.api.exposed" :key="method"><code>{{ method }}()</code></li></ul>
        </template>
      </section>
    </div>

    <div class="detail-actions">
      <router-link v-if="component?.hasDemo" class="detail-link detail-link--primary" :to="component.route">{{ text('打开交互示例', 'Open demo') }}</router-link>
      <router-link class="detail-link" :to="`/playground?component=${component?.name}`">{{ text('在 Playground 编辑', 'Edit in Playground') }}</router-link>
      <router-link class="detail-link" to="/docs/components">{{ text('返回组件索引', 'Back to index') }}</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { componentCatalog } from '../data/componentCatalog'
import { useDemoLocale } from '../composables/useDemoLocale.js'

const { language, text } = useDemoLocale()
const route = useRoute()
const component = computed(() => componentCatalog.find(item => item.name === route.params.name))
const displaySample = sample => {
  if (sample && typeof sample === 'object' && sample.expression) return sample.expression
  if (typeof sample === 'string') return sample
  return JSON.stringify(sample)
}
</script>

<style scoped>
.component-detail { max-width: 1000px; }
.page-header { margin-bottom: 28px; }
.eyebrow { margin-bottom: 8px; color: var(--accent); font-size: 12px; font-weight: 600; }
.page-header h1 { margin: 0 0 8px; color: var(--text-primary); font-size: 30px; }
.page-header h1 small { color: var(--text-secondary); font-size: 18px; font-weight: 500; }
.page-header p, .muted { color: var(--text-secondary); }
.api-columns { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.api-section { min-width: 0; margin-bottom: 20px; padding: 16px; overflow: hidden; border: 1px solid var(--border-strong); border-radius: var(--radius-md); background: var(--bg-card); }
.api-section--props { grid-column: 1 / -1; order: -1; }
.api-section h2 { margin: 0 0 12px; color: var(--text-primary); font-size: 16px; }
.api-section pre { margin: 0; padding: 16px; overflow-x: auto; border-radius: var(--radius-sm); background: var(--bg-code); color: var(--text-code); line-height: 1.6; }
.api-section code { font-family: Consolas, monospace; font-size: 13px; }
.api-section ul { display: flex; flex-direction: column; gap: 8px; margin: 0; padding-left: 18px; color: var(--text-secondary); }
.api-table-wrap { width: 100%; overflow-x: auto; }
.api-table { width: 100%; border-collapse: collapse; color: var(--text-secondary); font-size: 12px; }
.api-table--props { table-layout: fixed; }
.api-table th, .api-table td { padding: 8px 6px; border-bottom: 1px solid var(--border-subtle); text-align: left; vertical-align: top; }
.api-table th { color: var(--text-primary); font-weight: 600; white-space: nowrap; }
.api-table code { font-family: Consolas, monospace; overflow-wrap: anywhere; white-space: normal; }
.api-table--props th:nth-child(1) { width: 18%; }
.api-table--props th:nth-child(2) { width: 18%; }
.api-table--props th:nth-child(3) { width: 10%; }
.api-table--props th:nth-child(4) { width: 24%; }
.api-table--props th:nth-child(5) { width: 30%; }
.allowed-values { display: block; margin-top: 3px; color: var(--accent); font-size: 11px; }
.subheading { margin-top: 20px !important; }
.detail-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 12px; }
.detail-link { display: inline-flex; align-items: center; min-height: 38px; padding: 0 14px; border: 1px solid var(--border-strong); border-radius: var(--radius-md); color: var(--text-primary); text-decoration: none; }
.detail-link--primary { border-color: var(--accent); background: var(--accent); color: var(--text-on-accent); }
@media (max-width: 720px) { .api-columns { grid-template-columns: 1fr; } }
</style>
