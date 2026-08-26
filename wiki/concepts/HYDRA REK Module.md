---
type: concept
title: "HYDRA REK Module"
created: 2026-06-09
updated: 2026-06-09
address: c-000242
tags:
  - concept
  - mes
  - hydra-8
  - module
  - quality
  - complaints
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[HYDRA 8 Function Catalog]]"
  - "[[HYDRA CAQ Module]]"
  - "[[HYDRA FEP Module]]"
sources:
  - "[[hydra-8-documentation]]"
complexity: intermediate
domain: "Manufacturing Execution Systems"
---

# HYDRA REK Module — Complaint Management

**Code:** REK (Reklamationsmanagement — Complaint Management)
**Versions:** 8.1, 8.2
**Source:** `.raw/hydra/md/HYDRA_8_Documentation Oct 2020/Products/REK_81/`

## Purpose

Manages customer and supplier complaints from initial entry through root-cause analysis, corrective actions, and cost tracking. Provides workflow-driven 8D-style processes and integrates with CAQ quality data for automated complaint generation.

## Functions (v8.1/v8.2)

| Code | Function |
|------|----------|
| REK-EVA | Entry / Management / Analysis of Complaints |
| REK-AER | Automatic Generation of Complaints |
| REK-EVF | Forms Creation/Management |
| REK-ESK | REK Escalation Messages |
| REK-MRM | Monitoring of Complaint Management |
| REK-FSM | Failure Mode Analysis/Tracing of Measures |
| REK-ARK | Evaluations on Complaint Costs |
| REK-HWM | Workflows for Complaint Management |

## Key Capabilities

- **Complaint entry and analysis** (REK-EVA) — structured complaint records with defect classification, responsible parties, deadlines
- **Automatic complaint generation** (REK-AER) — creates complaints automatically when quality limits are exceeded in FEP/WEP
- **Failure mode analysis + measures** (REK-FSM) — FMEA-style root cause and corrective action tracking
- **Cost evaluation** (REK-ARK) — track complaint-related costs (rework, scrap, returns)
- **Workflow engine** (REK-HWM) — configurable approval and escalation workflows for complaint resolution
- **Monitoring** (REK-MRM) — dashboard showing open complaints, overdue actions, resolution rates

## Integration

- **CAQ** — shares defect catalogs, quality master data, and failure mode libraries
- **FEP/WEP** — quality exceedances can auto-trigger REK complaints via REK-AER
- **SIS** escalation framework used for REK-ESK notifications
