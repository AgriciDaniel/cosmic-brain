---
source_url: https://github.com/ncdframas/FramasDbSchemaManagement
fetched: 2026-06-05
type: github-repo
---

# FramasDbSchemaManagement

Repository: https://github.com/ncdframas/FramasDbSchemaManagement
Owner: ncdframas
Database project name: DOGE_WH
Live docs: https://dbdocs.io/ncdframas/DOGE_WH

## Purpose

Schema documentation repository for the DOGE_WH SQL Server database used at Framas.
Stores per-object DBML files, merges them via GitHub Actions, and publishes to dbdocs.io.

## Architecture

- `FramasDbSchemaChangeTracker` (.NET service) polls `SchemaChangeLog`, runs `sp_gen_dbml`, commits changed DBML files here.
- This repo stores DBML files, one per table or view.
- GitHub Actions merges all DBML files into `docs/doge_wh.dbml` and publishes to dbdocs project "Framas".
- Workflow triggers on push to main when `docs/tables/**/*.dbml` or `docs/views/**/*.dbml` change.
- TickerQ Scheduler triggers tracker every 30s.

## Schemas

### dbo schema — 62 tables + 4 views
Framas custom OMS/MES integration layer. Table prefix: `FT` (Framas Table), `ST` (Service Table).

Functional groups:
- **T3PO (3rd Party Order)**: FT110–FT113, FT125, FT136, FT138, FT143, FT144, FT145, FT147, FT149, FT159, FT165, FT166
- **Label/QC**: FT115 (POM_LabelDeclaration), FT138, FT160–FT165, FT169
- **ETC Calculation**: FT127–FT130, FT148, FT502, FT503
- **Material Crushing Matrix**: FT504–FT507
- **Plastic Box Management**: FT167–FT169, FT172–FT173
- **PO / Material Management**: FT400–FT439 (links to WinLine PO data, notes in Vietnamese)
- **HYDRA Integration**: FT600 (production orders, machine locations, step codes)
- **fGE (injection link)**: FT175, FT176 (production FGs injection link to machine)
- **HR**: FT029 (Employees), FT031 (Departments)
- **Printer Management**: ST046 (PrinterSetting), ST047 (ServiceInfo)
- **Material Inventory**: tblMaterialAvailability_Usage

Views:
- dbo.v_OMS_LabelDefectReason
- dbo.v_OMS_LabelState (joins FT161+FT162)

### wl schema — 330 tables
WinLine ERP (Meso Software, Austrian ERP). Column naming: `cNNN` with `note:` storing business name. Multi-tenancy via `mesocomp`, `mesoyear`, `mesoprim` fields.

Functional groups (sample):
- **Company/Config**: T001 (Company Base Info), T004 (General Descriptions)
- **Financial/Accounting**: T028 (Year's Journal), T036 (ACC1 Posting), T051–T059 (Account Base Info), T090 (Posting numbers), T143 (FSC Totals)
- **Purchase/Sales**: T014 (Suggested PO), T019 (Open Invoices), T025–T026 (Order File Header/Center)
- **Product**: T023 (Prices), T024 (Base Info), T030 (Inventory Values), T032 (Category)
- **Tax**: T009 (Stx/Ptx Amount), T010 (Tax Lines), T013 (Sales Tax Forms)
- **CRM/Contacts**: T045 (Contact), T056 (Contacts), T060–T065 (Projects/Authorizations)
- **Currency**: T002 (Foreign Currency), T012 (FC Exchange Rates)

## Schema Conventions

- Column names obfuscated as `cNNN` / `CNNN`; real names in `note:` field
- `mesocomp` (nvarchar 4) + `mesoyear` (int) = WinLine multi-tenancy keys
- `mesoprim` = primary key in WinLine format (nvarchar 18)
- dbo FT tables use `uniqueidentifier` PKs with `newsequentialid()`
- Standard audit columns: `CreatedDate`, `CreatedMachine`, `CreatedBy`, `ModifiedDate`, `ModifiedMachine`, `ModifiedBy`
- Indexes documented in DBML `indexes {}` block with `type_desc` and sort order in note

## Integration Points

- **WinLine → dbo**: FT400+ PO data sourced from WinLine (`c000` note: "PONumber: This column keep data PO Number will get from Winline")
- **HYDRA → dbo**: FT600 stores Hydra ProductionOrder, Location, StepCode — bridge between HYDRA MES and OMS
- **OMS → Label system**: FT161/FT162 drive label state and defect categories
