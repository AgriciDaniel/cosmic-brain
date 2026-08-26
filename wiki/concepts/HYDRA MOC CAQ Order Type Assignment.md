---
type: concept
title: "HYDRA MOC CAQ Order Type Assignment"
created: 2026-06-05
updated: 2026-06-05
address: c-000207
tags:
  - concept
  - mes
  - caq
  - moc
  - configuration
  - hydra
status: complete
related:
  - "[[HYDRA CAQ Module]]"
  - "[[HYDRA AIP-CAQ Functions]]"
  - "[[HYDRA 8 Function Catalog]]"
sources:
  - "[[hydra-caq-aip-functions]]"
complexity: intermediate
domain: "Manufacturing Execution Systems"
---

# HYDRA MOC CAQ Order Type Assignment

**Transaction code:** `ortycaq`
**Path:** System administration → System settings → Area: configuration of order type
**Purpose:** Links BDE order types to CAQ areas — controls when/how inspection requirements are auto-generated

## Overview

This MOC application defines rules for each combination of **order type** × **area type/area**. When an operation is logged on (or an order changes status), HYDRA evaluates the matching rule and generates an inspection requirement accordingly.

## Action Values

| Action | Trigger | Requirement |
|--------|---------|-------------|
| `PAN_AU/A_AN` | Operation log-on | One inspection plan for all operations |
| `PAN_AG/A_AN` | Operation log-on | One inspection plan per OP (Option 1159 required) |
| `PAN_AU/A_ST` | Order status change | Source/target status defined in Addition field |
| `PAN_AU/AUNR_COPY` | Calibration calendar order generation | Order type "KAL" only |
| *(empty)* | — | No inspection requirement; use when QM operations generated instead |

## Addition Parameters

Multiple parameters separated by comma (no spaces).

| Parameter | Meaning |
|-----------|---------|
| `[AUNR,AGNR]` | Link inspection step to order via `auftrags_bestand.aunr` AND `.agnr` |
| `[AUNR]` | Link via `auftrags_bestand.aunr` only |
| `[ATK_AG]` | Use article of the **operation** for inspection requirement |
| `[ATK_AU]` | Use article of the **order** for inspection requirement |
| `[AUST_Q:<status>]` | Trigger when order switches FROM this source status |
| `[AUST_Z:<status>]` | Trigger when order switches TO this target status |

Combined example: `[AUST_Q:P],[AUST_Z:V]` — trigger when order transitions from status P → V.

## Calibration Special Case (`PAN_AU/AUNR_COPY`)

Requirements:
- Calibration inspection plan configured: one plan for all operations, one inspection step per inspection station, Generate QM operations: none, "Inspection order + generate characteristic" when generating inspection requirement
- Inspection plan characteristics planned for a machine/machine group
- Service Pack 11 or higher

## Prerequisites

At least one of these CAQ/PDV functions licensed:
- Incoming goods inspection (WEP)
- In-production inspection (FEP)
- Goods issue inspection (WAP)
- Initial sample inspection (EMU)
- Calibration (PMV)
- QM subsystem (QMS)
- PDV data collection

## Database Integration

The key link between BDE operations and CAQ inspection steps is via `auftrags_bestand`:
- `aunr` = order number
- `agnr` = operation number

These fields appear in MDI filter parameters (`ANR`, `AGNR`) when the AIP-CAQ terminal requests measurement data from devices. See [[HYDRA AIP-CAQ Functions]].
