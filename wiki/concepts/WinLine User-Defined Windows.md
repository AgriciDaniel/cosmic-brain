---
address: c-000257
title: "WinLine User-Defined Windows"
tags:
  - concept
  - winline
  - mdp
created: 2026-06-22
status: current
related:
  - "[[Mesonic WinLine]]"
  - "[[WinLine MDP Module]]"
  - "[[WinLine CWLCTK]]"
---

# WinLine User-Defined Windows

User-defined windows are custom WinLine-native entry forms created with [[WinLine CWLCTK]] as part of the [[WinLine MDP Module]] framework. They look and behave identically to standard WinLine windows — native controls, keyboard navigation, standard style guide — but are defined entirely by the implementer.

---

## Why User-Defined Windows

Before MDP II, custom data entry in WinLine required MS UserForms built with VBScript — these were not native WinLine windows and had a different look and feel. User-defined windows are "real" WinLine windows: they use native controls, respond to standard keyboard shortcuts, support WinLine style guide formatting, and integrate fully with CTK window scripts.

---

## Creating a Window in CWLCTK

1. Open CWLCTK → select module area (e.g., MESO) + user group (e.g., Management)
2. Create new window → enter title; assign number 900+
3. Insert controls and configure properties (View, Var, icon, label)
4. Enable "Macro Events" on OK (ID=98) and EXIT (ID=99) buttons if script needs to handle them
5. Enter CTK script name in "Macro Name" field
6. Optionally enable "Sizeable" for a resizable window

> [!note] Window Numbering
> User-defined window numbers start at 900. Module-specific windows take precedence over MESO module windows with the same number.

---

## Control Types and Properties

### Edit Field
- `var length` — maximum character length
- `view` — table number (e.g., 495 for a standalone variable, 051 for T051)
- `var` — variable number within the table (user columns start at 0500)

### Combo Box
- `list height` — number of visible items in dropdown
- `list width` — display width of the dropdown list
- `Letters` — entry field display length; also controls how many characters of the underlying table column are shown/entered
- Populated programmatically via script or via `Controls.Item(n).Text = "key:value;..."` format

### Checkbox
- Fires `OnCheckUserField` event when its state changes

### Button
- Icon assigned via symbol property (IDINFO, IDSAVE, IDDRUCKEN, IDSUMMEN, etc.)
- **Standard** / **Menu** / **Toolbar** types
- OK and EXIT buttons: must enable "Macro Events" checkbox to receive `OnPushButton` events

### Grid Control
- Properties: Width, Height, Resize Horz/Vert, Colored Stripes, Lines, Lines in Header, Chooseable, Sizeable Columns, Filter columns, Group columns
- Must enable "Macro Events" on grid control for `OnGridCheckUserColumn` events
- Grid columns are added programmatically in the CTK script, not in CWLCTK

---

## Attaching a CTK Window Script

Enter the script name in the window's **Macro Name** field in CWLCTK. Then create the script in WinLine START → Parameters → Program Macros → Window Script.

The script name becomes the VBScript module name. All event handlers within it are prefixed with the CWL object name:
- `Sub CWLScript_OnScriptStart()` — window opened
- `Sub CWLCurrentWindow_OnPushButton(nFgId, bResult)` — button clicked
- `Sub CWLCurrentWindow_OnCheckUserField(nFgId, bResult)` — field exited

---

## Event Handler Reference

### OnScriptStart
Fires when the window script initializes (window opens). Use to:
- Populate combo boxes with selection options
- Initialize grid columns
- Set initial field values

```vbscript
Sub CWLScript_OnScriptStart()
    ' Populate combo box (control ID 798) with options
    ' Format: "key:displayText;key2:displayText2"
    CWLStart.CurrentModule.Windows.Item(900).Controls.Item(798).Text = _
        "0:Option 1;1:Option 2;2:Option 3"
End Sub
```

### OnCheckUserField
Fires when the user exits a field (tab or enter). Use to validate input.

