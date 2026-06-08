# ArgumentList API

`ArgumentList` is a high-performance container for method call arguments used throughout ActualLab.Interception. It provides type-safe access to arguments without boxing for common cases.

## Overview

When a proxy method is called, the arguments are captured in an `ArgumentList` instance. This is accessible via `invocation.Arguments` in your interceptor:

```cs
protected override Func<Invocation, object?>? CreateTypedHandler<TUnwrapped>(
    Invocation initialInvocation, MethodDef methodDef)
{
    return invocation => {
        var args = invocation.Arguments;  // ArgumentList
        // Work with arguments...
        return invocation.InvokeInterceptedUntyped();
    };
}
```

## Creating ArgumentList

Use the static `New` factory methods to create instances:

```cs
// Empty argument list
var args0 = ArgumentList.New();

// Single argument
var args1 = ArgumentList.New("hello");

// Multiple arguments (up to 10 supported)
var args2 = ArgumentList.New("hello", 42);
var args3 = ArgumentList.New("hello", 42, true);

// With CancellationToken
var args = ArgumentList.New("query", CancellationToken.None);
```

::: tip
`ArgumentList.New` uses generic type inference to avoid boxing for value types in most scenarios.
:::

## Reading Arguments

### Typed Access

Use `Get<T>(index)` for type-safe argument retrieval:

```cs
var args = invocation.Arguments;

// Get arguments by index (0-based)
var name = args.Get<string>(0);      // First argument as string
var count = args.Get<int>(1);        // Second argument as int
var enabled = args.Get<bool>(2);     // Third argument as bool
```

### Untyped Access

Use `GetUntyped(index)` when you don't know the type at compile time:

```cs
var args = invocation.Arguments;

// Returns object? - may involve boxing for value types
var arg0 = args.GetUntyped(0);
var arg1 = args.GetUntyped(1);

// Get all as array
object?[] allArgs = args.ToArray();
```

### CancellationToken Helper

`GetCancellationToken(index)` is optimized for the common case of retrieving a `CancellationToken`:

```cs
var args = invocation.Arguments;

// Optimized - avoids boxing
var ct = args.GetCancellationToken(2);

// Also works, but may box
var ct2 = args.Get<CancellationToken>(2);
```

::: tip
Use `MethodDef.CancellationTokenIndex` to find the `CancellationToken` parameter position:
```cs
var ctIndex = methodDef.CancellationTokenIndex;
if (ctIndex >= 0) {
    var ct = args.GetCancellationToken(ctIndex);
}
```
:::

## Modifying Arguments

### Typed Modification

Use `Set<T>(index, value)` to modify arguments:

```cs
var args = invocation.Arguments;

// Modify arguments before invoking
args.Set(0, "modified value");
args.Set(1, 100);
```

### Untyped Modification

Use `SetUntyped(index, value)` when the type isn't known at compile time:

```cs
args.SetUntyped(0, newValue);
```

### CancellationToken Helper

`SetCancellationToken(index, ct)` is optimized for setting `CancellationToken`:

```cs
// Replace or set CancellationToken
args.SetCancellationToken(2, newCancellationToken);
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `Length` | `int` | Number of arguments |
| `Type` | `ArgumentListType` | Metadata about the argument list type |

```cs
var args = invocation.Arguments;

// Check argument count
if (args.Length >= 2) {
    var second = args.Get<int>(1);
}
```

## Utility Methods

### Duplicate

Create a copy of the argument list:

```cs
var copy = args.Duplicate();
// Modify copy without affecting original
copy.Set(0, "new value");
```

### ToArray

Convert to an object array:

```cs
// All arguments
object?[] all = args.ToArray();

// Skip one argument (useful for skipping 'this' or similar)
object?[] skipped = args.ToArray(skipIndex: 0);
```

### GetInvoker

Get a delegate to invoke a method with the argument list:

```cs
// Get an invoker for a specific method
var invoker = args.GetInvoker(methodInfo);

// Invoke: (target, args) => result
var result = invoker(targetInstance, args);
```

## Implementation Types

`ArgumentList` has optimized implementations based on argument count:

| Type | Arguments | Notes |
|------|-----------|-------|
| `ArgumentList0` | 0 | Singleton `ArgumentList.Empty` |
| `ArgumentListS1`-`ArgumentListS10` | 1-10 | Simple (boxed) storage |
| `ArgumentListG1<T0>`-`ArgumentListG4<...>` | 1-4 | Generic (unboxed) storage |

The `New` factory methods automatically select the best implementation:

- **Generic types** (`ArgumentListG*`) are used when possible for better performance (no boxing)
- **Simple types** (`ArgumentListS*`) are used as fallback or for 5+ arguments
- This is controlled by `ArgumentList.UseGenerics` (auto-detected based on runtime)

## Common Patterns

### Logging All Arguments

```cs
protected override Func<Invocation, object?>? CreateTypedHandler<TUnwrapped>(
    Invocation initialInvocation, MethodDef methodDef)
{
    var methodName = methodDef.FullName;
    return invocation => {
        var args = invocation.Arguments;
        _logger.LogDebug("{Method} called with {ArgCount} arguments",
            methodName, args.Length);

        for (var i = 0; i < args.Length; i++) {
            _logger.LogDebug("  arg[{Index}] = {Value}", i, args.GetUntyped(i));
        }

        return invocation.InvokeInterceptedUntyped();
    };
}
```

### Modifying CancellationToken

```cs
protected override Func<Invocation, object?>? CreateTypedHandler<TUnwrapped>(
    Invocation initialInvocation, MethodDef methodDef)
{
    var ctIndex = methodDef.CancellationTokenIndex;
    if (ctIndex < 0)
        return null; // No CT parameter, skip interception

    return invocation => {
        var args = invocation.Arguments;
        var originalCt = args.GetCancellationToken(ctIndex);

        // Create a linked token with timeout
        using var cts = CancellationTokenSource.CreateLinkedTokenSource(originalCt);
        cts.CancelAfter(TimeSpan.FromSeconds(30));

        args.SetCancellationToken(ctIndex, cts.Token);
        return invocation.InvokeInterceptedUntyped();
    };
}
```

### Caching Based on Arguments

```cs
protected override Func<Invocation, object?>? CreateTypedHandler<TUnwrapped>(
    Invocation initialInvocation, MethodDef methodDef)
{
    return invocation => {
        var args = invocation.Arguments;

        // Use ArgumentList's built-in equality for cache keys
        // (skipping CancellationToken at index 1)
        var hash = args.GetHashCode(skipIndex: methodDef.CancellationTokenIndex);

        if (_cache.TryGetValue(hash, out var cached))
            return cached;

        var result = invocation.InvokeInterceptedUntyped();
        _cache[hash] = result;
        return result;
    };
}
```

## See Also

- [Interceptors and Proxies](./PartAP.md) - Main interceptor documentation
- [Cheat Sheet](./PartAP-CS.md) - Quick reference
