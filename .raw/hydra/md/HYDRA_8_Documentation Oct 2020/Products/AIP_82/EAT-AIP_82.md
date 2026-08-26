Manual

Advanced Configurations:
MES Terminal AIP
EAT-AIP 8.2

Version 1.1.23049

Last changed on: 01.09.2020

Advanced Configurations: MES Terminal AIP

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying  and  distribution  of this  documentation  or  any  part thereof,  for  any  purpose  or  in  any  form, is  prohibited  without  prior
written permission from MPDV Mikrolab GmbH.

EAT-AIP_82.docx

Page 2 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

The information contained in this documentation is subject to change without prior notice.

EAT-AIP_82.docx

Page 3 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Contents

1  Extended Application Training: MES Terminal ............................................ 8

2  AIP2 Operation ............................................................................................. 9

2.1  Special Control and Display Elements on the AIP2 ............................................. 9

2.2  General description of the posting process on the AIP2 .................................... 12

3  Main View with Tiles ................................................................................... 16

3.1  Main view – header and footer .......................................................................... 16

3.2  Main view with "tiles" ......................................................................................... 18

3.3

Icon view of workplaces .................................................................................... 24

4  Basic Screen as List View .......................................................................... 26

4.1  Basic screens – header and footer .................................................................... 26

4.2  Basic screen “tabular view“ ............................................................................... 28

4.3  Basic screen "machine overview" ...................................................................... 31

4.4

“Machines as icons” basic display ..................................................................... 34

5  AIP2 -Local Configuration .......................................................................... 35

5.1

Local Configuration ctaip.ini .............................................................................. 35

5.2  PNG – Files / Bitmaps ....................................................................................... 39

5.2.1  File pict.zip ............................................................................................ 39

5.2.2  File pict_cust.zip .................................................................................... 39

5.3  Multilingualism (*.mld files) ................................................................................ 40

6  AIP2 - Central Configuration File hytnrcfg.ini ............................................. 41

6.1

Layout configuration .......................................................................................... 44

7  AIP2 - Local Configuration File ctaiplay.ini ................................................ 47

7.1  Formulas used in grid layout ............................................................................. 52

7.2  Translations in grid layout .................................................................................. 54

7.3  Table of color values ......................................................................................... 56

7.4  Modifications to GRID configuration / clipboard ................................................. 57

7.5  Configuration of basic screens .......................................................................... 59

EAT-AIP_82.docx

Page 4 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

7.5.1  Available fields for the dialog configuration of basic screens ................. 61

8  AIP2 - Local Configurations File ctaipbut.ini .............................................. 64

9  Barcode Input with Prefix ........................................................................... 70

9.1  Configuration of customized barcode prefixes ................................................... 74

10  AIP2 - GUI Configuration ........................................................................... 76

10.1  Overview ........................................................................................................... 76

10.2  Filing XML files in the server ............................................................................. 76

10.2.1  Scope Concept ...................................................................................... 76

10.2.2  Specific layouts of terminals or terminal groups ..................................... 77

10.2.3  Loading configuration files during restart ............................................... 78

10.2.4  Syntax check via XML Schema Definition (XSD) ................................... 78

10.3  Settings ............................................................................................................. 79

10.3.1  General settings .................................................................................... 79

10.3.2  Constants (Defines) ............................................................................... 79

10.3.3  Data sources (ProviderDefinition) .......................................................... 83

10.3.4  Calculated fields .................................................................................... 83

10.3.5  Functions (ScriptDefinitions) .................................................................. 84

10.4  Layout definition ................................................................................................ 84

10.4.1  Overview XML files ................................................................................ 91

10.4.2  Layouts depending on the worplace type ............................................... 93

10.4.3  Taking over changes in the layout configuration .................................... 93

10.5  Configuration of lists .......................................................................................... 94

10.5.1  Filtering the displayed elements in the user interface (as of

version 8.2.1.1) ...................................................................................... 95

10.6  Request dynamic dialogs .................................................................................. 97

10.6.1  Return after a dynamic dialog ................................................................ 98

10.7  Positioning ........................................................................................................ 99

10.7.1  Fixed positioning ................................................................................... 99

10.7.2  Dynamic positioning: ........................................................................... 100

10.7.3  Positioning of workplaces in the icon view ........................................... 101

10.8  Text formatting ................................................................................................ 102

10.9  Formatting functions ........................................................................................ 103

EAT-AIP_82.docx

Page 5 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

10.10  Multilingualism ................................................................................................. 104

10.11  Examples / exercises ...................................................................................... 104

10.11.1 Change existing fields ......................................................................... 105

10.11.2 Add a new field .................................................................................... 106

10.11.3 Add user fields ..................................................................................... 108

10.11.4 Remove button .................................................................................... 109

10.11.5 Add button ........................................................................................... 110

10.11.6 Integration of a picture ......................................................................... 111

10.11.7 Change quantity format ....................................................................... 112

10.11.8 Postings for operations not logged on ................................................. 113

10.12  Index ............................................................................................................... 115

11  AIP2 - Local Configuration File keyboard.ini ............................................ 117

12  Extended Application Configuration ......................................................... 120

12.1  Overview of INI configuration files ................................................................... 120

12.2  General ........................................................................................................... 120

12.2.1

Identification of lists / elements in the terminal ..................................... 120

12.3  Modifications to ctaipbut.ini ............................................................................. 121

12.3.1  General ............................................................................................... 121

12.3.2  Modifications to the toolbar .................................................................. 121

12.3.3  Modifications to button labeling ........................................................... 122

12.3.4  Modifications to icons .......................................................................... 123

12.4  Modifications to ctaiplay.ini .............................................................................. 124

12.4.1  General ............................................................................................... 124

12.4.2  Enter user fields in a table ................................................................... 124

12.4.3  Change order of columns in AIP2 ........................................................ 127

12.4.4  Changing the height of AIP2 lists ......................................................... 128

12.4.5  Changing the filter function in tables .................................................... 129

12.4.6  Cyclic reload of the sequencing list ...................................................... 130

12.5  Changes to ctaip.ini ......................................................................................... 130

12.5.1  General ............................................................................................... 130

12.5.2  Start Third-Party Application from AIP ................................................. 130

12.5.3  Remember staff badge number ........................................................... 132

12.6  Hide virtual keyboard ....................................................................................... 132

EAT-AIP_82.docx

Page 6 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

12.7  Dynamic dialogs .............................................................................................. 133

12.7.1  Overview ............................................................................................. 133

12.7.2  AIP2 dialog types ................................................................................ 133

12.7.3  Dialogs for specific terminal groups ..................................................... 133

12.7.4  Hide fields (for specific terminal groups) .............................................. 135

12.7.5  Default assignment in dialog fields (for specific terminal groups) ......... 137

12.7.6  Activate simplified dialogs.................................................................... 139

12.8  Customizing files ............................................................................................. 141

12.8.1  Terminal script files.............................................................................. 141

13  Rework and Open Quantity on the AIP2 .................................................. 142

13.1  Purpose ........................................................................................................... 142

13.2  Requirements .................................................................................................. 142

13.3  How to proceed ............................................................................................... 143

13.3.1  Defining reasons for rework ................................................................. 143

13.3.2  Dynamic dialogs: Copy ........................................................................ 143

13.3.3  Dynamic dialogs: WF_AA_QUA .......................................................... 143

13.3.4  Dynamic dialogs: WF_*_CHK .............................................................. 146

13.3.5  AIP layout: Rework quantity in main view ............................................ 147

13.3.6  AIP layout: Rework quantity in Operation layout .................................. 148

13.4  Result .............................................................................................................. 149

14  Collecting Order-Related User Fields on the AIP2 .................................. 151

14.1  Purpose ........................................................................................................... 151

14.2  Requirements .................................................................................................. 151

14.3  How to proceed ............................................................................................... 152

14.3.1  Overview ............................................................................................. 152

14.3.2  Dynamic dialogs: Copy ........................................................................ 152

14.3.3  Dynamic dialogs: WF_AA_QUA .......................................................... 152

14.3.4  User field configuration for the MOC .................................................... 155

14.3.5  User field is not stored for OP .............................................................. 159

14.4  Result .............................................................................................................. 160

EAT-AIP_82.docx

Page 7 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

1  Extended Application Training: MES Terminal

Purpose

The  configuration  options  described  in  this  function  package  enable  varied  modifications  to  dialogs,

dialog fields, formats, buttons of the HYDRA shop floor program AIP 8.2 (Acquisition and Information

Panel).

Implementation notes

The function package is used if you would like to change



the dialog structure

  dialog fields, labeling and units

  data types of dialogs including value ranges

  buttons and labeling



the presentation of columns and if you would like to add further columns to lists

Integration

The AIP terminal provides various options to change dialogs. Changes are either carried out directly at

the  shop  floor  client  or  in  the  dynamic  dialog  configuration  of  the  MOC  if  the  presentation  of  input

dialogs should be changed.

Features

  General terminal configurations

  Configuration of grid layout

  Button configuration (basic screen)

  Configurations for the virtual keyboard

  Configurations for barcode input

  Dynamic dialog configuration for input fields and dialog buttons

EAT-AIP_82.docx

Page 8 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

2  AIP2 Operation

2.1  Special Control and Display Elements on the AIP2

Tables

Uniform selection lists are used in AIP 8.2 posting dialogs:

  If  information  is  available  for  more  than  one  page,  the  page  numbers  are

displayed below the table. The current page is highlighted in bold letters. If the user clicks/touches a

page, the display directly changes to this page.

If more pages are available than the page numbers displayed, the following buttons can be displayed

on the left or right hand side depending on the context (available as of SP10/2016):









 : If you click this button, the system jumps to the first page of the next page navigation.

This means: If Page 1 ... Page 9 were displayed for the page navigation, the system jumps to

Page 10.

 : If you click this button, the system jumps to the first page of the next page navigation.

This means: If Page 10 ... Page 18 were displayed for the page navigation, the system jumps

to Page 9.

 : If you click this button, the system directly jumps to Page 1.

 : If you click this button, the system directly jumps to the last page.

You can select an operation using the mouse, touch screen, keyboard (arrow keys:'' or ''), scanner

or by entering it manually.

EAT-AIP_82.docx

Page 9 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

The  content  of  tables  or  lists  depends  on  the  respective  context.  Example:  When  you  log  on  an

operation,  those  operations  are  available  that  are  included  in  the  sequencing  list  or  planned  for  the

respective workplace or group. When you interrupt an operation, only running operations are available

for selection.

 Scrolling page by page (up or down) in the table.

  Scrolling  to  the  left  or  right.  Only  those  buttons  are  activated  that  make  sense  for  the

current situation (context sensitive). This figure shows that scrolling to the left has been deactivated.

Optionally  you  can  display  a  “table  filter”  (customization).  This  is  an  automatic filter  that,  once  it  has

been  entered,  directly  affects  the  table  without  having  to  update  it.  This  process  is  realized  through

full-text search for (defined) columns. The search is case-insensitive.

Virtual keyboard

Using the virtual keyboard, you can enter data manually via touch screen or a connected mouse. The

virtual  keyboard  is  displayed  automatically  as  soon  as  the  focus  is  on  an  input  field.  The  keyboard

layout,  which  is installed and activated in the Windows language settings, specifies the layout of the

virtual keyboard.

 Moving the virtual keyboard

EAT-AIP_82.docx

Page 10 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

 Hiding the keyboard for 10 seconds

 Switching between the alphanumeric and numeric keyboard

 Selecting the keyboard layout (language)

 Changing the scaling/size of the keyboard

To move  the  keyboard,  you  must  configure  the  driver  accordingly  (configuration  in  the  control

panel of the terminal/PC)!

If  you do  not  want to  display the virtual keyboard in  general,  you must enter the parameter  –t in the

entry parameters= of the configuration file ctaip.ini.

Date display

AIP  supports  a  country-specific  date  format  in  dynamic  dialogs.  The  option  "short  date"  has  to  be

selected in the "regional settings" of the Windows "control panel" of the terminal/PC. Please note:

  Years are always four characters long.

  Months and days are always 2 characters long.

  Allowed separators are: '-‘ (minus), '/‘ (backslash) and '.‘ (dot).

  Blanks must not be included in the “short date” format, i.e. the <BLANK> separator is not allowed.

  The date separator “.” (dot) is only allowed in connection with the DD.MM.YYYY format.

  The date format, which might possibly be configured in dynamic dialogs, is ignored.

Examples

  English(USA)
  Danish
  Customer-specific 1
  Customer-specific 2

MM/DD/YYYY
MM-DD-YYYY
YYYY-MM-DD
YYYY/MM/DD

EAT-AIP_82.docx

Page 11 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

  Customer-specific 3

MM/YYYY/DD

Note

If  the  date  format  used  is  other  than  the  permitted  formats,  a  note  appears  when  the  program  is

started and the date format is set to MM/DD/YYYY.

In the status bar, the year format is shortened and displayed only with two characters.

2.2  General description of the posting process on the AIP2

Many  AIP  posting  dialogs  are  divided  into  several  views  (sub-dialogs).  These  views  (sub-dialogs)

cover the entire screen so that only one dialog is visible at a time. In a “workflow concept” the user is

navigated through the posting dialog step by step. In the following, this process is described using the

example Interrupt operation. Other posting dialogs are operated in the same way.

The  action  Interrupt  operation  is  performed.  To  start  this  action,  you  click  the  button  Interrupt  when

you have selected an operation:

The dialog Interrupt operation opens and the first view (sub-dialog) is displayed. The header displays

the function that is currently being executed (here: Interrupt operation).

1st view (sub-dialog)
The views are run through one after the other

Posting that is currently being performed

EAT-AIP_82.docx

Page 12 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Quantities already
recorded (yield,
scrap)

General OP data

Active input field

Virtual keyboard

In the first dialog Enter quantities, the user can enter the produced yield or scrap quantities. Subject to

the active input field, the virtual keyboard is shown or hidden automatically.

Quantities can be entered using the virtual or real keyboard. The user can go to the next field using

the  tabulator  key  (which  can  also  be  found  on  the  virtual  keyboard). When  the  user  has  entered  all

values in the first view, the next view (sub-dialog) can be opened by clicking Next.

The Cancel button is displayed in all sub-dialogs. Click this button to cancel/close the entire process

at any time.

To  open  the  next  view  (Select  status  in  the  example),  click  the  Next  button  or  another  tab  (in  our

example:  Select  status  or  Confirmation).  Please  note  in  this  context,  that  no  view  can  be  skipped

when they are navigated upwards (view 1  view 2  view 3). This means: When you are in the first

view (enter quantities) and you click the third view (confirmation), the second view (select status) will

be displayed first.

Vice versa, when navigating downwards (e.g. from the confirm view to the enter quantities view), each

view can directly be opened by clicking the required tab. In this case, views can actually be skipped.

Using the Back button, views are opened one after the other (upwards).

EAT-AIP_82.docx

Page 13 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

As  long  as  the  dialog  has  not  been  confirmed,  the  data  entered  can  be  changed  at  any  time  by

scrolling back and forth.

Filter field for the list

Status list

In the second view Select status, you select the workplace status that is set, when the operation has

been  interrupted.  You  can  select  the  status  from  the  status  list  displayed.  This  list  can  be  restricted

using  the  Filter  field.  Once  the  required  values  have  been  entered,  the  next  view/sub-dialog  can  be

opened by clicking Next (in our example it is the last view).

EAT-AIP_82.docx

Page 14 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Workplace data

Quantities posted for the OP

Input field for the badge number

The sub-dialog Confirmation shows a summary of all values entered in the dialog. If the user agrees

with the entered data, the Interrupt operation dialog can be confirmed, once the badge number has

been entered. Then the dialog is sent to the server and posted.

If  an  input  field  of  the  dialog  is  not  completed  properly  (e.g.  a  mandatory  field  is  empty),  the  field  is

highlighted  in  red  in  the  respective  view  and  gets  the  focus.  The  user  can  then  directly  correct  the

value.

If a workflow dialog is opened, you can click the ESC key to directly exit the dialog. This exit is

also possible, if the virtual keyboard is displayed. As a consequence, you  cannot use the ESC

key to close the virtual keyboard.

EAT-AIP_82.docx

Page 15 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

3  Main View with Tiles

With  the  AIP2,  the  user  can  switch  between  the  tile  design  optimized  for  touchscreens  and  the  list

format. By default, the tile layout is shown, which is described in the sections that follow.

To  ensure  proper  processing  and  posting,  terminals  with  "MDE"  operation  mode  must  not  be

switched off during times without shift.

3.1  Main view – header and footer

Header

The AIP logo is displayed on the top left of the screen, which may be replaced with a customer logo

after configuration.

Possible  messages  are  displayed  to  the  right  of  it  (e.g.  if  a  dialog  is  opened  for  more  than  five

minutes).

A  separate  window  opens  to  display  error  messages  that  occur  during  data  collection  (e.g.  validity

checks).

Main views

You  can  assign  a  maximum  of  16  workplaces  or  machines  to  the  AIP2  terminal.  The  different

workplaces are listed in the order that they were assigned to the terminal on the client. .

In  the  main  view  of  the  AIP2,  you  can  use  the  button  "<  Overview“  to  switch  to  the  icon  view  of

workplaces.  In  the  terminal  configuration  of  the  client  you  can  specify  whether  you  want  to  use  the

icon view. The sections that follow describe the main view and the icon view.

Footer

The MPDV logo can be found at the bottom left of the AIP2 terminal. Double clicking the logo opens

the  info  dialog  where  you  can  start  further  administration  functions.  This  dialog  closes  automatically

after approx. 5 seconds.

EAT-AIP_82.docx

Page 16 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

In the middle, further information is displayed: the current terminal status, AIP2 version number, date

of the build, IP address of the server and the terminal number.

The current date and time are displayed to the right.

AIP2 statuses

Network connection has been established.
The terminal is ONLINE. Server communication is
enabled. All saved data records have been transferred.

The terminal is sending data to the server.

No network connection or no connection to the server.
The terminal is OFFLINE. Server communication is
interrupted. Online functions, such as the display of
information, are disabled. But you can still record certain
postings. These postings are transferred to the server,
once data connection has been re-established.

Data is being received.
The terminal reads files from the server or writes data to
the server.

The terminal is sending saved data records to the server.

DEMO mode
The terminal is in DEMO mode, i.e. server communication
is disabled.

EAT-AIP_82.docx

Page 17 of 160

01.09.20

3.2  Main view with "tiles"

List of workplaces

Advanced Configurations: MES Terminal AIP

Workplace tiles

Operation tiles

Staff tiles/
Resource tiles/
Material tiles

Please note: The actual display can be different to the above illustration.

Subject to the configurations made, the main view with tiles consists of two or three rows of tiles. While

the  first  two  rows  of  tiles  (workplace  and  operation  tiles)  are  always  displayed,  it  is  up  to  the  user

whether or not the third row of tiles is shown (optional display). In the configuration of workplaces you

can configure for each workplace separately if you want to show the third row of tiles.

Additionally, there is the list of workplaces to the left. Here,  you can select the  workplaces for which

details are displayed on the right-hand side.

List of workplaces

The  workplace  list  shows  all  workplaces/machines  assigned  to  the  terminal.  If  many  workplaces  are

assigned, swipe to get to the workplaces displayed further down.

This information is shown for the workplaces:

Machine/workplace number

Shows the machine and/or workplace number.

Status

The  status  is  displayed  for  each  machine  in  color  on  the  left-hand  side  and  also  the  status  text  is

colored. Coloring is as follows:

- green:

- yellow:

- red:

production

assigned status

not assigned

EAT-AIP_82.docx

Page 18 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

If the production lock is enabled, an exclamation mark is displayed in the same color as the status.

Quantities

On the right-hand side, the first figure shows the produced yield in green and the red figure shows the

produced scrap.

If you have enabled the Compensate manual quantities option (e.g. set off scrap against yield)

and  the  machine  list  also  shows  shift-related  quantities,  they  will  not  be  updated  immediately.

The application only updates the quantities, once the lists have been reloaded.

Unit for yield and scrap

If  no  operation  is  logged  on,  the  primary  quantity  unit  from  the  workplace/machine  configuration  is

displayed  as  unit  for  yield  and  scrap.  If  an  operation  is  logged  on,  the  primary  quantity  unit  of  the

operation is displayed.

Workplace tiles

The workplace tiles provide the following details:

Workplace/machine

No workplace or machine number is displayed.

Short name / group

The short name of the workplace or machine and the machine group are displayed.

Status

The  status  is  displayed  in  color  and  as  status  text  on  the  left-hand  side.  Coloring  is  as  follows:

- green:

- yellow:

- red:

production

assigned status

not assigned

If the production lock is enabled, an exclamation mark is displayed in the same color as the status.

Machine image

Shows the picture of the machine stored in the configuration of workplaces.

Clocks

Shows the recorded machine cycles of the current shift.

Start / Duration [hrs:min]

Point in time since the status has been available and the resulting duration at the current point in time.

EAT-AIP_82.docx

Page 19 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

With  BDE  workplaces1,  this  point  in  time  refers  to  the  last  manual  status  change.  With  MDE

workplaces, it refers to the time when the last status change was identified (for machine connections).

It also refers to the point in time when the status was last changed manually or to the time of the last

shift change.

Target/actual cycle

Current target and actual cycle of the workplace.

The largest target cycle of all operations logged on to the workplace is shown. The largest target cycle

is transferred to the MDE for monitoring.

If the target cycle is smaller than the minimum cycle time, the target cycle is still shown.

If  an  operation  is  logged  off  or  interrupted,  the  largest  target  cycle  of  the  remaining  operations  is

identified  and  displayed.  After  logoff  or  interruption  of  the  last  operation  at  the  workplace,  the  last

target cycle set is still displayed.

If no operation is logged on, the target cycle specified in the machine list is displayed. Thus, even after

a restart, the terminal can get the target cycle that last applied.

Yield / Scrap

Yield and scrap quantities of the current shift produced at the machine/workplace.

KPIs: OEE, utilization efficiency, scrap ratio

This function is only available if you enable the extension aipkpi.

Shows  the  KPIs  OEE,  utilization  efficiency  and  scrap  ratio.  The  application  calculates  the  KPIs  at

