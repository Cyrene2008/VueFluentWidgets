<template>
  <div class="tabs-demo">
    <div class="demo-section">
      <h2>Tabs 标签页</h2>
      <p>Fluent 标签页组件，用于内容分组展示。</p>
      
      <h3>基本用法</h3>
      <div class="demo-row">
        <FluentTabs v-model="activeTab1" :tabs="tabs1">
          <template #tab1>
            <p>这是第一个标签页的内容。</p>
          </template>
          <template #tab2>
            <p>这是第二个标签页的内容。</p>
          </template>
          <template #tab3>
            <p>这是第三个标签页的内容。</p>
          </template>
        </FluentTabs>
      </div>

      <h3>禁用标签</h3>
      <div class="demo-row">
        <FluentTabs v-model="activeTab2" :tabs="tabs2">
          <template #tab1>
            <p>这是第一个标签页的内容。</p>
          </template>
          <template #tab2>
            <p>这个标签页被禁用了。</p>
          </template>
          <template #tab3>
            <p>这是第三个标签页的内容。</p>
          </template>
        </FluentTabs>
      </div>

      <div class="demo-code">
        <pre><code>&lt;FluentTabs v-model="activeTab" :tabs="tabs"&gt;
  &lt;template #tab1&gt;
    &lt;p&gt;这是第一个标签页的内容。&lt;/p&gt;
  &lt;/template&gt;
  &lt;template #tab2&gt;
    &lt;p&gt;这是第二个标签页的内容。&lt;/p&gt;
  &lt;/template&gt;
&lt;/FluentTabs&gt;

const tabs = [
  { key: 'tab1', label: '标签1' },
  { key: 'tab2', label: '标签2' },
  { key: 'tab3', label: '标签3' }
]</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab1 = ref('tab1')
const activeTab2 = ref('tab1')

const tabs1 = [
  { key: 'tab1', label: '标签1' },
  { key: 'tab2', label: '标签2' },
  { key: 'tab3', label: '标签3' }
]

const tabs2 = [
  { key: 'tab1', label: '标签1' },
  { key: 'tab2', label: '标签2', disabled: true },
  { key: 'tab3', label: '标签3' }
]
</script>

<style scoped>
.tabs-demo {
  max-width: 800px;
}
</style>