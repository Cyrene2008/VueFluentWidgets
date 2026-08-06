<template>
  <header class="navigation-dock__mobile-bar">
    <button type="button" class="navigation-dock__mobile-action" aria-label="打开导航" @click="mobileOpen = true">
      <FluentIcon icon="line-horizontal-3-20-regular" :width="20" />
    </button>
    <button type="button" class="navigation-dock__mobile-action" aria-label="返回上一个页面" @click="router.back()">
      <FluentIcon icon="arrow-left-20-regular" :width="20" />
    </button>
    <img :src="asset('images/avatar.webp')" alt="" class="navigation-dock__mobile-logo" />
    <span class="navigation-dock__mobile-title">Vue Fluent Widgets</span>
  </header>
  <Transition name="dock-backdrop">
    <button v-if="mobileOpen" type="button" class="navigation-dock__backdrop" aria-label="关闭导航" @click="closeNavigation" />
  </Transition>
  <nav
    class="navigation-dock"
    :class="{ collapsed: dockCollapsed, 'secondary-open': Boolean(activeSecondary), 'mobile-open': mobileOpen }"
    @keydown.esc="closeNavigation"
  >
    <section class="navigation-dock__primary">
      <header class="navigation-dock__header">
        <button
          type="button"
          class="navigation-dock__toggle"
          :aria-label="isMobile ? '关闭导航' : dockCollapsed ? '展开导航' : '收起导航'"
          :title="isMobile ? '关闭导航' : dockCollapsed ? '展开导航' : '收起导航'"
          @click="toggleDock"
        >
          <FluentIcon :icon="isMobile ? 'dismiss-20-regular' : 'line-horizontal-3-20-regular'" :width="20" class="navigation-dock__toggle-icon" :class="{ collapsed: dockCollapsed }" />
        </button>
        <button v-if="!dockCollapsed" type="button" class="navigation-dock__back" aria-label="返回上一个页面" title="返回上一个页面" @click="router.back()">
          <FluentIcon icon="arrow-left-20-regular" :width="20" />
        </button>
        <img v-if="!dockCollapsed" :src="asset('images/avatar.webp')" alt="" class="navigation-dock__logo" />
        <span v-if="!dockCollapsed" class="navigation-dock__title">Vue Fluent Widgets</span>
      </header>

      <div v-if="!dockCollapsed" class="navigation-dock__search">
        <FluentAutoSuggestBox
          v-model="searchQuery"
          :suggestions="searchItems"
          :filter-method="filterSearchItems"
           :placeholder="language === 'zh' ? '搜索组件或文档' : 'Search components or docs'"
          icon="search-20-regular"
          value-key="label"
          @select="navigateToSearchResult"
        >
          <template #suggestion="{ suggestion }">
            <div class="navigation-dock__search-result">
              <FluentIcon v-if="suggestion.icon" :icon="suggestion.icon" :width="16" />
              <span>
                <strong>{{ suggestion.label }}</strong>
                <small>{{ suggestion.path }}</small>
              </span>
            </div>
          </template>
        </FluentAutoSuggestBox>
      </div>
      <button v-else type="button" class="navigation-dock__collapsed-search" aria-label="展开搜索" title="展开搜索" @click="isCollapsed = false">
        <FluentIcon icon="search-20-regular" :width="20" />
      </button>

      <div class="navigation-dock__items">
        <template v-for="item in items" :key="item.id">
          <router-link
            v-if="!item.children?.length"
            :to="item.to"
            class="navigation-dock__item"
            :class="{ active: isItemActive(item) }"
            :title="localizedLabel(item)"
            @click="onPrimaryNavigate"
          >
            <FluentIcon v-if="item.icon" :icon="item.icon" :width="20" />
            <span v-if="!dockCollapsed" class="navigation-dock__label">{{ localizedLabel(item) }}</span>
          </router-link>
          <button
            v-else
            type="button"
            class="navigation-dock__item navigation-dock__parent"
            :class="{ active: isItemActive(item) }"
            :aria-expanded="activeSecondary === item.id"
            :title="localizedLabel(item)"
            @click="openSecondary(item)"
          >
            <FluentIcon v-if="item.icon" :icon="item.icon" :width="20" />
            <span v-if="!dockCollapsed" class="navigation-dock__label">{{ localizedLabel(item) }}</span>
            <FluentIcon icon="chevron-right-16-regular" :width="14" class="navigation-dock__chevron" />
          </button>
        </template>
      </div>
      <footer class="navigation-dock__footer">
        <button
          type="button"
          class="navigation-dock__item navigation-dock__theme-button"
          :title="themeMode === 'dark' ? '切换到浅色' : themeMode === 'light' ? '跟随系统' : '切换到深色'"
          :aria-label="themeMode === 'dark' ? '切换到浅色' : themeMode === 'light' ? '跟随系统' : '切换到深色'"
          @click="cycleTheme"
        >
          <FluentIcon :icon="themeMode === 'dark' ? 'weather-sunny-20-regular' : 'weather-moon-20-regular'" :width="20" />
          <span v-if="!dockCollapsed" class="navigation-dock__label">{{ themeModeLabel }}</span>
        </button>
        <button type="button" class="navigation-dock__item navigation-dock__language" :title="language === 'zh' ? '切换到 English' : 'Switch to 中文'" @click="toggleLanguage">
          <FluentIcon icon="globe-20-regular" :width="20" />
          <span v-if="!dockCollapsed" class="navigation-dock__label">{{ language === 'zh' ? '中文' : 'English' }}</span>
        </button>
      </footer>
    </section>

    <SecondarySidebarMenu
      :open="Boolean(activeSecondary)"
      :collapsed="dockCollapsed"
      :items="secondaryItems"
      navigate-on-open
       :back-label="language === 'zh' ? '返回主菜单' : 'Back to main menu'"
      :logo-src="asset('images/avatar.webp')"
      brand-title="Vue Fluent Widgets"
      @back="closeSecondary"
      @toggle-collapse="toggleDock"
      @navigate="onSecondaryNavigate"
    />
  </nav>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { FluentAutoSuggestBox, FluentIcon, SecondarySidebarMenu } from 'vue-fluent-widgets'