cyclic intervals (scheduler job "MDE keyfigure calculation“). The KPIs always refer to the current shift.

The  application  calculates  the  KPIs  based  on  the  formulas  that  are  also  used  for  the  OEE  report

and/or the efficiency report on the MOC. The application shows the KPIs with two decimal places. To

the right of the KPI, the AIP2 GUI highlights in color if limit values are exceeded or not reached. If you

have not defined limit values, the application shows the KPI in gray, otherwise in the color you defined

for  exceeding/not  reaching  limit  values.  For  further  information  on  the  configuration,  refer  to  the

document MDE_KPI_Configuration.pdf.

1    An  MDE  workplace  is  a  workplace  that  is  assigned  to  a  terminal,  which  runs  in  the  “MDE”  operation  mode.

Otherwise, it is a BDE workplace.

EAT-AIP_82.docx

Page 20 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

The AIP calculates and updates data at cyclic intervals. This may result in deviations between

the collected values and the displayed KPIs.

Linked functions

If you click the workplace status, the dialog for changing the status opens. If you click one of the other

tiles, the dialog opens where you can start the functions available for the selected workplace.

The  buttons  displayed  depend  on  the  selected  workplace.  The  button  Lock  production  status,

for example, is only available for MDE machines.

List of operations logged on

The middle area on the right-hand side shows the logged on operations as tiles. The following data is

shown:

MES order number

Order  number  and  operation  number  of  the  operation  logged  on.  The  combination  of  these  two

numbers is the MES order number.

Article

Article defined for the operation.

Quantities (target / yield / scrap)

Shows the target quantity defined for the operation,  the produced  yield and the scrap. The yield and

scrap quantities integrate the counter readings of the available machine connections.

This icon is displayed if at least one note has been recorded for this operation in the graphic planning

board of the client that must be shown on the terminal. To display the note(s), click the icon or click the

operation and select the Information button (

).

This icon is displayed if at least one long text is stored for this operation. Click this icon to display the

long texts or click the operation and select the button Information (

).

If  you  click  an  operation,  a  screen  opens  that  shows  the  workplace/operation  data.  Via  this  screen,

you can also select the operation-related functions.

EAT-AIP_82.docx

Page 21 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Operation tiles

In addition to the fields already described, the operation tiles also show the following data:

Comments

This tile shows the user fields 53 and 54 (alphanumeric, 20 characters) of the operation. To edit these

fields, you must store a respective user field key for the operation, which includes these two fields.

Completion in %

The bar shows the proportion of “yield”, which has been produced until now, compared to the “target

quantity”.

Since logon (target / yield / deviation)

The  production  quantity  to  be  expected  since  the  OP  has  been  logged  on  (depending  on  the  cycle

time, partitioning and the time when no production lock has been set for the machine). If the terminal

program has been restarted after the OP logon, no value can be calculated.

Calculation:

Target Since Logon = Net Running Time[sec] * Partitioning/Target Cycle[sec/stroke]

Net Running Time: Time since logon while the production lock has not been set. This calculation does

not  integrate  the  breaks specified  in  the  shift model  or  the  status  times  posted  to  RPA  12  (resource

performance account).

Deviation (in percent) between the calculated target  quantity since logon  and the quantity  which has

actually been produced “since logon”.

Calculation:  Deviation[%]  =  100%  *  (Yield  Since  Logon  -  Target  Quantity  Since  Logon)  /  Target

Quantity Since Logon.

As of CTAIP 8.2.1.32:

Up  to  now,  the  target  quantity  since  OP  logon  was  only  calculated  if  the  workplace/machine  was

assigned  to  a  terminal  with  operation  mode  "MDE  processing".  As  of  CTAIP  8.2.1.32,  the  target

quantity  since  OP  logon  is  also  calculated  if  the  terminal  is  configured  with  operation  mode  "BDE

processing".

If  the  terminal  has  been  restarted  after  an  operation  logon,  the  target  quantity  cannot  be  calculated

correctly.  To  improve  transparency,  an  "*"  (asterisk)  is  shown  behind  the  target  quantity  (since  OP

logon) in this case. The asterisk indicates that the target quantity now displayed no longer refers to the

time of the operation logon, but to the time of the terminal restart.

EAT-AIP_82.docx

Page 22 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

While the workplace/machine status 999 is displayed, the target quantity since OP logon is "---". If the

status 999 is again changed within a "free shift", the target quantity since OP logon is calculated using

the point in time of the OP logon, of the shift start or of the terminal start.

To  disable  the  calculation  of  the  target  quantity  since  OP  logon  on  the  terminal,  you  can  use  the

configuration CalcTargetYieldSinceLogon=0 in the hytnrcfg.ini. The quantity is then displayed using "--

-".

With  workplaces/machines  that  are  configured  as  "Machining  centers",  the  calculation  of  the

target  quantity  since  OP  logon  is  generally  disabled  because  this  calculation  contradicts  the

principles of the machining center.

Planned duration

The field Planned duration displays the target processing time of the operation in format [h:mm].

Partitioning

Calculate the displayed partitioning as follows:

TLGM
DIVM
TLGAG

Partitioning of the workplace/machine (TLG in mnr.lst)
Pulse factor of workplace/machine (IMPFAKT in mnr.lst)
Partitioning of the operation (TLG in anr.lst)

The  application  shows  the  calculated  partitioning  without  decimal  places,  provided  it  is  an  integer

value.

In case the partitioning or pulse factor of a machine or an order is 0, calculation is based on the value

1.

Displaying the "3rd list"

The  third  list  is  optional.  You  can  configure  the  third  list  in  the  configuration  of  workplaces.  The

following lists can be displayed:

  List of staff logged on to the currently selected workplace (BDE)

  List of resources logged on to the currently selected workplace (WRM)

  List of materials/input batches (MPL/TRT) logged on to the currently selected workplace

  List of output batches produced in the currently selected operation (MPL/TRT)

EAT-AIP_82.docx

Page 23 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

In case  you have enabled  several lists,  you can switch between these lists in the header line that  is

located above the third list. Activated lists can be selected one after the other.

Maintenance status

If you have purchased the license for the maintenance calendar, the maintenance status is displayed

using  a  yellow  or  a  red  field  showing  a  wrench.  The  color  displayed  depends  on  the  required

maintenance activity.

Calling functions

The functions available  are assigned  to the relevant  objects. Example: The functions  Log person off

and Log all staff off are displayed if you click on a person logged on.

3.3

Icon view of workplaces

You  can  enable  this  view  in  the  configuration  of  terminals  via  the  client.  Then  open  this  view  by

clicking the button "< Overview“ in the main view. This view shows workplaces in a clear structure and

with an image. It shows important information on the single workstations:

Please note: The actual display can be different to the above illustration.

EAT-AIP_82.docx

Page 24 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

A colored bar to the left of the image indicates the current status of workplaces/machines:

- green:

production

- yellow:

assigned status

- red:

not assigned

Each  tile  includes  the  workplace/machine  number,  the  status  (text)  of  the  workplace,  the  yield  and

scrap quantity and the image of the workplace.

A colored background with a caliper and/or wrench to the right of the image indicates if an inspection

or maintenance is due for the workstation.

If  you  enable  the  extension  aipkpi,  the  application  also  shows  the  KPIs  OEE,  utilization

efficiency and scrap ratio.

The application calculates the KPIs at cyclic intervals (scheduler job "MDE keyfigure calculation“). The

KPIs always refer to the current shift. The application calculates the KPIs based on the formulas that

are also used for the OEE report and/or the efficiency report on the MOC. The application shows the

KPIs with two decimal places. To the right of the KPI, the AIP2 GUI highlights in color if limit values are

exceeded or not reached.

The AIP calculates and updates  data at cyclic intervals. This may result in deviations between

the collected values and the displayed KPIs.

If  you  click  on  a  tile,  the  previously  described  main  view  is  displayed  and  the  workplace  is

automatically selected. From there, you can perform the postings for the selected workplace.

Use the option "< Overview" to exit the main view and to return to the icon view.

As part of the advanced configuration options, you can customize the layout of display lists, the

displayed data fields and functions. For technical reasons, however, you cannot change the sort

sequence of display lists in the main view of the terminal.

As  of  AIP  8.2.2.28,  you  can  automatically  change  from  the  main  view  with  tiles  to  the  icon  view  of

workplaces after a configured time. The configuration  AUTOMATIC-CHANGE-TO-START-DISPLAY is

described in the document AIP2_Configuration_hytnrcfg.pdf.

EAT-AIP_82.docx

Page 25 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

4  Basic Screen as List View

The  new  tile  design  can  be  disabled  for  the  AIP2  terminal.  This  chapter  describes  the  basic  screen

with disabled tiles.

In general, the AIP2 has been designed for entries to be made via touch screen. The corresponding

functions can be started, selected or executed by  touching the buttons or using  the displayed virtual

keyboard.  Selection  lists  are  provided  in  many  cases,  as  an  alternative  to  manual  entries.  Required

entries can easily be selected from these lists.

Barcodes can be imported/entered in the current dialog using barcode readers, handheld scanners, or

swipe  card  readers.  Subject  to  the  barcode  prefix,  certain  data  (e.g.  operation  data)  can  directly  be

assigned to the corresponding input field, without having to focus this input field explicitly.

It goes without saying that mouse and keyboard may also be used.

To  ensure  proper  processing  and  posting,  terminals  with  "MDE"  operation  mode  must  not  be

switched off during times without shift.

4.1  Basic screens – header and footer

Header

The  AIP  logo  is  displayed  top  left  of  the  screen,  which  may  be  replaced  with  a  customer  logo  after

corresponding configuration.

Possible  messages  are  displayed  to  the  right  of  it  (e.g.  if  a  dialog  is  opened  for  more  than  five

minutes).

A  separate  window  opens  to  display  error  messages  that  occur  during  data  collection  (e.g.  validity

checks).

Basic screens

A  maximum  of  16  workplaces  or  machines  can  be  assigned  to  the  AIP2  terminal.  The  single

workplaces can be found within the list area in the order assigned to the terminal via the client. .

EAT-AIP_82.docx

Page 26 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

As regards the basic screen of the AIP2 terminal, the user can choose between a tabular view, field-

related view and an icon view. This can be configured via the configuration of terminals in the client.

The single basic screens are described in the sections that follow.

Footer

The MPDV logo can be found at the bottom left of the AIP2 terminal. Double clicking the logo opens

the info dialog where further administration functions can be started. This dialog closes automatically

after approx. 5 seconds.

Further information is displayed in the center : the current terminal status, AIP2 version number, date

of the build, IP address of the server as well as the terminal number.

The current date and time are displayed to the right.

Terminal status

Network connection has been established
The terminal is ONLINE. Server communication is
enabled. All saved data records have been transferred.

The terminal is sending data to the server.

No network connection or no connection to the server.
The terminal is OFFLINE. Server communication is
interrupted. Online functions, such as the display of
information, are disabled. But certain postings can be
recorded anyway. These postings are transferred to the
server, once data connection has been established.

Data are being received.
The terminal reads files from the server or writes data to
the server.

The terminal is sending stored data records to the server.

DEMO mode
The terminal is in the DEMO mode, i.e. server
communication is disabled.

EAT-AIP_82.docx

Page 27 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

4.2  Basic screen “tabular view“

1st list
Workplaces
assigned to
the terminal

2nd list
List of
registered
operations

3rd list
(optional)
e.g. list of
registered
staff

Subject to the configurations made, the tabular basic screen consists of two or three tables. While the

first  two  tables  are  always  displayed,  it  is  up  to  the  user  whether  or  not  the  third  table  is  shown

(optional).

“Machines/workplaces" table

The upper table shows the workplaces assigned to the terminal. The following columns are displayed.

Machine/workplace

The machine or workplace number as well as a description are displayed.

Status

The  status  is  highlighted  in  color  and  the  status  text  is  shown.  Coloring  is  as  follows:

- green:

- yellow:

- red:

production

assigned status

not assigned

EAT-AIP_82.docx

Page 28 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Status since

Point in time since the status is available.

For ADE workplaces2 the point in time refers to the last manual status change. For MDE workplaces it

refers to the time when the last status change was identified (for machine connections). It also refers

to the point in time when the status was changed manually most recently or to the time of the last shift

change.

Please note:

It is indicated here if the “lock production status” function is enabled for the machine/workplace.

Below the first list there is a row including the function buttons mainly relating to machines/workplaces.

These functions are described in more detail in the sections that follow.

By way of “customizing” services it is possible to adapt the layout of the display lists, displayed

data  fields,  sort  sequences,  etc.  according  to  the  customer’s  requirements.  For  technical

reasons, however, the sort sequence of display lists may not be changed in the basic screen of

terminals. The software does not allow it.

Provided  that  the  "compensate  manual  quantities"  option  (e.g.  set  off  scrap  against  yield)  is

enabled and the machine list also shows shift-related quantities (no default setting), they will not

be updated immediately. Quantities are only updated once the lists have been reloaded.

"Operations at workplace" table

The second table shows the operations currently logged on to the selected workplace. The following

columns are displayed:

Article

Article defined for the operation

Order and operation

Order number and operation number of the registered operation. Together they build the  MES order

number.

Target quantity

Target quantity defined for the operation.

2  We talk of an MDE  workplace if this workplace is assigned to a terminal, which runs in the “MDE” operation

mode. In any other case, it is an BDE workplace.

EAT-AIP_82.docx

Page 29 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Yield

Yield  already  produced  for  this  operation.  The  counters  of  possible  machine  connections  are

considered as well.

Scrap

Scrap quantity already produced for this operation. The counters of possible machine connections are

taken into account as well.

N

It is indicated here if a note visible on the terminal has been recorded for this operation in the graphic

planning board of the client. The note(s) is/are displayed by clicking the OP info button (

).

T

If a long text is defined for this operation it is indicated here. The long text is displayed using the OP

info dialog (button

).

Below the second list there is a row that mainly includes function buttons relating to operations.

"3rd list" table

The  third  list  is  optional  and  may  be  configured.  Information  displayed  in  this  list  depends  on  the

workplace configuration.

The following lists can be displayed:

  List of staff logged on to the currently selected workplace (BDE)

  List of resources logged on to the currently selected workplace (WRM)

  Materials/input batches logged on to the currently selected workplace (MPL/TRT)

  List of output batches produced in the currently selected operation (MPL/TRT)

The buttons below the third list (to the left) allow switching between these lists.

Please note

The  staff  logged  on  displayed  in  the  third  list  is  identical  to  the  list  displayed  in  the  dialog  “F5  staff

logged on…”. Selecting a person in the third list does not affect the selection of the operation in the list

of OPs running at the  workplace. Therefore, it neither  affects pre-assignment of the operation in the

corresponding posting dialogs.

EAT-AIP_82.docx

Page 30 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Toolbar in the basic screen

A toolbar,  which may be customized, is assigned to  each list included the basic screen. This makes

the  purpose  of  a  function  clear  to  the  user.  The  “partial  upload/confirmation”  function  can  be  found

below the list of registered operations.

In fact, the toolbar may include several “tabs”, which can be made visible by scrolling to the right/left at

the right/left end of the toolbar. A posting dialog (e.g.  change partitioning) can be opened by clicking

the corresponding button.

Please note

The  displayed  buttons  depend  on  the  context  defined  by  the  respectively  selected  workplace.  Thus,

the displayed buttons may vary when selecting another workplace/machine.

4.3  Basic screen "machine overview"

If  the  “change  view”  button  is  clicked  in  the  basic  screen,  the  view  changes  to  the  following

presentation:

Toolbar of the assigned machines

Machine information

Order information

EAT-AIP_82.docx

Page 31 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

This  presentation  gives  detailed  information  on  a  single  machine,  whereas  the  above  toolbar  still

provides an overview of all assigned machines and workplaces.

The presentation consists of three sections:

Toolbar of the assigned machines

The  color  indicates  the  current  status  of  all  assigned  workplaces.  Coloring  is  as  follows:

- green:

- yellow:

- red:

production

assigned status

not assigned

It is possible to switch between machines by pressing a machine icon (requires a touch screen). Using

the keyboard, the active machine can be selected by the arrow keys. To do this, the toolbar must be

active.

Workplace/machine information

This  display  area  shows  information  relating  to  workplaces/machines  and  shifts  about  the  currently

selected workplace.

Order information

This display area shows information on the registered order/OP. If several orders/OPs are logged on

to  the  workplace,  then  extra  arrow  buttons  are  displayed.  It  is  possible  to  switch  between  individual

orders/OPs using these arrow buttons.

Notes on selected fields of the machine overview

Unit for yield and scrap

Provided  that  no  operation  is  logged  on,  the  primary  quantity  unit  from  the  workplace/machine

configuration is displayed as unit for yield and scrap. If an operation is logged on the primary  quantity

unit of the operation is displayed.

Partitioning

The displayed partitioning is calculated as follows:

Partitioning =

𝑇𝐿𝐺𝑀
𝐷𝐼𝑉𝑀

∗   [

𝑇𝐿𝐺𝑂𝑃1
𝐷𝐼𝑉𝑂𝑃1

  +

𝑇𝐿𝐺𝑂𝑃2
𝐷𝐼𝑉𝑂𝑃2

  + ⋯ ]

TLGM
DIVM
TLGOPi

Partitioning of the machine (TLG in mnr.lst)
Pulse factor of the machine (IMPFAKT in mnr.lst)
Partitioning of the individual operation (TLG in anr.lst)

EAT-AIP_82.docx

Page 32 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

The  resulting  partitioning  is  displayed  without  decimal  places,  provided  it  is  an  integer  value.

Otherwise, 3 decimal places are shown.

In case partitioning or pulse factor of a machine or an order is 0, calculation is based on the value 1.

Having logged off all OPs, the machine continues working with the partitioning of the machine.

Target cycle

The largest target cycle of all operations running  at the machine is  always  displayed in the machine

overview of the terminal. If this OP is logged off the largest target cycle of the remaining OPs will be

displayed.

In  case  no  OP  is  logged  on,  the  target  cycle  from  the  machine  list  is  displayed.  Thus,  even  after  a

restart, the terminal can get the target cycle that applied at last.

The largest target cycle is also transferred to MDE for monitoring.

Comment 1, comment 2

These two fields show the  user fields 53 and 54 (alphanumeric with 20 characters) of the operation.

To  be  able  to  edit  these  fields,  a  corresponding  user  field  key  containing  these  two  fields  must  be

defined for the operation.

Target since logon

The  production  quantity  to  be  expected  since  the  OP  has  been  logged  on  (depending  on  the  cycle

time, partitioning and the time while the production status was not locked for  the machine). No value

can  be  calculated,  in  case  the  terminal  program  has  been  restarted  since  the  OP  was  logged  on.

Calculation:

TargetSinceLogon = NetRunningTime[sec] * Partitioning/TargetCycle[sec/stroke]

NetRunningTime: Time since logon while the production lock has not been set. This calculation does

not  take  into  account  any  breaks  defined  in  the  shift  model  or  status  times  posted  on  RPA  12

(resource performance account).

Deviation [%]

Deviation  (in  percent)  between  the  expected  target  quantity  since  logon  and  the  quantity  which  has

actually been produced “since logon”.

Calculation: Deviation[%] = 100% * (YieldSinceLogon - TargetSinceLogon) / TargetSinceLogon

Completion

The  bar  represents  the  proportion  of  “yield”,  which  has  been  produced  until  now,  compared  to  the

“target quantity”.

EAT-AIP_82.docx

Page 33 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Machine icon:

Provided that the WRM-WTK license has been purchased, the machine icon may be  replaced with a

picture  showing  a  yellow  or  red  oilcan.  It  all  depends  on  the  required  maintenance  activity:

4.4

“Machines as icons” basic display

This view can be configured as the default display in the configuration of terminals at the client   It has

the  advantage  that  the  user  can  tell  from  a  distance  whether  or  not  all  machines  are  in  the

“Production” status.

All MDE machines have their own buttons colored according to the corresponding status:

- green:

- yellow:

- red:

Production

Assigned status

Not assigned

The button includes details on the workplace/machine number, the registered operation, the yield and

scrap quantities as well as the status (text) of the workplace/machine.

If a button is touched , the “machine overview” basic display is shown for this workplace. From there,

postings for the selected workplace can be performed using the standard buttons.

By  clicking  the  “symbol”  button  (if  configured)  the  view  changes  from  the  “machine  overview”  to  the

“icon view of machines”.

EAT-AIP_82.docx

Page 34 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

5  AIP2 -Local Configuration

5.1  Local Configuration ctaip.ini

The most important hardware and system settings are defined for each terminal in the CTAIP.INI file of

the C:\MPDV\AIP2 directory.

Changes  to  the  configuration  file  ctaip.ini  are  only  enabled  after  rebooting  the  terminal

software.

Layout configuration

Entry

Section [system]

Comment

CompanyInfo=(c) by John Doe Inc.
1998-2015

Overwrites the copyright text in the “About" dialog

parameters= … -t | +t

DEMO_ALL=ON

parameters= … -
SkipDynDlgExtraction…

parameters= … -
SkipAipStartupUpdate…

The virtual keyboard can be disabled/enabled, irrespective of the
terminal type.

The  information  in  the  lower  bar  are  normally  hidden  in  demo
mode.  This  option,  however,  causes  all  pieces  of  information  to
be  displayed  even  in  demo  mode  (version  number  and  date,
server, terminal number, online lights).

Internal  option  preventing  the  extraction  of  dialog  fields/buttons
when  updating  dialog  data.  (Only  applies  if  WF  directory
".\spool\$wf.$$$\“ is available)

Internal option preventing the configuration files (*.ini,*.cfg,*.cfi) of
(packets\*.dll)  and  application  DLLs
the  module  DLLs
the
(functions\*.dll)
terminal.

from  being  synchronized  when  starting

VirtScreenSize=640

All windows are started with the indicated resolution

EAT-AIP_82.docx

Page 35 of 160

01.09.20

Entry

VirtScreenRatio=16:9

Section [SKIN]

Saturation=0

Hue=0

Name=mpdv

Active=false

Advanced Configurations: MES Terminal AIP

Comment

The  display  ratio  remains  if  the  configuration  VirtScreenSize  is
used to reduce the window.
The  width-to-height  (aspect)  ratio  can  be  changed  using
VirtScreenRatio. Consequently, the width-to-height ratio 16:9 can
be tested with a 4:3 monitor and vice versa.
The value can be configured as  "16:9" or as floating  point  value
(e.g. 1,77777).

Note:

Information  screens  are  specifically  scaled  if  monitor  screens  in
portrait  format  (e.g.  9:16)  are  used.  This  special  scaling  can  be
disabled in hytnrcfg.ini:
[Tnr Konfiguration 0]->PortraitAlignment=off

Configurations for the terminal's skin
(see ctaiplay.ini)
The  online  configuration  of  the  terminal  can  be  reached  by  the
info  dialog  (click  MPDV  icon).  ALT+F1  opens  the  control
elements for the skin.
Please  note:  Only  in  the  design/GUI  of  AIP  8.1  and/or  the
dynamic dialogs

Skin configuration / Default = 0

Skin configuration / Default = 0

Skin to be used / Default = mpdv

Skins can only disabled in ctaip.ini!
Default = true

Entry

Comment

Section [system]

Usr=21

Distinct terminal number

Hostname=192.9.200.24

Internet address of the server

Offlinetimeout=600

Showcursor=on

The  interval  after  which  online  access  should  be  attempted  the
next time. The interval is specified in seconds

Show  or  hide  mouse  pointer
on: mouse pointer active
off: mouse pointer inactive

in

terminal  application:

Loadfile=
ctnet\win\aip2.txt

Configuration file to download the application from the server.
The paths is relative to the installation directory of the system.

EAT-AIP_82.docx

Page 36 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Entry

Comment

Watchdog=on

Demo=off

parameters=-t

TMOUT_C=xxx

TMOUT_S=xxx

TMOUT_R=xxx

TMOUT_F=xxx

Section [barcode]

BarKenn90=MNR4
...
BarKenn99=ANR3

Section [comports]

com1=0
com2=MSS
com3=BAR
Com3=LEGIC
Com4=RFLESER

Section [MSS-INIT]

MSS_DIALOG=10

ON: Watchdog is activated
OFF: Watchdog is not activated

‘on’:  Offline  demo  mode;  always  off
environment!

in

the  production

The –t parameter switches off the virtual keyboard.

Timeout for CONNECT to the server
If not specified, default = 10 seconds  

 Increase to 20 seconds for routing

Timeout for SEND to the server
If not specified, default = 10 seconds  

 Increase to 20 seconds for routing

Timeout for RECEIVE of the server
If not specified, default = 120 seconds

Timeout for FILESERVER operations to the server
If not specified, default = 10 seconds

 Increase to 20 seconds for routing

Configuration of customized barcode prefixes.

BarKenn90 > defines the prefix (here: 90); The ID from the dialog

(= acronym) is assigned.

Assignment of serial interfaces to connected devices:
MSS – machine interface
BAR, LEGIC, RFLESER – various reading devices

If the terminal is switched off longer than 15 minutes, a dialog is

displayed on terminal restart. The user must then decide whether

the counter pulses,  which  were  recorded  when the terminal  was

closed, are posted or discarded. The dialog closes automatically

with  "Yes"  after  an  entered  time  has  elapsed;  in  this  case  the

counting impulses are posted.

This value configures the time in seconds the dialog is open.

If the terminal is switched off for less than 15 minutes, no dialog

is  opened;  the  counting  pulses  recorded  in  the  switch-off  phase

are accepted and posted without confirmation.

Please  note:  The  value  can  also  be  configured  in  hytnrcfg.ini.

Entries in the hytnrcfg.ini file take priority.

EAT-AIP_82.docx

Page 37 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Entry

Comment

MSS_FILEAGE_MIN=5
MSS_FILEAGE_OVERTIME=delete

Additional configuration for MSS_DIALOG

Section [ext. software]

Button=Editor
WindowName=Editor
SearchParts=On

If the backup file for counting pulses of the terminal is older than

5  minutes,  no  dialog  is  opened  and  the  back  up  file  deleted.

Quantities recorded at the time when the terminal was closed are

not used/posted.

Please  note:  The  value  can  also  be  configured  in  hytnrcfg.ini.

Entries in the hytnrcfg.ini file take priority.

Configuration  of  the  button  in  the  top  line:  A  previously  started
program  can  be  brought  to  the  foreground  at  the  push  of  a
button.
Button: button caption
WindowName: Name of the program (e.g. from the taskbar).
SearchParts=On:  Parts  of  WindowName  are
sufficient
SearchParts=Off:  WindowName  must  be  entered  completely.
The  option  "SearchParts=On"  is  recommended  for  programs
such  as  MSWord  that  change  the  title  bar  subject  to  the
document that is currently being loaded.

ProgFileName=c:\Programme\wi
ncmd\Wincmd32.exe

The  program  that  is  started  if  the  program  mentioned  above
cannot be called to the foreground.

AutoStart=on

Section [DLL]

BusDLL=PCC.EXE

This option starts the program (ProgFileName) when starting the
terminal program.

PCC.EXE must be entered here if the terminal is configured with

the option "operated as HYDRA-MDE terminal".

If  necessary,  the  AIP2  enters  this  value  independently  upon

starting the program.

Section [PDV]

PDVProtokoll=ON

Enables PDV logging (prot_pdv.txt)  (by default=OFF)

PDVIOPDir=c:\IOPSim\

Path for DNC

Section [CAQ]

;Supported barcodes
FieldWNRBarcodeOnly=Y

FieldNestBarcodeOnly=Y

FieldNummBarcodeOnly=Y

If  this  entry  is  set  the  tool  number  may  only  be  entered  using  a
scanner.
If this entry is set the cavity number may only be entered using a
scanner.
If  this  entry  is  set  the  number  may  only  be  entered  using  a
scanner.

EAT-AIP_82.docx

Page 38 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Entry

FieldKNRBarcodeOnly=Y

BarcodeWNR=

BarcodeNest=

BarcodeNumm=

Comment

If this entry is set the badge number may only be entered using a
scanner.
This field specifies which acronym is entered into the tool number
field by the scanner.
This  field  specifies  which  acronym  is  entered  into  the  cavity
number field by the scanner.
This  field  specifies  which  acronym  is  entered  into  the  number
field by the scanner.

5.2  PNG – Files / Bitmaps

The use of PNC files is recommended by MPDV. By default PNG files have a size of 24 x 24 px.

5.2.1

File pict.zip

The  file  "pict.zip“  is  updated  by  the  installation  tool  "inst32.exe“  while  downloading  and  includes  all

default PNG files.

The default PNG files can be overwritten in the file pict_cust.zip. Several PNG files have the extension

".small.png" (e.g. aip.small.png). These PNG files are used with a screen resolution of 640x480.

5.2.2

File pict_cust.zip

The file "pict_cust.zip“ is loaded from the server directory (e.g.  \<serverDir>\1\custom)  when starting

the program (as is the case for the hycust.mld).

Customized  PNG  files  may  be  stored  in  this  file  and  loaded  by  the  AIP2  terminal.  Default  PNG  files

may also be "overwritten".

Please note: file sizes are not adjusted.

Customize header

The  AIP  icon  displayed  in  the  header  can  be  replaced  by  storing  a  separate  AIP.png  file  in  the

pict_cust.zip file.

This AIP icon will also be replaced in the "About" dialog.

EAT-AIP_82.docx

Page 39 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Customize footer

The MPDV icon displayed in the footer can be replaced by storing a separate company.png file in the

pict_cust.zip file.

Customize PZE dialog

The MPDV icon displayed in the PZE dialog can be replaced by storing a separate pze_mpdv.png file

in  the  pict_cust.zip  file.  In  case  the  PZE  terminal  is  operated  with  a  screen  resolution  of  640x480,  a

customized pze_mpdv.small.png file has to be integrated in the pict_cust.zip file.

5.3  Multilingualism (*.mld files)

The  below-mentioned  files  are  required  for  the  translation  of  the  application.  The  table  shows  the

priorities for the translation, ownership and the relevant storage locations.

Priority

File

Server directory

Owner

Description

1

2

3

ctaipkd.mld

./ctnet/win/aip2/custom  Customer  Customer-specific translations

hycust.mld

./1/custom/

MPDV

Customized translations by MPDV.
The file is used by the AIP2, CTAIP
and CTWIN terminal.

ctaip.mld

./ctnet/win/aip2

MPDV

Standard translation file

EAT-AIP_82.docx

Page 40 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

6  AIP2 - Central Configuration File hytnrcfg.ini

You can use this file as central place to store different configurations for all or for separate terminals.

For each section, a general version is available

[section 0].

The  entries  included  in  this  section  can  be  overwritten  by  entries  in  a  terminal-specific  section

[section <TNR-USER>]

 <TNR-USER> = UserNo = terminal number + 2000 e.g. 2010,2101,..) for exactly one terminal/UserNo

The file hytnrcfg.ini is loaded from the server on every terminal start.

Section / Entry

Comment



[Tnr Konfiguration 0]

FollowExternStatus=on

[Terminal->Installation 0]

InstallFonts=on

OnlyInstallFontsAfterDownload=fa
lse

[Terminal->USR 0]

Transfer  of  machine  statuses  when  reloading  machine
list.
Useful  if  status  change  is  set  by  PDM  or  another
terminal

If set to "off", fonts are not installed during restart.
ON=DEFAULT

If “InstallFonts=on”:
If  true,  then  fonts  are  only  installed  directly  after  a
download. If false, then fonts are installed every time the
terminal is restarted.
(false = DEFAULT)

EAT-AIP_82.docx

Page 41 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Section / Entry

Comment

AttachedApplication=First

HTTPBrowser=standard

info:  With

this
Displaying  documents  of  OP
configuration, the system first checks whether or not an
application  is  linked  in  Windows  that  matches  the  file
extension of the document. This application is then used
to display the document.
If  no  link  is  available,  the  viewers  configured  in  ctaip.ini
(  [ext.  software])  and  internal  viewers  are  used.  If  an
extension  is  completely  unknown,  the  system  tries  to
display the document as text .
Different settings are possible:

First  search for linked application first

AfterUserViewer    If  a  UserViewer  is  configured,  this
one  overrides  the  linked  application  (also  applies  to
ExcelViewer, WordViewer and PowerpointViewer)

Last    Only  if  no  ctaip.ini  assignment  is  found  for  the
file  extension,  then  the  system  searches  for  a  linked
application (default).

Off    The  system  does  not  search  for  a  linked
application.

Display of documents (via OP info):
If  documents  are  configured  with  a  path  of  schema
"http", the file is not downloaded to the terminal, but the
link is transferred to a browser.
The default browser for the terminal is htmview3.exe, as
this one can be operated by touchscreen.
If  this  entry  is  set,  the  default  browser  configured  in
Windows is used.

SupressErrorMessage=70012

Suppress message "material is not planned"

MSS_DIALOG=10

MSS_FILEAGE_MIN=5
MSS_FILEAGE_OVERTIME=delete

[SignatureRecording->User 0]

ManualBadgeInput=true

If the terminal  is switched  off longer than 15 minutes, a
dialog  is  displayed  on  terminal  restart.  The  user  must
then  decide  whether  the  counter  pulses,  which  were
recorded  when  the  terminal  was  closed,  are  posted  or
discarded. After a configurable period of time, the dialog
closes automatically with "Yes" (Yes, posting of pulses).
This  value  configures  the  time  in  seconds  the  dialog  is
open.

If  the  backup  file  for  counter  pulses  on  the  terminal  is
older  than  5  minutes,  then  no  dialog  is  opened  and  the
backup  file  deleted.  Quantities  recorded  at  the  time
when the terminal was closed are not used/posted.

This configuration specifies whether or not the field User
can be edited on the terminal (by default: no editing)
true    activates  keyboard  input  for  field  User  on  the
terminal

EAT-AIP_82.docx

Page 42 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Section / Entry

Comment

Transparency=255

ShowPosition=TR

the  signature  dialog  can  also  be

The  display  of
transparent.
255    Signature  dialog  is  0  %  transparent  (not
transparent)
1    Signature  dialog  is  99%  transparent  (maximum
transparency)
(Default = 155)

Top – Left
Top – Middle
Top – Right
Middle – Left

You can change the place of the signature dialog:
TL
TM
TR
ML
MM  Middle – Middle (Default)
MR
BL
BM
BR

Middle – Right
Bottom – Left
Bottom – Middle
Bottom – Right

USE_SERVICE_ACCOUNT=1

SIGNATURE_1_USER_TYPE=REPORTING_
USER_READONLY

0  (default)  SSO:  ServiceAccount
is  not  used
(requirement:  the  terminal  must  be  started  with  the
domain "user" (SSO)).
Note:  ServiceAccount=1  can  only  be  used  if  all  users
are  in  the  "root"  domain.  SubDomain  users  are  not
supported.

REPORTING_USER_READONLY

The  user  identification  using  the  Windows  user  is
activated. The Windows user is then preassigned in field
User. The User field is read-only.
Requirement: The "SSO" option must be enabled for all
reporting  users.  Otherwise,  successful  authentication  is
not possible.

REPORTING_USER_CHANGEABLE

The  user  identification  using  the  Windows  user  is
activated. The Windows user is then preassigned in field
User. The User field can be edited.
Requirement: The "SSO" option must be enabled for all
reporting  users.  Otherwise,  successful  authentication  is
not possible.

EAT-AIP_82.docx

Page 43 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Section / Entry

Comment

SIGNATURE_1_LOGON_TYPE=HYDRA

“” / Not set / “EMPTY”

There is also an alternative login procedure.

HYDRA

The user identification using the Windows user is locked.
You must enter a user for identification.
Requirement: All reporting persons must have been
created as users and the option "SSO" must not be
enabled for the users. Otherwise, successful
authentication is not possible.

ACTIVEDIRECTORY

The TAB for the user identification via User is locked.
The Windows user must be used for identification
purposes. Requirement: The "SSO" option must be
enabled for all reporting users. Otherwise, successful
authentication is not possible.

MIXED_BUT_UNIQUE
The  setting  of  option  "SSO"  specifies  whether  the  user
login or the Windows login is used.

"SSO" enabled  Windows only
"SSO" disabled  user only

SIGNATURE_2_LOGON_TYPE=HYDRA

Identical  to  SIGNATURE_1_LOGON_TYPE  (see
above)

ExtendedSignatureRecording=true  Used  for  signatures  on  the  terminal  with  quality  data
collection.

[MDE/Blade Configuration 0]

CONVERT-TO-ANSI-
FILE=<list1|list2>

Configuration of the files that are provided from the AIP
to  the  MDEB2  blade  in  ANSI  format  when  a  combined
operation is available.

The following  lists are transferred by default if the entry
is not available.
counters.lst|schicht.lst|mnr.lst|mstat.ls
t|anr.lst|pnr.lst

If you want to transfer further lists, you must specify the
standard lists and the additional lists.

6.1  Layout configuration

Entry

Comment

Section
and/or

[terminal configuration 0]
[terminal configuration 2XXX];

( general configuration )
( 2XXX terminal-specific configuration )

EAT-AIP_82.docx

Page 44 of 160

01.09.20

Entry

AUTO-CONFIRM-UHR-ERROR-
MESSAGE=TRUE

SUPPRESS-MAXIMUM-NUMBER-OF-
MACHINES-WARNING=ON

CalcTargetYieldSinceLogon=2

Advanced Configurations: MES Terminal AIP

Comment

This setting specifies that in case of an error that occurred
reading  the  clock  (e.g.  when  activated  after  standby
mode), the time is transferred  without confirmation  dialog
and the terminal time is later synchronized with the server
time via PDM command.

Suppresses  the  warning  after  restart  of  terminal  if  more
than  32  machines  are  assigned
terminal
(static/dynamic). (Default=OFF)
CalcTargetYieldSinceLogon=1
The  duration  is  calculated  from  the  total  runtime  since
login (all statuses) minus the configured shift breaks.

the

to

CalcTargetYieldSinceLogon=2
The duration is calculated from the total runtime since
login (all statuses). Defined breaks are not used and are
not deducted. (default value)

Section
[ QRD-PRINTER->TICKET 0 ]
[ QRD-PRINTER->TICKET 2xxx ]

;( general configuration )

;( 2XXX configuration for a specific terminal )

COMPLETE-ABSENCE-OF-LOCAL-MNR-
DATA-FOR-EVENT=< Events >

COMPLETE-ABSENCE-OF-LOCAL-ANR-
DATA-FOR-EVENT=< Events >

COMPLETE-..-EVENT=< Events >
COMPLETE-..-EVENT=#ALL#

COMPLETE-..-EVENT=A_AN|A_P_AN

Reloads the machine row for the configured <Events>, if
it is not available locally
  This  configuration  might  be  required  for  a  group
workplace without machine assignment.

Reloads the order row for the configured <Events>, if it
is not available locally
  This  option  has  been  implemented  to  access  order
data in the master data, e.g. when logging on orders.

Explanation on the configuration of <Events>
  Using  <#ALL#>  the  row  (ANR/MNR)  that  is  not
available is reloaded for any event.
   <A_AN|A_P_AN>  restricts  reloading  of  information  to
specified events. The ID <DLGFAM> is preferred to the ID
<DLG> in order to identify the <Event>.

Section
[AIP2 Initialization 0]

XML-GUI=OFF

CTWIN-STYLE=ON

CTWIN-BUTTON-LAYOUT=ON

AUTOMATIC-CHANGE-TO-START-
DISPLAY=30

Disables  the  new  AIP2  design  and  uses  the  AIP  8.1
design.

Activates  the  GUI  that  is  similar  to  CTWIN  on  the  AIP2.
The two button bars are shown below the two lists just like
on the AIP 8.1.

If  the  option  CTWIN-STYLE=ON  is  additionally  set,  the
two button bars are displayed at the bottom of the screen.

As  of  AIP  8.2.2.28:  If  this  option  is  set,  the  display
automatically  changes
the
configured  time  if  no  other  interaction  was  performed  in
the meantime.
The  changing  display  is  configured  via  the  option  Show

the  main  view  after

to

EAT-AIP_82.docx

Page 45 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Entry

Comment

in

the  Terminal  configuration,

tab  MF

machine/OP
functions.

  List:

o  Change  from  the  detail  views  or  function  menus

(operation, person, resource, etc.)
o  Change to the main view with "tiles"
Icons:
o  Change from the detail views or function menus or



from the main view with tiles

o  Change to the icon view of workplaces

The  configuration  is  specified  in  seconds.  Do  not  specify
less than 10 seconds.
An automatic change to the start screen is not made if an
input dialog is open.

EAT-AIP_82.docx

Page 46 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

7  AIP2 - Local Configuration File ctaiplay.ini

The  layout  is  configured  for  specific  terminals  in  the  file  ctaiplay.ini  stored  in  the  terminal  directory

C:\MPDV\AIP2.

The  layout  is  configured  for  specific  terminals  in  the  file  ctaiplay.ini  stored  in  the  terminal  directory

C:\MPDV\AIP2.

This file is basically used for the configuration of grids in AIP2.

The complete standard INI files are located on the server directory \mip\ctnet\win\aip2

Any deviations from the standard are created in the customer-specific directories

provided for this purpose, e.g. \mip\1\custom\aip2\tgrp_901.

Create the corresponding, empty file (e.g. ctaiplay.ini) in this directory. Modified sections

are copied to this file. Make the respective configurations in this file.

After restarting the terminal, files from the main directory \mip\ctnet\win\aip2 are merged

with  files  from  the  customized  directory  \mip\1\custom\aip2\tgrp_901.  Then  the  merged

file is transferred to the local terminal directory C:\MPDV\AIP2.

Changes to the configuration file ctaiplay.ini will not take effect until the terminal software

has been restarted.

Entry

Section [OP info]
Deaktiviert=AG_Bmk,AG_Fort

Sortierung=AG_TechInfo,*

Section [main]
Nachkommastellen=0
Repaint_time=60
PopupSize->EmptyQueue=300
PopupSize->ReloadPze=200
SymbolSubstDesignation=MBEZK

Comment

- indicated info pages are not shown
 - AG_Info (OP info) cannot be disabled
 - Entries affected by sorting are not
   disabled.
- Order of info pages in the icon list
- if the list ends with " ,* " the non-listed
  standard pages are added at the end.
- Standard pages:
AG_Info,AG_ZuInfo,AG_Bmk,AG_TechInfo,AG_Fort,AG_FertP
ap

Decimal places for quantities in the order/machine overview
Cycle for updating the view (for machine list and machine info)
Empty popup window size for quick queue
Reload popup window size for PZE configuration
The specified field replaces the machine number in the icon
view.

EAT-AIP_82.docx

Page 47 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Entry

SymbolAdditionalInfo=MBEZK

Comment

Display of any field from the machine list in the icon view
between machine number and operation number:

MaxExpressions=50

Sections for list layouts
[Personenliste]
[Bedienposition]
[Maschinenstatusliste]
[Ausschussgruende]
[Abweichungsgruende]
[Auftragsliste]
[Vorgabeliste]
[Schichtinfo]
[Maschinenliste]
[Eingangslosliste] input batch list

[Ausgangslosliste]
Syntax of table formatting
GRID_FONT=Arial
GRID_FONTSIZE=9
GRID_COLOR=clBlack
GRID_BACKGROUND=clWhite
GRID_FIXCOLS=0

The configured field replaces the machine number for lines and
aggregates.
Please note: Only in the design/GUI of AIP 8.1
For the configurations used in the list layouts for coloring rows
or cells, 20 entries can be made by default.
e.g.EXAMINE_CELLBKCOLOR20=..
The MaxExpressions setting can be used to increase the
number of entries.
 EXAMINE_CELLBKCOLOR50=..
This maximum index applies to all EXAMINE configurations in
all grids. Internally, a corresponding amount of memory is
always reserved for each grid, even if no EXAMINE
configuration is used.
(from AIP 8.2.1.12)

List displayed when staff is logged on
Predefined list of "operator positions"
Predefined list of "machine statuses"
Predefined list of "scrap reasons"
Predefined list of "deviation reasons"
Lower list in the main view
Order sequencing list
List of shift info
Upper list in the main view
List  of  input  batches,  e.g.  when  "logging  on  the  OP"  in  batch
mode
List of preceding batches when "changing output batches"

Font type
Font size
Font Color
Background color
Number of fixed columns

EAT-AIP_82.docx

Page 48 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Entry

Comment

GRID_ORDER=MSZEIB
GRID_ORDER=MSZEIB=-

Sorting
Sorting in descending order

in

ascending

order

Sorting is executed according to the formatting of the column.

Examples:

ANR_DATB=C10,65,L, planned start

  Alphanumeric  sorting  (the  date  is  provided  in  format

MM/DD/YYYYY)

ANR_DATB=dd.mm.yyyy,65,L,planned start

  Sorting by date

If  several  criteria  are  indicated  (separated  by  |)  only  the  first
criterion can be sorted in descending order. All other criteria are
sorted in ascending order.
The  following  entry  must  be  set  in  the  configuration  for  the
section so that the sorting is used in the display:
ORDER=#USE#INI#ITEM#

GRID_LIST_TYP=MNR
GRID_LIST_TYP=ANR

Example for the section Sequencing List (Auto)
[WF@ANR]
CMD=DLG=LIST;11|MOD=V|MNR=<MNR>|
…..
SECTION=Sequencing List (Auto)
…..
ORDER=#USE#INI#ITEM#
The  list  type  of  the  section  is  indicated  with  this  entry,  if  fields
are displayed that need to be loaded additionally.
This entry also enables the search when starting.
The entry has to be entered above the IDs to be reloaded!!!
All
file
the
to  be  reloaded  can  be
headers.dat  in  the  "spool"  directory  of  the  terminal.  It  consists
of four lines:

identifiers

found

in

1.  10|…: Fields that are always included in the machinery

list

2.  *10|…: Fields that can be reloaded for the machine list
3.  11|…: Fields that are always included in the order list
4.  *11|…: Fields that can be reloaded for the order list
The  font  color  switches  from  clWhite  to  clSilver  every  time  the
MGRP value changes.
Up to 8 colors can be defined.

The machine groups 71/72/73 are presented in green font color;
the groups 96/97/101 are displayed in red font color.

Up to 8 colors each can be defined.

EXAMINE_CONTENTS_CHANGE=MG
RP
EXAMINE_COLOR_C1=clWhite
EXAMINE_COLOR_C2=clSilver
EXAMINE_SCANEXPR1=MGRP=71|7
2|73
EXAMINE_SCANEXPR2=MGRP=96|9
7|101
EXAMINE_SCANCOLOR1=ClGreen
EXAMINE_SCANCOLOR2=ClRed

EAT-AIP_82.docx

Page 49 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Entry

Comment

All lines  with BATTRIB=1  are shown in blue background color;
rows with BATTRIB=2 are displayed in lime.
Up to 8 colors each can be defined.

Specification  of  a  column  that  includes  the  color  value  for  the
row (e.g.: 0-Black; 255-Red, 16777215-White)
Setting  of  the  background  color  depends  on  whether  the  field
value reaches different threshold values.

EXAMINE_SCANBKEXPR1=BATTRIB
=1
EXAMINE_SCANBKEXPR2=BATTRIB
=2
EXAMINE_SCANBKCOLOR1=clBlue
EXAMINE_SCANBKCOLOR2=clLime
EXAMINE_COLOR=TEXTCOLOR
EXAMINE_BKCOLOR=HGRCOLOR
EXAMINE_CELLBKLEVEL2=EGR:AUS
P,EGR:AUSP,<1*clLime|<=5*clYellow|>
15*clRed
EXAMINE_ROWBKLEVEL1=SGR:RES
T,
SGR:REST,<=0*clRed|<=5*clLime|>15*
clYellow
Syntax of column definitions
MNR=C8,80,R
MGRP=N6,60,R
AGR:AUS=N10.2,125,R
MSDATB=dd.mm.yy,70,L
MSZEIB=hh:mm,70,L
SKDATB=dd.mm.yyyy,90,L
SKZEIB=hh:mm:ss,80,L
MSDAUER=ddd.iii,60,R
AGR:BMK11=hhh:mm:ss,80,R,TESTH
EADER
ALIAS KOPIE=MNR=N8,120,R,TITEL  ALIAS             new name is being introduced

Alpha-numeric, 8 characters, 80 pixels, right-aligned
Numeric, 6 characters, 60 pixels, right-aligned
Decimal, 10 digits, 2 decimal places
Displayed in the form "23.03.98", (left-aligned)
Displayed in the form "08:24"
Displayed in the form "23.03.1998"
Displayed in the form "08:24:39"
Displayed in industrial time unit " 22,982"
TESTHEADER: new column caption

Setting  of  the  background  color  depends  on  whether  the  field
value  reaches  different  threshold  values.  The  entire  row  is
colored because of the threshold value.

ALIAS
AKA=MNR[1..3]=N8,120,R,ARRAY[1..3
]
ALIAS
ATTR=MNR(2)=N8,120,R,PARAMETE
R(2)
ALIAS
U=(R*6.2831)=N10.3,60,L,Scope
ALIAS
SOLLZ={_INT((_DATETIME(|SKDATE|,
|SKZEIE|)-
_DATETIME(|SKDATB|,|SKZEIB|))*864
00)}=hh:mm:ss,60,R,SOLLZ
;target
time of shift
GRID_BROWSEROW=0
GRID_CELLPAINT=ON
GRID_REFRESH=5000

           new identification
KOPIE=
ID in data file
MNR=
Formatting
N8,120,R,
TITEL
column caption in table
The first three characters from MNR are displayed.

The second part separated by „ ; “ is displayed.
Example: „ 12;20;130 “  „20“

Conversion of a value
Syntax: see below
Complex calculations relating to several fields
Syntax: see below

only the active row is colored yellow
Requirements for coloring rows column by column
Cycle  for  updating  the  display  [ms]    lists  are  not  reloaded
from the server!
Recommended  if  a  constantly  changing  value  is  calculated
using an ALIAS function.

EAT-AIP_82.docx

Page 50 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Entry

Comment

GRID_POSITION=ON

Display of the grid position

GRID_CELLPAINT=ON

EXAMINE_CELLBKCOLOR=WTK:STA
,WTK:STA,0-clGreen|1-clBlue|2-
clYellow|3-clRed

can also be used with index:
EXAMINE_CELLBKCOLOR1..8

Limited/no  support  when  scrolling  using  scroll  bars  and  page
scrolling
One single column is colored in every cell subject to a value.
1st value: ID of the column to be colored.
2nd value: ID of the reference column
3rd value: Configuration (color for possible values)

Notes:

-  The  reference  column  MUST  be  shown  in  the  list,  if

required with length 0

-  The  values  are  converted  into  capital  letters  when  being

EXAMINE_CELLBKCOLOR1..20

compared.

EXAMINE_CELLBKCOLOR=DMY,COL
OR

Take over the color directly from the "color" column.
The column <DMY> is shown in the color defined in the column
<COLOR>

; Definition virt. column(1)
EXAMINE_CELLVALUE1=CV1,REF1,S
=DAT|P=ZEI|A=REST|N=INFO
; Definition virt. column(2)
EXAMINE_CELLVALUE2=CV2,REF2,1
0=MGRP|20=MNR|30=COLOR|40=MS
TTXT

...
; Layout/Position virt. column(1)
CV1=CELLVALUE,150,Z,Data
...
; Layout/Position virt. column(2)
CV2=CELLVALUE,150,Z,M/C/T

GRID_RANDOMSORT=ON

GRID_CLIPBOARD=<BUTTON>@<SE
LECT>@<DATA>
Special entries
[Maschinenliste]
ALIAS StkProMin=IZYSM=
              N8,48,R,Stk/min

Filling  of  a  virtual  "Case"  column  with  values  from  different
columns subject to the value of a reference column.

1rd value:

Identification of the virtual "case" column

2rd value:

Identification of the reference column

3rd value:
Configuration

Reference value + ‚=’ + display column

CV1=CELLVALUE,150,Z,YST

Please  note:  the  virtual  "case"  column  needs  to  be  configured
as follows
<Identifier>=<Key word>,<Width>,<Alignment>,<Caption>
e.g.
This options randomly sorts the list.
Please  note:  If  this  option  is  active,  any  configured  sorting  will
be ignored.
This option copies data from a table/grid into the clipboard.

Activation  of  calculation  &  display  of  the  produced  pieces  per
minute

EAT-AIP_82.docx

Page 51 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Entry

Comment

[layout pze]

Configuration of the PZE terminal

KundenBitmap=kunde.bmp

"Kundenbitmap=<File name>“ file with customer logo
When restarting the terminal, this file is copied from the server
directory ".\ctnet\win\aip2\etc\“ into the application directory
".\etc\“.

„DienstGangTaste=1,3“  Default [ empty ]
By entering the function key numbers (1...4), a check specifying
if the person is allowed to go on a business trip is performed
during the posting.

Configuration of the used font types/font sizes as well as the
layout of the date and time display.

DienstGangTaste=1,3

StdSchrift=Arial
StdDateSize=30
StdStatusSize=26
StdSpdBttnSize=16
InfoSchrift=Courier New
InfoSchriftSize=20
SmallStatusFontSize=16
DateTimeLayout=dd.mm.yyy hh:mm:ss

7.1  Formulas used in grid layout

Simple conversion of a value
Syntax:

 ALIAS <Alias>=(<formula>)=formatting

  <formula>: [1/]<ID>[<Operator><Value2>]

    <ID>: ID from list (The current value from the list is entered here

            in the formula)

<Operator>: + | - | * | / | ^

  <Value2>: 2nd Operand

Extensive formulas:
Formulas that can also relate to several table fields  can be recognized by braces.

 Syntax: ALIAS <Alias>={<Formula>}
 <Formula>: (<Operand1>[<Operator><Operand2>])
 <Operand>: <Value> / <Function> / <Formula> / |KENN|
<Operator>: |+|-|*|/|^|
   <Value>: Constant ('0'..'9','e','E','.','-')
    |Kenn|: reads out a value from the table
<Function>: _<Fname>(<Operand>[,<Operand>[,...]])
           _DATETIME(<Date>,<Time>)

 <Date>: mm/dd/yyyy

EAT-AIP_82.docx

Page 52 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

  <Time>: ssss (Seconds of the day (0..86400))

             ==> Real value as TDateTime
           _INT(<Operand>)
             returns a value without decimal places
           _REAL(<Operand>)
             returns a value with decimal places
           _ROUND(<Operand>)
             returns rounded value without decimal places
           _MOD(<Operand1>,<Operand2>)
             ==> Operand1 mod Operand2
           _ABS(<Operand>)
             absolute amount of a figure
           _EXP(<Operand>)
             e raised to the power of X (e: basis of the natural logarithm)
           _LN(<Operand>)
             natural logarithm (Ln(e) = 1)
           _FRAC(<Operand>)
             proportion of decimal places
           _LOG(<Operand1>,<Operand2>)
             LOG(N,X): logarithm to base N of X

     _MAX(<Operand1>,<Operand2>)
             the greater value of two values
           _MIN(<Operand1>,<Operand2>)
             the lesser value of two values
           _SQRT(<Operand>)
             ==> Square root of Operand1
           _PI()
             ==> 3.14151926535...

Examples:

Calculation of the target time of a shift (ZEISS):
ALIAS SOLLZ={_INT((_DATETIME(|SKDATE|,|SKZEIE|)-
_DATETIME(|SKDATB|,|SKZEIB|))*86400)}=hh:mm:ss,60,R,SOLLZ

ALIAS TEST={_INT(|AGR:GUT|/|TLG|)},N3,30,R,Test

ALIAS test1={_LN(2.7182818)}=C8,80,L,Test1

New (V7.2.3.74): Utilization of intermediate variables in ALIAS functions:

ALIAS U_Brutto={|AGR:GUT|+|AGR:AUS|}=N8,40,Z,Brutto

ALIAS U_BPMN={_REAL(60000/|SZY|)*|TLG|}=N8,35,Z,BpmN

ALIAS TK_TEST={|*U_Brutto|+|*U_BPMN|}=N8,35,Z,TK*

Setting of the background color depends on whether the field value reaches different threshold
values.
Syntax: EXAMINE_CELLBKLEVEL<i>=<Akro>,<Akro_ref>,
                              <Comp1><Val1>*<Col1>|
                              <Comp2><Val2>*<Col2>...
       <i>: Index 1..8
    <Akro>: Identification of the field to be colored
<Akro_ref>: Identification of the reference column

EAT-AIP_82.docx

Page 53 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

    <Comp>: Limiting characters (<,>,<=,>=)
    <Val1>: Limit value (integer or Real or ID
            of a reference value for comparison purposes)
            alternative: (Akro) – column of limit value
    <Col1>: Color (Delphi name)

Threshold  values  are  searched  from  the  left  to  the  right.  If  a  "<“  or  a  "<=“  –  criterion  is  met,  the

corresponding color is set and the evaluation/report is finished. If a ">“ or ">=“ criterion is met, it will

first be checked whether or not the condition that follows is also met.

The direct comparison with "=“ is not allowed. But the same function can be achieved by processing

the comparisons relating to "<“..„<=“ or „>“…“>=“.

An  identification  put  in  parentheses  may  also  be  indicated  instead  of  the  limit  value.  During  the

comparison, the current field content including the specified ID is read out from the same row as the

limit value.

All three fields (field to be colored, reference field and limit value field, if required) must be configured

as fields to be displayed. The field width can be set to zero if one of these fields should not be visible.

The color value clWhite may be entered to prevent sections from being colored.

The  values  are  compared  as  they  are  displayed.  The  actual  values  0.5  and  1  are  considered  being

equal if displayed values are to be rounded to integer values.

Coloring of the field only works if the option "GRID_CELLPAINT=ON“ is set.

The  option  "GRID_BROWSEROW=0“  should  also  be  set  in  order  for  the  coloring  to  be  recognized

even if the row is selected.

Examples:
EXAMINE_CELLBKLEVEL1=MNR,MST,<=1*clLime|<=2*clYellow|>2*clRed
EXAMINE_CELLBKLEVEL2=FS,FS,<90*clLime|>=90*clYellow|>=100*clRed
EXAMINE_CELLBKLEVEL3=EGR:GUT,EGR:GUT,<(SGR:GUT)*clLime|>=(SGR:GUT)*clYellow

7.2  Translations in grid layout

Column contents can be configured to be translated and displayed by entering e.g. the configuration

<XYZ=T10,100,L>  instead  of  <  XYZ=C10,100,L>  in  the  configured  grid  columns.  A  <#>  character

must be prefixed for these "resource strings" to provide for better classification. This modification can

be used in every INI file (hytnrcfg.ini,..) where grid layouts are configured.

EAT-AIP_82.docx

Page 54 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Please note: The data do not include any translated values. In order for them to be displayed in e.g.

dynamic  dialog  fields,  an  explicit  translation  must  be  performed  using  the  VB  script  function  <

vbsTranslateDataValues( “<columns>“ , “<data row>“ ) >.

Column contents can be configured to be translated and displayed by entering e.g. the configuration

<PSPERRE=U1,100,L> instead of <PSPERRE=C1,100,L> in the configured grid columns. The entry

for the "resource string" that depends on the field has the following structure:

„#<Acronym>#<Value>“

e.g.

„#PSPERRE#J“

"production lock enabled“

„#PSPERRE#N“

„ “

(blank character)

This modification can be used in every INI file (hytnrcfg.ini,..) where grid layouts are configured.

Please note: The data do not include any translated values. In order  for them to be displayed in e.g.

dynamic  dialog  fields,  an  explicit  translation  must  be  performed  using  the  VB  script  function

vbsTranslateDataFields( “<columns>“ , “<data row>“ ) >.

EAT-AIP_82.docx

Page 55 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

7.3  Table of color values

Farbe

Name

clWhite

clBlack

clBlue

clLime

clRed

clYellow

clFuchsia

clAqua

clOrange

Color value

$FFFFFF

$000000

$FF0000

$00FF00

$0000FF

$00FFFF

$FF00FF

$FFFF00

$0080FF

$8000FF

$FF8000

$FF0080

$80FF00

$00FF80

$808080

EAT-AIP_82.docx

Page 56 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

7.4  Modifications to GRID configuration / clipboard

The AIP2 provides for the configuration of copying values from the table into the clipboard.

Data can be copied into the clipboard using the shortcut "Ctrl + C", by right clicking with the mouse or

an optionally configured button.

The copied values are transmitted as string in the internal format.

-

-

-

-

Date columns as "MM/DD/YYYY“

Time in "seconds after midnight"

Durations in "seconds"

Quantities with a dot as decimal separator

Data  is  copied  including  a  header  into  the  clipboard.  The  columns  of  the  header  and  the

corresponding values are separated by <TAB>. Lines are completed with <CR> <LF>.

The configuration is as follows:

GRID_CLIPBOARD=<BUTTON>@<SELECT>@<DATA>@<HEADER>

<BUTTON>

Optionally, using "Y" a button can be shown in the top right margin of the table. This
button copies the selected data into the clipboard.

<SELECT>

Optional configuration of one or several selection criteria. Selection criteria are separated
and/or linked with "|“.

GRID_CLIPBOARD=..@SELECT=X|*@..

The default selection criterion is "X“ (e.g. @SELECT@ becomes @SELECT=X@ )

<DATA>

The data to be copied into the clipboard can be configured here.

-
-
-

<ALL>
<VISIBLE>
<COL1|COL2|COL3|…>

All columns of the line
Visible columns (Pixel>0)
configured columns

For the configuration options <ALL> + <VISIBLE> the selection column is removed
automatically from the columns to be copied if only one selection criterion is indicated.

In case no selection criterion is stated, the selected line is copied into the clipboard
according to configuration.

<HEADER>

As of CTAIP V# 2.0.3.35 "N" can be used to prevent the header from being displayed in
the clipboard.

EAT-AIP_82.docx

Page 57 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

The following example shows the machine status list including multiple selection and copy button for

the clipboard.

Fig. Configuration with button (red arrow) and multiple selection

[Maschinenstatusliste]
GRID_FONT=Arial
GRID_FONTSIZE=9
GRID_COLOR=clBlack
GRID_BACKGROUND=clWhite
GRID_CLIPBOARD=Y@KSTART=X|*@KSTART|MNR|MST|MSTTXT
GRID_CELLPAINT=ON
EXAMINE_CELLBKCOLOR=KSTART,KSTART,X-clLime|*-clAqua

ALIAS LEER1=(DUMMY1)=C1,10,L
KSTART=C1,30,Z,*
MST=N8,60,R,
DUMMY=C3,10,R
MSTTXT=C70,150,L,Status
ALIAS LEER2=(DUMMY2)=C1,475,L

The data selected in the screenshot have been copied into Excel using the above-described
configuration for the clipboard.

EAT-AIP_82.docx

Page 58 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

The modified configuration

[Maschinenstatusliste]
GRID_FONT=Arial
GRID_FONTSIZE=9
GRID_COLOR=clBlack
GRID_BACKGROUND=clWhite
GRID_CLIPBOARD=@@<VISIBLE>

ALIAS LEER1=(DUMMY1)=C1,10,L
MST=N8,60,R,
DUMMY=C3,10,R
MSTTXT=C70,150,L,Status
ALIAS LEER2=(DUMMY2)=C1,475,L

copies data of visible columns (pixel > 0) of the selected line into the clipboard

7.5  Configuration of basic screens

The dialogs/screens are configured using dynamic dialogs. For this reason, the following dialogs are

always required:

EAT-AIP_82.docx

Page 59 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

MMINFO  Section referring to machines in the single machine view

MAINFO  Section referring to orders in the single machine view

MINFO  Description of the machine information

EAT-AIP_82.docx

Page 60 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

AINFO  Description of the order information

The  heights  of  the  individual  components  of  the  basic  screens  and,  as  a  result,  the  positions  of  the

button bar are configured in the ctaiplay.ini file using the below-mentioned parameters:

Section [MainView1]

MachineGridHeight=415
OrderGridHeight=500
ButtonBarHeight=50

Section [MainView2]

MachineGridHeight=50
MachineInfoHeight=415
OrderInfoHeight=355
ButtonBarHeight=50

Configuration of the basic screen

Height configuration of components for the basic screen (machines,
order grid, button bar)
The  configured  heights  are  scaled
the  current  height.
Consequently, the total sum of entered heights does not play a role.
Configuration of the single machine view

to

Single-row grid to select the machine
Information on the machine
Information on the order
Height of both button bars
The  configured  heights  are  scaled
the  current  height.
Consequently, the total sum of entered heights does not play a role.

to

7.5.1  Available fields for the dialog configuration of basic

screens

A script function completing the fields according to the customer's requirements is not available .

In  general,  the  fields  of  the  machine  list  and  the  order  list  are  available.  "MNR."  or  "ANR."  must  be

prefixed for identification purposes.

EAT-AIP_82.docx

Page 61 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Known quantity fields are formatted to match the configured number of decimal places.

Some fields are calculated. The following fields are additionally available:

Identification

Description

ANR.SOLL_SEIT

Target quantity since login

The  value  is  determined  locally  at  the  terminal.  This  is  only  useful  for  MDE

machines.  However,  the  order  must  be  logged  on  locally  after  restarting  the

terminal.

ANR.ABWEICH

Deviation [%]

Comparison of "target quantity since logon" and "actual quantity since logon“

MNR.SZY

Target cycle

Field  is  transferred  including  "internal  decimal  places".  The  number  of

characters displayed is determined by the field of the dialog configuration.

MDE.IZY

Actual cycle

The machine's current actual cycle  - only if MDE processing is active for the

machine at this terminal.

MNR.MSZEIB

Start time of the current status

MNR.MSDATB

Start time of the current status

MNR.MSDAUER

Duration of the current status

ANR.BEARBZ

Planned duration

MNR.MSTTXT

Status text

MNR.TLG

Partitioning

Calculated based on the orders running at the machine.

ANR.FERTIG

Progress bar

TNRPSPERRE

Translated text for the production lock

(corresponds  to  the  configuration  "TNRPSPERRE=U1,150,L,Hinweis“  in

ctaiplay.ini)

(the value J/N from the list can be found in MNR.TNRPSPERRE)

EAT-AIP_82.docx

Page 62 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

EAT-AIP_82.docx

Page 63 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

8  AIP2 - Local Configurations File ctaipbut.ini

Buttons  are  configured  for  specific  terminals  in  the  file  ctaipbut.ini  stored  in  the  terminal  directory

c:\MPDV\AIP2.

The button pages of the main view and the OP info dialog may be configured in the configuration file

ctaipbut.ini.

The  buttons  can  only  be  configured  like  this  in  the  main  view  if  the  new  design  of  the

AIP2 has been deactivated.

The  server  directory  \<serverDir>\ctnet\win\aip2  contains  the  complete  INI  files  of  the

standard. Deviations from this are created  in  the customer-specific directories provided

for this purpose, e.g. \<serverDir>\1\custom\aip2\tgrp_901.

Create the corresponding, empty file (e.g.: ctaipbut.ini) in this directory. Copy all sections

e.g. [ANR-ALL-Page1] to this file. The configuration is performed in this file.

After  the  terminal  restart  a  merge  (summary)  of  the  files  from  the  root  directory

\<serverDir>\ctnet\win\aip2

with

the

files

of

the

custom

directory

\<serverDir>\1\custom\aip2\tgrp_901  takes  place,  which  are  transferred  locally  to  the

terminal in the directory c:\MPDV\AIP2.

All sections including the string "-Page" are imported.

EAT-AIP_82.docx

Page 64 of 160

01.09.20

Entry

Definition of sections

[ LST-MODUS-PageX.]

Advanced Configurations: MES Terminal AIP

Comment

General schematic structure of a button page
Definition of a section
LST

= List identifier of the button page
   ( MNR, ANR, LIST3)

MODUS = Mode of the machine
LN = MPL – Mode
DN = DLL – Mode
LR = RF – Mode (reel-based manufacturing)
LS = RS – Mode (cutting reels)
LC = Handling unit (packing station)

or

XX = <MPL_MOD>[1] + <TYPE>[]
YY = Value from the MNR.LST column
<MNRBTN.MODUS>

Otherwise
mode, the section

 if  no  applicable  entry  is  found  for  the  machine

...ALL    will be used (if available)
= Button page

X
The  definition  specifying  the  mode  a  machine  is  running  on  is
implemented in the AIP application program.

Sample configuration

General structure:

[MNR-...-Page1]
1=A_AN, L, log on OP
2=BLANK, L
3=$MPL-PAL$PAL_AN,L,log
pallet,

on

4=%BART:PZE=J%PZE,R,PZE,PZE.
PNG

x=<Function>,<Alignment>,<ButtonName>,<Icon>

For example:
1=A_AN,L,log OP on,AGAN.PNG

A_AN
L or R (from the first "R“ on always "R“)

- Function
- Alignment
- ButtonName  Log on OP
- Icon

optional icon name
(PNG, resolution 24x24 px)

Note:

Special functions:

In  one  section  numbering  of  entries
must be consecutive from 1...n. A gap
in numbering indicates the completion
of a page!

$...$ (e.g. $MPL-PAL$ )
License check  fails
 Button is deleted

%...% (e.g. %BART:PZE=J% . )
Check field with value in (T)terminal (K) label
 only show if they match

BLANK
Insert distance between buttons

EAT-AIP_82.docx

Page 65 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Entry

Comment

Configuration  of
wildcards

functions  using

x=A_AN*,L, log on OP

x=A_UN*,R, interrupt OP

The dialog to be opened is located as described below if buttons
are configured using wildcards
ID A_AN*
  - Calling dialog: A_AN
    - Identification of the machine type
    -

based

dialog

the

the

on

Supplementing
 machine type

    -  Check whether or not the dialog is available
       if this is the case - calling dialog: A_AN_MPL
  - Evaluation of the posting type (only with A_AN)
    - Supplementing the dialog based on the posting type
    -  Check whether or not the dialog is available
             if this is the case - calling dialog: A_P_AN_MPL
  - Calling up the located workflow or dialog

If the function is <A_UN*> or <A_AB*>, it will be checked whether
or not the OP to be logged off is a merged OP.
 - If this is the case,

<A_UN*> is changed into <SA_UN>
<A_AB*> into <SA_AB>

or

If the virtual column <MNRDLG.SUFFIX> includes a value, it will
always be used (if available).
      ButtonFkt  MNRDLG.SUFFIX      Dialog
   A(_P)_AN_XYZ
 e.g.   A_AN*         <XYZ>
           A_TR*       <ABC>                 A_TR_ABC

Lock status "production"
Switching of the basic view:
List view  presentation of individual machines
Calling  up  icon  view  (only  possible  if  configured  in  the  machine
configuration)
Calling up the actual value view of PDV
Input of BDE comments
Log on merged operation
Calling up the DNC startup screen
Minimizing  of  the  terminal  program    Windows  7  requires  the
compatibility mode XP

User-defined buttons showing and starting external software
The programs are configured in the section [ext. software] of  the
ctaip.ini file

Consequently,  the  relevant  info  dialog  including  the  selected
page  is  opened  in  the  foreground.  Switching  to  other  pages  is
allowed.
M_INFO may be used to show the info page in the foreground:

M_INFO=M_INFO.INFO

Further standard buttons:
P_SPERRE
VIEW
ICON
PDV_ISTW
WF_BDE_KOM
SA_AN
DNC
MINIMIZE

USER1…USER9

Button IDs for the machine info
[MNR-ALL-Page2]
1=M_INFO.INFO,L,show
information
2=M_INFO.PERS,L,staff
3=M_INFO.MSPROT,L,machine
status log

EAT-AIP_82.docx

Page 66 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Entry

Comment

Button IDs for OP info:
[ANR-ALL-Page3]
1=A_INFO.DOKU,L,documents
2=A_INFO.HILF,L,production
resources and tools
3=A_INFO.KOMP,L,components
4=A_INFO.BMK,L,RPA
5=A_INFO.FORT,L,progress
6=A_INFO.NOTE,L,notes

A_INFO.TEXT1,L,User
text1
A_INFO.PICT1,L,User  image1
A_INFO.SCRINF1,L,User
scriptInfo1
A_INFO.DIALOG1,L,User
dialogs

Consequently,  the  relevant  info  dialog  including  the  selected
page  is  opened  in  the  foreground.  Switching  to  other  pages  is
allowed.
A_INFO  may  be  used  to  show  the  information  page  in  the
foreground:

A_INFO= A_INFO.INFO

Direct  call  of  user-defined  pages  configured  in  the  section  [OP
info] of the ctaiplay.ini file.
Example:
Dialog1=WF_BDE_KOM_LIST,BDE comments
 A_INFO.DIALOG1,L,BDE comments

info

tabs,

Configuration of a function
with different modes
Just  as  it  is  the  case  for
the  configuration  of  the
ANR/MNR
a
function  can  be  configured
with different modes.
1=RES_WART.MNR,L,machine
maintenance
2=RES_WART.RES,L,resource
maintenance
3=RES_WART,L,other
maintenance

In  the  configured  examples,  the  dialog  <  RES_WART  >  is
requested with the below-mentioned modes.
1 < MNR >
2 < RES >
3 without mode

The values can be read out as follows in the terminal script.
VPar(“BTN.FKT“)
VPar(“BTN.FUNC“)
VPar(“BTN.MODE“)  Mode

Function + mode
Function

EAT-AIP_82.docx

Page 67 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Entry

Comment

Available  button  sections  and
buttons  for  pages  of  the  OP  info
dialog:

[A_INFO-Page1]

[A_INFO.DOKU-Page1]
3=AI_VIEW,R,open document
4=AI_VIEW_CLOSE,R,close
document

[A_INFO.HILF-Page1]

[A_INFO.KOMP-Page1]

[A_INFO.BMK-Page1]

[A_INFO.FORT-Page1]

[A_INFO.NOTIZ]

view

Overview

Document

Production resources and tools

Components

Resource Performance Accounts (RPA)

Progress bar

Notes

Configuration of a default page (used if no section is defined for
the tab).

[A_INFO.DEFAULT-Page1]

The  IDs  may  also  be  used  for  the  keys  in  the  dynamic  dialog
(field "function").

Recommended for all pages:
1=AI_CLOSE,L,close
information
Available  button  sections  and
buttons  for  pages  of  the  machine
info dialog:

OP

[M_INFO-Page1]

[M_INFO.PERS-Page1]
2=P_AN,R,log person on
3=P_AB,R,log person off
4=P_AAB,R,log everyone off

Overview

Staff logged on

[M_INFO.MSPROT-Page1]

  Machine status log

[M_INFO.DEFAULT-Page1]

Configuration of a default page (used if no section is defined for
the tab).

For all pages:
1=MI_CLOSE,L,close machine
information

EAT-AIP_82.docx

Page 68 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Entry

Definition of sections
[ ButtonPanel ]

functionkey_visible=on

radiobuttonkey_visible=on

Comment

General  section  for  the  configuration  of  global  settings  for
all used button panels
 2 in main view ( MNR , ANR )
 (W)ork(F)low

Shows function keys (e.g.  "F3")  in  button  panels  in  order for  the
selection to be made using function keys (by default = off ).

Presentation of function keys in radio group boxes of a workflow
(by default = off).

functionkey_pze_visible=on

Display of function keys in PZE module (by default = off ).

Definition of sections
[ LIST3-ALL-Page1 ]

as of CTAIP V# 2.0.2.33
..=~<VISLIST-ID>~,L,,<PNG-File>

The  characters  "~“  (or  previously  "§“,
should no longer be used) have been
designed  to  identify  third  list  buttons.
Correct
processing/updating
(disabled/enabled)  is  only  possible  in
the third grid list of the main screen.

1=~M~,L,,PALETTE20x20.PNG

2=~P~,L,,PERSON20x20.PNG

3=~R~,L,,RESS20x20.PNG

General  section  configuring  functions  of  the  configurable
third list of the main screen.
INFO:
The different types of the "3rd  list" are configured in the machine
label. The layout of a "3rd list" is defined in the "hytnrcfg.ini" file.
  All  used  lists  have  to  be  configured  with  their  identifier  „“  as
follows.
 When  changing  machines,  the  "3rd  list"  is  hidden/shown  and
buttons for "3rd lists" that are not configured are disabled.

Entry for "material list"
 "[ VISLIST3(M) ]“ from "hytnrcfg.ini“

Entry for "list of persons“
 "[ VISLIST3(P) ]“ from "hytnrcfg.ini“

Entry for "MNR_AMAT.LST“
 "[ VISLIST3(R) ]“ from "hytnrcfg.ini“ with the configured Bitmap
„“

4=~A~,L,,NUM.PNG

5=~G~,L,,PERSON20x20.PNG

Entry for "material list"
 "[ VISLIST3(A) ]“ from "hytnrcfg.ini“

Entry for "list of persons GWP“
 "[ VISLIST3(G) ]“ from "hytnrcfg.ini“

EAT-AIP_82.docx

Page 69 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

9  Barcode Input with Prefix

A  barcode  is  interpreted  as  prefix  barcode  if  the  third  character  is  a  dot.  In  this  case  the  first  two

characters identify the barcode type. The actual barcode starts with the fourth character.

ID+
Prefix
--------
00.

Example

--------------------
00.ABC123

01.

01.OK
01.ESC

Comment
--> processing
---- General ---
Data not defined,
 00. will be deleted and “ABC123” will be passed on to standard
processing
Action barcode
 Dialog cancelled or ended with OK button or Esc button.

--------------------

16.EXTRUDER-7
16,200
17.1
17.1001
18.1
18.1001
19.1
19.1001
20.1
20.MF

--------------------
40,100
40.MONTAGE
41.KARTON
41.KISTE

--------
10.
11.
12.
13.
14.
22.
15.

16.

17.

18.

19.

20.

21.

--------
40.

41.

42.
43.
44.
45.
46.
47.
48.
49.

---- HYDRA-ADE + HYDRA-LLE + HYDRA-MDE ---
(combined) Order/sequence/OP number  acronym <ANR>
Order (header)  acronym <AUNR>
Sequence  acronym <AFOLG>
OP  acronym <AGNR>
Sub-order number -> Acronym <UAGNR>
Split no.  acronym <SPLNR>
Upload/confirmation number  Acronym <RMNR>

Machine  Acronym <MNR>
 Passed on to dialog with MNR=EXTRUDER-7 or MNR=200
Machine status  Acronym <MST>
 Passed on to dialog with MST=1 or MST=1001
Scrap reason  Acronym <EGG:AUS>
 Passed on to dialog with EGG:AUS =1 or EGG:AUS=1001
Deviation reason  Acronym < EGG:GUT >
 Passed on to dialog with EGG:GUT =1 or EGG:GUT=1001
Operator position  Acronym <BPOS>
 Passed on to dialog with BPOS =1 or BPOS = MF
Wage and premium indicators  Acronym <LPKZ>

----HYDRA-WRM + HYDRA-DNC + HYDRA-PDV + HYDRA-MPL  ---
Destination  Acronym <ZLO>
 Passed on to dialog with ZLO=100 or ZLO= MONTAGE
Transport unit  Acronym <TPE>
 Passed on to dialog with TPE = KARTON or TPE = KISTE
Batch number  Acronym <CNR>
Throughput batch number  Acronym <DLL>
Alternative batch number  Acronym <CNR:ALT1>
Alternative batch number  Acronym <CNR:ALT2>
Alternative batch number  Acronym <CNR:ALT3>
Alternative batch number  Acronym <CNR:ALT4>
Alternative batch number  Acronym <CNR:ALT5>
Alternative batch number  Acronym <CNR:ALT6>

--------

--------------------

---- Mainly for the HYDRA-PZE module ---

EAT-AIP_82.docx

Page 70 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Example

52.EDV
52.VERTRIEB
53.1
53.1001

Comment
--> processing
Badge number  Acronym <KNR>
Personnel number  Acronym <PNR>
Cost center  Acronym <KST>
 Passed on to dialog with KST=EDV or KST=VERTRIEB
Absence reason  Acronym <FGR>
 Passed on to dialog with FGR=1 or FGR=1001

--------------------

---- Customer-specific barcodes ---

ID+
Prefix
50.
51.
52.

53.

--------
90.
…

In  case  barcodes  are  required,  which  actually  have  a  dot  at  the  third  place  (e.g.  if  the

machine/workplace  number  has  a  dot  as  third  character),  it  is  possible  to  define  an  alternative

indicator for barcode prefixes in the HyTnrCfg.ini terminal configuration, e.g.

[Terminal->USR 0]

BarcodePrefixChar=$

If  another  prefix  is  actually  required,  the  respective  barcode  font  in  use  must  be  able  to

represent this prefix.

Examples for barcodes

Barcode printing: Font “Codedreineun” and prefix “.“

Prefix

10.

Barcode

*10.123456780100*

*10._ABCD12340100*

Raw data

ANR = 123456780100

ANR=_ABCD12340100

EAT-AIP_82.docx

Page 71 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Barcode

*11.12345678*

Raw data

AUNR = 12345678

*12.01*

*13.0100*

AFOLG = 01

AGNR = 0100

*14.0000*

UAGNR = 0000

*15.123456789012345*

RMNR = 123465789012345

*22.02*

SPLNR = 02

Prefix

11.

12.

13.

14.

15.

22.

EAT-AIP_82.docx

Page 72 of 160

01.09.20

Prefix

16.

Barcode

*16.123456*

Advanced Configurations: MES Terminal AIP

Raw data

MNR = 123456

MST = 1122

17.

18.

19.

20.

21.

*17.1122*

*18.1234*

EGG:AUS = 1234

*19.123456789*

EGG:GUT = 132456789

*20.13*

*21.1221*

BPOS = 13

LPKZ = 1221

EAT-AIP_82.docx

Page 73 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

Prefix

50.

Barcode

*50.1337*

Raw data

KNR = 1337

9.1  Configuration of customized barcode prefixes

Section [barcode]
BarKenn90=SAPCNR
BarKenn91=EGR:GUT

The  barcode  prefixes  90...99  can  be  assigned  here  according
to the customer's requirements. This means, if a barcode with
the  relevant  prefix  is  used,  it  will  be  transferred  to  the  dialog
along with the assigned ID. Then the barcode has the following
structure:
<Prefix>.<Net barcode>
e.g.: "90.12345“  SAPCNR=12345

Firmly assigned barcode prefixes:
53:FGR
10:ANR
11:AUNR
12:AFOLG
13:AGNR
14:UAGNR
15:RMNR
16:MNR

17:MST
18:AUSGRD
19:AGGGRD
20:BPOS
21:LPKZ
22:SPLNR
40:ZLO
41:TPE
42:CNR
43:DLL
44:CNR:ALT1
45:CNR:ALT2
46:CNR:ALT3
47:CNR:ALT4
48:CNR:ALT5
49:CNR:ALT6
50:KNR
51:PNR
52:KST

EAT-AIP_82.docx

Page 74 of 160

01.09.20

Advanced Configurations: MES Terminal AIP

EAT-AIP_82.docx

Version: 1.1.23049

Page 75 of 160

Advanced Configurations: MES Terminal AIP

10  AIP2 - GUI Configuration

10.1  Overview

The  layout  for  the  new  GUI  of  the  AIP2  terminal  (tile  design)  is  stored  in  XML  files.  XML  files  can  be

edited  using  a  standard  text  editor.  Microsoft's  XML  Notepad  2007  can  also  be  used.  This  XML  editor

provides a clearer presentation, a user-friendly copy function for entire objects and the possibility to move

complete  objects.  XML  Notepad  2007  was  used  for  the  generation  of  screenshots  included  in  this

document.

In the configuration, font sizes and positions are given in points in relation to a screen resolution

of 600 points in height.  Values must be scaled and then rounded to  whole dots when  using  a

screen with a higher resolution.  Therefore, the proportions can slightly vary depending on the

screen resolution.

Colors  are  specified  in  XML  files  in  a  reversed  RGB  notation  (Blue/Green/Red  instead  of

Red/Green/Blue). If the entry is in the hexadecimal format, the two places behind the symbol $

define  the  color  blue,  the  next  two  places  the  color  green  and  red  is  defined  by  the  last  two

places.

10.2  Filing XML files in the server

Like the INI files ctaiplay.ini and ctaipbut.ini, the XML files that define the GUI are located on the server in

the sub directory ctnet\win\aip2.  XML files are filed in the sub directory gui.

10.2.1  Scope Concept

The  INI  files  in  the  subdirectory  <SystemNo>\custom\aip2  and  the  XML  files  in  the  subdirectory

<SystemNo>\custom\aip2\gui  can  be  overridden  customer-specifically  in  deviation  from  the  standard.

Various scopes are provided in order that the different changes do not overwrite each other.

Scope

Directory

Standard

ctnet\win\aip2\<x>.<y>

Standard scope

<SystemNo>\custom\aip2\<x>.<y>

Examples
ctnet\win\aip2\ctaiplay.ini
ctnet\win\aip2\gui\l_anr.xml
1\custom\aip2\ctaiplay.ini
1\custom\aip2\gui\l_anr.xml

Custom Scope

<SystemNo>\custom\aip2\<x>@custom.<y>  1\custom\aip2\ctaiplay@custom.ini

VAR scope

<SystemNo>\custom\aip2\<x>@var.<y>

Local scope

<SystemNo>\custom\aip2\<x>@local.<y>

1\custom\aip2\gui\l_anr@custom.xml
1\custom\aip2\ctaiplay@var.ini
1\custom\aip2\gui\l_anr@var.xml
1\custom\aip2\ctaiplay@local.ini
1\custom\aip2\gui\l_anr@local.xml

EAT-AIP_82.docx

Version: 1.1.23049

Page 76 of 160

Advanced Configurations: MES Terminal AIP

Standard scope

The  Standard  Scope  is  used  to  create  a  copy  of  the  standard.  This  ensures  that  changes  to  the

standard, sometimes supplied with a service pack, do not interfere with the collection terminal and

therefore,  the  collection  software  remains  unchanged.  After  generating  the  copy,  the  required

changes  to  the  standard  must  be  either  copied  again  or  synchronized.  The  changes  can  then  be

integrated into the Standard Scope.

Custom Scope

The Custom Scope is reserved for MPDV to file customer specific configurations.  A file is stored in

the Custom Scope if the file name includes @custom before the extension.

VAR scope

The VAR Scope is reserved for partners (Value Added Reseller) to store changes for customers of

partners.  A file is stored in the VAR scope if @var is inserted before the extension.

Local scope

The Local Scope is reserved for customers to store their own customized files. A file is stored in the

Local Scope if @local is inserted before the extension.

The priority of the different scopes is ascending from the standard scope to the local scope. A file in the

local scope takes priority over a file included in the standard scope.

INI and CFG files are processed differently to XMLfiles:

INI  and  CFG  files  are  merged  per  section,  that  means  sections  in  the  standard  are  totally  replaced  by

potentially  existent  sections  deriving  from  individual  scopes.    Settings  in  the  Local  Scope  have

highest priority as they are processed at last and therefore overwrite settings from the scope located

above.

XML files are not merged but accepted.  That means only files are processed located in the list of scopes

at the bottom.

The  only  exception  is  the  file  globaldefines.xml.  The  content  of  that  file  is  merged  with  the

settings of the individual scopes.  It is therefore possible to overwrite individual settings (i.e. font

size or color) without copying the complete file.  If you would like to overwrite a certain element

of  the  file  globladefines.xml,  please  copy  the  file,  delete  all  elements  to  be  accepted  from  the

standard file and then store the file in the relevant Scope.

10.2.2  Specific layouts of terminals or terminal groups

Like the INI files ctaiplay.ini and ctaipbut.ini, the XML files that define the GUI are stored on the HYDRA

server in the subdirectory <SystemNo>\custom\aip2. Standard XML files are filed in the sub directory gui.

EAT-AIP_82.docx

Version: 1.1.23049

Page 77 of 160

Advanced Configurations: MES Terminal AIP

If different GUI layouts are required for specific terminals or terminal groups, the non-standard XML files

are stored in the following subdirectories:

Reference

Subdirectory

Example

Terminal group
Terminal

tgrp_<Terminal group>\gui
tnr_<Terminal number>\gui

tgrp_900\gui
tnr_100\gui

XML files stored in these sub directories replace standard files with the exception of the globaldefines.xml

file whose content is merged with the relevant standard files.

10.2.3  Loading configuration files during restart

Every  time  the  AIP2  is  started,  INI,  CFG  and  XML  files  are  updated  from  the  server  and  automatically

activated in the terminal.

When changing the layout, please note that the changed layouts are not overwritten when the

AIP is started.  Updating of configuration files can be deactivated in the file ctaip.ini by adding

the parameter SkipAipStartupUpdate to the entry parameters= in the section [system].

10.2.4  Syntax check via XML Schema Definition (XSD)

An XML Schema Definition (XSD) defines the structure of an XML file. Depending on the editor used, a

syntax check of the edited XML file is performed. In addition, you can select the value of specific fields via

a selection list.

In the XML Notepad 2007 of Microsoft, you can enter XML Schema Definitions via the menu item View –

 Schemas… and enable or disable them:

The file globaldefines.xsd includes the schema for the file globaldefines.xml. The file gui.xsd includes the

schema  for  the  other  XML  files  used  for  the  GUI  configuration.  The  two  XSD  files  are  located  in  the

HYDRA server in the same directory as the corresponding XML files.

EAT-AIP_82.docx

Version: 1.1.23049

Page 78 of 160

Advanced Configurations: MES Terminal AIP

The  two  XSD  files  globaldefines.xsd  and  gui.xsd  are  not  compatible.  For  this  reason,  one  of

these files must always be disabled.

The following example shows a syntax check and a selection list:

10.3  Settings

The  file  globaldefines.xml  includes  general  settings,  constants,  data  sources,  calculated  fields  and

functions.

Changes in the file globaldefines.xml are only active after restart of the AIP2.

10.3.1  General settings

Standard settings control program processing and may not be changed.

10.3.2  Constants (Defines)

The  section  Defines  specifies  the  Constants  used  for  different  layout  configurations.  For  example,  you

can change color or font size at a central location using these constants.

EAT-AIP_82.docx

Version: 1.1.23049

Page 79 of 160

Advanced Configurations: MES Terminal AIP

The following constants can be set:

FONT_NAME

This constant sets the font of the GUI.  The standard setting is  „Tahoma“.

FONT_SIZE_LABEL

This constant sets the font size for the GUI labeling. The standard setting is 8.

FONT_SIZE

The constant FONT_SIZE sets the font size for the displayed data in the GUI.  The standard setting

is 10.

FONT_SIZE_HEADING

FONT_SIZE_HEADING defines the font size for the headings on the right hand side. The standard

setting is 10.

FORMAT_QUANTITY

This constant sets the format for the display of quantities.

Standard setting is „%g“.

"%g": Automatically formats the shortest display: If the quantity is an integer, then without decimal

places and without decimal separators. If the quantity is not an integer, the existing decimal places

are  output  after  a  decimal  separator  (maximum  15  decimal  places).  No  thousand  separator  is

output.

"%0.0f": No decimal places, without thousands separator.

„%0.2f“: Always two decimal places, without thousands separator.

„%0.2n“:  The  format  n  is  the  same  as  the  format  f,  but  the  resulting  string  contains  thousands

separators, if a thousands separator is configured in the regional settings.

The  set format  only  affects  configured  layouts  and  not  dynamic  dialogs.  A  delimiter  for

thousands is not available for dynamic dialogs.

EAT-AIP_82.docx

Version: 1.1.23049

Page 80 of 160

Advanced Configurations: MES Terminal AIP

FORMAT_CYCLE

FORMAT_CYCLE  defines  the  output  format for  cycle  times  (target  cycle  and  actual  cycle)  if  they

are not output as durations (as in the standard system) but in seconds. Formatting is issued like in

the previous field.  Standard setting is "%0.3f". Please refer to section "1.2.4 CalculatedFields" for

further information.

The set format only affects configured layouts and not dynamic dialogs.

COLOR_MENU_BUTTON

This constant defines the background color for specific buttons on the left hand side, like the button

"<back" and "PZE". For example the button "< Back" and the button "PZE" on the start page belong

here. Standard setting is "$C0C0C0" (light gray).

COLOR_MENU

This  constant  controls  the  background  color  of  the  buttons  used  for  selecting  workplaces  in  the

"Home"-page  and  for  calling  functions  if  an  object  was  selected.    Standard  setting  is  "$E0E0E0"

(lighter gray).

COLOR_MENU_ACTIVE

This  constant  can  set  a  background  color  for  the  selected  workplace.    Standard  setting  is

"$909090" (gray).

COLOR_BACKGROUND

This constant can set a background color to display data on the right hand side.  The color should

correspond with the COLOR_MENU_ACTIVE. Standard setting is "$909090" (gray).

COLOR_MARGINS

This constant sets the color for the borders of the layout.  Standard setting is "$FFFFFF" (white).

COLOR_HEADING

This  constant  defines  the  background  color  for  the  upper  headings  on  the  right  hand  side.

Standard setting "$833014" (dark blue).

COLOR_HEADING_2

This constant defines the  background color for the headings in the middle on the right hand side.

Standard setting is "$974428" (blue).

COLOR_HEADING_3

This constant defines the background color for the lower headings on the right hand side.  Standard

setting is "$AA583B" (light blue).

COLOR_FONT_HEADING

This  constant  defines  the  font  color  of  the  headings  on  the  right  hand  side.    Standard  setting  is

"$FFFFFF" (white).

EAT-AIP_82.docx

Version: 1.1.23049

Page 81 of 160

Advanced Configurations: MES Terminal AIP

COLOR_TILE

This constant defines the background color of the individual tiles on the right hand side.  Standard

setting is "$F8F8F8" (very light gray).

COLOR_FONT

COLOR_FONT sets the standard font color.  Standard setting is "$202020" (dark gray).

COLOR_STATUS_PRODUCTION

This constant defines the color for the status production. Standard setting is "1077248" (dark green,

$107000). With this constant, the color must be entered as a decimal value to avoid the display in a

different color on specific screens.

COLOR_STATUS_NO_PRODUCTION

This  constant  controls  the  color  for  the  all  statuses  except  production.  Standard  setting  is

"$1090FF" (dark yellow).

COLOR_STATUS_NOT_ASSIGNED

This constant defines the color for the status "Not assigned".  Standard setting is "$1010D0" (dark

red).

COLOR_YIELD

This  constant  defines  the  color  to  display  yields.    Standard  setting  is  "1077248"  (dark  green,

$107000). With this constant, the color must be entered as a decimal value to avoid the display in a

different color on specific screens.

COLOR_SCRAP

COLOR_SCRAP controls the color to display scrap.  Standard setting is "$1010D0" (dark red).

COLOR_INSPECTION_DUE

This  constant  can  set  a  background  color  to  display  a  CAQ  inspection  due.    Standard  setting  is

"$1090FF" (yellow).

COLOR_INSPECTION_DONE

This background color indicates if a minimum inspection scope  was reached.   Standard setting is

"1077248" (dark green, $107000). With this constant, the color must be entered as a decimal value

to avoid the display in a different color on specific screens.

COLOR_INSPECTION_ERROR

If an error occurs in the inspection planning, the relevant area is shown in the color set.  Standard

setting is "$1010D0" (dark red).

COLOR_MAINTENANCE_STATUS_0, …, COLOR_MAINTENANCE_STATUS_3

Color  to  display  maintenance  status  of  resources.  Standard  settings  are  "$FFFFFF"  (white),

"$873418" (blue), "$1090FF" (yellow) and "$1010D0" (red).

EAT-AIP_82.docx

Version: 1.1.23049

Page 82 of 160

Advanced Configurations: MES Terminal AIP

The name of customer specific constants must include the prefix "U". This way, they cannot be

mixed up with constants of the standard.

The following example shows how to override a constant in a scope so that it is merged with the settings

in the standard scope.

10.3.3  Data sources (ProviderDefinition)

The settings define the correlation between the individual data sources and may not be changed.

10.3.4  Calculated fields

Calculated fields configure the display of the target and actual cycle.  Both fields can be provided either

as  "time  for  1000  pieces",  "time  for  one  piece"  or  "pieces  per  minute".  The  setting  is  done  using  the

calculated  fields  SZY_CALC  and  IZY_CALC.  The  following  formulas  can  be  stored  in  the  attribute

Expression :

  Field

Presentation

Formula

Target cycle

Time for 1000 pieces

FloatToVar(FieldValue('SZY', AsDouble, 0))

Time for one piece

FloatToVar(FieldValue('SZY', AsDouble, 0) / 1000)

Pieces per minute

FloatToVar(60000 / FieldValue('SZY', AsDouble, 0))

Actual cycle

Time for 1000 pieces

FloatToVar(FieldValue('IZY', AsDouble, 0))

Time for one piece

FloatToVar(FieldValue('IZY', AsDouble, 0) / 1000)

Pieces per minute

FloatToVar(60000 / FieldValue('IZY', AsDouble, 0))

EAT-AIP_82.docx

Version: 1.1.23049

Page 83 of 160

Three options can be used as comments in the file globaldefines.xml:

Advanced Configurations: MES Terminal AIP

The formatting of both fields is configured using the constant FORMAT_CYCLE.  Please refer to section

"1.2.2 Constants (Defines)" for further information.

10.3.5  Functions (ScriptDefinitions)

The settings may not be changed during configuration of the GUI.

Fields  that  start  a  function  are  identified  by  the  attributes  Extention  and  ScriptName.  The  following

example controls the height of the entries in the list of workplaces in the main view (a_list_mnr.xml):

The entry in the field #text is not active in this case. It is overwritten by the result of the previously entered

function.  If  you  want  to  change  the  height  entered  in  this  field,  you  must  delete  the  two  attributes

Extention and ScriptName. Please note that in this case the data dependent identification of the height is

disabled.

10.4  Layout definition

The  definition  of  the  layout  is  separated  into  layout  files  beginning  with  „l_“  and  areas  consisting  of  file

names beginning with "a_".

EAT-AIP_82.docx

Version: 1.1.23049

Page 84 of 160

Advanced Configurations: MES Terminal AIP

There are the following layouts and areas in the standard:

l_view_mnr.xml

The tile view shows workplaces assigned to the terminal:

The structure for the individual workplaces is stored in the file a_view_mnr.xml.

The following screenshots show the assignment of the elements in the file to the objects in the GUI.

The element on the highest level of the tree structure is the big outer tile with gray frame:

EAT-AIP_82.docx

Version: 1.1.23049

Page 85 of 160

Advanced Configurations: MES Terminal AIP

The elements in the next level of the tree structure are the 3 tiles in light gray and the tile including

the image:

The elements in the next level  of the  tree structure are assigned  as shown  in  the example  of the

light gray tile on top and the tile including the image at the bottom:

The lowest element in the list defines the layout of the tile including the screwdriver.

EAT-AIP_82.docx

Version: 1.1.23049

Page 86 of 160

Advanced Configurations: MES Terminal AIP

l_main.xml

Select a workplace to reach the main view:

The file a_list_mnr.xml contains the structure of the view of a workplace located in the list on the

left hand side.

The  file  a_data_mnr.xml  defines  the  upper  area  on  the  right  hand  side  to  display  data  for  the

workplace.  This area is used for all layouts that follow.

The  file  a_list_anr.xml  stores  the  layout  of  an  operation  in  the  middle  of  the  screen  on  the  right

hand side.  The button to the left, which is used to log on an operation, as well as all other buttons

outside a red frame are located directly in the l_main.xml layout.

Various lists can be displayed at the bottom on the right hand side. You can set in the workplace

configuration which of the 3 lists are available at a workplace. The displayed data are defined in the

following files:

- a_list_pnr.xml: Persons logged on

- a_list_pnrg.xml: Persons logged on at a group workplace

- a_list_res.xml: Resources logged on

- a_list_emat.xml: Logged on input material

- a_list_amat.xml: Produced output batches

EAT-AIP_82.docx

Version: 1.1.23049

Page 87 of 160

Advanced Configurations: MES Terminal AIP

l_mnr.xml

If you click on the area showing the data for the selected workplace, you will get to the workplace

layout:

As  described,  the  file  a_data_mnr.xml  defines  the  upper  area  on  the  right  hand  side  to  display

data for the workplace.

The buttons on the left side are located in the layout l_mnr.xml.

l_anr.xml

If you click an operation in the main view, the operation layout appears:

EAT-AIP_82.docx

Version: 1.1.23049

Page 88 of 160

Advanced Configurations: MES Terminal AIP

As  described,  the  file  a_data_mnr.xml  defines  the  upper  area  on  the  right  hand  side  to  display

data for the workplace.

The file a_data_anr.xml contains the definition for the area in the middle of the layout showing data

for the operation.

The buttons on the left side are located in the layout l_anr.xml.

l_pnr.xml

The layout for staff appears if you select a person in the main view

As  described,  the  file  a_data_mnr.xml  defines  the  upper  area  on  the  right  hand  side  to  display

data for the workplace.

The file a_data_pnr.xml contains the definition for data relating to staff in the middle of the layout.

The button on the left side is located in the layout l_pnr.xml.

This  layout  is  also  used  to  display  data  and  to  request  functions  for  staff  logged  on  to  a  group

workplace. When requesting the functions, an error message appears as staff and operations are

logged on together to a group workplace.

EAT-AIP_82.docx

Version: 1.1.23049

Page 89 of 160

Advanced Configurations: MES Terminal AIP

l_res.xml

The resource layout opens if in the main view the third list "Resources logged on" is displayed and

you click a resource:

As  described,  the  file  a_data_mnr.xml  defines  the  upper  area  on  the  right  hand  side  to  display

data for the workplace.

The file a_data_res.xml contains the definition for data relating to a resource in the middle of the

layout.

The buttons on the left side are located in the layout l_res.xml.

l_mat.xml

To request material layout, go to the main view. Click the button containing three dots to the left of

the 3. lists "Input material logged on" and "Produced output batches":

EAT-AIP_82.docx

Version: 1.1.23049

Page 90 of 160

Advanced Configurations: MES Terminal AIP

As  described,  the  file  a_data_mnr.xml  defines  the  upper  area  on  the  right  hand  side  to  display

data for the workplace.

The buttons on the left side are located in the layout l_mat.xml.

10.4.1  Overview XML files

Icon

view:

EAT-AIP_82.docx

Version: 1.1.23049

Page 91 of 160

Main

view:

Advanced Configurations: MES Terminal AIP

Workplace

layout:

EAT-AIP_82.docx

Version: 1.1.23049

Page 92 of 160

Operation

layout:

Advanced Configurations: MES Terminal AIP

10.4.2  Layouts depending on the worplace type

You can  override the layouts requested  in the main view depending on the  batch management and the

workplace  type.  Both  settings  are  stored  in  the  dialog  Workplace  and  resource  configuration  in  the  tab

Workplace  configuration  and  consist  of  one  letter.  If  you  copy  a  layout  and  both  letters  are  written  as

lower case letters, are separated by an underscore ("_") and added to the file  name, then this layout is

used for all workplaces including batch management and used with the relevant workplace type.

For  example,  buttons  should  be  made  available  with  other  dynamic  dialogs  for  order  postings  at  a

packing  station  (letter  "C")  without  batch  management  (letter  "N").  To  do  so,  copy  the  layout  l_anr.xml

onto the file name l_anr_nc.xml. You can then modify the buttons for the packing station in this layout.

10.4.3  Taking over changes in the layout configuration

Using the attribute „ActionOnLostFocus“, you can make the following settings per layout:

EAT-AIP_82.docx

Version: 1.1.23049

Page 93 of 160

Advanced Configurations: MES Terminal AIP

laFree

Using this setting, the displayed layout is discarded on changing to another layout and loaded anew

from the XML files on the next start of this layout. Changes in the configuration of this layout, which

were made in the meantime, are taken over.

laHide

With  this  setting,  the  layout  is  not  discarded,  but  stays  in  the  background  when  you  change  to

another  layout. Changes of the layout configuration,  that  were saved after the first layout display,

do not have an effect as the layout is not loaded anew from the XML files.

The  setting  laHide  is  applied  by  default  in  the  layout  of  the  main  view  (l_main.xml)  to  keep  the  scroll

position in the lists on the right hand side when you return to this layout from another layout.

When  you  change  the  language  during  runtime  using  the  flag  in  the  status  bar,  the  currently

displayed layout is loaded. Changes of the layout in the main view are then taken over.

10.5  Configuration of lists

The configuration of lists is explained using the list of the logged on operations in the layout l_main.xml:

EAT-AIP_82.docx

Version: 1.1.23049

Page 94 of 160

Advanced Configurations: MES Terminal AIP

Lists of operations have their own panel in order to keep their position if operations of aggregates (a line

is separated) are hidden.

The class TfrmLayoutGrid is responsible for the list display.

The settings below PnlHeader specify if and how a heading is displayed above a list.

The settings below PnlAdd define the button to create a new entry. In the above example, it's the button

containing a "+"-symbol .

In the Grid area the data source (DataProvider) is set for the list. LayoutFile specifies which file defines

the  display  of  an  element  in  the  list.  Below  OnCellClicked  you  control  what  happens  if  you  click  an

element in the list.

10.5.1  Filtering the displayed elements in the user interface (as

of version 8.2.1.1)

The displayed lists can be filtered in the user interface. A text field must be included in the header of the

list of type TFrmLayoutGrid.

The search syntax is equal to the search syntax of the lists in the dynamic dialogs.

A search field is integrate to a list of the type TFrmLayoutGrid eingebunden:

EAT-AIP_82.docx

Version: 1.1.23049

Page 95 of 160

Advanced Configurations: MES Terminal AIP

<element class="TfrmLayoutGrid">

<SearchPanel>

<Settings>

<EnableSearch>true</EnableSearch>
<SearchType></SearchType>
<ExecuteEvent>return</ExecuteEvent>
<SearchFields>ANR|AGNR</SearchFields>
<SearchControlWidth>50</SearchControlWidth>

</Settings>

</SearchPanel>
<SearchPanelPosition>header</SearchPanelPosition>

…
</element>

Details on the properties

Properties

Description

Settings.EnableSearch

Display search panel

Settings.SearchType

Currently,  only  text  is  possible.  Describes  the

visual search component.

Settings.ExecuteEvent

Event

that  should

trigger

the  search.  The

following

configurations

are

possible:

1.

KeyDown

The  search

is  performed

immediately  on

pressing  the  key.  Compared  to  the  following

configurations,  the  above  configuration  costs  a

lot of time and shoud only be used for small data

quantities.

2.

Button

The  search

is  performed  by  clicking  an

additionally displayed button.

3.

Return

(Extension

of

"Button")

The  search  can  also  be  performed  by  pressing

the return key.

Settings.SearchFields

Fields in the data source where you want to find

the text you entered.

EAT-AIP_82.docx

Version: 1.1.23049

Page 96 of 160

Advanced Configurations: MES Terminal AIP

Settings.SearchControlWidth

Width of the input text box

TfrmLayoutGrid.SearchPanelPosition

Search panel position

row:

A row above the cells

header:

In the header of the TFrmLayoutGrids

If  the  search  line  is  displayed,  the  list  of  type  TFrmLayoutGrid  requires  more  space  in  height.

This  space  is  at  the  expense  of  the  tiles  showing  the  data  in  the  view.  It  is  therefore

recommended  that  you  also  change  the  height  of  the  tiles  with  your  data  when  using  this

functionality.

10.6  Request dynamic dialogs

You  can  store  an  action  in  the  individual  fields  and  elements  in  order  to  perhaps  request  a  dynamic

dialog.  In case of a button which is included on the left hand side in many layouts, you can enable this by

using the entry OnClick:

This example shows the button "Change status" in the layout l_mnr.xml.

The entry Identifier defines the dynamic dialog to be requested. Both other entries are constant.

EAT-AIP_82.docx

Version: 1.1.23049

Page 97 of 160

Advanced Configurations: MES Terminal AIP

In  a  list  of  the  class  TfrmLayoutGrid  containing  several  objects,  the  entry  is  called  OnCellClicked  and

affects the elements below:

This example shows the request "MES Batch information" when selecting the input material in the layout

l_main.xml.

10.6.1  Return after a dynamic dialog

After  the  execution  of  a  dynamic  dialog,  you  return  to  the  layout  where  the  dialog  has  been  requested

from.  Alternatively, you can leave this layout and return to the previous layout which is normally the main

view. Once an operation is logged off, it makes more sense to return to the main view than still displaying

the data of a logged off operation.

EAT-AIP_82.docx

Version: 1.1.23049

Page 98 of 160

Advanced Configurations: MES Terminal AIP

A script request is stored in the setting Identifier. Depending on the workplace settings, the script request

controls  which  dynamic  dialog  is  requested.  The  first  parameter  specifies  the  script  to  be  run  and  the

second parameter the default value which is used if the script does not exist.

You  then  return  to  the  previous  view  no  matter  if  the  dialog  was  completed  or  not,  if  errors

occurred or if the dialog was interrupted without a change.

10.7  Positioning

The  individual  elements  in  the  layout  are  arranged  in  a  tree  structure.  The  positioning  of  a  subordinate

item is always done in relation to the superior one (folder).

If  a  field  shows  a  description  and  a  corresponding  value,  the  position  of  the  description  and  the  value

refers to the top left corner of the field.

There  are  two  ways  to  specify  the  position  of  the  information.  They  are  described  in  the  following

chapters.

10.7.1  Fixed positioning

Here, the position and the size of an element is specified with the following properties:

Top

Left

Distance from the top

Distance from the left

Height

Height of the element

Width

Width of the element

Properties can be found below the entry control.

EAT-AIP_82.docx

Version: 1.1.23049

Page 99 of 160

The following example shows a logged on person for a_data_pnr.xml:

Advanced Configurations: MES Terminal AIP

The  property  Alignment  also  specifies  if  the  element  is  positioned  towards  the  left  (taLeftJustify),  or  the

right  (taRightJustify)  or  towards  the  center  (taCenter).  If  no  other  property  is  explicitly  set,  the  standard

setting  is  left-aligned.  The  following  example  shows  a  position  towards  the  right  of  the  label  Group  of

workplace data (a_data_mnr.xml):

10.7.2  Dynamic positioning:

If the positioning is done dynamically then the elements adapt their position and size to the one's above

or next to it.  The property Align can set the following:

Align=alTop / Align=alBottom

This element takes over the upper or lower limit and the width of the superior element. The property

Height specifies the height.

EAT-AIP_82.docx

Version: 1.1.23049

Page 100 of 160

Advanced Configurations: MES Terminal AIP

Align=alLeft / Align=alRight

This element takes over the right or left limit and the height of the superior element. The property

Width specifies the width.

Align=alClient

Aligns itself to the complete space of the superior element.

The  following  example  defines  the  area  for  the  color  display  of  the  maintenance  status  in  the  list  of

resources (a_list_res.xml):

If neighboring elements have the same entry in the property Align, then they are displayed below or next

to each other. This functionality is used in the button bars to request individual functions and ensures that

there are no gaps if a function is hidden:

10.7.3  Positioning of workplaces in the icon view

Positioning of individual workplaces in the icon view can be changed during runtime.  You can start the

design mode (password protected "mos6050") by double click the AIP icon in the top left corner. You can

then  position  the  workplaces  by  Drag&Drop.  Double  click  the  AIP  icon  to  finish  the  design  mode.  The

positioning of the workplaces is stored in the file gui\p_view_mnr.xml.

EAT-AIP_82.docx

Version: 1.1.23049

Page 101 of 160

Advanced Configurations: MES Terminal AIP

To reset the positioning, please delete the file gui\p_view_mnr.xml.

10.8  Text formatting

Text formatting in the GUI is performed using the entries below the field Font:

You can make the following settings:

Size

Set the font size

Color

Set the font color in reversed RGB notation

If  the  attribute  Define  is  applied,  the  value  entered  in  the  field    #text  is  not  used.  Instead  the

content of the entered constant is used (with both settings).

EAT-AIP_82.docx

Version: 1.1.23049

Page 102 of 160

Advanced Configurations: MES Terminal AIP

10.9  Formatting functions

You can display data with the aid of different formatting functions:

FormatDate

This function sets a date depending on the date format date (short) set in the operating system:

There  is  an  example  located  in  the  workplace  data  (a_data_mnr.xml)  for  the  start  date  of  the

current status

FormatTime / FormatTimeLong

The  function  FormatTime    sets  the  time  depending  on  the  time  format  Time  (short)  set  in  the

operating system:

FormatTimeLong uses the format Time (long).

FormatDuration / …

There are various functions to display durations in different output formats.

Function

Format

FormatDuration

Hours:Minutes

FormatDurationMMSS

Minutes:Seconds

EAT-AIP_82.docx

Version: 1.1.23049

Page 103 of 160

Advanced Configurations: MES Terminal AIP

FormatDurationHHMMSS

Hours:Minutes:Seconds

FormatDurationHHII

Hours,decimal hours (Industrial minutes)

FormatDurationHHIII

Hours, decimal hours (3 decimal places)

FormatDurationMMII

Minutes,decimal minutes

You can find an example for the output of a duration in workplace data(a_data_mnr.xml). It states

the duration of the current status :

10.10 Multilingualism

AIP2 uses just like the AIP the Multilizer to translate text into another language.  Language keys with the

prefix "Ik" are used for the new GUI.  German texts without the prefix "Ik" are also processed if they are

included in the mld file.

Text  for  translation  can  be  added  using  the  function  "Translate"  and  the  entry  "LanguageKey"  (in

accordance with the language set).

This example contains a German text "Arbeitsgang" (operation) which does not affect the processing. The

text is replaced by the translated text using the language key during runtime.

10.11 Examples / exercises

This chapter shows customization options of the layout using examples.

EAT-AIP_82.docx

Version: 1.1.23049

Page 104 of 160

Advanced Configurations: MES Terminal AIP

10.11.1  Change existing fields

Replace the field "group" with "cost center" in the displayed workplace data.

You  need  to  change  the  entries  for  "label  group"  and  "MGRP"  (machine  group)  in  the  parameter

a_data_mnr.xml as follows:

Entries with the description "#comment" are comments which do not affect processing.

EAT-AIP_82.docx

Version: 1.1.23049

Page 105 of 160

Advanced Configurations: MES Terminal AIP

The  first  element  in  the  red  frame  shows  the  description  above  the  data.    The  language  key

IkWorkplaceGroup is replaced by IKCostCenter. You can directly insert the text in the field "#text" if there

is  no  language  key  available  for  the  description.  Both  entries  "Function"  and  "LanguageKey"  must  be

deleted in this case.

The  description  is  displayed  towards  the  right  hand  side  at  position  180  ("Left":  180;  "Alignment":

taRightJustify).

The second element is responsible for the display of the data field.  Change the entry "DataFieldName"

from MGRP to KST.

10.11.2  Add a new field

Display the duration booked on RPA 12 to the right of the status display.

This is done by copying the element with the comment Workplace.  This element specifies the light gray

space and includes 2 other elements including name and data.

EAT-AIP_82.docx

Version: 1.1.23049

Page 106 of 160

Advanced Configurations: MES Terminal AIP

The comment located above is also copied and changed on BMK12.

The  position  of  the  light  gray  area  ("left")  is  made  up  of  position  ("left")  and  the  width  of  the  element

Workplace Status plus a distance of 5 dots (345 + 190 + 5= 540). Both fields are located below the entry

"Control".

The  elements  Label  BMK12  and  AGR:BMK12  are  located  on  the  light  gray  area.    The  position  of  both

elements ("Top" and "Left") refer to the top left corner of the light gray space.

The entry "Caption" specifies the displayed text. Here, language keys have not been used so the text is

not translated.

The entry DataFieldName below the comment AGR:BMK12 was changed to the field name AGR:BMK12.

The formatting function FormatDurationHHMMSS shows the duration in hours:minutes:seconds.

EAT-AIP_82.docx

Version: 1.1.23049

Page 107 of 160

Advanced Configurations: MES Terminal AIP

10.11.3  Add user fields

Add a user field to the interface by adding a new field as described in the previous chapter. Use the the

acronym of the user field (e.g. ANR_FU_65).

If  you  want  to  format  user  fields  for  dates,  times,  or  durations,  you  can  use  the  formatting

functions. See section "10.9 Formatting functions".

Load user field with cataiplay.ini

Note  that  the  AIP  lists  that  serve  as  data  providers  do  not  contain  user  fields  in  the  standard

system.  In  order  for  the  user  fields  to  be  added  to  the  list,  you  must  configure  it  in  the

ctaiplay.ini  file.  As  long  as  the  user  fields  in  the  ctaiplay.ini  file  are  not  configured  correctly,

they remain empty on the user interface.

In the customer-specific terminal directory (e.g. if user fields are to be added at terminal group level:

\mip\<systemnr>\custom\aip2\tgrp_xxx\) a ctaiplay.ini is created, which contains the different section.

  Activate the additional loading of the user fields for operation- or order-related XML files in the

section [ Custom Userfields ANR ].

  Activate the additional loading of user fields for machine-related XML files in the [ Custom

Userfields MNR ] section.

You can find examples on how to do it further along.

The activated fields are then available in all XML files connected to the DataProvider ANR or MNR.

Available user field in machine and order lists

All identifiers of user fields and also other fields that can be reloaded are located in the headers.dat file in

the "spool" directory of the terminal. It consists of four lines:

Start of the row  Content

10|…

*10|…

11|…

*11|…

Machine list: Fields that are always included in the list.

Machine list: Fields that can be reloaded.

Order list: Fields that are always included in the list.

Order list: Fields that can be reloaded.

The following user fields can be reloaded:

Machine list

FU:1 to FU:66

Machine user fields

EAT-AIP_82.docx

Version: 1.1.23049

Page 108 of 160

Advanced Configurations: MES Terminal AIP

Order list

ANR_FU_1 to ANR_FU_66

Operation user fields

AUNR_FU_1 to AUNR_FU_66

Order user fields

MNR_FU_1 up to MNR_FU_66

Machine user fields

VERARBCODE_FU_1 up to VERARBCODE_FU_66

Processing code user fields

AGR_FU_1 to AGR_FU_66

User  fields  of  the  operation  status  (cannot  be  used  in  the  standard  system,  reserved  for

Customizing!)

Example 1: User fields in the operation list

  User field 1 of the operation should be entered in the order list with the name " Order date ".
  User field 66 of the machine with the name "My long user field" should be added to the order list.

Field definition in section [ Custom user fields ANR ]

[ Custom usernfields ANR ]

GRID_LIST_TYP=ANR

; additional fields of the order list

ANR_FU_1= ; User field 1 of operation, MyDate FU:1 [operations list]

MNR_FU_66= ; User field 66 of machine, My long user field [operations list]

Example 2: User field in the machine list

User field 66 of the machine with the name "My long user field" should be added to the machine list.

Field definition in the section [ Custom user fields MNR ]

[ Custom userbfields MNR ]

GRID_LIST_TYP=MNR

; Additional fields in the machine list

FU:66= ; User field 66 of machine, My long user field [machine list]

10.11.4  Remove button

Delete the button Change target quantity from the operation layout (l_anr.xml).

EAT-AIP_82.docx

Version: 1.1.23049

Page 109 of 160

Advanced Configurations: MES Terminal AIP

The  new  entry  Visible=False  hides  the  button.  Optionally,  you  can  also  delete  the  comment  and  the

element.

10.11.5  Add button

You  want  to  add  a  new  button  "Weighing"  in  the  layout  for  "input  material",  "output  batch"  and

(l_mat.xml).

First of all, copy an existing button including the corresponding comment.  In this case the button "Batch

information"  was  copied.    Change  the  comment  in  order  to  easily  find  the  new  button  in  the  list  of

elements.

The  entry  "Caption"  specifies  the  displayed  text.  In  the  example,  the  English  text  "Weigh"  is  used  as

language key.

The "Identifier" specifies which dynamic dialog is requested.

EAT-AIP_82.docx

Version: 1.1.23049

Page 110 of 160

Advanced Configurations: MES Terminal AIP

10.11.6  Integration of a picture

The task is to have a logo displayed in the main view (l_main.xml) below the button "PZE".

Copy the button "PZE" and the comment. Change the comment.

As the button has no labeling, delete the entry "Caption". Also delete the entries "Visible" and "OnClick".

You  need  a  new  element  of  the  class  "TsImage“  in  order  to  display  the  new  picture.  This  element  was

copied  from  the  staff  list  (a_list_pnr.xml)  and  has  the  class  "TGridItemImage",  as  it  is  not  located  on  a

button but in a list. Change the class to "TsImage" after copying. Delete the entry "Visible".

EAT-AIP_82.docx

Version: 1.1.23049

Page 111 of 160

Advanced Configurations: MES Terminal AIP

The file name of the picture is entered in the field "Identifier" of the entry "Picture“. There are two options

to load the picture:

-  LoadPictureFromFile reads the file from the spool directory.

-  LoadPictureFromAIP  uses  pictures  included  in  the  AIP2  in  the  file  "pict.zip"  or  "pict_cust.zip".

This  information  is  more  efficient  as  these  picture  are  stored  in  a  buffer.    This  method  only

supports images of type PNG and BMP.

Different settings are available to display the picture.

- -  Transparent – For example, PNG files support  transparent areas  where the background of the

picture is visible. Functionality can be switched off using the value False.

- -  Stretch specifies if the picture is shown in its original size (value False) or if Height and Width are

adjusted (value True).

- -  Proportional controls whether the ratio of the width of the image and the height of the image is

maintained  (value  True)  or  not  (value  False)  when  the  image  size  is  adjusted  to  the  specified

Height and Width.

10.11.7  Change quantity format

Generally show the quantity format with 2 decimal places.

The quantity format is configured in the file globaldefines.xml using the constant FORMAT_QUANTITY:

The value "%0.2f" ensures that quantities are displayed with 2 decimal places.

You  can  find  an  example  for  this  constant  (Define)  when  yield  is  displayed  for  data  of  the  workplace

(a_data_mnr.xml):

EAT-AIP_82.docx

Version: 1.1.23049

Page 112 of 160

Advanced Configurations: MES Terminal AIP

The set format only affects configured layouts and not dynamic dialogs.

10.11.8  Postings for operations not logged on

The workplace configuration in the MOC has a button called "Posting of operations not logged on". If this

button is activated, you can interrupt or log off the operations not logged on (posting to the server).  You

have to extend the configuration if you would like to carry out these postings in the AIP2.

EAT-AIP_82.docx

Version: 1.1.23049

Page 113 of 160

Advanced Configurations: MES Terminal AIP

The operation layout only  opens in the AIP by using the buttons  Interrupt and Logg off  if you select the

logged operation.  If the following extension in the file l_main.xml is carried out, this layout also opens if

you click the empty space in the list of operations.

The  dynamic  dialogs  must  also  be  customized  in  order  to  interrupt  and  logg  off  operations.  Unless  so-

called simple dialogs are used.

EAT-AIP_82.docx

Version: 1.1.23049

Page 114 of 160

Advanced Configurations: MES Terminal AIP

10.12 Index

#comment ................................................................................................................................................... 31
#text ................................................................................................................................................ 10, 28, 32
ActionOnLostFocus .................................................................................................................................... 19
alBottom...................................................................................................................................................... 26
alClient ........................................................................................................................................................ 26
Align ............................................................................................................................................................ 26
Alignment .................................................................................................................................................... 26
alLeft ........................................................................................................................................................... 26
alRight ......................................................................................................................................................... 26
alTop ........................................................................................................................................................... 26
Caption ................................................................................................................................................. 33, 35
Color ........................................................................................................................................................... 28
control ......................................................................................................................................................... 25
DataFieldName ..................................................................................................................................... 32, 33
DataProvider ............................................................................................................................................... 21
Define ................................................................................................................................................... 28, 37
Defines...........................................................................................................................................................5
Extention ..................................................................................................................................................... 10
Font ............................................................................................................................................................. 28
FormatDate ................................................................................................................................................. 29
FormatDuration ........................................................................................................................................... 29
FormatDurationHHII ................................................................................................................................... 30
FormatDurationHHIII .................................................................................................................................. 30
FormatDurationHHMMSS ..................................................................................................................... 30, 34
FormatDurationMMII ................................................................................................................................... 30
FormatDurationMMSS ................................................................................................................................ 30
FormatTime ................................................................................................................................................ 29
FormatTimeLong ........................................................................................................................................ 29
Function ...................................................................................................................................................... 32
Grid ............................................................................................................................................................. 21
Height ................................................................................................................................................... 25, 26
Identifier .................................................................................................................................... 23, 24, 35, 36
laFree .......................................................................................................................................................... 19
laHide .......................................................................................................................................................... 19
LanguageKey ....................................................................................................................................... 30, 32
LayoutFile ................................................................................................................................................... 21
Left .............................................................................................................................................................. 25
LoadPictureFromAIP .................................................................................................................................. 37
LoadPictureFromFile .................................................................................................................................. 36
OnCellClicked ....................................................................................................................................... 21, 23
OnClick ....................................................................................................................................................... 23
PnlAdd ........................................................................................................................................................ 21
PnlHeader ................................................................................................................................................... 20
Proportional ................................................................................................................................................ 37
ScriptName ................................................................................................................................................. 10
Size ............................................................................................................................................................. 28
Stretch ........................................................................................................................................................ 37
taCenter ...................................................................................................................................................... 26
taLeftJustify ................................................................................................................................................ 26
taRightJustify ........................................................................................................................................ 26, 32
TfrmLayoutGrid ..................................................................................................................................... 20, 23
TGridItemImage .......................................................................................................................................... 36
Top .............................................................................................................................................................. 25
Translate ..................................................................................................................................................... 30
Transparent ................................................................................................................................................ 37
TsImage ...................................................................................................................................................... 36

EAT-AIP_82.docx

Version: 1.1.23049

Page 115 of 160

Visible ......................................................................................................................................................... 34
Width ..................................................................................................................................................... 25, 26

Advanced Configurations: MES Terminal AIP

EAT-AIP_82.docx

Version: 1.1.23049

Page 116 of 160

Advanced Configurations: MES Terminal AIP

11  AIP2 - Local Configuration File keyboard.ini

You  configure  the  virtual  keyboard  of  the  AIP2  terminal  in  the  keyboard.ini  file  in  the  directory

c:\mpdv\aip2 for the specific terminal.

To activate the changes in the configuration file, you must restart the terminal software.

Logic enabling the virtual keyboard:

The AIP2 terminal shows the keyboard if an input field is focused. The keyboard is placed with reference

to the field as described below:

Logic for placing the virtual keyboard:

It is tried to place the keyboard directly below the input field. If there is not enough space to the bottom of

the screen, it is tried to place the keyboard directly above the input field. If the space above the control

element is not sufficient for the keyboard, the keyboard is placed at the bottom of the screen.

These are the priorities for horizontal alignment:

-

-

-

to the right of the control

to the left of the control

to the edge of the screen that is further away from the control

If the “VirtScreenSize“ option is enabled, the virtual keyboard is not aligned on the virtual screen but still

on the real screen. Consequently, the keyboard may also reach beyond the terminal program.

The virtual keyboard can be configured in the local keyboard.ini file on the terminal. Example:

[Keyboard]

HideTime=10

ScaleMultiplier=0.9

FixNumbers=ON

Configuration=ON

;Logging=ALL

;Processes=ctaip.exe

;ClassesForLetters=TVtEdit

;ClassesForNumbers=TMPDVSimpleNumericField

HideTime

The set value specifies for how many seconds the keyboard is invisible if you click on the key showing the

icon

 on the left hand side. This key is not visible if the value "0" is entered.

EAT-AIP_82.docx

Version: 1.1.23049

Page 117 of 160

Advanced Configurations: MES Terminal AIP

ScaleMultiplier

The keyboard size can be reduced and increased. The value range is between 0.9 and 4.0. A dot is used

as decimal separator.

The default value is 1.0.

FixNumbers

Allowed values: ON|OFF

If  FixNumbers=On  is  set,  the  number  keys  located  in  the  top  row  of  the  virtual  keyboard  remain  visible

even if the Shift key or CapsLock key is pressed. ON is set by default.

Configuration

Allowed values: ON|OFF

The  keyboard  layout,  which  is  installed  and  activated  in  the  Windows  language  settings,  specifies  the

layout  of  the  virtual  keyboard.  You  can  activate  different  keyboards  in  the  operating  system.  For  the

virtual keyboard, you can then switch between the different activated keyboards.

The entry Configuration=ON activates the button

. Use this button to open the dialog to select one of

the keyboards activated in the operating system.

Default is OFF.

Logging

Allowed values: OFF|ON|ALL

Logging can be enabled using this entry. The advanced logging is configured by setting ALL.

OFF is set by default.

Processes

The  entry  "Processes"  specifies  for  which  additional  processes  the  virtual  keyboard  will  be  used.  The

separate entries are separated by comma (e.g. processes=notepad.exe.explorer.exe).  If this entry is not

included, the keyboard for these processes is available in ctaip.exe und iniedit.exe.

EAT-AIP_82.docx

Version: 1.1.23049

Page 118 of 160

Advanced Configurations: MES Terminal AIP

ClassesForLetters

This  entry  defines  for  which  additional  classes  the  alpha-numeric  keyboard  should  be  displayed.  The

current classes for AIP2 (TMPDVSimpleField, TsEdit, TsMemo, TMPDVTypEdit, TMPDVSimpleEditField,

TMPDVPictureField,TEdit,  TButtonedEdit,  TEditControl)  are  fixed  in  the  source  code.  This  entry  can  be

used to extend the list.

ClassesForNumbers

This  entry  defines  for  which  additional  classes  the  numeric  keyboard  should  be  displayed.  The  current

classes  applicable  for  the  AIP2  (TMPDVNumericField,  TPagerNumField,  TMPDVSimpleNumericField,

TVTEdit) are fixed in the source code. This entry can be used to extend the list.

The classes that are fixed in the source code cannot be overridden using a different entry in the

configuration file. If you want to display the other keyboard for a field, you can change the input

type of the field in Dialog Configuration.

Dialog-specific configuration

There is the option from version 1.6.0.0 of the keyboard.exe to configure the location of the virtual

keyboard per dynamic dialog.  The user has to extend the configuration file keyboard.ini accordingly.

Sample configuration:

[WF_AA_QUA]

=> Name of the dynamic dialogs

X-Position=50

=> Distance in pixels from the left edge of the screen

Y-Position=50

=> Distance in pixels from the top edge of the screen

-  Specifying the X- and Y-position is mandatory.

-  The configuration is only available for dynamic dialogs that are configured on the MOC.

The virtual keyboard can also be switched off if the terminal is connected to a real keyboard. This can be

configured in section [SYSTEM] of the local ctaip.ini file.

Example:

[SYSTEM]

Parameters=-t

Syntax:

+t/-t --> enables/disables the virtual keyboard; irrespective of the terminal type

EAT-AIP_82.docx

Version: 1.1.23049

Page 119 of 160

Advanced Configurations: MES Terminal AIP

12  Extended Application Configuration

12.1  Overview of INI configuration files

INI file

Configurations

ctaip.ini

Host name, terminal number, virtual keyboard on/off, inputs/outputs

ctaip.mld

Translation of labels

ctaipbut.ini

Configuration of buttons: order, positioning, icons, if necessary licenses

ctaiplay.ini

Configuration of grid layout; basic screen: height of tables and buttons; layout

of BDE comments; OP info, machine info

dialog.ini

Configuration of font type/size in dialogs and of tab sizes in workflow dialogs

keyboard.ini

Configuration of the virtual keyboard: size and behavior

12.2  General

12.2.1

Identification of lists / elements in the terminal

The following shortcut activates information about available lists or elements in the terminal:

CTRL + ALT + F6

or in

AIP DEBUG menu: Further debug functions  Activate hints (scroll down)

A tooltip is shown when hovering the mouse pointer over a table or element.

The value "table" identifies the list:

EAT-AIP_82.docx

Version: 1.1.23049

Page 120 of 160

Advanced Configurations: MES Terminal AIP

12.3  Modifications to ctaipbut.ini

12.3.1  General

The complete standard INI files are located on the server directory \mip\ctnet\win\aip2

Any deviations are developed in specific, customized directories.

e.g. for customized terminal groups \mip\<SystemNo>\custom\aip2\tgrp_xxx

(xxx = number of terminal group)

An  empty  file  (ctaipbut.ini)  is  generated  in  these  directories.  All  customized  sections  e.g.  [ANR-ALL-

Page1] are copied to this file. Then the configuration is performed in this file.

After  restarting  the  terminal,  files  from  the  main  directory  \mip\ctnet\win\aip2  are  merged  with  files  from

customized directories (e.g. \mip\<SystemNo>\custom\aip2\tgrp_xxx). The merged file is then transferred

to the local terminal directory C:\MPDV\AIP2.

The  directory  \mip\ctnet\win\aip2  must  not  be  changed,  otherwise  AIP2  might  no  longer  work

properly.  In  addition,  default  files  are  stored  there  and  any  changes  made  will  be  lost  after

updating (e.g. service pack)!

12.3.2  Modifications to the toolbar

A ctaipbut.ini file including the modified section is stored in the customized terminal directory (e.g. if the

toolbar is changed for terminal groups: \mip\<SystemNo>\custom\aip2\tgrp_xxx\).

Example:

EAT-AIP_82.docx

Version: 1.1.23049

Page 121 of 160

Advanced Configurations: MES Terminal AIP

The order of buttons should be changed in the "machines" section of the AIP2 basic screen (position

button "change status" first and then the "lock production status" button).

Initial configuration

[MNR-ALL-Page1]

1=M_INFO,L,,InfoRed.png

; switch basic screen from list view to single machine view:

2=VIEW,L,,VirtualTourSmall.png

3=P_SPERRE,L,Produktionsstatus sperren,Security Risk.png

4=M_MST,L,Status ändern,Status Flag Yellow.png

5=A_AN*,R,Arbeitsgang anmelden,SyBluPly.png

New configuration

[MNR-ALL-Page1]

1=M_INFO,L,,InfoRed.png

; switch basic screen from list view to single machine view:

2=VIEW,L,,VirtualTourSmall.png

3=M_MST,L,Status ändern,Status Flag Yellow.png

4=P_SPERRE,L,Produktionsstatus sperren,Security Risk.png
5=A_AN*,R,Arbeitsgang anmelden,SyBluPly.png

12.3.3  Modifications to button labeling

A ctaipbut.ini file including the modified section is stored in the customized terminal directory (e.g. if the

toolbar is changed for terminal groups: \mip\<SystemNo>\custom\aip2\tgrp_xxx\).

The required sections can just be inserted if a customized ctaipbut.ini file already exists, e.g. due to

changes to the order of buttons.

Example:

Labeling of buttons in the "operation" section should be changed as follows:







"Partial confirmation" --> "Part. conf."

"Interrupt operation" --> "Interrupt OP"

"Log off operation" --> "Log off OP"

Initial configuration

[ANR-ALL-Page1]

1=A_INFO,L,,InfoBlue.png

2=A_TR,R,Teilrückmeldung,SyBluAdd.png

3=A_UN*,R,Arbeitsgang unterbrechen,SyBluPau.png

4=A_AB*,R,Arbeitsgang abmelden,SyBluStp.png

New configuration

EAT-AIP_82.docx

Version: 1.1.23049

Page 122 of 160

Advanced Configurations: MES Terminal AIP

[ANR-ALL-Page1]

1=A_INFO,L,,InfoBlue.png

2=A_UN*,R,AG unterbrechen,SyBluPau.png

3=A_TR,R,Teilrück.,SyBluAdd.png

4=A_AB*,R,AG abmelden,SyBluStp.png

12.3.4  Modifications to icons

 General

Generate the file pict_cust.zip in the customer specific directory \mip\<SystemNo>\custom\.

Enter customer-specific icons (e.g. custom tools.png) to the file pict_cust.zip.

Note:

The file pic.zip contains all icons used at the terminal.

The file name for the button icon can be changed in the customized section of ctaipbut.ini.

Example:

Changing the icon for the button "Log on operation" from SyBluPly.png to Custom Tools.png.

Initial configuration

[MNR-ALL-Page1]

1=M_INFO,L,,InfoRed.png

; switch basic screen from list view to single machine view:

2=VIEW,L,,VirtualTourSmall.png

3=P_SPERRE,L,Produktionsstatus sperren,Security Risk.png

4=M_MST,L,Status ändern,Status Flag Yellow.png

5=A_AN*,R,Arbeitsgang anmelden,SyBluPly.png

New configuration

[MNR-ALL-Page1]

1=M_INFO,L,,InfoRed.png

; Switch basic display between list display and single machine display:

2=VIEW,L,,VirtualTourSmall.png3=P_SPERRE,L,Lock production status,Security Risk.png

4=M_MST,L,Change status,Status Flag Yellow.png

5=A_AN*,R,Logon operation,Custom Tools.png

EAT-AIP_82.docx

Version: 1.1.23049

Page 123 of 160

Advanced Configurations: MES Terminal AIP

12.4  Modifications to ctaiplay.ini

12.4.1  General

The complete standard INI files are located on the server directory \mip\ctnet\win\aip2

Any deviations are developed in specific, customized directories.

e.g. for customized terminal groups \mip\<SystemNo>\custom\aip2\tgrp_xxx

(xxx = number of terminal group)

An  empty  file  (ctaiplay.ini)  is  generated  in  these  directories.  All  customized  sections  e.g.  [ANR-ALL-

Page1] are copied to this file. Then the configuration is performed in this file.

After  restarting  the  terminal,  files  from  the  main  directory  \mip\ctnet\win\aip2  are  merged  with  files  from

customized directories (e.g. \mip\<SystemNo>\custom\aip2\tgrp_xxx). The merged file is then transferred

to the local terminal directory C:\MPDV\AIP2.

The  directory  \mip\ctnet\win\aip2  must  not  be  changed,  otherwise  AIP2  might  no  longer  work

properly.  In  addition,  default  files  are  stored  there  and  any  changes  made  will  be  lost  after

updating (e.g. service pack)!

12.4.2  Enter user fields in a table

Overview

A ctaiplay.ini file including the modified section is stored in the customized terminal directory (e.g. if the

toolbar is changed for terminal groups: \mip\<SystemNo>\custom\aip2\tgrp_xxx\).

ctaiplay.ini is configured in two steps:

  Activate the additional loading of the user fields for operation- or order-related XML files in the

section [ Custom Userfields ANR ]. Activate the user fields for machines in the [ Custom

Userfields MNR ] section.

  Configure the field to be displayed in the grid in the section (e.g. to display the additional field in

the order list), e.g. [Order list].

Below both steps are explained in detail.

EAT-AIP_82.docx

Version: 1.1.23049

Page 124 of 160

Advanced Configurations: MES Terminal AIP

If the user field is only to be displayed in the GUI with XML  configuration, the configuration for

display in the grid in the [Order List] or [Machine List] can be omitted.

Available user field in machine and order lists

All identifiers of user fields and also other fields that can be reloaded are located in the headers.dat file in

the "spool" directory of the terminal. It consists of four lines:

Start of the row  Content

10|…

*10|…

11|…

*11|…

Machine list: Fields that are always included in the list.

Machine list: Fields that can be reloaded.

Order list: Fields that are always included.

Order list: Fields that can be reloaded.

The following user fields can be reloaded:

  Machine list:

o  FU:1 to FU:66:

Machine user field

  Order list:

o  ANR_FU_1 to ANR_FU_66:

Operation user fields

o  AUNR_FU_1 to AUNR_FU_66:

Order user fields

o  MNR_FU_1 to MNR_FU_66:

Machine user fields

o  VERARBCODE_FU_1 to VERARBCODE_FU_66:

Processing code user fields

o  AGR_FU_1 to AGR_FU_66:

Operation status user fields (reserved for customizations)

Example 1: User fields in the operation list

User field 1 of the operation should be entered in the order list with the name " Order date ".

User field 66 of the machine with the name "My long user field" should be added to the order list.

Step 1  Field definition of the section [ Custom Userfields ANR ]

EAT-AIP_82.docx

Version: 1.1.23049

Page 125 of 160

Advanced Configurations: MES Terminal AIP

[ Custom Userfields ANR ]

GRID_LIST_TYP=ANR

; Additional fields in list of operations

ANR_FU_1= ; User field 1 of operation, MyDate FU:1 [operations list]

MNR_FU_66= ; User field 66 of machine, My long user field [operations list]

Step 2  add the field to the grid [order list]

If the user field is only to be displayed in the GUI with XML configuration, the configuration in

the [Order List] can be omitted.

[Order list]

GRID_FONT=Arial

GRID_FONTSIZE=9

GRID_COLOR=clBlack

GRID_BACKGROUND=clWhite

GRID_LIST_TYP=ANR

EXAMINE_BITMAP1=B1,OPT_INFOAN,T=Attach Notes.png

EXAMINE_BITMAP2=B2,OPT_INFOAI,T=Text Document.png

ATK=C25,100,L,Article

ANR_FU_1=dd.mm.yyyy,90,L,MyDate FU:1

MNR_FU_66=C40,150,L,My long user field of machine

Example 2: User field in the machine list

User field 66 of the machine with the name "My long user field" should be added to the machine list.

Step 1  Field definition of the section [ Custom Userfields MNR ]

[ Custom Userfields MNR ]

GRID_LIST_TYP=MNR

; Additional fields in list of machines

ANR_FU_66= ; User field 66 of machine, My long user field

Step 2  Enter the field for the grid [Machine list]

If the user field is only to be displayed in the GUI with XML configuration, the configuration in

the [Machine List] can be omitted.

[Machine list]

GRID_FONT=Arial

GRID_FONTSIZE=9

GRID_COLOR=clBlack

GRID_BACKGROUND=clWhite

GRID_LIST_TYP=ANR

EXAMINE_BITMAP1=B1,OPT_INFOAN,T=Attach Notes.png

EXAMINE_BITMAP2=B2,OPT_INFOAI,T=Text Document.png

ATK=C25,100,L,Article

FU:66=C40,150,L,My long user field

EAT-AIP_82.docx

Version: 1.1.23049

Page 126 of 160

Advanced Configurations: MES Terminal AIP

Explaination of the syntax using the order list

ANR_FU_1 = user field of of the operation

dd.mm.yyyy = formatted as date

90 = number of pixel for the column

L = aligned to the left

MyDate FU:1 = column header

MNR_FU_66 = user field 66 of the machine

C40 = alphanumeric field with 40 digits

150 = number of pixel for the column

L = left aligned

My long user field = column header

12.4.3  Change order of columns in AIP2

A ctaiplay.ini file including the modified section is stored in the customized terminal directory (e.g. if the

toolbar is changed for terminal groups: \mip\<SystemNo>\custom\aip2\tgrp_xxx\).

The required sections can just be inserted if a customized ctaiplay.ini file already exists, e.g. due to

changes to the order of buttons.

Example:

The "order" column should be displayed in the first place and then the "article" column.

Initial configuration

[Order list]

…

ATK=C25,100,L,Artikel

AUNR=C10,85,L,Auftrag

ANR_FU_65=C30,150,L,Artikelbezeichnung 2
AGNR=C4,39,R," "

New configuration

EAT-AIP_82.docx

Version: 1.1.23049

Page 127 of 160

Advanced Configurations: MES Terminal AIP

list]

