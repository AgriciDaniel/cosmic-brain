---
type: source
title: "SQL Query Optimization: Why is it so hard to get right?"
source_url: "https://www.youtube.com/watch?v=RQfJkNqmHB4"
author:
  - "[[Brent Ozar Unlimited]]"
presenter: "David DeWitt"
published: 2018-06-29
event: "Benefit webcast for Robert Davis Memorial Fund"
created: 2026-07-02
tags:
  - source
  - sql-server
  - query-optimization
  - database-theory
  - microsoft-research
status: seed
related:
  - "[[SQL Server Query Tuning Methodology]]"
  - "[[Query Execution Plan]]"
  - "[[SQL Server Statistics and Cardinality Estimation]]"
  - "[[Query Optimizer Join Order Complexity]]"
  - "[[Brent Ozar Unlimited]]"
  - "[[David DeWitt]]"
raw_path: ".raw/notes/2026-07-02/SQL Query Optimization. Why is it so hard to get right.md"
---

# SQL Query Optimization: Why is it so hard to get right?

**Source:** Benefit webcast (~90 minutes) by David DeWitt, Microsoft Research / MIT, 2018-06-29

**Links:** https://www.BrentOzar.com/go/dewitt

## Summary

David DeWitt (pioneer of cost-based query optimization, original System R contributor, and former Microsoft SQL Server team member) presents the theory and practice of SQL query optimization. The talk explains why building a query optimizer is "the hardest part of building a database system," the fundamental algorithms (histograms, dynamic programming, plan enumeration), the fragility problem (tiny parameter changes producing wildly different plans), and the game-changing potential of cloud-native optimization with runtime feedback loops.

## Content

### The Optimizer's Job
- A query arrives, is parsed into a logical operator tree (selections, joins, group-bys, projections), then the cost-based optimizer enumerates physical operator trees (choosing algorithms for each operator: scan vs. index seek, nested loops vs. hash join vs. sort-merge join).
- For a 6-table TPC-H query, there are approximately **22 million logically equivalent plans**. The optimizer must pick a good one quickly — optimal is rarely achievable.

### Core Optimizer Phases

1. **Enumerate logical plans** — Apply equivalence rules (commutativity, associativity, distributivity) to generate all logically equivalent join orders. For a simple 2-join query, there are 9 logical plans.
2. **Enumerate physical plans** — For each logical plan, assign physical algorithms to each operator (3 join methods x selections). 9 logical plans x 3 join methods = 324 physical plans for a trivial query.
3. **Estimate cost** — Use histograms (selectivity estimation) + hardware model (IO + CPU costs) to rank the plans.

### Selectivity Estimation with Histograms
- **Equal-width histograms**: divide key range into equal-sized buckets. Can be off by a factor of 8x for skewed data.
- **Equal-height histograms**: divide key range so each bucket has approximately equal row count. SQL Server and all modern systems use these (plus max-diff extensions). Significantly better for skewed distributions.
- Maximum histogram size in SQL Server is ~200-255 buckets regardless of table size — a fundamental compression that introduces estimation error.
- **Correlated predicates** compound the problem: if `date` and `rating` are correlated (July = blockbuster season), multiplying individual selectivity factors can over- or under-estimate by 100x.

### Plan Space Pruning via Dynamic Programming
- Pass 1: find the best single-relation access plan (sequential scan vs. index scan).
- Pass N: extend N-1 relation plans by joining one more table using one of the join algorithms.
- Aggressively prune: keep only the lowest-cost plan per relation set per "interesting order."
- Left-deep plans only (not bushy trees) — this excludes some potentially optimal plans but reduces the space enormously. For an 8-table star join: 10K left-deep vs 22M total physical plans.

### The Fragility Problem
- DeWitt shows the Picasso tool output (from IIT Bangalore) for a TPC-H query: varying two parameters across 300 values each (90,000 queries) produces 256 distinct execution plans.
- In the bottom-left corner, tiny parameter changes cause plan flips — the optimizer is pathologically sensitive to constants.
- **Robust plan concept**: sort-merge join is far more stable across selectivity ranges than nested loops or index nested loops. Choosing slightly more robust plans (sacrificing 2% average performance) can reduce the plan space from 204 to 30 plans.

### Cloud-Native Optimization (Forward-Looking)
- The database vendor in the cloud knows: exact hardware specs, every query executed, the optimized plan, actual runtime cost, and actual selectivity per operator.
- Insert "check operators" into the physical plan that collect observed statistics at runtime and feed them back into the optimizer.
- Next execution of the same query uses updated statistics + observed cost, producing progressively better plans over thousands of iterations.
- "The move to the cloud is going to really change the quality of plans that database vendors can do" — this was prescient in 2018 and remains largely unrealized as of 2026.

### Key Insight
Query optimization is a fundamentally hard problem because of error propagation: small selectivity estimation errors at the leaf level multiply exponentially through join trees. The optimizer's dynamic programming prunes aggressively to stay within time budget, but this pruning sometimes discards the optimal plan. The best defense is robust plan design (choose algorithms with flat cost curves) and cloud-native feedback loops.

## Further Reading Recommended by DeWitt
- "Database Management Systems" (Ramakrishnan & Gehrke — the "Cow Book")
- "Database Systems: The Complete Book" (Garcia-Molina, Ullman, Widom)
- SIGMOD / VLDB proceedings for current research
- Picasso tool: http://picasso.sourceforge.net (visualizing optimizer plan sensitivity)
