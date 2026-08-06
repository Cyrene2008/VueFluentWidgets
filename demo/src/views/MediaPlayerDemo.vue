<template>
  <div class="media-player-demo">
    <div class="page-header">
      <h1>MediaPlayer 媒体播放器</h1>
      <p>Fluent 媒体播放器组件，用于播放视频和音频。</p>
    </div>

    <FluentControlExample 
      header-text="视频播放器" 
      :source-code="playerCode"
    >
      <template #example>
        <div class="player-container">
          <FluentMediaPlayer 
            :src="asset('loop.mp4')"
            :poster="asset('images/Cyrene01.webp')"
            show-minimize
            class="demo-player"
            @minimize="startMedia"
          />
          <FluentInfoBar severity="info" title="视频素材版权声明" message="视频素材来源于《崩坏：星穹铁道》相关内容，原始版权归 miHoYo / HoYoverse 及其他原权利人所有。本页面仅用于 Vue Fluent Widgets 组件演示，不主张相关素材权利。" :closable="false" />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="音频播放器" 
      :source-code="audioCode"
    >
      <template #example>
        <div class="audio-container">
          <FluentMediaPlayer 
            :src="asset('trimmed_NewPage.mp3')"
            :poster="asset('images/avatar.webp')"
            type="audio"
            title="New Page"
            artist="Cyrene2008"
            show-minimize
            class="demo-audio"
            @minimize="startMedia"
          />
          <FluentInfoBar severity="info" title="音频素材版权声明" message="音频素材来源于《崩坏：星穹铁道》相关内容，原始版权归 miHoYo / HoYoverse 及其他原权利人所有。本页面仅用于 Vue Fluent Widgets 组件演示，不主张相关素材权利。" :closable="false" />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="图片画廊" 
      :source-code="galleryCode"
    >
      <template #example>
        <div class="gallery-container">
          <div class="image-gallery">
            <div v-for="(image, index) in images" :key="index" class="gallery-item">
              <FluentImageViewer
                :src="image.src"
                :alt="image.alt"
                :caption="image.caption"
                width="100%"
                :height="180"
                fit="cover"
                clickable
                @click="openImage(image)"
              />
            </div>
          </div>
          <FluentInfoBar severity="info" title="图片素材版权声明" message="图片素材来源于《崩坏：星穹铁道》相关内容，原始版权归 miHoYo / HoYoverse 及其他原权利人所有。本页面仅用于 Vue Fluent Widgets 组件演示，不主张相关素材权利。" :closable="false" />
        </div>
      </template>
    </FluentControlExample>

    <div v-if="selectedImage" class="image-preview" role="dialog" aria-modal="true" @click.self="selectedImage = null" @wheel.prevent="onPreviewWheel">
      <div class="image-preview__toolbar" role="toolbar" aria-label="图片查看工具">
        <button type="button" aria-label="缩小" @click="changeZoom(-0.2)"><FluentIcon icon="zoom-out-20-regular" :width="20" /></button>
        <span>{{ Math.round(previewZoom * 100) }}%</span>
        <button type="button" aria-label="放大" @click="changeZoom(0.2)"><FluentIcon icon="zoom-in-20-regular" :width="20" /></button>
        <span class="image-preview__divider"></span>
        <button type="button" aria-label="向左旋转" @click="previewRotation -= 90"><FluentIcon icon="arrow-rotate-counterclockwise-20-regular" :width="20" /></button>
        <button type="button" aria-label="向右旋转" @click="previewRotation += 90"><FluentIcon icon="arrow-rotate-clockwise-20-regular" :width="20" /></button>
        <button type="button" aria-label="重置" @click="resetPreview"><FluentIcon icon="arrow-reset-20-regular" :width="20" /></button>
        <span class="image-preview__divider"></span>
        <button type="button" aria-label="关闭图片预览" @click="selectedImage = null"><FluentIcon icon="dismiss-20-regular" :width="20" /></button>
      </div>
      <div class="image-preview__viewport">
        <img :src="selectedImage.src" :alt="selectedImage.alt" class="image-preview__image" :style="{ transform: `scale(${previewZoom}) rotate(${previewRotation}deg)` }" />
      </div>
      <p>{{ selectedImage.caption }}</p>
    </div>

    <FluentControlExample 
      header-text="PersonPicture 使用" 
      :source-code="avatarCode"
    >
      <template #example>
        <div class="avatar-demo">
          <FluentPersonPicture :size="64" :src="asset('images/avatar.webp')" display-name="Cyrene2008" />
          <div class="avatar-info">
            <h3>Cyrene2008</h3>
            <p>项目开发者</p>
          </div>
        </div>
      </template>
    </FluentControlExample>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  FluentMediaPlayer, 
  FluentImageViewer, 
  FluentPersonPicture, 
  FluentInfoBar, 
  FluentControlExample,
  FluentIcon
} from 'vue-fluent-widgets'
import { usePersistentMedia } from '../composables/usePersistentMedia.js'

