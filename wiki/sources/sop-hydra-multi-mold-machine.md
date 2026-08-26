---
type: source
title: "SOP: Configure a Multi-Slot Mold Machine as a Meta-Resource in HYDRA"
created: 2026-07-14
updated: 2026-07-14
address: c-000350
tags:
  - source
  - hydra
  - mes
  - wrm
  - hls
  - molds
  - cavities
  - sop
  - re-verification
status: current
related:
  - "[[hydra-multi-mold-machine]]"
  - "[[HYDRA Multi-Tool Resource Configuration]]"
  - "[[HYDRA Order-Machine Query Pattern]]"
  - "[[HYDRA Service Interface (SIF)]]"
  - "[[HYDRA SIF DLG Service Catalog]]"
  - "[[HYDRA WRM Module]]"
sources:
  - "[[hydra-8-documentation]]"
  - "[[hydra-cuthdb-data-model]]"
  - "[[hydra-service-interface-sif]]"
domain: "Manufacturing Execution Systems"
---

# SOP: Configure a Multi-Slot Mold Machine as a Meta-Resource in HYDRA

**Source file:** `presentations/sop_hydra-multi-mold-machine.md`
**Owner:** congdat.nguyen@framas.com | **Last updated:** 2026-07-09

A re-verified rewrite of the earlier `presentations/hydra-multi-mold-machine.md` presentation. Every claim is checked directly against the Oct 2020 HYDRA 8 documentation set and, for PDM field names, against `.raw/hydra/CUT-HDB_DataModel_2021.pdf` (846-page schema reference). Where a gap remained after the first pass, a second pass on 2026-07-09 closed most of it — this source page records what changed from the previously-ingested [[hydra-multi-mold-machine]] and [[HYDRA Multi-Tool Resource Configuration]] pages rather than re-deriving the whole SOP (>80% overlaps content already in the wiki).

## What's genuinely new here (not already in the wiki)

### 1. Expanded resource-type code table

`MOC_ResourceConfiguration.pdf` p.2 carries a **second, longer** predefined-type table (12 codes) distinct from the 8-code core table on `MOC_ResourceTypes.pdf` p.1 that earlier ingests cited. New codes not previously in the wiki: **`PAC`** (Packaging/transport container), **`ENT`** (Removal device), **`PRU`** (Setup staff). `TEM` (Tempering equipment) was already in the wiki but is confirmed on this second table too. See [[HYDRA Multi-Tool Resource Configuration]] § Resource types (updated).

### 2. `res_ress_belegung` write-trigger, sourced to SIF/PDM docs

The occupancy table `res_ress_belegung` (table + columns already confirmed via CUT-HDB p.783 in the prior ingest) now has its **write-trigger logic** confirmed from a functional-doc source: `Products/SCS_81/SCS-PDM_81.pdf` p.313 and `Products/SCS_81/SCS-SIF_81.pdf` p.493 (identical text) — dialog **`RES_STATUS`** ("Set resource status"): *"Resource allocation in res_ress_belegung is updated respectively. If a resource is blocked, i.e. it gets a status with the ID 'verarb_planung' != 'K' an entry is made in res_ress_belegung."* The block window is driven by `DATB`/`ZEIB` (start) and `DATE`/`ZEIE` (end) — the functional-doc names for CUT-HDB's `bel_von_dat`/`bel_von_zeit`/`bel_bis_dat`/`bel_bis_zeit`.

This directly connects [[HYDRA SIF DLG Service Catalog]]'s `RES_STATUS` entry (Ch.18-19, WRM) to the runtime-occupancy mechanism already documented on [[HYDRA Multi-Tool Resource Configuration]] and [[hydra-multi-mold-machine]] — a cross-reference neither page carried before this ingest. Enough is now known to write a fresh `belegungsart = 'A'` occupancy query; no literal SQL exists in any source document, so [[HYDRA Order-Machine Query Pattern]]'s verification-query set remains unwritten for this table.

**`res_ress_belegung` column reference** (WRM module, CUT-HDB p.783):

| Column | Role |
|---|---|
| `belegungsart` | occupancy type: `A`=Auftrag (order), `S`=Sperre (lock), `W`=Wartung (maintenance) |
| `ressource` | resource ID (mold ID) |
| `ress_typ` | resource type, `WZ` for mold |
| `anzahl` | count of resources needed |
| `bel_von_dat`/`bel_von_zeit` | block window start date/time (functional-doc name: `DATB`/`ZEIB`) |
| `bel_bis_dat`/`bel_bis_zeit` | block window end date/time (functional-doc name: `DATE`/`ZEIE`) |

