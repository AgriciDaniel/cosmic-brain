---
type: concept
title: "Framas HYDRA EIS-DBI Interface"
created: 2026-07-13
updated: 2026-07-13
address: c-000342
tags:
  - concept
  - hydra
  - framas
  - winline
  - eis-dbi
  - erp-integration
status: current
related:
  - "[[HYDRA EIS Module]]"
  - "[[MPDV HYDRA]]"
  - "[[Framas]]"
  - "[[Mesonic WinLine]]"
  - "[[Framas Delivery Date Calculation]]"
  - "[[Framas ExportOrder Implementation]]"
sources:
  - "[[Framas HYDRA Interface Concept (2019, MPDV)]]"
  - "[[Framas WinLine-HYDRA Schnittstelle Konzept (SOFTAGE)]]"
complexity: advanced
domain: "Manufacturing Execution Systems"
---

# Framas HYDRA EIS-DBI Interface

Concrete implementation of HYDRA's [[HYDRA EIS Module|EIS]] database interface (EIS-DBI) at [[Framas]], built by [[SOFTAGE]] to bridge [[Mesonic WinLine]] PPS and [[MPDV HYDRA]] MES. No files cross the wire — everything moves through four SQL staging tables that both sides poll/write directly.

## Why EIS-DBI over the file interface

Standard HYDRA order/timeticket interfaces (EIS-ERP + EIS-EZI for orders, EIS-EFD for scheduling feedback) normally ship as flat files. framas turned file generation off during interface setup and instead reads/writes the same logical segments as rows in SQL staging tables — this is what "EIS-DBI" (Interface based on databases) buys you. License required: **EIS-DBI**, plus **EIS-ERP + EIS-EZI** (order/op + timeticket) and **EIS-EFD** (detailed scheduling feedback). Optional **BDE-APF** for parallel/alternative sequence processing.

Trade-off called out explicitly in the source docs: EIS-DBI gives access to the *staging* tables only, never HYDRA's application tables — the external system (WinLine, via SOFTAGE's .NET/COM app) must synthesize the control records HYDRA would otherwise generate itself.

## The Four Staging Tables

| Table | Direction | Purpose |
|---|---|---|
| `HYSAP_INBOUND_DATA` | ERP → HYDRA | one row per segment of an outbound message |
| `HYSAP_INBOUND_CTRL` | ERP → HYDRA | one row per transaction (message); tracks line counts + status |
| `HYSAP_OUT_DATA` | HYDRA → ERP | one row per segment of a HYDRA-originated message |
| `HYSAP_OUT_CTRL` | HYDRA → ERP | one row per transaction; tracks line counts + status |

Every transaction gets a **Transaktionsnummer**: `DBLINK` + `YYYYMMDDHHMMSSsss` (e.g. `DBLINK20190509143210`). This ID links the `_DATA` rows to their `_CTRL` row, and (on export) gets written back into the WinLine production order's `TID MES` column for traceability.

### Segment status lifecycle (`ds_status`)

- Inbound (ERP writes): constant `000` on write; HYDRA's Dispatcher consumes it.
- Outbound (HYDRA writes): `000` → `100` (ERP picks up, processing) → `099` (ERP done); after `099`, ERP writes a control row into `HYSAP_OUT_CTRL`.

### Export flow (ERP → HYDRA)

1. Write all segment rows to `HYSAP_INBOUND_DATA`.
2. Write the control row to `HYSAP_INBOUND_CTRL` with `ds_status='000'`.
3. Segments within one message are processed **in order** — order matters for `HY72_AG_HD_001` (operations must arrive in production sequence).
4. Save the generated transaction ID back onto the WinLine production order. Re-exporting an order always overwrites the stored transaction ID with the newest one.

### Import flow (HYDRA → ERP)

