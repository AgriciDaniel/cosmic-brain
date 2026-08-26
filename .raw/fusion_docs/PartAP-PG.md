# Proxy Generation

The `ActualLab.Generators` package contains a Roslyn source generator that:

1. Scans for types implementing `IRequiresAsyncProxy` or `IRequiresFullProxy`
2. Generates a proxy class in the `ActualLabProxies` sub-namespace
3. The proxy implements `IProxy` and delegates all calls to the `Interceptor`

## Class Proxy vs Interface Proxy

The generator creates different proxies depending on whether you're proxying a **class** or an **interface**:

| Proxy Type | Inherits From | How It Calls Original |
|------------|---------------|----------------------|
| **Class proxy** | Original class | `base.Method(...)` |
| **Interface proxy** | `InterfaceProxy` | `((IInterface)ProxyTarget!).Method(...)` |

## Class Proxy Example

For a class like:

```cs
namespace YourNamespace;

public class TodoApi : IComputeService // IComputeService extends IRequiresAsyncProxy
{
    [ComputeMethod]
    public virtual Task<string[]> GetTodos(CancellationToken cancellationToken = default)
        => Task.FromResult(new[] { "Buy milk", "Write docs" });
}
```

The generator creates a **class proxy** (simplified):

```cs
namespace YourNamespace.ActualLabProxies;

public sealed class TodoApiProxy : TodoApi, IProxy  // Inherits from TodoApi
{
    private static MethodInfo? __cachedMethod0 = ProxyHelper.GetMethodInfo(
        typeof(TodoApi), "GetTodos", new[] { typeof(CancellationToken) });
    private Func<ArgumentList, Task<string[]>>? __cachedIntercepted0;
    private Func<Invocation, Task<string[]>>? __cachedIntercept0;
    private Interceptor? __interceptor;

    Interceptor IProxy.Interceptor { get => ...; set => ...; }

    public TodoApiProxy() : base() { }  // Calls base constructor

    public override Task<string[]> GetTodos(CancellationToken cancellationToken)
    {
        var intercepted = __cachedIntercepted0 ??= args => {
            if (args is ArgumentListG1<CancellationToken> ga)
                return base.GetTodos(ga.Item0);        // <-- Calls BASE class method
            var sa = (ArgumentListS1)args;
            return base.GetTodos((CancellationToken)sa.Item0);
        };

        var invocation = new Invocation(this, __cachedMethod0!,
            ArgumentList.New(cancellationToken), intercepted);
        return __cachedIntercept0!.Invoke(invocation);
    }
}
```

## Interface Proxy Example

For an interface like:

```cs
namespace YourNamespace;

public interface ITodoApi : IComputeService
{
    [ComputeMethod]
    Task<string[]> GetTodos(CancellationToken cancellationToken = default);
}
```

The generator creates an **interface proxy** (simplified):

```cs
namespace YourNamespace.ActualLabProxies;

public sealed class ITodoApiProxy : InterfaceProxy, ITodoApi, IProxy  // Inherits from InterfaceProxy
{
    private static MethodInfo? __cachedMethod0 = ProxyHelper.GetMethodInfo(
        typeof(ITodoApi), "GetTodos", new[] { typeof(CancellationToken) });
    private Func<ArgumentList, Task<string[]>>? __cachedIntercepted0;
    private Func<Invocation, Task<string[]>>? __cachedIntercept0;
    private Interceptor? __interceptor;

    Interceptor IProxy.Interceptor { get => ...; set => ...; }

    // No constructor needed - InterfaceProxy provides ProxyTarget property

    public Task<string[]> GetTodos(CancellationToken cancellationToken)
    {
        var intercepted = __cachedIntercepted0 ??= args => {
            if (args is ArgumentListG1<CancellationToken> ga)
                return ((ITodoApi)ProxyTarget!).GetTodos(ga.Item0);  // <-- Calls PROXY TARGET
            var sa = (ArgumentListS1)args;
            return ((ITodoApi)ProxyTarget!).GetTodos((CancellationToken)sa.Item0);
        };

        var invocation = new Invocation(this, __cachedMethod0!,
            ArgumentList.New(cancellationToken), intercepted);
        return __cachedIntercept0!.Invoke(invocation);
    }
}
```

> **Key Difference**: Class proxies call `base.Method()` to invoke the original implementation.
> Interface proxies call `((IInterface)ProxyTarget!).Method()` - the `ProxyTarget` is set when
> creating the proxy via `Proxies.New(type, interceptor, proxyTarget)`. If no target is provided,
> calling the intercepted delegate will fail (useful for pure interception without pass-through).

## Key Points About Generated Proxies

| Aspect | Description |
|--------|-------------|
| **Inheritance** | Class proxies inherit from the original class; interface proxies inherit from `InterfaceProxy` |
| **Caching** | `MethodInfo`, interceptor handlers, and base method delegates are all cached for performance |
| **ArgumentList** | Arguments are packed into an `ArgumentList` struct (generic `ArgumentListG*` or struct-based `ArgumentListS*`) |
| **Invocation** | Contains proxy, method, arguments, and delegate to call the non-intercepted method |
| **Trimming** | `ModuleInitializer` and `CodeKeeper` ensure the proxy survives AOT compilation and trimming |

## Proxy Type Resolution

The `Proxies.New()` method finds generated proxy types by naming convention:

| Original Type | Generated Proxy Type |
|---------------|---------------------|
| `MyApp.IMyService` | `MyApp.ActualLabProxies.IMyServiceProxy` |
| `MyApp.MyService` | `MyApp.ActualLabProxies.MyServiceProxy` |
| `MyApp.Generic<T>` | `MyApp.ActualLabProxies.GenericProxy<T>` |

```cs
// These are equivalent:
var proxyType = Proxies.GetProxyType<IMyService>();
var proxyType = Proxies.GetProxyType(typeof(IMyService));

// Create proxy instance
var proxy = (IMyService)Proxies.New(typeof(IMyService), interceptor);
```