```vbscript
Sub CWLCurrentWindow_OnCheckUserField(nFgId, bResult)
    Select Case nFgId
    Case 800  ' edit field control ID
        If Len(CWLCurrentWindow.ActiveWindow.CurrentControl.ScreenContents) = 0 Then
            MsgBox "Field cannot be empty!"
            bResult.Value = False  ' blocks exit from the field
        End If
    End Select
End Sub
```

**`bResult.Value = False`** — prevents the user from leaving the field until validation passes.

### OnPushButton
Fires when a button is clicked. nFgId = 98 for OK, 99 for EXIT.

```vbscript
Sub CWLCurrentWindow_OnPushButton(nFgId, bResult)
    Select Case nFgId
    Case 797  ' custom Info button
        MsgBox "Info button pressed"
    Case 98   ' OK button
        MsgBox "OK pressed"
    Case 99   ' EXIT button
        MsgBox "Exit pressed"
    End Select
End Sub
```

> [!warning] Macro Events Required
> OK (98) and EXIT (99) buttons do NOT fire `OnPushButton` unless the "Macro Events" checkbox is enabled for them in CWLCTK.

### Reading Field Contents

To read the current value of any control:
```vbscript
Dim value
value = CWLCurrentWindow.ActiveWindow.CurrentControl.ScreenContents
```

To read a specific control by ID:
```vbscript
Dim value
value = CWLStart.CurrentModule.Windows.Item(900).Controls.Item(800).ScreenContents
```

---

## Opening a User-Defined Window

Four methods are supported:

**1. External Programs macro**
```vbscript
' Macro named MACRO-MESO900:
Cwlmacro.Mwindow 900, False
```
Configure the macro as an external program item in WinLine.

**2. New CTK Menu Item**
In CWLCTK, add a menu item for the user group in the desired module (e.g., MAIN → Parameters → "Demo Window") and assign window ID 900.

**3. From the Cockpit**
Insert the menu item or macro as a Cockpit entry.

**4. From another CTK script**
```vbscript
CWLStart.CurrentModule.Windows.Add(900)
```

---

## Variable Binding

Controls are bound to WinLine variables via View (table) and Var (column) numbers. For user-defined windows with standalone variables (no underlying table), use View 495 with Var numbers starting from 0000:

```vbscript
' Create a standalone variable for a control
CWLCurrentWindow.ActiveWindow.Vars.CreateVar 495, 0, "1", 1, "1"
```

For grid column binding to user-defined columns:
```vbscript
' View=26 (T026), Var=500 (first user column U000)
myGrid.AddColumn "ProductText", "T1,Z100,H1,", "l", "V", 0, 26, 500, 20
```

---

## User-Defined Grid Controls

When a window contains a user-defined grid (as opposed to modifying a standard grid), the following script setup is required:

```vbscript
Dim grid
Set grid = myWin.Controls.Item(800).Grid

grid.initUserGrid       ' Must be called first — connects window variables
grid.isRedraw = False   ' Suppress screen refresh during setup

' Add columns
grid.AddColumn "Name", "%s", "l", "V", 0, 401, 2, 20, SORTFLAG+SIZEFLAG+HIDEFLAG

grid.Header             ' Output column headers
' Loop: grid.AddLine for each data row
grid.isRedraw = True
```

> [!warning] User-Defined Grid Only
> `initUserGrid`, `Header`, `AddLine`, `InsertLine`, `RemoveLine`, `ReplaceLine`, `GetLineValues`, and `Footer` are only available for user-defined grid controls. They cannot be used on standard WinLine grid controls (use `OnWindowOpen` and standard `AddColumn` for those).

---

## WinLine Style Guide Formatting

After inserting controls in CWLCTK, apply the standard WinLine style guide to a selected control via the style guide menu item. Controls are automatically formatted to match native WinLine appearance (fonts, spacing, colors).

---

## Related Pages

- [[WinLine CWLCTK]] — the tool used to design windows
- [[WinLine MDP Module]] — framework context and event object reference
- [[WinLine MDP Database Extensions]] — connecting windows to user-defined database columns

---

## Sources

- [[winline-mdp-workshop-example-docs]] — complete worked examples
- [[winline-mdp-workshop-slides]] — mesonic International slides
