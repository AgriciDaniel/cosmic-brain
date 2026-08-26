---
type: concept
title: "Database Index Advanced Techniques"
created: 2026-05-26
updated: 2026-05-26
tags:
  - database
  - concept
  - indexing
  - sql
  - advanced
status: developing
related:
  - "[[Database Indexing]]"
  - "[[Database Schema and Performance]]"
sources:
  - "[[database-indexing-developer-guide]]"
complexity: advanced
domain: database
aliases:
  - "advanced indexing"
  - "expression index"
  - "partial index"
  - "index-only query"
  - "JSON index"
  - "spatial index"
address: c-000159
---

# Database Index Advanced Techniques

Beyond the four golden rules, these techniques solve specific performance problems that basic B-Tree indexes cannot address.

## Expression Indexes (Functional Indexes)

When you cannot rewrite the query to avoid transforming a column, index the expression itself:

```sql
-- Problem: cannot rewrite MONTH(birthday) = 5 as a simple range
-- Solution: index on the expression
CREATE INDEX contacts_birthmonth ON contacts ((MONTH(birthday)));

-- Query uses the index automatically:
SELECT * FROM contacts WHERE MONTH(birthday) = 5;

-- Also: case-insensitive search
CREATE INDEX users_email_lower ON users ((LOWER(email)));
SELECT * FROM users WHERE LOWER(email) = 'test@example.com';
```

**Critical rule**: The expression in the index must match the expression in WHERE exactly. `MONTH(birthday)` in the index won't match `EXTRACT(MONTH FROM birthday)` in the query.

**MariaDB / SQL Server**: Do not support direct expression indexes. Use virtual (generated) columns instead:
```sql
-- MariaDB workaround
birthday_month INT AS (MONTH(birthday)) VIRTUAL NOT NULL,
INDEX contacts_birthmonth (birthday_month)
```

## Partial Indexes (PostgreSQL)

Index only the rows you care about, not the entire table:

```sql
-- Only index unprocessed orders (20% of table)
CREATE INDEX orders_unprocessed
  ON orders (created_at)
  WHERE is_processed = FALSE;
```

**Why this works**: A full index on `is_processed` with 80% TRUE values is useless for finding FALSE rows (too many matches for random I/O). The partial index is smaller (~20% size), stays small as data changes, and the optimizer uses it automatically when the WHERE clause matches.

Use for: boolean columns, status columns with skewed distributions ("closed" = 95%, "open" = 3%).

## Index-Only Queries (Covering Indexes)

If all columns needed by the query exist in the index, the database skips reading the table entirely:

```sql
-- Sessions table has large 'data' column
-- Index: (token, user_id)
SELECT user_id FROM sessions WHERE token = 'abc123';
-- Index entry already contains user_id — no table access needed!
```

**Perfect use case**: Many-to-many join tables:
```sql
-- user_roles(user_id, role_id) — that's ALL the columns
CREATE INDEX idx_user_roles ON user_roles (user_id, role_id);
-- Query: SELECT role_id FROM user_roles WHERE user_id = 42
-- → Index-only, never touches the table
```

**PostgreSQL INCLUDE**: Add columns for reading only, without affecting index sort order or uniqueness:
```sql
CREATE INDEX ON invoices (customer_id, year) INCLUDE (price);
-- price is stored alongside but does NOT affect sort order or UNIQUE constraint
-- Still enables index-only queries that reference price
```

MySQL does not support INCLUDE. Add the column to the end of the index instead (but beware UNIQUE constraint changes).

## JSON Indexing

### MySQL: Virtual Columns
```sql
CREATE TABLE contacts (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  attributes JSON NOT NULL,
  email VARCHAR(255) AS (attributes->>'$.email') VIRTUAL NOT NULL,
  INDEX contacts_email (email)
);
```

### PostgreSQL: Expression Index
```sql
CREATE INDEX contacts_email ON contacts ((attributes->>'email'));
```

### PostgreSQL: GIN Index (index everything)
```sql
CREATE INDEX contacts_attrs ON contacts USING GIN (attributes);

-- Query with special operators:
SELECT * FROM contacts WHERE attributes @> '{"email": "admin@example.com"}';
-- @> = "contains"
-- ?  = "key exists"
-- ?| = "any of these keys exist"
-- ?& = "all of these keys exist"
```

GIN creates an inverted index: every key and value is indexed with pointers to rows. Ideal for flexible search across many JSON fields. MySQL's JSON indexing is more limited.

### JSON Arrays
```sql
-- PostgreSQL: GIN for arrays
CREATE INDEX products_cats ON products USING GIN (categories);
SELECT * FROM products WHERE categories @> '["ebook", "printed"]';

-- MySQL: multi-valued index (unsigned integers only)
CREATE INDEX products_cats ON products ((CAST(categories AS UNSIGNED ARRAY)));
```

**Rule of thumb**: 1-2 JSON fields → virtual column or expression index. Many fields with flexible search → GIN (PostgreSQL).

## Spatial Indexes (Geographic Search)

