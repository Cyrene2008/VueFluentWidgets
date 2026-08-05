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
            src="/loop.mp4"
            poster="/images/Cyrene01.webp"
            class="demo-player"
          />
          <FluentInfoBar severity="info" title="版权声明" description="以上视频仅供非商业用途展示使用，版权归米哈游所有" />
        </div>
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="图片画廊" 
      :source-code="galleryCode"
    >
      <template #example>
        <div class="image-gallery">
          <div v-for="(image, index) in images" :key="index" class="gallery-item">
            <FluentImageViewer 
              :src="image.src" 
              :alt="image.alt"
              :caption="image.caption"
              clickable
              @click="selectedImage = image"
            />
          </div>
        </div>
        <FluentInfoBar severity="info" title="版权声明" description="以上图片仅供非商业用途展示使用，版权归米哈游所有" />
      </template>
    </FluentControlExample>

    <FluentControlExample 
      header-text="PersonPicture 使用" 
      :source-code="avatarCode"
    >
      <template #example>
        <div class="avatar-demo">
          <FluentPersonPicture :size="64" src="/images/avatar.webp" display-name="Cyrene2008" />
          <div class="avatar-info">
            <h3>Cyrene2008</h3>
            <p>项目开发者</p>
          </div>
        </div>
        <FluentInfoBar severity="info" title="版权声明" description="头像仅供非商业用途展示使用，版权归米哈游所有" />
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
  FluentControlExample 
} from 'vue-fluent-widgets'

const selectedImage = ref(null)

const images = [
  { src: '/images/Cyrene01.webp', alt: '图片1', caption: 'Cyrene01' },
  { src: '/images/Cyrene02.webp', alt: '图片2', caption: 'Cyrene02' },
  { src: '/images/Cyrene03.webp', alt: '图片3', caption: 'Cyrene03' },
  { src: '/images/Cyrene04.webp', alt: '图片4', caption: 'Cyrene04' },
  { src: '/images/Cyrene05.webp', alt: '图片5', caption: 'Cyrene05' }
]

const playerCode = `<FluentMediaPlayer 
  src="/loop.mp4"
  poster="/images/Cyrene01.webp"
/>`

const galleryCode = `<FluentImageViewer 
  src="/images/Cyrene01.webp" 
  alt="图片"
  caption="描述"
  clickable
/>`

const avatarCode = `<FluentPersonPicture 
  :size="64" 
  src="/images/avatar.webp" 
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
}

.demo-player {
  width: 100%;
  max-width: 640px;
}

.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
}

.gallery-item {
  aspect-ratio: 16/9;
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