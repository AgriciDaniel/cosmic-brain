---
type: concept
title: "HYDRA Order-Machine Query Pattern"
created: 2026-06-05
updated: 2026-06-05
address: c-000199
tags:
  - hydra
  - mes
  - sql
  - query
  - pattern
related:
  - "[[HYDRA BDE Module]]"
  - "[[HYDRA MDE Module]]"
  - "[[hydra-cuthdb-data-model]]"
sources:
  - "[[hydra-cuthdb-data-model]]"
---

# HYDRA Order-Machine Query Pattern

Answers two recurring questions:
1. **"Which order was running on machine M at time T?"**
2. **"What was the first injection time of that order?"**

## Question 1 — Which order ran on machine M at time T?

### Current state (order still running now)

```sql
SELECT ast.auftrag_nr,
       ast.prod_kenn,
       ast.anmelddat,
       ast.anmeldzeit,
       ast.e_anmeld_dat,
       ast.e_anmeld_zeit,
       ab.masch_nr,
       ab.artikel
FROM   auftrag_status ast
JOIN   auftrags_bestand ab ON ab.auftrag_nr = ast.auftrag_nr
WHERE  ab.masch_nr = :machine_id
  AND  ast.prod_kenn = 'L'   -- 'L' = running
```

`prod_kenn` values: `L`=running, `U`=interrupted, `E`=finished, `V`=released, `X`=blocked.

### Historical state (order running at past time T)

Use the event log — `auftrag_status` only holds current state.

```sql
-- Find logon event before T with no subsequent logoff before T
SELECT e_on.auftrag_nr,
       e_on.erfass_dat AS logon_date,
       e_on.erfass_zeit AS logon_time,
       e_on.masch_nr
FROM   event_adea e_on
WHERE  e_on.masch_nr  = :machine_id
  AND  e_on.ereignis  = 'A_AN'           -- logon event
  AND  (e_on.erfass_dat < :target_date
        OR (e_on.erfass_dat = :target_date
            AND e_on.erfass_zeit <= :target_time))
  AND  NOT EXISTS (
         SELECT 1 FROM event_adea e_off
         WHERE  e_off.auftrag_nr = e_on.auftrag_nr
           AND  e_off.masch_nr   = :machine_id
           AND  e_off.ereignis   IN ('A_AB', 'A_UN')   -- logoff or interrupt
           AND  (e_off.erfass_dat > e_on.erfass_dat
                 OR (e_off.erfass_dat = e_on.erfass_dat
                     AND e_off.erfass_zeit > e_on.erfass_zeit))
           AND  (e_off.erfass_dat < :target_date
                 OR (e_off.erfass_dat = :target_date
                     AND e_off.erfass_zeit <= :target_time))
       )
ORDER BY e_on.erfass_dat DESC, e_on.erfass_zeit DESC
FETCH FIRST 1 ROWS ONLY;
```

**Key event types in `event_adea.ereignis`:**
- `A_AN` — logon (Anmeldung)
- `A_AB` — logoff/finish (Abmeldung)
- `A_UN` — interrupt (Unterbrechung)
- `A_TR` — quantity booking (Teilrückmeldung)

> [!note] Archive tables
> For historical queries older than the active data retention window, query `a_event_adea` (archive) instead of `event_adea`.

---

## Question 2 — First injection time of the order

"Injection" = first machine cycle after the order was logged on. Two approaches depending on data availability.

### Approach A — BDE logon timestamp (simpler, less precise)

`auftrag_status` stores the **first ever logon** of an OP:

```sql
SELECT ast.auftrag_nr,
       ast.e_anmeld_dat  AS first_logon_date,
       ast.e_anmeld_zeit AS first_logon_time
FROM   auftrag_status ast
JOIN   auftrags_bestand ab ON ab.auftrag_nr = ast.auftrag_nr
WHERE  ast.auftrag_nr = :order_nr
```

This is the moment the operator logged on at the terminal — typically seconds before the first shot. Sufficient for most reporting purposes.

### Approach B — MDE cycle timestamp (precise, requires MDE active)

`hy_zykl` logs every machine cycle with a timestamp, but has **no `auftrag_nr`**. Bridge via the logon time:

```sql
-- Step 1: get order's first logon time
SELECT e_anmeld_dat, e_anmeld_zeit, ab.masch_nr
FROM   auftrag_status
JOIN   auftrags_bestand ab USING (auftrag_nr)
WHERE  auftrag_nr = :order_nr;

-- Step 2: first production cycle on that machine after logon
SELECT MIN(prot_date) AS first_cycle_date,
       MIN(prot_time) AS first_cycle_time   -- within that date
FROM   hy_zykl
WHERE  masch_nr  = :masch_nr               -- from step 1
  AND  kz        = 'P'                     -- P = Production (not Standstill)
  AND  (prot_date  > :logon_date
        OR (prot_date = :logon_date
            AND prot_time >= :logon_time))
```

> [!key-insight] Why not just use hy_zykl directly?
> `hy_zykl` has no order reference. The logon timestamp from `auftrag_status.e_anmeld_dat/zeit` is the anchor. If multiple orders run close together on the same machine, use a tighter upper bound (next logon or logoff event from `event_adea`).

### Approach C — MDE ereignis (machine condition records)

`ereignis` records the machine status with shift-accumulated counters. The first row after logon where `zaehler2 > 0` (machine strokes counter > 0) signals the first cycle.

```sql
SELECT MIN(begin_ts) AS first_active_ts
FROM   ereignis
WHERE  masch_nr  = :masch_nr
  AND  begin_ts  >= :logon_ts       -- cast logon date+time to timestamp
  AND  zaehler2  > 0               -- at least one stroke recorded
```

---

## Summary Table

| Goal | Table | Key Fields |
|------|-------|-----------|
| Current order on machine | `auftrags_bestand` + `auftrag_status` | `masch_nr`, `prod_kenn = 'L'` |
| Order on machine at past time T | `event_adea` | `masch_nr`, `ereignis = 'A_AN'/'A_AB'`, `erfass_dat/zeit` |
| First logon time (BDE) | `auftrag_status` | `e_anmeld_dat`, `e_anmeld_zeit` |
| First injection cycle (MDE) | `hy_zykl` | `masch_nr`, `prot_date/time`, `kz = 'P'` |
| Machine condition at time T | `ereignis` | `masch_nr`, `begin_ts`, `end_ts` |
