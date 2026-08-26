---
type: concept
title: "WinLine FAKT Formeln"
created: 2026-06-09
updated: 2026-06-09
address: c-000250
status: developing
tags:
  - winline
  - fakt
  - formeln
  - scripting
  - vbscript
  - voucher
  - beleg
  - exchange-rate
  - concept
related:
  - "[[Mesonic WinLine]]"
  - "[[WinLine FAKT]]"
  - "[[Framas WL Schema]]"
---

# WinLine FAKT Formeln

WinLine FAKT has a built-in VBScript formula engine that runs at specific points during voucher entry and save. Formulas are defined in **FAKT → Stammdaten → Formelstamm** and assigned either to an **Artikelgruppe** (for line/document formulas) or directly to a **Belegart** (for header formulas).

## Formula Types

| Type | Execution point | Assigned in | Use case |
|---|---|---|---|
| **Zeilenformel** | After article entry confirmation, per line | Artikelgruppe | Custom price calc, quantity checks |
| **Belegformel** | On save, executed per voucher line (after Belegkopfformel Speichern) | Artikelgruppe | Summing across lines (freight, packaging totals) |
| **Belegkopfformel (Laden)** | After Belegart confirmation (document load) | Belegart | Pre-fill header fields, influence price options |
| **Belegkopfformel (Speichern)** | At voucher save (before Belegformeln) | Belegart | **← use this to capture exchange rate on save** |

> [!warning] Belegkopfformeln not fired on batch/auto-print
> Belegkopfformel (Laden) and Belegkopfformel (Speichern) are **not executed** during automatic voucher print or batch import. Only interactive save triggers them.

## Execution Context Variable

`Value(0, 297)` returns the current execution context inside any formula:

| Value | Context |
|---|---|
| 0 | Article entry (Zeilenformel) |
| 6 | Quantity change (with RefreshValues) |
| 991 | Grand-total display |
| 995 | Belegformel execution |
| 999 | Belegumstellung (voucher conversion) |

## Key Variables — Header (View 0)

All accessible via `Value(0, N)` in VBScript. Most can be read **and written**; exceptions like "Interne Zeilennummer" are system-set.

| Var | Name | R/W |
|---|---|---|
| 64 | Fremdwährungszeile (currency slot) | R |
| 66 | Fremdwährungseinheit (FX unit) | R |
| 93 | Fremdwährungsfaktor | R |
| 113 | Belegart | R |
| **616** | **fixer Kurs** (fixed/locked rate) | **R** |
| **618** | **Kurs/Einheit** (current rate per unit — the live exchange rate) | **R** |
| 626 | Valutadatum | R |

> **Exchange rate in a formula:** `Value(0, 618)` returns the voucher's active exchange rate (Kurs/Einheit). `Value(0, 616)` returns the fixed rate if Kursänderung checkbox is ticked.

## Key Variables — Line (View 0, Belegmitte)

| Var | Name |
|---|---|
| Quantity | Menge |
| Price | Einzelpreis |
| Total | Gesamtpreis |
| Discount1/2 | Zeilenrabatt 1/2 |
| Factor1–3 | Frei verwendbare Speichervars (per line) |
| Storage(1)–Storage(100) | Formel-Speicher (Storage 1–10 reset per line) |

Access all other vars via `Value(0, N)` / `NumValue(0, N)`. Example:
```vbscript
Quantity = Value(0, 192)
Value(0, 151) = "1"
```

## Special Invoicing Functions

| Function | Effect |
|---|---|
| `RefreshValues` | Re-runs Zeilenformel on every quantity change (not just F9) |
| `CalcTotal` | Always computes Total = Menge × Preis − Rabatt even if Menge=0 |
| `DifferentTotal` | Total must be set by formula; standard calc suppressed |
| `FormulaOnChange(x)` | Re-runs Zeilenformel when column x of T026 changes |
| `PriceFromFormula` | Skips price-finding when Menge changes from 0 to non-zero |

## Writing the Exchange Rate to a T025 User Column on Save

### Step 1 — Add user column to T025

**ADMIN → System → Tabellen erweitern**
1. Select table `T025`
2. Under **Benutzerspalten**, add a new row: name e.g. `U000`, type `4 - Double`, length `4` (4 decimal places)
3. Save → WinLine applies DDL to all Mandanten in Datenbank Verbindungen

> [!warning] Requires MDP-Developer-Lizenz + MDP-Runtime-Lizenz. Adding a column to T025 disables "Belege parken". If that feature matters, extend T026 instead (needs MDP-Fensterskript changes for AddColumn to ID300/ID301).

> [!warning] If you use background printing, also extend **T145** (header staging) with the same column.

### Step 2 — Create Belegkopfformel (Speichern)

**FAKT → Stammdaten → Formelstamm → Neu**
- Type: `Belegkopfformel (Speichern)`
- Formelsprache: `VBScript`

```vbscript
' Capture exchange rate to user column U000 on T025
Dim exchangeRate
exchangeRate = Value(0, 618)   ' Kurs/Einheit — live rate used for this voucher

' Write to T025.U000
Value(0, "U000") = exchangeRate
```

> [!note] Exact syntax for user column access
> The VBScript `Value(0, "U000")` pattern is the documented approach for programmatic variable access. If your WinLine version uses numeric indices for U-columns, verify with mesonic support or test via Formel-Debugger — the column index may be published in the Tabellen erweitern overview.

### Step 3 — Assign to Belegart

**FAKT → Stammdaten → Belegartenstamm** → open the Belegart → assign the new formula as **Belegkopfformel (Speichern)**.

The formula fires on every interactive save of vouchers of that Belegart. It reads the current exchange rate from the voucher header and writes it into the user-defined T025.U000 column.

## Formula Language Options

| Language | Syntax | Result variable |
|---|---|---|
| Keine Scriptsprache | `[21/2]` (mesonic native) | implicit |
| **VBScript** | Standard VBS | `ResultValue` |
| JScript | Standard JS | `return` |

VBScript is recommended for formula access to Invoicing variables.

## See also

[[WinLine FAKT]] · [[Framas WL Schema]] (T025 = Order File Header, T026 = lines, t012 = FC Exchange Rates) · [[WinLine LIST]] (VBScript-Formel in reports) · [[Mesonic WinLine]]
