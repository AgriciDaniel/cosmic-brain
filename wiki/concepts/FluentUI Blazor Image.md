---
title: FluentUI Blazor Image
address: c-000121
status: developing
---

# FluentUI Blazor Image

> Part of the [[FluentUI Blazor]] component library. `FluentImage` displays images with support for lazy loading, fallback, border, shadow, shape, and fit behavior.

## Overview

`FluentImage` wraps standard `<img>` tags with added Fluent Design styling and layout options. It supports single images, custom content (multiple images), and CSS class customization.

## Default Usage

```razor
<FluentImage Source="/big-heart.jpg" AlternateText="Placeholder Image" />
```

## Width and Height

Set explicit dimensions:

```razor
<FluentImage Source="/big-heart.jpg" Width="300px" Height="100px" />
```

## Block Mode

The `Block` parameter makes the image expand to fill the container width while maintaining aspect ratio:

```razor
<div style="width: 300px; height: 300px;">
    <FluentImage Source="/big-heart.jpg" AlternateText="Placeholder Image" Block="true" />
</div>
```

## Border and Shadow

```razor
<FluentImage Bordered="true" Source="..." Width="100px" Height="100px" />
<FluentImage Source="/big-heart.jpg" AlternateText="Placeholder Image" Shadow="true" />
```

## Fit

Controls how the image scales within its parent container using `ImageFit`:

```razor
<FluentImage Fit="ImageFit.Contain" Source="/big-heart.jpg" AlternateText="Placeholder Image" />
```

| ImageFit | Behavior |
|---|---|
| `None` | No scaling |
| `Contain` | Scale to fit, preserving aspect ratio |
| `Cover` | Cover entire area, may crop |
| `Fill` | Stretch to fill |

## Shape

```razor
<FluentImage Shape="ImageShape.Circular" Source="/big-heart.jpg" AlternateText="Placeholder Image" />
```

Available shapes: `Square` (default), `Circular`, `Rounded`.

## Custom Content

Instead of a single `Source`, you can provide child content with multiple images or custom elements. Style, Class, Width, Height, and AlternateText parameters do not apply to child content:

```razor
<FluentImage Shape="ImageShape.Circular">
    <img style="border: 3px dashed dodgerblue" src="/big-heart.jpg" alt="Placeholder Image" />
    <img src="/big-heart.jpg" alt="Placeholder Image 2" />
</FluentImage>
```

## Styling

Target the internal image element using the `fluent-image-item` CSS class:

```css
.fluent-image-item {
    border-radius: 8px;
    object-fit: cover;
}
```

## API Parameters

| Parameter | Type | Description |
|---|---|---|
| `Source` | `string?` | Image URL |
| `AlternateText` | `string?` | Alt text for the image |
| `Width` | `string?` | Image width |
| `Height` | `string?` | Image height |
| `Block` | `bool` | Expand to fill container width |
| `Bordered` | `bool` | Add a border |
| `Shadow` | `bool` | Add a shadow |
| `Fit` | `ImageFit?` | Scaling behavior (`None`, `Contain`, `Cover`, `Fill`) |
| `Shape` | `ImageShape?` | Visual shape (`Square`, `Circular`, `Rounded`) |
