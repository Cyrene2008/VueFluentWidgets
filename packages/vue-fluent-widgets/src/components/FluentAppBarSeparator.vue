<template>
  <div 
    class="fluent-app-bar-separator"
    :class="{ 'is-compact': compact }"
  ></div>
</template>

<script setup>
const props = defineProps({
  compact: { type: Boolean, default: false }
})
</script>

<style scoped>
.fluent-app-bar-separator {
  width: 1px;
  height: 24px;
  background: var(--border-strong);
  margin: 0 4px;
}

.fluent-app-bar-separator.is-compact {
  height: 16px;
  margin: 0 2px;
}
</style>