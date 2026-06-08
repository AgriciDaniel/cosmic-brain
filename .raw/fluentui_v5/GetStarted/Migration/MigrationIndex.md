---
title: Migration Guide V4 → V5
route: /Migration
hidden: false
---

This guide helps you migrate from **Fluent UI Blazor V4** to **V5**.
Each page below covers specific component changes, removed components, and new additions.

- ### General

  Start here for cross-cutting changes that affect all components.

  - [General changes](/Migration/General) — Base class, CSS, JS interop, localization, `DefaultValues`
  - [Color changes](/Migration/Color) — Enum renames (`Neutral` → `Default`, `Accent` → `Primary`)
  - [Copilot Instructions](/Migration/CopilotInstructions) — Use GitHub Copilot to assist migration

- ### Component changes

  Components that exist in both V4 and V5 but have breaking changes.

  | Component | Impact | Page |
  |-----------|--------|------|
  | FluentAccordion | Medium | [Migration](/Migration/Accordion) |
  | FluentAppBar | Low | [Migration](/Migration/AppBar) |
  | FluentBadge | High | [Migration](/Migration/Badge) |
  | FluentButton | Medium | [Migration](/Migration/Button) |
  | FluentCard | Medium | [Migration](/Migration/Card) |
  | FluentCheckbox | Medium | [Migration](/Migration/Checkbox) |
  | FluentCounterBadge | High | [Migration](/Migration/CounterBadge) |
  | FluentDataGrid | Medium | [Migration](/Migration/DataGrid) |
  | FluentDatePicker / FluentTimePicker | High | [Migration](/Migration/DateTime) |
  | FluentDialog | **Critical** | [Migration](/Migration/Dialog) |
  | FluentDivider | Medium | [Migration](/Migration/Divider) |
  | FluentGrid / FluentGridItem | Low | [Migration](/Migration/Grid) |
  | FluentIcon | Low | [Migration](/Migration/Icon) |
  | FluentInputFile | Low | [Migration](/Migration/InputFile) |
  | FluentKeyCode | Low | [Migration](/Migration/KeyCode) |
  | FluentLabel | Medium | [Migration](/Migration/Label) |
  | FluentLayout | High | [Migration](/Migration/Layout) |
  | FluentList (Select, Combobox, Listbox) | **Critical** | [Migration](/Migration/List) |
  | FluentMenu | High | [Migration](/Migration/Menu) |
  | FluentMenuButton | High | [Migration](/Migration/MenuButton) |
  | FluentMessageBar | Medium | [Migration](/Migration/MessageBar) |
  | FluentOverlay | High | [Migration](/Migration/Overlay) |
  | FluentPopover | High | [Migration](/Migration/Popover) |
  | FluentPresenceBadge | Medium | [Migration](/Migration/PresenceBadge) |
  | FluentProgressBar (was FluentProgress) | Medium | [Migration](/Migration/ProgressBar) |
  | FluentSpinner (was FluentProgressRing) | Medium | [Migration](/Migration/ProgressRing) |
  | FluentPullToRefresh | Low | [Migration](/Migration/PullToRefresh) |
  | FluentRadio | Medium | [Migration](/Migration/Radio) |
  | FluentSelect | **Critical** | [Migration](/Migration/Select) |
  | FluentSkeleton | Medium | [Migration](/Migration/Skeleton) |
  | FluentSlider | Medium | [Migration](/Migration/Slider) |
  | FluentSortableList | Low | [Migration](/Migration/SortableList) |
  | FluentSpacer | Low | [Migration](/Migration/Spacer) |
  | FluentSplitter | High | [Migration](/Migration/Splitter) |
  | FluentStack | Low | [Migration](/Migration/Stack) |
  | FluentSwitch | Medium | [Migration](/Migration/Switch) |
  | FluentTabs | High | [Migration](/Migration/Tabs) |
  | FluentTextArea | Low | [Migration](/Migration/TextArea) |
  | FluentTooltip | Medium | [Migration](/Migration/Tooltip) |
  | FluentTreeView | Medium | [Migration](/Migration/TreeView) |

- ### Removed components 💥

  Components that have been removed in V5. Each page explains the replacement strategy.

  | V4 Component | V5 Replacement | Page |
  |-------------|----------------|------|
  | FluentAnchor | `FluentLink` | [Migration](/Migration/Anchor) |
  | FluentBreadcrumb | *(no direct replacement)* | [Migration](/Migration/Breadcrumb) |
  | FluentDesignTheme / FluentDesignSystemProvider | CSS theming system | [Migration](/Migration/DesignTheme) |
  | FluentNavMenu / FluentNavMenuTree | `FluentNav` | [Migration](/Migration/NavMenu) |
  | FluentTextField / FluentNumberField / FluentSearch | `FluentTextInput` | [Migration](/Migration/TextField) |
  | FluentToast / FluentToastProvider | `FluentMessageBar` | [Migration](/Migration/Toast) |
  | FluentToolbar | `FluentStack` | [Migration](/Migration/Toolbar) |
  | FluentWizard | *(no direct replacement)* | [Migration](/Migration/Wizard) |
  | Other minor components | — | [Migration](/Migration/RemovedComponents) |

- ### New V5 components that replace V4 functionality

  | V5 Component | Replaces V4 | Migration details |
  |-------------|-------------|------|
  | FluentAnchorButton | `FluentAnchor` (button-styled) | [Migration](/Migration/Anchor) |
  | FluentField | `FluentValidationMessage` + inline labels | [Migration](/Migration/Field) |
  | FluentLink | `FluentAnchor` | [Migration](/Migration/Anchor) |
  | FluentNav | `FluentNavMenu` / `FluentNavMenuTree` | [Migration](/Migration/NavMenu) |
  | FluentRatingDisplay | `FluentRating` | [Migration](/Migration/RatingDisplay) |
  | FluentText | `FluentLabel` (typography) | [Migration](/Migration/Text) |
  | FluentTextInput | `FluentTextField` / `FluentNumberField` / `FluentSearch` | [Migration](/Migration/TextField) |
  | FluentTheme (CSS system) | `FluentDesignTheme` / `FluentDesignSystemProvider` | [Migration](/Migration/DesignTheme) |
