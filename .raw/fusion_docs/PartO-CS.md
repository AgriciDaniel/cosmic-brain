# Operations Framework: Cheat Sheet

Quick reference for multi-host invalidation, events, and operation reprocessing.

## Setup

### Basic Configuration

<!-- snippet: PartOCS_BasicConfiguration -->
```cs
var fusion = services.AddFusion();
fusion.AddOperationReprocessor();  // Enable retry for transient errors

services.AddDbContextServices<AppDbContext>(db => {
    db.AddOperations(operations => {
        operations.ConfigureOperationLogReader(_ => new() {
            CheckPeriod = TimeSpan.FromSeconds(5).ToRandom(0.1),
        });

        // Choose one watcher:
        operations.AddNpgsqlOperationLogWatcher();    // PostgreSQL
        // operations.AddRedisOperationLogWatcher();  // Redis
        // operations.AddFileSystemOperationLogWatcher();  // Local dev
    });
});
```
<!-- endSnippet -->

### DbContext Setup

<!-- snippet: PartOCS_DbContextSetup -->
```cs
public DbSet<DbOperation> Operations => Set<DbOperation>();
public DbSet<DbEvent> Events => Set<DbEvent>();

protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<DbOperation>().ToTable("_Operations");
    modelBuilder.Entity<DbEvent>().ToTable("_Events");
}
```
<!-- endSnippet -->

## Command Handler Pattern

<!-- snippet: PartOCS_CommandHandlerPattern -->
```cs
[CommandHandler]
public virtual async Task<Order> CreateOrder(
    CreateOrderCommand command, CancellationToken cancellationToken = default)
{
    // 1. INVALIDATION (runs on ALL hosts)
    if (Invalidation.IsActive) {
        _ = GetOrder(command.OrderId, default);
        _ = GetOrdersByUser(command.UserId, default);
        return default!;
    }

    // 2. MAIN LOGIC (runs on originating host only)
    await using var dbContext = await DbHub.CreateOperationDbContext(cancellationToken);

    var order = new Order { /* ... */ };
    dbContext.Orders.Add(order);
    await dbContext.SaveChangesAsync(cancellationToken);

    return order;
}
```
<!-- endSnippet -->

## Passing Data to Invalidation

<!-- snippet: PartOCS_PassingDataToInvalidation -->
```cs
[CommandHandler]
public virtual async Task DeleteUser(
    DeleteUserCommand command, CancellationToken cancellationToken = default)
{
    var context = CommandContext.GetCurrent();

    if (Invalidation.IsActive) {
        // Retrieve stored data
        var userId = context.Operation.Items.KeylessGet<long>();
        _ = GetUser(userId, default);
        return;
    }

    await using var db = await DbHub.CreateOperationDbContext(cancellationToken);
    var user = await db.Users.FindAsync(command.UserId);

    // Store data for invalidation
    context.Operation.Items.KeylessSet(user!.Id);

    db.Users.Remove(user);
    await db.SaveChangesAsync(cancellationToken);
}
```
<!-- endSnippet -->

## Events

### Adding Events

<!-- snippet: PartOCS_AddingEvents -->
```cs
[CommandHandler]
public virtual async Task<Order> CreateOrderWithEvent(
    CreateOrderCommand command, CancellationToken cancellationToken = default)
{
    if (Invalidation.IsActive) { /* ... */ return default!; }

    var context = CommandContext.GetCurrent();
    await using var db = await DbHub.CreateOperationDbContext(cancellationToken);

    var order = new Order { /* ... */ };
    db.Orders.Add(order);
    await db.SaveChangesAsync(cancellationToken);

    // Add event (processed asynchronously after commit)
    context.Operation.AddEvent(new SendOrderConfirmationCommand(order.Id));

    return order;
}
```
<!-- endSnippet -->

### Delayed Events

<!-- snippet: PartOCS_DelayedEvents -->
```cs
// Process after delay
context.Operation.AddEvent(new ReminderEvent(userId))
    .SetDelayBy(TimeSpan.FromHours(24));

// Process at specific time
context.Operation.AddEvent(new ScheduledEvent())
    .SetDelayUntil(scheduledTime);

// Rate-limited (one per minute)
context.Operation.AddEvent(new RateLimitedEvent())
    .SetDelayUntil(now, TimeSpan.FromMinutes(1), "rate-limit");
```
<!-- endSnippet -->

### Event Conflict Strategies

<!-- snippet: PartOCS_EventConflictStrategies -->
```cs
// Skip duplicates (idempotent)
context.Operation.AddEvent(new NotifyEvent(userId))
    .SetUuid($"notify-{userId}-{DateTime.UtcNow:yyyy-MM-dd-HH}")
    .SetUuidConflictStrategy(KeyConflictStrategy.Skip);

// Fail on duplicate (default)
context.Operation.AddEvent(new UniqueEvent())
    .SetUuidConflictStrategy(KeyConflictStrategy.Fail);

// Update existing
context.Operation.AddEvent(new UpdatableEvent())
    .SetUuidConflictStrategy(KeyConflictStrategy.Update);
```
<!-- endSnippet -->

## Configuration Quick Reference

### Operation Log Reader

