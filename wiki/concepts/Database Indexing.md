---
type: concept
title: "Database Indexing"
created: 2026-05-26
updated: 2026-07-02
tags:
  - database
  - concept
  - indexing
  - sql
status: developing
related:
  - "[[Database Index Advanced Techniques]]"
  - "[[Database Schema and Performance]]"
  - "[[SQL Query Optimization]]"
  - "[[SQL Server Wildcard Search Optimization]]"
  - "[[SQL OR Predicate Anti-Pattern]]"
  - "[[Query Optimizer Join Order Complexity]]"
  - "[[SQL Server Large Write Operation Contention]]"
  - "[[Query Execution Plan]]"
  - "[[Brent Ozar Unlimited]]"
sources:
  - "[[database-indexing-developer-guide]]"
  - "[[sql-query-optimization-18-techniques]]"
  - "[[sqlshack-query-optimization-tips-and-tricks]]"
  - "[[how-to-think-like-the-engine-part-1]]"
  - "[[how-to-think-like-the-engine-part-2]]"
complexity: intermediate
domain: database
aliases:
  - "indexing"
  - "database index"
  - "SQL index"
  - "B+Tree index"
address: c-000158
---

# Database Indexing

Indexes are the single most impactful performance tool in relational databases. This page covers the fundamentals: how indexes work, the two storage models, the four golden rules, and how indexes interact with common SQL operations.

> See also [[SQL Query Optimization]] for the broader taxonomy this page sits under (projection, filtering, JOINs, N+1 avoidance, execution plan review, etc.) — this page owns the indexing-specific depth.

## B+Tree: The Mental Model

Forget the algorithmic details. Think of an index as two things:

1. **A sorted list** of values (the leaf nodes)
2. **A hierarchical jump table** (the internal nodes) that lets you jump to the right section in 3-4 steps

Metaphor: a 2000-page dictionary. To find "performance," you look at the spine (P is around page 1200), then the page header (PER starts at 1245), then scan a few pages. Three steps instead of reading 2000 pages.

Index scale is logarithmic: going from 1,000 to 1,000,000,000 rows adds only ~2 more jump steps. Index size is not a performance concern for lookups.

## Heap Table vs Clustered Index

These are the two fundamental storage models. They affect everything about index design.

### Heap Table (PostgreSQL default)

- Row data is appended to the end of the table file, regardless of primary key order
- **All indexes** (including primary key) store **physical row pointers** (tuple ID / ctid)
- Every index lookup = 2 steps: index to find pointer, then jump to table heap
- No difference in lookup cost between PK and secondary index
- Insert performance is unaffected by PK type (always appends to heap)

### Clustered Index (MySQL/InnoDB default)

- The primary key **is** the table. Row data lives in the PK index leaf nodes, sorted by PK
- PK lookup = 1 step (data is right there)
- Secondary index stores **PK values** as pointers, not physical locations
- Secondary index lookup = 2 steps: find PK in secondary index, then find row in PK index
- Insert performance heavily affected by PK type (random PK = insert into random position in sorted tree)

### Practical Consequences for MySQL

1. **Never use UUIDv4 as PK** — random inserts into sorted tree are 3-10x slower than auto-increment
2. **PK size matters everywhere** — PK value is copied into every secondary index entry. BIGINT (8 bytes) vs ULID string (26 bytes) on 1M rows with 5 indexes = 40 MB vs 130 MB overhead
3. **PK lookups are extremely fast** — ideal for CRUD apps that query by ID

## Primary Key Choice

| Type | Insert Speed | Distributed | Predictable |
|------|-------------|-------------|-------------|
| Auto-increment (INT/BIGINT) | Fastest | No | Yes (enumeration risk) |
| UUIDv4 | Slowest (random position) | Yes | No |
| UUIDv7 / ULID | Fast (time-sorted) | Yes | No |
| Snowflake | Fast | Yes | Partially |

