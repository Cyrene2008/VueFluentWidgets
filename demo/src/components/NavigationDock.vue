<template>
  <nav
    class="navigation-dock"
    :class="{ collapsed: isCollapsed, 'secondary-open': Boolean(activeSecondary) }"
    @keydown.esc="closeSecondary"
  >
    <section class="navigation-dock__primary">
      <header class="navigation-dock__header">
        <button
          type="button"
          class="navigation-dock__toggle"
          :aria-label="isCollapsed ? '展开导航' : '收起导航'"
          :title="isCollapsed ? '展开导航' : '收起导航'"
          @click="isCollapsed = !isCollapsed"
        >
          <FluentIcon icon="line-horizontal-3-20-regular" :width="20" class="navigation-dock__toggle-icon" :class="{ collapsed: isCollapsed }" />
        </button>
        <button v-if="!isCollapsed" type="button" class="navigation-dock__back" aria-label="返回上一个页面" title="返回上一个页面" @click="router.back()">
          <FluentIcon icon="arrow-left-20-regular" :width="20" />
        </button>
        <img v-if="!isCollapsed" :src="asset('images/avatar.webp')" alt="" class="navigation-dock__logo" />
        <span v-if="!isCollapsed" class="navigation-dock__title">Vue Fluent Widgets</span>
      </header>

      <div class="navigation-dock__items">
        <template v-for="item in items" :key="item.id">
          <router-link
            v-if="!item.children?.length"
            :to="item.to"
            class="navigation-dock__item"
            :class="{ active: isItemActive(item) }"
            :title="localizedLabel(item)"
            @click="closeSecondary"
          >
            <FluentIcon v-if="item.icon" :icon="item.icon" :width="20" />
            <span v-if="!isCollapsed" class="navigation-dock__label">{{ localizedLabel(item) }}</span>
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
            <span v-if="!isCollapsed" class="navigation-dock__label">{{ localizedLabel(item) }}</span>
            <FluentIcon icon="chevron-right-16-regular" :width="14" class="navigation-dock__chevron" />
          </button>
        </template>
      </div>
      <footer class="navigation-dock__footer">
        <button type="button" class="navigation-dock__item navigation-dock__language" :title="language === 'zh' ? '切换到 English' : 'Switch to 中文'" @click="toggleLanguage">
          <FluentIcon icon="globe-20-regular" :width="20" />
          <span v-if="!isCollapsed" class="navigation-dock__label">{{ language === 'zh' ? '中文' : 'English' }}</span>
        </button>
      </footer>
    </section>

    <SecondarySidebarMenu
      :open="Boolean(activeSecondary)"
      :collapsed="isCollapsed"
      :items="secondaryItems"
      navigate-on-open
      :back-label="language === 'zh' ? '返回一级菜单' : 'Back to main menu'"
      @back="closeSecondary"
      @toggle-collapse="isCollapsed = false"
    />
  </nav>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { FluentIcon, SecondarySidebarMenu } from 'vue-fluent-widgets'

const props = defineProps({
  items: { type: Array, required: true }
})

const route = useRoute()
const router = useRouter()
const asset = path => `${import.meta.env.BASE_URL}${path}`
const isCollapsed = ref(false)
const activeSecondary = ref(null)
const language = ref(localStorage.getItem('demo-language') === 'en' ? 'en' : 'zh')

const englishLabels = {
  home: 'Home',
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
  gestures: 'Gestures'
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

const toggleLanguage = () => {
  language.value = language.value === 'zh' ? 'en' : 'zh'
  localStorage.setItem('demo-language', language.value)
}

watch(() => route.path, path => {
  activeSecondary.value = menuForRoute(path)
}, { immediate: true })
</script>

<style scoped>
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
  .navigation-dock {
    flex-basis: 56px;
    width: 56px;
  }

  .navigation-dock:not(.collapsed) {
    flex-basis: var(--dock-width);
    width: var(--dock-width);
  }
}

@media (prefers-reduced-motion: reduce) {
  .navigation-dock,
  .navigation-dock__primary,
  .navigation-dock__item {
    transition: none;
  }
}
</style>
