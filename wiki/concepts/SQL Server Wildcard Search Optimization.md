---
type: concept
title: "SQL Server Wildcard Search Optimization"
created: 2026-07-02
updated: 2026-07-02
address: c-000289
tags:
  - sql-server
  - concept
  - query-optimization
  - full-text-search
status: developing
domain: database
complexity: intermediate
related:
  - "[[Database Indexing]]"
  - "[[Database Index Advanced Techniques]]"
sources:
  - "[[sqlshack-query-optimization-tips-and-tricks]]"
aliases:
  - "leading wildcard search"
  - "fuzzy string search SQL Server"
  - "n-gram search"
---

# SQL Server Wildcard Search Optimization

SQL Server B-Tree indexes cannot serve substring ("fuzzy") searches without additional design work. A `LIKE '%text%'` predicate defeats the index in both directions:

```sql
SELECT Person.BusinessEntityID, Person.FirstName, Person.LastName, Person.MiddleName
FROM Person.Person
WHERE Person.LastName LIKE '%For%';
```

A leading `%` rules out an ascending-index seek; a trailing `%` rules out a descending-index seek. With both present, SQL Server has no choice but to scan every row and inspect every character. On a small table this is tolerable; on a large one it is slow and expensive.

## Options, Ranked by Effort/Cost

1. **Re-evaluate the requirement.** Does the application actually need mid-string matching, or would a prefix match satisfy users? Removing the capability removes the problem.
2. **Pre-filter with other predicates.** If date, status, or another selective column can narrow the candidate set before the string comparison runs, the wildcard scan operates on a much smaller set.
3. **Convert to a trailing-only wildcard** (`'For%'` instead of `'%For%'`). A trailing wildcard *is* usable by a B-Tree index because SQL Server can convert it internally to a range (`>= 'For' AND < 'Fos'`).
4. **Full-Text Indexing.** A first-class SQL Server feature that builds indexes supporting flexible/linguistic string search (including true substring/mid-string matches and word-form matching). Requires separate install/configuration/maintenance, but is the correct answer for string-centric applications with large tables.
5. **N-grams.** A hand-rolled substring index: break each string value into fixed-length overlapping substrings and store them in a side table linked back to the source row. Best for short strings.

## N-Gram Design

Before implementing, pin down the application's search rules:
- Minimum/maximum search length allowed?
- Are empty searches (full table scan) permitted?
- Multi-word/phrase searches?
- Are prefix (start-of-string) searches handled separately via a normal index seek, since they don't need the n-gram table?

**Worked example** — word "Dinosaur" with a 3-character minimum (excluding the start of the string, which is served by a plain index seek): `ino, inos, inosa, inosau, inosaur, nos, nosa, nosau, nosaur, osa, osau, osaur, sau, saur, aur`.

A separate 2-column table (`n_gram_data`, `my_big_table_id_column`) stores each substring linked to its source row. A wildcard search for `"dino"` becomes an equality lookup:

```sql
SELECT n_gram_table.my_big_table_id_column
FROM dbo.n_gram_table
WHERE n_gram_table.n_gram_data = 'Dino';
```

With `n_gram_data` indexed, this is a fast equality seek instead of a table scan.

**Cost**: the n-gram table must be kept in sync on every insert/update/delete of the source string column, and the number of n-grams per row grows rapidly with string length. Good fit for short strings (names, zip codes, phone numbers); a poor/expensive fit for long free-form text (descriptions, email bodies, `NVARCHAR(MAX)` columns) — use Full-Text Indexing instead for those.

## Relationship to Other Concepts

- [[Database Indexing]] documents the general rule that `LIKE '%x%'` cannot use a B-Tree and that PostgreSQL solves this with a trigram GIN index (`pg_trgm`). SQL Server has no built-in trigram-index equivalent; Full-Text Indexing and hand-rolled n-grams are the SQL-Server-native substitutes for that same problem class.
- [[Database Index Advanced Techniques]] covers the general trigram/GIN index pattern for PostgreSQL — read together for a cross-engine picture of substring-search optimization.
