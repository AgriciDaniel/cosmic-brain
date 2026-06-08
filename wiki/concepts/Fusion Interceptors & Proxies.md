---
type: concept
title: "Fusion Interceptors & Proxies"
updated: 2026-05-25
tags:
  - dotnet
  - fusion
  - interception
  - aop
  - codegen
domain: dotnet
status: developing
related:
  - "[[ActualLab-Fusion]]"
  - "[[Fusion Compute Services]]"
  - "[[Fusion Native AOT]]"
source: "[[fusion-docs-overview]]"
---

# Fusion Interceptors & Proxies

`ActualLab.Interception` is the high-performance method interception library powering Fusion's compute services, CommandR, and RPC. It uses **compile-time source generation** (not runtime reflection) for performance and AOT compatibility.

## Why Not Castle DynamicProxy?

- **Compile-time generation** via `ActualLab.Generators` — no runtime IL emission
- **AOT/trimming compatible** — works with NativeAOT
- **~8x faster** than Castle DynamicProxy in benchmarks

## Key Components

1. **Marker interfaces** (`IRequiresAsyncProxy`, `IRequiresFullProxy`) — tag types needing proxies
2. **Source Generator** (`ActualLab.Generators`) — generates proxy classes at compile time
3. **Interceptor** — custom logic that runs when proxy methods are called

```
Your Interface          →    Generated Proxy     →    Your Interceptor
IMyService : IRequires*       MyServiceProxy          MyInterceptor : Interceptor
                               : IProxy                delegates to CreateHandler()
```

## Required Packages

| Package | Purpose |
|---------|---------|
| `ActualLab.Interception` | Core: `Interceptor`, `IProxy`, `Invocation` |
| `ActualLab.Generators` | Source generator for proxy classes |

Already included if using Fusion, RPC, or CommandR.

## Basic Usage

```csharp
// 1. Interface with proxy marker
public interface IGreetingService : IRequiresAsyncProxy
{
    Task<string> GreetAsync(string name, CancellationToken ct = default);
}

// IRequiresAsyncProxy → intercepts async methods only
// IRequiresFullProxy   → intercepts both sync and async methods

// 2. Create interceptor
public sealed class LoggingInterceptor : Interceptor
{
    public new record Options : Interceptor.Options
    {
        public static Options Default { get; set; } = new();
    }

    public LoggingInterceptor(Options settings, IServiceProvider services)
        : base(settings, services) { }

    protected override Func<Invocation, object?>? CreateTypedHandler<TUnwrapped>(
        Invocation initialInvocation, MethodDef methodDef)
    {
        if (methodDef.IsAsyncMethod) {
            var asyncInvoker = (Func<Invocation, Task<TUnwrapped>>)methodDef
                .InterceptedAsyncInvoker;
            return invocation => {
                Console.WriteLine($"Calling: {methodDef.FullName}");
                return asyncInvoker.Invoke(invocation);
            };
        }
        return null; // Fall through to target for non-async
    }
}
```

## Invocation

The `Invocation` object passed to handlers contains:
- `Method` — the method being called
- `Arguments` — the arguments passed
- `Proxy` — the proxy instance
- `ReturnValue` — set this to short-circuit the call

## ArgumentList

Immutable argument lists for intercepted calls. Used internally by the proxy infrastructure for efficient argument passing and comparison.

## Built-in Interceptors

Fusion ships with pre-built interceptors:
- Compute service interception (caching, dependency tracking)
- CommandR interception (handler pipeline)
- RPC interception (network routing)
- Scheduling interception (delayed/periodic execution)
- Scoped service interception
- Typed factory interception

## Proxy Generation

`ActualLab.Generators` runs at compile time:
1. Scans for interfaces implementing `IRequiresAsyncProxy` or `IRequiresFullProxy`
2. Generates proxy classes in the target assembly
3. Proxies delegate to the configured `Interceptor`

No runtime cost beyond the generated code.
