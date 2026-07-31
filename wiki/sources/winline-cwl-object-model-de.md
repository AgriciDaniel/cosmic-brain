---
address: c-000266
title: "WinLine Objektmodelle (German v12.24)"
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

# WinLine Objektmodelle (German v12.24)

**Source file:** `.raw/winline/docs/md/cwlobjektdocu.md`
**Title:** WinLine Objektmodelle — Objektmodell WinLine Edition 2024 - Version 12.24
**Publisher:** mesonic © 03/2023
**Language:** German
**Pages:** ~96 (6,256 lines)

## What This Document Is

The official German-language API reference for the WinLine Object Model, v12.24 — the most current version available. This document is the primary reference for CWL VBScript development on WinLine ERP systems, covering all built-in objects, classes, events, constants, and practical tips. It supersedes the English v10.5 reference for anything added after v10.5.

## Document Structure

| Section | Content |
|---------|---------|
| §1 Objekthierarchie | Complete object tree |
| §2 Objekte | Built-in objects table |
| §3 MacroCommands | Macro processing object overview |
| §4 Verwendung von Modulen | `$IMPORT` keyword for script modules (NEW in this version) |
| §5 Beschreibung der Objektmodelle | 9 core built-in objects |
| §6 Klassen | 13 classes derived from CWLStart |
| §7 Konstanten | 10 constant groups (adds CWLGridColumnFlags) |
| §8 Tipps und Tricks | Practical guidance for development |

## Notable New Features vs English v10.5

### New Objects/Properties on CWLStart
- `CurrentUser` — `ICWLUser*` pointer to the current user object
- `InvoicingModule` — `ICWLInvoicingModule*` for invoicing module access
- `MacroCommands` — property accessor for MacroCommands object
- `SessionType` — 0=CWL, 1=EWL, 2=MWL, 3=WebService
- `WebserviceResult` — for scripts called from WebServices

### New Event on CWLStart
- `OnContextmenu(AppNr, WindowId, FgId, MenuText, MenuId, bResult)` — fires for each context menu item; set `bResult.value = false` to grey out the item

### New Events on CWLCurrentWindow (12 additional vs v10.5)
- `OnBeforeCheck` — fires before field validation (can redirect focus)
- `OnGridNewUserLine` — fires when entering the empty row after the last grid row
- `OnGridCheckBox` — fires on checkbox click in grid cells
- `OnGridDrillDown` — fires on drill-down click in grid cells
- `OnCmbSelChange` — fires on combo selection change without leaving the field
- `OnGridCmbSelChange` — fires on combo selection change in a grid cell
- `OnGridAllowEdit` — fires for each grid cell before it becomes editable (return false = read-only)
- `OnUserEvent` — custom event fired by `SendWindowEvent`; enables window-to-window communication
- `OnAfterEvent` — extended EventType list (adds Combobox=81, ChangeLine=27, NewLine=29, CellChange=21, GridCombo=82, TreeDblClick=96, TreeSelChange=98, TreeDelete=97, WindowStartup=1)

### New on CWLWindowVars
- `Locked(nView, nVar)` — read/write; lock variables so they display as `*****` in forms
- `CreateVar` gains `bOverwriteExisting` parameter (6th parameter)

### New on CWLSearchResult
- `RowCount` — total count of records in result
- `CopyResultsToWindow(WindowId, View)` — bulk copy result into window variables

### New on GeneralScriptFuncs
- `Convert(Input, ConvertTo)` — Base64 encode (0), decode (1), RTF-to-plain-text (2)
- `MsgWin(Title, bMitAbbruchButton)` — progress window during long loops
- `MsgWinSetText(Text1, Text2)` — update progress window text; returns FALSE if user pressed abort
- `MsgWinDestroy()` — close progress window

### New on CWLModule
- `Number` property — module number (same as CWLApplicationNr values)
- `SendWindowEvent(WinId, EventType, Data[, bPostMessage])` — send custom event to another window; enables window-to-window communication without global variables