[Order

…

AUNR=C10,85,L,Auftrag

ATK=C25,100,L,Artikel

ANR_FU_65=C30,150,L,Artikelbezeichnung2

AGNR=C4,39,R," „

12.4.4  Changing the height of AIP2 lists

Changing the height of lists (operation and machine list) in the basic screen [MainView1] of AIP2.

The configured heights are scaled to the current height. Consequently, the total sum of entered

heights is irrelevant.

The  height  of  lists  and  elements  of  the  basic  screen  (machines,  order  grid,  3rd  list,  toolbar)  can  be

configured in section [MainView1] of the customized ctaiplay.ini file.

EAT-AIP_82.docx

Version: 1.1.23049

Page 128 of 160

Advanced Configurations: MES Terminal AIP

[MainView1]

; Values are scaled to match the current resolution

; in order to use the full screen. Percentage values can also be entered

OrderGridHeight=440

MachineGridHeight=380

;List3GridHeight=200

ButtonBarHeight=50

Explanation: SYNTAX of order list

OrderGridHeight = height of the order list (indicated in pixels)

MachineGridHeight = height of the machine list (indicated in pixels)

List3GridHeight= height of the third list (tools, staff, batches,…) (indicated in pixels)

ButtonBarHeight= height of the toolbar (indicated in pixels)

12.4.5  Changing the filter function in tables

The filter function is activated for many tables.  The filter function  You can configure on which column the

filtering is to take effect.

Requirements:

  The  field  for  filtering  is  activated  for  the  table  in  the  dialog  configuration  (field  attribute

"AUTOFILTERFIELD").

  There  is  an  entry  "AUTOFILTERCOL"  in  the  configuration  file  ctaiplay.ini  which  specifies  the

column to be filtered.

Proceed as follows:

1.  Use the shortcut "Ctrl+Alt+F6" in the AIP2 to activate the tooltip.

2.  Display the required table on the AIP that already has a filter field.

3.  Use the tooltip to identify the affected section in the ctaiplay.ini file by moving the mouse pointer

over the desired table. E.g.„… Cfg: WF@AGNR …“.

4.  Find  the  section  in  the  standard  configuration  file  <server>\mip\ctnet\win\aip2\ctaiplay.ini  and

copy

the

section

to

your

customized

global

file

<server>\mip\<SystemNo>\custom\aip2\ctaiplay.ini  or

to  a

terminal  group  specific

file

<server>\mip\<SystemNo>\custom\aip2\tgrp_<TerminalGrpup>\ctaiplay.ini

EAT-AIP_82.docx

Version: 1.1.23049

Page 129 of 160

Advanced Configurations: MES Terminal AIP

5.  Change  the  value  of  the  existing  AUTOFILTERCOL  property  in  the  copied  customer-specific

section.  You can find information on availale columns in other attributes of the  section or in the

file  headers.dat.    If  the  property  AUTOFILTERCOL  is  not  available,  the  filtering  cannot  be

changed  by  configuration.    If  the  filtering  is  not  activated,  you  first  need  to  check  further

requirements and activate the filtering via a customizing.

The setting AUTOFILTERCOL=<ALL> ensures that the filter value applies to all columns of the

table. Following, a row is displayed if the column contains filter text.

Example<server>\mip\<SystemNo>\custom\aip2\ctaiplay.ini:

;******************************************************************************************
;
; ctaiplay.ini (customer’s)
;
; -----------------------------------------------------------------------------------------

[WF@ANR]
CMD=DLG=LIST;11|MOD=V|MNR=<MNR>|
MODE=CMD:MODE=#LOCKED#|DATALOCKUNTILSHOW=TRUE|ADDCALCULATEDFIELDS=A|FOCUSLISTITEM=ANR=<ANR>|
FILTER=
SECTION=Sequencing List (Auto)
DATAFIELDS=ANR & AGNR & ATK & ATKBEZ & AGBEZ & *CHPFL=CHPFL & ANR.ATK=ATK & ANR.ATKBEZ=ATKBEZ & ANR.AGBEZ=AGBEZ &
ANR.SGR:GUTP=SGR:GUTP & ANR.EGR:GUTP=EGR:GUTP & ANR.EGR:AUSP=EGR:AUSP & ANR.AUNR=AUNR & RMNR=ANR_RMNR & ANR.FERTIG=FERTIG
FILE=vlist.<MNR>.lst
AUTOFILTERCOL=AGNR

;*******************************************************************************************

12.4.6  Cyclic reload of the sequencing list

The sequencing list is cyclically updated on the AIP. The setting of the cycle takes place in ctaipnet.ini

mdereloadvorgabeliste=600

If the sequencing list is to be reloaded each time the operation logon dialog is called, the parameter

CMD:MODE=#LOCKED#| must be removed from the section [WF@ANR] in the MODE entry of the

ctaiplay.ini. If you want to make a custom implementation, you should copy this section into a new

(empty, if not already existing) file ctaiplay.ini and delete the above entry.

12.5  Changes to ctaip.ini

12.5.1  General

The  file  ctaip.ini  is  not  merged  with  a  file  stored  in  the  server.  The  file  must  be  edited  locally  in  the

terminal.

12.5.2  Start Third-Party Application from AIP

Starting a third-party application is configured as follows:

  Configure a button in the ctaipbut.ini file

EAT-AIP_82.docx

Version: 1.1.23049

Page 130 of 160

Advanced Configurations: MES Terminal AIP

  Configuration of the function

AIP allows for the integration of buttons starting third-party applications in all toolbars. These buttons

- start third-party applications provided they are not running

- bring third-party applications to the front when they are running

Configuration of buttons

The first button starting a third-party software is configured as "USER1" in ctaipbut.ini.

Further buttons starting third-party software can be configured as "USER2" to "USER9" in the ctaipbut.ini

file.

Example:

Configuration of a new button. The button is to be displayed for a specific terminal group in the

"machines" section of the AIP2 basic screen. It is configured in the ctaipbut.ini file specific to terminal

groups in the server.

\mip\<SystemNo>\custom\aip2\tgrp_xxx\ctaipbut.ini)

