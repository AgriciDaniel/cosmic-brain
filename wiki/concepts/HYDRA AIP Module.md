---
type: concept
title: "HYDRA AIP Module"
created: 2026-06-09
updated: 2026-06-09
address: c-000245
tags:
  - concept
  - mes
  - hydra-8
  - module
  - terminal
  - ui
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[HYDRA 8 Function Catalog]]"
  - "[[HYDRA 8 Client Types]]"
  - "[[HYDRA AIP-CAQ Functions]]"
  - "[[hydra-caq-aip-functions]]"
sources:
  - "[[hydra-8-documentation]]"
  - "[[hydra-caq-aip-functions]]"
complexity: advanced
domain: "Manufacturing Execution Systems"
---

# HYDRA AIP Module — Acquisition Information Panel

**Code:** AIP (Acquisition Information Panel)
**Versions:** 8.1, 8.2
**Source:** `.raw/hydra/md/HYDRA_8_Documentation Oct 2020/Functions/AIP/` (100+ files)

## Purpose

The **primary shop-floor terminal interface** for HYDRA. AIP is the Windows-based terminal client that operators use to log on/off orders, record quantities, confirm operations, scan barcodes, and capture quality data at workstations. Highly configurable via XML GUI layouts. AIP v2 (AIP2) is the newer generation with improved architecture.

## Function Coverage

AIP is not a standalone data domain — it **exposes functions from all other modules** at the terminal UI level. Each `AIP-xxx` code means "AIP terminal interface for module xxx":

| Code | Interface | Target Module |
|------|-----------|---------------|
| AIP-BMD | Shop Floor/Machine Data Functions | BDE/MDE |
| AIP-EBM | Expanded Terminal Functions | BDE |
| AIP-ESC | Collection of Serial Numbers and Batch Numbers | TRT |
| AIP-TMD | Partial Quantity Documentation | BDE |
| AIP-DVE | Discrete Consumption Recording | MPL |
| AIP-MPL | Acquisition/Information Functions for Material Data | MPL |
| AIP-MTR | AIP Functions for MPL/Tracking/Tracing | MPL/TRT |
| AIP-TRT | Acquisition/Information Functions for Batches | TRT |
| AIP-LCS | Serial Numbers/Palletizing/Weighing Components | TRT/MPL |
| AIP-KEW | Weighing of Components | MPL |
| AIP-WRM | AIP Functions for Tools/Resources | WRM |
| AIP-PDV | AIP Functions for Process Data | PDV |
| AIP-DNC | AIP Functions for DNC | DNC |
| AIP-CAQ | AIP Functions for Quality Data | CAQ/FEP |
| AIP-MDI | Measurement Data Interface for Quality Data | CAQ |
| AIP-NUM | Capture of Quality Data relating to Numbers | CAQ/FEP |
| AIP-NES | Capture of Quality Data relating to Cavities | CAQ/FEP |
| AIP-HRF | AIP Functions for HR Applications | PZE |
| AIP-HRL | AIP Functions for HR Applications (extended) | PZE/LLE |
| AIP-AED | AIP Add-on Label Printing | — |
| AIP-AMK | AIP Add-on Multimedia Kit | — |
| AIP-AOS | AIP Add-on Online Language Switching | — |
| AIP-ATU | AIP Add-on Switching of Tasks | — |
| AIP-GAT | — | — |

## AIP2 Generation

AIP2 files (`AIP2-*`) document the second-generation terminal. Changes: XML-based GUI configuration (`ctaip`, `ctaipbut`, `ctaiplay`, `hytnrcfg` config files), improved barcode input with prefix handling, new basic screen (`MFBasicScreen`), and modular function extensions.

## Configuration

AIP is extensively configurable:
- **GUI layouts** — XML files define screen layouts, buttons, field visibility
- **Barcode input** — configure barcode prefix handling and format parsing
- **User exits** — `AIP2_UserExit_Reference` provides hook points for custom logic
- **Keyboard mapping** — assign functions to keystrokes

> [!note] See also
> [[HYDRA AIP-CAQ Functions]] for detailed CAQ/FEP integration documentation. [[hydra-caq-aip-functions]] source page covers AIP-CAQ, AIP2-CAQ, and archiving functions.
