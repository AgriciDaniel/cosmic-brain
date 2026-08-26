using Microsoft.EntityFrameworkCore;
using ActualLab.Fusion.EntityFramework;
using ActualLab.Fusion.EntityFramework.Npgsql;
using ActualLab.Fusion.EntityFramework.Redis;
using ActualLab.Fusion.EntityFramework.Operations;
using ActualLab.Versioning;
// ReSharper disable ArrangeTypeMemberModifiers
// ReSharper disable InconsistentNaming

// ReSharper disable once CheckNamespace
namespace Docs.PartOCS;

// ============================================================================
// PartO-CS.md snippets: Operations Framework Cheat Sheet
// ============================================================================

public class AppDbContext(DbContextOptions options) : DbContextBase(options)
{
    #region PartOCS_DbContextSetup
    public DbSet<DbOperation> Operations => Set<DbOperation>();
    public DbSet<DbEvent> Events => Set<DbEvent>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<DbOperation>().ToTable("_Operations");
        modelBuilder.Entity<DbEvent>().ToTable("_Events");
    }
    #endregion
}

public static class BasicConfigurationExample
{
    public static void Configure(IServiceCollection services)
    {
        #region PartOCS_BasicConfiguration
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
        #endregion
    }
}

public class OrderService(IServiceProvider services) : DbServiceBase<AppDbContextExtended>(services), IComputeService
{
    #region PartOCS_CommandHandlerPattern
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
    #endregion

    #region PartOCS_PassingDataToInvalidation
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
    #endregion

    #region PartOCS_AddingEvents
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
    #endregion

    [CommandHandler]
    public virtual async Task<Order> ConditionalInvalidationExample(
        CreateOrderCommand command, CancellationToken cancellationToken = default)
    {
        #region PartOCS_ConditionalInvalidation
        if (Invalidation.IsActive) {
            _ = GetOrder(command.OrderId, default);
            if (command.StatusChanged)
                _ = GetOrdersByStatus(command.OldStatus, default);
            return default!;
        }
        #endregion
        await Task.CompletedTask;
        return default!;
    }

    [CommandHandler]
    public virtual async Task<Order> MultipleInvalidationsExample(
        CreateOrderCommand command, CancellationToken cancellationToken = default)
    {
        #region PartOCS_MultipleInvalidations
        if (Invalidation.IsActive) {
            _ = GetOrder(command.OrderId, default);
            _ = GetOrderList(command.UserId, default);
            _ = GetOrderCount(command.UserId, default);
            return default!;
        }
        #endregion
        await Task.CompletedTask;
        return default!;
    }

    [CommandHandler]
    public virtual async Task NestedCommandsExample(
        CreateOrderCommand command, CancellationToken cancellationToken = default)
    {
        if (Invalidation.IsActive) return;
        var parentId = command.OrderId;
        #region PartOCS_NestedCommands
        // Nested command is automatically logged and invalidated
        await Commander.Call(new ChildCommand(parentId), cancellationToken);
        #endregion
    }

    [CommandHandler]
    public virtual async Task ControlOperationStorageExample(
        CreateOrderCommand command, CancellationToken cancellationToken = default)
    {
        if (Invalidation.IsActive) return;
        var context = CommandContext.GetCurrent();
        await using var _ = await DbHub.CreateOperationDbContext(cancellationToken);
        #region PartOCS_ControlOperationStorage
        // Disable storage (operation won't replicate)
        context.Operation.MustStore(false);
        #endregion
    }

    // Placeholder compute methods
    [ComputeMethod] public virtual Task<Order?> GetOrder(long orderId, CancellationToken ct) => Task.FromResult<Order?>(null);
    [ComputeMethod] public virtual Task<Order[]> GetOrdersByUser(long userId, CancellationToken ct) => Task.FromResult(Array.Empty<Order>());
    [ComputeMethod] public virtual Task<Order[]> GetOrdersByStatus(string status, CancellationToken ct) => Task.FromResult(Array.Empty<Order>());
    [ComputeMethod] public virtual Task<Order[]> GetOrderList(long userId, CancellationToken ct) => Task.FromResult(Array.Empty<Order>());
    [ComputeMethod] public virtual Task<int> GetOrderCount(long userId, CancellationToken ct) => Task.FromResult(0);
    [ComputeMethod] public virtual Task<User?> GetUser(long userId, CancellationToken ct) => Task.FromResult<User?>(null);
}

