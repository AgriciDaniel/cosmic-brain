---
type: concept
title: "HYDRA AIP-CAQ Functions"
created: 2026-06-05
updated: 2026-06-05
address: c-000206
tags:
  - concept
  - mes
  - caq
  - aip
  - quality
  - inspection
  - hydra
status: complete
related:
  - "[[HYDRA CAQ Module]]"
  - "[[HYDRA 8 Function Catalog]]"
  - "[[HYDRA AIP-CAQ Archiving]]"
  - "[[HYDRA MOC CAQ Order Type Assignment]]"
  - "[[HYDRA PDV Module]]"
sources:
  - "[[hydra-caq-aip-functions]]"
complexity: advanced
domain: "Manufacturing Execution Systems"
---

# HYDRA AIP-CAQ Functions

**Module code:** AIP-CAQ (v1.15, AIP 8.1/8.2) / AIP2-CAQ (v1.8, AIP2 8.2)
**Function:** Quality data collection and information functions on the AIP terminal
**Related tables:** `caq_paukop`, `caq_paustich`, `caq_paumwert`, `caq_pauanmeld`, `caq_ppktm_info`

## Purpose

AIP-CAQ is the shop floor terminal layer for HYDRA CAQ. It bridges the [[HYDRA CAQ Module]] inspection planning (FEP/WEP) with actual data collection at the workstation.

Modes of operation:
- **Combined BDE + CAQ**: inspection step identified automatically on operation log-on; inspection plan resolves from article + operation number
- **Exclusive QM terminal**: AIP used solely for inspection data recording
- Covers: in-production (FEP), goods receipt/issue (WEP/WAP), initial sample (EMU), calibration (PMV)

## Inspection Data Collection Flow

```
Order log-on (BDE)
      ↓
Inspection step identified from inspection plan
      ↓
Inspection point created (or triggered by: time interval, piece count, machine status change)
      ↓
Inspector opens inspection list on AIP terminal
      ↓
For each characteristic:  variable / attributive / inspection chart / cavity / catalog
      ↓
Save measured value → caq_paumwert  (via CPAUMW.INSERT)
Complete inspection point → caq_paukop  (via CPANUMP.ABSCHLIESSEN)
      ↓
Usage decision (pass / fail / conditionally pass)
```

## Inspection Trigger Events

Inspections can be triggered by:
- Time interval
- Piece count interval
- Machine status change
- Manual creation via "New inspection point" button
- Sampling (generates physical samples for inspection)

## Data Collection Types

### Variable Collection (`QEE_MW_ME_ES_PP_SI`)
Records single numeric measured values per sample.
- MDI auto-fill: requests all MDI driver values for the channel
- Key DB action: `CPAUMW.INSERT`
- Supports asynchronous processing

### Attributive Collection (`QEE_MM_BE_ST_PP_SI`)
Records pass/fail counts: Checked units + Non-conforming units.
- Default: 0 non-conforming, sample-size pre-filled for checked units
- Includes failure data tab (failure type, location, cause)
- Key DB action: `CPAUMW.INSERT`

### Inspection Chart (`QEE_MM_BE_ST_PP_FS`)
Records failure type distribution per sample.
- Non-conforming units auto-calculated from sum of failure entries
- No automatic failures generated
- Key DB action: `CPAUMW.INSERT`

### Variable with Cavity
- Only for variable characteristics + inspection points
- Tool assigned to inspection point → cavity list populated
- Sample size = sample_size_per_char × number_of_cavities
- NEST parameter mandatory in MDI

### Visual Defects Recording (`BEWERT_STICHPR_PPUNKT_RASTER`) — CAQ 8.2
- Image-based defect position marking (JPEG/PNG)
- X/Y coordinates + failure type stored

### Catalog-Based Inspection (`CODE_STICHPR_PPUNKT_SIMPLE`) — CAQ 8.2
- Attributive characteristics via assessment catalogs
- Group/Code selection (read-only after pick)

### Calculated Characteristics (`MESSW_ESTCK_PPUNKT_CALC`) — CAQ 8.2
- Up to 10 argument fields (dynamic, formula-driven)
- MDI fills argument fields; "Calculate" button computes result
- Dialog: `QEE_MM_ME_ES_PP_CA`

### Sampling (`QEE_MM_PR_PP_SI`)
- Triggers physical sample generation
- Returns sample number on success
- "Generate sample" button → not possible offline

## Inspection Point Lifecycle (DB)

| Event | Dialog action | Primary table |
|-------|--------------|---------------|
| Create inspection point | `CPANUMP.INSERT` | `caq_ppktm_info` |
| Update inspection point fields | `CPANUMP.UPDATE` | `caq_ppktm_info` |
| Complete inspection point (usage decision) | `CPANUMP.ABSCHLIESSEN` | `caq_paukop` |
| Insert measured value | `CPAUMW.INSERT` | `caq_paumwert` |
| Update measured value | `CPAUMW.UPDATE` | `caq_paumwert` |
| Modify measured value | `CPAUMW.MODIFY` | `caq_paumwert` |
| Insert failure | `CPAUERR.INSERT` | `caq_fhlanal` |
| Delete failure | `CPAUERR.DELETE` | `caq_fhlanal` |
| Insert measure | `CMASSN.INSERT` | `caq_massn` |

## MDI Integration

AIP-CAQ integrates with external measurement devices via MDI (Measurement Data Interface).

Filter criteria sent to MDI driver when requesting values:

