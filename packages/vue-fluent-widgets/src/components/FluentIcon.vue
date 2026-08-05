<template>
  <Icon :icon="fullIcon" :width="width" :height="height" :class="['fluent-icon', className]" />
</template>

<script setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  icon: { type: String, required: true },
  width: { type: [Number, String], default: 20 },
  height: { type: [Number, String], default: undefined },
  className: { type: String, default: '' }
})

const iconAliases = {
  home: 'home-20-regular',
  settings: 'settings-20-regular',
  search: 'search-20-regular',
  add: 'add-20-regular',
  delete: 'delete-20-regular',
  edit: 'edit-20-regular',
  heart: 'heart-20-regular',
  star: 'star-20-regular',
  share: 'share-20-regular',
  download: 'arrow-download-20-regular',
  upload: 'arrow-upload-20-regular',
  copy: 'copy-20-regular',
  check: 'checkmark-20-regular',
  close: 'dismiss-20-regular',
  'arrow-left': 'arrow-left-20-regular',
  'arrow-right': 'arrow-right-20-regular',
  'chevron-down': 'chevron-down-20-regular',
  'chevron-up': 'chevron-up-20-regular',
  'more-horizontal': 'more-horizontal-20-regular',
  'more-vertical': 'more-vertical-20-regular',
  options: 'options-20-regular',
  'auto-suggest': 'search-20-regular',
  button: 'cursor-click-20-regular',
  checkbox: 'checkbox-checked-20-regular',
  'color-picker': 'eyedropper-20-regular',
  calendar: 'calendar-20-regular',
  'dropdown-button': 'chevron-down-20-regular',
  hyperlink: 'link-20-regular',
  'text-field': 'textbox-20-regular',
  'list-box': 'list-20-regular',
  number: 'number-symbol-20-regular',
  password: 'password-20-regular',
  'radio-button': 'radio-button-20-regular',
  'repeat-button': 'arrow-repeat-all-20-regular',
  list: 'list-20-regular',
  slider: 'slide-size-20-regular',
  'split-button': 'split-horizontal-20-regular',
  text: 'document-text-20-regular',
  clock: 'clock-20-regular',
  'toggle-left': 'toggle-left-20-regular',
  layout: 'layout-column-two-20-regular',
  card: 'card-ui-20-regular',
  expander: 'chevron-down-20-regular',
  tabs: 'tab-20-regular',
  feedback: 'chat-20-regular',
  flyout: 'window-new-20-regular',
  'info-bar': 'info-20-regular',
  modal: 'window-20-regular',
  'progress-bar': 'arrow-clockwise-20-regular',
  'progress-ring': 'arrow-clockwise-20-regular',
  'teaching-tip': 'lightbulb-20-regular',
  toast: 'alert-20-regular',
  tooltip: 'chat-help-20-regular',
  navigation: 'navigation-20-regular',
  'navigation-view': 'navigation-20-regular',
  breadcrumb: 'text-bullet-list-ltr-20-regular',
  'command-bar': 'key-command-20-regular',
  'menu-bar': 'line-horizontal-3-20-regular',
  pivot: 'arrow-swap-20-regular',
  'selector-bar': 'options-20-regular',
  sidebar: 'panel-left-20-regular',
  'tree-view': 'text-bullet-list-tree-20-regular',
  collections: 'apps-list-20-regular',
  'flip-view': 'arrow-swap-20-regular',
  'grid-view': 'grid-20-regular',
  'list-view': 'list-20-regular',
  'media-player': 'video-20-regular',
  scrolling: 'phone-vertical-scroll-20-regular',
  'pips-pager': 'more-horizontal-20-regular',
  'scroll-viewer': 'phone-vertical-scroll-20-regular',
  'semantic-zoom': 'zoom-in-20-regular',
  more: 'more-horizontal-20-regular',
  icon: 'symbols-20-regular',
  fullscreen: 'full-screen-maximize-20-regular',
  person: 'person-20-regular',
  rating: 'star-20-regular',
  splash: 'weather-sunny-20-regular',
  palette: 'paint-brush-20-regular',
  color: 'color-20-regular',
  material: 'layer-20-regular',
  animation: 'sparkle-20-regular',
  transition: 'arrow-swap-20-regular',
  gesture: 'hand-wave-20-regular'
}

const fullIcon = computed(() => {
  if (props.icon.includes(':')) return props.icon
  return `fluent:${iconAliases[props.icon] || props.icon}`
})
</script>

<style scoped>
.fluent-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
</style>
