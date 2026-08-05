<template>
  <div class="fluent-timeline" :class="[`position-${position}`]">
    <div 
      v-for="(item, index) in items" 
      :key="index"
      class="timeline-item"
      :class="[`color-${item.color || 'default'}`]"
    >
      <div class="timeline-indicator">
        <div class="timeline-dot">
          <FluentIcon v-if="item.icon" :icon="item.icon" :width="12" />
        </div>
        <div v-if="index < items.length - 1" class="timeline-line"></div>
      </div>
      <div class="timeline-content">
        <div v-if="item.title" class="timeline-title">{{ item.title }}</div>
        <div v-if="item.description" class="timeline-description">{{ item.description }}</div>
        <div v-if="item.time" class="timeline-time">{{ item.time }}</div>
        <slot :name="`item-${index}`" :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  items: { type: Array, required: true },
  position: { type: String, default: 'left' } // left, alternate
})
</script>

<style scoped>
.fluent-timeline {
  display: flex;
  flex-direction: column;
}

.timeline-item {
  display: flex;
  gap: 16px;
  padding-bottom: 24px;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.timeline-dot {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.timeline-line {
  width: 2px;
  flex: 1;
  background: var(--border-strong);
  margin-top: 8px;
}

.timeline-content {
  flex: 1;
  padding-top: 2px;
}

.timeline-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.timeline-description {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.timeline-time {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 8px;
}

/* Colors */
.color-success .timeline-dot {
  background: #0f7b0f;
}

.color-warning .timeline-dot {
  background: #9d5d00;
}

.color-error .timeline-dot {
  background: #c42b1c;
}

.color-info .timeline-dot {
  background: var(--accent);
}

/* Alternate position */
.position-alternate .timeline-item:nth-child(even) {
  flex-direction: row-reverse;
}
</style>