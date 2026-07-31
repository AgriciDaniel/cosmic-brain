---
type: source
address: c-000341
title: "Framas WinLine-HYDRA Schnittstelle Konzept (SOFTAGE)"
created: 2026-07-13
updated: 2026-07-13
tags:
  - source
  - hydra
  - framas
  - winline
  - mes
  - erp-integration
  - softage
status: current
related:
  - "[[Framas]]"
  - "[[SOFTAGE]]"
  - "[[MPDV HYDRA]]"
  - "[[Mesonic WinLine]]"
  - "[[Framas HYDRA EIS-DBI Interface]]"
  - "[[Framas Delivery Date Calculation]]"
  - "[[Framas HYDRA Interface Concept (2019, MPDV)]]"
raw_source: ".raw/softage/md/Konzept_HYDRA_MES_Schnittstelle_V108.md"
---

# Framas WinLine-HYDRA Schnittstelle Konzept (SOFTAGE)

**Doc:** "Konzept Schnittstelle WinLine ERP zu HYDRA MES", v1.08
**Vendor:** SOFTAGE GmbH (WinLine implementation partner) — see [[SOFTAGE]]
**Span:** 05.08.2019 (workshop basis) through 04.01.2021 (last revision in this version)

Full build spec for the ERP↔MES bridge sketched in [[Framas HYDRA Interface Concept (2019, MPDV)|the 2019 MPDV interface concept]]. Two large sub-systems documented in depth, split into their own concept pages:

1. **[[Framas HYDRA EIS-DBI Interface]]** — the technical wire protocol: EIS-DBI staging tables, `HY72PPS`/`HY72ADRCK_SC`/`HY72ADRCK_TT` message types, MES-Auftragsnummer encoding, parallel-sequence (Folgennummer) mapping from WinLine BOM structure.
2. **[[Framas Delivery Date Calculation]]** — Priority Matrix, the RTD/RTC/LTD/LTC/LTDF/LTDB/CSD/ETD/ETC field set, and the two-pass calculation (order entry vs. HYDRA feedback).

This page covers project framing, tech stack, and the pieces that don't belong in either sub-page.

## Project Framing

framas runs Mesonic WinLine but does **not** do production fine-scheduling in WinLine PPS — that's the reason for introducing HYDRA MES, rolled out in phases across framas's production sites. Phase 1 priority 1 goal: a working production-order interface ERP↔MES.

**Reference docs cited throughout:**
- `FRAM_interface_datamapping_17052019_Ergaenzung_23072019.xlsx`
- `20190521_FRAM_GK_INTERFACES.pdf` ([[Framas HYDRA Interface Concept (2019, MPDV)]])
- `EIS-DBI_30 de.pdf`, `EIS-EFD_81 de.pdf`, `EIS-EP_81 de.pdf`

## Tech Stack (SOFTAGE Implementation)

- **.NET Framework** (2.0 and 4.6) — SOFTAGE .NET Framework for app control + object-based Mesonic data access; COM technology wraps the interface app for WinLine integration
- **MS SQL Server** (2005+) — SOFTAGE SQL Framework (functions/procs/views) over Mesonic WinLine data; separate application DB for settings/logs
- **Mesonic MDP / object model** — UI extension (buttons, CTK/window/system scripts) + table extension via MDP2 (see [[WinLine MDP Module]], [[WinLine MDP Database Extensions]])
- **Error handling**: SQL log table, callable from config app and from WinLine itself; NLOG component for user-defined error notification

This is a materially different integration mechanism from [[WinLine WebServices Integration]] (Type 40/42 REST bridge) documented elsewhere in this wiki — see the cross-reference note on that page. This concept writes directly into EIS-DBI SQL staging tables via a SOFTAGE-built COM/MDP app, not through WinLine's WebServices application layer.

## People (SOFTAGE)

| Name | Role | Contact |
|------|------|---------|
| Tobias Forbrich | Project lead + developer | tf@softage.de |
| Emanuel Wimmer | WinLine PPS contact | ew@softage.de |
| Hubert Foidl | Delivery-date-calculation subproject | hf@softage.de |

See [[SOFTAGE]] entity page.

## framas Contacts

