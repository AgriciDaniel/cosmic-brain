using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using ActualLab.Fusion.EntityFramework;
using ActualLab.Fusion.EntityFramework.Npgsql;
using ActualLab.Fusion.EntityFramework.Operations;
using ActualLab.Fusion.EntityFramework.Redis;
using ActualLab.Fusion.Operations;
using ActualLab.Fusion.Operations.Reprocessing;
using ActualLab.Resilience;

// ReSharper disable ArrangeTypeMemberModifiers
// ReSharper disable InconsistentNaming

// ReSharper disable once CheckNamespace
namespace Docs.PartOCO;

// ============================================================================
// PartO-CO.md snippets: Operations Framework Configuration Options
// ============================================================================

public class AppDbContext(DbContextOptions options) : DbContextBase(options);

public static class ConfigurationExamples
{
    public static void SetupOverview(IServiceCollection services)
    {
        #region PartOCO_SetupOverview
        services.AddDbContextServices<AppDbContext>(db => {
            db.AddOperations(operations => {
                // Configuration goes here
                operations.ConfigureOperationLogReader(_ => new() { /* ... */ });
                operations.ConfigureOperationLogTrimmer(_ => new() { /* ... */ });
                operations.ConfigureOperationScope(_ => new() { /* ... */ });
                operations.ConfigureEventLogReader(_ => new() { /* ... */ });
                operations.ConfigureEventLogTrimmer(_ => new() { /* ... */ });

                // Add a log watcher
                operations.AddFileSystemOperationLogWatcher();
                // Or: operations.AddNpgsqlOperationLogWatcher();
                // Or: operations.AddRedisOperationLogWatcher();
            });
        });

        // Operation reprocessing (separate from DbContext)
        var fusion = services.AddFusion();
        fusion.AddOperationReprocessor(_ => new() { /* ... */ });
        #endregion
    }

    public static void OperationLogReaderOptions(DbOperationsBuilder<AppDbContext> operations)
    {
        #region PartOCO_OperationLogReaderOptions
        operations.ConfigureOperationLogReader(_ => new() {
            StartOffset = TimeSpan.FromSeconds(3),
            CheckPeriod = TimeSpan.FromSeconds(5).ToRandom(0.1),
            BatchSize = 64,
            ConcurrencyLevel = Environment.ProcessorCount * 4,
            ReprocessDelay = TimeSpan.FromSeconds(0.1).ToRandom(0.1),
            RetryDelays = RetryDelaySeq.Exp(0.25, 5),
            LogLevel = LogLevel.Information,
            IsTracingEnabled = false,
        });
        #endregion
    }

    public static void CheckPeriodWithWatcher(DbOperationsBuilder<AppDbContext> operations)
    {
        #region PartOCO_CheckPeriodWithWatcher
        // With file system watcher: notifications are reliable
        operations.ConfigureOperationLogReader(_ => new() {
            CheckPeriod = TimeSpan.FromSeconds(60).ToRandom(0.05),
        });

        // Without watcher: rely on polling only
        operations.ConfigureOperationLogReader(_ => new() {
            CheckPeriod = TimeSpan.FromMilliseconds(250).ToRandom(0.1),
        });
        #endregion
    }

    public static void OperationLogTrimmerOptions(DbOperationsBuilder<AppDbContext> operations)
    {
        #region PartOCO_OperationLogTrimmerOptions
        operations.ConfigureOperationLogTrimmer(_ => new() {
            MaxEntryAge = TimeSpan.FromMinutes(30),
            BatchSize = 4096,  // .NET 7+: 4096, .NET 6: 1024
            CheckPeriod = TimeSpan.FromMinutes(15).ToRandom(0.25),
            RetryDelays = RetryDelaySeq.Exp(
                TimeSpan.FromSeconds(15),
                TimeSpan.FromMinutes(10)),
            StatisticsPeriod = TimeSpan.FromHours(1).ToRandom(0.1),
            LogLevel = LogLevel.Information,
            IsTracingEnabled = false,
        });
        #endregion
    }

    public static void OperationScopeOptions(DbOperationsBuilder<AppDbContext> operations)
    {
        #region PartOCO_OperationScopeOptions
        operations.ConfigureOperationScope(_ => new() {
            IsolationLevel = System.Data.IsolationLevel.ReadCommitted,
        });
        #endregion
    }

    public static void GlobalIsolationLevel()
    {
        #region PartOCO_GlobalIsolationLevel
        DbOperationScope<AppDbContext>.Options.DefaultIsolationLevel = System.Data.IsolationLevel.ReadCommitted;
        #endregion
    }

    public static void EventLogReaderOptions(DbOperationsBuilder<AppDbContext> operations)
    {
        #region PartOCO_EventLogReaderOptions
        operations.ConfigureEventLogReader(_ => new() {
            CheckPeriod = TimeSpan.FromSeconds(5).ToRandom(0.1),
            BatchSize = 64,
            ConcurrencyLevel = Environment.ProcessorCount * 4,
            ReprocessDelay = TimeSpan.FromSeconds(0.1).ToRandom(0.1),
            RetryDelays = RetryDelaySeq.Exp(0.25, 5),
            LogLevel = LogLevel.Information,
            IsTracingEnabled = false,
        });
        #endregion
    }

    public static void EventLogTrimmerOptions(DbOperationsBuilder<AppDbContext> operations)
    {
        #region PartOCO_EventLogTrimmerOptions
        operations.ConfigureEventLogTrimmer(_ => new() {
            MaxEntryAge = TimeSpan.FromHours(1),
            BatchSize = 4096,
            CheckPeriod = TimeSpan.FromMinutes(15).ToRandom(0.25),
            RetryDelays = RetryDelaySeq.Exp(
                TimeSpan.FromSeconds(15),
                TimeSpan.FromMinutes(10)),
            StatisticsPeriod = TimeSpan.FromHours(1).ToRandom(0.1),
            LogLevel = LogLevel.Information,
            IsTracingEnabled = false,
        });
        #endregion
    }

