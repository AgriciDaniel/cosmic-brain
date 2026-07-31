---
type: entity
title: "SOFTAGE"
created: 2026-07-13
updated: 2026-07-13
address: c-000344
tags:
  - entity
  - company
  - winline
  - erp-integration
status: current
entity_type: company
role: "WinLine (Mesonic) implementation partner"
related:
  - "[[Framas]]"
  - "[[Mesonic WinLine]]"
  - "[[MPDV HYDRA]]"
  - "[[Framas HYDRA EIS-DBI Interface]]"
  - "[[Framas Delivery Date Calculation]]"
sources:
  - "[[Framas WinLine-HYDRA Schnittstelle Konzept (SOFTAGE)]]"
---

# SOFTAGE

**SOFTAGE GmbH** ("Ihr Partner für kaufmännische Softwarelösungen") — [[Mesonic WinLine]] implementation/development partner. Built the [[Framas HYDRA EIS-DBI Interface|WinLine↔HYDRA EIS-DBI interface]] and the [[Framas Delivery Date Calculation|delivery-date calculation engine]] for [[Framas]] Kunststofftechnik GmbH.

## Technology

- Microsoft .NET Framework (2.0 and 4.6) — SOFTAGE .NET Framework for app control + object-based Mesonic data access
- COM technology to wrap the interface app as a WinLine-integrated component
- MS SQL Server (2005+) — SOFTAGE SQL Framework (functions/procedures/views) over Mesonic data; separate application DB for config/logs
- Mesonic MDP/object model — UI extension (buttons, CTK/window/system scripts), table extension via MDP2
- NLOG for user-defined error notification on top of a SQL error-log table

## People

| Name | Role | Contact |
|---|---|---|
| Tobias Forbrich | Project lead, developer | tf@softage.de |
| Emanuel Wimmer | WinLine PPS specialist | ew@softage.de |
| Hubert Foidl | Delivery-date-calculation subproject lead | hf@softage.de |

## Known Engagement

**Konzept Schnittstelle WinLine ERP zu HYDRA MES** (2019-2021, v1.08) — see [[Framas WinLine-HYDRA Schnittstelle Konzept (SOFTAGE)]]. Follow-on implementation of the interface first scoped by MPDV Mikrolab in [[Framas HYDRA Interface Concept (2019, MPDV)]]. Scope: production-order download ERP→HYDRA, fine-scheduling feedback HYDRA→ERP, plus a delivery-date-calculation layer (Priority Matrix, RTD/LTD/ETC field chain) that MPDV's original concept didn't cover.
