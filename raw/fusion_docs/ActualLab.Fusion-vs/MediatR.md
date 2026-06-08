# ActualLab.Fusion vs MediatR

MediatR is a popular in-process mediator implementation for .NET. Both Fusion and MediatR provide command/request handling, but they serve different purposes.

## The Core Difference

**MediatR** is a mediator pattern implementation. You send requests through a mediator; handlers process them. It's about decoupling senders from receivers within a single process.

**Fusion** is a caching and synchronization framework with command handling. Commands trigger invalidations that propagate to clients. It's about keeping distributed state synchronized.

## MediatR Approach

```csharp
// Request
public record GetUserQuery(string UserId) : IRequest<User>;

// Handler
public class GetUserHandler : IRequestHandler<GetUserQuery, User>
{
    public async Task<User> Handle(GetUserQuery request, CancellationToken ct)
        => await _db.Users.FindAsync(request.UserId, ct);
}

// Usage
var user = await _mediator.Send(new GetUserQuery(userId));

// No caching, no real-time updates — just decoupled request handling
```

## Fusion Approach

```csharp
// Compute method (cached, reactive)
public class UserService : IComputeService
{
    [ComputeMethod]
    public virtual async Task<User> GetUser(string userId, CancellationToken ct)
        => await _db.Users.FindAsync(userId, ct);
}

// Usage — cached and observable
var computed = await Computed.Capture(() => userService.GetUser(userId));
await foreach (var c in computed.Changes(ct))
    Console.WriteLine(c.Value.Name);  // Automatic updates
```

## Where Each Excels

### ActualLab.Fusion is better at

- Caching with automatic invalidation
- Real-time updates to clients
- Dependency tracking between operations
- Distributed scenarios (client-server sync)
- Reducing database load via intelligent caching

### MediatR is better at

- Decoupling request senders from handlers
- Cross-cutting concerns via pipeline behaviors
- Simple in-process request/response patterns
- Organizing code by feature (vertical slices)
- Teams familiar with mediator pattern

## Feature Comparison

| Feature | MediatR | Fusion |
|---------|---------|--------|
| Request handling | Yes | Yes (commands) |
| Response caching | No | Yes (automatic) |
| Pipeline behaviors | Yes | Yes (filters) |
| Real-time updates | No | Yes |
| Dependency tracking | No | Yes |
| Client-server sync | No | Yes |
| In-process only | Yes | No (distributed) |

## When to Use Each

### Choose MediatR when:
- You want to decouple in-process components
- Building a traditional request-response API
- Cross-cutting concerns via behaviors are important
- No need for caching or real-time updates
- Team prefers mediator pattern organization

### Choose Fusion when:
- You need caching with automatic invalidation
- Real-time updates are required
- Building a reactive application
- Client-server synchronization matters
- Reducing redundant database queries is valuable

## Command Handling Comparison

**MediatR Command:**
```csharp
public record UpdateUserCommand(string UserId, string Name) : IRequest<Unit>;

public class UpdateUserHandler : IRequestHandler<UpdateUserCommand, Unit>
{
    public async Task<Unit> Handle(UpdateUserCommand cmd, CancellationToken ct)
    {
        await _db.Users.UpdateAsync(cmd.UserId, cmd.Name, ct);
        // No automatic notification to clients
        return Unit.Value;
    }
}
```

**Fusion Command:**
```csharp
public record UpdateUserCommand(string UserId, string Name) : ICommand<Unit>;

[CommandHandler]
public async Task UpdateUser(UpdateUserCommand cmd, CancellationToken ct)
{
    if (Invalidation.IsActive)
    {
        _ = GetUser(cmd.UserId, default);  // Clients observing GetUser are notified
        return;
    }
    await _db.Users.UpdateAsync(cmd.UserId, cmd.Name, ct);
}
```

## Using Both Together

MediatR and Fusion can complement each other:

```csharp
// MediatR for in-process orchestration
public class CreateOrderHandler : IRequestHandler<CreateOrderCommand, Order>
{
    private readonly OrderService _orderService;

    public async Task<Order> Handle(CreateOrderCommand cmd, CancellationToken ct)
    {
        // Validation via MediatR behaviors
        // Then delegate to Fusion for caching and real-time
        return await _orderService.Commander.Call(
            new CreateFusionOrderCommand(cmd.UserId, cmd.Items), ct);
    }
}
```

## Pipeline Behaviors vs Fusion Filters

**MediatR Pipeline:**
```csharp
public class LoggingBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
{
    public async Task<TResponse> Handle(TRequest request,
        RequestHandlerDelegate<TResponse> next, CancellationToken ct)
    {
        _logger.LogInformation("Handling {Request}", typeof(TRequest).Name);
        var response = await next();
        _logger.LogInformation("Handled {Request}", typeof(TRequest).Name);
        return response;
    }
}
```

**Fusion Command Filter:**
```csharp
public class LoggingFilter : ICommandFilter
{
    public async Task OnCommand(CommandContext context, CommandContinuation next)
    {
        _logger.LogInformation("Handling {Command}", context.Command.GetType().Name);
        await next();
        _logger.LogInformation("Handled {Command}", context.Command.GetType().Name);
    }
}
```

## The Key Insight

MediatR is about **in-process decoupling** — separating "what" from "who handles it" within a single application.

Fusion is about **caching and synchronization** — making data automatically fresh across clients and servers.

If your main goal is organizing code with mediator pattern, MediatR is a great fit. If your main goal is reactive, real-time applications with intelligent caching, Fusion provides that plus command handling.

See also: [MediatR Comparison](/PartC-MC) in the CommandR documentation for detailed feature comparison.
