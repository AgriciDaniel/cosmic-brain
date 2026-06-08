---
title: Overlay
route: /Overlay
icon: CursorHover
---

# Overlay

The Overlays are used to temporarily overlay screen content to focus a dialog, progress or other information/interaction.

When the `FullScreen` parameter is set to `false`, the overlay will only cover the content area of its parent container.

## Default

Full screen overlay with a default background color (`var(--colorBackgroundOverlay)`) and opacity of 40%.

{{ OverlayDefault }}

## Service

In addition to the `FluentOverlay` component, you can use the `IDialogService` to display a global overlay from anywhere in your application,
without having to declare a `FluentOverlay` in your markup.

Only **one global overlay** can be displayed at a time. The overlay shows a centered spinner, with an optional text message displayed below it.
You can also choose a `CardAppearance` style to customize how the overlay content is rendered. 
And a `SpinnerSize` to set the size of the spinner.

Use `DialogService.ShowOverlayAsync(...)` to display the overlay and `DialogService.HideOverlayAsync()` to close it.

{{ OverlayService }}

The global overlay is enabled by default. If you don't need this feature,
you can disable it when registering the Fluent UI services to avoid rendering
the underlying `FluentOverlay` element in the `FluentDialogProvider`:

```csharp
Services.AddFluentUIComponents(options => options.UseGlobalOverlay = false);
```

## Detailed Usage

The overlay can be customized to suit various use cases, including:

- **Full-Screen Overlay**: By setting the `FullScreen` property to `true`, the overlay will cover the entire screen.
- **Interactive Overlay**: The `Interactive` property allows user interactions with the overlay content.
- **Custom Close Modes**: The `CloseMode` property can be set to control how the overlay can be closed (e.g., by clicking outside of it or only by code).

{{ OverlayDetailed }}

## API FluentOverlay

{{ API Type=FluentOverlay }}
