---
address: c-000259
title: "WinLine Makros - Documentation v12"
tags:
  - source
  - winline
  - makros
  - vbscript
created: 2026-06-22
status: current
related:
  - "[[Mesonic WinLine]]"
  - "[[WinLine Makros]]"
  - "[[WinLine VBScript Engine]]"
---

# WinLine Makros — Documentation v12

**Source file:** `.raw/winline/docs/md/cwlmakro12.md`
**Product:** WinLine Edition 2022 — Version 12
**Published:** mesonic, 11/2021
**Language:** German
**Pages:** 33

---

## Document Scope

This is the official developer/power-user reference for the WinLine Macro system (Makros). It covers:

- The embedded VB-Script engine and its five application contexts
- Recording and replaying macros via the Ribbon ("Info Center und Makros")
- The complete `CWLMacro` object API: properties (Eigenschaften), methods (Methoden), events (Ereignisse)
- Macro management (WinLine START → Parameter → Programm Makros)
- Four launch paths: Ribbon/Menu, Favoriten, command-line, external programs, Cockpit

---

## Key Facts Extracted

### VBScript Engine Contexts

The document opens by listing all areas where the WinLine VBScript engine is active:

| Context | Purpose | License |
|---------|---------|---------|
| FIBU | Formula language for posting amount calculations (Buchungsarten) | Standard |
| FAKT | Formula language for article group processing (freight, insurance, etc.) | Standard |
| LOHN | Formula language for payroll types (Lohnarten) | Standard |
| ANBU | Formula language for stepped depreciation (Staffel-AfA) | Standard |
| Makros | Record and replay repetitive tasks | Standard |
| System Skripten | Standalone scripts independent of the active window | Own license required |
| Fenster Skripten | Actions tied to a specific window and event (button click) | Own license required |

### Macro Structure

A macro is a VBScript module with a `Sub RunMacro` entry point. The macro object is accessible as `CWLMacro` inside the script. Typing `.` in the formula editor triggers IntelliSense showing all available properties and methods. Functions are indicated with a function icon; variables with a variable icon.

### Recording

Recording starts via the "Makro Aufzeichnen" button in the Ribbon. All keyboard input and mouse clicks are captured. Mid-recording, right-clicking a field offers "Pause Macro for Input" — this inserts `MPauseForInput` and halts playback at that point to allow live user input, resumed via F11.

After stopping, the VBScript source is displayed and can be edited manually before saving.

### Parameters (MParameters)

Macros receive a parameters array via the `MParameters` property. Positions 1-19 contain system variables from the active Mandant. Position 20+ holds extra parameters from:
- Hyperlinks in printed forms
- External program macro invocations (`MACRO:XXX {CompanyValue:N}` or `{Constant:...}`)
- `MRunMacroSuspended` caller

The array must be assigned to a local variable before use (VBScript array-access constraint).

### Export/Import

Macros are stored inside WinLine and can be exported to `.MMR` text files and imported (including drag-and-drop). This is the standard mechanism for sharing macros between WinLine installations.

---

## API Summary

See [[WinLine Makros]] for the full property/method/event reference tables.

### Properties (5)

`Mname` (readonly), `MLastMessageResult` (readonly), `MPrintToArchive`, `MPrintToSpool`, `MBalloonHelp`, `MSilentMode`, `MParameters` (readonly array), `MCurrentPeriod` (readonly).

### Methods (40+)

Covers field interaction, grid/table operations, tree controls, listboxes, comboboxes, buttons, window switching, application switching, clipboard, print preview, file export, company/year switching, drill-down, hyperlink execution, Excel export, relative dates, and calling sub-macros.

### Events (2)

`OnRunMacro()` — fires on macro start. `OnStopMacro()` — fires on macro end.

---

## Launch Methods Documented

1. **Ribbon / Menu:** WinLine START → Parameter → Programm Makros (management window); Ribbon "Info Center und Makros" (recording + playback)
2. **Favoriten:** Right-click toolbar → Favoriten → New entry → Option "Makro/Script" → choose macro
3. **Command-line / batch:** `ADMN.EXE /USERa /PASSWDb /COMPANYZ /YEARXXXX /MACROMAKRO /QUITAFTERMACRO`
4. **External programs:** Register `MACRO:XXX` as the "program path" in Applikationen → Externe Programme
5. **Cockpit:** Cockpit edit mode → new entry → type "Makro" → select macro; displayed with a macro icon

---

## Cross-References

- [[WinLine Makros]] — concept page with full API reference
- [[WinLine VBScript Engine]] — concept page covering all five engine contexts
- [[Mesonic WinLine]] — product entity
- [[WinLine FAKT Formeln]] — related VBScript usage in FAKT formula system
- [[WinLine FAKT]] — Fakturierung module (also uses VBScript formulas)
