# AsyncLock and AsyncLockSet

`AsyncLock` and `AsyncLockSet<TKey>` provide async-compatible mutual exclusion,
allowing `await` inside critical sections without blocking threads.

## Key Types

| Type | Description | Source |
|------|-------------|--------|
| `AsyncLock` | Async-compatible mutex | [AsyncLock.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Locking/AsyncLock.cs) |
| `AsyncLockSet<TKey>` | Keyed async locks | [AsyncLockSet.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Locking/AsyncLockSet.cs) |
| `IAsyncLock` | Lock abstraction interface | [IAsyncLock.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Locking/IAsyncLock.cs) |
| `LockReentryMode` | Reentrancy behavior options | [LockReentryMode.cs](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Core/Locking/LockReentryMode.cs) |


## Why AsyncLock?

Standard `lock` statement doesn't work with `await`:

```cs
// This won't compile!
lock (_sync) {
    await SomeAsyncOperation();  // Error: cannot await in lock
}
```

`SemaphoreSlim` works but requires manual release:

```cs
await _semaphore.WaitAsync();
try {
    await SomeAsyncOperation();
}
finally {
    _semaphore.Release();  // Easy to forget
}
```

`AsyncLock` provides a clean `using` pattern:

```cs
using (await _lock.Lock()) {
    await SomeAsyncOperation();  // Works!
}
```


## AsyncLock

Single async-compatible mutex.

### Basic Usage

```cs
private readonly AsyncLock _lock = new();

public async Task DoWorkAsync()
{
    using (await _lock.Lock()) {
        // Critical section - only one caller at a time
        await LoadData();
        await ProcessData();
        await SaveData();
    }
}
```

### With Cancellation

```cs
public async Task DoWorkAsync(CancellationToken ct)
{
    using (await _lock.Lock(ct)) {
        await LongRunningOperation(ct);
    }
}
```

### Reentrancy Modes

```cs
// Default: fails if same async context tries to re-enter
var strictLock = new AsyncLock(LockReentryMode.CheckedFail);

// Allow re-entry (returns immediately if already held)
var reentrantLock = new AsyncLock(LockReentryMode.CheckedPass);

// Unchecked (no reentrancy detection - fastest)
var uncheckedLock = new AsyncLock(LockReentryMode.Unchecked);
```

| Mode | Behavior | Use Case |
|------|----------|----------|
| `CheckedFail` | Throws on re-entry attempt | Default, catches bugs |
| `CheckedPass` | Allows re-entry, returns immediately | Recursive algorithms |
| `Unchecked` | No checking, deadlocks on re-entry | Maximum performance |


## AsyncLockSet\<TKey>

Collection of locks indexed by key — useful for per-entity locking.

### Why Keyed Locks?

Instead of one global lock:

```cs
// Bad: All users blocked while updating any user
private readonly AsyncLock _lock = new();

public async Task UpdateUser(string userId, UserData data)
{
    using (await _lock.Lock()) {
        await UpdateUserInDb(userId, data);
    }
}
```

Use per-key locks:

```cs
// Good: Only same-user updates are serialized
private readonly AsyncLockSet<string> _locks = new(LockReentryMode.CheckedFail);

public async Task UpdateUser(string userId, UserData data)
{
    using (await _locks.Lock(userId)) {
        await UpdateUserInDb(userId, data);
    }
}
```

### Basic Usage

```cs
private readonly AsyncLockSet<string> _locks = new(LockReentryMode.CheckedFail);

public async Task ProcessOrder(string orderId)
{
    using (await _locks.Lock(orderId)) {
        // Only one processor per order
        var order = await LoadOrder(orderId);
        await ProcessPayment(order);
        await UpdateInventory(order);
        await SaveOrder(order);
    }
}
```

### With Cancellation

```cs
public async Task ProcessOrder(string orderId, CancellationToken ct)
{
    using (await _locks.Lock(orderId, ct)) {
        await ProcessOrderInternal(orderId, ct);
    }
}
```

### Lock Cleanup

Locks are automatically cleaned up when released and no one is waiting:

```cs
var locks = new AsyncLockSet<string>(LockReentryMode.CheckedFail);

// Lock is created on first use
using (await locks.Lock("key1")) { }
// Lock is removed when released (if no waiters)

// Memory doesn't grow unbounded even with many unique keys
```


## IAsyncLock Interface

Both `AsyncLock` and individual locks from `AsyncLockSet` implement:

```cs
public interface IAsyncLock
{
    LockReentryMode ReentryMode { get; }
    ValueTask<Releaser> Lock(CancellationToken cancellationToken = default);
}
```

The `Releaser` struct implements `IDisposable`:

```cs
public readonly struct Releaser : IDisposable
{
    public void Dispose();  // Releases the lock
}
```


## Common Patterns

### Lazy Initialization

```cs
private readonly AsyncLock _initLock = new();
private Data? _data;

public async Task<Data> GetData()
{
    if (_data != null)
        return _data;

    using (await _initLock.Lock()) {
        // Double-check after acquiring lock
        if (_data != null)
            return _data;

        _data = await LoadDataAsync();
        return _data;
    }
}
```

### Read-Modify-Write

```cs
private readonly AsyncLockSet<string> _locks = new(LockReentryMode.CheckedFail);

public async Task IncrementCounter(string counterId)
{
    using (await _locks.Lock(counterId)) {
        var counter = await _db.Counters.FindAsync(counterId);
        counter.Value++;
        await _db.SaveChangesAsync();
    }
}
```

### Preventing Concurrent Operations

```cs
private readonly AsyncLockSet<string> _uploadLocks = new(LockReentryMode.CheckedFail);

public async Task UploadFile(string userId, Stream file)
{
    // Prevent user from uploading multiple files simultaneously
    using (await _uploadLocks.Lock(userId)) {
        await ProcessUpload(userId, file);
    }
}
```


## Best Practices

### Keep Critical Sections Short

```cs
// Good: Only lock during actual mutation
using (await _lock.Lock()) {
    await _db.SaveChangesAsync();
}

// Bad: Lock held during slow operations
using (await _lock.Lock()) {
    await DownloadLargeFile();      // Don't do slow I/O in lock
    await ProcessFile();
    await _db.SaveChangesAsync();
}
```

### Use CheckedFail by Default

```cs
// Good: Catches accidental reentrancy
var lock = new AsyncLock(LockReentryMode.CheckedFail);

// Only use CheckedPass when reentrancy is intentional
var reentrantLock = new AsyncLock(LockReentryMode.CheckedPass);
```

### Prefer AsyncLockSet for Entity Operations

```cs
// Good: Fine-grained locking
private readonly AsyncLockSet<Guid> _entityLocks = new(LockReentryMode.CheckedFail);

public async Task UpdateEntity(Guid id, Data data)
{
    using (await _entityLocks.Lock(id)) {
        await UpdateInDb(id, data);
    }
}
```

### Always Use `using`

```cs
// Good: Lock always released
using (await _lock.Lock()) {
    await DoWork();
}

// Bad: Lock may not be released on exception
var releaser = await _lock.Lock();
await DoWork();
releaser.Dispose();  // Not reached if DoWork throws
```


## Comparison with Alternatives

| Feature | `lock` | `SemaphoreSlim` | `AsyncLock` |
|---------|--------|-----------------|-------------|
| Async support | No | Yes | Yes |
| Using pattern | Yes | No | Yes |
| Reentrancy detection | No | No | Yes |
| Keyed locks | No | Manual | `AsyncLockSet` |
| Performance | Best | Good | Good |
