---
address: c-000268
title: "WinLine CWLCurrentWindow"
tags:
  - concept
  - winline
  - cwl
  - scripting
created: 2026-06-22
status: current
related:
  - "[[Mesonic WinLine]]"
  - "[[WinLine CWL Object Model]]"
  - "[[WinLine CWL MacroCommands]]"
  - "[[WinLine FAKT Formeln]]"
---

# WinLine CWLCurrentWindow

`CWLCurrentWindow` is the primary event interface object for CTK (window) scripts in WinLine. It represents the currently active window at any given moment and provides a rich set of events for responding to user interactions with that window's controls.

**Available in:** CTK Macros (window scripts) only

---

## Overview

`CWLCurrentWindow` serves a dual purpose:
1. **Property accessor** — `CWLCurrentWindow.ActiveWindow` returns the active `CwlWindow` object, giving access to the window's variables, controls, and state
2. **Event sink** — the script attached to a CTK window receives all user interaction events through this object's event handlers

The naming convention for event handlers is:
```vbscript
Sub CWLCurrentWindow_OnPushButton(nFgId, bResult)
    ' handle button press
End Sub
```

---

## Properties

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `ActiveWindow` | `ICwlWindow*` | read only | Pointer to the currently active CwlWindow object |

---

## Events Reference

### Version Note
> [!note] Events marked **(v12.24+)** are present in the German v12.24 doc but not in the English v10.5 doc. They were added between 2020 and 2023.

### Activation Events

#### `OnActivate(int nWinId)`
Fires when the window is activated (receives focus).

```vbscript
Sub CWLCurrentWindow_OnActivate(nWinId)
    ' Window activated; nWinId = window ID
End Sub
```

#### `OnControlActivate(int nFgId)`
Fires when a control with ID `nFgId` receives focus.

```vbscript
Sub CWLCurrentWindow_OnControlActivate(nFgId)
    ' A control got focus
End Sub
```

---

### Field Validation Events

#### `OnCheck(int nFgId)`
Fires when an edit field or combo box is **exited after successful application validation**. If the application does not allow exiting the field (e.g., bad input), this event is NOT fired.

- `nFgId` — control ID

> [!tip] To read the value the user typed, use `CWLCurrentWindow.ActiveWindow.Controls.Item(nFgId).ScreenContents`. The `Contents` property still holds the previous value during this event.

#### `OnBeforeCheck(int nFgId, BSTR Contents, ICwlEventResult *bResult)` (v12.24+)
Fires when a field is exited **before** application validation.
- `Contents` — entered text in internal format (date = `dd-mm-yyyy`, float uses `.` as decimal separator)
- `bResult.Value = FALSE` — prevents leaving the field
- `bResult.Value = 112` — leaves the field without notifying the application and jumps to field 112
- `bResult.Value = TRUE` (default) — application proceeds normally

#### `OnCheckUserfield(int nFgId, ICwlEventResult *bResult)`
Fires when a user-created edit field or combo box (inserted via CTK) is exited.
- `bResult.Value = False` — prevents leaving the field
- After the event, the entered value is automatically copied to the associated window variable (unless blocked)
- Use `ScreenContents` to get the current entered value; `Contents` still holds the original value

```vbscript
Sub CWLCurrentWindow_OnCheckUserfield(nFgId, bResult)
    Set ctrl = CWLCurrentWindow.ActiveWindow.Controls.Item(nFgId)
    Dim newVal
    newVal = ctrl.ScreenContents
    If nFgId = 250 And newVal = "" Then
        General.MsgBox "Field cannot be empty"
        bResult.Value = False
    End If
End Sub
```

---

### Button and Selection Events

#### `OnPushButton(int nFgId, ICwlEventResult *bResult)`
Fires when a button is pressed. The script receives the event **before** the application.
- `bResult.Value = False` — prevents the application from processing the button press

```vbscript
Sub CWLCurrentWindow_OnPushButton(nFgId, bResult)
    If nFgId = 800 Then
        ' Handle custom button
        bResult.Value = False  ' Suppress default behavior
    End If
End Sub
```

#### `OnCheckBox(int nFgId)`
Fires when a checkbox is clicked.

#### `OnRadioButton(int nFgId)`
Fires when a radio button group is exited (group loses focus).

