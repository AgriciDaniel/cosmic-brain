---
title: "DxSpinEdit<T>.BindValueMode Property | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSpinEdit-1.BindValueMode"
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

## DxSpinEdit<T>.BindValueMode Property

In This Article

Specifies when to update the Spin Edit component’s value.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
[DefaultValue(BindValueMode.OnLostFocus)]
[Parameter]
public BindValueMode BindValueMode { get; set; }
```

## Property Value

| Type | Default | Description |
| --- | --- | --- |
| [BindValueMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.BindValueMode) | OnLostFocus | A [BindValueMode](https://docs.devexpress.com/Blazor/DevExpress.Blazor.BindValueMode) enumeration value. |

Available values:

| Name | Description |
| --- | --- |
| OnLostFocus | The editor value is updated after the editor loses focus. |
| OnInput | The editor value is updated whenever a user types. |
| OnDelayedInput | The editor value is updated with a delay after a user makes changes. |

## Remarks

The Spin Edit component updates its [Value](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSpinEdit-1.Value) property after a user changes the input value. The `BindValueMode` property allows you to specify when the update happens.

### OnLostFocus Mode

The default mode is `OnLostFocus`. The actual editor value is updated after a user changes the input value and removes focus.

### OnInput Mode

Set the editor’s `BindValueMode` property to `OnInput` to update the actual editor value each time when the user changes the input value:

```
<DxSpinEdit @bind-Value="@Year" 
            BindValueMode="BindValueMode.OnInput" />

@code {
    int Year { get; set; } = 2000;
}
```

### OnDelayedInput Mode

Set the editor’s `BindValueMode` property to `OnDelayedInput` to delay value updates. If a user changes the input value, the editor does not react immediately - it waits for the user to be idle for a certain time ([InputDelay](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxSpinEdit-1.InputDelay)). Once the idle interval elapses, the editor applies all accumulated value changes at once.

Use this mode if you want fewer value updates (better client-side performance) and not rely on input focus changes.

The following code snippet shows the Spin Edit component that updates its value after a user is idle for 1 second (1,000ms):

```
<DxSpinEdit @bind-Value="@Year"
            BindValueMode="BindValueMode.OnDelayedInput"
            InputDelay="1000" />

@code {
    int Year { get; set; } = 2000;
}
```

[Run Demo: Spin Edit - Bind Value On Input Change](https://demos.devexpress.com/blazor/SpinEdit#OnInputBinding)

See Also