---
type: concept
address: c-000204
title: "Framas WL Schema"
created: 2026-06-05
updated: 2026-06-05
tags:
  - concept
  - database
  - framas
  - erp
  - winline
  - schema
status: developing
related:
  - "[[DOGE WH Database Schema]]"
  - "[[Framas]]"
  - "[[Framas DBO Schema]]"
---

# Framas WL Schema

The `wl` schema in [[DOGE WH Database Schema]] contains **WinLine ERP** (Meso Software, Austria) data for [[Framas]]. 330 tables, `T`-prefixed (e.g., `T001`, `t002`).

## WinLine ERP Identity

- Vendor: Meso Software (Austrian ERP, also known as "myfactory" or WinLine/mesonic)
- Column naming: `cNNN` with `note:` storing business name
- Multi-tenancy: every table has `mesocomp` (nvarchar 4), `mesoyear` (int), `mesoprim` (nvarchar 18)
- Audit: `ts` timestamp field on most tables

## Functional Areas

### Company & Configuration

| Table | Note |
|-------|------|
| T001 | Company Base Info (268 cols: fiscal year, currencies, AR/AP ranges, posting locks, period names, depreciation rules) |
| T004 | General Description Table |

T001 is the master config table. Notable groups in its 268 columns:
- `c007-c016`: Posting month, closing month, journal numbering
- `c121-c149`: Fiscal year, period posting numbers
- `c187-c198`: Period names (up to 12)
- `c232-c241`: Tax authority address, default posting period

### Financial / Accounting

| Table | Note |
|-------|------|
| T028 | Year's Journal |
| T036 | ACC1 Posting type |
| T051 | Account Base Info Address |
| T052 | Account Base Info - ACC1 Balance |
| T053 | FSC Base Info |
| T054 | Account Base Info - ACC2 |
| T055 | Account Base Info |
| T058 | Account Base Info ACC1 |
| t059 | ACC1 - Balances |
| T072 | Balance Key File |
| T073 | Multi-Year Comparison |
| T090 | Posting number |
| T143 | FSC Totals |

### Purchase / Sales / Orders

| Table | Note |
|-------|------|
| T014 | Suggested Purchase Order |
| T019 | Open Invoices |
| T020 | OI Payment |
| T023 | Product Prices |
| T025 | Order File Header |
| T026 | Order File Center |
| T027 | Product match |
| T043 | Price List |
| T044 | Price List Definitions |
| T048 | Suggested Order - Batch |

### Product

| Table | Note |
|-------|------|
| T023 | Product Prices |
| T024 | Product Base Info |
| T030 | Product Inventory Values |
| T031 | Product Texts |
| T032 | Product Category |
| T037 | Product Inv. Settings |

### Tax

| Table | Note |
|-------|------|
| t009 | Stx/Ptx Amount |
| t010 | Tax Lines Base Info |
| t013 | Sales Tax Forms |
| t015 | Tax Classes |

### CRM / Contacts / Projects

| Table | Note |
|-------|------|
| t033 | Sales Rep Base Info Header |
| t034 | Sales Rep Base Info |
| t035 | Sales Rep Base Info Commission |
| t038 | Sales Rep Allocation |
| t042 | Sales Rep Journal |
| t045 | Contact Base Info |
| t056 | Contacts |
| t060 | Project Base Info |
| t062 | Relationship Base Info |
| t063 | Project Authorizations for CRM |
| T064 | Project Statuses Base Info |
| t065 | Relationship Journal |

### Currency

| Table | Note |
|-------|------|
| t002 | Foreign Currency |
| t012 | FC Exchange Rates |

### Logistics / Inventory

| Table | Note |
|-------|------|
| t066 | Batch numbers |
| t067 | Clearing-Header |
| t068 | ClearingText |

### Other

| Table | Note |
|-------|------|
| t003 | Temp. Table |
| t039 | Statistics |
| t040 | Commission Transfer Journal |
| T160 | Calendar |

## Column Convention

```
"cNNN" datatype [null/not null, note: 'Business Name']
```

Example from T001:
```
"c000" nvarchar(50) [null, note: 'Company']
"c001" nvarchar(4) [not null, note: 'Number']
```

Multi-tenancy keys always at end of column list:
```
"mesosafe" int [null]
"mesocomp" nvarchar(4) [not null]
"mesoyear" int [not null]
"mesoprim" nvarchar(18) [not null]
"ts" timestamp [not null]
```

## Integration with dbo Schema

WinLine PO data flows into `dbo.FT400` via the `FramasDbSchemaChangeTracker` service. The bridge field: `dbo.FT400.c000` = "PONumber: This column keep data PO Number will get from Winline". See [[Framas DBO Schema]] for the OMS side.
