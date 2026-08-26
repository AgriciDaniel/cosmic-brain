---
address: c-000267
title: "WinLine CWL Object Model"
tags:
  - concept
  - winline
  - cwl
  - scripting
created: 2026-06-22
status: current
related:
  - "[[Mesonic WinLine]]"
  - "[[WinLine CWLCurrentWindow]]"
  - "[[WinLine CWL MacroCommands]]"
  - "[[WinLine FAKT Formeln]]"
---

# WinLine CWL Object Model

The CWL (Corporate WinLine Language) Object Model is the VBScript-based scripting API for the Mesonic WinLine ERP. It provides a hierarchy of objects for controlling the application, reading/writing window variables, handling UI events, querying the database, and generating custom reports.

**Sources:**
- EN v10.5: [[winline-cwl-object-model-en]] (MESONIC 2020)
- DE v12.24: [[winline-cwl-object-model-de]] (mesonic 2023/2024)

---

## Object Hierarchy

```
CWLStart  (root; default object in System/CTK macros)
├── CurrentCompany → CWLCompany
│   └── Connection → CWLDbConnection
│       ├── Select() → CWLSearchResult
│       ├── OpenTable() → CWLTable
│       └── OpenTable2() → CWLTable
├── CurrentModule → CWLModule
│   ├── CurrentWindow → CWLWindow
│   └── Windows → CWLWinCollection
│       └── Item/NamedItem/IndexedItem → CWLWindow
│
CWLWindow (aka CwlWindow)
├── Vars → CWLWindowVars
└── Controls → CwlFgCollection
    └── Item/IndexedItem → CwlFgControl
        ├── Preview → CwlPreview
        │   └── Page() → CwlPreviewPage
        │       └── Item() → CwlPreviewPageItem
        ├── SpreadSheet → CwlSpreadSheet
        └── Grid → CWLGrid

Standalone objects (in scope in CTK/System/etc. scripts):
  CWLCurrentModule  → ActiveModule (CWLModule)
  CWLCurrentWindow  → ActiveWindow (CWLWindow)
  CWLScript
  MacroCommands / CWLMacro / FormDriver
  CWLEventResult
  CWLSearchResult
  GeneralScriptFuncs
  CWLTable
  CWLReport
  UserForm
  LOHNFormel / FAKTFormel
```

---

## Object Reference

### Built-in Objects (always in scope)

| Object | Available In | Purpose |
|--------|-------------|---------|
| `CWLStart` | System, CTK | Root application controller. **Default object** — properties/methods callable without prefix |
| `CWLCurrentModule` | CTK only | Event interface for the currently active module |
| `CWLCurrentWindow` | CTK only | Event interface for the currently active window (most important for UI scripting) |
| `CWLScript` | System, CTK, Payroll, FAKT | Represents the current script; control Show/Hide/Stop |
| `MacroCommands` / `CWLMacro` | All scripts | Macro processing; also available in Macro Recorder |
| `FormDriver` | Internal | Used only internally |
| `UserForm` | CTK, System, Payroll | Represents the UserForm |
| `CWLWindowVars` | System, CTK | Access window variables |
| `CWLEventResult` | System, CTK | Return values for result-bearing events |
| `CWLSearchResult` | System, CTK | SQL query results |
| `GeneralScriptFuncs` | Everywhere | MsgBox, InputBox, FileDialog, Convert, WaitCursor, progress window |
| `CWLTable` | System, CTK | Opened database table (CRUD operations) |
| `CWLReport` | System, CTK | Custom report output object |
| `LOHNFormel` / `FAKTFormel` | Payroll/FAKT | Formula-specific built-ins |

### Classes (instantiated from CWLStart or other objects)

