# Operations Framework: Transient Operations

A **transient operation** is one that exists only in memory during command execution.
It's not written to the operation log and won't be replayed on other hosts.

Transient operations are created by `InMemoryOperationScope` and have:
- `IsTransient = true`
- `HasStoredOperation = false`
- UUID format: `{uuid}-local`


## When Are Operations Transient?

Operations become transient when:
1. The command doesn't use `CreateOperationDbContext()` (no database interaction)
2. The command explicitly disables storage with `Operation.MustStore(false)`

<!-- snippet: PartOTR_TransientOperation -->
```cs
// Transient: No database context requested
[CommandHandler]
public virtual async Task IncrementCounter(
    IncrementCommand command, CancellationToken cancellationToken = default)
{
    if (Invalidation.IsActive) {
        _ = GetCounter(command.Key, default);
        return;
    }

    // No CreateOperationDbContext = transient operation
    _counters.AddOrUpdate(command.Key, 1, (_, v) => v + 1);
}
```
<!-- endSnippet -->


## Persistent Operations

Operations become persistent when using `CreateOperationDbContext`:

<!-- snippet: PartOTR_PersistentOperation -->
```cs
// Persistent: Uses database context
[CommandHandler]
public virtual async Task UpdateUser(
    UpdateUserCommand command, CancellationToken cancellationToken = default)
{
    if (Invalidation.IsActive) {
        _ = GetUser(command.UserId, default);
        return;
    }

    // CreateOperationDbContext = persistent operation
    await using var dbContext = await DbHub.CreateOperationDbContext(cancellationToken);
    var user = await dbContext.Users.FindAsync(command.UserId);
    user!.Name = command.Name;
    await dbContext.SaveChangesAsync(cancellationToken);
}
```
<!-- endSnippet -->


## Comparison

| Aspect | Transient | Persistent |
|--------|-----------|------------|
| Scope Provider | `InMemoryOperationScopeProvider` | `DbOperationScopeProvider<T>` |
| `IsTransient` | `true` | `false` |
| Stored in DB | No | Yes |
| Replayed on other hosts | No | Yes |
| Can have events | No | Yes |
| Can have items | Yes (in-memory only) | Yes (persisted) |
| UUID suffix | `-local` | (none) |


## Controlling Storage

You can explicitly control whether an operation is stored:

<!-- snippet: PartOTR_ControlStorage -->
```cs
[CommandHandler]
public virtual async Task SomeCommand(
    SomeCommand command, CancellationToken cancellationToken = default)
{
    if (Invalidation.IsActive) { /* ... */ return; }

    var context = CommandContext.GetCurrent();

    await using var dbContext = await DbHub.CreateOperationDbContext(cancellationToken);
    // ... do work ...

    // Don't store the operation (thus only local invalidation, etc.)
    context.Operation.MustStore(false);
}
```
<!-- endSnippet -->


## Transient Operation Limitations

1. **No events**: Calling `AddEvent()` throws `TransientScopeOperationCannotHaveEvents`
2. **No cross-host invalidation**: Only the local host sees the invalidation
3. **Items are memory-only**: `Operation.Items` won't be available on other hosts

Use transient operations for:
- Commands that modify only in-memory state
- Commands that don't need cluster-wide invalidation
- Commands where you handle invalidation through other means


## Operation Completion

Whether transient or persistent, all operations go through **completion**:

<img src="/img/diagrams/PartO-TR-1.svg" alt="Operation Completion" style="width: 100%; max-width: 800px;" />

The completion flow is the same for both transient and persistent operations,
but only persistent operations are replayed on other hosts.
