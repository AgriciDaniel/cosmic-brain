# Fold page template

Every fold is extractive, deterministic, and uses flat Obsidian properties.

## Frontmatter

```yaml
---
type: fold
title: "Fold k{K} from {EARLIEST-DATE} to {LATEST-DATE}, n={COUNT}"
fold_id: "fold-k{K}-from-{EARLIEST-DATE}-to-{LATEST-DATE}-n{COUNT}"
batch_exponent: {K}
entry_count: {COUNT}
range_from: "{EARLIEST-CHILD-DATE}"
range_to: "{LATEST-CHILD-DATE}"
created: "{YYYY-MM-DD}"
updated: "{YYYY-MM-DD}"
tags:
  - meta
  - fold
  - "fold/k{K}"
status: mature
child_keys:
  - "log-{YYYYMMDD}-001"
  - "log-{YYYYMMDD}-002"
related:
  - "[[log]]"
  - "[[index]]"
---
```

Generate each `child_key` from the entry date plus its one-based position in the
selected oldest-to-newest range. The same key appears in exactly one body row.
This avoids nested YAML objects while preserving a frontmatter/table bijection.
The deterministic `fold_id` matches the filename. Missing any required property
is a dry-run failure.

## Body

Use these sections in order.

### Scope

One paragraph stating the level, exact count, date range, and only those themes
supported by at least two child entries.

```markdown
Level-{K} fold of {COUNT} log entries spanning {FROM} through {TO}.
```

### Child Entries

One row per child key and log entry. Preserve entries even when multiple rows
refer to the same page.

```markdown
## Child Entries

| Child key | Date | Op | Title | Page | Page state | Extractive summary |
|---|---|---|---|---|---|---|
| log-20260701-001 | 2026-07-01 | ingest | Example source filed | [[Example Source]] | present | Added one source-backed example page. |
| log-20260702-002 | 2026-07-02 | save | Example decision recorded | [[Example Decision]] | missing | Source page is missing; summary is limited to the log entry. |
```

The summary is one sentence supported by the log entry. Use `ambiguous in
source` or `source missing` instead of guessing.

### Key Outcomes

Include three to seven extractive bullets when supported. Cite the child key for
every bullet and verify each number against the source entry.

```markdown
## Key Outcomes

- Added one source-backed example page. (child: log-20260701-001)
```

If no outcome is supported, state that explicitly.

### Cross-entry Themes

Include zero to four bullets. Each theme names at least two child keys. If no
pattern is supported, write:

```markdown
## Cross-entry Themes

No cross-entry themes identified; the entries are independent within this range.
```

### Contradictions or Corrections

Preserve disagreements and their status. Use `None detected` only after checking
all selected entries.

### Child Pages

List each unique present target page once. This section is deduplicated by page;
the Child Entries table is not.

```markdown
## Child Pages

- [[Example Source]]

## Related

- [[log]] - source entries
- [[index]] - vault catalog
```

## Validation

- `entry_count`, `child_keys`, and table rows have equal counts.
- Every child key is unique and appears exactly twice: frontmatter and one row.
- Every numeric statement is traceable to its cited child.
- Every theme cites at least two children.
- Missing pages remain explicit.
- No child page or selected log entry is changed.
- The fold body is a rollup, not a retelling; split an unusually large fold
  instead of imposing an arbitrary line target.
