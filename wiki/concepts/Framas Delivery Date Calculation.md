---
type: concept
title: "Framas Delivery Date Calculation"
created: 2026-07-13
updated: 2026-07-13
address: c-000343
tags:
  - concept
  - hydra
  - framas
  - winline
  - delivery-dates
  - erp-integration
status: current
related:
  - "[[Framas HYDRA EIS-DBI Interface]]"
  - "[[Framas]]"
  - "[[Mesonic WinLine]]"
  - "[[MPDV HYDRA]]"
sources:
  - "[[Framas WinLine-HYDRA Schnittstelle Konzept (SOFTAGE)]]"
complexity: advanced
domain: "Manufacturing Execution Systems"
---

# Framas Delivery Date Calculation

WinLine-side date-calculation engine layered on top of the [[Framas HYDRA EIS-DBI Interface|HYDRA interface]]. Turns a customer order's requested date, a priority/lead-time lookup, and (later) HYDRA's actual scheduled completion into the full set of dates sales needs to promise, track, and reconcile a delivery. Designed by Hubert Foidl ([[SOFTAGE]]).

## Why this exists

The HYDRA interface only round-trips an ETC (estimated time of completion) per operation. Sales needs several derived dates — the customer's ask, the contractual commitment, shipping-adjusted variants, and a conformance verdict — none of which HYDRA computes. This engine lives entirely in WinLine, split into two calculation passes: **at order entry** (before HYDRA has scheduled anything) and **on HYDRA feedback** (once an ETC exists).

## The Priority Matrix (T680)

Lookup table: `Brand × VoucherType(Belegart) × OrderType × ItemType(decoration) → LT[days], Priority`. Drives both the target lead time (LTD calc) and a numeric priority (1-99) fed into the production order.

Structure, by example rows:
- **Claims** (Muster-/Produktions-Reklamation) get short LT (3-7 days) and the *highest* priorities (91-99).
- **Priority-item production orders** (e.g. adidas "Production Order of Priority Item") get LT=0 and priorities in the 65-84 band — these are pre-flagged hot SKUs, matched on ALL/ALL item-type.
- **Brand-specific production orders** (adidas S1/SR/CR/PR/P1/P2/P3, New Balance Premium/Speedlane/Regular/Pre-Buy, PUMA Fast Forward/Regular) get LT=0, priorities in a 16-49 band split further by with/without decoration (decoration variant always gets the higher of the pair).
- **Sample orders** (Muster) sit at LT=10, priority 86-89 — between claims and standard production.

Belegart (voucher type) 3-digit encoding drives which matrix row applies: 1st digit domestic(1)/oversea(3), 2nd digit claim(2)/order(3), 3rd digit sample(2)/production(3) — e.g. `333` = oversea production order, `122` = domestic sample claim.

Two escape hatches sit alongside the matrix:
- **T681 Specific Event-Priority**: per-article/customer/date-window override with its own `T1 Prio`.
- **T682 Priority Classification**: base-priority table combined with `SLT` (standard lead time from the price list, T043) when an article+customer combo has a Specific-Event-Priority entry — the effective priority becomes `SLT + base priority` instead of the matrix value.

## Field Glossary

All fields live on the new **T697 Positionsinformationen** table (one row per order line, linked via `Position GUID`), except where noted.

| Field | Full name | Meaning |
|---|---|---|
| RTD | Requested Time Delivery | Customer's wanted delivery date (manual input, header-level) |
| RTC | Requested Time Completion | Production-completion target that satisfies RTD (RTD minus shipping/buffer) |
| LTD | Limited Time Delivery | Contractual delivery date = order date + Priority-Matrix LT (or Specific-Event TLT) |
| LTC | Limited Time Completion | Completion target that satisfies LTD |
| LTDF | Limited Time Delivery forecast | RTD if RTD is later than LTD, else LTD (the "worse of the two" forecast) |
| LTDB | Limited Time Delivery backwards | LTD recalculated backward from a customer-given ship date (CSD); floors at LTD |
| LTCB | Limited Time Completion Backwards | Completion target satisfying LTDB |
| CSD | Customer Shipping Date | Manually entered, if the customer specifies one |
| ETD | Estimated Time of Delivery | ETC + purchasing buffer, shipping-method-adjusted |
| ETC | Estimated Time of Completion | HYDRA's actual scheduled completion, fed back via the interface (order-entry: unknown; feedback pass: = line delivery date when Status MES=2) |
| CDDD | Confirmed Delivery Date Distribution | Sales-confirmed date (manual) |
| CDDC | Confirmed Delivery Date Customer | Customer-confirmed date (manual) |
| RTDA | alternative RTD | secondary customer-requested date field |

