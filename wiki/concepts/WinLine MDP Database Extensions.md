---
address: c-000258
title: "WinLine MDP Database Extensions"
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

# WinLine MDP Database Extensions

The [[WinLine MDP Module]] provides two mechanisms for extending the WinLine database without modifying the core schema: **appending columns to existing mesonic tables** and **creating entirely new user-defined tables**. Both are managed through **WinLine Admin → System → Append Tables**.

---

## Appending Columns to Existing Tables

### How It Works

New user-defined columns can be added to standard mesonic tables (e.g., T051, T034, T025, T026). The columns are added at the database level and are immediately available to all companies in the database.

**Where:** WinLine Admin → System → Append Tables (window "Append Tables")

**Column naming convention:**
- The column name in the database is auto-assigned: first user column = `U000`, second = `U001`, etc.
- The **variable number** used in CTK scripts and CWLCTK View/Var assignments starts at **500**: U000 = Var 500, U001 = Var 501, etc.
- User-defined columns show as U### in SQL (not C### like standard columns)

**Column types supported:**
| Type Code | Type | Notes |
|---|---|---|
| 1 | String | Specify length in characters |
| 2 | Integer | |
| 3 | Double | With decimal places |
| 4 | Numeric | |
| 5 | Varchar | |
| 6 | Date | |

**Index options:** Unique Index, standard Index can be applied to String columns.

**Null behavior:** New columns can be defined with value NULL (optional data) or without (required).

### Framas Examples

| Table | Column Added | Type | Length | Variable |
|---|---|---|---|---|
| T051 (Account Base Info Address) | Province | String | 50 | Var 0500 (U000) |
| T034 (Sales Rep Base Info) | Province | String | 50 | Var 0500 (U000) |
| T025 (Order File Header) | Packingnumber | String | 50 | Var 0500 |
| T026 (Order File Center) | ProductText | String | 100 | Var 0500 |
| T026 | Urgency | String | 1 | Var 0501 |
| T026 | Length | Numeric | — | Var 0502 |

### Connecting to a Window Control in CWLCTK

After adding the column, open CWLCTK and configure the control on the target window:
- **View** = table number (e.g., 051 for T051, 034 for T034)
- **Var** = 0500 for the first user column (U000)

> [!note] Manual View Entry
> In CWLCTK, when assigning View to a control for the first time, **manually type** the table number before using the dropdown. The dropdown only activates after the number is entered.

### Automatic Save/Load Behavior

For many standard WinLine windows, user-defined column values are **automatically loaded and saved** when a record is opened/saved — no CTK script is required.

Example: Adding "Province" to T051 and connecting it to an edit field in window MESO086. The province field saves automatically when the account record is saved.

**When a script IS needed:** Combo boxes populated programmatically (not directly from a table column list) require `OnUpdateTable` and `OnInsertTable` event handlers to write the selected value back to the database column.

### Table Events for Appended Columns

When user-defined columns are appended to standard mesonic tables, the **CWLCompany** class fires events on record changes:

```vbscript
' Fires when an existing record is updated
Sub CWLCompany_OnUpdateTable(TableNo)
    ' Write selected combo box value to the user-defined column
    CWLStart.CurrentWindow.Vars.Value(34, 500) = _
        CWLStart.CurrentWindow.Controls.Item(800).ScreenContents
End Sub

' Fires when a new record is inserted
Sub CWLCompany_OnInsertTable(TableNo)
    CWLStart.CurrentWindow.Vars.Value(34, 500) = _
        CWLStart.CurrentWindow.Controls.Item(800).ScreenContents
End Sub
```

The pattern `Vars.Value(tableNo, varNo)` sets the variable associated with table T034 (tableNo=34), variable 500 (first user column U000).

---

## Creating New User-Defined Tables

### How It Works

Entirely new tables can be defined within a WinLine company database. These are separate from standard mesonic tables and are used for data that has no standard WinLine equivalent.

**Where:** WinLine Admin → Append Tables → select "new entry" for table

**Table number range:** 650–700 (reserved for user-defined tables)

**Table number:** Automatically suggested when you enter a new table name. Table numbers below 650 are reserved for mesonic standard tables.

