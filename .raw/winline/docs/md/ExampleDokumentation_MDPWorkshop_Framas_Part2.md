MDP II Online Seminar

Example Documentation

Page 2

Table of Contents

1.

1.1.
1.1.1.
1.1.2.

1.2.
1.2.1.
1.2.2.
1.2.3.

MDP Seminar Examples .................................................................................................... 3

Additions to Existing WinLine Grid, Window "Short Texts" ................................................... 3
Add New Column to Existing Window Grid with Combo Box Control .................................... 3
Export Grid Contents to MS Excel ...................................................................................... 4

Modifications to  Existing WinLine Grid in "Voucher Entry" .................................................. 6
Add New Column to Existing Tables T025 and T026 ........................................................... 6
Set up new FAKT Windows 245, 249, 248 in CWLCTK ........................................................ 7
Set up CTK window scripts:  FAKT245 and FAKT248 .......................................................... 8

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 3

1.  MDP Seminar Examples

The ten examples that are demonstrated in the MDP seminar are documented in full in this document.
All required window, menu and report settings and corresponding CTK window scripts are listed from
the online seminar.

1.1.

Additions to Existing WinLine Grid, Window "Short Texts"

1.1.1.  Add New Column to Existing Window Grid with Combo Box Control

First, window MAIN021 is copied to user group Management in CWLCTK. The Macro Events checkbox
is set for the grid control, element ID 100.  In addition, a new button control is inserted in the window
named “Export to EXCEL”. Assign button icon “IDSUMMEN” to the button as icon.

The CTK window script "Short texts" is attached to the window in the Macro Name field.

As documented, new grid columns are added to a grid control in the CTK window script. This is the
next step in adding the new grid column.

Add new column to grid control, element ID 100

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 4

A new OnScriptStart event hander is now entered for object CWLScript in CTK window script "Short
Texts" in WinLine START:

Sub CWLScript_OnScriptStart()
  Dim row, column

  Set myGrid = CWLCurrentWindow.ActiveWindow.Controls.Item(100).Grid

  myGrid.isRedraw = 0

  CWLCurrentWindow.ActiveWindow.Vars.CreateVar 495, 0, "1", 1, "1"
    myColumnNumber = myGrid.AddColumn ("My Column", "T31,Z1,L30,H3,mycombo","l", "V", 0, 495,
0, 20)
  myGrid.MoveColumn myColumnNumber,1

combostring = "0"&chr(9)&"Option 0"&chr(13)&chr(10)
combostring = combostring & "1"&chr(9)&"Option 1"&chr(13)&chr(10)
combostring = combostring & "2"&chr(9)&"Option 2"&chr(13)&chr(10)

  myGrid.SetComboStrings myColumnNumber, combostring

  myGrid.SetColumnColor myColumnNumber, RGB(177, 200, 233)
  myGrid.isRedraw = 1

  myGrid.SetCurrentCell 1, myColumnNumber

End Sub

The new column is inserted in grid element ID 100 in the script, the combo box control is inserted in
the column and the combo box is populated with three selection options. The column is colored in blue
and lastly the new column is moved to a position as first column in the screen display of the grid.

Next a new OnGridCheckUserColumn event handler is inserted in the script for object
CWLCurrentWindow to check on the selection the user has made in the combo box:

Sub CWLCurrentWindow_OnGridCheckUserColumn(nFgId, nRow, nColumn, bResult)

If nFgId = 100 Then

Set myGrid = CWLCurrentWindow.ActiveWindow.Controls.Item(100).Grid
     General.MsgBox "The following values are selected: " & myGrid.Contents

  End If
End Sub

1.1.2.  Export Grid Contents to MS Excel

Lastly, the script is extended to export the grid contents to MS Excel. A new OnPushButton event
handler for object CWLCurrentWindow is inserted in CTK window script "Short Texts", which is fired
when button “Export to Excel” is clicked on in the window.

Sub CWLCurrentWindow_OnPushButton(nFgId, bResult)

If nFgId = 800 Then

Set myGrid = CWLCurrentWindow.ActiveWindow.Controls.Item(100).Grid

  myGrid.ExportasXLS CWLStart.WorkPath & "Short texts.xlsx"

  End If

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 5

