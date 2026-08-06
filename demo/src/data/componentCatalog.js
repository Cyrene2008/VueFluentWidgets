import * as Widgets from 'vue-fluent-widgets'
import { generatedComponentApi } from './componentApi.generated.js'

const demoRoutes = {
  FluentAutoSuggestBox: '/autosuggestbox',
  FluentBreadcrumbBar: '/breadcrumbbar',
  FluentButton: '/button',
  FluentCard: '/card',
  FluentCalendarDatePicker: '/calendar-date-picker',
  FluentCheckBox: '/checkbox',
  FluentColorPicker: '/colorpicker',
  FluentCommandBar: '/commandbar',
  FluentComboBox: '/combo-box',
  FluentContentDialog: '/content-dialog',
  FluentDataGrid: '/data-grid',
  FluentDatePicker: '/datepicker',
  FluentDropDownButton: '/dropdownbutton',
  FluentDrawer: '/drawer',
  FluentExpander: '/expander',
  FluentFlipView: '/flipview',
  FluentFlyout: '/flyout',
  FluentGridView: '/gridview',
  FluentHyperlinkButton: '/hyperlinkbutton',
  FluentIcon: '/icon',
  FluentInfoBar: '/infobar',
  FluentInput: '/input',
  FluentListBox: '/listbox',
  FluentListView: '/listview',
  FluentMediaPlayer: '/mediaplayer',
  FluentMenuBar: '/menubar',
  FluentModal: '/modal',
  FluentNavigationView: '/navigationview',
  FluentNumberBox: '/numberbox',
  FluentPasswordBox: '/passwordbox',
  FluentPersonPicture: '/personpicture',
  FluentPipsPager: '/pipspager',
  FluentPivot: '/pivot',
  FluentProgressBar: '/progressbar',
  FluentProgressRing: '/progressring',
  FluentRadioButton: '/radio',
  FluentRating: '/rating',
  FluentRichEditBox: '/rich-edit-box',
  FluentRepeatButton: '/repeatbutton',
  FluentScrollViewer: '/scrollviewer',
  FluentSelect: '/select',
  FluentSelectorBar: '/selectorbar',
  FluentSemanticZoom: '/semanticzoom',
  FluentSlider: '/slider',
  FluentSplitButton: '/splitbutton',
  FluentTabs: '/tabs',
  FluentTeachingTip: '/teachingtip',
  FluentTextBlock: '/textblock',
  FluentTimePicker: '/timepicker',
  FluentToast: '/toast',
  FluentToggle: '/toggle',
  FluentTooltip: '/tooltip',
  FluentTreeView: '/treeview',
  FullscreenToggle: '/fullscreen',
  SecondarySidebarMenu: '/sidebar',
  SplashScreen: '/splash',
  FluentLiquidGlass: '/material',
  FluentImageViewer: '/mediaplayer'
}

Object.assign(demoRoutes, {
  FluentTextBox: '/control-primitives',
  FluentToggleSwitch: '/control-primitives',
  FluentToggleButton: '/control-primitives',
  FluentSegmented: '/control-primitives',
  FluentItemsView: '/interaction-patterns',
  FluentTabView: '/interaction-patterns',
  FluentPopup: '/interaction-patterns',
  FluentPullToRefresh: '/interaction-patterns',
  FluentSwipeControl: '/interaction-patterns',
  FluentEmptyState: '/content-states',
  FluentResult: '/content-states',
  FluentSkeleton: '/content-states'
})

const internalComponents = new Set(['FluentControlExample', 'SecondarySidebarMenu'])
const hiddenComponents = new Set(['FluentMediaPlayerElement'])

