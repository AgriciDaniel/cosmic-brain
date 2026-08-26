---
type: concept
address: c-000215
title: "CP-SAT Solver"
created: 2026-06-05
updated: 2026-06-05
tags:
  - optimization
  - constraint-programming
  - sat
  - or-tools
status: developing
related:
  - "[[Google OR-Tools]]"
  - "[[Combinatorial Optimization]]"
  - "[[Research: Google OR-Tools]]"
---

# CP-SAT Solver

Navigation: [[concepts/_index]] | [[Google OR-Tools]] | [[Research: Google OR-Tools]]

CP-SAT is the flagship solver in [[Google OR-Tools]]. A **portfolio solver** that runs multiple algorithms concurrently on separate threads, combining constraint programming, SAT, and MIP techniques.

**Won all gold medals at the 2024 MiniZinc Challenge** — the strongest public benchmark signal for a free CP solver.

## Architecture

CP-SAT combines five algorithmic layers:

| Layer | Technique | Role |
|-------|-----------|------|
| **LCG** | Lazy Clause Generation | Incrementally converts CP constraints to SAT clauses |
| **CDCL** | Conflict-Driven Clause Learning | SAT backbone; backjumps past irrelevant decisions |
| **Branch-and-Bound** | with cutting planes (Gomory cuts) | MIP search at root level |
| **Linear relaxation** | Simplex/dual simplex as propagator | Bounds tightening |
| **LNS** | Large Neighborhood Search | Local improvement once feasible solution found |

All subsolvers run on separate threads sharing bounds and feasible solutions. Thread count configurable.

## Solve Process

1. Load and verify model
2. Preprocess: domain reduction, constraint expansion
3. Create linear relaxations
4. Run multiple subsolvers in parallel with different strategies
5. Apply LNS heuristics once a feasible solution exists
6. Transform result back to original variable space

## Variable Constraints

**All variables must be integers.** CP-SAT has no continuous variables. Multiply floats by a scale factor (e.g., 1000) to convert.

```python
from ortools.sat.python import cp_model

model = cp_model.CpModel()
x = model.new_int_var(0, 100, "x")
y = model.new_int_var(0, 100, "y")
model.add(x + y <= 150)
model.maximize(2 * x + 3 * y)

solver = cp_model.CpSolver()
status = solver.solve(model)
if status in (cp_model.OPTIMAL, cp_model.FEASIBLE):
    print(solver.value(x), solver.value(y))
```

## Performance

- 100-item knapsack (2^100 possibilities): solved in 0.01s
- 1–2 orders of magnitude fewer search nodes than plain CP
- Competitive with commercial MIP solvers on many problem classes
- **Hard limit**: 1000×1000 JSSP — fails within 6 hours; IBM CP Optimizer and Hexaly outperform at this scale (Source: [[google-or-tools]])

## Best-Fit Problem Types

- Scheduling: shift rostering, job shop, machine assignment
- Routing: TSP, VRP (use RoutingModel for large VRP)
- Assignment: bin packing, knapsack, combinatorial matching
- Logical/combinatorial: any NP-hard problem with integer variables and complex constraints

## Gotchas

- `AddHint()` is NOT warm-starting — hints silently ignored if infeasible after presolve
- Loose Big-M bounds weaken propagation; prefer native boolean logic (`add_bool_and`, `add_bool_or`)
- Documentation sparse; consult `.proto` files and GitHub issues for undocumented features
- `IntervalVar` + `no_overlap` / `cumulative` constraints are far more efficient than manual binary encoding for scheduling

## Comparison

| Aspect | CP-SAT | IBM CP Optimizer | Gurobi (MIP) |
|--------|--------|-----------------|--------------|
| Cost | Free | Commercial | Commercial |
| CP strength | Best free | Best overall | No CP |
| MIP | Competitive | No | Best overall |
| Extreme scale JSSP | Fails | Handles | Fails |
| Python API | Native | Scripting layer | Native |