**Scope:** User-defined tables belong to the **company database** (not global to all companies).

**Backup/restore:** Handled by WinLine ADMIN backup/restore functions alongside standard tables.

### Framas Example: CompanyCarBaseInfo (T699)

Created in WinLine Admin → Append Tables:

| Column Name | Type | Length | Index | Null |
|---|---|---|---|---|
| Employee number | String | 50 | Unique Index, Index | No |
| License plate number | String | 20 | — | NULL |
| Auto brand | String | 50 | — | NULL |
| Acquisition date | Date | — | — | NULL |

After saving, the table is visible in SQL Management Studio as `T699`.

Column names in the database: U000 (Employee number), U001 (License plate number), U002 (Auto brand), U003 (Acquisition date).

### CRUD via CTK Scripts

User-defined tables support full CRUD via the CWLTable class:

```vbscript
' Open user-defined table T699 for window 901
Set tCC = conn.OpenTable2(699, 901)

' Read records
Set search = tCC.Select("order by U000")
If Search.RowCount > 0 Then
    Do
        t401.get myWin.Vars(699, 0)  ' join to T401 by employee number
        grid.AddLine
        If search.NextRecord = False Then Exit Do
    Loop
End If

' Update all rows in a grid
For i = 1 To grid.LineCount
    grid.GetLineValues i  ' copies row values into window variables
    tCC.Update            ' writes variables back to database
Next

' Close table
conn.CloseTable tCC
```

> [!warning] Update/Insert/Delete: User-Defined Tables Only
> `CWLTable.Update()`, `Insert()`, and `Delete()` only work on user-defined tables (T650–T699). For standard mesonic tables, use `ExecuteSQL` with explicit SQL statements.

### Synchronizing with Standard Tables

A common pattern is to auto-populate a user-defined table with records from a standard table. Example: ensure every employee in T401 has a row in T699:

```vbscript
script = "INSERT INTO T699(U000) "
script = script & "SELECT C000 FROM (T699 L RIGHT JOIN T401 R ON L.U000 = R.C000) "
script = script & "WHERE L.U000 IS NULL AND R.MESOCOMP = '" & Company & "'"
conn.ExecuteSQL script
```

---

## Direct Database Access (CWLDbConnection)

For cases where the standard table event model is insufficient, the `CWLDbConnection` object provides direct SQL access:

```vbscript
Set conn = CWLStart.CurrentCompany.Connection

' Execute a SELECT
Set result = conn.Select("SELECT * FROM T001 (NOLOCK) WHERE mesocomp='~~~~' AND mesoyear=yyyy")
MsgBox result.Value("c000")

' Execute DML
conn.ExecuteSQL "UPDATE T699 SET U001='ABC-123' WHERE U000='EMP001'"

' Open standard table (mesonic naming)
Set tbl = conn.OpenTable2(28, 900, "MESOKEY")  ' T028, window 900

' Open non-standard table (non-Txxx naming)
Set tbl = conn.OpenTable("CustomTable", viewNumber, "KeyColumn", windowId)

' Close when done
conn.CloseTable tbl
```

> [!note] OpenTable2 vs OpenTable
> Use `OpenTable2` for all standard mesonic tables (T001, T028, T401, etc.) that follow the Txxx naming convention. Use `OpenTable` only for tables with non-standard names.

---

## Backup and Restore

User-defined columns and user-defined table definitions (schema + data) are backed up and restored using the standard WinLine ADMIN backup/restore functions. No special handling is needed.

---

## Related Pages

- [[WinLine MDP Module]] — framework overview including CWLTable, CWLDbConnection API summary
- [[WinLine CWLCTK]] — connecting database columns to window controls
- [[WinLine User-Defined Windows]] — window scripts that write to database columns
- [[Framas WL Schema]] — WinLine tables used at Framas (T051, T034, T025, T026 context)

---

## Sources

- [[winline-mdp-workshop-example-docs]] — T051, T034, T025, T026, T699 worked examples
- [[winline-mdp-workshop-slides]] — API reference for CWLDbConnection and CWLTable classes
