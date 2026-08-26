---
title: FluentUI Blazor PullToRefresh
status: developing
address: c-000138
---

# FluentUI Blazor PullToRefresh

The `FluentPullToRefresh` component implements a touchscreen gesture for refreshing content by pulling (dragging) the screen downward or upward and releasing. Primarily designed for mobile devices, with an emulator script included for desktop browser compatibility.

## Basic Usage

```razor
<FluentPullToRefresh OnRefreshAsync="OnRefreshAsync"
                     Style="width: 100%">
    <div style="height: 150px; width: 100%; padding: 5px;">
        Content to refresh. Pull counter: @counter
    </div>
</FluentPullToRefresh>

@code {
    int counter;
    async Task<bool> OnRefreshAsync()
    {
        counter++;
        await Task.Delay(250);
        return true;
    }
}
```

The `OnRefreshAsync` callback returns `Task<bool>` -- return `true` to indicate more data can still be loaded, `false` to indicate no more data.

## Direction

Set the pull direction via `Direction` parameter:

- `PullDirection.Down` (default): Pull down to refresh
- `PullDirection.Up`: Pull up to refresh

## Custom Templates

Replace the default icons and text with custom content:

| Template | When Displayed |
|----------|----------------|
| `PullingTemplate` | While the user is pulling but has not reached the threshold |
| `ReleaseTemplate` | When the pull threshold is reached, ready to release |
| `LoadingTemplate` | While the refresh operation is in progress |
| `CompletedTemplate` | After the refresh completes successfully |

```razor
<FluentPullToRefresh OnRefreshAsync="LoadAsync" TipHeight="40px" Style="overflow-x: auto;">
    <PullingTemplate>Pull to refresh</PullingTemplate>
    <ReleaseTemplate>Release to update</ReleaseTemplate>
    <CompletedTemplate>Update completed</CompletedTemplate>
    <ChildContent>
        <FluentStack VerticalGap="8px" Padding="12px">
            @foreach (var item in items)
            {
                <FluentCard Padding="@Padding.All2">@item</FluentCard>
            }
        </FluentStack>
    </ChildContent>
</FluentPullToRefresh>
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `Disabled` | `bool` | Disables the pull gesture |
| `Direction` | `PullDirection` | `Down` (default) or `Up` |
| `TipHeight` | `string` | Height of the pull tip area (e.g., "40px") |
| `DragDistance` | `int` | Minimum drag distance before release triggers refresh |
| `OnRefreshAsync` | `Func<Task<bool>>` | Callback invoked when pull-to-refresh is triggered |
| `PullingTemplate` | `RenderFragment` | Content shown while pulling |
| `ReleaseTemplate` | `RenderFragment` | Content shown when ready to release |
| `LoadingTemplate` | `RenderFragment` | Content shown during refresh |
| `CompletedTemplate` | `RenderFragment` | Content shown on completion |

## Pull Up Example

```razor
<div class="pull-up-demo" style="height: 51.2vh; max-width: 400px; overflow: auto;">
    <FluentPullToRefresh Direction="@PullDirection.Up"
                         OnRefreshAsync="OnRefreshAsync"
                         TipHeight="40px"
                         DragDistance="100"
                         Style="width: 100%">
        <LoadingTemplate>
            <FluentProgressBar Width="150px"/>
        </LoadingTemplate>
        <ChildContent>
            @for (int i = 1; i <= count; i++)
            {
                <span @key="i">item @i</span>
            }
        </ChildContent>
    </FluentPullToRefresh>
</div>
```

## API Reference

| Component | API Type |
|-----------|----------|
| FluentPullToRefresh | `FluentPullToRefresh` |
