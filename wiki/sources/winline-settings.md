---
type: source
title: "WinLine Settings"
created: 2026-06-08
updated: 2026-06-08
address: c-000234
status: developing
tags:
  - winline
  - settings
  - parameter
  - configuration
  - source
source_type: data
author: "mesonic"
confidence: high
source_file: raw/winline/cwl0/cwl0.chm
key_claims:
  - "Configuration lives under START → Parameter: Applikations-Parameter (per-module FIBU/FAKT/KORE/PPS/ANBU/CRM) and Einstellungen (per-workstation)."
  - "Applikations-Parameter open in read mode by default; they hold the main parameters of each module and persist with the Mandant."
  - "Workstation Einstellungen cover Allgemein, Design, Mail, Exchange, TAPI, WinLine Server, Admin and MesoAI."
related:
  - "[[Mesonic WinLine]]"
  - "[[WinLine FIBU]]"
  - "[[WinLine KORE]]"
  - "[[WinLine PPS]]"
  - "[[WinLine Mandant]]"
sources:
  - "[[raw/winline/cwl0/cwl0.chm]]"
---

# WinLine Settings

The configuration hub of the suite, reached from **WinLine START → Parameter** (and Datei/Optionen/Vorlagen). Two distinct kinds of config: **Applikations-Parameter** (module behaviour, per [[WinLine Mandant]]) and **Einstellungen** (per-workstation).

## Applikations-Parameter (per module)

`START → Parameter → Applikations-Parameter` defines the main parameters of all WinLine applications. **Opens in read mode** by default; switch to edit to change. Per-module registers:

| Parameter set | Covers (selected registers) |
|---|---|
| **FIBU-Parameter** | Allgemein, Kontenstamm, Buchen (+ erweitert / bearbeiten), Buchungsfreigabe, Auswertungen — e.g. the Gewinnvortrags-Konto used by [[WinLine FIBU]] Bilanz |
| **FAKT-Parameter** | Artikel, Belege (Produktionsauftrag, Berechtigungen, Storno, Kontrakte, Belegarchivierung…), Vertreter, Einkauf, **Nummernkreise** |
| **KORE-Parameter** | Kostenstamm, Buchen — settings related to [[WinLine KORE]] (don't all act directly in KORE) |
| **PPS-Parameter** | 9 areas: Buchungsschlüssel, **Kore-Journal** ("Kore-Zeilen schreiben"), Produktionsauftragsanlage, Parameter, Ausgabe, Notiz/Teile, Varianten, Fehlzeiten — drives [[WinLine PPS]] |
| **ANBU-Parameter** | Allgemein, Buchen, Konten |
| **LOHN-Parameter** | Allgemein, Kore-Einstellungen (country-specific) |
| **CRM-Parameter** | Allgemein |

`Auswahl Parameter` picks which set to open.

## Einstellungen (per workstation)

`START → Parameter → Einstellungen` — options important for daily work, organized in registers: **Allgemein, Design, Mail, Absende-Adressen, Exchange, TAPI, WinLine Server, Admin, MesoAI**. Plus **Allgemeine Einstellungen**.

## Startparameter

Command-line switches for `CWLSTART.EXE` / `ADMN.EXE`: `/USERx` (user for a macro), `/PASSWDy` (password), and more — used for automation/macro launch.

## Optionen & Vorlagen

- **Optionen**: Textbaustein-Grafikeinstellungen, **Mehrjahresvergleich-Optionen**, **Konsolidierung-Einstellungen**.
- **Vorlagen**: **Vorlagen-Parameter** (Standard-Formulare, Standard-Vorlage EXIM, Optionen), **Beleg Pro - Einstellungen**, **EXIM Watchdog Einstellungen**.
- **Action Server**, **WinLine Share - Einstellungen** (CRM).

## See also

[[Mesonic WinLine]] · [[WinLine ADMIN]] (server-level config, server.config/client.config) · [[WinLine Mandant]]