const selectedImage = ref(null)
const previewZoom = ref(1)
const previewRotation = ref(0)
const asset = path => `${import.meta.env.BASE_URL}${path}`
const { startMedia } = usePersistentMedia()

const images = [
  { src: asset('images/Cyrene01.webp'), alt: '图片1', caption: 'Cyrene01' },
  { src: asset('images/Cyrene02.webp'), alt: '图片2', caption: 'Cyrene02' },
  { src: asset('images/Cyrene03.webp'), alt: '图片3', caption: 'Cyrene03' },
  { src: asset('images/Cyrene04.webp'), alt: '图片4', caption: 'Cyrene04' },
  { src: asset('images/Cyrene05.webp'), alt: '图片5', caption: 'Cyrene05' }
]

const resetPreview = () => {
  previewZoom.value = 1
  previewRotation.value = 0
}

const openImage = image => {
  selectedImage.value = image
  resetPreview()
}

const changeZoom = amount => {
  previewZoom.value = Math.max(0.4, Math.min(3, previewZoom.value + amount))
}

const onPreviewWheel = event => changeZoom(event.deltaY > 0 ? -0.1 : 0.1)

const playerCode = `<FluentMediaPlayer 
  :src="asset('loop.mp4')"
  :poster="asset('images/Cyrene01.webp')"
  show-minimize
  @minimize="continuePlaying"
/>`

const audioCode = `<FluentMediaPlayer 
  :src="asset('trimmed_NewPage.mp3')"
  :poster="asset('images/avatar.webp')"
  type="audio"
  title="New Page"
  artist="Cyrene2008"
  show-minimize
  @minimize="continuePlaying"
/>`

const galleryCode = `<FluentImageViewer 
  :src="asset('images/Cyrene01.webp')"
  alt="图片"
  caption="描述"
  clickable
/>`

const avatarCode = `<FluentPersonPicture 
  :size="64" 
  :src="asset('images/avatar.webp')"
  display-name="Cyrene2008" 
/>`
</script>

<style scoped>
.media-player-demo {
  max-width: 1000px;
}

.page-header {
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
}

.page-header p {
  color: var(--text-secondary);
}

.player-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.audio-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.demo-player {
  width: 100%;
  max-width: 640px;
}

.demo-audio {
  width: 100%;
  max-width: 640px;
}

.gallery-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.gallery-item {
  min-width: 0;
}

.gallery-item :deep(.fluent-image-viewer) { display: block; width: 100%; }

.image-preview {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 32px;
  background: rgba(30, 12, 24, 0.82);
}

.image-preview__toolbar {
  position: absolute;
  top: 22px;
  left: 50%;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px;
  border: 1px solid rgba(255,255,255,.2);
  border-radius: 8px;
  background: rgba(35, 24, 33, .9);
  color: #fff;
  box-shadow: 0 8px 24px rgba(0,0,0,.3);
  transform: translateX(-50%);
}

.image-preview__toolbar button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: #fff;
  cursor: pointer;
}

.image-preview__toolbar button:hover { background: rgba(255,255,255,.14); }
.image-preview__toolbar > span:not(.image-preview__divider) { min-width: 46px; font-size: 13px; text-align: center; }
.image-preview__divider { width: 1px; height: 24px; margin: 0 3px; background: rgba(255,255,255,.18); }

.image-preview__viewport {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 150px);
  overflow: hidden;
}

.image-preview__image {
  max-width: min(90vw, 1000px);
  max-height: calc(100vh - 180px);
  object-fit: contain;
  transition: transform var(--duration-normal) var(--ease-standard);
}

.image-preview p {
  color: #fff;
}

.avatar-demo {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.avatar-info h3 {
  margin: 0 0 4px 0;
  font-size: 18px;
}

.avatar-info p {
  margin: 0;
  color: var(--text-secondary);
}
</style>
