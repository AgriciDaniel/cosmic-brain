---
title: "30 EF Core Interview Questions That Actually Get Asked in 2026"
source: "https://codewithmukesh.com/blog/efcore-interview-questions/?ref=dailydev"
author:
  - "[[Mukesh Murugan]]"
published: 2026-06-24
created: 2026-07-03
description: "30 real EF Core interview questions with great answers, red flags, and follow-ups. N+1, change tracking, migrations, concurrency - updated for EF Core 10."
tags:
  - "clippings"
---
[dotnet](https://codewithmukesh.com/categories/dotnet/) [Lesson 138/147](https://codewithmukesh.com/courses/dotnet-webapi-zero-to-hero/) New

30 real EF Core interview questions with great answers, red flags, and follow-ups. N+1, change tracking, migrations, concurrency - updated for EF Core 10.

![Mukesh Murugan](https://codewithmukesh.com/_astro/mukesh_square.DoJ8yhC9_ZoOKlt.webp)

Mukesh Murugan

Software Engineer

In this post

10 sections

65

[

Chapter 138 of 147 · Module 13 of 13 · Free

View course →

.NET Web API Zero to Hero Course

From `dotnet new` to `docker push` - REST, EF Core 10, auth, caching, Clean Architecture, observability. 147 hands-on lessons, source on GitHub.

](https://codewithmukesh.com/courses/dotnet-webapi-zero-to-hero/)

EF Core interview questions in 2026 are almost never “What is an ORM?” anymore. They’re scenario questions: your query returns 200 rows but runs 201 SQL statements, your migration won’t apply in production, your background job throws because a `DbContext` got shared across threads. Those reveal whether you’ve actually shipped data access or just followed a tutorial.

I’ve interviewed plenty of.NET developers, and EF Core is where strong candidates separate from average ones fast. Everyone can write a `.ToListAsync()`. Far fewer can explain what the change tracker is doing, why lazy loading is off by default, or when `ExecuteUpdateAsync` is the wrong choice. This article is **30 EF Core interview questions** in the format that actually gets used: a real scenario, how I’d answer it, the answer that gets you rejected, and the follow-up the interviewer chains next.

Every question is accurate for **EF Core 10** on **.NET 10**, and each links to a deep-dive if you need to close a gap. Let’s get into it.

## What Makes a Good EF Core Interview Answer?

A good EF Core answer does three things: it states what EF Core does under the hood, it names the trade-off, and it ends with a default recommendation. “It depends” is fine as long as the next sentence is “here’s my default, and here’s when I’d deviate.”

The 30 questions below are organized into 7 categories that mirror how data-access rounds actually flow. Jump straight to the one you want to sharpen:

> This page is part of my.NET interview prep series. For the broader set, see the [.NET interview questions hub](https://codewithmukesh.com/blog/dotnet-interview-questions/) and the [.NET Web API interview questions](https://codewithmukesh.com/blog/dotnet-webapi-interview-questions/) which covers the API layer (REST, auth, caching) that sits on top of EF Core.

---

## Fundamentals and DbContext

These look basic but they’re where juniors and mids get separated. The lifetime questions in particular catch people who’ve only used EF Core inside a single controller.

### Q1. What Is the Lifetime of a DbContext, and Why Does It Matter?

Mid

`DbContext` is registered as **scoped** by default - one instance per HTTP request. That’s deliberate. The context holds a change tracker that accumulates entity snapshots, and you want that scoped to a single unit of work, then disposed.

The reason it matters: `DbContext` is **not thread-safe** and it’s not designed to be long-lived. If you make it a singleton, two concurrent requests share one change tracker and you get race conditions, stale data, and `InvalidOperationException: A second operation was started on this context instance before a previous operation completed`. If you make it transient while injecting it into multiple services in one request, those services each get a different change tracker and your `SaveChangesAsync` saves the wrong subset.

**Red flag answer:** “I just register it as a singleton so it’s reused.” - That’s the single most common way to corrupt EF Core in production.

**Follow-up:** “What changes if you’re in a background service instead of a request?”

### Q2. You Inject DbContext Into a Singleton Background Service and Get Random Errors. What’s Wrong?

Senior

A singleton can’t depend on a scoped service - that’s a **captive dependency**. The `DbContext` either gets captured once and lives forever (so its change tracker never resets and grows unbounded), or DI throws at startup if scope validation is on.

The fix is to inject `IServiceScopeFactory` and create a scope per unit of work:

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

**Red flag answer:** “I’d make the DbContext a singleton too so the lifetimes match.” - Now you’ve made the thread-safety problem worse.

### Q3. What’s the Difference Between AddDbContext and AddDbContextPool?

Mid

`AddDbContext` creates a new context instance per scope and throws it away. `AddDbContextPool` keeps a pool of reusable instances and resets their state between uses, which avoids the allocation and setup cost on high-throughput APIs.

The catch interviewers want you to know: pooling resets the change tracker and most state, but if you store custom state on a derived `DbContext` (a tenant ID field, an injected service captured in a property), that state leaks between requests unless you handle it in `OnConfiguring` or via the pooling reset hooks. So pooling is a performance win, but only safe if your context is effectively stateless beyond what EF Core manages.

**Red flag answer:** “Pooling is always better, just use it everywhere.” - Not if your context carries per-request state.

**Follow-up:** “How would you pass a tenant ID into a pooled context safely?”

### Q4. Code-First or Database-First in EF Core 10 - Which Do You Use and Why?

Junior

In EF Core there’s no EDMX and no visual Model-First designer anymore - that was legacy Entity Framework 6. EF Core gives you **code-first** (you write entities and configuration, migrations generate the schema) or **reverse engineering** an existing database with `Scaffold-DbContext` (sometimes called database-first).

My default is code-first because the model lives in source control, changes are reviewable in pull requests, and migrations give you a deployable history. I reach for reverse engineering only when I’m onboarding onto an existing database I don’t own.

**Red flag answer:** “I’d use the EDMX designer.” - That doesn’t exist in EF Core; it signals you’ve only used EF6.

Read next · Companion article

## [Fluent API Entity Configuration in EF Core](https://codewithmukesh.com/blog/fluent-api-entity-configuration-efcore/)

Code-first means configuring entities properly. This covers the Fluent API for keys, relationships, indexes, and column types - the configuration interviewers expect you to know cold.

---

## Querying and LINQ Translation

This category tests whether you understand that your C# LINQ becomes SQL - and what happens when it can’t.

### Q5. What’s the Difference Between IQueryable and IEnumerable in EF Core?

Mid

`IQueryable<T>` builds an expression tree that EF Core translates to SQL and runs **in the database**. `IEnumerable<T>` runs LINQ **in memory** on objects already pulled from the database.

This is the difference between a fast query and an accidental table scan into memory:

```csharp
// Runs in SQL: WHERE IsActive = 1, returns matching rows only
var active = await db.Products.Where(p => p.IsActive).ToListAsync();

// DANGER: AsEnumerable() pulls EVERY row into memory, THEN filters in C#
var bad = db.Products.AsEnumerable().Where(p => p.IsActive).ToList();
```

The moment you call `AsEnumerable()`, `ToList()`, or `foreach` early, composition stops and everything after runs client-side. I keep queries as `IQueryable` until the last possible moment.

**Red flag answer:** “They’re basically the same, both are just collections.” - That misunderstanding ships full-table loads to production.

### Q6. Your.Where() Throws “Could Not Be Translated”. What Happened and How Do You Fix It?

Senior

EF Core tried to translate a C# expression into SQL and couldn’t - usually because you called a custom method or a.NET API with no SQL equivalent inside the query:

```csharp
// Throws: FormatTaxId is a C# method, no SQL translation exists
var rows = await db.Customers
    .Where(c => FormatTaxId(c.TaxId) == input)
    .ToListAsync();
```

Since EF Core 3.0, the framework **refuses to silently evaluate this on the client** (which used to cause invisible N+1 and full scans). My fixes, in order: rewrite the predicate so it’s translatable (compare raw columns), move the un-translatable bit after an explicit `AsEnumerable()` if the filtered set is already small, or push the logic into a computed column or `FromSql` call.

**Red flag answer:** “I’d just add `.AsEnumerable()` before the `.Where()` to make the error go away.” - That fixes the exception by loading the whole table into memory. Wrong trade.

### Q7. What’s the Difference Between First, Single, and Find?

Junior

`First` / `FirstOrDefault` returns the first matching row and is fine when multiple matches are acceptable. `Single` / `SingleOrDefault` asserts there is exactly one match and throws if there are two - use it when a duplicate means a bug. `Find` is special: it checks the **change tracker first** and only hits the database if the entity isn’t already loaded, so it can save a round trip when you look up by primary key.

**Red flag answer:** “They all do the same thing, I just use `First`.” - Then you’ve thrown away `Single` ’s correctness guarantee and `Find` ’s caching.

### Q8. How Do You Write a Left Join in EF Core LINQ?

Mid

EF Core doesn’t have a `LeftJoin` keyword (until you reach for the newer operator); the classic pattern is `GroupJoin` plus `SelectMany` with `DefaultIfEmpty`, which generates a SQL `LEFT JOIN`:

```csharp
var query =
    from o in db.Orders
    join c in db.Customers on o.CustomerId equals c.Id into grp
    from c in grp.DefaultIfEmpty()
    select new { o.Id, CustomerName = c != null ? c.Name : "(none)" };
```

The `DefaultIfEmpty()` is what makes it a left join instead of an inner join. Most of the time, though, if there’s a navigation property I’d just project through it and let EF Core figure out the join.

**Red flag answer:** “EF Core can’t do left joins.” - It can; you just need the right LINQ shape.

Coming soon · In the writing queue

Draft

## LeftJoin and RightJoin in.NET 10 with EF Core 10

The full set of join patterns in EF Core - inner, left, right, and the SQL each LINQ shape produces. Worth reviewing before any data-access interview.

---

## Loading Strategies

How you load related data is the single most common source of EF Core performance problems, so expect at least one of these.

### Q9. Lazy, Eager, or Explicit Loading - What’s the Default in EF Core?

Mid

EF Core loads related data three ways: **eager** (`Include`, loaded up front in the query), **explicit** (`context.Entry(x).Reference(...).Load()`, loaded on demand by you), and **lazy** (loaded automatically when you touch a navigation property).

The key fact: **lazy loading is OFF by default in EF Core.** You have to install `Microsoft.EntityFrameworkCore.Proxies`, call `UseLazyLoadingProxies()`, and make your navigation properties `virtual` (the [lazy loading docs](https://learn.microsoft.com/en-us/ef/core/querying/related-data/lazy) spell out both the proxy and the no-proxy approach). This is the opposite of legacy EF6, where lazy loading was on by default. Knowing that flip is a quick seniority signal.

**Red flag answer:** “Lazy loading is on by default like in Entity Framework.” - Correct for EF6, wrong for EF Core, and it tells me which one you’ve actually used.

### Q10. Why Is Lazy Loading Considered Dangerous in a Web API?

Senior

Two reasons. First, it hides N+1 problems: a `foreach` over orders that touches `order.Customer` fires one query per iteration, and because it’s implicit you don’t see it until SQL Profiler does. Second, lazy loading needs a live `DbContext`. In a web API the context is disposed at end of request, so a navigation accessed after that throws `ObjectDisposedException` - a classic bug when an entity escapes into a serializer or a background continuation.

My rule: in APIs I keep lazy loading off and load explicitly with `Include` or projection. Lazy loading is more defensible in a desktop app with a long-lived context.

**Red flag answer:** “I turn lazy loading on so I never have to think about loading.” - That’s exactly how you ship N+1.

### Q11. When Do You Use Include Versus a Projection?

Mid

`Include` pulls back full related entities and tracks them - use it when you’ll modify the graph. A projection with `Select` into a DTO pulls back **only the columns you need** and is faster and lighter - use it for read-only responses:

```csharp
// Projection: one query, only the 3 columns, no tracking overhead
var dtos = await db.Orders
    .Select(o => new OrderDto(o.Id, o.Total, o.Customer.Name))
    .ToListAsync();
```

My default for GET endpoints is projection. I only `Include` when I’m loading an aggregate I’m about to change.

**Red flag answer:** “I always use `Include` to be safe.” - You’re loading entire entity graphs to return three fields.

Read next · Companion article

## [EF Core Relationships: One-to-One, One-to-Many, Many-to-Many](https://codewithmukesh.com/blog/ef-core-relationships-one-to-one-one-to-many-many-to-many/)

Loading strategies only make sense once relationships are configured correctly. This covers all three relationship types and how navigation properties drive your joins.

### Q12. You Include Three Collections and the Row Count Explodes. What’s Going On?

Senior

That’s a **cartesian explosion**. Each `Include` of a collection joins another table, and SQL multiplies the rows: 100 orders with 10 items and 5 tags each can return 5,000 rows of duplicated data that EF Core then de-duplicates in memory. The query gets slow and bandwidth-heavy.

The fix is [`AsSplitQuery()`](https://learn.microsoft.com/en-us/ef/core/querying/single-split-queries), which issues one SQL query per collection instead of one giant join:

```csharp
var orders = await db.Orders
    .Include(o => o.Items)
    .Include(o => o.Tags)
    .AsSplitQuery()
    .ToListAsync();
```

The trade-off: split queries run multiple round trips and aren’t wrapped in a single snapshot, so for collections that must be perfectly consistent I’d keep a single query or wrap it in a transaction.

**Red flag answer:** “I’d just add more `Include` s.” - That makes the explosion bigger.

---

## N+1 and Performance

This is the heart of a senior EF Core round. Expect to diagnose, not just define.

### Q13. Your Logs Show One Query to Load 50 Invoices, Then 50 More Queries. What Is This and How Do You Catch It Earlier?

Senior

That’s the **N+1 query problem**: one query for the parent list, then one extra query per parent to load a related property. It happens with lazy loading or with an `Include` you forgot, when code iterates and touches a navigation property.

Beyond fixing it with eager loading or projection, the interviewer is really asking how you **catch it before production**. I wire up EF Core logging in development so every query is visible, and I treat a burst of identical parameterized queries as a smell. On hot paths I’ll assert query counts in an integration test so a regression fails the build instead of the customer.

**Red flag answer:** “I’d turn off lazy loading and move on.” - That hides one cause but doesn’t give you a way to detect the next one.

**Follow-up:** “How would you write a test that fails if an endpoint suddenly issues 50 queries?”

### Q14. When Are Compiled Queries Actually Worth It?

Senior

Every time EF Core runs a LINQ query it compiles the expression tree to SQL and caches it. **Compiled queries** (`EF.CompileAsyncQuery`) skip even that cache lookup by giving you a pre-built delegate, shaving microseconds off each call.

That only matters on genuinely hot paths - a query run thousands of times a second where you’ve already removed the database-side bottlenecks. For 99% of queries the built-in query cache is enough and a compiled query is premature optimization that costs readability. I reach for them only after a profiler points at query compilation overhead.

**Red flag answer:** “I’d compile every query for performance.” - Now you’ve added complexity everywhere for a win that exists in a handful of places.

Coming soon · In the writing queue

Draft

## Compiled Queries in EF Core 10 - Boosting Performance for Hot Query Paths

How compiled queries work, the exact syntax for sync and async, and the benchmark that shows when they pay off. Read this before you claim them in an interview.

### Q15. When Do You Use AsNoTracking, and What’s the Catch?

Mid

[`AsNoTracking`](https://learn.microsoft.com/en-us/ef/core/querying/tracking) tells EF Core not to create change-tracking snapshots for the returned entities. For read-only queries that’s a real saving in memory and CPU, so I use it for every query whose results I won’t modify.

The catch interviewers want: with no tracking, EF Core **doesn’t do identity resolution** by default, so if the same row appears twice in a result (say through a join), you get two different object instances instead of one shared reference. If that matters you use `AsNoTrackingWithIdentityResolution`. And obviously you can’t call `SaveChanges` to persist changes on a no-tracking entity - you’d have to attach it first.

**Red flag answer:** “I put `AsNoTracking` on everything because it’s faster.” - Then how do your updates work? It also breaks reference equality where you might rely on it.

Read next · Companion article

## [Tracking vs No-Tracking Queries in EF Core](https://codewithmukesh.com/blog/tracking-vs-no-tracking-queries-efcore/)

The full breakdown of change tracking, AsNoTracking, identity resolution, and when each one bites. This is the article behind this exact interview question.

### Q16. A Query Is Fast With Test Data but Times Out in Production. How Do You Diagnose It?

Senior

I don’t guess - I look at the SQL. First I call `query.ToQueryString()` to get the exact generated SQL, then run it in the database with an execution plan. That tells me whether it’s a missing index, a sequential scan, or a bad join.

Common culprits and fixes: a missing index on a filter or foreign-key column (`builder.HasIndex(...)`), loading whole entities where a projection would do, a cartesian explosion that needs `AsSplitQuery`, or returning an unbounded result set that needs pagination. The discipline is measure first, change one thing, measure again.

**Red flag answer:** “I’d raise the command timeout.” - That turns a 30-second query into a 90-second query; it doesn’t fix anything.

### Q17. You Need to Process a Million Rows and the App Runs Out of Memory. What Do You Do?

Senior

`ToListAsync()` buffers every row into memory at once - that’s the OOM. For large result sets I **stream** instead, with `AsAsyncEnumerable()`, so rows are processed one at a time and never all held at once:

```csharp
await foreach (var row in db.Events.AsNoTracking().AsAsyncEnumerable())
{
    // process one row; only one is in memory
}
```

I pair that with `AsNoTracking` so the change tracker doesn’t accumulate a million snapshots. If I’m mutating data in bulk rather than reading it, I’d skip loading entirely and use `ExecuteUpdateAsync` / `ExecuteDeleteAsync`.

**Red flag answer:** “I’d load it all and increase the server’s memory.” - That just moves the cliff edge.

---

## Migrations

Migrations questions test whether you’ve run EF Core in a real deployment or only on your laptop.

### Q18. How Do You Apply EF Core Migrations Safely in Production?

Mid

The rule I lead with: **don’t call `Database.Migrate()` at application startup in production.** With multiple instances they race to apply the same migration, and you get lock contention or partial application. Startup migration is fine for a local demo, not for a deployment.

What I do instead is generate an idempotent artifact and apply it as a controlled pipeline step: either an idempotent SQL script (`dotnet ef migrations script --idempotent`) that a DBA can review, or a **migration bundle** (`dotnet ef migrations bundle`) - a self-contained executable that applies pending migrations and is easy to run in CI/CD. Either way the schema change is a deliberate, reviewable step before the new app version goes live.

**Red flag answer:** “I call `db.Database.Migrate()` in `Program.cs`.” - Dangerous the moment you scale past one instance.

Read next · Companion article

## [Running Migrations in EF Core](https://codewithmukesh.com/blog/running-migrations-efcore/)

The full migrations workflow - adding, scripting, bundling, and applying migrations the right way for local, CI, and production environments.

### Q19. You Get “The Model Has Changed Since the Last Migration.” What Causes It and How Do You Recover?

Senior

EF Core stores a snapshot of the model (`ModelSnapshot.cs`) and compares it to your current entity configuration. The warning means your entities or Fluent API config changed but no migration was added to capture the diff, so the model and the migration history are out of sync.

Recovery: add a migration to capture the pending change (`dotnet ef migrations add`), review the generated `Up` / `Down`, and apply it. If the snapshot itself got corrupted by a bad merge - two branches each adding migrations - I resolve the snapshot conflict carefully or, in a dev database, roll back and regenerate. The deeper lesson is to never hand-edit the snapshot and to keep migrations small so merges stay clean.

**Red flag answer:** “I delete the migrations folder and start over.” - Fine on a throwaway dev DB, catastrophic anywhere that already has applied migrations.

Read next · Companion article

## [Cleaning Up and Squashing EF Core Migrations](https://codewithmukesh.com/blog/cleaning-migrations-efcore/)

How to safely consolidate a messy migrations history, resolve snapshot drift, and reset migrations without losing your schema. Directly relevant to this question.

### Q20. A Teammate Changed the Production Schema Manually. Now Migrations Are Broken. How Do You Fix It?

Senior

The migration history table (`__EFMigrationsHistory`) and the actual schema have diverged - EF Core thinks a migration hasn’t run, or tries to create something that already exists. I don’t fight it by deleting things blindly.

My approach: reconcile the two. I figure out exactly what manual change was made, write a migration that represents that change, and then mark it as already applied without re-running it (`dotnet ef migrations add` to capture intent, then insert the row into the history table or use `--idempotent` scripting so the `IF NOT EXISTS` guards skip what’s present). The point is to make the migration history honest again so future migrations apply cleanly.

**Red flag answer:** “I’d manually edit the production database to match.” - Now two environments drift and the next deploy breaks differently.

### Q21. How Do You Seed Reference Data With EF Core?

Mid

For static reference data (country codes, roles, lookup tables) I use model seeding via configuration so the data is part of a migration and ships with the schema. For data that depends on runtime services or needs to run once at startup, I seed it explicitly in code with a guarded check so it’s idempotent.

The distinction interviewers probe: migration-based seeding is versioned and deterministic but only suits fixed data; runtime seeding is flexible but you own the “has this already run?” logic. Mixing them up - trying to seed user-generated or environment-specific data through migrations - causes painful migration diffs.

**Red flag answer:** “I just insert rows in `Program.cs` every time the app starts.” - Without an idempotency check that duplicates data on every restart.

Read next · Companion article

## [Seeding Initial Data in EF Core](https://codewithmukesh.com/blog/seeding-initial-data-efcore/)

Both seeding strategies - migration-based HasData and runtime seeding - with the trade-offs and the idempotency patterns interviewers expect.

---

## Change Tracking and Saving

The change tracker is the part of EF Core most candidates can use but can’t explain. These questions find out which group you’re in.

### Q22. How Does EF Core Know Which Properties Changed When You Call SaveChanges?

Mid

By default EF Core uses **snapshot change tracking**. When a tracked entity is loaded, EF Core stores a snapshot of its original values. On `SaveChanges` it compares each tracked entity’s current values against that snapshot, and generates `UPDATE` statements that touch only the columns that actually changed.

That’s also why tracking has a cost (the snapshots) and why `AsNoTracking` skips it. If you modify an entity that isn’t tracked - a detached object from an API request - EF Core has no snapshot, so you have to `Attach` it and tell it what changed, or set its state explicitly.

**Red flag answer:** “EF Core just updates every column every time.” - It doesn’t by default; that misunderstanding leads people to fight phantom updates.

Read next · Companion article

## [Tracking vs No-Tracking Queries in EF Core](https://codewithmukesh.com/blog/tracking-vs-no-tracking-queries-efcore/)

How snapshot change tracking works internally, what it costs, and when to switch it off - the mechanics behind this question.

### Q23. You Need to Deactivate 500,000 Rows. Walk Me Through the Most Efficient Way.

Mid

Loading half a million entities just to flip a boolean is the wrong approach - that’s 500,000 snapshots and a giant `SaveChanges`. Since EF Core 7 I’d use [`ExecuteUpdateAsync`](https://learn.microsoft.com/en-us/ef/core/saving/execute-insert-update-delete), which runs a single `UPDATE` statement server-side with no entities loaded and no change tracking:

```csharp
await db.Users
    .Where(u => u.LastLogin < cutoff)
    .ExecuteUpdateAsync(s => s.SetProperty(u => u.IsActive, false));
```

This is the difference between one SQL statement and hundreds of thousands of tracked objects.

**Red flag answer:** “I’d load them all, loop, set the flag, and call `SaveChanges`.” - That’s the slow, memory-heavy pattern `ExecuteUpdate` exists to replace.

Read next · Companion article

## [Bulk Operations in EF Core](https://codewithmukesh.com/blog/bulk-operations-efcore/)

ExecuteUpdate and ExecuteDelete in depth - syntax, batching, and the performance numbers versus loading and looping.

### Q24. What’s the Catch With ExecuteUpdate and ExecuteDelete?

Senior

They run directly as SQL and **bypass the change tracker entirely** - which is the point, but also the trap. Because no entities are loaded and no `SaveChanges` runs, your `SaveChangesInterceptor`, domain events, and audit logic **don’t fire**. If you’ve implemented soft deletes through a `SaveChanges` interceptor, an `ExecuteDeleteAsync` will hard-delete the row right past it.

So my rule: `ExecuteUpdate` / `ExecuteDelete` are for plain bulk data changes with no side effects. The moment a change needs auditing, soft-delete handling, or events, I either handle those concerns explicitly in the same transaction or go through the tracked path.

**Red flag answer:** “They’re just a faster `SaveChanges`, no difference.” - The difference is exactly what gets you in trouble.

Read next · Companion article

## [Soft Deletes in EF Core](https://codewithmukesh.com/blog/soft-deletes-efcore/)

Implementing soft deletes with a SaveChanges interceptor and query filters - and why bulk ExecuteDelete bypasses them. The exact gotcha behind this question.

### Q25. Two Users Save Edits to the Same Record at the Same Time. How Do You Stop One From Silently Overwriting the Other?

Senior

That’s a lost update, and the answer is **optimistic concurrency control**. I add a concurrency token - a `rowversion` / `timestamp` column - that EF Core includes in the `WHERE` clause of every `UPDATE`:

```csharp
public class Account
{
    public int Id { get; set; }
    public decimal Balance { get; set; }
    [Timestamp] public byte[] RowVersion { get; set; } = default!;
}
```

If the row changed since it was read, the `UPDATE` matches zero rows and EF Core throws `DbUpdateConcurrencyException`. I catch it, reload the current values, and decide the policy: surface a conflict to the user, or merge. The key is that the conflict is detected rather than silently lost.

**Red flag answer:** “Last write wins, the database handles it.” - The database does exactly that, which is the data loss you were asked to prevent.

Read next · Companion article

## [Concurrency Control and Optimistic Locking in EF Core](https://codewithmukesh.com/blog/concurrency-control-optimistic-locking-efcore/)

Concurrency tokens, DbUpdateConcurrencyException handling, and the resolve-and-retry pattern - everything this question chains into.

### Q26. If SaveChanges Modifies Five Entities and the Third Fails, What Happens to the Other Four?

Mid

A single `SaveChanges` call is wrapped in a transaction by default, so it’s **atomic** - if any statement fails, the whole batch rolls back and none of the five changes persist. EF Core also batches the statements into as few round trips as it can.

Where people get caught: that guarantee only covers one `SaveChanges` call. If you call `SaveChanges` three separate times in a method and the second throws, the first is already committed. When several operations must succeed or fail together across multiple calls, I open an explicit transaction with `BeginTransactionAsync` and commit once at the end.

**Red flag answer:** “The first two would save and the rest wouldn’t.” - Wrong for a single `SaveChanges`; that’s only true across multiple calls.

---

## Advanced

These separate senior candidates. They’re about the features you reach for when the simple path isn’t enough.

### Q27. How Do You Implement Multi-Tenancy or Soft Delete Without Adding a Where Clause to Every Query?

Senior

**Global query filters.** You define a predicate once in `OnModelCreating` and EF Core appends it to every query for that entity automatically:

```csharp
modelBuilder.Entity<Order>().HasQueryFilter(o => !o.IsDeleted);
```

A currency signal that lands well in 2026: before EF Core 10 you got exactly one filter per entity type, so soft delete and multi-tenancy had to be combined into a single `&&` expression and disabled together. **EF Core 10 added [named query filters](https://learn.microsoft.com/en-us/ef/core/querying/filters)** - you give each filter a name and can define several per entity, then disable just the one you need:

```csharp
modelBuilder.Entity<Order>()
    .HasQueryFilter("SoftDelete", o => !o.IsDeleted)
    .HasQueryFilter("Tenant", o => o.TenantId == _tenantId);

// bypass only soft delete for an admin "show deleted" view
var all = await db.Orders.IgnoreQueryFilters(["SoftDelete"]).ToListAsync();
```

The other gotcha interviewers look for: required navigation properties can leak filtered data through joins if the related entity has its own filter, and `IgnoreQueryFilters()` with no arguments still bypasses every filter on the query.

**Red flag answer:** “I’d add `.Where(x => !x.IsDeleted)` everywhere.” - One forgotten query and you’ve leaked deleted or cross-tenant data.

Read next · Companion article

## [Global Query Filters in EF Core](https://codewithmukesh.com/blog/global-query-filters-efcore/)

Defining query filters for soft delete and multi-tenancy, the navigation-leak gotcha, and how to bypass them with IgnoreQueryFilters.

### Q28. How Do You Store a Value Object or Enum as a Custom Column Type?

Mid

A **value converter** translates between your CLR property and the database column. It’s how I store an enum as a string, a strongly-typed ID as an int, or a small value object as a single column:

```csharp
modelBuilder.Entity<Order>()
    .Property(o => o.Status)
    .HasConversion<string>(); // store the enum as text, not an int
```

For richer mappings I implement `ValueConverter<TModel, TProvider>`. The trade-off to mention: a converted column is harder to query and index efficiently than a native one, so I don’t convert things I need to filter on heavily without checking the generated SQL.

**Red flag answer:** “I’d store it as JSON and parse it in code.” - Now you can’t query or index it; a converter keeps it a first-class column.

Read next · Companion article

## [Fluent API Entity Configuration in EF Core](https://codewithmukesh.com/blog/fluent-api-entity-configuration-efcore/)

Value converters, keys, indexes, and relationships through the Fluent API - the configuration surface this question lives in.

### Q29. When Would You Use More Than One DbContext in a Single Application?

Senior

A few legitimate reasons: bounded contexts in a modular monolith where each module owns its tables and you don’t want one giant context coupling everything; a read context configured with `NoTracking` defaults separate from a write context; or genuinely separate databases. Multiple contexts keep the model focused and migrations scoped to the module that owns them.

The cost to acknowledge: transactions across two contexts need explicit coordination (a shared connection or a distributed transaction), and entities tracked in one context aren’t known to the other. So I split contexts along real boundaries, not arbitrarily.

**Red flag answer:** “Never, one context is always enough.” - Fine for a small app, but it ignores module boundaries that matter at scale.

Read next · Companion article

## [Working With Multiple DbContexts in EF Core](https://codewithmukesh.com/blog/multiple-dbcontext-efcore/)

When and how to use multiple DbContexts - configuration, migrations per context, and the transaction coordination this question chains into.

### Q30. Fluent API or Data Annotations - Which Wins When They Conflict, and Which Do You Prefer?

Mid

When both configure the same thing, the **Fluent API wins** - it runs in `OnModelCreating` after annotations are read. I prefer the Fluent API for anything beyond trivial because it keeps mapping concerns out of my domain classes, handles configuration annotations can’t express (composite keys, complex relationships, filters), and keeps entities clean. I’ll use a data annotation like `[Required]` or `[MaxLength]` when it doubles as validation, but schema-shaping lives in Fluent configuration, ideally split into `IEntityTypeConfiguration<T>` classes.

**Red flag answer:** “It doesn’t matter, they’re interchangeable.” - They have a precedence order, and mixing them carelessly produces a schema you didn’t intend.

---

## 5 EF Core Interview Mistakes That Get Developers Rejected

After interviewing plenty of.NET developers, these are the patterns that sink an otherwise decent candidate:

1. **Describing EF6 and calling it EF Core.** Mentioning EDMX, the visual designer, lazy-loading-by-default, or `ObjectContext` tells the interviewer you stopped learning before EF Core. Know what changed.
2. **Reaching for AsNoTracking and ExecuteUpdate like magic switches.** Speed without understanding the catch (identity resolution, bypassed interceptors) signals copy-paste knowledge.
3. **Not being able to read the SQL.** If you can’t say “I’d call `ToQueryString()` and check the plan,” every performance answer sounds like guessing.
4. **Saying “it depends” and stopping.** Senior answers continue with a default and the conditions to deviate.
5. **No production scars.** “I call `Migrate()` at startup” or “last write wins” reveals you’ve only run EF Core on a laptop. Interviewers listen for “I’ve seen this fail when…”

## Key Takeaways

- **EF Core 10 defaults differ from legacy EF6.** Lazy loading is off, there’s no EDMX, and code-first with migrations is the norm. Know the differences cold.
- **Most EF Core performance problems are loading problems.** N+1, cartesian explosion, and loading entire entities instead of projections cause the majority of slow queries.
- **The change tracker is the concept to master.** Snapshot tracking explains `SaveChanges`, `AsNoTracking`, and why `ExecuteUpdate` behaves differently.
- **Migrations questions test deployment experience.** Never `Migrate()` at startup in production; script or bundle migrations as a reviewed pipeline step.
- **Every strong answer ends with a trade-off.** State what EF Core does, name the cost, give a default recommendation.

Free resource Companion download

## [.NET Interview Questions](https://codewithmukesh.com/blog/dotnet-interview-questions)

300+ real.NET interview questions with answers, red flags, and follow-ups - C#, EF Core, ASP.NET Core, system design

What is the N+1 problem in EF Core and how do you fix it?

The N+1 problem is when EF Core runs one query to load a list of parent entities, then one additional query per parent to load a related property, resulting in N+1 total queries. It usually happens with lazy loading or a missing Include while iterating over a navigation property. The fixes are eager loading with Include, projecting only the data you need with Select, or split queries with AsSplitQuery when a single join becomes too large. The best way to catch it early is to enable EF Core query logging in development and assert query counts in integration tests on hot paths.

What is the difference between lazy, eager, and explicit loading in EF Core?

Eager loading uses Include to load related data as part of the original query. Explicit loading loads related data on demand when you call Load on an entry. Lazy loading loads related data automatically the first time you access a navigation property. In EF Core lazy loading is off by default and requires the Proxies package, UseLazyLoadingProxies, and virtual navigation properties, which is the opposite of legacy Entity Framework 6 where lazy loading was on by default.

What is the difference between IQueryable and IEnumerable in EF Core?

IQueryable builds an expression tree that EF Core translates into SQL and runs in the database, so filtering and paging happen server-side. IEnumerable runs LINQ in memory on objects that have already been retrieved. Calling ToList, AsEnumerable, or iterating early stops query composition and pulls all rows into memory, after which any further LINQ runs client-side. Keeping a query as IQueryable until the last moment ensures filters and projections are pushed down to SQL.

When should you use AsNoTracking in EF Core?

Use AsNoTracking for read-only queries where you will not modify and save the returned entities, because it skips creating change-tracking snapshots and saves memory and CPU. The catch is that AsNoTracking does not perform identity resolution by default, so the same database row appearing twice in a result produces two separate object instances. Use AsNoTrackingWithIdentityResolution when you need shared references, and avoid AsNoTracking on entities you intend to update.

What is the difference between code-first and database-first in EF Core 10?

Code-first means you define entity classes and configuration in code and let migrations generate and evolve the database schema. Database-first in EF Core means reverse engineering an existing database into entities and a DbContext using Scaffold-DbContext. EF Core has no EDMX file or visual Model-First designer, which only existed in legacy Entity Framework 6. Code-first is the common default because the model lives in source control and migrations provide a reviewable, deployable schema history.

How do you apply EF Core migrations in production?

Do not call Database.Migrate at application startup in production, because multiple instances will race to apply the same migration and cause lock contention or partial application. Instead generate an idempotent SQL script with dotnet ef migrations script --idempotent for a DBA to review, or create a migration bundle with dotnet ef migrations bundle, which is a self-contained executable. Apply the schema change as a controlled, reviewable step in your CI/CD pipeline before the new application version goes live.

What is the difference between SaveChanges and ExecuteUpdate in EF Core?

SaveChanges persists changes that EF Core has tracked on loaded entities, comparing current values to original snapshots and updating only changed columns within a transaction. ExecuteUpdateAsync, available since EF Core 7, runs a single UPDATE statement directly in the database without loading entities or using the change tracker. ExecuteUpdate is far more efficient for bulk changes, but because it bypasses the change tracker it does not fire SaveChanges interceptors, domain events, or soft-delete logic.

How does change tracking work in EF Core?

By default EF Core uses snapshot change tracking. When a tracked entity is loaded it stores a snapshot of the original property values, and when SaveChanges is called it compares each entity's current values against that snapshot to generate UPDATE statements that touch only changed columns. This is why tracking has a memory cost and why AsNoTracking skips it. Entities that are not tracked, such as detached objects from an API request, have no snapshot and must be attached with their state set before saving.

---

If a question here exposed a gap, the **FREE.NET Web API Zero to Hero course** has a full Entity Framework Core module that teaches each of these in order - DbContext setup, relationships, querying, tracking, migrations, concurrency, and performance - with runnable code. It’s the fastest way to turn a shaky EF Core answer into a confident one.

This is one spoke of my broader interview prep series. Start at the [.NET interview questions hub](https://codewithmukesh.com/blog/dotnet-interview-questions/) for the cross-topic greatest hits, sharpen the query layer with the [LINQ interview questions](https://codewithmukesh.com/blog/linq-interview-questions/), and read the [.NET Web API interview questions](https://codewithmukesh.com/blog/dotnet-webapi-interview-questions/) for the API layer that sits on top of your data access.

If this helped, bookmark it for your next interview, or share it with someone prepping for theirs.

Happy Coding:)

### Keep digging. 8 more from the archive.

- [
	05
	dotnet May 2026
	#### 10 EF Core Performance Mistakes (and How to Fix Them) in.NET 10
	](https://codewithmukesh.com/blog/ef-core-performance-mistakes/)
- [
	06
	dotnet Mar 2026
	#### Multiple DbContext in EF Core 10 - Scenarios, Setup & Migrations
	](https://codewithmukesh.com/blog/multiple-dbcontext-efcore/)
- [
	07
	dotnet Mar 2026
	#### Global Query Filters in EF Core - Soft Delete, Multi-Tenancy & Named Filters in.NET 10
	](https://codewithmukesh.com/blog/global-query-filters-efcore/)
- [
	08
	dotnet May 2026
	#### Bulk Operations in EF Core 10 - Benchmarking Insert, Update, and Delete Strategies
	](https://codewithmukesh.com/blog/bulk-operations-efcore/)
- [
	09
	dotnet Mar 2026
	#### Seeding Initial Data in EF Core 10 - HasData vs UseSeeding
	](https://codewithmukesh.com/blog/seeding-initial-data-efcore/)
- [
	10
	dotnet Mar 2026
	#### Soft Deletes in EF Core 10 - Interceptors, Named Filters & Cascade Delete
	](https://codewithmukesh.com/blog/soft-deletes-efcore/)
- [
	11
	dotnet Feb 2025
	#### ASP.NET Core 10 Web API CRUD with EF Core - Complete.NET 10 Tutorial
	](https://codewithmukesh.com/blog/aspnet-core-webapi-crud-with-entity-framework-core-full-course/)
- [12
	dotnet May 2026
	](https://codewithmukesh.com/blog/concurrency-control-optimistic-locking-efcore/)