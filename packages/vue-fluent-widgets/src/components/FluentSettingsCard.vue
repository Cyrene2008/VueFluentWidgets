<template>
  <div class="fluent-settings-card" :class="{ 'is-clickable': clickable }">
    <div class="settings-card-header">
      <div v-if="icon" class="card-icon">
        <FluentIcon :icon="icon" :width="20" />
      </div>
      <div class="card-text">
        <div class="card-title">{{ title }}</div>
        <div v-if="description" class="card-description">{{ description }}</div>
      </div>
      <div class="card-action">
        <slot name="action"></slot>
      </div>
    </div>
    <div v-if="$slots.default" class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  icon: { type: String, default: '' },
  clickable: { type: Boolean, default: false }
})
</script>

<style scoped>
.fluent-settings-card {
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  padding: 16px;
}

.fluent-settings-card.is-clickable {
  cursor: pointer;
  transition: background 0.2s ease;
}

.fluent-settings-card.is-clickable:hover {
  background: var(--bg-hover);
}

.settings-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.card-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-hover);
  border-radius: var(--radius-md);
  color: var(--accent);
}

.card-text {
  flex: 1;
  min-width: 0;
}

.card-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.card-description {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 4px;
}

.card-action {
  flex-shrink: 0;
}

.card-content {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border-strong);
}
</style>