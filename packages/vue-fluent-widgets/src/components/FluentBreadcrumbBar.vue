<template>
  <nav class="fluent-breadcrumb-bar" :class="{ 'is-disabled': disabled }">
    <ol class="breadcrumb-items">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="breadcrumb-item"
        :class="{ 'is-current': index === items.length - 1, 'is-disabled': item.disabled }"
      >
        <a
          v-if="index < items.length - 1 && !item.disabled"
          class="breadcrumb-link"
          :href="item.href || '#'"
          @click.prevent="onItemClick(item, index)"
        >
          <FluentIcon v-if="item.icon" :icon="item.icon" :width="14" />
          <span class="breadcrumb-text">{{ item.label }}</span>
        </a>
        <span v-else class="breadcrumb-current">
          <FluentIcon v-if="item.icon" :icon="item.icon" :width="14" />
          <span class="breadcrumb-text">{{ item.label }}</span>
        </span>
        <span v-if="index < items.length - 1" class="breadcrumb-separator" aria-hidden="true">
          <FluentIcon icon="chevron-right-20-regular" :width="12" />
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  items: { type: Array, required: true },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['item-click'])

const onItemClick = (item, index) => {
  if (props.disabled || item.disabled) return
  emit('item-click', { item, index })
}
</script>

<style scoped>
.fluent-breadcrumb-bar {
  padding: 8px 0;
}

.fluent-breadcrumb-bar.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.breadcrumb-items {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  border-radius: var(--radius-md);
  text-decoration: none;
  color: var(--accent);
  font-size: 14px;
  transition: background 0.2s ease;
}

.breadcrumb-link:hover {
  background: rgba(0, 120, 212, 0.1);
}

.breadcrumb-current {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  color: var(--text-primary);
  font-size: 14px;
  font-weight: 500;
}

.breadcrumb-item.is-disabled .breadcrumb-link {
  opacity: 0.5;
  cursor: not-allowed;
}

.breadcrumb-separator {
  display: flex;
  align-items: center;
  margin: 0 4px;
  color: var(--text-muted);
}

.breadcrumb-text {
  white-space: nowrap;
}
</style>