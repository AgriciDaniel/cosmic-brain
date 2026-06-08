---
name: hydra-caq-aip-functions
description: "Extracted content from AIP-CAQ.pdf, AIP2-CAQ.pdf, MBL_Archiving_CAQ.pdf, MOC_OrderTypeCAQAssignment.pdf — HYDRA 8 quality data collection on the AIP terminal"
metadata:
  type: source
  sourceFiles:
    - "raw/hydra/HYDRA_8_Documentation Oct 2020/Functions/AIP/AIP-CAQ.pdf (v1.15.20405, 89 pages)"
    - "raw/hydra/HYDRA_8_Documentation Oct 2020/Functions/AIP/AIP2-CAQ.pdf (v1.8.20694, 91 pages)"
    - "raw/hydra/HYDRA_8_Documentation Oct 2020/Functions/MBL/MBL_Archiving_CAQ.pdf (v1.4.16740, 9 pages)"
    - "raw/hydra/HYDRA_8_Documentation Oct 2020/Functions/MOC/MOC_OrderTypeCAQAssignment.pdf (v1.3.23364, 4 pages)"
  extractedDate: 2026-06-05
---

# HYDRA CAQ AIP Functions — Source Extract

## AIP-CAQ / AIP2-CAQ — Functions for Quality Data on the AIP

### Purpose

The CAQ basic functionality provides inspection steps to perform inspections. In combined BDE + CAQ operation mode, the system identifies the inspection step when an operation is logged on, or identifies the inspection plan for an article and operation number. Using the inspection plan, the inspection step is created and logged on with the operation. Different events can trigger an inspection (time and piece interval, machine status change, etc.).

The AIP can also be used as an exclusive inspection station to record inspection data. In addition to in-production inspections, the AIP is used for goods receipt/issue inspections, initial sample inspections, and calibrations.

### Main View Integration

If a terminal is operated as a QM terminal, CAQ data is integrated in the "tabular presentation". Both the machine list and order list show two additional columns: **Inspection status** and **Time** (due date status).

Due date status components:
- Colored inspection status symbol
- Inspection status in text form
- Time

Due date status values:
- Error (incorrect configuration)
- due for x minute(s) — entry required to reach minimum inspections
- checked — minimum inspection scope reached
- completed — inspection step or requirement completed

### Queue Mode (Shift Change)

During shift change, requests are collected in a queue and processed after the shift change. CAQ inspection activities (save measured value, create/complete inspection point) are also queued. Inspection points generated on the server during shift change cannot be seen on the AIP.

Config: `caq_dc_t.ini` (message texts), `caq72.ini` (CAQ action after queue mode)

### Inspector ID

Two modes:
- **Constant user**: badge number entered once, constant for all subsequent input dialogs. Config: MOC → File → Status information → Terminal status → CAQ tab → "Inspector identification before opening inspection dialog"
- **Changing user**: badge number entered manually per dialog if needed

### Recording of Inspection Results

Dialog divided into two windows:
- **Left**: Inspection list (tree structure, always fully expanded)
- **Right**: Input panel (detail data for selected element)

Inspection list buttons (page 1 — context-sensitive):
- **Close** — exit inspection results recording
- **New inspection point** — manually create a new inspection point
- **New measurement** — create action element for a new measurement
- **Show info** — show characteristic information

Inspection list buttons (page 2 — update):
- `DQC_RELOAD_LEGACY` — update all (AIP 8.1 default ≤2.0.2.50)
- `DQC_RELOAD_PPKT` — update inspection point (AIP 8.1 default ≥2.0.2.51)
- `DQC_RELOAD` — intelligent update (selects update-all or update-point based on context)

### Collection Status (Color Coding)

- Error/incorrect configuration
- Data collection required
- Further data can be recorded
- No further data can be recorded but corrected
- Completed

### Input Functions / Inspection Data Types

#### With Inspection Points

**Inspection step**
- Information only (order, operation, article, inspection requirement). No user interaction.

**Inspection point** (`QEE_INSPPOINT`, `QEE_INSPPOINT_DETAIL`)
- Tab 1 "Identification": machine (read-only), date (USER_D1), time (USER_T1), user fields USERC1/USERC2, equipment, tplatz, probe
- Tab 2 "Details": partial batch, ERP batch, usage decision (Group/Code), completes inspection point
- Config: `qee_insppoint.ini` → `SHOW_OPTIONAL_USERFIELDS=[ON,OFF]`

**Inspection point characteristic**
- Summary of characteristic inspections for an inspection point. Read-only.

