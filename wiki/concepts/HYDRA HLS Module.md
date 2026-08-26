---
type: concept
title: "HYDRA HLS Module"
created: 2026-05-26
updated: 2026-05-26
address: c-000166
tags:
  - concept
  - mes
  - scheduling
  - hydra
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[HYDRA BDE Module]]"
  - "[[HYDRA PZE Module]]"
  - "[[hydra-cuthdb-data-model]]"
sources:
  - "[[hydra-cuthdb-data-model]]"
complexity: intermediate
domain: "Manufacturing Execution Systems"
---

# HYDRA HLS Module

**Product group:** HLS (Heuristic Layout Scheduling — Shop Floor Scheduling)
**Tables:** 6
**Pages:** 324-333

## Purpose

HLS provides graphic shop floor scheduling with individual shift and assignment time management. Despite being one of the smallest modules, it plays a critical role in shop-floor workforce management.

## Core Tables

### hls_pers_schichtm — Individual Shift/Assignment Times
Manages individual shift and assignment times within the graphic shop floor scheduling module. Each personnel record can have personalized shift assignments that deviate from standard shift models.

### hls_rwmatrix — Resource/Workplace Matrix
Defines the relationship matrix between resources and workplaces for scheduling purposes. Controls which personnel can be assigned to which workstations.

### hls_setup — HLS Configuration
Module-level configuration settings for the scheduling engine.

### res_fertigung_var — Resource Manufacturing Variants
Cross-module table (also serves WRM) defining manufacturing variants available for a resource. Bridges HLS scheduling with resource management.

### user_profil / user_profil_zuord — User Profiles and Assignments
User profile definitions and their assignments. These tables bridge HLS with the broader user management system, controlling what scheduling views and capabilities each user has.