B-Tree cannot handle two simultaneous range conditions (e.g., longitude AND latitude in a bounding box). Use R-Tree spatial indexes instead:

```sql
-- PostgreSQL: GiST index on geometry
CREATE TABLE businesses (
  id BIGINT PRIMARY KEY,
  type VARCHAR(255) NOT NULL,
  location GEOMETRY(Point, 4326) NOT NULL
);
CREATE INDEX search_idx ON businesses USING GIST (type, location);

-- Query: restaurants within Manhattan bounding box
SELECT * FROM businesses
WHERE type = 'restaurant'
  AND location && ST_MakeEnvelope(-74.0083, 40.7216, -73.9752, 40.7422, 4326);
```

PostgreSQL spatial indexes support multi-column (e.g., type + location). MySQL spatial indexes are single-column only and have SRID limitations.

## Trigram Index (PostgreSQL) — Leading Wildcard Search

B-Tree cannot handle `LIKE '%pattern%'`. Trigram indexes solve this:

```sql
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX trgm_idx ON contacts USING GIN (name gin_trgm_ops);

-- Now this uses the index:
SELECT * FROM contacts WHERE name LIKE '%Nguyễn%';
```

**How it works**: Text is split into all 3-character substrings (trigrams). "Nguyễn Minh" → "ngu", "guy", "uyễ", "yễn", "ễn ", etc. Searching "%Minh%" finds rows that contain both "min" and "inh" trigrams, then rechecks exact matches.

**Limitations**: Search pattern needs at least 3 consecutive non-wildcard characters. The index can be large. Only available in PostgreSQL.

## Prefix and Hash Indexes (Large Text Columns)

When indexing TEXT/VARCHAR columns that are too large for B-Tree entry limits:

**Prefix index** (MySQL and PostgreSQL):
```sql
-- MySQL (concise syntax)
CREATE INDEX articles_search ON articles (type, title(20));

-- PostgreSQL (expression-based)
CREATE INDEX articles_search ON articles (type, (SUBSTRING(title, 1, 20)));
```

Trade-off: shorter prefix = smaller index but more false matches requiring table re-checks.

**Hash index** (for very long strings):
```sql
CREATE INDEX articles_search ON articles (type, (SHA1(title)));

-- Query must use the hash:
SELECT * FROM articles
WHERE SHA1(title) = SHA1('...full title...')
  AND title = '...full title...';  -- re-check to handle hash collisions
```

**PostgreSQL HASH index type** — separate index structure, only supports `=` operator, smaller than B-Tree but limited:
```sql
CREATE INDEX invoices_uniqid ON invoices USING HASH (uniqid);
```

## Finding and Removing Unused Indexes

Every index costs write performance. Periodically audit:

**PostgreSQL**:
```sql
SELECT schemaname, tablename, indexrelname, idx_scan, idx_tup_read
FROM pg_stat_all_indexes
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
ORDER BY idx_scan ASC;
-- idx_scan = 0 → candidate for removal
```

**MySQL**:
```sql
SELECT object_schema, object_name, index_name, count_star
FROM performance_schema.table_io_waits_summary_by_index_usage
WHERE index_name IS NOT NULL AND index_name != 'PRIMARY'
ORDER BY count_star ASC;
```

**Safety**: Stats reset on database restart. Monitor for at least 1-2 full business cycles before deciding. In MySQL, use `ALTER TABLE ... ALTER INDEX ... INVISIBLE` first to test safely — the index still exists and is maintained but is not used by queries. If nothing breaks, drop it.

### Duplicate Indexes

- `(country, lastname, firstname)` **includes** the functionality of `(country)` and `(country, lastname)` → remove them
- `(country, lastname, phone)` and `(country, lastname, email)` are **independent** — different trailing columns
- `(lastname, country)` is **different** from `(country, lastname)` — reversed column order

## Ghost Conditions

Add logically redundant conditions that help the optimizer without changing results:

```sql
-- Business rule: only shipment types 3, 6, 11 can have transport insurance
-- Original: WHERE status = 'open' AND transportinsurance = 1
-- With ghost: WHERE status = 'open' AND transportinsurance = 1 AND type IN (3, 6, 11)
-- If index exists on (status, type), the ghost condition enables using BOTH columns
```

Ghost conditions encode business rules that the database cannot infer. **Risk**: if the business rule changes, the ghost condition silently filters out valid results. Document why it exists.

## Range-to-Equality Transformation

Convert a range condition into a boolean equality to preserve the funnel:

```sql
-- Problem: WHERE language = 'TypeScript' AND stars > 1000 ORDER BY sponsors ASC
-- Index (language, stars, sponsors) — stars is range, sponsors can't narrow scan

-- Solution: convert range to boolean
CREATE INDEX repos_search ON repos (
  language,
  (IF(stars > 1000, 1, 0)),  -- "is popular" boolean
  sponsors
);
-- Query: WHERE language = 'TypeScript' AND IF(stars > 1000, 1, 0) = 1 ORDER BY sponsors ASC
-- Now all three columns participate in the funnel: equality, equality, sort
```
