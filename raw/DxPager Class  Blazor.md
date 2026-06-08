---
title: "DxPager Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPager"
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

## DxPager Class

In This Article

A data navigation component that indicates the current position within the bound data source and allows quick access to a different data page.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxPager :
    DxComponentBase,
    IHandleEvent
```

## Remarks

The DevExpress Pager for Blazor (`<DxPager>`) component enables page navigation. It is integrated into our [Grid](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxGrid) and [Pivot Grid](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPivotGrid-1) components.

![Pager Overview](https://docs.devexpress.com/Blazor/images/blazor-pager-overview.png)

[Run Demo: Pager](https://demos.devexpress.com/blazor/Pager)

### Add a Pager to a Project

Follow the steps below to add the Pager component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the `<DxPager>` … `</DxPager>` markup to a `.razor` file.
3. Configure the component: specify the total number of pages, an acitve page, and so on (see the sections below).

### API Reference

Refer to the following list for the component API reference: [DxPager Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPager._members).

### Static Render Mode Specifics

Blazor Pager does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Page Count

Use the [PageCount](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPager.PageCount) property to specify the total number of pager’s pages.

```
<DxPager PageCount="@PageCount"> 
</DxPager>

@code { 
    int PageCount { get; set; } = 5; 
}
```

### Active Page

To activate a `<DxPager>` page, a user should click it or use the navigation buttons. To switch pages in code, assign a zero-based page index to the [ActivePageIndex](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPager.ActivePageIndex) property. To handle the active page’s change, use the [ActivePageIndexChanged](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPager.ActivePageIndexChanged) event.

![Navigation Pager](https://docs.devexpress.com/Blazor/images/blazor-pager-navigation.png)

```
<DxPager PageCount="@PageCount"
         @bind-ActivePageIndex="@ActivePageIndex" > 
</DxPager>

@code { 
    int PageCount { get; set; } = 10; 
    int ActivePageIndex { get; set; } = 7;
}
```

[Run Demo: Card View](https://demos.devexpress.com/blazor/LayoutBreakpoint#CardView)

### Numeric Button Count

Use the [VisibleNumericButtonCount](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPager.VisibleNumericButtonCount) property to specify the maximum number of numeric buttons that can be displayed within a pager. When the component is rendered for the first time, it displays a range of numeric buttons that includes the active page (if the [ActivePageIndex](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPager.ActivePageIndex) value is specified) or numeric buttons from `1` to the `VisibleNumericButtonCount` value. To navigate to other numeric buttons, a user should use navigation buttons.

```
<DxPager PageCount="100"
         ActivePageIndex="50"
         VisibleNumericButtonCount="7"
         NavigationMode="PagerNavigationMode.NumericButtons"> 
</DxPager>
```

![Pager Navigation Buttons](https://docs.devexpress.com/Blazor/images/blazor-pager-navigation-buttons.png)

[Run Demo: Pager - Limit the Number of Page Buttons](https://demos.devexpress.com/blazor/Pager#LimitedPageNumber)

If all the numeric buttons are displayed (i.e., [PageCount](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPager.PageCount) is less or equal to the [VisibleNumericButtonCount](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPager.VisibleNumericButtonCount)), the Pager’s navigation buttons are [hidden](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPager.AutoHideNavButtons).

```
<DxPager PageCount="10"
         ActivePageIndex="2"
         VisibleNumericButtonCount="10">
</DxPager>
```

[Run Demo: Pager - All Page Numbers Visible](https://demos.devexpress.com/blazor/Pager#AllPages)

When the Pager is in [Auto](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPager.NavigationMode) mode and the total number of its pages ([PageCount](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPager.PageCount)) equals or exceeds the [SwitchToInputBoxButtonCount](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPager.SwitchToInputBoxButtonCount) property’s value, the Pager switches from numeric buttons to the Go to Page input box.

```
<DxPager PageCount="@PageCount"
         @bind-ActivePageIndex="@ActivePageIndex"
         SwitchToInputBoxButtonCount="@SwitchToInputBox"> 
</DxPager>

@code { 
    int PageCount { get; set; } = 5; 
    int ActivePageIndex { get; set; } = 1;
    int SwitchToInputBox { get; set; } = 15;
    // int SwitchToInputBox { get; set; } = 4;
}
```

![Pager Switch to Input Box](https://docs.devexpress.com/Blazor/images/blazor-pager-switch-to-input-box.png)

### Size Modes

Use the [SizeMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPager.SizeMode) property to specify a Pager size. The following code snippet applies different size modes to Pager components.

```
<DxPager PageCount="1000" 
         ActivePageIndex="5" 
         NavigationMode="PagerNavigationMode.InputBox" 
         SizeMode="SizeMode.Small" />

<DxPager PageCount="1000" 
         ActivePageIndex="5" 
         NavigationMode="PagerNavigationMode.InputBox" 
         SizeMode="SizeMode.Medium" />

<DxPager PageCount="1000" 
         ActivePageIndex="5" 
         NavigationMode="PagerNavigationMode.InputBox" 
         SizeMode="SizeMode.Large" />
```

![Pager - Size Modes](https://docs.devexpress.com/Blazor/images/blazor-pager-size-modes.png)

For additional information, refer to [Size Modes](https://docs.devexpress.com/Blazor/401784/styling-and-themes/size-modes).

### Troubleshooting

If a Blazor application throws unexpected exceptions, refer to the following help topic: [Troubleshooting](https://docs.devexpress.com/Blazor/401608/troubleshooting).

## Inheritance

See Also

[DxPager Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxPager._members)