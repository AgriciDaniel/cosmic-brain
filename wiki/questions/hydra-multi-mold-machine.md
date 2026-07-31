---
type: question
title: "HYDRA: one machine with multiple mold slots (parallel molds)"
question: "My machine can hold multiple molds at once (slots). How do I model one machine but attach multiple molds so an order uses all of them?"
answer_quality: solid
address: c-000276
created: 2026-06-30
updated: 2026-07-14
tags: [question, hydra, mes, wrm, hls, scheduling, molds]
related:
  - "[[HYDRA WRM Module]]"
  - "[[HYDRA HLS Module]]"
  - "[[HYDRA BDE Module]]"
  - "[[HYDRA AIP-CAQ Functions]]"
  - "[[HYDRA Order-Machine Query Pattern]]"
  - "[[HYDRA 8 Function Catalog]]"
sources:
  - "[[hydra-cuthdb-data-model]]"
  - "[[sop-hydra-multi-mold-machine]]"
status: developing
---

# HYDRA: one machine with multiple mold slots

> Two distinct shapes get confused. This page covers the **1 machine, N mold slots** case.
> For **N separate machines run in parallel**, see HLS-MFB / HLS-AGS (operation splitting across machines) instead.

## The model

**Machine = primary resource. Molds = subordinate (secondary) resources. Slot = cavity / NEST.**

One operation books the machine; the molds hang off it as tools, one per slot. Do **not** model each mold as a machine. The HYDRA functions are **HLS-BSR** (Assignment of Secondary Resources) + **WRM-NST** (Cavity Management). (Source: [[HYDRA 8 Function Catalog]])

```
ORDER (1 operation)
  └─ primary: MACHINE   (res_bestand.meta_res='J', res type MNR)
       ├─ slot/NEST 1  → mold A   (res type WZ, res_familie = MOLDPOOL) ─┐
       ├─ slot/NEST 2  → mold B                                          ├─ res_ress_belegung
       ├─ ...                                                            │   belegungsart = 'A'
       └─ slot/NEST 80 → mold ...                                       ─┘
  qty split by active cavities (BDE-NBT) | QC per nest (AIP-NES)
```

## Setup — concrete fields (`res_bestand`, WRM)

| Step | Field / function | Value | Meaning |
|------|------------------|-------|---------|
| 1. Machine = meta-resource | `res_bestand.meta_res` (`RES.OPT:METARES`) | `J` | "Meta resource, i.e. has resource list" — machine holds a list of mounted tools (the slots) |
| | res type | `MNR` | machine |
| 2. Each mold = tool resource | res type (`res_ress_typen`) | `WZ` / `WNR` | Werkzeug (tool/mold) |
| | `res_bestand.res_familie` (`RES.RESFAMID`) | one family id | groups all ~80 molds into one pool |
| 3. Define slots | `res_bestand.param_str_02` → `RES.TLGNEST` (**WRM-NEST**) | cavity config | partitioning due to cavities = how many slots active |
| 4. Order needs molds from pool | `res_bedarfszuord.res_nr_m` / `res_nr_t` (`RESBEDRES.RES:M/:T`) | machine → mold family | required (superordinate) resource → subordinate resource; order demands N tools from family, not one fixed mold |
| 5. Auto-attach on logon | `res_bestand.mit_anmelden` (`RES.OPT:AUTOANMELD`) | `J` (auto) or `E` (explicit) | `J` = mold logs on with order at A_AN, off at A_AB. `E` = operator picks/scans which slot at terminal — best for an 80-mold pool |
| 6. Allow simultaneous use | `res_bestand.mehrfach` (`RES.OPT:MULTIMNR`) | enable | "can be logged on several times / simultan" |

## Clarification: res_familie is just a label, not the pooling mechanism

`res_familie` (e.g. `MOLDPOOL` in the presentation diagram) is not a reserved value — it's a family id **you** pick, put on every mold in the same pool. Setting it alone does not pool the molds. The actual pooling mechanism is the **Required resource** assignment under `WRM → Master data → Required resources` (see [[HYDRA Multi-Tool Resource Configuration]] § "The mold pool — Required resource") — HYDRA resolves against that at order logon, not against `res_familie` directly.

MOC steps to set up a `WZ` mold resource:
1. `MOC → Workplace and Resource Configuration`, resource type `WZ`/`WNR`.
2. Set `res_bestand.res_familie` (`RES.RESFAMID`) to the pool id, same value on all ~80 molds.
3. Machine separately: type `MNR`, `meta_res = J`.
4. `WRM → Master data → Required resources`: assign all family molds to one Required resource (this is the step that makes "pick any of 80" work).
5. Operation's tool list: add the Required resource (`anzahl` = molds mounted), set **Log on with OP = Explicit**.

Sourced from `presentations/hydra-multi-mold-machine.md`:
- lines 105–113 — mental model diagram, `type WZ`, `res_familie = MOLDPOOL` annotation
- lines 128–143 — Implementation Step 1 & 2 table
- lines 233–244 — MOC + WRM click-path

## Runtime occupancy — `res_ress_belegung`

Designation: *Zuordnung Auftrag zu Werkzeug* (order ↔ tool assignment). This is what the HLS scheduling board reads to show which mold is occupied.

