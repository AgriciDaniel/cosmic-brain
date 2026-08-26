# fIN — Indonesia

**Location**: Indonesia  
**Symbol**: fIN  
**MESOCOMP Code**: 05FI  
**Facilities**: 3 manufacturing centers (shared MESOCOMP)  

## Overview

Indonesia hosts a major Framas manufacturing hub with **3 separate facilities** operating under the unified fIN designation and shared MESOCOMP code.

## Facility List

1. **Framas 1** — Primary facility
2. **Framas 2** — Secondary operations
3. **Framas 3** — Tertiary/specialized manufacturing

All three facilities:
- Share the same MESOCOMP code: **05FI**
- Unified symbol: **fIN**
- Coordinated under Indonesia regional management
- Support overlapping customer base

## Manufacturing Capabilities

- Plastic component production at scale
- Footwear mold manufacturing
- Regional support for Asia-Pacific

## Database Configuration

| Database | Name | Purpose |
|----------|------|---------|
| Winline Main | **CWLDATA** | Order management, inventory |
| Winline System | CWLSYSTEM | Shared system configuration |
| OMS | [[framas/tenants/DOGE_WH|DOGE_WH]] | Order Management System |
| RecycledApp | **RecycledApp** | Returned items management |

## Cross-Database Linking

When setting up [[framas/tenants/DOGE_WH|DOGE_WH]] for fIN:

1. Create schemas in DOGE_WH:
   ```sql
   CREATE SCHEMA wl
   CREATE SCHEMA re
   ```

2. Run synonym creation scripts (see [[framas/tenants/DOGE_WH|DOGE_WH]] setup)
3. Replace database name placeholders:
   - Winline: `CWLDATA`
   - RecycledApp: `RecycledApp`

## Regional Strategy

Indonesia facility serves:
- Large-volume OEM production
- Regional brand partnerships
- Cost-optimized manufacturing
- Growing Southeast Asia market

## Related Facilities

- [[framas/tenants/fVN|fVN — Vietnam (Đồng Nai)]]
- [[framas/tenants/fFT|fFT — Vietnam Footwear Technologies]]
- [[framas/tenants/fGE|fGE — Germany (Headquarters)]]

---

**Source**: .raw/framas/overview.md  
**Related**: [[framas/databases|Database Architecture]], [[framas/company-profile|Company Profile]]
