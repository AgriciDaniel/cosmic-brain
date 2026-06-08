using ActualLab.CommandR;
using ActualLab.CommandR.Commands;
using ActualLab.CommandR.Configuration;
using ActualLab.Fusion;
// ReSharper disable ArrangeTypeMemberModifiers
// ReSharper disable InconsistentNaming

// ReSharper disable once CheckNamespace
namespace Docs.PartCCS;

// ============================================================================
// PartC-CS.md snippets: CommandR Cheat Sheet
// ============================================================================

#region PartCCS_CommandWithResult
public record CreateOrderCommand(long UserId, List<OrderItem> Items) : ICommand<Order>;
#endregion

#region PartCCS_CommandWithoutResult
public record DeleteOrderCommand(long OrderId) : ICommand<Unit>;
#endregion

public static class RegistrationExamples
{
    public static void RegisterCommandR()
    {
        #region PartCCS_RegisterCommandR
        var services = new ServiceCollection();

        // Add CommandR
        var commander = services.AddCommander();

        // Add handler classes
        commander.AddHandlers<OrderHandlers>();

        // Add command services (creates proxy)
        commander.AddService<OrderService>();
        #endregion
    }
}

#region PartCCS_InterfaceBasedHandler
public class CreateOrderHandler : ICommandHandler<CreateOrderCommand>
{
    public async Task OnCommand(
        CreateOrderCommand command,
        CommandContext context,
        CancellationToken ct)
    {
        // Handle command
    }
}

// Registration
// services.AddScoped<CreateOrderHandler>();
// commander.AddHandlers<CreateOrderHandler>();
#endregion

#region PartCCS_ConventionBasedHandler
public class OrderHandlers
{
    [CommandHandler]
    public async Task<Order> CreateOrder(
        CreateOrderCommand command,
        IOrderRepository repo, // Resolved from DI
        CancellationToken ct)
    {
        return await repo.Create(command, ct);
    }
}

// Registration
// services.AddScoped<OrderHandlers>();
// commander.AddHandlers<OrderHandlers>();
#endregion

#region PartCCS_CommandService
public class OrderService : ICommandService
{
    [CommandHandler]
    public virtual async Task<Order> CreateOrder( // Must be virtual
        CreateOrderCommand command,
        CancellationToken ct)
    {
        return default!;
    }
}

// Registration (creates proxy automatically)
// commander.AddService<OrderService>();

// Always use Commander - direct calls throw!
// await commander.Call(new CreateOrderCommand(...), ct);
// await orderService.CreateOrder(...); // Throws NotSupportedException!
#endregion

public class LoggingFilterService : ICommandService
{
    #region PartCCS_FilterHandler
    [CommandHandler(Priority = 100, IsFilter = true)]
    public virtual async Task LoggingFilter(ICommand command, CancellationToken ct)
    {
        var context = CommandContext.GetCurrent();
        Console.WriteLine($"Before: {command.GetType().Name}");
        try {
            await context.InvokeRemainingHandlers(ct);
        }
        finally {
            Console.WriteLine($"After: {command.GetType().Name}");
        }
    }
    #endregion
}

public static class ExecutingCommandsExample
{
    public static async Task Run(IServiceProvider services, CancellationToken ct = default)
    {
        #region PartCCS_ExecutingCommands
        var commander = services.Commander();
        var cmd = new CreateOrderCommand(1, new List<OrderItem>());

        // Call - returns result, throws on error
        var order = await commander.Call(cmd, ct);

        // Run - returns context, never throws
        var context = await commander.Run(cmd, ct);
        if (context.UntypedResult.Error is { } error)
            Console.WriteLine($"Error: {error}");

        // Start - fire and forget
        var startedContext = commander.Start(cmd);
        #endregion
        _ = order; _ = startedContext;
    }
}

public class CommandContextExampleService : ICommandService
{
    #region PartCCS_CommandContext
    [CommandHandler]
    public virtual async Task<Order> CreateOrder(CreateOrderCommand command, CancellationToken ct)
    {
        var context = CommandContext.GetCurrent();

        // Access services
        var db = context.Services.GetRequiredService<IOrderRepository>();

        // Store data for other handlers
        context.Items["Key"] = command.UserId;

        // Access outer context (for nested commands)
        var root = context.OutermostContext;

        // Share data across nested calls
        root.Items["SharedKey"] = command.Items;

        // Get commander
        var commander = context.Commander;
        return await db.Create(command, ct);
    }
    #endregion
}

public static class LocalCommandsExample
{
    public static async Task Run(ICommander commander, CancellationToken ct = default)
    {
        #region PartCCS_LocalCommands
        // Using LocalCommand factory
        var cmd1 = LocalCommand.New(() => Console.WriteLine("Hello"));
        var cmd2 = LocalCommand.New(async ct1 => await DoWorkAsync(ct1));
        var cmd3 = LocalCommand.New<int>(() => 42);

        await commander.Call(cmd1, ct);
        #endregion
        _ = cmd2; _ = cmd3;
    }

    private static Task DoWorkAsync(CancellationToken ct) => Task.CompletedTask;
}

#region PartCCS_PreparedCommands
public record ValidatedOrderCommand(long UserId, List<OrderItem> Items)
    : IPreparedCommand, ICommand<Order>
{
    public Task Prepare(CommandContext context, CancellationToken ct)
    {
        if (Items.Count == 0)
            throw new ArgumentException("Order must have items");
        return Task.CompletedTask;
    }
}
#endregion

public class OperationsFrameworkExampleService : IComputeService
{
    #region PartCCS_WithOperationsFramework
    [CommandHandler]
    public virtual async Task<Order> CreateOrder(
        CreateOrderCommand command, CancellationToken ct)
    {
        // Invalidation block (runs on all hosts)
        if (Invalidation.IsActive) {
            _ = GetOrders(command.UserId, default);
            return default!;
        }

        // Main logic (runs on originating host only)
        // await using var db = await DbHub.CreateOperationDbContext(ct);
        var order = new Order();
        // db.Orders.Add(order);
        // await db.SaveChangesAsync(ct);
        await Task.CompletedTask;
        return order;
    }
    #endregion

    [ComputeMethod]
    public virtual Task<Order[]> GetOrders(long userId, CancellationToken ct)
        => Task.FromResult(Array.Empty<Order>());
}

// Helper types
public record Order;
public class OrderItem { }
public interface IOrderRepository
{
    Task<Order> Create(CreateOrderCommand command, CancellationToken ct);
}
