---
type: concept
title: "Fusion TypeScript Port"
updated: 2026-05-25
tags:
  - dotnet
  - fusion
  - typescript
  - javascript
  - react
domain: dotnet
status: developing
related:
  - "[[ActualLab-Fusion]]"
  - "[[Fusion RPC Framework]]"
source: "[[fusion-docs-overview]]"
---

# Fusion TypeScript Port

Fusion has a TypeScript port that brings compute services, reactive states, and RPC to JavaScript/TypeScript clients. Use it for React apps, Node.js backends, and non-Blazor clients.

## npm Packages

| Package | Purpose |
|---------|---------|
| `@actuallab/core` | Foundation: `Result<T>`, `Option<T>`, async primitives, serialization |
| `@actuallab/fusion` | Core Fusion: compute services, states, `Computed<T>` |
| `@actuallab/rpc` | RPC client: WebSocket transport, service clients |
| `@actuallab/fusion-rpc` | Fusion + RPC integration |
| `@actuallab/fusion-react` | React bindings: `useComputedState`, `useMutableState` |

## TypeScript Core (`@actuallab/core`)

Mirrors `ActualLab.Core`:
- `Result<T>` — success/error result type
- `Option<T>` — optional value type
- Time utilities (Moment-like)
- Serialization abstractions

## TypeScript Fusion (`@actuallab/fusion`)

Compute services and states in TypeScript:

```typescript
class UserService {
    @ComputeMethod()
    async getUser(id: string, ct?: CancellationToken): Promise<User> {
        // Results are cached and dependency-tracked
    }

    async updateUser(id: string, data: UserUpdate): Promise<void> {
        // Invalidate via invalidation block
        using (Invalidation.begin()) {
            this.getUser(id); // Invalidate
        }
    }
}
```

## TypeScript RPC (`@actuallab/rpc`)

WebSocket-based RPC client with shared service interfaces between .NET server and TypeScript client:

```typescript
const rpc = createRpcClient("wss://myserver/rpc/ws");
const chat = rpc.getService<IChatService>();
const messages = await chat.getRecentMessages(); // Auto-cached, reactive
```

## React Integration (`@actuallab/fusion-react`)

React hooks for reactive state:

```tsx
function UserProfile({ userId }: { userId: string }) {
    const state = useComputedState(
        () => userService.getUserProfile(userId),
        { updateDelay: 1000 }
    );

    if (state.isInitial) return <Spinner />;
    if (state.hasError) return <Error error={state.error} />;
    return <ProfileCard user={state.value} />;
}

// Mutations via useMutableState
const [name, setName] = useMutableState("World");
```

The hooks integrate with React's rendering cycle — state changes trigger re-renders automatically, similar to `ComputedStateComponent<T>` in Blazor.

## Architecture

The TypeScript port mirrors the .NET architecture:
1. **Server**: .NET compute services exposed via ActualLab.RPC WebSocket
2. **Client**: TypeScript RPC client with client-side `Computed<T>` replicas
3. **Invalidation**: propagates from .NET server → TypeScript client automatically
4. **Caching**: client-side cache with ETag-style verification on reconnect
