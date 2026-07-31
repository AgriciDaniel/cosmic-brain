---
type: concept
title: "HYDRA DNC Module"
created: 2026-06-09
updated: 2026-06-09
address: c-000237
tags:
  - concept
  - mes
  - hydra-8
  - module
  - dnc
  - nc-programs
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[HYDRA 8 Function Catalog]]"
  - "[[HYDRA MDE Module]]"
sources:
  - "[[hydra-8-documentation]]"
complexity: intermediate
domain: "Manufacturing Execution Systems"
---

# HYDRA DNC Module — Setting Data / NC Programs

**Code:** DNC (Direct Numerical Control / Setting Data)
**Versions:** 8.1, 8.2
**Source:** `.raw/hydra/md/HYDRA_8_Documentation Oct 2020/Products/DNC_81/`

## Purpose

Manages NC programs for CNC machines. Handles storage, version control, download to machines, monitoring of active programs, and comparison between versions. "Setting Data" refers to machine setup parameters bundled with NC programs. Enables centralized program management across an entire machine park.

## Functions (v8.1/v8.2)

| Code | Function | v8.1 | v8.2 |
|------|----------|------|------|
| DNC-PVW | NC Program Management | X | X |
| DNC-PPK | NC Program Packages | X | X |
| DNC-DUN | Download/Upload of NC Programs | X | X |
| DNC-MON | Monitoring of NC Programs | X | X |
| DNC-VEN | Comparison/Editor of NC Programs | X | X |
| DNC-AEB | Display/Presentation of Tooling Sheets | X | X |

## Key Capabilities

- **Program Management** (DNC-PVW) — central repository for NC programs with version history; manage programs across machine types
- **NC Program Packages** (DNC-PPK, 88KB doc) — the largest DNC function; group NC programs with setup parameters, tooling data, and related documents into packages
- **Download/Upload** (DNC-DUN) — transfer NC programs between HYDRA and CNC machines; support for multiple protocols
- **Monitoring** (DNC-MON, 23KB doc) — real-time monitoring of which NC program is loaded on each machine; detect unauthorized program changes
- **Version Comparison/Editor** (DNC-VEN) — diff NC programs between versions, edit programs in-system
- **Tooling Sheets** (DNC-AEB) — display setup instructions and tooling data alongside NC programs

## Integration

- **AIP-DNC** — terminal function for operators to request NC program downloads at machines
- **BDE/MDE** — machine state tracking informs which machine needs which program
- **WRM** — tool (Werkzeug) data referenced in NC packages
