Development Suite QlikView

1  Development Suite QlikView

1.1  General

This  document  is  not  considered  to  be  a  substitute  for  the  QlikView  help  files  but  rather  an  addition.

Specific  elements  are  described  and  it  is  explained  how  to  use  them  in  MES-Cockpit.  For  any  other

information please refer to the QlikView help files by clicking the menu item "help" or "F1" in the QlikView

editor.

The properties of the single elements can be opened and edited at any time by right clicking.

1.1.1 Data storage in Cockpit

Data presented in MES-Cockpit are divided as follows:

  Basic KPIs

Basic KPIs represent the basis for calculating KPIs and also for displaying information on the

different objects. This information is exported from all connected systems and saved as xml file in

the directory \\<server>\QlikTech\Documents\keyfiguredata\ of the MES-Cockpit server. Basic

KPIs include status information on objects as well as information recorded by HYDRA, e.g.

posted quantities.

Please note: Basic KPIs are used in the Performance Analysis and updated every 30 minutes by

the MDC (Machine Data Collector).

  Master data

Master data of the single objects identifying the different objects and also providing information

such as defined authorizations and users. This information derives to some extent from the

connected HYDRA systems but also from the MES-Cockpit administration system.

The exported information is filed as xml file under the following path:

\\<server>\QlikTech\Documents\masterdata\

  Online data

Online data is used for displaying status information in Production Monitoring and include, e.g.

the current status of workstations, the current ranking list of downtimes or the logged in

operations. This information is exported from all connected systems and saved as xml file in the

directory \\<server>\QlikTech\Documents\onlinedata\ of the MES-Cockpit server.

  Customer-specific storage

All customized elements, such as customer-specific translations are saved as xml file in the

directory \\<server>\QlikTech\Documents\custom\ of the MES-Cockpit server.

MESC_DevelopmentSuiteQV.docx

Version: 1.2.4844

Page 1 of 17

Development Suite QlikView

1.1.2 QlikView

A QlikView document allows for data from different sources and different formats to be used. This may

be:

  Text files with separators

  Results of a database query, e.g. SQL via OLE DB and/or ODBC

  Other QlikView files

  QVD files (several files per QlikView file possible)

  Excel tables in BIFF format (Excel standard format)

  Files with fixed record lengths

  HTML tables

  XML files

1.1.3 Basic QlikView Elements

All  elements  of  a  QlikView  file  (*.qvw)  are  not  only  integrated  but  real  parts  of  the  file.  This  refers,  for

example, to: data, layout, worksheets,  objects, etc. The layout of a QlikView file is, among other things,

characterized by the following elements:

  A - QlikView document

Each button/icon on the home screen represents a QlikView document that can be opened. They

provide the data and worksheets including corresponding elements for evaluation.

Further information can be found here.

MESC_DevelopmentSuiteQV.docx

Version: 1.2.4844

Page 2 of 17

Development Suite QlikView

  B - worksheet tabs and thus the single worksheets

A QlikView document uses at least one worksheet displaying objects. Even though a number of

worksheet objects is located on different worksheets, they are still connected via the QlikView

logic.

  C - Objects, such as list boxes / status boxes

Objects included in a document can restrict data and/or the current restriction can be displayed.

Restriction and, as a result, selection of data affects the entire document. This means, if machine

4711 is selected on the first tab, this restriction will be used for all elements where the machine is

part of the data model.

  D - Diagrams

Diagrams are the graphic presentation of selected KPIs. There are different types of diagrams.

  E - Minimized diagrams

Minimized diagrams are diagrams that can be maximized by double clicking.

  F - Reports

Using reports, selected data can be printed out in a defined format.

All other elements and relevant help files can be opened by clicking F1 if a QlikView document is opened

or via the "Help" button.

1.2  QlikView Document

Each  button/icon  on  the  home  screen  represents  a  QlikView  document  or  an  application  from  the

Production Information area.

Currently, the following QlikView documents are integrated by default in MES-Cockpit 3.1:

  Main document for the Performance Analysis:

\\<server>\QlikTech\Documents\MESC_Main.qvw

  Main document for PerformanceMonitoring:

\\<server>\QlikTech\Documents\MESC_Online.qvw

The original document must not be changed. Provided that modifications are required, the file has to be

copied and renamed. Example: MES_Online_<abbreviation for customer>.qvw

Only then changes to this customer-specific file can be made.

1.3  Start Processing

Processing can only  be performed with a named license by QlikView. This license must be assigned to

