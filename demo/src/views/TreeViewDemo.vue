<template>
  <div class="tree-view-demo">
    <div class="page-header">
      <h1>TreeView 树形视图</h1>
      <p>Fluent 树形视图组件，用于显示层级数据。</p>
    </div>

    <FluentControlExample 
      header-text="基本用法" 
      :source-code="basicCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentTreeView 
            :items="treeItems"
            :selected-id="selectedId"
            :expanded-ids="expandedIds"
            @select="onSelect"
            @expand="onExpand"
            @collapse="onCollapse"
          />
          <div class="demo-info">
            <p>选中的节点: {{ selectedNode?.label || '无' }}</p>
          </div>
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="带图标" 
      :source-code="iconCode"
    >
      <template #example>
        <div class="demo-column">
          <FluentTreeView 
            :items="iconTreeItems"
            :selected-id="selectedIconId"
            :expanded-ids="expandedIconIds"
            @select="onSelectIcon"
            @expand="onExpandIcon"
            @collapse="onCollapseIcon"
          />
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentTreeView, FluentControlExample } from 'vue-fluent-widgets'

const treeItems = [
  {
    id: '1',
    label: '文档',
    children: [
      {
        id: '1-1',
        label: '工作',
        children: [
          { id: '1-1-1', label: '报告.docx' },
          { id: '1-1-2', label: '演示文稿.pptx' }
        ]
      },
      {
        id: '1-2',
        label: '个人',
        children: [
          { id: '1-2-1', label: '照片' },
          { id: '1-2-2', label: '视频' }
        ]
      }
    ]
  },
  {
    id: '2',
    label: '下载',
    children: [
      { id: '2-1', label: '软件' },
      { id: '2-2', label: '文档' }
    ]
  },
  { id: '3', label: '桌面' }
]

const iconTreeItems = [
  {
    id: '1',
    label: '文档',
    icon: 'folder-20-regular',
    children: [
      {
        id: '1-1',
        label: '工作',
        icon: 'folder-20-regular',
        children: [
          { id: '1-1-1', label: '报告.docx', icon: 'document-20-regular' },
          { id: '1-1-2', label: '演示文稿.pptx', icon: 'presentation-20-regular' }
        ]
      },
      {
        id: '1-2',
        label: '个人',
        icon: 'folder-20-regular',
        children: [
          { id: '1-2-1', label: '照片', icon: 'image-20-regular' },
          { id: '1-2-2', label: '视频', icon: 'video-20-regular' }
        ]
      }
    ]
  },
  {
    id: '2',
    label: '下载',
    icon: 'arrow-download-20-regular',
    children: [
      { id: '2-1', label: '软件', icon: 'apps-20-regular' },
      { id: '2-2', label: '文档', icon: 'document-20-regular' }
    ]
  },
  { id: '3', label: '桌面', icon: 'desktop-20-regular' }
]

const selectedId = ref(null)
const expandedIds = ref(['1'])
const selectedNode = ref(null)

const selectedIconId = ref(null)
const expandedIconIds = ref(['1'])

const onSelect = (node) => {
  selectedId.value = node.id
  selectedNode.value = node
}

const onExpand = (nodeId) => {
  expandedIds.value = [...expandedIds.value, nodeId]
}

const onCollapse = (nodeId) => {
  expandedIds.value = expandedIds.value.filter(id => id !== nodeId)
}

const onSelectIcon = (node) => {
  selectedIconId.value = node.id
}

const onExpandIcon = (nodeId) => {
  expandedIconIds.value = [...expandedIconIds.value, nodeId]
}

const onCollapseIcon = (nodeId) => {
  expandedIconIds.value = expandedIconIds.value.filter(id => id !== nodeId)
}

const basicCode = `<FluentTreeView 
  :items="treeItems"
  :selected-id="selectedId"
  :expanded-ids="expandedIds"
  @select="onSelect"
  @expand="onExpand"
  @collapse="onCollapse"
/>

const treeItems = [
  {
    id: '1',
    label: '文档',
    children: [
      {
        id: '1-1',
        label: '工作',
        children: [
          { id: '1-1-1', label: '报告.docx' },
          { id: '1-1-2', label: '演示文稿.pptx' }
        ]
      }
    ]
  }
]`

const iconCode = `<FluentTreeView 
  :items="iconTreeItems"
  :selected-id="selectedId"
  :expanded-ids="expandedIds"
  @select="onSelect"
  @expand="onExpand"
  @collapse="onCollapse"
/>

const iconTreeItems = [
  {
    id: '1',
    label: '文档',
    icon: 'folder-20-regular',
    children: [
      { id: '1-1', label: '报告.docx', icon: 'document-20-regular' }
    ]
  }
]`
</script>

<style scoped>
.tree-view-demo {
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