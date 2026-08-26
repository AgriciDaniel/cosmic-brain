---
address: c-000253
title: "WinLine MDP Workshop — Example Documentation (Framas)"
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

# WinLine MDP Workshop — Example Documentation (Framas)

**Source type:** Step-by-step workshop documentation (4 parts)
**Event:** MDP II Online Seminar, mesonic 2020 (Framas-specific)
**Author:** mesonic
**Coverage:** Ten complete worked examples from the online seminar — all window settings, menu configurations, database steps, and CTK window scripts

---

## What This Document Is

This is the detailed, practitioner-level companion to the [[WinLine MDP Module]] workshop slides. Where the slides present concepts and summarize procedures, these example docs provide exact field values, property assignments, and complete VBScript code for every example demonstrated live during the June 2020 seminar hosted for Framas.

Each of the ten examples is self-contained and documents:
- CWLCTK window setup steps (controls, properties, macro name assignments)
- WinLine Admin database steps (Append Tables)
- CTK window script code (full Sub declarations)

---

## Examples Covered

### Part 1: New Windows and Database Basics

**Example 1.1 — Create New User-Defined Window (MESO900)**
- Created in CWLCTK for module area MESO, user group Management, window number 900
- Controls: edit field (var=0000), checkbox (var=0001), combo box (var=0002), button (IDINFO icon)
- OK and EXIT buttons require "Macro Events" checkbox to fire script events
- Four access methods: External Programs macro, new menu item (MAIN/Parameters), Cockpit, or from another CTK script (MAIN76 → General Settings)
- Script MESO900: `OnScriptStart` populates combo box; `OnCheckUserField` validates edit field (blocks exit if empty via `bResult.Value = False`); `OnPushButton` handles button clicks

**Example 1.2 — New Field in AR/AP Account Base Info (T051)**
- Added column "Province" (String, 50 chars) to T051 via WinLine Admin → Append Tables
- Copied window MESO086 to user group Management in CWLCTK
- Added edit field: View=051, Var=0500 Province
- No CTK script needed — data saves/loads automatically

**Example 1.3 — New Field in Sales Rep Base Info (T034)**
- Added column "Province" (String, 50 chars) to T034; auto-named U000 in the table, maps to var 0500
- Copied window FAKT015 to user group Management; added combo box (View=034, Var=0500)
- Script FAKT015: `OnScriptStart` populates province list; `OnUpdateTable` and `OnInsertTable` write selected value back: `Cwlstart.Currentwindow.Vars.Value(34,500) = Cwlstart.Currentwindow.Controls.Item(800).Screencontents`

**Example 1.4 — Add New User-Defined Table (CompanyCarBaseInfo)**
- Created via WinLine Admin → Append Tables, table "new entry"
- Columns: Employee number (String 50, Unique Index), License plate (String 20, NULL), Auto brand (String 50, NULL), Acquisition date (Date, NULL)
- Table numbers 650–700 are reserved for user-defined tables

---

### Part 2: Grid Modifications

**Example 1.5 — Add New Column to Grid in "Short Texts" (MAIN021)**
- Copied window MAIN021 to user group Management; set Macro Events on grid control ID 100; added "Export to EXCEL" button (IDSUMMEN icon)
- Script `OnScriptStart`: adds combo box column using `myGrid.AddColumn`, colors it blue (`RGB(177,200,233)`), moves to first position
- `OnGridCheckUserColumn`: fires when user changes selection in the combo column
- `OnPushButton`: exports grid to XLS via `myGrid.ExportasXLS CWLStart.WorkPath & "Short texts.xlsx"`

**Example 1.6 — Modifications to Voucher Entry Grid (FAKT245/FAKT248/FAKT249)**
- Added "Packingnumber" column to T025 (order header); added "ProductText", "Urgency", "Length" to T026 (order center)
- Three FAKT windows copied and configured; new fields connected via window variables 025/0500, 26/500, 26/501, 26/502
- Script FAKT245 `OnWindowOpen`: inserts three new grid columns (text, combo box with urgency levels, numeric length) using `AddColumn` — note parameters are case-sensitive
- Script FAKT248 `OnPushButton`: clears packing number variable when EXIT pressed so field resets for next entry