**Recommendation**: Use auto-increment for internal PK. If you need to expose IDs externally (URLs, APIs), add a separate UUID column.

## Index Write Overhead

Every INSERT, UPDATE, or DELETE must update all indexes that include the affected columns:
- INSERT 1 row into a table with 5 indexes = 5 index entries created
- UPDATE a column in 2 indexes = 2 indexes updated
- UPDATE a column in 0 indexes = 0 indexes touched
- DELETE 1 row = all 5 indexes updated

In practice, most apps are read-heavy (90:10 read:write), and 3-7 indexes per table is normal. More than 10 indexes warrants a review.

## The Four Golden Rules

These are the systematic framework for designing indexes. When faced with a slow query, map it against these rules to determine the correct index.

### Rule 1: Fast Lookup — Jump directly to the target

For equality conditions (`=`), the database jumps through internal nodes straight to matching entries. No scanning needed.

```sql
SELECT * FROM movies WHERE release_year = 2019;
-- Index on (release_year) enables direct jump to the 2019 block
```

### Rule 2: One-Direction Scan

After jumping to a position, the database can scan forward or backward along the sorted list. Combined with LIMIT, this is extremely powerful:

```sql
SELECT * FROM users WHERE age >= 35 ORDER BY age ASC LIMIT 3;
-- Jump to 35, read 3 entries forward, STOP
-- From 10M rows scanning to ~3 reads
```

Cannot scan both directions simultaneously. If sorting by `score DESC, created_at ASC`, the index must match those exact directions.

### Rule 3: Left-to-Right Funnel (Multi-Column Index)

A composite index `(country, lastname, firstname)` is sorted by country first, then by lastname within each country, then by firstname within each lastname. The funnel only works left-to-right without skipping columns:

- `WHERE country = 'VN' AND lastname = 'Nguyen' AND firstname = 'Huy'` → Uses all 3 funnel steps
- `WHERE country = 'VN' AND lastname = 'Nguyen'` → Uses 2 steps
- `WHERE country = 'VN'` → Uses 1 step
- `WHERE lastname = 'Nguyen'` → **Cannot use index** (skipped first column)
- `WHERE firstname = 'Huy'` → **Cannot use index**

**Column order rule**: Arrange columns to maximize the number of queries served by a single index, not by selectivity. An index `(country, lastname, firstname)` serves queries filtering on country alone, whereas `(lastname, firstname, country)` does not.

### Rule 4: Range Conditions Break the Funnel

When the index hits a range condition (`>`, `<`, `>=`, `<=`, `BETWEEN`, `LIKE 'prefix%'`), the database switches from funnel mode to scan mode. All columns after the range column can only **filter** (check and skip), not narrow the scan range.

**Wrong**: Index `(country, age, married)` for `WHERE country = 'VN' AND age > 28 AND married = 'yes'`
→ After `age > 28` starts scanning, `married` values are interleaved — must scan all age-matching entries and check each

**Right**: Index `(country, married, age)` for same query
→ Narrow by country and married (equality), then scan age > 28 within that tight block

**Golden rule**: Equality columns first, range columns last. If multiple range conditions, put the most selective one first.

## Indexes and SQL Operations

### Inequality (`!=`)

`!=` cannot use index for fast lookup — results are on both sides of the excluded value. The database must scan all entries.

**Fix**: Add an equality column before it:
```sql
-- Instead of: WHERE status != 'open'
-- Use: WHERE shop_id = 42 AND status != 'open'
-- Index (shop_id, status) — narrow scope first, then scan
```

### NULL

- `IS NULL` works like equality (fast lookup to NULL block)
- `IS NOT NULL` works like inequality (must scan all non-NULL entries)
- `NULL = NULL` returns NULL (not TRUE) — affects UNIQUE constraints
- In MySQL, NULL sorts first; in PostgreSQL, NULL sorts last

### LIKE

