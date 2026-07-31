---
type: concept
title: "Framas ExportOrder Implementation"
created: 2026-07-13
updated: 2026-07-13T10:52:00
address: c-000345
tags:
  - concept
  - hydra
  - framas
  - winline
  - eis-dbi
  - erp-integration
  - framlib
  - decompilation
status: current
related:
  - "[[Framas HYDRA EIS-DBI Interface]]"
  - "[[Framas Delivery Date Calculation]]"
  - "[[SOFTAGE]]"
  - "[[Framas]]"
  - "[[Mesonic WinLine]]"
sources:
  - "framLib.dll (D:\\1.Framas_Apps\\Softage\\fVN\\framasClient\\)"
  - "MESHYDRALib.dll (same path)"
  - "SOFTAGE.XPO.Mesonic.dll (same path)"
  - ".raw/hydra/md/HYDRA_8_Documentation Oct 2020/Products/EIS_30/EIS-DBI_30.md"
  - ".raw/hydra/md/HYDRA_8_Documentation Oct 2020/Objects/MES-Order/OBJECT_MES-Operation_TI_SeqList.md"
complexity: advanced
domain: "Manufacturing Execution Systems"
---

# Framas ExportOrder Implementation

Code-level trace of [[Framas HYDRA EIS-DBI Interface|the EIS-DBI spec]] as actually built: decompilation of `framLib.MES.MESInterface.ExportOrder` and the DTO/serialization layer it populates. This is the .NET implementation that turns a WinLine `Produktionslauf` into `HY72PPS` staging rows — confirms the SOFTAGE concept doc was built close to spec, and shows exactly how much of the theoretical extensibility (66 user fields) actually got used in Phase 1 (one).

## MESInterface — orchestration layer

`framLib.MES.MESInterface` (24 public methods) is the single class that owns both directions of the interface:

