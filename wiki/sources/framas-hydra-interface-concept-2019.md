---
type: source
address: c-000340
title: "Framas HYDRA Interface Concept (2019, MPDV)"
created: 2026-07-13
updated: 2026-07-13
tags:
  - source
  - hydra
  - framas
  - winline
  - mes
  - erp-integration
status: current
related:
  - "[[Framas]]"
  - "[[MPDV HYDRA]]"
  - "[[Mesonic WinLine]]"
  - "[[Framas HYDRA EIS-DBI Interface]]"
  - "[[HYDRA EIS Module]]"
raw_source: ".raw/softage/md/20190521_FRAM_GK_INTERFACES.md"
---

# Framas HYDRA Interface Concept (2019, MPDV)

**Doc:** "Implementation of HYDRA at framas — Interface Concept", v1, 21.05.2019
**Author:** Michael Weiß, MPDV Mikrolab GmbH
**File:** FRAM_GK_INTERFACES.docx

First-pass interface spec from the MPDV/framas/Mesonic workshop (08.05.2019, Pirmasens). Defines which standard HYDRA interfaces bridge ERP WinLine and MES HYDRA at [[Framas]]. Bilingual (project language English, docs also in German). Superseded/detailed further by [[Framas WinLine-HYDRA Schnittstelle Konzept (SOFTAGE)|the SOFTAGE concept]] that followed.

## Stakeholders

- Framas: Kai Frank, Sascha Berger, Fabian Sprau
- Mesonic (WinLine supplier): Roman Gaidies
- MPDV: Michael Weiß (author)

## Scope Decision: DB Interface, Not File-Based

Central design choice: use HYDRA's **database interface (EIS-DBI)** instead of the file-based variant. File generation is turned off during interface setup — all data moves through SQL staging tables instead.

## Four Interfaces Defined

| ID | Interface | Direction | License |
|----|-----------|-----------|---------|
| FRAM-002 | EIS-DBI — database interface | infra | EIS-DBI |
| FRAM-003 | EIS-ERP + EIS-EZI — order/operation download | ERP → HYDRA | EIS-ERP, EIS-EZI |
| FRAM-004-001 | EIS-ERP + EIS-EZI — timeticket upload | HYDRA → ERP | (same) |
| FRAM-004-002 | EIS-EFD — detailed scheduling data | HYDRA → ERP | EIS-EFD |

Plus **BDE-APF** (parallel/alternative sequence processing) — licensed but flagged as not yet in project scope at time of writing.

## FRAM-002: EIS-DBI Database Interface

Customer (framas) gets direct SQL access to HYDRA's staging tables for inbound/outbound transfer — insert/read only; **no access to application tables**. External system (WinLine) must synthesize the control records HYDRA would normally generate itself.

- Inbound (ERP→HYDRA): segments → `HYSAP_INBOUND_DATA`, control record → `HYSAP_INBOUND_CTRL`, then HYDRA's Dispatcher picks it up.
- Outbound (HYDRA→ERP): HYDRA writes to `HYSAP_INBOUND_DATA` (sic — same table family) with `DS_STATUS` progressing 000 → 100 → 099, then a record lands in `HYSAP_OUT_CTRL`.
- MLE-inbound archived after 2 days, deleted after 7 (configurable per message type during test phase).

Full table schemas defined later in [[Framas WinLine-HYDRA Schnittstelle Konzept (SOFTAGE)]].

## FRAM-003: Order/Operation Download (ERP → HYDRA)

Message type `HY72PPS`, segment tree: order header → long texts / user fields → operation sequence → per-operation (data, components, PRT/resources, documents, long texts, user fields, MPL-RF data) → production variants.

- **INFO FRAM-003-001-002**: order sequences (master + parallel) must be supplied per-order; HYDRA needs both to process parallel sequences correctly.
- **CONFIG FRAM-003-002-001 (BAPINOUPDATE)**: when HLS (graphic scheduling) is in use, the interface must be configured to protect fields like planned workplace from being clobbered by re-imports — otherwise a re-sent operation kicks a planned job back into the pool.

## FRAM-004: Upload (HYDRA → ERP)

- **004-001 Timeticket** (`HY72ADRCK_TT`): yield/scrap quantities + times per operation, one record per terminal booking — no aggregation. Message: `HY72ADRCK_TT`.
- **004-002 Detailed planning data** (EIS-EFD, `HY72ADRCK_SC`-family): three logging-configuration events — `HLS/EINPLANEN` (planned), `HLS/UMPLANEN` (reallocated), `HLS/AUSPLANEN` (deallocated). Requires HYDRA-side logging config per event.

## Parallel Sequences (BDE-APF)

Open questions resolved inline by Weiß (20.05.2019):
- Can an order *start* with a parallel sequence? Yes, if data is complete/correct.
- Can an order have multiple parallel sequences? Yes.

This groundwork (parallel/alternative sequences, master-folge = 0) is the basis for the fuller [[Framas HYDRA EIS-DBI Interface|Arbeitsgangnummer / Folgennummer encoding]] worked out in the SOFTAGE concept.

## Relation to Other Sources

- Generic HYDRA EIS module functions (EIS-ERP/EZI/EFD/DBI) are cataloged vendor-side in [[HYDRA EIS Module]] — this doc is the concrete framas application of that catalog.
- The technical follow-on (2019-2021, SOFTAGE) is [[Framas WinLine-HYDRA Schnittstelle Konzept (SOFTAGE)]] — it implements FRAM-002/003/004 as designed here, plus adds the delivery-date-calculation layer that isn't mentioned at all in this earlier doc.
