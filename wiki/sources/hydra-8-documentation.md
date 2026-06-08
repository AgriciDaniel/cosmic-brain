---
type: source
title: "HYDRA 8 Documentation (October 2020)"
created: 2026-05-27
updated: 2026-05-27
address: c-000177
tags:
  - source
  - mes
  - hydra-8
  - mpdv
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[hydra-cuthdb-data-model]]"
  - "[[HYDRA 8 Function Catalog]]"
  - "[[HYDRA 8 Glossary]]"
  - "[[HYDRA 8 Configuration Procedures]]"
  - "[[HYDRA 8 Release Notes]]"
  - "[[HYDRA 8 Client Types]]"
sources:
  - "[[hydra-cuthdb-data-model]]"
source_type: data
author: "MPDV Mikrolab GmbH"
date_published: 2020-10-00
url: ""
confidence: high
key_claims:
  - "HYDRA 8 encompasses 23 product modules across v8.1, v8.2, and v8.3 with ~200 distinct function documents"
  - "Function documentation is multi-client: AIP (Windows terminal), CT5/TSW (legacy), HWEB (web), MBL (mobile), MOC (Management Cockpit), MESC (MES-Cockpit), MTS (master terminal), SMA (Smart App)"
  - "The documentation set is organized into 7 sections: Functions, Glossary, Objects, Procedures, Products, TechnicalInformation, Tutorials"
  - "SAP integration spans 12 distinct interface modules (PP-PDC, HR-PDC, PP-PI, PM, PS, MM, CO, QM, etc.)"
---

# HYDRA 8 Documentation (October 2020)

**Source:** `raw/hydra/HYDRA_8_Documentation Oct 2020/`
**Version:** 1.18 (last change 2020-07-20)
**Files:** 1,556 PDFs + 1 .doc = 1,557 total
**Master document:** HYDRA_8-Documentation.pdf (46 pages)

## Overview

This is the complete HYDRA 8 functional documentation set from MPDV, covering all product modules, their functions, client types, configuration procedures, glossary terms, and release notes. The master PDF serves as a catalog indexing all ~200 function documents across 23 product modules.

## Documentation Structure

```
HYDRA_8_Documentation Oct 2020/
├── HYDRA_8-Documentation.pdf          (1 PDF)  — Master catalog/index
├── Functions/                          (751 PDFs) — Function-level documentation by client type
│   ├── AIP/                            (82)  — Windows terminal client
│   ├── CT5/                            (1)   — Legacy CT5 terminal
│   ├── HWEB/                           (17)  — HYDRA@WEB web client
│   ├── MBL/                            (170) — Mobile client
│   ├── MESC/                           (9)   — MES-Cockpit (QlikView analytics)
│   ├── MOC/                            (427) — Management Cockpit (web-based admin)
│   ├── MTS/                            (2)   — Master Terminal (DS-100 subbus)
│   ├── SMA/                            (41)  — Smart App (mobile workforce)
│   └── SystemFunctions/                (2)   — System-level tools
├── Glossary/                           (17 PDFs) — Terminology definitions
├── Objects/                            (17 PDFs) — Domain object documentation
├── Procedures/                         (124 PDFs) — Configuration & how-to guides
├── Products/                           (~515 PDFs) — Release notes per module per version
├── TechnicalInformation/               (15 PDFs) — Installation guides (MW40)
└── Tutorials/                          (1 PDF)  — Developer tutorials
```

## Product Modules (from Master Catalog)

### Production Execution
| Module | v8.1 | v8.2 | Description |
|--------|------|------|-------------|
| **BDE** | 17 functions | 18 functions | Shop Floor Data Collection |
| **MDE** | 9 functions | 9 functions | Machine Data Collection |
| **MPL** | 7 functions | 7 functions | Material & Production Logistics |
| **TRT** | 7 functions | 7 functions | Tracking/Tracing (batch genealogy) |
| **DNC** | 6 functions | 6 functions | NC Program Management & Setting Data |

### Scheduling & Planning
| Module | v8.1 | v8.2 | Description |
|--------|------|------|-------------|
| **HLS** | 16 functions | 17 functions | Shop Floor Scheduling |
| **PEP** | 4 functions | 5 functions | Personnel Scheduling |

### Quality Management
| Module | v8.1 | v8.2 | Description |
|--------|------|------|-------------|
| **FEP** | 15 functions | 16 functions | In-Production Inspection |
| **WEP** | 11 functions | 13 functions | Goods Receipt Inspection |
| **REK** | 8 functions | 8 functions | Complaint Management |
| **PMV** | 5 functions | 6 functions | Gage/Test Equipment Management |
| **QMS** | 5 functions | 5 functions | Quality Management (SAP QM sub-system) |

### Personnel
| Module | v8.1 | v8.2 | v8.3 | Description |
|--------|------|------|------|-------------|
| **LLE** | 6 functions | — | — | Premium/Incentive Pay |
| **PZE** | 2 functions | 2 functions | — | Time & Attendance |
| **PZW** | 10 functions | 10 functions | — | Personnel Time Management |

