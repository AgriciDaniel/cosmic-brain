---
address: c-315
type: source
title: "Query Tags: Debugging EF Core Like a Detective"
author: "[[Chris Woodruff]]"
url: "https://woodruff.dev/query-tags-debugging-ef-core-like-a-detective/"
published: 2025-02-03
ingested: 2026-07-03
source_type: blog-post
tags:
  - source
  - ef-core
  - dotnet
  - debugging
  - sql
related:
  - "[[EF Core Query Tags]]"
  - "[[Chris Woodruff]]"
  - "[[Entity Framework Core]]"
summary: |
  Tutorial on EF Core's `.TagWith()` method for annotating generated SQL with developer-defined comments. Covers basic usage, dynamic tag content with string interpolation, three use-case patterns (API diagnostics, background jobs, performance profiling), and pro-tip conventions for team-wide consistency.
---

# Query Tags: Debugging EF Core Like a Detective

**Author:** [[Chris Woodruff]] | **Published:** 2025-02-03 | **Blog:** [woodruff.dev](https://woodruff.dev/query-tags-debugging-ef-core-like-a-detective/)

## Core Content

EF Core's `.TagWith()` method attaches a SQL comment to the generated query, visible in SQL Server Profiler, Extended Events, Query Store, and database logs. The detective analogy: untagged queries are unlabeled clues in a pile; tagged queries tell you exactly which part of the application triggered each one.

### Basic Syntax

```csharp
var blogs = await context.Blogs
    .TagWith("Fetching active blogs for the dashboard")
    .Where(b => b.IsActive)
    .ToListAsync();
```

Produces SQL:

```sql
-- Fetching active blogs for the dashboard
SELECT * FROM Blogs WHERE IsActive = 1;
```

### Dynamic Tags

String interpolation embeds runtime values in the comment:

```csharp
.TagWith($"Query by UserId: {userId}")
```

Produces `-- Query by UserId: 42`.

### Three Use Cases

1. **API diagnostics** — tag with endpoint name: `.TagWith("API: /blogs/active")`
2. **Background jobs** — distinguish job queries from user-triggered ones: `.TagWith("Background Job: Daily Cleanup")`
3. **Performance profiling** — mark queries during load testing: `.TagWith("Performance Test: High-traffic scenario")`

### Pro Tips

- Keep tags meaningful and specific; avoid generic labels like "Fetching data."
- Pair with `.AsNoTracking()` or `.AsSplitQuery()` to diagnose specific performance scenarios.
- Don't overuse: not every query needs a tag; focus on critical or hard-to-trace queries.
- Standardize conventions: `"API: [Endpoint]"`, `"Job: [Job Name]"`, `"Feature: [Feature Name]"`.

### When NOT to Use

- Simple, easily traceable queries.
- Every query indiscriminately — this clutters SQL logs.

## Key Takeaway

Query Tags are a lightweight, zero-cost diagnostic tool built into EF Core. A single `.TagWith()` call on a LINQ chain adds a structured comment to the generated SQL, turning opaque database traces into self-documenting application logs.
