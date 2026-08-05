<template>
  <div class="fluent-color-picker" :class="{ 'is-disabled': disabled }">
    <div v-if="label" class="color-picker-label">{{ label }}</div>
    <div class="color-picker-container">
      <div class="color-picker-input-wrapper">
        <div 
          class="color-preview" 
          :style="{ background: modelValue }"
          @click="togglePicker"
        ></div>
        <input
          type="text"
          class="color-input"
          :value="modelValue"
          :disabled="disabled"
          @input="onInputChange"
          @change="onInputChange"
        />
      </div>
      
      <Transition name="dropdown">
        <div v-if="isOpen" class="color-picker-dropdown">
          <div class="color-spectrum" @pointerdown="onSpectrumDown">
            <canvas ref="spectrumRef" class="spectrum-canvas" width="256" height="150"></canvas>
            <div class="spectrum-thumb" :style="spectrumThumbStyle"></div>
          </div>
          
          <div class="color-sliders">
            <div class="slider-row">
              <span class="slider-label">色相</span>
              <div class="hue-slider" @pointerdown="onHueDown">
                <div class="hue-track">
                  <div class="slider-thumb" :style="{ left: huePercent }"></div>
                </div>
              </div>
            </div>
            <div class="slider-row">
              <span class="slider-label">透明度</span>
              <div class="alpha-slider" @pointerdown="onAlphaDown">
                <div class="alpha-track" :style="{ background: alphaGradient }">
                  <div class="slider-thumb" :style="{ left: `${alpha}%` }"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="color-inputs">
            <div class="input-group">
              <label>HEX</label>
              <input type="text" :value="hexColor" @change="onHexChange" />
            </div>
            <div class="input-group">
              <label>R</label>
              <input type="number" :value="rgb.r" min="0" max="255" @change="onRgbChange('r', $event)" />
            </div>
            <div class="input-group">
              <label>G</label>
              <input type="number" :value="rgb.g" min="0" max="255" @change="onRgbChange('g', $event)" />
            </div>
            <div class="input-group">
              <label>B</label>
              <input type="number" :value="rgb.b" min="0" max="255" @change="onRgbChange('b', $event)" />
            </div>
          </div>
          
          <div v-if="showPresets" class="color-presets">
            <div 
              v-for="color in presetColors" 
              :key="color"
              class="preset-color"
              :style="{ background: color }"
              @click="selectPreset(color)"
            ></div>
          </div>
        </div>
      </Transition>
    </div>
    <div v-if="error" class="color-picker-error">{{ error }}</div>
    <div v-if="description" class="color-picker-description">{{ description }}</div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '#0078d4' },
  label: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  showPresets: { type: Boolean, default: true },
  error: { type: String, default: '' },
  description: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'change'])

const spectrumRef = ref(null)
const isOpen = ref(false)
const hue = ref(0)
const alpha = ref(100)
const isDragging = ref(false)
const dragMode = ref('')
const dragElement = ref(null)

const presetColors = [
  '#ff0000', '#ff4500', '#ffa500', '#ffd700', '#ffff00',
  '#9acd32', '#32cd32', '#008000', '#006400', '#008b8b',
  '#0000ff', '#00008b', '#4b0082', '#800080', '#ff00ff',
  '#ff1493', '#ff69b4', '#d2691e', '#8b4513', '#000000',
  '#808080', '#c0c0c0', '#ffffff'
]

const hexColor = computed(() => {
  return props.modelValue
})

const rgb = computed(() => {
  return hexToRgb(props.modelValue)
})

const alphaGradient = computed(() => {
  const rgbValue = hexToRgb(props.modelValue)
  return `linear-gradient(to right, rgba(${rgbValue.r},${rgbValue.g},${rgbValue.b},0), rgba(${rgbValue.r},${rgbValue.g},${rgbValue.b},1))`
})

const spectrumThumbStyle = computed(() => {
  const hsv = rgbToHsv(rgb.value.r, rgb.value.g, rgb.value.b)
  return {
    left: `${hsv.s * 100}%`,
    top: `${(1 - hsv.v) * 100}%`
  }
})