One row per slot/mold — an 80-mold machine job produces 80 occupancy rows for one order. `RES_STATUS` only writes a row if current time falls within the block window; a past end date is ignored.

**Other WRM tables behind this setup** (from [[hydra-multi-mold-machine]] / [[HYDRA Multi-Tool Resource Configuration]], not re-derived here — cross-linked for completeness):

| Table | Role |
|---|---|
| `res_bestand` | resource master. `meta_res='J'` flags the machine as a meta-resource (holds a tool list); `res_familie` groups molds into a pool; `param_str_02`/`TLGNEST` holds cavity/slot config; `mit_anmelden` (`J`/`E`) and `mehrfach` control auto- vs explicit-logon and simultaneous use |
| `res_familie` | pool label only — a family id set on every mold in the same pool. Does not itself pool the molds; the actual pooling mechanism is the Required-resource assignment |
| `res_ress_typen` | resource type lookup (`WZ`/`WNR` = mold, `MNR` = machine, plus the expanded 12-code table from §1 above) |
| `res_bedarfszuord` | requirement assignment — links an order's required (superordinate) resource to its subordinate resource pool (`res_nr_m`/`res_nr_t`), i.e. "order demands N tools from this family" |
| `res_ress_belegung` | runtime occupancy — see column table above |

`res_bestand` and `res_ress_typen` are the ones a fresh setup touches first (MOC); `res_bedarfszuord` and `res_ress_belegung` are populated at planning/logon time.

### 3. New unresolved mechanism: one order, multiple molds at once ("multi-slot simultaneous")

> [!gap] Open question, not resolved by this source
> Every previously-ingested page (this SOP included) only walks through **one Required resource resolving to one mold** at logon. Nothing in the Oct 2020 docs or CUT-HDB shows a worked example of one order ending up with **several molds running concurrently in different slots** from a single logon action. The SOP proposes a mechanism by inference — repeat the pool-and-resolve pattern once per slot position (N distinct Required resources, one per slot), then list all N on the same operation's tool list, each `Log on with OP = Explicit` — but flags it explicitly as "inferred, not separately-sourced" and unvalidated against a live HYDRA client. See [[HYDRA Multi-Tool Resource Configuration]] § "Multiple molds per order simultaneously" (new section, this ingest).

### 4. Contradiction: alternate-shape function names

> [!contradiction] HLS-MFB / HLS-AGS / BDE-APF / BDE-SSG — asserted as fact elsewhere, flagged unverified here
> [[hydra-multi-mold-machine]] states as settled fact (its "Contrast with parallel machines" table and "If you have a different shape instead" reasoning) that the **N-separate-machines** case uses functions **HLS-MFB** (Multiple Assignment of Resources), **HLS-AGS** (Operation Splitting), **BDE-APF**, **BDE-SSG**. This SOP, written with a stricter re-verification discipline, explicitly flags these same four names as **unresolved**: *"No `Functions/HLS/` folder exists in the Oct 2020 documentation set... these product-level release-note PDFs (`Products/HLS_82/HLS-MFB_82.pdf`, `HLS-AGS_82.pdf`) were located but not yet read for this rewrite. Treat the specific alternate-function names as unverified until read directly."*
>
> Net effect: the existing wiki page overstates confidence on this specific claim. Treat HLS-MFB/HLS-AGS/BDE-APF/BDE-SSG as **candidate, not confirmed**, names until someone opens `Products/HLS_82/HLS-MFB_82.pdf` and `HLS-AGS_82.pdf` directly. Flagged on [[hydra-multi-mold-machine]] as well.

## Everything else in this source

The remaining ~90% of the SOP (meta-resource machine setup, Required-resource pooling, cavity partitioning fields, Logon-with-OP semantics, `mit_anmelden`/`mehrfach` PDM fields, parallel-order capacity caps, AIP terminal functions) restates content already ingested and cross-verified in [[hydra-multi-mold-machine]] and [[HYDRA Multi-Tool Resource Configuration]] during the 2026-06-30 and 2026-07-09 passes. No new facts there beyond confirming the same PDM field names a second time.

## Related

- [[hydra-multi-mold-machine]] — original Q&A ingest, now carries the HLS-MFB/AGS contradiction flag
- [[HYDRA Multi-Tool Resource Configuration]] — field-level reference, now carries the expanded resource-type table + multi-slot-simultaneous gap section
- [[HYDRA Service Interface (SIF)]] · [[HYDRA SIF DLG Service Catalog]] — `RES_STATUS` dialog, now cross-linked to `res_ress_belegung`
- Original presentation: `presentations/hydra-multi-mold-machine.md`