Kundenstamm-level **Versandtage** (allowed shipping days of week) and **EST (Sea/Air/Land, T055 columns)** plus Artikelstamm **SLT (Standard Leadtime)** / **TLT (Total Leadtime)** feed the shipping-buffer arithmetic used throughout — every `*C`/`*B` variant of a date subtracts "möglicher Verschiffungstag" (next allowed shipping day) and article-level Einkauf-Puffertage.

## Pass 1 — Order Entry (Auftragsersterfassung)

Triggered by a Zeilenformel on first article line; opens a capture window for Auftragsart (only types valid per the Priority Matrix are offered) and, if the article/customer combo has a Specific-Event-Priority hit, the Prio Type (defaulted to the highest-priority match).

- `Lieferdatum` (per line, sent to HYDRA as the target date) = RTD minus shipping/buffer chain
- LTD = order date + Priority-Matrix LT (or Specific-Event TLT if a price-list entry exists for that article/customer). **If neither the price list nor a matrix row with LT>0 matches, the formula surfaces a warning** rather than silently defaulting.
- LTDB backward-calc from CSD: `CSD - (TLT - EST(customer) - SLT) - EST(customer)`, floored at LTD.
- Priority = Specific-Event-Priority (SLT + T682 base) if a hit exists, else straight Priority-Matrix value.
- ETC, ETD, CDDD, CDDC are all "not yet known" at this stage — left blank.

## Pass 2 — HYDRA Feedback (Rückmeldungsverarbeitung)

Fires once `Status MES = 2` and `Status MES Datum > 0` on the line (i.e. HYDRA has scheduled the operation). Sales works a filtered cockpit list (filtered on Terminstatus) — every order on it needs a human decision: accept HYDRA's date, negotiate with the customer, or re-run the formula for updated target dates.

- ETC = the line delivery date (now populated from HYDRA)
- ETD = ETC + purchasing buffer, shipping-day-aware
- CDDD / CDDC = manual sales entry
- RTD/RTC/LTD/LTC/LTDF/LTDB/LTCB/CSD = same formulas as Pass 1, re-evaluated
- Priority = same rule as Pass 1

### Conformance verdict (Kommentar field)

`NPSF = ETC + SLT` (including shipping day). Classified against RTC/LTD/LTDB:

| Verdict | Condition |
|---|---|
| RTD conform | `ETC <= RTC` |
| LTD conform | `RTC < ETC` and `NPSF <= LTD` |
| CSD conform | `LTD < NPSF` and `NPSF <= LTDB` |
| Serious Delay | `NPSF > LTDB` |

This string is what actually lands in the order-line comment for sales to scan.

## Statusspalten reused here

Both **Status MES Interface** (0=none, 1=exported, 2=feedback received, 99=error) and **Status MES Datum** (0=none, 1=fine-scheduled, 2=rescheduled, 3=de-scheduled) — defined fully in [[Framas HYDRA EIS-DBI Interface]] — gate when Pass 2 is even eligible to run, and when the cockpit list surfaces a line for sales action.

## Not yet built (v1.08)

Explicitly deferred to "weitere Phasen": the technical implementation of these calculations as live WinLine formulas/UI (this doc specs the *logic*, not the code), sales-cockpit visualization, and WinLine-CRM process wiring around the "Kundenterminbestätigung" workflow.

## See also

- [[Framas HYDRA EIS-DBI Interface]] — where ETC/scheduling data physically arrives from HYDRA
- [[Framas]] — company context