const chineseNames = {
  FluentAnimatedIcon: '动画图标', FluentAppBarButton: '应用栏按钮', FluentAppBarSeparator: '应用栏分隔符', FluentAppBarToggleButton: '应用栏切换按钮', FluentAutoSuggestBox: '自动建议框', FluentBackToTop: '返回顶部', FluentBreadcrumbBar: '面包屑导航', FluentButton: '按钮', FluentCalendarDatePicker: '日历日期选择器', FluentCanvas: '画布', FluentCard: '卡片', FluentCheckBox: '复选框', FluentCol: '列布局', FluentColorPicker: '颜色选择器', FluentComboBox: '组合框', FluentCommandBar: '命令栏', FluentContentDialog: '内容对话框', FluentDataGrid: '数据表格', FluentDatePicker: '日期选择器', FluentDescriptions: '描述列表', FluentDivider: '分隔线', FluentDrawer: '抽屉', FluentDropDownButton: '下拉按钮', FluentEmptyState: '空状态', FluentExpander: '折叠面板', FluentFlipView: '翻转视图', FluentFloatButton: '浮动按钮', FluentFlyout: '弹出面板', FluentGrid: '网格布局', FluentGridView: '网格视图', FluentHorizontalScrollContainer: '横向滚动容器', FluentHyperlinkButton: '超链接按钮', FluentIcon: '图标', FluentImage: '图片', FluentImageViewer: '图片查看器', FluentInfoBadge: '信息徽章', FluentInfoBar: '信息栏', FluentInput: '输入框', FluentItemsRepeater: '项目重复器', FluentItemsView: '项目视图', FluentLiquidGlass: '液态玻璃', FluentListBox: '列表框', FluentListView: '列表视图', FluentMediaPlayer: '媒体播放器', FluentMediaPlayerElement: '媒体播放器元素', FluentMenuBar: '菜单栏', FluentModal: '模态框', FluentNavigationView: '导航视图', FluentNumberBox: '数字输入框', FluentPageHeader: '页面标题', FluentParallaxView: '视差视图', FluentPasswordBox: '密码框', FluentPersonPicture: '人物图片', FluentPipsPager: '分页指示器', FluentPivot: '枢轴', FluentPivotItem: '枢轴项目', FluentPopup: '弹出层', FluentProgressBar: '进度条', FluentProgressRing: '进度环', FluentPullToRefresh: '下拉刷新', FluentRadioButton: '单选按钮', FluentRating: '评分', FluentRelativePanel: '相对面板', FluentRepeatButton: '重复按钮', FluentResult: '结果', FluentRichEditBox: '富文本编辑框', FluentRichTextBlock: '富文本块', FluentRow: '行布局', FluentScrollBar: '滚动条', FluentScrollViewer: '滚动查看器', FluentSegmented: '分段选择器', FluentSelect: '选择器', FluentSelectorBar: '选择器栏', FluentSelectorBarItem: '选择器栏项目', FluentSemanticZoom: '语义缩放', FluentSettingsCard: '设置卡片', FluentSkeleton: '骨架屏', FluentSlider: '滑块', FluentSpace: '间距', FluentSplitButton: '分割按钮', FluentSplitView: '分割视图', FluentStackPanel: '堆叠面板', FluentStatistics: '统计数据', FluentSwipeControl: '滑动控件', FluentTabView: '选项卡视图', FluentTabs: '标签页', FluentTeachingTip: '教学提示', FluentTextBlock: '文本块', FluentTextBox: '文本框', FluentTheme: '主题容器', FluentTimeline: '时间线', FluentTimePicker: '时间选择器', FluentTitleBar: '标题栏', FluentToast: '消息提示', FluentToggle: '开关', FluentToggleButton: '切换按钮', FluentToggleSwitch: '切换开关', FluentTooltip: '工具提示', FluentTreeView: '树视图', FluentVariableSizedWrapGrid: '可变尺寸换行网格', FluentViewbox: '视图盒', FluentWatermark: '水印', FullscreenToggle: '全屏切换', SecondarySidebarMenu: '二级侧边栏', SplashScreen: '启动画面'
}

