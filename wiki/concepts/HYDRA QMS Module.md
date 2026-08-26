---
type: concept
title: "HYDRA QMS Module"
created: 2026-06-09
updated: 2026-06-09
address: c-000244
tags:
  - concept
  - mes
  - hydra-8
  - module
  - quality
  - sap-integration
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[HYDRA 8 Function Catalog]]"
  - "[[HYDRA CAQ Module]]"
  - "[[HYDRA EIS Module]]"
sources:
  - "[[hydra-8-documentation]]"
complexity: intermediate
domain: "Manufacturing Execution Systems"
---

# HYDRA QMS Module — Quality Management Sub System

**Code:** QMS (Quality Management Sub System)
**Versions:** 8.1, 8.2
**Source:** `.raw/hydra/md/HYDRA_8_Documentation Oct 2020/Products/QMS_81/`

## Purpose

Acts as a QM sub-system bridge to SAP QM. HYDRA collects quality data (via FEP/WEP/CAQ); QMS packages and transfers that data to SAP's QM module using the QM-IDI (Quality Management IDoc Interface). Enables organizations with SAP QM as their authoritative quality system to use HYDRA for shop-floor data collection while maintaining SAP as the master.

## Functions (v8.1/v8.2)

| Code | Function |
|------|----------|
| QMS-SQM | Quality Management Sub System to SAP QM |
| QMS-ARC | QM Sub System Data Archiving |
| QMS-ESK | QM Sub System Escalation Messages |
| QMS-AQS | Evaluations in the QM Sub System |
| QMS-EVF | Forms Creation/Management |

## Key Characteristics

- Thin module compared to FEP/CAQ — primarily an **integration adapter** rather than a standalone quality system
- Relies on the **QM-IDI** interface (also accessible via EIS SAP-QMIDI)
- Enables bidirectional data flow: inspection plans from SAP → HYDRA; inspection results HYDRA → SAP

## Relationship to Other Modules

- **CAQ/FEP/WEP** — provide the quality data that QMS transfers to SAP
- **EIS SAP-QMIDI** — the underlying SAP QM IDoc interface
- **MLE** — QMS is part of the SAP integration layer alongside MLE (PP), EIS (HR, PM, etc.)