End Sub

When the button pressed in the window, the grid contents are exported to the WinLine installation
folder and can be opened in MS EXCEL.

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 6

1.2.  Modifications to  Existing WinLine Grid in “Voucher Entry”

1.2.1.  Add New Column to Existing Tables T025 and T026

First, a new column, "Packingnumber" (Type: "1 String, length 50 characters") is added in the Append
Tables window in WinLine Admin to T025 in the WinLine database (order file header table).

Then add three new columns to T026 in the WinLine database (order file center table):

ProductText: Type "1 String", Length 100
Urgency: Type "1 String", Length 1
Length: Type "4"

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 7

1.2.2.  Set up new FAKT Windows 245, 249, 248 in CWLCTK

For this example, three windows from module FAKT are copied to user group Management.
First, window FAKT249 (Voucher Entry Main Window) is copied to user group Management in CWLCTK.
A new entry field "Packing Number" is inserted into the window.

The edit field control is connected to the new table column with window variable 025/0500.

Secondly, window FAKT245 is copied to user group Management. The "Macro Events" checkbox is set
for existing grid control ID 300 – G02W245) and CTK window script FAKT245 is attached to the
window:

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 8

Lastly, window FAKT248 (Voucher Entry-Save) is copied to user group Management. CTK window
script "FAKT248" is assigned to the window and the "Macro Events" checkbox is activated for the EXIT
button, control ID 99.

1.2.3.  Set up CTK window scripts:  FAKT245 and FAKT248

The CTK window scripts for windows FAKT245 and FAKT 248 will now be set up in WinLine START.

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 9

First, an OnWindowOpen event handler is inserted in script FAKT245 for the CWLSTART object:

Sub CWLStart_OnWindowOpen(AppNr, WindowId)

If WindowId = 245 Then

  Set MyGrid = Cwlcurrentwindow.ActiveWindow.Controls.Item(300).Grid

  MyGrid.Isredraw = 0

'Insert Producttext column in grid

  Mycolumnnumber = Mygrid.Addcolumn("Producttext","T1,Z100,H1,", "l", "V",0,26,500,20)

'Insert grid column with Combobox Urgency

  Mycolumnnumber = Mygrid.Addcolumn("Urgency","T31,Z1,L20,H5,", "l", "V", 0,26,501,10)
  Combostring = "0"&Chr(9)&"no selection"&Chr(13)&Chr(10)
  Combostring = Combostring & "1"&Chr(9)&"low"&Chr(13)&Chr(10)
  Combostring = Combostring & "2"&Chr(9)&"medium"&Chr(13)&Chr(10)
  Combostring = Combostring & "3"&Chr(9)&"high"&Chr(13)&Chr(10)
  Combostring = Combostring & "9"&Chr(9)&"extreme"&Chr(13)&Chr(10)

  MyGrid.Setcombostrings Mycolumnnumber, Combostring

'Insert grid column Length

  Mycolumnnumber = Mygrid.Addcolumn ("Length", "T4,Z14,H1,I2,", "r", "V", 0, 26, 502, 10)
  MyGrid.Isredraw = 1

  End If

End Sub

Note:
Parameter values for the AddColumn method are case-sensitive!

The new voucher header and voucher center grid columns can now be tested with a user in user group
Management.  The respective voucher preview form is now modified to print out the four fields to test
whether the data is being correctly saved.

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 10

In the illustration above, the voucher preview form P02V42PV has been modified to print the packing
number in the form header section, and the three new voucher center grid fields have been included
with Flag N in the form middle section.

Secondly, an OnPushButton event handler is inserted in script FAKT248 for the CWLCurrentWindow
object:

Sub CWLCurrentWindow_OnPushButton(nFgId, bResult)

If nFgId = 99 Then
  CwlStart.CurrentWindow.Vars.Value(25,500) = ""

  End If

End Sub

This script empties the window variable 25,500 (Packing Number) so that the field is empty in the
Voucher Header window after the EXIT button is pressed in the “Voucher Entry – Save” window.

WinLine MDP Online Workshop: Framas

mesonic 2020