const api = {
  FluentButton: { slots: ['default'], props: ['variant', 'size', 'disabled'], events: ['click'], example: '<FluentButton variant="primary">保存</FluentButton>' },
  FluentCard: { slots: ['default'], props: ['material', 'hoverable'], events: ['click'], example: '<FluentCard material="solid">任意卡片内容</FluentCard>' },
  FluentInput: { slots: ['prefix', 'suffix'], props: ['modelValue', 'type', 'placeholder', 'label', 'readonly', 'error'], events: ['update:modelValue', 'enter'], example: '<FluentInput v-model="value" label="名称"><template #prefix>🔎</template></FluentInput>' },
  FluentSelect: { slots: ['option'], props: ['modelValue', 'options', 'placeholder', 'label', 'error'], events: ['update:modelValue', 'change'], example: '<FluentSelect v-model="value" :options="options" label="城市" />' },
  FluentFlipView: { slots: ['default: { item, index }'], props: ['items', 'modelValue', 'vertical', 'disabled'], events: ['update:modelValue', 'change'], example: '<FluentFlipView v-model="currentIndex" :items="items" style="height: 300px;">\n  <template #default="{ item }">\n    <img v-if="item.kind === \'image\'" :src="item.src" :alt="item.title" />\n    <FluentMediaPlayer v-else-if="item.kind === \'video\'" :src="item.src" />\n    <YourCard v-else :item="item" />\n  </template>\n</FluentFlipView>' },
  FluentGridView: { slots: ['default: { item, index }'], props: ['items', 'columns', 'selectionMode', 'selectedItems', 'canDrag', 'canReorder', 'itemKey'], events: ['select', 'invoke', 'update:selectedItems', 'reorder'], example: '<FluentGridView :items="items" selection-mode="multiple" v-model:selected-items="selectedItems">\n  <template #default="{ item }"><YourCard :item="item" /></template>\n</FluentGridView>' },
  FluentListView: { slots: ['default: { item, index }', 'header', 'group-header'], props: ['items', 'header', 'selectionMode', 'selectedItems', 'isGrouped', 'showGroupHeaders', 'stickyHeaders', 'itemKey'], events: ['select', 'invoke', 'update:selectedItems'], example: '<FluentListView :items="items"><template #default="{ item }"><YourRow :item="item" /></template></FluentListView>' },
  FluentMediaPlayer: { slots: [], props: ['src', 'poster', 'title', 'artist', 'subtitle', 'type', 'fit', 'width', 'height', 'maxWidth', 'maxHeight', 'disableAnimations', 'autoplay', 'loop', 'muted', 'volume', 'playbackRate', 'showLoop', 'showPlaybackRate', 'showPictureInPicture', 'showMinimize'], events: ['play', 'pause', 'ended', 'timeupdate', 'loadedmetadata', 'volumechange', 'ratechange', 'autoplayblocked', 'minimize'], example: '<FluentMediaPlayer\n  :src="asset(\'loop.mp4\')"\n  :poster="asset(\'images/Cyrene01.webp\')"\n  type="video"\n  :volume="0.75"\n  :loop="true"\n  show-minimize\n  @minimize="continuePlaying"\n/>' },
  FluentModal: { slots: ['default', 'icon', 'footer'], props: ['modelValue', 'title', 'maxWidth', 'persistent'], events: ['update:modelValue', 'close'], example: '<FluentModal v-model="open" title="确认操作"><template #footer><FluentButton>确认</FluentButton></template></FluentModal>' },
  FluentInfoBar: { slots: ['default'], props: ['modelValue', 'title', 'message', 'severity', 'closable', 'action'], events: ['update:modelValue', 'close', 'action'], example: '<FluentInfoBar severity="info" title="提示">可以放任意说明内容。</FluentInfoBar>' },
  FluentTooltip: { slots: ['default', 'content'], props: ['content', 'placement', 'disabled', 'delay'], events: [], example: '<FluentTooltip><FluentButton>悬停</FluentButton><template #content>详细说明</template></FluentTooltip>' },
  FluentTeachingTip: { slots: ['default', 'actions'], props: ['modelValue', 'target', 'placement'], events: ['update:modelValue', 'close'], example: '<FluentTeachingTip v-model="open" target="#save">说明内容<template #actions><FluentButton>知道了</FluentButton></template></FluentTeachingTip>' },
  FluentPivot: { slots: ['default', 'tab-0', 'tab-1'], props: ['items', 'modelValue'], events: ['update:modelValue', 'change'], example: '<FluentPivot v-model="active" :items="items"><template #tab-0>任意面板内容</template></FluentPivot>' },
  FluentTabs: { slots: ['tab-N'], props: ['tabs', 'modelValue'], events: ['update:modelValue'], example: '<FluentTabs v-model="active" :tabs="tabs"><template #tab-0>面板内容</template></FluentTabs>' },
  FluentTreeView: { slots: [], props: ['items', 'selectedId', 'expandedIds'], events: ['select', 'expand', 'collapse'], example: '<FluentTreeView :items="tree" @select="onSelect" />' },
  FluentCalendarDatePicker: { slots: [], props: ['modelValue', 'label', 'placeholder', 'disabled', 'min', 'max', 'error', 'description'], events: ['update:modelValue', 'change'], example: '<FluentCalendarDatePicker model-value="2026-08-06" label="日期" />' },
  FluentComboBox: { slots: ['item: { item }'], props: ['modelValue', 'items', 'label', 'placeholder', 'labelKey', 'valueKey', 'disabled', 'error', 'description'], events: ['update:modelValue', 'change'], example: '<FluentComboBox :items="items" model-value="design" label="团队" />' },
  FluentContentDialog: { slots: ['default', 'footer'], props: ['modelValue', 'title', 'subtitle', 'icon', 'size', 'closable', 'closeOnOverlay', 'closeOnEscape', 'primaryButtonText', 'secondaryButtonText'], events: ['update:modelValue', 'close', 'primary-click', 'secondary-click'], example: '<FluentContentDialog v-model="open" title="确认操作">这里是对话框内容。</FluentContentDialog>' },
  FluentDataGrid: { slots: ['toolbar', 'cell-{key}: { row, value }', 'actions: { row }'], props: ['data', 'columns', 'selectable', 'selectedRows', 'loading', 'paginated', 'pageSize'], events: ['update:selectedRows', 'row-click', 'row-dblclick', 'sort'], example: '<FluentDataGrid :data="rows" :columns="columns" selectable />' },
  FluentDrawer: { slots: ['default', 'header', 'footer'], props: ['modelValue', 'title', 'placement', 'size', 'closable', 'closeOnOverlay', 'closeOnEscape'], events: ['update:modelValue', 'open', 'close'], example: '<FluentDrawer v-model="open" title="侧边抽屉">这里是抽屉内容。</FluentDrawer>' },
  FluentRichEditBox: { slots: [], props: ['modelValue', 'label', 'placeholder', 'disabled', 'showToolbar', 'maxLength', 'error', 'description'], events: ['update:modelValue', 'change', 'focus', 'blur'], example: '<FluentRichEditBox v-model="content" label="内容" />' }
}

