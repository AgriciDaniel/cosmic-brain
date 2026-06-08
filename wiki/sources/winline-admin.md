---
type: source
title: "WinLine ADMIN"
created: 2026-06-08
updated: 2026-06-08
address: c-000232
status: developing
tags:
  - winline
  - admin
  - administration
  - source
source_type: data
author: "mesonic"
confidence: high
source_file: raw/winline/cwl0/cwl0.chm
key_claims:
  - "WinLine ADMIN is the administration program: users, permissions, databases, backups, network installs."
  - "User permissions are modeled bidirectionally (Benutzer→Mandant and Mandant→Benutzer), with Benutzergruppen, Berechtigungsprofile and 2FA."
  - "The mesonic System Manager (MSM) + WinLine Server handle network/EWL installation, services, and the server.config/client.config plumbing."
related:
  - "[[Mesonic WinLine]]"
  - "[[WinLine Benutzer- und Berechtigungsverwaltung]]"
  - "[[WinLine Mandant]]"
  - "[[WinLine Settings]]"
sources:
  - "[[raw/winline/cwl0/cwl0.chm]]"
---

# WinLine ADMIN

Module **ADMN** — the administration program. Manages users, grants permissions, creates & maintains databases, runs backups, sets up and maintains network installations, and more.

## Datei (files / data management)

- **Lizenzeingabe** (license), **Netzwerkpfad**, **Datenbank Verbindungen**.
- **Mandanten gruppieren**, **Mandant löschen**, benutzerdefinierte Tabellen abgleichen.
- **Sicherungs-Assistent** (backup wizard): Art der Sicherung → Mandantenauswahl (single/multiple) → Sicherungsdatei → Backup-Methode → Datenbank sichern.
- **Rücksicherungs-Assistent** (restore wizard, 5 steps).

## Audit

**Variablen Audit**, Audit erzeugen, Auditprotokoll löschen, **Bedingte Formatierung** (Bedingungen / Formatierungen / Grafiken / Zuweisung incl. Direktprüfung).

## Benutzer (users & permissions)

- **Benutzeranlage** — registers **Stammdaten** and **Berechtigungen**. Permissions are modeled both ways: **Benutzer → Mandant** and **Mandant → Benutzer**, plus **Administrator**, **Benutzergruppen**, **Downloads**.
- **Objektberechtigungen vererben** (inherit), **Berechtigungsprofile** (+ definieren), **Variablen Sperren**.
- **Automatische Benutzeranlage**, **WEB Benutzer**, **meso Benutzer Passwort ändern**, **Profil auswählen**.
- **2-Faktor-Authentifizierung (2FA)** — setup via WinLine mobile, first login, administration.
- Benutzer-Matchcode (Benutzer / WEB / CRM registers).

See [[WinLine Benutzer- und Berechtigungsverwaltung]].

## Archiv (document management / DMS)

Document archiving integrated across the suite: **Archivierung interner Dokumente** (aller Drucke / Druckersteuerung / WinLine Formular / Druckvorschau), Abruf/Anzeige, **Archiv-Parameter** & Exporteinstellungen, **Schlagwörter** + **Beschlagwortung** (tagging, also via Formular), **Formulartypen** (Anlage/Zuordnung), Dokumenten-Matchcode, **Neuer Archiveintrag** (Inbox, Suchstrategien, Beschlagwortung), Archiv verschieben/entpacken, Archivetiketten.

## mesonic System Manager (MSM) & WinLine Server

The **MSM** eases mesonic-software administration. Network install can be driven from one workstation under certain conditions.

- **Installations Wizard** (from workstation / from server / lokal), **Workstation/Update/Server Wizard**, Workstation Match, **MSM**, MDP-Projekt importieren.
- **WinLine Server** setup: Neuinstallation, Haupt- vs abweichende Installation, Serverdienst (Tray / manuell), **WinLine ADMIN → WinLine Server Einstellungen**, directories/files/services (**EWL-Verzeichnis**, EWLHTM, **server.config**, **client.config**), EWL-Installation grafisch, EWL Benutzer anlegen, Druckereinstellungen.

## System (database tools)

**Upsize Datenstand** (auto/manuell), **Vorjahresmandanten übernehmen**, **Datenstandtools**, **SQL Abfrage**, **Upsize/Downsize Systemtabellen** (SQL), **SQL Datenbank erzeugen**, **Datenbank Wartung**, **Tabellen erweitern**.

## WebEdition

**CRM-Kompakt** (web-based).

## See also

[[Mesonic WinLine]] · [[WinLine Settings]] · [[WinLine Mandant]] · [[Framas WL Schema]] (a concrete WinLine SQL schema)
