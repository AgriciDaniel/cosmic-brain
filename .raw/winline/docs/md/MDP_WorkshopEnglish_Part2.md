MDP Training Workshop:
Part 2: User-defined Grids

Stephen Griffith, mesonic International
 June 2020

mesonic – benefit guaranteed

© mesonic

MDP Workshop Agenda

 Insert new columns in WinLine standard grids & new control

types in WinLine standard grids

 Insert user-defined grids in WinLine windows (standard and

new windows)

mesonic – benefit guaranteed

© mesonic

Grids

 Existing standard entry grids can now be adapted and

scripted in WinLine windows.

 Grid operations, adding new grid columns and scripting, are

performed with CTK window scripts.

 New user-defined grids can also be created (grid control).
 Lines can be inserted and removed in user-defined grids.

mesonic – benefit guaranteed

© mesonic

Grids - CWLFgControl

 New Grid  function in CWLFgControl object

 SetGridColReadOnly (long logColumn, VARIANT bSet)
 Sets the specified column to “read only“, or removes the

“read/only“ status.

 GetGridColReadOnly (long logColumn)

 Checks whether the specified column is set to “read-only“ or not.

mesonic – benefit guaranteed

© mesonic

Grid – CWLGrid Class

 New class for reading, controlling, and manipulating existing

and new user-defined WinLine entry grids.

 Properties:

 VARIANT Contents

 Contents of current cell.

 long LineCount

 Number of lines in grid

 long ColumnCount

 Number of columns in grid

 BOOL IsRedraw

 Status whether changes in the screen grid display are refreshed on
the screen immediately or not (property can be set so that several
grid changes are performed before the grid display is actually
refreshed).

mesonic – benefit guaranteed

© mesonic

Grid – CWLGrid Class

 Methods

 BOOL SetCurrentCell (long row, long col)

 Sets focus to the desired cell.

 BOOL GetCurrentCell (VARIANT *row, VARIANT *col)

 Determines the current active cell in the screen grid and sets the
passed row and col parameters to the corresponding value.

 BOOL ExportAsXLS (BSTR NameAndPath)
 Exports the screen grid to XLS format.

 BOOL Load (BSTR Settings)

 Loads all settings in the screen grid under the name specified with

parameter Settings.
 BOOL Save (BSTR Settings)

 Saves all settings in the screen grid under the name specified in the

Settings parameter.  Existing data saved under this name is
overwritten.

mesonic – benefit guaranteed

© mesonic

Grid – CWLGrid Class

 VARIANT GetCellValue (long row, long col)
 The cell value at row and col  is returned.

 BOOL GetColumnReadOnly (long col)

 Returns the “read only“ status of the specified column (col)

 SetColumnReadOnly (long col, VARIANT bSet, VARIANT

bRedraw)

 Sets specified column to “read only“.  Columns set to read only are

displayed in a separate color and can no longer be selected.

 long AddColumn (BSTR ColumnTitle, BSTR ColumnControl,

BSTR align, BSTR Type, int Font, int View, int Var, int ColWidth,
VARIANT AddFlags, VARIANT ColumnColor, VARIANT bRedraw)
 Adds a new column at the end of the screen grid. A screen grid can
have a maximum of 199 columns, i.e., no more columns can be
inserted above this limit.

mesonic – benefit guaranteed

© mesonic

Grid – CWLGrid Class

 BOOL RemoveColumn (long col, VARIANT bRedraw)

 Removes an inserted user-defined column.  Standard grid columns

cannot be removed.

 SetColumnColor (long col, RGB color)

 Column col is set to color color. The value is specified as RGB

value.

 RGB GetColumnColor (long col)

 This method returns the RGB color of column col. When no color is

set, -1 is returned as value.

 BOOL MoveColumn (long col, long Position)

 Moves the specified column (col) to position Position.

 BOOL SetColumnWidth (long col, long Width)

 Changes the column width of column col to value Width (in screen

units).

 long GetColumnWidth (long col)

 This function returns the width of column col in screen units.

mesonic – benefit guaranteed

© mesonic

Grid – CWLGrid Class

 long GetLogColumn (long ColumnOnScreen)

 This function returns the logical column number of the screen grid

column ColumnOnScreen.

 long GetPhysColumn (long col)

 This function returns the position of column col on the screen.

 SetComboStrings (long col, BSTR theStrings)

 This function is used to set combo box selection options for

columns that contain a combo box control.

 Validate

 When the text of a cell is changed (e.g., with a macro command),
you can use this method to trigger the validation check of the
entered value, which is also triggered by the
OnGridCheckUserColumn event.

 Refresh

 This function causes a refresh of the screen display of the grid.

 BOOL IsUserColumn (long logColumn)

 This function determines whether column col is a user-defined

