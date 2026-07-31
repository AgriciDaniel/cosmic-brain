---
address: c-000255
title: "WinLine MDP Module"
tags:
  - concept
  - winline
  - mdp
created: 2026-06-22
status: current
related:
  - "[[Mesonic WinLine]]"
  - "[[WinLine CWLCTK]]"
  - "[[WinLine User-Defined Windows]]"
  - "[[WinLine MDP Database Extensions]]"
---

# WinLine MDP Module

**MDP** = Modification Development Platform. WinLine's built-in customization and extension framework that allows partners and customers to add custom windows, database columns, grid modifications, menu items, and programmatic logic without modifying the core ERP installation.

---

## What MDP Enables

MDP provides four categories of customization:

| Category | What You Can Do |
|---|---|
| **User-Defined Windows** | Create entirely new WinLine-native entry windows with controls (edit fields, combo boxes, checkboxes, buttons, grids) |
| **Window Modifications** | Copy and modify existing WinLine standard windows for specific user groups — add fields, buttons, grid columns |
| **Database Extensions** | Add user-defined columns to existing mesonic tables (T051, T034, T025…) or create entirely new user-defined tables (T650–T699) |
| **CTK Window Scripts** | Attach VBScript-based scripts to windows for validation, population, event handling, database access, and reporting |

---

## Architecture Overview

```
CWLCTK (GUI Designer)
  └── Windows (per module + user group)
        ├── Standard windows (copied + customized)
        └── New user-defined windows (900+)
              └── Macro Name → CTK Window Script
                    ├── CWLScript events (OnScriptStart)
                    ├── CWLCurrentWindow events (OnPushButton, OnCheckUserField, OnGridCheckUserColumn)
                    ├── CWLCurrentModule events (OnWindowOpen, OnWindowClose)
                    ├── CWLCompany events (OnUpdateTable, OnInsertTable, OnDeleteTable)
                    └── CWLReport events (OnCancel, OnDrilldown, OnPrintDrilldownItem)

WinLine Admin → Append Tables
  ├── Add columns to existing tables (T051, T034, T025, T026…)
  └── Create new user-defined tables (T650–T699)

CWLPDFE (Report Designer)
  └── New report forms (P99W* naming convention)
```

---

## User Groups and Module Areas

All MDP customizations are scoped to **user groups** (e.g., "Management"). Windows copied or created for a user group are only seen by users in that group.

**Module areas** determine window precedence:
- MESO is the fallback module — a MESO window (e.g., MESO900) is visible across all modules
- A same-numbered window in a specific module (e.g., MAIN900) takes precedence over MESO900 when opened from that module
- This allows one generic window (MESO900) with module-specific overrides

---

## CTK Window Scripts

Scripts are VBScript-based and created in WinLine START → Parameters/Program Macros/Window Script. A script is attached to a window by entering the script name in the window's "Macro Name" field in CWLCTK.

### Core Event Objects and Their Events

**CWLScript** (fires at script level):
- `OnScriptStart` — fires when the window opens; ideal for populating combo boxes, initializing grids

**CWLCurrentWindow** (fires for window interactions):
- `OnPushButton(nFgId, bResult)` — fires for button clicks; nFgId identifies the control; OK=98, EXIT=99
- `OnCheckUserField(nFgId, bResult)` — fires when a field is exited; set `bResult.Value = False` to block exit
- `OnGridCheckUserColumn(nFgId, nRow, nColumn, bResult)` — fires when a user-inserted grid column cell is exited
- `OnDynamicMenuCommand(nFgId, MenuIndex, bResult)` — fires for menu-type button selections (e.g., print options)
- `OnGridNewUserLine(nFgId, nRow, nColumn, bResult)` — fires when a new row is entered in a user-defined grid

**CWLCurrentModule** (fires at module level):
- `OnWindowOpen(WindowId)` — fires when any window in the module opens; filter by WindowId
- `OnWindowClose(WindowId)` — fires when a window closes; use to clean up table connections

**CWLCompany** (fires for database table events on appended tables):
- `OnUpdateTable(TableNo)` — existing record updated; use to write user-defined column values
- `OnInsertTable(TableNo)` — new record inserted
- `OnDeleteTable(TableNo, Key, WhereStmt)` — record deleted

**CWLReport** (fires for report interactions):
- `OnCancel(ReportId, MayClose)` — report preview closed; set `MayClose.value = True`
- `OnDrilldown(ReportId, DrillDownText, Text)` — drill-down link clicked
- `OnPrintDrilldownItem(ReportId, DrillDownText, View, Var, ItemText)` — customize drill-down text

---

## Key Scripting Objects and Accessors

| Object | How to Access |
|---|---|
| Current window | `CWLStart.CurrentModule.Windows.Item(windowId)` |
| Window variables | `CWLStart.CurrentWindow.Vars.Value(tableNo, varNo)` |
| Control screen content | `CWLCurrentWindow.ActiveWindow.CurrentControl.ScreenContents` |
| Control by ID | `window.Controls.Item(controlId)` |
| Grid | `window.Controls.Item(controlId).Grid` |
| Database connection | `CWLStart.CurrentCompany.Connection` |
| Company number | `CWLStart.CurrentCompany.Nr` |
| Fiscal year | `CWLStart.CurrentCompany.CompanyYear` |
| Work path | `CWLStart.WorkPath` |

---

## Combo Box Population Format

Combo boxes (standalone controls and grid columns) are populated differently:

**In a window control:**
```vbscript
' Format: "listItemNumber:displayText;..."
Windows.Item(900).Controls.Item(798).Text = "0:Option 1;1:Option 2;2:Option 3"
```

**In a grid combo column:**
```vbscript
' Format: "value" & Chr(9) & "displayText" & Chr(13) & Chr(10) per entry
combostring = "0" & Chr(9) & "low" & Chr(13) & Chr(10)
combostring = combostring & "1" & Chr(9) & "medium" & Chr(13) & Chr(10)
myGrid.SetComboStrings myColumnNumber, combostring
```

---

## MDP vs. Standard WinLine Customization

| Approach | Use Case |
|---|---|
| MDP User-Defined Windows | Entirely new data entry/display forms |
| MDP Window Copies | Modifying existing forms for specific user groups |
| MDP Append Tables | Adding fields to standard WinLine data records |
| MDP User-Defined Tables | New entities not covered by standard WinLine |
| Standard WinLine Formulas (FAKT) | Simple field calculations during voucher entry — see [[WinLine FAKT Formeln]] |

> [!note] MDP vs FAKT Formulas
> FAKT formulas (Belegformeln) are lighter-weight hooks that run inside the invoicing module. MDP scripts are more powerful — they can open arbitrary windows, access any database table, generate reports, and fire on a much wider range of events. They are not mutually exclusive.

---

## Sources

- [[winline-mdp-workshop-example-docs]] — 10 worked examples from the Framas 2020 MDP II seminar
- [[winline-mdp-workshop-slides]] — mesonic International slide deck (Stephen Griffith, June 2020)
