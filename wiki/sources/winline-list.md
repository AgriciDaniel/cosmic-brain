---
type: source
title: "WinLine LIST"
created: 2026-06-08
updated: 2026-06-08
address: c-000223
status: developing
tags:
  - winline
  - list
  - reporting
  - source
source_type: data
author: "mesonic"
confidence: high
source_file: raw/winline/cwl0/cwl0.chm
key_claims:
  - "WinLine LIST builds reports via an assistant — no SQL/ODBC knowledge needed; the user just picks variables."
  - "A list's data scope is fixed by its Listentyp (00 Kontenstamm, 01 Debitoren, 02 Kreditoren, 16-18 CRM, 27 Zeitauswertung, 29 Datenquellen, ...)."
  - "Formula parameters (SUMKTO, KORESUM, BUDGETKTO, KORETEXT, VB-Script-Formel) pull computed values into list cells."
related:
  - "[[Mesonic WinLine]]"
  - "[[WinLine KORE]]"
  - "[[Bilanz- und Betriebswirtschaftliche Kennzahlen (BKZ BWA)]]"
  - "[[WinLine Wirtschaftsjahr]]"
sources:
  - "[[raw/winline/cwl0/cwl0.chm]]"
---

# WinLine LIST

Module **LIST** — the WinLine **Listgenerator** (report generator). Lets users build their own evaluations/reports through the **List-Assistent** without relational-DB or ODBC knowledge: pick the variables (data fields), and the assistant generates a standard-layout report (header / detail / footer = *Kopf-, Mittel-, Fußteil*).

## List-Assistent

A list lives in a **Gruppe** (group, for organizing lists within one data type). Create with **Neue Liste**, or **Liste kopieren** to clone an existing one. The assistant is organized into *Bereiche* (areas):

| Bereich | Purpose |
|---|---|
| Stamm | Core settings — pick the **Listentyp** (data scope), group, layout |
| Einstellungen | Options; shows auto-generated **Formularname** and last-used date |
| CRM-Selektion | For CRM list types (16/17/18) — which workflow steps/actions to include |
| Zeitarten-Selektion | For type 27 (Zeitauswertung) — which time types to include |
| Datenquelle | For type 29 — pick the snapshot data source (View/MasterView not supported here) |
| Variablen | Choose which fields/values are printed; field set depends on Listentyp |
| Grafik | Render the evaluation as a chart (feeds Power Reports) |
| Kalender | For standard output "03 - Ausgabe Kalender" — opens the WinLine Kalender |

### Listentyp (data scope)

The **Listentyp** chosen in *Stamm* fixes the data domain. Examples: `00` Kontenstamm (G/L accounts), `01` Debitorenstamm (customers), `02` Kreditorenstamm (vendors), `03` Fakturen O.P. (open items), `16/17/18` CRM workflows/actions, `26` PDMS, `27` Zeitauswertung, `29` Datenquellen.

### Variablenbereiche (special variable groups)

- **Formeln** — computed values not backed by a raw field (see Formel-Parameter below).
- **Benutzerdefiniert** — user-defined list-only fields; only usable with Datenquellen, editable only in table output.
- **Lokale Variablen** — extra variables for CRM (16/17/18) or PDMS (26) lists.
- **Kalender** — fields for time evaluation (type 27).

## List - Formel Parameter

Formulas compute cell values pulled from other areas. Catalogue:

| Formula | Returns |
|---|---|
| KTOTEXT / BKZTEXT / BWATEXT | Label of an account / BKZ / BWA (fixed number or current row) |
| SUMKTO / SUMBKZ / SUMBWA | A value of an account / BKZ / BWA |
| SUMKTOEXT | Accounts summed by criteria |
| BUDGETKTO / BUDGETBKZ / BUDGETBWA | Budget values of account / BKZ / BWA |
| KORETEXT / KORESUM | Cost-master label / summed cost-master values |
| KOREBUD / KOREBUDTR / KOREGR | Cost-center budget / cost-object budget / overhead surcharge rate |
| VB-Script-Formel | Arbitrary computed field via VBScript (math, field concatenation) |

> [!note] Wirtschaftsjahr is stored as an index, not the year itself
> All SUM*/BUDGET*/KORE* formulas first ask for the **Wirtschaftsjahr**. Internally a *number* is stored, not the year — so after a [[WinLine Jahresabschluss]] the formula automatically targets the new current year and lists need not be re-edited. See [[WinLine Wirtschaftsjahr]].

## Output & related tools

- **List - Ausgabe** — print via `LIST 1 Liste 1 Drucken` or `INFO 1 CRM 1 Liste Drucken`.
- **List - Ausgabe in Tabelle** — table output (option "Ausgabe Tabelle"); supports search row / filters.
- **List - Matchcode** (F9 / lupe) — search for existing lists by type.
- **DrillDown Matchcode** — define custom drilldowns per field (referenced variables must exist in table output).
- **Multi-Belegkalender** — combine several Belegzeilen evaluations (detail + sums) into one.

## See also

[[Mesonic WinLine]] · [[WinLine KORE]] (KORE* formulas) · [[WinLine FIBU]] (account/BKZ/BWA values)