| Class | Accessed Via | Purpose |
|-------|-------------|---------|
| `CWLCompany` | `CWLStart.CurrentCompany` | Current company: data, SQL search, table update |
| `CWLDbConnection` | `CWLCompany.Connection` or `CWLStart.Connection(n)` | Database connection; SELECT, OpenTable, ExecuteSQL |
| `CWLModule` | `CWLStart.CurrentModule` or `CWLStart.Module(nr)` | WinLine module (FAKT, FIBU, etc.) |
| `CWLWinCollection` | `CWLModule.Windows` | All loaded windows in a module |
| `CwlWindow` | `.Windows.Item(id)` or `CurrentWindow` | A WinLine window; Vars, Controls, Close, Refresh |
| `CwlFgCollection` | `CwlWindow.Controls` | All UI controls in a window |
| `CwlFgControl` | `.Controls.Item(id)` | A single UI element (edit, button, grid, etc.) |
| `CwlPreview` | `CwlFgControl.Preview` | Print preview control |
| `CwlPreviewPage` | `CwlPreview.Page(n)` | Individual preview page |
| `CwlPreviewPageItem` | `CwlPreviewPage.Item(n)` | Individual preview element |
| `CwlSpreadSheet` | `CwlFgControl.SpreadSheet` | Spreadsheet control |
| `CWLGrid` | `CwlFgControl.Grid` | Screen table/grid control |
| `CWLReport` | `CwlWindow.CreateReport(...)` | Custom report output |

---

## How to Access Objects in Scripts

### Navigation pattern
```vbscript
' Get current window (CTK scripts)
Set myWin = CWLCurrentWindow.ActiveWindow

' Get a specific module's window by ID
Set myWin = CWLStart.Module(cwlFAKT).Windows.Item(245)

' Get a control by ID from a window
Set myCtrl = myWin.Controls.Item(101)

' Read/write a window variable
myWin.Vars.Value(1, 4)        ' Table 1 (T001), column 4
myWin.Vars.Value(0, 20)       ' nView=0, nVar=20 (window-specific)

' Execute SQL
Set conn = CWLStart.CurrentCompany.Connection
Set result = conn.Select("SELECT * FROM T024 (NOLOCK) WHERE MESOCOMP='~~~~' AND MESOYEAR=yyyy")
general.MsgBox result.Value("C000")

' CRUD on a table
Set tbl = conn.OpenTable2(24, 900)   ' T024
tbl.Get "10001~~~~" & yyyy           ' key lookup
tbl.Value("C003") = "New Name"
tbl.Update
```

### Common variable nViews (universal)

| nView=0, nVar | Meaning |
|--------------|---------|
| 11 | Company number |
| 12 | Path |
| 13 | Company name |
| 14 | User name |
| 15 | Version |
| 16 | Reporting date |
| 17 | Email address |
| 18 | Database version |
| 20+ | Window-specific |
| 500+ | User-defined columns (U000 = 500) |

### SQL placeholders
- `~~~~` → current company code (e.g., `300M`)
- `yyyy` → current fiscal year (numeric internal format)

---

## Script Types and Object Availability

| Script Type | CWLStart | CWLCurrentWindow | CWLCurrentModule | MacroCommands |
|-------------|----------|-----------------|-----------------|---------------|
| System Macro | Yes | No | No | Yes |
| CTK Macro | Yes | Yes | Yes | Yes |
| Payroll (LOHN) | No | No | No | Yes |
| FAKT Formula | Yes (v12.24) | No | No | Yes |
| Macro Recorder | No | No | No | Yes |

> [!note] In v12.24, `CWLStart` was added to CRM-Scripts and FAKT-Formeln (not in v10.5).

---

## Constants Reference

### CWLApplicationNr — Module IDs

| Name | Value |
|------|-------|
| cwlMAIN | 0 |
| cwlFIBU | 1 |
| cwlFAKT | 2 |
| cwlLOHN A | 3 |
| cwlLIST | 4 |
| cwlKORE | 5 |
| cwlANBU | 6 |
| cwlINFO | 11 |
| cwlLOHN D | 18 |
| cwlPROD | 20 |

### CWLControlTypes — Control Type Values