| Name | Role |
|------|------|
| Kai Frank | Senior IT Manager, overall project contact |
| Fabian Sprau | PPIC manager, HYDRA MES + WinLine PPS key user |
| Sascha Berger | Project lead |

## Phase 1 / Priority 1 Scope

- **ERP → MES**: export production order (steps + activities, sequence/parallel-folge data)
- **MES → ERP**: import scheduled dates into operations/production order/customer order; set a status field for sales ("Kundenterminbestätigung" / customer date-confirmation process)

## New ERP Tables/Columns (MDP2)

Reference doc: `WL interface – calculations.xlsx`. Full field-by-field detail lives in [[Framas Delivery Date Calculation]]; summary of what got added to WinLine's schema:

- **Kundenstamm (customer master)**: Versandtage (shipping days, multi-select Mon–Sun)
- **Artikelstamm (item master)**: Marke/Brand (fixed drilldown)
- **New table T697 "Positionsinformationen"**: 17 columns — all the delivery-date fields (RTD/RTC/LTC/LTDF/LTDB/LTCB/CSD/ETD/CDDD/CDDC/RTDA + Order Type + Item Type + Kommentar), linked 1:1 to order line via `Position GUID`
- **Kundenauftrag (customer order line, T026)**: ETC, LTD, Status MES Interface, Status MES Datum, Tatsächlicher Produktionsbeginn, Positions GUID (FK to T697)
- **New table T680 "Priority Matrix"**: Brand × VoucherType × OrderType × ItemType → LT[days] × Priority
- **New table T681 "Specific Event-Priority"** + **T682 "Priority Classification"**: per-article/customer date-window priority overrides
- **Produktionsauftrag (production order, T324)**: Status MES Interface, Status MES Datum, Aktuelles/Ursprüngliches MES ETC, TID MES (transaction-ID FK to `HYSAP_INBOUND_CTRL`)
- **New Belegarten (voucher types)**: 3-digit code — 1st digit domestic(1)/oversea(3), 2nd digit claim(2)/order(3), 3rd digit sample(2)/production(3). E.g. `333` = oversea production order.
- **Belegkopftext 3 (RSM)**: shipping method — Sea / Air / Land

## Statusspalten (both T026 order-line and T324 production-order tables)

**Schnittstelle (interface) status:**

| Value | Meaning |
|---|---|
| 0 | none/new — not yet transferred |
| 1 | export done |
| 2 | feedback received |
| 99 | error |

**Termin (date/schedule) status:**

| Value | Meaning |
|---|---|
| 0 | none/new |
| 1 | fine-scheduling done |
| 2 | rescheduled |
| 3 | de-scheduled (back to group pool) |

## Doc Structure / Not Yet Ingested

The doc ends with an open "Fragen und Aufgaben" table (framas to answer yellow-highlighted questions + approve the concept) — status blank in this version, i.e. approval wasn't recorded as of v1.08. "Weitere Phasen" (later phases, explicitly out of scope here) across three places in the doc: technical implementation of calculations, sales-cockpit UI, WinLine-CRM process integration; material/component provisioning; document provisioning; IST-quantity feedback.

## Version History Highlights

| Date | Change |
|---|---|
| 2019-08-05/07 | Initial draft from 23.07.2019 Pirmasens workshop |
| 2019-08-14 | Extensions from customer email + call |
| 2019-08-26 | Delivery-date-calc detail concept (Foidl); feldlänge fix for MES Auftragsnummer (8 chars, truncate/pad) |
| 2019-08-29–09-09 | Belegart→Auftragsart/Priorität mapping + misc |
| 2019-11-04 | Auftragsnummer field lengths extended (new Folge/Splitnummer fields) |
| 2019-11-14 | BOM structure + Arbeitsfolgen derivation visualized (Beispielstückliste WM78) |
| 2019-12-05, 2020-06-04, 2020-06-29 | Delivery-date-calc extensions (TELKO 27.11.2019, Specific Event Priority, calc-logic extension) |
| 2020-02-17 | Add Artikelgruppenbezeichnung / Hauptartikelnummer |
| 2021-01-04 | Delivery-date columns moved off shared T026 to dedicated T697 to resolve conflict with existing framas-branch T026 columns |
