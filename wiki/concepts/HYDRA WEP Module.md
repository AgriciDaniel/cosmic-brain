---
type: concept
title: "HYDRA WEP Module"
created: 2026-06-09
updated: 2026-06-09
address: c-000241
tags:
  - concept
  - mes
  - hydra-8
  - module
  - quality
  - goods-receipt
status: developing
related:
  - "[[MPDV HYDRA]]"
  - "[[HYDRA 8 Function Catalog]]"
  - "[[HYDRA FEP Module]]"
  - "[[HYDRA CAQ Module]]"
sources:
  - "[[hydra-8-documentation]]"
complexity: intermediate
domain: "Manufacturing Execution Systems"
---

# HYDRA WEP Module — Goods Receipt Inspection

**Code:** WEP (Wareneingangs-Prüfung — Goods Receipt Inspection)
**Versions:** 8.1, 8.2
**Source:** `.raw/hydra/md/HYDRA_8_Documentation Oct 2020/Products/WEP_81/`

## Purpose

Incoming quality inspection for purchased parts and raw materials at goods receipt. Plans inspection tasks for incoming batches, records measurement data, applies dynamic modification rules (skip lots, tightened inspection), and triggers supplier evaluations. Mirror of FEP but at the goods receipt gate rather than at production operations.

## Functions (v8.1/v8.2)

| Code | Function | v8.1 | v8.2 |
|------|----------|------|------|
| WEP-PPW | Goods Receipt Inspection Planning | X | X |
| WEP-EPW | Enhanced Inspection Planning/Inspection Steps | X | X |
| WEP-FPW | Family Inspection Planning | X | X |
| WEP-DWP | Dynamic Modification of Goods Receipt Inspections | X | X |
| WEP-ESK | WEP Escalation Messages | X | X |
| WEP-ARC | WEP Data Archiving | X | X |
| WEP-AWP | Evaluations on Goods Receipt Inspections | X | X |
| WEP-RKH | Standard Control Charts and Histograms | X | X |
| WEP-FSM | Failure Mode Analysis/Action Tracking | X | X |
| WEP-ERH | Enhanced Control Charts and Histograms | X | X |
| WEP-EVF | Forms Creation/Management | X | X |
| WEP-LFB (v8.2) | Supplier Evaluation/Assessment Management | — | X |
| WEP-QSS (v8.2) | qs-STAT Interface for Goods Receipt Inspections | — | X |

## Key Capabilities

- **Dynamic modification** (WEP-DWP) — ISO 2859-based AQL skip-lot logic: automatically tighten or loosen inspection based on supplier history
- **Supplier evaluation** (WEP-LFB v8.2) — build supplier performance scores from WEP inspection results
- **Family inspection** (WEP-FPW) — single inspection plan applies to a family of similar articles
- **Integration with qs-STAT** (v8.2) — statistical quality tools

## Relationship to FEP

WEP and FEP share almost identical function sets but apply to different trigger points:
- **WEP** = incoming material (goods receipt from supplier)
- **FEP** = during production (at operations on the shop floor)
Both reference the same CAQ master data (characteristics, catalogs).