[MNR-ALL-Page1]
1=M_INFO,L,,InfoRed.png
; Switching the basic screen between list view and presentation of individual machines:
2=VIEW,L,,VirtualTourSmall.png
3=P_SPERRE,L,Produktionsstatus sperren,Security Risk.png
4=M_MST,L,Status ändern,Status Flag Yellow.png
5=A_AN*,R,Arbeitsgang anmelden,SyBluPly.png
6=USER1,R,Notepad

Configuration of the function

The function is configured in section [ext. software] of the local terminal configuration file "ctaip.ini":

Example:

[ext. software]
Button=Notepad
WindowName=Notepad
ProgFileName=C:\Program Files (x86)\Notepad++\notepad++.exe
SearchParts=On

Please note:

"SearchParts=“  If this entry is set, it is sufficient to enter the program name only partly in

WindowName.

EAT-AIP_82.docx

Version: 1.1.23049

Page 131 of 160

Advanced Configurations: MES Terminal AIP

12.5.3  Remember staff badge number

The  person  memorized  by  the  terminal  only  changes  if  the  person  logs  on  with  the  order.  (A_P_AN

instead of A_AN)

The memorized person is removed from the memory when the person explicitly logs off from the machine

(the same applies for "log off all").

This pre-assignment can be suppressed. Configure "default=0" and set the field attribute SETVALUE in

