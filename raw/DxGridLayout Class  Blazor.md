---
title: "DxGridLayout Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridLayout"
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

## DxGridLayout Class

In This Article

A container that arranges its items into rows and columns.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxGridLayout :
    DxComponent,
    IModelWrapper<IGridLayoutModel>,
    IRequireSelfCascading
```

## Remarks

`<DxGridLayout>` allows you to arrange UI elements on a page. The component is based on a [CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Basic_concepts): are organized into.

![Grid Layout](https://docs.devexpress.com/Blazor/images/gridlayout/blazor-gridlayout-overview.png)

[Run Demo](https://demos.devexpress.com/blazor/GridLayout)

If you need to organize layout items in a one-dimensional stack, use the [DxStackLayout](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxStackLayout) component.

### Add a Grid Layout to a Project

Follow the steps below to add the Grid Layout component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the `<DxGridLayout>` … `</DxGridLayout>` markup to a `.razor` file.
3. .
4. Arrange layout items in one of the following ways:

### API Reference

Refer to the following list for the component API reference: [DxGridLayout Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridLayout._members).

### Static Render Mode Specifics

Blazor Grid Layout is a static component and can be used in static render mode.

### Create Rows and Columns

`<DxGridLayout>` defines rows and columns and then positions within cells. A single item can span multiple rows or columns.

Follow the steps below to create rows and columns:

1. Add `<Rows>...</Rows>` and `<Columns>...</Columns>` to the component’s markup to define the [Rows](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridLayout.Rows) and [Columns](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridLayout.Columns) collections.
2. Add [DxGridLayoutRow](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridLayoutRow) objects to the `Rows` collection. Use the [Height](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridLayoutRow.Height) property to specify the row height (auto, pixel, percentage, [fr](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Basic_concepts#The_fr_Unit), etc.).
3. Add [DxGridLayoutColumn](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridLayoutColumn) objects to the `Columns` collection. Use the [Width](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridLayoutColumn.Width) property to specify the column width (auto, pixel, percentage, [fr](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Basic_concepts#The_fr_Unit), etc.).
	Elements whose size is specified with the `fr` unit are arranged last, since they occupy the remaining space (this space is divided between these elements in proportion to the prefix number).
4. Use [RowSpacing](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridLayout.RowSpacing) and [ColumnSpacing](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridLayout.ColumnSpacing) properties to specify the distance between rows and columns.

- [Razor](#tabpanel_cAy6FWTdcm_tabid-1)
- [CSS](#tabpanel_cAy6FWTdcm_tabid-2)

```
<DxGridLayout CssClass="h-500" ColumnSpacing="8px" RowSpacing="8px">
    <Rows>
        <DxGridLayoutRow Height="100px" /> @* the row's height equals 100 pixels *@
        <DxGridLayoutRow /> @* the row occupies the remaining space after two other rows are arranged *@
        <DxGridLayoutRow Height="auto"/> @* the row's height fits a content object. *@
    </Rows>
    <Columns>
        <DxGridLayoutColumn Width="2fr"/> @* the column occupies 2 parts of the remaining space 
                                             after the column with a percentage value is arranged*@
        <DxGridLayoutColumn Width="60%" /> @* the column occupies 60% of the grid layout's width*@
        <DxGridLayoutColumn /> @* the Width property's default value is 1fr, 
                                  the column occupies 1 part of the remaining space 
                                  after the row with percentage value is arranged *@
    </Columns>