the corresponding user via the System Management Console. Only then a qvw document can be opened

and edited by the user.

MESC_DevelopmentSuiteQV.docx

Version: 1.2.4844

Page 3 of 17

Development Suite QlikView

The current Windows login is used as the user's login data, i.e. the user will be verified.

Assignment of licenses

Assignments  take  place  in  the  Management  Console  of  QlikView  in  the  MES-Cockpit  server.  The

assigned users are shown and by clicking the user icon it is possible to remove and/or assign users

MESC_DevelopmentSuiteQV.docx

Version: 1.2.4844

Page 4 of 17

Development Suite QlikView

The license expires if a user does not "connect" to the sever for a long time. In this case, a qvw

document must be opened in the server via the local client in order to connect.

Access is protected for standard documents. Consequently, they can only be opened and edited by users

defined in the document. By default, the users hydadm and mescadm locally installed in the MES-Cockpit

server are defined in the hidden script. Provided that the Designer is installed in the server, the document

can  be  opened  by  the  Windows  login  hydadm  and  the  users  allowed  to  edit  the  document  may  be

defined.

The  users  hydadm  and  mescadm  included  by  default  should  not  be  removed  from  the

document in order to guarantee the default access.

1.3.1 Preparations

Step 1: Copying the required directories

qvw files should always be edited locally. Provided that data should be reloaded, the relevant *.qvw file

and  the  corresponding  sub-folders  should  be  copied  locally.  It  is  recommended  to  copy  the  complete

folder  structure  of  the  Qliktech  folder  from  the  server  (C:\ProgramData\QlikTech)  into  a  local  working

directory

Please note: This folder also includes the exported xml files. Single sites or time frames can be omitted if

not all data is required for the design.

Step 2: Authorizations and responsibility areas

This step can be skipped if the user is already set up in MES-Cockpit and has relevant function

authorizations.

After  copying,  the  user  of  the  *.qvw  file  (Windows  user)  must  be  assigned  to  the  specific  customer,

provided it has not yet been defined as user in MES-Cockpit. To do so, proceed as follows:

  The following authorizations have to be defined for the user in the local file Default.xml (…\MES-

Cockpit\custom\responsibility\Default.xml):

o  MC-WPAnalysis

o  MC-OAnalysis

o  MC-OPAnalysis

o  MC-Overview

  Then  the  corresponding  buffer.qvd  file  (…\MES-Cockpit\custom\responsibility\buffer.qvd)  has  to

be deleted. This file is generated once more by the following action:

MESC_DevelopmentSuiteQV.docx

Version: 1.2.4844

Page 5 of 17

Development Suite QlikView

  Start the MESC_Loader.qvw and reload the file using the shortcut CTRL+R. Afterwards the file

can be deleted once more without saving.

The sole task of the file is to generate the required qvd files.

  Then the qvw file to be edited can be opened.

Step 3: Defining authorizations in the hidden script

This  step  must  only  be  carried  out  in  server  documents.  Authorizations  have  been  removed

from the qvw documents of the CUT package in order to avoid this step.

In order to enable further users to edit qvw documents, they must also be defined in the hidden script. To

do so, proceed as follows in the QlikView document:

Open the menu item "edit script" via File --> Edit Script (CTRL+E) and then edit the hidden script via File -

-> Edit hidden script.

The password opening the hidden script is: Mosbach 74821

The  hidden  script  includes  as  of  row  6  the  users  allowed  to  edit  the  document.  If  an  additional  user  is

required, the new entry must comply with the structure of the existing entries.

<Domain name>\<User>, ADMIN, *, *

Example:

MPDV\USERNAME, ADMIN, *, *

After saving, the file has to be reloaded using the shortcut CTRL+R. If all steps succeeded, the user can

open the qvw file and view the default tabs including data after reloading (CTRL+R).

MESC_DevelopmentSuiteQV.docx

Version: 1.2.4844

Page 6 of 17

Development Suite QlikView

1.3.2 After Processing

After  processing,  the  revised,  customized  qvw  document  can  be  restored  in  the  server  and  is  directly

active and displayed.

Only the qvw document may be restored on the server, as all other data are refreshed in cyclic

intervals and are therefore more up-to-date.

Apart from restoring the qvw file, the steps mentioned in section "Calling up a new evaluation/report with

an existing button" from the document MESC_DevelopmentSuite.pdf are still to be carried out.

MESC_DevelopmentSuiteQV.docx

