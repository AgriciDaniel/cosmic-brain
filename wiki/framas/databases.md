# Database Architecture

Multi-tenant database design for OMS (Order Management System) and downstream applications.

## Core Architecture

### Primary Database
**[[framas/tenants/DOGE_WH|DOGE_WH]]** — Main OMS database  
- Stores OMS application data
- Located same server as Winline database (per tenant)
- Single connection point for OMS app

### Cross-Database Linking
OMS connects to multiple databases via **SYNONYMS** with schema namespace:

| Schema Prefix | Database | Purpose |
|---|---|---|
| `wl` | Winline (CWL) | Order and inventory data |
| `hy` | Hydra | Hydra system data |
| `re` | RecycledApp | Recycled/returned items |

Example synonym creation:
```sql
CREATE SYNONYM wl.T_ORDER FOR [CWL].dbo.T_ORDER
```

## Tenant Configurations

Each manufacturing location has dedicated database configurations:

### Locations & Symbols
- **fGE** — Germany (Pirmasens) [[framas/tenants/fGE|fGE databases]]
- **fVN** — Vietnam [[framas/tenants/fVN|fVN databases]]
- **fFT** — Vietnam Footwear Technologies [[framas/tenants/fFT|fFT databases]]
- **fIN** — Indonesia [[framas/tenants/fIN|fIN databases]]

### MESOCOMP Codes
MESOCOMP is the system identifier:
- **fGE**: 01FG
- **fVN**: VNT1
- **fFT**: FTT1
- **fKV** (Korea Vina): KVT2
- **fIN**: 05FI

## Setup Process

When setting up [[framas/tenants/DOGE_WH|DOGE_WH]] for a tenant:

1. Create schemas for cross-database linking:
   ```sql
   CREATE SCHEMA wl
   CREATE SCHEMA re
   ```

2. Run SYNONYM creation scripts to link:
   - Winline functions and stored procedures
   - Winline tables and views
   - Other databases (Hydra, RecycledApp)

3. Customize database names per tenant location

**Important**: Verify database names match tenant configuration before running synonym scripts.

---

**Source**: .raw/framas/tenants/*.md
