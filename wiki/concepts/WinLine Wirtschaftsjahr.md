---
type: concept
title: "WinLine Wirtschaftsjahr"
created: 2026-06-08
updated: 2026-06-08
address: c-000226
status: developing
complexity: basic
domain: accounting
tags:
  - winline
  - accounting
  - concept
aliases:
  - "Wirtschaftsjahr"
  - "fiscal year"
related:
  - "[[WinLine FIBU]]"
  - "[[WinLine Jahresabschluss]]"
  - "[[WinLine LIST]]"
sources:
  - "[[.raw/winline/cwl0/cwl0.chm]]"
---

# WinLine Wirtschaftsjahr

The **fiscal/business year** a posting or evaluation belongs to in WinLine.

## Key behaviour: stored as an index, not the year

Internally WinLine stores a **relative number**, not the literal year. After a [[WinLine Jahresabschluss]] (year-end close), the "current" year shifts and that number automatically resolves to the new current year.

**Why it matters:** lists and formulas that reference a Wirtschaftsjahr (e.g. `SUMKTO`, `BUDGETKTO`, `KORESUM` in [[WinLine LIST]]) keep working after a year change **without being re-edited** — the relative index follows the close. This is a deliberate design choice so reports survive the annual close.

## Where it appears

- Every value/budget formula in [[WinLine LIST]] asks for the Wirtschaftsjahr as its first step.
- [[WinLine FIBU]] **EB-Buchung** and **Umbuchung Jahressalden** operate per Wirtschaftsjahr.
- Cost evaluations in [[WinLine KORE]] are year-scoped.
