---
address: c-320
type: concept
title: "EF Core Audit Log"
tags:
  - concept
  - ef-core
  - dotnet
  - auditing
status: developing
related:
  - "[[EF Core SaveChanges Interception]]"
  - "[[Entity Framework Core]]"
sources:
  - "[[ef-core-savechanges-interception-auditing-woodruff]]"
created: 2026-07-03
---

# EF Core Audit Log

Navigation: [[index]] | [[concepts/_index|Concepts]]

## Summary

A database-backed audit trail implemented through [[EF Core SaveChanges Interception]]. Instead of merely logging changes to the console, the interceptor builds `AuditLog` entities from tracked changes and persists them in the same `SaveChanges` transaction.

## AuditLog Entity Schema

```csharp
public class AuditLog
{
    public int Id { get; set; }
    public string EntityName { get; set; }    // e.g., "Product", "Order"
    public string ChangeType { get; set; }    // "Added", "Modified", "Deleted"
    public string ChangedBy { get; set; }     // UserId or username
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}
```

## How It Works

1. The interceptor's `LogChanges()` method iterates `ChangeTracker.Entries()`.
2. For each entry in Added/Modified/Deleted state, an `AuditLog` object is created with the entity type name, change type, and current user.
3. All audit logs are added via `context.Set<AuditLog>().AddRange(auditLogs)`.
4. Because the interceptor fires *before* `SaveChanges` completes, the audit records are included in the same database transaction — they commit or roll back atomically with the data changes.

## Design Considerations

- **Transaction atomicity** — audit logs are written in the same transaction as the data change. If the data save fails, no orphaned audit records remain.
- **User identity** — `ChangedBy` requires injection of `IUserContext` / `IHttpContextAccessor` into the interceptor. The simple pattern uses a hardcoded placeholder ("SystemUser") that must be replaced for real use.
- **Old vs. new values** — the basic pattern logs only entity name and change type. Capturing old/new column values requires reading `entry.OriginalValues` and `entry.CurrentValues` property bags and storing them as JSON or in a separate `AuditLogDetail` child table.
- **Performance** — `AddRange` batches inserts efficiently. For very high-throughput systems, consider writing audit logs to a separate `DbContext` (different connection) to avoid inflating the primary transaction, at the cost of losing atomicity.

## Use Cases

- **SOX / GDPR / HIPAA compliance** — immutable record of who touched which data.
- **Debugging** — trace unexpected data changes back to a specific user and timestamp.
- **Soft-delete audit** — log which user soft-deleted a record and when.

## Related

- [[EF Core SaveChanges Interception]] — the interceptor pattern that powers this audit log.
- [[Entity Framework Core]] — the parent ORM, including its change tracker.