1. HYDRA writes rows to `HYSAP_OUT_DATA` / `HYSAP_INBOUND_DATA` (message-dependent) with `ds_status='000'`.
2. ERP-side interface sets `ds_status='100'` while processing, `'099'` when done.
3. ERP creates the `HYSAP_OUT_CTRL` row and links it via transaction ID.
4. Triggered manually from a "Einlesen aus MES" button in the WinLine PPS Leitstand (planned: could become a scheduled background job in a later phase).

Archiving: MLE inbound/outbound transactions archived after 2 days, purged after 7 (configurable per message type — loosened during test phase).

## Message Types (SAP iDoc Format)

The staging tables carry SAP iDoc-shaped payloads even though there's no SAP on either side — HYDRA's EIS layer is SAP-flavored by heritage.

| Message | Direction | Segment (relevant to Phase 1) |
|---|---|---|
| `HY72PPS` | ERP → HYDRA | Order/operation download (see below) |
| `HYADRCK_SC` / `HY72ADRCK_SC` | HYDRA → ERP | `HY72ADRCK_SCHEDULE` — fine-scheduling feedback |
| `HY72ADRCK_TT` | HYDRA → ERP | Timeticket (yield/scrap/time bookings) — captured in schema, not yet consumed by ERP logic in Phase 1 (mobile scanner covers quantity bookings instead) |

### HY72PPS segment tree (order download)

```
HY72_AU_HD_001_A       order header
├ HY72_AU_INFO_AI_001_A   long texts (only if article name > 40 chars)
├ HY72_AU_USRFLD_001_A    user fields (LTC, LTCB from delivery-date calc)
├ HY72_AFOLG_001_A        sequence folge (parallel/alt sequences)
├ HY72_AG_HD_001_A        operation — part 1
│ ├ HY72_AG_KOMPL_002_A     component list (materials) — open whether needed in Phase 1
│ └ HY72_AG_USRFLD_001_A    operation user fields (Artikelgruppe, Hauptartikelnummer, Größe)
└ HY72_FERTVAR_001_A      production variants
```

`_A` suffix on every segment = "Neuanlage" (create); this project phase never sends update/delete variants.

## MES Auftragsnummer — the addressing scheme

The whole interface hinges on encoding WinLine's order/operation hierarchy into a single HYDRA-legal identifier.

```
<Auftragsnummer 8 char><Folgennummer 1 char><Arbeitsgangnummer 4 char>
= ANR, e.g. 68841.0100400
```

- **AUNR (Auftragsnummer)**: `Kundenauftragsnummer.Zeilennummer`, truncated/padded to exactly 8 chars (longer values truncated left-aligned, shorter padded with trailing spaces).
- **Folgennummer**: `0` = Stammfolge (main sequence); parallel sequences numbered 1, 2, 3... No nested/geschachtelte parallel sequences supported.
- **Arbeitsgangnummer (AGNR)**: 4-digit, derived from WinLine's Arbeitsschritt (BOM level) + Tätigkeit-within-level sequence position — see derivation below.

Naming constraint that ripples into HYDRA master data (workplace/resource and order numbers): no lowercase, no spaces, no umlauts/special characters — because these values originate in WinLine and must round-trip.

## Deriving Arbeitsgangnummer from a WinLine BOM

This is the trickiest mapping in the whole spec, worth internalizing:

1. In WinLine, each **half-finished/finished good** in the BOM tree becomes an **Arbeitsschritt**. The end product is always Arbeitsschritt 1; sub-assemblies number upward from there by BOM depth.
2. **Production runs bottom-up** — so the interface **reverses** the Arbeitsschritt order when generating Arbeitsgangnummern (deepest sub-assembly first).
3. Within an Arbeitsschritt, **Tätigkeiten** (activities) run in the BOM's configured Reihenfolge (sequence number).
4. **Parallel folge detection**: if two BOM lines at the same level share the same Reihenfolgennummer, they represent parallel processes. The interface emits them as a numbered `AFOLG` (Folge), not inline in the Stammfolge.
5. Parallel folge entries carry an **Absprungtätigkeit** (jump-off activity, where the parallel branch splits) and **Rücksprungtätigkeit** (rejoin activity) — set as WinLine BOM text-column annotations, mapped to `ANRA`/`ANRR` in `HY72_AFOLG_001_A`.

