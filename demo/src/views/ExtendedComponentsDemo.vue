<template>
  <div class="extended-demo">
    <div class="page-header">
      <h1>{{ page.title }}</h1>
      <p>{{ page.description }}</p>
    </div>

    <section class="demo-section">
      <div class="demo-section__heading">
        <h2>{{ text('交互示例', 'Interactive demo') }}</h2>
        <code>{{ page.name }}</code>
      </div>

      <div v-if="view === 'data-grid'" class="example-stack">
        <FluentDataGrid v-model:selected-rows="selectedRows" :data="rows" :columns="columns" selectable paginated :page-size="4" />
        <p class="status-line">{{ text('已选择', 'Selected') }} {{ selectedRows.length }} {{ text('行', 'rows') }}</p>
      </div>

      <div v-else-if="view === 'combo-box'" class="example-narrow">
        <FluentComboBox v-model="selectedTeam" :items="teams" :label="text('团队', 'Team')" :placeholder="text('请选择团队', 'Select a team')" />
        <p class="status-line">{{ text('当前选择', 'Selection') }}: {{ selectedTeam || text('无', 'None') }}</p>
      </div>

      <div v-else-if="view === 'calendar-date-picker'" class="example-narrow">
        <FluentCalendarDatePicker v-model="selectedDate" :label="text('日期', 'Date')" />
        <p class="status-line">{{ text('当前日期', 'Date') }}: {{ selectedDate || text('无', 'None') }}</p>
      </div>

      <div v-else-if="view === 'content-dialog'" class="example-narrow">
        <FluentButton variant="primary" @click="dialogOpen = true">{{ text('打开内容对话框', 'Open dialog') }}</FluentButton>
        <FluentContentDialog v-model="dialogOpen" :title="text('确认操作', 'Confirm action')" :primary-button-text="text('确认', 'Confirm')" :secondary-button-text="text('取消', 'Cancel')">
          {{ text('这是 default slot，可以放置说明、表单或其他 Vue 组件。', 'The default slot can contain copy, forms, or other Vue components.') }}
        </FluentContentDialog>
      </div>

      <div v-else-if="view === 'drawer'" class="example-narrow">
        <FluentButton variant="primary" @click="drawerOpen = true">{{ text('打开侧边抽屉', 'Open drawer') }}</FluentButton>
        <FluentDrawer v-model="drawerOpen" :title="text('设置详情', 'Settings')">
          {{ text('这是抽屉的 default slot，适合承载筛选、设置和辅助信息。', 'The default slot is suitable for filters, settings, and supporting information.') }}
        </FluentDrawer>
      </div>

      <div v-else class="example-stack">
        <FluentRichEditBox v-model="richContent" :label="text('内容编辑器', 'Content editor')" :placeholder="text('输入内容', 'Enter content')" />
        <p class="status-line">{{ text('HTML 内容长度', 'HTML length') }}: {{ richContent.length }}</p>
      </div>
    </section>

    <section class="demo-section source-section">
      <div class="demo-section__heading">
        <h2>{{ text('源代码', 'Source') }}</h2>
        <button type="button" class="copy-button" @click="copySource">{{ text('复制', 'Copy') }}</button>
      </div>
      <pre><code>{{ page.code }}</code></pre>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  FluentButton,
  FluentCalendarDatePicker,
  FluentComboBox,
  FluentContentDialog,
  FluentDataGrid,
  FluentDrawer,
  FluentRichEditBox
} from 'vue-fluent-widgets'
import { useDemoLocale } from '../composables/useDemoLocale.js'

const route = useRoute()
const { language, text } = useDemoLocale()
const view = computed(() => route.path.slice(1))
const selectedRows = ref([])
const selectedTeam = ref('engineering')
const selectedDate = ref('2026-08-06')
const dialogOpen = ref(false)
const drawerOpen = ref(false)
const richContent = ref('<p>可以编辑这段内容。</p>')

const rows = computed(() => language.value === 'en' ? [
  { id: 1, name: 'Ada', role: 'Engineer', status: 'Online' }, { id: 2, name: 'Lin', role: 'Designer', status: 'Online' }, { id: 3, name: 'Mori', role: 'Product manager', status: 'Away' }, { id: 4, name: 'Kai', role: 'QA engineer', status: 'Online' }
] : [
  { id: 1, name: 'Ada', role: '工程师', status: '在线' }, { id: 2, name: 'Lin', role: '设计师', status: '在线' }, { id: 3, name: 'Mori', role: '产品经理', status: '离开' }, { id: 4, name: 'Kai', role: '测试工程师', status: '在线' }
])
const columns = computed(() => language.value === 'en' ? [
  { key: 'name', label: 'Name', sortable: true }, { key: 'role', label: 'Role' }, { key: 'status', label: 'Status' }
] : [{ key: 'name', label: '姓名', sortable: true }, { key: 'role', label: '角色' }, { key: 'status', label: '状态' }])
const teams = computed(() => language.value === 'en' ? [
  { label: 'Design', value: 'design' }, { label: 'Engineering', value: 'engineering' }, { label: 'Product', value: 'product' }
] : [{ label: '设计', value: 'design' }, { label: '工程', value: 'engineering' }, { label: '产品', value: 'product' }])

