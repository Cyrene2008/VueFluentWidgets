<template>
  <aside
    ref="menuRef"
    class="secondary-sidebar-menu"
    :class="{
      'is-visible': panelVisible,
      'is-interactive': open,
      'is-collapsed': collapsed
    }"
    :aria-hidden="!open"
    @keydown.esc="goBack"
  >
    <header class="secondary-sidebar-menu__header">
      <button type="button" class="secondary-sidebar-menu__back secondary-sidebar-menu__hamburger" aria-label="折叠或展开导航" title="折叠或展开导航" @click="emit('toggle-collapse')">
        <FluentIcon icon="line-horizontal-3-20-regular" :width="18" />
      </button>
      <button type="button" class="secondary-sidebar-menu__back secondary-sidebar-menu__history-back" aria-label="返回上一个页面" title="返回上一个页面" @click="goBackWithinApp">
        <FluentIcon icon="arrow-left-20-regular" :width="18" />
      </button>
      <div class="secondary-sidebar-menu__brand">
        <img v-if="logoSrc && !collapsed" :src="logoSrc" alt="" />
        <span v-if="!collapsed">{{ brandTitle }}</span>
      </div>
    </header>
    <button type="button" class="secondary-sidebar-menu__back secondary-sidebar-menu__main-back" :aria-label="backLabel" :title="backLabel" @click="goBack">
      <FluentIcon icon="panel-left-20-regular" :width="18" />
      <span class="secondary-sidebar-menu__back-label">{{ backLabel }}</span>
    </button>

    <nav class="secondary-sidebar-menu__list">
      <template v-for="item in items" :key="item.id">
        <div v-if="item.children && item.children.length > 0" class="secondary-sidebar-menu__group">
          <button
            class="secondary-sidebar-menu__item secondary-sidebar-menu__parent"
            :class="{ active: isItemActive(item), expanded: isGroupExpanded(item.id) }"
            @click="toggleGroup(item.id)"
          >
            <FluentIcon v-if="item.icon" :icon="item.icon" :width="18" />
            <span class="secondary-sidebar-menu__item-label">{{ item.label }}</span>
            <FluentIcon 
              icon="chevron-down-20-regular" 
              :width="16" 
              class="secondary-sidebar-menu__chevron"
              :class="{ rotated: isGroupExpanded(item.id) }"
            />
          </button>
          <Transition name="expand">
            <div v-if="isGroupExpanded(item.id)" class="secondary-sidebar-menu__children">
              <template v-for="child in item.children" :key="child.id">
                <div v-if="child.children && child.children.length > 0" class="secondary-sidebar-menu__group">
                  <button
                    class="secondary-sidebar-menu__item secondary-sidebar-menu__parent"
                    :class="{ active: isItemActive(child), expanded: isGroupExpanded(child.id) }"
                    @click="toggleGroup(child.id)"
                  >
                    <FluentIcon v-if="child.icon" :icon="child.icon" :width="18" />
                    <span class="secondary-sidebar-menu__item-label">{{ child.label }}</span>
                    <FluentIcon 
                      icon="chevron-down-20-regular" 
                      :width="16" 
                      class="secondary-sidebar-menu__chevron"
                      :class="{ rotated: isGroupExpanded(child.id) }"
                    />
                  </button>
                  <Transition name="expand">
                    <div v-if="isGroupExpanded(child.id)" class="secondary-sidebar-menu__children">
                      <template v-for="grandchild in child.children" :key="grandchild.id">
                        <router-link
                          :to="grandchild.to"
                          class="secondary-sidebar-menu__item"
                          :class="{ active: isItemActive(grandchild), disabled: grandchild.disabled }"
                          :aria-disabled="grandchild.disabled || undefined"
                          @click="onItemClick($event, grandchild)"
                        >
                          <FluentIcon v-if="grandchild.icon" :icon="grandchild.icon" :width="18" />
                          <span class="secondary-sidebar-menu__item-label">{{ grandchild.label }}</span>
                        </router-link>
                      </template>
                    </div>
                  </Transition>
                </div>
                <router-link
                  v-else
                   :to="child.to"
                   class="secondary-sidebar-menu__item"
                   :class="{ active: isItemActive(child), disabled: child.disabled }"
                   :aria-disabled="child.disabled || undefined"
                   @click="onItemClick($event, child)"
                >
                  <FluentIcon v-if="child.icon" :icon="child.icon" :width="18" />
                  <span class="secondary-sidebar-menu__item-label">{{ child.label }}</span>
                </router-link>
              </template>
            </div>
          </Transition>
        </div>
        <router-link
          v-else
          :to="item.to"
          class="secondary-sidebar-menu__item"
          :class="{ active: isItemActive(item), disabled: item.disabled }"
          :aria-disabled="item.disabled || undefined"
          @click="onItemClick($event, item)"
        >
          <FluentIcon v-if="item.icon" :icon="item.icon" :width="18" />
          <span class="secondary-sidebar-menu__item-label">{{ item.label }}</span>
        </router-link>
      </template>
    </nav>
  </aside>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  collapsed: { type: Boolean, default: false },
  items: { type: Array, required: true },
  backLabel: { type: String, default: 'Back' },
  initialRoute: { type: [String, Object], default: null },
  navigateOnOpen: { type: Boolean, default: false },
  logoSrc: { type: String, default: '' },
  brandTitle: { type: String, default: 'Vue Fluent Widgets' }
})

