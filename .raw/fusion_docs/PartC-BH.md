# Built-in Command Handlers

CommandR and Fusion include several built-in command handlers that form the execution pipeline. Understanding these handlers helps you design your own handlers and debug issues.

## Handler Execution Order

Handlers execute in **descending priority order** (highest priority runs first). Filter handlers wrap lower-priority handlers, creating a middleware-like pipeline.

## CommandR Handlers

These handlers are registered automatically when you call `AddCommander()`.

**Assembly:** `ActualLab.CommandR`

| Handler | Priority | Type | Command Type |
|---------|----------|------|--------------|
| `PreparedCommandHandler` | 1,000,000,000 | Filter | `IPreparedCommand` |
| `CommandTracer` | 998,000,000 | Filter | `ICommand` |
| `LocalCommandRunner` | 900,000,000 | Final | `ILocalCommand` |
| `RpcCommandHandler` | 800,000,000 | Filter | `ICommand` |

### PreparedCommandHandler

**Priority:** 1,000,000,000 (runs first)

Handles commands implementing `IPreparedCommand` by calling their `Prepare` method before invoking remaining handlers.

<!-- snippet: PartCBH_PreparedCommandHandlerReg -->
```cs
// Registration (automatic in AddCommander)
services.AddSingleton(_ => new PreparedCommandHandler());
commander.AddHandlers<PreparedCommandHandler>();
```
<!-- endSnippet -->

### CommandTracer

**Priority:** 998,000,000

Provides diagnostic tracing and activity tracking for command execution. Creates OpenTelemetry activities for observability and logs errors.

<!-- snippet: PartCBH_CommandTracerReg -->
```cs
// Registration (automatic in AddCommander)
services.AddSingleton(c => new CommandTracer(c));
commander.AddHandlers<CommandTracer>();
```
<!-- endSnippet -->

### LocalCommandRunner

**Priority:** 900,000,000

Executes commands implementing `ILocalCommand` by calling their `Run` method. Unlike filter handlers, `LocalCommandRunner` doesn't call `InvokeRemainingHandlers` — it fully handles `ILocalCommand` by executing its `Run()` method and returns.

<!-- snippet: PartCBH_LocalCommandRunnerReg -->
```cs
// Registration (automatic in AddCommander)
services.AddSingleton(_ => new LocalCommandRunner());
commander.AddHandlers<LocalCommandRunner>();
```
<!-- endSnippet -->

### RpcCommandHandler

**Priority:** 800,000,000

Routes commands to RPC services when appropriate. Handles distributed command execution and automatic rerouting to the correct server.

<!-- snippet: PartCBH_RpcCommandHandlerReg -->
```cs
// Registration (automatic in AddCommander)
services.AddSingleton(c => new RpcCommandHandler(c));
commander.AddHandlers<RpcCommandHandler>();
```
<!-- endSnippet -->

## Fusion Operations Framework Handlers

These handlers are registered when you call `AddFusion()`. They implement multi-host invalidation and operation logging.

**Assembly:** `ActualLab.Fusion`

| Handler | Priority | Type | Command Type |
|---------|----------|------|--------------|
| `OperationReprocessor` | 100,000 | Filter | `ICommand` |
| `NestedOperationLogger` | 11,000 | Filter | `ICommand` |
| `InMemoryOperationScopeProvider` | 10,000 | Filter | `ICommand` |
| `InvalidatingCommandCompletionHandler` | 100 | Filter | `ICompletion` |
| `CompletionTerminator` | -1,000,000,000 | Final | `ICompletion` |

### OperationReprocessor

**Priority:** 100,000

Retries failed commands with transient errors using configurable retry policies.

<!-- snippet: PartCBH_OperationReprocessorReg -->
```cs
// Registration (optional, via AddOperationReprocessor)
fusion.AddOperationReprocessor();
```
<!-- endSnippet -->

See [Part 5: Operations Framework](PartO.md) for details.

### NestedOperationLogger

**Priority:** 11,000

Captures nested command invocations and logs them for invalidation replay on other hosts.

<!-- snippet: PartCBH_NestedOperationLoggerReg -->
```cs
// Registration (automatic in AddFusion)
services.AddSingleton(c => new NestedOperationLogger(c));
commander.AddHandlers<NestedOperationLogger>();
```
<!-- endSnippet -->

See [Part 5: Operations Framework](PartO.md) for details.

### InMemoryOperationScopeProvider

**Priority:** 10,000

Provides in-memory operation scopes for commands that don't use database-backed operation scopes. Also triggers operation completion notifications.

<!-- snippet: PartCBH_InMemoryOperationScopeProviderReg -->
```cs
// Registration (automatic in AddFusion)
services.AddSingleton(c => new InMemoryOperationScopeProvider(c));
commander.AddHandlers<InMemoryOperationScopeProvider>();
```
<!-- endSnippet -->

See [Part 5: Operations Framework](PartO.md) for details.

### InvalidatingCommandCompletionHandler

**Priority:** 100

Handles command completion by running the invalidation pass. Re-executes the original command and its nested commands in invalidation mode.

