---
title: Grid
route: /Grid
icon: SlideGrid
---

# Grid

The grid component helps keeping layout consistent across various screen resolutions and sizes.
`FluentGrid` comes with a **12-point grid system** and contains 5 types of breakpoints that are used for specific screen sizes.

## Example

You can resize your browser to see how elements respond to different screen sizes.

{{ GridDefault }}

## No breakpoints

You can resize the panel using the slider in the bottom right-hand corner.

If no **Breakpoints** or if `Xs="0"` is defined for a `FluentGridItem` component,
this style will be applied: `flex: 1; max-width: fit-content;`

In this example, the first item (the message) cannot be lower than 200px `min-width: 200px;`.
To avoid that, the second item (the buttons) will be moved to the next line.

{{ GridMessage }}

## Breakpoints

Breakpoints help you control your layout based on windows size:

| Device            | Code | Type                   | Range     |
|-------------------|------|------------------------|-----------|
| Extra Small       | xs   | Small to large phone   | < 600px   |
| Small             | sm   | Small to medium tablet | < 960px   |
| Medium            | md   | Large tablet to laptop | < 1280px  |
| Large             | lg   | Desktop                | < 1920px  |
| Extra Large       | xl   | HD and 4k              | < 2560px  |
| Extra Extra Large | xxl  | 4k+ and ultra-wide     | >= 2560px |

## Hiding elements

For faster, mobile-friendly development, use responsive display classes to show and hide elements according to device.
Avoid creating entirely different versions of the same site, but instead hide elements reactively for each screen size.

