---
type: source
address: c-000235
title: "v_OMS_WHInfo — DOGE_WH Warehouse Info View (fGE)"
created: 2026-06-08
tags:
  - framas
  - sql
  - doge_wh
  - warehouse
status: current
related:
  - "[[framas/tenants/DOGE_WH]]"
  - "[[framas/tenants/fGE]]"
  - "[[framas/framas-scanner]]"
  - "[[FramasScanner]]"
---

# v_OMS_WHInfo — DOGE_WH Warehouse Info View

**Database**: DOGE_WH  
**Schema**: dbo  
**Object**: `[dbo].[v_OMS_WHInfo]`  
**Tenant**: fGE (Germany, Pirmasens) — also deployed to fKV, fFT  
**Author**: congdat.nguyen@framas.com  
**Created**: 2026-06-08

## Purpose

Returns the full warehouse master list for the current company year. Combines WinLine warehouse structure (`wl.T335`), scanner app configuration (`lmpScannerClient_Warehouse`), and factory location names (`ST049_FactoryCode`). Used by the OMS and FramasScanner to drive warehouse selection, validation, and capacity enforcement.

## Source Tables

| Table | Schema | Role |
|-------|--------|------|
| `T335` | `wl` | WinLine warehouse master (one row per warehouse) |
| `T311` | `wl` | WinLine warehouse structure definitions |
| `ST045_CurrentCompYear` | dbo | Filters to current company year (`mesoyear`) |
| `lmpScannerClient_Warehouse` | dbo | Scanner-specific config per warehouse ID |
| `ST049_FactoryCode` | dbo | Factory/location name lookup |

> [!note] Cross-database via synonym
> `wl.T335` and `wl.T311` are accessed through the `wl` synonym schema in DOGE_WH. The underlying tables live in the tenant's Winline database (fGE: `CWL`). See [[framas/tenants/DOGE_WH]] for setup.

## Columns

### Identity
| Column | Source | Description |
|--------|--------|-------------|
| `WHNo` | `T335.C000` | Warehouse number (primary key) |
| `WHCode` | `T335.C008` | Short code for the warehouse |
| `WHName` | `T335.C003` | Display name |
| `WHStructureId` | `T335.C001` | Foreign key to warehouse structure (`T311`) |
| `WHStructure` | `T311.C001` | Warehouse structure name (joined) |
| `WHLevel` | `T335.C002` | Nesting level in the warehouse hierarchy |

### Physical Specs
| Column | Source | Description |
|--------|--------|-------------|
| `Area` | `T335.C006` | Floor area |
| `Volume` | `T335.C007` | Storage volume |
| `MaxWeight` | `T335.C026` | Maximum weight capacity |
| `MaxWidth` | `T335.C027` | Maximum width |
| `MaxLength` | `T335.C028` | Maximum length |
| `MaxPieces` | `T335.C029` | Maximum piece count |

### Location
| Column | Source | Description |
|--------|--------|-------------|
| `Location` | `T335.C009` | Location code (FK to `ST049_FactoryCode`) |
| `LocationName` | `ST049_FactoryCode.C000` | Location display name |

### Scanner Behavior Flags
| Column | Source | Description |
|--------|--------|-------------|
| `GroupName` | `lmpScannerClient_Warehouse` | Scanner warehouse group |
| `SkipCheckLastWh` | `lmpScannerClient_Warehouse` | Skip last-warehouse check during scan (default 0) |
| `AllowHydraYield` | `lmpScannerClient_Warehouse` | Allow HYDRA yield scanning in this WH (default 0) |
| `AllowTracking` | `lmpScannerClient_Warehouse` | Allow tracking mode (default 0) |

### Posting
| Column | Notes |
|--------|-------|
| `ActualPostWHNo` | Returns `NULL` for fGE, fKV, fFT tenants. Custom column `T335.U003` not yet provisioned on these tenants. fVN and fIN return the actual value. |

## Key Behaviors

- Scoped to current company year via `JOIN ST045_CurrentCompYear ON T335.mesoyear = comp.mesoyear`.
- Scanner config columns (`SkipCheckLastWh`, `AllowHydraYield`, `AllowTracking`) default to `0` via `ISNULL` — safe when a warehouse has no row in `lmpScannerClient_Warehouse`.
- `NOLOCK` hints on all joins (read-uncommitted acceptable for master-data lookups).

## Tenant Notes

- `ActualPostWHNo` is `NULL` on fGE, fKV, fFT (column `T335.U003` not created yet). Remove the `NULL` placeholder and restore `T335.U003` once the column is provisioned.
- View is identical across fGE/fKV/fFT tenants — tenant isolation comes from the `wl` synonym pointing to different Winline databases.

---

**Source file**: `.raw/framas/app/framas_scanner/tenants/fGE/v_OMS_WHInfo.sql`  
**Related**: [[framas/tenants/DOGE_WH]], [[framas/tenants/fGE]], [[FramasScanner]], [[Framas DBO Schema]]
