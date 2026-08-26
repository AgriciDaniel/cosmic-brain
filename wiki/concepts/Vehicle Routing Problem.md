---
type: concept
address: c-000217
title: "Vehicle Routing Problem"
created: 2026-06-05
updated: 2026-06-05
tags:
  - optimization
  - routing
  - vrp
  - or-tools
status: developing
related:
  - "[[Google OR-Tools]]"
  - "[[Combinatorial Optimization]]"
  - "[[CP-SAT Solver]]"
  - "[[Research: Google OR-Tools]]"
---

# Vehicle Routing Problem (VRP)

Navigation: [[concepts/_index]] | [[Google OR-Tools]] | [[Research: Google OR-Tools]]

The **Vehicle Routing Problem (VRP)** asks: given a set of customers and a fleet of vehicles, find the optimal set of routes for the fleet to serve all customers. NP-hard. [[Google OR-Tools]] provides a specialized `RoutingModel` solver for VRP and all variants. This solver underpins the Google Maps Platform Route Optimization API.

## VRP Variants Supported by OR-Tools

| Variant | Constraint added |
|---------|-----------------|
| Basic VRP | Minimize total/longest route |
| CVRP | Each vehicle has capacity limit |
| VRPTW | Each node has a time window for service |
| Pickup & Delivery | Pairs of nodes with dependency constraints |
| Resource-constrained VRP | Multiple resource dimensions |
| Soft-constraint VRP | Penalties for dropping visits (optional customers) |

## OR-Tools RoutingModel API

Three core objects:

```python
from ortools.constraint_solver import routing_enums_pb2, pywrapcp

# 1. Index manager (maps node IDs to solver indices)
manager = pywrapcp.RoutingIndexManager(num_nodes, num_vehicles, depot_index)

# 2. Routing model
routing = pywrapcp.RoutingModel(manager)

# 3. Distance/cost callback
def distance_callback(from_idx, to_idx):
    from_node = manager.IndexToNode(from_idx)
    to_node = manager.IndexToNode(to_idx)
    return distance_matrix[from_node][to_node]

transit_idx = routing.RegisterTransitCallback(distance_callback)
routing.SetArcCostEvaluatorOfAllVehicles(transit_idx)

# 4. Add dimensions (capacity, time windows, etc.)
routing.AddDimension(transit_idx, 0, max_route_distance, True, "Distance")

# 5. Solve
params = pywrapcp.DefaultRoutingSearchParameters()
params.first_solution_strategy = routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC
solution = routing.SolveWithParameters(params)
```

**Dimensions** track cumulative quantities (distance traveled, time elapsed, load carried) along each route.

## Algorithm

1. **Initial solution**: PATH_CHEAPEST_ARC heuristic (greedy nearest-neighbor arc selection)
2. **Refinement**: Constraint programming search with local search moves
3. **Optional metaheuristics**: GUIDED_LOCAL_SEARCH, SIMULATED_ANNEALING, TABU_SEARCH

## Performance vs Other VRP Solvers

| Solver | Zero-gap instances (<76 nodes) | Gap at 318 nodes | Notes |
|--------|-------------------------------|-----------------|-------|
| OR-Tools | Yes | ~19% | Strong on small-medium |
| OptaPlanner | Larger gap | Better at scale | Better for dynamic/incremental |
| SaaS APIs (Google Maps RO) | Best | Best | Fastest deployment, pay-per-use |

(Source: singdata.com VRP comparison — MEDIUM confidence)

## Real-World Applications Found

- Logistics fleet loading: minimize vehicle count while respecting weight/volume limits
- Repair technician routing: assign technicians to home visits, minimize travel time
- E-commerce last-mile delivery: large-scale route optimization
- Google Maps Platform Route Optimization API (commercial product built on this solver)

## When to Use CP-SAT vs RoutingModel for Routing

- **RoutingModel**: purpose-built for VRP; handles large fleets and node counts efficiently
- **CP-SAT**: use for routing problems with complex business rules not expressible in VRP dimensions, or when the routing structure is embedded in a larger scheduling/assignment problem