**Attributive collection** (`QEE_MM_BE_ST_PP_SI`, `QEE_MM_BE_ST_SI`)
- Fields: Non-conforming units (default 0), Checked units (preset to sample size), Inspector
- Includes "Failure data" tab (Classic recording of failures)
- Config: `mm_be_st_pp_si.ini`, `qee_mm_be_st_pp_si.ini`, `ctaiplay.ini`, `qee_err_classic.ini`

**Variable collection** (`QEE_MW_ME_ES_PP_SI`, `QEE_MW_ME_ES_ST_SI`)
- Single values for sample of inspection point
- MDI connection: requests all MDI driver values for corresponding channel
- Comment field (CPAUMW.BEM, 250 DB / 29 display chars)

**Inspection chart** (`QEE_MM_BE_ST_PP_FS`, `QEE_MM_BE_ST_FS`)
- Record failure types per sample for an inspection point
- Fields: Checked units, Non-conforming units (auto-calculated from failure type sum), failure entries per type
- Config: `ctaiplay.ini`, `mm_be_st_pp_fs.ini`, `qee_mm_be_st_pp_fs.ini`

**Variable data collection with cavity**
- Only for variable characteristics. Requires inspection points (tool assigned to inspection point defines cavity count)
- Cavity field: pre-filled from tool cavity list, editable until value saved
- Sample size = sample_size × number_of_cavities
- Config: AIP-NES module required

**Visual assignment of failures** (CAQ 8.2) — input type `BEWERT_STICHPR_PPUNKT_RASTER`
- Enter defect positions in a grid image (JPEG/JPG/PNG)
- X/Y position fields, failure type selection, checked/defective fields

**Inspections based on catalogs** (CAQ 8.2) — input type `CODE_STICHPR_PPUNKT_SIMPLE`
- Attributive characteristics via assessment catalogs
- Group/Code fields (read-only after selection), Checked, Defective, Inspector mandatory

**Inspections based on catalogs (random)** (CAQ 8.2) — input type `CODE_STICHPR_PPUNKT_ZUF_SIMPLE`
- Same as catalog-based, with random selection of entries

#### Without Inspection Points (Sample-Related)

**Attributive collection** — equivalent to `BEWERT_STICHPR_PPUNKT_SIMPLE`, data refers to machine-dependent sample

**Variable collection** — equivalent to `MESSW_ESTCK_PPUNKT_SIMPLE`, data refers to sample

**Inspection chart** — equivalent to `BEWERT_STICHPR_PPUNKT_FSK`, data refers to sample

#### Sampling

**Sampling (simplified)** (`QEE_MM_PR_PP_SI`)
- "Generate sample" button → creates new sample, returns sample number
- Collection status constant: configured in system (default: data collection required)
- Cannot generate samples in offline status (buffered)

**Advanced Sampling** (CAQ 8.2)
- Same as simplified but collection status changes like attributive characteristics (tracks generated samples vs. sample size field)

### Quality Status Display (CAQ 8.2 add-on)

Symbols calculated from tolerance/action limits and quantities:
- Upper tolerance limit violated (fail)
- Upper action limit violated (conditionally pass)
- Lower tolerance limit violated (fail)
- Lower action limit violated (conditionally pass)
- Non-conforming units — conditionally pass (between acceptance and rejection qty)
- Non-conforming units — fail (≥ rejection quantity)

### Automatic Completion of Inspection Points (CAQ 8.2 add-on)

Options:
- **All**: auto-complete when last measured value collected
- **Only valid measured values**: only complete if quality status is "pass" or "conditionally pass"

### Characteristic Information (`Show info` button)

Tabs available:
- **Description**: characteristic data, operation info, test equipment connection status
- **Documents**: characteristic documents and inspection requirement documents (only "display during inspection" flag)
- **Process overview - variable**: Control chart #1, Control chart #2 (optional), Histogram, statistical KPIs
- **Process overview - attributive**: Control chart #1
- **Control chart #1** / **Control chart #2**: limit values and progression
- **Histogram**: only for variable characteristics with single-part inspection
- **Failure history**: failure types assigned to current characteristic or global structures
- **History of measures**: measures assigned to characteristic or global structures

### MDI (Measurement Device Interface) Integration

MDI filter criteria for requesting measured values from drivers:

