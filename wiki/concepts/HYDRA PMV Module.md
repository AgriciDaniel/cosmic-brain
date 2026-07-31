---
type: concept
title: "HYDRA PMV Module"
created: 2026-06-09
updated: 2026-06-09
address: c-000243
tags:
  - concept
  - mes
  - hydra-8
  - module
  - quality
  - test-equipment
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[HYDRA 8 Function Catalog]]"
  - "[[HYDRA CAQ Module]]"
  - "[[HYDRA WRM Module]]"
sources:
  - "[[hydra-8-documentation]]"
complexity: intermediate
domain: "Manufacturing Execution Systems"
---

# HYDRA PMV Module — Gage Management / Test Equipment Management

**Code:** PMV (Prüfmittelverwaltung — Test Equipment Management)
**Versions:** 8.1, 8.2
**Source:** `.raw/hydra/md/HYDRA_8_Documentation Oct 2020/Products/PMV_81/`

## Purpose

Manages the lifecycle of measuring instruments and test equipment: calibration planning, tracking calibration status, recording calibration results, and preventing use of out-of-calibration equipment. Equivalent to ISO 10012 / VDA 5 gage management requirements.

## Functions (v8.1/v8.2)

| Code | Function | v8.1 | v8.2 |
|------|----------|------|------|
| PMV-SVP | Master Data / Management of Test Equipment | X | X |
| PMV-PPK | Inspection Planning for Calibrations | X | X |
| PMV-EPK | Advanced Inspection Planning for Calibrations | X | X |
| PMV-APM | Evaluations on Gage Management | X | X |
| PMV-EVF | Creation / Management of Forms | X | X |
| PMV-ESK (v8.2) | Escalation Management for PMV | — | X |

## Key Capabilities

- **Master data management** (PMV-SVP) — gage register with calibration intervals, responsible parties, location tracking
- **Calibration inspection plans** (PMV-PPK/EPK) — define what measurements to perform during calibration and acceptance criteria
- **Calibration history** — full audit trail of calibration events and results
- **Escalation** (v8.2, PMV-ESK) — notify responsible parties when calibration is due or overdue
- **Evaluations** (PMV-APM) — reports on calibration status, overdue gages, calibration cost

## Relationship to WRM

WRM manages production tooling (molds, fixtures, cutting tools); PMV manages measuring instruments. Both track usage cycles and maintenance/calibration intervals. Both can use the HYDRA Maintenance Calendar (WWR function).

## Relationship to CAQ/FEP

FEP and WEP inspection results reference specific gages. PMV ensures the referenced gage is calibrated at the time of measurement — a traceability requirement for ISO 9001 / IATF 16949.
