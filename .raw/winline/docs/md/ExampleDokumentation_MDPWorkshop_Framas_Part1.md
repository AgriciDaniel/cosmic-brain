MDP II Online Seminar

Example Documentation

Page 2

Table of Contents

1.

MDP Seminar Examples .................................................................................................... 3

Create New User-Defined Window in WinLine .................................................................... 3
1.1.
1.1.1.
Create a New Window in CWLCTK ..................................................................................... 3
1.1.2.  Make New Window Available in WinLine ............................................................................ 5
1.1.3.
Set Up and Attach New Window Script to New Window ...................................................... 9

1.2.
1.2.1.
1.2.2.

1.3.
1.3.1.
1.3.2.
1.3.3.

New Field in AR/AP Account Base Info ............................................................................. 11
Add New Table Column to Table T051 ............................................................................. 11
Prepare Window MESO086 for User Group in CWLCTK ..................................................... 11

New Field in Sales Rep Base Info .................................................................................... 14
Add New Table Column to Table T034 ............................................................................. 14
Prepare Window FAKT015 for User Group in CWLCTK ...................................................... 14
Prepare and Attach Window Script for Window FAKT015 .................................................. 18

1.4.
1.4.1.

Add New Table to WinLine Database ............................................................................... 21
Add New User-Defined Table to WinLine Company Database ............................................ 21

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 3

1.  MDP Seminar Examples

The ten examples that are demonstrated in the MDP seminar are documented in full in this document.
All required window, menu and report settings and corresponding CTK window scripts are listed from
the online seminar.

1.1.

Create New User-Defined Window in WinLine

1.1.1.  Create a New Window in CWLCTK

Create a new window in CWLCTK for application module area MESO for user group Management:

Note:
Window numbering for user-defined windows starts from 900.

When a new window will be accessed from different modules areas (e.g., from AR/AP Account Base
Info which can be opened in ACC1, ACC2, etc.), you should create the new window in module area
MESO.  When a window will only be used in a particular module (e.g., posting window in ACC1), it can
be created in the relevant module area.

An existing window number in a module area other than MESO always has calling precedence over the
same window number in module area MESO.

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 4

Example:
Window MESO900 and MAIN900 are set up in CWLCTK.  When window ID 900 is opened with a CTK
menu item in module area MAIN, window MAIN900 is opened. When window MAIN900 is deleted,
window MESO900 is opened as default window.

The window name is entered in the Title field of the New Window dialogue:

Insert the following controls now in the new window and assign the following properties:

Edit Field
var length property = 20
view = 495
var = 0000

Checkbox control
view = 495
var = 0001

Combo box control
list height = 5
list width = 22
view = 495
var = 0002

Now insert the button control and assign the IDINFO icon as the button icon symbol to the button
control:

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 5

Addtionally, set the "Macro Events" checkbox property for both the OK and EXIT button controls in the
window.

Once the control elements are inserted in the window (edit field, checkbox, combobox), you can apply
the standard WinLine style guide layout properties to a control with the appropriate menu item. The
controls are formatted automatically:

1.1.2.  Make New Window Available in WinLine

The following four approaches can be used to open a new user-defined window in WinLine:

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 6

Approach 1: Using External Programs

Configure a new macro to open the window:

And start the macro as an external program item:

Approach 2: New Menu Item

Set up a new menu item in module area MAIN in the "Parameters" menu and attach window ID 900 to
the menu:

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 7

Approach 3: From the Cockpit

You can iinsert either a new Cockpit entry with the existing macro or a Cockpit entry for the new menu
item from the previous steps.

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 8

Approach 4: From another CTK script

Set up a CTK window script in WinLine START named MAIN76:

The window script is then attached in CWLCTK to window MAIN076 for user group Management:

The new user-defined window is then opened automatically at the window script startup of menu item
"General Settings" in WinLine START:

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 9

1.1.3.  Set Up and Attach New Window Script to New Window

By means of an attached CTK window script to new window MESO900, the following three actions can
be scripted for the new window:

