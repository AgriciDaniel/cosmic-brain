---
type: concept
title: "HYDRA PZE Module"
created: 2026-05-26
updated: 2026-05-26
address: c-000174
tags:
  - concept
  - mes
  - pze
  - time-recording
  - attendance
  - payroll
  - hydra
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[HYDRA LLE Module]]"
  - "[[HYDRA HLS Module]]"
  - "[[HYDRA ZKS Module]]"
  - "[[hydra-cuthdb-data-model]]"
sources:
  - "[[hydra-cuthdb-data-model]]"
complexity: advanced
domain: "Manufacturing Execution Systems"
---

# HYDRA PZE Module

**Product group:** PZE (Personalzeiterfassung — Personnel Time Recording)
**Tables:** 58
**Pages:** 662-760

## Purpose

PZE is the comprehensive personnel time and attendance system. It handles clock-in/out (stamping), attendance tracking, absence management, wage type calculation, time accounts, shift models, holiday calendars, and access authorization. At 58 tables, it is HYDRA's third-largest module.

## Core Domains

### Time Recording & Stamping
- **stempelsaetze** — Time stamp records (3 pages): raw clock-in/out events
- **pzebuchung** — Time bookings/postings: processed and validated time records
- **antritt** — Presence premium regulation: additional wage type posting for attendance bonuses

### Attendance & Absence
- **fehlzeiten** — Absences (2 pages): recorded absence periods with reasons
- **fehlzeiten_prio** — Absence priorities: determines which absence takes precedence when overlaps occur (2 pages)
- **fehlgruende** — Absence reasons catalog: illness, vacation, training, etc.
- **fehlgrund_gruppe** — Absence reason groups: categories for reporting and wage impact
- **jahranwes** — Annual attendance summary
- **jahrfehl** — Annual absence summary
- **anmeld_tab** — Registration/logon table (overflow)
- **hymeld** — HYDRA notifications (2 pages)
- **meldeliste** — Notification list
- **meldungen** — Messages/notifications

### Time Models & Calendars
- **gltzeitjhresmodell** — Flexible time annual model: defines yearly working time frameworks
- **gltzeittagestyp** — Flexible time day types: categorizes each day (workday, weekend, holiday, etc.)
- **schichtrythmus** — Shift rhythm definitions (3 pages): repeating shift patterns
- **pze_feiertage** — Holiday calendar (2 pages)
- **pze_az_intervalle** — Working time intervals (2 pages)
- **pze_bez_pause** — Paid break definitions
- **pze_ubez_pause** — Unpaid break definitions
- **pze_url_anspruch** — Vacation entitlement

### Wage Types & Accounts
- **lohnarten** — Wage types master catalog (3 pages): all possible wage/salary types
- **lohnarten_aw** — Wage type evaluation (4 pages)
- **lohnarten_zuord** — Wage type assignments (6 pages): which wage type applies to which time/attendance event
- **lohnartengruppe** — Wage type groups
- **lohnartenliste** — Wage type lists
- **lohnstat_familie** — Wage statistics families
- **lhnstatusjhrmod** — Wage status annual model
- **moaw_per_par** — Monthly evaluation period parameters
- **moaw_periode** — Monthly evaluation periods
- **monat_aw** — Monthly evaluation (4 pages)
- **monatlohnarten_aw** — Monthly wage type evaluation (4 pages)
- **woaw_per_par** — Weekly evaluation period parameters
- **woaw_periode** — Weekly evaluation periods

### Time Accounts
- **zeit_kto** — Time accounts: employee time balances (flex time, overtime, etc.)
- **zeitspanne_aw** — Time span evaluation
- **kategorien** — Time account categories
- **kontoaenderung** — Account changes: manual corrections to time accounts
- **kontogrenze** — Account limits: min/max thresholds for time accounts

### Personnel Data
- **personalakte** — Personnel file (11 pages): comprehensive employee master data
- **personalstamm** — Personnel master (overflow)
- **pze_pers_daten** — Personnel data (2 pages)
- **pze_perstagtyp** — Personnel day type assignments (2 pages)
- **pze_pst_var_kfg** — Personnel variable configuration (6 pages)
- **pze_tnr_info_konfig** — Personnel number info configuration (6 pages)
- **arbeitsmittel** — Work equipment assigned to personnel
- **la_beziehung** — Wage relationship: links employees to wage agreements

### Cost & Organization
- **kostenstellen** — Cost centers (2 pages)
- **kstst_tab** — Cost center table (overflow)
- **st_attribut** — Cost center attributes
- **persauswertparm** — Personnel evaluation parameters (4 pages)

### Configuration
- **pze_entlohnung** — Compensation configuration
- **pze_info_par** — Information parameters (2 pages)
- **pze_konten** — Account configuration (2 pages)
- **pze_ztnw_liste** — Time tracking list configuration (2 pages)
- **pze_ztnw_spalte** — Time tracking column configuration (2 pages)
- **pzt_kenn** — PZE identifiers/flags (3 pages)
- **tagesauswertung** — Daily evaluation (3 pages)

### Access Control (Shared with ZKS)
- **zugberechtigung** — Access authorizations
- **zuggruppe** — Access groups
- **fehlgr_berecht** — Absence reason authorization

### System
- **kfg_dialog_event** — Configuration dialog events (overflow)
- **kfg_erfassung** — Configuration data capture (overflow)
