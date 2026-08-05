<template>
  <button 
    class="fluent-app-bar-button"
    :class="{ 'is-disabled': disabled, 'is-compact': compact }"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <span class="app-bar-button-icon">
      <slot name="icon">
        <FluentIcon v-if="icon" :icon="icon" :width="20" />
      </slot>
    </span>
    <span v-if="!compact && label" class="app-bar-button-label">{{ label }}</span>
  </button>
</template>

<script setup>
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  icon: { type: String, default: '' },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  compact: { type: Boolean, default: false }
})

defineEmits(['click'])
</script>

<style scoped>
.fluent-app-bar-button {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-width: 68px;
  height: 56px;
  padding: 8px 12px;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background 0.2s ease;
  color: var(--text-primary);
}

.fluent-app-bar-button:hover {
  background: var(--bg-hover);
}

.fluent-app-bar-button:active {
  background: var(--bg-card);
}

.fluent-app-bar-button.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.fluent-app-bar-button.is-compact {
  min-width: 40px;
  height: 40px;
  padding: 8px;
}

.app-bar-button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-bar-button-label {
  font-size: 12px;
  line-height: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
</style>