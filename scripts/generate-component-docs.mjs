import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const apiPath = resolve(root, 'demo/src/data/componentApi.generated.js')
const catalogPath = resolve(root, 'demo/src/data/componentCatalog.js')

const chineseNames = {
  FluentAnimatedIcon: '动画图标', FluentAppBarButton: '应用栏按钮', FluentAppBarSeparator: '应用栏分隔符', FluentAppBarToggleButton: '应用栏切换按钮', FluentAutoSuggestBox: '自动建议框', FluentBackToTop: '返回顶部', FluentBreadcrumbBar: '面包屑导航', FluentButton: '按钮', FluentCalendarDatePicker: '日历日期选择器', FluentCanvas: '画布', FluentCard: '卡片', FluentCheckBox: '复选框', FluentCol: '列布局', FluentColorPicker: '颜色选择器', FluentComboBox: '组合框', FluentCommandBar: '命令栏', FluentContentDialog: '内容对话框', FluentDataGrid: '数据表格', FluentDatePicker: '日期选择器', FluentDescriptions: '描述列表', FluentDivider: '分隔线', FluentDrawer: '抽屉', FluentDropDownButton: '下拉按钮', FluentEmptyState: '空状态', FluentExpander: '折叠面板', FluentFlipView: '翻转视图', FluentFloatButton: '浮动按钮', FluentFlyout: '弹出面板', FluentGrid: '网格布局', FluentGridView: '网格视图', FluentHorizontalScrollContainer: '横向滚动容器', FluentHyperlinkButton: '超链接按钮', FluentIcon: '图标', FluentImage: '图片', FluentImageViewer: '图片查看器', FluentInfoBadge: '信息徽章', FluentInfoBar: '信息栏', FluentInput: '输入框', FluentItemsRepeater: '项目重复器', FluentItemsView: '项目视图', FluentLiquidGlass: '液态玻璃', FluentListBox: '列表框', FluentListView: '列表视图', FluentMediaPlayer: '媒体播放器', FluentMediaPlayerElement: '媒体播放器元素', FluentMenuBar: '菜单栏', FluentModal: '模态框', FluentNavigationView: '导航视图', FluentNumberBox: '数字输入框', FluentPageHeader: '页面标题', FluentParallaxView: '视差视图', FluentPasswordBox: '密码框', FluentPersonPicture: '人物图片', FluentPipsPager: '分页指示器', FluentPivot: '枢轴', FluentPivotItem: '枢轴项目', FluentPopup: '弹出层', FluentProgressBar: '进度条', FluentProgressRing: '进度环', FluentPullToRefresh: '下拉刷新', FluentRadioButton: '单选按钮', FluentRating: '评分', FluentRelativePanel: '相对面板', FluentRepeatButton: '重复按钮', FluentResult: '结果', FluentRichEditBox: '富文本编辑框', FluentRichTextBlock: '富文本块', FluentRow: '行布局', FluentScrollBar: '滚动条', FluentScrollViewer: '滚动查看器', FluentSegmented: '分段选择器', FluentSelect: '选择器', FluentSelectorBar: '选择器栏', FluentSelectorBarItem: '选择器栏项目', FluentSemanticZoom: '语义缩放', FluentSettingsCard: '设置卡片', FluentSkeleton: '骨架屏', FluentSlider: '滑块', FluentSpace: '间距', FluentSplitButton: '分割按钮', FluentSplitView: '分割视图', FluentStackPanel: '堆叠面板', FluentStatistics: '统计', FluentSwipeControl: '滑动控制', FluentTabView: '标签视图', FluentTabs: '标签页', FluentTeachingTip: '教学提示', FluentTextBox: '文本框', FluentTextBlock: '文本块', FluentTheme: '主题', FluentTimePicker: '时间选择器', FluentTimeline: '时间线', FluentTitleBar: '标题栏', FluentToast: '消息提示', FluentToggle: '切换', FluentToggleButton: '切换按钮', FluentToggleSwitch: '切换开关', FluentTooltip: '工具提示', FluentTreeView: '树形视图', FluentVariableSizedWrapGrid: '可变尺寸网格', FluentViewbox: '视图框', FluentWatermark: '水印', FullscreenToggle: '全屏切换', SecondarySidebarMenu: '侧边栏菜单', SplashScreen: '启动画面'
}

