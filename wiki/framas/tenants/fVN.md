# fVN — Vietnam (Đồng Nai)

**Location**: Ho Chi Minh City / Đồng Nai, Vietnam  
**Symbol**: fVN  
**MESOCOMP Code**: VNT1  
**Company**: FRAMAS VIỆT NAM  

## Location Details

**Address**: Số 9 đường số 12, Khu công nghiệp Sóng Thần 2, Phường Dĩ An, Thành phố Hồ Chí Minh, Việt Nam

## Manufacturing Capabilities

- Plastic component production
- Footwear mold manufacturing
- Regional support for Southeast Asia

## Database Configuration

| Database | Name | Purpose |
|----------|------|---------|
| Winline Main | **VNT86** | Order management, inventory |
| Winline System | CWLSYSTEM | Shared system configuration |
| OMS | [[framas/tenants/DOGE_WH|DOGE_WH]] | Order Management System |
| RecycledApp | **RecycledApp** | Returned items management |

## Cross-Database Linking

When setting up [[framas/tenants/DOGE_WH|DOGE_WH]] for fVN:

1. Create schemas in DOGE_WH:
   ```sql
   CREATE SCHEMA wl
   CREATE SCHEMA re
   ```

2. Run synonym creation scripts (see [[framas/tenants/DOGE_WH|DOGE_WH]] setup)
3. Replace database name placeholders:
   - Winline: `VNT86`
   - RecycledApp: `RecycledApp`

## Vietnam Operations

Framas operates **3 facilities in Vietnam**:

1. **fVN** (this location) — Sóng Thần 2 industrial zone
2. [[framas/tenants/fFT|fFT — Framas Footwear Technologies]] — Nhơn Trạch II zone
3. **fKV** — Framas Korea Vina — Long Thành industrial zone

All three share infrastructure and support the Vietnamese market.

## Regional Role

As a major Southeast Asian hub, fVN:
- Supports high-volume orders for regional brands
- Coordinates with other Vietnam facilities
- Serves as primary market access point

## Related Facilities

- [[framas/tenants/fFT|fFT — Framas Footwear Technologies (Vietnam)]]
- [[framas/tenants/fGE|fGE — Germany (Headquarters)]]
- [[framas/tenants/fIN|fIN — Indonesia]]

---

**Source**: raw/framas/overview.md  
**Related**: [[framas/databases|Database Architecture]], [[framas/company-profile|Company Profile]]
