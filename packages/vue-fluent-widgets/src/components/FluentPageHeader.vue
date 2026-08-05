<template>
  <div class="fluent-page-header">
    <div v-if="icon" class="page-header-icon">
      <FluentIcon :icon="icon" :width="20" />
    </div>
    <div class="page-header-content">
      <h1 class="page-header-title">{{ title }}</h1>
      <p v-if="description" class="page-header-description">{{ description }}</p>
    </div>
    <div v-if="$slots.actions" class="page-header-actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup>
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  icon: { type: String, default: '' }
})
</script>

<style scoped>
.fluent-page-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px 0;
  border-bottom: 1px solid var(--border-strong);
  margin-bottom: 24px;
}

.page-header-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--accent);
  color: white;
  border-radius: var(--radius-md);
}

.page-header-content {
  flex: 1;
}

.page-header-title {
  font-size: 28px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.2;
}

.page-header-description {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 8px 0 0 0;
}

.page-header-actions {
  flex-shrink: 0;
  display: flex;
  gap: 8px;
}
</style>