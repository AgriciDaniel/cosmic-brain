# @actuallab/fusion-react

React hooks that integrate Fusion's reactive state system with React's rendering lifecycle.
This is the TypeScript equivalent of `ActualLab.Fusion.Blazor`'s `ComputedStateComponent<T>`.

**Peer dependency**: `react ^19`


## useComputedState

The primary hook for real-time data in React. It wraps a `ComputedState<T>` &mdash;
when server-side data changes and invalidations propagate, the component re-renders automatically.

```ts
import { useComputedState } from "@actuallab/fusion-react";

function TodoList({ api }: { api: ITodoApi }) {
  const { value, error, isInitial } = useComputedState(
    () => api.ListIds("~", 10),
    [api],
  );

  if (isInitial) return <p>Loading...</p>;
  if (error) return <p>Error: {String(error)}</p>;

  return (
    <ul>
      {value?.map(id => <li key={id}>{id}</li>)}
    </ul>
  );
}
```

### Signature

```ts
function useComputedState<T>(
  computer: () => T | Promise<T>,
  deps: readonly unknown[],
  options?: ComputedStateOptions<T>,
): UseComputedStateResult<T>;
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| `computer` | The compute function. Runs inside a `ComputeContext`, so any compute method it calls becomes a dependency. Re-runs automatically when dependencies are invalidated. |
| `deps` | React-style dependency array. When deps change, the old `ComputedState` is disposed and a new one is created. |
| `options` | Optional `ComputedStateOptions<T>`: `initialValue`, `initialOutput`, `updateDelayer` |

### Return Value

```ts
interface UseComputedStateResult<T> {
  value: T | undefined;       // undefined until first computation
  error: unknown;             // error from the last computation
  isInitial: boolean;         // true before first computation completes
  state: ComputedState<T>;    // the underlying state (for advanced use)
}
```

### Lifecycle

1. On mount (or deps change): creates a new `ComputedState<T>` with the provided `computer`
2. Subscribes to `state.whenFirstTimeUpdated()` and subsequent `state.whenUpdated()` calls
3. Triggers React re-render on each update
4. On unmount (or deps change): disposes the `ComputedState` (stops the update loop)

### Passing AsyncContext

When the `computer` function calls compute methods that themselves call other compute methods,
you may need to capture and pass `AsyncContext` explicitly:

```ts
const { value } = useComputedState(
  () => {
    const ctx = AsyncContext.current;
    return todos.list(10, ctx);
  },
  [todos],
);
```

### With Update Delayer

Control how quickly the state recomputes after invalidation:

```ts
import { FixedDelayer, UIUpdateDelayer } from "@actuallab/fusion";

// Recompute after 500ms delay
const { value } = useComputedState(
  () => api.GetSummary("~"),
  [api],
  { updateDelayer: FixedDelayer.get(500) },
);

// Recompute after 500ms, but immediately during uiActions.run()
const { value } = useComputedState(
  () => api.GetSummary("~"),
  [api],
  { updateDelayer: new UIUpdateDelayer(500) },
);
```


## useMutableState

A hook that wraps `MutableState<T>` &mdash; a manually-settable reactive value
that re-renders the component on change.

```ts
import { useMutableState } from "@actuallab/fusion-react";

function Counter() {
  const [count, setCount, state] = useMutableState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

### Signature

```ts
function useMutableState<T>(
  initial: T,
): [T, (value: Result<T> | T) => void, MutableState<T>];
```

### Return Value

| Index | Type | Description |
|-------|------|-------------|
| `[0]` | `T` | Current value |
| `[1]` | `(v) => void` | Setter (accepts `T` or `Result<T>`) |
| `[2]` | `MutableState<T>` | The underlying state (for use in compute methods via `.use()`) |

The third element is useful when you need the `MutableState` to participate
in the Fusion dependency graph &mdash; e.g., as an input to a `@computeMethod` or `useComputedState`:

```ts
function SearchResults({ api }: { api: ISearchApi }) {
  const [query, setQuery, queryState] = useMutableState("");

  const { value: results } = useComputedState(
    () => {
      const q = queryState.use();  // registers dependency
      return q ? api.Search(q) : [];
    },
    [api, queryState],
  );

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ul>
        {results?.map(r => <li key={r.id}>{r.title}</li>)}
      </ul>
    </>
  );
}
```


## Re-exports

`@actuallab/fusion-react` re-exports these for convenience:

| Export | From |
|--------|------|
| `UIActionTracker` | `@actuallab/fusion` |
| `uiActions` | `@actuallab/fusion` |
| `UIUpdateDelayer` | `@actuallab/fusion` |


## Connection Status UI

While not part of `@actuallab/fusion-react`, the `RpcPeerStateMonitor` from `@actuallab/rpc`
pairs naturally with React for connection status banners:

```tsx
import { RpcPeerStateMonitor, RpcPeerStateKind, type RpcPeerState } from "@actuallab/rpc";

function ConnectionBanner({ monitor }: { monitor: RpcPeerStateMonitor }) {
  const [state, setState] = React.useState<RpcPeerState>(() => monitor.state);

  React.useEffect(() => {
    const handler = (s: RpcPeerState) => setState(s);
    monitor.stateChanged.add(handler);
    setState(monitor.state);
    return () => monitor.stateChanged.remove(handler);
  }, [monitor]);

  if (state.kind === RpcPeerStateKind.Connected
    || state.kind === RpcPeerStateKind.JustConnected)
    return null;

  const reconnectsIn = state.reconnectsIn > 0
    ? Math.ceil(state.reconnectsIn / 1000) : 0;

  return (
    <div className="alert alert-warning">
      {state.kind === RpcPeerStateKind.JustDisconnected
        ? "Reconnecting..."
        : reconnectsIn > 0
          ? `Disconnected. Reconnecting in ${reconnectsIn}s.`
          : "Reconnecting..."}
      {reconnectsIn > 0 && (
        <button onClick={() => monitor.peer.hub.reconnectDelayer.cancelDelays()}>
          Reconnect now
        </button>
      )}
    </div>
  );
}
```