const playgroundExamples = {
  FluentCalendarDatePicker: '<FluentCalendarDatePicker model-value="2026-08-06" label="日期" />',
  FluentComboBox: `<FluentComboBox
  :items='[{"label":"设计","value":"design"},{"label":"工程","value":"engineering"}]'
  model-value="design"
  label="团队"
/>`,
  FluentContentDialog: `<FluentContentDialog
  :model-value="true"
  title="内容对话框"
  primary-button-text="确认"
  secondary-button-text="取消"
>
  这里是对话框内容。
</FluentContentDialog>`,
  FluentDataGrid: `<FluentDataGrid
  :data='[{"name":"Ada","role":"工程师"},{"name":"Lin","role":"设计师"}]'
  :columns='[{"key":"name","label":"姓名"},{"key":"role","label":"角色"}]'
  selectable
/>`,
  FluentDrawer: `<FluentDrawer :model-value="true" title="侧边抽屉">
  这里是抽屉内容。
</FluentDrawer>`,
  FluentMediaPlayer: `<FluentMediaPlayer
  :src="asset('loop.mp4')"
  :poster="asset('images/Cyrene01.webp')"
  type="video"
/>`,
  FluentRichEditBox: '<FluentRichEditBox model-value="&lt;p&gt;可以编辑这段内容。&lt;/p&gt;" label="内容" />'
}

const specialExamples = {
  FluentToast: `<FluentToast ref="toast" />
<FluentButton @click="toast.add({ title: '保存完成', message: '数据已保存。', duration: 4000 })">
  显示通知
</FluentButton>`,
  FullscreenToggle: '<FullscreenToggle />\n<!-- 点击图标切换当前页面全屏状态。 -->'
}

