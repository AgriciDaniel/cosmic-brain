---
type: concept
title: "WinLine Offene Posten (OP)"
created: 2026-06-08
updated: 2026-06-08
address: c-000228
status: developing
complexity: intermediate
domain: accounting
tags:
  - winline
  - fibu
  - accounting
  - concept
aliases:
  - "Offene Posten"
  - "OP"
  - "open items"
related:
  - "[[WinLine FIBU]]"
  - "[[Mesonic WinLine]]"
sources:
  - "[[raw/winline/cwl0/cwl0.chm]]"
---

# WinLine Offene Posten (OP)

**Open items** — unsettled invoices (Fakturen) on customer/vendor (Personenkonten) and, separately, on G/L accounts (**Sachkonten-OP**) in [[WinLine FIBU]].

## Lifecycle

1. A **Faktura** (invoice) is posted → becomes an open item.
2. A **Zahlung** (payment) is posted and matched via **Fakturenausgleich** (automatic or manual) or **Zahlungsausgleich** (rule-driven, **Regelassistent**).
3. Tolerances come from **OP-Parameter**: *Fehlbetrag akzeptiert* (extra Skonto granted) and *Fehlbetrag maximal* (max tolerated short-payment beyond entitled Skonto).

## Maintenance & reporting

- **Offene Posten - Auswertung** → table output (**Offene Posten**); selection made in the Auswertung narrows the table (table output only for "Kontoblatt").
- **Manueller Ausgleich Sachkonten-OP**, **Doppelte OPs** (dedupe), **Neubewertung Fremdwährungs-OPs** (FX revaluation).
- **Mahnvorbereitung → Mahnung** — dunning driven by **Mahnparameter** (Karenztage, Verzugszinsen tagesgenau per Faktura, Mahnspesen, Gerichtskosten). A Mahnlauf can run daily; the dunning level only rises when the per-invoice parameters say so.
- Analysis: **Zahlungsmoral**, **Zahlungsliste**, **Differenzliste**.
