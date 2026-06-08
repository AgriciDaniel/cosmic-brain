---
type: source
title: "HYDRA CUT-HDB Data Model (2021)"
created: 2026-05-26
updated: 2026-05-26
address: c-000161
tags:
  - source
  - database
  - mes
  - mpdv
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[HYDRA KERNEL Module]]"
source_type: data
author: "MPDV Mikrolab GmbH"
date_published: 2021-02-10
confidence: high
key_claims:
  - "The HYDRA MES database schema spans 14 product groups with ~800+ tables covering the full manufacturing execution lifecycle"
  - "Every table is documented with column name, data type, description, and PDM field ID for traceability"
  - "Many operational tables have archive (a_*) and reload (r_*) variants for data lifecycle management"
  - "The schema uses a mix of natural keys (business keys) and technical keys (serial/bigserial) across different modules"
---

# HYDRA CUT-HDB Data Model (2021)

**Document:** `raw/hydra/CUT-HDB_DataModel_2021.pdf`
**Source:** MPDV Mikrolab GmbH
**Date:** 2021-02-10
**Pages:** 846

## Overview

This is the complete database schema reference for **MPDV HYDRA**, a Manufacturing Execution System (MES). The document catalogs every database table across 14 product groups, with full column-level documentation including data types, descriptions, and PDM field IDs.

## Product Groups

| #   | Module   | Page | Tables | Domain                                                          |
| --- | -------- | ---- | ------ | --------------------------------------------------------------- |
| 1   | ANALYSIS | 16   | 11     | Statistical process control & analytics                         |
| 2   | BDE      | 27   | 40     | Production data collection (Betriebsdatenerfassung)             |
| 3   | CAQ      | 178  | 82     | Quality assurance (Computer-Aided Quality)                      |
| 4   | HLS      | 324  | 6      | Shop floor scheduling (Heuristic Layout Scheduling)             |
| 5   | KERNEL   | 334  | 65     | Core system — events, users, logging, printing, licensing       |
| 6   | LLE      | 451  | 12     | Performance-based pay (Leistungslohnerfassung)                  |
| 7   | MDE      | 477  | 17     | Machine data collection (Maschinendatenerfassung)               |
| 8   | MLE      | 531  | 11     | SAP integration (Manufacturing Logistics Execution)             |
| 9   | MPL      | 547  | 22     | Material & production logistics (Material-/Produktionslogistik) |
| 10  | PDV      | 614  | 31     | Process data visualization (Prozessdatenverarbeitung)           |
| 11  | PEP      | 658  | 4      | Personnel & production planning (Personal-/Produktionsplanung)  |
| 12  | PZE      | 662  | 58     | Personnel time recording (Personalzeiterfassung)                |
| 13  | WRM      | 761  | 21     | Tool & resource management (Werkzeug-/Ressourcenmanagement)     |
| 14  | ZKS      | 812  | 91     | Access control system (Zutrittskontrollsystem)                  |

## Common Patterns

### Archive & Reload Tables
Many operational tables have archive (`a_*`) and reload (`r_*`) variants for data lifecycle management. Examples: `ereignis` has `a_ereignis` and `r_ereignis`; `event_los` and `event_res` follow the same pattern.

### PDM Field IDs
Almost every column references a PDM (Product Data Management) field ID in the format `(PDM field ID: MODULE.FIELD)`. This provides traceability from the database layer back to the logical data model.

### Common Audit Columns
Most tables include standard audit columns:
- `anlage` / `anlage_date` / `anlage_time` — creation user and timestamp
- `bearb` / `bearb_date` / `bearb_time` — last editor and timestamp
- `archiv` — archive flag (0 = active, 1 = archived)

### Key Strategy
Tables use a mix of natural business keys (`char` columns with unique constraints) and technical keys (`serial`/`bigserial`). Some tables use composite keys referencing multiple parent tables.

### Overflow Tables (pp. 833-846)
Tables on pages 833-846 are documented out of their product group sequence but belong to specific modules based on their prefixes (`caq_*`, `pdv_*`, `hy_*`, `zks_*`, etc.).

## Complete Table Index

### ANALYSIS (11 tables, p.16-26)
ana_datasup, ana_operat, ana_order, ana_pdatref, ana_process_comp_curve_fine, ana_process_comp_curve_rough, ana_stad_wplace_operat_perio, ana_stat_wplace_operat_perio, ana_unit, ana_wplace, ana_wplace_operat_perio

