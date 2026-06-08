---
title: "DxProgressBar Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxProgressBar"
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

## DxProgressBar Class

In This Article

A progress bar component.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxProgressBar :
    DxComponentBase
```

## Remarks

The DevExpress Progress Bar for Blazor (`<DxProgressBar>`) allows you to inform users about the status of ongoing processes.

[Run Demo](https://demos.devexpress.com/blazor/ProgressBar)

### Add a Progress Bar to a Project

Follow the steps below to add a Progress Bar component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add the `<DxProgressBar>` … `</DxProgressBar>` markup to a `.razor` file.
3. Write code to update the Progress Bar or enable the.
4. *Optional.* Specify the progress bar: horizontal, vertical, or circular.

### API Reference

Refer to the following list for the component API reference: [DxProgressBar Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxProgressBar._members).

### Static Render Mode Specifics

Blazor Progress Bar does not support static render mode. Enable interactivity to use the component in your application. Refer to the following topic for more details: [Enable Interactive Render Mode](https://docs.devexpress.com/Blazor/405079/enable-interactive-render-mode).

### Value

The [Value](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxProgressBar.Value) property specifies the current progress bar value. [MinValue](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxProgressBar.MinValue) and [MaxValue](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxProgressBar.MaxValue) properties limit the range of accepted values.

The progress is measured in percentages and calculated by the following formula:  
`(Value - MinValue) / (MaxValue - MinValue) * 100`.

[Run Demo: Progress Bar - Overview](https://demos.devexpress.com/blazor/ProgressBar#Overview)

```
<DxProgressBar MinValue="100" MaxValue="500" Value="200" />
```

![Progress bar value and percentage calculation](https://docs.devexpress.com/Blazor/images/progressbar/blazor-progressbar-min-max-value.png)

If the current progress is unknown, you can display an.

### Progress Status

Use the [Status](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxProgressBar.Status) property to specify the progress status. The status affects bar appearance, the icon, and the default label.

![Progress bar Status Values](https://docs.devexpress.com/Blazor/images/progressbar/blazor-progressbar-label.png)

If the [Status](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxProgressBar.Status) property is not specified, the component automatically sets the `Success` status when [Value](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxProgressBar.Value) matches [MaxValue](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxProgressBar.MaxValue). You can set the [SetSuccessStatusOnComplete](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxProgressBar.SetSuccessStatusOnComplete) property to `false` to disable this behavior.

### Label

The progress bar label displays information about progress status. The label shows the progress in percentages, and the corresponding text for the `Success`, `Pause`, and `Error` status values.

[Run Demo: Indeterminate Progress Bar](https://demos.devexpress.com/blazor/ProgressBar#Customization)

Use the [Label](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxProgressBar.Label) property to customize the progress bar label.

```
<DxProgressBar Label="Loading..." ... />
```

![Progress bar label](https://docs.devexpress.com/Blazor/images/progressbar/blazor-progressbar-label-inprogress.png)

You can use the [LabelPosition](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxProgressBar.LabelPosition) property to specify the position of the label relative to the progress bar. To hide the label, set the [ShowLabel](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxProgressBar.ShowLabel) property to `false`.

### Indeterminate State

When progress cannot be estimated or it is not necessary to indicate the progress numerically, set the [Indeterminate](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxProgressBar.Indeterminate) property to `true` to display a moving bar.

[Run Demo: Indeterminate Progress Bar](https://demos.devexpress.com/blazor/ProgressBar#Indeterminate)

```
<DxProgressBar Label="Loading..." Indeterminate="true" />
```

### Vertical and Circular Progress Bar

The `DxProgressBar` component renders a linear horizontal progress bar. Use the [Type](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxProgressBar.Type) property to change the bar type to vertical or circular.

[Run Demo: Progress Bar Types](https://demos.devexpress.com/blazor/ProgressBar#Types)

```
<DxProgressBar Type="ProgressBarType.Horizontal" Value="35" />
<DxProgressBar Type="ProgressBarType.Vertical" Value="35" />
<DxProgressBar Type="ProgressBarType.Circular" Value="35" />
```

![Circular progress bar](https://docs.devexpress.com/Blazor/images/progressbar/blazor-progressbar-types.png)

## Inheritance

[Object](https://learn.microsoft.com/dotnet/api/system.object)

[ComponentBase](https://learn.microsoft.com/dotnet/api/microsoft.aspnetcore.components.componentbase)

[DxComponentBase](https://docs.devexpress.com/Blazor/DevExpress.Blazor.Base.DxComponentBase)

DxProgressBar

See Also

[DxProgressBar Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxProgressBar._members)