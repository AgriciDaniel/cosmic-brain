using Microsoft.EntityFrameworkCore;
using ActualLab.Fusion.EntityFramework;
using ActualLab.Fusion.EntityFramework.Operations;
// ReSharper disable ArrangeTypeMemberModifiers
// ReSharper disable InconsistentNaming

// ReSharper disable once CheckNamespace
namespace Docs.PartOTR;

// ============================================================================
// PartO-TR.md snippets: Transient Operations
// ============================================================================

public class AppDbContext(DbContextOptions options) : DbContextBase(options)
{
    public DbSet<DbOperation> Operations => Set<DbOperation>();
    public DbSet<User> Users => Set<User>();
}

public record User
{
    public long UserId { get; init; }
    public string Name { get; set; } = "";
}

public record IncrementCommand(string Key) : ICommand<Unit>;

public record UpdateUserCommand(long UserId, string Name) : ICommand<Unit>;

public record SomeCommand : ICommand<Unit>;

public class CounterService(IServiceProvider services) : DbServiceBase<AppDbContext>(services), IComputeService
{
    private readonly ConcurrentDictionary<string, int> _counters = new();

    #region PartOTR_TransientOperation
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
    #endregion

    [ComputeMethod] public virtual Task<int> GetCounter(string key, CancellationToken ct) => Task.FromResult(_counters.GetValueOrDefault(key));
}

public class UserService(IServiceProvider services) : DbServiceBase<AppDbContext>(services), IComputeService
{
    #region PartOTR_PersistentOperation
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
    #endregion

    [ComputeMethod] public virtual Task<User?> GetUser(long id, CancellationToken ct) => Task.FromResult<User?>(null);
}

public class ControllingStorageExample(IServiceProvider services) : DbServiceBase<AppDbContext>(services), IComputeService
{
    #region PartOTR_ControlStorage
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
    #endregion
}