- **Export**: `ExportOrder(orderNumber, showOrderBeforeExport, includeComponents)` → builds the HY72PPS DTO tree → `HY72_TO_DBI.CreateHysapHY72InboundData` writes it to `HYSAP_INBOUND_DATA`/`_CTRL` → returns transaction ID, stored in WinLine order's `TID MES` column.
- **Import**: `ImportOrdersFromHydra` / `ImportOrder` / `ImportOrders` poll `HYSAP_OUT_*` tables → `setWinLineSchedule` / `setWinLineQuantities` update `Produktionslauf` Arbeitsschritt dates/quantities → fires `OrderImported` event. Triggered manually via the "Einlesen aus MES" WinLine button (matches the spec's Phase 1 manual-trigger note).
- **Status tracking**: `setOrderInterfaceStatus`, `setOrderScheduleStatus`, `setOrderProductionStatus`, `RefreshInterfaceStatus`, `UpdateHYSAPInboundStatus` — these are what populate the Statusspalten (`Status MES Interface` 0/1/2/99, `Status MES Datum` 0/1/2/3) documented in the SOFTAGE concept.
- **Reverse lookup**: `getWinLineOrderNumberByMESOrderNumber`, `getWinLineOrderNumberByTID` — resolve a WinLine order from HYDRA's MES-Auftragsnummer or the DBLINK transaction ID, needed because the import path only has HYDRA-side identifiers to start from.

Dependencies injected into `MESInterface`: `ProdData` (production orders), `App` (MPDV app context — note: naming collision with the MPDV workshop stakeholder, unrelated), `AppConfig` (configuration).

## ExportOrder data flow

```
Produktionslauf (XPO)  ─┐
GetProductionOrdersResult (sproc) ─┤→ HY72_AU_HD_001 (order header)
MESSchedulerDataForOperations (sproc) ─┤→ HY72_AFOLG_001 (sequences, via Dictionary<int, MESSequence>)
BestelldateiMitte (voucher line) ─┘→ HY72_AU_USRFLD_001 (user fields)
                                     → HY72_AG_HD_001 (operations, from MESOperation)
                                     → AU_INFO_AI_001 (long text, only if article name > 40 chars)
                                          ↓
                          HY72_TO_DBI.CreateHysapHY72InboundData
                                          ↓
                    HYSAP_INBOUND_DATA / HYSAP_INBOUND_CTRL (staging)
                                          ↓
                              HYDRA `auftrags_bestand` (order planning table)
```

Scheduler data (`MESSchedulerDataForOperations`, plus a compressed variant `MESSchedulerDataCompressed`) is organized pre-export into `Dictionary<int, MESSequence>`, where `MESSequence` groups `MESOperation` entries carrying the branch/return (Absprung-/Rücksprung-) references that become `ANRA`/`ANRR` in `HY72_AFOLG_001`. Both DTOs live in `framLib.Classes.Data.NonPersistent` — pure transient shuttles between sproc results and the HY72 export tree, not persisted WinLine entities.

`FormHY72` provides the optional pre-export preview dialog (`showOrderBeforeExport` parameter) — a UI review step before the DTO tree actually gets written to staging.

## Serialization: HY72_Segment base class

Every HY72 DTO inherits `HY72_Segment`, which handles the fixed-width iDoc serialization so no per-class boilerplate is needed:

- Segment name auto-derives from the class name (e.g. `HY72_AU_USRFLD_001`).
- `Segementsuffix` defaults to `"A"` (Anlage/create) — `FullSegmentname` concatenates to `HY72_AU_USRFLD_001_A`. The suffix field exists to support update/delete variants later; Framas Phase 1 only ever emits `_A`, matching the spec note in [[Framas HYDRA EIS-DBI Interface]].
- Serialization runs through the **FileHelpers** library — `ToString()` emits fixed-width iDoc format, `LoadFromString<T>()` deserializes (used on the import side for `HY72ADRCK_*` inbound segments).
- Metadata fields are `[FieldHidden]`; only `FixedLengthRecord`-decorated public properties appear in the wire format.

## HY72_AU_USRFLD_001 — the 66-field container, in practice

The wiki's "generic extensibility point" is a real, fully-typed class:

| Slot range | Type | Format |
|---|---|---|
| FU_1–FU_6 | date | `MM/dd/yyyy` via `HydraDateConverter` |
| FU_7–FU_22 | integer | 8 chars each |
| FU_23–FU_28 | decimal | 15 chars, 13+3 format, `HydraDecimalConverter` |
| FU_29–FU_44 | flag (single char) | boolean-ish |
| FU_45–FU_50 | string | 10 chars |
| FU_51–FU_64 | string | 20 chars |
| FU_65–FU_66 | string | 40 chars |

`AUNR` (40 chars) and `USRFLD` (8 chars, the key — hardcoded `"U_FRAM"` in `ExportOrder`) are the only required fields; everything else nullable.

**Actual Phase 1 usage: 1 of 66.** `ExportOrder` populates only `FU_1` — the delivery date pulled via a `T026_LTD` custom-column lookup on the `BestelldateiMitte` voucher line (the same LTD field documented in [[Framas Delivery Date Calculation]]). If that lookup returns null, `AU_USRFLD_001` is omitted from the segment tree entirely rather than sent with a blank field. `T026_Customer_Ordernumber` and `T324_MES_Customer_Ordernumber` custom columns are also read by `ExportOrder` but not confirmed to land in a USRFLD slot in this decompilation pass — worth re-checking if a later phase needs them.

This confirms literally, at the code level, the SOFTAGE concept doc's note that `U_FRAM` / the user-field scheme was still "noch nicht final festgelegt" (not yet finalized) as of v1.08 — the 65 unused slots are dead capacity waiting on a Phase 2 that (per the concept doc's "weitere Phasen" list) was never scoped in the source material this wiki has.

## Custom column mapping infrastructure

`framLib.Classes.Data` (19 types) is the configuration layer that makes the WinLine-side field extraction table-driven instead of hardcoded per field:

- `MESInterfaceConfiguration` — Hydra connection + export parameters.
- `CustomColumnMapping` + `CustomColumnEnum` — maps named custom columns (`T026_LTD`, `T026_Customer_Ordernumber`, `T324_MES_Customer_Ordernumber`) to their source table/column, used by `ExportOrder` to pull values into `AU_USRFLD_001` without recompiling for schema changes.
- `AppConfiguration` / `Base` / `BaseCompany` — configuration inheritance hierarchy (company-level overrides).
- `Protocol` / `sfProtocol` (in `MESOMDP`) — interface logging, corresponds to the SQL error-log table + NLOG mechanism noted on [[SOFTAGE]]'s page.

## `auftrags_bestand` — where the order lands in HYDRA

Confirmed as a **HYDRA database table**, not a .NET model — `framLib.dll` and `MESHYDRALib.dll` have zero members matching `auftrags_bestand`, `Bestand`, `Auftrag`, or `ProdAuftrag`. It's populated indirectly: `ExportOrder` never writes this table itself, it only writes segment rows to `HYSAP_INBOUND_DATA`/`_CTRL` (per `EIS-DBI_30.md` — the generic staging layer, which "does not depend on the transferred business data"). HYDRA's **MLE Dispatcher** then reads the control record, picks a processing routine keyed by `sap_mestyp` (message type, e.g. `HY72PPS`), and that internal routine — not documented in any customer-facing doc this wiki has — is what actually writes `auftrags_bestand`.