#### `OnChangeButton(int nFgId)`
Fires when the selected button within a radio button group changes.

#### `OnDynamicMenuCommand(int nFgId, int MenuIndex, ICwlEventResult *bResult)`
Fires when a selection is made from a multi-option button (e.g., printer/screen). Also fires on F5 shortcut.
- `MenuIndex` — 0-based index of the selected menu item
- `bResult.Value = False` — prevents the application from acting on the selection

#### `OnCmbSelChange(int nFgId, ICwlEventResult *bResult)` (v12.24+)
Fires when a combo box selection changes **without the combo being exited** (in-list selection change).
- Use `ScreenContents` to get the full text of the selected combo entry
- `bResult.Value = False` — suppress default application behavior

#### `OnAfterEvent(int nFgId, int EventType, int Originalresult)`
Fires **after** certain events complete, allowing post-processing. The EventType parameter identifies which event occurred:

| EventType | Trigger |
|-----------|---------|
| 1 | Window startup (v12.24+) |
| 4 | Listbox selection |
| 5 | Checkbox |
| 6 | Radio button |
| 7 | Push button |
| 10 | Radio button change |
| 21 | Cell change in grid (v12.24+) |
| 22 | CheckMsg in grid (v12.24+) |
| 26 | Checkbox in grid |
| 27 | ChangeLine in grid (v12.24+) |
| 29 | New line in grid (v12.24+) |
| 30 | Double-click in grid |
| 81 | Combo selection change (v12.24+) |
| 82 | Combo selection change in grid (v12.24+) |
| 96 | Tree double-click (v12.24+) |
| 97 | Tree entry delete (v12.24+) |
| 98 | Tree selection change (v12.24+) |

`Originalresult` — event result from CWL (0 = normal, -1 = error)

---

### Grid Events

#### `OnGridCheck(int nFgId)`
Fires when a cell with an edit field or combo box is **exited** in a grid, after successful application validation.

#### `OnGridCheck(int nFgId, ICwlEventResult *bResult)` (v12.24+, overload)
As above, but the script receives the event **before** the application.
- `bResult.Value = False` — prevents leaving the cell

#### `OnGridChangeLine(int nFgId)`
Fires when the current row changes in a grid.

#### `OnGridDblClick(int nFgId, ICwlEventResult *bResult)`
Fires on double-click (or ENTER) in a non-editable grid column.
- `bResult.Value = False` — prevents the application's associated action

#### `OnGridCheckUserColumn(int nFgId, int Row, int Column, ICwlEventResult *bResult)`
Fires when a cell with an edit field or combo box in a **user-inserted column** is exited.
- `bResult.Value = False` — prevents leaving the cell

```vbscript
Sub CWLCurrentWindow_OnGridCheckUserColumn(nFgId, nRow, nColumn, bResult)
    If nFgId = 100 Then
        Set myGrid = CWLCurrentWindow.ActiveWindow.Controls.Item(100).Grid
        If myGrid.Contents = "2" And nRow <= 5 Then
            General.MsgBox "Only values 0 and 1 are allowed in rows 1-5"
            bResult.Value = False
        End If
    End If
End Sub
```

#### `OnGridNewUserLine(int nFgId, int Row, int Column, ICwlEventResult *bResult)` (v12.24+)
Fires when the user moves to the empty row after the last row in a user-defined grid. Useful for automatically inserting a new line.

#### `OnGridSearch(int nFgId, int Row, int Column, ICwlEventResult *bResult)`
Fires when the user clicks the search icon or presses F9 in a grid edit field.
- `bResult.Value = False` — suppresses the default matchcode (only for non-user-created grids)

#### `OnGridCheckBox(int nFgId, int Row, int Column)` (v12.24+)
Fires when a checkbox in a grid cell is clicked or toggled with Space.

#### `OnGridDrillDown(int nFgId, int Row, int Column, ICwlEventResult *bResult)` (v12.24+)
Fires when the user clicks a drill-down link in a grid cell (only when no default object type is configured).
- `bResult.Value = False` — suppress default behavior

#### `OnGridCmbSelChange(int nFgId, int Row, int Column, ICwlEventResult *bResult)` (v12.24+)
Fires when a combo box in a grid cell changes its selection without the cell being exited.
- Use `ScreenContents` to get the current list index text
- `bResult.Value = False` — suppress default behavior

