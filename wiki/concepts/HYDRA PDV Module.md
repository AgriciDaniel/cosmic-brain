---
type: concept
title: "HYDRA PDV Module"
created: 2026-05-26
updated: 2026-05-26
address: c-000172
tags:
  - concept
  - mes
  - pdv
  - process-data
  - spc
  - hydra
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[HYDRA ANALYSIS Module]]"
  - "[[HYDRA CAQ Module]]"
  - "[[hydra-cuthdb-data-model]]"
sources:
  - "[[hydra-cuthdb-data-model]]"
complexity: advanced
domain: "Manufacturing Execution Systems"
---

# HYDRA PDV Module

**Product group:** PDV (Prozessdatenverarbeitung — Process Data Visualization)
**Tables:** 31
**Pages:** 614-657

## Purpose

PDV handles process data capture, storage, and visualization. It bridges ANALYSIS (statistical evaluation) with real-time process monitoring through measurement channels, tags, process parameters, SPC control, and a flexible table repository system.

## Core Domains

### Process Parameters & References (`ana_pparam`, `ana_pdatref_pparam*`)
- **ana_pparam** — Process parameters master data (2 pages): defines what process parameters exist
- **ana_pdatref_pparam** — Process data reference to process parameter combinations: the central link table
- **ana_pdatref_pparam_datasup** — Data supplier assignments for parameter combinations
- **ana_pdatref_pparam_last_spec** — Last/current specification values for parameter combinations
- **ana_pdatref_pparam_spec** — Specification limits for parameter combinations
- **ana_pdatref_pparam_spec_change** — Specification change history
- **ana_pdatref_sequence_spec** — Sequence-based specifications

### Process Data (`ana_process_data_*`)
- **ana_process_data_char** — Character/string process data values
- **ana_process_data_decimal** — Numeric process data values

### Tags (`ana_tag*`)
- **ana_tag** — Measurement tags: named measurement points in the process
- **ana_tag_process_data_char** — Tag-to-character process data assignments
- **ana_tag_process_data_decimal** — Tag-to-numeric process data assignments
- **ana_tag_value** — Tag value storage: actual measured values

### Serial Measurements (`ana_serial`, `ana_serial_test`)
- **ana_serial** — Serial measurement headers
- **ana_serial_test** — Individual serial measurement results

### Measurement System (`pdv_mess*`)
- **pdv_messkanal** — Measurement channel definitions
- **pdv_messreihe** — Measurement series headers
- **pdv_messreihe_ausw** — Measurement series selections/filters
- **pdv_messreihe_imp** — Measurement series import data
- **pdv_messreihe_qse** — Measurement series for quality/SPC evaluation
- **pdv_messwert** — Individual measurement values
- **pdv_messwert_ausw** — Measurement value selections
- **pdv_messwert_imp** — Imported measurement values
- **pdv_messwert_komp** — Compressed/aggregated measurement values
- **pdv_messwert_qse** — Measurement values for quality/SPC evaluation
- **pdv_messzusatz** — Measurement additional data
- **pdv_messinfo / pdv_messinfo_ausw** — Measurement info and selections

### SPC & Monitoring
- **pdv_spc** — Statistical Process Control configuration (3 pages)
- **pdv_event_cfg** — PDV event configuration
- **pdv_event_prot** — PDV event protocol
- **pdv_logic_chan** — Logical channel definitions (3 pages): virtual measurement channels combining multiple physical channels
- **pdv_pruefmerkmal / pdv_pruefplan / pdv_pruefplan_idx** — Inspection characteristics, plans, and indexes
- **pdv_eingriff** — Intervention records
- **pdv_merkmal** — Measurement characteristics
- **pdv_status** — PDV status definitions
- **pdv_protokoll** — PDV protocol/audit log

### SPC Statistics (`stg_*`)
- **stg_process_data_block_id** — Process data block identifiers
- **stg_process_data_block_id_ps** — Process data blocks with production step context
- **stg_process_data_single_id** — Single process data identifiers
- **stg_process_data_tag_block_id** — Tag block identifiers
- **stg_process_data_tag_single_id** — Tag single identifiers
- **stg_process_spec_block_id / stg_process_spec_block_id_ps** — Specification block identifiers
- **stg_process_spec_single_id** — Single specification identifiers

### Table Repository (`tnt_*`)
- **tnt_columns** — Table column definitions (4 pages): configurable column metadata
- **tnt_headers** — Table header definitions (4 pages): configurable table structures
- **tnt_table_repo** — Table repository: stores complete table configurations for dynamic UI

### Quality Integration
- **caq_paumm_ausp** — CAQ inspection sample evaluation (3 pages): bridges CAQ inspection results with PDV process data
