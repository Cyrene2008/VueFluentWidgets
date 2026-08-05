<template>
  <div class="icon-demo">
    <div class="demo-section">
      <h2>Icon 图标</h2>
      <p>Fluent 图标组件，使用 @iconify/vue 和 @iconify-json/fluent。</p>
      
      <h3>基本用法</h3>
      <div class="demo-row">
        <FluentIcon icon="home" />
        <FluentIcon icon="settings" />
        <FluentIcon icon="search" />
        <FluentIcon icon="add" />
        <FluentIcon icon="delete" />
        <FluentIcon icon="edit" />
      </div>

      <h3>自定义大小</h3>
      <div class="demo-row">
        <FluentIcon icon="heart" width="16" />
        <FluentIcon icon="heart" width="24" />
        <FluentIcon icon="heart" width="32" />
        <FluentIcon icon="heart" width="48" />
      </div>

      <h3>常用图标</h3>
      <div class="icon-grid">
        <div class="icon-item" v-for="icon in commonIcons" :key="icon">
          <FluentIcon :icon="icon" width="24" />
          <span>{{ icon }}</span>
        </div>
      </div>

      <div class="demo-code">
        <pre><code>&lt;FluentIcon icon="home" /&gt;
&lt;FluentIcon icon="settings" /&gt;
&lt;FluentIcon icon="search" /&gt;

&lt;FluentIcon icon="heart" width="16" /&gt;
&lt;FluentIcon icon="heart" width="24" /&gt;
&lt;FluentIcon icon="heart" width="32" /&gt;</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
const commonIcons = [
  'home', 'settings', 'search', 'add', 'delete', 'edit',
  'heart', 'star', 'share', 'download', 'upload', 'copy',
  'check', 'close', 'arrow-left', 'arrow-right', 'chevron-down',
  'chevron-up', 'more-horizontal', 'more-vertical'
]
</script>

<style scoped>
.icon-demo {
  max-width: 800px;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-2);
}

.icon-item span {
  font-size: 12px;
  color: var(--text-secondary);
}
</style>