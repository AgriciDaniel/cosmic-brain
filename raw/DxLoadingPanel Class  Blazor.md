---
title: "DxLoadingPanel Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLoadingPanel"
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

## DxLoadingPanel Class

In This Article

A loading panel component that can display an overlay over components/containers.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxLoadingPanel :
    DxComponentBase
```

## Remarks

The Blazor Loading Panel displays a progress indicator. We designed this component as a panel that can contain child content. You can also use it as a standalone component.

![Blazor Utilities Landing Loading Panel](https://docs.devexpress.com/Blazor/images/blazor-dxloadingpanel.png)

[Run Demo](https://demos.devexpress.com/blazor/LoadingPanel)

### Add a Loading Panel to a Project

Follow the steps below to add a Loading Panel component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add component markup to a `.razor` file: `<DxLoadingPanel>` … `</DxLoadingPanel>`.
3. Specify the Loading Panel.
4. Write code that manages the component’s.
5. Configure other options (see sections below).

### API Reference

Refer to the following list for the component API reference: [DxLoadingPanel Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLoadingPanel._members).

### Static Render Mode Specifics

Blazor Loading Panel supports static render mode to indicate progress with streaming rendering. For other features, you need to enable interactivity on a Razor page and allow the Loading Panel component to execute scripts and display data.

- [Index.razor](#tabpanel_y-1woo7XXF_tabid-1)

```
@rendermode InteractiveServer
```

### Attach a Loading Panel to Target Content

You can use the [PositionTarget](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLoadingPanel.PositionTarget) property to attach the Loading Panel to a target element. Link the panel to content in this manner if you cannot place Loading Panel’s markup around target content (content needs to be at a specific position in DOM).

```
<DxFormLayout>
    <DxFormLayoutGroup Caption="Target Group" Id="show-panel">
        @* ... *@
    </DxFormLayoutGroup>
</DxFormLayout>

<DxLoadingPanel Visible="true"
                ApplyBackgroundShading="true"
                PositionTarget="#show-panel" />
```

You can also use the [PositionTarget](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLoadingPanel.PositionTarget) property to cover the entire page. Use the `<body>` tag as a target UI element:

```
<DxLoadingPanel Visible="true" 
                PositionTarget="body" 
                ApplyBackgroundShading="true" />
```

Add the Loading Panel without additional parameters to display the panel instead of the content area during page load operations. In this case, the panel occupies the entire parent container:

```
@if (SomeCondition == null) {
    <DxLoadingPanel Visible="true" />
}
else {
    ...
}
```

In other cases, specify target content as the Loading Panel’s [ChildContent](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/#child-content-render-fragments):

```
<DxLoadingPanel Visible="true"
                ApplyBackgroundShading="true"
                CssClass="w-100">
    <DxMemo @bind-Text="@Text"
            Rows="10" />
</DxLoadingPanel>
```

### Display a Loading Panel

Use the [Visible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLoadingPanel.Visible) property to show/hide the Loading Panel when an operation starts/finishes.

The following example imitates a time-consuming operation and uses the `Visible` property to show the panel at the beginning and hide it at the end of the operation:

```
<DxButton Click="Click">Start operation</DxButton>

<DxLoadingPanel @bind-Visible=@Visible
                ApplyBackgroundShading="true"
                CssClass="w-100">
    <DxMemo @bind-Text="@Text"
            Rows="10" />
</DxLoadingPanel>

@code {
    bool Visible { get; set; } = false;
    private async Task Click() {
        Visible = true;
        await Task.Delay(3000);
        Visible = false;
    }
    string Text = "Andrew received his BTS commercial in 1987 and a Ph.D. in international marketing at the University " +
                  "of Dallas in 1994. He speaks French and Italian fluently, and reads German. He joined the company as " +
                  "a sales representative. After that, he was promoted to sales manager in January 2005 and vice president " + 
                  "of sales in March 2006. Andrew is a member of the Sales Management Round table, Seattle Chamber of Commerce, and Pacific Rim Importers Association.";
}
```

You can also enable the [CloseOnClick](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLoadingPanel.CloseOnClick) property to allow users to close the Loading Panel.

[Run Demo: Modal Panel](https://demos.devexpress.com/blazor/LoadingPanel#Blocking) [View Example: Master-Detail with partial loading](https://github.com/DevExpress-Examples/blazor-grid-master-detail-partial-loading)

### Customize Appearance

The following example changes the default [Text](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLoadingPanel.Text) and its position relative to the panel’s indicator (the [TextAlignment](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLoadingPanel.TextAlignment) property).

```
<DxLoadingPanel Visible="true"
                ApplyBackgroundShading="true"
                Text="Please, wait..."
                TextAlignment="LoadingPanelTextAlignment.Left"
                CssClass="w-100">
    <DxMemo @bind-Text="@Text"
            Rows="10" />
