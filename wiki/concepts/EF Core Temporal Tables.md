---
address: c-327
type: concept
title: "EF Core Temporal Tables"
tags:
  - concept
  - dotnet
  - ef-core
  - sql-server
  - temporal-tables
  - system-versioned
  - auditing
status: developing
related:
  - "[[temporal-tables-ef-core-woodruff]]"
  - "[[Entity Framework Core]]"
  - "[[Chris Woodruff]]"
source: "[[temporal-tables-ef-core-woodruff]]"
created: 2026-07-03
---

# EF Core Temporal Tables

Navigation: [[index]] | [[concepts/_index|Concepts]]

## What They Are

**SQL Server Temporal Tables** (also called **system-versioned tables**) automatically track all data changes by maintaining a parallel history table. When a row is inserted, updated, or deleted, SQL Server keeps the current state in the main table and moves the previous version into the history table. This enables point-in-time queries, audit trails, and data recovery without application-level logging.

EF Core provides first-class support via `.IsTemporal()` in the fluent API, introduced in EF Core 6.

## How It Works

SQL Server adds two hidden `datetime2` columns to the table:

- **`SysStartTime`** — `GENERATED ALWAYS AS ROW START HIDDEN NOT NULL`
- **`SysEndTime`** — `GENERATED ALWAYS AS ROW END HIDDEN NOT NULL`

These form a `PERIOD FOR SYSTEM_TIME (SysStartTime, SysEndTime)` and are managed entirely by SQL Server. A companion history table (e.g., `EmployeesHistory`) stores every previous version. `SYSTEM_VERSIONING = ON` enables automatic capture.

## EF Core Configuration

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Employee>()
        .ToTable("Employees", tb => tb.IsTemporal());
}
```

That single fluent API call is all that is needed. EF Core generates the correct SQL migration with period columns and history table.

## Temporal Query Operators

EF Core exposes four LINQ extension methods for temporal queries:

| Operator | SQL Equivalent | What It Returns |
|---|---|---|
| `.TemporalAll()` | `FOR SYSTEM_TIME ALL` | Current row + every historical version |
| `.TemporalAsOf(DateTime)` | `FOR SYSTEM_TIME AS OF` | Rows that were current at exactly that UTC time |
| `.TemporalBetween(start, end)` | `FOR SYSTEM_TIME BETWEEN ... AND ...` | All row versions active at any point in the range (inclusive) |
| `.TemporalFromTo(start, end)` | `FOR SYSTEM_TIME FROM ... TO ...` | All row versions active in the range (exclusive end) |

Example: what was the Employee table state last week?

```csharp
var lastWeekData = await context.Employees
    .TemporalAsOf(DateTime.UtcNow.AddDays(-7))
    .ToListAsync();
```

## Use Cases

- **Auditing and compliance** — prove who changed what and when, without application-level audit tables.
- **Data recovery** — retrieve accidentally deleted or overwritten rows from history.
- **Debugging** — inspect the exact state of data at the time a bug was reported.
- **Trend analysis** — track how values (e.g., salary, inventory, pricing) changed over time.

## Limitations and Caveats

- **SQL Server only** — not available in PostgreSQL, MySQL, or SQLite. This is a SQL Server engine feature (introduced in SQL Server 2016).
- **Storage growth** — every change produces a history row. Large or frequently-updated tables can grow quickly. Plan for history table cleanup policies.
- **Read-only history** — history tables are immutable. You cannot directly modify or delete history rows. Schema changes to the main table must temporarily disable system versioning.
- **No application-level control** — you cannot selectively opt certain columns or certain update patterns out of versioning. Every `UPDATE`/`DELETE` produces a history row.

## Related Pages

- [[Entity Framework Core]] — parent ORM entity
- [[temporal-tables-ef-core-woodruff]] — source article by Chris Woodruff
- [[Chris Woodruff]] — author entity