const huePercent = computed(() => `${(hue.value / 360) * 100}%`)

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 }
}

const rgbToHex = (r, g, b) => {
  return '#' + [r, g, b].map(x => {
    const hex = Math.max(0, Math.min(255, Math.round(x))).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
}

const hsvToRgb = (h, s, v) => {
  const c = v * s
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = v - c
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x]
  return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 }
}

const rgbToHsv = (r, g, b) => {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min
  let h = 0
  if (delta) {
    if (max === r) h = 60 * (((g - b) / delta) % 6)
    else if (max === g) h = 60 * ((b - r) / delta + 2)
    else h = 60 * ((r - g) / delta + 4)
  }
  if (h < 0) h += 360
  return { h, s: max ? delta / max : 0, v: max }
}

const drawSpectrum = () => {
  const canvas = spectrumRef.value
  const context = canvas?.getContext('2d')
  if (!canvas || !context) return
  const hueColor = hsvToRgb(hue.value, 1, 1)
  const horizontal = context.createLinearGradient(0, 0, canvas.width, 0)
  horizontal.addColorStop(0, '#fff')
  horizontal.addColorStop(1, `rgb(${hueColor.r}, ${hueColor.g}, ${hueColor.b})`)
  context.fillStyle = horizontal
  context.fillRect(0, 0, canvas.width, canvas.height)
  const whiteToTransparent = context.createLinearGradient(0, 0, 0, canvas.height)
  whiteToTransparent.addColorStop(0, 'rgba(255,255,255,0)')
  whiteToTransparent.addColorStop(1, 'rgba(255,255,255,1)')
  context.fillStyle = whiteToTransparent
  context.fillRect(0, 0, canvas.width, canvas.height)
  const black = context.createLinearGradient(0, 0, 0, canvas.height)
  black.addColorStop(0, 'rgba(0,0,0,0)')
  black.addColorStop(1, 'rgba(0,0,0,1)')
  context.fillStyle = black
  context.fillRect(0, 0, canvas.width, canvas.height)
}

const togglePicker = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
}

const onInputChange = (event) => {
  const value = event.target.value
  if (/^#[0-9a-fA-F]{6}$/.test(value)) {
    emit('update:modelValue', value)
    emit('change', value)
  }
}

const onSpectrumDown = (event) => {
  startDrag('spectrum', event)
  updateSpectrumColor(event)
}

const onSpectrumMove = (event) => {
  if (isDragging.value) {
    updateSpectrumColor(event)
  }
}

const onSpectrumUp = () => {
  isDragging.value = false
  dragMode.value = ''
  dragElement.value = null
}

const updateSpectrumColor = (event) => {
  const canvas = spectrumRef.value
  if (!canvas) return
  
  const rect = canvas.getBoundingClientRect()
  const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width))
  const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height))
  
  const color = hsvToRgb(hue.value, x, 1 - y)
  const hex = rgbToHex(color.r, color.g, color.b)
  emit('update:modelValue', hex)
  emit('change', hex)
}

const onHueDown = (event) => {
  startDrag('hue', event)
  updateHue(event)
}

const onAlphaDown = (event) => {
  startDrag('alpha', event)
  updateAlpha(event)
}

const startDrag = (mode, event) => {
  isDragging.value = true
  dragMode.value = mode
  dragElement.value = event.currentTarget
}

const updateHue = (event) => {
  const rect = dragElement.value?.getBoundingClientRect()
  if (!rect) return
  hue.value = Math.round(Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)) * 360)
  drawSpectrum()
}

const updateAlpha = (event) => {
  const rect = dragElement.value?.getBoundingClientRect()
  if (!rect) return
  alpha.value = Math.round(Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width)) * 100)
}

const onDragMove = (event) => {
  if (!isDragging.value) return
  if (dragMode.value === 'spectrum') updateSpectrumColor(event)
  else if (dragMode.value === 'hue') updateHue(event)
  else if (dragMode.value === 'alpha') updateAlpha(event)
}

const onHexChange = (event) => {
  const value = event.target.value
  if (/^#[0-9a-fA-F]{6}$/.test(value)) {
    emit('update:modelValue', value)
    emit('change', value)
  }
}

