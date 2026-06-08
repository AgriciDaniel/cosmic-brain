---
type: concept
address: c-000202
title: "DOGE WH Database Schema"
created: 2026-06-05
updated: 2026-06-05
tags:
  - concept
  - database
  - framas
  - schema
status: developing
related:
  - "[[Framas]]"
  - "[[Framas DBO Schema]]"
  - "[[Framas WL Schema]]"
  - "[[MPDV HYDRA]]"
  - "[[framas-db-schema-management]]"
---

# DOGE WH Database Schema

SQL Server database for [[Framas]] manufacturing operations.
Documented at: https://dbdocs.io/ncdframas/DOGE_WH
Source: [[framas-db-schema-management]]

## Overview

| Schema | Tables | Purpose |
|--------|--------|---------|
| `dbo` | 62 tables + 4 views | Framas OMS/MES integration layer |
| `wl` | 330 tables | WinLine ERP (Meso Software) |

## Architecture

```
FramasDbSchemaChangeTracker (.NET)
  ↓ polls SchemaChangeLog every 30s (TickerQ)
  ↓ calls sp_gen_dbml
  ↓ commits changed .dbml files
FramasDbSchemaManagement (GitHub)
  ↓ GitHub Actions: merge all DBML → doge_wh.dbml
  ↓ dbdocs build → project "Framas"
dbdocs.io/ncdframas/DOGE_WH
```

## Schema Conventions

**Column naming**: Both schemas use obfuscated `cNNN`/`CNNN` names. Business meaning stored in DBML `note:` fields.
Example: `"c000" nvarchar(50) [note: 'Company']`

**WinLine multi-tenancy fields** (present on all `wl` tables):
- `mesocomp` nvarchar(4) — company identifier
- `mesoyear` int — fiscal year context
- `mesoprim` nvarchar(18) — WinLine primary key

**dbo audit trail** (present on FT tables):
- `CreatedDate`, `CreatedMachine`, `CreatedBy`
- `ModifiedDate`, `ModifiedMachine`, `ModifiedBy`
- `TransactionId` uniqueidentifier — cross-table transaction linkage

**dbo PK pattern**: `uniqueidentifier` with `newsequentialid()` default.

## Integration Flows

```
WinLine ERP (wl.*)
  → PO data → dbo.FT400 (FT400.c000 = PONumber from Winline)

HYDRA MES
  → Production orders → dbo.FT600 (HydraProductionOrder, Location, StepCode)
  → Machine data ← dbo.FT175/FT176 (FGs injection link to machine)

OMS (dbo.FT110-FT176)
  → Label declarations → dbo.FT115/FT143
  → AQL quality inspection → dbo.FT145/FT147 via FT161/FT162 states
  → Outbound/inbound boxes → dbo.FT144/FT149
```

## Key Subsystems

- [[Framas DBO Schema]] — T3PO order management, label/QC, ETC calculation, HYDRA integration
- [[Framas WL Schema]] — WinLine ERP: finance, purchasing, products, CRM

## dbdocs Publishing

GitHub Actions workflow (`main.yml`):
1. `find ./docs/tables ./docs/views -name '*.dbml' | sort` → concatenate
2. `dbdocs build ./docs/doge_wh.dbml --project=Framas`
3. Runs on push to main (PR only validates, does not publish)
4. Requires `DBDOCS_TOKEN` secret
