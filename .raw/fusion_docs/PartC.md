# CommandR: CQRS and Beyond

[ActualLab.CommandR](https://www.nuget.org/packages/ActualLab.CommandR/)
is a CQRS-style command handling library that powers Fusion's distributed command execution and multi-host invalidation.

> **Why does CommandR exist?**
> The primary reason is the **Operations Framework** described in [Part 5](./PartO.md).
> Operations Framework requires a command execution pipeline to implement
> multi-host invalidation, operation logging, and other features that make
> Fusion work reliably in distributed scenarios. CommandR provides exactly
> the extensible pipeline needed for this.

## Key Features

- **Unified handler pipeline**: Any handler can act as a filter (middleware) or final handler
- **CommandContext**: An `HttpContext`-like type for accessing state during command execution
- **Convention-based handlers**: Use `[CommandHandler]` attribute instead of implementing interfaces
- **Command services with interceptors**: Methods marked with `[CommandHandler]` can only be invoked through Commander
- **RPC integration**: Seamless distributed command execution with ActualLab.Rpc

If you're familiar with MediatR, see [MediatR Comparison](./PartC-MC.md) for a detailed mapping of concepts.

## Required Packages

| Package | Purpose |
|---------|---------|
| [ActualLab.CommandR](https://www.nuget.org/packages/ActualLab.CommandR/) | Core CommandR: commands, handlers, pipeline, `ICommander` |
| [ActualLab.Rpc](https://www.nuget.org/packages/ActualLab.Rpc/) | *(Optional)* Needed only for distributed command execution over RPC |

::: tip
If you're using Fusion, `ActualLab.Fusion` already includes CommandR. You only need to reference `ActualLab.CommandR` directly if you're using it standalone without Fusion.
:::

## Getting Started

### 1. Define a Command

Commands are simple classes or records implementing `ICommand<TResult>`:

<!-- snippet: PartC_PrintCommandSession -->
```cs
public class PrintCommand : ICommand<Unit>
{
    public string Message { get; set; } = "";
}

// Interface-based command handler
public class PrintCommandHandler : ICommandHandler<PrintCommand>, IDisposable
{
    public PrintCommandHandler() => WriteLine("Creating PrintCommandHandler.");
    public void Dispose() => WriteLine("Disposing PrintCommandHandler");

    public async Task OnCommand(PrintCommand command, CommandContext context, CancellationToken cancellationToken)
    {
        WriteLine(command.Message);
        WriteLine("Sir, yes, sir!");
    }
}
```
<!-- endSnippet -->

### 2. Register and Execute

<!-- snippet: PartC_PrintCommandSession2 -->
```cs
// Building IoC container
var serviceBuilder = new ServiceCollection()
    .AddScoped<PrintCommandHandler>(); // Try changing this to AddSingleton
var rpc = serviceBuilder.AddRpc();
var commanderBuilder = serviceBuilder.AddCommander()
    .AddHandlers<PrintCommandHandler>();
var services = serviceBuilder.BuildServiceProvider();

var commander = services.Commander(); // Same as .GetRequiredService<ICommander>()
await commander.Call(new PrintCommand() { Message = "Are you operational?" });
await commander.Call(new PrintCommand() { Message = "Are you operational?" });
```
<!-- endSnippet -->

The output:

```
Creating PrintCommandHandler.
Are you operational?
Sir, yes, sir!
Disposing PrintCommandHandler
Creating PrintCommandHandler.
Are you operational?
Sir, yes, sir!
Disposing PrintCommandHandler
```

Key points:
- CommandR doesn't auto-register handler services &ndash; you must register them separately
- `Call` creates a new `IServiceScope` for each command invocation
- Try changing `AddScoped` to `AddSingleton` to see the difference

## Convention-Based Handlers and CommandContext

You don't need to implement `ICommandHandler<T>`. Any method with `[CommandHandler]` works:

<!-- snippet: PartC_RecSumCommandSession -->
```cs
public class RecSumCommand : ICommand<long>
{
    public long[] Numbers { get; set; } = Array.Empty<long>();
}
```
<!-- endSnippet -->

<!-- snippet: PartC_RecSumCommandSession2 -->
```cs
// Building IoC container
var serviceBuilder = new ServiceCollection()
    .AddScoped<RecSumCommandHandler>();
var rpc = serviceBuilder.AddRpc();
var commanderBuilder = serviceBuilder.AddCommander()
    .AddHandlers<RecSumCommandHandler>();
var services = serviceBuilder.BuildServiceProvider();

var commander = services.Commander(); // Same as .GetRequiredService<ICommander>()
WriteLine(await commander.Call(new RecSumCommand() { Numbers = new [] { 1L, 2, 3 }}));
```
<!-- endSnippet -->

Convention-based handlers are flexible with arguments:
- First argument: the command
- Last argument: `CancellationToken`
- `CommandContext` arguments are resolved via `CommandContext.GetCurrent()`
- Everything else is resolved via the scoped `IServiceProvider`

### CommandContext

`CommandContext` provides access to:
- The currently running command
- Its result (usually set automatically)
- `IServiceScope` for the command
- `Items` &ndash; a dictionary for storing data during execution
- `OuterContext` and `OutermostContext` for nested commands

When commands call other commands, each gets its own `CommandContext`, but they share the same `ServiceScope` (unless you explicitly isolate them).

## Ways to Run a Command

`ICommander` provides several methods via `CommanderExt`:

| Method | Returns | Behavior |
|--------|---------|----------|
| `Call` | `Task<TResult>` | Invokes command and returns result. Throws on error. |
| `Run` | `Task<CommandContext>` | Invokes command and returns context. Never throws. |
| `Start` | `CommandContext` | Fire-and-forget. Returns context immediately. |

All methods accept optional parameters:
- `bool isolate = false` &ndash; if true, runs in a new `ExecutionContext` with no async locals
- `CancellationToken cancellationToken = default`

## Command Services

The most powerful way to define handlers is via Command Services.

> **Note:** `IComputeService` extends `ICommandService`, so all compute services are automatically command services too. This means you can add `[CommandHandler]` methods to any compute service without additional setup.

<!-- snippet: PartC_RecSumCommandServiceSession -->
```cs
public class RecSumCommandService : ICommandService
{
    [CommandHandler] // Note that ICommandHandler<RecSumCommand, long> support isn't needed
    public virtual async Task<long> RecSum( // Notice "public virtual"!
        RecSumCommand command,
        // You can't have any extra arguments here
        CancellationToken cancellationToken = default)
    {
        if (command.Numbers.Length == 0)
            return 0;
        var head = command.Numbers[0];
        var tail = command.Numbers[1..];
        var context = CommandContext.GetCurrent();
        var tailSum = await context.Commander.Call( // Invoke nested command through Commander
            new RecSumCommand() { Numbers = tail },
            cancellationToken);
        return head + tailSum;
    }

    // This handler is associated with ANY command (ICommand)
    // Priority = 10 means it runs earlier than any handler with the default priority 0
    // IsFilter tells it triggers other handlers via InvokeRemainingHandlers
    [CommandHandler(Priority = 10, IsFilter = true)]
    protected virtual async Task DepthTracker(ICommand command, CancellationToken cancellationToken)
    {
        var context = CommandContext.GetCurrent();
        var depth = 1 + (int) (context.Items["Depth"] ?? 0);
        context.Items["Depth"] = depth;
        WriteLine($"Depth via context.Items: {depth}");

        await context.InvokeRemainingHandlers(cancellationToken).ConfigureAwait(false);
    }

    // Another filter for RecSumCommand
    [CommandHandler(Priority = 9, IsFilter = true)]
    protected virtual Task ArgumentWriter(RecSumCommand command, CancellationToken cancellationToken)
    {
        WriteLine($"Numbers: {command.Numbers.ToDelimitedString()}");
        var context = CommandContext.GetCurrent();
        return context.InvokeRemainingHandlers(cancellationToken);
    }
}
```
<!-- endSnippet -->

Register command services with `AddService`:

<!-- snippet: PartC_RecSumCommandServiceSession2 -->
```cs
// Building IoC container
var serviceBuilder = new ServiceCollection();
var rpc = serviceBuilder.AddRpc();
var commanderBuilder = serviceBuilder.AddCommander()
    .AddService<RecSumCommandService>(); // Such services are auto-registered as singletons
var services = serviceBuilder.BuildServiceProvider();

var commander = services.Commander();
var recSumService = services.GetRequiredService<RecSumCommandService>();
WriteLine(recSumService.GetType());
WriteLine(await commander.Call(new RecSumCommand() { Numbers = new [] { 1L, 2 }}));
WriteLine(await commander.Call(new RecSumCommand() { Numbers = new [] { 3L, 4 }}));
```
<!-- endSnippet -->

Output:

```
ActualLabProxies.RecSumCommandServiceProxy
Depth via context.Items: 1
Numbers: 1, 2
Depth via context.Items: 1
Numbers: 2
Depth via context.Items: 1
Numbers:
3
...
```

The proxy type **prevents direct invocation of command handler methods**. If you try to call a `[CommandHandler]` method directly, it throws `NotSupportedException`. All command handler methods must be invoked through `ICommander.Call()` &ndash; this ensures the full pipeline (filters, context, scoping) always runs.

::: warning Direct Calls Throw
```cs
// This throws NotSupportedException!
await recSumService.RecSum(new RecSumCommand { Numbers = [1, 2, 3] }, default);

// This works - always use Commander
await commander.Call(new RecSumCommand { Numbers = [1, 2, 3] });
```
:::

Note that each `CommandContext` has its own `Items`. To share data across nested calls, use `context.OutermostContext.Items`.

## Filter Handlers

Filter handlers wrap subsequent handlers, like middleware:

<!-- snippet: PartC_FilterHandler -->
```cs
[CommandHandler(Priority = 10, IsFilter = true)]
protected virtual async Task MyFilter(ICommand command, CancellationToken ct)
{
    var context = CommandContext.GetCurrent();
    // Before
    try {
        await context.InvokeRemainingHandlers(ct);
    }
    finally {
        // After
    }
}
```
<!-- endSnippet -->

Key points:
- Higher `Priority` = runs earlier
- `IsFilter = true` indicates this is a filter
- Must call `InvokeRemainingHandlers` to continue the pipeline
- Can handle specific command types or `ICommand` for all commands

## Local Commands

`ILocalCommand` is a self-executing command: instead of delegating to a registered handler,
it carries its own `Run(context, ct)` logic. The built-in `LocalCommandRunner` (priority 900,000,000)
dispatches it automatically — no handler registration needed.

The `LocalCommand.New(...)` factory builds one from a lambda. Variants accept:

- `Action` / `Action<CancellationToken>` / `Action<CommandContext, CancellationToken>`
- `Func<Task>` / `Func<CancellationToken, Task>` / `Func<CommandContext, CancellationToken, Task>`
- Typed result overloads: `Func<T>`, `Func<Task<T>>`, `Func<CommandContext, CancellationToken, Task<T>>`, etc.

```cs
// Void lambda — fire and forget through the pipeline
await commander.Call(LocalCommand.New(() => Console.WriteLine("Hello")));

// Async with cancellation token
await commander.Call(LocalCommand.New(async ct => await DoWorkAsync(ct)));

// Returns a value
int result = await commander.Call(LocalCommand.New<int>(() => 42));
```

Use `LocalCommand` when you want ad-hoc work (cleanup, one-off side effects) to flow through
the command pipeline and get logging, tracing, and filters for free — without defining a
dedicated command record and handler.

See [Command Interfaces](./PartC-CI.md) and the [Cheat Sheet](./PartC-CS.md) for the full interface listing.

## Learn More

- [Command Interfaces](./PartC-CI.md) &ndash; All command interfaces and tagging interfaces
- [Built-in Handlers](./PartC-BH.md) &ndash; Complete list of built-in handlers and their priorities
- [MediatR Comparison](./PartC-MC.md) &ndash; Mapping from MediatR concepts
- [Cheat Sheet](./PartC-CS.md) &ndash; Quick reference

## Next Steps

CommandR is the foundation for Fusion's [Operations Framework](./PartO.md), which adds:
- Multi-host invalidation
- Operation logging and replay
- Transaction support with Entity Framework
