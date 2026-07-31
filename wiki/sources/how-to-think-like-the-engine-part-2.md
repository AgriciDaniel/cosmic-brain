---
type: source
title: "How to Think Like the Engine, Part 2"
source_url: "https://www.youtube.com/watch?v=HowToThinkLikeTheEngine-Part2"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2021-10-12
ingested: 2026-07-02
tags:
  - source
  - sql-server
  - execution-plans
  - key-lookups
  - covering-indexes
status: processed
related:
  - "[[Query Execution Plan]]"
  - "[[Database Indexing]]"
  - "[[Brent Ozar Unlimited]]"
---

# How to Think Like the Engine, Part 2

Second of the 4-part 2021-10-12 live-session series. Builds on Part 1's storage model to cover key lookups, covering indexes, and the tipping point.

## Key Points

- **Key Lookup**: when a non-clustered index doesn't contain all columns a query needs, SQL Server performs a lookup back into the clustered index — critically, this executes **once per matching row**, not once total. A commonly misunderstood cost driver corrected repeatedly in this series.
- **Covering index**: a non-clustered index containing every column a query needs, eliminating key lookups entirely.
- **Tipping point**: the cost-based threshold at which SQL Server abandons an index-seek-plus-key-lookup plan in favor of a full table/clustered-index scan. Driven by the *estimated* row count from statistics, not the actual data. Demonstrated as surprisingly low — sometimes under 0.3% of a table's rows.
- **INCLUDE vs. KEY columns** in composite indexes are near-equivalent for most practical purposes (same underlying 8KB-page storage); the main difference is the sort-order impact on non-leading columns. Column order matters enormously for the first 1-2 columns (must be selective / actually searched on), much less for later columns.
- **"5 indexes / 5 columns per index"** offered as a rule-of-thumb starting point — explicitly *not* gospel. Stack Overflow itself runs 30-40 indexes on some tables given sufficient hardware.

## Concept Pages Filed From This Source

- [[Query Execution Plan]] — key lookup + tipping point sections.
- [[Database Indexing]] — covering index, INCLUDE vs KEY, 5-indexes rule-of-thumb.

## Related

- [[Brent Ozar Unlimited]]
- [[how-to-think-like-the-engine-part-1|How to Think Like the Engine, Part 1]]
- [[how-to-think-like-the-engine-part-3|How to Think Like the Engine, Part 3]]