### BDE (40 tables, p.27-177)
ade_arbplanfolgen, ade_auftragmengen, ade_auftragsarten, ade_auftragsfolgen, ade_auftragsgruppe, ade_auftragsnetz, ade_grund_texte, ade_grund_zuord, ade_lst_codes, ade_ortsgrpwechsel, ade_pers_komp, ade_protokoll, ade_seriennummern, ade_status_texte, ade_status_zuord, ade_verarb_codes, arbplan_bestand, arbplan_hyinfo, arbplan_leistung, arbplan_mlst_hy, arbplan_verwalt, arbplan_zusatz, auftrag_status, auftrags_bestand, auftrags_leistung, auftrags_zusatz, bedienpos, bm_konten, event_adea, event_adep, hy_gruppen, hy_gruppen_zuord, masch_lohngruppen, meister_prot, pers_merken, pps_bestand, pps_leistung, pps_zusatz, sap_pp_conf, status_zusatz

### CAQ (82 tables, p.178-323)
caq_abteilung, caq_analaus_eint, caq_analauswahl, caq_analkat, caq_artikel, caq_ausw_param, caq_auswertung, caq_bereich, caq_bew_ausw_grp, caq_bew_auswahl, caq_bew_bewert, caq_bew_element, caq_bew_kat_fir, caq_bew_katalog, caq_bew_klasse, caq_ctrl_freig, caq_ctrl_plan, caq_ctrl_pplan, caq_dokus, caq_dyhis_ppktmm, caq_dynn_aql, caq_dynn_methode, caq_dynn_pniveau, caq_dynn_stprein, caq_dynnorm, caq_dynprfscharf, caq_dynps_eint, caq_dynueb_eint, caq_dynuebergang, caq_einheit, caq_fhlanal, caq_fhlanalbaum, caq_firma, caq_formular, caq_kosten, caq_kostenart, caq_masskat, caq_massn, caq_mdi_channel, caq_mdi_res_zuord, caq_merk_zusatz, caq_merkmal, caq_msa_statistics, caq_mst_wechsel, caq_numpool, caq_pan_zusatz, caq_pauanmeld, caq_paukonf, caq_paukop, caq_paumwert, caq_paunumm, caq_paustich, caq_person, caq_ppktm_info, caq_ppktm_info_afo, caq_ppktm_interv, caq_ppktm_iv_afo, caq_pplkop, caq_prplatz, caq_pruefanf, caq_pruefmatrix, caq_qails_vormerk, caq_qm_mnr, caq_rek_zuord, caq_rekauft, caq_rekdetail, caq_spezliste, caq_stattyp, caq_status, caq_verantwortl, caq_vert_eint, caq_verteiler, caq_zusatz_feld, change_log, fmea_eval_nbr_catalog, fmea_eval_nbr_entry, fmea_master, fmea_net, fmea_risk_matrix, fmea_structure_element, stg_ir_multiple_assessed, stg_ir_single_measured

### HLS (6 tables, p.324-333)
hls_pers_schichtm, hls_rwmatrix, hls_setup, res_fertigung_var, user_profil, user_profil_zuord

### KERNEL (65 tables, p.334-450)
esk_event_cfg, esk_event_msg, esk_event_msgdet, esk_event_msgext, esk_event_reg, esk_event_reg_res, esk_event_reg_var, esk_function, esk_setup, event_dlg_data, fkt_profil, fkt_tab, hy_db_bench, hy_dd_prot, hy_path, hy_protokoll, hy_size_stats, hybuch, hybuch_zusatz, hyd_datamanagement, hyd_einheiten, hyd_einheiten_umr, hyd_expr, hyd_history, hyd_ini, hyd_ini_data, hyd_license_status, hyd_lock, hyd_logging, hyd_logging_cfg, hyd_logging_data, hyd_logging_keys, hyd_nummernkreise, hyd_parklayout, hyd_printdesign, hyd_prn_schema, hyd_prn_schema_det, hyd_prndesign_cfg, hyd_prnlayout, hyd_scheduler, hyd_userdata, hyd_userexit, hyd_userfieldcfg, hyd_userfielddef, hyd_userfieldelem, hydialog, hydialogbuttons, hydialogfields, hydialogwf, hyinfo, persfkt_profil, persfkt_tab, personen, setup, software_status, sys_service, sys_service_periodic_log, terminal_status, terminals, user_setup, user_tab, user_tab_history, vab_berechtigung, vab_profil, vab_tab

### LLE (12 tables, p.451-476)
lle_lart_regel, lle_leist_grp, lle_leistberzuord, lle_leistgrp_tag, lle_lstgrp_zuord, lle_pnr_tag, lle_tls, lle_tls_ag, lle_zuschlaege, llesetup, pnr_change, zuschlags_kfg

### MDE (17 tables, p.477-530)
ereignis, event_mde, hy_zykl, masch_linien_zuord, masch_term_zuord, maschinen, maschinen_detail, maschinen_status, maschinen_zaehler, mde_feiertage, mz_stklasse, prozess_param, stoer_tab_hierarc, stoer_tabelle, stoertexte, system_j_mod, system_t_mod

