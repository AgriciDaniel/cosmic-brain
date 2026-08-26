---
type: concept
title: "Fusion Blazor Integration"
updated: 2026-05-25
tags:
  - dotnet
  - fusion
  - blazor
  - ui
domain: dotnet
status: developing
related:
  - "[[ActualLab-Fusion]]"
  - "[[Fusion States]]"
  - "[[Fusion Authentication]]"
source: "[[fusion-docs-overview]]"
---

# Fusion Blazor Integration

Fusion provides Blazor component base classes that automatically re-render when underlying computed data changes. The core component is `ComputedStateComponent<T>` — a Blazor component with a `State` property that auto-updates via Fusion's dependency tracking.

## Component Hierarchy

| Class | Purpose |
|-------|---------|
| `FusionComponentBase` | Base: optimized parameter handling and event processing |
| `CircuitHubComponentBase` | Adds `CircuitHub` and service shortcuts |
| `StatefulComponentBase<T>` | Adds `State` management with automatic UI updates |
| `ComputedStateComponent<T>` | Auto-computed state with dependency tracking |
| `ComputedRenderStateComponent<T>` | Optimized rendering, skips unchanged states |
| `MixedStateComponent<T, TM>` | Combines computed state with local mutable state |

## Required Packages

| Package | Purpose |
|---------|---------|
| `ActualLab.Fusion.Blazor` | Component base classes |
| `ActualLab.Fusion.Blazor.Authentication` | (Optional) Auth state in Blazor |

## ComputedStateComponent\<T\>

The most commonly used component base class. `State` is a `ComputedState<T>` that invalidates when any dependency changes and recomputes after a configurable delay:

```razor
@inherits ComputedStateComponent<UserProfile>
@inject IUserService UserService

<div class="profile">
    <h1>@State.Value.Name</h1>
    <p>@State.Value.Bio</p>
</div>

@code {
    [Parameter] public long UserId { get; set; }

    protected override Task<UserProfile> ComputeState(CancellationToken ct)
        => UserService.GetUserProfile(UserId, ct);
}
```

When `State` recomputes, `StateHasChanged()` is called automatically. No manual subscription wiring.

## State Access Pattern

```razor
@if (State.Snapshot.IsInitial)
{
    <p>Loading...</p>
}
else if (State.Snapshot.HasError)
{
    <p class="error">@State.Snapshot.Error.Message</p>
    <p><em>Last known: @State.LastNonErrorValue?.Name</em></p>
}
else
{
    <p>@State.Value.Name</p>
}
```

### Key Properties

| Property | Description |
|----------|-------------|
| `State.Value` | Current value (throws if error) |
| `State.LastNonErrorValue` | Last successful value (survives errors) |
| `State.Snapshot` | Atomic snapshot for consistent reads |
| `State.Snapshot.IsInitial` | True if still computing first value |

## FusionComponentBase

Foundation class extending `ComponentBase`. Provides:
- **Optimized parameter comparison**: skips `SetParametersAsync` when parameters haven't meaningfully changed
- **Custom event handling**: optionally suppresses `StateHasChanged` after events
- **`ComponentInfo`**: cached metadata for efficient parameter comparison via `ParameterComparisonMode`

## CircuitHubComponentBase

Extends `FusionComponentBase` to expose commonly used services:
- `CircuitHub` — the injected circuit hub managing Blazor circuit lifecycle
- `Services` — shortcut to `CircuitHub.Services`
- `Session` — current user session

## MixedStateComponent\<T, TM\>

Combines a computed state (`State`) with a local mutable state (`MutableState`). Use when you have server-derived data plus local UI state:

```razor
@inherits MixedStateComponent<UserProfile, EditForm>
```

## UICommander

`UICommander` handles UI-triggered command execution with loading state tracking:

```csharp
@inject UICommander UICommander

async Task Save()
{
    await UICommander.Run(async ct => {
        await UserService.UpdateProfile(State.Value, ct);
    });
}
```

It integrates with `UIActionTracker` which `UpdateDelayer` uses to shorten delays after user actions — providing instant feedback.

## Parameter Optimization

`FusionComponentBase` supports configurable parameter comparison modes:

```csharp
// Global default
FusionComponentBase.DefaultParameterComparisonMode = ParameterComparisonMode.ByValue;
```

This is critical for Blazor Server where excessive re-rendering is expensive. Components skip `SetParametersAsync` when parameters haven't changed according to the configured mode.

## Services

- **`CircuitHub`**: manages Blazor circuit lifecycle, session resolution, and Fusion service access
- **`JSRuntimeInfo`**: tracks whether JS interop is available (WebAssembly vs Server)
- **`RenderModeHelper`**: detects and manages Blazor render modes (Server, WebAssembly, Auto)
- **`RenderModeDef`**: immutable descriptor for a render mode (mode info + key)

## Tips

1. **Always check `IsInitial`** for loading states before accessing `Value`
2. **Use `LastNonErrorValue`** to keep showing data during transient errors
3. **Dispose computed states** in components implementing `IDisposable`
4. **Prefer `MixedStateComponent`** when you have server data + local form state
5. **Consider `ComputedRenderStateComponent`** for high-frequency updates — it skips re-renders when state hasn't actually changed
