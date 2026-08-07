<template>
  <div class="demo-app" :class="{ 'theme-dark': isDark, 'theme-light': !isDark }">
    <NavigationDock
      :items="navItems"
      :theme-mode="themeMode"
      :language="language"
      @update:theme-mode="setThemeMode"
      @update:language="setLanguage"
    />
    <div class="demo-main">
      <main class="demo-content">
        <router-view v-slot="{ Component, route }">
          <Transition name="route-view" mode="out-in">
            <component :is="Component" :key="route.path" />
          </Transition>
        </router-view>
        <DemoFooter />
      </main>
    </div>
    <Transition name="persistent-player">
      <aside v-if="activeMedia" class="persistent-player" :aria-label="language === 'en' ? 'Persistent media player' : '跨路由媒体播放器'">
        <header class="persistent-player__header">
          <div><strong>{{ activeMedia.title }}</strong><span v-if="activeMedia.artist">{{ activeMedia.artist }}</span></div>
          <button type="button" :aria-label="language === 'en' ? 'Close player' : '关闭播放器'" @click="closePersistentMedia">
            <FluentIcon icon="dismiss-20-regular" :width="18" />
          </button>
        </header>
        <FluentMediaPlayer
          :key="persistentMediaKey"
          ref="persistentPlayerRef"
          :src="activeMedia.src"
          :poster="activeMedia.poster"
          :type="activeMedia.type"
          :title="activeMedia.title"
          :artist="activeMedia.artist"
          :loop="activeMedia.loop"
          :muted="activeMedia.muted"
          :volume="activeMedia.volume"
          :playback-rate="activeMedia.playbackRate"
          :max-height="activeMedia.type === 'audio' ? 160 : 220"
          :show-picture-in-picture="activeMedia.type !== 'audio'"
          @loadedmetadata="resumePersistentMedia"
        />
      </aside>
    </Transition>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { FluentIcon, FluentMediaPlayer } from 'vue-fluent-widgets'
import NavigationDock from './components/NavigationDock.vue'
import DemoFooter from './components/DemoFooter.vue'
import { provideDemoLocale } from './composables/useDemoLocale.js'
import { providePersistentMedia } from './composables/usePersistentMedia.js'

const themeMode = ref('light')
const language = ref(localStorage.getItem('demo-language') === 'en' ? 'en' : 'zh')
provideDemoLocale(language)
const activeMedia = ref(null)
const persistentMediaKey = ref(0)
const persistentPlayerRef = ref(null)
const startPersistentMedia = media => {
  persistentPlayerRef.value?.pause()
  activeMedia.value = { ...media }
  persistentMediaKey.value += 1
}
const resumePersistentMedia = async () => {
  if (!activeMedia.value) return
  persistentPlayerRef.value?.seek(activeMedia.value.currentTime)
  if (activeMedia.value.playing) await persistentPlayerRef.value?.play()
}
const closePersistentMedia = () => {
  persistentPlayerRef.value?.pause()
  activeMedia.value = null
}
providePersistentMedia({ startMedia: startPersistentMedia, closeMedia: closePersistentMedia })
const systemDark = ref(false)
let colorSchemeQuery
const updateSystemDark = event => { systemDark.value = event.matches }

const isDark = computed(() => themeMode.value === 'dark' || (themeMode.value === 'system' && systemDark.value))

const applyTheme = () => {
  const root = document.documentElement
  root.classList.toggle('theme-dark', isDark.value)
  root.classList.toggle('theme-light', !isDark.value)
  root.classList.add('peach')
}

const setThemeMode = mode => { themeMode.value = mode }
const setLanguage = value => { language.value = value === 'en' ? 'en' : 'zh' }

watch([themeMode, isDark], applyTheme)
watch(language, value => {
  localStorage.setItem('demo-language', value)
  document.documentElement.lang = value === 'en' ? 'en' : 'zh-CN'
}, { immediate: true })

onMounted(() => {
  colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)')
  systemDark.value = colorSchemeQuery.matches
  colorSchemeQuery.addEventListener('change', updateSystemDark)
  applyTheme()
})

