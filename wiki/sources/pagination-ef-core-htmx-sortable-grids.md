---
address: c-314
type: source
title: "Pagination in EF Core, Continued: Sortable Grids, htmx, and the Indexing Cost"
source: "https://woodruff.dev/pagination-in-ef-core-continued-sortable-grids-htmx-and-the-indexing-cost/?ref=dailydev"
author:
  - "[[Chris Woodruff]]"
published: 2026-06-02
ingested: 2026-07-03
source_type: article
related:
  - "[[Entity Framework Core]]"
  - "[[EF Core Querying and LINQ Translation]]"
  - "[[Database Indexing]]"
  - "[[EF Core Pagination Strategies]]"
tags:
  - ef-core
  - pagination
  - keyset-pagination
  - htmx
  - indexing
  - sql-server
---

# Pagination in EF Core, Continued: Sortable Grids, htmx, and the Indexing Cost

**Author:** [[Chris Woodruff]] (woodruff.dev, 2026-06-02)
**Series:** Follow-up to earlier keyset pagination post, responding to community feedback.

## The Revised Thesis

> **Use keyset when the table is large AND write-heavy AND user-facing.** Three ANDs, not ORs. If any of those is no, offset is probably fine.

The earlier post made a clean case for keyset pagination over `Skip`/`Take` but assumed a fixed sort (`ORDER BY Id`). Real apps have grids with 8+ clickable column headers and a sort-direction toggle. This follow-up engages honestly with the trade-offs.

## What Still Holds

- **Performance**: `OFFSET 10000` semantically requires producing and discarding 10,000 rows in sort order. Rows read grow with offset. True on SQL Server, PostgreSQL, and MySQL alike — a property of what OFFSET *means*.
- **Correctness under concurrent writes**: offset skips or duplicates records silently as rows are inserted/deleted between page requests.

## Keyset with a Fixed Non-ID Sort

The bridge case before dynamic sorts — e.g., orders sorted by `CreatedAt DESC`. The cursor needs two fields: the sort value + the PK as a uniqueness tiebreaker:

```csharp
public record OrderCursor(DateTime CreatedAt, int Id);

query = query.Where(o =>
    o.CreatedAt < cursor.CreatedAt ||
    (o.CreatedAt == cursor.CreatedAt && o.Id < cursor.Id));
```

## Keyset with Dynamic Sort Columns

The hard case: user picks any of N columns with ascending/descending toggle. Requires:

1. **A generic cursor type** carrying column name, direction, and value
2. **Dynamic LINQ expression building** (Expression trees or a library)
3. **An index per sortable column** — this is the real cost

### The Indexing Reality

Every sortable column that uses keyset pagination **needs a supporting index that leads with that column**. For a grid with 8 sortable columns and 2 directions each: 8 indexes minimum, 16 if descending order matters. Each index has storage cost, write penalty, and maintenance overhead. This is not a code-complexity problem — it's a **database design cost**.

### Decision Framework

| Factor | Favor Keyset | Favor Offset |
|--------|-------------|-------------|
| Table size | >100K rows | <10K rows |
| Write frequency | High (concurrent inserts/deletes) | Low (batch-loaded, read-heavy) |
| User-facing | Yes (pagination correctness matters) | No (admin/reporting tool) |
| Sortable columns | 1–2 fixed | 8+ dynamic |
| Index budget | Can add sort-column indexes | Index budget is tight |

## htmx Integration

Keyset pagination pairs naturally with htmx for server-rendered grids: the cursor is encoded in the "next page" link as query parameters, the server returns the next slice of HTML rows, and htmx swaps them in. No client-side state management, no JavaScript cursor logic.

## When Offset Is Fine

Offset pagination is not "broken" — it's the right tool when:
- Row count is small (<10K)
- The table is read-heavy with infrequent writes
- Users expect "Page 3 of 47" (offset's UX advantage: random page access)
- The grid has many sortable columns and you won't index them all

**The honest answer**: most internal admin grids with under 10K rows per table are fine with offset. The performance gap only becomes user-visible at scale.
