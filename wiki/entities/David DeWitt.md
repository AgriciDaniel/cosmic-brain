---
type: entity
title: "David DeWitt"
entity_type: person
created: 2026-07-02
updated: 2026-07-02
tags:
  - entity
  - person
  - sql-server
  - microsoft-research
  - query-optimizer
  - database-theory
status: seed
related:
  - "[[Brent Ozar Unlimited]]"
  - "[[SQL Server Query Tuning Methodology]]"
  - "[[SQL Server Statistics and Cardinality Estimation]]"
  - "[[Query Optimizer Join Order Complexity]]"
sources:
  - "[[sql-query-optimization-why-is-it-so-hard-to-get-right]]"
aliases:
  - "DeWitt"
  - "David J. DeWitt"
---

# David DeWitt

Computer scientist and database pioneer. Coleman Professor of Computer Science at the University of Wisconsin-Madison (retired), formerly at Microsoft Research and the Microsoft SQL Server team. Co-founder of the Vertica analytic database company.

## Contributions to Query Optimization

- **Cost-based query optimization** — co-presented the first technical paper on cost-based optimization at ACM SIGMOD (same session as Pat Selinger's seminal System R paper).
- **Histograms** — his student Bob Kooi introduced histograms for selectivity estimation into an early version of Ingres; all modern database systems (including SQL Server) use equal-height histograms with max-diff extensions based on this lineage.
- **Plan space enumeration** — formalized the logical-to-physical plan mapping process, equivalence rules (commutativity, associativity, distributivity), and dynamic programming pruning used by all modern optimizers.
- **Picasso tool** — with Jayant Haritsa (IISc Bangalore), created Picasso, the first visualizer of query optimizer plan sensitivity to parameter changes.

## SQL Server Connection

Joined Microsoft Research and worked with the SQL Server team (circa 2010-2016). Advocated for cloud-native optimization with runtime feedback loops — "check operators" that collect actual selectivity statistics at execution time and feed them back into the optimizer. This vision (presented in the 2018 benefit webcast) was ahead of its time and remains largely unrealized as of 2026.

## Selected Impact

- The "Cow Book" (Database Management Systems, with Ramakrishnan and Gehrke) — one of the most widely used database textbooks.
- Vertica — column-store analytic database later acquired by Micro Focus/OpenText; proved columnar storage could outperform row stores by 10-100x for analytic workloads.
- Advised Facebook/Meta on petabyte-scale query processing challenges (noting that some Facebook workflows bypass the query optimizer entirely due to its limitations at extreme scale).
