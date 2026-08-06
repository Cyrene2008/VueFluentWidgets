import type { App, DefineComponent, Plugin } from 'vue'

export type FluentWidget = DefineComponent

export type MaterialType = 'solid' | 'acrylic' | 'mica' | 'mica-alt' | 'none'

export interface MaterialConfig {
  type: MaterialType
  tintOpacity?: number
  luminosityOpacity?: number
  blurAmount?: number
}

export interface FluentMediaPlayerProps {
  /** Media source URL. */
  src: string
  /** Poster image URL for video playback. */
  poster?: string
  /** Display title for audio playback. */
  title?: string
  /** Display artist for audio playback. */
  artist?: string
  /** Secondary display text for audio playback. */
  subtitle?: string
  /** Media kind, or automatic extension-based detection. */
  type?: 'auto' | 'audio' | 'video' | string
  /** Object-fit mode used by the media element. */
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down' | string
  width?: string | number
  height?: string | number
  maxWidth?: string | number
  maxHeight?: string | number
  /** Disable the component's CSS transitions and keyframe animations. */
  disableAnimations?: boolean
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  volume?: number
  playbackRate?: number
  /** Whether to show the loop control. */
  showLoop?: boolean
  /** Whether to show the playback-rate control. */
  showPlaybackRate?: boolean
  /** Whether to show the browser Picture-in-Picture control. */
  showPictureInPicture?: boolean
  /** Whether to show the cross-route mini-player control. */
  showMinimize?: boolean
}

export interface FluentMediaPlayerState extends FluentMediaPlayerProps {
  currentTime: number
  playing: boolean
  volume: number
  muted: boolean
  playbackRate: number
  loop: boolean
}

export interface FluentMediaPlayerExposed {
  /** Root player element for external animation libraries. */
  el: HTMLElement | null
  /** Media container element for external animation libraries. */
  contentEl: HTMLElement | null
  play(): Promise<boolean>
  pause(): void
  seek(seconds: number): void
  minimize(): void
  pauseInternalAnimation(): void
  resumeInternalAnimation(): void
}

export interface FluentMediaPlayerEmits {
  play: () => void
  pause: () => void
  ended: () => void
  timeupdate: (currentTime: number) => void
  loadedmetadata: (payload: { duration: number }) => void
  volumechange: (payload: { volume: number; muted: boolean }) => void
  ratechange: (rate: number) => void
  autoplayblocked: (error: unknown) => void
  minimize: (state: FluentMediaPlayerState) => void
}

