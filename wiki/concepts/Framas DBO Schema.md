---
type: concept
address: c-000203
title: "Framas DBO Schema"
created: 2026-06-05
updated: 2026-06-05
tags:
  - concept
  - database
  - framas
  - oms
  - schema
status: developing
related:
  - "[[DOGE WH Database Schema]]"
  - "[[Framas]]"
  - "[[MPDV HYDRA]]"
  - "[[Framas WL Schema]]"
---

# Framas DBO Schema

The `dbo` schema in [[DOGE WH Database Schema]] contains [[Framas]]'s custom OMS (Order Management System) and MES integration layer. 62 tables + 4 views. Table prefix: `FT` (Framas Table), `ST` (Service Table).

## T3PO — 3rd Party Order System

Core order management with scanning and label flow.

| Table | Note | Purpose |
|-------|------|---------|
| FT110 | T3PO | Order header (PONum, VoucherKey, ScanMode) |
| FT111 | T3PO_Header | — |
| FT112 | T3PO_Center | — |
| FT113 | T3PO_Box | Box-level tracking |
| FT125 | T3DN_Summary | Delivery note summary (ProductCode, T3DN, QtyIn) |
| FT136 | T3_BaseInfo | — |
| FT138 | T3_PrintedLabel | — |
| FT143 | T3_LabelDeclaration | — |
| FT144 | T3_OutboundBox | — |
| FT145 | T3DN_AQLStatus | AQL inspection status per delivery note |
| FT147 | T3DN_AQLDeclareDefect | Declared defects per AQL |
| FT149 | T3DN_InboundBox | Inbound box tracking |
| FT159 | SplitLabel | — |
| FT165 | LabelReworkCount | — |
| FT166 | TrackingView | — |

`FT110.mesocomp` + `mesoyear` = WinLine company context on orders.

## Label & Quality Control

| Table | Note | Purpose |
|-------|------|---------|
| FT115 | POM_LabelDeclaration | OCNum, ProductCode, BoxCode |
| FT152 | LabelToPrinterAndLayoutMapping | — |
| FT153 | UserOrHostNameToPrinterMapping | — |
| FT160 | DefectInfo | — |
| FT161 | LabelStateInfo | C000=DisplayName, C001=UseInAQLInspect, C002=UseInFullInspect |
| FT162 | LabelStateCategory | C000=DisplayName, C001=IsDefect, C002=LabelPrefix |
| FT163 | LabelStateToCategoryMapping | — |
| FT164 | DefectInfoToCategoryMapping | — |

Views:
- `dbo.v_OMS_LabelState` — joins FT161+FT162 into flat label state + category row
- `dbo.v_OMS_LabelDefectReason` — defect reason view

## ETC Calculation (Estimated Time of Completion)

| Table | Note | Purpose |
|-------|------|---------|
| FT127 | Special article reference for ETC | — |
| FT128 | MaxMonth for ETC | — |
| FT129 | Qty buffer in use for ETC | — |
| FT130 | Order-Item save history for ETC | — |
| FT148 | LeadTime for ETC | — |
| FT502 | Color Change for ETC | — |
| FT503 | Color Group for ETC | — |

## Material Crushing / Runner Sorting

For plastic injection molding: rules for sorting and crushing runner material.

| Table | Note |
|-------|------|
| FT504 | Category of material matrix for crushing ticket |
| FT505 | Property of material in matrix |
| FT506 | Child property of material |
| FT507 | Matrix for rule of sorting runner |

## Purchase Order / Material Management

Data sourced from WinLine ERP. Notes include Vietnamese (team language).

| Table | Key Columns |
|-------|------------|
| FT400 | c000=PONumber (from Winline), c001=PO Date, c002=MaterialCode, c003=MaterialName |
| FT401 | c000=FT400.Id (parent), c001=IncomingDate (ngay nhận Lot hàng), c002=MaterialCode |
| FT402–FT439 | Further PO/lot/material detail tables |

> [!key-insight] WinLine Bridge
> `FT400.c000` note: "PONumber: This column keep data PO Number will get from Winline". This is the bridge between the WinLine ERP `wl` schema and the OMS `dbo` schema.

## HYDRA MES Integration

| Table | Note | Columns |
|-------|------|---------|
| FT600 | (HYDRA bridge) | c000=Hydra ProductionOrder, c001=Location, c002=StepCode, c003=StepName |
| FT175 | fGE — FGs injection link to machine | Links finished goods to HYDRA machine |
| FT176 | fGE — FGs injection link to machine | C000/C001=scanned QR, C002=ProductCode; doubles as the [[FramasScanner]] HC scan-tag/dedup store |

See also [[HYDRA BDE Module]] and [[HYDRA MDE Module]] for machine/order data on the HYDRA side.

## FramasScanner Client Tables

Used by the [[FramasScanner]] app's two-phase scan flow (see [[Framas Scanner Label Scan Flow]]).

| Table | Note |
|-------|------|
| lmpScannerClient_ScanningLabel | Pending (locked) scan — written by `CheckLabel` when `@lock = 1` |
| lmpScannerClient_ScannedLabel | Committed scan — written by `PostSingle` |

Cross-DB lookup: `CWL..T027` (`C002` = product code → `C003` = product name).

## Plastic Box Management

| Table | Note |
|-------|------|
| FT167 | PlasticBoxManagement_return |
| FT168 | PlasticBoxMaster |
| FT169 | PlasticBox TypeBox for each location |
| FT172 | PlasticBoxMaster_ScanLog |
| FT173 | PlasticBoxMaster_TypeBox |

## HR

| Table | Key Columns |
|-------|------------|
| FT029 | c000=EmployeeId, c001=FullName, c002=DepartmentId (→ FT028.Id), c003=PhoneNumber |
| FT031 | c000=DepartmentName, c001=Note |

## Printer / Service

| Table | Note |
|-------|------|
| ST046_PrinterSetting | Printer configuration |
| ST047_ServiceInfo | Printer services currently running on machine |

## Material Inventory

| Table | Note |
|-------|------|
| tblMaterialAvailability_Usage | Calculate Material Inventory |

## STO Campaign

| Table | Note |
|-------|------|
| FT170 | STO_Campaign_ |

## Report Layout

| Table | Note |
|-------|------|
| FT032 | ReportLayout (Name, TransactionId) |

## Column Convention

All `FT` columns: `cNNN` (lowercase) or `CNNN` (uppercase). Business name in `note:`.
Standard audit: `CreatedDate`, `CreatedMachine`, `CreatedBy`, `ModifiedDate`, `ModifiedMachine`, `ModifiedBy`, `TransactionId`.
PK: `Id uniqueidentifier [pk, default: newsequentialid()]`.
