---
type: concept
title: "HYDRA LLE Module"
created: 2026-05-26
updated: 2026-05-26
address: c-000168
tags:
  - concept
  - mes
  - payroll
  - wage-types
  - hydra
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[HYDRA PZE Module]]"
  - "[[hydra-cuthdb-data-model]]"
sources:
  - "[[hydra-cuthdb-data-model]]"
complexity: intermediate
domain: "Manufacturing Execution Systems"
---

# HYDRA LLE Module

**Product group:** LLE (Leistungslohnerfassung — Performance-Based Pay)
**Tables:** 12
**Pages:** 451-476

## Purpose

LLE handles performance-based wage calculation. It translates time tickets into wage types using configurable rules, manages performance groups, time labor schedules (TLS), and bonus/surcharge calculations.

## Core Tables

### lle_lart_regel — Wage Type Determination Rules
Rule engine for determining which wage type applies to a given time ticket. Rules can consider multiple factors: employee group, time type, work center, shift, and more.

### lle_leist_grp — Performance Groups
Defines performance groups that categorize employees by their performance level (3 pages). Each group can have different pay rates and bonus structures.

### lle_leistberzuord — Performance Area Assignments
Maps employees to performance areas/groups. Determines which performance rules apply to which personnel.

### lle_leistgrp_tag — Performance Group Daily Records
Daily records of performance group membership. Captures changes in employee performance group assignments over time.

### lle_lstgrp_zuord — Performance Group Assignments
Alternative or supplementary performance group assignments with different granularity.

### lle_pnr_tag — Personnel Number Daily Records
Daily records per personnel number. Tracks attendance and performance data used for wage calculation.

### lle_tls / lle_tls_ag — Time Labor Schedules
TLS defines the time framework for performance-based pay (2 pages). `lle_tls_ag` provides the workgroup-level view of time labor schedules (2 pages).

### lle_zuschlaege — Bonuses and Surcharges
Defines bonus types and surcharge rules (2 pages). Controls premium pay calculations (night shift, overtime, holiday, etc.).

### llesetup — LLE Configuration
Module-level configuration for the performance-based pay system (4 pages).

### pnr_change — Personnel Number Changes
Tracks personnel number reassignments that affect wage continuity and historical data integrity.

### zuschlags_kfg — Surcharge Configuration
Configuration for surcharge/bonus application rules. Works with `lle_zuschlaege` to define when and how bonuses apply.