the dialog configuration.

The  number  is  pre-assigned  in  all  dialogs  for  order  postings,  status  changes  and  when  batches  are

posted C_UMB, C_GEN, CA_WL.

The  memorized  persons  are  deleted  in  the  memory  for  all  machines  when  shifts  change  or  at  the

beginning  of  a  new  shift  (Note:  If  the  shift  changes  at  one  machine  of  the  terminal,  the  persons  at  the

other machines of the terminal are also deleted)!

This can be configured via the entry "HoldPersonInfo=on" in section [SYSTEM] of the ctaip.ini file.

Example:

[System]
…..
HoldPersonInfo=on

12.6  Hide virtual keyboard

The virtual keyboard can also be switched off if the terminal is connected to a real keyboard. This can be

configured in section [SYSTEM] of the local ctaip.ini file. Example:

[SYSTEM]

Parameters=-t

Syntax:

+t/-t --> enables/disables the virtual keyboard; irrespective of the terminal type

EAT-AIP_82.docx

Version: 1.1.23049

Page 132 of 160

Advanced Configurations: MES Terminal AIP

12.7

Dynamic dialogs

12.7.1  Overview

12.7.2  AIP2 dialog types

AIP2 provides the following dialog types:

  AIPDEF

– Default dialogs

(customization)

  AIPTGRP

