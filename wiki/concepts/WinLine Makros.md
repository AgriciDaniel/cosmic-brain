---
address: c-000260
title: "WinLine Makros"
tags:
  - concept
  - winline
  - makros
  - vbscript
created: 2026-06-22
status: current
related:
  - "[[Mesonic WinLine]]"
  - "[[WinLine VBScript Engine]]"
  - "[[WinLine FAKT Formeln]]"
---

# WinLine Makros

WinLine Makros is the record-and-replay automation system built into [[Mesonic WinLine]]. It uses the embedded [[WinLine VBScript Engine]] to capture sequences of UI interactions and play them back unattended or semi-interactively. Macros are standard-licensed — no extra MDP license is required.

---

## What Macros Are For

A macro captures a repeatable sequence of actions:

- Daily backup (Datensicherung)
- Month-end reports (monatliche Auswertungen)
- Payment runs (Zahlungsverkehr)
- Year-end closing procedures (Abschlussarbeiten)

Any action inside WinLine that can be performed manually can be recorded and replayed. Actions recorded include keyboard input, mouse clicks (buttons, checkboxes, listboxes, tree nodes, grid cells), window navigation, application switching, and print operations.

---

## Recording a Macro

### Via the Ribbon

The "Info Center und Makros" Ribbon is the recommended entry point (the menu path cannot start recording).

1. In the Ribbon input field, either select an existing macro or type a new name (WinLine prompts to create it).
2. Click **Makro Aufzeichnen** — all subsequent WinLine actions are captured.
3. Optionally add a description when prompted.
4. Click **Stop** (or the stop button) to end recording. The VBScript source opens for review and editing.

### What Gets Recorded

- All keyboard input in every field
- Every mouse click: buttons, OK/Cancel dialogs, grid cells, tree nodes, checkboxes, comboboxes, listboxes
- Window opens, window switches, application switches
- Print preview interactions, filter selections, company/year changes

### Pause for Input

During recording, right-click any input field and choose **"Pause Macro for Input"**. This inserts `MPauseForInput` — when the macro plays back it pauses at that field, letting the user enter a value. Press **F11** (or the Pause button) to resume. Pause works in regular input fields only — not inside grids/tables.

### MPauseForFilter

A separate pause mechanism for filter dialogs: right-click in a filter input window and choose "Makro für die Filtereingabe pausieren". The macro pauses during filter entry; it continues when the filter window closes (F5 or ESC).

### Silent Mode

Setting `MSilentMode = True` suppresses all screen refreshes until the mode is reset or the macro ends. This avoids the "flickering" (zuckenden Effekt) of windows opening and closing rapidly. Also achievable globally via the "Ohne Fenster ausführen" checkbox in the management window.

---

## Macro Script Structure

Every macro is a VBScript module. The entry point is:

```vbscript
Sub RunMacro
  ' macro body
End Sub
```

The object `CWLMacro` is injected into the script scope and provides all properties, methods, and events. Typing `CWLMacro.` in the formula editor triggers an IntelliSense drop-down of all members.

---

## Properties (Eigenschaften)

| Property | Type | Access | Description |
|----------|------|--------|-------------|
| `Mname` | BSTR | readonly | The macro's name |
| `MLastMessageResult` | short | readonly | Result of dialog boxes captured during recording (0 = no dialog). Used during playback to skip confirmation dialogs. |
| `MPrintToArchive` | VARIANT_BOOL | read/write | Mirrors the Archive toolbar button |
| `MPrintToSpool` | VARIANT_BOOL | read/write | Mirrors the Spool/Print toolbar button |
| `MBalloonHelp` | VARIANT_BOOL | read/write | Mirrors the Active Help toolbar button |
| `MSilentMode` | VARIANT_BOOL | read/write | When TRUE: suppresses screen refresh until reset or macro end |
| `MParameters` | VARIANT | readonly | Array of parameters passed to the macro (see Parameters section) |
| `MCurrentPeriod` | short | readonly | Current accounting period (month number) |

### Parameters (MParameters)

`MParameters` returns an array. Must be assigned to a local variable before indexing:

```vbscript
params = MParameters
For i = 1 To UBound(params)
    ' params(i) = system variable i from the active Mandant
Next
```

| Position | Content |
|----------|---------|
| 1-19 | System variables from the active Mandant |
| 20+ | Extra parameters from hyperlinks, external-program entries, or `MRunMacroSuspended` |

Extra parameters via external program registration syntax:

```
MACRO:MACRONAME {CompanyValue:1}{CompanyValue:2}{Constant:Ein Text}
```

---

## Methods (Methoden)

### Timing and Flow Control

