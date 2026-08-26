---
type: concept
title: "HYDRA MPL Module"
created: 2026-05-26
updated: 2026-05-26
address: c-000171
tags:
  - concept
  - mes
  - logistics
  - materials
  - lots
  - hydra
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[HYDRA BDE Module]]"
  - "[[HYDRA MDE Module]]"
  - "[[hydra-cuthdb-data-model]]"
sources:
  - "[[hydra-cuthdb-data-model]]"
complexity: intermediate
domain: "Manufacturing Execution Systems"
---

# HYDRA MPL Module

**Product group:** MPL (Material-/Produktionslogistik — Material & Production Logistics)
**Tables:** 22
**Pages:** 547-613

## Purpose

MPL manages material flow and production logistics on the shop floor. It handles lots/batches, material buffers, material types, production planning events, and the relationships between materials and production orders.

## Core Domains

### Lot/Batch Management (`los_*`, `event_los`)
- **event_los** — Batch events (8 pages): every batch state change is recorded here. **Archive:** `a_event_los`, **Reload:** `r_event_los`
- **los_bestand** — Batch inventory/master data (9 pages)
- **los_status** — Batch status definitions and state machine
- **los_attribute** — Batch attributes (3 pages): configurable properties for batch classification
- **los_zuordnung** — Batch assignments: linking batches to orders, materials, or resources
- **r_los_zuordnung** — Batch assignment reload table

### Material Management (`mat_*`, `material_*`)
- **mat_matpuf** — Material buffer definitions: intermediate storage locations
- **mat_mattyp** — Material type definitions
- **mat_puffer** — Buffer/time window definitions for material flow
- **mat_verw_einschr** — Material usage constraints
- **mat_zul_ein_material** — Allowed input materials (BOM-type relationship)
- **material_arten** — Material types/categories (3 pages)

### Events (`event_mlb`, `event_pp`)
- **event_mlb** — Material logistics events (7 pages): tracks material movements and status changes
- **event_pp** — Production planning events (8 pages): records production planning state changes

### Supporting Tables
- **hyd_vwe_stat** — Processing statistics (2 pages)
- **hz_atgen** — Frequency/cycle type generation (2 pages)
- **hz_tpe** — Frequency/cycle type (2 pages)
- **hz_typen** — Frequency/cycle type definitions
- **lbz_term_zuord** — Long-term schedule assignments (4 pages)
- **mlst_hy** — Milestone HYDRA references (5 pages)
- **mpl_beziehungen** — MPL relationships (2 pages): defines connections between logistics entities
- **mpl_setup** — MPL configuration (2 pages)