Version: 1.2.4844

Page 7 of 17

Development Suite QlikView

2  Designer

2.1  QlikView Document Properties

General

General properties of the document, e.g. title and author of the document.

Open

This tab enables different configurations in order to open the document. For example, it can be specified

if a picture is shown while opening the file.

Worksheets

The "sheets" tab of the document properties helps you to keep track of the document's worksheets and

objects. The dialog includes two lists. A list of the worksheets in the upper part and a list of objects in the

lower part. By clicking, the lists can be sorted by any column.

Server

This dialog includes document properties affecting usage in a QlikView server.

Update

If the document is provided in a QlikView server, you can configure an automatic update by executing the

script at regular intervals via this tab.

Variables

Listing of all variables used in the document and/or defined for the document.

Security

Here you can define the properties for the users' rights for documents. By default, all options are selected

(enabled). Users with administrator rights may access this dialog at any time and change the settings. But

the settings can prevent other users from changing the layout of the document.

Trigger

In the "trigger" dialog, you can define that activities (including macros) are executed with specific events

(relating to the document or single fields or variables).

Groups

Please  note:  The  tab  "groups"  is  only  available  if  the  document  includes  data  and  the  script  has  been

reloaded once.

This tab allows you to divide fields of the document into groups.

MESC_DevelopmentSuiteQV.docx

Version: 1.2.4844

Page 8 of 17

Development Suite QlikView

Tables

When data that includes circular references is loaded into QlikView, loosely coupled tables are created

automatically. This avoids that the circular references create a loop in the QlikView internal logic. These

loosely coupled tables need to be handled in order to visualize data in a way that is expected and

understandable.

Sort

The properties tab allows for the sort sequence of each field to be configured. (You can also define the

sort sequence in the properties of the object: define sorting).

Presentation

Here you can define the default settings for presenting field values for created list boxes and multi boxes.

Available fields are listed in the "fields" group.

Numbers

This properties tab provides number formats for all fields and variables of the document.

Encryption

Only users with admin rights can access this page. You can encode the data of one or several fields.

Modifications

In this tab you can select modifications to change the layout of the document.

Please note: In QlikView documents active modifications only become effective in the AJAX client or the

WebView mode.

Font

You can set the font type, font style and font size in this dialog.

Layout

The

page

"layout"

exists

in

the

properties

dialogs

of

objects

and

documents.

Consequently, the settings refer to a single object or to all objects of the document.

Title bar

The page "title bar" exists in the properties dialogs of objects and documents. Consequently, the settings

of the "properties" page of the document refer to a single object or to all objects of the document.

On the page "title bar" you can configure the title bar of one or several objects.

2.2  Worksheet

The worksheet menu is opened by right clicking an empty space on the worksheet or, if the worksheet is

active, via the menu below the object on the menu bar.

MESC_DevelopmentSuiteQV.docx

Version: 1.2.4844

Page 9 of 17

Development Suite QlikView

A  QlikView  document  uses  at  least  one  worksheet  displaying  objects.  Even  though  a  number  of

worksheet objects is located on different worksheets, they are still connected via the QlikView logic.

The menu provides, among others, the following items:

  Properties: leading to the properties dialog of the worksheet. Here you can select a background

image or change the layout of objects on the worksheet.

  New  Sheet  Object:  a  new  object  can  be  inserted  in  the  worksheet.  To  do  so,  a  list  of  available

elements that may be inserted opens.

  Copy  Sheet:  the  currently  selected  worksheet  is  copied  1:1  and  added  as  the  last  tab  to  the

existing tabs.

  Remove: deletes the worksheet including all displayed objects

2.2.1 Worksheet Properties

The following worksheet properties should be emphasized:

  General

o  Show  workplace  -  condition:  an  authorization  necessary  to  view  the  workplace  may  be

defined here.

Example from the workplace analysis:

=$(ISAUTHORIZED('MC-WPAnalysis'))

  Security:  the  user's  properties/rights  can  be  defined  in  the  "security"  tab.  Thus,  a  user  can  be

prevented, for example, from changing the size and position of displayed objects.

2.2.2 Formatting of the worksheet

Objects included in the document can be aligned using the menu item "Layout" --> "Align/Distribute"

MESC_DevelopmentSuiteQV.docx

Version: 1.2.4844

Page 10 of 17

Development Suite QlikView

Please note: Several objects can be selected at the same time using the mouse pointer and a window or

by holding the shift key.

2.3  Objects in QlikView

