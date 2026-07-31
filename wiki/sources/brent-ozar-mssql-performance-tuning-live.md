---
type: source
title: "Microsoft SQL Server Performance Tuning, Live"
source_url: "https://www.youtube.com/watch?v=uDFX1YHfRqo"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2019-01-05
created: 2026-07-02
tags:
  - source
  - sql-server
  - performance-tuning
  - conference-talk
status: current
related:
  - "[[Brent Ozar Unlimited]]"
  - "[[Query Execution Plan]]"
  - "[[SQL Server Locking, Blocking, and Concurrency Control]]"
  - "[[Brent Ozar First Responder Kit]]"
  - "[[SQL Server Statistics and Cardinality Estimation]]"
raw_path: ".raw/notes/2026-07-02/Microsoft SQL Server Performance Tuning, Live.md"
---

# Microsoft SQL Server Performance Tuning, Live

Source: [YouTube](https://www.youtube.com/watch?v=uDFX1YHfRqo) | Author/Speaker: [[Brent Ozar Unlimited]] (Brent Ozar) | Recorded: Microsoft Ignite 2015, Chicago | Published: 2019-01-05

## Summary

A live-demo conference session against the public Stack Overflow database (SQL Server 2014) that establishes two headline "speedometer" metrics for SQL Server health — **batch requests/sec** and **wait time/sec** — then walks through a sequence of feature toggles (trace flag 4199, compatibility level, non-clustered/clustered columnstore indexes, delayed durability, RCSI) and shows their measured before/after impact using SQLQueryStress load generation and `sp_AskBrent`/`sp_WhoIsActive` diagnostics.

## Key Points

1. **The two SQL Server "speedometer" metrics**: **Batch requests/sec** (not Transactions/sec — not every query is a transaction) tells you how fast the server is going; **wait time/sec** (seconds of wait accumulated per core, per second of wall-clock) tells you how hard it's working/struggling. Memorize both before asking "how do I make this faster?"
2. **Trace flag 4199** unlocks a bundle of post-2005 query-optimizer/execution-plan improvements that are off by default because "sometimes they're better, sometimes they're the opposite of better." Demoed live: turning it on took a clustered-index-scanning query from ~2,400 to ~9,000 batch requests/sec by finally letting the optimizer use an existing index. Known regression risk cited: cannot bulk-load with trace flag 4199 + CU6 on SQL Server 2014.
3. **Compatibility level 2014+ is the supported successor to trace flag 4199** — it delivers the new cardinality estimator and execution-plan improvements without an unsupported/untested trace flag. Recommendation: don't touch compat level immediately after an upgrade; wait ~2 weeks until user complaints settle, then flip it on a weekend so regressions are attributable and reversible. SQL Server 2016's (then-upcoming) **Query Store** was previewed as the tool that would let you track and roll back specific per-query **plan regressions** without touching compat level globally.
4. **Non-clustered and clustered columnstore indexes**: demoed on a 32GB wide reporting table (`report_users_tags`) — building a non-clustered columnstore index compressed it to <1GB (up to 90% compression is "not unusual") and dropped two ~30-second analytical queries to ~1-2 seconds by letting the engine touch only the needed columns instead of scanning all 8KB data pages. 2012: columnstore makes the table **read-only**. 2014: **clustered** columnstore becomes updatable (good for fact tables); non-clustered stays read-only. 2016: non-clustered columnstore also becomes writable, plus regular indexes can sit on top of a clustered columnstore index and it works across Always On secondaries. Best use case: data-warehouse-shaped tables — storage-bound, too big for memory, wide with few selected columns, heavy grouping/aggregation.
5. **Delayed Durability** (`ALTER DATABASE ... SET DELAYED_DURABILITY = FORCED`, SQL Server 2014+): SQL Server reports a transaction committed before it's physically hit the transaction log, trading durability for throughput. Demoed raising a write-heavy `UPDATE post views` workload from ~11,000 to ~12,000 "miles an hour" while eliminating the `WRITELOG` wait entirely. **Explicit gotcha**: even a graceful shutdown or manual failover does not guarantee the delayed-durable transactions made it to the log — there is no safe way to flush and guarantee zero loss on shutdown/failover. Never use for financial/payroll/gambling data; fine for disposable metrics like page-view counters or data-warehouse staging loads you're willing to restart. A gentler middle ground: `DELAYED_DURABILITY = ALLOWED` at the database level, then opt individual transactions in per-stored-procedure (`COMMIT ... WITH (DELAYED_DURABILITY = ON)`), leaving the rest of the database's transactions fully durable.
6. **RCSI (Read Committed Snapshot Isolation)**, enabled via `ALTER DATABASE ... SET READ_COMMITTED_SNAPSHOT ON`: readers stop blocking writers and writers stop blocking readers by copying the pre-lock row version into tempdb with a timestamp, so readers see a consistent snapshot instead of waiting. Demoed on a "noisy workload" that was heavily LCK-blocked via `sp_WhoIsActive`: after enabling RCSI, `SELECT`s no longer showed lock waits at all, though writers still blocked writers (an INSERT still blocked concurrent DELETEs on the same table). Session Q&A distinguishes RCSI from `NOLOCK`: NOLOCK can return a row twice or miss it entirely (dirty reads with no snapshot guarantee); RCSI gives an accurate committed-as-of-query-start view. Enabling RCSI requires an exclusive lock on the database (must clear all other sessions first — `sp_WhoIsActive` used live to find and `KILL` a blocking session). Cost: tempdb load grows because it now stores the version store of changed rows; Brent estimates this causes problems "about 5% of the time" in practice.
7. **Demo toolkit**: SQLQueryStress (free, from "a mechanic" i.e. Adam Machanic) for generating load against arbitrary queries/procs; `sp_AskBrent` (predecessor to `sp_BlitzWho`) for a 5-second point-in-time server snapshot with a prioritized to-do list, `Expert Mode` for extra wait-type detail; `sp_WhoIsActive` for live session/blocking inspection.

## Notable Quotes / Details

- "Batch requests per second is your SQL Server speedometer... wait time per second, for every second on the clock, how many seconds does your SQL Server spend waiting on stuff."
- "Starting with SQL Server 2014, when you switch to the new compatibility level... I get the new cardinality estimator plus other improvements to the way execution plans are built, just by changing that."
- "You're okay losing transactions even when you gracefully shut the server down... SQL Server does not guarantee that your transactions are going to hit the transaction log even if you just fail over a cluster."
- "A lot of other database platforms ship with [snapshot isolation] on by default... we just want to make sure you know what you're doing before you turn this on."

## My Assessment

This is the earliest (2015) and most SQL-Server-version-anchored of the five Brent Ozar sources in this ingest — several features here (Query Store as an upcoming preview, columnstore write limitations, trace flag 4199 as the primary lever) reflect a SQL Server 2014/pre-2016 snapshot and are explicitly framed by Brent as "stuff you can actually use today" rather than forward-looking guidance. Its lasting value is the **methodology**, not the specific version gate: define your speedometer metrics first, then change one lever at a time and re-measure. The Delayed Durability and RCSI sections materially extend [[SQL Server Locking, Blocking, and Concurrency Control]] (built from a later, dedicated Blocking and Locking talk) — that page already covers RCSI in depth; this source adds the Delayed Durability durability/throughput trade-off, which is a distinct but adjacent concurrency/durability lever not previously in the vault.

## Related

- [[Brent Ozar Unlimited]] — speaker/publisher
- [[SQL Server Locking, Blocking, and Concurrency Control]] — RCSI and NOLOCK cross-reference; extended here with Delayed Durability
- [[Brent Ozar First Responder Kit]] — sp_AskBrent/sp_WhoIsActive predecessor tooling referenced in this talk
- [[Query Execution Plan]] — trace flag 4199 / compat level plan-shape changes
- [[SQL Server Statistics and Cardinality Estimation]] — cardinality estimator changes tied to compat level 2014
