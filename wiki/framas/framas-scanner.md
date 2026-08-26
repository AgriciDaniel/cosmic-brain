# FramasScanner Application

**Type**: In-house mobile application  
**Purpose**: Warehouse and production tracking via QR code scanning  
**Owner**: Framas Company  

## Overview

FramasScanner is an internal mobile application used across Framas manufacturing facilities for tracking finished goods (FGs) and raw materials through warehouse and production operations.

## Features

### Finished Goods (FG) Tracking
Scans QR code labels on FG boxes to track warehouse movement:
- **Non-HC boxes** — Standard finished goods
- **Heelcounter boxes** — Specialty heelcounter components
- **WIP boxes** — Work-in-progress inventory
- **Box-level traceability** — Each scan logs location and timestamp

### Raw Material Tracking
- Tracks incoming raw materials
- Logs material receipt and storage location
- Supports batch and lot-level identification

## Use Cases

1. **Warehouse Operations**
   - Inbound receiving: scan FG arrivals
   - Inventory management: locate boxes
   - Outbound shipping: confirm shipment contents

2. **Production Tracking**
   - WIP monitoring: track components in process
   - Quality checkpoints: scan at quality gates
   - Movement logs: maintain production history

3. **Inventory Accuracy**
   - Real-time location tracking
   - Stock reconciliation via scans
   - Rapid box/material lookup

## Related Systems

- [[framas/databases|Database Architecture]] — Backend data storage
- [[framas/tenants/DOGE_WH|DOGE_WH]] — OMS integration (orders vs. warehouse)
- Manufacturing [[framas/company-profile|facilities]] — Multi-location deployment

## Warehouse Configuration

FramasScanner reads warehouse master data from `dbo.v_OMS_WHInfo` (DOGE_WH). Each warehouse row carries scanner-specific flags:

| Flag | Default | Effect |
|------|---------|--------|
| `SkipCheckLastWh` | 0 | Skip last-warehouse validation on scan |
| `AllowHydraYield` | 0 | Permit HYDRA yield scans in this warehouse |
| `AllowTracking` | 0 | Enable tracking mode |

Warehouses without a row in `lmpScannerClient_Warehouse` are visible but all flags default to 0 (most restrictive).

See [[sources/framas-v-oms-whinfo|v_OMS_WHInfo source]] for the full column reference.

## Technical Details

See stored procedures for FramasScanner integration:
- `sp_FramasScanner_CheckLabel_Mode_HANGING_HC_BAG.sql`
- `sp_FramasScanner_PostSingle_Mode_HANGING_HC_BAG.sql`

These procedures handle label validation and data posting for specific scanning modes.

---

**Source**: .raw/framas/app/framas_scanner/framas_scanner.md  
**Related**: [[framas/architecture|Application Architecture]]
