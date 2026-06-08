---
title: "DxLayoutBreakpoint Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLayoutBreakpoint#responsive-grid"
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

## DxLayoutBreakpoint Class

In This Article

A component that allows you to adapt page layout to different window sizes.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxLayoutBreakpoint :
    DxComponent,
    IModelWrapper<ILayoutBreakpointModel>
```

## Remarks

`<DxLayoutBreakpoint>` allows you to adapt a page layout to different [window sizes](https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth). For example, you can use breakpoints to create responsive [DxGridLayout](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridLayout), [DxStackLayout](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxStackLayout), or any other components.

[Run Demo: Layout Breakpoint](https://demos.devexpress.com/blazor/LayoutBreakpoint)

### Add a Layout Breakpoint to a Project

Follow the steps below to add the Layout Breakpoint component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the `<DxLayoutBreakpoint />` markup to a page.
3. Use the [DeviceSize](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLayoutBreakpoint.DeviceSize) or [MinWidth](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLayoutBreakpoint.MinWidth) / [MaxWidth](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLayoutBreakpoint.MaxWidth) property to specify the screen size when the breakpoint should be activated.
4. Use the [@bind](https://learn.microsoft.com/en-us/aspnet/core/mvc/views/razor#bind) attribute to bind the breakpoint’s [IsActive](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLayoutBreakpoint.IsActive) property to a data field.
5. Use this data field in components that should be adapted.

### API Reference

Refer to the following list for the component API reference: [DxLayoutBreakpoint Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLayoutBreakpoint._members).

### Static Render Mode Specifics

Blazor Layout Breakpoint does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Examples

Refer to the sections below for examples on how to use the Layout Breakpoint component in different scenarios.

#### Responsive Drawer

The following code snippet changes the [Drawer](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDrawer) ‘s [Mode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxDrawer.Mode) based on the screen size:

```
<DxLayoutBreakpoint DeviceSize="DeviceSize.XSmall" IsActive="isXSmallScreen" IsActiveChanged="IsActiveChanged" />
<DxButton Click="OnClick" IconCssClass="tb-icon icon-hamburger" />

<DxDrawer IsOpen="IsOpen" PanelWidth="180px">
    ...
</DxDrawer>
@code {
    bool isXSmallScreen;
    bool? isOpen;
    bool IsOpen {
        // Hide the Drawer on small screens initially and display it on large screens
        get => isOpen ?? !isXSmallScreen;
        set => isOpen = value;
    }
    // Apply Overlap and Shrink modes on small and large screens, respectively
    DrawerMode Mode => isXSmallScreen ? DrawerMode.Overlap : DrawerMode.Shrink;

    void IsActiveChanged(bool isActive) {
        isXSmallScreen = isActive;
        isOpen = null;
    }
    void OnClick() {
        IsOpen = !IsOpen;
    }
}
```

#### Responsive Grid

The following code snippet activates the breakpoint when the screen is [extra small](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DeviceSize). The [Grid](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGrid) component hides its **Contact Title** and **City** columns and displays their information in the [detail row](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGrid.DetailRowTemplate). All columns are available in the column chooser. You can use the same approach to manage [TreeList](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxTreeList) columns with the Layout Breakpoint component.

```
<DxLayoutBreakpoint DeviceSize="DeviceSize.XSmall" @bind-IsActive="@isXSmallScreen" />

@if (isXSmallScreen) {
    <div class="align-self-start p-2">
        <DxButton Text="Column Chooser"
                  RenderStyle="ButtonRenderStyle.Secondary"
                  Click="ShowColumnChooser" />
    </div>
}

<DxGrid @ref="@Grid" 
        Data="@Data" 
        DetailRowDisplayMode="@GetGridDetailRowDisplayMode()"
        PageSize="5">
    <Columns>
        <DxGridDataColumn FieldName="ContactName" MinWidth="80" />
        <DxGridDataColumn FieldName="ContactTitle" MinWidth="100" Visible="@GetExtraColumnsVisible()" />
        <DxGridDataColumn FieldName="CompanyName" MinWidth="100" />
        <DxGridDataColumn FieldName="City" Width="15%" MinWidth="80" Visible="@GetExtraColumnsVisible()" />
        <DxGridDataColumn FieldName="Country" Width="10%" MinWidth="80" />
    </Columns>
    <DetailRowTemplate>
        @{
            var supplier = (Supplier)context.DataItem;
        }
        <b>Contact Title:</b> @supplier.ContactTitle <br />
        <b>City:</b> @supplier.City
    </DetailRowTemplate>
</DxGrid>

@code {
    bool isXSmallScreen;
    IGrid Grid { get; set; }
    IEnumerable<Supplier> Data { get; set; }
    bool GetExtraColumnsVisible() { return !isXSmallScreen; }
    GridDetailRowDisplayMode GetGridDetailRowDisplayMode() { return isXSmallScreen ? GridDetailRowDisplayMode.Always : GridDetailRowDisplayMode.Never; }

    void ShowColumnChooser() {
        Grid.ShowColumnChooser(new DialogDisplayOptions($".myGrid", HorizontalAlignment.Center, VerticalAlignment.Center));
    }
}
```

![Display information in the detail row](https://docs.devexpress.com/Blazor/images/grid/blazor-grid-adaptivity-detail-row.gif)

#### Adaptive Grid Layout

The following example uses a layout breakpoint to create an adaptive [DxGridLayout](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGridLayout):

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

## Inheritance

[Object](https://learn.microsoft.com/dotnet/api/system.object)

[ComponentBase](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.components.componentbase)

[DxComponentBase](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxComponentBase)

[DxComponent](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxComponent)

DxLayoutBreakpoint

See Also

[DxLayoutBreakpoint Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLayoutBreakpoint._members)