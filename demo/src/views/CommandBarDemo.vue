<template>
  <div class="command-bar-demo">
    <div class="page-header">
      <h1>CommandBar 命令栏</h1>
      <p>Fluent 命令栏组件，用于显示应用程序的命令和操作。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
      :show-source-code="false"
    >
      <template #example>
        <div class="command-bar-container">
          <FluentCommandBar 
            :primary-commands="primaryCommands"
            :secondary-commands="secondaryCommands"
            @command-click="onCommandClick"
          />
          <div class="command-bar-content">
            <p>点击命令栏中的按钮查看效果。</p>
            <div v-if="lastClicked" class="demo-info">
              <p>最后点击的命令: {{ lastClicked }}</p>
            </div>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="命令类型" 
      :source-code="typesCode"
    >
      <template #example>
        <div class="demo-column">
          <div class="demo-info">
            <p>CommandBar 支持多种命令类型：</p>
            <ul>
              <li><strong>主要命令</strong> - 始终显示在命令栏中</li>
              <li><strong>次要命令</strong> - 溢出菜单中显示</li>
              <li><strong>分隔符</strong> - 用于分组的垂直线</li>
              <li><strong>带图标的命令</strong> - 显示图标的命令按钮</li>
              <li><strong>禁用的命令</strong> - 不可点击的命令</li>
            </ul>
          </div>
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentCommandBar, FluentControlExample } from 'vue-fluent-widgets'

const lastClicked = ref('')

const primaryCommands = [
  { label: '新建', icon: 'add-20-regular' },
  { label: '打开', icon: 'folder-open-20-regular' },
  { type: 'separator' },
  { label: '保存', icon: 'save-20-regular' },
  { label: '另存为', icon: 'save-as-20-regular', disabled: true }
]

const secondaryCommands = [
  { label: '打印', icon: 'print-20-regular' },
  { label: '分享', icon: 'share-20-regular' },
  { type: 'separator' },
  { label: '设置', icon: 'settings-20-regular' },
  { label: '帮助', icon: 'question-20-regular' }
]

const onCommandClick = (command) => {
  lastClicked.value = command.label
}

const basicCode = `<FluentCommandBar 
  :primary-commands="primaryCommands"
  :secondary-commands="secondaryCommands"
  @command-click="onCommandClick"
/>

const primaryCommands = [
  { label: '新建', icon: 'add-20-regular' },
  { label: '打开', icon: 'folder-open-20-regular' },
  { type: 'separator' },
  { label: '保存', icon: 'save-20-regular' }
]

const secondaryCommands = [
  { label: '打印', icon: 'print-20-regular' },
  { label: '分享', icon: 'share-20-regular' }
]`

const typesCode = `// 分隔符
{ type: 'separator' }

// 带图标的命令
{ label: '新建', icon: 'add-20-regular' }

// 禁用的命令
{ label: '另存为', disabled: true }`
</script>

<style scoped>
.command-bar-demo {
  max-width: 1000px;
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

.command-bar-container {
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.command-bar-content {
  padding: 24px;
  min-height: 200px;
}

.command-bar-content p {
  color: var(--text-secondary);
}

.demo-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.demo-info {
  padding: 16px;
  background: var(--bg-card);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-strong);
}

.demo-info p {
  margin: 0 0 12px 0;
  font-size: 14px;
  color: var(--text-secondary);
}

.demo-info ul {
  margin: 0;
  padding-left: 20px;
}

.demo-info li {
  font-size: 14px;
  color: var(--text-primary);
  line-height: 24px;
}
</style>