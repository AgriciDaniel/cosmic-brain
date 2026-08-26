---
address: c-324
type: concept
title: "EF Core Pagination Strategies"
domain: .NET / EF Core
status: evergreen
related:
  - "[[Entity Framework Core]]"
  - "[[EF Core Querying and LINQ Translation]]"
  - "[[Database Indexing]]"
  - "[[FluentUI Blazor Paginator]]"
tags:
  - ef-core
  - pagination
  - keyset-pagination
  - offset-pagination
  - indexing
---

# EF Core Pagination Strategies

**Choosing between keyset (cursor-based) and offset pagination based on table size, write frequency, and sort complexity.**

## Two Strategies

### Offset Pagination (`Skip`/`Take`)

```csharp
var page = await context.Orders
    .OrderBy(o => o.CreatedAt)
    .Skip(pageNumber * pageSize)
    .Take(pageSize)
    .ToListAsync();
```

**How it works**: SQL Server produces and discards `offset` rows in sort order, then returns `fetch next` rows. Rows read grow with offset — page 100 reads and discards ~10,000 rows.

**Advantages**: random page access ("go to page 7"), simple implementation, no index requirements beyond the sort column.

**Disadvantages**: performance degrades with depth, silent correctness bugs under concurrent writes (duplicate or missing records).

### Keyset Pagination (Cursor-Based)

```csharp
var page = await context.Orders
    .Where(o => o.CreatedAt < cursor.CreatedAt ||
        (o.CreatedAt == cursor.CreatedAt && o.Id < cursor.Id))
    .OrderByDescending(o => o.CreatedAt)
    .ThenByDescending(o => o.Id)
    .Take(pageSize)
    .ToListAsync();
```

**How it works**: uses a WHERE clause encoding the last-seen position. SQL Server seeks directly to the continuation point via an index — no row discarding.

**Advantages**: constant-time regardless of depth, immune to concurrent-write anomalies (no duplicate/skipped rows).

**Disadvantages**: no random-page access, requires a supporting index per sort direction, dynamic sort columns need dynamic expression building.

## The Indexing Cost

Every sortable column used with keyset needs a supporting index that **leads with that column**. A grid with 8 sortable columns needs 8+ indexes. Each index has:
- **Storage cost**: ~size of indexed columns × row count (GBs at scale)
- **Write penalty**: every INSERT/UPDATE/DELETE updates every index
- **Maintenance overhead**: rebuilds, stats updates, plan cache churn

This is the real constraint — not code complexity, but database design budget.

## Decision Matrix

| Condition | Recommendation |
|-----------|---------------|
| Large table (>100K), write-heavy, user-facing, ≤2 sort columns | **Keyset** |
| Large table, write-heavy, 8+ dynamic sorts | Keyset on default sort only; offset for others |
| Small table (<10K), read-heavy, internal tool | **Offset** |
| User expects "Page 3 of 47" UX | Offset (keyset can't jump to page N) |
| Infinite scroll / "load more" UX | **Keyset** (natural fit) |
| API endpoint consumed by other services | **Keyset** (stable cursors, no drift) |

## Dynamic Sort Implementation

For dynamic column sorting with keyset, the approach is:

1. Define a cursor type carrying column name, direction, and last-seen values
2. Build `Expression<Func<T, bool>>` dynamically for the WHERE clause
3. Ensure an index exists for each sortable column (or accept table scans for infrequent columns)
4. Encode the cursor in the response (Base64 JSON or query params for htmx)

## htmx Integration Pattern

Keyset pairs naturally with htmx: encode cursor in "next page" link parameters, server returns next HTML fragment, htmx swaps the grid body. No JavaScript pagination logic needed.

## Key Insight

The honest answer: most internal admin grids with <10K rows are fine with offset. Keyset earns its complexity budget only when **all three** conditions hold — large, write-heavy, and user-facing.
