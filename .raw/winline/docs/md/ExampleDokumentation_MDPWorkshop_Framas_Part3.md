MDP II Online Seminar

Example Documentation

Page 2

Table of Contents

1.

1.1.
1.1.1.
1.1.2.
1.1.3.

1.2.
1.2.1.

MDP Seminar Examples .................................................................................................... 3

Print Out of Window Grid Contents to New WinLine Report ................................................. 3
Add New Button to Window MAIN021 ............................................................................... 3
Create new Report Form P99WSHORTTEXTS in CWLPDFE .................................................. 3
Set up CTK Window Script to Print Grid Contents ............................................................... 5

Get Name of Current Company with Database Connection .................................................. 6
System Script to Get Company Name using CWLDbConnection ........................................... 6

1.3.

Display Records From Table T028 in WinLine Window Grid ................................................. 7

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 3

1.  MDP Seminar Examples

The ten examples that are demonstrated in the MDP seminar are documented in full in this document.
All required window, menu and report settings and corresponding CTK window scripts are listed from
the online seminar.

1.1.

Print Out of Window Grid Contents to New WinLine Report

1.1.1.  Add New Button to Window MAIN021

A new button, named "Print Grid" is now inserted in window MAIN021 for user group Management.
The button is assigned type "Menu Button" (i.e., the button offers preconfigured selection options) and
preconfigured button selection "IDDRUCKEN" is assigned to the button as icon.

1.1.2.  Create new Report Form P99WSHORTTEXTS in CWLPDFE

The new report form (PDB) for print out the window grid contents is created in CWLPDFE with menu
item File/New.  The new form should have title "Short Texts" and 6 lines in the form header.

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 4

The following elements are then inserted in the header section new form:

Text:  Report Header "SHORT TEXTS"
Text:  Date + Date Variable 0/16
Text:  Page + Var 500/0
Column header texts:  Short Texts, Name, Option
Line element

The following three variables are inserted in the form middle section to receive the respective grid cell
column contents in the Short Texts window grid:

The new form is then saved under form name "P99WSHORTTEXTS".

Variable 495/0

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 5

Variable 495/1
Varialbe 495/2

1.1.3.  Set up CTK Window Script to Print Grid Contents

The existing CTK window script "SHORT TEXTS" is now modified to implement print out of the window
grid contents to the newly created WinLine form when the "PRINT GRID" button is pressed.

For this purpose a new OnDynamicMenuCommand event handler for object CWLCurrentWindow is
inserted in the script:

Sub CWLCurrentWindow_OnDynamicMenuCommand(nFgId, MenuIndex, bResult)

If nFgId = 799 Then
  Dim typ, myWin

typ =  cwlReportOnPrinter
If MenuIndex = 1 Then

typ = cwlReportOnWindow

  End If

Set myWin = CWLStart.CurrentModule.Windows.Item(21)

  Dim Report

Set Report = myWin.CreateReport(typ, "P99WSHORTTEXTS")

  Dim pagenumber, hflags, mflags

pagenumber = 1

  myWin.Vars(500,0) = pagenumber

hflags = "A"
  mflags = "A"
  Report.Header hflags

  myWin.Vars.CreateVar 495,1,"1",100
  myWin.Vars.CreateVar 495,2,"1",100
  myWin.Vars.CreateVar 495,3,"1",100

  Dim grid, i

Set grid = myWin.Controls.Item(100).Grid

For i = 1 To grid.linecount
  myWin.Vars(495,1) = grid.GetCellValue (i,1)
  myWin.Vars(495,2) = grid.GetCellValue (i,2)
  myWin.Vars(495,3) = grid.GetCellValue (i,3)

If (Report.Middle (mflags) = 1) Then
  Report.Footer hflags
  hflags = "B"
  mflags = "B" & mid(mflags,2,1)
pagenumber = pagenumber + 1
  myWin.Vars(500,0) = pagenumber
  Report.Header hflags
  Report.Middle mflags

  End If

  Next
  Report.Footer "C"

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 6

If (typ = cwlReportOnPrinter) Then
  myWin.CloseReport Report

  End If

  End If

End Sub

