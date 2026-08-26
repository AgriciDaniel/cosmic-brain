# Interceptors Cheat Sheet

Quick reference for ActualLab.Interception.

## Package Installation

```bash
dotnet add package ActualLab.Interception
# Source generator (required for proxy generation)
dotnet add package ActualLab.Generators
```

## Marker Interfaces

```cs
// Async method interception only (Task, ValueTask returns)
public interface IMyService : IRequiresAsyncProxy { }

// Both sync and async method interception
public interface IMyService : IRequiresFullProxy { }
```

## Minimal Interceptor

```cs
public sealed class MyInterceptor : Interceptor
{
    public new record Options : Interceptor.Options
    {
        public static Options Default { get; set; } = new();
    }

    public MyInterceptor(Options settings, IServiceProvider services)
        : base(settings, services) { }

    protected internal override Func<Invocation, object?>? CreateTypedHandler<TUnwrapped>(
        Invocation initialInvocation, MethodDef methodDef)
    {
        return invocation => invocation.InvokeIntercepted<TUnwrapped>();
    }
}
```

## Creating Proxies

```cs
// Simple proxy (no target)
var proxy = (IMyService)Proxies.New(typeof(IMyService), interceptor);

// Pass-through proxy (delegates to target)
var proxy = (IMyService)Proxies.New(typeof(IMyService), interceptor, target);

// With initialization callback
var proxy = (IMyService)Proxies.New(typeof(IMyService), interceptor, target, initialize: true);
```

## Invocation API

```cs
// In CreateTypedHandler:
return invocation => {
    // Read invocation data
    var proxy = invocation.Proxy;
    var method = invocation.Method;
    var args = invocation.Arguments;
    var target = invocation.InterfaceProxyTarget;

    // Read arguments
    var arg0 = args.Get<string>(0);
    var ct = args.GetCancellationToken(1);

    // Call original method
    return invocation.InvokeIntercepted<TUnwrapped>();
};
```

## ArgumentList API

See [ArgumentList API](./PartAP-AL.md) for full documentation.

```cs
var args = invocation.Arguments;

// Read arguments
args.Get<string>(0)              // Typed access
args.GetUntyped(0)               // As object?
args.GetCancellationToken(1)     // Optimized for CT

// Modify arguments
args.Set(0, "new value")         // Typed
args.SetUntyped(0, value)        // As object?
args.SetCancellationToken(1, ct) // Optimized for CT

// Properties & utilities
args.Length                      // Argument count
args.ToArray()                   // Convert to object?[]
args.Duplicate()                 // Clone
```

## MethodDef Properties

| Property | Type | Description |
|----------|------|-------------|
| `MethodInfo` | `MethodInfo` | Reflected method info |
| `FullName` | `string` | `Namespace.Type.Method` |
| `ReturnType` | `Type` | Full return type |
| `UnwrappedReturnType` | `Type` | `T` from `Task<T>` |
| `IsAsyncMethod` | `bool` | Returns Task/ValueTask |
| `ReturnsTask` | `bool` | Returns `Task<T>` |
| `ReturnsValueTask` | `bool` | Returns `ValueTask<T>` |
| `IsAsyncVoidMethod` | `bool` | Returns `Task`/`ValueTask` (no T) |
| `CancellationTokenIndex` | `int` | Index or -1 |
| `DefaultResult` | `object?` | Default return value |
| `Parameters` | `ParameterInfo[]` | Method parameters |

## MethodDef Helpers

```cs
// Wrap result back to Task<T>/ValueTask<T>
methodDef.WrapResult(result);

// Get default result (completed task for async)
var defaultResult = methodDef.DefaultResult;
```

## Interceptor Properties

```cs
public MyInterceptor(Options settings, IServiceProvider services)
    : base(settings, services)
{
    MustInterceptAsyncCalls = true;   // Default: true
    MustInterceptSyncCalls = false;   // Default: false
    MustValidateProxyType = true;     // Default: true
    UsesUntypedHandlers = false;      // Default: false (use typed)
}
```

## Untyped Handlers

```cs
public MyInterceptor(Options settings, IServiceProvider services)
    : base(settings, services)
{
    UsesUntypedHandlers = true;  // Required for untyped
}

protected internal override Func<Invocation, object?>? CreateUntypedHandler(
    Invocation initialInvocation, MethodDef methodDef)
{
    return invocation => invocation.InvokeInterceptedUntyped();
}
```

## Built-in Interceptors

```cs
// Scheduling
new SchedulingInterceptor(SchedulingInterceptor.Options.Default, services) {
    TaskFactoryResolver = inv => myTaskFactory,
    NextInterceptor = chainedInterceptor
};

// Scoped Service
new ScopedServiceInterceptor(ScopedServiceInterceptor.Options.Default, services) {
    ScopedServiceType = typeof(IMyService),
    MustInterceptSyncCalls = true
};

// Typed Factory
new TypedFactoryInterceptor(TypedFactoryInterceptor.Options.Default, services);
```

## DI Registration

```cs
// Singleton interceptor
services
    .AddSingleton(MyInterceptor.Options.Default)
    .AddSingleton<MyInterceptor>();

var interceptor = services.GetRequiredService<MyInterceptor>();
```

**Singleton proxy registration:**
```cs
services.AddSingleton(MyInterceptor.Options.Default);
services.AddSingleton<MyInterceptor>();
services.AddSingleton<IMyService>(c => {
    var interceptor = c.GetRequiredService<MyInterceptor>();
    return (IMyService)Proxies.New(typeof(IMyService), interceptor);
});
```

**Transient proxy registration:**
```cs
services.AddSingleton(MyInterceptor.Options.Default);
services.AddSingleton<MyInterceptor>();
services.AddTransient<IMyService>(c => {
    var interceptor = c.GetRequiredService<MyInterceptor>();
    return (IMyService)Proxies.New(typeof(IMyService), interceptor);
});
```

## Validation

```cs
protected override void ValidateTypeInternal(Type type)
{
    // Called once per type, cached
    // Throw to reject invalid types
}
```

## Proxy Type Resolution

```cs
// Get proxy type
var proxyType = Proxies.GetProxyType<IMyService>();
var proxyType = Proxies.GetProxyType(typeof(IMyService));
var proxyType = Proxies.TryGetProxyType(typeof(IMyService)); // Returns null if not found

// Generated proxy naming convention:
// Original: MyNamespace.IMyService
// Proxy:    MyNamespace.ActualLabProxies.IMyServiceProxy
```

## Common Patterns

**Return default:**
```cs
return _ => methodDef.DefaultResult;
```

**Skip interception (pass-through):**
```cs
return null; // Falls through to target or throws
```

**Async handler:**
```cs
return async invocation => {
    var task = (Task<TUnwrapped>)invocation.InvokeIntercepted<TUnwrapped>()!;
    var result = await task;
    return methodDef.WrapResult(result);
};
```

**Conditional interception:**
```cs
protected override MethodDef? CreateMethodDef(MethodInfo method, Type proxyType)
{
    // Return null to skip interception for this method
    if (method.GetCustomAttribute<NoInterceptAttribute>() != null)
        return null;
    return base.CreateMethodDef(method, proxyType);
}
```
