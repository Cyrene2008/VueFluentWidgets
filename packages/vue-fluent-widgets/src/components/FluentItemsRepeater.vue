<template>
  <div class="fluent-items-repeater">
    <div
      v-for="(item, index) in items"
      :key="getItemKey(item, index)"
      class="items-repeater-item"
    >
      <slot :item="item" :index="index">
        <span>{{ item.label || item.title || String(item) }}</span>
      </slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  items: { type: Array, required: true },
  itemKey: { type: String, default: 'id' }
})

const getItemKey = (item, index) => {
  if (typeof item === 'object' && item !== null) {
    return item[props.itemKey] || index
  }
  return index
}
</script>

<style scoped>
.fluent-items-repeater {
  display: flex;
  flex-direction: column;
}

.items-repeater-item {
  /* 默认样式，可以通过slot覆盖 */
}
</style>