# Vue Fluent Widgets

Vue 3 Fluent Design 组件库，支持按需导入、全局插件注册和 TypeScript。

默认使用 Fluent Design 标准蓝色 `#0078d4` 和中性灰背景。内置蜜桃粉预设，通过 `.peach` 类启用。

## 安装

```bash
npm i vue-fluent-widgets
```

## 使用

全局注册：

```js
import { createApp } from 'vue'
import VueFluentWidgets from 'vue-fluent-widgets'
import 'vue-fluent-widgets/style.css'
import App from './App.vue'

createApp(App)
  .use(VueFluentWidgets)
  .mount('#app')
```

按需导入：

```vue
<script setup>
import { FluentButton, FluentMediaPlayer } from 'vue-fluent-widgets'
</script>

<template>
  <FluentButton>保存</FluentButton>
  <FluentMediaPlayer
    src="/media/intro.mp4"
    poster="/images/intro.webp"
    show-minimize
    @minimize="continuePlaying"
  />
</template>
```

所有组件都支持标准 Vue 3 Props、Events 和 Slots 语法。`vue-fluent-widgets` 提供 TypeScript 类型声明，`vue` 和相关可选 peer dependencies 由宿主应用提供。

完整组件文档见仓库根目录 [COMPONENTS.md](https://github.com/Cyrene2008/VueFluentWidgets/blob/Cyrene/COMPONENTS.md)（[English](https://github.com/Cyrene2008/VueFluentWidgets/blob/Cyrene/COMPONENTS_EN.md)）。

## 主题

默认主题使用 Fluent 蓝色，`FluentTheme` 默认材质为 `acrylic`：

```vue
<FluentTheme theme="system">
  <App />
</FluentTheme>
```

使用蜜桃粉预设：

```html
<html class="peach">
  <FluentButton variant="primary">按钮</FluentButton>
</html>
```

## MediaPlayer

`FluentMediaPlayer` 支持视频和音频、循环、倍速、音量、画中画、全屏以及跨路由播放接管。

`minimize` 事件会返回当前媒体的来源、进度、播放状态、音量、静音、倍速和循环状态，应用可以据此接入自己的常驻播放器。

组件不依赖 GSAP，但提供 `el`、`contentEl`、`pauseInternalAnimation()` 和 `resumeInternalAnimation()` 实例接口，用户可以自行安装 GSAP 后接管动画：

```vue
<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'

const player = ref()

onMounted(() => {
  player.value.pauseInternalAnimation()
  gsap.from(player.value.contentEl, {
    opacity: 0,
    y: 24,
    duration: 0.6,
    ease: 'power3.out'
  })
})
</script>

<template>
  <FluentMediaPlayer ref="player" src="/music.mp3" type="audio" />
</template>
```

## 许可证

MIT License

VueFluentWidgets Copyright (c) 2026 Cyrene2008

https://github.com/Cyrene2008/VueFluentWidgets
