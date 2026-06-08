---
type: concept
title: "Database Schema and Performance"
created: 2026-05-26
updated: 2026-05-26
tags:
  - database
  - concept
  - schema
  - sql
  - performance
status: developing
related:
  - "[[Database Indexing]]"
  - "[[Database Index Advanced Techniques]]"
sources:
  - "[[database-indexing-developer-guide]]"
complexity: intermediate
domain: database
aliases:
  - "schema design"
  - "database schema"
  - "SQL performance patterns"
address: c-000160
---

# Database Schema and Performance

Schema design and data manipulation techniques that complement indexing for overall database performance.

## Denormalization: When Indexes Can't Help

Some queries filter on one table but sort on another, or filter on both. Example: find open tasks from active projects:

```sql
SELECT tasks.* FROM tasks
JOIN projects USING(project_id)
WHERE tasks.team_id = 4 AND tasks.status = 'open' AND projects.status = 'open';
```

If 20,000 tasks match but only 40 projects are active, the database must join 20,000 rows only to discard 19,960 of them. No index on either table fixes this — the filter columns are split across tables.

**Solutions**:
1. Copy the project status into the tasks table (`project_status` column + trigger)
2. Mark tasks as archived when the project closes (eliminate the JOIN entirely)

The principle: some denormalization is better than joining thousands of rows just to discard them.

## UUID vs Auto-Increment PK

| Criterion | Auto-increment | UUIDv4 | UUIDv7 / ULID |
|-----------|---------------|--------|---------------|
| Insert speed | Fastest | Slow (random tree position) | Fast (time-sorted) |
| Size | 4-8 bytes | 16 bytes | 16 bytes |
| Predictable | Yes (enumeration risk) | No | No |
| Distributed ID gen | No | Yes | Yes |

**Recommendation**: Auto-increment for internal PK (JOINs, FKs). Add a separate UUID column for external IDs (URLs, APIs):

```sql
ALTER TABLE users ADD COLUMN uuid UUID NOT NULL DEFAULT gen_random_uuid();
CREATE UNIQUE INDEX users_uuid ON users (uuid);
```

**MySQL/InnoDB note**: PK size propagates to every secondary index. BIGINT (8 bytes) × 1M rows × 5 indexes = 40 MB. CHAR(26) ULID × same = 130 MB. Difference across 50 tables = ~4.5 GB.

## JSON Columns

Use JSON columns for data rarely queried directly (metadata, settings) or as a replacement for EAV (Entity-Attribute-Value) tables:

**Do**:
- Store seldom-used attributes in JSON
- Use relational columns for primary data (FKs, constraints, frequently filtered fields)

**Don't**:
- Store deeply nested JSON (query/update complexity explodes)
- Store references to other tables inside JSON (loses FK constraints)

**JSON Schema validation** (MySQL):
```sql
ALTER TABLE products ADD CONSTRAINT CHECK(
  JSON_SCHEMA_VALID('{
    "type": "object",
    "properties": {
      "tags": {"type": "array", "items": {"type": "string"}}
    },
    "additionalProperties": false
  }', attributes)
);
```

## Constraints

Database constraints are the last line of defense — application validation can be bypassed by batch updates or manual SQL:

```sql
-- CHECK: check-in must be before check-out
ALTER TABLE reservations ADD CONSTRAINT start_before_end CHECK (checkin_at < checkout_at);

-- Business rule: EU customers must have VAT ID
ALTER TABLE invoices ADD CONSTRAINT eu_vat CHECK (NOT(is_eu) OR vatid IS NOT NULL);
```

### Exclusion Constraints (PostgreSQL)

Prevent overlapping ranges without application-level locking:

```sql
CREATE TABLE bookings (
  room_number INT,
  reservation TSTZRANGE,
  EXCLUDE USING GIST (room_number WITH =, reservation WITH &&)
);
-- Automatically prevents two bookings overlapping for the same room
```

### UNIQUE and NULL

**Standard SQL**: `NULL != NULL`, so `(customer_id, NULL)` and `(customer_id, NULL)` are "different" — UNIQUE constraint does NOT prevent duplicates with NULLs.

**PostgreSQL 15+ fix**:
```sql
CREATE UNIQUE INDEX one_pending_order ON orders (customer_id, shipment_id) NULLS NOT DISTINCT;
```

**Universal fix**: Replace NULL with a sentinel value in the index:
```sql
CREATE UNIQUE INDEX one_pending_order ON orders (
  customer_id,
  (CASE WHEN shipment_id IS NULL THEN -1 ELSE shipment_id END)
);
-- Note: this index cannot serve normal lookup queries — need a separate index for that
```

## Partitioning

Drop old data instantly instead of slow DELETEs:

```sql
-- Instead of: DELETE FROM logs WHERE created_at < '2024-01-01' (scans and locks millions of rows)
-- Use partitioning by month:
ALTER TABLE logs DROP PARTITION logs_2023_january;
-- Instant, regardless of row count
```

## Pre-Sorted Tables

In MySQL (Clustered Index), the composite primary key determines physical row order:

```sql
-- Comments of the same product are physically adjacent on disk
CREATE TABLE product_comments (
  product_id BIGINT,
  comment_id BIGINT AUTO_INCREMENT UNIQUE KEY,
  message TEXT,
  PRIMARY KEY (product_id, comment_id)
);
-- Query: SELECT * FROM product_comments WHERE product_id = 42 → sequential read, very fast
```

