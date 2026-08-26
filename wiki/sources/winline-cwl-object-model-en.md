---
address: c-000265
title: "WinLine CWL Object Model (English v10.5)"
tags:
  - source
  - winline
  - cwl
  - scripting
created: 2026-06-22
status: current
related:
  - "[[Mesonic WinLine]]"
  - "[[WinLine CWL Object Model]]"
  - "[[WinLine CWLCurrentWindow]]"
  - "[[WinLine CWL MacroCommands]]"
---

# WinLine CWL Object Model (English v10.5)

**Source file:** `.raw/winline/docs/md/cwlobject_e_105.md`
**Title:** Corporate WINLine® Object Model
**Version:** Valid from Corporate WINLine® 10.5
**Publisher:** MESONIC © 2020
**Language:** English
**Pages:** ~76

## What This Document Is

The official English-language API reference for the Corporate WINLine Object Model — the VBScript-based scripting layer (CWL) of the WinLine ERP. Describes all built-in objects, classes, events, and constants available when writing CWL scripts (CTK scripts, System scripts, Payroll scripts, FAKT formula scripts).

## Document Structure

| Section | Content |
|---------|---------|
| §1 Object Hierarchy | Visual tree showing how objects relate |
| §2 Objects | Built-in objects table with usage context |
| §3 MacroCommands | Overview of the macro processing object |
| §4 Object Model Descriptions | Detailed docs for 8 core objects |
| §5 Classes | Detailed docs for 11 class objects derived from CWLStart |
| §6 Constants | 9 constant groups (CWLApplicationNr, CWLWindowTypes, etc.) |

## Key Objects Documented

| Object | Purpose |
|--------|---------|
| `CWLStart` | Root application control object (default in System/CTK macros) |
| `CWLScript` | Represents the script itself |
| `CWLCurrentModule` | Event interface for the active module (CTK only) |
| `CWLCurrentWindow` | Event interface for the active window (CTK only) |
| `CWLWindowVars` | Access to window variables |
| `CWLEventResult` | Return values for events that need a result |
| `CWLSearchResult` | SQL query result object |
| `GeneralScriptFuncs` | MsgBox, InputBox, FileDialog, WaitCursor |

## Key Classes Documented

| Class | Purpose |
|-------|---------|
| `CWLCompany` | Current company data + SQL queries |
| `CWLDbConnection` | Database connection object |
| `CWLModule` | Represents a CWL module (FAKT, FIBU, etc.) |
| `CWLWinCollection` | Collection of window objects |
| `CwlWindow` | Individual window object |
| `CwlFgCollection` | Collection of controls in a window |
| `CwlFgControl` | Individual control (edit field, button, grid cell, etc.) |
| `CwlPreview` / `CwlPreviewPage` / `CwlPreviewPageItem` | Print preview hierarchy |
| `CwlSpreadSheet` | Spreadsheet control |
| `CWLGrid` | Grid/screen table control |
| `CWLReport` | Custom report output |

## Constants Documented

- `CWLApplicationNr` — module IDs (cwlMAIN=0, cwlFIBU=1, cwlFAKT=2, cwlLOHN=3, etc.)
- `CWLWindowTypes` — winStandardType=0, winPreviewType=1, WinScriptType=2
- `CWLControlTypes` — all control type values (Edit, Button, Checkbox, Grid, etc.)
- `CWLSpoolItemType` — print spool element types
- `CWLSpoolPreviewItemFlag` — hidden text flags for drill-down
- `CWLAlignments` — left/right/center alignment values
- `CWLScriptWindowType` — Standard=0, Modal=1, System=2
- `CWLSystemServerType` — system database server type identifiers
- `CWLDbConnectionType` — DAO=0, SQL=1, PostgreSQL=4 (POS deprecated from v8.6)

## Version Differences vs German v12.24

> [!note] This is version 10.5 (2020). The German doc (cwlobjektdocu.md) is v12.24 (2023/2024). Key additions in the newer version:
> - `CWLStart` gains: `CurrentUser`, `InvoicingModule`, `MacroCommands` (property), `SessionType`, `WebserviceResult` properties
> - `CWLStart` gains: `OnContextmenu` event
> - `CWLCurrentWindow` gains: `OnBeforeCheck`, `OnGridNewUserLine`, `OnGridCheckBox`, `OnGridDrillDown`, `OnCmbSelChange`, `OnGridCmbSelChange`, `OnGridAllowEdit`, `OnUserEvent` events
> - `CWLWindowVars` gains: `Locked` property; `CreateVar` gets `bOverwriteExisting` parameter
> - `CWLSearchResult` gains: `RowCount` property; `CopyResultsToWindow` method
> - `GeneralScriptFuncs` gains: `Convert` (Base64/RTF), `MsgWin`, `MsgWinSetText`, `MsgWinDestroy` methods
> - `CWLModule` gains: `Number` property; `SendWindowEvent` method
> - `CwlWindow` gains: `CreateReport`, `CloseReport`, `SetShowLevel`, `CallWindowOnClose` methods
> - `CwlFgControl` gains: `Active` property; `AddToSplitter` method; `Text` property is read/write (combo box population)
> - `CWLGrid` gains: `SelectedLines` property; `SetFooterColumn`, `SetDecimalPlaces`, `SetCellValue`, `SetDrillDown`, `GetDrillDown`, `Clear`, `UpdateVars` methods
> - `CWLGridColumnFlags` — new constants section
> - `$IMPORT` keyword — module import mechanism for scripts
> - Chapter 8 Tips & Tricks — editing scripts on client installations, external COM access, macro parameter passing, right-click menu control

## Notes

- `CWLStart` is the **default object** in System and CTK macros — you can call its properties/methods without the `CWLStart.` prefix
- The `~~~~` placeholder substitutes the current company code in SQL queries
- The `yyyy` placeholder substitutes the current fiscal year in SQL queries
- From v8.0, all SQL queries against company tables must include `MESOCOMP = '~~~~' and MESOYEAR = yyyy`
- PostgreSQL (`cwlDbConnectionTypePOS`) is no longer supported from WinLine v8.6

## Related Wiki Pages

- [[WinLine CWL Object Model]] — synthesized overview of both versions
- [[WinLine CWLCurrentWindow]] — deep-dive on the event interface object
- [[WinLine CWL MacroCommands]] — the macro processing object
- [[WinLine FAKT Formeln]] — FAKT formula scripts that use this API
- [[Mesonic WinLine]] — parent ERP entity