- `LIKE 'Nguyễn%'` → converted internally to range: `>= 'Nguyễn' AND < 'Nguyễo'`
- `LIKE '%Nguyễn%'` → **cannot use B-Tree index** (leading wildcard)
- Fix for leading wildcard: Trigram index in PostgreSQL (`pg_trgm`), full-text search, or external search engines

### ORDER BY

Add sort columns to the end of the index (after WHERE columns) to avoid a separate sort step:

```sql
-- Query: WHERE category_id = 5 ORDER BY price ASC LIMIT 20
-- Index: (category_id, price) — filter + sorted output in one pass
```

Without the index, the database must load all matching rows, sort them (potentially spilling to disk), then take the top 20. Disk-based sort can turn a 10ms query into 10 seconds.

### GROUP BY / DISTINCT

Index sorted on GROUP BY columns enables the "loop-and-count" algorithm — scan once, count consecutive same-valued entries. Without it, the database builds a hash table that may spill to disk.

Execution order matters: WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. WHERE columns go before GROUP BY columns in the index.

### JOIN

Database executes joins as nested loops: pick a driving table, then for each row, look up matching rows in the driven table. Each direction needs its own indexes:

```sql
-- employee JOIN department ON department_id
-- WHERE employee.salary > 100000 AND department.country = 'NR'

-- If employee drives: index on employee(salary) + index on department(department_id, country)
-- If department drives: index on department(country) + index on employee(department_id, salary)
-- Create ALL four indexes so the optimizer can choose the best direction
```

### UPDATE / DELETE

These also need to find rows first. Test performance by converting to the equivalent SELECT first. If the SELECT is slow, the UPDATE/DELETE will be too.

## Why Database Ignores Your Index

### The Cost Model

Databases compare plans numerically. Sequential I/O is cheaper than random I/O:

```
Plan A: Full table scan = 10,000 rows × 0.01/row (sequential) = 100 cost
Plan B: Index scan = 5,000 index entries × 0.005 + 5,000 rows × 0.04/row (random I/O) = 225 cost
→ Plan A wins. Database correctly skips the index.
```

When a query matches 10-30%+ of rows, full table scan is usually faster. For small tables (< 200 rows), the index lookup overhead exceeds the benefit of sequential scan.

### PostgreSQL `random_page_cost`

Default is 4.0 (optimized for HDD). On SSD or when data fits in RAM, set to 1.1 to make the optimizer prefer indexes more often.

### Stale Statistics

After bulk operations, statistics may be outdated. The optimizer estimates 55% match when reality is 5%. Run `ANALYZE table_name` after large data changes.

### Column Transformation

Any function applied to the indexed column makes the index invisible:
- `WHERE YEAR(birthday) = 1988` → rewrite as `WHERE birthday >= '1988-01-01' AND birthday < '1989-01-01'`
- `WHERE LOWER(email) = 'test@example.com'` → use expression index
- `WHERE CONCAT(first, ' ', last) = 'Huy Nguyen'` → split into `WHERE first = 'Huy' AND last = 'Nguyen'`

### Type Mismatch (MySQL)

When column is VARCHAR and comparison value is numeric, MySQL casts the **column** to numeric (not the value to string), breaking the index:

```sql
-- payment_id is VARCHAR(255)
-- WRONG: WHERE payment_id = 57013925718  → CAST(payment_id AS UNSIGNED) = ...
-- RIGHT: WHERE payment_id = '57013925718'
```

## SQL Server: Clustered vs. Non-Clustered Index Model

SQL Server's storage model is a distinct third variant alongside the Heap Table and MySQL/InnoDB Clustered Index models described above — and nearly every SQL Server table gets a clustered index (usually via the primary key), so this model is the practical default ([[how-to-think-like-the-engine-part-1]], [[how-to-think-like-the-sql-server-all-demo-edition]]):

