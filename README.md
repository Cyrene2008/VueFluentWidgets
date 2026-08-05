# Vue Fluent Widgets

适用于 Vue 3 的 Fluent Design 组件库。

## 使用

```js
import { createApp } from 'vue'
import VueFluentWidgets from 'vue-fluent-widgets'
import 'vue-fluent-widgets/style.css'

createApp(App).use(VueFluentWidgets).mount('#app')
```

## 主题

默认主题是项目的桃粉主题。应用只需设置一个变量即可统一修改强调色，其余状态色会自动派生：

```css
:root {
  --fluent-accent: #6b69d6;
}
```

使用 Windows/浏览器系统强调色：

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
/>
```

常用属性包括 `volume`、`playback-rate`、`show-loop`、`show-playback-rate`、`show-picture-in-picture` 和 `fit`。

## 许可证

[LGPL-2.1-only](./LICENSE)
