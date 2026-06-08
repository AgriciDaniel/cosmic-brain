# Command Interfaces

CommandR provides a hierarchy of command interfaces that define how commands behave in the execution pipeline. Each interface triggers specific behaviors in the pipeline handlers.

## Base Interfaces

### `ICommand`

The root marker interface for all commands.

```cs
public interface ICommand;
```

**What happens when you implement it:**
- The command can be passed to `ICommander.Call()`, `Run()`, or `Start()`
- CommandR discovers handlers by scanning for methods that accept this command type
- The command goes through the full handler pipeline

### `ICommand<TResult>`

A generic command interface that specifies the return type.

```cs
public interface ICommand<TResult> : ICommand;
```

**What happens when you implement it:**
- `Commander.Call()` returns `Task<TResult>` with the strongly-typed result
- The `CommandContext<TResult>` is created with typed `Result` and `ResultTask` properties
- Handler methods can return `TResult` directly, and the framework captures it

**Usage:**

```cs
// Command returning a specific type
public record GetUserCommand(long UserId) : ICommand<User>;

// Command returning nothing (Unit is a void-like type)
public record DeleteUserCommand(long UserId) : ICommand<Unit>;
```

**Key point:** Always use `ICommand<Unit>` for commands without meaningful results, not just `ICommand`. This ensures proper type handling throughout the pipeline.

## Tagging Interfaces

Tagging interfaces modify pipeline behavior without adding methods. They're checked at specific points in the execution flow.

### `IBackendCommand`

Marks commands that can only be executed on backend servers.

```cs
public interface IBackendCommand : ICommand;
public interface IBackendCommand<TResult> : ICommand<TResult>, IBackendCommand;
```

**What happens when you implement it:**

1. **RPC Method Classification**: When the RPC system analyzes your service methods, any method accepting an `IBackendCommand` parameter is marked with `IsBackend = true` in `RpcMethodDef`.

2. **Scope Assignment**: Backend commands are assigned to `RpcDefaults.BackendScope` instead of `RpcDefaults.ApiScope`. This affects:
   - WebSocket endpoint routing (uses `BackendRequestPath` instead of `RequestPath`)
   - Peer version negotiation
   - Service scope resolution

3. **Call Timeouts**: Backend commands use different timeout settings (`BackendCommand` timeouts vs regular `Command` timeouts).

4. **Peer Validation**: When an RPC call arrives, the system checks if the calling peer is a backend peer. If a non-backend peer attempts to invoke a backend command, the call is rejected.

**When to use:**

```cs
// Internal command between backend services
public record SyncUserDataCommand(long UserId) : IBackendCommand<Unit>;

// Payment processing that must stay server-side
public record ProcessPaymentCommand(long OrderId, decimal Amount)
    : IBackendCommand<PaymentResult>;
```

### `IOutermostCommand`

Ensures the command always runs as the outermost (top-level) command.

```cs
public interface IOutermostCommand : ICommand;
```

**What happens when you implement it:**

In `CommandContext.New()`, this check occurs:

```cs
if (!isOutermost && (command is IOutermostCommand || Current?.UntypedCommand is IDelegatingCommand))
    isOutermost = true;
```

This means:
1. **New ServiceScope**: The command gets its own `IServiceScope` instead of sharing with the parent command
2. **Independent Context**: `OutermostContext` points to itself, not the parent
3. **Isolation**: Any data stored in `context.Items` is isolated from parent commands
4. **Separate Operation**: With Operations Framework, it starts a new operation instead of being nested

**When to use:** When a command must have complete isolation from any calling context:

```cs
// This command should never inherit state from a parent command
public record ResetSystemStateCommand : IOutermostCommand, ICommand<Unit>;
```

### `IDelegatingCommand`

Marks commands that orchestrate other commands without making direct changes.

```cs
public interface IDelegatingCommand : IOutermostCommand;
public interface IDelegatingCommand<TResult> : ICommand<TResult>, IDelegatingCommand;
```

**What happens when you implement it:**

1. **Outermost Execution**: Since it extends `IOutermostCommand`, it always runs as outermost with its own scope.

2. **Nested Commands Also Outermost**: When you call another command from within a delegating command handler, that nested command also becomes outermost:

   ```cs
   // In CommandContext.New():
   if (Current?.UntypedCommand is IDelegatingCommand)
       isOutermost = true;
   ```

3. **Operations Framework Bypass**: In `InvalidatingCommandCompletionHandler.IsRequired()`:

   ```cs
   if (command is null or IDelegatingCommand) {
       finalHandler = null;
       return false;  // No invalidation needed
   }
   ```

   This means:
   - The delegating command itself is not logged to the operation log
   - No invalidation pass runs for the delegating command
   - You don't need `if (Invalidation.IsActive) { ... }` blocks