const emit = defineEmits(['back', 'toggle-collapse', 'navigate'])
const route = useRoute()
const router = useRouter()
const menuRef = ref(null)
const panelVisible = ref(props.open)
const expandedGroups = ref(new Set())

const goBackWithinApp = () => {
  const previous = window.history.state?.back
  if (typeof previous === 'string' && previous.startsWith('/')) router.back()
  else router.push('/')
}

const routePath = target => target ? router.resolve(target).path : ''

const isRouteMatchingItem = (path, item) => {
  if (!item.to) return false
  const itemPath = routePath(item.to)
  return path === itemPath
    || path.startsWith(`${itemPath}/`)
    || (itemPath === '/docs/components' && path.startsWith('/docs/component/'))
}

const findItemByRoute = (path, items = props.items) => {
  for (const item of items) {
    if (isRouteMatchingItem(path, item)) return item
    if (item.children) {
      const found = findItemByRoute(path, item.children)
      if (found) return found
    }
  }
  return null
}

const isItemActive = (item) => {
  const currentPath = route.path
  if (isRouteMatchingItem(currentPath, item)) return true
  return item.children?.some(child => isItemActive(child)) || false
}

const isGroupExpanded = (groupId) => {
  return expandedGroups.value.has(groupId)
}

const toggleGroup = (groupId) => {
  if (expandedGroups.value.has(groupId)) {
    expandedGroups.value.delete(groupId)
  } else {
    expandedGroups.value.add(groupId)
  }
}

const onItemClick = (event, item) => {
  if (item.disabled) event.preventDefault()
  else emit('navigate', item)
}

const firstNavigableItem = (items) => {
  for (const item of items) {
    if (item.disabled) continue
    if (item.to) return item
    if (item.children) {
      const nested = firstNavigableItem(item.children)
      if (nested) return nested
    }
  }
  return null
}

const initialItem = () => {
  const requested = routePath(props.initialRoute)
  const requestedItem = requested && findItemByRoute(requested)
  return requestedItem || findItemByRoute(route.path) || firstNavigableItem(props.items)
}

const expandParentsOfActiveItem = () => {
  const expandParents = (items, parents = []) => {
    for (const item of items) {
      if (item.to && isItemActive(item)) {
        parents.forEach(parentId => expandedGroups.value.add(parentId))
        return true
      }
      if (item.children) {
        if (expandParents(item.children, [...parents, item.id])) {
          return true
        }
      }
    }
    return false
  }
  expandParents(props.items)
}

const goBack = () => {
  emit('back')
}

watch(() => props.open, async (open) => {
  panelVisible.value = open
  if (open) {
    expandParentsOfActiveItem()
    if (props.navigateOnOpen) {
      const target = initialItem()
      if (target && !isRouteMatchingItem(route.path, target)) await router.push(target.to)
    }
  }
}, { immediate: true })

watch(() => route.path, () => {
  expandParentsOfActiveItem()
})
</script>

<style scoped>
.secondary-sidebar-menu {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 4px;
  overflow: hidden;
  background: var(--bg-acrylic);
  visibility: hidden;
  pointer-events: none;
  transform: translateX(100%);
  transition: transform 0.26s ease-in-out, visibility 0.26s;
}

.secondary-sidebar-menu.is-visible {
  visibility: visible;
  transform: translateX(0);
}

.secondary-sidebar-menu.is-interactive {
  pointer-events: auto;
}

