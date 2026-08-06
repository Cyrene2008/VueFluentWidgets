<template>
  <div class="docs-page composition-guide">
    <div class="page-header">
      <h1>{{ text('组合与插槽', 'Composition and slots') }}</h1>
      <p>{{ text('组件不是固定模板。items 只负责数据，真正的内容由你的 slot 决定，可以放图片、视频、表单或其他组件。', 'Components are not fixed templates. Items provide data while slots can render images, video, forms, or other components.') }}</p>
    </div>

    <FluentControlExample :header-text="text('FlipView 放入任意 Vue 内容', 'Render any Vue content in FlipView')" :source-code="flipCode">
      <template #example>
        <FluentFlipView v-model="currentIndex" :items="slides" class="composition-flip">
          <template #default="{ item }">
            <article class="slide-card">
              <img v-if="item.kind === 'image'" :src="item.src" :alt="item.title" />
               <FluentMediaPlayer
                 v-else-if="item.kind === 'video'"
                 :src="item.src"
                 :poster="item.poster"
                 fit="contain"
                 height="100%"
                 max-height="100%"
                 :show-loop="false"
               />
              <div v-else class="slide-copy">
                <FluentIcon icon="code-20-regular" :width="32" />
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
              <footer><strong>{{ item.title }}</strong><span>{{ item.description }}</span></footer>
            </article>
          </template>
        </FluentFlipView>
      </template>
    </FluentControlExample>

    <section class="docs-section">
      <h2>{{ text('可以放什么？', 'What can a slot contain?') }}</h2>
      <div class="rules">
        <div><strong>{{ text('图片', 'Images') }}</strong><span>{{ text('使用普通 img，尺寸由你的布局控制。', 'Use a normal img element and control sizing in your layout.') }}</span></div>
        <div><strong>{{ text('视频或音频', 'Video or audio') }}</strong><span>{{ text('直接嵌套 FluentMediaPlayer，和其他 Vue 组件没有区别。', 'Nest FluentMediaPlayer like any other Vue component.') }}</span></div>
        <div><strong>{{ text('业务内容', 'Application content') }}</strong><span>{{ text('表单、按钮、卡片、异步数据和自定义 HTML 都可以作为 slot 内容。', 'Forms, buttons, async data, and custom HTML can all be slot content.') }}</span></div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FluentControlExample, FluentFlipView, FluentIcon, FluentMediaPlayer } from 'vue-fluent-widgets'
import { useDemoLocale } from '../composables/useDemoLocale.js'

const { text } = useDemoLocale()
const asset = path => `${import.meta.env.BASE_URL}${path}`
const currentIndex = ref(0)
const slides = [
  { kind: 'image', title: '图片内容', description: '普通图片也可以作为 slide', src: asset('images/Cyrene01.webp') },
  { kind: 'video', title: '视频内容', description: '嵌套 MediaPlayer', src: asset('loop.mp4'), poster: asset('images/Cyrene02.webp') },
  { kind: 'text', title: '业务内容', description: 'slot 可以放任意 Vue 内容' }
]

const flipCode = `<FluentFlipView v-model="currentIndex" :items="items" style="height: 300px;">
  <template #default="{ item }">
    <FluentMediaPlayer
      v-if="item.kind === 'video'"
      :src="item.src"
      :poster="item.poster"
      fit="contain"
      height="100%"
      max-height="100%"
    />
    <img v-else-if="item.kind === 'image'" :src="item.src" :alt="item.title" />
    <YourBusinessCard v-else :data="item" />
  </template>
</FluentFlipView>

const currentIndex = ref(0)
const items = [
  { kind: 'image', src: asset('images/Cyrene01.webp') },
  { kind: 'video', src: asset('loop.mp4'), poster: asset('images/Cyrene02.webp') },
  { kind: 'custom', title: '自己的业务内容' }
]`
</script>

<style scoped>
.docs-page { max-width: 1000px; }
.page-header { margin-bottom: 28px; }
.page-header h1 { margin: 0 0 8px; color: var(--text-primary); font-size: 30px; }
.page-header p, .docs-section p { color: var(--text-secondary); line-height: 1.7; }
.composition-flip { width: 100%; height: auto; aspect-ratio: 16 / 9; max-height: 520px; }
.slide-card { position: relative; width: 100%; height: 100%; overflow: hidden; border-radius: var(--radius-md); background: #101014; }
.slide-card > img { display: block; width: 100%; height: 100%; object-fit: contain; }
.slide-card > :deep(.fluent-media-player) { width: 100%; height: 100%; }
.slide-card > :deep(.fluent-media-player .media-container), .slide-card > :deep(.fluent-media-player .media-element) { height: 100%; }
.slide-card > :deep(.fluent-media-player .media-element) { object-fit: contain; }
.slide-card footer { position: absolute; right: 0; bottom: 0; left: 0; display: flex; flex-direction: column; gap: 3px; padding: 22px 18px 14px; background: linear-gradient(transparent, rgba(0,0,0,.72)); color: #fff; }
.slide-card footer span { font-size: 12px; opacity: .82; }
.slide-copy { display: flex; height: 100%; flex-direction: column; align-items: center; justify-content: center; gap: 10px; color: var(--text-primary); }
.slide-copy h3, .slide-copy p { margin: 0; }
.slide-copy p { color: var(--text-secondary); }
.docs-section { margin-top: 30px; }
.docs-section h2 { color: var(--text-primary); font-size: 18px; }
.rules { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 14px; }
.rules div { display: flex; flex-direction: column; gap: 8px; padding: 16px; border: 1px solid var(--border-strong); border-radius: var(--radius-md); background: var(--bg-card); }
.rules span { color: var(--text-secondary); font-size: 13px; line-height: 1.6; }
@media (max-width: 720px) { .rules { grid-template-columns: 1fr; } }
</style>
