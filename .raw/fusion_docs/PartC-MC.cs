using ActualLab.CommandR;
using ActualLab.CommandR.Commands;
using ActualLab.CommandR.Configuration;
using ActualLab.Fusion;
using MediatR;
// ReSharper disable ArrangeTypeMemberModifiers
// ReSharper disable InconsistentNaming

// ReSharper disable once CheckNamespace
namespace Docs.PartCMC;

// ============================================================================
// PartC-MC.md snippets: MediatR Comparison
// ============================================================================

#region PartCMC_MediatRPipeline
// Pipeline behavior applies to all commands
public class LoggingBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
{
    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken ct)
    {
        // Runs for ALL commands
        return await next();
    }
}
#endregion

public class PaymentCommandFilter : ICommandService
{
    #region PartCMC_CommandRPipeline
    // Filter handler can target specific command types
    [CommandHandler(Priority = 10, IsFilter = true)]
    public virtual async Task OnPaymentCommand(IPaymentCommand command, CancellationToken ct)
    {
        // Runs only for IPaymentCommand and its derivatives
        var context = CommandContext.GetCurrent();
        await context.InvokeRemainingHandlers(ct);
    }
    #endregion
}

public class OrderServiceContextExample : ICommandService
{
    #region PartCMC_CommandContext
    [CommandHandler]
    public virtual async Task<Order> CreateOrderWithContext(CreateOrderCommand command, CancellationToken ct)
    {
        var context = CommandContext.GetCurrent();

        // Access scoped services
        var repo = context.Services.GetRequiredService<IOrderRepository>();

        // Store data for other handlers
        context.Items["StartTime"] = DateTime.UtcNow;

        // Access outer context for nested commands
        var rootContext = context.OutermostContext;
        _ = rootContext;

        return await repo.Create(command.UserId, command.Items, ct);
    }
    #endregion
}

#region PartCMC_MediatRHandler
public class CreateOrderMediatRHandler : IRequestHandler<CreateOrderCommandMediatR, Order>
{
    public async Task<Order> Handle(CreateOrderCommandMediatR request, CancellationToken ct)
    {
        // ...
        await Task.CompletedTask;
        return new Order();
    }
}
#endregion

#region PartCMC_CommandRHandler
public class OrderHandlers
{
    [CommandHandler] // Just add an attribute
    public async Task<Order> CreateOrder(
        CreateOrderCommand command,
        IOrderService orderService, // Resolved from DI
        CancellationToken ct)
    {
        await Task.CompletedTask;
        return default!;
    }
}
#endregion

#region PartCMC_CommandServiceInterceptor
public class OrderService : ICommandService
{
    [CommandHandler]
    public virtual async Task<Order> CreateOrder(
        CreateOrderCommand command, CancellationToken ct)
    {
        await Task.CompletedTask;
        return default!;
    }
}

// Registration creates a proxy:
// commander.AddService<OrderService>();

// Correct - use Commander:
// await commander.Call(new CreateOrderCommand(...), ct);

// Direct calls throw NotSupportedException!
// await orderService.CreateOrder(new CreateOrderCommand(...), ct); // Throws!
#endregion

public static class RegistrationExamples
{
    public static void MediatRRegistration(IServiceCollection services)
    {
        #region PartCMC_MediatRRegistration
        // MediatR-style registration (using the shim namespace in this doc project)
        services.AddMediatR(cfg => {
            cfg.RegisterServicesFromAssembly(typeof(RegistrationExamples).Assembly);
        });
        #endregion
    }

    public static void CommandRRegistration(IServiceCollection services)
    {
        #region PartCMC_CommandRRegistration
        // Add specific handlers
        services.AddCommander()
            .AddHandlers<OrderHandlers>()
            .AddHandlers<PaymentHandlers>();

        // Or add command services (creates proxies)
        services.AddCommander()
            .AddService<OrderService>();
        #endregion
    }
}

#region PartCMC_MediatRMigrationBefore
public record CreateOrderCommandMediatR(long UserId, List<OrderItem> Items)
    : IRequest<Order>;

public class CreateOrderHandlerMediatR(IOrderRepository repository)
    : IRequestHandler<CreateOrderCommandMediatR, Order>
{
    public async Task<Order> Handle(CreateOrderCommandMediatR request, CancellationToken ct)
    {
        return await repository.Create(request.UserId, request.Items, ct);
    }
}
#endregion

#region PartCMC_MediatRMigrationAfter
public record CreateOrderCommand(long UserId, List<OrderItem> Items)
    : ICommand<Order>;

public class OrderHandlersForMigration(IOrderRepository repository)
{
    [CommandHandler]
    public async Task<Order> CreateOrder(CreateOrderCommand command, CancellationToken ct)
    {
        return await repository.Create(command.UserId, command.Items, ct);
    }
}

// Registration:
// services.AddScoped<OrderHandlers>();
// services.AddCommander().AddHandlers<OrderHandlers>();
#endregion

#region PartCMC_MediatRValidationBefore
public class ValidationBehavior<TRequest, TResponse>
    : IPipelineBehavior<TRequest, TResponse>
{
    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken ct)
    {
        // Validate
        if (request is IValidatable v)
            v.Validate();

        return await next();
    }
}
#endregion

#region PartCMC_MediatRValidationAfter
public class ValidationHandler
{
    [CommandHandler(Priority = 1000, IsFilter = true)]
    public async Task OnCommand(ICommand command, CancellationToken ct)
    {
        if (command is IValidatable v)
            v.Validate();

        var context = CommandContext.GetCurrent();
        await context.InvokeRemainingHandlers(ct);
    }
}

// Registration:
// services.AddSingleton<ValidationHandler>();
// services.AddCommander().AddHandlers<ValidationHandler>();
#endregion

#region PartCMC_MediatRNotificationBefore
public record OrderCreatedNotification(Order Order) : INotification;

public class OrderCreatedHandler1 : INotificationHandler<OrderCreatedNotification>
{
    public Task Handle(OrderCreatedNotification notification, CancellationToken ct)
    {
        // Send email
        return Task.CompletedTask;
    }
}

public class OrderCreatedHandler2 : INotificationHandler<OrderCreatedNotification>
{
    public Task Handle(OrderCreatedNotification notification, CancellationToken ct)
    {
        // Update analytics
        return Task.CompletedTask;
    }
}
#endregion

#region PartCMC_MediatRNotificationAfter
public record OrderCreatedEvent(Order Order) : IEventCommand
{
    public string ChainId { get; init; } = "";
}

// Multiple handlers will execute in parallel
public class OrderEventHandlers
{
    [CommandHandler]
    public Task SendEmail(OrderCreatedEvent evt, CancellationToken ct)
    {
        // Send email
        return Task.CompletedTask;
    }

    [CommandHandler]
    public Task UpdateAnalytics(OrderCreatedEvent evt, CancellationToken ct)
    {
        // Update analytics
        return Task.CompletedTask;
    }
}
#endregion

// Helper types
public record Order;
public class OrderItem { }
public interface IOrderService { }
public interface IOrderRepository
{
    Task<Order> Create(long userId, List<OrderItem> items, CancellationToken ct);
}
public interface IValidatable
{
    void Validate();
}
public interface IPaymentCommand : ICommand;

public class PaymentHandlers
{
    [CommandHandler]
    public Task ProcessPayment(PaymentCommand cmd, CancellationToken ct) => Task.CompletedTask;
}
public record PaymentCommand(decimal Amount) : IPaymentCommand, ICommand<Unit>;
