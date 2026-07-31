---
type: concept
title: "HYDRA EIS Module"
created: 2026-06-09
updated: 2026-06-09
address: c-000247
tags:
  - concept
  - mes
  - hydra-8
  - module
  - sap
  - integration
  - erp
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[HYDRA 8 Function Catalog]]"
  - "[[HYDRA MLE Module]]"
  - "[[HYDRA SIS Module]]"
  - "[[HYDRA 8 Glossary]]"
  - "[[Framas HYDRA EIS-DBI Interface]]"
sources:
  - "[[hydra-8-documentation]]"
complexity: advanced
domain: "Manufacturing Execution Systems"
---

# HYDRA EIS Module — Enterprise Integration Services

**Code:** EIS (Enterprise Integration Services)
**Version:** 3.0
**Source:** `.raw/hydra/md/HYDRA_8_Documentation Oct 2020/Products/EIS_30/`, `EIS_81/`, `EIS_82/`

## Purpose

Comprehensive SAP integration layer. While MLE handles core PP (Production Planning) order data exchange, EIS covers the broader SAP landscape: HR (time management, wages), PM (plant maintenance), PS (project system), MM (materials management), CO (controlling), and QM (quality management). Also provides interfaces to non-SAP ERP and wage systems.

## Functions

| Code | Function |
|------|----------|
| EIS-ERP | Interface to ERP Systems (generic) |
| EIS-EZI | Enhancement of Additional ERP Information |
| EIS-EFD | Enhancement of Detailed Scheduling Data to ERP |
| EIS-LUG | Interface to Wage and Salary Programs |
| EIS-MCL | Interface to Material and Batch Data |
| EIS-CES | HYDRA-CAQ Interface to ERP Systems |
| EIS-SDF | Master Data Transfer from Third-Party Systems |
| EIS-DBI | Customizing HYDRA (ERP integration config) |

## SAP-Specific Interface Modules

| Code | Interface |
|------|-----------|
| SAP-HRPDC | HYDRA ↔ SAP HR via HR-PDC |
| SAP-HRZW | HYDRA Time Management ↔ SAP HR |
| SAP-PPPDC | HYDRA ↔ SAP PP using PP-PDC |
| SAP-PPPDK | Correction functions for PP-PDC |
| SAP-PPREM | HYDRA ↔ SAP PP Serial Production |
| SAP-PPPI | HYDRA ↔ SAP PP-PI (process industry) |
| SAP-ISS | HYDRA Information Interface for SAP PP |
| SAP-PMCC3 | HYDRA ↔ SAP R/3 PM (plant maintenance, CC3) |
| SAP-PSCC4 | HYDRA ↔ SAP R/3 PS (project system, CC4) |
| SAP-MMMOB | HYDRA ↔ SAP MM (materials management) |
| SAP-COILV | HYDRA ↔ SAP CO ILV (internal labor allocation) |
| SAP-ESK | Escalation Messages for MLE/Fileport |
| SAP-QMIDI | HYDRA ↔ SAP QM using QM-IDI |

## EIS vs MLE

- **MLE** handles the standard PP-BDE connection: production orders down from SAP PP, confirmations back up. This is the default/core SAP integration path for most customers.
- **EIS** extends this to other SAP modules and non-SAP systems: HR, PM, PS, MM, CO, QM. Also handles the alternative PP integration paths (PPPI for process industry, PPREM for serial production).
- Both use SAP's **ALE/IDoc** infrastructure (see [[HYDRA 8 Glossary]] → SAP_ALE, SAP_IDOC).
- **SAP_BAPI** and **SAP_RFC** are the underlying connection technologies.

## Real-World Implementation: framas Kunststofftechnik

[[Framas HYDRA EIS-DBI Interface]] documents a concrete non-SAP EIS-DBI deployment: [[Framas]] uses EIS-DBI + EIS-ERP/EZI + EIS-EFD to bridge [[Mesonic WinLine]] (not SAP) to HYDRA, proving the EIS layer's SAP-iDoc message format (`HY72PPS`, `HY72ADRCK_SC`, `HY72ADRCK_TT`) is reused verbatim even when the external ERP isn't SAP. Confirms EIS-DBI's staging-table-only access model (no application-table access) and the ERP-side burden of synthesizing HYDRA's own control records.
