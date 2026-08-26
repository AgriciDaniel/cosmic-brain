# @actuallab/core

Core primitives used across all other Fusion TypeScript packages.
This package has **zero dependencies** and corresponds to parts of `ActualLab.Core` in .NET.


## Result\<T\>

Immutable value-or-error container &mdash; the TypeScript equivalent of `Result<T>` in .NET.

```ts
import { Result, result, errorResult, resultFrom, resultFromAsync } from "@actuallab/core";

const ok = result(42);            // Result<number> with value
const err = errorResult<number>(new Error("fail"));  // Result<number> with error

ok.hasValue;        // true
ok.value;           // 42
ok.error;           // undefined
ok.valueOrUndefined // 42

err.hasError;       // true
err.error;          // Error("fail")
err.value;          // throws Error("fail")

// Wrap a function call in a Result
const r1 = resultFrom(() => JSON.parse("{}"));          // Result<any>
const r2 = await resultFromAsync(() => fetch("/api"));   // Result<Response>
```

| Member | Description |
|--------|-------------|
| `result(value, error?)` | Create a `Result` from value and optional error |
| `errorResult(error)` | Create an error `Result` |
| `resultFrom(fn)` | Wrap a sync function &mdash; catches exceptions into error result |
| `resultFromAsync(fn)` | Wrap an async function &mdash; catches rejections into error result |
| `.hasValue` | `true` if the result holds a value |
| `.hasError` | `true` if the result holds an error |
| `.value` | Returns value or **throws** the stored error |
| `.valueOrUndefined` | Returns value or `undefined` (never throws) |
| `.error` | Returns the error or `undefined` |


## PromiseSource\<T\>

Externally-resolvable promise &mdash; the TypeScript equivalent of `TaskCompletionSource<T>`.

```ts
import { PromiseSource } from "@actuallab/core";

const ps = new PromiseSource<string>();
ps.isCompleted;  // false

// Somewhere else:
ps.resolve("done");
// or: ps.reject(new Error("fail"));

const value = await ps.promise;  // "done"
ps.isCompleted;  // true
```

| Member | Description |
|--------|-------------|
| `.promise` | The underlying `Promise<T>` |
| `.isCompleted` | `true` after `resolve` or `reject` |
| `.resolve(value)` | Resolve the promise |
| `.reject(error)` | Reject the promise |

There is also a pre-resolved constant: `resolvedVoidPromise`.


## AsyncContext

General-purpose typed context container &mdash; provides `AsyncLocal<T>`-like functionality
for JavaScript's single-threaded environment. Named for forward-compatibility with the
[TC39 AsyncContext proposal](https://github.com/nicolo-ribaudo/proposal-async-context/).

```ts
import { AsyncContext, AsyncContextKey } from "@actuallab/core";

// Define a typed key
const userKey = new AsyncContextKey<string>("user", "anonymous");

// Create context with a value
const ctx = AsyncContext.empty.with(userKey, "Alice");

// Run code within the context
ctx.run(() => {
  AsyncContext.current!.get(userKey);  // "Alice"
});

// Or activate/deactivate manually
const guard = ctx.activate();
AsyncContext.current!.get(userKey);  // "Alice"
guard.dispose();
```

| Member | Description |
|--------|-------------|
| `AsyncContext.current` | Static: the currently active context (or `undefined`) |
| `AsyncContext.empty` | Static: immutable empty singleton |
| `AsyncContext.from(ctx)` | Returns `ctx` if defined, otherwise `.current` |
| `AsyncContext.fromArgs(args)` | Extract context from last argument, or fall back to `.current` |
| `.get(key)` | Read a value by key (returns `key.defaultValue` if not set) |
| `.with(key, value)` | Create a new context with the key set (immutable) |
| `.run(fn)` | Execute `fn` with this context as `.current` |
| `.activate()` | Set as `.current`, return a `Disposable` that restores the previous one |
| `.stripFromArgs(args)` | Remove this context from the end of an args array |

::: warning
`AsyncContext.current` does not automatically flow across `await` boundaries.
When calling compute methods from within other compute methods,
pass the context explicitly as the last argument.
See [AsyncContext: Why It Matters](./PartTS.md#asynccontext-why-it-matters).
:::


## AsyncLock

Promise-based mutual exclusion lock &mdash; the TypeScript equivalent of `AsyncLock`.

```ts
import { AsyncLock } from "@actuallab/core";

const lock = new AsyncLock();

// Option 1: acquire/release
const release = await lock.acquire();
try {
  // critical section
} finally {
  release();
}

// Option 2: run (acquires, runs fn, releases)
await lock.run(async () => {
  // critical section
});
```


## EventHandlerSet\<T\>

Typed pub/sub event system &mdash; similar to .NET's multicast delegates.

```ts
import { EventHandlerSet } from "@actuallab/core";

const onChanged = new EventHandlerSet<string>();

const handler = (msg: string) => console.log(msg);
onChanged.add(handler);

onChanged.trigger("hello");  // logs "hello"
onChanged.remove(handler);

// Await the next event
const next = await onChanged.whenNext();
```

| Member | Description |
|--------|-------------|
| `.add(handler)` | Subscribe |
| `.remove(handler)` | Unsubscribe |
| `.trigger(value?)` | Fire all handlers synchronously |
| `.clear()` | Remove all handlers |
| `.whenNext()` | Returns a `Promise` that resolves on the next trigger |


## RetryDelaySeq and RetryDelayer

Retry delay sequences with exponential backoff, similar to .NET's `RetryDelaySeq`.

```ts
import { RetryDelaySeq, RetryDelayer } from "@actuallab/core";

// Fixed 1-second delays
const fixed = RetryDelaySeq.fixed(1000);

// Exponential: 1s, 2s, 4s, ... capped at 30s
const exp = RetryDelaySeq.exp(1000, 30000);

// RetryDelayer wraps a sequence with cancellation support
const delayer = new RetryDelayer(exp, 10);  // max 10 retries
const delay = delayer.getDelay(3);  // 3rd retry
if (!delay.isLimitExceeded) {
  await delay.promise;  // wait for the delay
}
```


## DisposableBag

Aggregates multiple `Disposable` objects and disposes them in LIFO order.

```ts
import { DisposableBag } from "@actuallab/core";

const bag = new DisposableBag();
bag.add({ dispose: () => console.log("first") });
bag.add({ dispose: () => console.log("second") });
bag.dispose();  // logs "second", then "first"
```