.secondary-sidebar-menu__header {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 0 0 auto;
  padding: 0 0 4px;
  border-bottom: 1px solid var(--border-subtle);
}

.secondary-sidebar-menu__brand { display: flex; min-width: 0; align-items: center; gap: 8px; color: var(--text-primary); font-size: 13px; font-weight: 600; }
.secondary-sidebar-menu__brand img { width: 28px; height: 28px; border-radius: 50%; object-fit: cover; }
.secondary-sidebar-menu__back {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 36px;
  justify-content: center;
  width: 36px;
  min-height: 36px;
  padding: 6px 8px;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--text-secondary);
  font: inherit;
  cursor: pointer;
}

.secondary-sidebar-menu__back.secondary-sidebar-menu__main-back {
  flex: 0 0 36px;
  justify-content: flex-start;
  width: 100%;
  max-width: 100%;
  margin: 4px 0 0;
}

.secondary-sidebar-menu__back:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.secondary-sidebar-menu__back-label {
  white-space: nowrap;
}

.secondary-sidebar-menu__list {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
  min-height: 0;
  padding: 6px 0;
  overflow-x: hidden;
  overflow-y: auto;
}

.secondary-sidebar-menu__group {
  display: flex;
  flex-direction: column;
}

.secondary-sidebar-menu__item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  min-height: 40px;
  padding: 9px 10px;
  border: 0;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--text-secondary);
  font: inherit;
  font-size: 13px;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
}

.secondary-sidebar-menu__item:hover {
  background: var(--bg-hover);
  color: var(--accent);
}

.secondary-sidebar-menu__item.active {
  background: color-mix(in srgb, var(--accent), transparent 90%);
  color: var(--accent);
  font-weight: 600;
}

.secondary-sidebar-menu__item.active::before {
  position: absolute;
  left: 0;
  top: 12px;
  width: 3px;
  height: 16px;
  border-radius: 2px;
  background: var(--accent);
  content: '';
  animation: secondary-indicator-in var(--duration-normal) var(--ease-standard);
}

@keyframes secondary-indicator-in {
  from { opacity: 0; transform: scaleY(.25); }
  to { opacity: 1; transform: scaleY(1); }
}

.secondary-sidebar-menu__item.disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: default;
}

.secondary-sidebar-menu__parent {
  justify-content: space-between;
}

.secondary-sidebar-menu__chevron {
  transition: transform 0.2s ease;
  margin-left: auto;
}

.secondary-sidebar-menu__chevron.rotated {
  transform: rotate(180deg);
}

.secondary-sidebar-menu__children {
  padding-left: 20px;
  overflow: hidden;
}

.secondary-sidebar-menu__item-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.secondary-sidebar-menu.is-collapsed .secondary-sidebar-menu__back-label,
.secondary-sidebar-menu.is-collapsed .secondary-sidebar-menu__item-label {
  display: none;
}

.secondary-sidebar-menu.is-collapsed .secondary-sidebar-menu__brand span { display: none; }

.secondary-sidebar-menu.is-collapsed .secondary-sidebar-menu__chevron {
  display: none;
}

.secondary-sidebar-menu.is-collapsed .secondary-sidebar-menu__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-inline: 2px;
}

.secondary-sidebar-menu.is-collapsed .secondary-sidebar-menu__back,
.secondary-sidebar-menu.is-collapsed .secondary-sidebar-menu__item,
.secondary-sidebar-menu.is-collapsed .secondary-sidebar-menu__group {
  width: 40px;
  min-width: 40px;
  max-width: 40px;
}

.secondary-sidebar-menu.is-collapsed .secondary-sidebar-menu__back,
.secondary-sidebar-menu.is-collapsed .secondary-sidebar-menu__item {
  justify-content: flex-start;
  padding-inline: 10px;
}

.secondary-sidebar-menu.is-collapsed .secondary-sidebar-menu__children {
  padding-left: 0;
}

/* Expand/Collapse transitions */
.expand-enter-active {
  transition: all 0.2s ease;
  max-height: 500px;
  opacity: 1;
}

.expand-leave-active {
  transition: all 0.2s ease;
  max-height: 500px;
  opacity: 1;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}

@media (prefers-reduced-motion: reduce) {
  .secondary-sidebar-menu {
    transition: none;
  }
  
  .secondary-sidebar-menu__item {
    transition: none;
  }
  
  .secondary-sidebar-menu__chevron {
    transition: none;
  }
  
  .expand-enter-active,
  .expand-leave-active {
    transition: none;
  }
}
</style>
