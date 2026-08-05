<template>
  <div 
    class="fluent-person-picture"
    :style="rootStyle"
    :aria-label="displayName || initials || undefined"
  >
    <img v-if="src" :src="src" :alt="displayName" class="person-picture-image" />
    <span v-else-if="resolvedInitials" class="person-picture-initials">{{ resolvedInitials }}</span>
    <FluentIcon v-else icon="person-20-regular" :width="iconSize" class="person-picture-icon" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  src: { type: String, default: '' },
  displayName: { type: String, default: '' },
  initials: { type: String, default: '' },
  size: { type: Number, default: 32 },
  shape: { type: String, default: 'circle' }
})

const resolvedInitials = computed(() => {
  if (props.initials) return props.initials.slice(0, 2).toUpperCase()
  if (!props.displayName) return ''
  return props.displayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase()
})

const iconSize = computed(() => Math.max(12, props.size * 0.5))

const rootStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  fontSize: `${Math.max(12, props.size * 0.4)}px`,
  borderRadius: props.shape === 'square' ? '4px' : '50%'
}))
</script>

<style scoped>
.fluent-person-picture {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #587cde, #11a37f);
  color: white;
  font-weight: 600;
  user-select: none;
  overflow: hidden;
  flex-shrink: 0;
}

.person-picture-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.person-picture-initials {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  line-height: 1;
}

.person-picture-icon {
  opacity: 0.8;
}
</style>