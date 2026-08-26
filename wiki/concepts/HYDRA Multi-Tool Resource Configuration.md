---
type: concept
title: "HYDRA Multi-Tool Resource Configuration"
created: 2026-06-30
updated: 2026-07-14
address: c-000277
tags:
  - concept
  - mes
  - hydra
  - wrm
  - hls
  - molds
  - cavities
  - configuration
status: developing
related:
  - "[[HYDRA WRM Module]]"
  - "[[HYDRA HLS Module]]"
  - "[[HYDRA BDE Module]]"
  - "[[hydra-multi-mold-machine]]"
  - "[[MPDV HYDRA]]"
sources:
  - "[[hydra-8-documentation]]"
  - "[[hydra-cuthdb-data-model]]"
  - "[[sop-hydra-multi-mold-machine]]"
complexity: intermediate
domain: "Manufacturing Execution Systems"
---

# HYDRA Multi-Tool Resource Configuration

The MOC/WRM click-path for: **one machine carrying many molds**, **mold pools**, **cavity-based quantity partitioning**, and **multiple operations in parallel**. Closes the field-level gap left by [[hydra-multi-mold-machine]].

Configured in **MOC → Workplace and Resource Configuration** (`MOC_ResourceConfiguration`). (Source: [[hydra-8-documentation]])

## Resource types

Predefined types (MOC). Use the predefined ones.

