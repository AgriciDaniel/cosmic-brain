MDP Training Workshop:
Part 3: User-defined Grids, User-defined
Reports

June 2020
Stephen Griffith, mesonic International

mesonic – benefit guaranteed

© mesonic

MDP Workshop Agenda

 Create new WinLine report forms
 Print out data from a WinLine window, e.g., a grid control, to
the new WinLine report form with the CWLReport objects
 Obtain SQL connection information with CWLDBConnection

object methods

 Perform SQL Select statement with CWLDBConnection object

methods

 Open WinLine database tables with CWLTable methods
 Read, write and delete data to a WinLine database table with

the CWLTable object methods

mesonic – benefit guaranteed

© mesonic

Reports

 WinLine reports can be output with MDP scripts.
 Both existing forms as well as new user-defined forms can be

used for output

 New forms are created in CWLPDFE
 New user-defined forms apply PDI "P99WUSERDEFINED"
 Reports are generated from the CwlWindow Class and closed

from the class
 CwlReport CreateReport (short Type, BSTR Name, VARIANT
left, VARIANT top, VARIANT width, VARIANT height, VARIANT
Description, VARIANT SpoolfileName)

 This function creates a CwlReport object, with which a report can

be output.

 void CloseReport (CwlReport Report)

 This function closes the report object. The report can no longer be

used for further output.

mesonic – benefit guaranteed

© mesonic

Reports – CWLReport Class

 Properties:

 BSTR Name

 Name of report

 short Type

 Output type of report:

– 1... To screen
– 2... To printer
– 4... To spooler

 BSTR HeaderFlags

 The "flags" that are currently active for the header and footer.

 BSTR MiddleFlags

 The "flags" that are currently active for the form middle section.

 short MultilinesLeft

 Number of lines of a multi-line text that will be printed on next

page due to page break.

mesonic – benefit guaranteed

© mesonic

Reports – CWLReport Class

 BSTR Title

 Form title (name) (max. 50 characters) that is saved in the spool

file.

 BSTR Description

 The report description (max. 100 characters) that is saved in the

spool file and is shown, for example, in the grid of printed
documents in the Despooler window.

 BOOL ShowAbortWin

 This property determines whether a small window with the printing
progress is displayed, including an option to cancel the print out.

 DWORD Id

 This property is a number that is unique for each report while the

program is running.

 BOOL EnableDrilldown

 When the property is set to TRUE, drill-down entries are active for

mouse clicks.

mesonic – benefit guaranteed

© mesonic

Reports – CWLReport Class

 Methods:

 BOOL Header (VARIANT Flags)

 The header section of the report description is

printed.

 short Middle (VARIANT Flags)

 The middle section of the report description is printed

with this method.
 BOOL Footer (VARIANT Flags)

 The footer of the report description is printed.

mesonic – benefit guaranteed

© mesonic

Reports – CWLReport Class

   Events:

 OnPrintDrilldownItem (int ReportId, ICwlEventResult

*DrillDownText, short View, short Var, BSTR ItemText)
 Event is fired when an entry that is coded as a drill-

down element is clicked on in a report.
 OnCancel (int ReportId, ICwlEventResult *MayClose)

 This event is fired when the STOP button is pressed in
the report or the report window is closed ("red X").
 OnDrilldown (int ReportId, BSTR DrilldownText, BSTR Text)

 This event is fired when the user clicks on a drill-down

element.

mesonic – benefit guaranteed

© mesonic

Reports – CWLReport Class

 Example 1.1:

 The contents of the entry grid in window "Short Texts" will be

printed out in a WinLine report.

 Output can be either to the screen or a printer

 Procedure:

 A new button of type "Menu Button" is inserted in the window

for a user group in CWLCTK

 When IDDRUCKEN is selected as "Predefined Buttons" for a "Menu

