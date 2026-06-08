---
type: concept
title: "Fusion Cache-Aware API Design"
updated: 2026-05-25
tags:
  - dotnet
  - fusion
  - api-design
  - caching
domain: dotnet
status: developing
related:
  - "[[ActualLab-Fusion]]"
  - "[[Fusion Compute Services]]"
  - "[[Fusion RPC Framework]]"
source: "[[fusion-docs-overview]]"
---

# Fusion Cache-Aware API Design

Fusion's caching at the method-call level fundamentally changes how you design APIs. Traditional approaches minimize round-trips by batching everything into one query (like GraphQL). Fusion inverts this: design for **individual cacheable units** and let the framework handle batching and efficiency.

## Traditional vs. Fusion

**Traditional (GraphQL-style):** Fetch everything at once. Problem: one message change invalidates the entire room query. No change notifications. Duplicate logic.

**Fusion:** Fetch IDs first, then individual items:

```csharp
[ComputeMethod]
Task<Ulid[]> ListMessageIds(Ulid roomId, int limit, CancellationToken ct);

[ComputeMethod]
Task<Message?> GetMessage(Ulid messageId, CancellationToken ct);

[ComputeMethod]
Task<User?> GetUser(Ulid userId, CancellationToken ct);
```

When rendering a chat room:
1. `ListMessageIds(roomId, 50)` → returns list of IDs
2. Each `<MessageItem>` calls `GetMessage(id)` and `GetUser(authorId)`
3. Only affected items re-render on changes

## Why This Works Better

### 1. Automatic Batching

ActualLab.Rpc automatically batches concurrent calls. 50 simultaneous `GetMessage` calls become one or two network frames — not 50 round-trips.

### 2. Speculative Execution with Persistent Cache

Clients use persistent caches (IndexedDB, localStorage, SQLite). On startup:
- Fusion **instantly returns cached values** while sending verification requests
- Requests include a hash of the cached value
- Server responds "match" (still correct) or "mismatch" (new value)
- Most resolve as matches → UI renders in ~100ms without waiting for network

On mismatch, the cached value is shown first, then updated when the correct value arrives.

### 3. Surgical Invalidation

When message #42 is edited:
- Only `GetMessage(42)` is invalidated
- The message list stays cached (IDs didn't change)
- All other messages stay cached
- Only the component showing #42 re-renders

With batch fetching, editing one message invalidates the entire room query.

### 4. Automatic Real-Time Updates

No separate subscription mechanism. When `GetMessage(42)` is invalidated on the server, any client observing it automatically learns about the change. No WebSocket handlers, no event dispatchers.

## Design Guidelines

### Fetch IDs First, Then Items

```csharp
// Good: fine-grained
[ComputeMethod] Task<Ulid[]> ListTodoIds(Session s, int limit, CancellationToken ct);
[ComputeMethod] Task<TodoItem?> GetTodo(Ulid id, CancellationToken ct);

// Avoid: coarse-grained
[ComputeMethod] Task<TodoItem[]> ListTodos(Session s, int limit, CancellationToken ct);
```

### Keep Arguments Stable

Each unique argument set is a separate cache entry. Avoid timestamps or volatile data in arguments:

```csharp
// Good: stable cache key
[ComputeMethod] Task<User?> GetUser(Ulid userId, CancellationToken ct);

// Bad: timestamp means no cache hits
[ComputeMethod] Task<User?> GetUser(Ulid userId, DateTime asOf, CancellationToken ct);
```

### Separate Frequently and Rarely Changing Data

Split often-changing data from stable data:

```csharp
[ComputeMethod] Task<UserProfile> GetUserProfile(Ulid userId, CancellationToken ct);
[ComputeMethod] Task<UserPresence> GetUserPresence(Ulid userId, CancellationToken ct);
```

Presence updates won't invalidate profile data.

### Not Everything Needs to Be Observable

For search results or paginated lists, use **regular methods** for the list, compute methods for items:

```csharp
// Regular method — not cached, not observable
Task<Ulid[]> SearchProducts(string query, int skip, int take, CancellationToken ct);

// Compute method — each item cached and observable
[ComputeMethod] Task<Product?> GetProduct(Ulid id, CancellationToken ct);
```

Users expect search results to be stable, not changing in real-time as products are added elsewhere.

## Observing Changes

```csharp
// Wait until invalidated
await computed.WhenInvalidated(ct);

// Wait until condition met
var updated = await computed.When(x => x > 100, ct);

// Stream changes reactively
await foreach (var c in computed.Changes(ct)) { ... }
```

## Pseudo-Dependencies

When you need to invalidate groups of computed results together (e.g., "invalidate all chat messages for room X"), create pseudo methods — compute methods that don't return data but serve as invalidation anchors that other methods depend on.

## The Mental Model

Fusion APIs form a **distributed dependency graph**:
- Each compute method = a node
- Method calls create edges (dependencies)
- Invalidation cascades through the graph
- Clients observe leaf nodes
- Changes propagate from data sources to all observers

Design the graph so changes invalidate the **minimum necessary** portion. The result is an API that's simultaneously efficient (cache hits), real-time (automatic propagation), simple (no manual subscriptions), and scalable (cache hits avoid database queries).
