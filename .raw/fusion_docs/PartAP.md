# Interceptors and Proxies

[ActualLab.Interception](https://www.nuget.org/packages/ActualLab.Interception/)
is a high-performance method interception library that powers Fusion's compute services, CommandR, and RPC.

> **Why does ActualLab.Interception exist?**
> Fusion requires the ability to intercept method calls transparently:
> - **Compute Services** intercept `[ComputeMethod]` calls to cache and track dependencies
> - **CommandR** intercepts command handler methods to run them through its pipeline
> - **RPC** intercepts remote service calls to route them over the network
>
> Rather than using reflection-based proxies (like Castle DynamicProxy), ActualLab uses
> **compile-time source generation** via [ActualLab.Generators](https://www.nuget.org/packages/ActualLab.Generators/)
> for better performance and AOT compatibility.

## Key Features

- **Compile-time proxy generation**: No runtime reflection or IL emission
- **AOT and trimming compatible**: Works with NativeAOT and trimmed applications
- **High performance**: 8x faster than Castle DynamicProxy in benchmarks
- **Simple API**: Extend `Interceptor` and override one method
- **Typed and untyped handlers**: Choose the right approach for your use case
- **Built-in interceptors**: Scheduling, scoped services, typed factories

## Required Packages

| Package | Purpose |
|---------|---------|
| [ActualLab.Interception](https://www.nuget.org/packages/ActualLab.Interception/) | Core interception: `Interceptor`, `IProxy`, `Invocation` |
| [ActualLab.Generators](https://www.nuget.org/packages/ActualLab.Generators/) | Source generator for proxy classes (compile-time) |

::: tip
If you're using Fusion, RPC, or CommandR, these packages are already included. You only need to reference them directly when building custom interception without Fusion.
:::

## How It Works

The interception system has three main components:

1. **Marker Interfaces** (`IRequiresAsyncProxy`, `IRequiresFullProxy`) - Tag types that need proxies
2. **Source Generator** (`ActualLab.Generators`) - Generates proxy classes at compile time
3. **Interceptor** - Your custom logic that runs when proxy methods are called

```
Your Interface                  Generated Proxy                    Your Interceptor
┌─────────────────┐            ┌─────────────────────┐            ┌─────────────────┐
│ IMyService      │            │ MyServiceProxy      │            │ MyInterceptor   │
│ : IRequires...  │  ───────>  │ : IMyService        │  ───────>  │ : Interceptor   │
│                 │  generates │ : IProxy            │  delegates │                 │
│ Task<T> Foo()   │            │ Interceptor field   │    to      │ CreateHandler() │
└─────────────────┘            └─────────────────────┘            └─────────────────┘
```

## Getting Started

### 1. Define an Interface with Proxy Marker

<!-- snippet: PartAP_SimpleInterface -->
```cs
// IRequiresAsyncProxy: generates proxy that intercepts async methods only
// IRequiresFullProxy: generates proxy that intercepts both sync and async methods
public interface IGreetingService : IRequiresAsyncProxy
{
    Task<string> GreetAsync(string name, CancellationToken cancellationToken = default);
}
```
<!-- endSnippet -->

### 2. Create an Interceptor

<!-- snippet: PartAP_SimpleInterceptor -->
```cs
public sealed class LoggingInterceptor : Interceptor
{
    // Options record is required - extend Interceptor.Options
    public new record Options : Interceptor.Options
    {
        public static Options Default { get; set; } = new();
    }

    public LoggingInterceptor(Options settings, IServiceProvider services)
        : base(settings, services)
    {
        // MustInterceptAsyncCalls = true; // Default
        // MustInterceptSyncCalls = false; // Default, set to true for IRequiresFullProxy
    }

    // Override this for typed handlers (type-safe, slightly more overhead)
    protected override Func<Invocation, object?>? CreateTypedHandler<TUnwrapped>(
        Invocation initialInvocation, MethodDef methodDef)
    {
        // TUnwrapped is the unwrapped return type (e.g., string for Task<string>)
        // Return null to skip interception (falls through to target or throws)
        if (methodDef.IsAsyncMethod) {
            // For async methods, use InterceptedAsyncInvoker which returns Task<TUnwrapped>
            var asyncInvoker = (Func<Invocation, Task<TUnwrapped>>)methodDef.InterceptedAsyncInvoker;
            return invocation => {
                Console.WriteLine($"Calling: {methodDef.FullName}");
                var resultTask = LogAndWrap(methodDef, asyncInvoker.Invoke(invocation));
                // Wrap result to proper return type (Task<T> or ValueTask<T>)
                return methodDef.WrapAsyncInvokerResultOfAsyncMethod(resultTask);
            };
        }
        // For sync methods
        return invocation => {
            Console.WriteLine($"Calling: {methodDef.FullName}");
            try {
                var result = invocation.InvokeInterceptedUntyped();
                Console.WriteLine($"Completed: {methodDef.FullName}");
                return result;
            }
            catch (Exception e) {
                Console.WriteLine($"Failed: {methodDef.FullName}: {e.Message}");
                throw;
            }
        };
    }

    private static async Task<TUnwrapped> LogAndWrap<TUnwrapped>(MethodDef methodDef, Task<TUnwrapped> task)
    {
        try {
            var result = await task.ConfigureAwait(false);
            Console.WriteLine($"Completed: {methodDef.FullName}");
            return result;
        }
        catch (Exception e) {
            Console.WriteLine($"Failed: {methodDef.FullName}: {e.Message}");
            throw;
        }
    }
}
```
<!-- endSnippet -->

### 3. Create and Use the Proxy

<!-- snippet: PartAP_CreateProxy -->
```cs
var services = new ServiceCollection()
    .AddSingleton(LoggingInterceptor.Options.Default)
    .AddSingleton<LoggingInterceptor>()
    .BuildServiceProvider();

var interceptor = services.GetRequiredService<LoggingInterceptor>();
var realService = new GreetingService();

// Create a proxy - Proxies.New finds the generated proxy type automatically
var proxy = (IGreetingService)Proxies.New(
    typeof(IGreetingService),
    interceptor,
    proxyTarget: realService); // Pass-through to real implementation

// All calls now go through your interceptor
var greeting = await proxy.GreetAsync("World");
```
<!-- endSnippet -->

## Core Concepts

### Marker Interfaces

| Interface | Description |
|-----------|-------------|
| `IRequiresAsyncProxy` | Generates proxy that intercepts async methods (`Task`, `ValueTask`) |
| `IRequiresFullProxy` | Extends above; also intercepts synchronous methods |

Use `IRequiresAsyncProxy` when you only need to intercept async methods (most common).
Use `IRequiresFullProxy` when you also need to intercept synchronous methods.

### The Invocation Struct

`Invocation` contains everything about the intercepted call:

<!-- snippet: PartAP_InvocationUsage -->
```cs
protected override Func<Invocation, object?>? CreateTypedHandler<TUnwrapped>(
    Invocation initialInvocation, MethodDef methodDef)
{
    // For async methods, use the appropriate invoker
    if (methodDef.IsAsyncMethod) {
        var asyncInvoker = (Func<Invocation, Task<TUnwrapped>>)methodDef.InterceptedAsyncInvoker;
        return invocation => {
            // Access invocation details
            var proxy = invocation.Proxy;           // The proxy instance
            var method = invocation.Method;         // MethodInfo being called
            var args = invocation.Arguments;        // ArgumentList with call arguments
            var target = invocation.InterfaceProxyTarget; // Target object (if pass-through proxy)

            // Get argument values
            var arg0 = args.Get<string>(0);         // First argument as string
            var arg1 = args.GetCancellationToken(1); // CancellationToken helper

            // Invoke the original/intercepted method and wrap result
            return methodDef.WrapAsyncInvokerResultOfAsyncMethod(asyncInvoker.Invoke(invocation));
        };
    }
    // For sync methods
    return invocation => {
        var proxy = invocation.Proxy;
        var method = invocation.Method;
        var args = invocation.Arguments;
        var target = invocation.InterfaceProxyTarget;
        return invocation.InvokeInterceptedUntyped();
    };
}
```
<!-- endSnippet -->

### MethodDef - Method Metadata

`MethodDef` provides cached metadata about the intercepted method:

| Property | Description |
|----------|-------------|
| `MethodInfo` | The `MethodInfo` being intercepted |
| `FullName` | Full name like `MyNamespace.IService.MethodName` |
| `ReturnType` | The method's return type |
| `UnwrappedReturnType` | Inner type for `Task<T>` (e.g., `T`), or return type for sync methods |
| `IsAsyncMethod` | Whether method returns `Task` or `ValueTask` |
| `ReturnsTask` / `ReturnsValueTask` | Specific async return type |
| `CancellationTokenIndex` | Index of `CancellationToken` parameter, or -1 |
| `DefaultResult` | Default return value (completed task for async methods) |
| `Parameters` | `ParameterInfo[]` array |

### Typed vs Untyped Handlers

**Typed handlers** (`CreateTypedHandler<TUnwrapped>`) are generic over the unwrapped return type:
- Type-safe access to return values
- Slightly more overhead due to generic instantiation
- Best for most use cases

**Untyped handlers** (`CreateUntypedHandler`) work with `object?`:
- Set `UsesUntypedHandlers = true` in constructor
- No generic instantiation overhead
- Used by `ComputeServiceInterceptor` for maximum performance

## Built-in Interceptors

### SchedulingInterceptor

Schedules async method execution on a custom `TaskFactory`:

<!-- snippet: PartAP_SchedulingInterceptor -->
```cs
var interceptor = new SchedulingInterceptor(SchedulingInterceptor.Options.Default, services) {
    // Resolve TaskFactory per invocation
    TaskFactoryResolver = invocation => {
        // Return null to skip scheduling (run on current context)
        // Return a TaskFactory to schedule on its scheduler
        return myCustomTaskFactory;
    },
    // Optional: chain to another interceptor
    NextInterceptor = anotherInterceptor
};
```
<!-- endSnippet -->

### ScopedServiceInterceptor

Creates a new `IServiceScope` for each method call:

<!-- snippet: PartAP_ScopedServiceInterceptor -->
```cs
var interceptor = new ScopedServiceInterceptor(ScopedServiceInterceptor.Options.Default, services) {
    ScopedServiceType = typeof(IGreetingService),
    // MustInterceptSyncCalls = true, // Requires IRequiresFullProxy interface
};

// Each call to the proxy will:
// 1. Create a new IServiceScope
// 2. Resolve IGreetingService from that scope
// 3. Invoke the method on the resolved service
// 4. Dispose the scope when the call completes
var proxy = (IGreetingService)Proxies.New(typeof(IGreetingService), interceptor);
```
<!-- endSnippet -->

### TypedFactoryInterceptor

Creates instances via `ActivatorUtilities.CreateFactory`:

```cs
// Returns new instances for each sync method call
// Useful for factory interfaces
var interceptor = new TypedFactoryInterceptor(TypedFactoryInterceptor.Options.Default, services);
```

## Creating Pass-Through Proxies

Pass-through proxies delegate to an actual implementation while intercepting calls:

<!-- snippet: PartAP_PassThroughProxy -->
```cs
// Create a real implementation
var realService = new GreetingService();

// Create proxy that passes through to the real service
var proxy = (IGreetingService)Proxies.New(
    typeof(IGreetingService),
    interceptor,
    proxyTarget: realService  // Calls will delegate to this
);

// Now calls go: proxy -> interceptor -> realService
var result = await proxy.GreetAsync("World");
```
<!-- endSnippet -->

## Interceptor Options

All interceptors use an `Options` record for configuration:

```cs
public new record Options : Interceptor.Options
{
    // Default instance pattern
    public static Options Default { get; set; } = new();

    // Inherited from Interceptor.Options:
    // - HandlerCacheConcurrencyLevel: Concurrency for handler cache
    // - HandlerCacheCapacity: Initial capacity
    // - LogLevel: Logging level for debug messages
    // - ValidationLogLevel: Logging level for validation
    // - IsValidationEnabled: Enable/disable validation

    // Add your custom settings here
    public string CustomSetting { get; init; } = "default";
}
```

## Interceptor Properties

Key properties you can set in your interceptor constructor:

| Property | Default | Description |
|----------|---------|-------------|
| `MustInterceptAsyncCalls` | `true` | Intercept async methods |
| `MustInterceptSyncCalls` | `false` | Intercept sync methods |
| `MustValidateProxyType` | `true` | Validate proxy implements correct interface |
| `UsesUntypedHandlers` | `false` | Use untyped handlers instead of typed |

## Validation

Override `ValidateTypeInternal` to validate types when intercepted:

<!-- snippet: PartAP_Validation -->
```cs
protected override void ValidateTypeInternal(Type type)
{
    // Called once per type, results are cached
    foreach (var method in type.GetMethods()) {
        if (method.GetCustomAttribute<MyRequiredAttribute>() is null)
            throw new InvalidOperationException($"Method {method.Name} missing [MyRequired]");
    }
}
```
<!-- endSnippet -->

## Learn More

- [ArgumentList API](./PartAP-AL.md) - Working with method arguments
- [Proxy Generation](./PartAP-PG.md) - How the source generator creates proxy classes
- [Built-in Interceptors](./PartAP-BI.md) - Complete list with examples
- [Diagrams](./PartAP-D.md) - Visual representations of key concepts
- [Cheat Sheet](./PartAP-CS.md) - Quick reference

## Fusion's Use of Interceptors

Fusion builds on this interception system:

- **ComputeServiceInterceptor** - Powers `[ComputeMethod]` caching and dependency tracking
- **CommandServiceInterceptor** - Routes command handler calls through CommandR pipeline
- **RpcInterceptor** - Handles remote procedure calls via ActualLab.Rpc
- **RemoteComputeServiceInterceptor** - Combines compute and RPC interception for distributed scenarios

These interceptors demonstrate advanced patterns like handler chaining, custom `MethodDef` subclasses, and untyped handlers for maximum performance.
