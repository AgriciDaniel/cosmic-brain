---
type: concept
title: "HYDRA SIS Module"
created: 2026-06-09
updated: 2026-06-09
address: c-000246
tags:
  - concept
  - mes
  - hydra-8
  - module
  - integration
  - infrastructure
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[HYDRA 8 Function Catalog]]"
  - "[[HYDRA EIS Module]]"
  - "[[HYDRA KERNEL Module]]"
sources:
  - "[[hydra-8-documentation]]"
complexity: intermediate
domain: "Manufacturing Execution Systems"
---

# HYDRA SIS Module — System Integration Services

**Code:** SIS (System Integration Services)
**Version:** 3.0 (not versioned as 8.x like other modules)
**Source:** `.raw/hydra/md/HYDRA_8_Documentation Oct 2020/Products/SIS_30/`, `SIS_40/`

## Purpose

Cross-cutting infrastructure services used by all HYDRA modules. Provides the escalation engine, SSO, data post-capture, HR integration, signing functions, and system administration tools. SIS is the "middleware glue" layer — most modules depend on SIS for notifications, authentication, and audit trail features.

## Functions

| Code | Function |
|------|----------|
| SIS-MWV | MES Weaver (further MES client integration) |
| SIS-WMM | Further MES Client |
| SIS-SSO | Login Using Single Sign-On |
| SIS-ESK | Escalation Management (Basic/Framework) |
| SIS-VES | Dispatch of Escalation Messages by SMS |
| SIS-IPS | Integrated HR Master |
| SIS-ASD | Recording of Master Data Changes |
| SIS-SEF | Recording of Signatures (electronic signature) |
| SIS-DBB | Database Backup (MS SQL Server) |
| SIS-DMA | Printing of Staff Badges |
| SIS-NPB | Data Post-Capture of HR/Shop Floor Posting |
| SIS-APB | Comparison of Labor/Shop Floor Times |
| SIS-HMS | HYDRA Messaging Services |

## Key Components

- **Escalation Framework** (SIS-ESK) — all module-level `xxx-ESK` functions use this base; routes notifications to users, roles, SMS, email
- **Electronic Signatures** (SIS-SEF) — 21 CFR Part 11 / GMP compliance; signs order bookings, quality results
- **SSO** (SIS-SSO) — Windows authentication integration; see [[HYDRA 8 Configuration Procedures]]
- **Labor/Shop Floor Comparison** (SIS-APB) — reconciles PZE time records with BDE order postings; identifies discrepancies
- **Data Post-Capture** (SIS-NPB) — enter historical BDE/HR postings after the fact; useful for corrections
- **MES Weaver** (SIS-MWV) — connects HYDRA to other MES clients/systems

## Cross-Module Role

Every module with escalation messages (BDE-ESK, MDE-ESK, HLS-ESK, etc.) depends on SIS-ESK. SIS is therefore the most universally depended-on module in the system — removing it would break notifications across all modules.
