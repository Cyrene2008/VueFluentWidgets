# Vue Fluent Widgets Component Reference

Complete API reference for the Vue 3 Fluent Design component library. Includes Props, Events, Slots, and examples for all public components.

**Install:** `npm i vue-fluent-widgets`

**Styles:** `import 'vue-fluent-widgets/style.css'`

---

## Table of Contents

- **Basic Input**
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
- **Layout & Content**
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
- **Feedback & Status**
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
- **Navigation**
  - [FluentBreadcrumbBar](#fluentbreadcrumbbar)
  - [FluentCommandBar](#fluentcommandbar)
  - [FluentDrawer](#fluentdrawer)
  - [FluentMenuBar](#fluentmenubar)
  - [FluentNavigationView](#fluentnavigationview)
  - [FluentSelectorBar](#fluentselectorbar)
  - [FluentSelectorBarItem](#fluentselectorbaritem)
  - [FluentTreeView](#fluenttreeview)
- **Collections & Data**
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
- **Media & System**
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
- **Other**
  - [FluentControlExample](#fluentcontrolexample)
  - [FluentGrid](#fluentgrid)
  - [FluentAppBarButton](#fluentappbarbutton)
  - [FluentAppBarSeparator](#fluentappbarseparator)
  - [FluentAppBarToggleButton](#fluentappbartogglebutton)
  - [FluentSplitView](#fluentsplitview)
  - [SecondarySidebarMenu](#secondarysidebarmenu)

---

## Basic Input

### FluentAutoSuggestBox

#### Props

| Prop | Type | Required | Default | Description |
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

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@change` | |
| `@select` | |
| `@search` | |
| `@focus` | |
| `@blur` | |

#### Slots

| Slot | Description |
|---|---|
| `#suggestion` | |

### FluentButton

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `variant` | String |  | `'primary'` | 可选值: `primary`, `secondary`, `subtle`, `danger` |
| `size` | String |  | `'md'` | 可选值: `sm`, `md`, `lg` |
| `icon-only` | Boolean |  | `false` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| Event | Description |
|---|---|
| `@click` | |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

#### Example

```vue
<FluentButton variant="primary">保存</FluentButton>
```

### FluentCalendarDatePicker

#### Props

| Prop | Type | Required | Default | Description |
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

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@change` | |

#### Example

```vue
<FluentCalendarDatePicker model-value="2026-08-06" label="日期" />
```

### FluentCheckBox

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `model-value` | Boolean \| NullLiteral |  | `undefined` |  |
| `label` | String |  | `''` |  |
| `disabled` | Boolean |  | `false` |  |
| `indeterminate` | Boolean |  | `false` |  |

#### Events

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@change` | |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FluentColorPicker

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `model-value` | String |  | `'#0078d4'` |  |
| `label` | String |  | `''` |  |
| `disabled` | Boolean |  | `false` |  |
| `show-presets` | Boolean |  | `true` |  |
| `error` | String |  | `''` |  |
| `description` | String |  | `''` |  |

#### Events

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@change` | |

### FluentComboBox

#### Props

| Prop | Type | Required | Default | Description |
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

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@change` | |

#### Slots

| Slot | Description |
|---|---|
| `#item` | |

#### Example

```vue
<FluentComboBox :items="items" model-value="design" label="团队" />
```

### FluentDatePicker

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `model-value` | String |  | `''` |  |
| `label` | String |  | `''` |  |
| `placeholder` | String |  | `'选择日期'` |  |
| `min` | String |  | `''` |  |
| `max` | String |  | `''` |  |
| `disabled` | Boolean |  | `false` |  |
| `error` | String |  | `''` |  |

#### Events

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@change` | |

### FluentDropDownButton

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `label` | String |  | `''` |  |
| `items` | Array |  | `() => []` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| Event | Description |
|---|---|
| `@select` | |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FluentHyperlinkButton

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `label` | String |  | `''` |  |
| `href` | String |  | `''` |  |
| `target` | String |  | `'_self'` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| Event | Description |
|---|---|
| `@click` | |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FluentInput

#### Props

| Prop | Type | Required | Default | Description |
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

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@enter` | |

#### Slots

| Slot | Description |
|---|---|
| `#prefix` | |
| `#suffix` | |

#### Exposed

- `focus`

#### Example

```vue
<FluentInput v-model="value" label="名称"><template #prefix>🔎</template></FluentInput>
```

### FluentListBox

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `items` | Array | ✓ | — |  |
| `model-value` | Object \| String \| Number \| Boolean \| Array |  | `null` |  |
| `selected-index` | Number |  | `-1` |  |
| `multiple` | Boolean |  | `false` |  |
| `label-key` | String |  | `'label'` |  |
| `value-key` | String |  | `'value'` |  |

#### Events

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@update:selected-index` | |
| `@change` | |

#### Slots

| Slot | Description |
|---|---|
| `#item` | |

### FluentNumberBox

#### Props

| Prop | Type | Required | Default | Description |
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

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@change` | |
| `@focus` | |
| `@blur` | |

### FluentPasswordBox

#### Props

| Prop | Type | Required | Default | Description |
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

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@change` | |
| `@focus` | |
| `@blur` | |

### FluentRadioButton

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `model-value` | String \| Number \| Boolean \| Object |  | `undefined` |  |
| `items` | Array | ✓ | — |  |
| `label` | String |  | `''` |  |
| `disabled` | Boolean |  | `false` |  |
| `selected-index` | Number |  | `undefined` |  |

#### Events

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@update:selected-index` | |
| `@change` | |

### FluentRepeatButton

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `label` | String |  | `''` |  |
| `disabled` | Boolean |  | `false` |  |
| `delay` | Number |  | `500` |  |
| `interval` | Number |  | `100` |  |

#### Events

| Event | Description |
|---|---|
| `@click` | |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FluentRichEditBox

#### Props

| Prop | Type | Required | Default | Description |
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

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@change` | |
| `@focus` | |
| `@blur` | |

#### Example

```vue
<FluentRichEditBox v-model="content" label="内容" />
```

### FluentSegmented

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `items` | Array | ✓ | — |  |
| `model-value` | String \| Number |  | `0` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@change` | |

### FluentSelect

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `model-value` | String \| Number |  | `''` |  |
| `options` | Array |  | `() => []` |  |
| `placeholder` | String |  | `'请选择'` |  |
| `disabled` | Boolean |  | `false` |  |
| `width` | String |  | `''` |  |
| `label` | String |  | `''` |  |
| `error` | String |  | `''` |  |

#### Events

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@change` | |

#### Slots

| Slot | Description |
|---|---|
| `#option` | |

#### Example

```vue
<FluentSelect v-model="value" :options="options" label="城市" />
```

### FluentSlider

#### Props

| Prop | Type | Required | Default | Description |
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

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@change` | |

### FluentSplitButton

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `label` | String |  | `''` |  |
| `items` | Array |  | `() => []` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| Event | Description |
|---|---|
| `@click` | |
| `@select` | |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FluentTextBox

#### Props

| Prop | Type | Required | Default | Description |
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

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@change` | |
| `@focus` | |
| `@blur` | |
| `@keydown` | |
| `@clear` | |

#### Slots

| Slot | Description |
|---|---|
| `#prefix` | |
| `#suffix` | |

#### Exposed

- `focus`
- `blur`

### FluentToggleButton

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `model-value` | Boolean |  | `undefined` |  |
| `checked` | Boolean |  | `undefined` |  |
| `label` | String |  | `''` |  |
| `icon` | String |  | `''` |  |
| `variant` | String |  | `'secondary'` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@update:checked` | |
| `@change` | |

#### Slots

| Slot | Description |
|---|---|
| `#icon` | |
| `#default` | |

### FluentToggleSwitch

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `model-value` | Boolean |  | `false` |  |
| `label` | String |  | `''` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@change` | |

### FluentRating

#### Props

| Prop | Type | Required | Default | Description |
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

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@change` | |

## Layout & Content

### FluentCard

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `hoverable` | Boolean |  | `false` |  |
| `material` | String |  | `'acrylic'` |  |

#### Events

| Event | Description |
|---|---|
| `@click` | |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

#### Example

```vue
<FluentCard material="acrylic">任意卡片内容</FluentCard>
```

### FluentCol

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `span` | Number |  | `24` |  |
| `offset` | Number |  | `0` |  |
| `push` | Number |  | `0` |  |
| `pull` | Number |  | `0` |  |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FluentDivider

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `orientation` | String |  | `'horizontal'` |  |
| `inset` | Boolean |  | `false` |  |

### FluentExpander

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `header` | String | ✓ | — |  |
| `description` | String |  | `''` |  |
| `icon` | String |  | `''` |  |
| `expand-up` | Boolean |  | `false` |  |
| `model-value` | Boolean |  | `false` |  |

#### Events

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@expand` | |
| `@collapse` | |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FluentGrid

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `columns` | Number \| String |  | `1` |  |
| `rows` | Number \| String |  | `'auto'` |  |
| `column-spacing` | Number |  | `0` |  |
| `row-spacing` | Number |  | `0` |  |
| `padding` | String \| Number |  | `0` |  |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FluentPageHeader

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `title` | String | ✓ | — |  |
| `description` | String |  | `''` |  |
| `icon` | String |  | `''` |  |

#### Slots

| Slot | Description |
|---|---|
| `#actions` | |

### FluentRelativePanel

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `padding` | String \| Number |  | `0` |  |
| `background` | String |  | `'transparent'` |  |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FluentRow

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `gutter` | Number \| Array |  | `0` |  |
| `justify` | String |  | `'start'` |  |
| `align` | String |  | `'top'` |  |
| `wrap` | Boolean |  | `true` |  |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FluentSettingsCard

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `title` | String | ✓ | — |  |
| `description` | String |  | `''` |  |
| `icon` | String |  | `''` |  |
| `clickable` | Boolean |  | `false` |  |

#### Slots

| Slot | Description |
|---|---|
| `#action` | |
| `#default` | |

### FluentSpace

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `direction` | String |  | `'horizontal'` |  |
| `size` | Number \| String \| Array |  | `8` |  |
| `align` | String |  | `'start'` |  |
| `wrap` | Boolean |  | `false` |  |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FluentStackPanel

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `orientation` | String |  | `'vertical'` |  |
| `spacing` | Number |  | `0` |  |
| `padding` | String \| Number |  | `0` |  |
| `horizontal-alignment` | String |  | `'stretch'` |  |
| `vertical-alignment` | String |  | `'top'` |  |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FluentTabs

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `model-value` | String \| Number | ✓ | — |  |
| `options` | Array |  | `() => []` |  |
| `tabs` | Array |  | `() => []` |  |

#### Events

| Event | Description |
|---|---|
| `@update:model-value` | |

#### Slots

| Slot | Description |
|---|---|
| `#dynamic: modelValue` | |

#### Example

```vue
<FluentTabs v-model="active" :tabs="tabs"><template #tab-0>面板内容</template></FluentTabs>
```

### FluentPivot

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `items` | Array | ✓ | — |  |
| `model-value` | Number |  | `0` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@change` | |

#### Slots

| Slot | Description |
|---|---|
| `#dynamic: `tab-${selectedIndex}`` | |
| `#default` | |

### FluentPivotItem

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `item-key` | String \| Number | ✓ | — |  |
| `label` | String |  | `''` |  |
| `icon` | String |  | `''` |  |
| `disabled` | Boolean |  | `false` |  |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

## Feedback & Status

### FluentContentDialog

#### Props

| Prop | Type | Required | Default | Description |
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

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@close` | |
| `@primary-click` | |
| `@secondary-click` | |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |
| `#footer` | |

#### Example

```vue
<FluentContentDialog v-model="open" title="确认操作">这里是对话框内容。</FluentContentDialog>
```

### FluentEmptyState

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `icon` | String |  | `''` |  |
| `title` | String |  | `''` |  |
| `description` | String |  | `''` |  |

#### Slots

| Slot | Description |
|---|---|
| `#action` | |

### FluentInfoBadge

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `value` | Number \| String |  | `null` |  |
| `severity` | String |  | `'attention'` |  |

### FluentInfoBar

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `title` | String |  | `''` |  |
| `message` | String |  | `''` |  |
| `severity` | String |  | `'info'` |  |
| `closable` | Boolean |  | `true` |  |
| `action` | String |  | `''` |  |
| `model-value` | Boolean |  | `true` |  |

#### Events

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@close` | |
| `@action` | |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

#### Example

```vue
<FluentInfoBar severity="info" title="提示">可以放任意说明内容。</FluentInfoBar>
```

### FluentModal

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `model-value` | Boolean |  | `false` |  |
| `title` | String |  | `''` |  |
| `max-width` | String |  | `'520px'` |  |
| `persistent` | Boolean |  | `false` |  |

#### Events

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@close` | |

#### Slots

| Slot | Description |
|---|---|
| `#icon` | |
| `#default` | |
| `#footer` | |

#### Example

```vue
<FluentModal v-model="open" title="确认操作"><template #footer><FluentButton>确认</FluentButton></template></FluentModal>
```

### FluentPopup

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `model-value` | Boolean |  | `false` |  |
| `placement` | String |  | `'bottom'` |  |
| `target` | Object \| String |  | `null` |  |
| `offset` | Number |  | `8` |  |
| `close-on-overlay` | Boolean |  | `true` |  |
| `close-on-escape` | Boolean |  | `true` |  |

#### Events

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@open` | |
| `@close` | |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FluentProgressBar

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `value` | Number |  | `0` |  |
| `min` | Number |  | `0` |  |
| `max` | Number |  | `100` |  |
| `indeterminate` | Boolean |  | `false` |  |
| `error` | Boolean |  | `false` |  |
| `paused` | Boolean |  | `false` |  |

### FluentProgressRing

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `value` | Number |  | `0` |  |
| `min` | Number |  | `0` |  |
| `max` | Number |  | `100` |  |
| `indeterminate` | Boolean |  | `true` |  |
| `error` | Boolean |  | `false` |  |
| `paused` | Boolean |  | `false` |  |
| `size` | Number \| String |  | `32` |  |

### FluentResult

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `status` | String |  | `'info'` |  |
| `title` | String |  | `''` |  |
| `description` | String |  | `''` |  |

#### Slots

| Slot | Description |
|---|---|
| `#action` | |

### FluentSkeleton

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `width` | String \| Number |  | `'100%'` |  |
| `height` | String \| Number |  | `'16px'` |  |
| `shape` | String |  | `'rect'` |  |
| `animated` | Boolean |  | `true` |  |

### FluentTeachingTip

#### Props

| Prop | Type | Required | Default | Description |
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

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@open` | |
| `@close` | |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |
| `#actions` | |

### FluentToast

#### Exposed

- `add`
- `remove`

#### Example

```vue
<FluentToast ref="toast" />
```

### FluentTooltip

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `content` | String |  | `''` |  |
| `placement` | String |  | `'top'` |  |
| `disabled` | Boolean |  | `false` |  |
| `delay` | Number |  | `300` |  |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |
| `#content` | |

### FluentFlyout

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `model-value` | Boolean |  | `undefined` |  |
| `title` | String |  | `''` |  |
| `placement` | String |  | `'bottom'` |  |
| `closable` | Boolean |  | `true` |  |
| `close-on-escape` | Boolean |  | `true` |  |
| `close-on-overlay` | Boolean |  | `true` |  |

#### Events

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@open` | |
| `@close` | |

#### Slots

| Slot | Description |
|---|---|
| `#trigger` | |
| `#default` | |
| `#footer` | |

## Navigation

### FluentBreadcrumbBar

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `items` | Array | ✓ | — |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| Event | Description |
|---|---|
| `@item-click` | |

### FluentCommandBar

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `primary-commands` | Array |  | `() => []` |  |
| `secondary-commands` | Array |  | `() => []` |  |
| `show-labels` | Boolean |  | `true` |  |

#### Events

| Event | Description |
|---|---|
| `@command-click` | |

### FluentDrawer

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `model-value` | Boolean |  | `false` |  |
| `title` | String |  | `''` |  |
| `placement` | String |  | `'right'` |  |
| `size` | String |  | `'medium'` |  |
| `closable` | Boolean |  | `true` |  |
| `close-on-overlay` | Boolean |  | `true` |  |
| `close-on-escape` | Boolean |  | `true` |  |

#### Events

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@open` | |
| `@close` | |

#### Slots

| Slot | Description |
|---|---|
| `#header` | |
| `#default` | |
| `#footer` | |

#### Example

```vue
<FluentDrawer v-model="open" title="侧边抽屉">这里是抽屉内容。</FluentDrawer>
```

### FluentMenuBar

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `items` | Array | ✓ | — |  |

#### Events

| Event | Description |
|---|---|
| `@item-click` | |

### FluentNavigationView

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `menu-items` | Array | ✓ | — |  |
| `pane-title` | String |  | `''` |  |
| `show-toggle-button` | Boolean |  | `true` |  |
| `show-search-box` | Boolean |  | `false` |  |
| `default-selected-item` | String |  | `''` |  |
| `compact-mode` | Boolean |  | `false` |  |

#### Events

| Event | Description |
|---|---|
| `@item-selected` | |
| `@pane-toggle` | |

#### Slots

| Slot | Description |
|---|---|
| `#footer` | |
| `#default` | |

### FluentSelectorBar

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `items` | Array | ✓ | — |  |
| `model-value` | Number |  | `0` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@change` | |

### FluentSelectorBarItem

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `item-key` | String \| Number | ✓ | — |  |
| `label` | String |  | `''` |  |
| `icon` | String |  | `''` |  |
| `disabled` | Boolean |  | `false` |  |

### FluentTreeView

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `items` | Array | ✓ | — |  |
| `level` | Number |  | `0` |  |
| `selected-id` | String \| Number |  | `null` |  |
| `expanded-ids` | Array |  | `() => []` |  |

#### Events

| Event | Description |
|---|---|
| `@select` | |
| `@expand` | |
| `@collapse` | |

#### Example

```vue
<FluentTreeView :items="tree" @select="onSelect" />
```

## Collections & Data

### FluentDataGrid

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `data` | Array | ✓ | — |  |
| `columns` | Array | ✓ | — |  |
| `selectable` | Boolean |  | `false` |  |
| `selected-rows` | Array |  | `() => []` |  |
| `loading` | Boolean |  | `false` |  |
| `paginated` | Boolean |  | `false` |  |
| `page-size` | Number |  | `10` |  |

#### Events

| Event | Description |
|---|---|
| `@update:selected-rows` | |
| `@row-click` | |
| `@row-dblclick` | |
| `@sort` | |

#### Slots

| Slot | Description |
|---|---|
| `#toolbar` | |
| `#dynamic: `cell-${column.key}`` | |
| `#actions` | |

#### Example

```vue
<FluentDataGrid :data="rows" :columns="columns" selectable />
```

### FluentDescriptions

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `title` | String |  | `''` |  |
| `items` | Array | ✓ | — |  |
| `column` | Number |  | `3` |  |
| `layout` | String |  | `'horizontal'` |  |
| `size` | String |  | `'medium'` |  |
| `bordered` | Boolean |  | `false` |  |

#### Slots

| Slot | Description |
|---|---|
| `#dynamic: item.key || `item-${index}`` | |

### FluentFlipView

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `items` | Array | ✓ | — |  |
| `model-value` | Number |  | `0` |  |
| `vertical` | Boolean |  | `false` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@change` | |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

#### Example

```vue
<FluentFlipView v-model="index" :items="items" style="height: 300px;"><template #default="{ item }">{{ item.title }}</template></FluentFlipView>
```

### FluentGridView

#### Props

| Prop | Type | Required | Default | Description |
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

| Event | Description |
|---|---|
| `@select` | |
| `@invoke` | |
| `@update:selected-items` | |
| `@reorder` | |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

#### Example

```vue
<FluentGridView :items="items" selection-mode="multiple" v-model:selected-items="selected"><template #default="{ item }"><YourCard :item="item" /></template></FluentGridView>
```

### FluentHorizontalScrollContainer

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `scroll-amount` | Number |  | `200` |  |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FluentItemsRepeater

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `items` | Array | ✓ | — |  |
| `item-key` | String |  | `'id'` |  |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FluentItemsView

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `items` | Array | ✓ | — |  |
| `layout` | String |  | `'stack'` |  |
| `columns` | Number |  | `4` |  |
| `selection-mode` | String |  | `'none'` |  |
| `selected-items` | Array |  | `() => []` |  |
| `item-invoked-enabled` | Boolean |  | `false` |  |
| `item-key` | String |  | `'id'` |  |

#### Events

| Event | Description |
|---|---|
| `@select` | |
| `@invoke` | |
| `@update:selected-items` | |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FluentListView

#### Props

| Prop | Type | Required | Default | Description |
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

| Event | Description |
|---|---|
| `@select` | |
| `@invoke` | |
| `@update:selected-items` | |

#### Slots

| Slot | Description |
|---|---|
| `#header` | |
| `#group-header` | |
| `#default` | |

#### Example

```vue
<FluentListView :items="items"><template #default="{ item }"><YourRow :item="item" /></template></FluentListView>
```

### FluentPipsPager

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `model-value` | Number |  | `0` |  |
| `total-pages` | Number | ✓ | — |  |
| `max-visible-pips` | Number |  | `7` |  |
| `show-navigation` | Boolean |  | `true` |  |
| `vertical` | Boolean |  | `false` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@change` | |

### FluentSemanticZoom

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `model-value` | Boolean |  | `true` |  |
| `show-zoom-out-button` | Boolean |  | `true` |  |
| `can-change-views` | Boolean |  | `true` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@view-change-started` | |
| `@view-change-completed` | |

#### Slots

| Slot | Description |
|---|---|
| `#zoomed-in` | |
| `#zoomed-out` | |

### FluentStatistics

#### Props

| Prop | Type | Required | Default | Description |
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

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `items` | Array | ✓ | — |  |
| `position` | String |  | `'left'` |  |

#### Slots

| Slot | Description |
|---|---|
| `#dynamic: `item-${index}`` | |

## Media & System

### FluentAnimatedIcon

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `animation` | String |  | `'bounce'` |  |
| `duration` | Number |  | `300` |  |
| `trigger` | String |  | `'hover'` |  |

#### Events

| Event | Description |
|---|---|
| `@animation-start` | |
| `@animation-end` | |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FluentBackToTop

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `target` | String |  | `''` |  |
| `visibility-height` | Number |  | `300` |  |
| `right` | Number |  | `40` |  |
| `bottom` | Number |  | `40` |  |

### FluentCanvas

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `width` | Number \| String |  | `'auto'` |  |
| `height` | Number \| String |  | `'auto'` |  |
| `background` | String |  | `'transparent'` |  |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FluentFloatButton

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `icon` | String |  | `'add-20-regular'` |  |
| `position` | String |  | `'bottom-right'` |  |
| `menu-items` | Array |  | `() => []` |  |
| `aria-label` | String |  | `'浮动操作按钮'` |  |

#### Events

| Event | Description |
|---|---|
| `@click` | |
| `@menu-click` | |

### FluentIcon

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `icon` | String | ✓ | — |  |
| `width` | Number \| String |  | `20` |  |
| `height` | Number \| String |  | `undefined` |  |
| `class-name` | String |  | `''` |  |

### FluentImage

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `src` | String | ✓ | — |  |
| `alt` | String |  | `''` |  |
| `width` | Number \| String |  | `'auto'` |  |
| `height` | Number \| String |  | `'auto'` |  |
| `fit` | String |  | `'contain'` |  |

### FluentImageViewer

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `src` | String | ✓ | — |  |
| `alt` | String |  | `''` |  |
| `caption` | String |  | `''` |  |
| `width` | Number \| String |  | `'auto'` |  |
| `height` | Number \| String |  | `'auto'` |  |
| `fit` | String |  | `'contain'` |  |
| `clickable` | Boolean |  | `false` |  |

#### Events

| Event | Description |
|---|---|
| `@click` | |
| `@load` | |
| `@error` | |

### FluentLiquidGlass

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `variant` | String |  | `'light'` |  |
| `blur` | Number |  | `20` |  |
| `opacity` | Number |  | `0.7` |  |
| `animated` | Boolean |  | `true` |  |
| `accent-color` | String |  | `'#0078d4'` |  |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FluentMediaPlayer

#### Props

| Prop | Type | Required | Default | Description |
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

| Event | Description |
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

#### Exposed

- `el`
- `contentEl`
- `play`
- `pause`
- `seek`
- `minimize`
- `pauseInternalAnimation`
- `resumeInternalAnimation`

#### Example

```vue
<FluentMediaPlayer src="/media.mp4" poster="/cover.webp" type="video" show-minimize @minimize="onMinimize" />
```

### FluentMediaPlayerElement

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `src` | String | ✓ | — |  |
| `poster` | String |  | `''` |  |
| `autoplay` | Boolean |  | `false` |  |
| `loop` | Boolean |  | `false` |  |
| `muted` | Boolean |  | `false` |  |

### FluentParallaxView

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `speed` | Number |  | `0.5` |  |
| `direction` | String |  | `'vertical'` |  |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FluentPersonPicture

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `src` | String |  | `''` |  |
| `display-name` | String |  | `''` |  |
| `initials` | String |  | `''` |  |
| `size` | Number |  | `32` |  |
| `shape` | String |  | `'circle'` |  |

### FluentRichTextBlock

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `text` | String |  | `''` |  |
| `selectable` | Boolean |  | `false` |  |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FluentScrollViewer

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `horizontal` | Boolean |  | `false` |  |

#### Events

| Event | Description |
|---|---|
| `@scroll` | |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FluentScrollBar

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `orientation` | String |  | `'vertical'` |  |
| `value` | Number |  | `0` |  |
| `minimum` | Number |  | `0` |  |
| `maximum` | Number |  | `100` |  |
| `viewport-size` | Number |  | `0` |  |

#### Events

| Event | Description |
|---|---|
| `@update:value` | |
| `@scroll` | |

### FluentSwipeControl

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `left-actions` | Array |  | `() => []` |  |
| `right-actions` | Array |  | `() => []` |  |
| `threshold` | Number |  | `80` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| Event | Description |
|---|---|
| `@action` | |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FluentPullToRefresh

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `threshold` | Number |  | `80` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| Event | Description |
|---|---|
| `@refresh` | |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FluentTabView

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `tabs` | Array | ✓ | — |  |
| `model-value` | Number |  | `0` |  |
| `vertical` | Boolean |  | `false` |  |
| `closable` | Boolean |  | `false` |  |
| `scrollable` | Boolean |  | `true` |  |

#### Events

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@change` | |
| `@close` | |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FluentTitleBar

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `draggable` | Boolean |  | `true` |  |
| `show-window-controls` | Boolean |  | `false` |  |

#### Events

| Event | Description |
|---|---|
| `@minimize` | |
| `@maximize` | |
| `@close` | |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FluentToggle

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `model-value` | Boolean |  | `false` |  |
| `label` | String |  | `''` |  |
| `disabled` | Boolean |  | `false` |  |

#### Events

| Event | Description |
|---|---|
| `@update:model-value` | |

#### Slots

| Slot | Description |
|---|---|
| `#label` | |

### FluentVariableSizedWrapGrid

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `item-width` | Number |  | `100` |  |
| `item-height` | Number |  | `100` |  |
| `orientation` | String |  | `'horizontal'` |  |
| `horizontal-children-alignment` | String |  | `'left'` |  |
| `vertical-children-alignment` | String |  | `'top'` |  |
| `padding` | String \| Number |  | `0` |  |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FluentViewbox

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `stretch` | String |  | `'uniform'` |  |
| `width` | Number \| String |  | `'auto'` |  |
| `height` | Number \| String |  | `'auto'` |  |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FluentWatermark

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `text` | String |  | `''` |  |
| `font` | String |  | `'16px Segoe UI'` |  |
| `color` | String |  | `'rgba(0, 0, 0, 0.1)'` |  |
| `rotate` | Number |  | `-22` |  |
| `gap` | Array |  | `() => [100, 100]` |  |
| `offset` | Array |  | `() => [0, 0]` |  |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FullscreenToggle

### SplashScreen

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `model-value` | Boolean |  | `false` |  |
| `logo` | String |  | `''` |  |
| `title` | String |  | `''` |  |
| `subtitle` | String |  | `''` |  |
| `show-progress` | Boolean |  | `true` |  |
| `duration` | Number |  | `0` |  |

#### Events

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@done` | |

### FluentTheme

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `theme` | String |  | `'system'` |  |
| `material` | String |  | `'acrylic'` |  |
| `accent-color` | String |  | `''` |  |
| `locale` | String |  | `'zh-CN'` |  |

#### Events

| Event | Description |
|---|---|
| `@theme-change` | |
| `@material-change` | |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

#### Example

```vue
<FluentTheme theme="system" material="acrylic"><App /></FluentTheme>
```

## Other

### FluentControlExample

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `header-text` | String |  | `''` |  |
| `theme` | String |  | `'light'` |  |
| `source-code` | String |  | `''` |  |
| `show-source-code` | Boolean |  | `true` |  |

#### Slots

| Slot | Description |
|---|---|
| `#example` | |
| `#default` | |
| `#options` | |

### FluentGrid

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `columns` | Number \| String |  | `1` |  |
| `rows` | Number \| String |  | `'auto'` |  |
| `column-spacing` | Number |  | `0` |  |
| `row-spacing` | Number |  | `0` |  |
| `padding` | String \| Number |  | `0` |  |

#### Slots

| Slot | Description |
|---|---|
| `#default` | |

### FluentAppBarButton

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `icon` | String |  | `''` |  |
| `label` | String |  | `''` |  |
| `disabled` | Boolean |  | `false` |  |
| `compact` | Boolean |  | `false` |  |

#### Events

| Event | Description |
|---|---|
| `@click` | |

#### Slots

| Slot | Description |
|---|---|
| `#icon` | |

### FluentAppBarSeparator

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `compact` | Boolean |  | `false` |  |

### FluentAppBarToggleButton

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `icon` | String |  | `''` |  |
| `label` | String |  | `''` |  |
| `model-value` | Boolean |  | `false` |  |
| `disabled` | Boolean |  | `false` |  |
| `compact` | Boolean |  | `false` |  |

#### Events

| Event | Description |
|---|---|
| `@update:model-value` | |
| `@change` | |

#### Slots

| Slot | Description |
|---|---|
| `#icon` | |

### FluentSplitView

#### Props

| Prop | Type | Required | Default | Description |
|---|---|---|---|---|
| `pane-width` | Number \| String |  | `250` |  |
| `is-pane-open` | Boolean |  | `true` |  |
| `pane-placement` | String |  | `'left'` |  |

#### Slots

| Slot | Description |
|---|---|
| `#pane` | |
| `#default` | |

### SecondarySidebarMenu

#### Props

| Prop | Type | Required | Default | Description |
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

| Event | Description |
|---|---|
| `@back` | |
| `@toggle-collapse` | |
| `@navigate` | |