### Infrastructure & Monitoring
| Module | v8.1 | v8.2 | Description |
|--------|------|------|-------------|
| **PDV** | 8 functions | 8 functions | Process Data Collection & Visualization |
| **EMG** | 14 functions | 13 functions | Energy Management |
| **WRM** | 8 functions | 11 functions | Tool & Resource Management |
| **ZKS** | 9 functions | 9 functions | Access Control Systems |

### Terminal Client
| Module | v8.1 | v8.2 | Description |
|--------|------|------|-------------|
| **AIP** | 23 functions | 21 functions | Acquisition Information Panel (terminal UI for all modules) |

### Integration Services
| Module | Version | Functions | Description |
|--------|---------|-----------|-------------|
| **SIS** | 3.0 | 13 functions | System Integration Services (SSO, escalation, messaging, signatures) |
| **EIS** | 3.0 | 20 functions | Enterprise Integration Services (12 SAP interfaces + ERP/materials/CAQ) |
| **SCS** | 8.1 | 6 functions | Shop Floor Connectivity Services (OPC, Modbus, Siemens, PDM) |

## Client Types

HYDRA 8 supports multiple client interfaces for different use cases:

| Client | Directory | Files | Purpose |
|--------|-----------|-------|---------|
| **AIP** | Functions/AIP/ | 82 | Windows-based terminal — primary shop floor interface |
| **CT5/TSW** | Functions/CT5/ | 1 | Legacy CT5 terminal (thin client) |
| **HWEB** | Functions/HWEB/ | 17 | HYDRA@WEB — browser-based portal and web client |
| **MBL** | Functions/MBL/ | 170 | HYDRA Mobile — smartphone/tablet functions |
| **MOC** | Functions/MOC/ | 427 | Management Cockpit — web-based administration and configuration |
| **MESC** | Functions/MESC/ | 9 | MES-Cockpit — QlikView-based analytics and dashboards |
| **MTS** | Functions/MTS/ | 2 | Master Terminal — DS-100 subbus device integration |
| **SMA** | Functions/SMA/ | 41 | Smart App — mobile workforce applications |
| **SystemFunctions** | Functions/SystemFunctions/ | 2 | Maintenance Manager, Update Package Creator |

## SAP Integration Modules (EIS)

HYDRA 8 connects to SAP via 12 distinct interface modules:

| Interface | SAP Module | Direction |
|-----------|------------|-----------|
| SAP-HRPDC | HR via HR-PDC | Bidirectional (personnel time) |
| SAP-HRZW | HR Time Management | Bidirectional |
| SAP-PPPDC | PP via PP-PDC | Bidirectional (production orders) |
| SAP-PPPDK | PP-PDC Corrections | Correction functions |
| SAP-PPREM | PP Serial Production | Bidirectional |
| SAP-PPPI | PP-PI (Process Industries) | Bidirectional |
| SAP-ISS | PP Information System | HYDRA → SAP |
| SAP-PMCC3 | PM (Plant Maintenance CC3) | Bidirectional |
| SAP-PSCC4 | PS (Project System CC4) | Bidirectional |
| SAP-MMMOB | MM (Materials Management) | Bidirectional |
| SAP-COILV | CO (Controlling ILV) | Bidirectional |
| SAP-QMIDI | QM via QM-IDI | Bidirectional |

## Functions Directory — Complete Listing

Each function document exists in one or more client-type directories. The function code format is `MODULE-SUFFIX` (e.g., BDE-BDM, MDE-MDM). See [[HYDRA 8 Function Catalog]] for the complete cross-referenced function listing.

## Procedures Directory — Configuration Guides

The Procedures section contains 124 PDFs organized into:
- **Configuration guides** — per-module setup procedures (40+)
- **SAP integration guides** — HYDRA-side and SAP-side customizing (25+)
- **DMC guides** — Data Management Console implementation and tutorials (10)
- **MDS guides** — MES Development Suite configuration (30)
- **Setup guides** — per-feature setup instructions (30+)
- **Connector guides** — Kaba, SIPLACE, offline access control

## Products Directory — Release Notes

515 release note PDFs organized by module and version:
- **v8.1**: Initial HYDRA 8 release (~300 PDFs)
- **v8.2**: Second release (~200 PDFs)  
- **v8.3**: Latest release for select modules (EMG, PDV, PZE, PZW)

Each product PDF documents new features, changes, and fixes for a specific module version.

## Glossary — 17 Terminology Definitions

CollectiveBatch, EnergyManagement, ERP_Batch, EvaluationDate, Logistically_Handable_Unit, MES_Batch, OperationStatus, OrderStatus, PerfEffRate, PriorityRule, RemainingRunTime, SAP_ALE, SAP_BAPI, SAP_IDOC, SAP_PP-PDC, SAP_RFC, TimeType
