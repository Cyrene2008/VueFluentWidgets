<template>
  <div class="fluent-float-button" :class="[`position-${position}`, { 'is-expanded': isExpanded }]">
    <Transition name="menu">
      <div v-if="isExpanded && menuItems.length" class="float-button-menu">
        <button
          v-for="(item, index) in menuItems"
          :key="index"
          class="menu-item"
          @click="onMenuItemClick(item)"
        >
          <FluentIcon v-if="item.icon" :icon="item.icon" :width="20" />
          <span v-if="item.label" class="menu-item-label">{{ item.label }}</span>
        </button>
      </div>
    </Transition>
    
    <button 
      class="float-button-main"
      @click="onClick"
      :aria-label="ariaLabel"
    >
      <FluentIcon :icon="icon" :width="24" />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  icon: { type: String, default: 'add-20-regular' },
  position: { type: String, default: 'bottom-right' }, // bottom-right, bottom-left, top-right, top-left
  menuItems: { type: Array, default: () => [] },
  ariaLabel: { type: String, default: '浮动操作按钮' }
})

const emit = defineEmits(['click', 'menu-click'])

const isExpanded = ref(false)

const onClick = () => {
  if (props.menuItems.length) {
    isExpanded.value = !isExpanded.value
  } else {
    emit('click')
  }
}

const onMenuItemClick = (item) => {
  isExpanded.value = false
  emit('menu-click', item)
  if (item.click) {
    item.click()
  }
}
</script>

<style scoped>
.fluent-float-button {
  position: fixed;
  z-index: 100;
}

.position-bottom-right {
  bottom: 24px;
  right: 24px;
}

.position-bottom-left {
  bottom: 24px;
  left: 24px;
}

.position-top-right {
  top: 24px;
  right: 24px;
}

.position-top-left {
  top: 24px;
  left: 24px;
}

.float-button-main {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent);
  color: var(--text-on-accent);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.float-button-main:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
}

.is-expanded .float-button-main {
  transform: rotate(45deg);
}

.float-button-menu {
  position: absolute;
  bottom: 100%;
  right: 0;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--bg-card);
  border: none;
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: background 0.2s ease;
  white-space: nowrap;
}

.menu-item:hover {
  background: var(--bg-hover);
}

.menu-item-label {
  font-size: 14px;
}

.menu-enter-active {
  transition: all 0.2s ease;
}

.menu-leave-active {
  transition: all 0.15s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>