What *is* documented, per `OBJECT_MES-Operation_TI_SeqList.md` (HYDRA's own "MES-Operation" BAPI object spec), is the field-level mapping from that BAPI object's `ANR.*` fields into `auftrags_bestand` columns:

| `auftrags_bestand` column | BAPI field (`ANR.*`) | Meaning |
|---|---|---|
| `erranf_dat`/`erranf_zeit` | `ANR.DATB`/`ANR.ZEIB` | planned start |
| `frueh_anf_dat`/`frueh_anf_zeit` | `ANR.DATFB`/`ANR.ZEIFB` | earliest start |
| `errend_dat`/`errend_zeit` | `ANR.DATE`/`ANR.ZEIE` | planned end |
| `spaet_end_dat`/`spaet_end_zeit` | `ANR.DATSE`/`ANR.ZEISE` | latest end |
| `masch_nr` | — (not in this BAPI object) | planned machine (overwritten on operator logon if `auto_einlastung` configured) |
| `artikel` | — (not in this BAPI object) | product |
| `soll_dauer` | — (not in this BAPI object) | target duration |
| `soll_teil` | — (not in this BAPI object) | cycle time per piece |

**Gap closed — segment attribution:** `ANR` is HYDRA's *Operation address* object, i.e. it's keyed the same way as `MES-Auftragsnummer` (`AUNR`+`Folge`+`AGNR`) — one row per operation, not per order. That means these four date pairs originate from **`HY72_AG_HD_001`** (the per-operation segment) in `ExportOrder`'s output tree, not from `HY72_AU_HD_001` (order header) as an earlier pass through this material ambiguously suggested. `auftrags_bestand` is therefore populated **once per operation** (per `ANR`), consistent with [[Framas HYDRA EIS-DBI Interface]]'s note that `HY72_AG_HD_001` carries the dynamic per-order fields. `masch_nr`/`artikel`/`soll_dauer`/`soll_teil` aren't covered by this particular BAPI object doc — likely sourced from other `HY72_AG_HD_001` fields (resource group, quantities) the Dispatcher maps internally, but that mapping remains undocumented in the source material available here.

Downstream consumers of these columns: **MPL-RMV** (material planning — uses `soll_dauer`/`soll_teil` for hourly material demand), **BDE** (shop floor execution — `masch_nr` + `prod_kenn` status), **HLS** (graphic scheduling — dispatch list derives from the planned dates). Framas WinLine reads the table back via `DOGE_WH` database using a `hy.auftrags_bestand` synonym.

Related table found in the same sweep: **`res_bestand`** — HYDRA resource-inventory master data (machines/tools/fixtures), with a `meta_res` field for multi-mold/multi-tool machine modeling. Separate concern from order planning, not written by `ExportOrder`.

## What EIS-DBI_30.md rules out

The remaining open question from the earlier dig-in — "which Hydra tables do `HY72_AU_USRFLD_001`, `HY72_AG_KOMPL_002`, `HY72_AFOLG_001` land in?" — cannot be closed from documentation, and now there's a documented reason why: EIS-DBI is explicitly a **generic, business-data-agnostic transport**. The vendor spec (`EIS-DBI_30.md`, MPDV) states the staging tables are populated/consumed by whatever internal routine the MLE Dispatcher selects for a given `sap_mestyp` — that routine's field mapping is inside HYDRA's proprietary processing programs, not part of the customer-facing interface documentation. The `OBJECT_MES-Operation_TI_SeqList.md` mapping above is the one exception found: a narrow, explicitly-published BAPI-to-table mapping for the scheduling fields specifically. No equivalent published mapping exists for the other segments in this doc set.

## Note: "Bestand" (inventory) is a red herring here

A search for inventory/stock models across all three assemblies confirmed **Bestand (WinLine warehouse inventory) and `auftrags_bestand` (HYDRA order-planning table) are unrelated despite the shared word.** WinLine-side inventory (`Lagerbestand`, `Bestandskonto`, `Sollbestand`) lives entirely in `SOFTAGE.XPO.Mesonic.dll` (`ArtikelLagerwerte`, `ArtikelPreise`, `ArtikelStammdatei`, `Artikelview`, `ArtikelLagereinstellungen` — 28 matching members) and has no code path into the MES export. If a future task needs to correlate WinLine stock with HYDRA order state, that's a new integration, not something `ExportOrder` already does.

## See also

- [[Framas HYDRA EIS-DBI Interface]] — the spec this code implements; segment tree, staging tables, message types
- [[Framas Delivery Date Calculation]] — where `T026_LTD` (the one USRFLD actually wired up) comes from
- [[SOFTAGE]] — the vendor that wrote this code
