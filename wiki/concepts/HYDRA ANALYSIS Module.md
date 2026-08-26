---
type: concept
title: "HYDRA ANALYSIS Module"
created: 2026-05-26
updated: 2026-05-26
address: c-000163
tags:
  - concept
  - mes
  - analysis
  - spc
  - hydra
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[HYDRA PDV Module]]"
  - "[[hydra-cuthdb-data-model]]"
sources:
  - "[[hydra-cuthdb-data-model]]"
complexity: intermediate
domain: "Manufacturing Execution Systems"
---

# HYDRA ANALYSIS Module

**Product group:** ANALYSIS (Statistical Process Control & Analytics)
**Tables:** 11
**Pages:** 16-26

## Purpose

The ANALYSIS module provides the data pool for statistical process control (SPC) and manufacturing analytics. It stores analysis data suppliers, operations, orders, process data references, process comparison curves, and workplace/operation period statistics.

## Core Tables

### ana_datasup — Data Suppliers
Stores data suppliers used to differentiate the origin of analysis data. Keyed on `data_supplier_name` (business key) with `id` (technical key).

### ana_operat — Operations
Maps MES operations to analysis operations. Links `mes_operation_name` to `operation_name` via `operation_id`, with an `order_id` reference back to process data orders.

### ana_order — Process Data Orders
Stores orders within the analysis data pool. Provides the organizational context for grouping analysis data.

### ana_pdatref — Process Data References
Central linking table connecting process data references to their analysis context. References process data for statistical evaluation.

### ana_process_comp_curve_fine / ana_process_comp_curve_rough
Process comparison curves at two granularity levels (fine/rough). Used for comparing process behavior across different time scales or conditions.

### ana_unit — Units
Defines units of measure for analysis data. Provides unit standardization across the analytics pool.

### ana_wplace / ana_wplace_operat_perio
Workplace definitions and workplace-operation period statistics. Ties analysis data to physical production locations and time periods.

### ana_stad_wplace_operat_perio / ana_stat_wplace_operat_perio
Statistical aggregations of workplace-operation periods. "stad" likely represents a specific statistical method or aggregation.

## Relationship to PDV

Several ANALYSIS-related tables appear under the PDV module (pp. 614-631): `ana_pparam` (process parameters), `ana_tag` (measurement tags), `ana_serial` (serial measurements), and their related tables. These bridge ANALYSIS analytics with PDV process data visualization.
