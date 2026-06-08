# fGE — Germany (Pirmasens)

**Location**: Pirmasens, Germany  
**Symbol**: fGE  
**MESOCOMP Code**: 01FG  
**Company Significance**: Headquarters and founding location  

## Historical Background

- **Founded**: 1948 by Franz Martz in Pirmasens
- **Pirmasens**: Historic shoe manufacturing capital of Germany
- **Notable Alumni**: Adi Dassler (Adidas founder) learned shoe handicraft from Franz Martz in the 1930s
- **Current Role**: Primary manufacturing and technical development hub

## Manufacturing Capabilities

As the flagship German facility, fGE specializes in:
- High-precision molds
- Technical molded plastic components
- Advanced manufacturing solutions
- Quality control and testing

## Database Configuration

| Database | Name | Purpose |
|----------|------|---------|
| Winline Main | **CWL** | Order management, inventory |
| Winline System | CWLSYSTEM | Shared system configuration |
| OMS | [[framas/tenants/DOGE_WH|DOGE_WH]] | Order Management System |
| RecycledApp | (Not in use) | — |

## Cross-Database Linking

When setting up [[framas/tenants/DOGE_WH|DOGE_WH]] for fGE:

1. Create schemas in DOGE_WH:
   ```sql
   CREATE SCHEMA wl
   CREATE SCHEMA re
   ```

2. Run synonym creation scripts (see [[framas/tenants/DOGE_WH|DOGE_WH]] setup)
3. Replace database name placeholder with `CWL`

## Related Tenants

See other manufacturing locations:
- [[framas/tenants/fVN|fVN — Vietnam]]
- [[framas/tenants/fFT|fFT — Vietnam Footwear Technologies]]
- [[framas/tenants/fIN|fIN — Indonesia]]

## Connection Details

When configuring applications to connect to fGE:

**OMS Connection String** (example):
```
Server=<GE-DB-SERVER>;Database=DOGE_WH;
Trusted_Connection=true;
```

**Winline Connection** (via synonym):
```
SELECT * FROM wl.T_ORDER  -- Access via synonym in DOGE_WH
```

---

**Source**: raw/framas/overview.md  
**Related**: [[framas/databases|Database Architecture]], [[framas/company-profile|Company Profile]]