| Parameter | Description |
|-----------|-------------|
| ANR | Order number of inspection requirement |
| AGNR | Operation number of inspection step (primary) or inspection requirement (secondary) |
| ATK | Article number of inspection requirement |
| CNR | ERP batch of inspection requirement |
| MNR | Workplace where inspections are performed |
| PPKT:TLOS | Partial batch of inspection point |
| PPKT:CNR | ERP batch of inspection point |
| PPKT:EQUIP | Tool of inspection point (MOC inspection point list: field 1) |
| PPKT:PROBE | Sample of inspection point (MOC inspection point list: field 3) |
| PPKT:USERC1 | User field C1 (MOC field 4) |
| PPKT:USERC2 | User field C2 (MOC field 5) |
| PPKT:USERN1 | User field N1 (MOC field 6) |
| PPKT:USERN2 | User field N2 (MOC field 7) |

MDI parameters stored per measured value:

| Parameter | Description |
|-----------|-------------|
| SERIAL | Unique identifier of MDI measured value |
| MVALUE | Actual measured value (mandatory) |
| MDATE | Date of data collection |
| MTIME | Time of data collection |
| MFROM | Inspector name (instead of badge number) |
| MTEXT | Comment |
| NEST | Cavity number (mandatory if cavity-related) |

System also stores: inspector badge number, machine/workplace number.

Processing rule: Only confirmed MDI measured values (`CONFIRMED=1`) are processed. Unconfirmed (`CONFIRMED=0`) are deleted from MDI buffer without posting.

Validation limit check: if measured value violates validation limits, value is deleted (if MDI configured accordingly). If not deleted, processing of current characteristic is stopped.

Log files on error: `<system>\prot\hy_cmdilrv_AUFTRAG_CAPTURE_*.csv`

### Transfer Measured Values for All Characteristics (CAQ 8.2)

Function `DQC_TRANSFER_DATA` — transfers measured values for all variable characteristics of an inspection point in a single user action.

Config in `caq_dc_t.ini`:
```ini
[CAQ_DC_T-PPKT-Page2]
1=DQC_TRANSFER_DATA,L,accept measurement data
2=DQC_RELOAD,R,update display
```

Requirements: characteristics must not be in "skip lot" status; must have status "can be checked", "checked", or "result". Formula-calculated characteristics excluded.

Pre-check: inspector identification dialog shown if no badge number defined.

### Preceding Inspection Point List (CAQ 8.2)

Config in `hytnrcfg.ini`:
```ini
[CAQ->Optionen 0]
LOAD_MEASUREMENTS_ON_DEMAND=ON
INTERPOSE_FUNCTION=QEE_FILTER_INSPPOINT
RECALL_ON_EXIT_INSP_LIST=ON
REQUEST_RELOAD_ON_EXIT_INSP_LIST=MNR,ANR
```

Reduces inspection list to one inspection point (selected from preceding list). Improves performance with many inspection points.

### Saving Measured Values with ENTER Key (CAQ 8.2)

Config in `hytnrcfg.ini`:
```ini
[DYNAMIC-DIALOG->Options 0]
USE_ENTER_BUTTON=1
```

Supported dialogs: `QEE_MW_ME_ES_PP_SI`, `QEE_MM_BE_ST_PP_SI`, `QEE_MM_BE_ST_PP_FS`, `QEE_INSPPOINT`, `QEE_INSPPOINT_DETAIL`, `QEE_MM_PR_PP_SI`, `QEE_MASS_CLASSIC`, `QEE_ERR_CLASSIC`, `Q_P_AN`

### Asynchronous Collection of Measured Values and Failures (CAQ 8.1/8.2)

Config in `caq_async.ini` (in `\functions` directory):
```ini
[System]
ENABLE_ASYNC=ON

[QEE_MW_ME_ES_PP_SI]
CPAUMW.INSERT=OFF   ; disable async for specific dialog+action
```

Supported dialogs and actions:

| Dialog | Action |
|--------|--------|
| QEE_MASS_CLASSIC | CMASSN.INSERT |
| QEE_ERR_CLASSIC | CPAUERR.INSERT |
| QEE_MM_BE_ST_PP_RA | CPAUERR.INSERT |
| QEE_MM_BE_ST_FS | CPAUERR.INSERT, CPAUERR.DELETE |
| QEE_MM_BE_ST_PP_FS | CPAUERR.INSERT, CPAUERR.DELETE |
| QEE_MM_BE_ST_PP_SI | CPAUMW.INSERT, CPAUMW.UPDATE, CPAUMW.MODIFY |
| QEE_MM_BE_ST_SI | CPAUMW.INSERT, CPAUMW.UPDATE |
| QEE_MM_CO_ST_PP_SI | CPAUMW.INSERT, CPAUMW.MODIFY |
| QEE_MW_ME_ES_PP_SI | CPAUMW.INSERT, CPAUMW.UPDATE |
| QEE_MW_ME_ES_ST_SI | CPAUMW.INSERT, CPAUMW.UPDATE |
| QEE_INSPPOINT | CPANUMP.ABSCHLIESSEN, CPANUMP.UPDATE |
| QEE_INSPPOINT_DETAIL | CPANUMP.ABSCHLIESSEN, CPANUMP.UPDATE |

