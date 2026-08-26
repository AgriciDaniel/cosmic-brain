---
address: c-000261
title: "WinLine VBScript Engine"
tags:
  - concept
  - winline
  - vbscript
  - formelsprache
created: 2026-06-22
status: current
related:
  - "[[Mesonic WinLine]]"
  - "[[WinLine Makros]]"
  - "[[WinLine FAKT Formeln]]"
  - "[[WinLine FIBU]]"
---

# WinLine VBScript Engine

[[Mesonic WinLine]] embeds a VBScript engine (Microsoft VBScript runtime) that powers automation and formula scripting across multiple modules. The same runtime is reused in five standard-licensed contexts and two additional licensed contexts. Each context exposes a different object model to the script.

---

## Overview

The VBScript engine was chosen because it is:
- Built into Windows (no additional runtime installation)
- Familiar to users with Excel/Access macro experience
- Extensible via COM object injection (each context injects a module-specific host object)

Scripts in all contexts share the same VBScript syntax and can use all built-in VBScript functions (string manipulation, date/time, math, `MsgBox`, `InputBox`, etc.).

---

## The Five Standard Contexts

### 1. FIBU — Finanz-Buchungsarten Formeln

**Module:** [[WinLine FIBU]] (Finanzbuchhaltung)
**Purpose:** Formula language (Formelsprache) for calculating amounts in posting types (Buchungsarten).
**Trigger:** Evaluated when processing a posting that has an associated formula.
**Use case:** Compute tax amounts, distribute costs across accounts, apply exchange rate logic.
**License:** Included in standard WinLine FIBU.

### 2. FAKT — Fakturierung Formeln

**Module:** [[WinLine FAKT]] (Fakturierung / Invoicing)
**Purpose:** Formula language for article-group-level calculations such as freight cost (Frachtkosten), transport insurance (Transportversicherung), and similar surcharges.
**Trigger:** Four formula types, each triggered at a different point in document entry:

| Formula Type | German Name | Trigger |
|---|---|---|
| Line formula | Zeilenformel | On each line during entry |
| Document formula | Belegformel | On each line when document saved |
| Header load formula | Belegkopfformel Laden | When document header is loaded |
| Header save formula | Belegkopfformel Speichern | When document header is saved |

**Host object:** Provides access to `Value(0, N)` for reading field values (e.g., `Value(0, 618)` = exchange rate Kurs/Einheit, `Value(0, 616)` = fixed rate).
**User columns:** Formulas can write to T025 user-defined columns (`U000`, `U001`, ...) extended via ADMIN → System → Tabellen erweitern.
**License:** Included in standard WinLine FAKT.

See [[WinLine FAKT Formeln]] for the complete formula system reference.

### 3. LOHN — Lohnarten Formeln

**Module:** WinLine LOHN (Payroll)
**Purpose:** Formula language for processing payroll types (Lohnarten). Scripts compute payroll component amounts based on employee data, hours, rates, and legal parameters.
**License:** Included in standard WinLine LOHN.

### 4. ANBU — Staffel-AfA Formeln

**Module:** WinLine ANBU (Anlagenbuchhaltung / Fixed Asset Accounting)
**Purpose:** Formula language for calculating stepped depreciation (Staffel-AfA). Enables non-linear depreciation schedules that cannot be expressed with standard percentage-based methods.
**License:** Included in standard WinLine ANBU.

### 5. Makros — Record/Replay Automation

**Module:** All modules (cross-cutting)
**Purpose:** Record user interactions as VBScript and replay them for automation of repetitive tasks.
**Host object:** `CWLMacro` — exposes the full macro API (properties, ~40 methods, 2 events).
**Entry point:** `Sub RunMacro` in every macro script.
**License:** Included in all standard WinLine installations.

See [[WinLine Makros]] for the complete macro API reference.

---

## Two Licensed Contexts (MDP License Required)

These two contexts require a separate **MDP-Runtime-Lizenz** (and for authoring: MDP-Developer-Lizenz):

### System Skripten

**Purpose:** Standalone scripts that run independently of the currently active window. Used for WinLine-independent reports, batch processing, and operations that cross window boundaries.
**Trigger:** Launched manually, scheduled, or called via `MRunForm` from a macro.
**Window modes when called from a macro (`MRunForm` bMode):**
- `0` — normal (hidden when switching application)
- `1` — modal (blocks the calling application until closed)
- `2` — application-spanning foreground (stays visible across application switches)

### Fenster Skripten

**Purpose:** Scripts tied to a specific WinLine window and a specific event within that window (typically a button click).
**Trigger:** Event-driven — fires when the designated event occurs in the bound window.
**Use case:** Add custom business logic to standard WinLine screens without modifying the core application.

---

## Script Authoring

### Formula Editor

All five standard contexts share the same in-product formula editor. Typing `.` in the editor triggers an IntelliSense drop-down listing all available members of the host object for that context. Arrow-key navigation shows usage documentation for each member in a tooltip panel. Members are annotated with icons: function symbol for callable methods, variable symbol for properties.

### Writing Scripts

Scripts are standard VBScript. Key conventions across contexts:

- Main entry point is `Sub RunMacro` (Makros) or the formula body (FIBU/FAKT/LOHN/ANBU).
- Host objects are pre-instantiated — scripts do not need to create them.
- All built-in VBScript functions (`Chr`, `UBound`, `MsgBox`, `Now`, `DateAdd`, etc.) are available.
- Scripts can branch, loop, and call helper subroutines within the same script module.

### IntelliSense Usage

To see all available members in the formula editor:

1. Type `CWLMacro` (for macros) or the relevant host object name.
2. Type `.` — IntelliSense list appears.
3. Use arrow keys to navigate and see documentation for each entry.

---

## Integration Model

Each VBScript context follows the same integration pattern:

```
WinLine Module
    └── Trigger event (save, button click, payroll run, etc.)
            └── VBScript Engine
                    └── Script receives host object with module-specific API
                            └── Script reads/writes module data via host object methods
```

The host object is the integration boundary. Scripts cannot directly access WinLine's internal data structures — they only interact through the methods and properties the host object exposes. This is intentional: it keeps scripts isolated from internal implementation changes.

---

## Relationship to T025 / T025 Extension

In FAKT formulas, writing back to the voucher record uses T025 user columns (`U000`...`U009`). These columns must first be provisioned in ADMIN → System → Tabellen erweitern. This requires the MDP-Developer license. A side effect: **extending T025 disables the "Belege parken" (park voucher) function**. If background printing is used, T145 must also be extended.

---

## Cross-References

- [[WinLine Makros]] — complete Makros context: CWLMacro API, recording, launch paths
- [[WinLine FAKT Formeln]] — complete FAKT formula system: four types, Value() function, T025 user columns
- [[WinLine FAKT - Voucher Save Hook va Exchange Rate]] — practical synthesis: Belegkopfformel Speichern hook, exchange rate capture, T025 write
- [[WinLine FIBU]] — FIBU module (Buchungsarten formulas)
- [[Mesonic WinLine]] — product entity
- Source: [[winline-makro12]] — WinLine Makros documentation v12 (primary source for Makros context)
- Source: [[winline-fakt]] — WinLine FAKT documentation (primary source for FAKT formulas)
