---
address: c-317
type: source
title: "Temporal Tables in EF Core: Bringing Time Travel to Your Data"
author:
  - "[[Chris Woodruff]]"
published: 2025-02-15
source_url: "https://woodruff.dev/temporal-tables-in-ef-core-bringing-time-travel-to-your-data/"
created: 2026-07-03
tags:
  - source
  - dotnet
  - ef-core
  - sql-server
  - temporal-tables
related:
  - "[[EF Core Temporal Tables]]"
  - "[[Chris Woodruff]]"
  - "[[Entity Framework Core]]"
---

# Temporal Tables in EF Core: Bringing Time Travel to Your Data

Author: [[Chris Woodruff]] | Published: 2025-02-15 | Source: [woodruff.dev](https://woodruff.dev/temporal-tables-in-ef-core-bringing-time-travel-to-your-data/)

## Summary

Chris Woodruff's tutorial on **SQL Server Temporal Tables** (system-versioned tables) and their first-class support in **Entity Framework Core**. Covers what temporal tables are, how to configure them in EF Core via `.IsTemporal()`, the auto-generated SQL schema (SysStartTime/SysEndTime period columns + history table), and four LINQ temporal query operators for time-travel queries.

## Key Takeaways

1. **Temporal tables are SQL Server only** — not available in PostgreSQL, MySQL, or SQLite. They automatically maintain a history table with every row version.
2. **EF Core configuration is one fluent API call**: `modelBuilder.Entity<T>().ToTable("TableName", tb => tb.IsTemporal())`. No manual SQL or trigger needed.
3. **Four temporal query operators in EF Core 6+**:
   - `.TemporalAll()` — current + all historical versions of matching rows
   - `.TemporalAsOf(DateTime)` — database state as of a specific point in time
   - `.TemporalBetween(DateTime, DateTime)` — all row versions that were active within a time range
   - `.TemporalFromTo(DateTime, DateTime)` — rows active between two points (exclusive end)
4. **SQL Server adds two hidden `datetime2` columns** (`SysStartTime`, `SysEndTime`) plus a `PERIOD FOR SYSTEM_TIME` declaration and a history table with `SYSTEM_VERSIONING = ON`.
5. **Use cases**: auditing and compliance, data recovery (undo accidental deletes/updates), debugging unexpected changes, trend analysis over time.
6. **Caveats**: history tables can grow large (every change is stored), history is read-only (cannot modify or delete directly), SQL Server only.

## Content Structure

- Step 1: Define entity model + configure `.IsTemporal()` in `OnModelCreating`
- Step 2: Run migrations — `dotnet ef migrations add` + `dotnet ef database update` — shows the auto-generated SQL
- Step 3: Query past data — `.TemporalAll()`, `.TemporalAsOf()`, `.TemporalBetween()`
- When to use: auditing, data recovery, debugging, trend analysis
- Things to keep in mind: storage impact, read-only history, SQL Server only

## Ingested As

Concept page: [[EF Core Temporal Tables]]
