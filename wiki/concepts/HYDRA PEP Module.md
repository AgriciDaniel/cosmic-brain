---
type: concept
title: "HYDRA PEP Module"
created: 2026-05-26
updated: 2026-05-26
address: c-000173
tags:
  - concept
  - mes
  - planning
  - scheduling
  - qualifications
  - hydra
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[HYDRA BDE Module]]"
  - "[[HYDRA PZE Module]]"
  - "[[hydra-cuthdb-data-model]]"
sources:
  - "[[hydra-cuthdb-data-model]]"
complexity: basic
domain: "Manufacturing Execution Systems"
---

# HYDRA PEP Module

**Product group:** PEP (Personal-/Produktionsplanung — Personnel & Production Planning)
**Tables:** 4
**Pages:** 658-661

## Purpose

PEP is the smallest module in HYDRA, focused on machine scheduling and personnel/machine qualifications. It connects personnel to machines through qualification matrices and manages machine occupancy planning.

## Core Tables

### pep_masch_belegung — Machine Scheduling
Machine occupancy/assignment planning. Tracks which personnel are assigned to which machines for which time periods.

**Key columns:**
- `person` — Personnel number
- `maschine` — Workplace/machine identifier
- `auftrag_nr` — Order number
- `startdatum` / `startzeit` — Assignment start
- `endedatum` / `endezeit` — Assignment end
- `belegung` — Assignment percentage (personnel capacity in percent)
- `fixiert` — Fixed flag (determines if the assignment is locked)
- `sim_nr` / `sim_usr` — Simulation number and console (supports what-if scheduling scenarios)
- `firma` — Company context
- `qual_id` — Qualification reference

### pep_qual_maschine — Machine Qualifications
Defines which qualifications are relevant for which machines. Creates the machine-side of the qualification matrix.

### pep_qual_person — Personnel Qualifications
Defines which qualifications each person holds. Creates the personnel-side of the qualification matrix.

### pep_qualifikation — Qualification Catalog
Master catalog of all possible qualifications. Each qualification can be required by machines and held by personnel, enabling the scheduling system to match qualified workers to machines.

## Qualification Matrix

PEP implements a three-table qualification matrix:
```
pep_qualifikation (catalog)
    ├── pep_qual_maschine (machine requires qualification)
    └── pep_qual_person (person holds qualification)

pep_masch_belegung (actual assignment with qual_id validation)
```

The scheduling system uses this matrix to ensure only qualified personnel are assigned to machines. The simulation support (`sim_nr`, `sim_usr`) allows running what-if scenarios without affecting live assignments.
