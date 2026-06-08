# UICommander and UIActionTracker

When users interact with your UI, you typically need to execute commands that modify server-side state. `UICommander` and `UIActionTracker` work together to make the UI responsive during and after these actions.

::: tip Optional Components
Both `UICommander` and `UIActionTracker` are optional. You can replace them with your own abstractions if you prefer a different approach to command execution and UI responsiveness. The default implementations provide a well-tested pattern, but Fusion doesn't require them.
:::

## UICommander

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion/UI/UICommander.cs)

`UICommander` is a wrapper around `ICommander` that provides two additional features:

1. **Reports command execution to `UIActionTracker`**: Every command started through `UICommander` is registered with `UIActionTracker`, which tracks running commands and their completion.

2. **Enables instant UI updates**: The scoped `IUpdateDelayer` (when not a `FixedDelayer`) monitors `UIActionTracker` and resets update delays to zero while commands are running and for a short period after completion.

This means the UI is highly responsive when a user performs actions (showing results immediately), but more resource-efficient when displaying updates from other users or background processes.

### Key Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `Call<TResult>(command)` | `Task<TResult>` | Executes command, returns the result value |
| `Run<TResult>(command)` | `Task<UIActionResult<TResult>>` | Executes command, returns full result with metadata |
| `Start<TResult>(command)` | `UIAction<TResult>` | Starts command (fire-and-forget style), returns immediately |

### Error Propagation

The three methods differ in how they surface errors:

- **`Call<T>(command)`** — awaits execution and **throws** any exception directly to the caller.
- **`Run<T>(command)`** — returns `Task<UIActionResult<T>>`; the result's `Error` property holds any exception. The task itself never throws (errors are captured).
- **`Start<T>(command)`** — fire-and-forget; returns a `UIAction<T>` immediately. Errors are captured in the action result and accessible via `UIActionTracker.LastResult`.

Use `Run` when you want to inspect or display errors inline; use `Call` when a thrown exception is more natural; use `Start` for truly fire-and-forget scenarios where the result is tracked centrally.

### Usage Example

From [TodoApp/UI/Shared/TodoItemView.razor](https://github.com/ActualLab/Fusion.Samples/blob/master/src/TodoApp/UI/Shared/TodoItemView.razor):

```csharp
@inherits ComputedStateComponent<TodoItem?>
@* UICommander is available via CircuitHubComponentBase *@

// Toggle completion status
private Task InvertDone()
{
    var item = State.LatestNonErrorValue with { IsDone = !item.IsDone };
    return UICommander.Run(new Todos_AddOrUpdate(Session, item));
}

// Remove item
private Task Remove()
    => UICommander.Run(new Todos_Remove(Session, Item.Id));
```

The `Run` method returns a `Task` that completes when the command finishes. By discarding the result (`_ = UICommander.Run(...)`), you can fire-and-forget the command while still getting the benefits of instant updates.


## UIActionTracker

[View Source](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion/UI/UIActionTracker.cs)

`UIActionTracker` monitors all commands executed through `UICommander`:

- **`RunningActionCount`**: Number of currently executing commands
- **`LastAction`**: The most recent action that was started (as `AsyncState<UIAction?>`)
- **`LastResult`**: The most recent action result (as `AsyncState<IUIActionResult?>`)
- **`AreInstantUpdatesEnabled()`**: Returns `true` if commands are running or completed recently
- **`WhenInstantUpdatesEnabled()`**: Returns a `Task` that completes when instant updates should begin

### Configuration Options

```csharp
public sealed record Options {
    // How long after command completion to keep instant updates enabled
    public TimeSpan InstantUpdatePeriod { get; init; } = TimeSpan.FromMilliseconds(300);
    public MomentClock? Clock { get; init; }
}
```


## UpdateDelayer vs FixedDelayer

The `IUpdateDelayer` abstraction controls how long `ComputedState<T>` waits before recomputing after invalidation.

**`FixedDelayer`** always waits for the configured delay, regardless of user activity:

```csharp
// Always waits the minimum delay (~32ms) before updates
services.AddScoped<IUpdateDelayer>(_ => FixedDelayer.MinDelay);
```

**`UpdateDelayer`** integrates with `UIActionTracker` to provide responsive updates:

```csharp
// Normally waits 0.25s, but updates instantly when user is active
services.AddScoped<IUpdateDelayer>(c => new UpdateDelayer(c.UIActionTracker(), 0.25));
```

When using `UpdateDelayer`:
- If no commands are running and none completed recently → waits the full delay (e.g., 0.25s)
- If a command is running → updates as soon as possible (respects `MinDelay` of ~32ms)
- If a command completed within `InstantUpdatePeriod` (default 300ms) → updates immediately

This behavior makes the UI feel snappy when users perform actions while being efficient when only observing changes from other sources.

### Typical Configuration

From [TodoApp/UI/ClientStartup.cs](https://github.com/ActualLab/Fusion.Samples/blob/master/src/TodoApp/UI/ClientStartup.cs):

```csharp
services.AddScoped<IUpdateDelayer>(c => new UpdateDelayer(c.UIActionTracker(), 0.25));
```


## DI Registration

`UICommander` and `UIActionTracker` are registered when you call `AddBlazor()`:

```csharp
services.AddFusion().AddBlazor();
```

| Service | Lifetime | Description |
|---------|----------|-------------|
| `UICommander` | Scoped | Command execution wrapper |
| `UIActionTracker` | Scoped | Tracks running/completed UI actions |

You can also use them without Blazor by registering them manually:

```csharp
services.AddScoped(c => new UIActionTracker(new UIActionTracker.Options(), c));
services.AddScoped(c => new UICommander(c));
```
