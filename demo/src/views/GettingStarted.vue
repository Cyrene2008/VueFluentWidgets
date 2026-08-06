<template>
  <div class="docs-page">
    <div class="page-header">
      <h1>{{ text('快速开始', 'Getting started') }}</h1>
      <p>{{ text('安装 Vue Fluent Widgets，在 Vue 3 页面里按需组合组件。', 'Install Vue Fluent Widgets and compose components in any Vue 3 view.') }}</p>
    </div>

    <section class="docs-section">
      <h2>1. {{ text('安装', 'Install') }}</h2>
      <pre><code>npm i vue-fluent-widgets</code></pre>
      <p>{{ text('这是 npmjs 上的无 scope 包名。GitHub Packages 是另一套 registry，名称为', 'This is the unscoped npmjs package. The separate GitHub Packages registry uses') }} <code>@cyrene2008/vue-fluent-widgets</code>.</p>
    </section>

    <section class="docs-section">
      <h2>2. {{ text('在入口注册插件', 'Register the plugin') }}</h2>
      <pre><code>import { createApp } from 'vue'
import App from './App.vue'
import VueFluentWidgets from 'vue-fluent-widgets'
import 'vue-fluent-widgets/style.css'

createApp(App)
  .use(VueFluentWidgets)
  .mount('#app')</code></pre>
      <p>{{ text('插件注册适合快速试用，会把组件注册为全局组件。', 'Plugin installation registers every component globally for quick adoption.') }}</p>
    </section>

    <section class="docs-section">
      <h2>3. {{ text('像拼积木一样按组件使用', 'Compose components') }}</h2>
      <pre><code>&lt;script setup&gt;
import { FluentButton, FluentCard, FluentMediaPlayer } from 'vue-fluent-widgets'

const playing = ref(false)
&lt;/script&gt;

&lt;template&gt;
  &lt;FluentCard&gt;
    &lt;h2&gt;我的面板&lt;/h2&gt;
    &lt;FluentButton variant="primary" @click="playing = !playing"&gt;
      {{ playing ? '暂停' : '播放' }}
    &lt;/FluentButton&gt;
    &lt;FluentMediaPlayer src="/media/intro.mp4" :autoplay="false" /&gt;
  &lt;/FluentCard&gt;
&lt;/template&gt;</code></pre>
      <p>{{ text('组件通过 named export 提供，组件内部的 slot、v-model、事件和普通 Vue 内容都可以组合。', 'Named exports work with slots, v-model, events, and ordinary Vue content.') }}</p>
    </section>

    <div class="docs-actions">
      <router-link class="docs-link" to="/docs/components">{{ text('查看全部组件', 'View all components') }}</router-link>
      <router-link class="docs-link docs-link--primary" to="/playground">{{ text('打开在线 Playground', 'Open Playground') }}</router-link>
    </div>
  </div>
</template>

<script setup>
import { useDemoLocale } from '../composables/useDemoLocale.js'

const { text } = useDemoLocale()
</script>

<style scoped>
.docs-page { max-width: 960px; }
.page-header { margin-bottom: 32px; }
.page-header h1 { margin: 0 0 8px; color: var(--text-primary); font-size: 30px; }
.page-header p, .docs-section p { color: var(--text-secondary); line-height: 1.7; }
.docs-section { margin-bottom: 28px; }
.docs-section h2 { margin: 0 0 12px; color: var(--text-primary); font-size: 18px; }
.docs-section pre { margin: 0 0 12px; padding: 18px; overflow-x: auto; border: 1px solid var(--border-strong); border-radius: var(--radius-md); background: var(--bg-code); color: var(--text-code); line-height: 1.6; }
.docs-section code { font-family: Consolas, monospace; }
.docs-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
.docs-link { display: inline-flex; align-items: center; min-height: 40px; padding: 0 16px; border: 1px solid var(--border-strong); border-radius: var(--radius-md); color: var(--text-primary); text-decoration: none; }
.docs-link--primary { border-color: var(--accent); background: var(--accent); color: var(--text-on-accent); }
</style>
