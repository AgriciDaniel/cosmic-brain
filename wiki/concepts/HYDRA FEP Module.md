---
type: concept
title: "HYDRA FEP Module"
created: 2026-06-09
updated: 2026-06-09
address: c-000240
tags:
  - concept
  - mes
  - hydra-8
  - module
  - quality
  - inspection
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[HYDRA 8 Function Catalog]]"
  - "[[HYDRA CAQ Module]]"
  - "[[HYDRA WEP Module]]"
sources:
  - "[[hydra-8-documentation]]"
complexity: intermediate
domain: "Manufacturing Execution Systems"
---

# HYDRA FEP Module — In-Production Inspection

**Code:** FEP (Fertigungsbegleitende Prüfung — In-Production / Accompanying Inspection)
**Versions:** 8.1, 8.2
**Source:** `.raw/hydra/md/HYDRA_8_Documentation Oct 2020/Products/FEP_81/` — 17 files, up to 280KB

## Purpose

Statistical process control and quality recording during the production process. Captures measurement data at operations, applies control charts (SPC), manages inspection plans for both in-process and initial sample inspections. Distinct from CAQ (which handles quality system configuration and master data) — FEP is the runtime data collection layer.

## Functions (v8.1/v8.2)

| Code | Function |
|------|----------|
| FEP-PPF | Inspection Planning for In-Process Inspections (280KB — main planning doc) |
| FEP-EPF | Expanded Inspection Planning/Inspection Steps |
| FEP-FPF | Family Inspection Planning |
| FEP-AFP | In-Process Inspection Reports |
| FEP-RKH | Standard Control Charts and Histograms |
| FEP-ERH | Extended Control Charts and Histograms |
| FEP-FSM | Failure Mode Analysis/Measure Tracking |
| FEP-ARC | Archiving of FEP Data |
| FEP-PPE | Inspection Planning of Initial Sample Inspections (204KB) |
| FEP-EPE | Extended Inspection Planning for Initial Sample Inspection |
| FEP-AFE | Initial Sample Inspection Reports |
| FEP-MVE | Failure Mode Analysis/Measures Tracking |
| FEP-PLP | Production Control Plan |
| FEP-EVF | Creating/Managing Forms |
| FEP-ESK | Escalation Messages for FEP |
| FEP-NES | — |
| FEP-QSS (v8.2) | qs-STAT Interface for In-Production Inspections |

## Key Capabilities

- **Inspection Planning** — define when, where, and how to measure (frequency, sample sizes, control limits)
- **Initial Sample Inspections** (FEP-PPE/EPE/AFE) — PPAP/first-article inspection workflow
- **Control Charts** (FEP-RKH/ERH) — real-time SPC with standard and extended chart types (Xbar-R, CUSUM, etc.)
- **Production Control Plan** (FEP-PLP) — AIAG control plan format linking inspection characteristics to operations
- **qs-STAT Interface** (v8.2) — export data to Q-DAS/qs-STAT for external SPC analysis

## Relationship to CAQ and WEP

- **CAQ** defines quality master data, catalogs, and system-level QM configuration
- **FEP** performs in-process inspections during production
- **WEP** performs incoming goods receipt inspections
- All three share CAQ master data (characteristics, methods, assessment catalogs)
