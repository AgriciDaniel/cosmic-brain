using Microsoft.EntityFrameworkCore;
using ActualLab.Fusion.EntityFramework;
using ActualLab.Fusion.EntityFramework.Operations;
using ActualLab.Versioning;

// ReSharper disable ArrangeTypeMemberModifiers
// ReSharper disable InconsistentNaming

// ReSharper disable once CheckNamespace
namespace Docs.PartOEV;

// ============================================================================
// PartO-EV.md snippets: Operations Framework Events
// ============================================================================

#region PartOEV_DbContextWithEvents
public class AppDbContext : DbContextBase
{
    public DbSet<DbOperation> Operations => Set<DbOperation>();
    public DbSet<DbEvent> Events => Set<DbEvent>();  // Required for events

    public AppDbContext(DbContextOptions options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<DbOperation>().ToTable("_Operations");
        modelBuilder.Entity<DbEvent>().ToTable("_Events");
    }
}
#endregion

public record Order
{
    public long Id { get; init; }
    public long CustomerId { get; init; }
}

public record OrderCreatedEvent(long OrderId, long CustomerId) : ICommand<Unit>;

public class OrderService(IServiceProvider services) : DbServiceBase<AppDbContextExtended>(services), IComputeService
{
    #region PartOEV_AddingEvents
    [CommandHandler]
    public virtual async Task<Order> CreateOrder(
        CreateOrderCommand command, CancellationToken cancellationToken = default)
    {
        if (Invalidation.IsActive) {
            _ = GetOrder(command.OrderId, default);
            return default!;
        }

        var context = CommandContext.GetCurrent();
        await using var dbContext = await DbHub.CreateOperationDbContext(cancellationToken);

        var order = new Order { /* ... */ };
        dbContext.Orders.Add(order);
        await dbContext.SaveChangesAsync(cancellationToken);

        // Add an event to be processed after commit
        context.Operation.AddEvent(new OrderCreatedEvent(order.Id, order.CustomerId));

        return order;
    }
    #endregion

    [ComputeMethod] public virtual Task<Order?> GetOrder(long id, CancellationToken ct) => Task.FromResult<Order?>(null);
}

public record CreateOrderCommand(long OrderId) : ICommand<Order>;

public class EventConfigExamples
{
    public void FluentConfigurationExample(CommandContext context, Order order)
    {
        #region PartOEV_FluentConfiguration
        var @event = context.Operation.AddEvent(new OrderCreatedEvent(order.Id, order.CustomerId))
            .SetDelayBy(TimeSpan.FromMinutes(5))  // Process 5 minutes later
            .SetUuidConflictStrategy(KeyConflictStrategy.Skip);  // Skip if duplicate UUID
        #endregion
    }

    public void DelayedEventsExample(CommandContext context)
    {
        #region PartOEV_DelayedEvents
        // Process immediately
        context.Operation.AddEvent(new ImmediateEvent());

        // Process after 5 minutes
        context.Operation.AddEvent(new DelayedEvent())
            .SetDelayBy(TimeSpan.FromMinutes(5));

        // Process at specific time
        context.Operation.AddEvent(new ScheduledEvent())
            .SetDelayUntil(SystemClock.Instance.Now + TimeSpan.FromHours(1));
        #endregion
    }

    public void DelayQuantizationExample(CommandContext context)
    {
        #region PartOEV_DelayQuantization
        // Align to 1-minute boundaries (useful for rate limiting)
        context.Operation.AddEvent(new RateLimitedEvent())
            .SetDelayUntil(
                SystemClock.Instance.Now,
                TimeSpan.FromMinutes(1),  // Quantum
                "rate-limit"              // UUID prefix for deduplication
            );
        #endregion
    }

