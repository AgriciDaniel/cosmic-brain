using ActualLab.Fusion.Client.Caching;
using ActualLab.Rpc;
using ActualLab.Rpc.Caching;
using MemoryPack;
using static System.Console;
// ReSharper disable ArrangeTypeMemberModifiers
// ReSharper disable InconsistentNaming

// ReSharper disable once CheckNamespace
namespace Docs.PartAC;

// Fake types for snippet compilation
public record AddItemCommand(string Folder);
public record AddTodoCommand(Session Session, TodoItem Todo);
public record TodoItem(Ulid Id, string Text);
public record Resource(string Key, string Value);
public record PeerState(bool IsConnected);
public record StockPrice(string Symbol, decimal Price);
public record Data(string Value);

// Stub for RpcPeer
public class RpcPeerStub
{
    public Task<PeerState> GetState(CancellationToken ct) => Task.FromResult(new PeerState(true));
}

// ============================================================================
// The Problem: Invalidating with multiple parameter variations
// ============================================================================

public class ListIdsServiceProblem : IComputeService
{
    #region PartFPatterns_Problem
    [ComputeMethod]
    public virtual async Task<Ulid[]> ListIds(string folder, int limit, CancellationToken ct = default)
    {
        // Returns up to `limit` IDs from the folder
        return Array.Empty<Ulid>();
    }
    #endregion
}

// ============================================================================
// Pseudo-Methods for Batch Invalidation
// ============================================================================

public class ListIdsServiceSolution : IComputeService
{
    #region PartFPatterns_PseudoMethod
    // Pseudo-method: returns immediately, exists only to create a dependency
    [ComputeMethod]
    protected virtual Task<Unit> PseudoListIds(string folder)
        => TaskExt.UnitTask;

    [ComputeMethod]
    public virtual async Task<Ulid[]> ListIds(string folder, int limit, CancellationToken ct = default)
    {
        // Create dependency on the pseudo-method
        await PseudoListIds(folder);

        // Actual implementation
        return await FetchIds(folder, limit, ct);
    }
    #endregion

    private Task<Ulid[]> FetchIds(string folder, int limit, CancellationToken ct)
        => Task.FromResult(Array.Empty<Ulid>());

    #region PartFPatterns_InvalidatePseudo
    [CommandHandler]
    public virtual async Task AddItem(AddItemCommand command, CancellationToken ct = default)
    {
        var folder = command.Folder;
        if (Invalidation.IsActive) {
            // This invalidates ALL ListIds(folder, <any_limit>) calls
            _ = PseudoListIds(folder);
            return;
        }

        // Actual implementation
        await AddItemToDb(command, ct);
    }
    #endregion

    private Task AddItemToDb(AddItemCommand command, CancellationToken ct)
        => Task.CompletedTask;
}

// ============================================================================
// Hierarchical Dependencies
// ============================================================================

public class HierarchicalDependenciesService : IComputeService
{
    #region PartFPatterns_HierarchicalBinaryTree
    // Binary tree style: each level depends on its parent
    [ComputeMethod]
    protected virtual async Task<Unit> PseudoRegion(int level, int index)
    {
        if (level > 0) {
            // Create dependency on parent level
            await PseudoRegion(level - 1, index / 2);
        }
        return default;
    }
    #endregion

    public async Task InvalidateExamples()
    {
        #region PartFPatterns_HierarchicalInvalidation
        // Invalidate just one leaf region
        using (Invalidation.Begin())
            _ = PseudoRegion(3, 5);  // Only queries for region (3,5) and its ancestors

        // Invalidate an entire subtree by invalidating its root
        using (Invalidation.Begin())
            _ = PseudoRegion(1, 0);  // All regions under (1,0) get invalidated
        #endregion

        await Task.CompletedTask;
    }
}

// ============================================================================
// Complete Pseudo-Method Example: TodoService
// ============================================================================

#region PartFPatterns_CompleteTodoService
public class TodoService : IComputeService
{
    // Pseudo-method for batch invalidation
    [ComputeMethod]
    protected virtual Task<Unit> PseudoListIds(Session session)
        => TaskExt.UnitTask;

