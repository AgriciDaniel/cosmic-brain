---
type: concept
title: "HYDRA KERNEL Module"
created: 2026-05-26
updated: 2026-05-26
address: c-000167
tags:
  - concept
  - mes
  - kernel
  - core
  - hydra
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[hydra-cuthdb-data-model]]"
sources:
  - "[[hydra-cuthdb-data-model]]"
complexity: advanced
domain: "Manufacturing Execution Systems"
---

# HYDRA KERNEL Module

**Product group:** KERNEL (Core System)
**Tables:** 65
**Pages:** 334-450

## Purpose

KERNEL is the system backbone — the event engine, user management, terminal infrastructure, logging, printing, licensing, dialog framework, number ranges, and all cross-cutting system services that every other module depends on.

## Core Domains

### Event System (`esk_*`, `event_dlg_data`)
- **esk_event_cfg** — Event configuration: conditions (formulas), color coding (16 colors), escalation commands (open/close), active flags. Supports formula-based (`F`) event evaluation mode.
- **esk_event_msg** — Event messages (4 pages)
- **esk_event_msgdet** — Event message details (2 pages)
- **esk_event_msgext** — Event message extensions
- **esk_event_reg** — Registered events: the catalog of all event types available in the system
- **esk_event_reg_res** — Event registration resources: which resources trigger which events
- **esk_event_reg_var** — Event registration variables
- **esk_function** — Event system functions (callable actions)
- **esk_setup** — Event system configuration
- **event_dlg_data** — Dialog data for events: stores user-entered data when an event triggers a dialog

### User & Access Management
- **user_tab** — User master table (2 pages): user abbreviations, names, status
- **user_tab_history** — User change history
- **user_setup** — User-level configuration (5 pages)
- **fkt_profil / fkt_tab** — Function profiles and function table: authorization model for system functions
- **persfkt_profil / persfkt_tab** — Personnel function profiles and table
- **vab_berechtigung / vab_profil / vab_tab** — Processing authorization (Verarbeitungsberechtigung): permissions, profiles, and assignments

### Terminal Infrastructure
- **terminals** — Terminal definitions (5 pages): all data collection terminals in the system
- **terminal_status** — Terminal status tracking (5 pages): online/offline state, last activity
- **konsolen_status** — Console status (overflow table)

### Logging & Auditing
- **hyd_logging** — Central logging table (2 pages)
- **hyd_logging_cfg** — Logging configuration: what gets logged at what level
- **hyd_logging_data** — Log data payloads
- **hyd_logging_keys** — Log key definitions
- **hyd_history** — Data change history tracking
- **hy_protokoll** — HYDRA protocol/audit log
- **hy_dd_prot** — Data dictionary protocol
- **hy_db_bench** — Database benchmark results
- **hy_size_stats** — Database size statistics
- **change_log** — Generic change log (cross-module)
- **sys_service_periodic_log** — Periodic system service execution log

### Printing System
- **hyd_printdesign** — Print design templates
- **hyd_prn_schema** — Print schemas
- **hyd_prn_schema_det** — Print schema details
- **hyd_prndesign_cfg** — Print design configuration
- **hyd_prnlayout** — Print layouts (2 pages)
- **hyd_parklayout** — Parked/stored layouts

### Dialog Framework (`hydialog*`)
- **hydialog** — Dialog definitions (2 pages)
- **hydialogbuttons** — Dialog button definitions
- **hydialogfields** — Dialog field definitions (3 pages)
- **hydialogwf** — Dialog workflow definitions (2 pages)

### System Core (`hyd_*`)
- **hyd_ini** — System initialization parameters
- **hyd_ini_data** — Initialization data values
- **hyd_einheiten** — System units of measure
- **hyd_einheiten_umr** — Unit conversions
- **hyd_expr** — Expression/formula engine
- **hyd_nummernkreise** — Number range management
- **hyd_lock** — Distributed lock management
- **hyd_license_status** — License status tracking
- **hyd_scheduler** — System scheduler (2 pages): job scheduling within HYDRA
- **hyd_datamanagement** — Data management utilities (2 pages)
- **hyd_userdata** — User-defined data storage
- **hyd_userexit** — User exit (customer-specific code hooks)
- **hyd_userfieldcfg** — User-defined field configuration
- **hyd_userfielddef** — User-defined field definitions (2 pages)
- **hyd_userfieldelem** — User-defined field elements
- **hy_path** — File system paths configuration
- **hybuch / hybuch_zusatz** — General ledger and additional fields (11 + 2 pages)
- **hyinfo** — HYDRA system information (2 pages)

### System Services
- **setup** — System configuration (7 pages)
- **software_status** — Software component version tracking (7 pages)
- **sys_service** — System service definitions
- **personen** — Persons (cross-module personnel master reference)