| Method | Signature | Description |
|--------|-----------|-------------|
| `MWait` | `void MWait(long lMilliseconds)` | Pause macro execution for N milliseconds |
| `MStop` | `void MStop()` | Terminate macro immediately (not recorded; manually inserted) |
| `MRunMacro` | `void MRunMacro(BSTR MacroName)` | Call another macro inline; continues after it completes |
| `MRunMacroSuspended` | `MRunMacroSuspended(BSTR macroname, VARIANT params)` | Schedule a macro to run after the current call returns (use when closing a window that owns the current script context) |
| `MRunForm` | `void MRunForm(BSTR MacroName, short bMode)` | Start a System Script. Mode: 0=normal, 1=modal, 2=app-spanning foreground |

### Field Interaction

| Method | Signature | Description |
|--------|-----------|-------------|
| `MSetFieldFocus` | `VARIANT_BOOL MSetFieldFocus(short nWinId, short nFieldId)` | Move cursor to a field (equivalent to mouse click). Returns True/False. |
| `MSetFieldValue` | `void MSetFieldValue(short nWinId, short nFieldId, BSTR strValue)` | Set field value and trigger Enter (same effect as manual typing + Enter) |
| `MGetFieldValue` | `BSTR MGetFieldValue(short nWinId, short nFieldId)` | Read current field value as text |
| `MGetPlainRTFFieldValue` | `BSTR MGetPlainRTFFieldValue(short nWinId, short nFieldId)` | Read RTF field content as plain ANSI text (strips formatting) |
| `MPushButton` | `long MPushButton(short nWinId, short nButtonId, long lParam)` | Press a button. lParam normally 0. |
| `MMatchCode` | `long MMatchCode(short nWinId, short nFieldId, long lParam, BSTR strSearchText, VARIANT_BOOL bExtended)` | Trigger the lookup (Lupe / F9) on an input field |
| `MRetChar` | `long MRetChar(short nWinId, short nFieldId, short Key)` | Record a special key press in an edit field |
| `MMessageF3` | `long MMessageF3(short nWinId, short nFieldId, BOOL bShift)` | Trigger F3 (or Shift+F3) in an edit field |
| `MDrillDown` | `long MDrillDown(short nWinId, short nFieldId, long lParam)` | Trigger F8 (Drill-Down) on any element |

### Grid / Table Operations

| Method | Signature | Description |
|--------|-----------|-------------|
| `MSetGridValue` | `void MSetGridValue(short nWinId, short nFieldId, short nRow, short nColumn, BSTR strValue)` | Set a cell value in a table |
| `MGridMatchCode` | `long MGridMatchCode(...)` | Trigger F9 (lookup) in a grid cell |
| `MGridLeftClick` | `long MGridLeftClick(short nWinId, short nFieldId, short nRow, short nColumn)` | Simulate left-click on a non-editable grid cell |
| `MGridRightClick` | `long MGridRightClick(...)` | Simulate right-click on a non-editable grid cell |
| `MGridDblClick` | `long MGridDblClick(...)` | Simulate double-click on a non-editable grid cell |
| `MGridColLeftClick` | `long MGridColLeftClick(short nWinId, short nFieldId, short nColumn)` | Left-click on a column header cell |
| `MGridInfo` | `long MGridInfo(...)` | F8 inside a grid input field or combo |
| `MGridCheckbox` | `long MGridCheckbox(short nWinId, short nFieldId, short nRow, short nColumn, VARIANT_BOOL bChecked)` | Set a checkbox in a grid cell |
| `MGridLeave` | `long MGridLeave(short nWinId, short nFieldId, short nToFgId, short nFromRow)` | Recorded when user leaves a grid |
| `MGridComboSelchange` | `long MGridComboSelchange(...)` | Change combobox selection in a grid cell |
| `MChangeGridCell` | `long MChangeGridCell(short nWinId, short nFieldId, long lParam)` | Navigate within a grid (keyboard or mouse). lParam encodes key code or row/col. |
| `MGridSort` | `BOOL MGridSort(short WinId, short FieldId, short SortColumn1, short SortColumn2, short SortDirection)` | Sort a table column. SortDirection: 1=ascending, 2=descending |
| `MPrintGrid` | `void MPrintGrid(short nWinId, short nFieldId)` | Print a table (same as context menu "Tabelle ausdrucken") |
| `MSaveFullGridSettings` | `MSaveFullGridSettings(short nWinId, short nFieldId, BSTR Setting)` | Save table layout settings (empty name = defaults) |
| `MLoadFullGridSettings` | `MLoadFullGridSettings(short nWinId, short nFieldId, BSTR Setting)` | Load table layout settings |
| `MOpenGridAsXls` | `MOpenGridAsXls(short nWinId, short nFieldId)` | Open table as Excel (equivalent to "Ausgabe Excel" button) |

### Tree Controls

All tree methods should not be inserted manually — their internal `lParam`/`lTreeData` values are only valid when recorded.

