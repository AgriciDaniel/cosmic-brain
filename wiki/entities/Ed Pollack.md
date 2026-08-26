---
type: entity
entity_type: person
title: "Ed Pollack"
created: 2026-07-02
updated: 2026-07-02
address: c-000291
tags:
  - entity
  - person
  - sql-server
  - author
status: developing
related:
  - "[[sqlshack-query-optimization-tips-and-tricks]]"
  - "[[SQL OR Predicate Anti-Pattern]]"
  - "[[SQL Server Wildcard Search Optimization]]"
  - "[[Query Optimizer Join Order Complexity]]"
  - "[[SQL Server Query Hints]]"
  - "[[SQL Server Large Write Operation Contention]]"
aliases:
  - "Ed Pollack (SQLShack)"
---

# Ed Pollack

SQL Server author and DBA who publishes performance-tuning content on [sqlshack.com](https://www.sqlshack.com/). Author of the multi-part "Query optimization techniques in SQL Server" series (the basics / tips and tricks / database design and architecture / parameter sniffing).

## Known Work

- **Query optimization techniques in SQL Server: tips and tricks** (2018-06-19) — six practical anti-patterns and fixes: `OR` predicates spanning columns/tables, leading-wildcard string search, large write operations and lock contention, missing-index recommendations, query optimizer complexity with high table counts, and the risks of query hints. See [[sqlshack-query-optimization-tips-and-tricks]].
- Related articles in the same series (not yet ingested into this vault, referenced in the table of contents): "the basics", "Database Design and Architecture", "Parameter Sniffing".
- Later SQLShack bylines (not ingested): "SQL Server Database Metrics" (2019-10-02), "Using SQL Server Database Metrics to Predict Application Problems" (2019-09-27), "SQL Injection: Detection and prevention" (2019-08-30).

## Notes

Writing style favors demonstrable before/after execution-plan comparisons (reads, execution time) over abstract advice — every claim in the "tips and tricks" article is backed by a measured example against the AdventureWorks sample database (`Production.Product`, `Sales.SalesOrderDetail`, `Person.Person`, `HumanResources.Employee`).

## Open Questions

- Full name/credentials beyond the SQLShack byline not established from this source.
