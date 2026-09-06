# Vue Fluent Widgets 组件文档

Vue 3 Fluent Design 组件库完整 API 文档。包含所有公开组件的 Props、Events、Slots 和示例代码。

**安装：** `npm i vue-fluent-widgets`

**样式：** `import 'vue-fluent-widgets/style.css'`

---

## 目录

- **基础输入**
  - [FluentAutoSuggestBox](#fluentautosuggestbox)
  - [FluentButton](#fluentbutton)
  - [FluentCalendarDatePicker](#fluentcalendardatepicker)
  - [FluentCheckBox](#fluentcheckbox)
  - [FluentColorPicker](#fluentcolorpicker)
  - [FluentComboBox](#fluentcombobox)
  - [FluentDatePicker](#fluentdatepicker)
  - [FluentDropDownButton](#fluentdropdownbutton)
  - [FluentHyperlinkButton](#fluenthyperlinkbutton)
  - [FluentInput](#fluentinput)
  - [FluentListBox](#fluentlistbox)
  - [FluentNumberBox](#fluentnumberbox)
  - [FluentPasswordBox](#fluentpasswordbox)
  - [FluentRadioButton](#fluentradiobutton)
  - [FluentRepeatButton](#fluentrepeatbutton)
  - [FluentRichEditBox](#fluentricheditbox)
  - [FluentSegmented](#fluentsegmented)
  - [FluentSelect](#fluentselect)
  - [FluentSlider](#fluentslider)
  - [FluentSplitButton](#fluentsplitbutton)
  - [FluentTextBox](#fluenttextbox)
  - [FluentToggleButton](#fluenttogglebutton)
  - [FluentToggleSwitch](#fluenttoggleswitch)
  - [FluentRating](#fluentrating)
- **布局与内容**
  - [FluentCard](#fluentcard)
  - [FluentCol](#fluentcol)
  - [FluentDivider](#fluentdivider)
  - [FluentExpander](#fluentexpander)
  - [FluentGrid](#fluentgrid)
  - [FluentPageHeader](#fluentpageheader)
  - [FluentRelativePanel](#fluentrelativepanel)
  - [FluentRow](#fluentrow)
  - [FluentSettingsCard](#fluentsettingscard)
  - [FluentSpace](#fluentspace)
  - [FluentStackPanel](#fluentstackpanel)
  - [FluentTabs](#fluenttabs)
  - [FluentPivot](#fluentpivot)
  - [FluentPivotItem](#fluentpivotitem)
- **反馈与状态**
  - [FluentContentDialog](#fluentcontentdialog)
  - [FluentEmptyState](#fluentemptystate)
  - [FluentInfoBadge](#fluentinfobadge)
  - [FluentInfoBar](#fluentinfobar)
  - [FluentModal](#fluentmodal)
  - [FluentPopup](#fluentpopup)
  - [FluentProgressBar](#fluentprogressbar)
  - [FluentProgressRing](#fluentprogressring)
  - [FluentResult](#fluentresult)
  - [FluentSkeleton](#fluentskeleton)
  - [FluentTeachingTip](#fluentteachingtip)
  - [FluentToast](#fluenttoast)
  - [FluentTooltip](#fluenttooltip)
  - [FluentFlyout](#fluentflyout)
- **导航**
  - [FluentBreadcrumbBar](#fluentbreadcrumbbar)
  - [FluentCommandBar](#fluentcommandbar)
  - [FluentDrawer](#fluentdrawer)
  - [FluentMenuBar](#fluentmenubar)
  - [FluentNavigationView](#fluentnavigationview)
  - [FluentSelectorBar](#fluentselectorbar)
  - [FluentSelectorBarItem](#fluentselectorbaritem)
  - [FluentTreeView](#fluenttreeview)
- **集合与数据**
  - [FluentDataGrid](#fluentdatagrid)
  - [FluentDescriptions](#fluentdescriptions)
  - [FluentFlipView](#fluentflipview)
  - [FluentGridView](#fluentgridview)
  - [FluentHorizontalScrollContainer](#fluenthorizontalscrollcontainer)
  - [FluentItemsRepeater](#fluentitemsrepeater)
  - [FluentItemsView](#fluentitemsview)
  - [FluentListView](#fluentlistview)
  - [FluentPipsPager](#fluentpipspager)
  - [FluentSemanticZoom](#fluentsemanticzoom)
  - [FluentStatistics](#fluentstatistics)
  - [FluentTimeline](#fluenttimeline)
- **媒体与系统**
  - [FluentAnimatedIcon](#fluentanimatedicon)
  - [FluentBackToTop](#fluentbacktotop)
  - [FluentCanvas](#fluentcanvas)
  - [FluentFloatButton](#fluentfloatbutton)
  - [FluentIcon](#fluenticon)
  - [FluentImage](#fluentimage)
  - [FluentImageViewer](#fluentimageviewer)
  - [FluentLiquidGlass](#fluentliquidglass)
  - [FluentMediaPlayer](#fluentmediaplayer)
  - [FluentMediaPlayerElement](#fluentmediaplayerelement)
  - [FluentParallaxView](#fluentparallaxview)
  - [FluentPersonPicture](#fluentpersonpicture)
  - [FluentRichTextBlock](#fluentrichtextblock)
  - [FluentScrollViewer](#fluentscrollviewer)
  - [FluentScrollBar](#fluentscrollbar)
  - [FluentSwipeControl](#fluentswipecontrol)
  - [FluentPullToRefresh](#fluentpulltorefresh)
  - [FluentTabView](#fluenttabview)
  - [FluentTitleBar](#fluenttitlebar)
  - [FluentToggle](#fluenttoggle)
  - [FluentVariableSizedWrapGrid](#fluentvariablesizedwrapgrid)
  - [FluentViewbox](#fluentviewbox)
  - [FluentWatermark](#fluentwatermark)
  - [FullscreenToggle](#fullscreentoggle)
  - [SplashScreen](#splashscreen)
  - [FluentTheme](#fluenttheme)
- **其他**
  - [FluentControlExample](#fluentcontrolexample)
  - [FluentGrid](#fluentgrid)
  - [FluentAppBarButton](#fluentappbarbutton)
  - [FluentAppBarSeparator](#fluentappbarseparator)
  - [FluentAppBarToggleButton](#fluentappbartogglebutton)
  - [FluentSplitView](#fluentsplitview)
  - [SecondarySidebarMenu](#secondarysidebarmenu)

---

## 基础输入

### FluentAutoSuggestBox
**自动建议框**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `model-value` | String |  | `''` |  |
| `suggestions` | Array |  | `() => []` |  |
| `label` | String |  | `''` |  |
| `placeholder` | String |  | `''` |  |
| `icon` | String |  | `''` |  |
| `disabled` | Boolean |  | `false` |  |
| `clearable` | Boolean |  | `true` |  |
| `value-key` | String |  | `''` |  |
| `filter-method` | Function |  | `null` |  |
| `error` | String |  | `''` |  |
| `description` | String |  | `''` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@change` | |
| `@select` | |
| `@search` | |
| `@focus` | |
| `@blur` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#suggestion` | |

### FluentButton
**按钮**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `variant` | String |  | `'primary'` | 可选值: `primary`, `secondary`, `subtle`, `danger` |
| `size` | String |  | `'md'` | 可选值: `sm`, `md`, `lg` |
| `icon-only` | Boolean |  | `false` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@click` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

#### 示例

```vue
<FluentButton variant="primary">保存</FluentButton>
```

### FluentCalendarDatePicker
**日历日期选择器**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `model-value` | String |  | `''` |  |
| `label` | String |  | `''` |  |
| `placeholder` | String |  | `'选择日期'` |  |
| `disabled` | Boolean |  | `false` |  |
| `min` | String |  | `''` |  |
| `max` | String |  | `''` |  |
| `error` | String |  | `''` |  |
| `description` | String |  | `''` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@change` | |

#### 示例

```vue
<FluentCalendarDatePicker model-value="2026-08-06" label="日期" />
```

### FluentCheckBox
**复选框**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `model-value` | Boolean \| NullLiteral |  | `undefined` |  |
| `label` | String |  | `''` |  |
| `disabled` | Boolean |  | `false` |  |
| `indeterminate` | Boolean |  | `false` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@change` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FluentColorPicker
**颜色选择器**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `model-value` | String |  | `'#0078d4'` |  |
| `label` | String |  | `''` |  |
| `disabled` | Boolean |  | `false` |  |
| `show-presets` | Boolean |  | `true` |  |
| `error` | String |  | `''` |  |
| `description` | String |  | `''` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@change` | |

### FluentComboBox
**组合框**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `model-value` | String \| Number \| Object |  | `null` |  |
| `items` | Array | ✓ | — |  |
| `label` | String |  | `''` |  |
| `placeholder` | String |  | `'请选择'` |  |
| `label-key` | String |  | `'label'` |  |
| `value-key` | String |  | `'value'` |  |
| `disabled` | Boolean |  | `false` |  |
| `error` | String |  | `''` |  |
| `description` | String |  | `''` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@change` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#item` | |

#### 示例

```vue
<FluentComboBox :items="items" model-value="design" label="团队" />
```

### FluentDatePicker
**日期选择器**

使用 Fluent 自绘日历面板，不调用浏览器原生日期选择器；日历面板通过 Teleport 挂载到 `body`，可避开父级溢出裁剪。

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `model-value` | String |  | `''` |  |
| `label` | String |  | `''` |  |
| `placeholder` | String |  | `'选择日期'` |  |
| `min` | String |  | `''` |  |
| `max` | String |  | `''` |  |
| `disabled` | Boolean |  | `false` |  |
| `error` | String |  | `''` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@change` | |

### FluentTimePicker
**Fluent 时间选择器（自绘面板）**

#### Props

| Prop | 类型 | 默认值 | 说明 |
|---|---|---|---|
| `model-value` | String | `''` | `HH:mm`，启用秒时为 `HH:mm:ss` |
| `label` | String | `''` | 标签 |
| `placeholder` | String | `'选择时间'` | 空值提示 |
| `show-seconds` | Boolean | `false` | 显示秒列 |
| `minute-step` | Number | `1` | 分钟步长 |
| `disabled` | Boolean | `false` | 禁用控件 |
| `error` | String | `''` | 错误信息 |
| `description` | String | `''` | 辅助说明 |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | 时间值改变 |
| `@change` | 点击“完成”后提交 |

> 控件使用 Teleport 挂载 Fluent 面板，不依赖浏览器原生时间选择器，也不会被父级 `overflow` 裁剪。

### FluentDropDownButton
**下拉按钮**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `label` | String |  | `''` |  |
| `items` | Array |  | `() => []` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@select` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FluentHyperlinkButton
**超链接按钮**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `label` | String |  | `''` |  |
| `href` | String |  | `''` |  |
| `target` | String |  | `'_self'` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@click` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FluentInput
**输入框**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `model-value` | String \| Number |  | `''` |  |
| `type` | String |  | `'text'` |  |
| `placeholder` | String |  | `''` |  |
| `disabled` | Boolean |  | `false` |  |
| `min` | Number \| String |  | `undefined` |  |
| `max` | Number \| String |  | `undefined` |  |
| `step` | Number \| String |  | `undefined` |  |
| `label` | String |  | `''` |  |
| `readonly` | Boolean |  | `false` |  |
| `error` | String |  | `''` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@enter` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#prefix` | |
| `#suffix` | |

#### 实例方法

- `focus`

#### 示例

```vue
<FluentInput v-model="value" label="名称"><template #prefix>🔎</template></FluentInput>
```

### FluentListBox
**列表框**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `items` | Array | ✓ | — |  |
| `model-value` | Object \| String \| Number \| Boolean \| Array |  | `null` |  |
| `selected-index` | Number |  | `-1` |  |
| `multiple` | Boolean |  | `false` |  |
| `label-key` | String |  | `'label'` |  |
| `value-key` | String |  | `'value'` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@update:selected-index` | |
| `@change` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#item` | |

### FluentNumberBox
**数字输入框**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `model-value` | Number |  | `0` |  |
| `label` | String |  | `''` |  |
| `placeholder` | String |  | `''` |  |
| `disabled` | Boolean |  | `false` |  |
| `min` | Number |  | `-Infinity` |  |
| `max` | Number |  | `Infinity` |  |
| `step` | Number |  | `1` |  |
| `show-spin-buttons` | Boolean |  | `true` |  |
| `error` | String |  | `''` |  |
| `description` | String |  | `''` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@change` | |
| `@focus` | |
| `@blur` | |

### FluentPasswordBox
**密码框**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `model-value` | String |  | `''` |  |
| `label` | String |  | `''` |  |
| `placeholder` | String |  | `'输入密码'` |  |
| `disabled` | Boolean |  | `false` |  |
| `max-length` | Number |  | `0` |  |
| `show-reveal-button` | Boolean |  | `true` |  |
| `reveal-mode` | String |  | `'peek'` |  |
| `error` | String |  | `''` |  |
| `description` | String |  | `''` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@change` | |
| `@focus` | |
| `@blur` | |

### FluentRadioButton
**单选按钮**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `model-value` | String \| Number \| Boolean \| Object |  | `undefined` |  |
| `items` | Array | ✓ | — |  |
| `label` | String |  | `''` |  |
| `disabled` | Boolean |  | `false` |  |
| `selected-index` | Number |  | `undefined` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@update:selected-index` | |
| `@change` | |

### FluentRepeatButton
**重复按钮**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `label` | String |  | `''` |  |
| `disabled` | Boolean |  | `false` |  |
| `delay` | Number |  | `500` |  |
| `interval` | Number |  | `100` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@click` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FluentRichEditBox
**富文本编辑框**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `model-value` | String |  | `''` |  |
| `label` | String |  | `''` |  |
| `placeholder` | String |  | `'输入内容...'` |  |
| `disabled` | Boolean |  | `false` |  |
| `show-toolbar` | Boolean |  | `true` |  |
| `max-length` | Number |  | `0` |  |
| `error` | String |  | `''` |  |
| `description` | String |  | `''` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@change` | |
| `@focus` | |
| `@blur` | |

#### 示例

```vue
<FluentRichEditBox v-model="content" label="内容" />
```

### FluentSegmented
**分段选择器**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `items` | Array | ✓ | — |  |
| `model-value` | String \| Number |  | `0` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@change` | |

### FluentSelect
**选择器**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `model-value` | String \| Number |  | `''` |  |
| `options` | Array |  | `() => []` |  |
| `placeholder` | String |  | `'请选择'` |  |
| `disabled` | Boolean |  | `false` |  |
| `width` | String |  | `''` |  |
| `label` | String |  | `''` |  |
| `error` | String |  | `''` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@change` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#option` | |

#### 示例

```vue
<FluentSelect v-model="value" :options="options" label="城市" />
```

### FluentSlider
**滑块**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `model-value` | Number |  | `0` |  |
| `min` | Number |  | `0` |  |
| `max` | Number |  | `100` |  |
| `step` | Number |  | `1` |  |
| `label` | String |  | `''` |  |
| `disabled` | Boolean |  | `false` |  |
| `vertical` | Boolean |  | `false` |  |
| `show-value` | Boolean |  | `true` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@change` | |

### FluentSplitButton
**分割按钮**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `label` | String |  | `''` |  |
| `items` | Array |  | `() => []` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@click` | |
| `@select` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FluentTextBox
**文本框**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `model-value` | String \| Number |  | `''` |  |
| `type` | String |  | `'text'` |  |
| `label` | String |  | `''` |  |
| `placeholder` | String |  | `''` |  |
| `prefix` | String |  | `''` |  |
| `suffix` | String |  | `''` |  |
| `disabled` | Boolean |  | `false` |  |
| `readonly` | Boolean |  | `false` |  |
| `clearable` | Boolean |  | `false` |  |
| `max-length` | Number |  | `undefined` |  |
| `error` | String |  | `''` |  |
| `description` | String |  | `''` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@change` | |
| `@focus` | |
| `@blur` | |
| `@keydown` | |
| `@clear` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#prefix` | |
| `#suffix` | |

#### 实例方法

- `focus`
- `blur`

### FluentToggleButton
**切换按钮**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `model-value` | Boolean |  | `undefined` |  |
| `checked` | Boolean |  | `undefined` |  |
| `label` | String |  | `''` |  |
| `icon` | String |  | `''` |  |
| `variant` | String |  | `'secondary'` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@update:checked` | |
| `@change` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#icon` | |
| `#default` | |

### FluentToggleSwitch
**切换开关**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `model-value` | Boolean |  | `false` |  |
| `label` | String |  | `''` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@change` | |

### FluentRating
**评分**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `model-value` | Number |  | `-1` |  |
| `max-rating` | Number |  | `5` |  |
| `placeholder-value` | Number |  | `-1` |  |
| `caption` | String |  | `''` |  |
| `icon-size` | Number |  | `20` |  |
| `initial-value` | Number |  | `1` |  |
| `clear-enabled` | Boolean |  | `true` |  |
| `readonly` | Boolean |  | `false` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@change` | |

## 布局与内容

### FluentCard
**卡片**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `hoverable` | Boolean |  | `false` |  |
| `material` | String |  | `'acrylic'` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@click` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

#### 示例

```vue
<FluentCard material="acrylic">任意卡片内容</FluentCard>
```

### FluentCol
**列布局**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `span` | Number |  | `24` |  |
| `offset` | Number |  | `0` |  |
| `push` | Number |  | `0` |  |
| `pull` | Number |  | `0` |  |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FluentDivider
**分隔线**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `orientation` | String |  | `'horizontal'` |  |
| `inset` | Boolean |  | `false` |  |

### FluentExpander
**折叠面板**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `header` | String | ✓ | — |  |
| `description` | String |  | `''` |  |
| `icon` | String |  | `''` |  |
| `expand-up` | Boolean |  | `false` |  |
| `model-value` | Boolean |  | `false` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@expand` | |
| `@collapse` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FluentGrid
**网格布局**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `columns` | Number \| String |  | `1` |  |
| `rows` | Number \| String |  | `'auto'` |  |
| `column-spacing` | Number |  | `0` |  |
| `row-spacing` | Number |  | `0` |  |
| `padding` | String \| Number |  | `0` |  |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FluentPageHeader
**页面标题**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `title` | String | ✓ | — |  |
| `description` | String |  | `''` |  |
| `icon` | String |  | `''` |  |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#actions` | |

### FluentRelativePanel
**相对面板**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `padding` | String \| Number |  | `0` |  |
| `background` | String |  | `'transparent'` |  |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FluentRow
**行布局**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `gutter` | Number \| Array |  | `0` |  |
| `justify` | String |  | `'start'` |  |
| `align` | String |  | `'top'` |  |
| `wrap` | Boolean |  | `true` |  |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FluentSettingsCard
**设置卡片**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `title` | String | ✓ | — |  |
| `description` | String |  | `''` |  |
| `icon` | String |  | `''` |  |
| `clickable` | Boolean |  | `false` |  |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#action` | |
| `#default` | |

### FluentSpace
**间距**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `direction` | String |  | `'horizontal'` |  |
| `size` | Number \| String \| Array |  | `8` |  |
| `align` | String |  | `'start'` |  |
| `wrap` | Boolean |  | `false` |  |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FluentStackPanel
**堆叠面板**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `orientation` | String |  | `'vertical'` |  |
| `spacing` | Number |  | `0` |  |
| `padding` | String \| Number |  | `0` |  |
| `horizontal-alignment` | String |  | `'stretch'` |  |
| `vertical-alignment` | String |  | `'top'` |  |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FluentTabs
**标签页**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `model-value` | String \| Number | ✓ | — |  |
| `options` | Array |  | `() => []` |  |
| `tabs` | Array |  | `() => []` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#dynamic: modelValue` | |

#### 示例

```vue
<FluentTabs v-model="active" :tabs="tabs"><template #tab-0>面板内容</template></FluentTabs>
```

### FluentPivot
**枢轴**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `items` | Array | ✓ | — |  |
| `model-value` | Number |  | `0` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@change` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#dynamic: `tab-${selectedIndex}`` | |
| `#default` | |

### FluentPivotItem
**枢轴项目**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `item-key` | String \| Number | ✓ | — |  |
| `label` | String |  | `''` |  |
| `icon` | String |  | `''` |  |
| `disabled` | Boolean |  | `false` |  |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

## 反馈与状态

### FluentContentDialog
**内容对话框**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `model-value` | Boolean |  | `false` |  |
| `title` | String |  | `''` |  |
| `subtitle` | String |  | `''` |  |
| `icon` | String |  | `''` |  |
| `size` | String |  | `'standard'` |  |
| `closable` | Boolean |  | `true` |  |
| `close-on-overlay` | Boolean |  | `true` |  |
| `close-on-escape` | Boolean |  | `true` |  |
| `primary-button-text` | String |  | `''` |  |
| `secondary-button-text` | String |  | `''` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@close` | |
| `@primary-click` | |
| `@secondary-click` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |
| `#footer` | |

#### 示例

```vue
<FluentContentDialog v-model="open" title="确认操作">这里是对话框内容。</FluentContentDialog>
```

### FluentEmptyState
**空状态**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `icon` | String |  | `''` |  |
| `title` | String |  | `''` |  |
| `description` | String |  | `''` |  |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#action` | |

### FluentInfoBadge
**信息徽章**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `value` | Number \| String |  | `null` |  |
| `severity` | String |  | `'attention'` |  |

### FluentInfoBar
**信息栏**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `title` | String |  | `''` |  |
| `message` | String |  | `''` |  |
| `severity` | String |  | `'info'` |  |
| `closable` | Boolean |  | `true` |  |
| `action` | String |  | `''` |  |
| `model-value` | Boolean |  | `true` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@close` | |
| `@action` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

#### 示例

```vue
<FluentInfoBar severity="info" title="提示">可以放任意说明内容。</FluentInfoBar>
```

### FluentModal
**模态框**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `model-value` | Boolean |  | `false` |  |
| `title` | String |  | `''` |  |
| `max-width` | String |  | `'520px'` |  |
| `persistent` | Boolean |  | `false` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@close` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#icon` | |
| `#default` | |
| `#footer` | |

#### 示例

```vue
<FluentModal v-model="open" title="确认操作"><template #footer><FluentButton>确认</FluentButton></template></FluentModal>
```

### FluentPopup
**弹出层**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `model-value` | Boolean |  | `false` |  |
| `placement` | String |  | `'bottom'` |  |
| `target` | Object \| String |  | `null` |  |
| `offset` | Number |  | `8` |  |
| `close-on-overlay` | Boolean |  | `true` |  |
| `close-on-escape` | Boolean |  | `true` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@open` | |
| `@close` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FluentProgressBar
**进度条**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `value` | Number |  | `0` |  |
| `min` | Number |  | `0` |  |
| `max` | Number |  | `100` |  |
| `indeterminate` | Boolean |  | `false` |  |
| `error` | Boolean |  | `false` |  |
| `paused` | Boolean |  | `false` |  |

### FluentProgressRing
**进度环**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `value` | Number |  | `0` |  |
| `min` | Number |  | `0` |  |
| `max` | Number |  | `100` |  |
| `indeterminate` | Boolean |  | `true` |  |
| `error` | Boolean |  | `false` |  |
| `paused` | Boolean |  | `false` |  |
| `size` | Number \| String |  | `32` |  |

### FluentResult
**结果**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `status` | String |  | `'info'` |  |
| `title` | String |  | `''` |  |
| `description` | String |  | `''` |  |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#action` | |

### FluentSkeleton
**骨架屏**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `width` | String \| Number |  | `'100%'` |  |
| `height` | String \| Number |  | `'16px'` |  |
| `shape` | String |  | `'rect'` |  |
| `animated` | Boolean |  | `true` |  |

### FluentTeachingTip
**教学提示**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `model-value` | Boolean |  | `undefined` |  |
| `title` | String |  | `''` |  |
| `subtitle` | String |  | `''` |  |
| `icon` | String |  | `''` |  |
| `target` | String \| Object |  | `null` |  |
| `placement` | String |  | `'bottom'` |  |
| `closable` | Boolean |  | `true` |  |
| `close-on-escape` | Boolean |  | `true` |  |
| `close-on-overlay` | Boolean |  | `true` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@open` | |
| `@close` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |
| `#actions` | |

### FluentToast
**消息提示**

#### 实例方法

- `add`
- `remove`

#### 示例

```vue
<FluentToast ref="toast" />
```

### FluentTooltip
**工具提示**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `content` | String |  | `''` |  |
| `placement` | String |  | `'top'` |  |
| `disabled` | Boolean |  | `false` |  |
| `delay` | Number |  | `300` |  |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |
| `#content` | |

### FluentFlyout
**弹出面板**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `model-value` | Boolean |  | `undefined` |  |
| `title` | String |  | `''` |  |
| `placement` | String |  | `'bottom'` |  |
| `closable` | Boolean |  | `true` |  |
| `close-on-escape` | Boolean |  | `true` |  |
| `close-on-overlay` | Boolean |  | `true` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@open` | |
| `@close` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#trigger` | |
| `#default` | |
| `#footer` | |

## 导航

### FluentBreadcrumbBar
**面包屑导航**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `items` | Array | ✓ | — |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@item-click` | |

### FluentCommandBar
**命令栏**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `primary-commands` | Array |  | `() => []` |  |
| `secondary-commands` | Array |  | `() => []` |  |
| `show-labels` | Boolean |  | `true` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@command-click` | |

### FluentDrawer
**抽屉**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `model-value` | Boolean |  | `false` |  |
| `title` | String |  | `''` |  |
| `placement` | String |  | `'right'` |  |
| `size` | String |  | `'medium'` |  |
| `closable` | Boolean |  | `true` |  |
| `close-on-overlay` | Boolean |  | `true` |  |
| `close-on-escape` | Boolean |  | `true` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@open` | |
| `@close` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#header` | |
| `#default` | |
| `#footer` | |

#### 示例

```vue
<FluentDrawer v-model="open" title="侧边抽屉">这里是抽屉内容。</FluentDrawer>
```

### FluentMenuBar
**菜单栏**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `items` | Array | ✓ | — |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@item-click` | |

### FluentNavigationView
**导航视图**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `menu-items` | Array | ✓ | — |  |
| `pane-title` | String |  | `''` |  |
| `show-toggle-button` | Boolean |  | `true` |  |
| `show-search-box` | Boolean |  | `false` |  |
| `default-selected-item` | String |  | `''` |  |
| `compact-mode` | Boolean |  | `false` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@item-selected` | |
| `@pane-toggle` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#footer` | |
| `#default` | |

### FluentSelectorBar
**选择器栏**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `items` | Array | ✓ | — |  |
| `model-value` | Number |  | `0` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@change` | |

### FluentSelectorBarItem
**选择器栏项目**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `item-key` | String \| Number | ✓ | — |  |
| `label` | String |  | `''` |  |
| `icon` | String |  | `''` |  |
| `disabled` | Boolean |  | `false` |  |

### FluentTreeView
**树形视图**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `items` | Array | ✓ | — |  |
| `level` | Number |  | `0` |  |
| `selected-id` | String \| Number |  | `null` |  |
| `expanded-ids` | Array |  | `() => []` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@select` | |
| `@expand` | |
| `@collapse` | |

#### 示例

```vue
<FluentTreeView :items="tree" @select="onSelect" />
```

## 集合与数据

### FluentDataGrid
**数据表格**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `data` | Array | ✓ | — |  |
| `columns` | Array | ✓ | — |  |
| `selectable` | Boolean |  | `false` |  |
| `selected-rows` | Array |  | `() => []` |  |
| `loading` | Boolean |  | `false` |  |
| `paginated` | Boolean |  | `false` |  |
| `page-size` | Number |  | `10` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:selected-rows` | |
| `@row-click` | |
| `@row-dblclick` | |
| `@sort` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#toolbar` | |
| `#dynamic: `cell-${column.key}`` | |
| `#actions` | |

#### 示例

```vue
<FluentDataGrid :data="rows" :columns="columns" selectable />
```

### FluentDescriptions
**描述列表**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `title` | String |  | `''` |  |
| `items` | Array | ✓ | — |  |
| `column` | Number |  | `3` |  |
| `layout` | String |  | `'horizontal'` |  |
| `size` | String |  | `'medium'` |  |
| `bordered` | Boolean |  | `false` |  |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#dynamic: item.key || `item-${index}`` | |

### FluentFlipView
**翻转视图**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `items` | Array | ✓ | — |  |
| `model-value` | Number |  | `0` |  |
| `vertical` | Boolean |  | `false` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@change` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

#### 示例

```vue
<FluentFlipView v-model="index" :items="items" style="height: 300px;"><template #default="{ item }">{{ item.title }}</template></FluentFlipView>
```

### FluentGridView
**网格视图**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `items` | Array | ✓ | — |  |
| `columns` | Number |  | `4` |  |
| `selection-mode` | String |  | `'none'` |  |
| `selected-items` | Array |  | `() => []` |  |
| `can-drag` | Boolean |  | `false` |  |
| `can-reorder` | Boolean |  | `false` |  |
| `item-key` | String |  | `'id'` |  |
| `item-width` | String \| Number |  | `'auto'` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@select` | |
| `@invoke` | |
| `@update:selected-items` | |
| `@reorder` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

#### 示例

```vue
<FluentGridView :items="items" selection-mode="multiple" v-model:selected-items="selected"><template #default="{ item }"><YourCard :item="item" /></template></FluentGridView>
```

### FluentHorizontalScrollContainer
**横向滚动容器**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `scroll-amount` | Number |  | `200` |  |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FluentItemsRepeater
**项目重复器**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `items` | Array | ✓ | — |  |
| `item-key` | String |  | `'id'` |  |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FluentItemsView
**项目视图**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `items` | Array | ✓ | — |  |
| `layout` | String |  | `'stack'` |  |
| `columns` | Number |  | `4` |  |
| `selection-mode` | String |  | `'none'` |  |
| `selected-items` | Array |  | `() => []` |  |
| `item-invoked-enabled` | Boolean |  | `false` |  |
| `item-key` | String |  | `'id'` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@select` | |
| `@invoke` | |
| `@update:selected-items` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FluentListView
**列表视图**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `items` | Array | ✓ | — |  |
| `header` | String |  | `''` |  |
| `selection-mode` | String |  | `'none'` |  |
| `selected-items` | Array |  | `() => []` |  |
| `is-grouped` | Boolean |  | `false` |  |
| `show-group-headers` | Boolean |  | `true` |  |
| `sticky-headers` | Boolean |  | `false` |  |
| `item-key` | String |  | `'id'` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@select` | |
| `@invoke` | |
| `@update:selected-items` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#header` | |
| `#group-header` | |
| `#default` | |

#### 示例

```vue
<FluentListView :items="items"><template #default="{ item }"><YourRow :item="item" /></template></FluentListView>
```

### FluentPipsPager
**分页指示器**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `model-value` | Number |  | `0` |  |
| `total-pages` | Number | ✓ | — |  |
| `max-visible-pips` | Number |  | `7` |  |
| `show-navigation` | Boolean |  | `true` |  |
| `vertical` | Boolean |  | `false` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@change` | |

### FluentSemanticZoom
**语义缩放**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `model-value` | Boolean |  | `true` |  |
| `show-zoom-out-button` | Boolean |  | `true` |  |
| `can-change-views` | Boolean |  | `true` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@view-change-started` | |
| `@view-change-completed` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#zoomed-in` | |
| `#zoomed-out` | |

### FluentStatistics
**统计**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `value` | Number \| String | ✓ | — |  |
| `title` | String |  | `''` |  |
| `prefix` | String |  | `''` |  |
| `suffix` | String |  | `''` |  |
| `description` | String |  | `''` |  |
| `trend` | String |  | `''` |  |
| `trend-value` | String |  | `''` |  |
| `precision` | Number |  | `0` |  |
| `loading` | Boolean |  | `false` |  |

### FluentTimeline
**时间线**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `items` | Array | ✓ | — |  |
| `position` | String |  | `'left'` |  |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#dynamic: `item-${index}`` | |

## 媒体与系统

### FluentAnimatedIcon
**动画图标**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `animation` | String |  | `'bounce'` |  |
| `duration` | Number |  | `300` |  |
| `trigger` | String |  | `'hover'` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@animation-start` | |
| `@animation-end` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FluentBackToTop
**返回顶部**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `target` | String |  | `''` |  |
| `visibility-height` | Number |  | `300` |  |
| `right` | Number |  | `40` |  |
| `bottom` | Number |  | `40` |  |

### FluentCanvas
**画布**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `width` | Number \| String |  | `'auto'` |  |
| `height` | Number \| String |  | `'auto'` |  |
| `background` | String |  | `'transparent'` |  |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FluentFloatButton
**浮动按钮**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `icon` | String |  | `'add-20-regular'` |  |
| `position` | String |  | `'bottom-right'` |  |
| `menu-items` | Array |  | `() => []` |  |
| `aria-label` | String |  | `'浮动操作按钮'` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@click` | |
| `@menu-click` | |

### FluentIcon
**图标**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `icon` | String | ✓ | — |  |
| `width` | Number \| String |  | `20` |  |
| `height` | Number \| String |  | `undefined` |  |
| `class-name` | String |  | `''` |  |

### FluentImage
**图片**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `src` | String | ✓ | — |  |
| `alt` | String |  | `''` |  |
| `width` | Number \| String |  | `'auto'` |  |
| `height` | Number \| String |  | `'auto'` |  |
| `fit` | String |  | `'contain'` |  |

### FluentImageViewer
**图片查看器**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `src` | String | ✓ | — |  |
| `alt` | String |  | `''` |  |
| `caption` | String |  | `''` |  |
| `width` | Number \| String |  | `'auto'` |  |
| `height` | Number \| String |  | `'auto'` |  |
| `fit` | String |  | `'contain'` |  |
| `clickable` | Boolean |  | `false` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@click` | |
| `@load` | |
| `@error` | |

### FluentLiquidGlass
**液态玻璃**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `variant` | String |  | `'light'` |  |
| `blur` | Number |  | `20` |  |
| `opacity` | Number |  | `0.7` |  |
| `animated` | Boolean |  | `true` |  |
| `accent-color` | String |  | `'#0078d4'` |  |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FluentMediaPlayer
**媒体播放器**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `src` | String | ✓ | — |  |
| `poster` | String |  | `''` |  |
| `title` | String |  | `''` |  |
| `artist` | String |  | `''` |  |
| `subtitle` | String |  | `''` |  |
| `type` | String |  | `'auto'` |  |
| `fit` | String |  | `'contain'` |  |
| `width` | String \| Number |  | `'100%'` |  |
| `height` | String \| Number |  | `'auto'` |  |
| `max-width` | String \| Number |  | `'100%'` |  |
| `max-height` | String \| Number |  | `'75vh'` |  |
| `disable-animations` | Boolean |  | `false` |  |
| `autoplay` | Boolean |  | `false` |  |
| `loop` | Boolean |  | `false` |  |
| `muted` | Boolean |  | `false` |  |
| `volume` | Number |  | `1` |  |
| `playback-rate` | Number |  | `1` |  |
| `show-loop` | Boolean |  | `true` |  |
| `show-playback-rate` | Boolean |  | `true` |  |
| `show-picture-in-picture` | Boolean |  | `true` |  |
| `show-minimize` | Boolean |  | `false` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@play` | |
| `@pause` | |
| `@ended` | |
| `@timeupdate` | |
| `@loadedmetadata` | |
| `@volumechange` | |
| `@ratechange` | |
| `@autoplayblocked` | |
| `@minimize` | |

#### 实例方法

- `el`
- `contentEl`
- `play`
- `pause`
- `seek`
- `minimize`
- `pauseInternalAnimation`
- `resumeInternalAnimation`

#### 示例

```vue
<FluentMediaPlayer src="/media.mp4" poster="/cover.webp" type="video" show-minimize @minimize="onMinimize" />
```

### FluentMediaPlayerElement
**媒体播放器元素**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `src` | String | ✓ | — |  |
| `poster` | String |  | `''` |  |
| `autoplay` | Boolean |  | `false` |  |
| `loop` | Boolean |  | `false` |  |
| `muted` | Boolean |  | `false` |  |

### FluentParallaxView
**视差视图**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `speed` | Number |  | `0.5` |  |
| `direction` | String |  | `'vertical'` |  |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FluentPersonPicture
**人物图片**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `src` | String |  | `''` |  |
| `display-name` | String |  | `''` |  |
| `initials` | String |  | `''` |  |
| `size` | Number |  | `32` |  |
| `shape` | String |  | `'circle'` |  |

### FluentRichTextBlock
**富文本块**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `text` | String |  | `''` |  |
| `selectable` | Boolean |  | `false` |  |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FluentScrollViewer
**滚动查看器**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `horizontal` | Boolean |  | `false` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@scroll` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FluentScrollBar
**滚动条**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `orientation` | String |  | `'vertical'` |  |
| `value` | Number |  | `0` |  |
| `minimum` | Number |  | `0` |  |
| `maximum` | Number |  | `100` |  |
| `viewport-size` | Number |  | `0` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:value` | |
| `@scroll` | |

### FluentSwipeControl
**滑动控制**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `left-actions` | Array |  | `() => []` |  |
| `right-actions` | Array |  | `() => []` |  |
| `threshold` | Number |  | `80` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@action` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FluentPullToRefresh
**下拉刷新**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `threshold` | Number |  | `80` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@refresh` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FluentTabView
**标签视图**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `tabs` | Array | ✓ | — |  |
| `model-value` | Number |  | `0` |  |
| `vertical` | Boolean |  | `false` |  |
| `closable` | Boolean |  | `false` |  |
| `scrollable` | Boolean |  | `true` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@change` | |
| `@close` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FluentTitleBar
**标题栏**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `draggable` | Boolean |  | `true` |  |
| `show-window-controls` | Boolean |  | `false` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@minimize` | |
| `@maximize` | |
| `@close` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FluentToggle
**切换**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `model-value` | Boolean |  | `false` |  |
| `label` | String |  | `''` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#label` | |

### FluentVariableSizedWrapGrid
**可变尺寸网格**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `item-width` | Number |  | `100` |  |
| `item-height` | Number |  | `100` |  |
| `orientation` | String |  | `'horizontal'` |  |
| `horizontal-children-alignment` | String |  | `'left'` |  |
| `vertical-children-alignment` | String |  | `'top'` |  |
| `padding` | String \| Number |  | `0` |  |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FluentViewbox
**视图框**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `stretch` | String |  | `'uniform'` |  |
| `width` | Number \| String |  | `'auto'` |  |
| `height` | Number \| String |  | `'auto'` |  |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FluentWatermark
**水印**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `text` | String |  | `''` |  |
| `font` | String |  | `'16px Segoe UI'` |  |
| `color` | String |  | `'rgba(0, 0, 0, 0.1)'` |  |
| `rotate` | Number |  | `-22` |  |
| `gap` | Array |  | `() => [100, 100]` |  |
| `offset` | Array |  | `() => [0, 0]` |  |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FullscreenToggle
**全屏切换**

### SplashScreen
**启动画面**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `model-value` | Boolean |  | `false` |  |
| `logo` | String |  | `''` |  |
| `title` | String |  | `''` |  |
| `subtitle` | String |  | `''` |  |
| `show-progress` | Boolean |  | `true` |  |
| `duration` | Number |  | `0` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@done` | |

### FluentTheme
**主题**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `theme` | String |  | `'system'` |  |
| `material` | String |  | `'acrylic'` |  |
| `accent-color` | String |  | `''` |  |
| `locale` | String |  | `'zh-CN'` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@theme-change` | |
| `@material-change` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

#### 示例

```vue
<FluentTheme theme="system" material="acrylic"><App /></FluentTheme>
```

## 其他

### FluentControlExample
**FluentControlExample**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `header-text` | String |  | `''` |  |
| `theme` | String |  | `'light'` |  |
| `source-code` | String |  | `''` |  |
| `show-source-code` | Boolean |  | `true` |  |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#example` | |
| `#default` | |
| `#options` | |

### FluentGrid
**网格布局**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `columns` | Number \| String |  | `1` |  |
| `rows` | Number \| String |  | `'auto'` |  |
| `column-spacing` | Number |  | `0` |  |
| `row-spacing` | Number |  | `0` |  |
| `padding` | String \| Number |  | `0` |  |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#default` | |

### FluentAppBarButton
**应用栏按钮**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `icon` | String |  | `''` |  |
| `label` | String |  | `''` |  |
| `disabled` | Boolean |  | `false` |  |
| `compact` | Boolean |  | `false` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@click` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#icon` | |

### FluentAppBarSeparator
**应用栏分隔符**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `compact` | Boolean |  | `false` |  |

### FluentAppBarToggleButton
**应用栏切换按钮**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `icon` | String |  | `''` |  |
| `label` | String |  | `''` |  |
| `model-value` | Boolean |  | `false` |  |
| `disabled` | Boolean |  | `false` |  |
| `compact` | Boolean |  | `false` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@update:model-value` | |
| `@change` | |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#icon` | |

### FluentSplitView
**分割视图**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `pane-width` | Number \| String |  | `250` |  |
| `is-pane-open` | Boolean |  | `true` |  |
| `pane-placement` | String |  | `'left'` |  |

#### Slots

| 插槽名 | 说明 |
|---|---|
| `#pane` | |
| `#default` | |

### SecondarySidebarMenu
**侧边栏菜单**

#### Props

| Prop | 类型 | 必填 | 默认值 | 说明 |
|---|---|---|---|---|
| `open` | Boolean |  | `false` |  |
| `collapsed` | Boolean |  | `false` |  |
| `items` | Array | ✓ | — |  |
| `back-label` | String |  | `'Back'` |  |
| `initial-route` | String \| Object |  | `null` |  |
| `navigate-on-open` | Boolean |  | `false` |  |
| `logo-src` | String |  | `''` |  |
| `brand-title` | String |  | `'Vue Fluent Widgets'` |  |

#### Events

| 事件名 | 说明 |
|---|---|
| `@back` | |
| `@toggle-collapse` | |
| `@navigate` | |