| Parameter | Meaning |
|-----------|---------|
| `ANR` | Inspection requirement order number |
| `AGNR` | Operation number |
| `ATK` | Article number |
| `CNR` | ERP batch |
| `MNR` | Workplace/machine |
| `PPKT:TLOS` | Partial batch of inspection point |
| `PPKT:CNR` | ERP batch of inspection point |
| `PPKT:EQUIP` | Tool |
| `PPKT:PROBE` | Sample |
| `PPKT:USERC1/C2` | User fields C1/C2 |
| `PPKT:USERN1/N2` | User fields N1/N2 |

MDI measured value fields stored:

| Field | Mandatory | Description |
|-------|-----------|-------------|
| `MVALUE` | Yes | Actual measured value |
| `SERIAL` | No | Unique MDI value ID |
| `MDATE` | No | Collection date |
| `MTIME` | No | Collection time |
| `MFROM` | No | Inspector name |
| `MTEXT` | No | Comment |
| `NEST` | Conditional | Cavity number (mandatory for cavity characteristics) |

**Rule:** Only `CONFIRMED=1` values processed. `CONFIRMED=0` deleted without posting.

Log location: `<system>\prot\hy_cmdilrv_AUFTRAG_CAPTURE_*.csv`

## Key Configuration Files

| File | Scope |
|------|-------|
| `caq_dc_t.ini` | Inspection list button layout, update mode, document management buttons |
| `caq72.ini` | CAQ action after queue mode |
| `hytnrcfg.ini` | Preceding inspection point list, ENTER key save, terminal-level options |
| `caq_async.ini` | Asynchronous processing per dialog/action |
| `qee_insppoint.ini` | Inspection point optional field display (`SHOW_OPTIONAL_USERFIELDS`) |
| `mm_be_st_pp_si.ini` / `qee_mm_be_st_pp_si.ini` | Attributive collection layout |
| `mm_be_st_pp_fs.ini` / `qee_mm_be_st_pp_fs.ini` | Inspection chart layout |
| `ctaiplay.ini` | General AIP layout |
| `qee_err_classic.ini` | Classic failure recording |

## Inspector Identification

**Constant user**: Badge entered once before opening inspection list.
Config: MOC → File → Status information → Terminal status → CAQ tab → *Inspector identification before opening inspection dialog*. Sub-option: *Only if inspector is unknown*.

**Changing user**: Badge entered manually per dialog (or validated server-side).

## Advanced Features

### Asynchronous Processing
Server returns "OK" immediately; processes data in background. Error messages visible in MOC → System administration → Logging → Dialog error logs.

Enable globally: `caq_async.ini` → `[System] ENABLE_ASYNC=ON`
Disable per dialog: `[QEE_MW_ME_ES_PP_SI] CPAUMW.INSERT=OFF`

### Preceding Inspection Point List (CAQ 8.2)
Opens a pre-filter list before the full inspection list. User selects one inspection point, inspection list loads only that point's data → better performance with many inspection points.

```ini
# hytnrcfg.ini
[CAQ->Optionen 0]
LOAD_MEASUREMENTS_ON_DEMAND=ON
INTERPOSE_FUNCTION=QEE_FILTER_INSPPOINT
RECALL_ON_EXIT_INSP_LIST=ON
REQUEST_RELOAD_ON_EXIT_INSP_LIST=MNR,ANR
```

### Transfer Measured Values for All Characteristics
Button `DQC_TRANSFER_DATA` sends all variable characteristic values for the selected inspection point in one action.

```ini
# caq_dc_t.ini
[CAQ_DC_T-PPKT-Page2]
1=DQC_TRANSFER_DATA,L,accept measurement data
2=DQC_RELOAD,R,update display
```

### ENTER Key to Save (CAQ 8.2)
```ini
# hytnrcfg.ini
[DYNAMIC-DIALOG->Options 0]
USE_ENTER_BUTTON=1
```

### Quality Status Symbols (CAQ 8.2 add-on)
Calculated from tolerance/action limits in real-time as values are entered:
- Upper/lower tolerance limit violated → fail
- Upper/lower action limit violated → conditionally pass
- Non-conforming units between acceptance and rejection quantity → conditionally pass
- Non-conforming units ≥ rejection quantity → fail

### Automatic Inspection Point Completion (CAQ 8.2 add-on)
Options: *All* (complete on last value) or *Only valid* (only if quality status = pass/conditionally pass).

## Queue Mode (Shift Change)

During shift change, CAQ activities (save measured value, create/complete inspection point) queued. Inspection points generated on server during shift change invisible on AIP until shift change completes and queue processes.

`caq_dc_t.ini` button IDs for update functions:
- `DQC_RELOAD_LEGACY` — update all (AIP 8.1 ≤2.0.2.50)
- `DQC_RELOAD_PPKT` — update inspection point (AIP 8.1 ≥2.0.2.51)
- `DQC_RELOAD` — intelligent update (auto-selects based on context)

## Due Date Status Colors

| Status | Meaning |
|--------|---------|
| Error | Incorrect configuration |
| due for x minute(s) | Entry required; minimum not reached |
| checked (light green) | Minimum inspection scope reached |
| completed | Inspection step/requirement fully done |

AIP2 adds: *checked (light green)* also for "minimum scope not reached" but with attributive chars = scope reached when inspected parts = inspection scope.

## Related Modules

- [[HYDRA CAQ Module]] — inspection plan data (caq_pruefmatrix, caq_ctrl_plan, caq_merkmal)
- [[HYDRA MOC CAQ Order Type Assignment]] — how order types trigger inspection requirements
- [[HYDRA AIP-CAQ Archiving]] — lifecycle and data retention
- [[HYDRA PDV Module]] — process data (AIP-PDV for process values at terminal)