<!-- snippet: PartOCS_OperationLogReaderConfig -->
```cs
operations.ConfigureOperationLogReader(_ => new() {
    StartOffset = TimeSpan.FromSeconds(3),     // Startup lookback
    CheckPeriod = TimeSpan.FromSeconds(5),     // Poll interval
    BatchSize = 64,                            // Ops per batch
    ConcurrencyLevel = Environment.ProcessorCount * 4,
});
```
<!-- endSnippet -->

### Operation Log Trimmer

<!-- snippet: PartOCS_OperationLogTrimmerConfig -->
```cs
operations.ConfigureOperationLogTrimmer(_ => new() {
    MaxEntryAge = TimeSpan.FromMinutes(30),    // 30 min default
    CheckPeriod = TimeSpan.FromMinutes(15),
});
```
<!-- endSnippet -->

### Operation Scope

<!-- snippet: PartOCS_OperationScopeConfig -->
```cs
operations.ConfigureOperationScope(_ => new() {
    IsolationLevel = System.Data.IsolationLevel.ReadCommitted,
});
```
<!-- endSnippet -->

### Event Log Reader

<!-- snippet: PartOCS_EventLogReaderConfig -->
```cs
operations.ConfigureEventLogReader(_ => new() {
    CheckPeriod = TimeSpan.FromSeconds(5),
    BatchSize = 64,
    ConcurrencyLevel = Environment.ProcessorCount * 4,
});
```
<!-- endSnippet -->

### Event Log Trimmer

<!-- snippet: PartOCS_EventLogTrimmerConfig -->
```cs
operations.ConfigureEventLogTrimmer(_ => new() {
    MaxEntryAge = TimeSpan.FromHours(1),       // 1 hour default
    CheckPeriod = TimeSpan.FromMinutes(15),
});
```
<!-- endSnippet -->

### Operation Reprocessor

<!-- snippet: PartOCS_OperationReprocessorConfig -->
```cs
fusion.AddOperationReprocessor(_ => new() {
    MaxRetryCount = 3,                         // Retry attempts
    RetryDelays = RetryDelaySeq.Exp(0.5, 3, 0.33),  // Exponential backoff
});
```
<!-- endSnippet -->

## Log Watchers

| Watcher | Method | Best For |
|---------|--------|----------|
| PostgreSQL | `AddNpgsqlOperationLogWatcher()` | PostgreSQL deployments |
| Redis | `AddRedisOperationLogWatcher()` | Any DB with Redis |
| File System | `AddFileSystemOperationLogWatcher()` | Local development |
| None | (default) | Polling fallback |

## Command Types

<!-- snippet: PartOCS_CommandTypes -->
```cs
// Standard command
public record CreateOrderCommand(long UserId) : ICommand<Order>
{
    public long OrderId { get; init; }
    public bool StatusChanged { get; init; }
    public string OldStatus { get; init; } = "";
}

// Backend-only command (server-side execution enforced)
public record DeleteUserCommand(long UserId) : ICommand<Unit>, IBackendCommand;

// Command with validation
public record UpdateProfileCommand(long UserId, string Name)
    : ICommand<Unit>, IPreparedCommand
{
    public Task Prepare(CommandContext context, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(Name))
            throw new ArgumentException("Name is required");
        return Task.CompletedTask;
    }
}
```
<!-- endSnippet -->

## Key Differences

| Aspect | `Operation.Items` | `CommandContext.Items` |
|--------|-------------------|------------------------|
| Scope | Cross-host | Local only |
| Persistence | Stored in DB | In-memory only |
| Availability | Execution + Invalidation | Execution only |

| Aspect | Transient Operation | Persistent Operation |
|--------|---------------------|----------------------|
| Stored | No | Yes |
| Cross-host | No | Yes |
| Events | Not allowed | Allowed |
| UUID | `xxx-local` | `xxx` |

## Pipeline Priorities

| Priority | Handler | Purpose |
|----------|---------|---------|
| 100,000 | `OperationReprocessor` | Transient error retry |
| 11,000 | `NestedOperationLogger` | Nested commands |
| 10,000 | `InMemoryOperationScopeProvider` | Transient scope |
| 1,000 | `DbOperationScopeProvider` | DB scope |
| 100 | `InvalidatingCommandCompletionHandler` | Invalidation |

## Common Patterns

### Conditional Invalidation

<!-- snippet: PartOCS_ConditionalInvalidation -->
```cs
if (Invalidation.IsActive) {
    _ = GetOrder(command.OrderId, default);
    if (command.StatusChanged)
        _ = GetOrdersByStatus(command.OldStatus, default);
    return default!;
}
```
<!-- endSnippet -->

### Multiple Invalidations

<!-- snippet: PartOCS_MultipleInvalidations -->
```cs
if (Invalidation.IsActive) {
    _ = GetOrder(command.OrderId, default);
    _ = GetOrderList(command.UserId, default);
    _ = GetOrderCount(command.UserId, default);
    return default!;
}
```
<!-- endSnippet -->

### Nested Commands

<!-- snippet: PartOCS_NestedCommands -->
```cs
// Nested command is automatically logged and invalidated
await Commander.Call(new ChildCommand(parentId), cancellationToken);
```
<!-- endSnippet -->

### Control Operation Storage

<!-- snippet: PartOCS_ControlOperationStorage -->
```cs
// Disable storage (operation won't replicate)
context.Operation.MustStore(false);
```
<!-- endSnippet -->
