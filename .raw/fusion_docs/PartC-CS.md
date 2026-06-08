# CommandR: Cheat Sheet

Quick reference for commands, handlers, and the CommandR pipeline.

## Defining Commands

Basic command with result:

```cs
public record CreateOrderCommand(long UserId, List<OrderItem> Items) : ICommand<Order>
{
    public CreateOrderCommand() : this(0, new()) { } // Parameterless constructor for serialization
}
```

Command without result:

```cs
public record DeleteOrderCommand(long OrderId) : ICommand<Unit>
{
    public DeleteOrderCommand() : this(0) { }
}
```

## Command Interfaces

| Interface | Purpose |
|-----------|---------|
| `ICommand` | Base marker interface |
| `ICommand<TResult>` | Command with typed result |
| `IBackendCommand` | Server-only execution |
| `IOutermostCommand` | Forces top-level execution |
| `IDelegatingCommand` | Orchestrates other commands |
| `IPreparedCommand` | Requires `Prepare()` before execution |
| `ISystemCommand` | Framework-triggered commands |
| `ILocalCommand` | Self-executing commands |
| `IEventCommand` | Multi-handler events |
| `ISessionCommand` | Fusion session-bound commands |

## Registering CommandR

```cs
var services = new ServiceCollection();

// Add CommandR
var commander = services.AddCommander();

// Add handler classes
commander.AddHandlers<OrderHandlers>();

// Add command services (creates proxy)
commander.AddService<OrderService>();
```

## Handler Patterns

### Interface-Based Handler

```cs
public class CreateOrderHandler : ICommandHandler<CreateOrderCommand>
{
    public async Task OnCommand(
        CreateOrderCommand command,
        CommandContext context,
        CancellationToken ct)
    {
        // Handle command
    }
}

// Registration
services.AddScoped<CreateOrderHandler>();
commander.AddHandlers<CreateOrderHandler>();
```

### Convention-Based Handler

```cs
public class OrderHandlers
{
    [CommandHandler]
    public async Task<Order> CreateOrder(
        CreateOrderCommand command,
        IOrderRepository repo, // Resolved from DI
        CancellationToken ct)
    {
        return await repo.Create(command, ct);
    }
}

// Registration
services.AddScoped<OrderHandlers>();
commander.AddHandlers<OrderHandlers>();
```

### Command Service

```cs
public class OrderService : ICommandService
{
    [CommandHandler]
    public virtual async Task<Order> CreateOrder( // Must be virtual
        CreateOrderCommand command,
        CancellationToken ct)
    {
        // ...
    }
}

// Registration (creates proxy automatically)
commander.AddService<OrderService>();

// Always use Commander - direct calls throw!
await commander.Call(new CreateOrderCommand(...), ct);
// await orderService.CreateOrder(...); // Throws NotSupportedException!
```

### Filter Handler

```cs
[CommandHandler(Priority = 100, IsFilter = true)]
public async Task LoggingFilter(ICommand command, CancellationToken ct)
{
    var context = CommandContext.GetCurrent();
    Console.WriteLine($"Before: {command.GetType().Name}");
    try {
        await context.InvokeRemainingHandlers(ct);
    }
    finally {
        Console.WriteLine($"After: {command.GetType().Name}");
    }
}
```

## Executing Commands

```cs
var commander = services.Commander();

// Call - returns result, throws on error
var order = await commander.Call(new CreateOrderCommand(...), ct);

// Run - returns context, never throws
var context = await commander.Run(new CreateOrderCommand(...), ct);
if (context.UntypedResult is { Error: { } error })
    Console.WriteLine($"Error: {error}");

// Start - fire and forget
var context = commander.Start(new CreateOrderCommand(...));
```

## CommandContext

```cs
[CommandHandler]
public async Task<Order> CreateOrder(CreateOrderCommand command, CancellationToken ct)
{
    var context = CommandContext.GetCurrent();

    // Access services
    var db = context.Services.GetRequiredService<AppDbContext>();

    // Store data for other handlers
    context.Items["Key"] = value;

    // Access outer context (for nested commands)
    var root = context.OutermostContext;

    // Share data across nested calls
    root.Items["SharedKey"] = sharedValue;

    // Get commander
    var commander = context.Commander;
}
```

## Handler Priority

Higher priority = runs first. Default is 0.

| Range | Purpose |
|-------|---------|
| > 100,000 | Infrastructure (validation, tracing) |
| 10,000 - 100,000 | Cross-cutting concerns |
| 1,000 - 10,000 | Database/transaction |
| 0 - 1,000 | Business logic (default: 0) |
| < 0 | Post-processing |

## Built-in Handlers (Execution Order)

| Handler | Priority | Assembly |
|---------|----------|----------|
| `PreparedCommandHandler` | 1,000,000,000 | CommandR |
| `CommandTracer` | 998,000,000 | CommandR |
| `LocalCommandRunner` | 900,000,000 | CommandR |
| `RpcCommandHandler` | 800,000,000 | CommandR |
| `OperationReprocessor` | 100,000 | Fusion |
| `NestedOperationLogger` | 11,000 | Fusion |
| `InMemoryOperationScopeProvider` | 10,000 | Fusion |
| `DbOperationScopeProvider` | 1,000 | Fusion.EF |
| Your handlers | 0 | - |
| `InvalidatingCommandCompletionHandler` | 100 | Fusion |
| `CompletionTerminator` | -1,000,000,000 | Fusion |

## Local Commands

```cs
// Using LocalCommand factory
var cmd = LocalCommand.New(() => Console.WriteLine("Hello"));
var cmd = LocalCommand.New(async ct => await DoWorkAsync(ct));
var cmd = LocalCommand.New<int>(() => 42);

await commander.Call(cmd);
```

## Prepared Commands

```cs
public record CreateOrderCommand(...) : IPreparedCommand, ICommand<Order>
{
    public Task Prepare(CommandContext context, CancellationToken ct)
    {
        if (Items.Count == 0)
            throw new ArgumentException("Order must have items");
        return Task.CompletedTask;
    }
}
```

## With Operations Framework

```cs
[CommandHandler]
public virtual async Task<Order> CreateOrder(
    CreateOrderCommand command, CancellationToken ct)
{
    // Invalidation block (runs on all hosts)
    if (Invalidation.IsActive) {
        _ = GetOrders(command.UserId, default);
        return default!;
    }

    // Main logic (runs on originating host only)
    await using var db = await DbHub.CreateOperationDbContext(ct);
    var order = new Order { ... };
    db.Orders.Add(order);
    await db.SaveChangesAsync(ct);
    return order;
}
```

See [Part 5: Operations Framework](PartO.md) for details.
