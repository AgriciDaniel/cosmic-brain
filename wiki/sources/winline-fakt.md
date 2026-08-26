---
type: source
title: "WinLine FAKT"
created: 2026-06-09
updated: 2026-06-09
address: c-000249
status: developing
tags:
  - winline
  - fakt
  - fakturierung
  - invoicing
  - voucher
  - beleg
  - source
source_type: data
author: "mesonic"
confidence: high
source_file: .raw/winline/cwl0/cwl0.chm
key_claims:
  - "FAKT (Fakturierung) handles all voucher/document processing: offers, orders, delivery notes, invoices, purchase orders."
  - "Four formula types control voucher entry behaviour: Zeilenformel (line), Belegformel (document-save per line), Belegkopfformel Laden (header load), Belegkopfformel Speichern (header save)."
  - "Belegkopfformel (Speichern) fires at voucher save time; assigned per Belegart — this is the correct hook for writing exchange rate to a user-defined T025 column."
  - "Exchange rate is read via Value(0,618) = Kurs/Einheit or Value(0,616) = fixer Kurs in VBScript formulas."
  - "User-defined columns on T025 (named U000, U001, ...) added via ADMIN → System → Tabellen erweitern; requires MDP-Runtime-Lizenz; adding a T025 extension disables the 'Belege parken' button."
related:
  - "[[Mesonic WinLine]]"
  - "[[WinLine FIBU]]"
  - "[[WinLine KORE]]"
  - "[[WinLine Settings]]"
  - "[[Framas WL Schema]]"
  - "[[WinLine FAKT Formeln]]"
sources:
  - "[[.raw/winline/cwl0/cwl0.chm]]"
---

# WinLine FAKT

Module — **Fakturierung** (invoicing / order management). Handles the full document flow: **Angebote** (offers), **Aufträge** (orders), **Lieferscheine** (delivery notes), **Fakturen/Rechnungen** (invoices) on the sales side, and **Anfragen**, **Bestellungen**, **Wareneingang** on the purchase side. All documents are called **Belege**; each Beleg lives in **T025** (header) and **T026** (lines).

## Belegerfassung (voucher entry)

Entry screen organised as registers: **Kopf** (header — Belegart, account, dates), **Mitte** (lines — article, quantity, price), **Zusatz** (extras — foreign currency, delivery address, representative), **Text**, **Zahlung** (payment), **Optionen**, **Quick**.

### Belegarten (document types)

Master data defining the behaviour of each document stage. Key register: **Ausdruck** — sets which exchange-rate slot (1-6) to use for foreign-currency vouchers. Belegarten also carry the **Belegkopfformel (Laden)** and **Belegkopfformel (Speichern)** formula assignments (see [[WinLine FAKT Formeln]]).

### Fremdwährung (foreign currency)

On the **Zusatz** register:
- **Fremdwährungszeile** — currency selection (pre-filled from Preisliste)
- **Fremdwährungskurs** — the current rate; shown read-only unless **Kursänderung** checkbox is activated
- Conversion: `Fremdwährungsbetrag / Fremdwährungseinheit × Fremdwährungskurs = Landeswährung`
- Rate lookup: WinLine searches the **Fremdwährungshistorie** by Belegdatum; falls back to the Fremdwährungsstamm (most recent) rate

## Stammdaten (master data)

| Area | Content |
|---|---|
| **Formelstamm** | FAKT formula definitions (Zeilen-/Beleg-/Belegkopfformel). See [[WinLine FAKT Formeln]]. |
| **Artikelgruppen** | Assign Zeilenformel and Belegformel per group |
| **Belegartenstamm** | Assign Belegkopfformeln; set exchange-rate slot, print options, FIBU/KORE posting keys |
| **Preislisten** | Price/discount/FX-currency matrix per customer |
| **Vertreter** | Sales representatives, commission codes |

## Tabellen erweitern (user columns on T025/T026)

Custom columns added via **ADMIN → System → Tabellen erweitern**. Named **U000, U001, ...** (auto-assigned, always U-prefix). Max 50 per table; total column count (system + user) must stay ≤ 150. Requires **MDP-Developer-Lizenz** to create + **MDP-Runtime-Lizenz** to operate.

> [!warning] T025 Tabellenerweiterung disables Belege parken
> Adding user columns to T025 deactivates the "Belege parken" (park voucher) feature — the **Neu** and **Laden** buttons in Belegerfassen are disabled. If T026 is extended instead, Belege parken still works *if* the MDP-Fensterskript also adds the new columns to window table ID300 and internal table ID301 via AddColumn.

When T025/T026 are extended, the staging tables **T145** (header) and **T146** (lines) used by background printing must also be extended manually.

## See also

[[WinLine FAKT Formeln]] (formula system, exchange-rate variables, VBScript) · [[Mesonic WinLine]] · [[WinLine FIBU]] · [[Framas WL Schema]] (T025 = Order File Header, T026 = Order File Center, t012 = FC Exchange Rates)