const propSamples = {
  src: { expression: "asset('images/Cyrene01.webp')" },
  poster: { expression: "asset('images/Cyrene01.webp')" },
  icon: 'home-20-regular',
  variant: 'primary',
  size: 'md',
  type: 'video',
  fit: 'contain',
  placement: 'bottom',
  severity: 'info',
  material: 'solid',
  selectionMode: 'multiple',
  orientation: 'horizontal',
  target: '#demo-target',
  modelValue: '示例值',
  label: '示例标签',
  title: '示例标题',
  subtitle: '示例副标题',
  placeholder: '请输入内容',
  description: '这里是组件说明。',
  message: '这是一条示例消息。',
  text: '示例文本',
  content: '示例内容',
  artist: '示例作者',
  items: [{ id: 1, label: '项目 1', title: '项目 1' }, { id: 2, label: '项目 2', title: '项目 2' }],
  options: [{ label: '选项 1', value: 'one' }, { label: '选项 2', value: 'two' }],
  suggestions: ['建议 1', '建议 2'],
  data: [{ id: 1, name: 'Ada', value: 64 }, { id: 2, name: 'Lin', value: 82 }],
  columns: [{ key: 'name', label: '名称' }, { key: 'value', label: '数值' }],
  tabs: [{ label: '概览' }, { label: '详情' }],
  tree: [{ id: 'root', label: '根节点', children: [{ id: 'child', label: '子节点' }] }],
  commands: [{ id: 'save', label: '保存' }, { id: 'cancel', label: '取消' }]
}

const componentPropSamples = {
  FluentMediaPlayer: { src: { expression: "asset('loop.mp4')" }, type: 'video', fit: 'cover', volume: 0.75, playbackRate: 1.25 },
  FluentMediaPlayerElement: { src: { expression: "asset('loop.mp4')" } },
  FluentImage: { src: { expression: "asset('images/Cyrene01.webp')" }, fit: 'cover' },
  FluentImageViewer: { src: { expression: "asset('images/Cyrene01.webp')" }, fit: 'contain' },
  FluentPersonPicture: { src: { expression: "asset('images/avatar.webp')" } },
  FluentInput: { type: 'text' },
  FluentTextBox: { type: 'text' },
  FluentDivider: { orientation: 'horizontal' },
  FluentStackPanel: { orientation: 'vertical' },
  FluentSlider: { orientation: 'horizontal' },
  FluentProgressRing: { indeterminate: false, value: 64 },
  FluentProgressBar: { indeterminate: false, value: 64 },
  FluentContentDialog: { size: 'standard' },
  FluentDrawer: { size: 'medium', placement: 'right' },
  FluentTeachingTip: { placement: 'bottom' },
  FluentWatermark: { rotate: -22, gap: [100, 100], offset: [0, 0] }
}

const sampleFor = (componentName, prop) => {
  const name = prop.name
  const types = prop.types || []
  const componentSample = componentPropSamples[componentName]?.[name]
  if (componentSample !== undefined) return componentSample
  if (types.includes('Boolean')) return false
  if (prop.values?.length) return prop.values[0]
  if (prop.defaultValue !== undefined && prop.defaultValue !== null && prop.defaultValue !== '') return prop.defaultValue
  if (types.includes('Number')) {
    if (/volume/i.test(name)) return 0.75
    if (/rate|scale/i.test(name)) return 1.25
    if (/width/i.test(name)) return 320
    if (/height/i.test(name)) return 220
    if (/max|total/i.test(name)) return 100
    return 1
  }
  if (propSamples[name]) return propSamples[name]
  if (types.includes('Array')) return []
  if (types.includes('Object')) return {}
  if (types.includes('Function')) return { expression: '(value) => value' }
  if (/color/i.test(name)) return '#0078d4'
  if (/date/i.test(name)) return '2026-08-06'
  if (/url|href|to/i.test(name)) return '/'
  if (/value|name|id/i.test(name)) return '示例值'
  return '示例文本'
}

const escapeAttribute = value => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
const kebabCase = value => value.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)
const jsonAttribute = value => `:${kebabCase(value.name)}='${JSON.stringify(value.sample)}'`

const propAttribute = (componentName, prop) => {
  const sample = sampleFor(componentName, prop)
  const attrName = kebabCase(prop.name)
  if (sample?.expression) return `:${attrName}="${sample.expression}"`
  if (typeof sample === 'boolean') return `:${attrName}="${sample}"`
  if (typeof sample === 'number') return `:${attrName}="${sample}"`
  if (Array.isArray(sample) || (sample && typeof sample === 'object')) return jsonAttribute({ name: prop.name, sample })
  if (prop.types?.includes('String') || !prop.types?.length) return `${attrName}="${escapeAttribute(sample)}"`
  return `:${attrName}="${JSON.stringify(sample)}"`
}

