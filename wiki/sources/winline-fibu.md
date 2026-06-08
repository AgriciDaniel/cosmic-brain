---
type: source
title: "WinLine FIBU"
created: 2026-06-08
updated: 2026-06-08
address: c-000224
status: developing
tags:
  - winline
  - fibu
  - accounting
  - finanzbuchhaltung
  - source
source_type: data
author: "mesonic"
confidence: high
source_file: raw/winline/cwl0/cwl0.chm
key_claims:
  - "FIBU is the core of WinLine; it integrates data from FAKT, ANBU and LOHN and hands data to KORE."
  - "Accounts split into Sachkonten (G/L) and Personenkonten (Debitoren/Kreditoren); balance structure is driven by BKZ and BWA keys."
  - "Austrian tax compliance is built in: USt-Voranmeldung (UVA), Zusammenfassende Meldung, and electronic submission via FinanzOnline."
related:
  - "[[Mesonic WinLine]]"
  - "[[WinLine KORE]]"
  - "[[WinLine LIST]]"
  - "[[Bilanz- und Betriebswirtschaftliche Kennzahlen (BKZ BWA)]]"
  - "[[WinLine Offene Posten (OP)]]"
  - "[[WinLine Wirtschaftsjahr]]"
  - "[[WinLine Jahresabschluss]]"
sources:
  - "[[raw/winline/cwl0/cwl0.chm]]"
---

# WinLine FIBU

Module **ACC1** — **Finanzbuchhaltung** (financial accounting), the *Kernstück* (core) of the WinLine suite. It demands maximum integration: it takes data from Auftragsbearbeitung ([FAKT]), Anlagenbuchhaltung (ANBU) and Lohn (LOHN), hands data to Kostenrechnung ([[WinLine KORE]]), and shares records (e.g. Personenkonten) with other modules.

## Stammdaten (master data)

| Area | What it holds |
|---|---|
| Hauptbuchkonten | G/L accounts (Sachkonten); zugeordnete Konten + BKZ assignment |
| Gegenkonten / Abzugsarten | Contra accounts, deduction types |
| BKZ-Stamm | **Bilanzgliederungskennzahl** — 9-digit alphanumeric balance-structure key; up to 3 structures (Gruppe 1/2/3), shown as a tree |
| BWA-Stamm | **Betriebswirtschaftliche Kennzahl** — operating figures; up to 3 BWA per account; BWA-Gruppen via drag & drop |
| Buchungsarten / Buchungskreise | Posting types and posting circles |
| OP-Parameter | Open-item params (Fehlbetrag/Skonto tolerance, CRM follow-ups, batch-posting interface) |
| Mahnparameter / Gerichtskosten | Dunning rules (Karenztage, Verzugszinsen, Mahnspesen), court costs |
| UID-Nummern-Prüfung | VAT-ID (UID) validation |

See [[Bilanz- und Betriebswirtschaftliche Kennzahlen (BKZ BWA)]] for BKZ vs BWA.

## Bearbeiten (posting & processing)

The heart is **Buchen** (posting). Multiple posting programs, reachable via menu, **Shortcuts**, or the **Buchen-Buttonleiste**:

- **Buchen / Buchen (Dialog-Stapel)** — dialog and batch posting; Quick + Mikrostapel variants.
- Specialized: **Buchen Eingangs-/Ausgangsrechnungen**, **Zahlungsmittelkonten**, **Splitbuchungen**, **FAKT-Stapel**.
- **Buchungs-Storno**, **Buchungen festschreiben** (lock), **bearbeiten/nachbearbeiten**, **Journalzeilen editieren**.
- **Fremdwährung**, **Skonto editieren**, **Kostenerfassung beim Buchen** (feeds KORE), **KORE-Periodenaufteilung**.
- **Zahlungsverkehr** (payment transactions) — assistant-driven: Stapelauswahl → Selektion → Ausgabe; **AZV** (Auslandszahlungsverkehr, SEPA/Europaüberweisung), **Zahlungsverkehr Schweiz/Liechtenstein** (ESR TA826/827, TA830, TA836, Lastschriften 875).
- **Fakturenausgleich** (automatic/manual), **Zahlungsausgleich** + **Regelassistent**, **Neubewertung Fremdwährungs-OPs**, **Abgrenzungsbuchungen**, **E-Rechnung Eingang**.

## Auswertungen (reports)

- **Journal**, **Buchungen**, **Kontoblatt**, **Kassenbuch**, **Saldenliste** (+ Fremdwährung / Tabelle).
- **Offene Posten** / **OP-Auswertung** — see [[WinLine Offene Posten (OP)]]; **Mahnvorbereitung → Mahnung** (dunning), **Zahlungsmoral**, **Differenzliste**.
- **Bilanz** (balance sheet, statutory Staffelform; Gewinnvortrags-Konto set in START/Optionen/FIBU-Parameter), **Bilanzausgabe Tabelle**, **Elektronische Bilanz** (XML).
- **BKZ-Kontoblatt / BKZ-Liste / BWA-Liste**.
- **Steuermeldungen** (Austria): **USt-Voranmeldung (UVA)**, **Zusammenfassende Meldung (ZM)**, **FinanzOnline** electronic submission (UVA + ZM XML-Viewer, FinanzOnline-Journal), **UID-Protokoll**, **Vorsteuererstattung**, **1099** (US), **Kammerumlage**, **Verprobung**.
- **Kontenplan** (STRG+L), Kontenstammblatt, Mandantendatenliste.

## Abschlussarbeiten (closing)

- **EB-Buchung** (Eröffnungsbuchung / opening entries) — Erstanlage vs annual Wirtschaftsjahreswechsel.
- **Wareneinsatzbuchung**, Filial-/Zentralbuchung, **Umbuchung Jahressalden**.

See [[WinLine Jahresabschluss]] and [[WinLine Wirtschaftsjahr]].

## See also

[[Mesonic WinLine]] · [[WinLine KORE]] (cost postings) · [[WinLine LIST]] (SUMKTO/BKZ/BWA formulas) · [[Framas WL Schema]]
