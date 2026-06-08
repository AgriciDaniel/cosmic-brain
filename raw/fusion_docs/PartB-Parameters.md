# Blazor Parameter Comparison

This document covers Fusion's optimized parameter comparison system for Blazor components: how it works, how to customize it, and when to use different comparison modes.


## Overview

Blazor's default behavior calls `SetParametersAsync` on every parent render, even when parameters haven't changed. This can cause unnecessary re-renders in child components.

Fusion's `FusionComponentBase` introduces optimized parameter comparison that:

- **Skips unnecessary parameter updates** when values haven't changed
- **Uses efficient comparers** for different parameter types
- **Supports customization** via attributes and configuration


## ParameterComparisonMode

The `ParameterComparisonMode` enum controls how parameters are compared:

| Mode | Description |
|------|-------------|
| `Inherited` | Use the parent's comparison mode (default) |
| `Custom` | Use custom comparers from `ParameterComparerProvider` |
| `Standard` | Always use Blazor's standard parameter setting |

### Setting the Default Mode

```csharp
// In Program.cs or startup
FusionComponentBase.DefaultParameterComparisonMode = ParameterComparisonMode.Custom;
```


## FusionComponentAttribute

Apply this attribute to a component class to specify its parameter comparison mode:

```csharp
[FusionComponent(ParameterComparisonMode.Custom)]
public class MyComponent : ComputedStateComponent<MyData>
{
    [Parameter] public long Id { get; set; }
    [Parameter] public string Name { get; set; } = "";
}
```

> **Note**: This attribute is **not inherited**. Each component that needs custom comparison must be explicitly marked.


## ParameterComparer System

### ParameterComparer Base Class

All comparers inherit from `ParameterComparer`:

```csharp
public abstract class ParameterComparer
{
    public abstract bool AreEqual(object? oldValue, object? newValue);
}
```

### DefaultParameterComparer

The default comparer mimics Blazor's comparison logic:

- **Primitives, strings, DateTime, Guid, Decimal**: Uses `.Equals()` comparison
- **Enums**: Uses `.Equals()` comparison
- **EventCallback, EventCallback&lt;T&gt;**: Uses `.Equals()` comparison
- **Other types**: Uses reference equality

```csharp
// These use value comparison
[Parameter] public int Count { get; set; }           // Equals
[Parameter] public string Name { get; set; } = "";   // Equals
[Parameter] public DateTime Date { get; set; }       // Equals

// These use reference equality
[Parameter] public List<Item> Items { get; set; }    // Reference
[Parameter] public MyClass Data { get; set; }        // Reference
```

### ByValueParameterComparer

Forces value-based comparison using `.Equals()` regardless of type:

```csharp
[Parameter] public TimeSpan Duration { get; set; }  // Uses ByValue
```


## Built-in Parameter Comparers

Fusion provides 9 built-in comparers for different scenarios:

### Basic Comparers

| Comparer | Description | Use Case |
|----------|-------------|----------|
| `DefaultParameterComparer` | Mimics Blazor's default: value equality for immutable types, reference equality otherwise | Default fallback |
| `ByValueParameterComparer` | Always uses `.Equals()` | Value types, records |
| `ByRefParameterComparer` | Always uses `ReferenceEquals()` | Force reference comparison |
| `ByNoneParameterComparer` | Always returns `true` (equal) | Never trigger re-render for this parameter |

### Entity/Model Comparers

These comparers work with objects implementing specific interfaces from `ActualLab`:

| Comparer | Required Interface(s) | Compares By |
|----------|----------------------|-------------|
| `ByIdParameterComparer<TId>` | `IHasId<TId>` | `Id` property only |
| `ByVersionParameterComparer<TVersion>` | `IHasVersion<TVersion>` | `Version` property only |
| `ByIdAndVersionParameterComparer<TId, TVersion>` | `IHasId<TId>`, `IHasVersion<TVersion>` | Both `Id` and `Version` |
| `ByUuidParameterComparer` | `IHasUuid` | `Uuid` property only |
| `ByUuidAndVersionParameterComparer<TVersion>` | `IHasUuid`, `IHasVersion<TVersion>` | Both `Uuid` and `Version` |

### Source Links