</DxLoadingPanel>

@code {
    string Text = "Andrew received his BTS commercial in 1987 and a Ph.D. in international marketing at the University " +
                  "of Dallas in 1994. He speaks French and Italian fluently, and reads German. He joined the company as " +
                  "a sales representative. After that, he was promoted to sales manager in January 2005 and vice president " +
                  "of sales in March 2006. Andrew is a member of the Sales Management Round table, Seattle Chamber of Commerce, and Pacific Rim Importers Association.";
}
```

![Align custom text](https://docs.devexpress.com/Blazor/images/blazor-dxloadingpanel-custom-text-aligned.png)

You can also customize the panel’s indicator. Use the following API members:

[IndicatorAnimationType](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLoadingPanel.IndicatorAnimationType)

Specifies the indicator’s animation type.

[IndicatorAreaVisible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLoadingPanel.IndicatorAreaVisible)

Specifies the indicator’s area visibility.

[IndicatorCssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLoadingPanel.IndicatorCssClass)

Assigns a CSS class to the indicator.

[IndicatorTemplate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLoadingPanel.IndicatorTemplate)

Specifies custom content for the indicator.

[IndicatorVisible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLoadingPanel.IndicatorVisible)

Specifies visibility of the Loading Panel’s indicator.

[Run Demo: Customize the Indicator](https://demos.devexpress.com/blazor/LoadingPanel#Indicator)

### Component Lifecycle: Child Component Re-Render

When `DxLoadingPanel` contains a child component with a complex-typed parameter, the child is re-rendered when the parent `DxLoadingPanel` is clicked. This behavior is expected for Blazor components that accept complex-typed parameters, because the framework cannot know whether the values of a complex-typed parameter have mutated internally, so the framework always treats the parameter set as changed. Refer to the following Microsoft help topic for additional information: [ASP.NET Core Razor component lifecycle](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/lifecycle#after-parameters-are-set-onparameterssetasync)

You can use the following approaches to prevent unnecessary re-render:

1. Pass primitive-typed fields to the child component instead of passing the entire object as a parameter.
2. Override the `ShouldRender` method. Refer to the following Microsoft help topic for additional information: [Avoid unnecessary rendering of component subtrees](https://learn.microsoft.com/en-us/aspnet/core/blazor/performance#avoid-unnecessary-rendering-of-component-subtrees).
3. Do not use `DxLoadingPanel` as a parent component and specify its [PositionTarget](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLoadingPanel.PositionTarget) property.
	```
	<TestComponent Object=_someObject Id="show-panel"/>
	<DxLoadingPanel PositionTarget="#show-panel" />
	```
4. Use static panel mode and render `DxLoadingPanel` conditionally. Do not specify `DxLoadingPanel` child content, nor the [PositionTarget](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxLoadingPanel.PositionTarget) property.
	```
	@if (SomeCondition == null) {
	    <DxLoadingPanel Visible="true" />
	}
	else {
	    <TestComponent Object=_someObject Id="show-panel"/>
	}
	```

### Loading Panel Delay

To avoid UI flicker on fast operations, you can introduce a 100-200 millisecond delay before the loading panel appears. If the operation completes within this interval, the loading animation is never shown.

While `DxLoadingPanel` does not have a built-in delay property, you can implement this behavior using the following pattern:

```
<DxLoadingPanel Visible="@ShowSpinner"
                IndicatorAnimationType="WaitIndicatorAnimationType.Spin">
    @* ... *@
</DxLoadingPanel>

@code {
    bool ShowSpinner = false;

    async Task RunOperationWithDelay()
    {
        ShowSpinner = false;
        var delayTask = Task.Delay(200);
        var operationTask = YourOperationAsync();
        var completedTask = await Task.WhenAny(delayTask, operationTask);
        if (completedTask == delayTask) ShowSpinner = true;
        await operationTask;
        ShowSpinner = false;
    }

    async Task YourOperationAsync()
    {
        // Simulate work
        await Task.Delay(500);
    }
}
```