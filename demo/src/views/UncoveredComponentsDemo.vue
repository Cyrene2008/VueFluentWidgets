<template>
  <div class="uncovered-demo">
    <div class="page-header">
      <h1>{{ page.title }}</h1>
      <p>{{ page.description }}</p>
    </div>

    <template v-if="group === 'control-primitives'">
      <FluentControlExample header-text="TextBox 文本框" :source-code="codes.textBox">
        <template #example>
          <div class="narrow-stack">
            <FluentTextBox v-model="textValue" label="项目名称" prefix="ID" suffix=".vue" clearable :max-length="32" description="支持前后缀、清除和校验状态。" />
            <span class="status-line">{{ text('当前值', 'Value') }}: {{ textValue || text('空', 'Empty') }}</span>
          </div>
        </template>
      </FluentControlExample>

      <FluentControlExample header-text="ToggleSwitch 与 ToggleButton" :source-code="codes.toggles">
        <template #example>
          <div class="inline-controls">
            <FluentToggleSwitch v-model="notifications" label="通知" />
            <FluentToggleButton v-model="pinned" icon="pin-20-regular" label="固定" />
            <span class="status-line">{{ text('通知', 'Notifications') }} {{ notifications ? text('已开启', 'on') : text('已关闭', 'off') }}, {{ text('固定', 'pin') }} {{ pinned ? text('已开启', 'on') : text('已关闭', 'off') }}</span>
          </div>
        </template>
      </FluentControlExample>

      <FluentControlExample header-text="Segmented 分段选择器" :source-code="codes.segmented">
        <template #example>
          <div class="narrow-stack">
            <FluentSegmented v-model="density" :items="densityOptions" />
            <span class="status-line">{{ text('当前密度', 'Density') }}: {{ density }}</span>
          </div>
        </template>
      </FluentControlExample>
    </template>

    <template v-else-if="group === 'interaction-patterns'">
      <FluentControlExample header-text="ItemsView 项目视图" :source-code="codes.itemsView">
        <template #example>
          <div class="wide-stack">
            <FluentItemsView v-model:selected-items="selectedItems" :items="items" layout="grid" :columns="3" selection-mode="multiple" item-invoked-enabled @invoke="lastAction = `打开 ${$event.item.title}`">
              <template #default="{ item }"><div class="item-tile"><strong>{{ item.title }}</strong><span>{{ item.detail }}</span></div></template>
            </FluentItemsView>
            <span class="status-line">{{ text('已选择', 'Selected') }} {{ selectedItems.length }} {{ text('项', 'items') }}; {{ lastAction }}</span>
          </div>
        </template>
      </FluentControlExample>

      <FluentControlExample header-text="TabView 标签视图" :source-code="codes.tabView">
        <template #example>
          <FluentTabView v-model="activeTab" :tabs="tabs" closable @close="closeTab">
            <template #default="{ activeIndex }"><div class="tab-panel">{{ tabs[activeIndex]?.content || '标签已关闭' }}</div></template>
          </FluentTabView>
        </template>
      </FluentControlExample>

      <FluentControlExample header-text="Popup 弹出层" :source-code="codes.popup">
        <template #example>
          <div class="narrow-stack">
            <FluentButton id="popup-anchor" @click="popupOpen = true">打开 Popup</FluentButton>
            <FluentPopup v-model="popupOpen" target="#popup-anchor" placement="bottom"><div class="popup-content">与触发按钮对齐的弹出内容。</div></FluentPopup>
          </div>
        </template>
      </FluentControlExample>

      <FluentControlExample header-text="PullToRefresh 与 SwipeControl" :source-code="codes.touch">
        <template #example>
          <div class="touch-grid">
            <FluentPullToRefresh :threshold="60" @refresh="refreshItems">
              <div class="touch-list"><strong>下拉刷新</strong><span v-for="item in refreshList" :key="item">{{ item }}</span></div>
            </FluentPullToRefresh>
            <FluentSwipeControl :left-actions="leftActions" :right-actions="rightActions" :threshold="72" @action="lastAction = `执行 ${$event.label}`">
              <div class="swipe-row"><strong>触屏左右滑动</strong><span>{{ lastAction }}</span></div>
            </FluentSwipeControl>
          </div>
        </template>
      </FluentControlExample>
    </template>

    <template v-else>
      <FluentControlExample header-text="EmptyState 空状态" :source-code="codes.emptyState">
        <template #example>
          <FluentEmptyState icon="folder-open-20-regular" title="暂无项目" description="创建第一个项目后，它会显示在这里。">
            <template #action><FluentButton variant="primary" @click="emptyAction = '已请求创建项目'">创建项目</FluentButton></template>
          </FluentEmptyState>
          <p class="status-line centered">{{ emptyAction }}</p>
        </template>
      </FluentControlExample>

      <FluentControlExample header-text="Result 结果页" :source-code="codes.result">
        <template #example>
          <div class="wide-stack">
            <FluentSegmented v-model="resultStatus" :items="resultOptions" />
            <FluentResult :status="resultStatus" :title="resultTitle" description="结果组件可以展示操作反馈和错误状态。">
              <template #action><FluentButton>返回</FluentButton></template>
            </FluentResult>
          </div>
        </template>
      </FluentControlExample>

      <FluentControlExample header-text="Skeleton 骨架屏" :source-code="codes.skeleton">
        <template #example>
          <div class="wide-stack">
            <FluentToggleSwitch v-model="loading" label="加载状态" />
            <div v-if="loading" class="skeleton-layout"><FluentSkeleton :width="48" :height="48" shape="circle" /><div><FluentSkeleton width="180px" height="18px" /><FluentSkeleton width="260px" height="12px" /></div></div>
            <div v-else class="loaded-content"><strong>Cyrene</strong><span>内容加载完成。</span></div>
          </div>
        </template>
      </FluentControlExample>
    </template>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  FluentButton,
  FluentControlExample,
  FluentEmptyState,
  FluentItemsView,
  FluentPopup,
  FluentPullToRefresh,
  FluentResult,
  FluentSegmented,
  FluentSkeleton,
  FluentSwipeControl,
  FluentTabView,
  FluentTextBox,
  FluentToggleButton,
  FluentToggleSwitch
} from 'vue-fluent-widgets'
import { useDemoLocale } from '../composables/useDemoLocale.js'