| Method | Description |
|--------|-------------|
| `MTreeExpand` | Recorded when expanding a tree node |
| `MTreeCollapse` | Recorded when collapsing a tree node |
| `MTreeSelChange` | Recorded when selecting a tree node |
| `MTreeDelete` | Recorded when deleting a tree node |
| `MTreeDblClick` | Recorded when double-clicking a tree node |
| `MTreeCheck` | Recorded when leaving a tree with TAB or mouse |
| `MTreeCheckbox` | Recorded when changing a checkbox inside a tree |

### Listbox and Combobox

| Method | Description |
|--------|-------------|
| `MListboxSelChange(short nWinId, short nFieldId, long nItemIndex)` | Recorded when selection changes in a listbox |
| `MListbox(short nWinId, short nFieldId, long lItemIndex)` | Recorded when item confirmed with Enter or double-click |
| `MCheckbox(short nWinId, short nFieldId, BOOL bChecked)` | Recorded when user clicks a standalone checkbox |
| `MRadiobutton(short nWinId, short nFieldId, long lIndex)` | Recorded when user clicks a radio button (index within group, starting 0) |
| `MComboSelchange(short nWinId, short nFieldId, BSTR strFieldText)` | Recorded when combobox selection changes |

### Window and Application Navigation

| Method | Description |
|--------|-------------|
| `MWindow(short nWinId, VARIANT_BOOL bQuiet, VARIANT Param)` | Open or activate a window. bQuiet=TRUE opens silently. Param is optional extra data (not recorded, only manually set). |
| `MActivateWindow(short nWinId)` | Activate a window if not already active |
| `MApplication(short ApplicationNr)` | Switch to a WinLine application module (see table below) |
| `MExternalApplication(short nId)` | Launch a user-defined external application (by index, 0-based) |
| `MQuitApplication()` | Simulate File→Exit. No macro commands may follow. |

**Application numbers for `MApplication`:**

| App | Number | App | Number |
|-----|--------|-----|--------|
| START | 0 | INFO | 11 |
| FIBU | 1 | LOHN D | 18 |
| FAKT | 2 | PROD | 20 |
| LOHN A | 3 | ADMIN | 8 |
| LIST | 4 | EXIM | 9 |
| KORE | 5 | ANBU | 6 |

### Print and Preview

| Method | Description |
|--------|-------------|
| `MChangePreviewPage(short WinId, short PreviewId, short PageNumber)` | Page through a print preview |
| `MPrintPreview(short nWinId, short nFieldId, BSTR Printer)` | Print from preview. Printer empty = default printer. |
| `MClosePreview(short nWinId)` | Close a print preview window |
| `MSavePreview(short nWinId, short nFieldId, BSTR strFilename, short nType)` | Export preview to file. Not recorded — manually inserted. |
| `MPreviewButton(short nWinId, short nFieldId, short ButtonId, short AddParam)` | Recorded when PowerReport button selected in preview (ButtonId=15022, AddParam=1) |
| `MMessageDynamicMenuCommand(short nWinId, short nFieldId, short CommandIndex)` | Recorded when a toolbar dropdown menu command selected (output target selection) |
| `MToolbarMenuCommand(short nWinId, short nFieldId, short CommandIndex)` | Recorded when a toolbar button menu command selected |
| `MPutIntoCampaign(...)` | Recorded when "Zur Merkliste hinzufügen" used in a preview. RelateType 0=all, 1=Artikel, 2=Arbeitnehmer, 3=Projekte, 4=CRM, 5=Vertreter, 6=Kontakte |

### Company, Year, and Filter

| Method | Description |
|--------|-------------|
| `MCompanyChange(BSTR Company, short CompanyYear)` | Switch Mandant. Recorded when toolbar company/year selector used. |
| `MCompanyYearChange(short nWinId, short InternalYearValue)` | Change fiscal year in windows with a year list (e.g., Kontoblatt) |
| `MChangeFilter(short nWinId, short nFieldId, BSTR FilterName)` | Recorded when filter selection changes. Returns 0. |

### Clipboard, Files, Dialogs

| Method | Description |
|--------|-------------|
| `MToClipboard()` | Copy active selection to clipboard |
| `MFromClipboard()` | Paste clipboard into active edit field |
| `MStartExecutable(BSTR Application, BSTR Parameters)` | Launch any external program. Returns True/False. |
| `MChooseFile(BSTR Filename, short ret)` | Recorded when file dialog used. Replays the chosen filename. |
| `MDoModal(BSTR Value, short ret)` | Recorded for modal dialogs (e.g., graphic matchcode selection) |
| `MExecDrillDown(short nWinId, short nFieldId, BSTR ItemText, BSTR HiddenText)` | Recorded when hyperlink in preview clicked |
| `MExecGridDrillDown(short nWinId, short nFieldId, int line, short col, BSTR ItemText, BSTR HiddenText)` | Recorded when hyperlink in a grid table clicked |
| `MLastDialogResult(BOOL bResult, VARIANT value, BSTR Remark)` | Recorded when a LOHN or FAKT formula dialog is opened during recording |
| `MLastReplacedForm(short Number)` | Recorded when user selects a replacement form in the form-selector dialog |