– Dialogs for specific terminal groups

(configuration)

  AIPTNR

– Dialogs for specific terminals

(customization)

You can only create/change dialogs for specific terminal groups.You can change existing

dialogs for a specific terminal.

But default dialogs cannot be changed.

The terminal has to be rebooted after dialogs were changed.

12.7.3  Dialogs for specific terminal groups

You can make configurations for specified terminal groups.

Before starting the configuration, make a backup copy of the concerned dialogs in a backup group (e.g.

AIPTGRP 999). (In case old backups exist, delete them beforehand).

EAT-AIP_82.docx

Version: 1.1.23049

Page 133 of 160

Advanced Configurations: MES Terminal AIP

Activate the new dialogs and reboot the terminal.

Example:

Special  posting  dialogs  should  be  used  for  terminal  group  xxx.  The  workflows  and  dynamic  dialogs  are

assigned to this terminal group.

How to proceed

1.  Assign terminal to terminal group

2.  Copy workflows to terminal group xxx

3.  Copy dynamic dialogs to terminal group xxx

4.  Activate dialogs

Assign terminal (MOC)

Menu: System administration --> Terminals --> Terminal groups

Copy workflows (MOC)

Menu: System administration --> Terminals --> Workflow

Copy complete workflow configuration from AIPDEF 0 to AIPTGRP xxx.

