<template>
  <Teleport to="body">
    <Transition name="teaching-tip">
      <div v-if="isOpen" class="fluent-teaching-tip-overlay" @click.self="closeOnOverlay">
        <div 
          ref="tipRef"
          class="fluent-teaching-tip"
          :class="[`placement-${placement}`]"
          :style="tipStyle"
        >
          <div v-if="icon" class="teaching-tip-icon">
            <FluentIcon :icon="icon" :width="24" />
          </div>
          <div class="teaching-tip-content">
            <h3 v-if="title" class="teaching-tip-title">{{ title }}</h3>
            <p v-if="subtitle" class="teaching-tip-subtitle">{{ subtitle }}</p>
            <div class="teaching-tip-body">
              <slot></slot>
            </div>
          </div>
          <button v-if="closable" class="teaching-tip-close" @click="close">
            <FluentIcon icon="dismiss-16-regular" :width="16" />
          </button>
          <div v-if="$slots.actions" class="teaching-tip-actions">
            <slot name="actions"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  modelValue: { type: Boolean, default: undefined },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  icon: { type: String, default: '' },
  placement: { type: String, default: 'bottom' },
  closable: { type: Boolean, default: true },
  closeOnEscape: { type: Boolean, default: true },
  closeOnOverlay: { type: Boolean, default: true }
})

const emit = defineEmits(['update:modelValue', 'open', 'close'])

const tipRef = ref(null)
const localIsOpen = ref(false)

const isOpen = computed(() => props.modelValue ?? localIsOpen.value)

const tipStyle = computed(() => {
  return {
    // 可以添加自定义样式
  }
})

const open = () => {
  localIsOpen.value = true
  emit('update:modelValue', true)
  emit('open')
}

const close = () => {
  localIsOpen.value = false
  emit('update:modelValue', false)
  emit('close')
}

const onKeyDown = (event) => {
  if (event.key === 'Escape' && props.closeOnEscape && isOpen.value) {
    close()
  }
}

watch(() => props.modelValue, (value) => {
  if (value) {
    nextTick(() => {
      // 可以添加定位逻辑
    })
  }
})

// 添加键盘事件监听
onMounted(() => {
  document.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeyDown)
})
</script>

<style scoped>
.fluent-teaching-tip-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
}

.fluent-teaching-tip {
  position: relative;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.14);
  max-width: 400px;
  width: 90%;
  overflow: hidden;
}

.teaching-tip-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin: 16px auto;
  background: var(--accent);
  color: var(--text-on-accent);
  border-radius: 50%;
}

.teaching-tip-content {
  padding: 0 24px 24px;
  text-align: center;
}

.teaching-tip-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px 0;
}

.teaching-tip-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0 0 16px 0;
}

.teaching-tip-body {
  font-size: 14px;
  line-height: 20px;
  color: var(--text-primary);
}

.teaching-tip-close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: background 0.2s ease;
}

.teaching-tip-close:hover {
  background: var(--bg-hover);
}

.teaching-tip-actions {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 0 24px 24px;
}

.teaching-tip-enter-active {
  transition: all 0.3s ease;
}

.teaching-tip-leave-active {
  transition: all 0.2s ease;
}

.teaching-tip-enter-from,
.teaching-tip-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>