| Comparer | Source |
|----------|--------|
| `DefaultParameterComparer` | [View](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion.Blazor/ParameterComparison/DefaultParameterComparer.cs) |
| `ByValueParameterComparer` | [View](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion/Blazor/ByValueParameterComparer.cs) |
| `ByRefParameterComparer` | [View](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion/Blazor/ByRefParameterComparer.cs) |
| `ByNoneParameterComparer` | [View](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion/Blazor/ByNoneParameterComparer.cs) |
| `ByIdParameterComparer<TId>` | [View](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion/Blazor/ByIdParameterComparer.cs) |
| `ByVersionParameterComparer<TVersion>` | [View](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion/Blazor/ByVersionParameterComparer.cs) |
| `ByIdAndVersionParameterComparer<TId, TVersion>` | [View](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion/Blazor/ByIdAndVersionParameterComparer.cs) |
| `ByUuidParameterComparer` | [View](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion/Blazor/ByUuidParameterComparer.cs) |
| `ByUuidAndVersionParameterComparer<TVersion>` | [View](https://github.com/ActualLab/Fusion/blob/master/src/ActualLab.Fusion/Blazor/ByUuidAndVersionParameterComparer.cs) |

### Usage Examples

```csharp
// Use ByNone to ignore a parameter that changes frequently but doesn't affect rendering
[Parameter]
[ParameterComparer(typeof(ByNoneParameterComparer))]
public Action? OnHover { get; set; }

// Use ById for entity parameters - re-render only when the entity ID changes
[Parameter]
[ParameterComparer(typeof(ByIdParameterComparer<long>))]
public User? User { get; set; }  // User implements IHasId<long>

// Use ByIdAndVersion for entities with optimistic concurrency
[Parameter]
[ParameterComparer(typeof(ByIdAndVersionParameterComparer<long, long>))]
public Order? Order { get; set; }  // Order implements IHasId<long>, IHasVersion<long>

// Use ByRef to force reference comparison even for types that override Equals
[Parameter]
[ParameterComparer(typeof(ByRefParameterComparer))]
public MyClass? Data { get; set; }
```

### Types Handled by DefaultParameterComparer (Value Equality)

These types use `.Equals()` comparison in `DefaultParameterComparer`:

| Category | Types |
|----------|-------|
| **Primitives** | `bool`, `byte`, `sbyte`, `char`, `short`, `ushort`, `int`, `uint`, `long`, `ulong`, `float`, `double` |
| **Other Value Types** | `decimal`, `DateTime`, `Guid` |
| **Reference Types** | `string` |
| **Special Types** | `Enum` (all enum types), `EventCallback`, `EventCallback<T>` |

All other types use **reference equality** in `DefaultParameterComparer`.

### Types Pre-Registered with ByValueParameterComparer

These types are registered in `ParameterComparerProvider.KnownComparerTypes` by default:

| Type | Namespace |
|------|-----------|
| `Symbol` | `ActualLab` |
| `TimeSpan` | `System` |
| `Moment` | `ActualLab` |
| `DateTimeOffset` | `System` |
| `DateOnly` | `System` (.NET 6+) |
| `TimeOnly` | `System` (.NET 6+) |

Additionally, when `UseByValueParameterComparerForEnumProperties` is `true` (default), all **enum types** automatically use `ByValueParameterComparer`.


## Customizing Parameter Comparison

### Per-Property Customization

Use `[ParameterComparer]` on a property:

```csharp
public class MyComponent : ComputedStateComponent<MyData>
{
    [Parameter]
    [ParameterComparer(typeof(ByValueParameterComparer))]
    public MyStruct Value { get; set; }
}
```

### Per-Type Customization

Apply `[ParameterComparer]` to a type to use that comparer for all parameters of that type:

```csharp
[ParameterComparer(typeof(MyCustomComparer))]
public record MyRecord(string Name, int Value);

// Now all parameters of type MyRecord use MyCustomComparer
public class SomeComponent : ComputedStateComponent<Data>
{
    [Parameter] public MyRecord Record { get; set; }  // Uses MyCustomComparer
}
```

### Creating Custom Comparers

```csharp
public class DeepEqualityComparer : ParameterComparer
{
    public static DeepEqualityComparer Instance { get; } = new();

    public override bool AreEqual(object? oldValue, object? newValue)
    {
        if (ReferenceEquals(oldValue, newValue))
            return true;

        if (oldValue is null || newValue is null)
            return false;

        // Use your deep comparison logic
        return JsonSerializer.Serialize(oldValue) == JsonSerializer.Serialize(newValue);
    }
}
```

### Registering Known Comparers

Register comparers for types globally:

```csharp
ParameterComparerProvider.Instance.KnownComparerTypes[typeof(MyType)]
    = typeof(MyCustomComparer);
```


## ComponentInfo

`ComponentInfo` caches metadata about a component's parameters for efficient comparison.

### How It Works

1. On first use, reflects over the component's `[Parameter]` and `[CascadingParameter]` properties
2. Caches the comparer for each parameter
3. Provides `ShouldSetParameters()` to determine if parameters need updating

### Key Properties

| Property | Type | Description |
|----------|------|-------------|
| `Type` | `Type` | The component type |
| `HasCustomParameterComparers` | `bool` | True if any parameter uses custom comparison |
| `ParameterComparisonMode` | `ParameterComparisonMode` | Effective comparison mode |
| `Parameters` | `IReadOnlyDictionary<string, ComponentParameterInfo>` | Parameter metadata |


## ComponentParameterInfo

Metadata about a single component parameter:

| Property | Type | Description |
|----------|------|-------------|
| `Property` | `PropertyInfo` | The reflected property |
| `IsCascading` | `bool` | True if `[CascadingParameter]` |
| `IsCapturingUnmatchedValues` | `bool` | True if captures unmatched values |
| `Comparer` | `ParameterComparer` | The comparer for this parameter |
| `Getter` | `Func<IComponent, object>` | Fast getter delegate |
| `Setter` | `Action<IComponent, object>` | Fast setter delegate |


## ParameterComparerProvider

The provider resolves comparers for parameters using this precedence:

1. `[ParameterComparer]` attribute on the property
2. Known comparer for the property's type (from `KnownComparerTypes`)
3. `[ParameterComparer]` attribute on the property's type
4. `[ParameterComparer]` attribute on the declaring class
5. `DefaultParameterComparer` (fallback)

### Configuration

```csharp
// Access the singleton provider
var provider = ParameterComparerProvider.Instance;

// Enable/disable by-value comparison for enums (default: true)
provider.UseByValueParameterComparerForEnumProperties = true;

// Register known comparers
provider.KnownComparerTypes[typeof(MyStruct)] = typeof(ByValueParameterComparer);
```


## Best Practices

### When to Use Custom Comparison

| Scenario | Recommendation |
|----------|----------------|
| Primitive types | Use default (already optimized) |
| Records / value types | Consider `ByValueParameterComparer` |
| Large collections | Keep reference equality (avoid deep comparison) |
| Immutable objects | Use reference equality |
| Mutable objects with equality | Use custom comparer |

### Performance Considerations

1. **Avoid expensive comparisons**: Deep equality checks can be slower than re-rendering
2. **Reference equality is fast**: For large objects, reference equality is often best
3. **Cache comparers**: Custom comparers are cached per property type

### Example: Optimizing a Data Grid Component

```csharp
[FusionComponent(ParameterComparisonMode.Custom)]
public class DataGrid<T> : ComputedStateComponent<GridState<T>>
{
    // Use reference equality for large collections
    [Parameter]
    public IReadOnlyList<T> Items { get; set; } = Array.Empty<T>();

    // Use value comparison for small config objects
    [Parameter]
    [ParameterComparer(typeof(ByValueParameterComparer))]
    public GridOptions Options { get; set; } = GridOptions.Default;

    // Primitives already use value comparison
    [Parameter]
    public int PageSize { get; set; } = 20;
}
```


## Debugging Parameter Changes

To understand when parameters are being set:

```csharp
public class MyComponent : ComputedStateComponent<MyData>
{
    public override async Task SetParametersAsync(ParameterView parameters)
    {
        Console.WriteLine($"SetParametersAsync called, ParameterSetIndex: {ParameterSetIndex}");
        await base.SetParametersAsync(parameters);
    }
}
```

The `ParameterSetIndex` property tracks how many times `SetParametersAsync` has been called (0 = not yet initialized).