Copy dynamic dialogs (MOC)

Menu: System administration --> Terminals --> Dynamic dialogs

Copy the complete dialog configuration from AIPDEF 0 to AIPTGRP xxx

Activate dialogs (MOC)

Menu: System administration --> Terminals --> Dynamic dialogs

Button "Activate dialogs"

Dialog input: Type =AIPGRP ; User=xxx

EAT-AIP_82.docx

Version: 1.1.23049

Page 134 of 160

Advanced Configurations: MES Terminal AIP

Note:

You can delete all dialogs of a terminal group if you select all rows of the terminal group (AIPTGRP).

12.7.4  Hide fields (for specific terminal groups)

Identify the dialogs used on the AIP2 terminal.

Using the shortcut Ctrl + ALT + F6, a tooltip indicating the dialog name is shown.

General procedure:



Identify the dialog where a field should be hidden

  Change and activate dynamic dialogs of terminal group xxx.

Edit dynamic dialogs (MOC)

Menu: System administration --> Terminals --> Dynamic dialogs

Select the dialog for a specific terminal group and start the edit mode via the menu tab "dynamic

dialogs - fields" and the button "edit fields"

Choose the required field and check the option "blocked"

EAT-AIP_82.docx

Version: 1.1.23049

Page 135 of 160

Advanced Configurations: MES Terminal AIP

