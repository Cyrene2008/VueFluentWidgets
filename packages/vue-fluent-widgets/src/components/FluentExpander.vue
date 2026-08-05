<template>
  <div 
    class="fluent-expander" 
    :class="{ 'is-expanded': isExpanded, 'expand-up': expandUp }"
  >
    <button 
      class="expander-header" 
      @click="toggle"
      :aria-expanded="isExpanded"
      type="button"
    >
      <div class="expander-header-main">
        <span v-if="icon" class="expander-header-icon">
          <FluentIcon :icon="icon" :width="16" />
        </span>
        <div class="expander-header-content">
          <div class="expander-header-text">{{ header }}</div>
          <div v-if="description" class="expander-description">{{ description }}</div>
        </div>
      </div>
      <span class="expander-chevron">
        <FluentIcon icon="chevron-down-20-regular" :width="16" />
      </span>
    </button>
    <Transition name="expand">
      <div v-if="isExpanded" class="expander-content">
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  header: { type: String, required: true },
  description: { type: String, default: '' },
  icon: { type: String, default: '' },
  expandUp: { type: Boolean, default: false },
  modelValue: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'expand', 'collapse'])

const isExpanded = ref(props.modelValue)

watch(() => props.modelValue, (value) => {
  isExpanded.value = value
})

const toggle = () => {
  isExpanded.value = !isExpanded.value
  emit('update:modelValue', isExpanded.value)
  
  if (isExpanded.value) {
    emit('expand')
  } else {
    emit('collapse')
  }
}
</script>

<style scoped>
.fluent-expander {
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  background: var(--bg-card);
  overflow: hidden;
}

.expander-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: var(--font-ui);
  transition: background 0.2s ease;
}

.expander-header:hover {
  background: var(--bg-hover);
}

.expander-header-main {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.expander-header-icon {
  flex-shrink: 0;
  color: var(--text-secondary);
}

.expander-header-content {
  flex: 1;
  min-width: 0;
}

.expander-header-text {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: var(--text-primary);
}

.expander-description {
  font-size: 12px;
  line-height: 16px;
  color: var(--text-secondary);
  margin-top: 2px;
}

.expander-chevron {
  flex-shrink: 0;
  color: var(--text-secondary);
  transition: transform 0.2s ease;
  margin-left: 12px;
}

.fluent-expander.is-expanded .expander-chevron {
  transform: rotate(180deg);
}

.fluent-expander.expand-up .expander-chevron {
  transform: rotate(180deg);
}

.fluent-expander.expand-up.is-expanded .expander-chevron {
  transform: rotate(0deg);
}

.expander-content {
  padding: 0 16px 16px;
  overflow: hidden;
}

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
</style>