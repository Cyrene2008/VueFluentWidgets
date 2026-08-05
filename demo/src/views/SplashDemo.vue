<template>
  <div class="splash-demo">
    <div class="demo-section">
      <h2>Splash 启动画面</h2>
      <p>Fluent 启动画面组件，用于应用加载时的展示。</p>
      
      <h3>基本用法</h3>
      <div class="demo-row">
        <FluentButton @click="showSplash = true">显示启动画面</FluentButton>
        <SplashScreen v-model="showSplash" :duration="3000" />
      </div>

      <h3>自定义内容</h3>
      <div class="demo-row">
        <FluentButton @click="showCustomSplash = true">自定义启动画面</FluentButton>
        <SplashScreen v-model="showCustomSplash" :duration="5000">
          <div class="custom-splash">
            <h1>Vue Fluent Widgets</h1>
            <p>加载中...</p>
            <div class="loading-bar"></div>
          </div>
        </SplashScreen>
      </div>

      <div class="demo-code">
        <pre><code>&lt;FluentButton @click="showSplash = true"&gt;显示启动画面&lt;/FluentButton&gt;
&lt;SplashScreen v-model="showSplash" :duration="3000" /&gt;

&lt;FluentButton @click="showCustomSplash = true"&gt;自定义启动画面&lt;/FluentButton&gt;
&lt;SplashScreen v-model="showCustomSplash" :duration="5000"&gt;
  &lt;div class="custom-splash"&gt;
    &lt;h1&gt;Vue Fluent Widgets&lt;/h1&gt;
    &lt;p&gt;加载中...&lt;/p&gt;
    &lt;div class="loading-bar"&gt;&lt;/div&gt;
  &lt;/div&gt;
&lt;/SplashScreen&gt;</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showSplash = ref(false)
const showCustomSplash = ref(false)
</script>

<style scoped>
.splash-demo {
  max-width: 800px;
}

.custom-splash {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 20px;
}

.custom-splash h1 {
  font-size: 32px;
  color: var(--accent);
}

.custom-splash p {
  color: var(--text-secondary);
}

.loading-bar {
  width: 200px;
  height: 4px;
  background: var(--border-strong);
  border-radius: 2px;
  overflow: hidden;
}

.loading-bar::after {
  content: '';
  display: block;
  width: 50%;
  height: 100%;
  background: var(--accent);
  animation: loading 1.5s infinite ease-in-out;
}

@keyframes loading {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
</style>