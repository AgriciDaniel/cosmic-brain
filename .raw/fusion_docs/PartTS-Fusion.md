# @actuallab/fusion

The core Fusion package for TypeScript &mdash; provides `Computed<T>`, `@computeMethod`,
`ComputedState<T>`, `MutableState<T>`, and `UIActionTracker`.

These are the TypeScript equivalents of the types documented in
[Part 1: Compute Services](./PartF.md) and [States](./PartF-ST.md).


## Computed\<T\>

`Computed<T>` is the fundamental building block &mdash; a cached computation result
with dependency tracking and invalidation.
See [Computed\<T\> in .NET](./PartF-C.md) for the full conceptual overview.

### Key Differences from .NET

| Aspect | .NET | TypeScript |
|--------|------|------------|
| Dependency tracking | Via `AsyncLocal` / `ExecutionContext` (automatic across `await`) | Via `AsyncContext.current` (may need explicit propagation) |
| Registry | `ComputedRegistry` with GC handle tracking | `ComputedRegistry` using `WeakRef` + `FinalizationRegistry` |
| Error auto-invalidation | Configurable via `ComputedOptions` | Static: `Computed.errorAutoInvalidateDelay` (default: 1000ms) |

### API

```ts
import { Computed, ConsistencyState } from "@actuallab/fusion";

// Capture the Computed backing a compute method call
const c = await Computed.capture(() => myService.getCount());

c.isConsistent;   // true
c.value;          // the cached value
c.state;          // ConsistencyState.Consistent

// Wait for invalidation, then update
await c.whenInvalidated();
const c2 = await c.update();  // returns new Computed<T> if inconsistent

// Manual invalidation
c.invalidate();   // cascades to all dependants
```

| Member | Description |
|--------|-------------|
| `Computed.capture(fn)` | Static: capture the `Computed<T>` produced by `fn` |
| `Computed.errorAutoInvalidateDelay` | Static: delay before auto-invalidating error results (default: 1000ms, 0 = disabled) |
| `.input` | The identity key (`string` for compute functions, `State` for state-bound) |
| `.version` | Monotonically increasing version number |
| `.state` | `ConsistencyState`: `Computing`, `Consistent`, or `Invalidated` |
| `.isConsistent` | Shorthand for `state === Consistent` |
| `.value` / `.error` / `.hasValue` / `.hasError` | `IResult<T>` implementation |
| `.valueOrUndefined` | Value or `undefined` (never throws) |
| `.output` | The `Result<T>` output |
| `.update()` | Returns `this` if consistent, otherwise recomputes. Returns `Computed<T> \| Promise<Computed<T>>` |
| `.use(ctx?)` | Update + register as dependency of the current computation |
| `.useInconsistent(ctx?)` | Register as dependency without updating (may return stale value) |
| `.invalidate()` | Invalidate this computed and all dependants (cascading) |
| `.whenInvalidated(signal?)` | Returns `Promise<void>` that resolves on invalidation |
| `.onInvalidated` | `EventHandlerSet<void>` &mdash; subscribe to invalidation |
| `.setOutput(result)` | Set the output (only valid during `Computing` state) |
| `.addDependency(dep)` | Manually add a dependency |

### ConsistencyState

```ts
enum ConsistencyState {
  Computing = 0,   // Being computed right now
  Consistent = 1,  // Has a valid, up-to-date output
  Invalidated = 2, // Output is stale
}
```


## @computeMethod Decorator

The `@computeMethod` decorator wraps a method with caching and dependency tracking &mdash;
equivalent to `[ComputeMethod]` + `virtual` in .NET.

```ts
import { computeMethod } from "@actuallab/fusion";

class CounterService {
  private _counters = new Map<string, number>();

  @computeMethod
  async get(key: string): Promise<number> {
    return this._counters.get(key) ?? 0;
  }

  @computeMethod
  async sum(key1: string, key2: string): Promise<number> {
    // Automatic dependency: sum depends on get(key1) and get(key2)
    return await this.get(key1) + await this.get(key2);
  }

  increment(key: string): void {
    this._counters.set(key, (this._counters.get(key) ?? 0) + 1);
    // Invalidate — triggers cascading invalidation of sum() etc.
    (this.get as any).invalidate(key);
  }
}
```

### Invalidation

In .NET, you invalidate via `Invalidation.Begin()` blocks.
In TypeScript, each bound method gets an `.invalidate(...args)` function:

```ts
const svc = new CounterService();
await svc.get("a");  // Computed, cached

// Invalidate the cached result for get("a")
(svc.get as any).invalidate("a");

await svc.get("a");  // Recomputed
```

### wrapComputeMethod

For standalone functions (not class methods), use `wrapComputeMethod`:

```ts
import { wrapComputeMethod } from "@actuallab/fusion";

const getTime = wrapComputeMethod(function getTime(): number {
  return Date.now();
});

const t1 = await getTime();  // computed + cached
const t2 = await getTime();  // cache hit (t1 === t2)

getTime.invalidate();
const t3 = await getTime();  // recomputed
```


## State\<T\>

Abstract base class for all reactive state types.
See [States in .NET](./PartF-ST.md) for the full conceptual overview.

| Member | Description |
|--------|-------------|
| `.computed` | The current `Computed<T>` backing this state |
| `.value` / `.error` / `.hasValue` / `.hasError` | `IResult<T>` delegation to `.computed` |
| `.valueOrUndefined` | Value or `undefined` (never throws) |
| `.output` | The `Result<T>` output |
| `.lastNonErrorValue` | Last value that was not an error |
| `.updateIndex` | How many times the state has been updated |
| `.use(ctx?)` | Use the state in a computation (registers dependency) |
| `.useInconsistent(ctx?)` | Use without updating |
| `.update()` | Ensure the backing computed is up-to-date |
| `.recompute()` | Invalidate + update |
| `.whenInvalidated()` | Promise that resolves when the current computed is invalidated |
| `.whenUpdated()` | Promise that resolves on the next update |
| `.whenFirstTimeUpdated()` | Resolves immediately if already updated, otherwise waits |


## ComputedState\<T\>

Auto-updating reactive state &mdash; re-computes on invalidation with configurable delay.
This is the TypeScript equivalent of `ComputedState<T>` in .NET.

```ts
import { ComputedState, FixedDelayer } from "@actuallab/fusion";

const state = new ComputedState(
  async () => {
    // This is the "compute method" for this state
    const count = await counterService.get("a");
    return `Count: ${count}`;
  },
  {
    initialValue: "loading...",
    updateDelayer: FixedDelayer.get(500),  // 500ms delay after invalidation
  },
);

// Wait for first computation
await state.whenFirstTimeUpdated();
console.log(state.value);  // "Count: 0"

// After counterService.get("a") is invalidated:
// - state auto-recomputes after 500ms delay
// - state.value updates to "Count: 1"

// Clean up (stops the update loop)
state.dispose();
```

::: warning
`ComputedState` instances **must be disposed** when no longer needed.
Otherwise the update loop runs indefinitely.
:::

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `initialValue` | `T` | &mdash; | Value before first computation completes |
| `initialOutput` | `Result<T>` | &mdash; | Full result before first computation |
| `updateDelayer` | `UpdateDelayer` | `~16ms` (one frame) | Delay before recomputation after invalidation |

### UpdateDelayer

```ts
import { FixedDelayer } from "@actuallab/fusion";

FixedDelayer.zero;      // No delay (recompute immediately)
FixedDelayer.get(1000); // 1-second delay

// Default update delayer: ~16ms (1000/60, one frame)
import { defaultUpdateDelayer } from "@actuallab/fusion";
```


## MutableState\<T\>

Manually-settable reactive state &mdash; the TypeScript equivalent of `MutableState<T>`.

```ts
import { MutableState } from "@actuallab/fusion";

const state = new MutableState(0);

state.value;  // 0

state.set(42);
state.value;  // 42

// Can also set an error
import { errorResult } from "@actuallab/core";
state.set(errorResult(new Error("oops")));
state.error;            // Error("oops")
state.lastNonErrorValue; // 42 (preserved from last successful value)
```

`MutableState<T>` participates in the dependency graph:
if a `@computeMethod` calls `state.use()`, it becomes dependent on the state
and will be invalidated when the state changes.


## UIActionTracker

Singleton that tracks active UI commands &mdash; the TypeScript equivalent of
Fusion's `UIActionTracker` + `UICommander`.

```ts
import { uiActions } from "@actuallab/fusion";

// Run a command — errors collected, not thrown
await uiActions.run(async () => {
  await api.AddOrUpdate({ session: "~", item: newTodo });
});

// Call a command — errors collected AND thrown
const result = await uiActions.call(async () => {
  return await api.Get("~", id);
});

// Check state
uiActions.isActive;     // true while any command is running
uiActions.errors;       // collected errors
uiActions.dismissError(0);  // remove first error

// Subscribe to changes
uiActions.changed.add(() => {
  // re-render UI
});
```

### UIUpdateDelayer

A special `UpdateDelayer` that skips the delay when `UIActionTracker` is active,
so states recompute immediately in response to user actions:

```ts
import { UIUpdateDelayer } from "@actuallab/fusion";

const delayer = new UIUpdateDelayer(500);
// Normal: waits 500ms after invalidation before recomputing
// During uiActions.run(): recomputes immediately (no delay)
```
