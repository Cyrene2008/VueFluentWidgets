<template>
  <div class="fluent-rich-text-block" :class="{ 'is-selectable': selectable }">
    <div v-if="text" class="rich-text-content" v-html="text"></div>
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  text: { type: String, default: '' },
  selectable: { type: Boolean, default: false }
})
</script>

<style scoped>
.fluent-rich-text-block {
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-primary);
}

.fluent-rich-text-block.is-selectable {
  user-select: text;
}

.rich-text-content :deep(p) {
  margin: 0 0 12px 0;
}

.rich-text-content :deep(h1),
.rich-text-content :deep(h2),
.rich-text-content :deep(h3),
.rich-text-content :deep(h4),
.rich-text-content :deep(h5),
.rich-text-content :deep(h6) {
  margin: 16px 0 8px 0;
  font-weight: 600;
}

.rich-text-content :deep(h1) { font-size: 28px; }
.rich-text-content :deep(h2) { font-size: 24px; }
.rich-text-content :deep(h3) { font-size: 20px; }
.rich-text-content :deep(h4) { font-size: 18px; }
.rich-text-content :deep(h5) { font-size: 16px; }
.rich-text-content :deep(h6) { font-size: 14px; }

.rich-text-content :deep(ul),
.rich-text-content :deep(ol) {
  margin: 8px 0;
  padding-left: 24px;
}

.rich-text-content :deep(li) {
  margin: 4px 0;
}

.rich-text-content :deep(a) {
  color: var(--accent);
  text-decoration: none;
}

.rich-text-content :deep(a:hover) {
  text-decoration: underline;
}

.rich-text-content :deep(code) {
  background: var(--bg-hover);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Consolas', monospace;
  font-size: 13px;
}

.rich-text-content :deep(pre) {
  background: var(--bg-hover);
  padding: 16px;
  border-radius: var(--radius-md);
  overflow-x: auto;
  margin: 12px 0;
}

.rich-text-content :deep(pre code) {
  background: transparent;
  padding: 0;
}

.rich-text-content :deep(blockquote) {
  border-left: 4px solid var(--accent);
  margin: 12px 0;
  padding: 8px 16px;
  background: var(--bg-hover);
  border-radius: 0 var(--radius-md) var(--radius-md) 0;
}

.rich-text-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-md);
}

.rich-text-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 12px 0;
}

.rich-text-content :deep(th),
.rich-text-content :deep(td) {
  padding: 8px 12px;
  border: 1px solid var(--border-strong);
  text-align: left;
}

.rich-text-content :deep(th) {
  background: var(--bg-hover);
  font-weight: 600;
}
</style>