onUnmounted(() => colorSchemeQuery?.removeEventListener('change', updateSystemDark))

const navItems = [
  { id: 'home', label: '首页', to: '/', icon: 'home' },
  { id: 'docs', label: '使用文档', icon: 'book-open-20-regular', children: [
    { id: 'getting-started', label: '快速开始', to: '/docs/getting-started', icon: 'rocket-20-regular' },
    { id: 'components', label: '组件索引', to: '/docs/components', icon: 'apps-list-20-regular' },
    { id: 'composition', label: '组合与插槽', to: '/docs/composition', icon: 'layer-20-regular' },
    { id: 'playground', label: '在线 Playground', to: '/playground', icon: 'code-20-regular' }
  ]},
  { id: 'basic-input', label: '基础输入', icon: 'options', children: [
    { id: 'autosuggestbox', label: 'AutoSuggestBox 自动建议框', to: '/autosuggestbox', icon: 'auto-suggest' },
    { id: 'button', label: 'Button 按钮', to: '/button', icon: 'button' },
    { id: 'checkbox', label: 'CheckBox 复选框', to: '/checkbox', icon: 'checkbox' },
    { id: 'colorpicker', label: 'ColorPicker 颜色选择器', to: '/colorpicker', icon: 'color-picker' },
    { id: 'calendar-date-picker', label: 'CalendarDatePicker 日历日期选择器', to: '/calendar-date-picker', icon: 'calendar' },
    { id: 'combo-box', label: 'ComboBox 组合框', to: '/combo-box', icon: 'list' },
    { id: 'datepicker', label: 'DatePicker 日期选择器', to: '/datepicker', icon: 'calendar' },
    { id: 'dropdownbutton', label: 'DropDownButton 下拉按钮', to: '/dropdownbutton', icon: 'dropdown-button' },
    { id: 'hyperlinkbutton', label: 'HyperlinkButton 超链接按钮', to: '/hyperlinkbutton', icon: 'hyperlink' },
    { id: 'input', label: 'Input 输入框', to: '/input', icon: 'text-field' },
    { id: 'listbox', label: 'ListBox 列表框', to: '/listbox', icon: 'list-box' },
    { id: 'numberbox', label: 'NumberBox 数字输入框', to: '/numberbox', icon: 'number' },
    { id: 'passwordbox', label: 'PasswordBox 密码框', to: '/passwordbox', icon: 'password' },
    { id: 'radio', label: 'RadioButton 单选按钮', to: '/radio', icon: 'radio-button' },
    { id: 'repeatbutton', label: 'RepeatButton 重复按钮', to: '/repeatbutton', icon: 'repeat-button' },
    { id: 'rich-edit-box', label: 'RichEditBox 富文本编辑框', to: '/rich-edit-box', icon: 'text-field' },
    { id: 'select', label: 'Select 选择器', to: '/select', icon: 'list' },
    { id: 'slider', label: 'Slider 滑块', to: '/slider', icon: 'slider' },
    { id: 'splitbutton', label: 'SplitButton 分割按钮', to: '/splitbutton', icon: 'split-button' },
    { id: 'textblock', label: 'TextBlock 文本块', to: '/textblock', icon: 'text' },
    { id: 'control-primitives', label: 'MoreControls 扩展控件', to: '/control-primitives', icon: 'options' },
    { id: 'timepicker', label: 'TimePicker 时间选择器', to: '/timepicker', icon: 'clock' },
    { id: 'toggle', label: 'Toggle 开关', to: '/toggle', icon: 'toggle-left' }
  ]},
  { id: 'layout', label: '布局', icon: 'layout', children: [
    { id: 'card', label: 'Card 卡片', to: '/card', icon: 'card' },
    { id: 'expander', label: 'Expander 折叠面板', to: '/expander', icon: 'expander' },
    { id: 'tabs', label: 'Tabs 标签页', to: '/tabs', icon: 'tabs' }
  ]},
  { id: 'feedback', label: '反馈', icon: 'feedback', children: [
    { id: 'flyout', label: 'Flyout 弹出框', to: '/flyout', icon: 'flyout' },
    { id: 'content-dialog', label: 'ContentDialog 内容对话框', to: '/content-dialog', icon: 'modal' },
    { id: 'drawer', label: 'Drawer 侧边抽屉', to: '/drawer', icon: 'sidebar' },
    { id: 'infobar', label: 'InfoBar 信息栏', to: '/infobar', icon: 'info-bar' },
    { id: 'modal', label: 'Modal 模态框', to: '/modal', icon: 'modal' },
    { id: 'progressbar', label: 'ProgressBar 进度条', to: '/progressbar', icon: 'progress-bar' },
    { id: 'progressring', label: 'ProgressRing 进度环', to: '/progressring', icon: 'progress-ring' },
    { id: 'teachingtip', label: 'TeachingTip 教学提示', to: '/teachingtip', icon: 'teaching-tip' },
    { id: 'toast', label: 'Toast 消息提示', to: '/toast', icon: 'toast' },
    { id: 'content-states', label: 'ContentStates 内容状态', to: '/content-states', icon: 'info-bar' },
    { id: 'tooltip', label: 'Tooltip 工具提示', to: '/tooltip', icon: 'tooltip' }
  ]},
  { id: 'navigation', label: '导航', icon: 'navigation', children: [
    { id: 'breadcrumbbar', label: 'BreadcrumbBar 面包屑导航', to: '/breadcrumbbar', icon: 'breadcrumb' },
    { id: 'commandbar', label: 'CommandBar 命令栏', to: '/commandbar', icon: 'command-bar' },
    { id: 'menubar', label: 'MenuBar 菜单栏', to: '/menubar', icon: 'menu-bar' },
    { id: 'navigationview', label: 'NavigationView 导航视图', to: '/navigationview', icon: 'navigation-view' },
    { id: 'pivot', label: 'Pivot 枢轴', to: '/pivot', icon: 'pivot' },
    { id: 'selectorbar', label: 'SelectorBar 选择器栏', to: '/selectorbar', icon: 'selector-bar' },
    { id: 'sidebar', label: 'Sidebar 侧边栏', to: '/sidebar', icon: 'sidebar' },
    { id: 'treeview', label: 'TreeView 树形视图', to: '/treeview', icon: 'tree-view' }
  ]},
  { id: 'collections', label: '集合', icon: 'collections', children: [
    { id: 'data-grid', label: 'DataGrid 数据表格', to: '/data-grid', icon: 'grid-view' },
    { id: 'flipview', label: 'FlipView 翻转视图', to: '/flipview', icon: 'flip-view' },
    { id: 'gridview', label: 'GridView 网格视图', to: '/gridview', icon: 'grid-view' },
    { id: 'listview', label: 'ListView 列表视图', to: '/listview', icon: 'list-view' },
    { id: 'interaction-patterns', label: 'Interactions 扩展交互', to: '/interaction-patterns', icon: 'gesture' },
    { id: 'mediaplayer', label: 'MediaPlayer 媒体播放器', to: '/mediaplayer', icon: 'media-player' }
  ]},
  { id: 'scrolling', label: '滚动', icon: 'scrolling', children: [
    { id: 'pipspager', label: 'PipsPager 分页指示器', to: '/pipspager', icon: 'pips-pager' },
    { id: 'scrollviewer', label: 'ScrollViewer 滚动视图', to: '/scrollviewer', icon: 'scroll-viewer' },
    { id: 'semanticzoom', label: 'SemanticZoom 语义缩放', to: '/semanticzoom', icon: 'semantic-zoom' }
  ]},
  { id: 'other', label: '其他', icon: 'more', children: [
    { id: 'icon', label: 'Icon 图标', to: '/icon', icon: 'icon' },
    { id: 'fullscreen', label: 'Fullscreen 全屏', to: '/fullscreen', icon: 'fullscreen' },
    { id: 'personpicture', label: 'PersonPicture 人物图片', to: '/personpicture', icon: 'person' },
    { id: 'rating', label: 'Rating 评分', to: '/rating', icon: 'rating' },
    { id: 'splash', label: 'Splash 启动画面', to: '/splash', icon: 'splash' }
  ]},
  { id: 'advanced', label: '高级功能', icon: 'settings', children: [
    { id: 'theming', label: '主题定制', icon: 'palette', children: [
      { id: 'colors', label: '颜色系统', to: '/colors', icon: 'color' },
      { id: 'material', label: '材质系统', to: '/material', icon: 'material' },
      { id: 'typography', label: '字体排版', to: '/typography', icon: 'text' }
    ]},
    { id: 'animations', label: '动画效果', icon: 'animation', children: [
      { id: 'transitions', label: '过渡动画', to: '/transitions', icon: 'transition' },
      { id: 'gestures', label: '手势交互', to: '/gestures', icon: 'gesture' }
    ]}
  ]}
]
</script>