export declare const FluentAnimatedIcon: FluentWidget
export declare const FluentAppBarButton: FluentWidget
export declare const FluentAppBarSeparator: FluentWidget
export declare const FluentAppBarToggleButton: FluentWidget
export declare const FluentAutoSuggestBox: FluentWidget
export declare const FluentBackToTop: FluentWidget
export declare const FluentBreadcrumbBar: FluentWidget
export declare const FluentButton: FluentWidget
export declare const FluentCalendarDatePicker: FluentWidget
export declare const FluentCanvas: FluentWidget
export declare const FluentCard: FluentWidget
export declare const FluentCheckBox: FluentWidget
export declare const FluentCol: FluentWidget
export declare const FluentColorPicker: FluentWidget
export declare const FluentComboBox: FluentWidget
export declare const FluentCommandBar: FluentWidget
export declare const FluentContentDialog: FluentWidget
export declare const FluentControlExample: FluentWidget
export declare const FluentDatePicker: FluentWidget
export declare const FluentDataGrid: FluentWidget
export declare const FluentDescriptions: FluentWidget
export declare const FluentDivider: FluentWidget
export declare const FluentDrawer: FluentWidget
export declare const FluentDropDownButton: FluentWidget
export declare const FluentEmptyState: FluentWidget
export declare const FluentExpander: FluentWidget
export declare const FluentFloatButton: FluentWidget
export declare const FluentFlipView: FluentWidget
export declare const FluentFlyout: FluentWidget
export declare const FluentGrid: FluentWidget
export declare const FluentGridView: FluentWidget
export declare const FluentHorizontalScrollContainer: FluentWidget
export declare const FluentHyperlinkButton: FluentWidget
export declare const FluentIcon: FluentWidget
export declare const FluentImage: FluentWidget
export declare const FluentImageViewer: FluentWidget
export declare const FluentInfoBadge: FluentWidget
export declare const FluentInfoBar: FluentWidget
export declare const FluentInput: FluentWidget
export declare const FluentItemsRepeater: FluentWidget
export declare const FluentItemsView: FluentWidget
export declare const FluentListBox: FluentWidget
export declare const FluentLiquidGlass: FluentWidget
export declare const FluentListView: FluentWidget
export declare const FluentMediaPlayer: DefineComponent<FluentMediaPlayerProps, {}, {}, {}, {}, {}, {}, FluentMediaPlayerEmits> & {
  new (): FluentMediaPlayerExposed
}
export declare const FluentMediaPlayerElement: FluentWidget
export declare const FluentMenuBar: FluentWidget
export declare const FluentModal: FluentWidget
export declare const FluentNavigationView: FluentWidget
export declare const FluentNumberBox: FluentWidget
export declare const FluentPageHeader: FluentWidget
export declare const FluentPasswordBox: FluentWidget
export declare const FluentParallaxView: FluentWidget
export declare const FluentPersonPicture: FluentWidget
export declare const FluentPipsPager: FluentWidget
export declare const FluentPivot: FluentWidget
export declare const FluentPivotItem: FluentWidget
export declare const FluentPopup: FluentWidget
export declare const FluentProgressBar: FluentWidget
export declare const FluentProgressRing: FluentWidget
export declare const FluentPullToRefresh: FluentWidget
export declare const FluentRadioButton: FluentWidget
export declare const FluentRating: FluentWidget
export declare const FluentRelativePanel: FluentWidget
export declare const FluentRepeatButton: FluentWidget
export declare const FluentResult: FluentWidget
export declare const FluentRichEditBox: FluentWidget
export declare const FluentRichTextBlock: FluentWidget
export declare const FluentRow: FluentWidget
export declare const FluentScrollBar: FluentWidget
export declare const FluentScrollViewer: FluentWidget
export declare const FluentSegmented: FluentWidget
export declare const FluentSelect: FluentWidget
export declare const FluentSelectorBar: FluentWidget
export declare const FluentSelectorBarItem: FluentWidget
export declare const FluentSemanticZoom: FluentWidget
export declare const FluentSettingsCard: FluentWidget
export declare const FluentSkeleton: FluentWidget
export declare const FluentSlider: FluentWidget
export declare const FluentSpace: FluentWidget
export declare const FluentSplitButton: FluentWidget
export declare const FluentSplitView: FluentWidget
export declare const FluentStackPanel: FluentWidget
export declare const FluentStatistics: FluentWidget
export declare const FluentSwipeControl: FluentWidget
export declare const FluentTabView: FluentWidget
export declare const FluentTabs: FluentWidget
export declare const FluentTeachingTip: FluentWidget
export declare const FluentTextBox: FluentWidget
export declare const FluentTextBlock: FluentWidget
export declare const FluentTheme: FluentWidget
export declare const FluentTimePicker: FluentWidget
export declare const FluentTimeline: FluentWidget
export declare const FluentTitleBar: FluentWidget
export declare const FluentToast: FluentWidget
export declare const FluentToggle: FluentWidget
export declare const FluentToggleButton: FluentWidget
export declare const FluentToggleSwitch: FluentWidget
export declare const FluentTooltip: FluentWidget
export declare const FluentTreeView: FluentWidget
export declare const FluentVariableSizedWrapGrid: FluentWidget
export declare const FluentViewbox: FluentWidget
export declare const FluentWatermark: FluentWidget
export declare const FullscreenToggle: FluentWidget
export declare const MaterialPresets: Record<MaterialType, { type: MaterialType; tintOpacity: number; luminosityOpacity: number; blurAmount: number }>
export declare function getMaterialStyles(material: MaterialType | MaterialConfig): Record<string, string>
export declare const SecondarySidebarMenu: FluentWidget
export declare const SplashScreen: FluentWidget
export declare const install: (app: App) => void

