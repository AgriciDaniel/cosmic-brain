MDP II Online Seminar

Example Documentation

Page 2

Table of Contents

1.

MDP Seminar Examples .................................................................................................... 3

1.1.

Company Car Manager Example ........................................................................................ 3

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 3

1.  MDP Seminar Examples

The ten examples that are demonstrated in the MDP seminar are documented in full in these
documents. All required window, menu and report settings and corresponding CTK window scripts are
listed from the online seminar.

1.1.

     Company Car Manager Example

In the following example, a new window in WinLine START for entry and management of information
on company cars for company employees is created. The window is bound in a CTK script to both a
user-defined table and the standard employees Base Info table in the WinLine database and finally a
new report is defined to print out the information on the company cars.

Table T699 "Company Cars" that was set up in a previous exercise will be used as the database table
for this exercise.

Set up new window MAIN901, title "Company Cars", in CWLCTK for user group
Management

The new window is created with option "Sizeable" activated.

Enter CTK window script "CompanyCars" in the Macro Name field for the window.

In addition a new grid control element (ID800) is inserted with the following properties activated as
illustrated above:

Width: 60

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 4

Height: 15
Resize Horz.: Yes
Resize Vert.: Yes
Colored Stripes: Yes
Lines: Yes
Lines in Header: 1
Chooseable grid: 1
Sizeable Columns:1
Filter columns: 1
Group columns: 1

Both a Menu-type button for printing (IDDRUCKEN), named OUTPUT, and a Toolbar-type button
(IDSAVE), named Save, are inserted in the window.

The Macro Events checkbox is set for the EXIT button as illustrated above.

As a final measure in CWLCTK, a new menu item, "Company Cars" is set up for user group
Management in the Parameters menu to open the new window (menu ID 901):

Set up new report form to print the contents of the Company Cars grid

Create a new report in CWLPDFE with title "Company Car Report" with 7 lines in the form header:

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 5

Then save the report under the form name P99WCOMPANYCARS:

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 6

The following static texts and variables are then entered in the form header area:

Text Report Title Header "Company Car Report"
Text All Employees
Text Date Variable 0/16
Text User Variable 0/14
Numeric Page Variable 500/0
Text Column header "Number" -> Drill Down
Text Column header "Name"
Text Column header "License Plate Number"
Text Column header "Type"
Text Column header "Acquisition date"
Line

The following variables are inserted in the form middle section:

Variable Number 699/0 (activate Drill down option for CWL object "Employees")
Variable Name 500/100 (activate Drill down option for CWL object "Employees")
Variable Licensenumber 699/1
Variable Type 699/2
Variable Acquisition 699/3

Save the report form once again and close the CWLPDFE.

Set up new CTK window script "Company Cars" in WinLine START

First option explicit declarations and a function for copying new employee records into T699 are
declared in the General / Declarations section of the script:

'(Declarations)

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 7

  Option Explicit

  Dim tCC
  Dim t401
  Dim conn
  Dim myWin
  Dim Report

  Set myWin = Nothing
  Set conn = Nothing
  Set tCC = Nothing
  Set t401 = Nothing
  Set Report = Nothing

  Dim Company
  Dim FY

Function OpenAndUpdateTable
  Dim Script

  On Error Resume Next

  Set tCC = conn.OpenTable2 (699,901)

If err Then

general.MsgBox "The Company Car table could not be opened."

  OpenAndUpdateTable = False
  Exit Function

  End If
  OpenAndUpdateTable = True

'Copy employees from T401 "Employee Base Info" that are not in T699 "Company Cars" yet
script = "insert into T699(U000) Select C000 from (T699 L "
script = script & "right join T401 R On L.U000 = R.C000)"
script = script & "where L.U000 Is Null And R.MESOCOMP = '" & Company & "'"

If Not conn.ExecuteSQL (script) Then

conn.CloseTable tCC
general.MsgBox "Error upon synchronizing Company Car table with Employee Base Info"

  Exit Function

  End If

  End Function

'End of (Declarations)

Next, an OnWindowOpen event handler for object CWLCurrentModule is inserted in the CTK window
script to initialize the window grid control and to populate the grid with information from T699 and
T401:

Sub CWLCurrentModule_OnWindowOpen(WindowId)

If WindowId <> 901 Then
  Exit Sub

  End If

  Set myWin = CWLStart.CurrentModule.Windows.Item(WindowId)

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 8

  Set conn = CWLStart.CurrentCompany.Connection
  Company = CWLStart.CurrentCompany.Nr

FY = CWLStart.CurrentCompany.CompanyYear

  General.WaitCursor = True

If Not OpenAndUpdateTable Then
  myWin.close
  Exit Sub

  End If

  Set t401 = conn.OpenTable2 (401,901,"C000")

If err Then

general.MsgBox "Error when opening the Employee Base Info table"

  myWin.close
  Exit Sub

  End If

  Dim grid
  Set grid = myWin.Controls.Item(800).Grid

grid.initUserGrid

