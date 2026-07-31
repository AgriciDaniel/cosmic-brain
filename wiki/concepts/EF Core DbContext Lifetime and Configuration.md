---
type: concept
title: "EF Core DbContext Lifetime and Configuration"
created: 2026-07-03
updated: 2026-07-03
tags:
  - concept
  - dotnet
  - ef-core
  - dbcontext
  - dependency-injection
status: developing
related:
  - "[[Entity Framework Core]]"
  - "[[EF Core Change Tracking and Saving]]"
  - "[[EF Core Migrations]]"
  - "[[EF Core Advanced Features]]"
sources:
  - "[[30-ef-core-interview-questions]]"
complexity: intermediate
domain: dotnet
aliases:
  - "DbContext Lifetime"
  - "AddDbContextPool"
---

# EF Core DbContext Lifetime and Configuration

Foundational EF Core concepts around `DbContext` registration, lifetime, and the code-first vs. reverse-engineering modeling choice. These "look basic" but are where interviewers separate junior/mid candidates from those who have only used EF Core inside a single controller.

## Default Lifetime: Scoped

`DbContext` is registered **scoped** by default — one instance per HTTP request (or per DI scope). This is deliberate: the context holds a change tracker that accumulates entity snapshots, and that accumulation needs to be bounded to a single unit of work, then disposed.

`DbContext` is **not thread-safe** and not designed to be long-lived:

- **Singleton registration** → two concurrent requests share one change tracker → race conditions, stale data, `InvalidOperationException: A second operation was started on this context instance before a previous operation completed`.
- **Transient registration** injected into multiple services within one request → each service gets a *different* change tracker → `SaveChangesAsync` only persists whatever subset of changes each individually-tracked context happened to accumulate.

> **Red flag:** "I just register it as a singleton so it's reused." This is called out as the single most common way to corrupt EF Core in production.

## Captive Dependency: DbContext in a Singleton Background Service

A singleton service (e.g. `BackgroundService`) cannot safely depend on a scoped `DbContext` directly — that's a **captive dependency**. Either the context gets captured once and lives forever (change tracker never resets, grows unbounded), or DI throws at startup if scope validation is enabled.

**Fix:** inject `IServiceScopeFactory` and create a scope per unit of work:

```csharp
public class OrderProcessor(IServiceScopeFactory scopeFactory) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken ct)
    {
        while (!ct.IsCancellationRequested)
        {
            using var scope = scopeFactory.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            // do work with a fresh, short-lived context
            await db.SaveChangesAsync(ct);
        }
    }
}
```

> **Red flag:** "I'd make the DbContext a singleton too so the lifetimes match" — this makes the thread-safety problem worse, not better.

## AddDbContext vs. AddDbContextPool

- **`AddDbContext`** — new instance per scope, discarded at end of scope.
- **`AddDbContextPool`** — maintains a pool of reusable instances, resetting most state between uses; avoids allocation/setup cost on high-throughput APIs.

**The catch:** pooling resets the change tracker and EF-managed state, but **custom state on a derived `DbContext`** (a tenant ID field, an injected service captured in a property) leaks between requests unless handled explicitly (`OnConfiguring` or pooling reset hooks). Pooling is a performance win only if the context is effectively stateless beyond what EF Core itself manages.

> **Red flag:** "Pooling is always better, just use it everywhere" — not if the context carries per-request state (e.g. a tenant ID) that needs resetting.

## Code-First vs. Database-First (Reverse Engineering)

EF Core has **no EDMX file and no visual Model-First designer** — those only existed in legacy Entity Framework 6. EF Core offers two paths:

- **Code-first** — entities + configuration written in code; migrations generate/evolve schema.
- **Reverse engineering** (sometimes loosely called "database-first") — `Scaffold-DbContext` against an existing database.

Default recommendation: code-first, because the model lives in source control, changes are reviewable in pull requests, and migrations give a deployable schema history. Reverse engineering is reserved for onboarding onto an existing database not owned by the team.

> **Red flag:** "I'd use the EDMX designer" — signals EF6-only experience; EDMX doesn't exist in EF Core.

## Multiple DbContexts in One Application

Legitimate reasons to run more than one `DbContext`:

- Bounded contexts in a modular monolith, where each module owns its own tables and shouldn't be coupled through one giant context.
- A read-optimized context with `NoTracking` defaults, separate from a write context.
- Genuinely separate physical databases.

**Cost:** transactions spanning two contexts need explicit coordination (shared connection or distributed transaction); entities tracked in one context are unknown to the other. Split contexts along real module/bounded-context boundaries, not arbitrarily.

> **Red flag:** "Never, one context is always enough" — ignores module boundaries that matter at scale.

## Relation to Other Concepts

Directly upstream of [[EF Core Change Tracking and Saving]] (the change tracker this page describes the lifetime scope of) and [[EF Core Migrations]] (code-first is the migration workflow's starting assumption). The multiple-DbContext discussion connects to [[EF Core Advanced Features]]'s query-filter and value-converter material — all are "beyond the simple path" senior-level EF Core knowledge.

## Source

[[30-ef-core-interview-questions]] — Q1-Q4 and Q29 ("Fundamentals and DbContext" + part of "Advanced" categories), by [[Mukesh Murugan]].