### MLE (11 tables, p.531-546)
hysap_dist_mod, hysap_inbound_ctrl, hysap_inbound_data, hysap_logsys, hysap_logsys_cfg, hysap_out_ctrl, hysap_out_data, hysap_protokoll, hysap_status, hysap_tidmgt, sap_setup

### MPL (22 tables, p.547-613)
event_los, event_mlb, event_pp, hyd_vwe_stat, hz_atgen, hz_tpe, hz_typen, lbz_term_zuord, los_attribute, los_bestand, los_status, los_zuordnung, mat_matpuf, mat_mattyp, mat_puffer, mat_verw_einschr, mat_zul_ein_material, material_arten, mlst_hy, mpl_beziehungen, mpl_setup, r_los_zuordnung

### PDV (31 tables, p.614-657)
ana_pdatref_pparam, ana_pdatref_pparam_datasup, ana_pdatref_pparam_last_spec, ana_pdatref_pparam_spec, ana_pdatref_pparam_spec_change, ana_pdatref_sequence_spec, ana_pparam, ana_process_data_char, ana_process_data_decimal, ana_serial, ana_serial_test, ana_tag, ana_tag_process_data_char, ana_tag_process_data_decimal, ana_tag_value, caq_paumm_ausp, pdv_event_cfg, pdv_event_prot, pdv_logic_chan, pdv_spc, stg_process_data_block_id, stg_process_data_block_id_ps, stg_process_data_single_id, stg_process_data_tag_block_id, stg_process_data_tag_single_id, stg_process_spec_block_id, stg_process_spec_block_id_ps, stg_process_spec_single_id, tnt_columns, tnt_headers, tnt_table_repo

### PEP (4 tables, p.658-661)
pep_masch_belegung, pep_qual_maschine, pep_qual_person, pep_qualifikation

### PZE (58 tables, p.662-760)
antritt, arbeitsmittel, fehlgr_berecht, fehlgruende, fehlgrund_gruppe, fehlzeiten, fehlzeiten_prio, gltzeitjhresmodell, gltzeittagestyp, hymeld, jahranwes, jahrfehl, kategorien, kontoaenderung, kontogrenze, kostenstellen, la_beziehung, lhnstatusjhrmod, lohnarten, lohnarten_aw, lohnarten_zuord, lohnartengruppe, lohnartenliste, lohnstat_familie, meldeliste, meldungen, moaw_per_par, moaw_periode, monat_aw, monatlohnarten_aw, persauswertparm, personalakte, pze_az_intervalle, pze_bez_pause, pze_entlohnung, pze_feiertage, pze_info_par, pze_konten, pze_pers_daten, pze_perstagtyp, pze_pst_var_kfg, pze_tnr_info_konfig, pze_ubez_pause, pze_url_anspruch, pze_ztnw_liste, pze_ztnw_spalte, pzebuchung, pzt_kenn, schichtrythmus, st_attribut, stempelsaetze, tagesauswertung, woaw_per_par, woaw_periode, zeit_kto, zeitspanne_aw, zugberechtigung, zuggruppe

### WRM (21 tables, p.761-811)
event_res, res_attribute, res_bedarfszuord, res_belege, res_bestand, res_familien, res_masch_dncfam, res_massnahmen, res_ress_belegung, res_ress_typen, res_status, res_status_assign, res_status_booking, res_status_recording, res_status_text, res_status_type, res_status_zuord, res_stueckliste, res_typen, res_wartungen, v_res_status_booking

### ZKS (91 tables, p.812-846)
zks_ausweis, zks_ausweis_gruppe, zks_ausweis_zuord, zks_ereignis, zks_feiertag, zks_freischaltung, zks_kalender, zks_konf_azz, zks_konf_zzz, zks_raumzonen, zks_raumzonen_prot, zks_status, zks_zeitzonen, zks_zugang, zks_zugang_gruppe, zks_zz_bereich, plus 75 overflow tables (pp.833-846) from other modules

## Schema Characteristics

- **Naming convention**: lowercase with underscores, module prefix for domain-specific tables (`caq_*`, `pze_*`, `zks_*`, etc.), `hyd_*` prefix for cross-cutting system tables
- **Data types**: Heavy use of `char(n)`, `integer`, `smallint`, `date`, `decimal(18,6)`, `serial`/`bigserial` for technical keys
- **PDM integration**: Every column maps to a PDM (Product Data Management) field via `PDM field ID: MODULE.FIELDNAME` references
- **Event sourcing**: The `event_*` tables (event_adea, event_adep, event_mde, event_los, event_res, etc.) form an event-driven architecture across modules
- **Versioning**: Work plan and order tables carry `aend_nr` (version) columns for change tracking
- **Multi-tenant**: Company (`firma_nr`) and company type (`firma_typ`) fields appear across modules for multi-entity deployment