column that has been inserted by script to the grid.

mesonic – benefit guaranteed

© mesonic

Grid – CWLGrid Class

 BOOL Header ()

  This function outputd the header section of the grid control.

 BOOL Footer ()

 This function outputs the footer section of the grid control.

 BOOL AddLine ()

 This function inserts a new row at the end of the grid.

 BOOL RemoveLine (long Row)

 This function removes the row in number line.

 BOOL InsertLine (long Row)

 This inserts a new row before the grid row specified with number

line.

 BOOL ReplaceLine (long Row)

 This function replaces the row with number line with a new row.

 GetLineValues (long Row)

 This function copies the respective column values of the row with

number line into the variables associated with the columns.

mesonic – benefit guaranteed

© mesonic

Grid – CWLGrid Class

 BOOL InitUserGrid ()

 This function initializes the grid object and connects the variables of

the window with the grid.

 BOOL SetColumnTitle (long line, long col, BSTR Text)

 This function is used to change the text in a column header. Also

for existing standard columns!

 The following functions are supported only for user-defined grid

controls:

 BOOL Header ()
 BOOL Footer ()
 BOOL AddLine ()
 BOOL RemoveLine (long line)
 BOOL InsertLine (long line)
 BOOL ReplaceLine (long line)
 GetLineValues (long line)
 BOOL InitUserGrid ()

mesonic – benefit guaranteed

© mesonic

Grid – CWLGrid  - AddColumn

 Method adds a new column at the end of a window grid.
 Parameter:

 ColumnTitle

 Column header text

 ColumnControl

 Text that describes the control
 e.g., “T1,Z10,L1,Myentryfield“ for text entry
 „T2,Z5,Myentryfield“ for entry of an integer value
 „T3,Z15,I2,L1,Myentryfield“  double with 2 decimal places

 Align

 Column alignment (left, right, centered)

 Type

 The type of cell (static text, variable, icon symbol)

 Font

 The font combination number from  CTK

mesonic – benefit guaranteed

© mesonic

Grid – CWLGrid  - AddColumn

 View

 The table (or 0) from which the variable value comes

 Var

 The variable number within the View.

 ColWidth

 The width of the column in screen units (font dependent)

 AddFlags (Optional)

 A combination of values that control column behavior (sortable,

hidden, readonly, moveable, column width, etc.)

 ColumnColor (Optional)
 A separate column color.

 Redraw (Optional)

 Specifies whether changes to the grid are displayed immediately or

not. When not specified, the value is TRUE.

 When FALSE is specified, the Refresh method must be called and

set to TRUE later on to display changes.

mesonic – benefit guaranteed

© mesonic

Grid – CWLGrid Class

 Events:

 OnGridCheckUserColumn (int nFgId, int row, int column,

ICwlEventResult *bResult)

 Event is fired when a column field in a window grid that contains a

combo box or edit field is exited in an inserted column.
 OnAfterEvent (int nFgId, int EventType, int Originalresult)

 Two new event types were added:

– New line in a table (EventType = 29)
– Switch to a cell in a table (EventType = 21)

mesonic – benefit guaranteed

© mesonic

Adding Columns to Standard WinLine Grid

 Example 1.5: Window “Short Texts“:

 Insert new column with combo boxes into the grid control in

window “Short texts“

 Move the column to a different screen position
 Color the column in blue
 Check the selection in the combo box
 Export the grid contents to MS Excel

 Procedure:

 Copy window MAIN021 in CWLCTK to user group Management.
 Attach CTK window script “Short texts“ to the window and set

the Macro Events checkbox for the grid control element.
 Program the events and actions in the “Short texts“ CTK

window script.

mesonic – benefit guaranteed

© mesonic

Grid Additions to Existing WinLine Grid

 Example 1.6: “Voucher Entry“:

 The voucher header database table is appended with a new

column for “packing number“.

 The voucher center database table is appended with three new

columns “Product text“, “Urgency“ and “Length“.

 When entering vouchers in the “Voucher Entry“ window, values

are entered in the new fields.

 Print out of the new values in the “Voucher Preview“ window.

 Procedure:

 Add database table columns in tables T025 and T026.
 Attach CTK window scripts to windows FAKT245 and FAKT248

and set the Macro Events checkbox for the grid control element.

 Program the events and actions in the CTK window scripts.

mesonic – benefit guaranteed

© mesonic

Thank you for your participation!

See you at the next seminar!

info@mesonic.com    www.mesonic.com

mesonic – benefit guaranteed

© mesonic

