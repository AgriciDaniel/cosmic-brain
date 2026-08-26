---
type: entity
address: c-000220
title: "FramasScanner"
created: 2026-06-08
updated: 2026-06-08
tags:
  - entity
  - product
  - framas
  - scanner
  - mobile-app
status: developing
related:
  - "[[Framas]]"
  - "[[Framas Scanner Label Scan Flow]]"
  - "[[Framas DBO Schema]]"
  - "[[framas-scanner-hc-bag-procs]]"
---

# FramasScanner

In-house mobile app at [[Framas]] for scanning QR labels to track warehouse (WH) movement.

## Purpose

- Scan **finished-goods (FGs)** box QR labels — Non-HC, Heelcounter (HC), WIP — to follow WH movement.
- Scan **raw material** lot labels.

## Architecture

- **Client**: mobile app (MAUI — display strings are MAUI `<Label>` XAML, see [[Framas Scanner Label Scan Flow]]).
- **Backend**: SQL Server stored procedures, named per scan mode and tenant. Pattern: `sp_FramasScanner_<Operation>_Mode_<MODE>`, organized under `tenants/<tenant>/`.
- **Tenants**: e.g. `fGE` (matches the `fGE` finished-goods tag on `FT175`/`FT176` in [[Framas DBO Schema]]).
- **Scan modes**: e.g. `HANGING_HC_BAG` (Heelcounter compound/material lot, label `Product-LotNO`).

## Backend Tables

| Table | Role |
|-------|------|
| `lmpScannerClient_ScanningLabel` | Pending (locked) scan, written in the CheckLabel phase |
| `lmpScannerClient_ScannedLabel` | Committed scan, written in the PostSingle phase |
| `FT176` | fGE FGs-injection scan tag / dedup store (`C001` = QR) |
| `CWL..T027` | Cross-DB product lookup (`C002` → `C003` product name) |

## Operation Pattern

Two-phase: **CheckLabel** (validate, optionally lock) → **PostSingle** (commit). See [[Framas Scanner Label Scan Flow]].

Helper: `sp_FramasScanner_GetLocalizeText` localizes message templates (culture-aware, default `en`) for `FORMATMESSAGE`.

## Sources

- [[framas-scanner-hc-bag-procs]] — the `fGE` `HANGING_HC_BAG` CheckLabel + PostSingle procs.
- `.raw/framas/app/framas_scanner/framas_scanner.md` — app description.