### Calculated Characteristics with Eigenvalue (CAQ 8.2)

Input types:
- `MESSW_ESTCK_PPUNKT_CALC` (inspection point level) → workflow `WF: MM_ME_ES_PP_CA` / dialog `QEE_MM_ME_ES_PP_CA`
- `MESSW_ESTCK_STICHPR_CALC` (sample level) → workflow `MM_ME_ES_SI_CA` / dialog `QEE_MM_ME_ES_SI_CA`

Fields: Gage, Connection status, Argument 1–4 (dynamic show/hide based on formula), Result (calculated), MDI standard function available.

### Dynamic Dialog Field Reference

| Dialog | Field ID | DB length | Display length | Description |
|--------|----------|-----------|----------------|-------------|
| QEE_INSPPOINT | CPANUMP.PPKT:USERC1 | 50 | 15 | User field C1 |
| QEE_INSPPOINT | CPANUMP.PPKT:USERC2 | 50 | 15 | User field C2 |
| QEE_INSPPOINT | CPANUMP.PPKT:EQUIP | 20 | 15 | Equipment |
| QEE_INSPPOINT | CPANUMP.PPKT:TPLATZ | 20 | 15 | Inspection place |
| QEE_INSPPOINT | CPANUMP.PPKT:PROBE | 20 | 15 | Sample |
| QEE_INSPPOINT_DETAIL | CPANUMP.PPKT:TLOS | 50 | 15 | Partial batch |
| QEE_INSPPOINT_DETAIL | CPANUMP.PPKT:CNR | 50 | 15 | ERP batch |
| QEE_INSPPOINT_DETAIL | CPANUMP.ENT:GRUPPE | 10 | 11 | Usage decision group |
| QEE_INSPPOINT_DETAIL | CPANUMP.ENT:CODE | 10 | 5 | Usage decision code |
| QEE_MM_BE_ST_PP_SI | CPAUMW.BEM | 250 | 26 | Comment |
| QEE_MW_ME_ES_PP_SI | CPAUMW.BEM | 250 | 29 | Comment |
| QEE_MW_ME_ES_PP_SI | CPAUMW.NEST | 50 | 10 | Cavity |
| QEE_MM_BE_ST_PP_FS | CPAUMW.BEM | 250 | 26 | Comment |
| QEE_ERR_CLASSIC | CPAUERR.ERRNR | 50 | 15 | Failure number |
| QEE_MASS_CLASSIC | CMASSN.MASNR | 50 | 15 | Measure number |
| QEE_MASS_CLASSIC | CMASSN.MASTEXT | 250 | 30 | Measure text |
| QEE_MASS_CLASSIC | CMASSN.BEM | 250 | 30 | Measure comment |
| QEE_MM_PR_PP_SI | PRBGRP | 50 | 26 | Sample group |

---

## MOC — Assignment of Order Types to CAQ Areas

**Transaction code**: `ortycaq`
**Path**: System administration → System settings → Area: configuration of order type

### Purpose

Configures how order types are assigned to CAQ objects (area type + areas). Each combination of "order type + area type/area" has an alternative for generating inspection requirements/orders, defined in the **Action** field.

### Action Values

| Action | Description |
|--------|-------------|
| `PAN_AU/A_AN` | Generate inspection requirement on operation log-on. Requirement: one inspection plan for all operations |
| `PAN_AG/A_AN` | Generate inspection requirement on operation log-on. Requirement: one inspection plan per OP (Option 1159) |
| `PAN_AU/A_ST` | Generate inspection requirement on order status change |
| `PAN_AU/AUNR_COPY` | Only for order type "KAL" (calibration). Auto-generates calibration inspection requirement from calibration calendar |
| (empty) | No inspection requirement generated. Use if generating order with QM operations upon generating inspection requirement |

### Addition Parameters (comma-separated, no spaces)

| Addition | Description |
|----------|-------------|
| `[AUNR,AGNR]` | Link inspection step structures to operation structures via `auftrags_bestand.aunr` AND `auftrags_bestand.agnr` |
| `[AUNR]` | Link via `auftrags_bestand.aunr` only |
| `[ATK_AG]` | Use article of the operation for inspection requirement generation |
| `[ATK_AU]` | Use article of the order for inspection requirement generation |
| `[AUST_Q:<source>]` | Trigger on order switching FROM defined source status |
| `[AUST_Z:<target>]` | Trigger on order switching TO defined target status |
| `[AUST_Q:P],[AUST_Z:V]` | Trigger when order switches from status P to status V |

