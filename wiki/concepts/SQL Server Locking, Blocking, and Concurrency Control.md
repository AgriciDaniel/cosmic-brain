---
type: concept
title: "SQL Server Locking, Blocking, and Concurrency Control"
tags:
  - concept
  - sql-server
  - concurrency
  - locking
  - blocking
  - isolation-levels
created: 2026-07-02
updated: 2026-07-02
status: developing
domain: database
complexity: intermediate
related:
  - "[[SQL Server Query Hints]]"
  - "[[SQL Server Performance Monitoring Tools]]"
  - "[[Query Execution Plan]]"
  - "[[Brent Ozar Unlimited]]"
sources:
  - "[[blocking-and-locking-how-to-find-and-fight-concurrency-problems]]"
aliases:
  - "blocking"
  - "deadlocks"
  - "RCSI"
  - "Read Committed Snapshot Isolation"
  - "Snapshot Isolation"
  - "lock escalation"
---

# SQL Server Locking, Blocking, and Concurrency Control

How SQL Server manages simultaneous access to the same data: locking behavior, the distinction between blocking and deadlocks, lock escalation, and the pessimistic-vs-optimistic isolation-level tradeoff. Filed from [[blocking-and-locking-how-to-find-and-fight-concurrency-problems]].

## Blocking vs. Deadlocks — Two Different Problems

These are frequently conflated but resolved completely differently:

- **Deadlocks**: SQL Server's deadlock monitor runs automatically roughly every 5 seconds, detects circular lock-wait chains, and kills the transaction that is cheapest to roll back. Self-resolving by design — no configuration needed.
- **Blocking**: one session holds a lock another session needs. **There is no default timeout** — a blocked query waits indefinitely unless the application explicitly sets a lock timeout (`SET LOCK_TIMEOUT`) or command timeout. This is the more operationally dangerous of the two precisely because nothing automatically resolves it.

## Lock Escalation

SQL Server escalates row-level and page-level locks to a single **full table lock** once a statement holds roughly **5,000 locked rows**. This is an internal, hard-coded-ish threshold — not officially documented as exactly 5,000 (described as a "ballpark"), and it applies **regardless of total table size or server hardware**. A large batch UPDATE/DELETE that crosses this threshold can suddenly block every other reader/writer on the table, not just the rows it's touching. See [[SQL Server Large Write Operation Contention]] for batching strategies that keep large operations under this threshold.

## Isolation Levels: Pessimistic vs. Optimistic

### Default: Pessimistic Locking (Read Committed)

SQL Server's default isolation level uses locks: **readers block writers, and writers block readers.** This is the source of most blocking incidents in an unmodified SQL Server installation.

### Optimistic Alternatives (tempdb Row-Versioning)

Both use tempdb to store previous row versions instead of taking blocking locks — conceptually the same "public toilet" tempdb-contention risk described for memory-grant spills in [[Query Execution Plan]]:

- **RCSI (Read Committed Snapshot Isolation)** — a **database-level** setting. Once enabled, readers see the last-committed version of a row instead of blocking on an in-flight writer. Recommended as the default for new applications since roughly 2017.
  > [!warning] RCSI has a documented race-condition risk: a two-part "select value, then update based on that value" stored procedure can act on a value that is already stale by the time the update runs, because the SELECT never took a blocking lock in the first place. Review any read-then-write logic before enabling RCSI on a database that has it.
- **Snapshot Isolation** — **per-transaction**, opt-in via `SET TRANSACTION ISOLATION LEVEL SNAPSHOT`. Gives a transaction a consistent point-in-time view for its whole duration.
- Both add tempdb load (storing the row versions) that doesn't exist under the pessimistic default.
- Comparable to Oracle and PostgreSQL, which run MVCC (multi-version concurrency control) **on by default** — SQL Server requires explicit opt-in to get equivalent behavior.

> [!contradiction] The default pessimistic model ("readers block writers, writers block readers") described in this source is the correct SQL Server default, but it stands in contrast to [[Database Indexing]]'s and [[SQL Query Optimization]]'s generally PostgreSQL/MySQL-flavored framing, where MVCC-style non-blocking reads are the norm by default. When applying general cross-engine query-tuning advice from those pages to a SQL Server system, do not assume PostgreSQL's default non-blocking read behavior — verify RCSI/Snapshot Isolation status first.

## NOLOCK

The `NOLOCK` hint (or `READ UNCOMMITTED` isolation level) allows dirty reads by ignoring locks entirely. Described in the source as acceptable for "cat pictures" — low-stakes, tolerant-of-inconsistency data — and never appropriate for financial or healthcare data, where a dirty read could return a value that's about to be rolled back. See [[SQL Server Query Hints]] for the broader query-hints treatment of `NOLOCK` and its risks.

## Diagnostics

`sp_WhoIsActive` (Adam Machanic) with the `@get_locks=1` parameter surfaces live lock XML for currently-blocked sessions — the primary tool for triaging an active blocking incident in real time. See [[SQL Server Performance Monitoring Tools]] for the fuller diagnostic toolkit this fits into.

## Related

- [[SQL Server Query Hints]] — NOLOCK as a query hint
- [[SQL Server Performance Monitoring Tools]] — sp_whoisactive and other live diagnostics
- [[SQL Server Large Write Operation Contention]] — batching to stay under the lock-escalation threshold
- [[Query Execution Plan]] — tempdb spill parallel (memory grants)
- [[Brent Ozar Unlimited]] — source organization
- [[blocking-and-locking-how-to-find-and-fight-concurrency-problems]] — primary source
