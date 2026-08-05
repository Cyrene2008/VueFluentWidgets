<template>
  <div class="fluent-split-button" :class="{ 'is-open': isOpen, 'is-disabled': disabled }">
    <button 
      class="split-button-main"
      :disabled="disabled"
      @click="onMainClick"
    >
      <slot>{{ label }}</slot>
    </button>
    <div class="split-button-separator"></div>
    <button 
      class="split-button-chevron"
      :disabled="disabled"
      @click="toggleFlyout"
    >
      <FluentIcon icon="chevron-down-20-regular" :width="12" />
    </button>
    
    <Transition name="dropdown">
      <div v-if="isOpen" class="split-button-flyout">
        <template v-for="(item, index) in items" :key="index">
          <div v-if="item.type === 'separator'" class="flyout-separator"></div>
          <button
            v-else
            class="flyout-item"
            :class="{ 'is-disabled': item.disabled }"
            :disabled="item.disabled"
            @click="onItemClick(item)"
          >
            <FluentIcon v-if="item.icon" :icon="item.icon" :width="16" />
            <span class="flyout-item-label">{{ item.label }}</span>
          </button>
        </template>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  label: { type: String, default: '' },
  items: { type: Array, default: () => [] },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['click', 'select'])

const isOpen = ref(false)

const onMainClick = () => {
  if (props.disabled) return
  emit('click')
}

const toggleFlyout = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
}

const onItemClick = (item) => {
  if (item.disabled) return
  isOpen.value = false
  emit('select', item)
  if (item.click) {
    item.click()
  }
}

const onClickOutside = (event) => {
  if (!event.target.closest('.fluent-split-button')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>

<style scoped>
.fluent-split-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 32px;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  overflow: visible;
}

.fluent-split-button.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.split-button-main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 16px;
  background: var(--bg-card-solid);
  border: none;
  border-radius: var(--radius-md) 0 0 var(--radius-md);
  color: var(--text-primary);
  font-size: 14px;
  font-family: var(--font-ui);
  cursor: pointer;
  transition: background 0.2s ease;
}

.split-button-main:hover {
  background: var(--bg-hover);
}

.split-button-separator {
  width: 1px;
  height: 16px;
  background: var(--border-strong);
}

.split-button-chevron {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 100%;
  background: var(--bg-card-solid);
  border: none;
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
  color: var(--text-primary);
  cursor: pointer;
  transition: background 0.2s ease;
}

.split-button-chevron:hover {
  background: var(--bg-hover);
}

.fluent-split-button.is-open .split-button-main,
.fluent-split-button.is-open .split-button-chevron {
  background: var(--bg-hover);
}

.split-button-flyout {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  margin-top: 4px;
  min-width: 100%;
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.14);
  padding: 4px 0;
}

.flyout-separator {
  height: 1px;
  background: var(--border-strong);
  margin: 4px 0;
}

.flyout-item {
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

.flyout-item:hover {
  background: var(--bg-hover);
}

.flyout-item:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.flyout-item.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.flyout-item-label {
  flex: 1;
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