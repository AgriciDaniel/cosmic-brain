---
type: concept
title: "HYDRA SCS Module"
created: 2026-06-09
updated: 2026-06-09
address: c-000248
tags:
  - concept
  - mes
  - hydra-8
  - module
  - opc
  - connectivity
  - machine-interface
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[HYDRA 8 Function Catalog]]"
  - "[[HYDRA MDE Module]]"
  - "[[HYDRA PDV Module]]"
  - "[[HYDRA Service Interface (SIF)]]"
sources:
  - "[[hydra-8-documentation]]"
complexity: advanced
domain: "Manufacturing Execution Systems"
---

# HYDRA SCS Module — Shop Floor Connectivity Services

**Code:** SCS (Shop Floor Connectivity Services) / PCC (Plant Communication Connector)
**Version:** 8.1
**Source:** `.raw/hydra/md/HYDRA_8_Documentation Oct 2020/Products/SCS_81/`

## Purpose

Handles physical machine connectivity — the bridge between HYDRA's database and actual CNC controllers, PLCs, and sensors on the shop floor. Provides OPC (OLE for Process Control) servers, file-based interfaces, and measurement data interfaces. This is where raw machine signals become MDE and PDV data records in HYDRA.

## Functions

| Code | Function |
|------|----------|
| PCC-OPC | PCC Module OPC Communication |
| PCC-DIF | PCC Module File Interface Machine/Process Data |
| SCS-IMM | PCC Module Measurement Data Interface |
| OPC-SMB | OPC Server for Modbus Communication |
| OPC-SSS | OPC Server for Siemens Controls (S7/S5) |
| SCS-PDM | — |

## Key Technologies

- **OPC** (OLE for Process Control) — standard protocol for real-time machine data exchange; PCC acts as OPC client to machine OPC servers; OPC-SMB and OPC-SSS provide server-side adapters for Modbus and Siemens PLC protocols
- **File Interface** (PCC-DIF) — simpler alternative to OPC; machines write data to files (CSV, XML); HYDRA reads and imports
- **Measurement Data Interface** (SCS-IMM) — standardized interface for connecting quality measurement devices (CMMs, gages) to HYDRA PDV/FEP

## Positioning in the Architecture

```
Physical machine/sensor
        ↓
SCS (PCC/OPC) — connectivity layer
        ↓
MDE (machine states) / PDV (process values) — HYDRA data model
        ↓
BDE (order context) / EMG (energy) — business data
```

SCS is essentially the **hardware abstraction layer** for HYDRA. Without SCS, machine data must be entered manually or via AIP terminals; with SCS, it flows automatically.

> [!contradiction] "SCS" is not one thing — disambiguating SCS-SIF
> The document `SCS-SIF_81` lives in this same `Products/SCS_81/` folder and shares the "SCS" prefix, but it is **not** part of this hardware-connectivity function set. SCS-SIF is the HYDRA **Service Interface** — a general-purpose HTTP/REST API for calling any HYDRA service or PDM dialog from external clients (BDE, MDE, HLS, PZE, WRM, MPL, PDV, CAQ, and more), unrelated to OPC/Modbus/Siemens hardware bridging. The naming collision (SCS-PCC hardware functions vs. SCS-SIF vs. legacy SCS-PDM dialog protocol, all under "SCS") is MPDV's own product-family numbering, not a documentation error, but it is easy to conflate. See [[HYDRA Service Interface (SIF)]] for the actual application-layer API this module's OPC data ultimately gets exposed through to non-HYDRA systems.
