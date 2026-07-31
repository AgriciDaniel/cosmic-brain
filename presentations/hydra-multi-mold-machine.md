---
marp: true
theme: default
paginate: true
title: "HYDRA — One Machine, Many Molds"
description: "Modeling a multi-slot mold machine as a meta-resource in HYDRA MES"
author: framas
date: 2026-06-30
style: |
  section { font-family: "Space Grotesk", system-ui, sans-serif; background: #0A0A0A; color: #F5F5F5; }
  h1, h2 { color: #E07850; }
  code { background: #1A1A1A; color: #E07850; }
  table { font-size: 0.8em; }
  strong { color: #E07850; }
  a { color: #E07850; }
---

# One Machine, Many Molds

### Running a HYDRA order across all mold slots on a single machine

**Pattern:** Meta-resource + Secondary resources + Cavity (NEST)
**Modules:** WRM · HLS · BDE · AIP
**Source:** MPDV HYDRA CUT-HDB data model (2021)

---

## The problem

- One machine. It has **multiple slots**.
- Each slot holds **one mold**. Up to ~80 molds total.
- One production order should drive **all mounted molds at once**.

❌ Wrong: model each mold as a separate machine.
✅ Right: model the machine as a **meta-resource** that holds a list of mounted tools (molds).

---

## Two shapes — don't confuse them

| Shape | HYDRA functions | Your case? |
|-------|-----------------|-----------|
| **N machines in parallel** — one qty spread across separate machines | HLS-MFB, HLS-AGS, BDE-APF/SSG | ✗ |
| **1 machine, N mold slots** — molds mounted in slots on one machine | **HLS-BSR + WRM-NST** | ✅ |

This deck = the second shape.

---

## Reality: 3 nested tiers (PU machine)

```
MACHINE  (1, fixed physical slots)
  ├─ Order 1 = Product X → molds {…}  ┐
  ├─ Order 2 = Product Y → molds {…}  │ concurrent (1..N)
  └─ Order 3 = Product Z → molds {…}  ┘
```

- One machine runs **several orders at once** — each order = a different product.
- Each product mounts a **variable** number of molds.
- The machine has a **fixed** number of physical slots.

---

## Two independent capacity caps

| Cap | Field | Governs | Set to |
|-----|-------|---------|--------|
| Parallel **orders** | Available capacity [per mill] | OPs at once | N_orders × 1000 |
| Parallel **molds/slots** | Anonymous resource **Quantity** | molds mounted at once | **fixed slot count** |
| Ceiling | Logon of several OPs = Y | MDE terminal max | ≤ 20 |

Orders and slots are **separate levers** — that's the key insight.

---

## Fixed slots = anonymous slot-pool

HLS capacity-checks the **tools/resources** on an operation, not just the machine.

- Model the slots as **one anonymous resource**, `Quantity = N` (fixed).
- Every operation lists it, `anzahl` = molds that product mounts.
- HLS enforces **Σ molds across all orders ≤ N slots**.

→ Works no matter how many orders or how many molds per product.
*(needs secondary-resource capacity-check license)*

---

## Manual & Auto planning — both fit

- **Manual** drag: warns on double assignment, but allows it. Molds shown one under another.
- **Auto** (`graptsbap`): respects raised capacity + slot-pool; won't overload.

> The "auto can't multi-assign" limit only applies at the **default 1000** capacity. Raise it → auto packs orders correctly.

Molds vary per product → **Log on with OP = Explicit** (operator scans mounted molds).

---

## The mental model

```
ORDER  (1 operation)
  └─ PRIMARY:  MACHINE        meta_res = 'J'   (type MNR)
        ├─ slot / NEST 1  →  mold A    \
        ├─ slot / NEST 2  →  mold B     |  type WZ
        ├─ ...                          |  res_familie = MOLDPOOL
        └─ slot / NEST 80 →  mold ...  /
```

- Machine = **primary** resource (the meta-resource).
- Molds = **subordinate / secondary** resources hanging off it.
- Slot = **cavity (NEST)**.

---

## Core idea in one line

> The machine declares "I hold a list of tools."
> The order asks for "N tools from the mold family" — not one fixed mold.
> HYDRA binds the available molds to the order and books each slot.

Driven entirely by **resource master data** + **WRM-NST cavity config** — no custom code.

---

## Implementation — Step 1 & 2

**1. Machine = meta-resource** (`res_bestand`)

| Field (PDM ID) | Value |
|----------------|-------|
| `meta_res` (`RES.OPT:METARES`) | `J` — "has resource list" |
| res type | `MNR` (machine) |

**2. Each mold = tool resource in one pool**

| Field (PDM ID) | Value |
|----------------|-------|
| res type (`res_ress_typen`) | `WZ` / `WNR` (Werkzeug) |
| `res_familie` (`RES.RESFAMID`) | one family id for all ~80 molds |

---

## Implementation — Step 3 & 4

**3. Define the slots** — cavity management

| Field | Meaning |
|-------|---------|
| `res_bestand.param_str_02` → `RES.TLGNEST` (**WRM-NEST**) | "Partitioning due to cavities" = how many slots active |

**4. Order needs molds from the pool** — `res_bedarfszuord`

| Field (PDM ID) | Role |
|----------------|------|
| `res_nr_m` (`RESBEDRES.RES:M`) | superordinate / **required** resource = the machine |
| `res_nr_t` (`RESBEDRES.RES:T`) | subordinate resource = the **mold family** |

→ Order demands N tools from the family, not one fixed mold.

---

## Implementation — Step 5 & 6

**5. Auto-attach molds when the order logs on**

| `res_bestand.mit_anmelden` (`RES.OPT:AUTOANMELD`) | Behaviour |
|---|---|
| `J` | mold logs on with order (A_AN) / off (A_AB) automatically |
| `E` | explicit — operator scans the slot mounted (best for 80-mold pool) |
| `N` | never (DNC resources) |

**6. Allow simultaneous bookings**

| `res_bestand.mehrfach` (`RES.OPT:MULTIMNR`) | "can be logged on several times / simultan" |
|---|---|

---

## Runtime — who occupies which slot

Table **`res_ress_belegung`** — *Zuordnung Auftrag zu Werkzeug*
Read by the HLS scheduling board.

| Column | Use |
|--------|-----|
| `belegungsart` | `A` = order · `S` = lock · `W` = maintenance |
| `ressource` / `ress_typ` | mold ID / `WZ` |
| `anzahl` | number of resources needed |
| `bel_von_dat` … `bel_bis_dat` | maintenance / lock window per mold |

Each of the 80 molds = its own occupancy row → board shows all slots filled.

---

## Quantity & quality per slot

**BDE-NBT** — *Changed Partitioning Based on Cavities*
- Output qty + cycle time recompute when active cavity count changes.
- Pull one mold for repair → 79 active → targets adjust automatically.

**AIP-NES** — *Quality data relating to cavities*
- Captured per `nest_nr` (cavity number).
- Sample size = per-characteristic × number_of_cavities.
- Every mold's parts traceable to its slot.

---

## Verify it's working (SQL pointers)

- **Which molds occupied by an order?** → `res_ress_belegung WHERE belegungsart='A' AND key = :auftrag_nr`
- **Which order on machine now?** → `auftrag_status.prod_kenn='L'` + `auftrags_bestand.masch_nr`
- **Mold maintenance/lock windows?** → `res_ress_belegung WHERE belegungsart IN ('S','W')`

See **[[HYDRA Order-Machine Query Pattern]]** for the full query set.

---

## Rollout checklist

1. ☐ Set machine `meta_res='J'`, type `MNR`
2. ☐ Create 80 mold resources, type `WZ`, one `res_familie`
3. ☐ Configure cavities/slots via WRM-NST (`param_str_02`/`RES.TLGNEST`)
4. ☐ Link order tool demand → mold family (`res_bedarfszuord`)
5. ☐ Set `mit_anmelden` (`J` or `E`) + `mehrfach`
6. ☐ Enable BDE-NBT cavity partitioning + AIP-NES per-nest QC
7. ☐ Validate on HLS board (`res_ress_belegung` occupancy)

---

## Config click-path (MOC + WRM)

1. **MOC → resources:** machine `MNR` (meta-resource), molds `WNR`, one **Family**
2. **WRM → Required resources:** molds → one pool per product (HYDRA picks at logon)
3. **Anonymous slot-pool:** `Quantity = N` = fixed physical slots
4. **Tool detail:** Original partitioning = **# cavities** · enable **"Partitioning due to cavities"**
5. **Operation tool list:** add pool (`anzahl`=molds) **+ slot-pool** · **"Log on with OP = Explicit"**
6. **Machine config:** **"Logon of several OPs = Y"** (≤20) · **Available capacity = N_orders×1000**
7. **Planning:** manual drag **or** auto (`graptsbap`) — both honour both caps
8. **Runtime:** `AIP_M_TLG_NEST` cavity open/close · occupancy in `res_ress_belegung`

→ Full reference: [[HYDRA Multi-Tool Resource Configuration]]

---

# Thank you

**Full write-up:** `wiki/questions/hydra-multi-mold-machine.md`
**Module ref:** [[HYDRA WRM Module]] · [[HYDRA HLS Module]] · [[HYDRA BDE Module]]
**Source:** [[hydra-cuthdb-data-model]]
