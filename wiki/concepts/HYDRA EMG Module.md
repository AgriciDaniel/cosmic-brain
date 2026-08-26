---
type: concept
title: "HYDRA EMG Module"
created: 2026-06-09
updated: 2026-06-09
address: c-000238
tags:
  - concept
  - mes
  - hydra-8
  - module
  - energy
  - oee
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[HYDRA 8 Function Catalog]]"
  - "[[HYDRA MDE Module]]"
  - "[[HYDRA PDV Module]]"
  - "[[HYDRA 8 Glossary]]"
sources:
  - "[[hydra-8-documentation]]"
complexity: intermediate
domain: "Manufacturing Execution Systems"
---

# HYDRA EMG Module — Energy Management

**Code:** EMG (Energiemanagement / Energy Management)
**Versions:** 8.1, 8.3 (note: v8.2 not listed; jumps to v8.3 in Products/)
**Source:** `.raw/hydra/md/HYDRA_8_Documentation Oct 2020/Products/EMG_81/`

## Purpose

Records, monitors, and analyzes energy consumption in manufacturing operations. Connects to energy meters (kWh, m³, l, compressed air, etc.), correlates consumption with production orders, and calculates energy-efficiency KPIs. Built on PDV's process data infrastructure.

## Functions

| Code | Function |
|------|----------|
| EMG-MGM | Energy Management master (123.9KB — core configuration) |
| EMG-AME | Meter Reading Plans for Manual/Mobile Data Collection |
| EMG-ARC | Archiving of Energy and Power Data |
| EMG-ESK | Escalation Messages for Energy Management |
| EMG-EVF | Energy Consumption Recording for Production Orders |
| EMG-GEL | Graphic Energy Meter Layout |
| EMG-GEM | Energy Meter Management |
| EMG-GLA | Graphic Performance Analysis |
| EMG-H7K | HYDRA 7 Energy Management Connection (migration) |
| EMG-KBW | Generation and Monitoring of Key Figures |
| EMG-KLE | Correlative Load Development |
| EMG-LEE | Performance Recording |
| EMG-OVL | Online Visualization of Performance Values |
| EMG-PLA | Planning Strategy for Energy Requirements |
| EMG-VAN | Energy Consumption Analysis |
| EMG-VAB | — |
| EMG-VAE | — |

## Key Concepts (from Glossary)

- **Consumption** — withdrawal of energy (kWh, m³, l) measured per production order or time period
- **Capacity (Leistung)** — instantaneous power (W), derived from energy over time; also measurable directly
- **Energy efficiency** — KPI = energy per unit produced; defined per product/company
- **Energy management system** — ISO 50001 compliant: policy, strategic objectives, processes for energy targets
- **HYDRA integration** — EMG reads meters via PDV's process data channel infrastructure; every energy channel is a PDV measurement point

## Integration

- Built on **PDV** (Process Data Collection) — energy readings are a class of process data channels
- **MDE** machine status feeds help correlate energy to machine states (running/idle/downtime)
- **AIP** provides terminal interface for manual meter readings (EMG-AME)
- **EMG-EVF** links energy consumption directly to BDE production order bookings