grid.isRedraw = False
grid.AddColumn "Number", "%s", "r", "V", 0, 699,0,7,SORTFLAG+SIZEFLAG+HIDEFLAG
grid.AddColumn "Name", "%s", "l", "V", 0, 401,2,20, SORTFLAG+SIZEFLAG+HIDEFLAG
grid.AddColumn "License Plate", "T5,Z20,license number","l", "V", 0, 699, 1, 10,
SORTFLAG+SIZEFLAG+HIDEFLAG
grid.AddColumn "Type", "T1,Z50,Type", "l", "V", 0, 699, 2, 20, SORTFLAG+SIZEFLAG+HIDEFLAG
grid.AddColumn "Acquisition date", "T6,Z15,Acquisitiondate", "l", "V", 0,699,3,
10,SORTFLAG+SIZEFLAG+HIDEFLAG

grid.Header
  Dim search
  Set search = tCC.Select("order by U000")

If Search.RowCount > 0 Then
  Do

'search.CopyResultsToWindow WindowId, 699
t401.get myWin.Vars(699,0)
grid.AddLine
If search.NextRecord = False Then
  Exit Do

  End If
Loop

  End If

grid.IsRedraw = True
general.WaitCursor = False

End Sub

Now, an OnGridNewUserLine event handler is entered for object CWLCurrentWindow to output the row
and column number of a new entered grid line:

Sub CWLCurrentWindow_OnGridNewUserLine(nFgId, nRow, nColumn, bResult)

'

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 9

msgbox "newline row/column: " & nRow & "," & nColumn

bResult.value = False

End Sub

To save entered company car data for an employee in the window grid, a new OnPushButton event
handler is inserted in the script for object CWLCurrentWindow:

Sub CWLCurrentWindow_OnPushButton(nFgId, bResult)

If nFgId = 798 Then  'Save button pressed
  General.WaitCursor = True
  Dim grid, i

Set grid = CWLStart.CurrentModule.Windows.Item(901).Controls.Item(800).Grid
For i = 1 To grid.linecount
grid.GetLineValues i

tCC.update

  Next
  General.WaitCursor = False

  End If

End Sub

To clean up and close table connections, a new OnWindowClose event handler for object
CWLCurrentModule is inserted next in the CTK window script:

Sub CWLCurrentModule_OnWindowClose(WindowId)

If WindowId <> 901 Then
  Exit Sub

  End If

  General.WaitCursor = False

If myWin Is Nothing Then
  Exit Sub

  End If

If conn Is Nothing Then
  Exit Sub

  End If

If Not (tCC Is Nothing) Then
conn.CloseTable tCC

  End If

If Not (t401 Is Nothing) Then
conn.CloseTable t401

  End If

End Sub

A new OnDynamicMenuCommand event handler for object CWLCurrentWindow is next inserted in the
CTK window script to create the report object and print out the contents of the window grid when the
OUTPUT button is printed. As specified in the example goals, the report can be output to the screen or
the printer.

Sub CWLCurrentWindow_OnDynamicMenuCommand(nFgId, MenuIndex, bResult)

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 10

  Dim outputtype

outputtype = cwlReportOnPrinter
If MenuIndex = 1 Then

outputtype = cwlReportOnWindow

  End If

If Not (Report Is Nothing) Then
  myWin.CloseReport (Report)

  End If
  Set Report = myWin.CreateReport (outputtype, "P99WCOMPANYCARS")

  Dim pagenumber, hflags, mflags

pagenumber = 1

  myWin.Vars(500,0) = pagenumber
  hflags = "A"
  mflags = "A"
  Report.Header hflags

  myWin.Vars.CreateVar 500,100,"1",100  'for the user name from T401

  Dim grid, i
  Set grid = CWLStart.CurrentModule.Windows.Item(901).Controls.Item(800).Grid

For i = 1 To grid.linecount

grid.GetLineValues i

'read user name and copy to Var 500/100
t401.get myWin.Vars(699,0)

  myWin.Vars(500,100) = myWin.Vars(401,2)

If (Report.Middle (mflags) = 1) Then
  Report.Footer hflags
  hflags = "B"
  mflags = "B" & mid(mflags, 2, 1)
pagenumber = pagenumber + 1
  myWin.Vars(500,0) = pagenumber
  Report.Header hflags
  Report.Middle mflags

  End If

  Next

  Report.Footer "C"

If (outputtype = cwlReportOnPrinter) Then
  myWin.CloseReport  Report

  End If

End Sub

When the OUTPUT button is pressed (output to screen), the report is printed as in the following
illustration:

WinLine MDP Online Workshop: Framas

mesonic 2020

Example Documentation

Page 11

As in a previous example, an OnCancel event handler for object CWLReport is entered in the CTK
window script to allow the report preview window to be closed before the window itself is closed:

Sub CWLReport_OnCancel(ReportId, MayClose)

  MayClose.value = True

End Sub

Two events for handling clicks on drill-down links in reports (i.e, in the screen preview of the report)
are now inserted in the CTK window script to conclude the example. First an OnDrilldown event
handler for the CWLReport object to register the click:

Sub CWLReport_OnDrilldown(ReportId, DrillDownText, Text)

general.MsgBox "Drilldown text: " & DrillDownText & ",itemtext: " & Text

End Sub

And the second event handler, OnPrintDrillDownItem for the CWLReport object:

Sub CWLReport_OnPrintDrilldownItem(ReportId, DrillDownText, View, Var, ItemText)
  DrillDownText.Value = "For the drilldown of " & myWin.Vars(View,Var)
End Sub

WinLine MDP Online Workshop: Framas

mesonic 2020