Worked example in the source (Beispielstückliste WM78): end product 1112010001 has two parallel half-finished-good branches (HF02, HF03) both tagged Reihenfolge=1. Result: Folge 0 carries Spritzen Maschgr1 (AS3) + Spritzgießen (AS1); Folge 1 carries Spritzen Maschgr2 (AS2), jumping off/rejoining at the Folge-0 "Spritzen Maschgr1" step.

## Segment field notes worth remembering

- **`HY72_AG_HD_001_A`** carries mostly fixed/constant values in this phase (`OPT:MULTIMNR='N'`, `IMPFAKT=1`, `OPT:SPLIT='V'`, `MAXANZSPLIT=1000`, tolerance bands `MENGEPROZ:UNTLI=90` / `UEBLE=110`) — only a handful of fields are truly dynamic per order (quantities, ressourcegruppe, priority, rüstzeit, sollzyklus).
- **Rüstzeit/Sollzyklus** come from WinLine article-master zusatzfelder, stored in different units than HYDRA expects (seconds vs. seconds/1000) — explicit unit conversion required.
- **`HY72_AFOLG_001_A.AFOLG` must be `0` for a sequential (non-parallel) folge** — a footgun if you assume 0 means "no folge at all."
- **Component list (`HY72_AG_KOMPL_002_A`)** and PRT/resource segments are documented but explicitly marked "NOCH OFFEN OB IN AKTUELLER PROJEKTPHASE BENÖTIGT" (still open whether needed this phase) — MPL/TRT not used in framas Phase 1, components are informational only.

## Feedback: HY72ADRCK_SCHEDULE (HYDRA → ERP)

One record per scheduling event on an operation, keyed by the MES Auftragsnummer (`ANR`):

| Field | Meaning |
|---|---|
| `DATB`/`ZEIB` | scheduled start date/time → writes into Arbeitsschritt Start |
| `DATE`/`ZEIE` | scheduled end date/time → writes into Arbeitsschritt Ende |
| `AKTION` | `M`=eingeplant (set), `U`=umgeplant (reset), `G`=ausgeplant (clear back to pool) |

Three HYDRA-side logging configs gate when this fires: `HLS/EINPLANEN`, `HLS/UMPLANEN`, `HLS/AUSPLANEN`. Each write also updates the [[Framas Delivery Date Calculation|Statusspalten Termin]] field and (on `M`/`U`) the ETC-derived delivery date chain.

## Open items at time of writing (v1.08, still unresolved)

- Whether the component list segment (`HY72_AG_KOMPL_002_A`) is needed in Phase 1.
- Final user-field key naming (`U_FRAM` placeholder throughout — "noch nicht final festgelegt").
- Whether IST-quantity (timeticket) bookings get consumed at all in Phase 1, given the mobile scanner already covers quantity postings — current plan is to write IST quantities back into the WinLine Arbeitsschritt purely as a reconciliation signal against scanner-driven warehouse postings, not as the system of record.

## See also

- [[HYDRA EIS Module]] — the vendor-generic catalog this implementation draws from (EIS-ERP, EIS-EZI, EIS-EFD, EIS-DBI function codes)
- [[Framas Delivery Date Calculation]] — what the ERP does with the ETC once `HY72ADRCK_SCHEDULE` lands
- [[Framas ExportOrder Implementation]] — the .NET/framLib code that actually populates this spec's DTO tree and writes it to staging
- [[WinLine WebServices Integration]] — a separate, later-documented REST-based bridge for the same ERP↔HYDRA production-order goal; see the note on that page about how the two relate