    public void ConflictStrategiesExample(CommandContext context, long userId)
    {
        #region PartOEV_ConflictStrategies
        // Example: Ensure only one notification per user per hour
        context.Operation.AddEvent(new NotificationEvent(userId))
            .SetUuid($"notify-{userId}-{DateTime.UtcNow:yyyy-MM-dd-HH}")
            .SetUuidConflictStrategy(KeyConflictStrategy.Skip);
        #endregion
    }
}

#region PartOEV_EventProcessorCommand
public record OrderCreatedEventCommand(long OrderId, long CustomerId) : ICommand<Unit>;

// This command will be executed when the event is processed
public class OrderEventProcessor : IComputeService
{
    [CommandHandler]
    public virtual async Task OnOrderCreated(
        OrderCreatedEventCommand command, CancellationToken cancellationToken = default)
    {
        // Send notification, update analytics, etc.
        await SendOrderConfirmation(command.OrderId, cancellationToken);
    }

    private Task SendOrderConfirmation(long orderId, CancellationToken ct) => Task.CompletedTask;
}
#endregion

public class EventLogReaderConfigExample
{
    public static void ReaderExample(IServiceCollection services)
    {
        services.AddDbContextServices<AppDbContextExtended>(db => {
            #region PartOEV_EventLogReaderConfig
            db.AddOperations(operations => {
                operations.ConfigureEventLogReader(_ => new() {
                    CheckPeriod = TimeSpan.FromSeconds(5).ToRandom(0.1),
                    BatchSize = 64,
                    ConcurrencyLevel = Environment.ProcessorCount * 4,
                });
            });
            #endregion
        });
    }

    public static void TrimmerExample(IServiceCollection services)
    {
        services.AddDbContextServices<AppDbContextExtended>(db => {
            #region PartOEV_EventLogTrimmerConfig
            db.AddOperations(operations => {
                operations.ConfigureEventLogTrimmer(_ => new() {
                    MaxEntryAge = TimeSpan.FromHours(1),  // Keep events for 1 hour
                    CheckPeriod = TimeSpan.FromMinutes(15).ToRandom(0.25),
                });
            });
            #endregion
        });
    }
}

public class CustomEventValuesExample
{
    public void ShowCustomEventValues(CommandContext context, User user)
    {
        #region PartOEV_CustomEventValues
        // Simple value
        context.Operation.AddEvent(new StringEvent("User created"));

        // Complex object
        context.Operation.AddEvent(new UserCreatedEvent {
            UserId = user.Id,
            Email = user.Email,
            CreatedAt = DateTime.UtcNow,
        });

        // Command (will be executed)
        context.Operation.AddEvent(new SendWelcomeEmailCommand(user.Id, user.Email));
        #endregion
    }
}

#region PartOEV_IHasUuidExample
public record OrderEvent(string Uuid, long OrderId) : IHasUuid;

// Usage: UUID is taken from the event value
public static class OrderEventUsage
{
    public static void Example(CommandContext context, long orderId)
        => context.Operation.AddEvent(new OrderEvent($"order-{orderId}", orderId));
}
#endregion

// Helper types
public record ImmediateEvent : ICommand<Unit>;
public record DelayedEvent : ICommand<Unit>;
public record ScheduledEvent : ICommand<Unit>;
public record RateLimitedEvent : ICommand<Unit>;
public record NotificationEvent(long UserId) : ICommand<Unit>;
public record StringEvent(string Message) : ICommand<Unit>;
public record UserCreatedEvent : ICommand<Unit>
{
    public long UserId { get; init; }
    public string Email { get; init; } = "";
    public DateTime CreatedAt { get; init; }
}
public record SendWelcomeEmailCommand(long UserId, string Email) : ICommand<Unit>;
public record User
{
    public long Id { get; init; }
    public string Email { get; init; } = "";
}

// Extended DbContext for examples
public class AppDbContextExtended : AppDbContext
{
    public AppDbContextExtended(DbContextOptions options) : base(options) { }
    public DbSet<Order> Orders => Set<Order>();
}