const categories = {
  'Basic Input': ['FluentAutoSuggestBox', 'FluentButton', 'FluentCalendarDatePicker', 'FluentCheckBox', 'FluentColorPicker', 'FluentComboBox', 'FluentDatePicker', 'FluentDropDownButton', 'FluentHyperlinkButton', 'FluentInput', 'FluentListBox', 'FluentNumberBox', 'FluentPasswordBox', 'FluentRadioButton', 'FluentRepeatButton', 'FluentRichEditBox', 'FluentSegmented', 'FluentSelect', 'FluentSlider', 'FluentSplitButton', 'FluentTextBox', 'FluentToggleButton', 'FluentToggleSwitch', 'FluentRating'],
  'Layout & Content': ['FluentCard', 'FluentCol', 'FluentDivider', 'FluentExpander', 'FluentGrid', 'FluentPageHeader', 'FluentRelativePanel', 'FluentRow', 'FluentSettingsCard', 'FluentSpace', 'FluentStackPanel', 'FluentTabs', 'FluentPivot', 'FluentPivotItem'],
  'Feedback & Status': ['FluentContentDialog', 'FluentEmptyState', 'FluentInfoBadge', 'FluentInfoBar', 'FluentModal', 'FluentPopup', 'FluentProgressBar', 'FluentProgressRing', 'FluentResult', 'FluentSkeleton', 'FluentTeachingTip', 'FluentToast', 'FluentTooltip', 'FluentFlyout'],
  'Navigation': ['FluentBreadcrumbBar', 'FluentCommandBar', 'FluentDrawer', 'FluentMenuBar', 'FluentNavigationView', 'FluentSelectorBar', 'FluentSelectorBarItem', 'FluentTreeView'],
  'Collections & Data': ['FluentDataGrid', 'FluentDescriptions', 'FluentFlipView', 'FluentGridView', 'FluentHorizontalScrollContainer', 'FluentItemsRepeater', 'FluentItemsView', 'FluentListView', 'FluentPipsPager', 'FluentSemanticZoom', 'FluentStatistics', 'FluentTimeline'],
  'Media & System': ['FluentAnimatedIcon', 'FluentBackToTop', 'FluentCanvas', 'FluentFloatButton', 'FluentIcon', 'FluentImage', 'FluentImageViewer', 'FluentLiquidGlass', 'FluentMediaPlayer', 'FluentMediaPlayerElement', 'FluentParallaxView', 'FluentPersonPicture', 'FluentRichTextBlock', 'FluentScrollViewer', 'FluentScrollBar', 'FluentSwipeControl', 'FluentPullToRefresh', 'FluentTabView', 'FluentTitleBar', 'FluentToggle', 'FluentVariableSizedWrapGrid', 'FluentViewbox', 'FluentWatermark', 'FullscreenToggle', 'SplashScreen', 'FluentTheme'],
  'Other': ['FluentControlExample', 'FluentGrid', 'FluentRadioButtons', 'FluentAppBarButton', 'FluentAppBarSeparator', 'FluentAppBarToggleButton', 'FluentSplitView', 'SecondarySidebarMenu']
}

const cnCategories = {
  '基础输入': categories['Basic Input'],
  '布局与内容': categories['Layout & Content'],
  '反馈与状态': categories['Feedback & Status'],
  '导航': categories['Navigation'],
  '集合与数据': categories['Collections & Data'],
  '媒体与系统': categories['Media & System'],
  '其他': categories['Other']
}

const curatedExamples = {
  FluentButton: '<FluentButton variant="primary">保存</FluentButton>',
  FluentCard: '<FluentCard material="acrylic">任意卡片内容</FluentCard>',
  FluentInput: '<FluentInput v-model="value" label="名称"><template #prefix>🔎</template></FluentInput>',
  FluentSelect: '<FluentSelect v-model="value" :options="options" label="城市" />',
  FluentMediaPlayer: '<FluentMediaPlayer src="/media.mp4" poster="/cover.webp" type="video" show-minimize @minimize="onMinimize" />',
  FluentModal: '<FluentModal v-model="open" title="确认操作"><template #footer><FluentButton>确认</FluentButton></template></FluentModal>',
  FluentInfoBar: '<FluentInfoBar severity="info" title="提示">可以放任意说明内容。</FluentInfoBar>',
  FluentContentDialog: '<FluentContentDialog v-model="open" title="确认操作">这里是对话框内容。</FluentContentDialog>',
  FluentDrawer: '<FluentDrawer v-model="open" title="侧边抽屉">这里是抽屉内容。</FluentDrawer>',
  FluentDataGrid: '<FluentDataGrid :data="rows" :columns="columns" selectable />',
  FluentTreeView: '<FluentTreeView :items="tree" @select="onSelect" />',
  FluentTabs: '<FluentTabs v-model="active" :tabs="tabs"><template #tab-0>面板内容</template></FluentTabs>',
  FluentToast: '<FluentToast ref="toast" />',
  FluentFlipView: '<FluentFlipView v-model="index" :items="items" style="height: 300px;"><template #default="{ item }">{{ item.title }}</template></FluentFlipView>',
  FluentGridView: '<FluentGridView :items="items" selection-mode="multiple" v-model:selected-items="selected"><template #default="{ item }"><YourCard :item="item" /></template></FluentGridView>',
  FluentListView: '<FluentListView :items="items"><template #default="{ item }"><YourRow :item="item" /></template></FluentListView>',
  FluentCalendarDatePicker: '<FluentCalendarDatePicker model-value="2026-08-06" label="日期" />',
  FluentComboBox: '<FluentComboBox :items="items" model-value="design" label="团队" />',
  FluentRichEditBox: '<FluentRichEditBox v-model="content" label="内容" />',
  FluentTheme: '<FluentTheme theme="system" material="acrylic"><App /></FluentTheme>'
}

