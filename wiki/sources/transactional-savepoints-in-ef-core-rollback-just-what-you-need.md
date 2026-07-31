---
address: c-318
type: source
title: "Transactional Savepoints in EF Core: Rollback Just What You Need!"
author:
  - "[[Chris Woodruff]]"
source: "https://woodruff.dev/transactional-savepoints-in-ef-core-rollback-just-what-you-need/"
published: 2025-02-11
ingested: 2026-07-03
tags:
  - source
  - dotnet
  - ef-core
  - transactions
  - savepoints
status: current
related:
  - "[[EF Core Transactional Savepoints]]"
  - "[[Chris Woodruff]]"
  - "[[Entity Framework Core]]"
  - "[[EF Core Change Tracking and Saving]]"
---

# Transactional Savepoints in EF Core: Rollback Just What You Need!

**Author:** [[Chris Woodruff]]
**Published:** 2025-02-11
**URL:** https://woodruff.dev/transactional-savepoints-in-ef-core-rollback-just-what-you-need/

## Summary

Practical, code-first guide to using transactional savepoints in Entity Framework Core to achieve partial rollbacks within a single transaction. Instead of the default "all or nothing" transaction behavior, savepoints let you roll back only the failing step while keeping successful operations intact.

## Key Points

1. EF Core transactions default to all-or-nothing: either everything commits or everything rolls back.
2. Savepoints enable partial rollbacks: create a named savepoint before a risky operation, then `ROLLBACK TO SAVEPOINT` if that specific step fails.
3. Two API approaches are demonstrated:
   - **Raw SQL:** `ExecuteSqlRawAsync("SAVEPOINT ...")` and `ExecuteSqlRawAsync("ROLLBACK TO SAVEPOINT ...")`
   - **Built-in EF Core API:** `transaction.CreateSavepointAsync("name")` and `transaction.RollbackToSavepointAsync("name")`
4. After rolling back to a savepoint, you must still call `CommitAsync()` to commit the remaining (pre-savepoint) work.
5. Use cases: batch processing (payments/orders/inventory), long-running transactions, conditional logic, preventing partial data corruption.

## Database Support

- **Supported:** SQL Server, PostgreSQL, MySQL
- **Not supported:** SQLite (does not support savepoints the same way)

## Caveats

- Savepoints must be created inside an active transaction.
- Each savepoint adds transaction overhead; use only for critical operations that might fail.
- Too many savepoints degrade performance.

## Integration

Paired with the concept page [[EF Core Transactional Savepoints]].
