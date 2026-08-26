---
type: concept
title: "HYDRA 8 Client Types"
created: 2026-05-27
updated: 2026-05-27
address: c-000180
tags:
  - concept
  - mes
  - hydra-8
  - clients
  - ui
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[hydra-8-documentation]]"
  - "[[HYDRA 8 Function Catalog]]"
sources:
  - "[[hydra-8-documentation]]"
complexity: intermediate
domain: "Manufacturing Execution Systems"
---

# HYDRA 8 Client Types

HYDRA 8 supports multiple client interfaces, each targeting a different user persona and use case. Function documentation is duplicated across client types — the same function (e.g., BDE-BDM) may have PDFs in AIP, MBL, HWEB, and MOC directories.

## Client Architecture

```
                    ┌──────────────────────────────┐
                    │        HYDRA 8 Server         │
                    │   (Application + Database)     │
                    └──────┬───────┬───────┬────────┘
                           │       │       │
        ┌──────────────────┤       │       ├──────────────────┐
        │                  │       │       │                  │
   ┌────┴────┐      ┌──────┴──┐ ┌──┴───┐ ┌┴────────┐  ┌─────┴─────┐
   │   AIP   │      │  HWEB   │ │ MBL  │ │   MOC    │  │    SMA    │
   │ Windows │      │ Browser │ │Mobile│ │  Web UI  │  │ Smart App │
   │ Terminal│      │         │ │ App  │ │  Admin   │  │ Workforce │
   └─────────┘      └─────────┘ └──────┘ └──────────┘  └───────────┘
   Shop Floor       Web Portal    Mobile    Management    Mobile HR
   Primary UI       Self-Service  Shop Floor Configuration  Approvals
```

## Client Types

### AIP — Acquisition Information Panel (82 PDFs)
**Primary shop floor terminal.** A Windows-based rich client application that serves as the main interface for production workers. Supports:
- Shop floor data collection (BDE functions)
- Machine data monitoring (MDE functions)
- Quality data capture (CAQ functions)
- Material/batch operations (MPL/TRT functions)
- HR functions (time recording, personnel info)
- Add-ons: Multimedia Kit (AMK), Online Language Switching (AOS), Task Switching (ATU), Label Printing (AED)
- Internal viewers for txt, ini, avi, tif, jpg, bmp, wmf, emf, png, and more
- External application launching for PDF and other formats

### CT5/TSW — Legacy Terminal (1 PDF)
Legacy thin-client terminal. Minimal documentation suggests it is largely superseded by AIP.

### HWEB — HYDRA@WEB (17 PDFs)
**Browser-based web portal.** Provides access to HYDRA functions via standard web browser. Supports:
- Login with user name/password or personnel number/badge + PIN
- System selection for multi-system environments
- Web client and Web portal applications
- HR Portal for self-service functions
- Browser-independent (does not control credential storage)

### MBL — HYDRA Mobile (170 PDFs)
**Smartphone/tablet client.** The second-largest function set after MOC, with 170 documentation files. Covers:
- Shop floor functions adapted for mobile devices
- BDE/PZW comparison (active labor time vs production posting comparison)
- Archiving concepts (online → medium-term → long-term data lifecycle)
- Mobile-optimized data collection workflows

### MOC — Management Cockpit (427 PDFs)
**Web-based administration and configuration.** The largest documentation set by far. Covers:
- System configuration and setup
- Master data management
- User and authorization management
- Module-specific configuration
- Absence management settings
- Update package creation

### MESC — MES-Cockpit (9 PDFs)
**QlikView-based analytics dashboard.** Provides:
- Performance Analysis and Production Monitoring via QlikView
- Customization via MES Development Suite (MC-DSCS)
- Pre-defined evaluations with customer-specific extension capability
- Original .qvw files must not be changed; customer modifications go in separate files

### MTS — Master Terminal (2 PDFs)
**DS-100 subbus integration.** The HYDRA standard Windows terminal can act as a master terminal to control MPDV DS-100 or IBS MT3 devices via RS-485 subbus. Enables a hierarchical data acquisition architecture.

### SMA — Smart App (41 PDFs)
**Mobile workforce applications.** Provides:
- Absence planning and approval workflows
- Contact person management
- Mobile HR functions
- Requires function authorization (e.g., `sma.apaa` for absence planning)

### SystemFunctions (2 PDFs)
- **Maintenance Manager 2.0**: Web-based tool at `http://ServerName:Port/` for managing HYDRA server and client components
- **MOC Update Package Creator**: Tool for creating update packages for Management Cockpit

## Cross-Client Patterns

1. **Function duplication**: The same business function (e.g., BDE-BDM) may be documented in AIP, MBL, HWEB, and MOC — each covering client-specific UI and behavior
2. **Authentication diversity**: AIP uses personnel number + PIN; HWEB supports user name + password or badge + PIN
3. **Escalation messages (ESK)**: Available across all modules and client types as a cross-cutting concern
4. **Language switching**: AIP supports online language switching via AIP-AOS add-on;  flag indicator in the taskbar shows current language with green (switchable) / red (locked) frame