To hide elements, simply use the `HiddenWhen` attribute by selecting one of the following values or combining
them with the unioon operator: `|` (see [Enumeration flags](https://learn.microsoft.com/en-us/dotnet/api/system.flagsattribute))

To display an element only on a given range of screen sizes, you can combine a these values.
e.g. `GridItemHidden.Md | GridItemHidden.Lg` will display the element for all screen sizes,
except on medium and large devices.

> [!TIP] You can also use the HTML `hidden-when` attribute to hide **any elements** when the screen size matches the specified breakpoints.  
> Example: `<div hidden-when="sm md">...</div>` will hide the element on small and medium devices.
> Only the values `xs sm, md, lg, xl, xxl` are supported, but you can combine them.

<div class="grid-item-hidden" style="overflow-x: auto; margin-bottom: 24px;">

|GridItemHidden|X Small<br/><sup>< 600px</sup>|Small<br/><sup>600px - 959px</sup>|Medium<br/><sup>960px - 1279px</sup>|Large<br/><sup>1280px - 1919px</sup>|X Large<br/><sup>1920px - 2559px</sup>|XX Large<br/><sup>≥ 2560px</sup>|
|--------------|-----------------|-----------------|-----------------|-----------------|-----------------|-----------------|
| None         | <div />         | <div />         | <div />         | <div />         | <div />         | <div />         |
| `Xs`         | <div checked /> | <div />         | <div />         | <div />         | <div />         | <div />         |
| `Sm`         | <div />         | <div checked /> | <div />         | <div />         | <div />         | <div />         |
| `Md`         | <div />         | <div />         | <div checked /> | <div />         | <div />         | <div />         |
| `Lg`         | <div />         | <div />         | <div />         | <div checked /> | <div />         | <div />         |
| `Xl`         | <div />         | <div />         | <div />         | <div />         | <div checked /> | <div />         |
| `Xxl`        | <div />         | <div />         | <div />         | <div />         | <div />         | <div checked /> |
| `XsAndDown`  | <div checked /> | <div />         | <div />         | <div />         | <div />         | <div />         |
| `SmAndDown`  | <div checked /> | <div checked /> | <div />         | <div />         | <div />         | <div />         |
| `MdAndDown`  | <div checked /> | <div checked /> | <div checked /> | <div />         | <div />         | <div />         |
| `LgAndDown`  | <div checked /> | <div checked /> | <div checked /> | <div checked /> | <div />         | <div />         |
| `XlAndDown`  | <div checked /> | <div checked /> | <div checked /> | <div checked /> | <div checked /> | <div />         |
| `XxlAndDown` | <div checked /> | <div checked /> | <div checked /> | <div checked /> | <div checked /> | <div checked /> |
| `XsAndUp`    | <div checked /> | <div checked /> | <div checked /> | <div checked /> | <div checked /> | <div checked /> |
| `SmAndUp`    | <div />         | <div checked /> | <div checked /> | <div checked /> | <div checked /> | <div checked /> |
| `MdAndUp`    | <div />         | <div />         | <div checked /> | <div checked /> | <div checked /> | <div checked /> |
| `LgAndUp`    | <div />         | <div />         | <div />         | <div checked /> | <div checked /> | <div checked /> |
| `XlAndUp`    | <div />         | <div />         | <div />         | <div />         | <div checked /> | <div checked /> |
| `XxlAndUp`   |                 | <div />         | <div />         | <div />         | <div />         | <div checked /> |

</div>

## AdaptiveRendering

`AdaptiveRendering` allows for **not generating** HTML code in a `FluentGridItem` based on the value of the `HiddenWhen` parameter.
In other words, when `AdaptiveRendering=false` (default), the content of the `FluentGridItem` is simply hidden by CSS styles `display: none;`,
whereas if `AdaptiveRendering=true`, the content of the `FluentGridItem` is not rendered by Blazor.

This allows for fine-grained control over when HTML is generated or not, for example in a case where rendering
the grid item takes a lot of time or leads to a lot of data being transferred.

## body data-media

The `<body data-media>` attribute is used to specify the current media query state of the browser.
This attribute is automatically updated to reflect the current screen size, each time the browser is resized.

For example, open the browser DevTools and resize the browser window.
You will see the `data-media` attribute change as you resize the window.

**Client side**

A JavaScript `mediaChanged` event is triggered each time the `data-media` attribute changes.

```html
<script>
    document.body.addEventListener('mediaChanged', function (e) {
        console.log('Media changed:', e.detail.media);
    });
</script>
```

**Blazor side**

You can use the `FluentGrid.OnBreakpointEnter` event to handle media changes in Blazor.

```razor
<FluentGrid OnBreakpointEnter="@OnBreakpointEnterHandler" />

@code {
    void OnBreakpointEnterHandler(GridItemSize size)
    {
        Console.WriteLine($"Page Size: {size}");
    }
}
```

## API FluentGrid

{{ API Type=FluentGrid }}

## API FluentGridItem

{{ API Type=FluentGridItem }}


<style>
  .grid-item-hidden th:not(:first-child) {
    text-align: center !important;
  }

  .grid-item-hidden td:not(:first-child) {
    text-align: center !important;
  }

  .grid-item-hidden div:not([checked]) {
    position: relative;
    width: 20px;
    height: 20px;
  }

  .grid-item-hidden div:not([checked])::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" style="width: 20px; fill: silver;" focusable="false" viewBox="0 0 20 20" aria-hidden="true"><path d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-1 0c0-1.75-.64-3.36-1.7-4.58l-9.88 9.87A7 7 0 0 0 17 10ZM4.7 14.58l9.88-9.87a7 7 0 0 0-9.87 9.87Z"></path></svg>') no-repeat center center;
    background-size: contain;
  }

  .grid-item-hidden div[checked] {
    position: relative;
    width: 20px;
    height: 20px;
  }

  .grid-item-hidden div[checked]::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" style="width: 20px; fill: green;" focusable="false" viewBox="0 0 20 20" aria-hidden="true"><path d="M6 3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6Zm7.85 4.85-5 5a.5.5 0 0 1-.7 0l-2-2a.5.5 0 0 1 .7-.7l1.65 1.64 4.65-4.64a.5.5 0 0 1 .7.7Z"></path></svg>') no-repeat center center;
    background-size: contain;
  }
</style>

## Migrating to v5

{{ INCLUDE File=MigrationFluentGridItem }}
