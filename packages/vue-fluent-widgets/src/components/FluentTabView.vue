<template>
  <div class="fluent-tab-view" :class="{ 'is-vertical': vertical }">
    <div class="tab-view-tabs" :class="{ 'is-scrollable': isScrollable }">
      <button 
        v-if="isScrollable" 
        class="scroll-button left"
        :disabled="scrollPosition <= 0"
        @click="scrollLeft"
      >
        <FluentIcon icon="chevron-left-20-regular" :width="16" />
      </button>
      
      <div class="tabs-container" ref="tabsContainerRef" @scroll="onScroll">
        <div class="tabs-track" :style="trackStyle">
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            class="tab-item"
            :class="{ 'is-active': activeIndex === index, 'is-disabled': tab.disabled }"
            @click="selectTab(index)"
          >
            <FluentIcon v-if="tab.icon" :icon="tab.icon" :width="16" />
            <span class="tab-label">{{ tab.label }}</span>
            <button 
              v-if="closable" 
              class="tab-close"
              @click.stop="closeTab(index)"
            >
              <FluentIcon icon="dismiss-16-regular" :width="12" />
            </button>
          </button>
        </div>
      </div>
      
      <button 
        v-if="isScrollable" 
        class="scroll-button right"
        :disabled="scrollPosition >= maxScroll"
        @click="scrollRight"
      >
        <FluentIcon icon="chevron-right-20-regular" :width="16" />
      </button>
    </div>
    
    <div class="tab-view-content">
      <slot :active-index="activeIndex"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  tabs: { type: Array, required: true },
  modelValue: { type: Number, default: 0 },
  vertical: { type: Boolean, default: false },
  closable: { type: Boolean, default: false },
  scrollable: { type: Boolean, default: true }
})

const emit = defineEmits(['update:modelValue', 'change', 'close'])

const tabsContainerRef = ref(null)
const scrollPosition = ref(0)
const maxScroll = ref(0)

const activeIndex = computed(() => props.modelValue)

const trackStyle = computed(() => {
  if (!props.vertical) {
    return {
      transform: `translateX(-${scrollPosition.value}px)`
    }
  }
  return {}
})

const isScrollable = computed(() => {
  return props.scrollable && !props.vertical
})

const selectTab = (index) => {
  if (props.tabs[index]?.disabled) return
  emit('update:modelValue', index)
  emit('change', index)
}

const closeTab = (index) => {
  emit('close', index)
}

const scrollLeft = () => {
  scrollPosition.value = Math.max(0, scrollPosition.value - 200)
}

const scrollRight = () => {
  scrollPosition.value = Math.min(maxScroll.value, scrollPosition.value + 200)
}

const onScroll = () => {
  if (tabsContainerRef.value) {
    scrollPosition.value = tabsContainerRef.value.scrollLeft
  }
}

watch(() => props.modelValue, () => {
  // 确保选中的标签可见
  if (tabsContainerRef.value) {
    const activeTab = tabsContainerRef.value.querySelector('.tab-item.is-active')
    if (activeTab) {
      activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }
})
</script>

<style scoped>
.fluent-tab-view {
  display: flex;
  flex-direction: column;
}

.fluent-tab-view.is-vertical {
  flex-direction: row;
}

.tab-view-tabs {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-strong);
  background: var(--bg-card);
}

.is-vertical .tab-view-tabs {
  flex-direction: column;
  border-bottom: none;
  border-right: 1px solid var(--border-strong);
  width: 200px;
  flex-shrink: 0;
}

.scroll-button {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: background 0.2s ease;
}

.scroll-button:hover {
  background: var(--bg-hover);
}

.scroll-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.tabs-container {
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.tabs-container::-webkit-scrollbar {
  display: none;
}

.tabs-track {
  display: flex;
  min-width: max-content;
}

.is-vertical .tabs-track {
  flex-direction: column;
  min-width: auto;
}

.tab-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--text-secondary);
  font-size: 14px;
  font-family: var(--font-ui);
  cursor: pointer;
  transition: color 0.2s ease, border-color 0.2s ease;
  white-space: nowrap;
}

.tab-item:hover {
  color: var(--text-primary);
}

.tab-item.is-active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.tab-item.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.is-vertical .tab-item {
  border-bottom: none;
  border-right: 2px solid transparent;
}

.is-vertical .tab-item.is-active {
  border-right-color: var(--accent);
}

.tab-label {
  font-weight: 500;
}

.tab-close {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 50%;
  color: var(--text-muted);
  cursor: pointer;
  transition: background 0.2s ease;
}

.tab-close:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.tab-view-content {
  flex: 1;
  padding: 16px;
  overflow: auto;
}
</style>