const onRgbChange = (channel, event) => {
  const value = parseInt(event.target.value)
  if (isNaN(value)) return
  
  const currentRgb = hexToRgb(props.modelValue)
  currentRgb[channel] = Math.max(0, Math.min(255, value))
  
  const hex = rgbToHex(currentRgb.r, currentRgb.g, currentRgb.b)
  emit('update:modelValue', hex)
  emit('change', hex)
}

const selectPreset = (color) => {
  emit('update:modelValue', color)
  emit('change', color)
}

const onClickOutside = (event) => {
  if (!event.target.closest('.fluent-color-picker')) {
    isOpen.value = false
  }
}

watch(isOpen, async open => {
  if (!open) return
  await nextTick()
  drawSpectrum()
})

watch(() => props.modelValue, value => {
  const current = hexToRgb(value)
  const hsv = rgbToHsv(current.r, current.g, current.b)
  if (!isDragging.value) hue.value = hsv.h
})

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  const current = hexToRgb(props.modelValue)
  hue.value = rgbToHsv(current.r, current.g, current.b).h
  drawSpectrum()
  document.addEventListener('pointermove', onDragMove)
  document.addEventListener('pointerup', onSpectrumUp)
})

onUnmounted(() => {
  document.removeEventListener('click', onClickOutside)
  document.removeEventListener('pointermove', onDragMove)
  document.removeEventListener('pointerup', onSpectrumUp)
})
</script>

<style scoped>
.fluent-color-picker {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.fluent-color-picker.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.color-picker-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.color-picker-container {
  position: relative;
}

.color-picker-input-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-preview {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-strong);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.color-preview:hover {
  transform: scale(1.05);
}

.color-input {
  flex: 1;
  height: 36px;
  padding: 8px 12px;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  background: var(--bg-card-solid);
  color: var(--text-primary);
  font-size: 14px;
  font-family: var(--font-ui);
}

.color-input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 2px rgba(0, 120, 212, 0.2);
}

.color-picker-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  margin-top: 4px;
  background: var(--bg-card);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.14);
  padding: 12px;
  min-width: 280px;
}

.color-spectrum {
  position: relative;
  width: 100%;
  height: 150px;
  border-radius: var(--radius-md);
  overflow: hidden;
  cursor: crosshair;
  margin-bottom: 12px;
}

.spectrum-canvas {
  width: 100%;
  height: 100%;
}

.spectrum-thumb {
  position: absolute;
  width: 12px;
  height: 12px;
  background: white;
  border: 2px solid #333;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.color-sliders {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.slider-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.slider-label {
  font-size: 12px;
  color: var(--text-secondary);
  width: 40px;
}

.hue-slider,
.alpha-slider {
  flex: 1;
  height: 12px;
  position: relative;
  cursor: pointer;
}

.hue-track {
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, 
    #ff0000 0%, #ffff00 17%, #00ff00 33%, 
    #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%);
  border-radius: 6px;
}

.alpha-track {
  width: 100%;
  height: 100%;
  border-radius: 6px;
  background-image: 
    linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 8px 8px;
  background-position: 0 0, 0 4px, 4px -4px, -4px 0px;
}

.slider-thumb {
  position: absolute;
  top: 50%;
  width: 14px;
  height: 14px;
  background: white;
  border: 2px solid #333;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.color-inputs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.input-group label {
  font-size: 11px;
  color: var(--text-secondary);
  text-align: center;
}

.input-group input {
  width: 100%;
  height: 28px;
  padding: 4px 6px;
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  background: var(--bg-card-solid);
  color: var(--text-primary);
  font-size: 12px;
  text-align: center;
}

.input-group input:focus {
  outline: none;
  border-color: var(--accent);
}

.color-presets {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.preset-color {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.preset-color:hover {
  transform: scale(1.1);
}

.color-picker-error {
  font-size: 12px;
  color: #c42b1c;
}

.color-picker-description {
  font-size: 12px;
  color: var(--text-secondary);
}

.dropdown-enter-active {
  transition: all 0.2s ease;
}

.dropdown-leave-active {
  transition: all 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
