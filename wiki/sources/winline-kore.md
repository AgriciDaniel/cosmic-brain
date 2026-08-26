---
type: source
title: "WinLine KORE"
created: 2026-06-08
updated: 2026-06-08
address: c-000230
status: developing
tags:
  - winline
  - kore
  - kostenrechnung
  - cost-accounting
  - source
source_type: data
author: "mesonic"
confidence: high
source_file: .raw/winline/cwl0/cwl0.chm
key_claims:
  - "KORE (cost accounting) is never stand-alone — it requires at least one other mesonic module and receives data from FIBU, FAKT, ANBU, LOHN and PROD."
  - "Its three master-data axes are Kostenstellen (cost centers), Kostenarten (cost types) and Kostenträger/Projekt (cost objects/projects), all groupable."
  - "Umlage (overhead allocation) runs via Verfahren + Verhältniszahlen + Plan; results feed BAB, Vor-/Nachkalkulation and Betriebs-Erfolg."
related:
  - "[[Mesonic WinLine]]"
  - "[[WinLine FIBU]]"
  - "[[WinLine PPS]]"
  - "[[WinLine LIST]]"
  - "[[WinLine Wirtschaftsjahr]]"
sources:
  - "[[.raw/winline/cwl0/cwl0.chm]]"
---

# WinLine KORE

Module **ACC2** — **Kostenrechnung** (cost accounting). Explicitly **not** stand-alone: it needs at least one other mesonic module and delivers its full value only in combination.

## Data inflow (Einbindung)

Costs arrive from other modules:

| From | What is handed over |
|---|---|
| [[WinLine FIBU]] | Aufwände transformed to Kosten during Buchen — the most common capture path |
| FAKT | Erlöse (revenue) and Wareneinsatz (cost of goods) from invoicing |
| ANBU | Depreciation — choice of *kalkulatorische* (replacement value/useful life) or *buchmäßige* (tax) values |
| LOHN | Gross payroll amounts — directly into KORE or via FIBU |
| [[WinLine PPS]] (PROD) | Production end-message costs (raw materials, …) if "Kore-Zeilen schreiben" set in PROD-Parameter |

## Stammdaten (the three axes + groups + budget)

- **Kostenstellen / Abteilung** — cost centers: a functional area (sales, marketing, production) or a billing unit (a site, a rental property) where costs/revenue are captured. Up to 30 **Zusatzfelder** (255 chars).
- **Kostenarten** — cost types, classified by origin / dependency on activity. **Variatoren** (per cost-center group), **Verteilen** (auto-split across cost centers during capture), Zusatzfelder.
- **Kostenträger / Projekt** — cost objects / projects; with **Budget** and Zusatzfelder.
- **Kostengruppen** — groups over centers/types/objects (Gruppenstamm); anlegen, kopieren (across Mandanten in same DB), zuweisen, match.
- **Budget** — Erfassung (STRG+D in FIBU/KORE), Verwaltung (many Budgetansätze from prior actuals), Selektion, Verteilung, Perioden-Verteil-Regeln.
- **Einheiten** — units (Einheitenanlage, Matchcode).

## Kosten (cost processing)

- **Kostenerfassung**, **Plankosten-Erfassung**, **Umlagekosten-Erfassung**, **Budget-Erfassung Abteilung**.
- **Berechnen** (run calculation).
- **Umlage** (overhead allocation): **Verfahren** + **Verhältniszahlen** (ratios) + **Auswahl** + **Plan** drive it; **Umlage**, **Umlage 13. Periode**, **Umlage Storno**.
- **ASCII-Import**, **Kostenrechnung Export/Import**.

## Auswertungen (reports)

- **KORE-Journal** (+ table), **KORE-Statistik**, **Gruppen-Statistik**, **Stammdaten-/Gruppenauswertung**.
- **BAB** (Betriebsabrechnungsbogen), **Kostenstellenblatt**, **Kostenstellen-Budgetvergleich**.
- **Vorkalkulation / Nachkalkulation** (also pro Stück), **Betriebs-Erfolg**, **Kostenträgererfolgsrechnung**, **Kostenträger-Budgetvergleich**, **Plankostenträgervergleich**, **Betriebs-Plankostenvergleich**, **Halb- u. Fertigerzeugnisse**.
- Stammlisten for Kostenstellen / Kostenarten / Kostenträger / Gruppen.

KORE values are exposed to [[WinLine LIST]] via `KORETEXT`, `KORESUM`, `KOREBUD`, `KOREBUDTR`, `KOREGR` (all Wirtschaftsjahr-scoped — see [[WinLine Wirtschaftsjahr]]).

## See also

[[WinLine FIBU]] (primary cost source) · [[WinLine PPS]] (production costs) · [[Mesonic WinLine]]
