<template>
  <div
    class="fluent-media-player"
    :class="{ 'is-audio': isAudio, 'is-fullscreen': isFullscreen }"
    @pointermove="showControlsTemporarily"
    @pointerdown="showControlsTemporarily"
  >
    <div ref="containerRef" class="media-container">
      <component
        :is="isAudio ? 'audio' : 'video'"
        ref="mediaRef"
        class="media-element"
        :style="{ objectFit: fit }"
        :src="src"
        :poster="isAudio ? undefined : poster"
        :autoplay="autoplay"
        :loop="loopEnabled"
        :muted="mutedState"
        preload="metadata"
        playsinline
        @play="onPlay"
        @pause="onPause"
        @ended="onEnded"
        @timeupdate="onTimeUpdate"
        @loadedmetadata="onLoadedMetadata"
        @progress="onProgress"
        @waiting="isLoading = true"
        @canplay="isLoading = false"
        @enterpictureinpicture="isPictureInPicture = true"
        @leavepictureinpicture="isPictureInPicture = false"
      />

      <div v-if="isPictureInPicture" class="pip-placeholder">
        <img v-if="poster" :src="poster" alt="" />
        <div class="pip-placeholder-label">
          <FluentIcon icon="picture-in-picture-20-regular" :width="22" />
          <span>正在画中画播放</span>
        </div>
      </div>

      <div v-if="isAudio" class="audio-stage" @click="togglePlay">
        <div class="audio-artwork">
          <img v-if="poster" :src="poster" alt="" />
          <FluentIcon v-else icon="music-note-2-24-filled" :width="42" />
        </div>
        <div class="audio-meta">
          <strong>{{ title || fileName }}</strong>
          <span>{{ artist || subtitle || (isPlaying ? '正在播放' : '音频') }}</span>
        </div>
        <FluentProgressRing v-if="isLoading" :size="30" />
      </div>

      <button v-else type="button" class="media-overlay" aria-label="播放或暂停" @click="togglePlay" @dblclick="toggleFullscreen">
        <span v-if="!isPlaying && !isLoading" class="play-button">
          <FluentIcon icon="play-24-filled" :width="32" />
        </span>
        <FluentProgressRing v-if="isLoading" :size="48" />
      </button>

      <div class="media-controls" :class="{ 'is-visible': showControls || isAudio }" @click.stop @pointerdown.stop>
        <div class="controls-progress" role="slider" :aria-valuenow="currentTime" :aria-valuemax="duration" tabindex="0" @pointerdown="seekTo">
          <div class="progress-track">
            <div class="progress-buffer" :style="bufferStyle"></div>
            <div class="progress-fill" :style="progressStyle"></div>
          </div>
        </div>

        <div class="controls-bar">
          <button type="button" class="control-button" :aria-label="isPlaying ? '暂停' : '播放'" @click="togglePlay">
            <FluentIcon :icon="isPlaying ? 'pause-20-filled' : 'play-20-filled'" :width="20" />
          </button>

          <div class="controls-time">
            <span>{{ formatTime(currentTime) }}</span>
            <span class="time-separator">/</span>
            <span>{{ formatTime(duration) }}</span>
          </div>

          <div class="controls-right">
            <button
              v-if="showLoop"
              type="button"
              class="control-button"
              :class="{ active: loopEnabled }"
              :aria-pressed="loopEnabled"
              aria-label="循环播放"
              title="循环播放"
              @click="toggleLoop"
            >
              <FluentIcon icon="arrow-repeat-all-20-regular" :width="20" />
            </button>

            <div v-if="showPlaybackRate" class="control-menu">
              <button type="button" class="control-button rate-button" aria-label="播放速度" @click="toggleRateMenu">
                <span>{{ playbackRateValue }}x</span>
              </button>
              <div v-if="showRateMenu" class="control-popover rate-options">
                <button v-for="rate in playbackRates" :key="rate" type="button" :class="{ active: rate === playbackRateValue }" @click="setPlaybackRate(rate)">{{ rate }}x</button>
              </div>
            </div>

            <button
              v-if="!isAudio && showPictureInPicture && pictureInPictureSupported"
              type="button"
              class="control-button"
              :class="{ active: isPictureInPicture }"
              :aria-pressed="isPictureInPicture"
              aria-label="画中画"
              title="画中画"
              @click="togglePictureInPicture"
            >
              <FluentIcon icon="picture-in-picture-20-regular" :width="20" />
            </button>

            <div class="control-menu volume-control">
              <button type="button" class="control-button" :aria-label="mutedState ? '取消静音' : '音量'" @click="toggleVolumeMenu">
                <FluentIcon :icon="volumeIcon" :width="20" />
              </button>
              <div v-if="showVolumeMenu" class="control-popover volume-popover">
                <button type="button" class="popover-mute" @click="toggleMute">
                  <FluentIcon :icon="volumeIcon" :width="18" />
                </button>
                <input class="volume-slider" type="range" min="0" max="1" step="0.05" :value="mutedState ? 0 : volumeLevel" aria-label="音量" @input="setVolume" />
              </div>
            </div>

            <button v-if="!isAudio" type="button" class="control-button" aria-label="全屏" @click="toggleFullscreen">
              <FluentIcon :icon="isFullscreen ? 'full-screen-minimize-20-regular' : 'full-screen-maximize-20-regular'" :width="20" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import FluentIcon from './FluentIcon.vue'
