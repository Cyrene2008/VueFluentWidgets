<template>
  <div class="password-box-demo">
    <div class="page-header">
      <h1>PasswordBox 密码框</h1>
      <p>Fluent 密码框组件，用于输入密码。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentPasswordBox 
            v-model="password" 
            label="密码"
            placeholder="请输入密码"
          />
          <div class="demo-info">
            <p>密码长度: {{ password.length }}</p>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="显示密码" 
      :source-code="revealCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentPasswordBox 
            v-model="password2" 
            label="点击显示密码"
            placeholder="请输入密码"
            reveal-mode="click"
          />
          <FluentPasswordBox 
            v-model="password3" 
            label="按住显示密码"
            placeholder="请输入密码"
            reveal-mode="peek"
          />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="禁用状态" 
      :source-code="disabledCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentPasswordBox 
            v-model="disabledPassword" 
            label="禁用的密码框"
            disabled
          />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="带描述和错误" 
      :source-code="descriptionCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentPasswordBox 
            v-model="password4" 
            label="密码"
            placeholder="请输入密码"
            description="密码长度至少为8个字符"
          />
          <FluentPasswordBox 
            v-model="password5" 
            label="确认密码"
            placeholder="请再次输入密码"
            error="两次输入的密码不一致"
          />
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentPasswordBox, FluentControlExample } from 'vue-fluent-widgets'

const password = ref('')
const password2 = ref('')
const password3 = ref('')
const disabledPassword = ref('password123')
const password4 = ref('')
const password5 = ref('')

const basicCode = `<FluentPasswordBox 
  v-model="password" 
  label="密码"
  placeholder="请输入密码"
/>

const password = ref('')`

const revealCode = `<FluentPasswordBox 
  v-model="password" 
  label="点击显示密码"
  reveal-mode="click"
/>
<FluentPasswordBox 
  v-model="password" 
  label="按住显示密码"
  reveal-mode="peek"
/>`

const disabledCode = `<FluentPasswordBox 
  v-model="password" 
  label="禁用的密码框"
  disabled
/>`

const descriptionCode = `<FluentPasswordBox 
  v-model="password" 
  label="密码"
  description="密码长度至少为8个字符"
/>
<FluentPasswordBox 
  v-model="password" 
  label="确认密码"
  error="两次输入的密码不一致"
/>`
</script>

<style scoped>
.password-box-demo {
  max-width: 800px;
}

.page-header {
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.page-header p {
  color: var(--text-secondary);
  font-size: 14px;
}

.demo-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
}

.demo-info {
  margin-top: 16px;
  padding: 12px;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-strong);
}

.demo-info p {
  margin: 0;
  font-size: 14px;
  color: var(--text-secondary);
}
</style>