---
type: concept
address: c-000218
title: "Combinatorial Optimization"
created: 2026-06-05
updated: 2026-06-05
tags:
  - optimization
  - operations-research
  - algorithms
status: developing
related:
  - "[[Google OR-Tools]]"
  - "[[CP-SAT Solver]]"
  - "[[PDLP Solver]]"
  - "[[Vehicle Routing Problem]]"
  - "[[Research: Google OR-Tools]]"
---

# Combinatorial Optimization

Navigation: [[concepts/_index]] | [[Research: Google OR-Tools]]

**Combinatorial optimization** finds the best solution (by some objective) from a finite but exponentially large set of candidates. Most problems are NP-hard — no known polynomial algorithm. Solvers use exact methods (branch-and-bound, cutting planes, constraint propagation) or heuristics (local search, metaheuristics) to find optimal or near-optimal solutions within time limits.

## Problem Classes

| Class | Description | Example | Typical Solver |
|-------|-------------|---------|----------------|
| **LP** | Continuous variables, linear objective + constraints | Production planning | Glop, PDLP, Gurobi |
| **MIP/ILP** | Integer + continuous variables, linear | Capital budgeting | CBC, SCIP, Gurobi, CPLEX |
| **CP** | Integer variables, arbitrary constraints | Scheduling, rostering | CP-SAT, IBM CP Optimizer |
| **VRP** | Route assignment to vehicles | Fleet routing | OR-Tools RoutingModel, OptaPlanner |
| **SAT** | Boolean variable assignment satisfying clauses | Configuration | MiniSat, Glucose, CP-SAT |
| **JSSP** | Jobs × machines assignment, minimize makespan | Manufacturing | CP-SAT, Hexaly, CP Optimizer |
| **Bin packing** | Pack items into bins | Container loading | CP-SAT, DP |
| **Assignment** | Match agents to tasks | Min-cost bipartite matching | Hungarian algorithm, OR-Tools graph |

## Key Algorithms

**Branch-and-Bound**: Recursively divide search space. Prune branches when a bound proves no better solution exists. Core of MIP solvers.

**Cutting Planes (Gomory cuts)**: Add linear inequalities that cut off fractional LP relaxation solutions without cutting integer solutions. Tightens relaxations.

**CDCL (Conflict-Driven Clause Learning)**: Learn from conflicts during SAT search to prune equivalent future branches. Enables backjumping over irrelevant decisions.

**Lazy Clause Generation (LCG)**: Convert CP constraints incrementally into SAT clauses as needed. Core of CP-SAT.

**Large Neighborhood Search (LNS)**: Fix most variables, re-optimize a neighborhood. Fast improvement heuristic after finding an initial feasible solution.

**PDHG (Primal-Dual Hybrid Gradient)**: First-order method for LP. Scales to billions of variables where simplex memory is prohibitive. See [[PDLP Solver]].

## Solver Landscape (2025–2026)

| Solver | License | Strength |
|--------|---------|---------|
| [[Google OR-Tools]] CP-SAT | Apache 2.0 | Best free CP; competitive MIP |
| [[Google OR-Tools]] PDLP | Apache 2.0 | Only free massive-scale LP |
| Gurobi | Commercial | Best MIP/LP performance |
| IBM CPLEX + CP Optimizer | Commercial | Best CP at extreme scale |
| Hexaly | Commercial | Local search, wins at extreme JSSP |
| SCIP | Apache 2.0 | Academic MIP, bundled in OR-Tools |
| CBC / CLP | EPL (free) | COIN-OR open-source MIP/LP |
| PuLP | MIT | Python modeling layer (no solver) |
| OptaPlanner | Apache 2.0 | Java, good for dynamic VRP |
| MiniZinc | MPL 2.0 | Modeling language + benchmark suite |

## Confidence Scoring Rule

A solver that "wins benchmarks" may be optimized for that benchmark. Hexaly (formerly LocalSolver) uses local search meta-heuristics — wins at extreme scale JSSP but the paradigm differs fundamentally from CP/MIP; solutions are not guaranteed optimal. Always match solver paradigm to problem structure.
