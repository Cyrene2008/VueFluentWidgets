<template>
  <div class="fluent-command-bar">
    <div class="command-bar-primary">
      <div class="command-bar-primary-content">
        <template v-for="(command, index) in primaryCommands" :key="index">
          <div v-if="command.type === 'separator'" class="command-separator"></div>
          <button
            v-else
            class="command-button"
            :class="{ 'is-disabled': command.disabled }"
            :disabled="command.disabled"
            @click="onCommandClick(command)"
          >
            <FluentIcon v-if="command.icon" :icon="command.icon" :width="20" />
            <span v-if="command.label && showLabels" class="command-label">{{ command.label }}</span>
          </button>
        </template>
      </div>
      
      <button 
        v-if="secondaryCommands.length > 0"
        class="command-bar-overflow"
        :class="{ 'is-open': isOpen }"
        @click="toggleOverflow"
      >
        <FluentIcon icon="more-horizontal-20-regular" :width="20" />
      </button>
    </div>
    
    <Transition name="overflow">
      <div v-if="isOpen" class="command-bar-overflow-overlay" @click.self="closeOverflow">
        <div class="command-bar-secondary">
          <template v-for="(command, index) in secondaryCommands" :key="index">
            <div v-if="command.type === 'separator'" class="command-separator"></div>
            <button
              v-else
              class="command-button command-button-secondary"
              :class="{ 'is-disabled': command.disabled }"
              :disabled="command.disabled"
              @click="onCommandClick(command)"
            >
              <FluentIcon v-if="command.icon" :icon="command.icon" :width="20" />
              <span class="command-label">{{ command.label }}</span>
            </button>
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  primaryCommands: { type: Array, default: () => [] },
  secondaryCommands: { type: Array, default: () => [] },
  showLabels: { type: Boolean, default: true }
})

const emit = defineEmits(['command-click'])

const isOpen = ref(false)

const toggleOverflow = () => {
  isOpen.value = !isOpen.value
}

const closeOverflow = () => {
  isOpen.value = false
}

const onCommandClick = (command) => {
  if (command.disabled) return
  closeOverflow()
  emit('command-click', command)
}
</script>

<style scoped>
.fluent-command-bar {
  position: relative;
  display: flex;
  align-items: center;
  height: 48px;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-strong);
  padding: 0 8px;
}

.command-bar-primary {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.command-bar-primary-content {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.command-separator {
  width: 1px;
  height: 24px;
  background: var(--border-strong);
  margin: 0 4px;
}

.command-button {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding: 0 12px;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 14px;
  font-family: var(--font-ui);
  cursor: pointer;
  transition: background 0.2s ease;
  white-space: nowrap;
}

.command-button:hover {
  background: var(--bg-hover);
}

.command-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.command-button.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.command-label {
  white-space: nowrap;
}

.command-bar-overflow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  color: var(--text-primary);
  cursor: pointer;
  transition: background 0.2s ease;
  margin-left: 4px;
}

.command-bar-overflow:hover {
  background: var(--bg-hover);
}

.command-bar-overflow.is-open {
  background: var(--bg-card);
}

.command-bar-overflow-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
}

.command-bar-secondary {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1001;
  min-width: 200px;
  max-height: 300px;
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.14);
  padding: 4px 0;
  overflow-y: auto;
}

.command-button-secondary {
  width: 100%;
  justify-content: flex-start;
  border-radius: 0;
}

.overflow-enter-active {
  transition: all 0.2s ease;
}

.overflow-leave-active {
  transition: all 0.15s ease;
}

.overflow-enter-from,
.overflow-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>