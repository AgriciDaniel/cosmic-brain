# Pseudo-Dependencies for Batch Invalidation

::: tip The Key Idea
Think of pseudo-methods as **invalidation groups** or **colors**. Instead of trying to enumerate every
cached result you need to invalidate (which is often impossible), you assign a "color" to a group of
compute method calls. When something changes, you simply say "invalidate everything that's red" —
and Fusion handles the rest.
:::

When a compute method has multiple parameters (like pagination limits), you can't know which specific
argument combinations have been called. Trying to enumerate and invalidate them all is impractical.
The **pseudo-method pattern** solves this by creating a shared dependency — a single point you can
invalidate to affect all related cached results at once.

Each pseudo-method call adds one extra dependency per computation (not per call), making this pattern
extremely cheap to use.

## The Problem

Consider a `ListIds` method with a `limit` parameter:

<!-- snippet: PartFPatterns_Problem -->
```cs
[ComputeMethod]
public virtual async Task<Ulid[]> ListIds(string folder, int limit, CancellationToken ct = default)
{
    // Returns up to `limit` IDs from the folder
    return Array.Empty<Ulid>();
}
```
<!-- endSnippet -->

When a new item is added, you need to invalidate `ListIds(folder, 10)`, `ListIds(folder, 50)`, etc.
But you don't know which specific limits have been called.

## The Solution: Pseudo-Methods

Create a "pseudo" compute method that acts as a shared dependency:

<!-- snippet: PartFPatterns_PseudoMethod -->
```cs
// Pseudo-method: returns immediately, exists only to create a dependency
[ComputeMethod]
protected virtual Task<Unit> PseudoListIds(string folder)
    => TaskExt.UnitTask;

[ComputeMethod]
public virtual async Task<Ulid[]> ListIds(string folder, int limit, CancellationToken ct = default)
{
    // Create dependency on the pseudo-method
    await PseudoListIds(folder);

    // Actual implementation
    return await FetchIds(folder, limit, ct);
}
```
<!-- endSnippet -->

Now, when invalidating:

<!-- snippet: PartFPatterns_InvalidatePseudo -->
```cs
[CommandHandler]
public virtual async Task AddItem(AddItemCommand command, CancellationToken ct = default)
{
    var folder = command.Folder;
    if (Invalidation.IsActive) {
        // This invalidates ALL ListIds(folder, <any_limit>) calls
        _ = PseudoListIds(folder);
        return;
    }

    // Actual implementation
    await AddItemToDb(command, ct);
}
```
<!-- endSnippet -->

## Hierarchical Dependencies

Pseudo-methods can call themselves recursively to create tree-like dependency structures. This is useful
when you have hierarchical data (spatial indices, organizational trees, etc.) and want to invalidate
at different granularities.

<!-- snippet: PartFPatterns_HierarchicalBinaryTree -->
```cs
// Binary tree style: each level depends on its parent
[ComputeMethod]
protected virtual async Task<Unit> PseudoRegion(int level, int index)
{
    if (level > 0) {
        // Create dependency on parent level
        await PseudoRegion(level - 1, index / 2);
    }
    return default;
}
```
<!-- endSnippet -->

With this pattern:
- Invalidating a leaf node only affects queries depending on that specific node
- Invalidating a parent node cascades to all children (via Fusion's dependency tracking)
- You can invalidate at any level of the hierarchy

<!-- snippet: PartFPatterns_HierarchicalInvalidation -->
```cs
// Invalidate just one leaf region
using (Invalidation.Begin())
    _ = PseudoRegion(3, 5);  // Only queries for region (3,5) and its ancestors

// Invalidate an entire subtree by invalidating its root
using (Invalidation.Begin())
    _ = PseudoRegion(1, 0);  // All regions under (1,0) get invalidated
```
<!-- endSnippet -->

## Complete Example

<!-- snippet: PartFPatterns_CompleteTodoService -->
```cs
public class TodoService : IComputeService
{
    // Pseudo-method for batch invalidation
    [ComputeMethod]
    protected virtual Task<Unit> PseudoListIds(Session session)
        => TaskExt.UnitTask;

    [ComputeMethod]
    public virtual async Task<Ulid[]> ListIds(Session session, int count, CancellationToken ct = default)
    {
        // Establish dependency on pseudo-method
        await PseudoListIds(session);

        // Actual query
        return await QueryIds(session, count, ct);
    }

    [CommandHandler]
    public virtual async Task<TodoItem> AddOrUpdate(AddTodoCommand command, CancellationToken ct = default)
    {
        var session = command.Session;
        if (Invalidation.IsActive) {
            _ = Get(session, command.Todo.Id, default);
            // Invalidate all ListIds variants for this session
            _ = PseudoListIds(session);
            _ = GetSummary(session, default);
            return null!;
        }

        // Actual implementation
        return await SaveTodo(command, ct);
    }

    [ComputeMethod]
    public virtual Task<TodoItem?> Get(Session session, Ulid id, CancellationToken ct)
        => Task.FromResult<TodoItem?>(null);

    [ComputeMethod]
    public virtual Task<string> GetSummary(Session session, CancellationToken ct)
        => Task.FromResult("");

    private Task<Ulid[]> QueryIds(Session session, int count, CancellationToken ct)
        => Task.FromResult(Array.Empty<Ulid>());

    private Task<TodoItem> SaveTodo(AddTodoCommand command, CancellationToken ct)
        => Task.FromResult(command.Todo);
}
```
<!-- endSnippet -->

## Best Practices

1. **Keep pseudo-methods protected**: They're implementation details, not part of the public API
2. **Use meaningful names**: Choose names that reflect the group being invalidated
3. **Consider hierarchies**: For tree-structured data, recursive pseudo-methods provide fine-grained control
