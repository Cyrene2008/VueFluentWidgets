<template>
  <div class="fluent-title-bar" :class="{ 'is-draggable': draggable }">
    <div class="title-bar-drag-region" v-if="draggable"></div>
    <div class="title-bar-content">
      <slot></slot>
    </div>
    <div v-if="showWindowControls" class="title-bar-controls">
      <button class="title-bar-button minimize" @click="$emit('minimize')">
        <FluentIcon icon="subtract-16-regular" :width="16" />
      </button>
      <button class="title-bar-button maximize" @click="$emit('maximize')">
        <FluentIcon icon="maximize-16-regular" :width="16" />
      </button>
      <button class="title-bar-button close" @click="$emit('close')">
        <FluentIcon icon="dismiss-16-regular" :width="16" />
      </button>
    </div>
  </div>
</template>

<script setup>
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  draggable: { type: Boolean, default: true },
  showWindowControls: { type: Boolean, default: false }
})

defineEmits(['minimize', 'maximize', 'close'])
</script>

<style scoped>
.fluent-title-bar {
  display: flex;
  align-items: center;
  height: 32px;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-strong);
  user-select: none;
}

.title-bar-drag-region {
  position: absolute;
  inset: 0;
  -webkit-app-region: drag;
}

.title-bar-content {
  flex: 1;
  padding: 0 16px;
  font-size: 12px;
  color: var(--text-secondary);
}

.title-bar-controls {
  display: flex;
  -webkit-app-region: no-drag;
}

.title-bar-button {
  width: 46px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  transition: background 0.2s ease;
}

.title-bar-button:hover {
  background: var(--bg-hover);
}

.title-bar-button.close:hover {
  background: #c42b1c;
  color: white;
}
</style>