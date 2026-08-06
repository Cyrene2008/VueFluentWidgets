<template>
  <div class="playground-page">
    <div class="page-header">
      <h1>{{ text('在线 Playground', 'Online Playground') }}</h1>
      <p>{{ text('选择一个公开组件，调整 props 和 slot 内容，右侧会立即渲染当前组合。', 'Select a public component and edit its props or slots to update the preview.') }}</p>
    </div>

    <div class="playground-layout">
      <aside class="playground-controls">
        <label>
          {{ text('组件', 'Component') }}
          <select v-model="selectedName">
            <option v-for="item in componentCatalog" :key="item.name" :value="item.name">{{ item.name }}</option>
          </select>
        </label>
        <label>
          {{ text('Vue 组件标签', 'Vue component template') }}
          <textarea v-model="templateText" rows="14" spellcheck="false" />
        </label>
         <p class="playground-note">{{ text('每个组件会加载覆盖全部 Props 的示例模板。复杂 items、scoped slot、事件和组件嵌套请打开对应组件示例。', 'Every component starts with an all-props template. Open its dedicated demo for complex items, scoped slots, and events.') }}</p>
      </aside>

      <section class="playground-preview">
        <div class="preview-header">
          <span>{{ text('实时预览', 'Live preview') }}</span>
          <code>{{ selectedName }}</code>
        </div>
        <div class="preview-stage">
          <component v-if="renderedComponent" :is="renderedComponent" :key="previewKey" />
          <p v-if="previewError" class="preview-error">{{ previewError }}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { compile } from '@vue/compiler-dom'
import * as VueRuntime from 'vue'
import { computed, defineComponent, nextTick, onErrorCaptured, ref, shallowRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import { componentCatalog, Widgets } from '../data/componentCatalog'
import { useDemoLocale } from '../composables/useDemoLocale.js'

const { text } = useDemoLocale()
const route = useRoute()
const queryComponent = typeof route.query.component === 'string' ? route.query.component : ''
const selectedName = ref(componentCatalog.some(item => item.name === queryComponent) ? queryComponent : componentCatalog[0]?.name)
const templateText = ref('')
const compileError = ref('')
const renderError = ref('')
const renderedComponent = shallowRef(null)
const previewKey = ref(0)
const previewError = computed(() => compileError.value || renderError.value)
let compileVersion = 0

const catalogItem = name => componentCatalog.find(item => item.name === name)

watch(selectedName, name => {
  templateText.value = catalogItem(name)?.api.playgroundTemplate || `<${name} />`
}, { immediate: true })

watch(() => route.query.component, value => {
  if (typeof value === 'string' && componentCatalog.some(item => item.name === value)) selectedName.value = value
})

onErrorCaptured((error, instance, info) => {
  renderError.value = `${text('预览渲染失败', 'Preview render failed')}: ${error.message} (${info})`
  queueMicrotask(() => {
    renderedComponent.value = null
    previewKey.value += 1
  })
  return false
})

const compileTemplate = async source => {
  const version = ++compileVersion
  try {
    const { code } = compile(source, { mode: 'function' })
    const render = new Function('Vue', code)(VueRuntime)
    const nextComponent = defineComponent({
      name: 'PlaygroundPreview',
      components: Widgets,
      setup() {
        const asset = path => `${import.meta.env.BASE_URL}${path}`
        return { asset }
      },
      render
    })
    compileError.value = ''
    renderError.value = ''
    renderedComponent.value = null
    await nextTick()
    if (version !== compileVersion) return
    previewKey.value += 1
    renderedComponent.value = nextComponent
  } catch (error) {
    if (version !== compileVersion) return
    renderedComponent.value = null
    compileError.value = `${text('模板编译失败', 'Template compilation failed')}: ${error.message}`
  }
}

watch(templateText, compileTemplate, { immediate: true })
</script>

<style scoped>
.playground-page { max-width: 1200px; }
.page-header { margin-bottom: 24px; }
.page-header h1 { margin: 0 0 8px; color: var(--text-primary); font-size: 30px; }
.page-header p { color: var(--text-secondary); }
.playground-layout { display: grid; grid-template-columns: minmax(240px, 320px) minmax(0, 1fr); gap: 16px; }
.playground-controls, .playground-preview { min-width: 0; border: 1px solid var(--border-strong); border-radius: var(--radius-md); background: var(--bg-card); }
.playground-controls { display: flex; flex-direction: column; gap: 16px; padding: 16px; }
.playground-controls label { display: flex; flex-direction: column; gap: 7px; color: var(--text-primary); font-size: 13px; font-weight: 600; }
.playground-controls select, .playground-controls textarea { width: 100%; padding: 9px 10px; border: 1px solid var(--border-strong); border-radius: var(--radius-sm); background: var(--bg-card-solid); color: var(--text-primary); font: 13px/1.5 Consolas, monospace; resize: vertical; }
.playground-controls select { font-family: var(--font-ui); }
.playground-note { margin: 0; color: var(--text-muted); font-size: 12px; line-height: 1.6; }
.preview-header { display: flex; align-items: center; justify-content: space-between; padding: 13px 16px; border-bottom: 1px solid var(--border-strong); color: var(--text-primary); font-weight: 600; }
.preview-header code { color: var(--accent); font-size: 12px; }
.preview-stage { display: flex; min-height: 360px; flex-direction: column; align-items: center; justify-content: center; gap: 16px; padding: 28px; overflow: auto; background: var(--bg-card-solid); }
.preview-stage > :deep(*) { max-width: 100%; }
.preview-error { max-width: 100%; margin: 0; padding: 10px 12px; border: 1px solid color-mix(in srgb, #d13438 35%, transparent); border-radius: var(--radius-sm); background: color-mix(in srgb, #d13438 8%, transparent); color: #d13438; font-size: 12px; overflow-wrap: anywhere; }
@media (max-width: 760px) { .playground-layout { grid-template-columns: 1fr; } .preview-stage { min-height: 260px; padding: 18px; } }
</style>
