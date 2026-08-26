---
type: concept
title: "HYDRA WRM Module"
created: 2026-05-26
updated: 2026-05-26
address: c-000175
tags:
  - concept
  - mes
  - maintenance
  - resources
  - tools
  - hydra
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[HYDRA MDE Module]]"
  - "[[HYDRA MPL Module]]"
  - "[[hydra-cuthdb-data-model]]"
sources:
  - "[[hydra-cuthdb-data-model]]"
complexity: intermediate
domain: "Manufacturing Execution Systems"
---

# HYDRA WRM Module

**Product group:** WRM (Werkzeug-/Ressourcenmanagement — Tool & Resource Management)
**Tables:** 21
**Pages:** 761-811

## Purpose

WRM manages tools, resources, and maintenance on the shop floor. It tracks resource inventory, status, assignments, maintenance orders, bills of materials (BOMs) for resources, and resource families/types. The module integrates with MDE for machine resource tracking and with ZKS for resource access control.

## Core Domains

### Resource Events (`event_res`)
- **event_res** — Resource events (8 pages): every resource state change, maintenance action, and assignment is recorded here. **Archive:** `a_event_res`, **Reload:** `r_event_res`

### Resource Master Data
- **res_bestand** — Resource inventory (6 pages): master data for all managed resources (tools, fixtures, gauges, etc.)
- **res_typen** — Resource types (3 pages): categorization of resources by type
- **res_familien** — Resource families (2 pages): grouping of similar resources
- **res_attribute** — Resource attributes: configurable properties

### Resource Status & Booking
- **res_status** — Resource status definitions (3 pages): possible states a resource can be in
- **res_status_assign** — Status assignments: which resources have which status (2 pages)
- **res_status_booking** — Status booking records (3 pages): audit trail of status changes
- **res_status_recording** — Status recording (3 pages): time-based status tracking
- **res_status_text** — Status text/description (2 pages)
- **res_status_type** — Status type definitions (2 pages)
- **res_status_zuord** — Status assignments (alternative mapping, 2 pages)
- **v_res_status_booking** — View of status bookings (3 pages): denormalized view for reporting

### Maintenance
- **res_wartungen** — Maintenance definitions (3 pages): scheduled maintenance plans for resources
- **res_massnahmen** — Maintenance actions/measures: what was done to a resource
- **res_belege** — Resource documents/receipts (3 pages): proof of maintenance, calibration certificates

### Resource Structure
- **res_stueckliste** — Resource BOM (bill of materials): component structure of complex resources
- **res_ress_typen** — Resource type definitions
- **res_ress_artikel** — Resource articles/items (overflow)
- **res_ress_belegung** — Resource assignments (2 pages): which resources are in use where
- **res_bedarfszuord** — Demand assignments: which production orders need which resources

### Machine DNC Integration
- **res_masch_dncfam** — Machine DNC (Direct Numerical Control) family assignments

## Multi-Tool / Multi-Mold Machines (meta-resource pattern)

A machine that physically holds several molds in slots is modeled as a **meta-resource** (the machine) with **subordinate tool resources** (the molds), not as many machines. Key `res_bestand` fields:

| Field (PDM ID) | Purpose |
|----------------|---------|
| `meta_res` (`RES.OPT:METARES`) | `J` = meta resource — "has resource list"; the machine carries a list of mounted tools (its slots) |
| `res_familie` (`RES.RESFAMID`) | resource family — group all molds of a pool under one id |
| `param_str_02` → `RES.TLGNEST` (**WRM-NEST**) | "Partitioning due to cavities" = cavity/slot management |
| `mit_anmelden` (`RES.OPT:AUTOANMELD`) | `J` = log resource on/off automatically with the OP (A_AN/A_AB); `N` = never (DNC); `E` = explicit, operator chooses |
| `mehrfach` (`RES.OPT:MULTIMNR`) | resource "can be logged on several times / simultan" |
| `leistgrad` (`RES.LEISTGRAD`) | rate of resource utilization in % |
| `plan_takte` (`RES.SGR:HUB`) | planned cycles within total life time |

Related functions: **WRM-NST** (Cavity Management), **WRM-BRW** (Required Resources/Tools), **HLS-BSR** (Assignment of Secondary Resources), **BDE-NBT** (Changed Partitioning Based on Cavities). The order↔tool occupancy lives in **`res_ress_belegung`** (`belegungsart`: `A`=order, `S`=lock, `W`=maintenance).

**Required resource (mold pool):** configured under *WRM → Master data → Required resources* — one logical resource standing for N actual molds; HYDRA picks an actual mold at logon. A tool's **partitioning = number of cavities** (Original/Current partitioning; option "Partitioning due to cavities" auto-calcs from cavity management). Full click-path: [[HYDRA Multi-Tool Resource Configuration]]. Q&A walkthrough: [[hydra-multi-mold-machine]].