const slotExample = (slot, index, componentName) => {
  const scope = slot.props?.length ? `="{ ${slot.props.join(', ')} }"` : ''
  if (slot.name === 'default') {
    return slot.props?.length ? `<template #default="{ ${slot.props.join(', ')} }">示例内容</template>` : '示例内容'
  }
  if (slot.name.startsWith('dynamic:')) {
    const name = componentName === 'FluentDataGrid' ? 'cell-name' : /Pivot|Tabs/.test(componentName) ? 'tab-0' : `item-${index}`
    return `<template #${name}${scope}>动态插槽内容</template>`
  }
  return `<template #${slot.name}${scope}>示例内容</template>`
}

const fullPropsExample = (name, generated, curated) => {
  const props = generated.props || []
  const slots = generated.slots?.length ? generated.slots : (curated?.slots || []).map(slot => ({ name: String(slot).split(':')[0], props: [] }))
  const attributes = props.map(prop => `  ${propAttribute(name, prop)}`).join('\n')
  const hasSlots = slots.length > 0
  const body = hasSlots ? slots.map((slot, index) => slotExample(slot, index, name)).join('\n  ') : ''
  const open = attributes ? `<${name}\n${attributes}${hasSlots ? '>' : '\n/>'}` : `<${name}${hasSlots ? '>' : ' />'}`
  if (!hasSlots) return open
  return `${open}\n  ${body}\n</${name}>`
}

const normalizedApiFor = name => {
  const generated = generatedComponentApi[name] || { props: [], events: [], slots: [], exposed: [] }
  const curated = api[name] || {}
  const props = generated.props.map(prop => ({
    ...prop,
    sample: sampleFor(name, prop),
    values: prop.values?.length ? prop.values : []
  }))
  const slots = generated.slots.length ? generated.slots : (curated.slots || []).map(slot => ({ name: String(slot).split(':')[0], props: [] }))
  return {
    props,
    events: generated.events.length ? generated.events : (curated.events || []),
    slots,
    exposed: generated.exposed || [],
    example: specialExamples[name] || fullPropsExample(name, { ...generated, props, slots }, curated),
    playgroundTemplate: playgroundExamples[name] || curated.playgroundTemplate || fullPropsExample(name, { ...generated, props, slots }, curated)
  }
}

const categoryFor = name => {
  if (/Button|Input|Box|Picker|Select|Slider|Toggle|Radio|Color|Rating/.test(name)) return '基础输入'
  if (/Card|Grid|Row|Col|Stack|Panel|Space|Divider|Canvas|Viewbox|Wrap|Expander|Tabs|Pivot/.test(name)) return '布局与内容'
  if (/Modal|Dialog|Flyout|Popup|Toast|InfoBar|Tooltip|Teaching|Progress|Result|Empty|Skeleton/.test(name)) return '反馈与状态'
  if (/Navigation|Menu|Bar|Tree|Breadcrumb|Sidebar|Drawer|Title|PageHeader/.test(name)) return '导航'
  if (/List|Items|Data|Descriptions|Statistics|Timeline|Collection/.test(name)) return '集合与数据'
  if (/Media|Image|Person|Animated|Watermark|Liquid|Theme|Fullscreen|Splash/.test(name)) return '媒体与系统'
  return '其他'
}

export const componentCatalog = Object.keys(Widgets)
  .filter(name => !hiddenComponents.has(name) && name !== 'default' && (name.startsWith('Fluent') || ['FullscreenToggle', 'SplashScreen', 'SecondarySidebarMenu'].includes(name)))
  .map(name => ({
    name,
    chineseName: chineseNames[name] || '组件',
    category: categoryFor(name),
    route: demoRoutes[name] || `/playground?component=${encodeURIComponent(name)}`,
    docsRoute: `/docs/component/${encodeURIComponent(name)}`,
    hasDemo: Boolean(demoRoutes[name]),
    internal: internalComponents.has(name),
    api: normalizedApiFor(name)
  }))
  .sort((a, b) => a.name.localeCompare(b.name))

export { Widgets }
