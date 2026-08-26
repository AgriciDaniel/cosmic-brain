# Compute Services: Diagrams

Text-based diagrams for the core concepts introduced in [Part 01](PartF.md).

## `Computed<T>` Lifecycle States

<img src="/img/diagrams/PartF-D-1.svg" alt="`Computed<T>` Lifecycle States" style="width: 100%; max-width: 800px;" />

## Capturing `Computed<T>` Values

| Call | Returns |
|------|---------|
| `await counters.Get('a')` | `int` (value only) |
| `await Computed.Capture(() => counters.Get('a'))` | `Computed<int>` |

**`Computed<T>` API:**
| Property/Method | Returns |
|-----------------|---------|
| `.Value` | `int` |
| `.IsConsistent()` | `bool` |
| `.Invalidate()` | `void` |
| `.Update()` | `Task<Computed<T>>` |
| `.WhenInvalidated()` | `Task` |
| `.When(predicate)` | `Task<Computed<T>>` |
| `.Changes()` | `IAsyncEnumerable` |
| `.Invalidated` | event |

## Invalidation Block Behavior

```csharp
using (Invalidation.Begin()) {
    _ = Get(key);  // Does NOT execute method body
}
```

| Behavior | Description |
|----------|-------------|
| Method body | Does NOT execute |
| Return value | `Task.FromResult(default(T))` or `default(T)` |
| Side effect | Invalidates cached `Computed<T>` for this call |

## Computed Value Dependency Graph (DAG)

Example from PartF: `Sum("a", "b")` depends on `Get("a")` and `Get("b")`.

<img src="/img/diagrams/PartF-D-2.svg" alt="Computed Value Dependency Graph (DAG)" style="width: 100%; max-width: 800px;" />

### Cascading Invalidation Flow

<img src="/img/diagrams/PartF-D-3.svg" alt="Cascading Invalidation Flow" style="width: 100%; max-width: 800px;" />

## Compute Method Cache Resolution

<img src="/img/diagrams/PartF-D-4.svg" alt="Compute Method Cache Resolution" style="width: 100%; max-width: 800px;" />

## `State<T>` Inheritance Hierarchy

<img src="/img/diagrams/PartF-D-5.svg" alt="`State<T>` Inheritance Hierarchy" style="width: 100%; max-width: 800px;" />

## `ComputedState<T>` Update Loop

<img src="/img/diagrams/PartF-D-6.svg" alt="`ComputedState<T>` Update Loop" style="width: 100%; max-width: 800px;" />

## `MutableState<T>` vs `ComputedState<T>`

<img src="/img/diagrams/PartF-D-7.svg" alt="`MutableState<T>` vs `ComputedState<T>`" style="width: 100%; max-width: 800px;" />

| MutableState&lt;T&gt; | ComputedState&lt;T&gt; |
|----------------------|------------------------|
| Use case: UI input state (e.g., search box text) | Use case: Derived/reactive values (e.g., filtered list, totals) |
