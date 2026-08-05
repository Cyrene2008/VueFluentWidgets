import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { addCollection } from '@iconify/vue/dist/iconify.mjs'
import App from './App.vue'
import VueFluentWidgets from 'vue-fluent-widgets'
import 'vue-fluent-widgets/style.css'

// 导入 Fluent 图标集
import { icons as fluentIcons } from '@iconify-json/fluent'
addCollection(fluentIcons)

const routes = [
  { path: '/', component: () => import('./views/Home.vue') },
  { path: '/autosuggestbox', component: () => import('./views/AutoSuggestBoxDemo.vue') },
  { path: '/breadcrumbbar', component: () => import('./views/BreadcrumbBarDemo.vue') },
  { path: '/button', component: () => import('./views/ButtonDemo.vue') },
  { path: '/card', component: () => import('./views/CardDemo.vue') },
  { path: '/checkbox', component: () => import('./views/CheckBoxDemo.vue') },
  { path: '/colorpicker', component: () => import('./views/ColorPickerDemo.vue') },
  { path: '/commandbar', component: () => import('./views/CommandBarDemo.vue') },
  { path: '/datepicker', component: () => import('./views/DatePickerDemo.vue') },
  { path: '/dropdownbutton', component: () => import('./views/DropDownButtonDemo.vue') },
  { path: '/expander', component: () => import('./views/ExpanderDemo.vue') },
  { path: '/flipview', component: () => import('./views/FlipViewDemo.vue') },
  { path: '/flyout', component: () => import('./views/FlyoutDemo.vue') },
  { path: '/gridview', component: () => import('./views/GridViewDemo.vue') },
  { path: '/hyperlinkbutton', component: () => import('./views/HyperlinkButtonDemo.vue') },
  { path: '/icon', component: () => import('./views/IconDemo.vue') },
  { path: '/infobar', component: () => import('./views/InfoBarDemo.vue') },
  { path: '/input', component: () => import('./views/InputDemo.vue') },
  { path: '/listbox', component: () => import('./views/ListBoxDemo.vue') },
  { path: '/listview', component: () => import('./views/ListViewDemo.vue') },
  { path: '/menubar', component: () => import('./views/MenuBarDemo.vue') },
  { path: '/modal', component: () => import('./views/ModalDemo.vue') },
  { path: '/navigationview', component: () => import('./views/NavigationViewDemo.vue') },
  { path: '/numberbox', component: () => import('./views/NumberBoxDemo.vue') },
  { path: '/passwordbox', component: () => import('./views/PasswordBoxDemo.vue') },
  { path: '/personpicture', component: () => import('./views/PersonPictureDemo.vue') },
  { path: '/pipspager', component: () => import('./views/PipsPagerDemo.vue') },
  { path: '/pivot', component: () => import('./views/PivotDemo.vue') },
  { path: '/progressbar', component: () => import('./views/ProgressBarDemo.vue') },
  { path: '/progressring', component: () => import('./views/ProgressRingDemo.vue') },
  { path: '/radio', component: () => import('./views/RadioButtonDemo.vue') },
  { path: '/rating', component: () => import('./views/RatingDemo.vue') },
  { path: '/repeatbutton', component: () => import('./views/RepeatButtonDemo.vue') },
  { path: '/scrollviewer', component: () => import('./views/ScrollViewerDemo.vue') },
  { path: '/select', component: () => import('./views/SelectDemo.vue') },
  { path: '/selectorbar', component: () => import('./views/SelectorBarDemo.vue') },
  { path: '/semanticzoom', component: () => import('./views/SemanticZoomDemo.vue') },
  { path: '/slider', component: () => import('./views/SliderDemo.vue') },
  { path: '/splitbutton', component: () => import('./views/SplitButtonDemo.vue') },
  { path: '/tabs', component: () => import('./views/TabsDemo.vue') },
  { path: '/teachingtip', component: () => import('./views/TeachingTipDemo.vue') },
  { path: '/textblock', component: () => import('./views/TextBlockDemo.vue') },
  { path: '/timepicker', component: () => import('./views/TimePickerDemo.vue') },
  { path: '/toast', component: () => import('./views/ToastDemo.vue') },
  { path: '/toggle', component: () => import('./views/ToggleDemo.vue') },
  { path: '/tooltip', component: () => import('./views/TooltipDemo.vue') },
  { path: '/treeview', component: () => import('./views/TreeViewDemo.vue') },
  { path: '/fullscreen', component: () => import('./views/FullscreenDemo.vue') },
  { path: '/sidebar', component: () => import('./views/SidebarDemo.vue') },
  { path: '/splash', component: () => import('./views/SplashDemo.vue') },
  { path: '/colors', component: () => import('./views/ColorsDemo.vue') },
  { path: '/typography', component: () => import('./views/TypographyDemo.vue') },
  { path: '/transitions', component: () => import('./views/TransitionsDemo.vue') },
  { path: '/gestures', component: () => import('./views/GesturesDemo.vue') },
  { path: '/material', component: () => import('./views/MaterialDemo.vue') },
  { path: '/mediaplayer', component: () => import('./views/MediaPlayerDemo.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.use(VueFluentWidgets)
app.mount('#app')
