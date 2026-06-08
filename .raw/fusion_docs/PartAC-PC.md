# Persistent Cache Implementation

Fusion clients can use persistent caches (IndexedDB, localStorage, SQLite, etc.) to enable
[speculative execution](PartAC#_2-speculative-execution-with-persistent-cache) — instantly returning
cached values while validating them with the server in the background.

## The Cache Interface

To enable persistent caching, implement `IRemoteComputedCache` or extend `RemoteComputedCache`:

```csharp
public interface IRemoteComputedCache
{
    Task WhenInitialized { get; }
    ValueTask<RpcCacheValue?> Get(RpcCacheKey key, CancellationToken cancellationToken = default);
    void Set(RpcCacheKey key, RpcCacheValue value);
    void Remove(RpcCacheKey key);
    Task Clear(CancellationToken cancellationToken = default);
}
```

The base `RemoteComputedCache` class provides:
- **Version management**: Automatically clears the cache when your app version changes
- **Serialization helpers**: Handles `RpcCacheKey` and `RpcCacheValue` serialization

For persistence with batched writes, extend `FlushingRemoteComputedCache` which buffers
writes and flushes them periodically to reduce I/O overhead.

## Example: localStorage Implementation

Here's a complete implementation using browser localStorage (from the TodoApp sample):

<!-- snippet: PartAC_LocalStorageCache -->
```cs
public sealed class LocalStorageRemoteComputedCache : RemoteComputedCache
{
    public new record Options : RemoteComputedCache.Options
    {
        public static new readonly Options Default = new() { Version = "1.0" };
        public string KeyPrefix { get; init; } = "";
    }

    private readonly ISyncLocalStorageService _storage;
    private readonly string _keyPrefix;

    public LocalStorageRemoteComputedCache(Options settings, IServiceProvider services)
        : base(settings, services)
    {
        _keyPrefix = settings.KeyPrefix;
        _storage = services.GetRequiredService<ISyncLocalStorageService>();
    }

    public override ValueTask<RpcCacheValue?> Get(RpcCacheKey key, CancellationToken cancellationToken = default)
    {
        var sValue = _storage.GetItemAsString(GetStringKey(key));
        if (sValue.IsNullOrEmpty())
            return default;

        var bytes = Convert.FromBase64String(sValue);
        var value = MemoryPackSerializer.Deserialize<RpcCacheValue>(bytes);
        return new ValueTask<RpcCacheValue?>(value);
    }

    public override void Set(RpcCacheKey key, RpcCacheValue value)
    {
        var bytes = MemoryPackSerializer.Serialize(value);
        var sValue = Convert.ToBase64String(bytes);
        _storage.SetItemAsString(GetStringKey(key), sValue);
    }

    public override void Remove(RpcCacheKey key)
        => _storage.RemoveItem(GetStringKey(key));

    public override Task Clear(CancellationToken cancellationToken = default)
    {
        _storage.Clear();
        return Task.CompletedTask;
    }

    private string GetStringKey(RpcCacheKey key)
        => string.Concat(_keyPrefix, key.Name, " ", Convert.ToBase64String(key.ArgumentData.Span));
}
```
<!-- endSnippet -->

## Registration

Register your cache implementation using the built-in helper:

<!-- snippet: PartAC_CacheRegistrationHelper -->
```cs
fusion.AddRemoteComputedCache<LocalStorageRemoteComputedCache, LocalStorageRemoteComputedCache.Options>(
    _ => LocalStorageRemoteComputedCache.Options.Default);
```
<!-- endSnippet -->

Or register manually:

<!-- snippet: PartAC_CacheRegistrationManual -->
```cs
services.AddSingleton(_ => LocalStorageRemoteComputedCache.Options.Default);
services.AddSingleton<IRemoteComputedCache>(c => {
    var options = c.GetRequiredService<LocalStorageRemoteComputedCache.Options>();
    return new LocalStorageRemoteComputedCache(options, c);
});
```
<!-- endSnippet -->

## Built-in Implementations

Fusion provides `InMemoryRemoteComputedCache` for testing:

<!-- snippet: PartAC_InMemoryCache -->
```cs
fusion.AddInMemoryRemoteComputedCache();
```
<!-- endSnippet -->

This is intended for testing only — it doesn't persist across sessions, so you won't get the
startup performance benefits of a real persistent cache in production.
