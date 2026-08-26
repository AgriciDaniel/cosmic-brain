---
type: source
title: "Database Indexing & Những Điều Developer Cần Biết"
created: 2026-05-26
updated: 2026-05-26
tags:
  - database
  - source
  - ebook
status: developing
related:
  - "[[Database Indexing]]"
  - "[[Database Index Advanced Techniques]]"
  - "[[Database Schema and Performance]]"
  - "[[Nguyễn Thế Huy]]"
sources:
  - "[[.raw/database/Database Indexing & Những Điều Developer Cần Biết]]"
source_type: ebook
author: "Nguyễn Thế Huy"
date_published: unknown
confidence: high
key_claims:
  - "Database indexes are sorted lists with hierarchical summaries (B+Tree), not flat lookup tables"
  - "The four golden rules of indexing are: Fast Lookup, One-Direction Scan, Left-to-Right Funnel, Range Breaks Funnel"
  - "Heap Table (PostgreSQL) and Clustered Index (MySQL/InnoDB) are fundamentally different storage models with different indexing implications"
  - "Database may ignore your index for valid reasons: cost model favors sequential scan, stale statistics, or type mismatches"
  - "Indexing is not just for WHERE clauses — ORDER BY, GROUP BY, and JOIN all benefit from properly designed indexes"
address: c-000156
---

# Database Indexing & Những Điều Developer Cần Biết

Ebook by Nguyễn Thế Huy, a developer with 10+ years of experience (ViettelPost, Giaohangtietkiem, CBTW). Written in Vietnamese, aimed at developers who need practical database indexing knowledge without the academic depth of DBA-level material.

## Target Audience

Developers who can write SQL but encounter performance issues when data grows from hundreds to millions of rows. The book fills the gap between superficial "add an index on WHERE columns" advice and academic B-Tree internals documentation.

## What You'll Learn

- How indexes actually work (B+Tree as sorted list + hierarchical jump table, not deep algorithm internals)
- Four golden rules for creating effective indexes for any query
- Why databases sometimes ignore your indexes and how to fix it
- Advanced techniques: expression indexes, partial indexes, spatial indexes, trigram indexes, JSON indexing
- Schema design: UUID vs auto-increment, constraints, partitioning, denormalization
- Practical tips: keyset pagination, CTEs, FOR UPDATE, RETURNING, distributed counters

## Structure

The ebook is organized into 8 major sections:

1. **Foundation**: B+Tree metaphor, Primary Key ordering, Heap Table vs Clustered Index
2. **Four Golden Rules**: Fast Lookup, One-Direction Scan, Left-to-Right Funnel, Range Breaks Funnel
3. **SQL Operations**: WHERE, ORDER BY, GROUP BY, JOIN, LIKE, NULL, inequality operators
4. **Why Database Ignores Your Index**: Cost model, statistics, type mismatches, execution plans (EXPLAIN)
5. **Advanced Techniques**: Expression indexes, partial indexes, spatial indexes, JSON indexing, index-only queries, trigram/hash/prefix indexes
6. **Data Manipulation**: Distributed counters, JOIN in UPDATE, RETURNING, dedup with CTE
7. **Query Best Practices**: Keyset pagination, FOR UPDATE, CTEs, gap-filling, multiple aggregates
8. **Schema Design**: UUID vs auto-increment, JSON columns, constraints, exclusion constraints, partitioning, pre-sorted tables, pre-aggregation

## Key Insight

The book emphasizes that indexing is a systematic discipline, not a trial-and-error activity. Understanding the four golden rules and the cost model behind the query optimizer allows you to design the right index the first time, rather than guessing and checking with EXPLAIN.
