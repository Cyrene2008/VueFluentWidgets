<template>
  <div class="fluent-media-player" :class="{ 'is-fullscreen': isFullscreen }">
    <div class="media-container" ref="containerRef">
      <video
        ref="videoRef"
        :src="src"
        :poster="poster"
        :autoplay="autoplay"
        :loop="loop"
        :muted="muted"
        @play="onPlay"
        @pause="onPause"
        @ended="onEnded"
        @timeupdate="onTimeUpdate"
        @loadedmetadata="onLoadedMetadata"
      />
      
      <div class="media-controls" :class="{ 'is-visible': showControls }">
        <div class="controls-progress">
          <div class="progress-bar" @click="seekTo">
            <div class="progress-fill" :style="progressStyle"></div>
          </div>
        </div>
        
        <div class="controls-buttons">
          <button class="control-button" @click="togglePlay">
            <FluentIcon :icon="isPlaying ? 'pause-20-regular' : 'play-20-regular'" :width="20" />
          </button>
          
          <div class="controls-time">
            <span>{{ formatTime(currentTime) }}</span>
            <span>/</span>
            <span>{{ formatTime(duration) }}</span>
          </div>
          
          <div class="controls-right">
            <button class="control-button" @click="toggleMute">
              <FluentIcon :icon="muted ? 'speaker-mute-20-regular' : 'speaker-2-20-regular'" :width="20" />
            </button>
            <button class="control-button" @click="toggleFullscreen">
              <FluentIcon :icon="isFullscreen ? 'full-screen-minimize-20-regular' : 'full-screen-maximize-20-regular'" :width="20" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import FluentIcon from './FluentIcon.vue'

const props = defineProps({
  src: { type: String, required: true },
  poster: { type: String, default: '' },
  autoplay: { type: Boolean, default: false },
  loop: { type: Boolean, default: false },
  muted: { type: Boolean, default: false }
})

const emit = defineEmits(['play', 'pause', 'ended', 'timeupdate'])

const containerRef = ref(null)
const videoRef = ref(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const isFullscreen = ref(false)
const showControls = ref(true)

const progressStyle = computed(() => ({
  width: `${(currentTime.value / duration.value) * 100}%`
}))

const togglePlay = () => {
  if (videoRef.value) {
    if (isPlaying.value) {
      videoRef.value.pause()
    } else {
      videoRef.value.play()
    }
  }
}

const toggleMute = () => {
  if (videoRef.value) {
    videoRef.value.muted = !videoRef.value.muted
  }
}

const toggleFullscreen = () => {
  if (containerRef.value) {
    if (!document.fullscreenElement) {
      containerRef.value.requestFullscreen()
      isFullscreen.value = true
    } else {
      document.exitFullscreen()
      isFullscreen.value = false
    }
  }
}

const seekTo = (event) => {
  if (videoRef.value) {
    const rect = event.currentTarget.getBoundingClientRect()
    const ratio = (event.clientX - rect.left) / rect.width
    videoRef.value.currentTime = ratio * duration.value
  }
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const onPlay = () => {
  isPlaying.value = true
  emit('play')
}

const onPause = () => {
  isPlaying.value = false
  emit('pause')
}

const onEnded = () => {
  isPlaying.value = false
  emit('ended')
}

const onTimeUpdate = () => {
  if (videoRef.value) {
    currentTime.value = videoRef.value.currentTime
    emit('timeupdate', currentTime.value)
  }
}

const onLoadedMetadata = () => {
  if (videoRef.value) {
    duration.value = videoRef.value.duration
  }
}
</script>

<style scoped>
.fluent-media-player {
  position: relative;
  display: inline-block;
  background: #000;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.media-container {
  position: relative;
}

.media-container video {
  width: 100%;
  display: block;
}

.media-controls {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 16px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.media-container:hover .media-controls,
.media-controls.is-visible {
  opacity: 1;
}

.controls-progress {
  margin-bottom: 8px;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  cursor: pointer;
}

.progress-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 2px;
  transition: width 0.1s ease;
}

.controls-buttons {
  display: flex;
  align-items: center;
  gap: 12px;
}

.control-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: transparent;
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: background 0.2s ease;
}

.control-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.controls-time {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 4px;
  color: white;
  font-size: 14px;
}

.controls-right {
  display: flex;
  gap: 8px;
}
</style>