</DxGridLayout>
```

### Create and Arrange Items

Define the [Items](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridLayout.Items) collection to create layout items. Then arrange the items in one of the following ways:

The sections below demonstrate how to create the same grid layout in these two ways.

#### Use Row and Column Indexes

You can use row and column indexes to specify how to position layout items. This approach is similar to [line-based placement in CSS grid](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Line-based_placement). We recommend that you use this approach to create static layouts.

Follow the steps:

1. Add `<Items>...</Items>` to the component’s markup to define the [Items](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridLayout.Items) collection.
2. Add [DxGridLayoutItem](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridLayoutItem) objects to the collection. Use the [Template](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridLayoutItem.Template) property to specify item content.
3. Use [Row](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridLayoutItem.Row) and [Column](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridLayoutItem.Column) item properties to specify the row and column where the item should be located.
4. Use [RowSpan](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridLayoutItem.RowSpan) and [ColumnSpan](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridLayoutItem.ColumnSpan) properties to specify how many rows and columns the item occupies.

- [Razor](#tabpanel_GNOoxMzJvW_tabid-razor)
- [CSS](#tabpanel_GNOoxMzJvW_tabid-css)

```
<DxGridLayout CssClass="h-500">
    <Rows>
        <DxGridLayoutRow Height="100px" />
        <DxGridLayoutRow />
        <DxGridLayoutRow Height="auto" />
    </Rows>
    <Columns>
        <DxGridLayoutColumn Width="2fr" />
        <DxGridLayoutColumn Width="60%" />
        <DxGridLayoutColumn />
    </Columns>
    <Items>
        <DxGridLayoutItem Row="0" Column="0" ColumnSpan="3">
            <Template>
                <div class="gridlayout-header gridlayout-item">
                    Header
                </div>
            </Template>
        </DxGridLayoutItem>
        <DxGridLayoutItem Row="1" Column="1">
            <Template>
                <div class="gridlayout-content gridlayout-item">
                    Content
                </div>
            </Template>
        </DxGridLayoutItem>
        <DxGridLayoutItem Row="1" Column="0">
            <Template>
                <div class="gridlayout-left-side-bar gridlayout-item">
                    Left Bar
                </div>
            </Template>
        </DxGridLayoutItem>
        <DxGridLayoutItem Row="1" Column="2">
            <Template>
                <div class="gridlayout-right-side-bar gridlayout-item">
                    Right Bar
                </div>
            </Template>
        </DxGridLayoutItem>
        <DxGridLayoutItem Row="2" Column="0" ColumnSpan="3">
            <Template>
                <div class="gridlayout-footer gridlayout-item">
                    Footer
                </div>
            </Template>
        </DxGridLayoutItem>
    </Items>
</DxGridLayout>
```

![Grid Layout](https://docs.devexpress.com/Blazor/images/gridlayout/blazor-gridlayout-overview.png)

[Run Demo: Grid Layout - Overview](https://demos.devexpress.com/blazor/GridLayout)

#### Use Named Areas

You can assign area names to layout items and then specify how these areas are placed in the grid rows. This approach is similar to [grid template areas in CSS grid](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Grid_template_areas). We recommend that you use this approach to create responsive layouts (refer to ).

Follow the steps:

1. Add `<Items>...</Items>` to the component’s markup to define the [Items](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridLayout.Items) collection.
2. Add [DxGridLayoutItem](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridLayoutItem) objects to the collection. Use the [Template](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridLayoutItem.Template) property to specify item content.
3. Use the [Area](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridLayoutItem.Area) property to assign an area name to each layout item.
4. Use the [DxGridLayoutRow.Areas](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridLayoutRow.Areas) property to place the areas in the rows. If you need to leave a grid cell empty, use a period character (`.`).

- [Razor](#tabpanel_DwVlu-GHge_tabid-razor)
- [CSS](#tabpanel_DwVlu-GHge_tabid-css)

```
<DxGridLayout CssClass="w-100 ch-480">
    <Rows>
        <DxGridLayoutRow Areas="header header header" Height="100px" />
        <DxGridLayoutRow Areas="left-bar content right-bar" />
        <DxGridLayoutRow Areas="footer footer footer" Height="auto" />
    </Rows>
    <Columns>
        <DxGridLayoutColumn Width="2fr" />
        <DxGridLayoutColumn Width="60%" />
        <DxGridLayoutColumn />
    </Columns>
    <Items>
        <DxGridLayoutItem Area="header">
            <Template>
                <div class="gridlayout-header gridlayout-item">
                    Header
                </div>
            </Template>
        </DxGridLayoutItem>
        <DxGridLayoutItem Area="content">
            <Template>
                <div class="gridlayout-content gridlayout-item">
                    Content
                </div>
            </Template>
        </DxGridLayoutItem>
        <DxGridLayoutItem Area="left-bar">
            <Template>
                <div class="gridlayout-left-side-bar gridlayout-item">
                    Left Bar
                </div>
            </Template>
        </DxGridLayoutItem>
        <DxGridLayoutItem Area="right-bar">
            <Template>
                <div class="gridlayout-right-side-bar gridlayout-item">
                    Right Bar
                </div>
            </Template>
        </DxGridLayoutItem>
        <DxGridLayoutItem Area="footer">
            <Template>
                <div class="gridlayout-footer gridlayout-item">
                    Footer
                </div>
            </Template>
        </DxGridLayoutItem>
    </Items>