- **The clustered index IS the table.** Row data lives in the clustered index's leaf nodes, sorted by the clustering key, and contains every column (except off-row LOB data for large `NVARCHAR(MAX)`-style columns).
- **A non-clustered index is a narrower, sorted "copy"/replica** of the table on different column(s) — not a separate pointer structure. It always implicitly includes the clustering key, so a matched row can be traced back to the full row in the clustered index.
- All the 8KB-page mental model from the section above applies directly: an index (clustered or not) is fundamentally a sorted sequence of 8KB pages plus a hierarchical jump structure over them.

### Key Lookup and Covering Indexes

When a non-clustered index lacks a column the query needs, SQL Server performs a **Key Lookup** back into the clustered index — critically, once **per matching row**, not once total (see [[Query Execution Plan]] for the full cost-model treatment and the related **Tipping Point** concept). A **covering index** includes every column the query needs (via key columns or `INCLUDE`), eliminating the Key Lookup.

### INCLUDE vs. KEY Columns

For most practical purposes the two are near-equivalent — both are stored on the same 8KB index pages. The real difference is sort order: `INCLUDE` columns are *not* part of the sort key, so they don't affect how the index narrows a search, only what data is available at the leaf without a lookup.

- **Column order matters enormously for the first 1-2 key columns** — they must be selective and actually filtered/searched on.
- Column order matters much less for later columns and for `INCLUDE` columns.
- **Missing Index Recommendations ("Clippy")** — SQL Server's suggested column lists are *not* presented in an optimal order; verify and test different orderings manually rather than accepting the suggested order verbatim (see next section).

### How Many Indexes? The "5 and 5" Starting Point

"5 indexes per table, 5 columns per index" is offered as a rule-of-thumb *starting point*, explicitly not a hard rule — Stack Overflow itself runs 30-40 indexes on some of its own tables given sufficient hardware to absorb the write cost. Treat it as a sanity-check default before deviating with evidence (query patterns, `sp_BlitzIndex` usage data, write-volume tolerance), not a ceiling.

## SQL Server: Missing-Index Recommendations Aren't a Mandate

SQL Server surfaces missing-index suggestions via Management Studio's GUI, the execution plan XML, and the missing-index DMVs. Treat these as a lead to investigate, not an instruction to follow verbatim ([[sqlshack-query-optimization-tips-and-tricks]]):

- Check whether an **existing index is already close enough** to be modified instead of adding a new one.
- Question every suggested `INCLUDE` column — would a narrower, non-covering index be good enough, saving the storage/write cost of the extras?
- Weigh the reported **percent improvement against query frequency**. A 93%-improvement suggestion on a frequently-run, unindexed-column query is an easy win; a 19%-improvement suggestion may not be worth the added write overhead. A 20% gain on a query executed a million times a day, however, can still be worth it — frequency changes the calculus, not just the percentage.
- Confirm the suggested index doesn't **already exist** under a different name/shape that the optimizer is simply declining to use (a symptom of stale statistics or a plan-cache issue, not a genuine index gap).

Two related anti-patterns to watch for while addressing missing-index gaps:
- **Over-indexing**: every additional index adds write cost (every INSERT/UPDATE/DELETE touching an indexed column updates that index too) plus storage and backup overhead.
- **Under-indexing / no clustered index or primary key**: a table with few or no non-clustered indexes serves reads poorly; a table with no clustered index/primary key is a top-priority fix — clustered indexes outperform heaps, and a primary key gives the optimizer information it needs to make good plan choices.

## Debugging with EXPLAIN

Always run EXPLAIN for important queries before deploying:

- PostgreSQL: `EXPLAIN ANALYZE SELECT ...` — shows actual vs estimated rows, timing
- MySQL: `EXPLAIN SELECT ...` — check the `type` column:
  - `ALL` = full table scan (bad)
  - `index` = full index scan
  - `range` = range scan on index (decent)
  - `ref` = index lookup (good)
  - `const` = single row via unique index (excellent)