<style>
:root {
  --font-ui: 'MiSans', 'Segoe UI Variable', 'Segoe UI', system-ui, sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-ui);
  background: var(--bg-base);
  color: var(--text-primary);
}

.demo-app {
  display: flex;
  width: 100%;
  height: 100vh;
  min-height: 0;
}

.demo-main {
  flex: 1;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.persistent-player {
  position: fixed;
  right: 20px;
  bottom: max(20px, env(safe-area-inset-bottom));
  z-index: 70;
  width: min(420px, calc(100vw - 40px));
  overflow: hidden;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  background: var(--bg-card-solid);
  box-shadow: var(--shadow-16);
}

.persistent-player__header { display: flex; min-height: 42px; align-items: center; justify-content: space-between; gap: 12px; padding: 7px 8px 7px 12px; color: var(--text-primary); }
.persistent-player__header div { display: flex; min-width: 0; flex-direction: column; }
.persistent-player__header strong, .persistent-player__header span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.persistent-player__header strong { font-size: 13px; }
.persistent-player__header span { color: var(--text-muted); font-size: 11px; }
.persistent-player__header button { display: inline-flex; flex: 0 0 32px; align-items: center; justify-content: center; width: 32px; height: 32px; border: 0; border-radius: var(--radius-sm); background: transparent; color: var(--text-secondary); cursor: pointer; }
.persistent-player__header button:hover { background: var(--bg-hover); color: var(--text-primary); }
.persistent-player-enter-active, .persistent-player-leave-active { transition: opacity var(--duration-fast) ease, transform var(--duration-normal) var(--ease-standard); }
.persistent-player-enter-from, .persistent-player-leave-to { opacity: 0; transform: translateY(16px); }

.demo-content {
  flex: 1;
  min-height: 0;
  padding: 40px 40px 80px;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--bg-base);
}

