# Cache-Aware API Design

Fusion's caching works at the method call level: each unique `(service, method, arguments)` combination
produces a cached result. This fundamentally changes how you should design your APIs compared to
traditional approaches.

## Traditional vs. Fusion API Design

### The Traditional Approach

Modern APIs often optimize for **minimizing round-trips**. GraphQL is a perfect example: you craft
a single query that fetches everything the UI needs in one request, then distribute the data to
various components.

```graphql
# Traditional: fetch everything at once
query GetChatRoom($roomId: ID!) {
  room(id: $roomId) {
    name
    members { id, name, avatar }
    messages(last: 50) {
      id, text, author { id, name }
    }
  }
}
```

This makes sense when:
- Every request hits the database
- Network latency dominates
- There's no intelligent caching layer

But it creates problems:
- **Cache granularity is wrong**: If one message changes, the entire room query is invalidated
- **No change notifications**: You poll or implement separate WebSocket subscriptions
- **Duplicate logic**: UI components depend on the query shape; changing the query requires updating consumers

### The Fusion Approach

With Fusion, **every compute method is automatically cached and invalidation-aware**. Think of each
method as having a built-in ETag that Fusion manages for you, plus automatic change notifications
when that ETag changes.

This means you should design APIs around **individual cacheable units**:

<!-- snippet: PartAC_FusionApiDesign -->
```cs
// Fusion: fetch IDs, then individual items
[ComputeMethod]
Task<Ulid[]> ListMessageIds(Ulid roomId, int limit, CancellationToken ct);

[ComputeMethod]
Task<Message?> GetMessage(Ulid messageId, CancellationToken ct);

[ComputeMethod]
Task<User?> GetUser(Ulid userId, CancellationToken ct);
```
<!-- endSnippet -->

When a UI component needs to display a chat room:
1. It calls `ListMessageIds(roomId, 50)` to get the message IDs
2. It renders a `<MessageItem>` component for each ID
3. Each `<MessageItem>` calls `GetMessage(messageId)` and `GetUser(message.AuthorId)`

## Why This Works

You might think: "That's dozens of method calls instead of one! How can that be efficient?"

Fusion makes this approach **more efficient** than batch fetching:

### 1. Automatic Batching

ActualLab.Rpc automatically batches concurrent calls. When your UI renders 50 `<MessageItem>`
components simultaneously, their `GetMessage` and `GetUser` calls are batched into a small number
of network transmissions — often just one or two frames.

### 2. Speculative Execution with Persistent Cache

Fusion clients can use persistent caches (IndexedDB, localStorage, SQLite, etc.). When a cached value
exists, Fusion **instantly returns it** while simultaneously sending a request to the server. The
client doesn't wait for the network — it makes progress immediately using the cached value.

The request includes a hash of the cached value. The server responds with either:
- A **match response** (short): "Your value is still correct" — the client keeps it and subscribes to future invalidations
- A **mismatch response**: The new value — the client treats this like an invalidation and updates

