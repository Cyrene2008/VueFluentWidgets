<template>
  <div class="demo-app">
    <NavigationDock :items="navItems" />
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
  </div>
</template>

<script setup>
import NavigationDock from './components/NavigationDock.vue'
import DemoFooter from './components/DemoFooter.vue'

const navItems = [
  { id: 'home', label: '首页', to: '/', icon: 'home' },
  { id: 'basic-input', label: '基础输入', icon: 'options', children: [
    { id: 'autosuggestbox', label: 'AutoSuggestBox 自动建议框', to: '/autosuggestbox', icon: 'auto-suggest' },
    { id: 'button', label: 'Button 按钮', to: '/button', icon: 'button' },
    { id: 'checkbox', label: 'CheckBox 复选框', to: '/checkbox', icon: 'checkbox' },
    { id: 'colorpicker', label: 'ColorPicker 颜色选择器', to: '/colorpicker', icon: 'color-picker' },
    { id: 'datepicker', label: 'DatePicker 日期选择器', to: '/datepicker', icon: 'calendar' },
    { id: 'dropdownbutton', label: 'DropDownButton 下拉按钮', to: '/dropdownbutton', icon: 'dropdown-button' },
    { id: 'hyperlinkbutton', label: 'HyperlinkButton 超链接按钮', to: '/hyperlinkbutton', icon: 'hyperlink' },
    { id: 'input', label: 'Input 输入框', to: '/input', icon: 'text-field' },
    { id: 'listbox', label: 'ListBox 列表框', to: '/listbox', icon: 'list-box' },
    { id: 'numberbox', label: 'NumberBox 数字输入框', to: '/numberbox', icon: 'number' },
    { id: 'passwordbox', label: 'PasswordBox 密码框', to: '/passwordbox', icon: 'password' },
    { id: 'radio', label: 'RadioButton 单选按钮', to: '/radio', icon: 'radio-button' },
    { id: 'repeatbutton', label: 'RepeatButton 重复按钮', to: '/repeatbutton', icon: 'repeat-button' },
    { id: 'select', label: 'Select 选择器', to: '/select', icon: 'list' },
    { id: 'slider', label: 'Slider 滑块', to: '/slider', icon: 'slider' },
    { id: 'splitbutton', label: 'SplitButton 分割按钮', to: '/splitbutton', icon: 'split-button' },
    { id: 'textblock', label: 'TextBlock 文本块', to: '/textblock', icon: 'text' },
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
    { id: 'infobar', label: 'InfoBar 信息栏', to: '/infobar', icon: 'info-bar' },
    { id: 'modal', label: 'Modal 模态框', to: '/modal', icon: 'modal' },
    { id: 'progressbar', label: 'ProgressBar 进度条', to: '/progressbar', icon: 'progress-bar' },
    { id: 'progressring', label: 'ProgressRing 进度环', to: '/progressring', icon: 'progress-ring' },
    { id: 'teachingtip', label: 'TeachingTip 教学提示', to: '/teachingtip', icon: 'teaching-tip' },
    { id: 'toast', label: 'Toast 消息提示', to: '/toast', icon: 'toast' },
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
    { id: 'flipview', label: 'FlipView 翻转视图', to: '/flipview', icon: 'flip-view' },
    { id: 'gridview', label: 'GridView 网格视图', to: '/gridview', icon: 'grid-view' },
    { id: 'listview', label: 'ListView 列表视图', to: '/listview', icon: 'list-view' },
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
  --fluent-accent: #ea5ec1;
  --font-ui: 'MiSans', 'Segoe UI Variable', 'Segoe UI', system-ui, sans-serif;
  --radius-md: 4px;
  --duration-fast: 0.1s;
  --accent: var(--fluent-accent);
  --accent-light: color-mix(in srgb, var(--accent), white 34%);
  --accent-dark: color-mix(in srgb, var(--accent), black 18%);
  --accent-hover: color-mix(in srgb, var(--accent), black 12%);
  --text-on-accent: #ffffff;
  --text-primary: #1a1a1a;
  --text-secondary: #616161;
  --text-muted: #9e9e9e;
  --bg-card: #ffffff;
  --bg-card-solid: #ffffff;
  --bg-hover: #f5f5f5;
  --border-strong: #e0e0e0;
  --shadow-2: 0 1px 2px rgba(0, 0, 0, 0.1);
  --shadow-4: 0 2px 4px rgba(0, 0, 0, 0.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-ui);
  background: #f5f5f5;
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

.demo-content {
  flex: 1;
  min-height: 0;
  padding: 40px;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
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
  background: #f8f8f8;
  border-radius: var(--radius-md);
  padding: 16px;
  margin-top: 16px;
  overflow-x: auto;
}

.demo-code pre {
  margin: 0;
  font-family: 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.5;
}
</style>