.demo-content > :not(.demo-footer) {
  width: 100%;
  max-width: 1280px !important;
  margin-inline: auto;
}

.route-view-enter-active,
.route-view-leave-active {
  transition: opacity var(--duration-normal) var(--ease-standard), transform var(--duration-normal) var(--ease-standard);
}

.route-view-enter-from {
  opacity: 0;
  transform: translateX(18px);
}

.route-view-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

@media (prefers-reduced-motion: reduce) {
  .route-view-enter-active,
  .route-view-leave-active {
    transition: none;
  }
}

.demo-section {
  background: var(--bg-card);
  border-radius: var(--radius-md);
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: var(--shadow-2);
}

.demo-section h2 {
  margin-bottom: 16px;
  color: var(--text-primary);
}

.demo-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.demo-row label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.demo-code {
  background: var(--bg-code);
  color: var(--text-code);
  border-radius: var(--radius-md);
  padding: 16px;
  margin-top: 16px;
  overflow-x: auto;
}

@media (max-width: 768px) {
  .demo-content {
    padding: 72px 16px 24px;
  }

  .demo-section {
    padding: 18px;
  }

  .persistent-player { right: 12px; bottom: max(12px, env(safe-area-inset-bottom)); width: calc(100vw - 24px); }
}

@media (max-width: 420px) {
  .demo-content {
    padding-inline: 12px;
  }
}

.demo-code pre {
  margin: 0;
  font-family: 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.5;
}
</style>
