# MediatR Comparison

If you're familiar with [MediatR](https://github.com/jbogard/MediatR), this guide will help you understand how CommandR maps to MediatR concepts and what additional features CommandR provides.

## Terminology Mapping

| MediatR | CommandR |
|---------|----------|
| `IMediator` | `ICommander` |
| `IServiceCollection.AddMediatR` | `IServiceCollection.AddCommander` |
| `IServiceProvider.GetRequiredService<IMediator>` | `.GetRequiredService<ICommander>()` or `.Commander()` |
| `IMediator.Send(command, ct)` | `ICommander.Call(command, ct)` |
| `IRequest<TResult>` | `ICommand<TResult>` |
| `IRequest` | `ICommand<Unit>` |
| `IRequestHandler<TCommand, TResult>` | `ICommandHandler<TCommand>` (result type encoded in `TCommand`) |
| `IRequestHandler<TCommand, Unit>` | `ICommandHandler<TCommand>` |
| `RequestHandler<T, Unit>` (sync) | No synchronous handlers |
| `INotification` | `IEventCommand` (may have multiple final handlers) |
| `IPipelineBehavior<TReq, TResp>` | Any filtering handler |
| Exception handlers | Any filtering handler can do this |

## Key Differences

### 1. Unified Handler Pipeline

In MediatR, pipeline behaviors are the same for all commands. In CommandR, any handler can act as either a filter (middleware) or a final handler:

**MediatR:**
```cs
// Pipeline behavior applies to all commands
public class LoggingBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
{
    public async Task<TResponse> Handle(TRequest request, ...)
    {
        // Runs for ALL commands
    }
}
```

**CommandR:**
```cs
// Filter handler can target specific command types
[CommandHandler(Priority = 10, IsFilter = true)]
public async Task OnPaymentCommand(IPaymentCommand command, CancellationToken ct)
{
    // Runs only for IPaymentCommand and its derivatives
    await context.InvokeRemainingHandlers(ct);
}
```

### 2. CommandContext

CommandR provides `CommandContext`, similar to `HttpContext`, for accessing state during command execution:

```cs
[CommandHandler]
public async Task<Order> CreateOrder(CreateOrderCommand command, CancellationToken ct)
{
    var context = CommandContext.GetCurrent();

    // Access scoped services
    var db = context.Services.GetRequiredService<AppDbContext>();

    // Store data for other handlers
    context.Items["StartTime"] = DateTime.UtcNow;

    // Access outer context for nested commands
    var rootContext = context.OutermostContext;

    // ...
}
```

### 3. Convention-Based Handler Discovery

CommandR doesn't require implementing interfaces for every handler:

**MediatR:**
```cs
public class CreateOrderHandler : IRequestHandler<CreateOrderCommand, Order>
{
    public async Task<Order> Handle(CreateOrderCommand request, CancellationToken ct)
    {
        // ...
    }
}
```

**CommandR:**
```cs
public class OrderHandlers
{
    [CommandHandler] // Just add an attribute
    public async Task<Order> CreateOrder(
        CreateOrderCommand command,
        IOrderService orderService, // Resolved from DI
        CancellationToken ct)
    {
        // ...
    }
}
```

### 4. Command Services with Interceptors

Command services use interceptors to enforce that all handler methods go through the Commander pipeline:

```cs
public class OrderService : ICommandService
{
    [CommandHandler]
    public virtual async Task<Order> CreateOrder(
        CreateOrderCommand command, CancellationToken ct)
    {
        // ...
    }
}

// Registration creates a proxy
commander.AddService<OrderService>();

// Correct - use Commander:
await commander.Call(new CreateOrderCommand(...), ct);

// Direct calls throw NotSupportedException!
await orderService.CreateOrder(new CreateOrderCommand(...), ct); // Throws!
```

This design ensures all command executions go through the full pipeline (filters, scoping, Operations Framework integration).

### 5. Handler Registration

**MediatR:**
```cs
services.AddMediatR(cfg => {
    cfg.RegisterServicesFromAssembly(typeof(Program).Assembly);
});
```

**CommandR:**
```cs
// Add specific handlers
services.AddCommander()
    .AddHandlers<OrderHandlers>()
    .AddHandlers<PaymentHandlers>();

// Or add command services (creates proxies)
services.AddCommander()
    .AddService<OrderService>();
```

## Migration Guide

### Basic Command

**MediatR:**
```cs
public record CreateOrderCommand(long UserId, List<OrderItem> Items)
    : IRequest<Order>;

public class CreateOrderHandler : IRequestHandler<CreateOrderCommand, Order>
{
    private readonly IOrderRepository _repository;

    public CreateOrderHandler(IOrderRepository repository)
    {
        _repository = repository;
    }

    public async Task<Order> Handle(CreateOrderCommand request, CancellationToken ct)
    {
        return await _repository.Create(request.UserId, request.Items, ct);
    }
}
```

**CommandR:**
```cs
public record CreateOrderCommand(long UserId, List<OrderItem> Items)
    : ICommand<Order>
{
    public CreateOrderCommand() : this(0, new()) { } // For serialization
}

public class OrderHandlers
{
    private readonly IOrderRepository _repository;

    public OrderHandlers(IOrderRepository repository)
    {
        _repository = repository;
    }

    [CommandHandler]
    public async Task<Order> CreateOrder(CreateOrderCommand command, CancellationToken ct)
    {
        return await _repository.Create(command.UserId, command.Items, ct);
    }
}

// Registration
services.AddScoped<OrderHandlers>();
services.AddCommander().AddHandlers<OrderHandlers>();
```

### Pipeline Behavior

**MediatR:**
```cs
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
```

**CommandR:**
```cs
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

// Registration
services.AddSingleton<ValidationHandler>();
services.AddCommander().AddHandlers<ValidationHandler>();
```

### Notification (Event)

**MediatR:**
```cs
public record OrderCreatedNotification(Order Order) : INotification;

public class OrderCreatedHandler1 : INotificationHandler<OrderCreatedNotification>
{
    public Task Handle(OrderCreatedNotification notification, CancellationToken ct)
    {
        // Send email
    }
}

public class OrderCreatedHandler2 : INotificationHandler<OrderCreatedNotification>
{
    public Task Handle(OrderCreatedNotification notification, CancellationToken ct)
    {
        // Update analytics
    }
}
```

**CommandR:**
```cs
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
    }

    [CommandHandler]
    public Task UpdateAnalytics(OrderCreatedEvent evt, CancellationToken ct)
    {
        // Update analytics
    }
}
```

## When to Choose CommandR

CommandR is designed specifically for Fusion's needs:

1. **Multi-host invalidation**: The Operations Framework requires an extensible pipeline for operation logging and replay.

2. **RPC integration**: CommandR integrates seamlessly with ActualLab.Rpc for distributed command execution.

3. **Compute service integration**: Commands can trigger invalidation in compute services automatically.

4. **AOP handlers**: Direct method calls go through the pipeline, enabling transparent command execution.

If you're building a Fusion application, CommandR provides these integrations out of the box. For simple CQRS needs without Fusion, MediatR remains a valid choice.