const pages = {
  'data-grid': {
    name: 'FluentDataGrid', title: 'DataGrid 数据表格', description: '支持排序、选择和分页的数据表格。',
    code: '<FluentDataGrid v-model:selected-rows="selectedRows" :data="rows" :columns="columns" selectable paginated />'
  },
  'combo-box': {
    name: 'FluentComboBox', title: 'ComboBox 组合框', description: '在候选项中选择单个值，并支持自定义 item slot。',
    code: '<FluentComboBox v-model="selectedTeam" :items="teams" label="团队" />'
  },
  'calendar-date-picker': {
    name: 'FluentCalendarDatePicker', title: 'CalendarDatePicker 日历日期选择器', description: '提供月视图和日期范围约束的日期选择器。',
    code: '<FluentCalendarDatePicker v-model="selectedDate" label="日期" />'
  },
  'content-dialog': {
    name: 'FluentContentDialog', title: 'ContentDialog 内容对话框', description: '适合需要确认动作或承载复杂内容的模态对话框。',
    code: '<FluentContentDialog v-model="dialogOpen" title="确认操作">对话框内容</FluentContentDialog>'
  },
  drawer: {
    name: 'FluentDrawer', title: 'Drawer 侧边抽屉', description: '从屏幕边缘展开，用于设置、筛选和辅助信息。',
    code: '<FluentDrawer v-model="drawerOpen" title="设置详情">抽屉内容</FluentDrawer>'
  },
  'rich-edit-box': {
    name: 'FluentRichEditBox', title: 'RichEditBox 富文本编辑框', description: '带工具栏的可编辑内容区域，输出 HTML 字符串。',
    code: '<FluentRichEditBox v-model="richContent" label="内容编辑器" />'
  }
}
const englishPages = {
  'data-grid': { name: 'FluentDataGrid', title: 'DataGrid', description: 'A sortable, selectable, and paginated data grid.', code: pages['data-grid'].code },
  'combo-box': { name: 'FluentComboBox', title: 'ComboBox', description: 'Select one value and customize item rendering.', code: pages['combo-box'].code },
  'calendar-date-picker': { name: 'FluentCalendarDatePicker', title: 'CalendarDatePicker', description: 'Select dates with a month view and range limits.', code: pages['calendar-date-picker'].code },
  'content-dialog': { name: 'FluentContentDialog', title: 'ContentDialog', description: 'A modal surface for confirmation and complex content.', code: pages['content-dialog'].code },
  drawer: { name: 'FluentDrawer', title: 'Drawer', description: 'Supporting content that enters from a viewport edge.', code: pages.drawer.code },
  'rich-edit-box': { name: 'FluentRichEditBox', title: 'RichEditBox', description: 'A toolbar-driven editor that emits HTML.', code: pages['rich-edit-box'].code }
}
const page = computed(() => (language.value === 'en' ? englishPages : pages)[view.value] || pages['data-grid'])

const copySource = async () => {
  await navigator.clipboard?.writeText(page.value.code)
}
</script>

<style scoped>
.extended-demo { max-width: 1120px; }
.page-header { margin-bottom: 24px; }
.page-header h1 { margin: 0 0 8px; color: var(--text-primary); font-size: 30px; }
.page-header p { color: var(--text-secondary); }
.demo-section { margin-bottom: 18px; padding: 18px; border: 1px solid var(--border-strong); border-radius: var(--radius-md); background: var(--bg-card); }
.demo-section__heading { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
.demo-section__heading h2 { margin: 0; color: var(--text-primary); font-size: 17px; }
.demo-section__heading code { color: var(--accent); font-size: 12px; }
.example-stack { display: flex; flex-direction: column; gap: 12px; }
.example-narrow { display: flex; max-width: 420px; flex-direction: column; gap: 14px; }
.status-line { margin: 0; color: var(--text-secondary); font-size: 13px; }
.source-section pre { margin: 0; overflow-x: auto; padding: 16px; border-radius: var(--radius-sm); background: var(--bg-code); color: var(--text-code); line-height: 1.6; }
.source-section code { font: 13px/1.6 Consolas, monospace; white-space: pre-wrap; }
.copy-button { border: 0; background: transparent; color: var(--accent); cursor: pointer; font: inherit; }
</style>
