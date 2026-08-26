---
type: concept
title: "EF Core Transactional Savepoints"
tags:
  - concept
  - dotnet
  - ef-core
  - transactions
  - savepoints
status: developing
related:
  - "[[Entity Framework Core]]"
  - "[[EF Core Change Tracking and Saving]]"
  - "[[transactional-savepoints-in-ef-core-rollback-just-what-you-need]]"
  - "[[Chris Woodruff]]"
created: 2026-07-03
---

# EF Core Transactional Savepoints

Navigation: [[index]] | [[concepts/_index|Concepts]]

Transactional savepoints are named markers within an open database transaction that allow partial rollbacks. Instead of the default "all or nothing" transaction behavior in EF Core, a savepoint lets you undo only the operations after that marker while preserving everything before it.

## Why Use Savepoints

By default, EF Core transactions follow the all-or-nothing rule: either every operation in the transaction commits, or everything rolls back. Savepoints break this constraint by letting you:

- Roll back specific parts of a transaction instead of the whole thing.
- Handle errors more gracefully without restarting everything.
- Avoid reprocessing successful work after a partial failure.
- Keep long-running transactions stable by fixing issues in steps.

## Two API Approaches

### Raw SQL (Provider-Agnostic)

```csharp
await context.Database.ExecuteSqlRawAsync("SAVEPOINT BeforeRiskyOp");
// ... risky operation ...
await context.Database.ExecuteSqlRawAsync("ROLLBACK TO SAVEPOINT BeforeRiskyOp");
```

This approach works with any EF Core database provider that supports SQL-standard savepoints.

### Built-in EF Core API (Recommended)

```csharp
await transaction.CreateSavepointAsync("BeforeRiskyOp");
// ... risky operation ...
await transaction.RollbackToSavepointAsync("BeforeRiskyOp");
await transaction.CommitAsync(); // Commit the remaining (pre-savepoint) work
```

The built-in API is cleaner and provider-aware. Important: after rolling back to a savepoint, you must explicitly call `CommitAsync()` to persist the pre-savepoint operations. Without the commit, the entire transaction (including pre-savepoint work) is discarded when the transaction is disposed.

## Savepoints vs. Full Rollback

| Scenario | Savepoints | Full Rollback |
|---|---|---|
| A single step fails in a multi-step transaction | Yes | No |
| A critical issue occurs and everything must be undone | No | Yes |
| Some operations should be committed while others should not | Yes | No |
| The database state must return to the exact pre-transaction point | No | Yes |

## Database Support

- **Supported:** SQL Server, PostgreSQL, MySQL
- **Not supported:** SQLite

## Constraints and Caveats

1. Savepoints must be created inside an active transaction. Always `BeginTransactionAsync()` first.
2. Each savepoint increases transaction overhead. Use only for critical operations that might fail, not as a blanket pattern.
3. Too many savepoints degrade performance. In a loop processing hundreds of items, create savepoints at logical group boundaries rather than per-item.

## Common Use Cases

- **Batch processing:** Payments, orders, inventory updates where individual item failures should not undo the entire batch.
- **Long-running transactions:** Avoid restarting an entire process when a late step fails; roll back only the failing step.
- **Conditional logic:** When later operations depend on earlier ones but may need selective undo.
- **Preventing partial data corruption:** Recover selectively rather than losing all work.

## Source

- [[transactional-savepoints-in-ef-core-rollback-just-what-you-need]] (Chris Woodruff, 2025-02-11)