#### `OnGridAllowEdit(nFgId, nRow, nColumn, bResult)` (v12.24+)
Fires for every grid cell before the edit control/checkbox/combo becomes active.
- `bResult.Value = False` — makes the cell read-only (prevents editing)

---

### Search Events

#### `OnSearch(int nFgId, ICwlEventResult *bResult)`
Fires when the user clicks the search magnifying glass in an edit field, or presses F9.
- For non-user-created elements: `bResult.Value = False` suppresses the standard matchcode lookup

---

### Filter and Company Events

#### `OnChangeFilter(BSTR FilterName, ICwlEventResult *bResult)`
Fires when the filter is changed in a window's filter combo box.
- `FilterName` — name of the selected filter
- `bResult.Value = False` — prevents the filter change

#### `OnChangeCompanyYear(int CompanyYear, ICwlEventResult *bResult)`
Fires when the fiscal year is changed in the application toolbar.
- `CompanyYear` — internal numeric format (use `CWLCompany.ConvertCompanyYearToString` to convert)
- `bResult.Value = False` — prevents the year change

#### `OnChangeCompany(const char *Company, int CompanyYear, ICwlEventResult *bResult)`
Fires when the company (or fiscal year) is changed. Normally not usable since no windows can be open during a company change (exception: Cockpit window).
- `bResult.Value = False` — prevents the change

---

### Custom Event (v12.24+)

#### `OnUserEvent(int EventType, VARIANT Data, ICwlEventResult *bResult)`
Fires when another script calls `CWLModule.SendWindowEvent(WinId, EventType, Data)` targeting this window. Enables window-to-window communication without global variables.
- `EventType` — arbitrary number chosen by the sender
- `Data` — arbitrary value or array of values
- `bResult.Value = 42` — return value back to the sender

```vbscript
Sub CWLCurrentWindow_OnUserEvent(EventType, Data, bResult)
    If EventType = 100 Then
        General.MsgBox "Received data: " & Data
        bResult.Value = 1  ' signal success
    End If
End Sub
```

---

## Accessing Window State Within Events

```vbscript
Sub CWLCurrentWindow_OnPushButton(nFgId, bResult)
    ' Get the active window
    Set myWin = CWLCurrentWindow.ActiveWindow

    ' Read a variable (table T001, column 4 = street)
    Dim street
    street = myWin.Vars.Value(1, 4)

    ' Get a specific control
    Set ctrl = myWin.Controls.Item(nFgId)

    ' Read display value (not yet validated by app)
    Dim screenVal
    screenVal = ctrl.ScreenContents

    ' Read stored variable value
    Dim storedVal
    storedVal = ctrl.Contents

    ' Set focus to another field
    myWin.CurrentField = 112

    ' Get the Grid object from a grid control
    Set myGrid = myWin.Controls.Item(100).Grid
    Dim row, col
    myGrid.GetCurrentCell row, col
    General.MsgBox "Cell value: " & myGrid.GetCellValue(row, col)
End Sub
```

---

## CwlWindow Properties (via ActiveWindow)

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `CurrentField` | short | R/W | ID of focused control; set to move focus; set to 0 for next TAB stop |
| `Visible` | BOOL | R/W (UserForm) / R (System) | Window visibility |
| `Id` | short | read | Window ID (matches CTK ID) |
| `Vars` | `ICwlWindowVars*` | read | Access window variables |
| `Name` | BSTR | read | Window name |
| `Type` | CWLWindowTypes | read | 0=Standard, 1=Preview, 2=UserForm/Script |
| `Controls` | `ICwlFgCollection*` | read | Collection of all window controls |
| `CurrentControl` | `ICwlFgControl*` | read | Currently focused control |
| `CurrentFilter` | BSTR | read | Active filter name (if window has filter combo) |
| `CurrentCompanyYear` | int | read | Current fiscal year (internal format) |

### CwlWindow Methods

| Method | Description |
|--------|-------------|
| `Close()` | Simulate pressing EXIT in a Standard window; returns 1 on success |
| `Activate()` | Activate the window |
| `Refresh()` | Refresh all field display values |
| `CreateReport(Type, Name, ...)` | Create a CwlReport for custom output (v12.24+) |
| `CloseReport(Report)` | Close a report (v12.24+) |
| `SetShowLevel(From, To, setzen)` | Show/hide display levels (v12.24+) |
| `CallWindowOnClose(AppId, WinId)` | Register window to open after this window closes (v12.24+) |