PostgreSQL equivalent: `CLUSTER table_name USING index_name;` (one-time reorder, not automatically maintained).

## Pre-Aggregation

When dashboard queries aggregate hundreds of thousands of rows and indexes aren't enough:

```sql
-- Pre-aggregated table
CREATE TABLE articles_stats (
  user_id BIGINT,
  publish_year INT,
  total_likes BIGINT,
  PRIMARY KEY (user_id, publish_year)
);

-- Dashboard query → single row lookup, not a scan of the entire articles table
SELECT total_likes FROM articles_stats WHERE user_id = 1 AND publish_year = 2024;
```

Maintain via triggers, scheduled jobs, or application-level updates. This is a trade of write overhead for instant reads.

## Data Manipulation Techniques

### Distributed Counters (Avoid Lock Contention)

Hot rows with rapid counter updates bottleneck on row locks:
```sql
-- Instead of 1 counter row, fan out to 100 rows
INSERT INTO post_statistics (post_id, fanout, likes_count)
VALUES (147587, FLOOR(RAND() * 100), 1)
ON DUPLICATE KEY UPDATE likes_count = likes_count + 1;

-- Read: SUM across all fanout rows
SELECT SUM(likes_count) FROM post_statistics WHERE post_id = 147587;
```

Throughput increases proportionally to fanout count because different rows can be updated in parallel.

### JOIN in UPDATE

```sql
-- MySQL:
UPDATE products
JOIN categories USING(category_id)
SET price = price_base - price_base * categories.discount;

-- PostgreSQL:
UPDATE products
SET price = price_base - price_base * categories.discount
FROM categories
WHERE products.category_id = categories.category_id;
```

One query instead of application-level loops.

### RETURNING (PostgreSQL)

Get data back after mutation in a single query:
```sql
DELETE FROM sessions WHERE ip = '127.0.0.1'
RETURNING id, user_agent, last_access;
-- Works with DELETE, INSERT, UPDATE
```

### Dedup with CTE

```sql
WITH duplicates AS (
  SELECT id, ROW_NUMBER() OVER(
    PARTITION BY firstname, lastname, email ORDER BY age DESC
  ) AS rownum
  FROM contacts
)
DELETE FROM contacts
USING duplicates
WHERE contacts.id = duplicates.id AND duplicates.rownum > 1;
```

## Query Patterns

### Keyset Pagination (Seek Method)

OFFSET-based pagination scans and discards all skipped rows:
```sql
-- Slow: page 1000 scans 999 × 30 = 29,970 rows
SELECT * FROM users ORDER BY firstname, id LIMIT 30 OFFSET 29970;

-- Fast: use the last value from the previous page
SELECT * FROM users
WHERE (firstname, id) > ('Huy', 3150)
ORDER BY firstname, id LIMIT 30;
```

Trade-off: no random page jumps. Add PK to ORDER BY to ensure stable ordering.

### FOR UPDATE (Row Locking)

```sql
START TRANSACTION;
SELECT balance FROM account WHERE account_id = 7 FOR UPDATE;
-- Row is locked until COMMIT/ROLLBACK; no other transaction can modify it
UPDATE account SET balance = 540 WHERE account_id = 7;
COMMIT;
```

Database-level locking avoids orphaned locks from application crashes.

### CTE (Common Table Expressions)

Break complex queries into named, testable steps:
```sql
WITH
most_popular AS (
  SELECT products.*, COUNT(*) as sales FROM products
  JOIN orders_products USING(product_id)
  WHERE created_at BETWEEN '2024-01-01' AND '2024-06-30'
  GROUP BY products.product_id ORDER BY COUNT(*) DESC LIMIT 10
),
eligible_users AS (
  SELECT DISTINCT users.* FROM users
  JOIN users_raffle USING(user_id) WHERE correct_answers > 8
)
SELECT * FROM eligible_users
JOIN orders_products USING(user_id)
JOIN most_popular USING(product_id);
```

Each CTE can be tested independently.

### Useful Shortcuts

**Division by zero safety**:
```sql
SELECT visitors_today / NULLIF(visitors_yesterday, 0) FROM stats;
-- Returns NULL instead of error when denominator is 0
```

**Gap-filling (PostgreSQL)**:
```sql
SELECT dates.day, COALESCE(SUM(stats.count), 0)
FROM generate_series(CURRENT_DATE - INTERVAL '14 days', CURRENT_DATE, '1 day') AS dates(day)
LEFT JOIN statistics stats ON stats.day = dates.day
GROUP BY dates.day;
```

**Multiple aggregates in one pass (PostgreSQL)**:
```sql
SELECT
  COUNT(*) FILTER (WHERE released_at = 2024) AS released_2024,
  COUNT(*) FILTER (WHERE director = 'Nolan') AS nolan_movies
FROM movies;
```

**DISTINCT ON (PostgreSQL)**:
```sql
-- Most expensive order per customer in 2024
SELECT DISTINCT ON (customer_id) *
FROM orders
WHERE EXTRACT(YEAR FROM created_at) = 2024
ORDER BY customer_id ASC, price DESC;
```