| Code | Meaning |
|------|---------|
| `MNR` | Workplace / machine |
| `WNR` / `WZ` | **Tool** (mold) |
| `TEM` | Tempering equipment |
| `VOR` | Device |
| `DNC` | NC programs (handled separately — don't auto-logon) |
| `PAC` | Packaging / transport container |
| `ENT` | Removal device |
| `PRU` | Setup staff |

> [!note] Two different predefined-type tables
> `MOC_ResourceTypes.pdf` p.1 lists 8 core codes (`MNR`/`WNR`/`PER`/`PRM`/`VOR`/`DNC`/`DOC`/`ENE` — the ones users cannot delete). `MOC_ResourceConfiguration.pdf` p.2 carries a second, longer 12-code table under the **Resource type** field description, adding `ENT`, `PAC`, `PRU`, `TEM` on top of the core set. Both are correct — they're just different pages of the same product-family list. (Source: `sop_hydra-multi-mold-machine.md`, cross-checking `CUT-HDB_DataModel_2021.pdf` p.784 `res_ress_typen.typ`.)

## The mold pool — "Required resource"

This is the exact "80 molds, pick any" mechanism.

> "A **required resource** stands for one or more actual resources that can be identified. Specify in the configuration **WRM: Master data → Required resources** which resources are represented by a required resource. The number results from the number of actual resources assigned to the required resource."

- Set the **Required resource** option on the pool resource.
- Assign all ~80 actual molds to it under **WRM → Master data → Required resources**.
- The order's operation lists the *required resource*; at logon HYDRA resolves it to one of the actual molds.
- Empty option = resource is implicitly an actual (single) resource.

**Anonymous resource** is the alternative: set option + `Quantity > 1` = "how many of these resources are available" (no per-unit traceability — can't post data onto anonymous resources).

## Cavity-based partitioning (tool detail)

A mold's **partitioning = number of cavities**. This is how output qty per cycle is derived.

| Field | Meaning |
|-------|---------|
| **Target cycle** | target duration (s) for 1000 machine cycles using this tool |
| **Original partitioning** | partitioning of the tool = **number of cavities** when using this tool |
| **Current partitioning** | may deviate from original (e.g. cavity blocked by defect). **Always post cycles against current partitioning.** |
| **Partitioning due to cavities** (option) | system (re-)calculates current + original partitioning from **cavity management** values; fields then become read-only |

> The partitioning stored in the **OP** is what HLS uses for planning and MDE uses at the terminal.

**Machine-specific partitioning**: machine-specific value × OP partitioning → quantity calc. Enter `1` to disable.

## Attaching the mold to the operation — "Log on with OP"

The mold must be a **component in the operation's list of production resources and tools**. Then:

| Value | Behaviour |
|-------|-----------|
| **None** | resource not logged on |
| **Implicit** | system auto-logs the assigned tool; operator cannot change |
| **Explicit** | operator may log on the assigned tool **or another tool of the same resource type** from the operation's list (so the listed tool acts as a default) |

> Explicit logon only permits resources already listed as a requirement on the operation. You cannot log on a tool that isn't in the list. The system also logs on resources defined in the **BOM of the machine**.

→ For an 80-mold pool, list the **required resource** (the pool) on the OP and use **Explicit** so the operator scans whichever molds are physically mounted.

## Running operations in parallel on one machine

Two independent levers:

**1. Logon of several OPs** (machine option)

| Value | Meaning |
|-------|---------|
| `Y` | log on as many OPs as needed simultaneously (**max 20** on an MDE terminal; beyond 20 needs MPDV review) |
| `N` | one OP only |
| `1…9` | max n OPs |

- **Posting of machine time with simultaneously logged-on operations** = posts machine time *proportionately* across the OPs.

**2. Available capacity [per mill]** (HLS scheduling lever)

> Shop-Floor Scheduling assumes each OP needs 1000 [per mill] = exactly one OP per machine at a time. To allow multiple assignment, raise it: e.g. **2000** = two OPs in parallel. Blank or `0` = default 1000. Requires a license.

- Manual multiple assignment → warning dialog about the double booking.
- Automatic assignment honours the raised capacity.

**Parallel output batches** (resource type `D`, MPL only): produce parallel output batches on the machine for a batch-managed operation.

## Terminal: recording cavity changes — `AIP_M_TLG_NEST`

AIP function "Recording the Cavity-Related Partitioning". Used when **cavities are opened/closed** mid-run.

- Changing the partitioning (parts per cycle) updates the partitioning stored for the **selected OP**, and — if WRM is used — also for the **currently logged-on tool**. Documented in **machine history**.
- Mandatory fields: **Cavity number** (pick from list when WRM active, else manual), **Reason** (type `E` = increase / `R` = reduction, configured under client "reasons"), **Staff badge** (must be HR-authorized to change cycle/partitioning). Comment optional.
- Server-side change (so only applies while conditions allow).

## QM per cavity setup — `Setup_AIP_QM_Cavity`

Per-cavity quality entry on AIP needs dialog `QEE_MW_ME_ES_PP_SI` loaded (`aip_qm_cavity.dlg`) and activated via **System settings → Terminals → Dynamic dialogs** (transaction `ddconf`, HYDRA Professional Mode); copy to terminal groups if used. Per-cavity QC captured under `nest_nr`. See [[HYDRA AIP-CAQ Functions]].

## Real-world tier: many orders × many molds on one machine (fixed slots)

The common production reality (e.g. a PU machine): **one machine runs several orders at once (each order = a different product), and each product mounts a variable number of molds.** Three nested tiers:

```
MACHINE (1, fixed physical slots)
 ├─ Order/OP 1  = Product X  → molds {…}   ┐
 ├─ Order/OP 2  = Product Y  → molds {…}   │ concurrent
 └─ Order/OP 3  = Product Z  → molds {…}   ┘
```

This is handled by **two independent capacity caps**, not one:

| Cap | Field | Governs | Set to |
|-----|-------|---------|--------|
| Parallel **orders** | **Available capacity** [per mill] (machine) | how many OPs may run at once | N_orders × 1000 |
| Parallel **molds / slots** | **Anonymous resource `Quantity`** (slot-pool) | total molds mounted across all orders at once | fixed physical slot count |
| Terminal ceiling | **Logon of several OPs = Y** | max simultaneous OPs on MDE terminal | ≤ 20 (beyond needs MPDV) |

### Enforcing fixed slots — the anonymous slot-pool

HLS capacity checking covers **the tools/resources assigned to an operation**, not only the machine:

> "Checking the used capacity — the system checks the workplace *and the production resources and tools assigned to the operation, provided that they have been defined as resources in the system* (depending on license)." (`MOC_SchedulingAndAllocation`)

Combined with the **anonymous resource** quantity:

> "A value > 1 indicates how many of these resources are available." (`MOC_ResourceConfiguration`)

**Model the machine's slots as one anonymous resource with `Quantity = N` (the fixed slot count).** Every operation lists it as a required production resource with `anzahl` = molds that product mounts. HLS then enforces **Σ molds across all concurrent orders ≤ N slots** — independent of how many orders run or how many molds each product uses. Overload = a capacity conflict (blocked in manual planning, avoided by auto-planning). *Requires the secondary-resource capacity-check license.*

### Manual **and** automatic planning both work

- **Manual** (graphic planning): drag multiple OPs onto one machine; the system warns on double assignment but permits it. Molds planned simultaneously show as bars *one under another* on the resource line (`MOC_ResourceAllocation`).
- **Automatic** (`MOC_SchedulingAndAllocation §1.7`, extension `graptsbap`): honours the raised **Available capacity** *and* the slot-pool/tool capacity; it will not plan an OP that overloads either. The "multiple assignment not feasible in auto" caveat only applies at the **default 1000** capacity — once capacity is raised, auto packs orders correctly.

### Variable molds per product

Molds per product are **not fixed** → set **Log on with OP = Explicit** so the operator scans the molds actually mounted. For planning, list the **required resource (mold pool)** with `anzahl` = a typical count; the actual molds resolve at logon (`res_ress_belegung`). Planning is an estimate; runtime occupancy is exact.

### Licenses to confirm

Secondary-resource capacity check · Available-capacity / multiple assignment · auto-planning extension `graptsbap` · terminal ≤ 20 concurrent OPs.

## `res_ress_belegung` write-trigger — how occupancy rows actually get created

The occupancy table itself (`belegungsart`/`ressource`/`ress_typ`/`anzahl`/`bel_von_dat`…`bel_bis_dat`) is confirmed via CUT-HDB p.783. What creates a row was a gap until cross-checked against the SAP-interface docs: `Products/SCS_81/SCS-PDM_81.pdf` p.313 and `Products/SCS_81/SCS-SIF_81.pdf` p.493 (identical text) document dialog **`RES_STATUS`** ("Set resource status"):

> "Resource allocation in res_ress_belegung is updated respectively. If a resource is blocked, i.e. it gets a status with the ID 'verarb_planung' != 'K' an entry is made in res_ress_belegung."

The block window uses fields `DATB`/`ZEIB` (start date/time) and `DATE`/`ZEIE` (end date/time) — the functional-doc names for CUT-HDB's `bel_von_dat`/`bel_von_zeit`/`bel_bis_dat`/`bel_bis_zeit`. An entry is made only if current time falls within that window; an already-past end date is ignored.

`RES_STATUS` is one of the bare-mnemonic WRM dialogs exposed through [[HYDRA Service Interface (SIF)|SIF]]'s legacy-dialog bridge — see [[HYDRA SIF DLG Service Catalog]] Ch.18-19. So an external system (or the AIP terminal, which calls the same dialog layer) blocking/unblocking a mold resource via `RES_STATUS` is what keeps `res_ress_belegung` in sync with reality, independent of whether the block originates from WRM Cavity Management, a lock, or a maintenance window.

## Multiple molds per order simultaneously — open mechanism, not yet validated

> [!gap] Everything above resolves ONE Required resource to ONE mold at logon
> Steps and examples throughout this page (and [[hydra-multi-mold-machine]]) only cover a Required resource pool resolving to a single actual mold per logon. None of the Oct 2020 docs or CUT-HDB give a worked example of **one order ending up with several molds running concurrently in different slots** from a single logon action — the scenario this page's "many-slots" framing implies but never actually demonstrates end-to-end.

**Proposed mechanism** (inferred from combining "Required resource → resolves to one mold" with the operation's tool-list field being plural — "list of production resources and tools" — which already carries the machine, an optional slot-cap anonymous resource, staff, etc.):

1. For each slot position (Slot 1 … Slot N), create its own mold pool: `WNR` mold resources, one Family id per slot, assigned to a **dedicated Required resource per slot** — N distinct Required resources, not one shared pool.
2. Add all N Required resources as **separate entries** on the operation's tool list, each with **Log on with OP = Explicit**.
3. At logon, the operator resolves each slot's Required resource independently — one mold per slot line, each with its own identity for posting.

Do not confuse this with two other mechanisms already on this page that solve different problems: **"Logon of several OPs"** governs multiple *orders* sharing the machine, not multiple molds on one order; **"Parallel logon/planning possible"** covers the *same single resource* logged on twice under one OP (proportional posting), not multiple *distinct* resources running together.

Treat as a logical extension of already-cited fields, not a separately-sourced claim, until validated against a live HYDRA client. (Source: `presentations/sop_hydra-multi-mold-machine.md` § "If one order needs multiple molds at once".)

## End-to-end config checklist

1. MOC → resources: machine `MNR` (`meta_res='J'`), molds `WNR`, one **Family**.
2. WRM → Master data → **Required resources**: assign molds to one required resource (the pool) per product.
3. Create the **anonymous slot-pool** resource, `Quantity = N` (fixed physical slots on the machine).
4. Each mold tool detail: set **Original partitioning = cavities**, enable **Partitioning due to cavities**, set **Target cycle**.
5. Operation's production-resource-and-tool list: add the **required resource** (`anzahl` = molds mounted) **and the slot-pool**; set **Log on with OP = Explicit**.
6. Machine config: **Logon of several OPs = Y** (≤20); **Available capacity = N_orders×1000** [per mill]; enable proportional machine-time posting.
7. Planning: manual drag or auto (`graptsbap`) — both respect the two caps.
8. Runtime: occupancy in `res_ress_belegung` (`belegungsart A/S/W`); cavity changes via `AIP_M_TLG_NEST`; QC per `nest_nr` (AIP-NES).