When the new report is printed to the screen, the report ID must be configured so that the screen
output window ("report preview window") can be closed before the "Short Texts" window is closed
itself. This is achieved by inserting a new OnCancel event handler for the CWLReport object in the CTK
window script for window MAIN021:

Sub CWLReport_OnCancel(ReportId, MayClose)
  MayClose.value = True
End Sub

1.2.  Get Name of Current Company with Database Connection

1.2.1.  System Script to Get Company Name using CWLDbConnection

The new Select method in the CWLDbConnection class can be used in a system script to obtain the
name of the currently loaded company.

Set up a new system script in WinLine Start named "CompanyName":

Sub CWLScript_OnScriptStart()

  Dim conn, result

' Database connection pf the current company
  Set conn = CWLStart.CurrentCompany.Connection

' obtain the name of the current company (with current FY)

Set result = conn.Select ("Select * from T001 (NOLOCK) where mesocomp = '~~~~' and
mesoyear = yyyy")

' output the name of the current company
general.MsgBox result.value("c000")

End Sub

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 7

1.3.  Display Records From Table T028 in WinLine Window Grid

First, a new WinLine window named "Last 20 Journal Lines" is created in CWLCTK for user group
Management for the display of the ACC1 Journal records. Both Toolbar buttons and an EXIT button
should be inserted in the window. Finally, property "Sizeable" is activated for the new window.

A new grid control element is then inserted in the new window.

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 8

The following properties are set for the grid control:

Width: 85
Height: 16
Resize Horz.: Yes
Resize Vert.: Yes
Colored Stripes: Yes
Lines: Yes
Lines in Header: 1

A CTK window script named FIBU900 is enered in the Macro Name property field for the window.

Create new menu item for new window
Set up a new menu item for user group Management to open the new window in Menu Reports.

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 9

Create CTK window script "FIBU900"

A new OnScriptStart event handler is now entered in the script for the CWLScript object:

Sub CWLScript_OnScriptStart()

  Set myWin = CWLStart.CurrentModule.Windows.Item(900)
  Set conn= CWLStart.CurrentCompany.Connection
  Company = CWLStart.CurrentCompany.Nr

FY = CWLSTART.CurrentCompany.CompanyYear

  General.WaitCursor = True

'On Error Resume Next

  Set T028 = conn.OpenTable2 (28,900,"MESOKEY")

If err Then

general.MsgBox "Error when opening Journal lines"

  myWin.Close
  Exit Sub

  End If

'Create grid columns and connect them to table columns

  Dim grid
  Set grid = myWin.Controls.Item(800).Grid

grid.initUserGrid

grid.IsRedraw = False
grid.AddColumn "Date", "%s", "l", "V",0,28,4,10, SORTFLAG+SIZEFLAG+HIDEFLAG
grid.AddColumn "Debit", "%s","l","V",0,28,9,20, SORTFLAG+SIZEFLAG+HIDEFLAG
grid.AddColumn "Credit","%s","l","V",0,28,10,20, SORTFLAG+SIZEFLAG+HIDEFLAG

     grid.AddColumn "Amount","##,###,###.##","r","V",0,28,2,17, SORTFLAG+SIZEFLAG+HIDEFLAG

grid.AddColumn "Text","%s","l","V",0,28,6,100,SORTFLAG+SIZEFLAG+HIDEFLAG

grid.Header

  Dim Count
  Count = 0
  Dim search
  Set search = T028.Select("order by MESOKEY DESC")

If search.RowCount>0 Then
  Do

grid.AddLine
  Count= Count+1

If search.NextRecord = False Or Count >=20 Then
  Exit Do

  End If
Loop

  End If

grid.IsRedraw = True

  General.WaitCursor = False

End Sub

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 10

Note:
The OpenTable2 method was used instead of the OpenTable method since T028 is a standard mesonic
database table.

The grid.initUserGrid method can only be used on user-defined grid controls, not in grids in the
WinLine standard version.

The grid.header method can only be used with user-defined grid controls.  This method fills the grid
colums with the appropriate column header names.

The grid.AddLine method is only supported with user-defined grid controls.

WinLine MDP Online Workshop: Framas

mesonic 2020

