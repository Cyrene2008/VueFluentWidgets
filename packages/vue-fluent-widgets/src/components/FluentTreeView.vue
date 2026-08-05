<template>
  <div class="fluent-tree-view">
    <template v-for="node in items" :key="node.id">
      <div class="tree-node" :class="{ 'is-selected': selectedId === node.id }">
        <div 
          class="tree-node-content"
          :style="{ paddingLeft: `${level * 20 + 8}px` }"
          @click="selectNode(node)"
        >
          <span 
            v-if="node.children && node.children.length > 0"
            class="tree-node-chevron"
            :class="{ 'is-expanded': expandedIds.includes(node.id) }"
            @click.stop="toggleExpand(node.id)"
          >
            <FluentIcon icon="chevron-right-20-regular" :width="12" />
          </span>
          <span v-else class="tree-node-spacer"></span>
          
          <span v-if="node.icon" class="tree-node-icon">
            <FluentIcon :icon="node.icon" :width="16" />
          </span>
          
          <span class="tree-node-label">{{ node.label }}</span>
        </div>
        
        <Transition name="expand">
          <div v-if="node.children && expandedIds.includes(node.id)" class="tree-node-children">
            <FluentTreeView
              :items="node.children"
              :level="level + 1"
              :selected-id="selectedId"
              :expanded-ids="expandedIds"
              @select="$emit('select', $event)"
              @expand="$emit('expand', $event)"
              @collapse="$emit('collapse', $event)"
            />
          </div>
        </Transition>
      </div>
    </template>
  </div>
</template>

<script setup>
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  items: { type: Array, required: true },
  level: { type: Number, default: 0 },
  selectedId: { type: [String, Number], default: null },
  expandedIds: { type: Array, default: () => [] }
})

const emit = defineEmits(['select', 'expand', 'collapse'])

const selectNode = (node) => {
  emit('select', node)
}

const toggleExpand = (nodeId) => {
  if (props.expandedIds.includes(nodeId)) {
    emit('collapse', nodeId)
  } else {
    emit('expand', nodeId)
  }
}
</script>

<style scoped>
.fluent-tree-view {
  display: flex;
  flex-direction: column;
}

.tree-node {
  display: flex;
  flex-direction: column;
}

.tree-node-content {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 8px;
  margin: 1px 4px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background 0.2s ease;
  user-select: none;
}

.tree-node-content:hover {
  background: var(--bg-hover);
}

.tree-node.is-selected .tree-node-content {
  background: var(--accent);
  color: var(--text-on-accent);
}

.tree-node-chevron {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.2s ease;
}

.tree-node-chevron.is-expanded {
  transform: rotate(90deg);
}

.tree-node-spacer {
  width: 20px;
  flex-shrink: 0;
}

.tree-node-icon {
  flex-shrink: 0;
  color: var(--text-secondary);
}

.tree-node.is-selected .tree-node-icon {
  color: var(--text-on-accent);
}

.tree-node-label {
  font-size: 14px;
  line-height: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tree-node-children {
  overflow: hidden;
}

.expand-enter-active {
  transition: all 0.2s ease;
  max-height: 500px;
  opacity: 1;
}

.expand-leave-active {
  transition: all 0.2s ease;
  max-height: 500px;
  opacity: 1;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>