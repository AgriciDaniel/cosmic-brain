---
address: c-326
type: concept
title: "EF Core SaveChanges Interception"
tags:
  - concept
  - ef-core
  - dotnet
  - auditing
  - interceptors
status: developing
related:
  - "[[EF Core Audit Log]]"
  - "[[Entity Framework Core]]"
  - "[[EF Core Change Tracking and Saving]]"
  - "[[Chris Woodruff]]"
sources:
  - "[[ef-core-savechanges-interception-auditing-woodruff]]"
created: 2026-07-03
---

# EF Core SaveChanges Interception

Navigation: [[index]] | [[concepts/_index|Concepts]]

## Summary

SaveChanges Interception is EF Core's built-in extensibility point that lets you hook custom logic into the `SaveChanges()` / `SaveChangesAsync()` pipeline — before the SQL is generated and sent to the database. The primary use case is **auditing**: logging who changed what and when, automatically, without modifying every `DbContext` call.

## How It Works

1. **Implement** `ISaveChangesInterceptor` (or extend the `SaveChangesInterceptor` base class).
2. **Override** `SavingChanges(DbContextEventData, InterceptionResult<int>)` for sync and `SavingChangesAsync(...)` for async.
3. **Inspect** `eventData.Context.ChangeTracker.Entries()` — each entry has an `EntityState` (Added, Modified, Deleted, Unchanged, Detached).
4. **Log or act** before returning `result` (or `await base.SavingChangesAsync(...)`).

The interceptor fires on every `SaveChanges`/`SaveChangesAsync` call site-wide — no per-query opt-in needed.

## Registration

Two steps:

**Step 1 — DI registration (singleton):**

```csharp
services.AddSingleton<AuditInterceptor>();
```

**Step 2 — Attach to DbContext:**

```csharp
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder.AddInterceptors(_auditInterceptor);
}
```

## Comparison with EF Core Change Tracking

| Aspect | SaveChanges Interception | Built-in Change Tracking |
|--------|--------------------------|--------------------------|
| When it fires | Before SQL is generated | After entity is queried/attached |
| What it sees | Every entity about to be persisted | Current in-memory entity state |
| Purpose | Cross-cutting audit/logic layer | Update-generation, identity resolution |
| Requires modifying queries | No | No |

SaveChanges Interception is additive — it runs alongside the existing change tracker. The interceptor reads `ChangeTracker.Entries()` state but does not replace the tracker's role in generating SQL.

## Advanced Uses Beyond Auditing

- **Soft deletes** — intercept `Deleted` state, change to `Modified`, set `IsDeleted = true`.
- **Automatic timestamping** — set `CreatedAt` / `UpdatedAt` on every entity implementing an interface.
- **Business rule enforcement** — validate or reject changes before they reach the database.
- **Multi-tenancy** — automatically stamp `TenantId` on new entities.

## Related

- [[EF Core Audit Log]] — storing audit records in a dedicated database table via this interceptor.
- [[EF Core Change Tracking and Saving]] — the underlying change tracker the interceptor reads from.
- [[Entity Framework Core]] — the parent ORM.
