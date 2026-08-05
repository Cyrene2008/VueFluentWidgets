<template>
  <Transition name="fade">
    <button
      v-if="visible"
      class="fluent-back-to-top"
      :style="buttonStyle"
      @click="scrollToTop"
      aria-label="回到顶部"
    >
      <FluentIcon icon="arrow-up-20-regular" :width="20" />
    </button>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  target: { type: String, default: '' },
  visibilityHeight: { type: Number, default: 300 },
  right: { type: Number, default: 40 },
  bottom: { type: Number, default: 40 }
})

const visible = ref(false)

const buttonStyle = computed(() => ({
  right: `${props.right}px`,
  bottom: `${props.bottom}px`
}))

const checkScroll = () => {
  if (props.target) {
    const el = document.querySelector(props.target)
    if (el) {
      visible.value = el.scrollTop > props.visibilityHeight
    }
  } else {
    visible.value = window.scrollY > props.visibilityHeight
  }
}

const scrollToTop = () => {
  if (props.target) {
    const el = document.querySelector(props.target)
    if (el) {
      el.scrollTo({ top: 0, behavior: 'smooth' })
    }
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

onMounted(() => {
  if (props.target) {
    const el = document.querySelector(props.target)
    if (el) {
      el.addEventListener('scroll', checkScroll)
    }
  } else {
    window.addEventListener('scroll', checkScroll)
  }
})

onUnmounted(() => {
  if (props.target) {
    const el = document.querySelector(props.target)
    if (el) {
      el.removeEventListener('scroll', checkScroll)
    }
  } else {
    window.removeEventListener('scroll', checkScroll)
  }
})
</script>

<style scoped>
.fluent-back-to-top {
  position: fixed;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: 50%;
  color: var(--text-primary);
  cursor: pointer;
  transition: background 0.2s ease, box-shadow 0.2s ease;
  box-shadow: var(--shadow-4);
  z-index: 100;
}

.fluent-back-to-top:hover {
  background: var(--bg-hover);
  box-shadow: var(--shadow-8);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>