QlikView objects are the elements used for the selection and display of selected data. There are different

elements.

New  objects  can  be  inserted  via  the  context  menu  in  the  worksheet  "New  object".  If  several  inserted

objects are selected they can be aligned via the context menu.

The following objects are available in QlikView and/or can be integrated:

  List box

  Table box

  Status box

  Text box

  Charts

The properties of single objects can be opened and edited by right clicking the objects on the title bar.

2.3.1 List Box

The  list  box  is  the  simplest  and  most  common  object  used  in  QlikView.  It  represents  a  field  of  a  data

source  and  includes  a  list  of  all  field  values.  It  has  mainly  been  designed  to  select  and  restrict  the

displayed data. All displayed values are presented "distinctly"

List box properties

Can be started by right clicking the header.

  General: General properties, such as the title of the list box

MESC_DevelopmentSuiteQV.docx

Version: 1.2.4844

Page 11 of 17

  Formulas: Formulas presented in the list box, whereas each formula corresponds to a column in

Development Suite QlikView

the list box

  Sorting: Definition of the sort sequence of values

  Presentation: Configuration of the list box displayed in the worksheet

  Numbers: Definition of number formats specific to the list box

  Font: Definitions for presentation

  Layout: Definition

  Title bar: definitions for the title bar and available functions in the title bar

Inserting a new list box

Right mouse click the worksheet --> New object --> List box

Example: Creating a new list box including machine descriptions and the following characteristics:

  Definition of a multilingual title

  The title bar should show the search icon and the Excel export icon

Solution: Choose wm.designation (machine description) in the drop-down list of the  field  and  define the

following  in  the  "title"  field:  =$(LOCALIZE('lkWorkplaceDesignation')).  You  also  have  to  select  the

"search" icon and the "Export to Excel" icon in the title bar tab.

2.3.2 Table box

The table box is an object showing several fields at the same time. Values are displayed in data records,

i.e. related values are displayed in one row. Any fields can be combined in a table box, even though they

derive from different data sources.

Table box properties

The properties of a table  box can be opened by right  clicking the header (context menu). The following

options are provided:

  General

o  Title: title of the element "table box" on the worksheet

o  Available fields: fields of the table box

  List of fields provided by the data model



Inserted fields displayed in the table box

o  Settings for the selected field

  Name:  definition  of  the  field  name  for  the  field  selected  in  the  list  of  inserted

fields. The function LOCALIZE allows for a LanguageKey to be defined

  Sorting: definition of the sort sequence of displayed information

MESC_DevelopmentSuiteQV.docx

Version: 1.2.4844

Page 12 of 17

Development Suite QlikView

  Presentation: definitions for display and presentation of information, e.g. left-aligned and if a drop-

down box should be used

  Design: definitions for the display, e.g. the color of the table box

  Numbers: definitions for the display of numeric values, e.g. two decimal places

  Font type

  Layout of the complete object, e.g. with shadow effect

  Title bar: definitions for the title bar and available functions in the title bar

2.3.3 Status box

The status box lists statuses by the name and value of fields. This tool shows the same information as the

"selection status" dialog. But like any other object, it is directly located in the worksheet. The "indicators"

dialog  is used in order to differentiate between selected and  blocked values. In  MES-Cockpit the status

box has been integrated with the title "selection status"

Status box properties

The properties of a status box can be opened by right clicking the header (context menu). The following

options are provided:

  General

o  Title

Caption displayed in the status box. A multilingual text can be defined via the LOCALIZE

function. Default example:

=$(LOCALIZE('lkSelectionStatus'))

o  Displayed columns

The columns displayed in the status box can be selected.

  Layout

o  Shadow

Defines how the status box is presented on the worksheet.

  Title bar

o

"Show title" checkbox

If this option is enabled, a title bar including defined title is shown.

o  Title text

The defined text corresponds to the title of the "general" tab.

o

Icons

The parameters displayed in the status box can be selected.

MESC_DevelopmentSuiteQV.docx

Version: 1.2.4844

Page 13 of 17

Development Suite QlikView

2.3.4 Text box

Text boxes have been designed to display any texts or pictures on the worksheet in order to improve the

layout of the  document. They can be inserted  at any  position  on the  worksheet even in areas including

other objects.

2.3.5 Charts

Charts  are  graphic  presentations  of  numeric  data.  The  chart  type  is  defined  in  the  dialogs  "chart

properties", "general". The following chart types are available:

Chart type