    [ComputeMethod]
    public virtual async Task<Ulid[]> ListIds(Session session, int count, CancellationToken ct = default)
    {
        // Establish dependency on pseudo-method
        await PseudoListIds(session);

        // Actual query
        return await QueryIds(session, count, ct);
    }

    [CommandHandler]
    public virtual async Task<TodoItem> AddOrUpdate(AddTodoCommand command, CancellationToken ct = default)
    {
        var session = command.Session;
        if (Invalidation.IsActive) {
            _ = Get(session, command.Todo.Id, default);
            // Invalidate all ListIds variants for this session
            _ = PseudoListIds(session);
            _ = GetSummary(session, default);
            return null!;
        }

        // Actual implementation
        return await SaveTodo(command, ct);
    }

    [ComputeMethod]
    public virtual Task<TodoItem?> Get(Session session, Ulid id, CancellationToken ct)
        => Task.FromResult<TodoItem?>(null);

    [ComputeMethod]
    public virtual Task<string> GetSummary(Session session, CancellationToken ct)
        => Task.FromResult("");

    private Task<Ulid[]> QueryIds(Session session, int count, CancellationToken ct)
        => Task.FromResult(Array.Empty<Ulid>());

    private Task<TodoItem> SaveTodo(AddTodoCommand command, CancellationToken ct)
        => Task.FromResult(command.Todo);
}
#endregion

// ============================================================================
// Computed.GetCurrent()
// ============================================================================

public class ComputedGetCurrentExamples : IComputeService
{
    #region PartFPatterns_ScheduledInvalidation
    [ComputeMethod]
    public virtual async Task<DateTime> GetServerTime(CancellationToken ct = default)
    {
        // Invalidate this computed after 1 second
        Computed.GetCurrent().Invalidate(TimeSpan.FromSeconds(1));
        return DateTime.UtcNow;
    }
    #endregion

    #region PartFPatterns_InvalidationCallbacks
    [ComputeMethod]
    public virtual async Task<Resource> GetResource(string key, CancellationToken ct = default)
    {
        var computed = Computed.GetCurrent();

        // Register cleanup when this computed is invalidated
        computed.Invalidated += c => {
            Log.LogDebug("Resource {Key} computed was invalidated", key);
            // Release resources, cancel subscriptions, etc.
        };

        return await LoadResource(key, ct);
    }
    #endregion

    private Task<Resource> LoadResource(string key, CancellationToken ct)
        => Task.FromResult(new Resource(key, "value"));

    private static readonly ILogger Log = NullLogger<ComputedGetCurrentExamples>.Instance;

    #region PartFPatterns_ConditionalInvalidationDelay
    [ComputeMethod]
    public virtual async Task<PeerState> GetPeerState(RpcPeerStub peer, CancellationToken ct = default)
    {
        var computed = Computed.GetCurrent();
        var state = await peer.GetState(ct);

        // Different invalidation delays based on state
        var delay = state.IsConnected
            ? TimeSpan.FromSeconds(10)   // Poll less frequently when connected
            : TimeSpan.FromSeconds(1);   // Poll more frequently when disconnected

        computed.Invalidate(delay);
        return state;
    }
    #endregion
}

// ============================================================================
// Computed.Changes() Observable
// ============================================================================

public class ComputedChangesExamples : IComputeService
{
    [ComputeMethod]
    public virtual Task<Data> GetData(CancellationToken ct = default)
        => Task.FromResult(new Data("test"));

    [ComputeMethod]
    public virtual Task<StockPrice> GetPrice(string symbol, CancellationToken ct = default)
        => Task.FromResult(new StockPrice(symbol, 100m));

    public static async Task BasicChangesExample(IComputeService service, ComputedChangesExamples example)
    {
        var cancellationToken = CancellationToken.None;

        #region PartFPatterns_ChangesBasic
        var computed = await Computed.Capture(() => example.GetData());

        await foreach (var c in computed.Changes(cancellationToken)) {
            Console.WriteLine($"Value: {c.Value}");
        }
        #endregion
    }

    public static async Task ChangesWithDelayer(Computed<Data> computed, CancellationToken ct)
    {
        #region PartFPatterns_ChangesWithDelayer
        // Wait 1 second between updates
        await foreach (var c in computed.Changes(FixedDelayer.Get(1), ct)) {
            ProcessValue(c.Value);
        }
        #endregion
    }

