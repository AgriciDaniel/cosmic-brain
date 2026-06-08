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