const props = defineProps({
  items: { type: Array, required: true },
  themeMode: { type: String, default: 'system' },
  language: { type: String, default: 'zh' }
})

const emit = defineEmits(['update:theme-mode', 'update:language'])

const route = useRoute()
const router = useRouter()
const asset = path => `${import.meta.env.BASE_URL}${path}`
const isCollapsed = ref(false)
const isMobile = ref(false)
const mobileOpen = ref(false)
const activeSecondary = ref(null)
const searchQuery = ref('')
const language = computed(() => props.language)
const dockCollapsed = computed(() => !isMobile.value && isCollapsed.value)
const themeModeLabel = computed(() => (language.value === 'en'
  ? ({ system: 'System', light: 'Light', dark: 'Dark' }[props.themeMode] || 'Theme')
  : ({ system: '跟随系统', light: '浅色', dark: '深色' }[props.themeMode] || '主题')))
let mobileQuery
const updateMobile = event => {
  isMobile.value = event.matches
  if (!event.matches) mobileOpen.value = false
}

const englishLabels = {
  home: 'Home',
  docs: 'Documentation',
  'getting-started': 'Getting started',
  components: 'Components',
  composition: 'Composition',
  playground: 'Playground',
  'basic-input': 'Basic input',
  layout: 'Layout',
  feedback: 'Feedback',
  navigation: 'Navigation',
  collections: 'Collections',
  scrolling: 'Scrolling',
  other: 'Other',
  advanced: 'Advanced',
  theming: 'Theming',
  animations: 'Animations',
  colors: 'Colors',
  material: 'Materials',
  typography: 'Typography',
  transitions: 'Transitions',
  gestures: 'Gestures',
  'control-primitives': 'Extended controls',
  'content-states': 'Content states',
  'interaction-patterns': 'Interactions'
}

const localizedLabel = item => {
  if (language.value === 'en') {
    return englishLabels[item.id] || item.label.match(/^([A-Za-z][A-Za-z0-9]*)\b/)?.[1] || item.label
  }
  const bilingual = item.label.match(/^([A-Za-z][A-Za-z0-9]*)\s+(.+)$/)
  if (bilingual) return `${bilingual[2]} ${bilingual[1]}`
  return englishLabels[item.id] ? `${item.label} ${englishLabels[item.id]}` : item.label
}

const localizeItems = items => items.map(item => ({
  ...item,
  label: localizedLabel(item),
  children: item.children ? localizeItems(item.children) : undefined
}))