const kebab = s => s.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)

const formatDefault = val => {
  if (val === undefined || val === null || val === '') return '—'
  if (typeof val === 'boolean') return val ? 'true' : 'false'
  if (typeof val === 'string') return `\`${val}\``
  return `\`${JSON.stringify(val)}\``
}

const generateComponentSection = (name, api, lang) => {
  const cn = chineseNames[name] || name
  const isCn = lang === 'cn'
  const lines = []
  const example = curatedExamples[name] || api.example || ''

  lines.push(`### ${name}`)
  if (isCn) lines.push(`**${cn}**`)
  lines.push('')

  if (api.props?.length) {
    lines.push(isCn ? '#### Props' : '#### Props')
    lines.push('')
    lines.push(isCn
      ? '| Prop | 类型 | 必填 | 默认值 | 说明 |'
      : '| Prop | Type | Required | Default | Description |')
    lines.push('|---|---|---|---|---|')
    for (const prop of api.props) {
      const types = (prop.types || []).join(' \\| ')
      const req = prop.required ? '✓' : ''
      const def = formatDefault(prop.default ?? prop.defaultValue)
      const values = prop.values?.length ? ` 可选值: ${prop.values.map(v => `\`${v}\``).join(', ')}` : ''
      lines.push(`| \`${kebab(prop.name)}\` | ${types} | ${req} | ${def} | ${values.slice(1)} |`)
    }
    lines.push('')
  }

  if (api.events?.length) {
    lines.push(isCn ? '#### Events' : '#### Events')
    lines.push('')
    lines.push(isCn
      ? '| 事件名 | 说明 |'
      : '| Event | Description |')
    lines.push('|---|---|')
    for (const event of api.events) {
      lines.push(`| \`@${kebab(event)}\` | |`)
    }
    lines.push('')
  }

  if (api.slots?.length) {
    lines.push(isCn ? '#### Slots' : '#### Slots')
    lines.push('')
    lines.push(isCn
      ? '| 插槽名 | 说明 |'
      : '| Slot | Description |')
    lines.push('|---|---|')
    for (const slot of api.slots) {
      lines.push(`| \`#${slot.name}\` | |`)
    }
    lines.push('')
  }

  if (api.exposed?.length) {
    lines.push(isCn ? '#### 实例方法' : '#### Exposed')
    lines.push('')
    for (const exp of api.exposed) {
      lines.push(`- \`${exp}\``)
    }
    lines.push('')
  }

  if (example) {
    lines.push(isCn ? '#### 示例' : '#### Example')
    lines.push('')
    lines.push('```vue')
    lines.push(example)
    lines.push('```')
    lines.push('')
  }

  return lines.join('\n')
}

const generateDoc = async (lang) => {
  const { generatedComponentApi: api } = await import(new URL(`file://${apiPath}`).href)

  const isCn = lang === 'cn'
  const lines = []

  lines.push(isCn
    ? '# Vue Fluent Widgets 组件文档'
    : '# Vue Fluent Widgets Component Reference')
  lines.push('')
  lines.push(isCn
    ? 'Vue 3 Fluent Design 组件库完整 API 文档。包含所有公开组件的 Props、Events、Slots 和示例代码。'
    : 'Complete API reference for the Vue 3 Fluent Design component library. Includes Props, Events, Slots, and examples for all public components.')
  lines.push('')
  lines.push(isCn
    ? '**安装：** `npm i vue-fluent-widgets`'
    : '**Install:** `npm i vue-fluent-widgets`')
  lines.push('')
  lines.push(isCn
    ? '**样式：** `import \'vue-fluent-widgets/style.css\'`'
    : '**Styles:** `import \'vue-fluent-widgets/style.css\'`')
  lines.push('')

  lines.push(isCn ? '---' : '---')
  lines.push('')

  // Table of contents
  lines.push(isCn ? '## 目录' : '## Table of Contents')
  lines.push('')
  const cats = isCn ? cnCategories : categories
  for (const [cat, components] of Object.entries(cats)) {
    const validComponents = components.filter(c => api[c])
    if (!validComponents.length) continue
    lines.push(`- **${cat}**`)
    for (const c of validComponents) {
      lines.push(`  - [${c}](#${c.toLowerCase()})`)
    }
  }
  lines.push('')

  lines.push('---')
  lines.push('')

  // Component sections
  for (const [cat, components] of Object.entries(cats)) {
    const validComponents = components.filter(c => api[c])
    if (!validComponents.length) continue
    lines.push(`## ${cat}`)
    lines.push('')
    for (const name of validComponents) {
      lines.push(generateComponentSection(name, api[name], lang))
    }
  }

  return lines.join('\n')
}

const cnDoc = await generateDoc('cn')
await writeFile(resolve(root, 'COMPONENTS.md'), cnDoc, 'utf8')
console.log('Generated COMPONENTS.md')

const enDoc = await generateDoc('en')
await writeFile(resolve(root, 'COMPONENTS_EN.md'), enDoc, 'utf8')
console.log('Generated COMPONENTS_EN.md')
