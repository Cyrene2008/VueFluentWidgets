<template>
  <div class="fluent-navigation-view" :class="{ 'is-expanded': isExpanded, 'is-compact': isCompact }">
    <nav class="navigation-view-pane">
      <div class="pane-header">
        <button v-if="showToggleButton" class="pane-toggle-button" @click="togglePane">
          <FluentIcon icon="global-nav-button-20-regular" :width="20" />
        </button>
        <div v-if="paneTitle" class="pane-title">{{ paneTitle }}</div>
      </div>
      
      <div class="pane-content">
        <div v-if="showSearchBox" class="pane-search">
          <FluentInput placeholder="搜索" />
        </div>
        
        <div class="pane-menu">
          <template v-for="item in menuItems" :key="item.id">
            <div v-if="item.type === 'separator'" class="menu-separator"></div>
            <div v-else-if="item.type === 'header'" class="menu-header">{{ item.label }}</div>
            <div v-else class="menu-item-wrapper">
              <router-link
                :to="item.to"
                class="menu-item"
                :class="{ 'is-selected': selectedItem === item.id, 'is-disabled': item.disabled }"
                @click="selectItem(item)"
              >
                <FluentIcon v-if="item.icon" :icon="item.icon" :width="20" />
                <span class="menu-item-label">{{ item.label }}</span>
                <span v-if="item.badge" class="menu-item-badge">{{ item.badge }}</span>
              </router-link>
              <div v-if="item.children && expandedItems.includes(item.id)" class="menu-children">
                <router-link
                  v-for="child in item.children"
                  :key="child.id"
                  :to="child.to"
                  class="menu-item menu-child-item"
                  :class="{ 'is-selected': selectedItem === child.id, 'is-disabled': child.disabled }"
                  @click="selectItem(child)"
                >
                  <FluentIcon v-if="child.icon" :icon="child.icon" :width="20" />
                  <span class="menu-item-label">{{ child.label }}</span>
                </router-link>
              </div>
            </div>
          </template>
        </div>
        
        <div class="pane-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </nav>
    
    <main class="navigation-view-content">
      <slot></slot>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import FluentIcon from './FluentIcon.vue'
import FluentInput from './FluentInput.vue'

const props = defineProps({
  menuItems: { type: Array, required: true },
  paneTitle: { type: String, default: '' },
  showToggleButton: { type: Boolean, default: true },
  showSearchBox: { type: Boolean, default: false },
  defaultSelectedItem: { type: String, default: '' },
  compactMode: { type: Boolean, default: false }
})

const emit = defineEmits(['item-selected', 'pane-toggle'])

const route = useRoute()
const isExpanded = ref(!props.compactMode)
const isCompact = ref(props.compactMode)
const selectedItem = ref(props.defaultSelectedItem)
const expandedItems = ref([])

watch(() => route.path, (path) => {
  const item = findItemByPath(path)
  if (item) {
    selectedItem.value = item.id
    if (item.parent) {
      expandedItems.value = [...expandedItems.value, item.parent]
    }
  }
}, { immediate: true })

const findItemByPath = (path) => {
  for (const item of props.menuItems) {
    if (item.to === path) return item
    if (item.children) {
      for (const child of item.children) {
        if (child.to === path) return { ...child, parent: item.id }
      }
    }
  }
  return null
}

const selectItem = (item) => {
  selectedItem.value = item.id
  emit('item-selected', item)
}

const togglePane = () => {
  isExpanded.value = !isExpanded.value
  emit('pane-toggle', isExpanded.value)
}

const toggleItemExpand = (itemId) => {
  const index = expandedItems.value.indexOf(itemId)
  if (index > -1) {
    expandedItems.value.splice(index, 1)
  } else {
    expandedItems.value.push(itemId)
  }
}
</script>

<style scoped>
.fluent-navigation-view {
  display: flex;
  height: 100%;
  min-height: 100vh;
}

.navigation-view-pane {
  width: 280px;
  background: var(--bg-card);
  border-right: 1px solid var(--border-strong);
  display: flex;
  flex-direction: column;
  transition: width 0.2s ease;
}

.fluent-navigation-view.is-compact .navigation-view-pane {
  width: 48px;
}

.fluent-navigation-view.is-expanded .navigation-view-pane {
  width: 280px;
}

.pane-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-strong);
}

.pane-toggle-button {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  color: var(--text-primary);
  cursor: pointer;
  transition: background 0.2s ease;
}

.pane-toggle-button:hover {
  background: var(--bg-hover);
}

.pane-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pane-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.pane-search {
  padding: 8px 12px;
  border-bottom: 1px solid var(--border-strong);
}

.pane-menu {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.menu-separator {
  height: 1px;
  background: var(--border-strong);
  margin: 4px 12px;
}

.menu-header {
  padding: 8px 16px 4px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.menu-item-wrapper {
  display: flex;
  flex-direction: column;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  margin: 2px 8px;
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--text-primary);
  font-size: 14px;
  transition: background 0.2s ease, color 0.2s ease;
}

.menu-item:hover {
  background: var(--bg-hover);
}

.menu-item.is-selected {
  background: var(--accent);
  color: var(--text-on-accent);
}

.menu-item.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.menu-child-item {
  padding-left: 52px;
}

.menu-item-label {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.menu-item-badge {
  padding: 2px 6px;
  background: var(--accent);
  color: var(--text-on-accent);
  border-radius: 10px;
  font-size: 12px;
  font-weight: 600;
}

.menu-children {
  display: flex;
  flex-direction: column;
}

.pane-footer {
  padding: 8px 12px;
  border-top: 1px solid var(--border-strong);
}

.navigation-view-content {
  flex: 1;
  overflow: auto;
}
</style>