Activate dialog (MOC)

Activate dialogs for specific terminal groups

EAT-AIP_82.docx

Version: 1.1.23049

Page 136 of 160

12.7.5  Default assignment in dialog fields (for specific terminal

Advanced Configurations: MES Terminal AIP

groups)

General procedure:



Identify the dialog where a field should be completed with default values

  Change and activate dynamic dialogs of terminal group xxx.

Edit dynamic dialogs (MOC)

Menu: System administration --> Terminals --> Dynamic dialogs

Select the dialog for a specific terminal group and start the edit mode via the menu tab "dynamic

dialogs - fields" and the button "edit fields"

Set field "field attribute 2" to "SETVALUE"

Add field "default"

Allowed characters for dynamic dialog fields

The minus character "-" must always be placed at the end to prevent it from

being mistaken for the character used for the definition of "from" - "to" ranges.

Example:

a-z A-Z/-,. is interpreted as range from a to z and A to Z but in this case also as

range from "/" to ","

a-z A-Z/,.- is interpreted as range from a to z and A to Z and as the allowed

characters / , . and -

EAT-AIP_82.docx

Version: 1.1.23049

Page 137 of 160

Advanced Configurations: MES Terminal AIP

Activate dialog (MOC)

Activate dialogs for specific terminal groups

Change field name (for a specific terminal group)

General procedure:



Identify the dialog where a field name should be changed

EAT-AIP_82.docx

Version: 1.1.23049

Page 138 of 160

Advanced Configurations: MES Terminal AIP

  Change and activate dynamic dialogs of terminal group xxx.

Edit dynamic dialogs (MOC)

Menu: System administration --> Terminals --> Dynamic dialogs

Select the dialog for a specific terminal group and start the edit mode via the menu tab "dynamic

dialogs - fields" and the button "edit fields"

Change field contents of the column "text".

Activate dialog (MOC)

Activate dialogs for specific terminal groups

12.7.6  Activate simplified dialogs

There  are  simplified  dialogs  for:  logging  on  operations,  reporting  partial  quantities  for  operations,

interrupting operations, logging off operations.

Use  the  button  Enable  simple  dialogs  to  store  the  simplified  dialogs  for  the  standard

AIPDEF 0 in the workflow.

EAT-AIP_82.docx

Version: 1.1.23049

Page 139 of 160

Advanced Configurations: MES Terminal AIP

How to proceed:

  Menu: System administration --> Terminals --> Dynamic dialogs --> Button "Enable simple

dialogs"

  Enable dialogs for AIPDEF 0

Only one dialog is entered in the workflow if simple dialogs are in use.

Once simplified dialogs have been activated, it cannot be undone by way of configuration. This

can only be changed by customizing the system, which has to be ordered from MPDV.

Activation via the standard dialogs AIPDEF 0.

EAT-AIP_82.docx

Version: 1.1.23049

Page 140 of 160

Advanced Configurations: MES Terminal AIP

12.8  Customizing files

12.8.1  Terminal script files

File names and directories of default/customized terminal scripts must be named as follows.

AIP 2

Description

MPDV

.\ctnet\win\aip2\etc\aip_mpdv.zip

MPDV standard (not used)

MPDV

.\ctnet\win\aip2\etc\mpdv-aip.zip

MPDV standard

CUST

.\custom\userexit\aip2_<customer
number>.zip

Customization with customer number

CUST

.\custom\userexit\aip2_<project>.zip

Customization with project abbreviation

“aip_” is added as prefix to terminal script files for AIP2.

PRIO  AIP 2

Description

MPDV

1

.\aip_system_mpdv.scr
.\aip_<dialog>_mpdv.scr

MPDV standard (not used)

MPDV

2

.\aip_mpdv-system.scr
.\aip_mpdv-<dialog>.scr

MPDV standard

CUST

1

.\aip_system_<customer no.>.scr
.\aip_<dialog>_<customer no.>.scr

Customization with customer number

CUST

2

.\aip_system_<project>.scr
.\aip_<dialog>_<project>.scr

Customization
abbreviation

with

project

ZIP files are only unpacked in live operation, once they have been successfully DOWNLOADED from the

server. In DEMO mode there is no unpacking of terminal script ZIP files.

EAT-AIP_82.docx

Version: 1.1.23049

Page 141 of 160

Advanced Configurations: MES Terminal AIP

13 Rework and Open Quantity on the AIP2

13.1  Purpose

Use  the  following  instruction  to  collect  not  only  yield  and  scrap,  but  also  rework  quantities  and/or  open

quantities on the AIP2.

This instruction describes how to collect additional quantities with the following order-related dialogs:

  Upload/post partial quantity for operation



Interrupt operation

  Log off operation

13.2  Requirements

For the present instruction, the requirements listed below were respected. But also with different technical

conditions, you can still collect rework and open quantities (e.g. with AIP 8.1 and MW 3.1). In some of the

workflow steps, you might have to make changes, e.g. change the place of fields.

  The  screen  of  the  AIP2  has  a  width  of  1280  pixels.  If  the  screen  is  smaller,  parts  of  the  input

fields can be cut off.

  MW 4.0pe with service pack 15. Only from service pack 15 onwards, you can create new fields in

dynamic dialogs without development license MDS-AIS.

  Unchanged dialog configuration as in the new installation of MW 4.0pe at the beginning of 2020.

The  instruction  is  for  persons  with  technical  know-how.  They  must  know  how  to  configure

dynamic dialogs and how to activate and test these dialogs on the AIP (basic knowledge).

For  detailed  information  on  the  configuration  of  dynamic  dialogs  and  the  GUI  configuration  of

the AIP2, refer to the document EAT-AIP_82.pdf.

The instruction describes the collection of a rework quantity. Use the same configuration steps

for open quantities. To configure open quantities

- use the identifier "PRB" instead of "NCH"

- define reasons for open quantities instead of reasons for rework and

- change the label texts accordingly.

EAT-AIP_82.docx

Version: 1.1.23049

Page 142 of 160

Advanced Configurations: MES Terminal AIP

13.3  How to proceed

13.3.1  Defining reasons for rework

Use the application Reasons on the MOC to define one or severel reasons for rework (type=rework).

Tip: As a test, only create two or three reasons to not overload the display in the dialog.

13.3.2  Dynamic dialogs: Copy

Copy the dynamic dialogs from AIPTNR with user 0 to a specific terminal or terminal group. In the present

instruction, the dialogs were copied to terminal 110.

Perform  the  steps  in  the  following  in  the  new  copy  of  the  dialogs  for  the  terminal  or  terminal

group selected. This way, the currently productive dialogs are not changed and you can return

to the standard version, if required.

When  the  tests  are  completed,  you  can  copy  the  changes  to  the  productive  dialog

configurations.

13.3.3  Dynamic dialogs: WF_AA_QUA

The dialog WF_AA_QUA is used in all order-related workflows to collect quantities. If you integrate new

quantity fields in the dialog WF_AA_QUA, the new quantity fields are then automatically available in the

workflows A_TR, A_UN and A_AB.

13.3.3.1  Adding status field in the header of the input dialog

  Copy  the  field  for  scrap  (field  number  +  2,  the  numbers  of  the  following  fields  are  automatically

incremented).

  Edit the copied field.

o  Change the text to "Rework".

o  Change the field ID index to NCHP.

EAT-AIP_82.docx

Version: 1.1.23049

Page 143 of 160

Advanced Configurations: MES Terminal AIP

o

Increment the X-positions for text and field by 300. This way, the Rework field is placed to the

right of the Scrap field.

13.3.3.2  Adding input fields

You can optionally collect quantities for several scrap reasons on the AIP. The system then automatically

creates a posting record as posting of a part quantity for each scrap reason collected.

You require a so-called FIELDPAGER to display several reasons on the AIP. The fieldpager is configured

like a single input field in the configuration of the dynamic dialogs. But here, the dialog layout on the AIP

is  different.  A  larger  area  is  reserved  and  not  only  a  single  field.  In  this  area,  a  separate  input  field  is

provided for each scrap reason that is valid at the machine.

In the example below, we also use a FIELDPAGER for the rework quantities.

For details on the configuration of the FIELDPAGER, refer to the document MOC_DialogField.

EAT-AIP_82.docx

Version: 1.1.23049

Page 144 of 160

Advanced Configurations: MES Terminal AIP

  You must ensure that there are not too many valid scrap reasons for the terminal used, because the

input area for scrap is otherwise overloaded.

  First, decrease the width of the FIELDPAGER for scrap to create space for the new FIELDPAGER for

rework quantity. In the example, we have decreased  the  width  of the area using the field for the X-

position of the unit (field X pos. unit). The width was decreased from 770 to 400.

  Copy the totals field of the scrap to the field number +2.

  Change the copied totals field for scrap.

o  Change the texts from scrap to rework.

o  Change the identification (replace AUS with NCH).

o

Increment the X-positions of the new field by 300. This way, the field is placed to the right of

the totals field for scrap.

  Copy the FIELDPAGER for scrap to the field number +2.

  Change the copied FIELDPAGER for scrap:

o  Change the texts from scrap to rework.

o  Change the identification (replace AUS with NCH).

o  On the "Functions" tab, change the "Dialog list function" to "PAGER-AGRD-NCH.LST".

o

Increment  the  X-positions  of  the  field  by  500.  Do  not  change  the  X-position  of  the  unit

because the X-position of the unit specifies the width of the area in case of a FIELDPAGER.

The FIELDPAGER for the rework quantity is now displayed to the right of the FIELDPAGER

for scrap.

Export the dialogs for the selected terminal number.

Test the changes on the AIP. To this end, restart the AIP or reload the dialogs.

EAT-AIP_82.docx

Version: 1.1.23049

Page 145 of 160

Advanced Configurations: MES Terminal AIP

13.3.4  Dynamic dialogs: WF_*_CHK

In the workflows A_TR, A_UN and A_AB, different dialogs are used in the standard for the final check by

the user. In these dialogs, the collected rework quantities must be entered:

  WF_ATR_CHK: Workflow step "confirmation" with upload of a part quantity

  WF_AUN_CHK: Workflow step "confirmation" with interrupt OP

  WF_AUN_CHK: Workflow step "confirmation" with OP logoff

Find  below  a  description  of  how  to  proceed  with  the  dialog  WF_ATR_CHK  as  an  example.  Proceed

similarly with the other dialogs.

13.3.4.1  Adding status field in the header of the dialog

  Copy the status field for the former scrap (approx. field number 10 to field number +2)

  Edit the new field.

o  Change the texts to "Rework".

o  Change the field ID index (replace AUS with NCH).

o

Increment the X-positions for text and field by 300.

13.3.4.2  Adding an input field

  Copy the field for the collected scrap (approx. field number 27 to field number + 1)

  Edit the new field.

o  Change the texts to "Rework".

EAT-AIP_82.docx

Version: 1.1.23049

Page 146 of 160

Advanced Configurations: MES Terminal AIP

o  Change the field Identification (replace AUS with NCH).

o

Increment the X-positions for text and field by 300.

Export the dialogs for the selected terminal number.

Test the changes on the AIP. To this end, restart the AIP or reload the dialogs.

Make similar changes for all three dialogs WF_ATR_CHK, WF_AUN_CHK and WF_AUN_CHK.

13.3.5  AIP layout: Rework quantity in main view

You want to additionally show the collected rework quantity in the main view of the AIP.

Make the configuration in the XML file for the GUI of the AIP2.

  Create a copy of the file a_list_anr.xml in the local scope. Copy the following file on the server

$INSTALLDIR$\ctnet\win\aip2\gui\a_list_anr.xml

to

$INSTALLDIR$\1\custom\aip2\gui\a_list_anr@local.xml

  Change the caption for the quantities in the file in the local scope (a_list_anr@local.xml). In the

example, the translation of the caption is deliberately neglected to keep the example simple.

...
</element>
<!--Label Quantities-->

EAT-AIP_82.docx

Version: 1.1.23049

Page 147 of 160

Advanced Configurations: MES Terminal AIP

<element class="TGridItemLabel">
<DataFieldName></DataFieldName>
<control>
  <Top>110</Top>
  <Left>5</Left>
  <!-- Caption Function="Translate" LanguageKey="lkQuantitiesTargetYieldScrap">Mengen (Soll / Gut / Ausschuss)</Caption -->
  <Caption>Quantities (Target / Yield / Scrap / Rework)</Caption>
</control>
</element>
...

  Copy the sections for the scrap quantity and the slant line in front and replace AUS with NCH in

the new sections.

...
<!--EGR:AUSP-->
<element class="TGridItemLabel">
  <DataFieldName>EGR:AUSP</DataFieldName>
  <DisplayFormat Define="FORMAT_QUANTITY">%g</DisplayFormat>
  <control>
  <Align>alLeft</Align>
  <AlignWithMargins>False</AlignWithMargins>
  <Font>
    <Color Define="COLOR_SCRAP">$0000DB</Color>
  </Font>
  </control>
</element>
<!--/-->
<element class="TGridItemLabel">
  <control>
  <Align>alLeft</Align>
  <AlignWithMargins>False</AlignWithMargins>
  <Caption> / </Caption>
  </control>
</element>
<!--EGR:NCHP-->
<element class="TGridItemLabel">
  <DataFieldName>EGR:NCHP</DataFieldName>
  <DisplayFormat Define="FORMAT_QUANTITY">%g</DisplayFormat>
  <control>
  <Align>alLeft</Align>
  <AlignWithMargins>False</AlignWithMargins>
  <Font>
    <Color Define="COLOR_SCRAP">$0000DB</Color>
  </Font>
  </control>
</element>
</element>    <!--Panel for icons longtext and notes-->
...

Test the changes on the AIP. To this end, restart the AIP so that the AIP loads the new file from the local

scope.

13.3.6  AIP layout: Rework quantity in Operation layout

You want to additionally show the collected rework quantity in the Operation layout of the AIP.

EAT-AIP_82.docx

Version: 1.1.23049

Page 148 of 160

Advanced Configurations: MES Terminal AIP

Make the configuration in the XML file for the GUI of the AIP2.

  Create a copy of the file a_list_anr.xml in the local scope. Copy the following file on the server

$INSTALLDIR$\ctnet\win\aip2\gui\a_data_anr.xml

to

$INSTALLDIR$\1\custom\aip2\gui\a_data_anr@local.xml

Perform the same steps in the new XML file that you performed for the main view.

Test the changes on the AIP. To this end, restart the AIP so that the AIP loads the new file from the local

scope.

13.4  Result

When all configurations are made, the following functions are available:

-

In the main view and in the Operation layout, the AIP displays the rework quantities uploaded so

far for the operation.

-

If  you  post  a  part  quantity,  interrupt  or  log  off  an  operation,  the  AIP  displays  the  quantities

uploaded so far.

-  The users can collect rework quantities with different reasons.

-  The users can check the collected rework quantities on the AIP before the final confirmation of a

dialog.

-  The system books the collected rework quantities for the operation.

EAT-AIP_82.docx

Version: 1.1.23049

Page 149 of 160

Advanced Configurations: MES Terminal AIP

-  The system automatically creates several order-related postings as postings of part quantities for

the rework quantities entered with different rework reasons.

-  The system automatically books the total of the rework quantity in the order-related postings for

interrupt or logoff.

EAT-AIP_82.docx

Version: 1.1.23049

Page 150 of 160

Advanced Configurations: MES Terminal AIP

14 Collecting Order-Related User Fields on the AIP2

14.1  Purpose

Use the following instruction if you want to collect user fields for order-related postings and optionally for

operations on the AIP2.

The instruction is helpful for the following dialogs:

  Upload/post partial quantity for operation



Interrupt operation

  Log operation off

The processing has not been tested explicitly for other dialogs such as  Log staff off, but the collection of

user fields probably works in other dialogs as well.

The following order-related user fields are available  in the system. The data type and the  possible field

length is different for each user field.

Identification

Data type

Description

FU:1 to FU:6

Date

User fields for a date

FU:7 to FU:22

N

Integer with value range from -2147483647 to 2147483647

FU:23 to FU:28

DECIMAL(18,6)  Decimal number with a value range of 12 digits before decimal

separator and a precision of 6 digits after decimal separator

FU:29 to FU:44

C1

User field for 1 character

FU:45 to FU:50

FU:51 to FU:64

FU:65 to FU:66

C10

C20

C40

User field for a text with a maximum of 10 characters

User field for a text with a maximum of 20 characters

User field for a text with a maximum of 40 characters

The instruction is made for the user fields in the  Operation and Order-related postings. It also

applies for user fields of batches. You must then use the field IDs CNR.FU:1 to CNR.FU:66.

14.2  Requirements

  The  screen  of  the  AIP2  must  have  a  width  of  1280  pixels.  If  the  screen  is  smaller,  parts  of  the

input fields can be cut off.

  MW 4.0 pe with service pack 15. Only from service pack 15 onwards, you can create new fields

in dynamic dialogs without development license MDS-AIS.

EAT-AIP_82.docx

Version: 1.1.23049

Page 151 of 160

Advanced Configurations: MES Terminal AIP

  The dialog configuration is unchanged  as in a new installation of MW 4.0pe at the beginning of

2020.

The  instruction  is  for  persons  with  technical  know-how.  They  must  know  how  to  configure

dynamic dialogs and how to activate and test these dialogs on the AIP (basic knowledge).

The screenshots are only available in English.

For  detailed  information  on  the  configuration  of  dynamic  dialogs  and  the  GUI  configuration  of

the AIP2, refer to the document EAT-AIP_82.pdf.

14.3  How to proceed

14.3.1  Overview

The instruction below describes how you can collect a user field with a date when you post a part quantity

for an operation, for example.

It is also described how the user field must be configured on the MOC so that the collected data is also

displayed on the MOC.

14.3.2  Dynamic dialogs: Copy

Copy the dynamic dialogs from AIPTNR with user 0 to a specific terminal or terminal group. In the present

instruction, the dialogs were copied to terminal 110.

Perform  the  steps  in  the  following  in  the  new  copy  of  the  dialogs  for  the  terminal  or  terminal

group selected. This way, the currently productive dialogs are not changed and you can return

to the standard version, if required.

When  the  tests  are  completed,  you  can  copy  the  changes  to  the  productive  dialog

configurations.

14.3.3  Dynamic dialogs: WF_AA_QUA

The  dialog  WF_AA_QUA  is  used  in  the  order-related  workflows  A_TR,  A_UN  and  A_AB  to  collect

quantities. We now want to collect an additional user field of type date.

EAT-AIP_82.docx

Version: 1.1.23049

Page 152 of 160

Advanced Configurations: MES Terminal AIP

  Note down the field values below from field Deviation reason with the ID EGG:GUT:

Field

For your notes (enter value)

Field no.

Y pos. text

Y pos. Field

  Create a  new field  with the following  data (do not change the default  value for settings that are

not listed in the table):

Tab

 Field

Value (comment)

General

Field no.

  Value of EGG:GUT incremented by 1

MyDate FU:1

Text

Unit

Information

MyDate FU:1

Identification

FU

ID index

1

Position

X pos. text

315

Y pos. text

  Value of EGG:GUT

EAT-AIP_82.docx

Version: 1.1.23049

Page 153 of 160

Advanced Configurations: MES Terminal AIP

X pos. field

445

Y pos. field

  Value of EGG:GUT

Format

Alignment

Left

Category

Input

Input type

DATUM ("date")

Length

Allowed
characters

Default

10

0-9

+1 (this results in the pre-allocation with the date of tomorrow. You can use
positive and negative offsets. Note: To pre-allocate the field with the default
value, you must additionally set the field attribute SETVALUE; see below. If
you do not specify a default value, the field remains empty.)

Functions  Field attribute
1

MANUELL

Field attribute
2

NULL (field may remain empty. If you do not configure a field attribute with
NULL, the user field is a mandatory field.)

Field attribute
3

SETVALUE (use SETVALUE to take over the default value to the field. If you
do not configure a field attribute with SETVALUE, the user field remains
empty.)

Options

Visible

Activated

The following input types are available for the different user fields in the field configuration:

Identification

Data type

Input type

FU:1 to FU:6

Date

DATUM ("date")

FU:7 to FU:22

N

NUMERISCH ("numeric")
Using the numeric user fields, you can also collect times. Use
the input type ZEIT ("time") or DAUER ("duration") then.

FU:23 to FU:28

DECIMAL(18,6)

FLIESS ("flow")

FU:29 to FU:66

C1,  C10,  C20,
C40

ALPHA

For  details  on  the  field  configuration  and  the  formatting  of  input  and  output,  refer  to  the  document

MOC_DialogField.

Export the dialogs for the selected terminal number.

Test the changes on the AIP. To this end, restart the AIP to reload the dialogs.

EAT-AIP_82.docx

Version: 1.1.23049

Page 154 of 160

Advanced Configurations: MES Terminal AIP

14.3.4  User field configuration for the MOC

Create  a  user  field  configuration  on  the  MOC.  For  further  information  on  the  configuration  of  user  field

keys and user fields, refer to the documentation Configuration_Userfields.

14.3.4.1  Type definition

Check if there is a suitable type definition for your user field.

In the example, we create an own type definition "U:MYDATE". For further information, refer to the online

help  in  the  application  Type  definition  or  to  the  document  MOC_UserFieldDefinition,  in  particular  the

section "Sample definition for MOC user fields (input and output)".

EAT-AIP_82.docx

Version: 1.1.23049

Page 155 of 160

Advanced Configurations: MES Terminal AIP

14.3.4.2  User field key

Check  if  the  two  user  field  keys  ADEPRO/SYSTEM  and  AGNR/SYSTEM  are  already  available.  If  not,

create the user field keys. Enter any description.

14.3.4.3  User field for Order-related postings and Operation

Create a user field for Order-related postings with the following data:

Field

Value

Object type

ADEPRO

EAT-AIP_82.docx

Version: 1.1.23049

Page 156 of 160

Advanced Configurations: MES Terminal AIP

User field key

SYSTEM

Field ID

1 (number of collected user field)

Field type

U:MYDATE

Name

Designation

Display position

Any

Any

1 (if you have several user fields per object type and user field key, the display position
specifies the order of display on the MOC)

Create another user field for Operations with the following data:

Field

Object type

Value

AGNR

User field key

SYSTEM

Field ID

1 (number of collected user field)

Field type

U:MYDATE

Name

Designation

Display position

Any

Any

1 (if you have several user fields per object type and user field key, the display position
specifies the order of display on the MOC)

EAT-AIP_82.docx

Version: 1.1.23049

Page 157 of 160

Advanced Configurations: MES Terminal AIP

14.3.4.4  Assigning user field key in Operation

Restart MOC to load the new user field configuration.

Assign the user field key AGNR/SYSTEM (edop) to the operation used for test purposes.

14.3.4.5  Checking the configuration

When the user field configurations are changed, you must restart the MOC to enable the change.

Check the display of the collected user field using the data previously noted down.

Edit operations (edop)

EAT-AIP_82.docx

Version: 1.1.23049

Page 158 of 160

Order-related postings (oboo)

Advanced Configurations: MES Terminal AIP

14.3.5  User field is not stored for OP

Sometimes  it  is  unwanted  that  the  collected  user  fields  overwrite  the  user  fields  of  the  operation.  If  the

AIP  transmits  the  field  identification  ANR:SETUSRFLD  with  the  value  "N",  the  system  does  not  use  the

collected user fields in the Operation, but only in the Order-related postings.

To this end, create a hidden field in the field configuration with the identification ANR:SETUSRFLD and the

default value N. Result: The field is not visible on the AIP when collected, but is sent to the server and avoids that

the user field in the operation is overwritten.

The collected user field is then only stored in the order-related posting.

Create a new field with the following data (do not change the default value for settings that are not listed

in the table):

Tab

 Field

Value (comment)

General

Field no.

Highest field number up to now in dialog + 1

Text

Unit

Disable FU update of operation

Information

Disable FU update of operation

Identification

ANR:SETUSRFLD

EAT-AIP_82.docx

Version: 1.1.23049

Page 159 of 160

Advanced Configurations: MES Terminal AIP

ID index

Position

X pos. text

Y pos. text

X pos. field

Y pos. field

Format

Alignment

10

100

400

100

Left

Category

Input

Input type

ALPHA

Length

1

Allowed characters

JN

Default

N

Functions  Field attribute 1

MANUELL

Field attribute 2

SETVALUE (use SETVALUE to take over the default value to the
field. If you do not configure a field attribute with SETVALUE, the
user field remains empty.)

Options

Visible

Deactivated (the field is not visible on the AIP, but is transmitted to
the server)

14.4  Result

When all configurations are made, the following functions are available:

-  When  you  post  part  quantities,  you  can  enter  a  date  in  a  user  field  in  the  workflow  step

Confirmation.

-  The user field is saved in the Order-related postings.

-  You can control if the collected user field is also written to the operation.

-  The collected user field can be displayed on the MOC.

EAT-AIP_82.docx

Version: 1.1.23049

Page 160 of 160

