<template>
  <div class="dropdown-button-demo">
    <div class="page-header">
      <h1>DropDownButton 下拉按钮</h1>
      <p>Fluent 下拉按钮组件，用于显示一个按钮和下拉菜单。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentDropDownButton 
            label="选择操作" 
            :items="actions"
            @select="onSelect"
          />
          <div class="demo-info">
            <p>最后选择: {{ lastAction || '无' }}</p>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="带图标" 
      :source-code="iconCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentDropDownButton 
            label="分享" 
            :items="shareOptions"
            @select="onShare"
          />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="禁用状态" 
      :source-code="disabledCode"
    >
      <template #example>
        <div class="demo-row">
          <FluentDropDownButton 
            label="禁用按钮" 
            :items="actions"
            disabled
          />
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentDropDownButton, FluentControlExample } from 'vue-fluent-widgets'

const lastAction = ref('')

const actions = [
  { label: '新建', icon: 'add-20-regular' },
  { label: '打开', icon: 'folder-open-20-regular' },
  { label: '保存', icon: 'save-20-regular' },
  { type: 'separator' },
  { label: '删除', icon: 'delete-20-regular' }
]

const shareOptions = [
  { label: '复制链接', icon: 'link-20-regular' },
  { label: '电子邮件', icon: 'mail-20-regular' },
  { label: '社交媒体', icon: 'share-20-regular' }
]

const onSelect = (item) => {
  lastAction.value = item.label
}

const onShare = (item) => {
  console.log('分享:', item.label)
}

const basicCode = `<FluentDropDownButton 
  label="选择操作" 
  :items="actions"
  @select="onSelect"
/>

const actions = [
  { label: '新建', icon: 'add-20-regular' },
  { label: '打开', icon: 'folder-open-20-regular' },
  { label: '保存', icon: 'save-20-regular' },
  { type: 'separator' },
  { label: '删除', icon: 'delete-20-regular' }
]`

const iconCode = `<FluentDropDownButton 
  label="分享" 
  :items="shareOptions"
  @select="onShare"
/>

const shareOptions = [
  { label: '复制链接', icon: 'link-20-regular' },
  { label: '电子邮件', icon: 'mail-20-regular' },
  { label: '社交媒体', icon: 'share-20-regular' }
]`

const disabledCode = `<FluentDropDownButton 
  label="禁用按钮" 
  :items="actions"
  disabled
/>`
</script>

<style scoped>
.dropdown-button-demo {
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

.demo-row {
  display: flex;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
}

.demo-info {
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