<template>
  <FluentMediaPlayer v-bind="$attrs" :src="src" :poster="poster" :autoplay="autoplay" :loop="loop" :muted="muted" />
</template>

<script setup>
import FluentMediaPlayer from './FluentMediaPlayer.vue'

defineOptions({ inheritAttrs: false })

defineProps({
  src: { type: String, required: true },
  poster: { type: String, default: '' },
  autoplay: { type: Boolean, default: false },
  loop: { type: Boolean, default: false },
  muted: { type: Boolean, default: false }
})
</script>
