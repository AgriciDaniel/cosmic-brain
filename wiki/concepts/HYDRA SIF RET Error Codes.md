---
type: concept
title: "HYDRA SIF RET Error Codes"
created: 2026-07-23
updated: 2026-07-23
tags:
  - concept
  - mes
  - hydra-8
  - reference
  - sif
  - error-codes
status: current
related:
  - "[[HYDRA Service Interface (SIF)]]"
  - "[[HYDRA SIF DLG Service Catalog]]"
sources:
  - "[[hydra-service-interface-sif]]"
complexity: reference
domain: "Manufacturing Execution Systems"
---

# HYDRA SIF RET Error Codes

Every `DLG=` BAPI call through [[HYDRA Service Interface (SIF)]] returns `RET={N8}|KT={C20}|LT={C40}|` — see [[HYDRA SIF DLG Service Catalog]] for the wire format. `RET=0` is success; any other value is an error, paired with a short (`KT`) and long (`LT`) text. This page catalogs every specific `RET` value found in the source doc.

**Method**: full sweep of `.raw/hydra/md/HYDRA_8_Documentation Oct 2020/Products/SCS_81/SCS-SIF_81.md` (22,361 lines) — every `| NNN | description |` row in the ~30 "Error codes | Description" tables (ch.9-19), plus every inline `RET=NNN` prose mention. Also checked `Tutorials/tutorial_service_call_javascript/tutorial_service_call_javascript.md` — no additional codes there.

94 distinct documented codes (including 0). Descriptions are verbatim from the source doc; where the same code recurs across multiple BAPI families with different wording, all variants are joined with `/`.

## Codes