</DxGridLayout>
```

[Run Demo: Grid Layout - Areas](https://demos.devexpress.com/blazor/GridLayout#Areas)

### Adaptivity

You can use the [DxLayoutBreakpoint](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLayoutBreakpoint) component to adapt a grid layout to different screen sizes.

The following code snippet does the following:

- Creates an `IsXSmallScreen` data field.
- Adds a `DxGridLayout` component, uses named areas to arrange items, and adapts the layout for different screen sizes depending on the `IsXSmallScreen` field value.
- Adds a `DxLayoutBreakpoint` component. The [DeviceSize](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLayoutBreakpoint.DeviceSize) property specifies the device size when the breakpoint should be activated. The [IsActive](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLayoutBreakpoint.IsActive) property is bound to the `IsXSmallScreen` field. When the breakpoint is activated, the `IsActive` property and the bound `IsXSmallScreen` field equal `true`.

- [Razor](#tabpanel_1P77JDZvE0_tabid-razor)
- [CSS](#tabpanel_1P77JDZvE0_tabid-css)

```
<DxLayoutBreakpoint DeviceSize="DeviceSize.XSmall" @bind-IsActive="@isXSmallScreen" />

<DxGridLayout CssClass="h-100" ColumnSpacing="8px" RowSpacing="8px">
    <Rows>
        @if(isXSmallScreen) {
            <DxGridLayoutRow Areas="item1" />
            <DxGridLayoutRow Areas="item2" />
            <DxGridLayoutRow Areas="item3" />
            <DxGridLayoutRow Areas="item4" />
            <DxGridLayoutRow Areas="item5" />
            <DxGridLayoutRow Areas="item6" />
        } else {
            <DxGridLayoutRow Areas="item1 item3 item5" />
            <DxGridLayoutRow Areas="item1 item4 item5"/>
            <DxGridLayoutRow Areas="item2 item6 item6"/>
        }
    </Rows>
    <Columns>
        <DxGridLayoutColumn Width="2fr" />
        @if(!isXSmallScreen) {
            <DxGridLayoutColumn />
            <DxGridLayoutColumn />
        }
    </Columns>
    <Items>
        <DxGridLayoutItem Area="item1">
            <Template>
                <div class="gridlayout-header gridlayout-item">
                    Item 1
                </div>
            </Template>
        </DxGridLayoutItem>
        <DxGridLayoutItem Area="item2">
            <Template>
                <div class="gridlayout-content gridlayout-item">
                    Item 2
                </div>
            </Template>
        </DxGridLayoutItem>
        <DxGridLayoutItem Area="item3">
            <Template>
                <div class="gridlayout-left-side-bar gridlayout-item">
                    Item 3
                </div>
            </Template>
        </DxGridLayoutItem>
        <DxGridLayoutItem Area="item4">
            <Template>
                <div class="gridlayout-right-side-bar gridlayout-item">
                    Item 4
                </div>
            </Template>
        </DxGridLayoutItem>
        <DxGridLayoutItem Area="item5">
            <Template>
                <div class="gridlayout-footer gridlayout-item">
                    Item 5
                </div>
            </Template>
        </DxGridLayoutItem>
        <DxGridLayoutItem Area="item6">
            <Template>
                <div class="gridlayout-left-side-bar gridlayout-item">
                    Item 6
                </div>
            </Template>
        </DxGridLayoutItem>
    </Items>
</DxGridLayout>

@code {
    bool isXSmallScreen;
}
```

[Run Demo: Grid Layout - Adaptivity](https://demos.devexpress.com/blazor/GridLayout#Adaptivity)

[Run Demo: Card View](https://demos.devexpress.com/blazor/LayoutBreakpoint#CardView)

[View Example: How to create an adaptive dashboard layout](https://github.com/DevExpress-Examples/blazor-gridlayout-create-adaptive-dashboard-layout)

### Troubleshooting

If a Blazor application throws unexpected exceptions, refer to the following help topic: [Troubleshooting](https://docs.devexpress.com/Blazor/401608/troubleshooting).

## Inheritance

[Object](https://learn.microsoft.com/dotnet/api/system.object)

[ComponentBase](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.components.componentbase)

[DxComponentBase](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxComponentBase)

[DxComponent](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxComponent)

DxGridLayout

See Also

[DxGridLayout Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridLayout._members)