4. **Each Sub-Command is Independent**: Each command you call gets its own operation, transaction, and invalidation handling.

**When to use:**

```cs
public record ProcessBatchOrdersCommand(long[] OrderIds)
    : IDelegatingCommand<BatchResult>
{
    public ProcessBatchOrdersCommand() : this(Array.Empty<long>()) { }
}

[CommandHandler]
public virtual async Task<BatchResult> ProcessBatch(
    ProcessBatchOrdersCommand command, CancellationToken ct)
{
    // No Invalidation.IsActive check needed!
    var results = new List<OrderResult>();
    foreach (var orderId in command.OrderIds) {
        // Each ProcessOrderCommand runs as its own outermost command
        // with full pipeline, separate transaction, and invalidation
        var result = await Commander.Call(new ProcessOrderCommand(orderId), ct);
        results.Add(result);
    }
    return new BatchResult(results);
}
```

### `ISystemCommand`

Marks commands triggered as a consequence of another command.

```cs
public interface ISystemCommand : ICommand<Unit>;
```

**What happens when you implement it:**

1. **Always Returns Unit**: System commands are side-effect-only and don't return meaningful results.

2. **Relaxed Interceptor Checks**: In `CommandServiceInterceptor`, system commands bypass certain validation:

   ```cs
   if (!ReferenceEquals(invocationCommand, contextCommand) && contextCommand is not ISystemCommand) {
       throw Errors.DirectCommandHandlerCallsAreNotAllowed();
   }
   ```

   This allows system commands to be invoked with different command instances than what's in the current context.

**When to use:** For framework-level commands like completion commands:

```cs
// Used internally by Operations Framework
public record Completion<TCommand>(Operation Operation) : ISystemCommand
    where TCommand : class, ICommand;
```

### `IPreparedCommand`

Commands that require a preparation phase before execution.

```cs
public interface IPreparedCommand : ICommand
{
    Task Prepare(CommandContext context, CancellationToken cancellationToken);
}
```

**What happens when you implement it:**

1. **PreparedCommandHandler Intercepts**: At priority 1,000,000,000 (highest), `PreparedCommandHandler` checks every command:

   ```cs
   if (command is IPreparedCommand preparedCommand)
       await preparedCommand.Prepare(context, cancellationToken);
   await context.InvokeRemainingHandlers(cancellationToken);
   ```

2. **Runs Before Everything**: Since it has the highest priority, `Prepare()` runs before:
   - `CommandTracer` (tracing/logging)
   - `LocalCommandRunner`
   - `RpcCommandHandler` (routing)
   - All Operations Framework handlers
   - Your handlers

3. **Validation and Normalization**: Use it for validation that should fail fast, before any resources are allocated.

**When to use:**

```cs
public record CreateOrderCommand(long UserId, List<OrderItem> Items)
    : IPreparedCommand, ICommand<Order>
{
    public CreateOrderCommand() : this(0, new()) { }

    public Task Prepare(CommandContext context, CancellationToken ct)
    {
        // Validation - fails before any handler runs
        if (Items.Count == 0)
            throw new ValidationException("Order must have at least one item");

        if (Items.Any(i => i.Quantity <= 0))
            throw new ValidationException("All items must have positive quantity");

        // Normalization
        foreach (var item in Items)
            item.ProductId = item.ProductId.Trim().ToUpperInvariant();

        return Task.CompletedTask;
    }
}
```

## Behavioral Interfaces

### `ILocalCommand`

Commands that execute using built-in logic without needing a separate handler.

```cs
public interface ILocalCommand : ICommand
{
    Task Run(CommandContext context, CancellationToken cancellationToken);
}

public interface ILocalCommand<T> : ICommand<T>, ILocalCommand;
```

**What happens when you implement it:**

1. **LocalCommandRunner Executes It**: At priority 900,000,000, `LocalCommandRunner` checks:

   ```cs
   if (command is ILocalCommand localCommand)
       await localCommand.Run(context, cancellationToken);
   ```

2. **No Handler Registration Needed**: The command itself contains the execution logic.

3. **Still Goes Through Pipeline**: Other handlers (tracing, preparation, Operations Framework) still run.

**When to use:**

```cs
public record LogMessageCommand(string Message) : ILocalCommand
{
    public Task Run(CommandContext context, CancellationToken ct)
    {
        var logger = context.Services.GetRequiredService<ILogger<LogMessageCommand>>();
        logger.LogInformation("{Message}", Message);
        return Task.CompletedTask;
    }
}
```