public class EventExamples
{
    public void ShowEventPatterns(CommandContext context)
    {
        var userId = 1L;
        var scheduledTime = DateTime.UtcNow.AddHours(1);
        var now = DateTime.UtcNow;

        #region PartOCS_DelayedEvents
        // Process after delay
        context.Operation.AddEvent(new ReminderEvent(userId))
            .SetDelayBy(TimeSpan.FromHours(24));

        // Process at specific time
        context.Operation.AddEvent(new ScheduledEvent())
            .SetDelayUntil(scheduledTime);

        // Rate-limited (one per minute)
        context.Operation.AddEvent(new RateLimitedEvent())
            .SetDelayUntil(now, TimeSpan.FromMinutes(1), "rate-limit");
        #endregion

        #region PartOCS_EventConflictStrategies
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
        #endregion
    }
}

public static class ConfigExamples
{
    public static void ConfigureOperations(DbOperationsBuilder<AppDbContextExtended> operations)
    {
        {
            #region PartOCS_OperationLogReaderConfig
            operations.ConfigureOperationLogReader(_ => new() {
                StartOffset = TimeSpan.FromSeconds(3),     // Startup lookback
                CheckPeriod = TimeSpan.FromSeconds(5),     // Poll interval
                BatchSize = 64,                            // Ops per batch
                ConcurrencyLevel = Environment.ProcessorCount * 4,
            });
            #endregion
        }
        {
            #region PartOCS_OperationLogTrimmerConfig
            operations.ConfigureOperationLogTrimmer(_ => new() {
                MaxEntryAge = TimeSpan.FromMinutes(30),    // 30 min default
                CheckPeriod = TimeSpan.FromMinutes(15),
            });
            #endregion
        }
        {
            #region PartOCS_OperationScopeConfig
            operations.ConfigureOperationScope(_ => new() {
                IsolationLevel = System.Data.IsolationLevel.ReadCommitted,
            });
            #endregion
        }
        {
            #region PartOCS_EventLogReaderConfig
            operations.ConfigureEventLogReader(_ => new() {
                CheckPeriod = TimeSpan.FromSeconds(5),
                BatchSize = 64,
                ConcurrencyLevel = Environment.ProcessorCount * 4,
            });
            #endregion
        }
        {
            #region PartOCS_EventLogTrimmerConfig
            operations.ConfigureEventLogTrimmer(_ => new() {
                MaxEntryAge = TimeSpan.FromHours(1),       // 1 hour default
                CheckPeriod = TimeSpan.FromMinutes(15),
            });
            #endregion
        }
    }

    public static void ConfigureReprocessor(FusionBuilder fusion)
    {
        #region PartOCS_OperationReprocessorConfig
        fusion.AddOperationReprocessor(_ => new() {
            MaxRetryCount = 3,                         // Retry attempts
            RetryDelays = RetryDelaySeq.Exp(0.5, 3, 0.33),  // Exponential backoff
        });
        #endregion
    }
}

#region PartOCS_CommandTypes
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
#endregion

// Helper types
public record Order
{
    public long Id { get; init; }
}
public record User
{
    public long Id { get; init; }
}
public record SendOrderConfirmationCommand(long OrderId) : ICommand<Unit>;
public record ReminderEvent(long UserId) : ICommand<Unit>;
public record ScheduledEvent : ICommand<Unit>;
public record RateLimitedEvent : ICommand<Unit>;
public record NotifyEvent(long UserId) : ICommand<Unit>;
public record UniqueEvent : ICommand<Unit>;
public record UpdatableEvent : ICommand<Unit>;
public record ChildCommand(long ParentId) : ICommand<Unit>;

// Extended DbContext for examples
public class AppDbContextExtended : AppDbContext
{
    public AppDbContextExtended(DbContextOptions options) : base(options) { }
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<User> Users => Set<User>();
}