-  programmatic population of the combo box with three selection options
-  validation check for edit field (field may not remain empty)
-  message box when a window button is clicked on

First open window MESO900 in user group Management and enter macro name "MESO900" as the
window script for the window. Then set up the new CTK window script "MESO900” in WinLine START
in menu item "Parameters/Program Macros/Window Script".

Programmatic population of the combo box with selection options

Insert the OnScriptStart event handler for the CWLScript object in the new script and fill the combo
box with three options.

Sub CWLScript_OnScriptStart()
  Msgbox "Window MESO900 has been opened"

 CWLStart.CurrentModule.Windows.Item(900).Controls.Item(798).Text = "0:Option 1;1:Option
 2;2:Option 3"

End Sub

Note:
The selection option values are separated with ";" and formatted with the list box item number before
the ":", i.e., all text after the ":" is the item value text.

Validation check for edit field

Insert the OnCheckUserField event handler in the CWLCurrentWindow object into the script and use
the bResult parameter to prevent exit of the edit field before an entry has been made in it.

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 10

Sub CWLCurrentWindow_OnCheckUserfield(nFgId, bResult)
  Select Case Nfgid
  Case 798

  Msgbox "OnChangeButton - Combobox"

  Case 799

  Msgbox "OnCheckBox - Checkbox"

  Case 800

  Msgbox "OnCheck – Edit field"
  Msgbox Cwlcurrentwindow.Activewindow.Currentcontrol.Screencontents

If Len (Cwlcurrentwindow.Activewindow.Currentcontrol.Screencontents) = 0 Then
  Msgbox "You have not entered any text!"

bResult.Value = False

  End If

  End Select
End Sub

In the above window script, a message box is also generated when the combo box or checkbox is
changed.

Message box with click on a window button

Insert an OnPushButton handler for the CWLCurrentWindow object in the script and output a message
box when one of the three window buttons is clicked.

Sub CWLCurrentWindow_OnPushButton(nFgId, bResult)

  Select Case nFgId

  Case 797

  Msgbox "OnPushButton - Info"

  Case 98

  Msgbox "OnPushButton - OK"

  Case 99

  Msgbox "OnPushButton - Exit"

  End Select

End Sub

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 11

1.2.  New Field in AR/AP Account Base Info

1.2.1.  Add New Table Column to Table T051

Add a new user-defined table column to T051 (Account Base Info Address) named "Province" with
length 50 characters.

1.2.2.  Prepare Window MESO086 for User Group in CWLCTK

Copy window MESO086 to user group Management in CWLCTK and enter a new edit field control in
the window for entry of the province.

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 12

As illustrated in the screen above, assign View 051 and Var 0500 Province, i.e., the new user-specific
table column to the edit field control.

Note:
Make sure that the new edit field control is not positioned over an existing element in a non-visible
Show-Level in the window.

Note:
The tab order of the control elements (fields, checkboxes, radio buttons, etc.) in the window can be
adjusted with menu item Edit/Input-Order in CWLCTK.

When a province is entered in the new field in the AR/AP Accounts Base Info window, it is
automatically saved (and reloaded when the data record is opened again) without using a CTK script of
any kind in the window.

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 13

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 14

1.3.  New Field in Sales Rep Base Info

1.3.1.  Add New Table Column to Table T034

Add a new user-defined table column to T034 (Sales Rep Base Info) named "Province", type "String",
with length 50 characters in window "Append Tables" in WinLine Admin.

1.3.2.  Prepare Window FAKT015 for User Group in CWLCTK

Open CWLCTK after appending the new table column in T034 and copy window FAKT015 to user
group Management in CWLCTK and enter a new combo box field control in the window for selection of
province from a list of province options.

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 15

As illustrated in the screen above, assign View 034 and Var 0500 Province, i.e., the new user-specific
table column to the combo box control. (List width = 22, list height = 5).

Notes:
In the illustration above the new combo box is inserted in Show-Level 2 in the window.