On a typical app startup (like [Voxt](https://voxt.ai)), thousands of these requests fire almost
instantly. Most resolve with match responses because the content is mostly unchanged. Meanwhile,
the UI renders in a hundred of milliseconds because it never waited for the network.

What happens on a cache mismatch? Fusion behaves as if the method was invalidated: the cached value
is shown first, then the UI re-renders with the correct value once it arrives. Since mismatches are
rare, this is barely noticeable — but the startup performance gain from speculative execution is
dramatic.

See [Persistent Cache Implementation](PartAC-PC) for how to implement your own persistent cache.

### 3. Surgical Invalidation

When message #42 is edited:
- Only `GetMessage(42)` is invalidated
- The message list stays cached (IDs didn't change)
- All other messages stay cached
- Only components displaying message #42 re-render

With the batch approach, editing one message would invalidate the entire room query, forcing a
complete refetch and re-render.

### 4. Automatic Real-Time Updates

There's no separate subscription mechanism. When `GetMessage(42)` is invalidated on the server,
any client observing it automatically learns about the change. The component re-renders with
fresh data. No WebSocket handlers, no event dispatchers, no state reconciliation.

## Design Guidelines

### Fetch IDs First, Then Items

Instead of returning full objects in lists, return IDs and let components fetch details:

<!-- snippet: PartAC_FetchIdsPattern -->
```cs
// Prefer this:
[ComputeMethod]
Task<Ulid[]> ListTodoIds(Session session, int limit, CancellationToken ct);

[ComputeMethod]
Task<TodoItem?> GetTodo(Ulid id, CancellationToken ct);
```
<!-- endSnippet -->

<!-- snippet: PartAC_FetchIdsAntiPattern -->
```cs
// Over this:
[ComputeMethod]
Task<TodoItem[]> ListTodos(Session session, int limit, CancellationToken ct);
```
<!-- endSnippet -->

The second approach invalidates the entire list when any todo changes. The first approach only
invalidates specific items.

### Keep Method Arguments Minimal and Stable

Each unique argument combination creates a separate cache entry. Design arguments to maximize
cache hits:

<!-- snippet: PartAC_StableArguments -->
```cs
// Good: stable cache keys
[ComputeMethod]
Task<User?> GetUser(Ulid userId, CancellationToken ct);
```
<!-- endSnippet -->

<!-- snippet: PartAC_UnstableArguments -->
```cs
// Problematic: timestamp in arguments means no cache hits
[ComputeMethod]
Task<User?> GetUser(Ulid userId, DateTime asOf, CancellationToken ct);
```
<!-- endSnippet -->

### Use Pseudo-Dependencies for Flexible Invalidation

When you need to invalidate groups of cached results with varying parameters,
use [pseudo-dependencies](PartAC-PM) to create invalidation groups.

### Separate Frequently and Rarely Changing Data

If part of an object changes often (like a "last seen" timestamp) while the rest is stable,
consider splitting it:

<!-- snippet: PartAC_SeparateData -->
```cs
[ComputeMethod]
Task<UserProfile> GetUserProfile(Ulid userId, CancellationToken ct);

[ComputeMethod]
Task<UserPresence> GetUserPresence(Ulid userId, CancellationToken ct);
```
<!-- endSnippet -->

This way, presence updates don't invalidate profile data.

### Not Everything Needs to Be Observable

For long, paginated lists (like search results), consider using a **regular method** instead of
a compute method for the list query:

<!-- snippet: PartAC_NotObservable -->
```cs
// Regular method - not cached, not observable
Task<Ulid[]> SearchProducts(string query, int skip, int take, CancellationToken ct);

// Compute method - each item is cached and observable
[ComputeMethod]
Task<Product?> GetProduct(Ulid id, CancellationToken ct);
```
<!-- endSnippet -->

Why? Users don't expect search results to update in real-time. They expect stability: the list
should stay the same until they explicitly search again or change filters. Making it observable
would cause confusing UI updates as products are added or removed elsewhere.

The pattern works like this:
1. User triggers a search (clicks button, changes filter)
2. `SearchProducts` runs a fresh query and returns IDs
3. UI renders `<ProductItem>` for each ID
4. Each `<ProductItem>` calls `GetProduct(id)` — this **is** observable
5. Individual products update in real-time; the list stays stable

You can still call compute methods from regular methods — that's perfectly fine. And you can
optionally cache the search results on the server if it makes sense for your use case. The key
insight is that **not everything benefits from being observable**. Choose based on user expectations.

## The Mental Model

Think of Fusion APIs as a **distributed dependency graph**:

- Each compute method is a node
- Dependencies form edges (when one method calls another)
- Invalidation cascades through the graph
- Clients observe leaf nodes (UI-facing methods)
- Changes propagate from data sources to all observers automatically

Your job is to structure this graph so that changes invalidate the **minimum necessary** portion.
Fetch IDs first, then items. Keep cache keys stable. Group related invalidations with pseudo-dependencies.
Split frequently-changing data from stable data.

The result is an API that's simultaneously:
- **Efficient**: Most calls resolve from cache
- **Real-time**: Changes propagate automatically
- **Simple**: No manual subscription management
- **Scalable**: Cache hits don't touch the database
