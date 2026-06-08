---
type: concept
title: "HYDRA ZKS Module"
created: 2026-05-26
updated: 2026-05-26
address: c-000176
tags:
  - concept
  - mes
  - access-control
  - security
  - badges
  - hydra
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[HYDRA PZE Module]]"
  - "[[HYDRA KERNEL Module]]"
  - "[[hydra-cuthdb-data-model]]"
sources:
  - "[[hydra-cuthdb-data-model]]"
complexity: intermediate
domain: "Manufacturing Execution Systems"
---

# HYDRA ZKS Module

**Product group:** ZKS (Zutrittskontrollsystem — Access Control System)
**Tables:** 91 (16 core + 75 overflow from pp.833-846)
**Pages:** 812-846

## Purpose

ZKS is HYDRA's physical access control and security module. It manages badges, access zones, door access groups, calendars for access scheduling, event logging for entry/exit, and time zone configurations. With 91 documented tables (including overflow pages), it is the largest module by table count. Many of the overflow tables (pp.833-846) belong to other modules by prefix but are documented in the ZKS page range.

## Core Tables

### Badge Management
- **zks_ausweis** — Badge/ID card definitions (3 pages): every badge in the system. A record is automatically created when a person is created in the PZE module.
- **zks_ausweis_gruppe** — Badge groups: categorization of badges (visitor, employee, contractor, etc.)
- **zks_ausweis_zuord** — Badge assignments: which badge belongs to which person, valid from/to dates

### Access Control
- **zks_zugang** — Access points/doors (3 pages): all controlled entry/exit points
- **zks_zugang_gruppe** — Access groups (3 pages): which badges can access which doors at which times
- **zks_freischaltung** — Access enablement: temporary or permanent access grants

### Zones & Areas
- **zks_raumzonen** — Room zones (4 pages): defines security zones (restricted areas, clean rooms, etc.)
- **zks_raumzonen_prot** — Room zone protocol: audit log of zone changes
- **zks_zz_bereich** — Time zone areas: links zones to time-based access rules

### Time & Calendar
- **zks_kalender** — Access calendars: defines when access is permitted (e.g., M-F 6am-8pm)
- **zks_feiertag** — Access holidays: special day definitions for access rules
- **zks_zeitzonen** — Time zones (2 pages): time zone definitions for multi-site deployments

### Configuration
- **zks_konf_azz** — Access time zone configuration
- **zks_konf_zzz** — Zone access configuration
- **zks_status** — Status definitions (3 pages): access system statuses

### Events & Monitoring
- **zks_ereignis** — Access events: every badge swipe, door open, access denied event

### System Integration
- **hy_ih_meldcode** — Intercom message codes (overflow): predefined messages for intercom system
- **hy_ih_meldung** — Intercom messages (overflow): sent/received intercom communications
- **hy_ih_person** — Intercom person assignments (overflow)
- **konsolen_status** — Console status (overflow): access control terminal status

## Overflow Tables (pp.833-846)

The following tables are documented in the ZKS page range but belong to other modules based on their prefixes:

### BDE Overflow
- **ade_aas_lz** — Work plan long-term data
- **ade_agst_lz** — Work plan long-term status
- **ade_prot_zusatz** — Protocol additional fields

### CAQ Overflow
- **caq_dokuliste** — Document list
- **caq_gis** — GIS integration
- **caq_mengabh_prf** — Quantity-dependent inspection
- **caq_nest** — Inspection nest
- **caq_pma_bestand** — Inspection equipment inventory
- **caq_pma_lager** — Inspection equipment storage
- **caq_pma_sollkonto** — Inspection equipment target account
- **caq_pma_vorgang** — Inspection equipment transactions
- **caq_pmv_arbeitspl** — Inspection equipment workplace
- **caq_pmv_einsatz** — Inspection equipment deployment
- **caq_pmv_pruefm** — Inspection equipment check
- **caq_pmv_pruefung** — Inspection equipment inspection
- **caq_pplzert** — Inspection plan certificate
- **caq_pplzmer** — Inspection plan characteristics
- **caq_prueffreq** — Inspection frequency
- **caq_pzustand** — Inspection condition
- **caq_sammelanf** — Collective inspection request
- **caq_usr_zuord** — User assignments
- **caq_werkzzuord** — Tool assignments
- **caq_wf_conn_point** — Workflow connection point
- **caq_wf_connect** — Workflow connection
- **caq_wf_element** — Workflow element
- **caq_wf_formel** — Workflow formula
- **caq_workflow** — Workflow definition

### KERNEL Overflow
- **hy_forms** — Form definitions
- **hy_usr_prop** — User properties
- **hy_usr_table** — User table
- **hyd_product** — Product definitions
- **hydra_user** — HYDRA user

### MDE Overflow
- **bearb_masch** — Processing machines
- **buffer_tab** — Buffer table
- **cons_masch** — Machine constants
- **ereig_komp** — Event components
- **system_a_index** — System A index
- **system_j_kap_mod** — System annual capacity model
- **system_j_mod** — System annual model
- **system_p_index** — System P index
- **system_t_kap_mod** — System period capacity model
- **system_t_mod** — System period model
- **zeitumstellung** — Daylight saving time change

### PDV Overflow
- **event_pdv** — PDV events
- **pdv_eingriff** — PDV intervention
- **pdv_merkmal** — PDV characteristic
- **pdv_messinfo** — Measurement info
- **pdv_messinfo_ausw** — Measurement info selection
- **pdv_messkanal** — Measurement channel
- **pdv_messreihe** — Measurement series
- **pdv_messreihe_ausw** — Measurement series selection
- **pdv_messreihe_imp** — Measurement series import
- **pdv_messreihe_qse** — Measurement series QSE
- **pdv_messwert** — Measurement value
- **pdv_messwert_ausw** — Measurement value selection
- **pdv_messwert_imp** — Measurement value import
- **pdv_messwert_komp** — Measurement value compression
- **pdv_messwert_qse** — Measurement value QSE
- **pdv_messzusatz** — Measurement additional data
- **pdv_protokoll** — PDV protocol
- **pdv_pruefmerkmal** — Inspection characteristic
- **pdv_pruefplan** — Inspection plan
- **pdv_pruefplan_idx** — Inspection plan index
- **pdv_status** — PDV status

### MLE/PZE/WRM Overflow
- **hysap_pm_object** — SAP PM object
- **lager_hz** — Storage frequency
- **kfg_dialog_event** — Config dialog event
- **kfg_erfassung** — Config data capture
- **produkt_merkmal** — Product characteristic
- **res_ress_artikel** — Resource article