    private static void ProcessValue(Data value) { }

    public static async Task ChangesDeconstruction(Computed<Data> computed, CancellationToken ct)
    {
        #region PartFPatterns_ChangesDeconstruction
        await foreach (var (value, error) in computed.Changes(ct)) {
            if (error != null)
                HandleError(error);
            else
                DisplayValue(value);
        }
        #endregion
    }

    private static void HandleError(Exception error) { }
    private static void DisplayValue(Data value) { }

    #region PartFPatterns_ChangesToRpcStream
    public async Task<RpcStream<StockPrice>> WatchPrice(string symbol, CancellationToken ct = default)
    {
        var computed = await Computed.Capture(() => GetPrice(symbol));

        var stream = computed.Changes(FixedDelayer.Get(0.5), ct)
            .Select(c => c.Value);

        return RpcStream.New(stream);
    }
    #endregion
}

// ============================================================================
// Computed.When() Predicate
// ============================================================================

public static class ComputedWhenExamples
{
    public interface ICounterService : IComputeService
    {
        [ComputeMethod]
        Task<int> Get(string key, CancellationToken ct = default);
    }

    public static async Task WhenExample(ICounterService counter, CancellationToken cancellationToken)
    {
        #region PartFPatterns_WhenBasic
        var computed = await Computed.Capture(() => counter.Get("a"));

        // Wait until value reaches 10
        computed = await computed.When(x => x >= 10, cancellationToken);
        Console.WriteLine($"Reached: {computed.Value}");
        #endregion
    }

    public interface IStatusService : IComputeService
    {
        [ComputeMethod]
        Task<StatusInfo> GetStatus(CancellationToken ct = default);
    }

    public record StatusInfo(string Status);

    public static async Task WhenWithDelayer(Computed<StatusInfo> computed, CancellationToken cancellationToken)
    {
        #region PartFPatterns_WhenWithDelayer
        // Check every second
        computed = await computed.When(
            x => x.Status == "Complete",
            FixedDelayer.Get(1),
            cancellationToken);
        #endregion
    }
}

// ============================================================================
// Changes() with Error Handling
// ============================================================================

public static class ChangesErrorHandling
{
    public interface IServiceWithStatus : IComputeService
    {
        [ComputeMethod]
        Task<ServiceStatus> GetStatus(CancellationToken ct = default);
    }

    public record ServiceStatus(bool HasAlert);

    #region PartFPatterns_ChangesErrorHandling
    static async Task MonitorService(IServiceWithStatus service, ILogger _logger, CancellationToken ct)
    {
        var computed = await Computed.Capture(() => service.GetStatus());

        await foreach (var c in computed.Changes(FixedDelayer.Get(5), ct)) {
            var (status, error) = c;

            if (error != null) {
                _logger.LogError(error, "Status check failed");
                // Continue watching - transient errors will retry automatically
                continue;
            }

            if (status.HasAlert)
                await NotifyOperators(status);
        }
    }

    static Task NotifyOperators(ServiceStatus status) => Task.CompletedTask;
    #endregion
}

// ============================================================================
// Cache-Aware API Design Examples
// ============================================================================

// Fake types for API design examples
public record Message(Ulid Id, string Text, Ulid AuthorId);
public record User(Ulid Id, string Name);
public record UserProfile(Ulid Id, string Name, string Bio);
public record UserPresence(Ulid Id, bool IsOnline, DateTime LastSeen);
public record Product(Ulid Id, string Name, decimal Price);

public interface IChatService : IComputeService
{
    #region PartAC_FusionApiDesign
    // Fusion: fetch IDs, then individual items
    [ComputeMethod]
    Task<Ulid[]> ListMessageIds(Ulid roomId, int limit, CancellationToken ct);

    [ComputeMethod]
    Task<Message?> GetMessage(Ulid messageId, CancellationToken ct);

    [ComputeMethod]
    Task<User?> GetUser(Ulid userId, CancellationToken ct);
    #endregion
}

