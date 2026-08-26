---
address: c-307
type: source
title: "FromSql: Writing SQL Like a Boss in EF Core"
source: "https://woodruff.dev/fromsql-writing-sql-like-a-boss-in-ef-core/"
author:
  - "[[Chris Woodruff]]"
published: 2025-01-27
ingested: 2026-07-03
tags:
  - source
  - dotnet
  - ef-core
  - sql
  - fromsql
related:
  - "[[EF Core FromSql and Raw SQL Queries]]"
  - "[[EF Core Querying and LINQ Translation]]"
  - "[[Entity Framework Core]]"
  - "[[Chris Woodruff]]"
---

# FromSql: Writing SQL Like a Boss in EF Core

**Author:** [[Chris Woodruff]] | **Published:** 2025-01-27 | **Source:** [woodruff.dev](https://woodruff.dev/fromsql-writing-sql-like-a-boss-in-ef-core/)

## Summary

A practical guide to EF Core's `FromSql` feature: running raw SQL queries directly within a `DbContext` while keeping the ORM's benefits. Covers basic queries, parameterized queries (using string interpolation for automatic parameterization against SQL injection), stored procedure calls via `EXEC`, complex joins, and three key gotchas (tracking behavior, mapped-entity requirement, SQL injection risk). Includes optimization tips: select only needed columns, align indexes with query fields, and batch/join in SQL instead of row-by-row.

## Key Content

### FromSql as the LINQ Escape Hatch

When EF Core's LINQ-to-SQL translation cannot generate the required query efficiently, or when dealing with legacy databases where specific SQL is unavoidable, `FromSql` lets you drop in handcrafted SQL while still mapping results to tracked entity types.

### Parameterized Queries

String interpolation with `$` syntax automatically parameterizes values (EF Core wraps them as `SqlParameter`), preventing SQL injection without manual `SqlParameter` objects.

### Stored Procedures

`FromSql($"EXEC dbo.GetArtistDetails {artistId}").FirstOrDefault()` — call existing stored procedures and map results directly to entity types.

### Gotchas

1. **Tracking Behavior** — results are tracked by default; use `.AsNoTracking()` for read-only queries.
2. **Mapped Entities Only** — `FromSql` returns only entity types already mapped in your `DbContext`; custom projections must be mapped or handled via raw ADO.NET.
3. **SQL Injection** — always use interpolated `$` strings (which parameterize) rather than raw string concatenation.

## Pages Created

- [[EF Core FromSql and Raw SQL Queries]] (concept)
