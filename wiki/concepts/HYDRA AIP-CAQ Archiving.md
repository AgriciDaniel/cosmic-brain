---
type: concept
title: "HYDRA AIP-CAQ Archiving"
created: 2026-06-05
updated: 2026-06-05
address: c-000208
tags:
  - concept
  - mes
  - caq
  - archiving
  - hydra
status: complete
related:
  - "[[HYDRA CAQ Module]]"
  - "[[HYDRA AIP-CAQ Functions]]"
sources:
  - "[[hydra-caq-aip-functions]]"
complexity: intermediate
domain: "Manufacturing Execution Systems"
---

# HYDRA AIP-CAQ Archiving

**License required:** FEP-ARC / WEP-ARC / QMS-ARC
**Admin table:** `arc_verw_caq` (administrative records kept 12 years)

## Archiving Strategy

Two-step pipeline:
1. **Online → Medium-term**: data still directly queryable in HYDRA
2. **Medium-term → Long-term**: data requires reload before use in evaluations/reports

Default trigger: editing date of the inspection requirement.
Default rule: only **completed** and **cancelled** inspection requirements are archived.

## Inspection Requirements

### Data Archived Per Requirement

| Data                                           | Source tables                    |
| ---------------------------------------------- | -------------------------------- |
| Inspection requirements                        | `caq_pruefanf`, `caq_pan_zusatz` |
| Inspection orders                              | `caq_paukop`, `caq_paukonf`      |
| Characteristic configurations                  | `caq_numpool`, `caq_ppktm_info`  |
| Inspection point configs (QMS dynamic history) | `caq_dyhis_ppktmm`               |
| Characteristics                                | `caq_merkmal`, `caq_merk_zusatz` |
| Inspection frequencies                         | `caq_prueffreq`                  |
| Qty-dependent inspection specs                 | `caq_mengabh_prf`                |
| Documents                                      | `caq_dokus`                      |
| Tool assignments                               | `caq_werkzzuord`                 |
| Samples                                        | `caq_paustich`                   |
| Sample-to-number assignments                   | `caq_paunumm`                    |
| Sample-to-inspection-point assignments         | `caq_paumm_ausp`                 |
| Characteristic results (measured values)       | `caq_paumwert`                   |
| Failure analysis entries                       | `caq_fhlanal`                    |
| Measures and parameters                        | `caq_massn`, `caq_mass_param`    |
| Inspection matrix                              | `caq_pruefmatrix`                |

Archive key fields (all 5 required for Oracle):
1. `rec_type` (e.g. FEP, WEP, WAP)
2. `area` (e.g. F = production)
3. `pruefanf_nr` (inspection requirement number)
4. `auftrag_nr` (order number)
5. `artikel_nr` (article number)

### Archiving Intervals by Data Type

| Product | Object | Data type | Step 1 (→ medium) | Step 2 (→ long) |
|---------|--------|-----------|-------------------|-----------------|
| CAQ | FEP / A_FEP | In-production inspection | 1 year | 3 years |
| CAQ | WEP / A_WEP | Goods receipt inspection | 1 year | 3 years |
| CAQ | WAP / A_WAP | Goods issue inspection | 1 year | 3 years |
| CAQ | EMU / A_EMU | Initial sample inspection | 1 year | 3 years |
| QMS | QMS / A_QMS | QMS inspection requirements | 3 months | 3 years |

Note: PMV (calibration/maintenance) inspection requirements not archived by default.

QMS data removed after configured interval if all results uploaded to PPS system.

## Collective Requirements

Source tables: `caq_sammelanf`, `caq_prueffreq`

| Object | Step | Interval |
|--------|------|----------|
| SAN | online → medium-term | 1 year |
| A_SAN | medium-term → long-term | 3 years |

Collective requirement only moves to medium-term when all its inspection requirements have already been archived.

## CAQ Events

Source tables: `event_caq`, `event_dlg_data`

| Object | Step | Interval |
|--------|------|----------|
| EREIGCAQ | online → medium-term | 35 days |
| A_EREIGCAQ | medium-term → long-term | 3 years |

Events archived time-based, independent of whether parent inspection objects are archived.

## CAQ Logging Entries

Source tables: `hyd_logging`, `hyd_logging_data`

| Object | Step | Interval |
|--------|------|----------|
| LOG | online → medium-term | 35 days |
| A_LOG | medium-term → long-term | 3 years |

## Document Management

Files remain at original storage location (not physically archived). Only the document entry (link) is archived.

Documents assigned to:
- Inspection points
- Inspection step/point characteristics
- Measured values / attributive inspection results

| Object | Interval |
|--------|----------|
| DOCLINK | 0 days (immediate, follows parent object) |
| A_DOCLINK | 0 days (immediate) |

## Without License (FEP-/WEP-/QMS-ARC absent)

Inspection requirements and collective requirements are **not removed** — they stay in online data area permanently (unless covered by another archiving config).

Exception: QMS data still removed after configured QMS/A_QMS interval once results uploaded to PPS.
