# ActualLab.Fusion vs MobX / Knockout

MobX and Knockout are reactive state management libraries that automatically track dependencies and update the UI when observed data changes. Fusion shares this reactive philosophy but operates across the client-server boundary.

## The Core Difference

**MobX/Knockout** provide client-side reactivity. You make objects "observable," and the library automatically tracks which views depend on which data. When data changes, affected views re-render. Server communication requires separate code — you build the API layer and data fetching yourself.

**Fusion** provides the same automatic dependency tracking, but extends it to server-side computed values and propagates invalidations across the network. Shared C# interfaces serve as the API contract — no separate API layer to build.

## MobX Approach (JavaScript)

```javascript
// Store
class TodoStore {
    @observable todos = [];
    @observable filter = "all";

    @computed get filteredTodos() {
        return this.filter === "all"
            ? this.todos
            : this.todos.filter(t => t.completed === (this.filter === "completed"));
    }

    @action addTodo(title) {
        this.todos.push({ title, completed: false });
    }

    // YOU must build this - fetch from your API
    @action async loadTodos() {
        this.todos = await fetch('/api/todos').then(r => r.json());
    }
}

// React component - automatically re-renders when filteredTodos changes
const TodoList = observer(() => {
    const store = useStore();
    return (
        <ul>
            {store.filteredTodos.map(todo => <TodoItem todo={todo} />)}
        </ul>
    );
});
```

## Fusion Approach

```csharp
// Shared interface - works on both client and server
public interface ITodoService : IComputeService
{
    [ComputeMethod]
    Task<Todo[]> GetFilteredTodos(string filter, CancellationToken ct);
}

// Server implementation
public class TodoService : ITodoService
{
    [ComputeMethod]
    public virtual async Task<Todo[]> GetFilteredTodos(string filter, CancellationToken ct)
    {
        var todos = await GetAllTodos(ct); // Dependency automatically tracked
        return filter switch {
            "completed" => todos.Where(t => t.Completed).ToArray(),
            "active" => todos.Where(t => !t.Completed).ToArray(),
            _ => todos
        };
    }

    [ComputeMethod]
    public virtual async Task<Todo[]> GetAllTodos(CancellationToken ct)
        => await _db.Todos.ToArrayAsync(ct);
}

// Blazor component - automatically re-renders when server data changes
@inherits ComputedStateComponent<Todo[]>
@code {
    [Parameter] public string Filter { get; set; }
    protected override Task<Todo[]> ComputeState(CancellationToken ct)
        => TodoService.GetFilteredTodos(Filter, ct);
}
```

## Where Each Excels

### ActualLab.Fusion is better at

- **No API plumbing** — shared C# interfaces work like Protobuf definitions, but in pure C#
- Reactive model that extends from client to server seamlessly
- Automatic server synchronization without manual fetching
- Built-in caching with dependency-based invalidation
- Multi-client consistency (everyone sees the same data)
- Works as client-only state management too

### MobX / Knockout are better at

- Minimal boilerplate for client-side-only reactivity
- Fine-grained reactivity within the browser
- Working with any UI framework (React, Vue, etc.)
- JavaScript/TypeScript ecosystems
- Working with any backend (REST, GraphQL, etc.)

## The Plumbing Problem

With MobX, you must build the API layer yourself:

```javascript
// 1. Define your API endpoints (server)
app.get('/api/todos', async (req, res) => {
    const todos = await db.todos.findAll();
    res.json(todos);
});

// 2. Build fetch logic (client)
@action async loadTodos() {
    const response = await fetch('/api/todos');
    this.todos = await response.json();
}

// 3. Handle updates - when does client refresh? You decide.
// Polling? WebSockets? Manual refresh button?
```

With Fusion, the interface IS the API:

```csharp
// Shared interface = API contract
public interface ITodoService : IComputeService
{
    [ComputeMethod]
    Task<Todo[]> GetTodos(CancellationToken ct);
}

// Client calls interface method → gets cached data → receives updates automatically
// No fetch code. No API endpoints. No polling.
```

## Reactive Model Comparison

| Feature | MobX/Knockout | Fusion |
|---------|---------------|--------|
| Observable values | `@observable` / `ko.observable` | `[ComputeMethod]` |
| Computed values | `@computed` / `ko.computed` | `[ComputeMethod]` calling other methods |
| Dependency tracking | Automatic | Automatic |
| Scope | Client-side only | Client + Server |
| Network sync | You build it | Automatic |
| API layer | You build it | Shared interfaces |

## When to Use Each

### Choose MobX/Knockout when:
- Building a JavaScript/TypeScript frontend
- State is primarily client-side
- You already have a REST/GraphQL API
- Team is familiar with these libraries
- Working with non-.NET backends

### Choose Fusion when:
- Building a .NET application (especially Blazor)
- You want to eliminate API plumbing
- Server is the source of truth
- Multiple clients should see consistent state
- Caching and automatic invalidation matter

## The Shared Philosophy

Both MobX/Knockout and Fusion embrace **transparent reactivity** — you don't manually subscribe to changes or wire up updates. You declare what depends on what, and the framework handles the rest.

The difference:
- **MobX/Knockout**: Reactivity within the browser, API is your problem
- **Fusion**: Reactivity across the entire stack, API is just shared interfaces

## Architectural Comparison

```
MobX/Knockout:
┌─────────────────────────────────────┐
│ Browser                             │
│  ┌─────────┐     ┌─────────────┐    │
│  │ Store   │────▶│ View        │    │
│  │ (state) │     │ (auto-sync) │    │
│  └─────────┘     └─────────────┘    │
└─────────────────────────────────────┘
        ▲
        │ YOU build: fetch(), API, refresh logic
        ▼
┌─────────────────────────────────────┐
│ Server + API (you build this)       │
└─────────────────────────────────────┘

Fusion:
┌─────────────────────────────────────┐
│ Browser                             │
│  ┌─────────┐     ┌─────────────┐    │
│  │ Computed│────▶│ View        │    │
│  │ (cached)│     │ (auto-sync) │    │
│  └────┬────┘     └─────────────┘    │
└───────│─────────────────────────────┘
        │ Shared interface = automatic sync
        ▼
┌─────────────────────────────────────┐
│ Server (same interface)             │
└─────────────────────────────────────┘
```

If you love MobX's reactive model and wish it extended to your server without building API plumbing, Fusion brings that same philosophy to .NET full-stack development.