---

### Part 3: Reports and Database Connections

**Example 1.7 — Print Grid Contents to New WinLine Report**
- Added "Print Grid" menu button (IDDRUCKEN type) to MAIN021 for user group Management
- Created new report form P99WSHORTTEXTS in CWLPDFE: 6-line header, variables 495/0–495/2 in middle section
- Script `OnDynamicMenuCommand`: iterates grid rows, sets vars, calls `Report.Header`/`Report.Middle`/`Report.Footer`; handles page breaks
- `CWLReport_OnCancel` handler needed so report preview can be closed independently

**Example 1.8 — Get Company Name via CWLDbConnection**
- System script "CompanyName" using `CWLStart.CurrentCompany.Connection`
- Runs `conn.Select("Select * from T001 (NOLOCK) where mesocomp='~~~~' and mesoyear=yyyy")`
- Reads result with `result.value("c000")`

**Example 1.9 — Display Last 20 Journal Lines from T028**
- New window "Last 20 Journal Lines" in CWLCTK (ACC1 context); sizeable; user-defined grid control ID 800
- Script FIBU900: opens T028 via `conn.OpenTable2(28,900,"MESOKEY")`; calls `grid.initUserGrid`; adds columns for Date, Debit, Credit, Amount, Text; selects top 20 records ordered by MESOKEY DESC
- `initUserGrid`, `Header`, and `AddLine` are only available for user-defined grid controls (not standard grids)

---

### Part 4: Company Car Manager (Full Application Example)

**Example 1.10 — Company Car Manager Window (MAIN901)**
- Full end-to-end example: new window + user-defined table T699 + employee table T401 + report
- Window MAIN901: sizeable, grid control ID 800 with chooseable/sortable/filterable/groupable columns, OUTPUT button (menu type, IDDRUCKEN), Save button (IDSAVE toolbar type)
- Report P99WCOMPANYCARS: header with employee name/date/user/page, middle with T699 columns + drill-down links to Employees
- Script "CompanyCars":
  - `CWLCurrentModule_OnWindowOpen`: opens T699 and T401, calls `grid.initUserGrid`, populates grid from T699 joined to T401
  - `OnGridNewUserLine`: fires on new grid row entry
  - `OnPushButton` (Save): iterates grid rows, calls `tCC.update` for each
  - `CWLCurrentModule_OnWindowClose`: closes table connections cleanly
  - `OnDynamicMenuCommand` (Output): creates report, iterates grid rows, handles page breaks, supports drill-down via `OnDrilldown` and `OnPrintDrillDownItem`

---

## Key Scripting Patterns

| Pattern | Code Reference |
|---|---|
| Populate combo box in `OnScriptStart` | `Windows.Item(n).Controls.Item(m).Text = "val1;val2"` |
| Block field exit | `bResult.Value = False` in `OnCheckUserField` |
| Write user-defined column on save | `Cwlstart.Currentwindow.Vars.Value(table,var) = ...` |
| Export grid to Excel | `myGrid.ExportasXLS CWLStart.WorkPath & "filename.xlsx"` |
| Open database table (mesonic format) | `conn.OpenTable2(tableNum, windowId, "KeyColumn")` |
| Initialize user-defined grid | `grid.initUserGrid` then `grid.Header` then loop `grid.AddLine` |

> [!note] Tab Order
> Tab order of controls can be adjusted in CWLCTK via Edit/Input-Order. New controls are automatically appended to the end of the tab order.

> [!note] Window Numbering
> User-defined window numbers start at 900. Module-specific windows take precedence over MESO module windows of the same number.

---

## Related Pages

- [[WinLine MDP Module]] — framework overview
- [[WinLine CWLCTK]] — GUI tool used throughout these examples
- [[WinLine User-Defined Windows]] — window creation concepts
- [[WinLine MDP Database Extensions]] — T051, T034, T699 database work
- [[winline-mdp-workshop-slides]] — corresponding slide presentation
