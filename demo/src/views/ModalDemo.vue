<template>
  <div class="modal-demo">
    <div class="demo-section">
      <h2>Modal 模态框</h2>
      <p>Fluent 模态框组件，用于重要信息的展示和交互。</p>
      
      <h3>基本用法</h3>
      <div class="demo-row">
        <FluentButton @click="showModal1 = true">打开模态框</FluentButton>
        <FluentModal v-model="showModal1" title="基本模态框">
          <p>这是模态框的内容。</p>
          <template #footer>
            <FluentButton variant="secondary" @click="showModal1 = false">取消</FluentButton>
            <FluentButton variant="primary" @click="showModal1 = false">确认</FluentButton>
          </template>
        </FluentModal>
      </div>

      <h3>自定义标题</h3>
      <div class="demo-row">
        <FluentButton @click="showModal2 = true">自定义标题</FluentButton>
        <FluentModal v-model="showModal2" title="设置">
          <p>在这里配置您的设置。</p>
          <template #footer>
            <FluentButton variant="primary" @click="showModal2 = false">保存</FluentButton>
          </template>
        </FluentModal>
      </div>

      <h3>不可关闭</h3>
      <div class="demo-row">
        <FluentButton @click="showModal3 = true">不可关闭模态框</FluentButton>
        <FluentModal v-model="showModal3" title="重要提示" :closable="false">
          <p>这个模态框不能通过点击遮罩层或关闭按钮关闭。</p>
          <template #footer>
            <FluentButton variant="primary" @click="showModal3 = false">我知道了</FluentButton>
          </template>
        </FluentModal>
      </div>

      <div class="demo-code">
        <pre><code>&lt;FluentButton @click="showModal = true"&gt;打开模态框&lt;/FluentButton&gt;
&lt;FluentModal v-model="showModal" title="基本模态框"&gt;
  &lt;p&gt;这是模态框的内容。&lt;/p&gt;
  &lt;template #footer&gt;
    &lt;FluentButton variant="secondary" @click="showModal = false"&gt;取消&lt;/FluentButton&gt;
    &lt;FluentButton variant="primary" @click="showModal = false"&gt;确认&lt;/FluentButton&gt;
  &lt;/template&gt;
&lt;/FluentModal&gt;

&lt;FluentModal v-model="showModal" title="重要提示" :closable="false"&gt;
  &lt;p&gt;这个模态框不能通过点击遮罩层关闭。&lt;/p&gt;
&lt;/FluentModal&gt;</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showModal1 = ref(false)
const showModal2 = ref(false)
const showModal3 = ref(false)
</script>

<style scoped>
.modal-demo {
  max-width: 800px;
}
</style>