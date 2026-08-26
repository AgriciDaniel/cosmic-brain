# Database Indexing Rules

Source: "Database Indexing & Những Điều Developer Cần Biết" by Nguyễn Thế Huy
Wiki: `wiki/concepts/Database Indexing.md`, `wiki/concepts/Database Index Advanced Techniques.md`, `wiki/concepts/Database Schema and Performance.md`

When writing SQL, reviewing queries, or designing indexes — apply these rules automatically.

---

## The Four Golden Rules

When faced with a slow query, map it against these four rules to determine the correct index:

1. **Fast Lookup** — equality `=` jumps directly to the target block. No scan needed.
2. **One-Direction Scan** — after jump, scan forward/backward along sorted list. Combined with `LIMIT`, this is extremely fast.
3. **Left-to-Right Funnel** — composite index `(A, B, C)` serves queries on `A`, `A+B`, `A+B+C`. Skipping any column disables all columns to its right.
4. **Range Breaks Funnel** — `>`, `<`, `>=`, `<=`, `BETWEEN`, `LIKE 'x%'` switches to scan mode. Columns after the range column can only filter (not narrow the scan).

**Design rule**: equality columns first, range column last in any composite index.

---

## Storage Models — Know Which DB You're On

### MySQL/InnoDB (Clustered Index)
- PK *is* the table — row data lives at PK leaf nodes
- **Never use UUIDv4 as PK** — random inserts 3–10× slower than auto-increment
- Use UUIDv7/ULID if you need distributed IDs (time-sorted = fast inserts)
- PK value propagates to every secondary index: prefer `BIGINT` over `CHAR(26)` (saves GBs at scale)
- Secondary index lookup = 2 steps (find PK, then find row)

### PostgreSQL (Heap Table)
- All indexes store physical tuple pointers; no clustering by default
- PK and secondary index lookups are equal cost
- Insert always appends — PK type doesn't affect insert speed

**Recommendation**: auto-increment PK for internal use. Add separate `uuid` column for external IDs (URLs, APIs).

---

## When DB Ignores Your Index — Common Causes

- **Cost model beats you**: if DB estimates >10–30% of rows match, sequential scan is cheaper. This is correct behavior. Fix the query selectivity, not the index.
- **Stale statistics**: always run `ANALYZE table_name` after bulk inserts/deletes
- **Column transformation breaks index**:
  - `WHERE YEAR(birthday) = 1988` → rewrite: `WHERE birthday >= '1988-01-01' AND birthday < '1989-01-01'`
  - `WHERE LOWER(email) = 'x'` → create expression index: `CREATE INDEX ON users ((LOWER(email)))`
  - `WHERE CONCAT(first, last) = 'x'` → split into separate equality conditions
- **MySQL type mismatch**: `WHERE varchar_col = 57013` casts the *column*, breaking the index. Always quote: `= '57013'`
- **PostgreSQL on SSD**: set `random_page_cost = 1.1` (default 4.0 is tuned for HDD)

---

## SQL Operations and Index Behavior

| Operation | Behavior |
|-----------|----------|
| `=` | Fast jump — ideal |
| `!=` | Must scan both sides — add equality column before it |
| `IS NULL` | Fast (jumps to NULL block) |
| `IS NOT NULL` | Slow scan — treat like `!=` |
| `LIKE 'x%'` | Converted to range — uses B-Tree |
| `LIKE '%x%'` | Cannot use B-Tree — use `pg_trgm` GIN index (PostgreSQL only) |
| `ORDER BY` | Add sort columns at end of index; eliminates disk-based sort |
| `GROUP BY` | Same as ORDER BY — enables loop-and-count algorithm |
| `JOIN` | Index both directions; optimizer picks best driving table |
| `UPDATE`/`DELETE` | Test equivalent `SELECT` first — same row-scan cost |

---

## Advanced Techniques — When to Use Them

**Expression (functional) index** — when you can't avoid transforming a column in WHERE:
```sql
CREATE INDEX ON users ((LOWER(email)));
CREATE INDEX ON contacts ((MONTH(birthday)));
-- Expression in WHERE must match index expression exactly
```

**Partial index** — for boolean/status columns with skewed distribution:
```sql
CREATE INDEX orders_unprocessed ON orders (created_at) WHERE is_processed = FALSE;
-- Only indexes ~20% of rows; stays small; optimizer uses it automatically
```

**Covering index** — when all SELECT columns can fit in the index:
```sql
-- PostgreSQL: use INCLUDE for non-key read columns
CREATE INDEX ON invoices (customer_id, year) INCLUDE (price);
-- Zero table access for: SELECT price FROM invoices WHERE customer_id=X AND year=Y
```

**JSON indexing**:
- 1–2 fields → expression index or virtual column
- Many fields with flexible search → `CREATE INDEX ON contacts USING GIN (attributes)` + `@>` operator

**GIN trigram** — for `LIKE '%pattern%'` in PostgreSQL:
```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX ON contacts USING GIN (name gin_trgm_ops);
```

**Ghost conditions** — add logically redundant WHERE clauses encoding business rules so optimizer can use more index columns. Document why — they silently break if the rule changes.

**Range-to-equality transform** — preserve funnel when sort column follows a range:
```sql
-- Problem: (language, stars, sponsors) — stars is range, sponsors can't narrow
-- Solution: convert range to boolean equality
CREATE INDEX ON repos (language, (IF(stars > 1000, 1, 0)), sponsors);
```

---

## Schema Patterns

**Denormalize when JOIN discards most rows**: copy `project_status` into `tasks` + maintain via trigger, or mark tasks archived on project close.

**Keyset pagination** over OFFSET — always for deep pages:
```sql
-- Slow (scans 29,970 rows): SELECT * FROM users ORDER BY name, id LIMIT 30 OFFSET 29970
-- Fast: SELECT * FROM users WHERE (name, id) > ('Huy', 3150) ORDER BY name, id LIMIT 30
```

**Distributed counters** for hot rows:
```sql
INSERT INTO post_stats (post_id, fanout, count) VALUES (X, FLOOR(RAND()*100), 1)
ON DUPLICATE KEY UPDATE count = count + 1;
SELECT SUM(count) FROM post_stats WHERE post_id = X;
```

**Partitioning** for time-series/log tables: `DROP PARTITION` is instant; `DELETE` scans millions of rows.

**Pre-aggregation** for dashboards: maintain summary table updated by trigger/job; single-row lookup beats full-table aggregate every time.

---

## Debugging — Always EXPLAIN Before Deploying

```sql
-- PostgreSQL
EXPLAIN ANALYZE SELECT ...;
-- Check: actual rows vs estimated rows (large gap = stale stats)

-- MySQL
EXPLAIN SELECT ...;
-- type column: ALL=bad, range=decent, ref=good, const=excellent
```

**Unused index audit**:
```sql
-- PostgreSQL
SELECT indexrelname, idx_scan FROM pg_stat_all_indexes
WHERE schemaname NOT IN ('pg_catalog','information_schema') ORDER BY idx_scan;

-- MySQL — make invisible before dropping to test safely
ALTER TABLE t ALTER INDEX idx_name INVISIBLE;
```

Remove duplicate indexes: `(A, B, C)` makes `(A)` and `(A, B)` redundant — same prefix already covered.