When the View is defined, you must first click in the field and manually enter "034". After manual
entry, the drop-down box containing all available tables can be used in the field.

The user-defined column in the T034 is named "U000" in the table.  It is automatically associated with
user-defined window variable 0500.

The value in the 'Letters" property of the combo box defines the entry field length of the combo box.
This value effectively defines the number of characters in the table field (here T034.U000) that are
actually displayed or can be entered in the combo box field.

Tab Order Definition of New Control:

The new control is automatically assigned a tab order position at the end of the control tab order list.
You can change the tab order for the control with menu item "Edit/Input-Order":

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 16

When the menu item is activated, the tab order values are displayed next to the control elements in
the window (blue signifies the current tab order value):

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 17

To reorder the tab order, the control from which you would like to reorder the tab order is selected
with the CTRL key pressed at the same time. The color coding changes for all controls before the
selected control and you can click on selected controls after the selected control to reset the tab order:

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 18

1.3.3.  Prepare and Attach Window Script for Window FAKT015

Populate the new combo box field for province selection with a CTK window script named FAKT015
that is attached to window FAKT015 for user group "Management". Enter the name of the new script
first in the "Macro Name" field of the window in CWLCTK.

Then set up the new script, FAKT015, in CWLSTART as a CTK window script. An event handler is
needed first to populate the combo box with province selection values:

Programmatic population of the combo box with selection options

Insert the OnScriptStart event handler for the CWLScript object in the new script and fill the combo
box with the province selection options.

Sub CWLScript_OnScriptStart()
  CWLStart.CurrentModule.Windows.Item(15).Controls.Item(800).Text =

"British Columbia:;Ontario:;Quebec:;Alberta:;Saskatchewan:;Manitoba:;Nova
Scotia:;Yukon:;Price Edward Island:;"

End Sub

Note:
In this script the list box item numbers contain the province names.  The value description is left
empty.

Once the script is saved, you can now test the province selection in Sales Rep Base Info (user from
user group Management) to see if the selected province is saved for existing and new sales rep data
records. In this case, you will find that additional scripting is needed to update or insert the selected

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 19

value in the user-defined table column. For this purpose, two other event handlers are also supported
to offer an opportunity of working with the window content when the values are updated or inserted in
a table.

Update table event when value is written from the combo box to the database table
column

Insert the OnUpdateTable event handler for the CWLCurrentCompany class object in the new script to
save the selected province selection to the appropriate column in the database table.

Sub CWLCompany_OnUpdateTable(TableNo)

Cwlstart.Currentwindow.Vars.Value(34,500) =
Cwlstart.Currentwindow.Controls.Item(800).Screencontents

End Sub

The OnUpdateTable event is fired when changes are made to existing records.

Insert table event when value is written from the combo box to the database table column

Insert the OnInsertTable event handler for the CWLCurrentCompany class object in the new script to
write the selected province selection to the appropriate column in the database table.

Sub CWLCompany_OnInsertTable(TableNo)

Cwlstart.Currentwindow.Vars.Value(34,500) =
Cwlstart.Currentwindow.Controls.Item(800).Screencontents

End Sub

The OnInsertTable event is fired when new records are inserted to the table.

Once the window and scripts have been set up, the province can be selected for a sales rep in the
Sales Rep Base Info window, which is saved to the new user-defined column in the WinLine table.

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 20

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 21

1.4.

Add New Table to WinLine Database

1.4.1.  Add New User-Defined Table to WinLine Company Database

A new user-defined table can be created in the WinLine database in the "Append Tables" window in
WinLine Admin.  Set up a new table named "CompanyCarBaseInfo" by selecting table "new entry" and
add four new columns to the table:

-  Employee number  (String, 50 characters, Unique Index, Index)
-  License plate number (String, 20 characters, value NULL)
-  Auto brand (String, 50 characters, value NULL)
-  Acquisition date (Date, value NULL)

After saving the settings with OK, the new table is visible for instance in the SQL Management Studio.

WinLine MDP Online Workshop: Framas

mesonic 2020

