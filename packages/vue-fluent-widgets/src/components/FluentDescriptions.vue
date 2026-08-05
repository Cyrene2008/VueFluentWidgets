<template>
  <div class="fluent-descriptions" :class="[`layout-${layout}`, `size-${size}`]">
    <div v-if="title" class="descriptions-title">{{ title }}</div>
    <div class="descriptions-content" :style="contentStyle">
      <template v-for="(item, index) in items" :key="index">
        <div class="descriptions-item" :class="{ 'is-bordered': bordered }">
          <div class="item-label">{{ item.label }}</div>
          <div class="item-value">
            <slot :name="item.key || `item-${index}`" :item="item">
              {{ item.value }}
            </slot>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  items: { type: Array, required: true },
  column: { type: Number, default: 3 },
  layout: { type: String, default: 'horizontal' }, // horizontal, vertical
  size: { type: String, default: 'medium' }, // small, medium, large
  bordered: { type: Boolean, default: false }
})

const contentStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: `repeat(${props.column}, 1fr)`
}))
</script>

<style scoped>
.fluent-descriptions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.descriptions-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
}

.descriptions-content {
  gap: 16px;
}

.descriptions-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 0;
}

.descriptions-item.is-bordered {
  padding: 12px;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
}

.layout-horizontal .descriptions-item {
  flex-direction: row;
  align-items: center;
}

.layout-horizontal .item-label {
  min-width: 120px;
  font-weight: 600;
}

.item-label {
  font-size: 14px;
  color: var(--text-secondary);
}

.item-value {
  font-size: 14px;
  color: var(--text-primary);
}

/* Sizes */
.size-small .descriptions-item {
  padding: 8px 0;
  font-size: 12px;
}

.size-large .descriptions-item {
  padding: 16px 0;
  font-size: 16px;
}
</style>