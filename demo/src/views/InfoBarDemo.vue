<template>
  <div class="info-bar-demo">
    <div class="page-header">
      <h1>InfoBar 信息栏</h1>
      <p>Fluent 信息栏组件，用于显示重要信息。</p>
    </div>

    <FluentControlExample 
      header-text="不同类型" 
      :source-code="typesCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentInfoBar title="信息" message="这是一条信息提示。" severity="info" />
          <FluentInfoBar title="成功" message="操作成功完成！" severity="success" />
          <FluentInfoBar title="警告" message="请注意，这可能会影响性能。" severity="warning" />
          <FluentInfoBar title="错误" message="操作失败，请重试。" severity="error" />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="可关闭" 
      :source-code="closableCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentInfoBar 
            v-model="isVisible" 
            title="可关闭的信息栏" 
            message="点击关闭按钮可以关闭此信息栏。" 
            severity="info" 
          />
          <FluentButton @click="isVisible = true" v-if="!isVisible">显示信息栏</FluentButton>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="带操作按钮" 
      :source-code="actionCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentInfoBar 
            title="更新可用" 
            message="有新版本可用，请更新。" 
            severity="info" 
            action="更新"
            @action="handleAction"
          />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="无标题" 
      :source-code="noTitleCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentInfoBar message="这是一条没有标题的信息提示。" severity="info" />
          <FluentInfoBar message="操作成功完成！" severity="success" />
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentInfoBar, FluentButton, FluentControlExample } from 'vue-fluent-widgets'

const isVisible = ref(true)

const handleAction = () => {
  alert('更新操作被触发')
}

const typesCode = `<FluentInfoBar title="信息" message="这是一条信息提示。" severity="info" />
<FluentInfoBar title="成功" message="操作成功完成！" severity="success" />
<FluentInfoBar title="警告" message="请注意，这可能会影响性能。" severity="warning" />
<FluentInfoBar title="错误" message="操作失败，请重试。" severity="error" />`

const closableCode = `<FluentInfoBar 
  v-model="isVisible" 
  title="可关闭的信息栏" 
  message="点击关闭按钮可以关闭此信息栏。" 
  severity="info" 
/>

const isVisible = ref(true)`

const actionCode = `<FluentInfoBar 
  title="更新可用" 
  message="有新版本可用，请更新。" 
  severity="info" 
  action="更新"
  @action="handleAction"
/>`

const noTitleCode = `<FluentInfoBar message="这是一条没有标题的信息提示。" severity="info" />
<FluentInfoBar message="操作成功完成！" severity="success" />`
</script>

<style scoped>
.info-bar-demo {
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
  gap: 12px;
}
</style>