import FluentProgressRing from './FluentProgressRing.vue'

const props = defineProps({
  src: { type: String, required: true },
  poster: { type: String, default: '' },
  title: { type: String, default: '' },
  artist: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  type: { type: String, default: 'auto' },
  fit: { type: String, default: 'contain' },
  autoplay: { type: Boolean, default: false },
  loop: { type: Boolean, default: false },
  muted: { type: Boolean, default: false },
  volume: { type: Number, default: 1 },
  playbackRate: { type: Number, default: 1 },
  showLoop: { type: Boolean, default: true },
  showPlaybackRate: { type: Boolean, default: true },
  showPictureInPicture: { type: Boolean, default: true }
})

const emit = defineEmits(['play', 'pause', 'ended', 'timeupdate', 'loadedmetadata', 'volumechange', 'ratechange'])

const containerRef = ref(null)
const mediaRef = ref(null)
const isPlaying = ref(false)
const isLoading = ref(true)
const currentTime = ref(0)
const duration = ref(0)
const buffered = ref(0)
const isFullscreen = ref(false)
const isPictureInPicture = ref(false)
const showControls = ref(true)
const mutedState = ref(props.muted)
const volumeLevel = ref(Math.max(0, Math.min(1, props.volume)))
const loopEnabled = ref(props.loop)
const playbackRateValue = ref(props.playbackRate)
const showRateMenu = ref(false)
const showVolumeMenu = ref(false)
const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2]
let controlsTimer = null

