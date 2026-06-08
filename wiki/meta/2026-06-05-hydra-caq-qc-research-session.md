---
type: session
title: "HYDRA CAQ QC/QA Research & Ingestion"
date: 2026-06-05
tags:
  - session
  - hydra
  - caq
  - quality
  - ingestion
pages_created:
  - "wiki/sources/hydra-caq-aip-functions.md"
  - "wiki/concepts/HYDRA AIP-CAQ Functions.md"
  - "wiki/concepts/HYDRA MOC CAQ Order Type Assignment.md"
  - "wiki/concepts/HYDRA AIP-CAQ Archiving.md"
---

# HYDRA CAQ QC/QA Research & Ingestion — 2026-06-05

## Session Goal

Find HYDRA wiki content supporting QC/QA work, identify API functions for Inspection Planning and Inspection Execution in the CAQ module, then ingest source PDFs and create deep-dive wiki pages.

---

## Phase 1 — Wiki Search for HYDRA QC/QA

Searched `wiki/` and `raw/` for QC/QA, inspection, CAQ keywords.

**Primary hit:** [wiki/concepts/HYDRA CAQ Module.md](../concepts/HYDRA%20CAQ%20Module.md) (c-000165)
- 82 tables, pages 178–323 of CUT-HDB data model
- Full quality management lifecycle: inspection planning, FMEA, dynamic sampling, execution, complaints, MSA, SPC

**Secondary hit:** [wiki/concepts/HYDRA 8 Function Catalog.md](../concepts/HYDRA%208%20Function%20Catalog.md) (c-000178)
- FEP module (15–16 functions) — In-Production Inspection
- WEP module (11–13 functions) — Goods Receipt Inspection
- AIP-CAQ function — Quality data capture at workstation
- EIS-CES / SAP-QMIDI — ERP/SAP QM integration

---

## Phase 2 — Identify API Functions for Inspection Planning & Execution

### Inspection Planning Functions

| Code | Name |
|------|------|
| FEP-PPF | Inspection Planning — In-Process |
| FEP-EPF | Expanded Inspection Planning / Steps |
| FEP-FPF | Family Inspection Planning |
| FEP-PPE | Inspection Planning — Initial Sample |
| FEP-EPE | Extended Inspection Planning — Initial Sample |
| FEP-PLP | Production Control Plan |
| WEP-PPW | Goods Receipt Inspection Planning |
| WEP-EPW | Enhanced Inspection Planning / Steps (incoming) |
| WEP-DWP | Dynamic Modification — Goods Receipt Inspections |

Tables touched: `caq_pruefmatrix`, `caq_ctrl_plan`, `caq_pplkop`, `caq_ppktm_info`, `caq_ppktm_interv`

### Inspection Execution Functions (data capture layer)

| Code | Name | Purpose |
|------|------|---------|
| AIP-CAQ | AIP Functions for Quality Data | Workstation terminal writes inspection results |
| AIP-MDI | Measurement Data Interface | Automated measurement device → HYDRA |
| AIP-NUM | Quality Data — by Numbers/Serial | Capture per part/serial |
| AIP-NES | Quality Data — by Cavities | Capture per cavity/mold |
| SCS-IMM | PCC Measurement Data Interface | Machine-direct measurement feed |

Tables touched: `caq_paukop`, `caq_paustich`, `caq_paumwert`, `caq_pauanmeld`

### Integration / External API

| Code | Direction | Use |
|------|-----------|-----|
| EIS-CES | Bidirectional | HYDRA-CAQ ↔ ERP (generic) |
| SAP-QMIDI | Bidirectional | HYDRA-CAQ ↔ SAP QM via QM-IDI |

---

## Phase 3 — PDF Ingestion

Source PDFs were unreadable via built-in Read tool (requires pdftoppm). Used `pdftotext` (available via mingw64) to extract text.

### PDFs Extracted

| File | Pages | Lines extracted |
|------|-------|----------------|
| `AIP-CAQ.pdf` (v1.15.20405) | 89 | 2664 |
| `AIP2-CAQ.pdf` (v1.8.20694) | 91 | 2338 |
| `MBL_Archiving_CAQ.pdf` (v1.4.16740) | 9 | 323 |
| `MOC_OrderTypeCAQAssignment.pdf` (v1.3.23364) | 4 | 125 |

