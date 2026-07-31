---
type: source
title: "Blocking and Locking: How to Find and Fight Concurrency Problems"
source_url: "https://www.youtube.com/watch?v=Blocking-and-Locking"
author:
  - "[[Brent Ozar Unlimited]]"
published: 2019-01-24
ingested: 2026-07-02
tags:
  - source
  - sql-server
  - concurrency
  - locking
  - blocking
status: processed
related:
  - "[[SQL Server Locking, Blocking, and Concurrency Control]]"
  - "[[Brent Ozar Unlimited]]"
  - "[[SQL Server Query Hints]]"
  - "[[SQL Server Performance Monitoring Tools]]"
---

# Blocking and Locking: How to Find and Fight Concurrency Problems

Brent Ozar talk (2019-01-24) distinguishing two frequently-conflated SQL Server concurrency problems — blocking and deadlocks — and walking through detection tools and mitigation strategies (pessimistic locking, RCSI, Snapshot Isolation).

## Key Points

- **Blocking vs. deadlocks are different problems.** Deadlocks are detected and resolved automatically by SQL Server every ~5 seconds (the cheapest-to-rollback transaction is killed). Blocking has **no default timeout** — a blocked query waits indefinitely unless the app sets a lock/command timeout.
- **Lock escalation**: SQL Server escalates row/page locks to a full table lock at roughly 5,000 locked rows in a single statement, regardless of table size or hardware. Not officially documented as exactly 5,000 — described as a "ballpark" internal threshold.
- **Default isolation is pessimistic**: readers block writers, writers block readers, under Read Committed.
- **Optimistic alternatives** use tempdb row-versioning instead of locks:
  - **RCSI (Read Committed Snapshot Isolation)** — database-level setting; readers see the last-committed version instead of blocking on writers. Recommended default for new applications since roughly 2017. Adds tempdb load; documented race-condition risk demonstrated via a two-part select-then-update stored procedure (a value read under RCSI can be stale by the time a subsequent statement acts on it).
  - **Snapshot Isolation** — per-transaction, opt-in via `SET TRANSACTION ISOLATION LEVEL SNAPSHOT`.
  - Comparable to Oracle/PostgreSQL MVCC (multi-version concurrency control), which is on by default in those engines — SQL Server requires explicit opt-in.
- **`NOLOCK` hint** — allows dirty reads; described as acceptable for "cat pictures," not for financial/healthcare data. See [[SQL Server Query Hints]].
- **Diagnostic tooling**: `sp_WhoIsActive` (Adam Machanic) with `@get_locks=1` to view live lock XML during an active blocking incident. See [[SQL Server Performance Monitoring Tools]].

## Concept Pages Filed From This Source

- [[SQL Server Locking, Blocking, and Concurrency Control]] — new concept page consolidating this talk's locking/isolation-level material.

## Related

- [[Brent Ozar Unlimited]]
- [[SQL Server Query Hints]] — NOLOCK cross-reference
- [[SQL Server Performance Monitoring Tools]] — sp_whoisactive
