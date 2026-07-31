MDP Training Workshop
Part 1: New Windows, Database
Modifications

Stephen Griffith, mesonic International
 June 2020

mesonic – benefit guaranteed

© mesonic

MDP Workshop Agenda, Part 1

 Create new WinLine windows

 Add and configure control items in new WinLine windows
 Create new WinLine menu items to open new window
 Attach window script to new WinLine window

 WinLine database modifications

 Insert new table columns in mesonic database tables
 Create new tables in the WinLine database
 Connect new user-defined database columns to user-defined

controls in WinLine windows

mesonic – benefit guaranteed

© mesonic

User-Defined WinLine Windows

 Custom entry windows were previously realized with MS

UserForms with VBScript.

 User-defined windows can now be generated in CWLCTK
 Script functions are attached with a CTK window script, the

same as with standard WinLine windows

 New windows are "real" WinLine windows, i.e., look and feel

of WinLine standard windows

 User-defined windows are created in CWLCTK for

corresponding system user groups.

 All elements in the window send events to the window

script
 Two exceptions: the OK and Exit buttons. Set the "Macro

Events" option to activate event handling for these two buttons

mesonic – benefit guaranteed

© mesonic

User-Defined WinLine Windows

 Event handlers in scripts

 OnPushButton
 OnCheckUserField

 For all other objects

 Retreive entered values in controls

 Cwlcurrentwindow.Activewindow.Currentcontrol.Screencontents

mesonic – benefit guaranteed

© mesonic

User-Defined WinLine Windows

 Supported control elements in user-defined WinLine

windows:
 Edit control
 Background text
 Static control
 Group box
 Combobox
 Checkbox
 Button
 Grid control
 Internet Explorer
 Bitmap

mesonic – benefit guaranteed

© mesonic

User-Defined WinLine Windows

 User-defined windows can be opened:

 From a system or CTK script

 Cwlstart.Currentmodule.Windows.Add(window number)

 From a macro

 e.g., Cwlmacro.Mwindow 900, false

 With a new menu item in WinLine

 New menu items can be inserted for user groups in CWLCTK

 From the Favorites panel
 Using a macro as “external“ application
 From the Cockpit

mesonic – benefit guaranteed

© mesonic

User-Defined WinLine Windows

 Example 1.1

 Create new CTK script
 Create new user-defined window for module MESO in CWLCTK
 Insert WinLine control objects in new window
 Entry field, check box, combobox, push buttons

 Validation check on entry field

 bResult.Value = False – when the field may not be exited

 Open using „External programs“
 With macro „MACRO-MESO900“

 Open with new menu item

 MAIN/Parameter/Demo WinLine window

 Open from the Cockpit

 Insert as menu item or
 Using a macro „MACRO-MESO900“

 Open from another CTK script

 MAIN76 – General Settings

mesonic – benefit guaranteed

© mesonic

New Database Table Columns

 New user-defined columns can now be inserted in standard

WinLine database tables.

 New table manager window in WinLine Admin (menu item

System/Append Tables)

 New table columns are valid for the database, i.e., for all

companies in the database

 Table contents and field definitions are backed up and
restored with corresponding WinLine ADMIN functions.
 New column name is user-defined, the column number is

assigned automatically.

 Variable numbers for user-defined columns begin with 500.

Column numbers begin with "U" and not with "C", e.g., U000,
U001, etc.

mesonic – benefit guaranteed

© mesonic

New Database Table Columns

 Values in user-defined table columns are in many cases

automatically loaded and saved for a data record.

 Depending on the WinLine window, loading and saving of
column values does not even require a CTK window script
 Events are passed to a script with the CwlCompany class for

appended WinLine tables.
 OnUpdateTable (short TableNum)
 OnInsertTable (short TableNum)
 OnDeleteTable (short TableNum, BSTR Key, BSTR WhereStmt)
 These events are triggered for mesonic database tables that

have been appended with user-defined columns.

mesonic – benefit guaranteed

© mesonic

New Database Table Columns

 Example 1.2 -  "AR/AP Account Base Info":

 Add new field "Province" to the AR/AP Account Base Info

window.
 Procedure:

 Table T051 (Account Base Info Address) is appended in WinLine

Admin with an entry field with 50 characters

 Window MESO086 is copied to a system user group in CWLCTK
 A new edit field control is inserted to the CTK window for entry

of the province.

 The new variable value from table T051.U500 is assigned to the

edit field control.

mesonic – benefit guaranteed

© mesonic

New Database Table Columns

 Example 1.3 -  "Sales Rep Base Info":

 Add new field "Province" to the Sales Rep Base Info window.

 Procedure:

 Table T034 (Sales Rep Base Info) is appended with a new text

column with 50 characters

 Window FAKT015 is copied to a user group in CWLCTK.
 A CTK window script is assigned to the window and a combo
box control is added to the window for entry of the province.
 The new variable value from table T034.U500 is assigned to the

combo box control.

 Populate the combobox with province value selections and

program the table events.

mesonic – benefit guaranteed

© mesonic

New Database Tables

 New user-defined tables can be defined within a Winline

company database.

 After a new table name is entered, a new table number is

automatically suggested.

 Table numbers between 650 and 700 can be assigned.
 Data records can be inserted, deleted and updated with CTK

window scripts in user-defined tables.

mesonic – benefit guaranteed

© mesonic

New Database Tables

 Example 1.4 -  "Company Car Table"

 A new user-defined table in the WinLine company database will

be set up with the following columns:

 Employee number
 License plate number
 Auto brand
 Acquisition date

mesonic – benefit guaranteed

© mesonic

Thank you for your participation!

See you at the next seminar!

info@mesonic.com    www.mesonic.com

mesonic – benefit guaranteed

© mesonic

