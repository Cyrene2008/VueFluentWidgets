<template>
  <div class="select-demo">
    <div class="demo-section">
      <h2>Select 选择器</h2>
      <p>Fluent 选择器组件，支持单选和多选。</p>
      
      <h3>基本用法</h3>
      <div class="demo-row">
        <FluentSelect v-model="selected1" :options="options1" placeholder="请选择" />
      </div>

      <h3>带标签</h3>
      <div class="demo-row">
        <FluentSelect v-model="selected2" :options="options2" label="城市" placeholder="请选择城市" />
      </div>

      <h3>禁用状态</h3>
      <div class="demo-row">
        <FluentSelect v-model="selected3" :options="options1" disabled placeholder="禁用状态" />
      </div>

      <h3>错误状态</h3>
      <div class="demo-row">
        <FluentSelect v-model="selected4" :options="options1" error="请选择一个选项" placeholder="请选择" />
      </div>

      <div class="demo-code">
        <pre><code>&lt;FluentSelect v-model="selected" :options="options" placeholder="请选择" /&gt;

&lt;FluentSelect v-model="selected" :options="options" label="城市" placeholder="请选择城市" /&gt;

&lt;FluentSelect v-model="selected" :options="options" disabled placeholder="禁用状态" /&gt;

&lt;FluentSelect v-model="selected" :options="options" error="请选择一个选项" placeholder="请选择" /&gt;

const options = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' }
]</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selected1 = ref('')
const selected2 = ref('')
const selected3 = ref('option1')
const selected4 = ref('')

const options1 = [
  { value: 'option1', label: '选项1' },
  { value: 'option2', label: '选项2' },
  { value: 'option3', label: '选项3' }
]

const options2 = [
  { value: 'beijing', label: '北京' },
  { value: 'shanghai', label: '上海' },
  { value: 'guangzhou', label: '广州' },
  { value: 'shenzhen', label: '深圳' }
]
</script>

<style scoped>
.select-demo {
  max-width: 800px;
}
</style>