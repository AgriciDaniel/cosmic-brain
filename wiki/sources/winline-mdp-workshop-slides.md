---
address: c-000254
title: "WinLine MDP Training Workshop — Slides (mesonic International)"
tags:
  - source
  - winline
  - mdp
created: 2026-06-22
status: current
related:
  - "[[Mesonic WinLine]]"
  - "[[WinLine MDP Module]]"
  - "[[WinLine CWLCTK]]"
  - "[[WinLine User-Defined Windows]]"
  - "[[WinLine MDP Database Extensions]]"
---

# WinLine MDP Training Workshop — Slides (mesonic International)

**Source type:** Slide deck (4 parts, presentation format)
**Event:** MDP Training Workshop, June 2020
**Author:** Stephen Griffith, mesonic International
**Coverage:** Conceptual overview of all MDP II capabilities with API reference slides for CWLGrid, CWLReport, CWLDbConnection, CWLTable classes

---

## What This Document Is

Slide-format presentation used by Stephen Griffith (mesonic International) during the June 2020 MDP Training Workshop. Covers the same ground as the [[winline-mdp-workshop-example-docs|Example Documentation]] but at a higher level of abstraction — emphasizing the "what" and "why" before the "how." Includes formal API references for the four main classes introduced in MDP II.

---

## Part 1: New Windows and Database Modifications

### User-Defined WinLine Windows

The slide deck explains that user-defined windows replace the old MS UserForms + VBScript approach. New windows are "real" WinLine windows (native look and feel), created in CWLCTK per user group.

Key points:
- OK and Exit buttons do **not** send events by default — must enable "Macro Events" option explicitly
- Two primary event handlers for windows: `OnPushButton` and `OnCheckUserField`
- To read field contents in any other handler: `Cwlcurrentwindow.Activewindow.Currentcontrol.Screencontents`
- Supported control types: Edit, Background text, Static, Group box, Combobox, Checkbox, Button, Grid control, Internet Explorer, Bitmap

Ways to open a user-defined window:
- From a script: `Cwlstart.Currentmodule.Windows.Add(window number)`
- From a macro: `Cwlmacro.Mwindow 900, false`
- New menu item in CWLCTK
- From Favorites panel
- As an "External" application macro
- From the Cockpit

### New Database Table Columns

Key points from slides:
- New columns added via System/Append Tables in WinLine Admin — valid for **all companies** in the database
- Column name is user-defined; column number assigned automatically starting with "U" (U000, U001…)
- Variable numbers for user-defined columns start at **500**
- Backup/restore via WinLine ADMIN functions handles user-defined columns
- For many windows, loading/saving user-defined columns is **automatic** — no CTK script required
- CWLCompany class events for table-appended columns: `OnUpdateTable`, `OnInsertTable`, `OnDeleteTable`

### New Database Tables (User-Defined)

- Created in WinLine Admin → Append Tables
- Table numbers 650–700 are reserved for user-defined tables
- Table name is user-defined; table number auto-suggested
- CRUD operations performed via CTK window scripts and CWLTable class methods

---

## Part 2: User-Defined Grids

### CWLGrid Class Overview

Full API reference for the grid manipulation class:

**Properties:**
- `Contents` — value of the current cell
- `LineCount` — number of rows
- `ColumnCount` — number of columns
- `IsRedraw` — toggle immediate screen refresh (set False before batch changes, True after)

**Key Methods:**
- `AddColumn(ColumnTitle, ColumnControl, align, Type, Font, View, Var, ColWidth, [AddFlags], [ColumnColor], [Redraw])` — adds column; max 199 columns per grid
- `RemoveColumn(col)` — removes user-defined columns only (standard columns cannot be removed)
- `MoveColumn(col, Position)` — reorders column display position
- `SetColumnColor(col, RGB color)` / `GetColumnColor(col)`
- `SetColumnWidth(col, Width)` / `GetColumnWidth(col)`
- `SetComboStrings(col, theStrings)` — sets combo box options for a column
- `ExportAsXLS(NameAndPath)` — exports grid to Excel
- `SetCurrentCell(row, col)` / `GetCurrentCell(*row, *col)`
- `GetCellValue(row, col)` — reads cell value
- `SetColumnReadOnly(col, bSet, bRedraw)` / `GetColumnReadOnly(col)`
- `GetLogColumn(ColumnOnScreen)` / `GetPhysColumn(col)` — logical/physical column mapping
- `IsUserColumn(logColumn)` — checks if column was inserted by script
- `SetColumnTitle(line, col, Text)` — change column header text (works on standard columns too)
- `Validate` — triggers validation check (same as `OnGridCheckUserColumn`)
- `Refresh` — forces screen redraw

**User-defined grid only methods:**
- `Header()` — outputs grid header with column names
- `Footer()`
- `AddLine()` — inserts new row at end
- `RemoveLine(Row)` / `InsertLine(Row)` / `ReplaceLine(Row)`
- `GetLineValues(Row)` — copies column values into associated window variables
- `InitUserGrid()` — initializes grid and binds window variables

