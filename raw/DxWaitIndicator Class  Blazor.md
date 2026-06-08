---
title: "DxWaitIndicator Class | Blazor"
source: "https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxWaitIndicator"
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

## DxWaitIndicator Class

In This Article

A loading indicator component that can be embedded into other UI components.

**Assembly**: DevExpress.Blazor.v25.2.dll

**NuGet Package**: [DevExpress.Blazor](https://nuget.devexpress.com/packages/DevExpress.Blazor/25.2.7)

## Declaration

```csharp
public class DxWaitIndicator :
    DxComponentBase
```

## Remarks

The Wait Indicator component displays progress of time-consuming operations. You can embed Wait Indicator into other UI components (for example, buttons or data editors).

![Blazor Utilities Landing Wait Indicator](https://docs.devexpress.com/Blazor/images/blazor-waitindicator-overview.png)

[Run Demo](https://demos.devexpress.com/blazor/WaitIndicator)

### Add a Wait Indicator to a Project

Follow the steps below to add a Wait Indicator component to an application:

1. [Create](https://docs.devexpress.com/Blazor/401057/get-started) a Blazor Server or Blazor WebAssembly application.
2. Add component markup to a `.razor` file: `<DxWaitIndicator>` … `</DxWaitIndicator>`.
3. Write code that manages the Wait Indicator’s.
4. Configure other options (see sections below).

### API Reference

Refer to the following list for the component API reference: [DxWaitIndicator Members](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxWaitIndicator._members).

### Static Render Mode Specifics

Blazor Wait Indicator supports static render mode to indicate progress with streaming rendering. For other features, you need to enable interactivity on a Razor page and allow the Wait Indicator component to execute scripts and display data.

- [Index.razor](#tabpanel_y-1woo7XXF_tabid-1)

```
@rendermode InteractiveServer
```

### Display a Wait Indicator

Use the [Visible](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxWaitIndicator.Visible) property to show/hide the Wait Indicator when an operation starts/finishes.

The following example imitates a lengthy operation. During this operation the Button becomes disabled and the Wait Indicator appears.

```
<DxButton Enabled="!isSending"
          Click="Send"
          RenderStyle="ButtonRenderStyle.Secondary">
    <div class="d-flex">
        <DxWaitIndicator Visible="isSending" />
        <span class="mx-2">@Message</span>
    </div>
</DxButton>

@code{
    bool isSending = false;
    string Message => isSending ? "Sending..." : "Send";
    private async Task Send() {
        isSending = true;
        await Task.Delay(3000);
        isSending = false;
    }
}
```

### Customize Appearance

Use the [CssClass](https://docs.devexpress.com/Blazor/DevExpress.Blazor.DxWaitIndicator.CssClass) property to apply custom styles to the Wait Indicator.

- [Razor](#tabpanel_Bpy4FsLNiB_tabid-razor1)
- [CSS](#tabpanel_Bpy4FsLNiB_tabid-css1)

```
<DxButton Enabled="!isSending"
          Click="Send"
          RenderStyle="ButtonRenderStyle.Primary">
    <div class="d-flex">
        <DxWaitIndicator Visible="isSending"
                         CssClass="my-indicator" />
        <span class="mx-2">@Message</span>
    </div>
</DxButton>

@code{
    bool isSending = false;
    string Message => isSending ? "Sending..." : "Send";
    private async Task Send() {
        isSending = true;
        await Task.Delay(3000);
        isSending = false;
    }
}
```