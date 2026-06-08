---
type: concept
title: "HYDRA CAQ Module"
created: 2026-05-26
updated: 2026-05-26
address: c-000165
tags:
  - concept
  - mes
  - caq
  - quality
  - fmea
  - hydra
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[HYDRA ANALYSIS Module]]"
  - "[[HYDRA PDV Module]]"
  - "[[hydra-cuthdb-data-model]]"
sources:
  - "[[hydra-cuthdb-data-model]]"
complexity: advanced
domain: "Manufacturing Execution Systems"
---

# HYDRA CAQ Module

**Product group:** CAQ (Computer-Aided Quality)
**Tables:** 82
**Pages:** 178-323

## Purpose

CAQ is the quality assurance engine, covering the full quality management lifecycle: inspection planning, assessment catalogs, FMEA, control plans, dynamic sampling (DIN norms), inspection execution, complaint management, and workflow-driven quality processes.

## Core Domains

### Master Data (`caq_abteilung` through `caq_firma`)
- **caq_abteilung** — Departments and groups with hierarchy levels (1-5), contact info (email, phone, fax, mobile, pager), company assignment
- **caq_artikel** — Articles/parts with quality-relevant attributes
- **caq_bereich** — Quality areas/domains
- **caq_einheit** — Units of measure for quality characteristics
- **caq_firma** — Companies (multi-entity)
- **caq_person** — Personnel with quality roles
- **caq_prplatz** — Inspection workstations
- **caq_verantwortl** — Responsible persons

### Inspection Planning (`caq_pruef*`, `caq_ctrl*`)
- **caq_pruefmatrix** — Inspection matrix linking characteristics to inspection plans
- **caq_pruefanf** — Inspection requirements/instructions
- **caq_ctrl_plan** — Control plans
- **caq_ctrl_pplan** — Production control plans
- **caq_ctrl_freig** — Control plan releases

### Assessment System (`caq_bew_*`)
- **caq_bew_katalog** — Assessment catalogs
- **caq_bew_klasse** — Assessment classes
- **caq_bew_element** — Assessment elements
- **caq_bew_bewert** — Assessment evaluations
- **caq_bew_auswahl / caq_bew_ausw_grp** — Assessment selections and groups
- **caq_bew_kat_fir** — Assessment catalog per company

### Characteristics (`caq_merkmal`, `caq_merk_zusatz`)
- **caq_merkmal** — Quality characteristics (10 pages of documentation): the central entity for defining what gets measured and how
- **caq_merk_zusatz** — Characteristic additional fields

### Dynamic Sampling / DIN Norms (`caq_dyn*`)
- **caq_dynnorm** — Dynamic sampling norms (DIN standards)
- **caq_dynprfscharf** — Dynamic inspection severity
- **caq_dynn_aql** — AQL (Acceptable Quality Level) values
- **caq_dynn_methode** — Sampling methods
- **caq_dynn_pniveau** — Performance levels
- **caq_dynn_stprein** — Sample size determination
- **caq_dynps_eint** — Dynamic sampling entries
- **caq_dynuebergang** — Sampling transition rules
- **caq_dynueb_eint** — Transition entries

### FMEA (`fmea_*`)
- **fmea_master** — FMEA master data (potential failure modes, effects, causes)
- **fmea_net** — FMEA network (linking failure modes across process steps)
- **fmea_risk_matrix** — Risk evaluation matrix (severity x occurrence x detection)
- **fmea_structure_element** — Structural breakdown elements (system/subsystem/component)
- **fmea_eval_nbr_catalog / fmea_eval_nbr_entry** — Evaluation number catalogs and entries

### Inspection Execution (`caq_pau*`, `caq_pan_*`)
- **caq_paukop** — Inspection order headers
- **caq_paukonf** — Inspection order configuration
- **caq_paunumm** — Inspection order numbers (serial management)
- **caq_paustich** — Inspection sample results (7 pages)
- **caq_paumwert** — Inspection measured values
- **caq_pauanmeld** — Inspection registrations
- **caq_pan_zusatz** — Inspection order additional fields

### Inspection Points (`caq_ppktm_*`, `caq_pplkop`)
- **caq_ppktm_info** — Inspection point information
- **caq_ppktm_info_afo** — Inspection point info with AFO (Audit Finding Opportunity) references
- **caq_ppktm_interv** — Inspection point intervals
- **caq_ppktm_iv_afo** — Inspection point intervals with AFO
- **caq_pplkop** — Inspection plan headers
- **caq_dyhis_ppktmm** — Dynamic inspection history

### Analysis & Statistics (`caq_anal*`, `caq_ausw*`)
- **caq_analauswahl** — Analysis selections
- **caq_analaus_eint** — Analysis selection entries
- **caq_analkat** — Analysis catalogs
- **caq_auswertung** — Evaluations
- **caq_ausw_param** — Evaluation parameters

### Complaint Management (`caq_rek*`)
- **caq_rekauft** — Complaint orders
- **caq_rekdetail** — Complaint details (2 pages)
- **caq_rek_zuord** — Complaint assignments

### Defect Analysis (`caq_fhl*`)
- **caq_fhlanal** — Defect analysis (3 pages)
- **caq_fhlanalbaum** — Defect analysis tree

### Cost Tracking (`caq_kosten`, `caq_kostenart`)
- **caq_kosten** — Quality costs
- **caq_kostenart** — Cost types

### MSA / Gage R&R (`caq_msa_statistics`, `caq_mst_wechsel`)
- **caq_msa_statistics** — Measurement System Analysis statistics (19 pages)
- **caq_mst_wechsel** — Measuring equipment changes

### Workflow & MDI
- **caq_workflow** — Quality workflows
- **caq_wf_element / caq_wf_connect / caq_wf_conn_point / caq_wf_formel** — Workflow elements, connections, connection points, formulas
- **caq_mdi_channel** — Machine Data Integration channels
- **caq_mdi_res_zuord** — MDI resource assignments

### Supporting Tables
- **caq_dokus** — Quality documents
- **caq_formular** — Quality forms
- **caq_masskat / caq_massn** — Action catalogs and actions
- **caq_numpool** — Number pools (for document/inspection numbering)
- **caq_qails_vormerk** — QAILS (Quality Assurance Information and Logistics System) reservations
- **caq_qm_mnr** — Quality management personnel numbers
- **caq_spezliste** — Special lists (8 pages)
- **caq_stattyp** — Statistical types
- **caq_status** — Status definitions
- **caq_vert_eint / caq_verteiler** — Distribution entries and distributors
- **caq_zusatz_feld** — Additional fields configuration
- **change_log** — Change tracking log
- **stg_ir_multiple_assessed / stg_ir_single_measured** — Statistical process control: individual readings (multiple assessed / single measured)
