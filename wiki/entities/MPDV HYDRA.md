---
type: entity
title: "MPDV HYDRA"
created: 2026-05-26
updated: 2026-05-27
address: c-000162
tags:
  - entity
  - mes
  - manufacturing
  - database
  - german-software
status: developing
related:
  - "[[hydra-cuthdb-data-model]]"
  - "[[hydra-8-documentation]]"
  - "[[HYDRA 8 Function Catalog]]"
  - "[[HYDRA 8 Glossary]]"
  - "[[HYDRA KERNEL Module]]"
  - "[[HYDRA BDE Module]]"
  - "[[HYDRA MDE Module]]"
  - "[[HYDRA CAQ Module]]"
sources:
  - "[[hydra-cuthdb-data-model]]"
  - "[[hydra-8-documentation]]"
entity_type: product
role: "Manufacturing Execution System (MES)"
first_mentioned: "[[hydra-cuthdb-data-model]]"
---

# MPDV HYDRA

**Vendor:** MPDV Mikrolab GmbH
**Product:** HYDRA Manufacturing Execution System
**Document versions:** HYDRA 8 functional docs (October 2020) + CUT-HDB data model (February 2021)

## What Is HYDRA

HYDRA is a comprehensive Manufacturing Execution System (MES) developed by MPDV Mikrolab GmbH, a German industrial software company. It covers the full manufacturing execution lifecycle from production data collection and machine monitoring through quality assurance, personnel time tracking, and access control. The system is documented across two major sources: the CUT-HDB database schema ([[hydra-cuthdb-data-model]], 846 pages, ~800 tables) and the HYDRA 8 functional documentation ([[hydra-8-documentation]], 1,557 files, ~200 function documents across 23 product modules).

## Module Architecture

HYDRA is organized into 14 product groups, each a functional module with its own database schema namespace:

### Core & Infrastructure
- [[HYDRA KERNEL Module|KERNEL]] (65 tables) — System core: event engine, user management, terminals, logging, printing, licensing, dialog framework, number ranges
- [[HYDRA HLS Module|HLS]] (6 tables) — Graphic shop floor scheduling with shift/assignment time management

### Production Execution
- [[HYDRA BDE Module|BDE]] (40 tables) — Production data collection (Betriebsdatenerfassung): work plans, orders, quantities, status tracking, scrap reasons
- [[HYDRA MDE Module|MDE]] (17 tables) — Machine data collection (Maschinendatenerfassung): machine statuses, events, cycles, counters, downtime tracking
- [[HYDRA MPL Module|MPL]] (22 tables) — Material/production logistics: lots/batches, materials, buffers, production planning events

### Quality
- [[HYDRA CAQ Module|CAQ]] (82 tables) — Computer-Aided Quality: inspections, FMEA, control plans, assessment catalogs, dynamic sampling, SPC integration
- [[HYDRA ANALYSIS Module|ANALYSIS]] (11 tables) — Statistical process control and analytics data pool
- [[HYDRA PDV Module|PDV]] (31 tables) — Process data visualization: measurement channels, tags, SPC, process parameters

### Human Resources
- [[HYDRA PZE Module|PZE]] (58 tables) — Personnel time recording (Personalzeiterfassung): attendance, absences, wage types, time accounts, shift rhythms
- [[HYDRA LLE Module|LLE]] (12 tables) — Performance-based pay (Leistungslohnerfassung): wage type determination, time tickets, bonuses
- [[HYDRA PEP Module|PEP]] (4 tables) — Personnel and production planning: machine scheduling, qualifications

### Integration & Infrastructure
- [[HYDRA MLE Module|MLE]] (11 tables) — SAP integration (Manufacturing Logistics Execution): distribution models, IDoc inbound/outbound, logical systems
- [[HYDRA WRM Module|WRM]] (21 tables) — Tool and resource management (Werkzeug-/Ressourcenmanagement): resources, maintenance, BOMs, status booking
- [[HYDRA ZKS Module|ZKS]] (91 tables) — Access control (Zutrittskontrollsystem): badges, zones, calendars, access groups, time zones

## Key Design Decisions

1. **Module-specific table prefixes** (`caq_*`, `pze_*`, `bde_*`, `zks_*`) create namespace isolation within a single database
2. **Event-driven architecture** — `event_*` tables record state changes across modules (event_adea, event_mde, event_los, event_res)
3. **Archive/reload pattern** — Operational tables have `a_*` and `r_*` variants for data lifecycle management
4. **PDM traceability** — Every column maps back to the logical data model via PDM field IDs
5. **Common audit trail** — Every table carries creation/last-edit timestamps and user references
6. **Mixed key strategy** — Natural business keys for domain lookup, technical serial keys for referential integrity
7. **Multi-entity support** — Company (`firma_nr`) and company type fields enable multi-tenant deployment

## Database Scale

- ~800+ tables across 14 modules
- Largest modules: ZKS (91), CAQ (82), KERNEL (65), PZE (58)
- Smallest modules: HLS (6), PEP (4)
- Heavy use of `decimal(18,6)` for manufacturing quantities
- `char(n)` dominant for identifiers rather than `varchar`
- PostgreSQL-compatible types (serial, bigserial, smallint)
