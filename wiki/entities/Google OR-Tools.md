---
type: entity
address: c-000214
title: "Google OR-Tools"
entity_type: product
parent_org: Google LLC
license: Apache 2.0
created: 2026-06-05
updated: 2026-06-05
tags:
  - optimization
  - operations-research
  - open-source
  - google
status: developing
related:
  - "[[CP-SAT Solver]]"
  - "[[PDLP Solver]]"
  - "[[Vehicle Routing Problem]]"
  - "[[Combinatorial Optimization]]"
  - "[[google-or-tools]]"
---

# Google OR-Tools

Navigation: [[entities/_index]] | [[google-or-tools]] | [[Research: Google OR-Tools]]

**Google OR-Tools** is Google's open-source suite for combinatorial optimization — finding the best solution from a very large set of possible solutions. In development since 2008. Apache 2.0 license.

## Solvers

| Solver | Module | Domain |
|--------|--------|--------|
| **CP-SAT** | `ortools.sat` | Constraint programming + SAT hybrid; flagship |
| **Glop** | `ortools.linear_solver` | Pure LP (simplex) |
| **PDLP** | `ortools.linear_solver` | First-order LP at massive scale |
| **MPSolver** | `ortools.linear_solver` | MIP wrapper (CBC, SCIP, CLP, Gurobi backend) |
| **RoutingModel** | `ortools.constraint_solver` | VRP and all variants |
| Graph algorithms | `ortools.graph` | Shortest path, min-cost flow, max flow, assignment |

## Language Support

C++ (primary), Python, Java, C#/.NET, Julia (via MathOptInterface.jl)

Install: `pip install ortools`

## Competitive Position

- CP-SAT won all gold medals at 2024 MiniZinc Challenge (best free CP solver)
- PDLP: only free solver handling LP at billions-of-nonzero scale
- Routing solver underpins Google Maps Platform Route Optimization API
- Loses to IBM CP Optimizer and Hexaly at extreme industrial scale (1000×1000 JSSP)
- Open-source alternative to Gurobi/CPLEX for users where commercial cost is prohibitive

## Version History

- v9.15.6755 — January 2026 (current)
- v9.12 — added Python 3.13 support

## Related

- [[CP-SAT Solver]] — deep dive on architecture
- [[PDLP Solver]] — first-order LP
- [[Vehicle Routing Problem]] — VRP with OR-Tools
- [[Combinatorial Optimization]] — domain overview
