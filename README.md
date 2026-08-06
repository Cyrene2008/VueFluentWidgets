# Vue Fluent Widgets

适用于 Vue 3 的 Fluent Design 组件库。

[在线 Demo 演示](https://fluent.cyrene.hk)

## 安装

```bash
npm i vue-fluent-widgets
```

## 使用

```js
import { createApp } from 'vue'
import VueFluentWidgets from 'vue-fluent-widgets'
import 'vue-fluent-widgets/style.css'

createApp(App).use(VueFluentWidgets).mount('#app')

```

也可以按需导入组件，组件支持标准 Vue 3 模板语法：

```vue
<script setup>
import { FluentButton, FluentMediaPlayer } from 'vue-fluent-widgets'
</script>

<template>
  <FluentButton>保存</FluentButton>
  <FluentMediaPlayer src="/media/intro.mp4" show-minimize @minimize="continuePlaying" />
</template>
```

组件库包含 TypeScript 类型声明，`vue` 作为 peer dependency 由应用提供；样式通过 `vue-fluent-widgets/style.css` 引入。

## 主题

默认主题是项目的桃粉主题。应用只需设置一个变量即可统一修改强调色，其余状态色会自动派生：

```css
:root {
  --fluent-accent: #6b69d6;
}

```

使用 Windows / 浏览器系统强调色：

```vue
<FluentTheme accent-color="system">
  <App />
</FluentTheme>

```

使用 Fluent Design 标准蓝色及中性背景预设：

```vue
<FluentTheme class="fluent" theme="system">
  <App />
</FluentTheme>

```

`theme` 支持 `system`、`light` 和 `dark`。也可以在任意容器上添加 `.fluent`、`.dark` 或 `.theme-dark`。

## 媒体播放器

`FluentMediaPlayer` 根据扩展名自动识别音频和视频，也可以通过 `type="audio|video"` 指定。视频支持循环、倍速、音量、画中画、全屏与触屏操作；音频支持自定义封面、标题和作者。

```vue
<FluentMediaPlayer
  src="/music.mp3"
  type="audio"
  poster="/cover.webp"
  title="Track title"
  artist="Artist"
  loop
  show-minimize
  @minimize="continuePlaying"
/>

```

常用属性包括 `volume`、`playback-rate`、`show-loop`、`show-playback-rate`、`show-picture-in-picture`、`show-minimize` 和 `fit`。`minimize` 事件会提供当前进度、播放状态、音量与倍速等状态，供应用级常驻播放器无缝接管。

组件不内置 GSAP，但为外部动画库提供了 `el`、`contentEl`、`pauseInternalAnimation()` 和 `resumeInternalAnimation()` 实例接口。需要完全由 GSAP 接管时，可使用 `disable-animations` 或调用 `pauseInternalAnimation()`：

```vue
<script setup>
import { onMounted, ref } from 'vue'
import { FluentMediaPlayer } from 'vue-fluent-widgets'
import gsap from 'gsap'

const player = ref()
onMounted(() => {
  player.value.pauseInternalAnimation()
  gsap.from(player.value.contentEl, { opacity: 0, y: 24, duration: 0.6, ease: 'power3.out' })
})
</script>

<template>
  <FluentMediaPlayer ref="player" src="/music.mp3" type="audio" />
</template>
```

## ⚖️ 许可证与署名

本项目基于 [MIT License](./LICENSE) 开源。

**在你的项目中使用本库？** 根据 MIT 协议要求，你**必须**在产品的文档、关于页面或第三方许可声明文件（third-party notices）中保留以下署名信息：

> **VueFluentWidgets**
> Copyright (c) 2026 Cyrene2008
> Licensed under the MIT License
> https://github.com/Cyrene2008/VueFluentWidgets
