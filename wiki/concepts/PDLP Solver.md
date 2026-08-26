---
type: concept
address: c-000216
title: "PDLP Solver"
created: 2026-06-05
updated: 2026-06-05
tags:
  - optimization
  - linear-programming
  - or-tools
  - first-order-methods
status: developing
related:
  - "[[Google OR-Tools]]"
  - "[[Combinatorial Optimization]]"
  - "[[Research: Google OR-Tools]]"
---

# PDLP Solver

Navigation: [[concepts/_index]] | [[Google OR-Tools]] | [[Research: Google OR-Tools]]

**PDLP** (Primal-Dual Linear Programming) is a first-order LP solver in [[Google OR-Tools]], designed for linear programs at scales where simplex-based solvers run out of memory. Published in *Mathematical Programming Computation* (Springer, 2026) — arxiv:2501.07018.

## Why First-Order for LP?

Simplex-based solvers (Glop, Gurobi, CPLEX) store and factor a dense basis matrix. Memory cost grows quadratically with problem size. At billions of variables/constraints, this becomes prohibitive.

PDLP uses **gradient-based iteration** (PDHG — Primal-Dual Hybrid Gradient) applied to the minimax LP formulation. Memory scales linearly with the number of nonzeros.

## Algorithm

Base algorithm: **Primal-Dual Hybrid Gradient (PDHG)** applied to the saddle-point reformulation of LP:

```
min  c'x  s.t.  Ax = b, x >= 0
≡   min_x max_y  c'x + y'(b - Ax)
```

Key enhancements over vanilla PDHG:
- **Diagonal preconditioning** — balances variable/constraint scales
- **Presolving** — reduces problem size before solving
- **Adaptive step sizes** — adjusts per-iteration based on progress
- **Adaptive restarting** — resets momentum when progress stalls
- **Feasibility polishing** — final refinement to improve solution quality
- **Multithreaded C++ implementation**

## Scale

| Mode | Max nonzeros solved |
|------|---------------------|
| Single machine | 6.3 billion (evaluated) |
| Distributed (internal Google) | 92 billion |

Solved 8 of 11 large-scale instances to 1% optimality gap within 6 days on a single machine.

## When to Use

- LP with >10M nonzeros where Glop/Gurobi hit memory limits
- "Web-scale" logistics or planning problems
- Research / large-scale experimentation

## When NOT to Use

- Standard LP problems — Glop or Gurobi will be faster per iteration
- MIP problems — PDLP is LP only; use CP-SAT or MPSolver for integers
- Problems requiring high-precision optimal solutions fast

## Positioning

> "A revolutionary first-order linear solver reshaping the landscape of linear optimisation" — Google Research publication on OR-Tools

PDLP is the only free solver capable of this scale. Commercial alternatives (Gurobi, CPLEX) do not offer first-order methods as of 2026.