### `LocalCommand` Base Class

Factory methods for creating local commands inline:

```cs
// Action-based (returns Unit)
var cmd = LocalCommand.New(() => Console.WriteLine("Hello"));
var cmd = LocalCommand.New(ct => SomeAsyncWork(ct));
var cmd = LocalCommand.New((ctx, ct) => WorkWithContext(ctx, ct));

// Func-based (returns a value)
var cmd = LocalCommand.New(() => 42);
var cmd = LocalCommand.New(ct => GetValueAsync(ct));
var cmd = LocalCommand.New<string>((ctx, ct) => GetResultAsync(ctx, ct));

await commander.Call(cmd);
```

**When to use:** For one-off commands where defining a separate class is overkill:

```cs
// Execute a cleanup action through the command pipeline
await commander.Call(LocalCommand.New(async ct => {
    await cache.ClearAsync(ct);
    await tempFiles.DeleteAllAsync(ct);
}));
```

### `IEventCommand`

Commands representing events with potentially multiple handlers running in parallel.

```cs
public interface IEventCommand : ICommand<Unit>
{
    string ChainId { get; init; }
}
```

**What happens when you implement it:**

1. **Parallel Handler Chains**: When you run an `IEventCommand` without a `ChainId` (empty string), the `Commander.Run()` method detects this and calls `RunEvent()` instead of `RunCommand()`:

   ```cs
   if (command is IEventCommand eventCommand && eventCommand.ChainId.IsNullOrEmpty())
       return RunEvent(eventCommand, context, cancellationToken);
   ```

2. **Handler Chain Resolution**: For event commands, `CommandHandlerResolver` builds a separate handler chain for each non-filter handler. Each chain contains all filter handlers plus one specific final handler:

   ```cs
   var handlerChains = (
       from nonFilterHandler in nonFilterHandlers
       let handlerSubset = handlers.Where(h => h.IsFilter || h == nonFilterHandler).ToArray()
       select KeyValuePair.Create(nonFilterHandler.Id, new CommandHandlerChain(handlerSubset))
   ).ToImmutableDictionary();
   ```

3. **Parallel Execution**: `RunEvent()` clones the command for each handler chain, sets `ChainId` to the handler's Id, and runs all chains in parallel:

   ```cs
   foreach (var (chainId, _) in handlerChains) {
       var chainCommand = MemberwiseCloner.Invoke(command);
       ChainIdSetter.Invoke(chainCommand, chainId);
       callTasks[i++] = this.Call(chainCommand, context.IsOutermost, cancellationToken);
   }
   await Task.WhenAll(callTasks);
   ```

4. **ChainId Purpose**: When a command has `ChainId` set, `GetHandlerChain()` looks up the specific handler chain by that Id, executing only that chain's pipeline. This is how the parallel execution works - each cloned command with its `ChainId` runs through a single handler chain.

**When to use:**

```cs
public record OrderCreatedEvent(Order Order) : IEventCommand
{
    public string ChainId { get; init; } = "";
}

// Each handler gets its own parallel execution chain
public class NotificationHandlers
{
    [CommandHandler]
    public Task SendEmail(OrderCreatedEvent evt, CancellationToken ct) { ... }

    [CommandHandler]
    public Task UpdateAnalytics(OrderCreatedEvent evt, CancellationToken ct) { ... }

    [CommandHandler]
    public Task NotifyWarehouse(OrderCreatedEvent evt, CancellationToken ct) { ... }
}

// When you call:
await commander.Call(new OrderCreatedEvent(order));

// Commander internally creates 3 parallel calls:
// - OrderCreatedEvent { ChainId = "SendEmail handler id" }
// - OrderCreatedEvent { ChainId = "UpdateAnalytics handler id" }
// - OrderCreatedEvent { ChainId = "NotifyWarehouse handler id" }
```

## Fusion-Specific Interfaces

### `IComputeService`

While not a command interface, it's important to understand:

```cs
public interface IComputeService : ICommandService;
```

**What this means:**
- All compute services are automatically command services
- You can add `[CommandHandler]` methods to any compute service
- No need to implement `ICommandService` separately

### `ISessionCommand`

Commands associated with a user session.

```cs
public interface ISessionCommand : ICommand
{
    Session Session { get; init; }
}

public interface ISessionCommand<TResult> : ICommand<TResult>, ISessionCommand;
```

**What happens when you implement it:**

1. **Session Property**: The command carries the user's session, enabling user-specific operations.

