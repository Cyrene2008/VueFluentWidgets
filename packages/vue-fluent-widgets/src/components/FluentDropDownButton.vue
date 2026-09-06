<template>
  <div ref="containerRef" class="fluent-dropdown-button" :class="{ 'is-open': isOpen, 'is-disabled': disabled }">
    <button 
      class="dropdown-button-main"
      :disabled="disabled"
      @click="toggle"
    >
      <slot>{{ label }}</slot>
      <FluentIcon icon="chevron-down-20-regular" :width="12" class="dropdown-chevron" />
    </button>
    
    <Teleport to="body">
    <Transition name="dropdown" @after-enter="updatePosition">
      <div v-if="isOpen" ref="dropdownRef" class="dropdown-flyout" :style="dropdownStyle">
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
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  label: { type: String, default: '' },
  items: { type: Array, default: () => [] },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['select'])

const isOpen = ref(false)
const containerRef = ref(null)
const dropdownRef = ref(null)
const dropdownStyle = ref({ top: '-10000px', left: '-10000px' })

const toggle = () => {
  if (props.disabled) return
  if (isOpen.value) {
    isOpen.value = false
    return
  }
  setEstimatedPosition()
  isOpen.value = true
  nextTick(() => requestAnimationFrame(updatePosition))
}

const setEstimatedPosition = () => {
  const trigger = containerRef.value?.getBoundingClientRect()
  if (!trigger) return
  const margin = 8
  const height = Math.min(260, window.innerHeight - margin * 2)
  const top = window.innerHeight - trigger.bottom - margin >= height ? trigger.bottom + 4 : Math.max(margin, trigger.top - height - 4)
  dropdownStyle.value = { position: 'fixed', top: `${top}px`, left: `${Math.max(margin, trigger.left)}px`, minWidth: `${trigger.width}px`, zIndex: 100000 }
}

const updatePosition = () => {
  const trigger = containerRef.value?.getBoundingClientRect()
  const dropdown = dropdownRef.value
  if (!trigger || !dropdown) return
  const margin = 8
  const width = Math.min(dropdown.offsetWidth, window.innerWidth - margin * 2)
  const height = dropdown.offsetHeight
  const top = window.innerHeight - trigger.bottom - margin >= height ? trigger.bottom + 4 : Math.max(margin, trigger.top - height - 4)
  const left = Math.max(margin, Math.min(trigger.left, window.innerWidth - width - margin))
  dropdownStyle.value = { position: 'fixed', top: `${top}px`, left: `${left}px`, minWidth: `${Math.min(trigger.width, width)}px`, zIndex: 100000 }
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
  if (!containerRef.value?.contains(event.target) && !dropdownRef.value?.contains(event.target)) isOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  window.addEventListener('resize', updatePosition)
  window.addEventListener('scroll', updatePosition, true)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  window.removeEventListener('resize', updatePosition)
  window.removeEventListener('scroll', updatePosition, true)
})
</script>

<style scoped>
.fluent-dropdown-button {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.fluent-dropdown-button.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.dropdown-button-main {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 32px;
  padding: 0 16px;
  background: var(--bg-card-solid);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 14px;
  font-family: var(--font-ui);
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.dropdown-button-main:hover {
  background: var(--bg-hover);
  border-color: var(--text-muted);
}

.fluent-dropdown-button.is-open .dropdown-button-main {
  background: var(--bg-hover);
  border-color: var(--accent);
}

.dropdown-chevron {
  transition: transform 0.2s ease;
}

.fluent-dropdown-button.is-open .dropdown-chevron {
  transform: rotate(180deg);
}

.dropdown-flyout {
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
