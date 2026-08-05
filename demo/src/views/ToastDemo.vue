<template>
  <div class="toast-demo">
    <div class="demo-section">
      <h2>Toast 消息提示</h2>
      <p>Fluent 消息提示组件，用于操作结果反馈。</p>
      
      <h3>基本用法</h3>
      <div class="demo-row">
        <FluentButton @click="showToast('信息提示')">信息提示</FluentButton>
        <FluentButton @click="showToast('操作成功！')">成功提示</FluentButton>
        <FluentButton @click="showToast('请注意！')">警告提示</FluentButton>
        <FluentButton @click="showToast('操作失败！')">错误提示</FluentButton>
      </div>

      <h3>自定义内容</h3>
      <div class="demo-row">
        <FluentButton @click="showCustomToast">自定义消息</FluentButton>
      </div>

      <div class="demo-code">
        <pre><code>&lt;FluentButton @click="showToast('信息提示')"&gt;信息提示&lt;/FluentButton&gt;

const showToast = (message) => {
  toastRef.value.add({
    title: '提示',
    message,
    duration: 3000
  })
}

const showCustomToast = () => {
  toastRef.value.add({
    title: '自定义标题',
    message: '这是一条自定义消息，包含标题和内容。',
    duration: 5000
  })
}</code></pre>
      </div>
    </div>
    <FluentToast ref="toastRef" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentToast } from 'vue-fluent-widgets'

const toastRef = ref()

const showToast = (message) => {
  toastRef.value.add({
    title: '提示',
    message,
    duration: 3000
  })
}

const showCustomToast = () => {
  toastRef.value.add({
    title: '自定义标题',
    message: '这是一条自定义消息，包含标题和内容。',
    duration: 5000
  })
}
</script>

<style scoped>
.toast-demo {
  max-width: 800px;
}
</style>