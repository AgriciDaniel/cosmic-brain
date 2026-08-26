---
type: source
address: c-000213
title: "Google OR-Tools"
source_type: github_repo
author: Google LLC
date_published: 2008-ongoing
url: https://github.com/google/or-tools
confidence: high
created: 2026-06-05
updated: 2026-06-05
tags:
  - optimization
  - operations-research
  - constraint-programming
  - open-source
key_claims:
  - OR-Tools is Google's open-source combinatorial optimization suite, Apache 2.0 licensed
  - CP-SAT won all gold medals at the 2024 MiniZinc Challenge
  - PDLP solved LPs with 92 billion nonzeros via distributed mode
  - Current version v9.15.6755 released January 2026
related:
  - "[[Google OR-Tools]]"
  - "[[CP-SAT Solver]]"
  - "[[PDLP Solver]]"
  - "[[Vehicle Routing Problem]]"
  - "[[Combinatorial Optimization]]"
  - "[[Research: Google OR-Tools]]"
---

# Source: Google OR-Tools

Navigation: [[sources/_index]] | [[Research: Google OR-Tools]]

## About

Google OR-Tools is an open-source combinatorial optimization suite developed at Google since 2008. Apache 2.0 license. Supports C++, Python, Java, C#/.NET, and Julia.

- **GitHub**: https://github.com/google/or-tools
- **Stars**: 13,600+ (as of 2026-06)
- **Version**: v9.15.6755 (released January 14, 2026)
- **Language**: C++ core (79.1%), Python wrappers (6.3%), Julia/C#/Java bindings

## What This Source Contributes

Primary reference for all OR-Tools knowledge. Establishes architecture of CP-SAT (portfolio solver with LCG/CDCL/LNS), PDLP (first-order LP at massive scale), Glop (pure LP simplex), MPSolver (multi-backend MIP wrapper), and RoutingModel (VRP). Confirms CP-SAT won all gold medals at 2024 MiniZinc Challenge.

## Key Claims

- CP-SAT is a portfolio solver combining LCG, CDCL, branch-and-bound, cutting planes, and LNS on parallel threads (HIGH)
- Python API via `pip install ortools` — no external dependencies, pre-compiled wheels (HIGH)
- Routing solver underpins Google Maps Platform Route Optimization API (HIGH — stated in official Google Research publication)
- PDLP evaluated on LP instances up to 6.3 billion nonzeros; distributed version handles 92 billion (HIGH — arxiv:2501.07018)
- CP-SAT fails on 1000×1000 JSSP within 6 hours; Hexaly and IBM CP Optimizer outperform at that scale (HIGH — competitor benchmark, possible bias)

## Supporting Papers

- arxiv:2501.07018 — PDLP paper, published in *Mathematical Programming Computation* (Springer, 2026)
- arxiv:1909.08247 — "Google vs IBM: A Constraint Solving Challenge" — CP-SAT vs CP Optimizer on job shop
