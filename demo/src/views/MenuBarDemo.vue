<template>
  <div class="menu-bar-demo">
    <div class="page-header">
      <h1>MenuBar 菜单栏</h1>
      <p>Fluent 菜单栏组件，用于应用程序的主菜单。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
      :show-source-code="false"
    >
      <template #example>
        <div class="menu-bar-container">
          <FluentMenuBar :items="menuItems" @item-click="onItemClick" />
          <div class="menu-bar-content">
            <p>点击菜单栏中的项目查看效果。</p>
            <div v-if="lastClicked" class="demo-info">
              <p>最后点击的项目: {{ lastClicked }}</p>
            </div>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="菜单项类型" 
      :source-code="typesCode"
    >
      <template #example>
        <div class="demo-column">
          <div class="demo-info">
            <p>MenuBar 支持多种菜单项类型：</p>
            <ul>
              <li><strong>普通菜单项</strong> - 可点击的菜单项</li>
              <li><strong>分隔符</strong> - 用于分组的水平线</li>
              <li><strong>带图标的项</strong> - 显示图标的菜单项</li>
              <li><strong>带快捷键的项</strong> - 显示快捷键的菜单项</li>
              <li><strong>禁用的项</strong> - 不可点击的菜单项</li>
            </ul>
          </div>
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentMenuBar, FluentControlExample } from 'vue-fluent-widgets'

const lastClicked = ref('')

const menuItems = [
  {
    label: '文件',
    icon: 'document-20-regular',
    children: [
      { label: '新建', icon: 'add-20-regular', shortcut: 'Ctrl+N' },
      { label: '打开', icon: 'folder-open-20-regular', shortcut: 'Ctrl+O' },
      { label: '保存', icon: 'save-20-regular', shortcut: 'Ctrl+S' },
      { type: 'separator' },
      { label: '另存为...', icon: 'save-as-20-regular' },
      { type: 'separator' },
      { label: '打印', icon: 'print-20-regular', shortcut: 'Ctrl+P', disabled: true },
      { type: 'separator' },
      { label: '退出', icon: 'dismiss-20-regular' }
    ]
  },
  {
    label: '编辑',
    icon: 'edit-20-regular',
    children: [
      { label: '撤销', icon: 'arrow-undo-20-regular', shortcut: 'Ctrl+Z' },
      { label: '重做', icon: 'arrow-redo-20-regular', shortcut: 'Ctrl+Y' },
      { type: 'separator' },
      { label: '剪切', icon: 'cut-20-regular', shortcut: 'Ctrl+X' },
      { label: '复制', icon: 'copy-20-regular', shortcut: 'Ctrl+C' },
      { label: '粘贴', icon: 'clipboard-paste-20-regular', shortcut: 'Ctrl+V' },
      { type: 'separator' },
      { label: '全选', icon: 'select-all-20-regular', shortcut: 'Ctrl+A' }
    ]
  },
  {
    label: '视图',
    icon: 'eye-20-regular',
    children: [
      { label: '缩放', icon: 'zoom-in-20-regular' },
      { label: '全屏', icon: 'full-screen-maximize-20-regular', shortcut: 'F11' },
      { type: 'separator' },
      { label: '状态栏', icon: 'status-20-regular' },
      { label: '侧边栏', icon: 'panel-left-20-regular' }
    ]
  },
  {
    label: '帮助',
    icon: 'question-20-regular',
    children: [
      { label: '文档', icon: 'book-20-regular' },
      { label: '关于', icon: 'info-20-regular' }
    ]
  }
]

const onItemClick = (item) => {
  lastClicked.value = item.label
}

const basicCode = `<FluentMenuBar :items="menuItems" @item-click="onItemClick" />

const menuItems = [
  {
    label: '文件',
    icon: 'document-20-regular',
    children: [
      { label: '新建', icon: 'add-20-regular', shortcut: 'Ctrl+N' },
      { label: '打开', icon: 'folder-open-20-regular', shortcut: 'Ctrl+O' },
      { label: '保存', icon: 'save-20-regular', shortcut: 'Ctrl+S' }
    ]
  }
]`

const typesCode = `// 分隔符
{ type: 'separator' }

// 带图标的项
{ label: '新建', icon: 'add-20-regular' }

// 带快捷键的项
{ label: '保存', shortcut: 'Ctrl+S' }

// 禁用的项
{ label: '打印', disabled: true }`
</script>

<style scoped>
.menu-bar-demo {
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

.menu-bar-container {
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.menu-bar-content {
  padding: 24px;
  min-height: 200px;
}

.menu-bar-content p {
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