<template>
  <nav class="fluent-menu-bar" role="menubar">
    <div 
      v-for="(item, index) in items" 
      :key="index"
      class="menu-bar-item"
      :class="{ 'is-open': openIndex === index, 'is-disabled': item.disabled }"
    >
      <button
        class="menu-bar-button"
        type="button"
        role="menuitem"
        :aria-haspopup="item.children && item.children.length > 0"
        :aria-expanded="openIndex === index"
        :disabled="item.disabled"
        @click="toggleMenu(index)"
        @mouseenter="onItemHover(index)"
      >
        <FluentIcon v-if="item.icon" :icon="item.icon" :width="16" />
        <span class="menu-bar-label">{{ item.label }}</span>
      </button>
      
      <Transition name="dropdown">
        <div v-if="openIndex === index && item.children && item.children.length > 0" class="menu-bar-dropdown">
          <template v-for="(child, childIndex) in item.children" :key="childIndex">
            <div v-if="child.type === 'separator'" class="menu-separator"></div>
            <button
              v-else
              class="menu-item"
              :class="{ 'is-disabled': child.disabled }"
              :disabled="child.disabled"
              @click="onItemClick(child)"
            >
              <FluentIcon v-if="child.icon" :icon="child.icon" :width="16" />
              <span class="menu-item-label">{{ child.label }}</span>
              <span v-if="child.shortcut" class="menu-item-shortcut">{{ child.shortcut }}</span>
            </button>
          </template>
        </div>
      </Transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  items: { type: Array, required: true }
})

const emit = defineEmits(['item-click'])

const openIndex = ref(null)
let closeTimer = null

const toggleMenu = (index) => {
  if (openIndex.value === index) {
    openIndex.value = null
  } else {
    openIndex.value = index
  }
}

const onItemHover = (index) => {
  if (openIndex.value !== null) {
    openIndex.value = index
  }
}

const onItemClick = (item) => {
  if (item.disabled) return
  openIndex.value = null
  emit('item-click', item)
}

const closeMenu = () => {
  openIndex.value = null
}

const onClickOutside = (event) => {
  if (!event.target.closest('.fluent-menu-bar')) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  if (closeTimer) {
    clearTimeout(closeTimer)
  }
})
</script>

<style scoped>
.fluent-menu-bar {
  display: flex;
  align-items: center;
  height: 48px;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-strong);
  padding: 0 8px;
}

.menu-bar-item {
  position: relative;
}

.menu-bar-button {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 48px;
  padding: 0 12px;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 14px;
  font-family: var(--font-ui);
  cursor: pointer;
  transition: background 0.2s ease;
}

.menu-bar-button:hover {
  background: var(--bg-hover);
}

.menu-bar-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.menu-bar-item.is-open .menu-bar-button {
  background: var(--bg-card);
}

.menu-bar-label {
  white-space: nowrap;
}

.menu-bar-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  min-width: 200px;
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.14);
  padding: 4px 0;
}

.menu-separator {
  height: 1px;
  background: var(--border-strong);
  margin: 4px 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 8px 12px;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 14px;
  font-family: var(--font-ui);
  cursor: pointer;
  transition: background 0.2s ease;
  text-align: left;
}

.menu-item:hover {
  background: var(--bg-hover);
}

.menu-item:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.menu-item-label {
  flex: 1;
}

.menu-item-shortcut {
  font-size: 12px;
  color: var(--text-muted);
  margin-left: 24px;
}

.dropdown-enter-active {
  transition: all 0.2s ease;
}

.dropdown-leave-active {
  transition: all 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>