### New on CwlWindow
- `CreateReport(Type, Name, left, top, width, height, Description, SpoolfileName)` — create a CwlReport object for custom output
- `CloseReport(Report)` — close a report
- `SetShowLevel(VonLevel, BisLevel, setzen)` — show/hide UI levels
- `CallWindowOnClose(AppId, WindowId)` — register a window to open after current window closes

### New on CwlFgControl
- `Active` property — read/write enabled/disabled state of controls
- `AddToSplitter(SplitterId, bResize, bTopLeft)` — attach control to a splitter for resize behavior
- `Text` property is now read/write (not just read) — for combo boxes: can set entries as semicolon-separated list

### New on CWLGrid (vs v10.5 CWLGrid)
- `SelectedLines` — get/set selected rows (array)
- `SetFooterColumn(...)` — define footer output for a column
- `SetDecimalPlaces(line, col, places)` — change decimal places for numeric cells
- `SetCellValue(line, col, Value)` — set a value in user-defined column cells
- `SetDrillDown(line, col, DrillDown)` — set drill-down behavior for cells
- `GetDrillDown(line, col)` — query drill-down value
- `Clear(Where)` — clear header (1001), body (1002), footer (1003), or all (1004)
- `UpdateVars(line, logColumn)` — copy grid cell value to the associated program variable

### New Constant Group
- `CWLGridColumnFlags` — named constants for `AddFlags` parameter: SORTFLAG=1, HIDEFLAG=4, READONLYFLAG=8, MOVEFLAG=16, SIZEFLAG=32, INVISIBLEFLAG=64, COMPANYYEARFLAG=256

### New CWLUser Object (via `CWLStart.CurrentUser`)
Read-only properties: Name, Number, OrigNumber, Priority, Group, Demo, Company, Type, CWLUserNo, Account, Employee, Salesman, WEBCompany, UserLocked, Language, WTRecord, Customer, GUID, GUID2, PasswordExpiresOn, PasswordExpiresInDays, LastActivity, LongName, SMTPAdress, Registered

### $IMPORT Keyword (Section 4)
Scripts can import other system scripts using:
```vbscript
'(Deklarationen)
' $IMPORT:LIB1,LIB2
'Ende von (Deklarationen)
```
- Only works in window scripts and system scripts (ignored in macros)
- Events in imported scripts are not executed
- Imported scripts act as function libraries

### Tips & Tricks (Section 8)
1. **Runtime-license editing**: CTRL+SHIFT+Edit button, or `mesonic.ini [MDPLicense] AllowEditForRuntimeOnly=1`
2. **External COM access**: `createobject("cwlstart.application")` from external VBScript
3. **Macro parameters**: Use `MParameters` in the called macro; custom params start at index 20
4. **Right-click control**: `OnContextmenu` event with menu IDs (e.g., 14709 = Table Export, 14325 = Show/Hide Columns)

## Key SQL Query Patterns (from examples)

```vbscript
' Open a company table
Set conn = CWLStart.CurrentCompany.Connection
Set result = conn.Select("SELECT * FROM T024 (NOLOCK) WHERE MESOCOMP = '~~~~' AND MESOYEAR = yyyy")

' Search for a single record
Set result = CWLStart.CurrentCompany.SearchRecord("T024", "C002 = '10001' AND MESOCOMP = '~~~~' AND MESOYEAR = yyyy")
If result < 0 Then MsgBox "Not found"

' Open a table for CRUD
Set table = conn.OpenTable2(699, 900) ' table T699, window 900
table.Get "key_value"
table.Value(1) = "new_value"
table.Update
```

## Related Wiki Pages

- [[WinLine CWL Object Model]] — synthesized overview of both versions
- [[WinLine CWLCurrentWindow]] — deep-dive on the event interface object
- [[WinLine CWL MacroCommands]] — the macro processing object
- [[WinLine FAKT Formeln]] — FAKT formula scripts using this API
- [[Mesonic WinLine]] — parent ERP entity
- Source (EN): [[winline-cwl-object-model-en]] — English v10.5 reference