const route = useRoute()
const { language, text } = useDemoLocale()
const group = computed(() => route.path.slice(1))
const pages = {
  'control-primitives': { title: '扩展基础控件', description: '文本输入、二态按钮和分段选择的完整交互。' },
  'interaction-patterns': { title: '扩展交互模式', description: '项目集合、标签、弹层和触屏手势组合。' },
  'content-states': { title: '内容与状态', description: '为空、结果和加载阶段提供一致的状态表达。' }
}
const englishPages = {
  'control-primitives': { title: 'Extended controls', description: 'Complete interactions for text input, binary actions, and segmented selection.' },
  'interaction-patterns': { title: 'Interaction patterns', description: 'Collections, tabs, popups, refresh, and touch gestures.' },
  'content-states': { title: 'Content and status', description: 'Consistent empty, result, and loading states.' }
}
const page = computed(() => (language.value === 'en' ? englishPages : pages)[group.value] || pages['control-primitives'])

const textValue = ref('Vue Fluent Widgets')
const notifications = ref(true)
const pinned = ref(false)
const density = ref('comfortable')
const densityOptions = [{ label: '紧凑', value: 'compact' }, { label: '舒适', value: 'comfortable' }, { label: '宽松', value: 'spacious' }]
const items = [{ id: 1, title: '设计系统', detail: '令牌与组件' }, { id: 2, title: '文档站', detail: '示例与 API' }, { id: 3, title: '发布流程', detail: 'npm 与 GitHub' }]
const selectedItems = ref([])
const lastAction = ref('双击项目或滑动列表项')
const activeTab = ref(0)
const tabs = ref([{ label: '概览', content: '项目概览内容' }, { label: '活动', content: '最近活动内容' }, { label: '设置', content: '项目设置内容' }])
const popupOpen = ref(false)
const refreshList = ref(['记录 A', '记录 B', '记录 C'])
const leftActions = [{ id: 'pin', label: '固定', icon: 'pin-20-regular', color: '#0078d4' }]
const rightActions = [{ id: 'delete', label: '删除', icon: 'delete-20-regular', color: '#c42b1c' }]
const emptyAction = ref('')
const resultStatus = ref('success')
const resultOptions = [{ label: '成功', value: 'success' }, { label: '警告', value: 'warning' }, { label: '错误', value: 'error' }]
const resultTitle = computed(() => ({ success: '操作成功', warning: '需要确认', error: '操作失败' }[resultStatus.value]))
const loading = ref(true)

