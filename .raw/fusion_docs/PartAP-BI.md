# Built-in Interceptors

ActualLab.Interception provides several ready-to-use interceptors for common scenarios.

## SchedulingInterceptor

Schedules async method execution on a custom `TaskFactory` or `TaskScheduler`.

**Use cases:**
- Run methods on a specific thread (UI thread, dedicated worker)
- Limit concurrency using `ConcurrentExclusiveSchedulerPair`
- Chain with another interceptor

**Configuration:**

| Property | Description |
|----------|-------------|
| `TaskFactoryResolver` | Function that returns `TaskFactory?` per invocation. Return `null` to skip scheduling. |
| `NextInterceptor` | Optional interceptor to chain after scheduling |

**Example:**

```cs
// Create a limited concurrency scheduler
var scheduler = new ConcurrentExclusiveSchedulerPair(
    TaskScheduler.Default,
    maxConcurrencyLevel: 4
).ConcurrentScheduler;
var taskFactory = new TaskFactory(scheduler);

var interceptor = new SchedulingInterceptor(SchedulingInterceptor.Options.Default, services) {
    TaskFactoryResolver = _ => taskFactory
};

var proxy = (IMyService)Proxies.New(typeof(IMyService), interceptor, realService);
// All async calls now run with max 4 concurrent operations
```

**With IHasTaskFactory:**

```cs
public interface IMyService : IRequiresAsyncProxy, IHasTaskFactory
{
    TaskFactory? TaskFactory { get; }
    Task DoWorkAsync();
}

// Default TaskFactoryResolver checks for IHasTaskFactory
var interceptor = new SchedulingInterceptor(SchedulingInterceptor.Options.Default, services);
// TaskFactory is resolved from the proxy itself
```

## ScopedServiceInterceptor

Creates a new `IServiceScope` for each method call, resolving the service from that scope.

**Use cases:**
- Per-request scoping for services
- Ensuring DbContext and other scoped services are properly isolated
- Automatic scope disposal

**Configuration:**

| Property | Description |
|----------|-------------|
| `ScopedServiceType` | The type to resolve from the scope (required) |
| `MustInterceptSyncCalls` | Set to `true` to also intercept sync methods |

**Example:**

```cs
var services = new ServiceCollection()
    .AddScoped<IOrderService, OrderService>()
    .AddScoped<AppDbContext>()
    .BuildServiceProvider();

var interceptor = new ScopedServiceInterceptor(ScopedServiceInterceptor.Options.Default, services) {
    ScopedServiceType = typeof(IOrderService)
};

var proxy = (IOrderService)Proxies.New(typeof(IOrderService), interceptor);

// Each call creates a new scope:
await proxy.CreateOrderAsync(order);  // Scope 1 - disposed after completion
await proxy.GetOrderAsync(id);        // Scope 2 - disposed after completion
```

**With RPC:**

```cs
services.AddRpc(rpc => {
    rpc.Configure(typeof(IOrderService)).HasServer(
        ServiceResolver.New<IOrderService>(c => {
            var interceptor = new ScopedServiceInterceptor(
                ScopedServiceInterceptor.Options.Default, c) {
                ScopedServiceType = typeof(IOrderService)
            };
            return (IOrderService)Proxies.New(typeof(IOrderService), interceptor);
        }));
});
```

## TypedFactoryInterceptor

Creates new instances using `ActivatorUtilities.CreateFactory` for each method call.

**Use cases:**
- Factory pattern interfaces
- Creating instances with constructor injection

**Configuration:**

Only intercepts synchronous methods. The return type determines the type to create.

**Example:**

```cs
public interface IWidgetFactory : IRequiresFullProxy
{
    Widget CreateWidget(string name);
    SpecialWidget CreateSpecialWidget(int id, string config);
}

var interceptor = new TypedFactoryInterceptor(TypedFactoryInterceptor.Options.Default, services);
var factory = (IWidgetFactory)Proxies.New(typeof(IWidgetFactory), interceptor);

// Creates new Widget using ActivatorUtilities, passing "name" as constructor arg
var widget = factory.CreateWidget("MyWidget");
```

## Fusion Interceptors

These interceptors are part of Fusion's higher-level packages:

### ComputeServiceInterceptor (ActualLab.Fusion)

Powers `[ComputeMethod]` caching and dependency tracking.

- Uses untyped handlers for maximum performance
- Chains to `CommandServiceInterceptor` for non-compute methods
- Creates `ComputeMethodDef` with compute-specific metadata

### CommandServiceInterceptor (ActualLab.CommandR)

Routes command handler method calls through the CommandR pipeline.

- Ensures commands run within proper `CommandContext`
- Validates `[CommandHandler]` attributes
- Used by both CommandR and Fusion

### RpcInterceptor (ActualLab.Rpc)

Handles remote procedure calls.

- Routes calls to remote services via ActualLab.Rpc
- Handles inbound and outbound call routing
- Manages RPC service definitions

### RemoteComputeServiceInterceptor (ActualLab.Fusion)

Combines compute and RPC interception for client-side proxies.

- Extends `ComputeServiceInterceptor`
- Routes compute method calls over RPC
- Maintains cache consistency across network boundary

## Creating Custom Interceptors

See the main [Interceptors documentation](./PartAP.md#getting-started) for how to create your own interceptor.

Common patterns:

**Logging/Metrics:**
```cs
protected internal override Func<Invocation, object?>? CreateTypedHandler<TUnwrapped>(
    Invocation initialInvocation, MethodDef methodDef)
{
    var methodName = methodDef.FullName;
    return invocation => {
        var sw = Stopwatch.StartNew();
        try {
            return invocation.InvokeIntercepted<TUnwrapped>();
        }
        finally {
            _metrics.RecordDuration(methodName, sw.Elapsed);
        }
    };
}
```

**Caching:**
```cs
protected internal override Func<Invocation, object?>? CreateTypedHandler<TUnwrapped>(
    Invocation initialInvocation, MethodDef methodDef)
{
    return invocation => {
        var key = ComputeCacheKey(invocation);
        if (_cache.TryGetValue(key, out var cached))
            return methodDef.WrapResult((TUnwrapped)cached!);

        var result = invocation.InvokeIntercepted<TUnwrapped>();
        _cache.Set(key, result);
        return methodDef.WrapResult(result);
    };
}
```

**Retry:**
```cs
protected internal override Func<Invocation, object?>? CreateTypedHandler<TUnwrapped>(
    Invocation initialInvocation, MethodDef methodDef)
{
    if (!methodDef.IsAsyncMethod)
        return null; // Only handle async methods

    return async invocation => {
        for (var attempt = 0; attempt < 3; attempt++) {
            try {
                var task = (Task<TUnwrapped>)invocation.InvokeIntercepted<TUnwrapped>()!;
                return methodDef.WrapResult(await task);
            }
            catch (TransientException) when (attempt < 2) {
                await Task.Delay(100 * (attempt + 1));
            }
        }
        throw new InvalidOperationException("Should not reach here");
    };
}
```