Button", the output options for screen or to printer are
automatically made available!

 A new report PDB is created in CWLPDFE named:

 P99WSHORTTEXTS

 Modify the existing CTK window script to print the contents of
the window grid to the screen or printer and to set the option
for closing the report output window separately when output is
to the screen.

mesonic – benefit guaranteed

© mesonic

Database – CWLDbConnection Class

 This object describes a database connection.
 Previously there were three properties available for obtaining

information on a database connection.

 Properties:

 CWLDbConnectionType Type
 Returns database type
 BSTR DatabaseName

 Returns database name

 BSTR ServerName

 Returns name of server

 The Class has now been expanded with the following

methods:

 CWLSearchResult *Select (BSTR Statement)

 A SQL statement is executed on the database connection

mesonic – benefit guaranteed

© mesonic

Database – CWLDbConnection Class

 CWLTable* OpenTable (BSTR strTableName, int

ViewNumber, BSTR KeyColumn, int WindowId, VARIANT
UseCompany)
 This method opens the table with the specified name in the

current database connection.

 This function is used for tables that do not use the

nomenclature of mesonic tables (Txxx).

 CWLTable* OpenTable2 (short Number, short WindowId,

VARIANT KeyColumn)
 This method opens a table with number ‘Number’, whereby the

table must conform to the mesonic nomenclature (Txxx,
whereby xxx is a number with leading zeros).

 void CloseTable (CWLTable* pTable)

 This method closes the opened table and discards the created

variables.

mesonic – benefit guaranteed

© mesonic

Database – CWLDbConnection Class

 BOOL ExecuteSQL (BSTR Statement)

 This method carries out a SQL statement.

mesonic – benefit guaranteed

© mesonic

Database – CWLDbConnection Class

 Example 1.2:

 Obtain the company name of the current company from the

Company Base Info table

mesonic – benefit guaranteed

© mesonic

Tables – CWLTable Class

 When a table has been opened with the CWLDbConnection
class, an object of the CWLTable class is available to access
the table.
 Properties:

 Name (BOOL, read only)

 Name of the table is held in this property.

 Valid (BOOL, read only)

 This property contains the information whether the table was

successfully opened.
 MaxColIndex (int, read only)

 The index of the last defined column is saved in this property (this
corresponds to the last of the variables that were created for this
table).

mesonic – benefit guaranteed

© mesonic

Tables – CWLTable Class

 Methoden:

 VARIANT Value (VARIANT column)

 Use this method to access the variables in the table (the table

column values).

 void Value (VARIANT column, VARIANT newValue)

 Use this method to change a column value.

 BOOL Get (BSTR Key, VARIANT ExpandKey)

 Use this method to read out a data record with a unique ‘Key’.

 BOOL Update ()

 Use this method to update the data record last loaded.

 BOOL Insert ()

 Use this method to insert a new data record.
 BOOL Delete (BSTR Key, VARIANT WhereStmt)

 Use this method to delete one or more data records.

mesonic – benefit guaranteed

© mesonic

Tables – CWLTable Class

 The following function can be used only with user-defined tables:

 BOOL Update ()
 BOOL Insert ()
 BOOL Delete (BSTR Key, VARIANT WhereStmt)

mesonic – benefit guaranteed

© mesonic

Tables – CWLTable Class

 Example 1.3: The last 20 journal lines from the ACC1 Journal
 Display the last 20 ACC1 journal lines (records) in a grid in a

new WinLine window

 Procedure:

 Set up a new window ACC1 in CWLCTK for a user group
 Create new CTK window script
 Insert a grid control object
 Create a new menu item in ACC1 to open the new window
 Define and control the grid in the CTK window script
 Read out the last 20 records of the ACC1 Journal, table T028,

using the CWLtable class and populate window grid with them.

mesonic – benefit guaranteed

© mesonic

Thank you for your participation!

See you at the next seminar!

info@mesonic.com    www.mesonic.com

mesonic – benefit guaranteed

© mesonic