const flattenSearchItems = (entries, parents = []) => entries.flatMap(item => {
  const nextParents = [...parents, localizedLabel(item)]
  const current = item.to ? [{
    ...item,
    label: localizedLabel(item),
    path: nextParents.slice(0, -1).join(' / ') || '首页'
  }] : []
  return [...current, ...(item.children ? flattenSearchItems(item.children, nextParents) : [])]
})

const searchItems = computed(() => flattenSearchItems(props.items))
const filterSearchItems = (query, suggestions) => {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return suggestions.slice(0, 12)
  return suggestions.filter(item => `${item.id} ${item.label} ${item.path}`.toLowerCase().includes(normalized)).slice(0, 12)
}

const cycleTheme = () => {
  const modes = ['system', 'light', 'dark']
  const next = modes[(modes.indexOf(props.themeMode) + 1) % modes.length]
  emit('update:theme-mode', next)
}

const navigateToSearchResult = item => {
  if (!item?.to) return
  searchQuery.value = ''
  router.push(item.to)
  onSecondaryNavigate()
}

const secondaryItems = computed(() => {
  const item = props.items.find(entry => entry.id === activeSecondary.value)
  return localizeItems(item?.children || [])
})

const containsRoute = (item, path) => {
  if (item.to && (path === item.to || path.startsWith(`${item.to}/`))) return true
  return item.children?.some(child => containsRoute(child, path)) || false
}

const isItemActive = item => containsRoute(item, route.path)
const menuForRoute = path => props.items.find(item => item.children?.length && containsRoute(item, path))?.id || null

const openSecondary = item => {
  activeSecondary.value = activeSecondary.value === item.id ? null : item.id
}

const closeSecondary = () => {
  activeSecondary.value = null
}

const closeNavigation = () => {
  closeSecondary()
  mobileOpen.value = false
}

const toggleDock = () => {
  if (isMobile.value) closeNavigation()
  else isCollapsed.value = !isCollapsed.value
}

const onPrimaryNavigate = () => {
  closeSecondary()
  if (isMobile.value) mobileOpen.value = false
}

const onSecondaryNavigate = () => {
  if (isMobile.value) mobileOpen.value = false
}

const toggleLanguage = () => {
  emit('update:language', language.value === 'zh' ? 'en' : 'zh')
}

watch(() => route.path, path => {
  activeSecondary.value = menuForRoute(path)
}, { immediate: true })

onMounted(() => {
  mobileQuery = window.matchMedia('(max-width: 768px)')
  updateMobile(mobileQuery)
  mobileQuery.addEventListener('change', updateMobile)
})

onUnmounted(() => mobileQuery?.removeEventListener('change', updateMobile))
</script>

<style scoped>
.navigation-dock__mobile-bar,
.navigation-dock__backdrop {
  display: none;
}

.navigation-dock {
  position: relative;
  z-index: 20;
  display: flex;
  flex: 0 0 var(--dock-width);
  width: var(--dock-width);
  height: 100%;
  overflow: hidden;
  border-right: 1px solid var(--border-subtle);
  background: var(--bg-acrylic);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: width var(--duration-normal) var(--ease-standard), flex-basis var(--duration-normal) var(--ease-standard);
}

.navigation-dock.collapsed {
  flex-basis: 56px;
  width: 56px;
}

.navigation-dock__primary {
  display: flex;
  flex: 1 0 100%;
  flex-direction: column;
  min-height: 0;
  transition: transform var(--duration-normal) var(--ease-standard);
}

.navigation-dock.secondary-open .navigation-dock__primary {
  pointer-events: none;
  transform: translateX(-100%);
}

.navigation-dock__header {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 52px;
  padding: 10px 12px;
  overflow: hidden;
  border-bottom: 1px solid var(--border-subtle);
}

.navigation-dock__search {
  position: relative;
  z-index: 8;
  padding: 8px 10px 4px;
}

.navigation-dock__collapsed-search {
  display: inline-flex;
  flex: 0 0 40px;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin: 4px 8px;
  padding: 0;
  border: 0;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
}

.navigation-dock__collapsed-search:hover {
  background: var(--bg-hover);
  color: var(--accent);
}

.navigation-dock__search :deep(.auto-suggest-input) {
  height: 34px;
  font-size: 12px;
}

.navigation-dock__search-result {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  min-width: 0;
  padding: 2px 0;
}

.navigation-dock__search-result > span {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 2px;
}

