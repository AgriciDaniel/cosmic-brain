---
type: entity
title: "Mesonic WinLine"
created: 2026-06-08
updated: 2026-06-08
address: c-000222
status: developing
tags:
  - winline
  - mesonic
  - erp
  - entity
entity_type: product
role: "Modular ERP / business software suite (DACH, Austria/Germany)"
first_mentioned: "[[WinLine LIST]]"
aliases:
  - "WinLine"
  - "Corporate WinLine"
  - "CWL"
related:
  - "[[Framas]]"
  - "[[Framas WL Schema]]"
  - "[[WinLine LIST]]"
sources:
  - "[[.raw/winline/cwl0/cwl0.chm]]"
---

# Mesonic WinLine

**WinLine** (a.k.a. *Corporate WinLine* / **CWL**) is a modular ERP / business-software suite from **mesonic** for the DACH market (Austria, Germany, Switzerland). It is licensed and used module-by-module; a customer activates only the modules they need, all sharing one client (**Mandant**) and one data stand.

This ingest covers the German `cwl0.chm` help corpus (~2900 topics). Source documentation is in German; concepts below preserve the German UI terms.

## Module Map

| Code | Module | Purpose |
|---|---|---|
| START | WinLine START | Shell: client switching, cockpit, CRM, options, period close |
| ACC1 | WinLine FIBU | Financial accounting (Finanzbuchhaltung) |
| ACC2 | WinLine KORE | Cost accounting (Kostenrechnung) |
| — | WinLine FAKT | Invoicing / sales & purchasing (Fakturierung) |
| — | WinLine LOHN | Payroll (Austria) |
| — | WinLine ANBU | Fixed-asset accounting (Anlagenbuchhaltung) |
| LIST | WinLine LIST | List/report generator (Listgenerator) |
| — | WinLine INFO / CRM | Info center, CRM, SMART |
| — | WinLine BI | Business intelligence, WinCalc |
| PROD | WinLine PPS | Production planning & control (Produktion) |
| ADMN | WinLine ADMIN | Administration: users, audit, system manager, WebEdition |
| — | WinLine KASSE | POS / cash register (RKSV, FinanzOnline) |
| MDP | WinLine MDP | Modification Development Platform — custom windows (CWLCTK), DB extensions, window scripts |
| — | WinLine WebServices | REST API layer for external integration (EXIM + MDP license required) |

## Cross-Cutting Concepts

These terms recur across modules — see dedicated concept pages:

- [[WinLine Mandant]] — the client/company a user works in
- [[WinLine Wirtschaftsjahr]] — fiscal year; stored as an index, reset relative after [[WinLine Jahresabschluss]]
- [[Bilanz- und Betriebswirtschaftliche Kennzahlen (BKZ BWA)]] — balance/operating-figure keys used in accounting and lists

### Scripting & Customization

- [[WinLine VBScript Engine]] — embedded VBScript in 7 contexts (FIBU/FAKT/LOHN/ANBU/Makros + 2 MDP-licensed: System Skripten / Fenster Skripten)
- [[WinLine Makros]] — record/replay UI automation; ~40 methods via CWLMacro; parameterized via MParameters array; launch from Favoriten, CLI, Cockpit
- [[WinLine MDP Module]] — customization framework: user-defined windows, DB column/table extensions, CTK window scripts
- [[WinLine CWLCTK]] — GUI tool for creating user-defined windows; controls have View+Var bindings; user windows numbered 900+
- [[WinLine User-Defined Windows]] — event-driven VBScript windows; OnPushButton / OnCheckUserField events; bResult.Value=False blocks navigation
- [[WinLine MDP Database Extensions]] — append columns to T-tables (U000=Var500…); user-defined tables T650–T699; Update/Insert only on user-defined tables
- [[WinLine CWL Object Model]] — CWLStart→CWLScript→CWLCurrentModule→CWLCurrentWindow hierarchy; v10.5 EN + v12.24 DE
- [[WinLine CWLCurrentWindow]] — central event hub; ScreenContents (not Contents) holds in-flight value during OnCheck
- [[WinLine CWL MacroCommands]] — batch automation commands separate from object methods

### Integration

- [[WinLine WebServices API]] — REST API; requires EXIM + MDP license + 64-bit Applikationsserver; XML+template-driven; session token valid 1h
- [[WinLine WebServices Integration]] — production order bridge (Type 40/42) to HYDRA MES; Buchungsstapel import (Type 31) with ImportID idempotency
- [[Framas HYDRA EIS-DBI Interface]] — separate, earlier-documented HYDRA bridge via EIS-DBI SQL staging tables (bypasses WebServices layer entirely)

## Relevance to Framas

The existing [[Framas WL Schema]] page documents a WinLine database schema, and [[Framas]] is the operating company. This corpus is the product-level reference behind that schema — link module-specific tables back here.

## Modules Ingested

This wiki covers: [[WinLine FIBU]] (ACC1), [[WinLine KORE]] (ACC2), [[WinLine PPS]] (PROD), [[WinLine LIST]], [[WinLine ADMIN]] (ADMN), [[WinLine Settings]], [[WinLine FAKT]] (FAKT — vouchers, formulas, exchange rate hooks, T025 user columns), plus MDP customization (CWLCTK, window scripts, DB extensions), WinLine Makros, CWL Object Model (v10.5 EN + v12.24 DE), and WebServices API (white paper v12).

The remaining modules (LOHN, ANBU, INFO/CRM, BI, KASSE) are present in the source CHM but not yet ingested.
