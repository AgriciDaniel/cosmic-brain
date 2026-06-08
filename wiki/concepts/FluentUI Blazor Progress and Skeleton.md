---
title: FluentUI Blazor Progress and Skeleton
address: c-000137
status: developing
---

# FluentUI Blazor Progress and Skeleton

> Part of the [[FluentUI Blazor]] component library. Components for indicating loading states: `FluentProgressBar`, `FluentSpinner`, and `FluentSkeleton`.

## FluentProgressBar

A `FluentProgressBar` provides visual feedback for content being loaded or processed, either determinate (known progress) or indeterminate (unknown duration).

### Default and Indeterminate

```razor
{{!-- Determinate --}}
<FluentProgressBar Min="0" Max="100" Value="75" Width="200px" />

{{!-- Indeterminate (Value=null) --}}
<FluentProgressBar Width="200px" />
```

When `Value` is `null`, the progress bar is in indeterminate mode, animating continuously to show activity without a known endpoint.

### State and Color

Use the `State` attribute for semantic color coding:

```razor
<FluentProgressBar State="ProgressState.Success" Value="20" Thickness="ProgressThickness.Large" Width="300px" />
<FluentProgressBar State="ProgressState.Warning" Value="40" Thickness="ProgressThickness.Large" Width="300px" />
<FluentProgressBar State="ProgressState.Error" Value="60" Thickness="ProgressThickness.Large" Width="300px" />
<FluentProgressBar Color="purple" Value="80" Thickness="ProgressThickness.Large" Width="300px" />
```

The `State` overrides the `Color` parameter. Use `BackgroundColor` to set the track background.

### Visibility

```razor
<FluentProgressBar Width="200px" Visible="@Visible" />

{{-- Visible: true = visible, false = hidden, null = not rendered --}}
```

### Thickness

```razor
<FluentProgressBar Value="50" Thickness="ProgressThickness.Large" />
```

Values: `Small`, `Medium` (default), `Large`.

### API Parameters

| Parameter | Type | Description |
|---|---|---|
| `Value` | `double?` | Progress value; `null` for indeterminate |
| `Min` | `double` | Minimum value (default 0) |
| `Max` | `double` | Maximum value (default 100) |
| `State` | `ProgressState?` | Semantic state (`Success`, `Warning`, `Error`) |
| `Thickness` | `ProgressThickness?` | Bar thickness |
| `Color` | `string?` | Custom bar color |
| `BackgroundColor` | `string?` | Track background color |
| `Width` | `string?` | Bar width |
| `Visible` | `bool?` | Visibility (`true`/`false`/`null` = not rendered) |

## FluentSpinner

A `FluentSpinner` alerts users that content is being loaded or processed.

### Default

```razor
<FluentSpinner /> {{!-- Default medium size --}}
<FluentSpinner Size="SpinnerSize.Huge" />
```

### Inverted Appearance

For dark backgrounds:

```razor
<FluentSpinner AppearanceInverted="true" />
```

### Visibility

Same nullable pattern as ProgressBar:

```razor
<FluentSpinner Visible="@Visible" />
```

### Best Practices

- Use one spinner at a time
- Set `tabIndex="0"` if the spinner is the only element on the page (for screen readers)
- Add descriptive text below using `FluentField` (e.g., "Saving", "Processing")
- Do **not** use for immediate tasks

### API Parameters

| Parameter | Type | Description |
|---|---|---|
| `Size` | `SpinnerSize?` | Spinner size (default `Medium`) |
| `AppearanceInverted` | `bool` | Inverted appearance for dark backgrounds |
| `Visible` | `bool?` | Visibility control |
| `Tooltip` | `string?` | Tooltip text |

## FluentSkeleton

`FluentSkeleton` provides temporary animation placeholders for content being loaded, rendering circles and rectangles that mimic the eventual layout.

### Built-in Patterns

```razor
<FluentSkeleton Pattern="SkeletonPattern.IconTitleContent" Width="300px" Height="150px" />
```

| Pattern | Description |
|---|---|
| `IconTitleContent` | Circular icon (48px) + title on one line, content below |
| `IconTitle` | Circular icon (48px) + title on one line |
| `Icon` | Circular icon (48px) only |

### Custom Layout via ChildContent

Use the `@context` variable to draw custom skeleton elements:

```razor
<FluentSkeleton Width="300px" Height="100px">
    <FluentStack Orientation="Orientation.Vertical">
        <FluentText Weight="TextWeight.Bold">Loading...</FluentText>
        @context.DrawCircle(radius: "32px")
        @context.DrawRectangle(width: "100%", height: "32px")
        @context.DrawCircle(radius: "32px")
    </FluentStack>
</FluentSkeleton>
```

### CSS Classes

Apply skeleton styling to any component using CSS classes:

```html
<div class="fluent-skeleton-4" style="width: 200px; height: 20px;"></div>
```

The `fluent-skeleton-{size}` and `fluent-skeleton-circular-{size}` classes use sizes from 1-8 (multiples of 4px).

### LoadingClass Helper

```razor
<FluentLabel Class="@FluentSkeleton.LoadingClass(when: () => IsLoading, size: 4)"
             Style="width: 200px; height: 20px;">
    @(IsLoading ? "" : "Content loaded")
</FluentLabel>
```

### API Parameters

| Parameter | Type | Description |
|---|---|---|
| `Pattern` | `SkeletonPattern?` | Built-in layout pattern |
| `Width` | `string?` | Skeleton width |
| `Height` | `string?` | Skeleton height |
| `Circular` | `bool` | Render as circle |
| `Shimmer` | `bool` | Enable shimmer animation effect |
| `ChildContent` | `RenderFragment<SkeletonContext>?` | Custom skeleton layout |

## Migration Notes (v4 to v5)

- `FluentProgress` renamed to `FluentProgressBar`; `Stroke` renamed to `Thickness`
- `FluentProgressRing` renamed to `FluentSpinner`; `Stroke` renamed to `Size`; `Paused`, `Min`, `Max`, `Value` removed
- `ChildContent` removed from both ProgressBar and Spinner -- use `FluentField` for labels
