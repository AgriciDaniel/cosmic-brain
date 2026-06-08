# Operations Framework: Multi-Host Invalidation, CQRS, and Reliable Command Processing

The Operations Framework (OF) provides a robust foundation for building distributed systems with Fusion.
It solves several critical challenges that arise when running multiple instances of an application:

- **Multi-host cache invalidation**: When data changes on one server, all other servers must invalidate
  their cached computed values
- **Reliable command processing**: Commands must be executed exactly once, even in the face of failures
- **Event-driven architecture**: Commands can produce events that are processed asynchronously with
  guaranteed delivery

## Why Do You Need Operations Framework?

Consider a typical multi-server deployment:

<img src="/img/diagrams/PartO-1.svg" alt="Why Do You Need Operations Framework?" style="width: 100%; max-width: 800px;" />

When a user on Server A updates their profile:
1. Server A writes to the database and invalidates its local cache
2. Servers B and C still have stale data in their caches
3. Users connected to B and C see outdated information

**Without Operations Framework**, you'd have to implement:
- A message queue or pub/sub system for cross-server notifications
- Retry logic for failed operations
- Deduplication to prevent processing the same operation twice
- Transaction handling to ensure atomicity

**With Operations Framework**, all of this is handled automatically.

## Required Packages

| Package | Purpose |
|---------|---------|
| [ActualLab.Fusion](https://www.nuget.org/packages/ActualLab.Fusion/) | Core OF abstractions and in-memory implementation |
| [ActualLab.Fusion.EntityFramework](https://www.nuget.org/packages/ActualLab.Fusion.EntityFramework/) | EF Core implementation: `DbOperationScope`, operation logging, `DbContext` integration |
| [ActualLab.Fusion.EntityFramework.Npgsql](https://www.nuget.org/packages/ActualLab.Fusion.EntityFramework.Npgsql/) | PostgreSQL: `NpgsqlOperationLogWatcher` for LISTEN/NOTIFY |
| [ActualLab.Fusion.EntityFramework.Redis](https://www.nuget.org/packages/ActualLab.Fusion.EntityFramework.Redis/) | Redis: `RedisOperationLogWatcher` for pub/sub notifications |

::: tip
The base `ActualLab.Fusion.EntityFramework` package includes `FileSystemOperationLogWatcher` which works with any database but requires shared filesystem access. For production multi-host deployments, use database-specific watchers (Npgsql) or Redis.
:::

## The Outbox Pattern

Operations Framework implements the **Transactional Outbox Pattern** &ndash; a well-known solution
for reliable messaging in distributed systems.

### The Problem

In distributed systems, you often need to:
1. Update your database
2. Publish a message/event to notify other services

But what if step 2 fails after step 1 succeeds? You have inconsistent state.

### The Solution: Outbox Pattern

Instead of publishing directly, write the message to an "outbox" table in the **same transaction**
as your business data:

<img src="/img/diagrams/PartO-2.svg" alt="The Solution: Outbox Pattern" style="width: 100%; max-width: 800px;" />

This guarantees **at-least-once delivery**: if the transaction commits, the operation will
eventually be processed. If it fails, nothing is written.

### How OF Implements It

1. **DbOperationScope** wraps your command in a database transaction
2. **DbOperation** entity stores the operation in the same transaction
3. **DbOperationLogReader** (background service) watches for new operations
4. **Operation Log Watchers** provide instant notifications (PostgreSQL NOTIFY, Redis Pub/Sub, etc.)
5. **OperationCompletionNotifier** triggers invalidation on all hosts

## Core Concepts

### Operation

An **Operation** represents an action that can be logged and replayed. Currently, only commands
act as operations, but the framework is designed to support other types in the future.

Key properties:
- `Uuid` &ndash; Unique identifier
- `HostId` &ndash; The server that executed the operation
- `Command` &ndash; The command that was executed
- `Items` &ndash; Data passed between execution and invalidation phases
- `NestedOperations` &ndash; Child operations executed during this operation
- `Events` &ndash; Events produced by this operation

### Operation Scope

An **Operation Scope** provides the context for operation execution:

- **DbOperationScope**: Persistent operations stored in database (default for database commands)
- **InMemoryOperationScope**: Transient operations that don't persist (for in-memory commands)

### Invalidation Mode

When an operation is "replayed" on other hosts, it runs in **invalidation mode**:
- The command handler's main logic is skipped
- Only the invalidation block executes
- This ensures all hosts invalidate the same computed values

## Quick Start

### 1. Add DbSet for Operations

<!-- snippet: PartO_DbSet -->
```cs
public DbSet<DbOperation> Operations { get; protected set; } = null!;
public DbSet<DbEvent> Events { get; protected set; } = null!;
```
<!-- endSnippet -->

### 2. Configure Services

<!-- snippet: PartO_AddDbContextServices -->
```cs
public static void ConfigureServices(IServiceCollection services, IHostEnvironment Env)
{
    services.AddDbContextServices<AppDbContext>(db => {
        // Uncomment if you'll be using AddRedisOperationLogWatcher
        // db.AddRedisDb("localhost", "FusionDocumentation.PartO");

        db.AddOperations(operations => {
            // This call enabled Operations Framework (OF) for AppDbContext.
            operations.ConfigureOperationLogReader(_ => new() {
                // We use AddFileSystemOperationLogWatcher, so unconditional wake up period
                // can be arbitrary long – all depends on the reliability of Notifier-Monitor chain.
                // See what .ToRandom does – most of timeouts in Fusion settings are RandomTimeSpan-s,
                // but you can provide a normal one too – there is an implicit conversion from it.
                CheckPeriod = TimeSpan.FromSeconds(Env.IsDevelopment() ? 60 : 5).ToRandom(0.05),
            });
            // Optionally enable file-based operation log watcher
            operations.AddFileSystemOperationLogWatcher();

            // Or, if you use PostgreSQL, use this instead of above line
            // operations.AddNpgsqlOperationLogWatcher();

            // Or, if you use Redis, use this instead of above line
            // operations.AddRedisOperationLogWatcher();
        });
    });
}
```
<!-- endSnippet -->

> Note: OF works solely on the server side, so you don't need similar configuration
> in your Blazor WebAssembly client.

### 3. Create Command and Handler

<!-- snippet: PartO_PostMessageCommand -->
```cs
public record PostMessageCommand(Session Session, string Text) : ICommand<ChatMessage>;
```
<!-- endSnippet -->

<!-- snippet: PartO_PostOfHandler -->
```cs
[CommandHandler]
public virtual async Task<ChatMessage> PostMessage(
    PostMessageCommand command, CancellationToken cancellationToken = default)
{
    if (Invalidation.IsActive) {
        _ = PseudoGetAnyChatTail();
        return default!;
    }

    await using var dbContext = await DbHub.CreateOperationDbContext(cancellationToken);
    // Actual code...
    var message = await PostMessageImpl(dbContext, command, cancellationToken);
    return message;
}
```
<!-- endSnippet -->

## Command Handler Structure

A command handler with Operations Framework follows this pattern:

```cs
[CommandHandler]
public virtual async Task<TResult> HandleCommand(
    TCommand command, CancellationToken cancellationToken = default)
{
    // 1. INVALIDATION BLOCK - runs on ALL hosts after successful execution
    if (Invalidation.IsActive) {
        // Invalidate computed values that depend on the data being changed
        _ = GetSomeData(command.Id, default);
        _ = GetRelatedData(command.RelatedId, default);
        return default!;  // Return value is ignored in invalidation mode
    }

    // 2. MAIN LOGIC - runs only on the originating host
    await using var dbContext = await DbHub.CreateOperationDbContext(cancellationToken);

    // Perform your business logic
    var result = await DoWork(dbContext, command, cancellationToken);

    await dbContext.SaveChangesAsync(cancellationToken);
    return result;
}
```

### Key Points

1. **`virtual` modifier** &ndash; Required for Fusion's proxy generation
2. **`[CommandHandler]` attribute** &ndash; Registers this method as a command handler
3. **`Invalidation.IsActive` check** &ndash; First thing in the method
4. **`CreateOperationDbContext`** &ndash; Creates a DbContext that participates in the operation scope

## Passing Data to Invalidation Block

The invalidation block runs on all hosts, but the main logic only runs on the originating host.
To pass data from main logic to invalidation, use `Operation.Items`:

<!-- snippet: PartO_SignOutHandler -->
```cs
public virtual async Task SignOut(
    SignOutCommand command, CancellationToken cancellationToken = default)
{
    // ...
    var context = CommandContext.GetCurrent();
    if (Invalidation.IsActive) {
        // Fetch operation item
        var invSessionInfo = context.Operation.Items.KeylessGet<SessionInfo>();
        if (invSessionInfo is not null) {
            // Use it
            _ = GetUser(invSessionInfo.UserId, default);
            _ = GetUserSessions(invSessionInfo.UserId, default);
        }
        return;
    }

    await using var dbContext = await DbHub.CreateOperationDbContext(cancellationToken).ConfigureAwait(false);

    var dbSessionInfo = await Sessions.FindOrCreate(dbContext, command.Session, cancellationToken).ConfigureAwait(false);
    var sessionInfo = dbSessionInfo.ToModel();
    if (sessionInfo.IsSignOutForced)
        return;

    // Store operation item for invalidation logic
    context.Operation.Items.KeylessSet(sessionInfo);
    // ...
}
```
<!-- endSnippet -->

### How It Works

1. **During execution**: Store data with `context.Operation.Items.KeylessSet(value)`
2. **During invalidation**: Retrieve data with `context.Operation.Items.KeylessGet<T>()`
3. **Serialization**: Items are JSON-serialized and stored with the operation in the database

> **Note**: `Operation.Items` differs from `CommandContext.Items`:
> - `CommandContext.Items` exists only during command execution on the originating host
> - `Operation.Items` is persisted and available on all hosts during invalidation

## Nested Commands

When one command calls another, the nested command is automatically logged and its invalidation
logic runs on all hosts:

```cs
[CommandHandler]
public virtual async Task<Order> CreateOrder(
    CreateOrderCommand command, CancellationToken cancellationToken = default)
{
    if (Invalidation.IsActive) {
        _ = GetOrder(command.OrderId, default);
        return default!;
    }

    await using var dbContext = await DbHub.CreateOperationDbContext(cancellationToken);

    var order = new Order { /* ... */ };
    dbContext.Orders.Add(order);
    await dbContext.SaveChangesAsync(cancellationToken);

    // This nested command is automatically logged
    await Commander.Call(new SendOrderConfirmationCommand(order.Id), cancellationToken);

    return order;
}
```

The nested command's `Operation.Items` are captured independently, so there's no collision
with the parent command's items.

## Command Pipeline

Operations Framework adds several filtering handlers to the command pipeline:

| Priority | Handler | Purpose |
|----------|---------|---------|
| 100,000 | `OperationReprocessor` | Retries commands that fail with transient errors |
| 11,000 | `NestedOperationLogger` | Logs nested commands and their items |
| 10,000 | `InMemoryOperationScopeProvider` | Provides transient scope, runs completion |
| 1,000 | `DbOperationScopeProvider` | Provides database scope for each DbContext type |
| 100 | `InvalidatingCommandCompletionHandler` | Runs invalidation for completed operations |

## Backend Commands

Commands that should only execute on the server should implement `IBackendCommand`:

```cs
public record DeleteUserCommand(UserId UserId) : ICommand<Unit>, IBackendCommand;
```

This ensures:
- The command can only be processed by backend servers
- Client-side proxies won't attempt to handle it
- RPC layer enforces server-side execution

## Further Reading

- [Events](./PartO-EV.md) &ndash; Producing and consuming events from operations
- [Transient Operations and Reprocessing](./PartO-TR.md) &ndash; In-memory operations and retry logic
- [Configuration Options](./PartO-CO.md) &ndash; All configuration options explained
- [Log Watchers](./PartO-PR.md) &ndash; PostgreSQL, Redis, FileSystem log watchers
- [Diagrams](./PartO-D.md) &ndash; Visual representations of OF internals
- [Cheat Sheet](./PartO-CS.md) &ndash; Quick reference

## Learning More

To explore OF's internals, check out:

- [`DbContextBuilder.AddOperations`](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.EntityFramework/DbOperationsBuilder.cs)
- [`FusionBuilder`](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion/FusionBuilder.cs)

### HostId

`HostId` identifies each process in your cluster. It includes:
- Machine name
- Unique process ID
- Unique ID per IoC container (useful for testing)

This allows OF to determine if an operation originated locally or from a peer.

### InvalidatingCommandCompletionHandler

The logic that determines whether a command requires invalidation is in
`InvalidatingCommandCompletionHandler.IsRequired()`. It returns `true` for any command
with a final handler whose service implements `IComputeService`, but not for compute
service clients (when `RpcServiceMode.Client` is set).

## Getting Help

If you run into issues, join [Fusion Place](https://voxt.ai/chat/s-1KCdcYy9z2-uJVPKZsbEo)
and ask questions. The author (Alex Y.) is active and happy to help.
