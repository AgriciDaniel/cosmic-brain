---
title: "DxStackLayout Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxStackLayout"
author:
published:
created: 2026-05-25
description: "Developer documentation for all DevExpress products."
tags:
  - "clippings"
---
DevExpress v25.2 Update — Your Feedback Matters

Our [What's New in v25.2](https://www.devexpress.com/subscriptions/whats-new/) webpage includes product-specific surveys. Your response to our survey questions will help us measure product satisfaction for features released in this major update and help us refine our plans for our next major release.

[Take the survey](https://www.devexpress.com/subscriptions/whats-new/#blazor-survey) [Not interested](#)

## DxStackLayout Class

In This Article

A container that stacks its items horizontally or vertically.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxStackLayout :
    DxComponent,
    IModelWrapper<IStackLayoutModel>,
    IRequireSelfCascading
```

## Remarks

`<DxStackLayout>` allows you to stack UI elements vertically or horizontally.

![Stack Layout](https://docs.devexpress.com/Blazor/images/stack-layout/blazor-stack-layout-horizontal.png)

[Run Demo](https://demos.devexpress.com/blazor/StackLayout)

If your page requires a grid layout, use the [DxGridLayout](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridLayout) component.

### Add a Stack Layout to a Project

Follow the steps below to add the Stack Layout component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the `<DxStackLayout>` … `</DxStackLayout>` markup to a `.razor` file.
3. Add.

### API Reference

Refer to the following list for the component API reference: [DxStackLayout Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxStackLayout._members).

### Static Render Mode Specifics

Blazor Stack Layout is a static component and can be used in static render mode.

### Items

Follow the steps below to create layout items:

1. Add `<Items>...</Items>` into the component’s markup to define [Items](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxStackLayout.Items) collection.
2. Add [DxStackLayoutItem](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxStackLayoutItem) objects to the collection. Use the [Length](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxStackLayoutItem.Length) property to specify the item length (auto, pixel, percentage, [fr](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Basic_concepts#the_fr_unit), etc.). You can also apply a [CSS class](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxStackLayoutItem.CssClass) to the whole item.
	Stack layout items whose length is specified with the `fr` unit are arranged last because they occupy the remaining space (space is divided between these items in proportion to the prefix number).
3. Use the [Template](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxStackLayoutItem.Template) property to specify item content.

- [Razor](#tabpanel_-IV2i2+hym_tabid-razor)
- [CSS](#tabpanel_-IV2i2+hym_tabid-css)

```
<DxStackLayout CssClass="stack-layout">
    <Items>
        <DxStackLayoutItem>
            <Template>
                <div class="stacklayout-header stacklayout-item">
                    Item 1
                </div>
            </Template>
        </DxStackLayoutItem>
        <DxStackLayoutItem Length="2fr">
            <Template>
                <div class="stacklayout-content stacklayout-item">
                    Item 2
                </div>
            </Template>
        </DxStackLayoutItem>
        <DxStackLayoutItem>
            <Template>
                <div class="stacklayout-left-side-bar stacklayout-item">
                    Item 3
                </div>
            </Template>
        </DxStackLayoutItem>
        <DxStackLayoutItem>
            <Template>
                <div class="stacklayout-right-side-bar stacklayout-item">
                    Item 4
                </div> 
            </Template>
        </DxStackLayoutItem>
        <DxStackLayoutItem>
            <Template>
                <div class="stacklayout-footer stacklayout-item">
                    Item 5
                </div>
            </Template>
        </DxStackLayoutItem>
    </Items>
</DxStackLayout>
```

### Orientation

The component’s default orientation is `Horizontal` (layout items are arranged in a row).

![Stack Layout](https://docs.devexpress.com/Blazor/images/stack-layout/blazor-stack-layout-horizontal.png)

To arrange items in a column, set the [Orientation](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxStackLayout.Orientation) property to `Vertical`.

```
<DxStackLayout Orientation="Orientation.Vertical">
    <Items>
        @* ... *@
    </Items>
</DxStackLayout>
```

![Stack Layout - Vertical Orientation](https://docs.devexpress.com/Blazor/images/stack-layout/blazor-stack-layout-vertical.png)

### Adaptivity

You can use the [DxLayoutBreakpoint](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLayoutBreakpoint) component to adapt a stack layout to different screen sizes.

The following code snippet does the following:

- Creates an `IsSmallScreen` data field.
- Adds a `DxStackLayout` component and uses the `IsSmallScreen` field to manage the items’ orientation depending on a device screen size.
- Adds a [DxLayoutBreakpoint](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLayoutBreakpoint) component, binds it to the `IsSmallScreen` field, and specifies the device size when the breakpoint should be activated.

- [Razor](#tabpanel_Nk+BsbwZec_tabid-razor)
- [CSS](#tabpanel_Nk+BsbwZec_tabid-css)

```
<DxLayoutBreakpoint DeviceSize="DeviceSize.Medium | DeviceSize.Small | DeviceSize.XSmall"
                    @bind-IsActive="IsSmallScreen"/>

<DxStackLayout CssClass="stack-layout"
               Orientation="IsSmallScreen ? Orientation.Vertical : Orientation.Horizontal">
    <Items>
        <DxStackLayoutItem>
            <Template>
                <div class="stacklayout-header stacklayout-item">
                    Item 1
                </div>
            </Template>
        </DxStackLayoutItem>
        <DxStackLayoutItem Length="2fr">
            <Template>
                <div class="stacklayout-content stacklayout-item">
                    Item 2
                </div>
            </Template>
        </DxStackLayoutItem>
        @* ... *@
    </Items>
</DxStackLayout>

@code {​​​​​​​
    bool IsSmallScreen {get; set;}
}​​​​​​​
```

![Adaptive Stack Layout](https://docs.devexpress.com/Blazor/images/stack-layout/blazor-stack-layout-adaptivity.gif)

### Troubleshooting

If a Blazor application throws unexpected exceptions, refer to the following help topic: [Troubleshooting](https://docs.devexpress.com/Blazor/401608/troubleshooting).

## Inheritance

[Object](https://learn.microsoft.com/dotnet/api/system.object)

[ComponentBase](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.components.componentbase)

[DxComponentBase](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxComponentBase)

[DxComponent](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxComponent)

DxStackLayout

See Also

[DxStackLayout Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxStackLayout._members)