2. **Automatic Session Resolution via RPC**: When a session command arrives via RPC, `RpcDefaultSessionReplacer` (an `IRpcMiddleware` registered by `FusionWebServerBuilder`) intercepts it and replaces the default session with the connection's session:

   ```cs
   // In RpcDefaultSessionReplacer.Create<T>():
   if (typeof(ISessionCommand).IsAssignableFrom(p0Type))
       return call => {
           if (!HasSessionBoundRpcConnection(call, out var connection))
               return next.Invoke(call);

           var command = (ISessionCommand?)args.Get0Untyped();
           var session = command.Session;
           if (session.IsDefault())
               command.SetSession(connection.Session);  // Replace with connection's session
           else
               session.RequireValid();  // Validate non-default sessions
           return next.Invoke(call);
       };
   ```

   This means:
   - Clients can send commands with `Session.Default` (empty session)
   - The server automatically fills in the actual session from `SessionBoundRpcConnection`
   - Non-default sessions are validated via `RequireValid()`

3. **Assembly**: `RpcDefaultSessionReplacer` is in `ActualLab.Fusion.Server` and registered via:
   ```cs
   // In FusionWebServerBuilder constructor:
   rpc.AddMiddleware(_ => new RpcDefaultSessionReplacer());
   ```

4. **Extension Methods**: `SessionCommandExt` provides helpers for manual session handling:
   - `SetSession()` - Sets the session property (works around `init` accessor)
   - `UseDefaultSession(ISessionResolver)` - Replaces default session with resolver's session
   - `UseDefaultSession(IServiceProvider)` - Same, but resolves `ISessionResolver` from DI

**When to use:**

```cs
public record UpdateProfileCommand(string Name, string Bio)
    : ISessionCommand<Unit>
{
    public Session Session { get; init; }
    public UpdateProfileCommand() : this("", "") { }
}

// Client-side: can use Session.Default, server will replace it
await commander.Call(new UpdateProfileCommand("John", "Developer") {
    Session = Session.Default  // Will be replaced by RpcDefaultSessionReplacer
});

// Server-side handler:
[CommandHandler]
public virtual async Task<Unit> UpdateProfile(
    UpdateProfileCommand command, CancellationToken ct)
{
    // command.Session is now the actual session from the RPC connection
    var user = await Auth.GetUser(command.Session, ct);
    if (user == null)
        throw new UnauthorizedAccessException();

    // Update profile...
    return default;
}
```

## Interface Hierarchy Diagram

```
ICommand (base marker)
├── ICommand<TResult> (typed result)
│
├── IBackendCommand (server-only, checked by RPC layer)
│   └── IBackendCommand<TResult>
│
├── IOutermostCommand (forces new ServiceScope)
│   └── IDelegatingCommand (orchestration, bypasses OF)
│       └── IDelegatingCommand<TResult>
│
├── IPreparedCommand (Prepare() called first)
│
├── ISystemCommand : ICommand<Unit> (relaxed interceptor checks)
│
├── ILocalCommand (Run() called by LocalCommandRunner)
│   └── ILocalCommand<T>
│
├── IEventCommand : ICommand<Unit> (multiple handlers)
│
└── ISessionCommand (carries Session)
    └── ISessionCommand<TResult>

ICommandService (services with command handlers)
└── IComputeService (all compute services are command services)
```

## Combining Interfaces

Commands can implement multiple interfaces:

```cs
// Backend-only, session-bound command with validation
public record SecureTransactionCommand(decimal Amount)
    : IBackendCommand<TransactionResult>,
      ISessionCommand<TransactionResult>,
      IPreparedCommand
{
    public Session Session { get; init; }
    public SecureTransactionCommand() : this(0) { }

    public Task Prepare(CommandContext context, CancellationToken ct)
    {
        if (Amount <= 0)
            throw new ArgumentException("Amount must be positive");
        return Task.CompletedTask;
    }
}
```

**What happens:**
1. `IPreparedCommand.Prepare()` runs first (priority 1B)
2. `IBackendCommand` ensures only backend peers can invoke it via RPC
3. `ISessionCommand` carries the user session for authentication

## Best Practices

1. **Always use `ICommand<TResult>`** - Even for void commands, use `ICommand<Unit>`.

2. **Use `IPreparedCommand` for validation** - Fail fast before handlers allocate resources.

3. **Use `IBackendCommand` liberally** - Any command that shouldn't be callable from clients.

4. **Use `IDelegatingCommand` for orchestration** - Avoids duplicate Operations Framework overhead.

5. **Include parameterless constructors** - Required for serialization (RPC, operation log).

6. **Prefer records** - Immutability and value equality work well with commands.