Description

Sketch/example

Bar charts

Particularly suitable for comparing similar

values. Common and plain chart type.

Line chart

Line charts present data as lines between the

single values, either only as single values or as

lines and values. This chart type is especially

useful to present developments and trends.

Combination

The combination chart is a combination of bar

charts

charts and line charts. The values of one

formula can be presented as bar chart and the

values of another formula may be displayed as

line or scatter chart.

Radar charts

A radar chart is a line chart with the x-axis

aligned on a circle (360°). Separate y-axes are

radially aligned for each variable of the x-axis.

Sometimes this chart type is also referred to as

spider chart.

MESC_DevelopmentSuiteQV.docx

Version: 1.2.4844

Page 14 of 17

Gauge chart

Gauge charts show the result of a single

formula without referring to the field values.

Development Suite QlikView

Scatter charts

The scatter chart presents value pairs from two

formulas. This is useful in cases when two

formula values should be assigned to each

dimension value (e.g. population and growth of

population for each country).

Pie chart

Pie charts usually represent the relation

between a single dimension and a formula. But

you may also define a second dimension.

Funnel charts

The funnel chart is especially useful if distribution

data and process data should be displayed. It is

similar to the pie chart. The segment's height

(and/or width for horizontal orientation) or surface

depend on the value of the formula. Alternatively,

the same height or width can be used for the

segments. But it is recommended to show numeric

formula values.

Mini charts

Small diagrams included in table cells enabling

compact comparisons.

Pivot table

Pivot tables are a powerful means of data

analysis They have extensive functions but

they are still easy to operate. Pivot tables show

dimensions and formula values in lines and

columns, e.g. as cross-tabulation. Data may be

grouped in different ways. In addition, partial

sums can be displayed in pivot tables

MESC_DevelopmentSuiteQV.docx

Version: 1.2.4844

Page 15 of 17

Development Suite QlikView

Table chart

In contrast to pivot tables, table charts cannot

display partial sums and they cannot be used

as cross-tabulation. But each column can be

sorted as required and each row includes a

combination of dimension(s) and formula(s).

2.4  QlikView reports

Data can be printed out via the print function or a report. A report summarizes several charts  and tables

to display and print them together.

QlikView  provides  a  Report  Editor  allowing  to  combine  different  objects  of  one  or  several  dialog  pages

into a clearly structured report and to define the corresponding headers and footers.

QlikView differentiates between four types of reports:

  Document

They are created and saved within a QV document. Users can access the documents locally or

via the QV server.

  Users

MES-Cockpit does not allow creating user-related reports.

  Personal

MES-Cockpit does not allow creating personal reports.

  Shared server

MES-Cockpit does not allow creating reports on a shared server.

In the local client reports can be managed in the "Reports" menu of the Report  Editor. A list of available

reports is shown and new reports can be created by choosing the option "Edit reports". MES-Cockpit, i.e.

the web client, does not allow creating new reports but existing reports can be opened.

2.4.1 Designing reports

The Report Editor opens and the following options are available when clicking the menu item "Reports" --

> "Edit Reports":

  Create new report (

,

 or via the menu item "Reports" – "Insert“)

  Delete existing reports

  Change report settings

MESC_DevelopmentSuiteQV.docx

Version: 1.2.4844

Page 16 of 17

Development Suite QlikView

Report settings

Starting via "Reports", "Report settings" including the following contents

  Settings: settings affecting the complete report, such as title, paper size and viewing conditions

  Margins: definition of margins in cm in the report

  Header/footer: configuration of headers and footers for the entire report

  Selection: defining the data to be displayed in the report:

o  Current selection: selected data is displayed in the report and can be printed

o  Unselect: all selections made are canceled and data is printed without selection

o  Bookmark: the bookmark selected in the drop-down list is started before printing. Original

selection will be restored after printing

Once a report has been created, it can be switched to the Data Sheet Editor by double clicking the report

list or via the button "Edit >>".

Data sheet editor

The  Data  Sheet  Editor  allows  "designing"  the  selected  report.  Reports  are  designed  by  inserting  data

sheets. The following two types are differentiated:

  One-sided data sheets:

They may include any number of objects. The one-sided data sheet is always printed on one

page. The objects must be adjusted to the page size.

  Multi-page data sheets

They only include one object that might extend over several pages. The number of pages

depends on the number of data to be printed.

MESC_DevelopmentSuiteQV.docx

Version: 1.2.4844

Page 17 of 17

