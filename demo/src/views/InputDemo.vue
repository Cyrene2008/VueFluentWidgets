<template>
  <div class="input-demo">
    <div class="demo-section">
      <h2>Input 输入框</h2>
      <p>Fluent 输入框组件，支持多种类型和状态。</p>
      
      <h3>基本用法</h3>
      <div class="demo-row">
        <FluentInput v-model="value1" placeholder="请输入内容" />
      </div>

      <h3>带标签</h3>
      <div class="demo-row">
        <FluentInput v-model="value2" label="用户名" placeholder="请输入用户名" />
      </div>

      <h3>密码输入</h3>
      <div class="demo-row">
        <FluentInput v-model="value3" type="password" label="密码" placeholder="请输入密码" />
      </div>

      <h3>禁用状态</h3>
      <div class="demo-row">
        <FluentInput v-model="value4" disabled placeholder="禁用状态" />
      </div>

      <h3>只读状态</h3>
      <div class="demo-row">
        <FluentInput v-model="value5" readonly placeholder="只读状态" />
      </div>

      <h3>错误状态</h3>
      <div class="demo-row">
        <FluentInput v-model="value6" error="请输入有效的邮箱地址" placeholder="请输入邮箱" />
      </div>

      <div class="demo-code">
        <pre><code>&lt;FluentInput v-model="value" placeholder="请输入内容" /&gt;

&lt;FluentInput v-model="value" label="用户名" placeholder="请输入用户名" /&gt;

&lt;FluentInput v-model="value" type="password" label="密码" placeholder="请输入密码" /&gt;

&lt;FluentInput v-model="value" disabled placeholder="禁用状态" /&gt;

&lt;FluentInput v-model="value" readonly placeholder="只读状态" /&gt;

&lt;FluentInput v-model="value" error="请输入有效的邮箱地址" placeholder="请输入邮箱" /&gt;</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const value4 = ref('禁用内容')
const value5 = ref('只读内容')
const value6 = ref('')
</script>

<style scoped>
.input-demo {
  max-width: 800px;
}
</style>