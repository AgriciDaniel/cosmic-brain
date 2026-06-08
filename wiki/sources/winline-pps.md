---
type: source
title: "WinLine PPS"
created: 2026-06-08
updated: 2026-06-08
address: c-000231
status: developing
tags:
  - winline
  - pps
  - produktion
  - production
  - source
source_type: data
author: "mesonic"
confidence: high
source_file: .raw/winline/cwl0/cwl0.chm
key_claims:
  - "PPS (Corporate WinLine Produktion) covers manufacturing: resources, activities, BOMs (Stücklisten), order planning, and automatic stock postings."
  - "A Produktionsauftrag flows Vorbereitung → Simulation → Zuordnung → Einplanung → Materialentnahme/Arbeitsschein → Produktionsendmeldung."
  - "Production costs feed KORE on end-message if 'Kore-Zeilen schreiben' is set in PROD-Parameter; production articles/BOMs are defined partly in FAKT Artikelstamm."
related:
  - "[[Mesonic WinLine]]"
  - "[[WinLine KORE]]"
  - "[[Mesonic WinLine]]"
sources:
  - "[[.raw/winline/cwl0/cwl0.chm]]"
---

# WinLine PPS

Module **PROD** — **Corporate WinLine Produktion** (production planning & control / PPS). Covers the *Fertigung* (manufacturing) area: managing resources, defining activities, building BOMs, planning/procuring raw materials & resources, monitoring production, resolving conflicts/bottlenecks, and automatic stock posting (Zu-/Abbuchung) of raw materials.

Tightly coupled to **FAKT** (production articles, components and Belegarten are defined in the FAKT Artikelstamm) and to [[WinLine KORE]] (cost feedback).

## Stammdaten (master data)

- **Ressourcenstamm** — resources: Mitarbeiter (staff), Maschinen, Werkzeuge, Prüfmittel; like resources grouped into **Ressourcengruppen**.
- **Kalender - Produktion** — production calendar: Definition, Abweichungen, Ressourcen-assignment, Übersicht.
- **Tätigkeitenstamm** — activities; registers Stamm / Notiz / Optimale Auslastung; **Arbeitsbereiche** (work areas).
- **Stückliste** (BOM) — registers Stamm / Zusatz / Notiz / **Varianten** / Info / Arbeitsanweisung; **Stückliste-Assistent**, Ersatznummern, detailliert. **Variantendefinition / Variantensteuerung**.
- **Kategorien / Artikelstatus**.
- **Produktion in FAKT** — Artikelstamm: Produktionsartikel (Halbfertig-/Fertigprodukte) + Komponenten; **Belegartenstamm** (auftragsbezogene Produktion/Bestellung).

## Produktionsaufträge (order planning)

1. **Produktionsvorbereitung** — navigation + order data; registers Kunde/Beleg, Notiz/Optionen, Lagerorte.
2. **Simulation**.
3. **Zuordnung** — Ausprägungs-/Lagerortartikel, Vorbelegung, Ausprägungen erfassen & Lagerorte zuweisen.
4. **Verfügbarkeitsliste** — Selektion / Produktionsaufträge / Verfügbarkeit.
5. **Tätigkeiten einplanen** (manuelle Vergabe, Auftragsinfo).
6. **Produktionsaufträge über FAKT** — auftragsbezogene Produktion/Bestellung; Lagerproduktion / Bestellung mit Reservierung; **Produktionsauftrag einlesen**.

## Bearbeitung (execution)

- **Stückliste bearbeiten** (Artikel / Ressource registers), splitten/kopieren, **Artikelreservierung**, **Ausprägungspool**.
- **Materialentnahme** (Stapel-/Einzeldruck, Fehlerliste, Storno, Teilentnahme) — material withdrawal.
- **Arbeitsschein** (Stapel-/Einzeldruck) — work ticket.
- **Produktionsendmeldung** — end-message after completion: Auswahl des Projektes → Materialien → Ressourcen (Arbeitszeit); **Schnellendmeldung**.
- **Kapazitätenplanung**, Arbeitsschritt stornieren, **Produktion Export/Import**.

## Der Ausprägungspool

Pool for variant characteristics (Ausprägungen): Stammdaten, Auftragsanlage, Poolnummernzuordnung, Produktionsendmeldung, Auswertungen, Matchcode.

## Auswertungen (reports)

Stücklisten, Arbeitsanweisung, Teileliste, Änderungen in Stücklisten, Ressourcen-/Tätigkeitenliste, **Fälligkeitsliste**, **Produktionsauftrag - Nachkalkulation** (Artikel/Ressourcen), Buchungsliste, Arbeitsschrittliste, **Arbeitsvorratsliste**, Etikettendruck, **Ressourcenbelegung / -auslastung**, **Übersicht / Kollisionen**, Fehlzeitenliste, Kalenderauswertungen.

## See also

[[WinLine KORE]] (production cost feedback) · [[Mesonic WinLine]]