---

## CwlFgControl Key Properties and Methods

| Property | Type | Description |
|----------|------|-------------|
| `Id` | short | Control ID (matches CTK) |
| `Contents` | VARIANT | R/W: stored value in the associated variable |
| `ScreenContents` | VARIANT | Read: current unvalidated display value |
| `Text` | BSTR | R (v10.5) / R/W (v12.24): Title/combo entries |
| `View` | long | Associated table number |
| `Var` | long | Associated column number |
| `Type` | CWLControlTypes | Control type constant |
| `Active` | BOOL | R/W (v12.24+): enabled/disabled state |
| `Grid` | `ICwlGrid*` | Grid object (if Type=cwlControlGrid) |
| `Preview` | `ICwlPreview*` | Preview object (if Type=cwlControlPreview) |
| `SpreadSheet` | `ICwlSpreadSheet*` | SpreadSheet object (if Type=cwlControlSpreadsheet) |
| `GridRedraw` | VARIANT | Suppress/enable grid screen refresh during bulk changes |

| Method | Description |
|--------|-------------|
| `PushButton(PostIt)` | Fire the button click (PostIt=TRUE defers until script ends) |
| `Validate()` | Trigger field validation |
| `Refresh()` | Redraw the control |
| `GridLines()` | Return number of accessible rows in a grid |
| `SetCurrentGridCell(Row, logCol)` | Move cursor to grid cell |
| `GetCurrentGridCell(Row, logCol)` | Get current grid cursor position |
| `GetGridCellValue(Row, logCol)` | Get value from any grid cell |
| `SetGridColReadOnly(logCol, bSet)` | Set/clear read-only on a grid column |
| `GetGridColReadOnly(logCol)` | Check read-only status |
| `TreeExpand/Collapse/Select(...)` | Tree control operations |
| `ListboxSelect(nItemIndex)` | Select item in listbox |
| `AddToSplitter(SplitterId, bResize, bTopLeft)` | Attach to splitter (v12.24+) |

---

## Common Patterns

### Check if a user-defined field has a valid value before saving

```vbscript
Sub CWLCurrentWindow_OnCheckUserfield(nFgId, bResult)
    Set ctrl = CWLCurrentWindow.ActiveWindow.Controls.Item(nFgId)
    If nFgId = 250 Then
        If ctrl.ScreenContents = "" Then
            General.MsgBox "This field is required."
            bResult.Value = False
        End If
    End If
End Sub
```

### Intercept a button and do something first

```vbscript
Sub CWLCurrentWindow_OnPushButton(nFgId, bResult)
    If nFgId = 1 Then  ' Save button ID = 1
        Set vars = CWLCurrentWindow.ActiveWindow.Vars
        ' Validate before save
        If vars.Value(1, 10) = "" Then
            General.MsgBox "Customer number cannot be empty."
            bResult.Value = False  ' Block the save
        End If
    End If
End Sub
```

### Manipulate a grid after loading

```vbscript
Sub CWLCurrentWindow_OnActivate(nWinId)
    Set myGrid = CWLCurrentWindow.ActiveWindow.Controls.Item(100).Grid
    myGrid.IsRedraw = 0  ' Suppress screen updates
    ' ... bulk changes ...
    myGrid.IsRedraw = 1  ' Refresh all at once
End Sub
```

### Window-to-window communication (v12.24+)

```vbscript
' In Window A (sender):
CWLStart.Module(cwlFAKT).SendWindowEvent 301, 100, "hello"

' In Window B ID=301 (receiver):
Sub CWLCurrentWindow_OnUserEvent(EventType, Data, bResult)
    If EventType = 100 Then
        General.MsgBox "Received: " & Data
        bResult.Value = 1
    End If
End Sub
```

---

## Related Pages

- [[WinLine CWL Object Model]] — full object model overview
- [[WinLine CWL MacroCommands]] — macro processing commands
- [[WinLine FAKT Formeln]] — FAKT formula scripting context
- [[Mesonic WinLine]] — parent ERP entity
- Source EN v10.5: [[winline-cwl-object-model-en]]
- Source DE v12.24: [[winline-cwl-object-model-de]]
