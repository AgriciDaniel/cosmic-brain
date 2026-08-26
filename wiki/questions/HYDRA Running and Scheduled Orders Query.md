---
type: synthesis
title: "HYDRA Running and Scheduled Orders Query"
created: 2026-06-11
updated: 2026-06-11
address: c-000252
question: "Which HYDRA orders are currently running and which are scheduled to run in the next week?"
answer_quality: solid
tags:
  - hydra
  - mes
  - sql
  - query
  - production-orders
status: developing
related:
  - "[[HYDRA Order-Machine Query Pattern]]"
  - "[[HYDRA BDE Module]]"
  - "[[HYDRA HLS Module]]"
  - "[[MPDV HYDRA]]"
  - "[[framas/databases]]"
sources:
  - "[[hydra-cuthdb-data-model]]"
---

# HYDRA Running and Scheduled Orders Query

How to list currently running production orders and orders scheduled to start within a date window (e.g. the next 7 days) from the HYDRA CUT-HDB schema. Extends [[HYDRA Order-Machine Query Pattern]] (machine-centric) with an order-population view.

## Where the data lives

- **Order state**: `auftrag_status.prod_kenn` — `L`=running, `U`=interrupted, `V`=released (waiting to start), `E`=finished, `X`=blocked (Source: [[HYDRA BDE Module]])
- **Planned dates**: `auftrags_bestand` — `erranf_dat`/`erranf_zeit` (planned start), `errend_dat`/`errend_zeit` (planned end), `frueh_anf_dat`/`frueh_anf_zeit` (earliest start, scheduling result)
- **Access from Framas**: HYDRA tables are reachable from `DOGE_WH` via the `hy` synonym schema (Source: [[framas/databases]])

## Currently running orders

```sql
SELECT ast.auftrag_nr,
       ab.artikel,
       ab.masch_nr,
       ast.anmelddat,      -- last logon date
       ast.anmeldzeit,
       ast.gut_bas,        -- yield so far (running total)
       ast.aus_bas         -- scrap so far (running total)
FROM   auftrag_status ast
JOIN   auftrags_bestand ab ON ab.auftrag_nr = ast.auftrag_nr
WHERE  ast.prod_kenn = 'L'
ORDER BY ab.masch_nr;
```

Add `'U'` to the `prod_kenn` filter if interrupted-but-active orders count as "running".

## Orders scheduled in the next 7 days (released, not yet started)

```sql
SELECT ab.auftrag_nr,
       ab.artikel,
       ab.masch_nr,        -- planned machine
       ab.erranf_dat,      -- planned start
       ab.erranf_zeit,
       ab.errend_dat       -- planned end
FROM   auftrags_bestand ab
JOIN   auftrag_status ast ON ast.auftrag_nr = ab.auftrag_nr
WHERE  ast.prod_kenn = 'V'                       -- released, waiting
  AND  ab.erranf_dat >= CAST(GETDATE() AS date)
  AND  ab.erranf_dat <  DATEADD(day, 7, CAST(GETDATE() AS date))
ORDER BY ab.erranf_dat, ab.erranf_zeit;
```

## Caveats

- `auftrags_bestand.masch_nr` is the **planned** machine; it is overwritten with the actual machine on logon when `auto_einlastung` is configured (Source: [[HYDRA BDE Module]]).
- Fine-grained dispatch (sequence within a machine/day) belongs to [[HYDRA HLS Module]] (graphic shop floor scheduling), but its 6 tables hold shift/resource matrices — the dispatch list itself still derives from `auftrags_bestand` planned dates.
- The wiki documents the schema only; live order lists require a database connection (e.g. `sqlcmd` against `DOGE_WH` with the `hy.` prefix).