**Grid Events:**
- `OnGridCheckUserColumn(nFgId, nRow, nColumn, bResult)` — fires when user exits a combo/edit cell in a user-inserted column
- `OnAfterEvent(nFgId, EventType, Originalresult)` — new line in table (EventType=29), switch to cell (EventType=21)

### AddColumn ColumnControl Parameter Format

The `ColumnControl` parameter string defines the control type and properties:
- `"T1,Z10,L1,Myentryfield"` — text entry (T1), 10 chars wide, max 1 row
- `"T2,Z5,Myentryfield"` — integer entry
- `"T3,Z15,I2,L1,Myentryfield"` — double with 2 decimal places
- `"T31,Z1,L30,H3,mycombo"` — combo box (T31)

> [!warning] Case Sensitivity
> Parameter values for the `AddColumn` method are case-sensitive.

---

## Part 3: Reports and Database Access

### CWLReport Class

Reports are generated from `CwlWindow.CreateReport()` and closed with `CloseReport()`. Output types: 1=screen, 2=printer, 4=spooler.

**New form PDI naming convention:** `P99WUSERDEFINED` — user-defined forms use this PDI.

**Key methods:** `Header(Flags)`, `Middle(Flags)`, `Footer(Flags)` — print the respective form sections. Flags control page break behavior (A=first page, B=continuation, C=last page footer).

**Report events:**
- `OnPrintDrilldownItem(ReportId, DrillDownText, View, Var, ItemText)` — fires on drill-down click
- `OnCancel(ReportId, MayClose)` — fires on STOP button or window close; set `MayClose.value = True` to allow close
- `OnDrilldown(ReportId, DrilldownText, Text)` — fires when user clicks drill-down element

**IDDRUCKEN "Menu Button":** When selected as predefined button in CWLCTK, it automatically provides screen/printer output menu options — no custom menu setup needed.

### CWLDbConnection Class

Accessed via `CWLStart.CurrentCompany.Connection`. Provides direct database access:

**Properties:** `Type` (DB type), `DatabaseName`, `ServerName`

**Methods:**
- `Select(Statement)` → `CWLSearchResult` — executes a SQL SELECT
- `OpenTable(strTableName, ViewNumber, KeyColumn, WindowId, [UseCompany])` — opens non-Txxx tables
- `OpenTable2(Number, WindowId, [KeyColumn])` — opens mesonic Txxx tables (use this for standard tables)
- `CloseTable(pTable)` — closes table and discards variables
- `ExecuteSQL(Statement)` — executes non-SELECT SQL (INSERT/UPDATE/DELETE)

### CWLTable Class

Returned by `OpenTable`/`OpenTable2`. Provides record-level access:

**Properties:** `Name`, `Valid`, `MaxColIndex`

**Methods:**
- `Value(column)` / `Value(column, newValue)` — read/write column value
- `Get(Key, [ExpandKey])` — read record by key
- `Select(whereClause)` → `CWLSearchResult` — select records
- `Update()` — update current record (user-defined tables only)
- `Insert()` — insert new record (user-defined tables only)
- `Delete(Key, [WhereStmt])` — delete record(s) (user-defined tables only)

> [!note] OpenTable2 vs OpenTable
> Use `OpenTable2` for standard mesonic tables (T028, T401, etc.) that follow the Txxx naming convention. Use `OpenTable` for tables with non-standard names.

---

## Part 4: Company Car Manager (Capstone Example)

The final workshop section demonstrates a complete mini-application that integrates all four MDP capability areas:

1. **User-defined window** (MAIN901 with sizeable grid, menu/toolbar buttons)
2. **User-defined table** (T699 Company Cars with employee number, license plate, auto brand, acquisition date)
3. **Standard table access** (T401 Employee Base Info — read via `OpenTable2`)
4. **Report** (P99WCOMPANYCARS with drill-down links from employee number to employee record)

The script demonstrates proper resource lifecycle management: open tables on `OnWindowOpen`, save on `OnPushButton`, close tables on `OnWindowClose`, generate report on `OnDynamicMenuCommand`.

A SQL INSERT script synchronizes T699 with T401 on window open (copies any employees not yet in T699):
```sql
INSERT INTO T699(U000) 
SELECT C000 FROM (T699 L RIGHT JOIN T401 R ON L.U000 = R.C000)
WHERE L.U000 IS NULL AND R.MESOCOMP = '<company>'
```

---

## Related Pages

- [[WinLine MDP Module]] — framework overview
- [[WinLine CWLCTK]] — GUI tool described in this workshop
- [[WinLine User-Defined Windows]] — window creation detail
- [[WinLine MDP Database Extensions]] — database extension detail
- [[winline-mdp-workshop-example-docs]] — step-by-step companion documentation
