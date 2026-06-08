---
type: entity
address: c-000201
title: "Framas"
created: 2026-06-05
updated: 2026-06-05
tags:
  - entity
  - company
  - manufacturing
  - framas
status: developing
related:
  - "[[DOGE WH Database Schema]]"
  - "[[Framas DBO Schema]]"
  - "[[Framas WL Schema]]"
  - "[[MPDV HYDRA]]"
  - "[[framas-db-schema-management]]"
  - "[[Framas Monorepo Architecture]]"
  - "[[FramasScanner]]"
---

# Framas

Manufacturing company. Owner of the `DOGE_WH` SQL Server database documented in [[framas-db-schema-management]].

## Technology Stack

- **ERP**: [[WinLine ERP]] (Meso Software, Austrian ERP) — `wl` schema, 330+ tables
- **MES**: [[MPDV HYDRA]] — production order tracking, machine data collection
- **OMS/Integration layer**: Framas-custom (`dbo` schema, FT-prefixed tables)
- **Schema change tracking**: `FramasDbSchemaChangeTracker` (.NET service, TickerQ scheduler)
- **Schema docs**: [[FramasDbSchemaManagement]] (this repo) — dbdocs.io project "Framas"

## Internal Systems

| System | Schema/Source | Role |
|--------|--------------|------|
| WinLine ERP | `wl.*` | Finance, accounting, purchasing, product |
| OMS (T3PO) | `dbo.FT110–FT176` | Order management, label, quality |
| FramasScanner | `lmpScannerClient_*` + `dbo.FT176` | In-house mobile WH-movement scanner ([[FramasScanner]]) |
| HYDRA MES | External + `dbo.FT600` | Production execution, machine data |
| Material Mgmt | `dbo.FT400–FT439` | PO inbound, lot tracking |
| Printer Mgmt | `dbo.ST046–ST047` | Label printing services |

## Key Integration Points

- WinLine PO numbers flow into `dbo.FT400` (purchase order management)
- HYDRA production orders surface in `dbo.FT600` (machine location, step codes)
- `dbo.FT175/FT176` links finished goods (FGs) injection to HYDRA machine records
- Label states (`dbo.FT161/FT162`) feed AQL quality inspection in the OMS

## Software Development Architecture

10-person team. Uses [[Framas Monorepo Architecture]]: Git Bare Repo + Worktree, one folder per feature branch, per-dev `.sln` files, `.NET 10 Blazor InteractiveServer`. See [[Git Bare Worktree Pattern]] for the reusable Git pattern.