| RET | Meaning |
|---|---|
| 0 | Success (universal — activity executed) |
| 10 | Order not available |
| 20 | Order is running |
| 30 | Order is finished |
| 31 | Order is interrupted |
| 50 | Order status is not available |
| 60 | *(illustrative placeholder in the RET/KT/LT spec example — no defined meaning given)* |
| 80 | Invalid OP status |
| 85 | OP is locked |
| 90 | Machine does not exist / not available / invalid machine id |
| 94 | Machine group is not available (RESTYP=MGRP) |
| 101 | No data available / attribute for the specified key does not exist |
| 414 | The group specified does not exist |
| 424 | Split function is not active |
| 425 | The responsibility profile is not existent |
| 510 | Person is not authorized |
| 551 | The PDV event transferred is not available |
| 553 | Channel numbers between 0 and 9999 are valid only |
| 554 | Cycle times greater than 0 are allowed only |
| 707 | Machine has not been specified |
| 708 | The machine status has not been specified |
| 709 | Copy: the target machine has not been specified |
| 710 | Copy: the target status has not been specified |
| 712 | Processing mode is invalid |
| 713 | The machine status specified is not available |
| 714 | The machine status already exists for this machine |
| 719 | The status class is not available |
| 734 | The parameter MSTTXT.STNR has not been specified |
| 735 | The machine status text does not exist |
| 736 | A machine status text with this number already exists |
| 746 | Terminal number has not been specified |
| 747 | Position has not been specified |
| 749 | The status class/status class number already exists |
| 802 | Status already assigned for "no shift" |
| 806 | Conditional flag (ADEPRO.SART = B/T/H) — plausibility-check row, no standalone error text in source |
| 814 | Conditional flag (ADEPRO.SART = H) — plausibility-check row, no standalone error text in source |
| 815 | Conditional flag (ADEPRO.SART = H) — plausibility-check row, no standalone error text in source |
| 900 | Unit is not available |
| 911 | Processing code is not available |
| 918 | Conditional flag (RESTYP = MGRP) — plausibility-check row, no standalone error text in source |
| 931 | Auto-allocation is not possible |
| 933 | The status texts 20000 and 30000 must not be deleted |
| 1030 | Conditional flag (ADEPRO.SART = B) — plausibility-check row, no standalone error text in source |
| 1401 | Invalid deviation reason |
| 1611 | General database fields (validation-check error, INIDATA context) |
| 1641 | Conditional flag (ADEPRO.SART = H) — plausibility-check row, no standalone error text in source |
| 1656 | The file assigned to DATEI cannot be written on |
| 1658 | No cost center authorization for group/machine |
| 1660 | The specified agent is invalid |
| 1661 | A value relevant/required for processing is missing |
| 1662 | A value relevant for processing is invalid / key fields not correctly specified |
| 1665 | Editor and/or the password is invalid |
| 1666 | Object/record/assignment/configuration/machine/path/reason text is currently locked (edited) by another user |
| 1667 | Number of licenses were exceeded |
| 1668 | Terminal is not available / must be set up in the database |
| 1669 | Data with the same key fields already exist |
| 1672 | Assignment does already exist |
| 1682 | Assignment is not available |
| 1700 | Missing person id (PNR.LOCK example — prose-only, not in a table) |
| 1803 | No responsibility area authorization |
| 1855 | Target data record is already available |
| 1859 | No split possibility / OP must not be a split master |
| 1860 | OP must not be OP of a split OP |
| 1862 | OP must not be OP of a merged OP |
| 1865 | Specified MOP is no merged OP |
| 1866 | Specified OP is no OP of the merged OP |
| 1867 | The OP may not be split |
| 1868 | Maximum number of splits of the OP has been exceeded |
| 1869 | The maximum number of splits has been exceeded |
| 1954 | Conditional flag (applies to UPDATE.LOCK) — plausibility-check row, no standalone error text in source |
| 1955 | Conditional flag (applies to UPDATE.LOCK) — plausibility-check row, no standalone error text in source |
| 1956 | Conditional flag (applies to UPDATE, DELETE) — plausibility-check row, no standalone error text in source |
| 1957 | Conditional flag (applies to UPDATE) — plausibility-check row, no standalone error text in source |
| 1958 | Conditional flag (ADEPRO.SART = U) — plausibility-check row, no standalone error text in source |
| 1971 | Split number < minimum |
| 1986 | Operation cannot be deleted |
| 1987 | Operation cannot be changed |
| 1989 | Maximum number of orders is exceeded for priority |
| 1990 | Order header must not be deleted |
| 1997 | Order type is not equal |
| 1998 | Order template is not available |
| 2026 | Order is still running |
| 2027 | Processing mode is invalid / not allowed for this posting |
| 2039 | Machine is not available |
| 2807 | Status cannot be changed, as sequence is inactive |
| 2808 | Start date is after end date |
| 2812 | Order is already available in the archive |
| 2813 | Activity code is not defined |
| 3020 | The user account is locked |
| 3220 | Resource is logged on or locked |
| 3241 | User field key is not defined |
| 3280 | The entered password is already in use |
| 3284 | BOM level is invalid |
| 4101 | The specified resource is included in a resource list |
| 4110 | For this resource, a requirement is still available |
| *410* | Code exists in an INI.LIST validation table (ch.10.12) but its description cell is empty in the source doc — likely a PDF-extraction artifact, not recoverable from the source as converted |

## Known gaps

- Scan is scoped to `SCS-SIF_81.md` only. Other product docs under `.raw/hydra/md/HYDRA_8_Documentation Oct 2020/Products/` may define their own RET codes for their own dialog families (SIF just re-exposes them) — not cross-checked here.
- Rows marked "conditional flag" are cells the source doc's plausibility-check tables use to gate *when* a check applies (e.g. "only if ADEPRO.SART=H"), not freestanding error text — table-column misalignment in the PDF→md conversion pulled them into the code/description columns. Kept for completeness since the numeric code itself is real, but treat the "meaning" as unverified.
- `RET=60` is a syntax-only placeholder in the header spec (ch.8.4) — no semantic meaning was ever attached to it in the source.

## See Also

- [[HYDRA Service Interface (SIF)]] — architecture concept this catalog supports
- [[HYDRA SIF DLG Service Catalog]] — DLG code family catalog (the sibling reference this page's RET codes apply to)
- [[hydra-service-interface-sif]] — full source page
