---
address: c-000269
title: "WinLine CWL MacroCommands"
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
  - "[[WinLine CWLCurrentWindow]]"
  - "[[WinLine FAKT Formeln]]"
---

# WinLine CWL MacroCommands

`MacroCommands` (also accessible as `CWLMacro`, or internally as `FormDriver`) is the universal macro processing object in WinLine CWL scripting. It is the oldest and most broadly available object — available in all script types including the Macro Recorder — and provides commands that map closely to WinLine's internal macro language.

---

## What MacroCommands Is

MacroCommands is the core scripting object that pre-dates the full object model. While newer objects like `CWLStart`, `CWLCurrentWindow`, and `CwlFgControl` provide a more structured, object-oriented API, MacroCommands exposes functions that:
1. Are available in **all** script types (including the Macro Recorder, which cannot use `CWLStart`)
2. Directly correspond to macro recorder actions, making recorded macros easier to understand
3. Can be used to navigate the application, open windows, run macros, and control the UI at a lower level

**Key insight:** Many MacroCommands functions have equivalent functionality in other CWL objects. The choice depends on context:
- In **Macro Recorder scripts** or **LOHN Macros**: MacroCommands is often the only option
- In **CTK/System scripts**: prefer the typed object API (`CWLStart`, `CWLCurrentWindow`, etc.) for clarity; use MacroCommands for functions without an object equivalent or for cross-type compatibility

---

## Availability

| Context | Available |
|---------|-----------|
| System Macros | Yes |
| CTK Macros | Yes |
| Macro Recorder | Yes (primary use case) |
| LOHN Macros | Yes |
| FAKT Macros | Yes |
| Payroll Scripts | Yes (via `MacroCommands`) |

In v12.24, `MacroCommands` is also available as a **property of `CWLStart`**:
```vbscript
CWLStart.MacroCommands.MWindow 210
' equivalent to:
MacroCommands.MWindow 210
```

---

## How MacroCommands Differs from Object Methods

| Aspect | MacroCommands | Object API (CWLStart etc.) |
|--------|--------------|---------------------------|
| Availability | All script types incl. Recorder | System, CTK, or specific types |
| Style | Procedural, flat namespace | Object-oriented hierarchy |
| Origin | WinLine's macro language | CWL object model (later addition) |
| Type safety | Loose (VARIANT parameters) | Typed interface declarations |
| Recorder output | Yes — recorded macros use this | No |
| Error handling | Generally simpler | More explicit return values |

**Example equivalence:**
```vbscript
' MacroCommands approach:
MacroCommands.MApplication cwlFAKT    ' switch to FAKT module
MacroCommands.MWindow 210             ' open window 210

' Object API approach (CTK/System only):
CWLStart.ActivateModule cwlFAKT
CWLStart.Module(cwlFAKT).Windows.Add 210
```

---

## Key MacroCommands Functions

The documentation references the following MacroCommands functions (with their object API equivalents where known):

### Application Control

| Command | Description | Object Equivalent |
|---------|-------------|-------------------|
| `MApplication(nr)` | Switch to module with ID `nr` | `CWLStart.ActivateModule(nr)` |
| `MexternalApplication(id)` | Start external application by index | `CWLStart.ActivateExternalApp(id)` |
| `MrunMacro(name[, params])` | Run a named macro (optionally with parameters) | `CWLStart.ExecuteMacro(name)` |
| `MrunForm(name, mode)` | Start a system script | `CWLStart.RunFormScript(name, mode)` |
| `MName` | Get the current script/macro name | `CWLScript.Name` |

### Window Control

| Command | Description | Object Equivalent |
|---------|-------------|-------------------|
| `MWindow(id)` | Open a window by ID | `CWLWinCollection.Add(id)` |

### Other Known Commands

| Command | Description |
|---------|-------------|
| `MWait(ms)` | Wait for `ms` milliseconds (used in progress window example) |
| `MParameters` | In a called macro: access the array of passed parameters |

---

## Parameter Passing to Macros

A common pattern documented in the v12.24 tips section: passing parameters from a System script to a called macro.

### Sender script:
```vbscript
Sub CommandButton1_Click()
    Dim params(1)               ' array with 2 slots (index 0 and 1)
    params(0) = "first param"
    params(1) = "second param"
    pParams = params            ' convert array to VARIANT
    MacroCommands.MRunMacro "MYREPORT", pParams
End Sub
```

### Receiver macro:
```vbscript
Sub RunMacro
    inparams = MParameters      ' convert VARIANT back to array
    
    ' Default values in case no params passed
    value1 = "default1"
    value2 = "default2"
    
    ' params 0-19 are reserved for view0 variables
    ' custom params start at index 20
    If UBound(inparams) >= 21 Then
        value1 = inparams(20)
        value2 = inparams(21)
    End If
    
    ' ... use value1, value2 ...
End Sub
```

> [!warning] The first 20 indices (0-19) in the `MParameters` array are reserved for `view0` window variables automatically passed by the macro engine. Custom parameters passed via the array argument start at **index 20**.

---

## MacroCommands vs FormDriver

Both names refer to the same object in different contexts:
- **`MacroCommands`** — the standard alias used in scripts
- **`CWLMacro`** — alternative alias (same object)
- **`FormDriver`** — listed as "used only internally" in the documentation; the underlying implementation object

---

## Integration with CWLStart

In v12.24, `CWLStart` exposes `MacroCommands` as a property, enabling access through the full object path. This is useful when writing library scripts that might be `$IMPORT`ed and need to be explicit about which object's methods they call:

```vbscript
' Explicit path (useful in imported library scripts)
CWLStart.MacroCommands.MRunMacro "MYREPORT"

' Short form (works in any script where MacroCommands is in scope)
MacroCommands.MRunMacro "MYREPORT"
```

---

## Right-Click Context Menu Control (v12.24+)

While not a MacroCommands function per se, the v12.24 documentation covers context menu control via the `CWLStart.OnContextmenu` event. Menu item IDs discovered from the right-click menus:

| Menu ID | Function |
|---------|---------|
| 14325 | Show/hide columns |
| 14709 | Export table (to Excel) |
| 14291 | Copy to clipboard |
| 13294 | (additional context menu item) |

```vbscript
Sub CWLStart_OnContextMenu(AppNr, WindowId, FgId, MenuText, MenuId, bResult)
    If CWLStart.CurrentUser.Group = 1 Then
        If MenuId = 14325 Or MenuId = 14709 Then
            bResult.Value = False  ' grey out these options for group 1
        End If
    End If
End Sub
```

---

## External COM Access to CWLStart

The v12.24 tips document an advanced pattern: using `MacroCommands` and CWL objects from an **external VBScript** (outside WinLine), via COM automation:

```vbscript
Dim appl
Set appl = CreateObject("cwlstart.application")

If Err Then
    MsgBox "CWLStart.exe is not running. Error: " & Err.Description
End If

MsgBox "Application name: " & appl.Name    ' works without MDP license

appl.ActivateModule 1    ' switch to FIBU (requires MDP license)
```

Requirements:
- `cwlstart.exe` must be running
- MDP license required for most operations (Runtime license is sufficient)

---

## Related Pages

- [[WinLine CWL Object Model]] — complete object model reference
- [[WinLine CWLCurrentWindow]] — the primary event interface for UI scripting
- [[WinLine FAKT Formeln]] — FAKT formula scripting (uses MacroCommands)
- [[Mesonic WinLine]] — parent ERP entity
- Source EN v10.5: [[winline-cwl-object-model-en]]
- Source DE v12.24: [[winline-cwl-object-model-de]]