---

## Phase 4 — Wiki Pages Created

### [wiki/sources/hydra-caq-aip-functions.md](../sources/hydra-caq-aip-functions.md) — c-000205
Full raw extract of all 4 PDFs. Covers:
- AIP-CAQ / AIP2-CAQ complete function documentation
- MOC Order Type CAQ Assignment configuration reference
- MBL CAQ Archiving configuration reference

### [wiki/concepts/HYDRA AIP-CAQ Functions.md](../concepts/HYDRA%20AIP-CAQ%20Functions.md) — c-000206 ⭐ Deep Dive

Inspection execution flow:
```
Order log-on (BDE)
  → Inspection step identified from inspection plan
  → Inspection point created (time/piece/machine trigger or manual)
  → Inspector opens inspection list on AIP terminal
  → For each characteristic: variable / attributive / chart / cavity / catalog
  → Save measured value → caq_paumwert  (CPAUMW.INSERT)
  → Complete inspection point → caq_paukop  (CPANUMP.ABSCHLIESSEN)
  → Usage decision (pass / fail / conditionally pass)
```

Data collection types documented:
- Variable, Attributive, Inspection Chart, Cavity, Visual Defects, Catalog-based, Calculated

DB action → table mapping:

| Dialog action | Primary table |
|---------------|---------------|
| CPAUMW.INSERT/UPDATE/MODIFY | caq_paumwert |
| CPANUMP.ABSCHLIESSEN/UPDATE | caq_paukop / caq_ppktm_info |
| CPAUERR.INSERT/DELETE | caq_fhlanal |
| CMASSN.INSERT | caq_massn |

MDI filter parameters: ANR, AGNR, ATK, CNR, MNR, PPKT:EQUIP, PPKT:PROBE, PPKT:USERC1/C2/N1/N2

Config files: `caq_dc_t.ini`, `hytnrcfg.ini`, `caq72.ini`, `caq_async.ini`, `qee_insppoint.ini`

### [wiki/concepts/HYDRA MOC CAQ Order Type Assignment.md](../concepts/HYDRA%20MOC%20CAQ%20Order%20Type%20Assignment.md) — c-000207
Transaction `ortycaq` — links BDE order types to CAQ areas.
Action values: `PAN_AU/A_AN`, `PAN_AG/A_AN`, `PAN_AU/A_ST`, `PAN_AU/AUNR_COPY`
Addition parameters: `[AUNR,AGNR]`, `[ATK_AG]`, `[AUST_Q/Z:<status>]`

### [wiki/concepts/HYDRA AIP-CAQ Archiving.md](../concepts/HYDRA%20AIP-CAQ%20Archiving.md) — c-000208
Two-step archiving pipeline (online → medium-term → long-term).
Default intervals: 1 year → 3 years for FEP/WEP/WAP/EMU; 35 days → 3 years for events/logs.
Source tables archived: `caq_pruefanf`, `caq_paukop`, `caq_paumwert`, `caq_paustich`, `caq_fhlanal`, `caq_merkmal`, and 10+ more.

---

## Key Takeaways

1. **HYDRA has no REST API for CAQ** — interaction is through the AIP terminal layer (AIP-CAQ module), MDI device interface, or ERP integration (EIS-CES / SAP-QMIDI).
2. **AIP-CAQ** is the primary "API" for inspection execution — terminal software that writes to `caq_paumwert` (measured values) and `caq_paukop` (inspection orders).
3. **Inspection Planning** is configured in MOC (Management Cockpit web admin) via FEP/WEP functions, stored in `caq_pruefmatrix` / `caq_ctrl_plan` / `caq_pplkop`.
4. **Order type → inspection trigger** configured via `ortycaq` in MOC, linking BDE operations to CAQ inspection requirement generation.
5. **Async processing** available for all major CAQ dialogs via `caq_async.ini` — reduces terminal blocking on heavy inspection workloads.