const isAudio = computed(() => {
  if (props.type !== 'auto') return props.type === 'audio'
  return /\.(mp3|wav|ogg|m4a|aac|flac)(?:[?#].*)?$/i.test(props.src)
})

const fileName = computed(() => {
  const name = props.src.split(/[?#]/)[0].split('/').pop() || '音频'
  try { return decodeURIComponent(name) } catch { return name }
})

const pictureInPictureSupported = computed(() => typeof document !== 'undefined' && Boolean(document.pictureInPictureEnabled))
const progressStyle = computed(() => ({ width: `${duration.value ? currentTime.value / duration.value * 100 : 0}%` }))
const bufferStyle = computed(() => ({ width: `${buffered.value}%` }))
const volumeIcon = computed(() => mutedState.value || volumeLevel.value === 0 ? 'speaker-mute-20-regular' : volumeLevel.value < 0.5 ? 'speaker-1-20-regular' : 'speaker-2-20-regular')

function togglePlay() {
  const media = mediaRef.value
  if (!media) return
  if (media.paused) media.play().catch(() => {})
  else media.pause()
}

function toggleMute() {
  const media = mediaRef.value
  if (!media) return
  mutedState.value = !mutedState.value
  media.muted = mutedState.value
  emit('volumechange', { volume: volumeLevel.value, muted: mutedState.value })
}

function setVolume(event) {
  const media = mediaRef.value
  if (!media) return
  volumeLevel.value = Number(event.target.value)
  mutedState.value = volumeLevel.value === 0
  media.volume = volumeLevel.value
  media.muted = mutedState.value
  emit('volumechange', { volume: volumeLevel.value, muted: mutedState.value })
}

function toggleLoop() {
  loopEnabled.value = !loopEnabled.value
  if (mediaRef.value) mediaRef.value.loop = loopEnabled.value
}

function setPlaybackRate(rate) {
  playbackRateValue.value = Number(rate)
  if (mediaRef.value) mediaRef.value.playbackRate = playbackRateValue.value
  showRateMenu.value = false
  emit('ratechange', playbackRateValue.value)
}

function toggleRateMenu() {
  showRateMenu.value = !showRateMenu.value
  showVolumeMenu.value = false
}

function toggleVolumeMenu() {
  showVolumeMenu.value = !showVolumeMenu.value
  showRateMenu.value = false
}

async function togglePictureInPicture() {
  const media = mediaRef.value
  if (!media || isAudio.value || !pictureInPictureSupported.value) return
  try {
    if (document.pictureInPictureElement) await document.exitPictureInPicture()
    else await media.requestPictureInPicture()
  } catch {}
}

async function toggleFullscreen() {
  if (!containerRef.value || isAudio.value) return
  try {
    if (document.fullscreenElement) await document.exitFullscreen()
    else await containerRef.value.requestFullscreen()
  } catch {}
}

function seekTo(event) {
  const media = mediaRef.value
  if (!media || !duration.value) return
  const rect = event.currentTarget.getBoundingClientRect()
  const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width))
  media.currentTime = ratio * duration.value
  currentTime.value = media.currentTime
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function showControlsTemporarily() {
  showControls.value = true
  if (controlsTimer) clearTimeout(controlsTimer)
  controlsTimer = setTimeout(() => {
    if (isPlaying.value && !isAudio.value) showControls.value = false
  }, 3000)
}

function onPlay() {
  isPlaying.value = true
  showControlsTemporarily()
  emit('play')
}

function onPause() {
  isPlaying.value = false
  showControls.value = true
  emit('pause')
}

function onEnded() {
  isPlaying.value = false
  emit('ended')
}

function onTimeUpdate() {
  if (!mediaRef.value) return
  currentTime.value = mediaRef.value.currentTime
  emit('timeupdate', currentTime.value)
}

function onLoadedMetadata() {
  const media = mediaRef.value
  if (!media) return
  duration.value = Number.isFinite(media.duration) ? media.duration : 0
  media.volume = volumeLevel.value
  media.muted = mutedState.value
  media.playbackRate = playbackRateValue.value
  media.loop = loopEnabled.value
  isLoading.value = false
  emit('loadedmetadata', { duration: duration.value })
}

function onProgress() {
  const media = mediaRef.value
  if (!media || !media.buffered.length || !duration.value) return
  buffered.value = media.buffered.end(media.buffered.length - 1) / duration.value * 100
}

function onFullscreenChange() {
  isFullscreen.value = document.fullscreenElement === containerRef.value
}

watch(() => props.loop, value => { loopEnabled.value = value })
watch(() => props.muted, value => { mutedState.value = value })
watch(() => props.src, () => {
  currentTime.value = 0
  duration.value = 0
  buffered.value = 0
  isLoading.value = true
})

onMounted(() => document.addEventListener('fullscreenchange', onFullscreenChange))
onUnmounted(() => {
  if (controlsTimer) clearTimeout(controlsTimer)
  document.removeEventListener('fullscreenchange', onFullscreenChange)
})
</script>

<style scoped>
.fluent-media-player {
  --media-control-color: #fff;
  display: inline-block;
  width: 100%;
  overflow: hidden;
  border-radius: var(--radius-md);
  background: #000;
  color: var(--media-control-color);
  touch-action: manipulation;
}

.media-container { position: relative; width: 100%; }
.media-element { display: block; width: 100%; max-height: 75vh; }
.media-container:fullscreen { width: 100vw; height: 100vh; background: #000; }
.media-container:fullscreen .media-element { width: 100vw; height: 100vh; max-height: none; }
.fluent-media-player.is-audio { --media-control-color: var(--text-primary); border: 1px solid var(--border-strong); background: var(--bg-card-solid); box-shadow: var(--shadow-4); }
.fluent-media-player.is-audio .media-element { display: none; }

.audio-stage {
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 112px;
  padding: 18px;
  background: linear-gradient(135deg, var(--accent-50), var(--bg-card-solid));
  color: var(--text-primary);
  cursor: pointer;
}

.audio-artwork { display: flex; flex: 0 0 72px; align-items: center; justify-content: center; width: 72px; height: 72px; overflow: hidden; border-radius: var(--radius-md); background: linear-gradient(135deg, var(--accent), var(--accent-dark)); color: #fff; box-shadow: var(--shadow-4); }
.audio-artwork img { width: 100%; height: 100%; object-fit: cover; }
.audio-meta { display: flex; flex: 1; min-width: 0; flex-direction: column; gap: 4px; }
.audio-meta strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.audio-meta span { color: var(--text-secondary); font-size: 13px; }

.media-overlay { position: absolute; inset: 0; z-index: 1; display: flex; align-items: center; justify-content: center; width: 100%; border: 0; background: transparent; color: #fff; cursor: pointer; }
.pip-placeholder { position: absolute; inset: 0; z-index: 2; overflow: hidden; background: #151015; }
.pip-placeholder img { width: 100%; height: 100%; object-fit: cover; }
.pip-placeholder-label { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: 8px; background: rgba(20, 12, 18, .24); color: #fff; font-weight: 600; }
.play-button { display: flex; align-items: center; justify-content: center; width: 64px; height: 64px; border-radius: 50%; background: rgba(0, 0, 0, 0.62); }

.media-controls { position: absolute; right: 0; bottom: 0; left: 0; z-index: 2; padding: 28px 12px 10px; background: linear-gradient(transparent, rgba(0, 0, 0, 0.86)); opacity: 0; pointer-events: none; transition: opacity var(--duration-fast) ease; }
.media-controls.is-visible { opacity: 1; pointer-events: auto; }
.is-audio .media-controls { position: relative; padding: 10px 12px; border-top: 1px solid var(--border-subtle); background: var(--bg-card); }
.controls-progress { position: relative; box-sizing: content-box; height: 5px; padding: 8px 0; cursor: pointer; touch-action: none; }
.progress-track { position: relative; height: 4px; overflow: hidden; border-radius: 2px; background: rgba(255,255,255,.32); }
.is-audio .progress-track { background: var(--border-strong); }
.progress-buffer, .progress-fill { position: absolute; top: 0; left: 0; height: 100%; }
.progress-buffer { background: rgba(255,255,255,.24); }
.is-audio .progress-buffer { background: var(--text-muted); opacity: .25; }
.progress-fill { border-radius: 2px; background: var(--accent); }
.controls-bar, .controls-right, .volume-control { display: flex; align-items: center; }
.controls-bar { gap: 8px; min-width: 0; }
.controls-right { gap: 4px; }
.controls-time { display: flex; flex: 1; min-width: 76px; gap: 4px; color: var(--media-control-color); font-size: 12px; white-space: nowrap; }
.time-separator { opacity: .55; }
.control-button { display: inline-flex; flex: 0 0 36px; align-items: center; justify-content: center; width: 36px; height: 36px; border: 0; border-radius: 4px; background: transparent; color: var(--media-control-color); cursor: pointer; }
.control-button:hover, .control-button.active { background: rgba(255,255,255,.18); }
.is-audio .control-button:hover, .is-audio .control-button.active { background: var(--bg-hover); color: var(--accent); }
.rate-button { width: auto; min-width: 40px; padding: 0 7px; font-size: 12px; }
.control-menu { position: relative; }
.control-popover { position: absolute; right: 0; bottom: calc(100% + 8px); z-index: 5; padding: 6px; border: 1px solid rgba(255,255,255,.26); border-radius: 6px; background: rgba(24, 20, 24, .94); box-shadow: 0 8px 24px rgba(0,0,0,.28); color: #fff; backdrop-filter: blur(18px); }
.is-audio .control-popover { border-color: var(--border-strong); background: var(--bg-card-solid); color: var(--text-primary); }
.rate-options { display: grid; min-width: 72px; gap: 2px; }
.rate-options button { min-height: 30px; padding: 0 10px; border: 0; border-radius: 4px; background: transparent; color: inherit; font: inherit; font-size: 12px; text-align: left; cursor: pointer; }
.rate-options button:hover, .rate-options button.active { background: var(--accent); color: #fff; }
.volume-popover { display: flex; align-items: center; gap: 6px; min-width: 154px; }
.popover-mute { display: inline-flex; align-items: center; justify-content: center; width: 30px; height: 30px; border: 0; border-radius: 4px; background: transparent; color: inherit; cursor: pointer; }
.popover-mute:hover { background: rgba(255,255,255,.14); }
.is-audio .popover-mute:hover { background: var(--bg-hover); }
.volume-slider { width: 104px; accent-color: var(--accent); cursor: pointer; touch-action: none; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0, 0, 0, 0); }

@media (pointer: coarse), (max-width: 640px) {
  .media-controls { opacity: 1; pointer-events: auto; }
  .control-button { flex-basis: 42px; width: 42px; height: 42px; }
  .controls-progress { padding: 12px 0; }
  .controls-time { min-width: 58px; }
  .audio-stage { min-height: 96px; padding: 12px; }
  .audio-artwork { flex-basis: 60px; width: 60px; height: 60px; }
}

@media (max-width: 480px) {
  .controls-right { gap: 0; }
  .controls-time .time-separator, .controls-time span:last-child { display: none; }
}
</style>
