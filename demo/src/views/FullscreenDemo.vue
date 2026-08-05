<template>
  <div class="fullscreen-demo">
    <div class="demo-section">
      <h2>Fullscreen 全屏切换</h2>
      <p>Fluent 全屏切换组件，用于切换页面全屏状态。</p>
      
      <h3>基本用法</h3>
      <div class="demo-row">
        <FullscreenToggle />
      </div>

      <h3>自定义按钮</h3>
      <div class="demo-row">
        <FullscreenToggle>
          <template #default="{ isFullscreen }">
            <FluentButton :variant="isFullscreen ? 'danger' : 'primary'">
              {{ isFullscreen ? '退出全屏' : '进入全屏' }}
            </FluentButton>
          </template>
        </FullscreenToggle>
      </div>

      <div class="demo-code">
        <pre><code>&lt;FullscreenToggle /&gt;

&lt;FullscreenToggle&gt;
  &lt;template #default="{ isFullscreen }"&gt;
    &lt;FluentButton :variant="isFullscreen ? 'danger' : 'primary'"&gt;
      {{ isFullscreen ? '退出全屏' : '进入全屏' }}
    &lt;/FluentButton&gt;
  &lt;/template&gt;
&lt;/FullscreenToggle&gt;</code></pre>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fullscreen-demo {
  max-width: 800px;
}
</style>