.navigation-dock__search-result strong {
  overflow: hidden;
  color: var(--text-primary);
  font-size: 12px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.navigation-dock__search-result small {
  overflow: hidden;
  color: var(--text-muted);
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.navigation-dock__toggle {
  display: inline-flex;
  flex: 0 0 32px;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  transition: background var(--duration-fast) ease, transform var(--duration-fast) ease;
}

.navigation-dock__back {
  display: inline-flex;
  flex: 0 0 32px;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  transition: background var(--duration-fast) ease, transform var(--duration-fast) ease;
}

.navigation-dock__back:hover { background: var(--bg-hover); color: var(--text-primary); }
.navigation-dock__back:active { transform: scale(.92); }

.navigation-dock__toggle:active { transform: scale(.92); }
.navigation-dock__toggle-icon { transition: transform var(--duration-normal) var(--ease-standard); }
.navigation-dock__toggle-icon.collapsed { transform: rotate(90deg); }

.navigation-dock__toggle:hover,
.navigation-dock__item:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.navigation-dock__title {
  flex: 1;
  overflow: hidden;
  color: var(--text-primary);
  font-size: 13px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.navigation-dock__logo {
  flex: 0 0 28px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
}

.navigation-dock__items {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2px;
  min-height: 0;
  padding: 8px 6px;
  overflow-x: hidden;
  overflow-y: auto;
}

.navigation-dock__item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 40px;
  padding: 9px 10px;
  overflow: hidden;
  border: 0;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--text-secondary);
  font: inherit;
  font-size: 13px;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  transition: background var(--duration-fast) ease, color var(--duration-fast) ease, transform var(--duration-fast) ease;
}

.navigation-dock__item.active {
  background: color-mix(in srgb, var(--accent), transparent 90%);
  color: var(--accent);
  font-weight: 600;
  transform: none;
}

.navigation-dock__item.active::before {
  position: absolute;
  left: 2px;
  top: 12px;
  width: 3px;
  height: 16px;
  border-radius: 2px;
  background: var(--accent);
  content: '';
  animation: dock-indicator-in var(--duration-normal) var(--ease-standard);
}

@keyframes dock-indicator-in {
  from { opacity: 0; transform: scaleY(.25); }
  to { opacity: 1; transform: scaleY(1); }
}

.navigation-dock__label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.navigation-dock__parent .navigation-dock__chevron {
  flex: 0 0 auto;
  margin-left: auto;
  color: var(--text-muted);
}

.navigation-dock__footer {
  flex: 0 0 auto;
  padding: 8px 6px;
  border-top: 1px solid var(--border-subtle);
}

.navigation-dock__theme-button,
.navigation-dock__language { margin: 0; }

.navigation-dock.collapsed .navigation-dock__item {
  justify-content: flex-start;
  width: 40px;
  min-width: 40px;
  max-width: 40px;
  padding: 9px 10px;
}

.navigation-dock.collapsed .navigation-dock__item.active::before {
  left: 0;
}

.navigation-dock.collapsed .navigation-dock__parent .navigation-dock__chevron {
  display: none;
}

@media (max-width: 768px) {
  .navigation-dock__mobile-bar {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 90;
    display: flex;
    align-items: center;
    gap: 8px;
    height: 56px;
    padding: 8px 12px;
    border-bottom: 1px solid var(--border-subtle);
    background: var(--bg-acrylic);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  .navigation-dock__mobile-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: 0;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--text-secondary);
  }

  .navigation-dock__mobile-logo { width: 30px; height: 30px; border-radius: 50%; object-fit: cover; }
  .navigation-dock__mobile-title { overflow: hidden; color: var(--text-primary); font-size: 14px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }

  .navigation-dock__backdrop {
    position: fixed;
    inset: 0;
    z-index: 95;
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
    background: rgba(0, 0, 0, .36);
  }

  .navigation-dock {
    position: fixed;
    inset: 0 auto 0 0;
    z-index: 100;
    width: min(320px, calc(100vw - 48px));
    height: 100dvh;
    box-shadow: var(--shadow-16);
    transform: translateX(-100%);
    transition: transform var(--duration-normal) var(--ease-standard);
  }

  .navigation-dock.mobile-open { transform: translateX(0); }
  .navigation-dock__primary { flex-basis: 100%; }
}

.dock-backdrop-enter-active,
.dock-backdrop-leave-active { transition: opacity var(--duration-fast) ease; }
.dock-backdrop-enter-from,
.dock-backdrop-leave-to { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .navigation-dock,
  .navigation-dock__primary,
  .navigation-dock__item {
    transition: none;
  }
}
</style>
