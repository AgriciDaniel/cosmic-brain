---
type: source
title: "Identifying and Fixing Parameter Sniffing Issues"
source: "https://www.youtube.com/watch?v=pd7xqLT_-2k"
author:
  - "[[Brent Ozar Unlimited]]"
presenter: "[[Brent Ozar]]"
published: 2019-01-05
event: SQLDay Poland 2017
created: 2026-07-02
tags:
  - source
  - sql-server
  - parameter-sniffing
  - query-performance
status: seed
related:
  - "[[Parameter Sniffing]]"
  - "[[Brent Ozar Unlimited]]"
  - "[[sp_BlitzCache]]"
  - "[[SQL Server Query Tuning Methodology]]"
  - "[[SQL Server Query Hints]]"
---

# Identifying and Fixing Parameter Sniffing Issues

**Source:** Live session at SQLDay Poland 2017 (~50 min) by Brent Ozar

## Summary

Brent teaches the four-layer understanding of [[Parameter Sniffing]]: (1) what it is and how to recognize it, (2) how to react when it strikes (the emergency response), (3) how NOT to test your code (the local-variable pitfall), and (4) options to fix the problem long-term. Uses Stack Overflow `Users` table with reputation skew (3M users with reputation=1, 5K with reputation=2) as a live demo.

## Content

### What Parameter Sniffing Is

- SQL Server builds one plan per stored procedure (or parameterized query) based on the **first set of parameters it receives**.
- The first compile determines the plan cached and reused for all subsequent calls — regardless of parameter value.
- The same stored procedure can be blazing fast for one value and catastrophically slow for another, depending on data distribution.
- The hidden cost: an index seek + key lookup designed for 5,000 rows (reputation=2) can execute **3 million key lookups** when the plan is reused for a query that returns 3 million rows (reputation=1). The number of logical reads can jump from 16K to 10M+.

### Emergency Response

- Do NOT restart SQL Server or rebuild all indexes (common but harmful "career progression" of a DBA).
- Do NOT blindly update statistics (gambling that the next call gets the right parameters).
- Instead: use **sp_BlitzCache** with expert mode to identify the victim query — look for "Victim of Parameter Sniffing" warnings.
- **Surgical strike**: use the `Remove Query from Plan Cache` link in sp_BlitzCache output to free just that one plan. Save the plan first for later analysis.
- After freeing the plan, re-run the query — it will get a fresh plan based on whatever parameter value is passed next.

### How NOT to Test

- **Never test with local variables** (`DECLARE @Rep INT = 1` then use `@Rep` in the query). Local variables force SQL Server to use the **density vector** (average rows per value) rather than the histogram, producing an estimate like 314.7 rows regardless of the actual value.
- This leads developers to "fix" a query that already works for their test values, deploy it, and have it fail in production.
- **The correct way to test**: create a temporary stored procedure (`CREATE PROC #UsersByRep ...`) to get real parameter-sniffing behavior and accurate row estimates.

### Long-Term Fixes

Brent presents several options, each with trade-offs:

1. **OPTION (RECOMPILE)** — at the statement level (not procedure level). Gives a fresh plan tuned to each parameter value. Good for queries that run infrequently (up to ~5/min). **Risks**: CPU overhead from recompilation; in SQL Server 2008/2012, a known bug could return wrong results (cross-user data leak) under concurrent recompiles.
2. **OPTIMIZE FOR UNKNOWN** — uses the density vector (average row count). Good for evenly distributed data, but "optimize for mediocre" — predictable but not necessarily good.
3. **OPTIMIZE FOR (@Rep = 1)** — hard-coded business logic. Forces a plan designed for reputation=1 (clustered index scan ~80K reads) regardless of actual value. Prevents the pathological 10M+ read case. Creates technical debt if data distribution changes.
4. **Branching logic** — `IF @Rep = 1 EXEC ProcForHighVolume ELSE EXEC ProcForLowVolume`. Each sub-procedure gets its own parameter-sniffed plan. Both can contain the same T-SQL but get different plans because they live in different procedure objects.
5. **Covering index** — the hardest but best solution. A covering index on `(Reputation) INCLUDE (all other columns)` eliminates the key-lookup cost entirely, making one plan good for all values.
6. **Local variable assignment anti-pattern**: `SET @LocalVar = @Param` then use `@LocalVar` — DON'T do this. It's the density-vector trick in disguise; future code maintainers will remove it not understanding why it's there.

### Key Insight

The "parameter sniffing" label is an oversimplification. The real problem is **plan reuse across different data distributions**, and the solution is either (a) stop reusing the plan (RECOMPILE), (b) force it to one safe plan (OPTIMIZE FOR), or (c) eliminate the data-distribution sensitivity (covering index).
