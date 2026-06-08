---
type: concept
title: "Bilanz- und Betriebswirtschaftliche Kennzahlen (BKZ / BWA)"
created: 2026-06-08
updated: 2026-06-08
address: c-000225
status: developing
complexity: intermediate
domain: accounting
tags:
  - winline
  - fibu
  - accounting
  - concept
aliases:
  - "BKZ"
  - "BWA"
  - "Bilanzgliederungskennzahl"
  - "Betriebswirtschaftliche Kennzahl"
related:
  - "[[WinLine FIBU]]"
  - "[[WinLine LIST]]"
  - "[[Mesonic WinLine]]"
sources:
  - "[[.raw/winline/cwl0/cwl0.chm]]"
---

# Bilanz- und Betriebswirtschaftliche Kennzahlen (BKZ / BWA)

Two parallel classification keys in [[WinLine FIBU]] that aggregate G/L accounts (Sachkonten) into reportable structures. Each account carries BKZ assignments and up to **three** BWA numbers.

## BKZ — Bilanzgliederungskennzahl

The **balance-sheet structuring key**. Drives how accounts roll up into the **Bilanz** (balance sheet) and P&L.

- **9-digit, alphanumeric**, sorted **left-aligned** (string sort, not numeric).
- Up to **3 structures** can coexist: **Gruppe 1, Gruppe 2, Gruppe 3** — each a different breakdown of the same accounts.
- Maintained in **BKZ-Stamm** as a tree; accounts attached per node. **BKZ-Struktur kopieren** clones a structure; **BKZ-Budget** holds budgets.
- Reporting: **BKZ-Kontoblatt**, **BKZ-Liste**, **eBKZ-Matchcode** (electronic balance).

## BWA — Betriebswirtschaftliche Kennzahl

**Operating/management figures** for business analysis, independent of the statutory balance structure.

- Defined in **BWA-Stamm**, shown as a tree of **BWA-Gruppe → BWA → assigned accounts** (drag & drop).
- Group number 5-digit alphanumeric; **BWA-Gruppen** and **BWA-Budget** supported.
- Up to 3 BWA per account enable selecting evaluations by BWA number.
- Reporting: **BWA-Liste**, **BWA-Tabellenausgabe**.

## Use in WinLine LIST

[[WinLine LIST]] exposes both as formula parameters: `BKZTEXT`/`BWATEXT` (labels), `SUMBKZ`/`SUMBWA` (values), `BUDGETBKZ`/`BUDGETBWA` (budgets). All take a fixed key or the current row's key, plus a Wirtschaftsjahr — see [[WinLine Wirtschaftsjahr]].
