---
type: concept
title: "HYDRA MDE Module"
created: 2026-05-26
updated: 2026-06-05
address: c-000169
tags:
  - concept
  - mes
  - mde
  - machine-data
  - hydra
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[HYDRA BDE Module]]"
  - "[[HYDRA WRM Module]]"
  - "[[hydra-cuthdb-data-model]]"
sources:
  - "[[hydra-cuthdb-data-model]]"
complexity: intermediate
domain: "Manufacturing Execution Systems"
---

# HYDRA MDE Module

**Product group:** MDE (Maschinendatenerfassung — Machine Data Collection)
**Tables:** 17
**Pages:** 477-530

## Purpose

MDE captures real-time machine statuses, events, and performance data from the shop floor. It records every machine condition change, scrap/yield quantities, cycle counts, and downtime events. The `ereignis` (event) table is the operational heart — each machine condition change generates a record, and a condition can never exceed 86,400 seconds (24 hours).

## Core Tables

### `ereignis` — Machine Events (Workplace-Related Result Records)
Central operational table. Every machine condition change is recorded here. Entries made by MDE terminals or BDE log record generator (`setup.mde_gen`). Condition can never exceed 86,400s (24h) — confirmed at shift boundaries.

**Archive:** `a_ereignis` | **Reload:** `r_ereignis`

| Column | Type | Description |
|--------|------|-------------|
| `verweis` | serial | Unique row ID |
| `masch_nr` | char(20) | Machine number — PDM: `MDEPRO.MNR` |
| `m_status` | smallint | Machine status → `stoer_tabelle` — PDM: `MDEPRO.MST` |
| `begin_dat` / `begin_zeit` | date / integer | Status start date / time — PDM: `MDEPRO.DATB/ZEIB` |
| `begin_ts` | datetime | Start timestamp (combined) |
| `ende_dat` / `ende_zeit` | date / integer | Status end date / time — PDM: `MDEPRO.DATE/ZEIE` |
| `end_ts` | datetime | End timestamp (combined) |
| `dauer` | integer | Duration vs shift calendar — PDM: `MDEPRO.MSDAUER` |
| `satzart` | char(1) | `P`=log record, `N`=end-of-shift record — PDM: `MDEPRO.SART` |
| `schichtdat` | date | Shift start date — PDM: `MDEPRO.SKDATB` |
| `schichtnr` | smallint | Shift number (1–4) — PDM: `MDEPRO.SKNR` |
| `zaehler1` | integer | Counter 1: **yield (good parts)** — absolute, accumulated per shift — PDM: `MDEPRO.CTR:1` |
| `zaehler2` | integer | Counter 2: **machine strokes** — absolute, accumulated per shift — PDM: `MDEPRO.CTR:2` |
| `zaehler3` | integer | Counter 3: scrap — absolute, accumulated per shift — PDM: `MDEPRO.CTR:3` |
| `gut_bas` | decimal(18,6) | Yield delta (base unit) — **not absolute** |
| `hub_gesamt` | decimal(18,6) | Total strokes delta |
| `solltakt` | decimal(18,6) | Target cycle at logging time — PDM: `MDEPRO.SZY` |
| `stoertxt_nr` | smallint | Downtime text → `stoer_texte` — PDM: `MDEPRO.STNR` |
| `kostenstelle` | char(10) | Cost center of machine — PDM: `MDEPRO.KST` |

> [!key-insight] Machine condition at time T
> `SELECT * FROM ereignis WHERE masch_nr = :M AND begin_ts <= :T AND end_ts >= :T`
> Returns the machine state (status, shift, running counters) at any past moment.

### `event_mde` — MDE Events

Event-driven log for MDE. One row per event. Archive: `a_event_mde`.

| Column | Type | Description |
|--------|------|-------------|
| `masch_nr` | char(20) | Machine number |
| `auftrag_nr` | char(40) | Order number (if BDE-MDE linked) |
| `ereignis` | char(10) | Event type |
| `begin_ts` | datetime | Event start timestamp |
| `end_ts` | datetime | Event end timestamp |
| `erfass_dat` / `erfass_zeit` | date / integer | Recording date / time |
| `datum` | date | Log date |
| `chargen_nr` | char(20) | Current batch (at event CA_AB or C_AB) |

### `hy_zykl` — Machine Cycle Log

One row per cycle determination. Filed continuously during production.

| Column | Type | Description |
|--------|------|-------------|
| `masch_nr` | char(20) | Machine number |
| `prot_date` | date | Date of cycle determination |
| `prot_time` | integer | Time of cycle determination |
| `kz` | char(1) | State: `P`=Production, `S`=Standstill |
| `isttakt` | decimal(18,6) | Actual cycle time |
| `solltakt` | decimal(18,6) | Target cycle time |
| `zyklus_zeit` | integer | Determined cycle time in **milliseconds** |

> [!key-insight] First injection via hy_zykl
> `hy_zykl` has **no `auftrag_nr`**. Find first cycle after order logon: `SELECT MIN(prot_date), MIN(prot_time) FROM hy_zykl WHERE masch_nr = :M AND kz = 'P' AND (prot_date > :logon_date OR (prot_date = :logon_date AND prot_time >= :logon_time))`. Get `logon_date/time` from `auftrag_status.e_anmeld_dat/e_anmeld_zeit`. See [[HYDRA Order-Machine Query Pattern]] for full SQL.

### Maschinen (Machines)
- **maschinen** — Machine master data (15 pages): machine definitions, types, locations, capabilities
- **maschinen_detail** — Machine detail/extension data
- **maschinen_status** — Machine status definitions (4 pages)
- **maschinen_zaehler** — Machine counters (4 pages): cycle counts, piece counters, runtime meters
- **masch_linien_zuord** — Machine-to-line assignments (`masch_nr`, `linie`, `anzeige_pos`)
- **masch_term_zuord** — Machine-to-terminal assignments (`masch_nr`, `terminal_nr`, `betriebsart`: A=ADE / M=MDE)

### Cycles & Downtime
- **stoer_tabelle** — Downtime/fault table: machine stoppages
- **stoer_tab_hierarc** — Downtime hierarchy: fault categories
- **stoertexte** — Downtime text descriptions
- **mz_stklasse** — Machine cycle classification

### Process Parameters
- **prozess_param** — Process parameters captured during machine operation

### System Tables
- **system_j_mod / system_t_mod** — Year/period models for MDE data aggregation
- **mde_feiertage** — MDE-specific holiday calendar

## Key Design

`ereignis` enforces max 24h per condition — confirmed at shift boundaries and every condition change. All `gut_*`/`aus_*` quantities are **delta values** (not absolute); aggregate across rows for totals. `zaehler1/2/3` are **absolute** accumulated counters within the shift. `hy_zykl` has no order reference — bridge via `auftrag_status.e_anmeld_dat/zeit`.