public interface ITodoServicePattern : IComputeService
{
    #region PartAC_FetchIdsPattern
    // Prefer this:
    [ComputeMethod]
    Task<Ulid[]> ListTodoIds(Session session, int limit, CancellationToken ct);

    [ComputeMethod]
    Task<TodoItem?> GetTodo(Ulid id, CancellationToken ct);
    #endregion
}

public interface ITodoServiceAntiPattern : IComputeService
{
    #region PartAC_FetchIdsAntiPattern
    // Over this:
    [ComputeMethod]
    Task<TodoItem[]> ListTodos(Session session, int limit, CancellationToken ct);
    #endregion
}

public interface IUserServiceStable : IComputeService
{
    #region PartAC_StableArguments
    // Good: stable cache keys
    [ComputeMethod]
    Task<User?> GetUser(Ulid userId, CancellationToken ct);
    #endregion
}

public interface IUserServiceUnstable : IComputeService
{
    #region PartAC_UnstableArguments
    // Problematic: timestamp in arguments means no cache hits
    [ComputeMethod]
    Task<User?> GetUser(Ulid userId, DateTime asOf, CancellationToken ct);
    #endregion
}

public interface IUserServiceSplit : IComputeService
{
    #region PartAC_SeparateData
    [ComputeMethod]
    Task<UserProfile> GetUserProfile(Ulid userId, CancellationToken ct);

    [ComputeMethod]
    Task<UserPresence> GetUserPresence(Ulid userId, CancellationToken ct);
    #endregion
}

public interface IProductService : IComputeService
{
    #region PartAC_NotObservable
    // Regular method - not cached, not observable
    Task<Ulid[]> SearchProducts(string query, int skip, int take, CancellationToken ct);

    // Compute method - each item is cached and observable
    [ComputeMethod]
    Task<Product?> GetProduct(Ulid id, CancellationToken ct);
    #endregion
}

// ============================================================================
// Persistent Cache Examples
// ============================================================================

public static class PersistentCacheExamples
{
    public static void RegisterCache(FusionBuilder fusion)
    {
        #region PartAC_CacheRegistrationHelper
        fusion.AddRemoteComputedCache<LocalStorageRemoteComputedCache, LocalStorageRemoteComputedCache.Options>(
            _ => LocalStorageRemoteComputedCache.Options.Default);
        #endregion
    }

    public static void RegisterCacheManual(IServiceCollection services)
    {
        #region PartAC_CacheRegistrationManual
        services.AddSingleton(_ => LocalStorageRemoteComputedCache.Options.Default);
        services.AddSingleton<IRemoteComputedCache>(c => {
            var options = c.GetRequiredService<LocalStorageRemoteComputedCache.Options>();
            return new LocalStorageRemoteComputedCache(options, c);
        });
        #endregion
    }

    public static void RegisterInMemoryCache(FusionBuilder fusion)
    {
        #region PartAC_InMemoryCache
        fusion.AddInMemoryRemoteComputedCache();
        #endregion
    }
}

// Stub for ISyncLocalStorageService (from Blazored.LocalStorage)
public interface ISyncLocalStorageService
{
    string? GetItemAsString(string key);
    void SetItemAsString(string key, string value);
    void RemoveItem(string key);
    void Clear();
}

#region PartAC_LocalStorageCache
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
#endregion

// ============================================================================
// DocPart class
// ============================================================================

public class PartAC : DocPart
{
    public override async Task Run()
    {
        StartSnippetOutput("Reference verification");

        // Core types
        _ = typeof(Computed<>);
        _ = typeof(Computed);
        _ = typeof(Invalidation);
        _ = typeof(IComputeService);
        _ = typeof(ComputeMethodAttribute);
        _ = typeof(CommandHandlerAttribute);

        // Computed methods
        var services = new ServiceCollection()
            .AddFusion()
            .Services
            .BuildServiceProvider();

        // Unit type for pseudo-methods
        _ = typeof(Unit);
        _ = TaskExt.UnitTask;

        // FixedDelayer for Changes/When
        _ = typeof(FixedDelayer);
        _ = FixedDelayer.Get(1);

        // RpcStream
        _ = typeof(RpcStream<>);

        WriteLine("All Caching Techniques references verified successfully!");
        WriteLine();

        await Task.CompletedTask;
    }
}
