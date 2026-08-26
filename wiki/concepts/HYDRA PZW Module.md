---
type: concept
title: "HYDRA PZW Module"
created: 2026-06-09
updated: 2026-06-09
address: c-000239
tags:
  - concept
  - mes
  - hydra-8
  - module
  - hr
  - time-management
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[HYDRA 8 Function Catalog]]"
  - "[[HYDRA PZE Module]]"
  - "[[HYDRA LLE Module]]"
  - "[[HYDRA 8 Glossary]]"
sources:
  - "[[hydra-8-documentation]]"
complexity: intermediate
domain: "Manufacturing Execution Systems"
---

# HYDRA PZW Module — Personnel Time Management

**Code:** PZW (Personalzeitwirtschaft — Personnel Time Management)
**Versions:** 8.1, 8.2, 8.3
**Source:** `.raw/hydra/md/HYDRA_8_Documentation Oct 2020/Products/PZW_81/`

## Purpose

Calculates and evaluates personnel working time from raw PZE clock-in/clock-out records. Applies flexible shift models, compensation rules, absence management, and cost center allocation. PZE records raw events; PZW calculates the derived values (daily performance, overtime, flextime balances).

> [!note] PZE vs PZW distinction
> **PZE** (Time & Attendance) = raw clock data capture at terminals.
> **PZW** (Personnel Time Management) = calculation layer that applies shift models, rules, and targets to derive evaluated labor times, wage types, and balances.

## Functions (v8.1/v8.2)

| Code | Function | v8.1 | v8.2 |
|------|----------|------|------|
| PZW-BPZ | Evaluation of Labor Times | X | X |
| PZW-ESK | Escalation Messages for Personnel Time Management | X | X |
| PZW-EVV | Enhanced Compensation Rules | X | X |
| PZW-FAZ | Flexible Working Time | X | X |
| PZW-KSB | Cost Center Posting | X | X |
| PZW-PAP | Editing Functions/Reports PZW | X | X |
| PZW-PLS | Personnel/Wage Type Statistics | X | X |
| PZW-PZP | Personnel Scheduling | X | X |
| PZW-WFG | Workflow for Absence Requests | X | X |
| PZW-ZNW | Time Sheets and Time Sheet Archiving | X | X |

## Key Concepts

- **Settlement date** — which logical "workday" a posting belongs to; especially important for night shifts crossing midnight. PZW's settlement date is the authoritative reference for cross-module consistency (see [[HYDRA 8 Glossary]] → EvaluationDate)
- **Daily personal performance** — PZW's core output: per-person daily record with worked time, overtime, flextime balances, and assigned wage types
- **Flexible working time** (PZW-FAZ) — handles variable shift start/end, time accounts, gliding time
- **Cost center posting** (PZW-KSB) — allocate working time to cost centers; required for HR system integration
- **Absence workflows** (PZW-WFG) — approval workflows for leave requests

## Integration

- **PZE** provides raw clock events; PZW processes them into daily performances
- **LLE** uses PZW's labor time data (attendance times) as input for incentive wage calculations
- **BDE** personnel postings are aligned to PZW settlement dates for labor time comparison (SIS-APB)
- **EIS/SAP-HRZW** — PZW to SAP HR time management interface