declare module 'vue' {
  interface GlobalComponents {
    FluentAnimatedIcon: typeof FluentAnimatedIcon
    FluentAppBarButton: typeof FluentAppBarButton
    FluentAppBarSeparator: typeof FluentAppBarSeparator
    FluentAppBarToggleButton: typeof FluentAppBarToggleButton
    FluentAutoSuggestBox: typeof FluentAutoSuggestBox
    FluentBackToTop: typeof FluentBackToTop
    FluentBreadcrumbBar: typeof FluentBreadcrumbBar
    FluentButton: typeof FluentButton
    FluentCalendarDatePicker: typeof FluentCalendarDatePicker
    FluentCanvas: typeof FluentCanvas
    FluentCard: typeof FluentCard
    FluentCheckBox: typeof FluentCheckBox
    FluentCol: typeof FluentCol
    FluentColorPicker: typeof FluentColorPicker
    FluentComboBox: typeof FluentComboBox
    FluentCommandBar: typeof FluentCommandBar
    FluentContentDialog: typeof FluentContentDialog
    FluentControlExample: typeof FluentControlExample
    FluentDatePicker: typeof FluentDatePicker
    FluentDataGrid: typeof FluentDataGrid
    FluentDescriptions: typeof FluentDescriptions
    FluentDivider: typeof FluentDivider
    FluentDrawer: typeof FluentDrawer
    FluentDropDownButton: typeof FluentDropDownButton
    FluentEmptyState: typeof FluentEmptyState
    FluentExpander: typeof FluentExpander
    FluentFloatButton: typeof FluentFloatButton
    FluentFlipView: typeof FluentFlipView
    FluentFlyout: typeof FluentFlyout
    FluentGrid: typeof FluentGrid
    FluentGridView: typeof FluentGridView
    FluentHorizontalScrollContainer: typeof FluentHorizontalScrollContainer
    FluentHyperlinkButton: typeof FluentHyperlinkButton
    FluentIcon: typeof FluentIcon
    FluentImage: typeof FluentImage
    FluentImageViewer: typeof FluentImageViewer
    FluentInfoBadge: typeof FluentInfoBadge
    FluentInfoBar: typeof FluentInfoBar
    FluentInput: typeof FluentInput
    FluentItemsRepeater: typeof FluentItemsRepeater
    FluentItemsView: typeof FluentItemsView
    FluentListBox: typeof FluentListBox
    FluentLiquidGlass: typeof FluentLiquidGlass
    FluentListView: typeof FluentListView
    FluentMediaPlayer: typeof FluentMediaPlayer
    FluentMediaPlayerElement: typeof FluentMediaPlayerElement
    FluentMenuBar: typeof FluentMenuBar
    FluentModal: typeof FluentModal
    FluentNavigationView: typeof FluentNavigationView
    FluentNumberBox: typeof FluentNumberBox
    FluentPageHeader: typeof FluentPageHeader
    FluentPasswordBox: typeof FluentPasswordBox
    FluentParallaxView: typeof FluentParallaxView
    FluentPersonPicture: typeof FluentPersonPicture
    FluentPipsPager: typeof FluentPipsPager
    FluentPivot: typeof FluentPivot
    FluentPivotItem: typeof FluentPivotItem
    FluentPopup: typeof FluentPopup
    FluentProgressBar: typeof FluentProgressBar
    FluentProgressRing: typeof FluentProgressRing
    FluentPullToRefresh: typeof FluentPullToRefresh
    FluentRadioButton: typeof FluentRadioButton
    FluentRating: typeof FluentRating
    FluentRelativePanel: typeof FluentRelativePanel
    FluentRepeatButton: typeof FluentRepeatButton
    FluentResult: typeof FluentResult
    FluentRichEditBox: typeof FluentRichEditBox
    FluentRichTextBlock: typeof FluentRichTextBlock
    FluentRow: typeof FluentRow
    FluentScrollBar: typeof FluentScrollBar
    FluentScrollViewer: typeof FluentScrollViewer
    FluentSegmented: typeof FluentSegmented
    FluentSelect: typeof FluentSelect
    FluentSelectorBar: typeof FluentSelectorBar
    FluentSelectorBarItem: typeof FluentSelectorBarItem
    FluentSemanticZoom: typeof FluentSemanticZoom
    FluentSettingsCard: typeof FluentSettingsCard
    FluentSkeleton: typeof FluentSkeleton
    FluentSlider: typeof FluentSlider
    FluentSpace: typeof FluentSpace
    FluentSplitButton: typeof FluentSplitButton
    FluentSplitView: typeof FluentSplitView
    FluentStackPanel: typeof FluentStackPanel
    FluentStatistics: typeof FluentStatistics
    FluentSwipeControl: typeof FluentSwipeControl
    FluentTabView: typeof FluentTabView
    FluentTabs: typeof FluentTabs
    FluentTeachingTip: typeof FluentTeachingTip
    FluentTextBox: typeof FluentTextBox
    FluentTextBlock: typeof FluentTextBlock
    FluentTheme: typeof FluentTheme
    FluentTimePicker: typeof FluentTimePicker
    FluentTimeline: typeof FluentTimeline
    FluentTitleBar: typeof FluentTitleBar
    FluentToast: typeof FluentToast
    FluentToggle: typeof FluentToggle
    FluentToggleButton: typeof FluentToggleButton
    FluentToggleSwitch: typeof FluentToggleSwitch
    FluentTooltip: typeof FluentTooltip
    FluentTreeView: typeof FluentTreeView
    FluentVariableSizedWrapGrid: typeof FluentVariableSizedWrapGrid
    FluentViewbox: typeof FluentViewbox
    FluentWatermark: typeof FluentWatermark
    FullscreenToggle: typeof FullscreenToggle
    SecondarySidebarMenu: typeof SecondarySidebarMenu
    SplashScreen: typeof SplashScreen
  }
}

declare const VueFluentWidgets: Plugin
export default VueFluentWidgets
