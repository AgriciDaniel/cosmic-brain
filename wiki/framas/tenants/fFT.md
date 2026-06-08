# fFT — Vietnam Footwear Technologies

**Location**: Nhơn Trạch II Industrial Zone, Đồng Nai, Vietnam  
**Symbol**: fFT  
**MESOCOMP Code**: FTT1  
**Company**: FRAMAS FOOTWEAR TECHNOLOGIES COMPANY LIMITED  

## Location Details

**Address**: Đường số 3, Khu Công nghiệp Nhơn Trạch II – Nhơn Phú, Phường Nhơn Trạch, Thành phố Đồng Nai, Việt Nam

## Manufacturing Specialization

- High-precision footwear molds
- Advanced plastic component manufacturing
- Technical support for footwear brands
- Quality assurance and testing

## Database Configuration

| Database | Name | Purpose |
|----------|------|---------|
| Winline Main | **FTT2021** | Primary order management |
| Winline Main | **FTL2021** | Secondary/alternate operations |
| Winline System | CWLSYSTEM | Shared system configuration |
| OMS | [[framas/tenants/DOGE_WH|DOGE_WH]] | Order Management System |
| RecycledApp | **RecycledAppFFT** | Returned items, FFT-specific |

## Dual Database Setup

fFT operates two Winline databases:
- **FTT2021**: Primary transactions
- **FTL2021**: Secondary/legacy operations

Both databases may be active depending on business needs. Check [[framas/tenants/DOGE_WH|DOGE_WH]] setup for synonym configuration.

## Cross-Database Linking

When setting up [[framas/tenants/DOGE_WH|DOGE_WH]] for fFT:

1. Create schemas in DOGE_WH:
   ```sql
   CREATE SCHEMA wl
   CREATE SCHEMA re
   ```

2. Run synonym creation scripts twice:
   - Once for FTT2021 (primary)
   - Once for FTL2021 (if needed)
   
3. Replace database name placeholders:
   - Winline Primary: `FTT2021`
   - Winline Secondary: `FTL2021`
   - RecycledApp: `RecycledAppFFT`

## Vietnam Operations

Part of Framas' **3-facility Vietnam network**:

1. [[framas/tenants/fVN|fVN — Framas Việt Nam]] — Sóng Thần 2 zone
2. **fFT** (this location) — Nhơn Trạch II zone
3. **fKV** — Framas Korea Vina — Long Thành zone

## Operational Notes

- Coordinates closely with fVN for shared customers
- Specialized facility for footwear component technology
- Higher complexity orders than standard fVN operations
- Dedicated quality control for precision components

## Related Facilities

- [[framas/tenants/fVN|fVN — Framas Việt Nam]]
- [[framas/tenants/fGE|fGE — Germany (Headquarters)]]
- [[framas/tenants/fIN|fIN — Indonesia]]

---

**Source**: raw/framas/overview.md  
**Related**: [[framas/databases|Database Architecture]], [[framas/company-profile|Company Profile]]
