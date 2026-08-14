# Vue Fluent Widgets

适用于 Vue 3 的 Fluent Design 组件库

[在线 Demo 演示](https://fluent.cyrene.hk)

> [!CAUTION]
> Made with ❤️ by Cyrene2008.
> 
> 希望这个组件库能让你在构建 Windows11 风格应用时，少加一点班，少熬一点夜，少烧一点token，多一点摸鱼的时间♪

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

## 组件文档

| 语言 | 文档 |
|---|---|
| 中文 | [COMPONENTS.md](./COMPONENTS.md) |
| English | [COMPONENTS_EN.md](./COMPONENTS_EN.md) |

包含所有公开组件的 Props、Events、Slots 和示例代码。

## 主题

默认使用 Fluent Design 标准蓝色 `#0078d4` 和中性灰背景，开箱即用：

```vue
<FluentButton variant="primary">按钮</FluentButton>
```

使用蜜桃粉预设主题，需在根元素添加 `.peach` 类：

```vue
<html class="peach">
  <FluentButton variant="primary">按钮</FluentButton>
</html>
```

或通过 FluentTheme 组件：

```vue
<FluentTheme class="peach" theme="system">
  <App />
</FluentTheme>
```

自定义 Accent 色：

```css
:root {
  --fluent-accent: #6b69d6;
}
```

使用系统强调色：

```vue
<FluentTheme accent-color="system">
  <App />
</FluentTheme>
```

`theme` 支持 `system`、`light` 和 `dark`。FluentTheme 默认材质为 `acrylic`。

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

## 本地开发

在项目根目录执行以下命令，即可快速启动 Demo 开发服务器（需先安装 [bun](https://bun.sh)）：

```bash
node scripts/dev.js
```

脚本会自动完成以下步骤：

1. 检查 `packages/vue-fluent-widgets` 依赖是否安装，缺失时自动执行 `bun install`
2. 检查组件库构建产物（`dist`）是否存在，缺失时自动执行构建
3. 检查 `demo` 依赖是否安装，缺失时自动执行 `bun install`
4. 启动 Demo 开发服务器

## ⚖️ 许可证与署名

本项目基于 [MIT License](./LICENSE) 开源。

**在你的项目中使用本库？** 根据 MIT 协议要求，你**必须**在产品的文档、关于页面或第三方许可声明文件（third-party notices）中保留以下署名信息：

> **VueFluentWidgets**
> Copyright (c) 2026 Cyrene2008
> Licensed under the MIT License
> https://github.com/Cyrene2008/VueFluentWidgets
