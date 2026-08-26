---
address: c-306
type: source
title: "Tracking Every Change: Using SaveChanges Interception for EF Core Auditing"
author:
  - "[[Chris Woodruff]]"
source: "https://woodruff.dev/tracking-every-change-using-savechanges-interception-for-ef-core-auditing/"
published: 2025-02-06
ingested: 2026-07-03
tags:
  - source
  - ef-core
  - auditing
  - dotnet
related:
  - "[[EF Core SaveChanges Interception]]"
  - "[[EF Core Audit Log]]"
  - "[[Chris Woodruff]]"
  - "[[Entity Framework Core]]"
---

# Tracking Every Change: Using SaveChanges Interception for EF Core Auditing

Source: [woodruff.dev](https://woodruff.dev/tracking-every-change-using-savechanges-interception-for-ef-core-auditing/)
Author: [[Chris Woodruff]]
Published: 2025-02-06

## Summary

Practical tutorial on using EF Core's built-in `ISaveChangesInterceptor` interface to automatically log all database inserts, updates, and deletes without modifying every query manually. Covers the interceptor pattern, DI registration, and storing audit logs in a dedicated database table.

## Key Content

### The Interceptor Pattern

- Implement `ISaveChangesInterceptor` (or extend `SaveChangesInterceptor` base class).
- Override `SavingChanges()` and `SavingChangesAsync()` — hooks fire before data is written.
- Loop through `context.ChangeTracker.Entries()` to inspect `EntityState` (Added, Modified, Deleted).

### Registration

- Register interceptor as a singleton via DI: `services.AddSingleton<AuditInterceptor>()`.
- Attach to DbContext via `optionsBuilder.AddInterceptors(_auditInterceptor)` in `OnConfiguring`.

### Database-Backed Audit Log

- Create an `AuditLog` entity (`Id`, `EntityName`, `ChangeType`, `ChangedBy`, `Timestamp`).
- In `LogChanges()`, build a `List<AuditLog>` from tracked entries and call `context.Set<AuditLog>().AddRange(auditLogs)`.

### Use Cases

- Security and compliance (SOX, GDPR, HIPAA).
- Debugging and troubleshooting — know who changed what.
- User activity monitoring.
- Soft deletes — intercept and flag records as inactive instead of hard deleting.

## Pages Created

- [[EF Core SaveChanges Interception]] — concept page for the interceptor pattern.
- [[EF Core Audit Log]] — concept page for database-backed audit logging.
