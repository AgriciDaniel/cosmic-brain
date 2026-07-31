---
address: c-000256
title: "WinLine CWLCTK"
tags:
  - concept
  - winline
  - mdp
created: 2026-06-22
status: current
related:
  - "[[Mesonic WinLine]]"
  - "[[WinLine MDP Module]]"
  - "[[WinLine User-Defined Windows]]"
---

# WinLine CWLCTK

**CWLCTK** = CWL Customization Toolkit. The GUI tool used to create and modify WinLine windows for specific user groups, add menu items, and attach CTK window scripts. CWLCTK is the primary design-time interface for [[WinLine MDP Module]] customization.

---

## What CWLCTK Does

| Task | How |
|---|---|
| Create new user-defined windows | File → New Window; assign to module area and user group |
| Copy existing standard windows | Copy a standard WinLine window to a user group to modify it |
| Add controls to windows | Insert field, checkbox, combo box, button, grid controls via toolbar/menu |
| Assign window scripts | Enter macro name in the "Macro Name" field of the window |
| Create menu items | Add new CTK menu entries for a user group in any module |
| Set tab order | Edit → Input-Order to resequence field tab order |
| Apply WinLine style guide layout | Format controls automatically with the style guide menu item |

---

## Window Numbering

User-defined windows start at **900**. Numbers below 900 are reserved for WinLine standard windows.

**Module area precedence rule:** When the same window number exists in two module areas, the non-MESO module takes precedence when opened from that module. Example:
- MESO900 and MAIN900 both exist
- Opening window 900 from MAIN → MAIN900 opens
- If MAIN900 is deleted → MESO900 opens as default

**Practical guidance:** Create windows that must be accessible from multiple modules (e.g., an Account Base Info extra window accessible from ACC1, ACC2, etc.) in module area **MESO**.

---

## Creating a New Window

1. Open CWLCTK, select module area and user group
2. Choose "New Window"; enter window name in the Title field; assign window number (900+)
3. Insert controls (see below)
4. Enable "Macro Events" on OK and EXIT buttons if the script needs to handle those clicks
5. Enter macro/script name in the "Macro Name" field to attach a CTK window script
6. Optionally set "Sizeable" property for resizable windows
7. Set tab order via Edit → Input-Order

---

## Supported Control Types

| Control | Notes |
|---|---|
| Edit field | `var length` = character limit; `view` = table number; `var` = variable number |
| Checkbox | Sends `OnCheckUserField` event when state changes |
| Combo box | `list height`, `list width` set dropdown size; `Letters` property = display/entry length |
| Button | Assign icon via symbol property (e.g., IDINFO, IDSAVE, IDDRUCKEN); set "Macro Events" for OK/EXIT |
| Grid control | Enable "Macro Events" on grid for `OnGridCheckUserColumn` events; set Width, Height, resize flags, colored stripes, etc. |
| Background text | Static label |
| Static control | Non-editable display field |
| Group box | Visual grouping container |
| Internet Explorer | Embedded browser control |
| Bitmap | Image display |

### Button Types
- **Standard button** — simple click handler
- **Menu button** — provides a dropdown menu; IDDRUCKEN automatically adds screen/printer options
- **Toolbar button** — standard toolbar style (e.g., IDSAVE)

---

## Copying Standard Windows

To modify an existing WinLine window for a user group:
1. In CWLCTK, locate the standard window (e.g., MESO086, FAKT015)
2. Copy it to the desired user group
3. Add, move, or configure controls on the copy
4. The copy replaces the standard window for users in that group

> [!warning] Show-Levels
> When adding controls to a copied window, ensure the new control is not positioned over an existing element in a non-visible Show-Level. Hidden elements in other show-levels occupy the same screen space.

---

## Assigning View and Var to Controls

Controls are connected to database columns via **View** (table number) and **Var** (variable number):
- **View** = the table number (e.g., 051 for T051, 034 for T034)
- **Var** = the variable number within that table
- User-defined columns added via Append Tables start at Var **500** (U000 in the table = Var 500, U001 = Var 501, etc.)

Example: A new "Province" field added to T051 and connected to an edit field in MESO086:
- View = 051
- Var = 0500 (Province)

> [!note] Manual View Entry
> When assigning View to a control, you must first **manually type** the table number (e.g., "034") before the dropdown of available tables becomes usable in that field.

---

## Tab Order Management

Tab order controls the keyboard navigation sequence through a window's fields:
- Menu item **Edit → Input-Order** displays the current tab order numbers next to controls
- Blue = currently selected control
- To reorder: hold Ctrl and click the control from which you want to reorder; then click subsequent controls to set their new order
- New controls are automatically assigned to the end of the tab order list

---

## Menu Item Creation

New CTK menu items are added for a user group in a specific module. The menu item is assigned a window ID, which opens the corresponding window when clicked. Menu items can also launch macros, allowing opening a window via `Cwlmacro.Mwindow 900, false`.

---

## CWLPDFE (Report Designer)

CWLCTK works alongside **CWLPDFE**, the WinLine PDF/report form designer. New report forms are created in CWLPDFE and named following the convention `P99W<REPORTNAME>`. Reports consist of:
- **Header section** — printed once at the top of each page (static text, date variable, page variable, column headers)
- **Middle section** — printed for each data row (variables connected to table/view data)
- **Footer section** — printed at page/report end

---

## Related Pages

- [[WinLine MDP Module]] — the framework CWLCTK configures
- [[WinLine User-Defined Windows]] — detailed window creation guide
- [[WinLine MDP Database Extensions]] — the Append Tables functionality
- [[winline-mdp-workshop-example-docs]] — step-by-step examples using CWLCTK

---

## Sources

- [[winline-mdp-workshop-example-docs]] — Framas 2020 workshop
- [[winline-mdp-workshop-slides]] — mesonic International presentation
