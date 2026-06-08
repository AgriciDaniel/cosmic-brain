---
type: concept
title: "HYDRA BDE Module"
created: 2026-05-26
updated: 2026-06-05
address: c-000164
tags:
  - concept
  - mes
  - bde
  - production
  - hydra
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[HYDRA MDE Module]]"
  - "[[HYDRA MPL Module]]"
  - "[[hydra-cuthdb-data-model]]"
sources:
  - "[[hydra-cuthdb-data-model]]"
complexity: intermediate
domain: "Manufacturing Execution Systems"
---

# HYDRA BDE Module

**Product group:** BDE (Betriebsdatenerfassung — Production Data Collection)
**Tables:** 40
**Pages:** 27-177

## Purpose

BDE is the operational heart of HYDRA, handling production data collection — work plans, orders, quantities produced, scrap, status tracking, and production planning. It bridges the gap between ERP-level planning and shop-floor execution.

## Core Domains

### Work Plans (`ade_arbplan*`, `arbplan_*`)
- **ade_arbplanfolgen** — Work plan order sequences with branch/return operations, alignment, and sequence categories
- **arbplan_bestand** — Work plan master data inventory
- **arbplan_hyinfo** — Work plan HYDRA info extensions
- **arbplan_leistung** — Work plan performance/quantity data
- **arbplan_mlst_hy** — Work plan milestone HYDRA references
- **arbplan_verwalt** — Work plan administrative data
- **arbplan_zusatz** — Work plan additional fields

### Orders (`ade_auftrag*`, `auftrag*`)
- **ade_auftragmengen** — Order quantities (planned vs actual)
- **ade_auftragsarten** — Order types/categories
- **ade_auftragsfolgen** — Order sequences with branch/return logic, version tracking (`aend_nr`, `aenderungsnr`)
- **ade_auftragsgruppe** — Order groups for batch processing
- **ade_auftragsnetz** — Order networks (inter-order dependencies)
- **auftrag_status** — Order status tracking (10 pages of documentation)
- **auftrags_bestand** — Order master data inventory (19 pages)
- **auftrags_leistung** — Order performance/quantity data (5 pages)
- **auftrags_zusatz** — Order additional fields

### Production Events (`event_adea`, `event_adep`)
Event tables for production data collection. `event_adea` handles order-related events; `event_adep` handles personnel events.

## Key Table Column Reference

### `auftrags_bestand` — Critical Columns

| Column | Type | Description |
|--------|------|-------------|
| `auftrag_nr` | char(40) | BDE order number (order + OP) — overall key |
| `masch_nr` | char(20) | Planned machine. **Updated to actual machine on logon** if `auto_einlastung` configured. `AB.MASCH_NR` in PDM. |
| `artikel` | char(40) | Article number (final article for order) |
| `auftrag_art` | char(5) | Order type → `ade_auftragsarten` |
| `erranf_dat` / `erranf_zeit` | date / integer | Planned start date / time |
| `errend_dat` / `errend_zeit` | date / integer | Planned end date / time |
| `frueh_anf_dat` / `frueh_anf_zeit` | date / integer | Earliest start (scheduling result) |
| `mgruppe` | char(20) | Machine group |
| `prod_kenn` | — | Not here — see `auftrag_status` |

### `auftrag_status` — Critical Columns

All movement data per OP — totals over the **complete runtime** (not reset). Archive: `a_auftrag_status`.

| Column | Type | Description |
|--------|------|-------------|
| `auftrag_nr` | char(40) | BDE order number — FK to `auftrags_bestand` |
| `prod_kenn` | char(2) | **Production state**: `L`=running, `U`=interrupted, `E`=finished, `V`=released, `X`=blocked |
| `anmelddat` | date | Date of **last** logon |
| `anmeldzeit` | integer | Time of **last** logon |
| `e_anmeld_dat` | date | Date of **first** logon (ever) — PDM: `ANR.DATB:E` |
| `e_anmeld_zeit` | integer | Time of **first** logon (ever) — PDM: `ANR.ZEIB:E` |
| `u_abmeld_dat` | date | Date of last interruption — PDM: `ANR.DATE:U` |
| `u_abmeld_zeit` | integer | Time of last interruption — PDM: `ANR.ZEIE:U` |
| `dauer` | integer | Overall runtime of the OP |
| `gut_bas` | decimal(18,6) | Yield (base quantity unit) — running total |
| `aus_bas` | decimal(18,6) | Scrap (base quantity unit) — running total |
| `terminalnr` | smallint | Terminal number of last posting |

> [!key-insight] First logon timestamp
> `e_anmeld_dat` + `e_anmeld_zeit` = first ever logon of this OP. For injection molding, this is the BDE-level "first production start" timestamp. For actual first machine cycle, see [[HYDRA MDE Module]]#hy_zykl.

### `event_adea` — Critical Columns

Full BDE event log. One row per event. Archive: `a_event_adea`.

| Column | Type | Description |
|--------|------|-------------|
| `auftrag_nr` | char(40) | Order number |
| `masch_nr` | char(20) | Machine number at event time |
| `ereignis` | char(10) | Event type: `A_AN`=logon, `A_AB`=logoff, `A_UN`=interrupt, `A_TR`=quantity booking |
| `erfass_dat` | date | Recording date |
| `erfass_zeit` | integer | Recording time |
| `datum` | date | Log date |
| `menge_1`…`menge_20` | decimal(18,6) | Quantities — meaning set by `typ_1`…`typ_20` |
| `typ_1`…`typ_20` | char(10) | Quantity type: `GUT`=yield, `AUS`=scrap, `NAR`=rework |
| `person_nr` | char(10) | Person logged on |
| `verweis` | serial | Unique row ID |

> [!key-insight] Historical machine-order lookup
> To find which order ran on a machine at a past time, query `event_adea` for logon events (`ereignis = 'A_AN'`) with no subsequent logoff/interrupt before target time. See [[HYDRA Order-Machine Query Pattern]] for ready-to-use SQL.

### Supporting Tables
- **ade_grund_texte / ade_grund_zuord** — Reason texts and assignments (scrap reasons, deviation reasons)
- **ade_lst_codes** — Performance/activity codes
- **ade_ortsgrpwechsel** — Location group changes during production
- **ade_pers_komp** — Personnel competency assignments
- **ade_protokoll** — BDE protocol/audit log
- **ade_seriennummern** — Serial number tracking
- **ade_status_texte / ade_status_zuord** — Status text definitions and assignments
- **ade_verarb_codes** — Processing codes
- **bedienpos** — Operator positions
- **bm_konten** — Resource performance accounts
- **hy_gruppen / hy_gruppen_zuord** — HYDRA groups and assignments
- **masch_lohngruppen** — Machine wage groups
- **meister_prot** — Master/supervisor protocol
- **pers_merken** — Personnel notations
- **pps_bestand / pps_leistung / pps_zusatz** — Production planning system inventory, performance, and additional data
- **sap_pp_conf** — SAP production planning configuration
- **status_zusatz** — Status additional fields
