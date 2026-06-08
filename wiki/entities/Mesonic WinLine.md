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

## Cross-Cutting Concepts

These terms recur across modules — see dedicated concept pages:

- [[WinLine Mandant]] — the client/company a user works in
- [[WinLine Wirtschaftsjahr]] — fiscal year; stored as an index, reset relative after [[WinLine Jahresabschluss]]
- [[Bilanz- und Betriebswirtschaftliche Kennzahlen (BKZ BWA)]] — balance/operating-figure keys used in accounting and lists

## Relevance to Framas

The existing [[Framas WL Schema]] page documents a WinLine database schema, and [[Framas]] is the operating company. This corpus is the product-level reference behind that schema — link module-specific tables back here.

## Modules Ingested

This ingest covered six modules selected by the user: [[WinLine FIBU]] (ACC1), [[WinLine KORE]] (ACC2), [[WinLine PPS]] (PROD), [[WinLine LIST]], [[WinLine ADMIN]] (ADMN), and [[WinLine Settings]]. The remaining modules (FAKT, LOHN, ANBU, INFO/CRM, BI, KASSE) are present in the source but not yet ingested.
