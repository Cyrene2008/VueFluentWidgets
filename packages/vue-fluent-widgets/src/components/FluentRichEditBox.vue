<template>
  <div class="fluent-rich-edit-box" :class="{ 'is-disabled': disabled }">
    <div v-if="label" class="rich-edit-box-label">{{ label }}</div>
    <div class="rich-edit-box-container">
      <div class="rich-edit-box-toolbar" v-if="showToolbar">
        <button 
          v-for="tool in toolbarTools" 
          :key="tool.command"
          class="toolbar-button"
          :class="{ 'is-active': isCommandActive(tool.command) }"
          :title="tool.title"
          @click="executeCommand(tool.command)"
        >
          <FluentIcon :icon="tool.icon" :width="16" />
        </button>
      </div>
      <div
        ref="editorRef"
        class="rich-edit-box-editor"
        contenteditable="true"
        :placeholder="placeholder"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @keydown="onKeydown"
      ></div>
    </div>
    <div v-if="error" class="rich-edit-box-error">{{ error }}</div>
    <div v-if="description" class="rich-edit-box-description">{{ description }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '' },
  placeholder: { type: String, default: '输入内容...' },
  disabled: { type: Boolean, default: false },
  showToolbar: { type: Boolean, default: true },
  maxLength: { type: Number, default: 0 },
  error: { type: String, default: '' },
  description: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'change', 'focus', 'blur'])

const editorRef = ref(null)
const isFocused = ref(false)

const toolbarTools = [
  { command: 'bold', icon: 'text-bold-20-regular', title: '粗体' },
  { command: 'italic', icon: 'text-italic-20-regular', title: '斜体' },
  { command: 'underline', icon: 'text-underline-20-regular', title: '下划线' },
  { command: 'strikeThrough', icon: 'text-strikethrough-20-regular', title: '删除线' },
  { command: 'insertUnorderedList', icon: 'list-20-regular', title: '无序列表' },
  { command: 'insertOrderedList', icon: 'list-numbered-20-regular', title: '有序列表' },
  { command: 'justifyLeft', icon: 'text-align-left-20-regular', title: '左对齐' },
  { command: 'justifyCenter', icon: 'text-align-center-20-regular', title: '居中' },
  { command: 'justifyRight', icon: 'text-align-right-20-regular', title: '右对齐' }
]

const isCommandActive = (command) => {
  return document.queryCommandState(command)
}

const executeCommand = (command) => {
  document.execCommand(command, false, null)
  editorRef.value?.focus()
}

const onInput = () => {
  const html = editorRef.value?.innerHTML || ''
  emit('update:modelValue', html)
  emit('change', html)
}

const onFocus = () => {
  isFocused.value = true
  emit('focus')
}

const onBlur = () => {
  isFocused.value = false
  emit('blur')
}

const onKeydown = (event) => {
  // 处理快捷键
  if (event.ctrlKey || event.metaKey) {
    switch (event.key) {
      case 'b':
        event.preventDefault()
        executeCommand('bold')
        break
      case 'i':
        event.preventDefault()
        executeCommand('italic')
        break
      case 'u':
        event.preventDefault()
        executeCommand('underline')
        break
    }
  }
}

watch(() => props.modelValue, (value) => {
  if (editorRef.value && editorRef.value.innerHTML !== value) {
    editorRef.value.innerHTML = value || ''
  }
})

onMounted(() => {
  if (editorRef.value) {
    editorRef.value.innerHTML = props.modelValue || ''
  }
})
</script>

<style scoped>
.fluent-rich-edit-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.fluent-rich-edit-box.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.rich-edit-box-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.rich-edit-box-container {
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: border-color 0.2s ease;
}

.rich-edit-box-container:focus-within {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px rgba(0, 120, 212, 0.2);
}

.rich-edit-box-toolbar {
  display: flex;
  gap: 2px;
  padding: 8px;
  border-bottom: 1px solid var(--border-strong);
  background: var(--bg-card);
  flex-wrap: wrap;
}

.toolbar-button {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.toolbar-button:hover {
  background: var(--bg-hover);
  color: var(--text-primary);
}

.toolbar-button.is-active {
  background: rgba(0, 120, 212, 0.1);
  color: var(--accent);
}

.rich-edit-box-editor {
  min-height: 200px;
  padding: 12px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-primary);
  outline: none;
}

.rich-edit-box-editor:empty::before {
  content: attr(placeholder);
  color: var(--text-muted);
  pointer-events: none;
}

.rich-edit-box-error {
  font-size: 12px;
  color: #c42b1c;
}

.rich-edit-box-description {
  font-size: 12px;
  color: var(--text-secondary);
}
</style>