<template>
  <div class="toggle-demo">
    <div class="demo-section">
      <h2>Toggle 开关</h2>
      <p>Fluent 开关组件，用于布尔值切换。</p>
      
      <h3>基本用法</h3>
      <div class="demo-row">
        <FluentToggle v-model="toggle1" />
        <span>当前状态: {{ toggle1 ? '开启' : '关闭' }}</span>
      </div>

      <h3>带标签</h3>
      <div class="demo-row">
        <FluentToggle v-model="toggle2" label="启用通知" />
      </div>

      <h3>禁用状态</h3>
      <div class="demo-row">
        <FluentToggle v-model="toggle3" disabled />
        <FluentToggle v-model="toggle4" disabled />
      </div>

      <h3>自定义标签</h3>
      <div class="demo-row">
        <FluentToggle v-model="toggle5">
          <template #label>
            <span>自定义标签内容</span>
          </template>
        </FluentToggle>
      </div>

      <div class="demo-code">
        <pre><code>&lt;FluentToggle v-model="toggle" /&gt;

&lt;FluentToggle v-model="toggle" label="启用通知" /&gt;

&lt;FluentToggle v-model="toggle" disabled /&gt;

&lt;FluentToggle v-model="toggle"&gt;
  &lt;template #label&gt;
    &lt;span&gt;自定义标签内容&lt;/span&gt;
  &lt;/template&gt;
&lt;/FluentToggle&gt;</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const toggle1 = ref(false)
const toggle2 = ref(true)
const toggle3 = ref(false)
const toggle4 = ref(true)
const toggle5 = ref(false)
</script>

<style scoped>
.toggle-demo {
  max-width: 800px;
}

.demo-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>