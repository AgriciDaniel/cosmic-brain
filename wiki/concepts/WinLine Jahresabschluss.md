---
type: concept
title: "WinLine Jahresabschluss"
created: 2026-06-08
updated: 2026-06-08
address: c-000227
status: seed
complexity: intermediate
domain: accounting
tags:
  - winline
  - fibu
  - accounting
  - concept
aliases:
  - "Jahresabschluss"
  - "Jahreswechsel"
  - "year-end close"
related:
  - "[[WinLine FIBU]]"
  - "[[WinLine Wirtschaftsjahr]]"
sources:
  - "[[.raw/winline/cwl0/cwl0.chm]]"
---

# WinLine Jahresabschluss

Year-end close / **Wirtschaftsjahreswechsel** in [[WinLine FIBU]]. Rolls the books into the next [[WinLine Wirtschaftsjahr]].

## Related postings (Abschlussarbeiten)

- **EB-Buchung** (Eröffnungsbuchung) — opening entries. Two cases:
  - **Erstanlage** — first setup of a new ledger (e.g. migrating from manual bookkeeping); carry current balances of the source ledger into FIBU.
  - **Wirtschaftsjahreswechsel** — opening entries made each year after the year change.
- **Umbuchung Jahressalden** — reposting of annual balances.
- **Wareneinsatzbuchung** — cost-of-goods posting (with Filial-/Zentralbuchung variants).

## Consequence for reporting

Because [[WinLine Wirtschaftsjahr]] is stored as a relative index, after the close the "current year" pointer advances automatically and existing [[WinLine LIST]] formulas re-target the new current year without edits.

> [!note] Seed page
> Detail on the close wizard steps was not deep-ingested. Expand from `.raw/winline/cwl0/WordDocuments/ebbuchung.htm` and neighbours when needed.
