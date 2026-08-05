<template>
  <section class="control-example-root">
    <h3 v-if="headerText" class="control-example-header">{{ headerText }}</h3>
    
    <div class="control-example-frame">
      <div class="example-container">
        <div class="example-display" :data-theme="theme">
          <slot name="example">
            <slot></slot>
          </slot>
        </div>
        
        <aside v-if="hasOptions" class="example-options">
          <slot name="options"></slot>
        </aside>
      </div>
      
      <div v-if="showSourceCode" class="code-expander">
        <FluentCard class="source-code-card">
          <div class="source-code-header">
            <span>源代码</span>
            <FluentButton variant="subtle" size="sm" @click="copyCode">
              <FluentIcon icon="copy" width="14" />
              复制
            </FluentButton>
          </div>
          <div class="source-code-content">
            <pre><code>{{ sourceCode }}</code></pre>
          </div>
        </FluentCard>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, useSlots } from 'vue'
import FluentCard from './FluentCard.vue'
import FluentButton from './FluentButton.vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  headerText: { type: String, default: '' },
  theme: { type: String, default: 'light' },
  sourceCode: { type: String, default: '' },
  showSourceCode: { type: Boolean, default: true }
})

const slots = useSlots()
const hasOptions = computed(() => !!slots.options)

const copyCode = () => {
  if (props.sourceCode) {
    navigator.clipboard.writeText(props.sourceCode)
  }
}
</script>

<style scoped>
.control-example-root {
  margin-bottom: 32px;
}

.control-example-header {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  margin: 28px 0 12px 0;
  color: var(--text-primary);
}

.control-example-frame {
  background: var(--bg-card);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-2);
  overflow: visible;
}

.example-container {
  display: flex;
  min-width: 0;
  overflow: visible;
  min-height: 100px;
}

.example-display {
  flex: 1;
  min-width: 0;
  overflow: visible;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card-solid);
}

.example-display > :deep(*) {
  max-width: 100%;
}

@media (max-width: 720px) {
  .example-container {
    flex-direction: column;
  }

  .example-options {
    width: 100%;
    min-width: 0;
    border-top: 1px solid var(--border-strong);
    border-left: 0;
  }
}

.example-options {
  flex: 0 1 250px;
  min-width: 180px;
  padding: 16px;
  border-left: 1px solid var(--border-strong);
  background: var(--bg-card);
}

.code-expander {
  border-top: 1px solid var(--border-strong);
}

.source-code-card {
  margin: 0;
  border-radius: 0;
  box-shadow: none;
}

.source-code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-strong);
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.source-code-content {
  padding: 16px;
  background: #f8f8f8;
  overflow-x: auto;
}

.source-code-content pre {
  margin: 0;
  font-family: 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-primary);
}

.source-code-content code {
  white-space: pre;
}
</style>
