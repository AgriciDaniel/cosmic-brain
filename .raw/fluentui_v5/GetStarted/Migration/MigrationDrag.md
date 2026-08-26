---
title: Migration FluentDragContainer and FluentDropZone
route: /Migration/Drag
hidden: true
---

### General changes 💥

All events associated with this component have been updated to use `EventCallback<FluentDragEventArgs<TItem>>` instead of `Action<FluentDragEventArgs<TItem>>`. This change allows developers to use different method signatures and properly await tasks.

```cs
private void OnDropEnd(FluentDragEventArgs<string> e) { } // Possible in v4 & v5

private Task OnDropEnd(FluentDragEventArgs<string> e) { } // Possible in v5

private async Task OnRowDropEnd(FluentDragEventArgs<string> e) { } // Possible in v5
```

This change introduces minor breaking changes if these properties are assigned in C# code.

```cs
// v4
component.OnDragEnter = (e) => { };

// v5
component.OnDragEnter = EventCallback.Factory.Create<FluentDragEventArgs<FormRow>>(this, (e) => { });
```

You also need to update your code if you are checking these properties for null.

```cs
// v4
if (component.OnDragEnter != null) { }

// v5
if (component.OnDragEnter.HasDelegate) { }
```

#### Changed properties

| V4 Property | V5 Property | Change |
|-------------|-------------|--------|
| `OnDragStart` (`Action<FluentDragEventArgs<TItem>>`) | `OnDragStart` (`EventCallback<FluentDragEventArgs<TItem>>`) | Switched from `Action` to `EventCallback` |
| `OnDragEnd` (`Action<FluentDragEventArgs<TItem>>`) | `OnDragEnd` (`EventCallback<FluentDragEventArgs<TItem>>`) | Switched from `Action` to `EventCallback` |
| `OnDragEnter` (`Action<FluentDragEventArgs<TItem>>`) | `OnDragEnter` (`EventCallback<FluentDragEventArgs<TItem>>`) | Switched from `Action` to `EventCallback` |
| `OnDragOver` (`Action<FluentDragEventArgs<TItem>>`) | `OnDragOver` (`EventCallback<FluentDragEventArgs<TItem>>`) | Switched from `Action` to `EventCallback` |
| `OnDragLeave` (`Action<FluentDragEventArgs<TItem>>`) | `OnDragLeave` (`EventCallback<FluentDragEventArgs<TItem>>`) | Switched from `Action` to `EventCallback` |
| `OnDropEnd` (`Action<FluentDragEventArgs<TItem>>`) | `OnDropEnd` (`EventCallback<FluentDragEventArgs<TItem>>`) | Switched from `Action` to `EventCallback` |

### FluentDropZone changes

#### Changed properties

| V4 Property | V5 Property | Change |
|-------------|-------------|--------|
| `OnDragStart` (`Action<FluentDragEventArgs<TItem>>`) | `OnDragStart` (`EventCallback<FluentDragEventArgs<TItem>>`) | Switched from `Action` to `EventCallback` |
| `OnDragEnd` (`Action<FluentDragEventArgs<TItem>>`) | `OnDragEnd` (`EventCallback<FluentDragEventArgs<TItem>>`) | Switched from `Action` to `EventCallback` |
| `OnDragEnter` (`Action<FluentDragEventArgs<TItem>>`) | `OnDragEnter` (`EventCallback<FluentDragEventArgs<TItem>>`) | Switched from `Action` to `EventCallback` |
| `OnDragOver` (`Action<FluentDragEventArgs<TItem>>`) | `OnDragOver` (`EventCallback<FluentDragEventArgs<TItem>>`) | Switched from `Action` to `EventCallback` |
| `OnDragLeave` (`Action<FluentDragEventArgs<TItem>>`) | `OnDragLeave` (`EventCallback<FluentDragEventArgs<TItem>>`) | Switched from `Action` to `EventCallback` |
| `OnDropEnd` (`Action<FluentDragEventArgs<TItem>>`) | `OnDropEnd` (`EventCallback<FluentDragEventArgs<TItem>>`) | Switched from `Action` to `EventCallback` |
