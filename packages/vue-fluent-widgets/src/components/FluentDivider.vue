<template>
  <div 
    class="fluent-divider"
    :class="[`orientation-${orientation}`, { 'inset': inset }]"
    role="separator"
  ></div>
</template>

<script setup>
const props = defineProps({
  orientation: { type: String, default: 'horizontal' }, // horizontal, vertical
  inset: { type: Boolean, default: false }
})
</script>

<style scoped>
.fluent-divider {
  background: var(--border-strong);
}

.fluent-divider.orientation-horizontal {
  height: 1px;
  width: 100%;
}

.fluent-divider.orientation-vertical {
  width: 1px;
  height: 100%;
}

.fluent-divider.inset.orientation-horizontal {
  margin-left: 16px;
  margin-right: 16px;
}

.fluent-divider.inset.orientation-vertical {
  margin-top: 16px;
  margin-bottom: 16px;
}
</style>