    public static void OperationReprocessorOptions(IServiceCollection services)
    {
        #region PartOCO_OperationReprocessorOptions
        var fusion = services.AddFusion();
        fusion.AddOperationReprocessor(_ => new() {
            MaxRetryCount = 3,
            RetryDelays = RetryDelaySeq.Exp(0.50, 3, 0.33),
            Filter = OperationReprocessor.Options.DefaultFilter,
        });
        #endregion
    }

    public static void RetryDelaySeqExamples()
    {
        #region PartOCO_RetryDelaySeqExamples
        // Exponential backoff: 0.5s → 1.5s → 4.5s (max 3x, no jitter)
        _ = RetryDelaySeq.Exp(0.50, 3);

        // Exponential with jitter: 0.5s ± 33%
        _ = RetryDelaySeq.Exp(0.50, 3, 0.33);

        // Custom range: 1s to 30s exponential
        _ = RetryDelaySeq.Exp(
            TimeSpan.FromSeconds(1),
            TimeSpan.FromSeconds(30));

        // Fixed delays
        _ = RetryDelaySeq.Fixed(TimeSpan.FromSeconds(1));
        #endregion
    }

    public static void OperationCompletionNotifierOptions()
    {
        #region PartOCO_OperationCompletionNotifierOptions
        // Typically configured via FusionBuilder internals
        var options = new OperationCompletionNotifier.Options {
            MaxKnownOperationCount = 16384,
            MaxKnownOperationAge = TimeSpan.FromMinutes(15),
            Clock = null,
        };
        _ = options;
        #endregion
    }

    public static void RandomTimeSpanExamples()
    {
        #region PartOCO_RandomTimeSpan
        // Fixed interval (no jitter)
        _ = TimeSpan.FromSeconds(5);

        // With jitter: 5s ± 10% (4.5s to 5.5s)
        _ = TimeSpan.FromSeconds(5).ToRandom(0.1);

        // With larger jitter: 5s ± 50% (2.5s to 7.5s)
        _ = TimeSpan.FromSeconds(5).ToRandom(0.5);
        #endregion
    }

    public static void CompleteConfiguration(IServiceCollection services)
    {
        #region PartOCO_CompleteConfiguration
        services.AddDbContextServices<AppDbContext>(db => {
            db.AddOperations(operations => {
                // Operation log reading
                operations.ConfigureOperationLogReader(_ => new() {
                    StartOffset = TimeSpan.FromSeconds(5),
                    CheckPeriod = TimeSpan.FromSeconds(60).ToRandom(0.1),  // Long poll with watcher
                    BatchSize = 128,
                    ConcurrencyLevel = 16,
                });

                // Operation log cleanup
                operations.ConfigureOperationLogTrimmer(_ => new() {
                    MaxEntryAge = TimeSpan.FromHours(1),
                    CheckPeriod = TimeSpan.FromMinutes(30).ToRandom(0.25),
                });

                // Transaction isolation
                operations.ConfigureOperationScope(_ => new() {
                    IsolationLevel = System.Data.IsolationLevel.ReadCommitted,
                });

                // Event log reading
                operations.ConfigureEventLogReader(_ => new() {
                    CheckPeriod = TimeSpan.FromSeconds(10).ToRandom(0.1),
                    BatchSize = 256,
                });

                // Event log cleanup
                operations.ConfigureEventLogTrimmer(_ => new() {
                    MaxEntryAge = TimeSpan.FromHours(24),  // Keep events longer
                });

                // Use PostgreSQL notifications
                operations.AddNpgsqlOperationLogWatcher();
            });
        });

        // Command retry
        var fusion = services.AddFusion();
        fusion.AddOperationReprocessor(_ => new() {
            MaxRetryCount = 5,
            RetryDelays = RetryDelaySeq.Exp(1, 10, 0.25),
        });
        #endregion
    }

    public static void EnvironmentSpecificConfiguration(
        IServiceCollection services, IHostEnvironment env, bool useRedis, bool usePostgres)
    {
        #region PartOCO_EnvironmentSpecificConfiguration
        services.AddDbContextServices<AppDbContext>(db => {
            db.AddOperations(operations => {
                if (env.IsDevelopment()) {
                    // Faster feedback in development
                    operations.ConfigureOperationLogReader(_ => new() {
                        CheckPeriod = TimeSpan.FromSeconds(1),
                    });
                    operations.ConfigureOperationLogTrimmer(_ => new() {
                        MaxEntryAge = TimeSpan.FromMinutes(5),  // Clean up faster
                        CheckPeriod = TimeSpan.FromMinutes(1),
                    });
                }
                else {
                    // Production: rely on watchers, longer retention
                    operations.ConfigureOperationLogReader(_ => new() {
                        CheckPeriod = TimeSpan.FromMinutes(5).ToRandom(0.1),
                    });
                    operations.ConfigureOperationLogTrimmer(_ => new() {
                        MaxEntryAge = TimeSpan.FromHours(4),
                    });
                }

                // Choose watcher based on infrastructure
                if (useRedis)
                    operations.AddRedisOperationLogWatcher();
                else if (usePostgres)
                    operations.AddNpgsqlOperationLogWatcher();
                else
                    operations.AddFileSystemOperationLogWatcher();
            });
        });
        #endregion
    }
}