### Requirements

At least one of: incoming goods inspection, in-production inspection, goods issue inspection, initial sample inspection, calibration, QM subsystem, PDV data collection.

---

## MBL — CAQ Archiving Configuration

### Inspection Requirements Archiving

Default is object-related archiving. Each inspection requirement evaluated individually. All detailed data archived with it.

Data archived per inspection requirement:

| Data | Source tables |
|------|---------------|
| Inspection requirements | `caq_pruefanf`, `caq_pan_zusatz` |
| Inspection orders | `caq_paukop`, `caq_paukonf` |
| Characteristic configurations | `caq_numpool`, `caq_ppktm_info` |
| Inspection point configurations | `caq_dyhis_ppktmm` |
| Characteristics | `caq_merkmal`, `caq_merk_zusatz` |
| Inspection frequencies | `caq_prueffreq` |
| Inspection specs by quantity | `caq_mengabh_prf` |
| Documents | `caq_dokus` |
| Tool assignments | `caq_werkzzuord` |
| Samples | `caq_paustich` |
| Assignment of samples to numbers | `caq_paunumm` |
| Assignment of samples to inspection points | `caq_paumm_ausp` |
| Characteristic results | `caq_paumwert` |
| Failure analysis entries | `caq_fhlanal` |
| Measures and parameters | `caq_massn`, `caq_mass_param` |
| Inspection matrix | `caq_pruefmatrix` |

Key fields for archiving:
1. rec_type (e.g. FEP)
2. area (e.g. F for production)
3. pruefanf_nr (unique inspection requirement number)
4. auftrag_nr (order number)
5. artikel_nr (article number)

Note: Oracle DB requires all 5 key fields filled.

### Standard Archiving Configuration (requires FEP-/WEP-/QMS-ARC license)

Two-step archiving: online → medium-term (still queryable) → long-term (requires reload).

| Product | Object | Description | Default interval |
|---------|--------|-------------|-----------------|
| CAQ | FEP | Production inspection requirements: online → medium-term | 1 year |
| CAQ | A_FEP | Production inspection requirements: medium-term → long-term | 3 years |
| CAQ | WEP | Goods receipt inspection requirements: online → medium-term | 1 year |
| CAQ | A_WEP | Goods receipt: medium-term → long-term | 3 years |
| CAQ | WAP | Goods issue inspection requirements: online → medium-term | 1 year |
| CAQ | A_WAP | Goods issue: medium-term → long-term | 3 years |
| CAQ | EMU | Initial sample inspection requirements: online → medium-term | 1 year |
| CAQ | A_EMU | Initial sample: medium-term → long-term | 3 years |
| QMS | QMS | QMS inspection requirements: online → medium-term | 3 months |
| QMS | A_QMS | QMS: medium-term → long-term | 3 years |

Only completed and cancelled inspection requirements are archived by default. Administrative data archived for 12 years in `arc_verw_caq`.

### Collective Requirements Archiving

| Product | Object | Description | Default interval |
|---------|--------|-------------|-----------------|
| CAQ | SAN | Collective requirements: online → medium-term | 1 year |
| CAQ | A_SAN | Collective requirements: medium-term → long-term | 3 years |

Source tables: `caq_sammelanf`, `caq_prueffreq`

Only archives collective requirements where all included inspection requirements are already archived.

### CAQ Events Archiving

Source tables: `event_caq`, `event_dlg_data`

| Product | Object | Interval |
|---------|--------|----------|
| CAQ | EREIGCAQ | online → medium-term: 35 days |
| CAQ | A_EREIGCAQ | medium-term → long-term: 3 years |

### CAQ Logging Entries Archiving

Source tables: `hyd_logging`, `hyd_logging_data`

| Product | Object | Interval |
|---------|--------|----------|
| CAQ | LOG | online → medium-term: 35 days |
| CAQ | A_LOG | medium-term → long-term: 3 years |

### Document Management Archiving

Documents archived when the related object (inspection point, characteristic, measured value) is archived. Files stay at original storage location.

| Product | Object | Interval |
|---------|--------|----------|
| CAQ | DOCLINK | online → medium-term: 0 days (immediate) |
| CAQ | A_DOCLINK | medium-term → long-term: 0 days (immediate) |

Documents can be assigned to: inspection points, inspection step/point characteristics, measured values/attributive inspection results.