const closeTab = index => {
  tabs.value.splice(index, 1)
  activeTab.value = Math.min(activeTab.value, Math.max(0, tabs.value.length - 1))
}
const refreshItems = done => setTimeout(() => {
  refreshList.value.unshift(`新记录 ${refreshList.value.length + 1}`)
  done()
}, 600)

const codes = {
  textBox: '<FluentTextBox v-model="value" label="项目名称" prefix="ID" suffix=".vue" clearable :max-length="32" />',
  toggles: '<FluentToggleSwitch v-model="notifications" label="通知" />\n<FluentToggleButton v-model="pinned" icon="pin-20-regular" label="固定" />',
  segmented: '<FluentSegmented v-model="density" :items="densityOptions" />',
  itemsView: '<FluentItemsView v-model:selected-items="selected" :items="items" layout="grid" :columns="3" selection-mode="multiple" />',
  tabView: '<FluentTabView v-model="active" :tabs="tabs" closable @close="closeTab" />',
  popup: '<FluentPopup v-model="open" target="#popup-anchor" placement="bottom">弹出内容</FluentPopup>',
  touch: '<FluentPullToRefresh :threshold="60" @refresh="refresh" />\n<FluentSwipeControl :left-actions="leftActions" :right-actions="rightActions" />',
  emptyState: '<FluentEmptyState icon="folder-open-20-regular" title="暂无项目" description="创建第一个项目。"><template #action><FluentButton>创建项目</FluentButton></template></FluentEmptyState>',
  result: '<FluentResult status="success" title="操作成功" description="内容已保存。" />',
  skeleton: '<FluentSkeleton width="180px" height="18px" shape="rounded" animated />'
}
</script>

<style scoped>
.uncovered-demo { max-width: 1000px; }
.page-header { margin-bottom: 24px; }
.page-header h1 { margin: 0 0 8px; color: var(--text-primary); font-size: 30px; }
.page-header p, .status-line { color: var(--text-secondary); }
.narrow-stack, .wide-stack { display: flex; flex-direction: column; gap: 14px; }
.narrow-stack { max-width: 440px; }
.inline-controls { display: flex; flex-wrap: wrap; align-items: center; gap: 18px; }
.status-line { margin: 0; font-size: 13px; }
.centered { text-align: center; }
.item-tile { display: flex; min-height: 72px; flex-direction: column; justify-content: center; gap: 4px; padding: 12px; background: var(--bg-hover); }
.item-tile span { color: var(--text-secondary); font-size: 12px; }
.tab-panel, .popup-content, .swipe-row, .touch-list { padding: 16px; background: var(--bg-card-solid); color: var(--text-primary); }
.popup-content { min-width: 240px; border: 1px solid var(--border-strong); border-radius: var(--radius-md); box-shadow: var(--shadow-8); }
.touch-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.touch-list, .swipe-row { display: flex; min-height: 120px; flex-direction: column; gap: 8px; }
.swipe-row { justify-content: center; }
.skeleton-layout, .loaded-content { display: flex; align-items: center; gap: 14px; }
.skeleton-layout > div, .loaded-content { flex-direction: column; align-items: flex-start; }
.skeleton-layout > div { display: flex; gap: 10px; }
.loaded-content span { color: var(--text-secondary); }
@media (max-width: 720px) { .touch-grid { grid-template-columns: 1fr; } }
</style>