| Name | Value | VarType |
|------|-------|---------|
| cwlControlEditString | 1 | 8 (string) |
| cwlControlEditInteger | 2 | 3 |
| cwlControlEditFloat | 3 | 5 |
| cwlControlEditDouble | 4 | 5 |
| cwlControlEditUppercase | 5 | 8 |
| cwlControlEditDate | 6 | 7 |
| cwlControlEditMultiline | 7 | 8 |
| cwlControlEditPassword | 8 | — |
| cwlControlEditTimespan | 9 | 3 |
| cwlControlButton | 11 | — |
| cwlControlCheckbox | 12 | 8 ("1"=on,"0"=off) |
| cwlControlRadioButton | 13 | 8 |
| cwlControlListbox | 15 | — |
| cwlControlTree | 18 | — |
| cwlControlStaticString … cwlControlFrame | 21-30 | — |
| cwlControlCombobox | 31 | — |
| cwlControlGrid | 35 | — |
| cwlControlPreview | 36 | — |
| cwlControlSpreadsheet | 37 | — |

### CWLScriptWindowType — Script Window Modes

| Name | Value | Behavior |
|------|-------|---------|
| cwlScriptWindowStandard | 0 | Hidden at module change |
| cwlScriptWindowModal | 1 | Modal; blocks rest of app |
| cwlScriptWindowSystem | 2 | Always on top; not hidden; no internal ID |

---

## Version Differences: v10.5 (EN) vs v12.24 (DE)

> [!note] v12.24 is the current version. Use the German doc for the most complete reference.

| Area | v10.5 (EN) | v12.24 (DE) added |
|------|-----------|-------------------|
| CWLStart properties | Core set | `CurrentUser`, `InvoicingModule`, `MacroCommands`, `SessionType`, `WebserviceResult` |
| CWLStart events | 9 events | `OnContextmenu` |
| CWLStart availability | System, CTK | Also CRM-Scripts, FAKT-Formeln |
| CWLCurrentWindow events | 14 events | 8 more: `OnBeforeCheck`, `OnGridNewUserLine`, `OnGridCheckBox`, `OnGridDrillDown`, `OnCmbSelChange`, `OnGridCmbSelChange`, `OnGridAllowEdit`, `OnUserEvent` |
| CWLWindowVars | 2 properties, 1 method | `Locked` property; `CreateVar` gets `bOverwriteExisting` param |
| CWLSearchResult | 4 props, 2 methods | `RowCount` prop, `CopyResultsToWindow` method |
| GeneralScriptFuncs | 3 methods | `Convert`, `MsgWin`, `MsgWinSetText`, `MsgWinDestroy` |
| CWLModule | 2 props, 2 methods | `Number` property, `SendWindowEvent` method |
| CwlWindow | 3 methods | `CreateReport`, `CloseReport`, `SetShowLevel`, `CallWindowOnClose` |
| CwlFgControl | — | `Active` property, `AddToSplitter` method, `Text` is R/W |
| CWLGrid | Core set | `SelectedLines`, `SetFooterColumn`, `SetDecimalPlaces`, `SetCellValue`, `SetDrillDown`, `GetDrillDown`, `Clear`, `UpdateVars` |
| CWLCompany | Core set | `ModifiedVars` property, `Property(...)` method |
| CWLDbConnection | — | Note about Stored Procedures with SET NOCOUNT ON |
| Constants | 9 groups | `CWLGridColumnFlags` group added |
| Script modules | Not present | `$IMPORT` keyword |
| CWLUser | Not present | New object via `CWLStart.CurrentUser` (25 properties) |

---

## Related Pages

- [[WinLine CWLCurrentWindow]] — detailed documentation of the most-used scripting object
- [[WinLine CWL MacroCommands]] — macro processing object documentation
- [[WinLine FAKT Formeln]] — FAKT invoice formula scripting using this API
- [[Mesonic WinLine]] — parent ERP entity
- Source EN: [[winline-cwl-object-model-en]]
- Source DE: [[winline-cwl-object-model-de]]