### Utility

| Method | Description |
|--------|-------------|
| `MGetLastUsedObjects(short Type)` | Returns array of up to 10 recently used objects. Type: 1=Konten, 41=Produkte, 30=Projekte, 91=Arbeitnehmer |
| `MPauseForInput(BSTR strNextRoutineAfterPause, short nWinId, short nFieldId)` | Inserts interactive pause at field; F11 resumes. Do not insert manually. |
| `MPauseForFilter(BSTR strNextRoutineAfterPause)` | Pauses during filter-dialog input |
| `MGetRelativeDate(short nWhatDate)` | Returns a date relative to today. Insert manually to replace static dates in recorded macros. |

**`MGetRelativeDate` values:**

| nWhatDate | Returns |
|-----------|---------|
| 0 or 1 | Today |
| 2 | Yesterday |
| 3 | Start of month |
| 4 | End of month |
| 5 | Start of last month |
| 6 | End of last month |
| 7 | Start of week |
| 8 | End of week |
| 9 | Start of last week |
| 10 | End of last week |

---

## Events (Ereignisse)

| Event | Signature | Description |
|-------|-----------|-------------|
| `OnRunMacro` | `void OnRunMacro()` | Fired when the macro starts. Not recorded; must be defined manually if needed. |
| `OnStopMacro` | `void OnStopMacro()` | Fired when the macro ends. Not recorded; must be defined manually if needed. |

---

## Macro Management

**Location:** WinLine START → Parameter → Programm Makros

This window lists all saved macros and provides:

| Action | Description |
|--------|-------------|
| Starten | Run the selected macro |
| Editieren | View/edit the VBScript source |
| Löschen | Delete the macro |
| Exportieren | Export to `.MMR` text file |
| Importieren | Import from `.MMR` file (also drag-and-drop) |
| Ohne Fenster ausführen | Run all macros in Silent Mode (no screen output) |

Macro recording itself is NOT available from this management window — use the Ribbon.

---

## Launch Paths

### 1. Favoriten

1. Record and save the macro.
2. Right-click toolbar → Favoriten → New entry.
3. In "Bezeichnung" enter the display name. Set Option to "Makro/Script".
4. Select the macro from the listbox → OK.

### 2. Program Start (Command Line / Scheduled Task)

Used for automated nightly backups, scheduled reports, etc. Parameters:

| Parameter | Meaning |
|-----------|---------|
| `/USERx` | Login username |
| `/PASSWDy` | Password |
| `/COMPANYz` | Mandant number (needed when starting WinLine START) |
| `/YEARxxxx` | Fiscal year (as displayed in selector, e.g., `/YEAR2003(10)`) — optional |
| `/MACROname` | Macro to run |
| `/QUITAFTERMACRO` | Quit WinLine after macro finishes |

Example:
```
C:\WinLine\ADMN.EXE /USERa /PASSWDb /MACROSICHERN /QUITAFTERMACRO
```

**Important:** The macro must be recorded starting from after the Mandant confirmation screen, or the Mandant selection step must be included in the recording.

### 3. External Programs (Externe Programme)

In WinLine START → Applikationen → Externe Programme, enter `MACRO:XXX` (where XXX is the macro name) in the program path field. The macro can then be launched from the Applikationen menu or the Tools toolbar.

Extra parameters:
```
MACRO:MACRONAME {CompanyValue:1}{CompanyValue:2}{Constant:SomeText}
```

### 4. Cockpit

In Cockpit edit mode, add a new entry of type "Makro". Select the macro from the list. The entry appears in the Cockpit with a macro icon; clicking it runs the macro.

**Note:** Macros launched from the Cockpit must include the application switch (MApplication) in their recording — since the Cockpit runs from WinLine START, a macro that assumes a specific application is already active will fail.

---

## Practical Notes

- `MSetGridValue` and most grid methods work by position (row/column numbers), so recorded macros are sensitive to grid layout changes.
- Tree methods (`MTreeExpand`, etc.) must not be manually inserted — their `lParam`/`lTreeData` are only valid as recorded.
- `MSavePreview` (export preview to file) is not recorded but is the recommended method for automating PDF/HTML/RTF/Excel output from macros.
- `MRunMacroSuspended` solves the problem of closing a window that currently owns the running script context (closing it directly from within would cause an exception).

---

## Source

[[winline-makro12]] — WinLine Makros Documentation v12, mesonic 11/2021
