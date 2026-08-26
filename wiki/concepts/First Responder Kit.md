---
type: concept
title: "First Responder Kit"
concept_type: tool-suite
status: seed
related:
  - "[[Brent Ozar Unlimited]]"
  - "[[sp_BlitzIndex]]"
  - "[[sp_BlitzCache]]"
  - "[[sp_BlitzFirst]]"
  - "[[SQL Server Performance Monitoring Tools]]"
  - "[[SQL Server Wait Statistics]]"
  - "[[Parameter Sniffing]]"
tags:
  - concept
  - sql-server
  - first-responder-kit
  - open-source
  - tools
  - brent-ozar
created: 2026-07-02
updated: 2026-07-02
sources:
  - "[[How-to-Use-sp_BlitzIndex]]"
  - "[[how-to-use-sp-blitzcache]]"
  - "[[how-to-use-sp-blitzfirst]]"
  - "[[Identifying-and-Fixing-Parameter-Sniffing-Issues]]"
  - "[[sql-query-optimization-why-is-it-so-hard-to-get-right]]"
  - "[[brent-ozar-mssql-performance-tuning-live]]"
---

# First Responder Kit

## Overview

The First Responder Kit is a free, open-source (MIT-licensed) collection of SQL Server diagnostic stored procedures created by [[Brent Ozar Unlimited]]. Available on GitHub at [BrentOzarULTD/SQL-Server-First-Responder-Kit](https://github.com/BrentOzarULTD/SQL-Server-First-Responder-Kit).

It is the Swiss Army knife of SQL Server performance triage — designed to be run by DBAs during an outage to quickly identify the root cause.

## Core Tools

### sp_BlitzIndex
Index health analysis. Checks every user database for:
- Missing indexes (from `sys.dm_db_missing_index_details`)
- Unused indexes (slowing down writes)
- Borderline duplicate indexes
- Index "psychological diagnoses" (Multiple Personalities, Hoarder, Workaholic, Kleptomaniac)
- Provides ready-to-use `CREATE INDEX` commands with editable placeholders

See: [[sp_BlitzIndex]]

### sp_BlitzCache
Plan cache analysis. Identifies the worst-performing queries with:
- Prioritized "sucker board" of the most resource-intensive queries
- Warning flags (Parameter Sniffing victim, implicit conversions, large scans)
- One-click surgical plan cache removal to free a single bad plan
- Plan saving for forensic analysis

See: [[sp_BlitzCache]]

### sp_BlitzFirst
Wait-statistics-based real-time performance analysis:
- Captures current wait stats from `sys.dm_os_waiting_tasks`
- Groups waits by type and severity
- Identifies system-level bottleneck (IO, CPU, locking, parallelism)
- Optional historical capture to a database for trend analysis

See: [[sp_BlitzFirst]] and [[SQL Server Wait Statistics]]

## Triage Workflow

The three tools form a complementary triage pyramid:

```
sp_BlitzFirst ──→ "The server is waiting on IO"
      ↓
sp_BlitzCache ──→ "These 3 queries cause the IO waits"
      ↓
sp_BlitzIndex ───→ "The Users table is missing a covering index"
```

## Additional Tools in the Kit

The First Responder Kit also includes:
- **sp_Blitz** — general SQL Server health check
- **sp_BlitzWho** — what is running right now (alternative to `sp_whoisactive`)
- **sp_BlitzQueryStore** — Query Store analysis
- **sp_BlitzBackups** — backup health check
- **sp_BlitzLock** — deadlock analysis
- **sp_DatabaseRestore** — automated database restore from backups

## Installation

Download from GitHub and run the install script. The stored procedures can be installed in master (for instance-wide access) or in any user database. No schema changes, no extended stored procedures, no service configuration required.
