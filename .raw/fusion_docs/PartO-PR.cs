using Microsoft.EntityFrameworkCore;
using ActualLab.Fusion.EntityFramework;
using ActualLab.Fusion.EntityFramework.LogProcessing;
using ActualLab.Fusion.EntityFramework.Npgsql;
using ActualLab.Fusion.EntityFramework.Operations;
using ActualLab.Fusion.EntityFramework.Redis;
using ActualLab.Resilience;
// ReSharper disable ArrangeTypeMemberModifiers
// ReSharper disable InconsistentNaming

// ReSharper disable once CheckNamespace
namespace Docs.PartOPR;

// ============================================================================
// PartO-PR.md snippets: Log Watchers
// ============================================================================

public class AppDbContext(DbContextOptions options) : DbContextBase(options)
{
    public DbSet<DbOperation> Operations => Set<DbOperation>();
}

public static class NpgsqlWatcherSetup
{
    public static void Setup(IServiceCollection services)
    {
        #region PartOPR_NpgsqlSetup
        services.AddDbContextServices<AppDbContext>(db => {
            db.AddOperations(operations => {
                operations.AddNpgsqlOperationLogWatcher();
            });
        });
        #endregion
    }

    public static void Configure(DbOperationsBuilder<AppDbContext> operations)
    {
        #region PartOPR_NpgsqlConfiguration
        operations.AddNpgsqlOperationLogWatcher(_ => new() {
            ChannelNameFormatter = (shard, entryType) =>
                $"myapp_{entryType.Name}{(DbShard.IsSingle(shard) ? "" : $"_{shard}")}",
            TrackerRetryDelays = RetryDelaySeq.Exp(1, 10),
        });
        #endregion
    }
}

public static class RedisWatcherSetup
{
    public static void Setup(IServiceCollection services)
    {
        #region PartOPR_RedisSetup
        services.AddDbContextServices<AppDbContext>(db => {
            // First, configure Redis connection
            db.AddRedisDb("localhost:6379", "MyApp");

            db.AddOperations(operations => {
                operations.AddRedisOperationLogWatcher();
            });
        });
        #endregion
    }

    public static void Configure(DbOperationsBuilder<AppDbContext> operations)
    {
        #region PartOPR_RedisConfiguration
        operations.AddRedisOperationLogWatcher(_ => new() {
            PubSubKeyFormatter = (shard, entryType) =>
                $"myapp.{entryType.Name}{(DbShard.IsSingle(shard) ? "" : $".{shard}")}",
            WatchRetryDelays = RetryDelaySeq.Exp(1, 10),
        });
        #endregion
    }
}

public static class FileSystemWatcherSetup
{
    public static void Setup(IServiceCollection services)
    {
        #region PartOPR_FileSystemSetup
        services.AddDbContextServices<AppDbContext>(db => {
            db.AddOperations(operations => {
                operations.AddFileSystemOperationLogWatcher();
            });
        });
        #endregion
    }

    public static void Configure(DbOperationsBuilder<AppDbContext> operations)
    {
        #region PartOPR_FileSystemConfiguration
        operations.AddFileSystemOperationLogWatcher(_ => new() {
            FilePathFormatter = (shard, entryType) =>
                Path.Combine(
                    Path.GetTempPath(),
                    $"myapp_{entryType.Name}{(DbShard.IsSingle(shard) ? "" : $"_{shard}")}.tracker"),
        });
        #endregion
    }
}

public static class FakeWatcherExample
{
    public static void Setup(DbContextBuilder<AppDbContext> db)
    {
        #region PartOPR_FakeWatcher
        // When you don't configure any watcher:
        db.AddOperations(operations => {
            // No AddXxxOperationLogWatcher call
            // FakeDbLogWatcher is used automatically
        });
        #endregion
    }
}

public static class MultipleWatchersExample
{
    public static void Setup(DbContextBuilder<AppDbContext> db)
    {
        #region PartOPR_MultipleWatchers
        db.AddOperations(operations => {
            operations.AddFileSystemOperationLogWatcher();  // Overwritten
            operations.AddNpgsqlOperationLogWatcher();       // This one is used
        });
        #endregion
    }
}

#region PartOPR_CustomWatcher
// You can implement your own watcher for other message brokers.
// For example, a Kafka-based watcher:
public class KafkaDbLogWatcher<TDbContext, TDbEntry>(IServiceProvider services)
    : DbLogWatcher<TDbContext, TDbEntry>(services)
    where TDbContext : DbContext
{
    // Implement CreateShardWatcher to produce per-shard watchers
    // that publish/subscribe via Kafka.
    protected override DbShardWatcher CreateShardWatcher(string shard)
        => throw new NotImplementedException();
}
#endregion

public static class MonitoringExamples
{
    public static void CheckRegistration(IServiceProvider services)
    {
        #region PartOPR_CheckWatcherRegistration
        var watcher = services.GetService<IDbLogWatcher<AppDbContext, DbOperation>>();
        Console.WriteLine(watcher?.GetType().Name ?? "No watcher registered");
        #endregion
    }

    public static void EnableTracing(DbOperationsBuilder<AppDbContext> operations)
    {
        #region PartOPR_EnableTracing
        operations.ConfigureOperationLogReader(_ => new() {
            IsTracingEnabled = true,  // Enables Activity tracing
        });
        #endregion
    }
}