<!-- snippet: PartCBH_InvalidatingCommandCompletionHandlerReg -->
```cs
// Registration (automatic in AddFusion)
services.AddSingleton(_ => new InvalidatingCommandCompletionHandler.Options());
services.AddSingleton(c => new InvalidatingCommandCompletionHandler(
    c.GetRequiredService<InvalidatingCommandCompletionHandler.Options>(), c));
commander.AddHandlers<InvalidatingCommandCompletionHandler>();
```
<!-- endSnippet -->

See [Part 5: Operations Framework](PartO.md) for details.

### CompletionTerminator

**Priority:** -1,000,000,000 (runs last)

Terminal handler for completion commands. Ensures the completion pipeline has a final handler.

<!-- snippet: PartCBH_CompletionTerminatorReg -->
```cs
// Registration (automatic in AddFusion)
services.AddSingleton(_ => new CompletionTerminator());
commander.AddHandlers<CompletionTerminator>();
```
<!-- endSnippet -->

## Entity Framework Handlers

These handlers are registered when you call `AddOperations()` on a `DbContextBuilder`.

**Assembly:** `ActualLab.Fusion.EntityFramework`

| Handler | Priority | Type | Command Type |
|---------|----------|------|--------------|
| `DbOperationScopeProvider` | 1,000 | Filter | `ICommand` |

### DbOperationScopeProvider

**Priority:** 1,000

Provides database operation scopes for database-backed operations. Manages transactions and ensures operations are logged to the database.

<!-- snippet: PartCBH_DbOperationScopeProviderReg -->
```cs
// Registration (via AddOperations on DbContextBuilder)
services.AddDbContextServices<AppDbContext>(db => {
    db.AddOperations(operations => {
        // DbOperationScopeProvider is registered here
    });
});
```
<!-- endSnippet -->

See [Part 5: Operations Framework](PartO.md) for details.

## Complete Pipeline Visualization

When all handlers are registered, the pipeline looks like this (in execution order):

```
Command Received
    │
    ▼
┌─────────────────────────────────────────┐
│ PreparedCommandHandler (1,000,000,000)  │ ← Calls IPreparedCommand.Prepare()
└─────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────┐
│ CommandTracer (998,000,000)             │ ← Creates activity, logs errors
└─────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────┐
│ LocalCommandRunner (900,000,000)        │ ← Runs ILocalCommand.Run() if applicable
└─────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────┐
│ RpcCommandHandler (800,000,000)         │ ← Routes to RPC if needed
└─────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────┐
│ OperationReprocessor (100,000)          │ ← Retries on transient errors
└─────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────┐
│ NestedOperationLogger (11,000)          │ ← Logs nested commands
└─────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────┐
│ InMemoryOperationScopeProvider (10,000) │ ← Provides operation scope
└─────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────┐
│ DbOperationScopeProvider (1,000)        │ ← Provides DB operation scope
└─────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────┐
│ Your Handlers (default priority: 0)     │ ← Your command handlers
└─────────────────────────────────────────┘
```

For completion commands (`ICompletion<T>`):

```
Completion Command
    │
    ▼
┌─────────────────────────────────────────┐
│ InvalidatingCommandCompletionHandler    │ ← Runs invalidation pass
│ (100)                                   │
└─────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────┐
│ CompletionTerminator (-1,000,000,000)   │ ← Terminal handler
└─────────────────────────────────────────┘
```

## Adding Custom Handlers

### Filter Handler

A filter handler wraps subsequent handlers (like middleware):

<!-- snippet: PartCBH_FilterHandlerExample -->
```cs
public class LoggingHandler : ICommandHandler<ICommand>
{
    [CommandHandler(Priority = 500_000, IsFilter = true)]
    public async Task OnCommand(ICommand command, CommandContext context, CancellationToken ct)
    {
        Console.WriteLine($"Before: {command.GetType().Name}");
        try {
            await context.InvokeRemainingHandlers(ct);
        }
        finally {
            Console.WriteLine($"After: {command.GetType().Name}");
        }
    }
}

// Registration:
// services.AddSingleton<LoggingHandler>();
// commander.AddHandlers<LoggingHandler>();
```
<!-- endSnippet -->

### Final Handler

A final handler doesn't call `InvokeRemainingHandlers`:

<!-- snippet: PartCBH_FinalHandlerExample -->
```cs
public class MyCommandHandler : ICommandHandler<MyCommand>
{
    public async Task OnCommand(MyCommand command, CommandContext context, CancellationToken ct)
    {
        // Handle the command - don't call InvokeRemainingHandlers
        await DoWork(command, ct);
    }

    private Task DoWork(MyCommand command, CancellationToken ct) => Task.CompletedTask;
}
```
<!-- endSnippet -->

## Priority Guidelines

When choosing priorities for custom handlers:

| Range | Purpose |
|-------|---------|
| > 100,000 | Infrastructure handlers (validation, tracing, RPC routing) |
| 10,000 - 100,000 | Cross-cutting concerns (logging, caching, retry logic) |
| 1,000 - 10,000 | Database/transaction management |
| 0 - 1,000 | Business logic handlers (default: 0) |
| < 0 | Post-processing, cleanup handlers |

Your custom handlers typically use the default priority (0) unless they need to run before/after specific built-in handlers.
