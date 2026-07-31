---
type: concept
title: "Parameter Sniffing"
concept_type: sql-server-phenomenon
status: seed
related:
  - "[[sp_BlitzCache]]"
  - "[[SQL Server Query Hints]]"
  - "[[SQL Server Statistics and Cardinality Estimation]]"
  - "[[Query Execution Plan]]"
  - "[[SQL Server Query Tuning Methodology]]"
  - "[[Brent Ozar Unlimited]]"
tags:
  - concept
  - sql-server
  - parameter-sniffing
  - plan-cache
  - performance
created: 2026-07-02
updated: 2026-07-02
sources:
  - "[[Identifying-and-Fixing-Parameter-Sniffing-Issues]]"
  - "[[how-to-use-sp-blitzcache]]"
---

# Parameter Sniffing

## Definition

Parameter sniffing is the SQL Server behavior where the first call to a stored procedure (or parameterized query) determines the execution plan that gets cached and reused for all subsequent calls — regardless of whether the parameter values have different data distributions.

It is not a bug; it is a feature of plan reuse that becomes harmful when data is unevenly distributed.

## The Mechanics

1. When a stored procedure executes for the first time, SQL Server "sniffs" (examines) the parameter values to estimate row counts.
2. It compiles and caches a plan optimized for those specific values.
3. All subsequent executions reuse the cached plan — even for parameter values with radically different data distributions.
4. The plan will be excellent for the sniffed value and potentially catastrophic for other values.

## The Hidden Cost

The danger is not visible in query runtime alone. In Brent Ozar's Stack Overflow demo:

- Query for `reputation = 2` (5,300 rows) uses index seek + key lookup: **16,000 logical reads**.
- Query for `reputation = 1` (3.3M rows) uses clustered index scan: **80,000 logical reads**.
- **Wrong plan**: the plan optimized for reputation=2, when reused for reputation=1, does **10 million+ logical reads** (3M key lookups).
- The runtime appears similar in SSMS (rendering 3M rows takes 23 seconds regardless), but the server "screams in pain" under the hood.

## Emergency Response

1. Run `[[sp_BlitzCache]]` with expert mode.
2. Find the query flagged as "Probably a Victim of Parameter Sniffing."
3. Save the current execution plan for forensic analysis.
4. Use the `Remove Query from Plan Cache` surgical strike to free just that one plan.
5. Re-run the query — it compiles a fresh plan.
6. This is a temporary fix: "I'm not fixing anything, I'm just trying to get the users to put down the guns."

## Testing Pitfall: Local Variables

**Never test parameter sniffing fixes with local variables** (`DECLARE @Rep INT = 1` then use `@Rep` in the query). Local variables force SQL Server to use the **density vector** (average rows per value — ~314.7 rows in the demo) rather than the histogram. You will never reproduce the parameter sniffing behavior:

```sql
-- WRONG: uses density vector, always produces average-row estimates
DECLARE @Rep INT = 1;
SELECT * FROM Users WHERE Reputation = @Rep;
```

```sql
-- CORRECT: use a temporary stored procedure
CREATE PROC #UsersByRep @Rep INT AS
SELECT * FROM Users WHERE Reputation = @Rep;
EXEC #UsersByRep @Rep = 1;
```

## Long-Term Fixes (with trade-offs)

| Approach | How It Works | Best For | Risks |
|----------|-------------|----------|-------|
| **OPTION (RECOMPILE)** (statement-level) | Recompiles per execution with current parameter values | Queries running <5 times/minute | CPU overhead; SQL Server 2008/2012 had a cross-user data leak bug under concurrent recompiles |
| **OPTIMIZE FOR UNKNOWN** | Uses density vector (average row count) — "optimize for mediocre" | Evenly distributed data | Bad when data skew is high |
| **OPTIMIZE FOR (@param = value)** | Forces one specific plan based on a hard-coded parameter value | Scenarios where the worst case is known and bounded | Technical debt if data distribution changes |
| **Branching logic** | `IF @param = outlier EXEC ProcA ELSE EXEC ProcB` | Extreme data skew (one outlier value) | Duplicate stored procedures; embedded business logic |
| **Covering index** | Build a covering index so all queries get the same plan regardless of parameter value | When table structure can be changed | Expensive (disk, write overhead); not feasible for every query |
| **Local variable assignment** | `SET @Local = @Param` then use `@Local` — **DO NOT USE** | Nothing | Anti-pattern: tricks density vector; future maintainers will remove it |

## Key Insight

The term "parameter sniffing" is an oversimplification. The real problem is **plan reuse across different data distributions**. The solution is either:
- (a) Stop reusing the plan (RECOMPILE),
- (b) Force one safe plan (OPTIMIZE FOR), or
- (c) Eliminate the data-distribution sensitivity (covering index).