- `belegungsart`: `A` = Auftrag (order), `S` = Sperre (lock), `W` = Wartung (maintenance)
- `anzahl` = number of resources needed
- `ressource` = mold ID, `ress_typ` = `WZ`

Each of the 80 molds gets its own occupancy row → board shows all slots filled by the one order, plus maintenance/lock windows that block individual molds (`bel_von_dat` … `bel_bis_dat`).

## Quantity + quality per slot

- **BDE-NBT** — "Changed Partitioning Based on Cavities": output qty + cycle time recomputed when active cavity count changes (e.g. one mold pulled for repair → 79 active). (Source: [[HYDRA 8 Function Catalog]])
- **AIP-NES** — quality data per `nest_nr` (cavity number, `char(50)`). Sample size = per-characteristic × number_of_cavities. Each mold's parts traceable. (Source: [[HYDRA AIP-CAQ Functions]])

## Real PU case: many orders × many molds on one machine (fixed slots)

Actual production reality is three nested tiers, not two:

```
MACHINE (1, fixed slots)
 ├─ Order/OP 1 = Product X → molds {…}  ┐
 ├─ Order/OP 2 = Product Y → molds {…}  │ concurrent (1..N, varies by order load)
 └─ Order/OP 3 = Product Z → molds {…}  ┘
```

Handled by **two independent capacity caps** (not one):

| Cap | Field | Governs | Set to |
|-----|-------|---------|--------|
| Parallel **orders** | Available capacity [per mill] | how many OPs at once | N_orders × 1000 |
| Parallel **molds/slots** | Anonymous resource **`Quantity`** (slot-pool) | total molds mounted at once | **fixed slot count** |
| Terminal ceiling | Logon of several OPs = Y | max OPs on MDE terminal | ≤ 20 (else MPDV) |

**Fixed slots (verified solution):** HLS capacity-checks the *tools/resources* assigned to an operation, not only the machine. Model the slots as one **anonymous resource, `Quantity = N`**; every OP lists it (`anzahl` = molds mounted). HLS enforces **Σ molds across all concurrent orders ≤ N** — regardless of order count or molds/product. Needs the secondary-resource capacity-check license.

**Manual & auto planning both fit:** manual drag warns-but-allows double assignment; auto (`graptsbap`) respects the raised capacity + slot-pool and won't overload. The "auto can't multi-assign" caveat only holds at the default 1000 capacity.

**Molds per product not fixed:** use **Log on with OP = Explicit** (operator scans mounted molds); plan against the pool with an estimated `anzahl`, exact occupancy at logon.

Full detail: [[HYDRA Multi-Tool Resource Configuration]] → "Real-world tier".

## Contrast with parallel machines

| Shape | Functions | When |
|-------|-----------|------|
| **1 machine, N mold slots** (this page) | HLS-BSR + WRM-NST + meta_res + res_ress_belegung | molds physically mounted in slots on one machine |
| **N machines in parallel** | HLS-MFB (Multiple Assignment of Resources), HLS-AGS (Operation Splitting), BDE-APF/SSG | one order quantity spread across separate machines |

> [!contradiction] These four alternate-shape function names are unverified
> `presentations/sop_hydra-multi-mold-machine.md` (a stricter re-verification pass, 2026-07-09) explicitly flags **HLS-MFB / HLS-AGS / BDE-APF / BDE-SSG** as unresolved: *"No `Functions/HLS/` folder exists in the Oct 2020 documentation set... these product-level release-note PDFs (`Products/HLS_82/HLS-MFB_82.pdf`, `HLS-AGS_82.pdf`) were located but not yet read for this rewrite."* This page states them as settled fact; treat them as candidate names only until someone opens those two PDFs directly. See [[sop-hydra-multi-mold-machine]].

## Configuration (click-path) — gap closed

Full field-level setup is now ingested in **[[HYDRA Multi-Tool Resource Configuration]]**. Summary:

1. **MOC → resources:** machine `MNR` (`meta_res='J'`), 80 molds type `WNR`, one **Family**.
2. **WRM → Master data → Required resources:** assign all 80 molds to one *required resource* = the pool. HYDRA resolves it to an actual mold at logon. (Number available = count of assigned molds.)
3. **Tool detail:** set **Original partitioning = number of cavities**, enable **"Partitioning due to cavities"** (auto-calc from cavity management), set **Target cycle**.
4. **Operation's production-resource-and-tool list:** add the required resource; set **"Log on with OP = Explicit"** so the operator scans whichever molds are mounted (Explicit only allows tools listed on the OP).
5. **Machine config for parallel OPs:** **"Logon of several OPs = Y"** (max 20 on MDE terminal) + **"Available capacity"** = N×1000 [per mill] (e.g. 2000 = two OPs at once in HLS); enable proportional machine-time posting.
6. **Runtime cavity changes:** AIP function `AIP_M_TLG_NEST` records opening/closing cavities (reason `E`/`R`), updates OP + logged-on tool partitioning, logs to machine history.

(Source: [[hydra-8-documentation]] — `MOC_ResourceConfiguration`, `AIP_M_TLG_NEST`, `Setup_AIP_QM_Cavity`)
