Manual

AIP Functions Shop Floor
Data / Machine Data
AIP-BMD 8.2

Version 1.1.23167

Last changed on: 08.09.2020

AIP Functions Shop Floor Data / Machine Data

Copyright

© Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying  and  distribution  of this  documentation  or  any  part thereof,  for  any  purpose  or  in  any  form, is  prohibited  without  prior
written permission from MPDV Mikrolab GmbH.

AIP-BMD_82.docx

Page 2 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

The information contained in this documentation is subject to change without prior notice.

AIP-BMD_82.docx

Page 3 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

Contents

1  AIP Functions - Shop Floor Data/Machine Data .......................................... 7

2  AIP2 Operation ........................................................................................... 10

2.1  Special Control and Display Elements on the AIP2 ........................................... 10

2.2  General description of the posting process on the AIP2 .................................... 13

3  Main View with Tiles ................................................................................... 17

3.1  Main view – header and footer .......................................................................... 17

3.2  Main view with "tiles" ......................................................................................... 19

3.3

Icon view of workplaces .................................................................................... 25

4  Basic Screen as List View .......................................................................... 27

4.1  Basic screens – header and footer .................................................................... 27

4.2  Basic screen “tabular view“ ............................................................................... 29

4.3  Basic screen "machine overview" ...................................................................... 32

4.4

“Machines as icons” basic display ..................................................................... 35

5  BDE and MDE Functions ........................................................................... 36

5.1

5.2

5.3

Logging on an operation .................................................................................... 36

Logging an operation off .................................................................................... 38

Interrupting an operation ................................................................................... 40

5.4  Uploading a part quantity for an operation ......................................................... 40

5.5

5.6

5.7

Log person on ................................................................................................... 41

Log person off ................................................................................................... 41

Log off everyone ............................................................................................... 42

5.8  Change workplace/machine status .................................................................... 42

5.9

Lock/unlock production status ........................................................................... 44

5.10  Change target cycle .......................................................................................... 45

5.11  Change partitioning ........................................................................................... 46

5.12  Change target quantity ...................................................................................... 46

5.13

Information on operations (OP info) ................................................................... 47

5.13.1  SF comments ........................................................................................ 48

AIP-BMD_82.docx

Page 4 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

5.13.2  Documents ............................................................................................ 49

5.13.3  Tools, Resources .................................................................................. 50

5.13.4  Components .......................................................................................... 50

5.13.5  Progress ................................................................................................ 50

5.13.6  Resource performance accounts ........................................................... 50

5.14  Machine information (machine info) ................................................................... 51

5.14.1  Description ............................................................................................ 51

5.14.2  Registered persons ............................................................................... 53

5.14.3  Status log .............................................................................................. 54

5.15  Merged operations ............................................................................................ 56

5.15.1  Log merged operation on....................................................................... 56

5.15.2

Interrupt/log merged operation off .......................................................... 57

6  Specific Features of Machine Data Collection ........................................... 59

6.1  Shift automatic .................................................................................................. 59

6.2  Machine monitoring in general .......................................................................... 60

6.3  Monitoring of cycle time ..................................................................................... 61

6.4  Monitoring of operating signals .......................................................................... 64

6.5

Lock production status (production lock) ........................................................... 66

6.6  Machine lock ..................................................................................................... 67

6.7  Output “Target quantity reached" ...................................................................... 68

6.8  Scrap reasons depending on status & production lock ...................................... 68

6.9  Setting of outputs depending on status and posting scenarios .......................... 69

6.10  Manually set status vs. automatically set status ................................................ 69

7  Barcode Input ............................................................................................. 70

8  AIP configuration of barcodes .................................................................... 72

8.1  Configuration in ctaip.ini .................................................................................... 72

8.2  Configurations in hytnrcfg.ini ............................................................................. 75

8.2.1  Notes/configurations for concurrent lengths ........................................... 75

9  Barcode Input with Prefix ........................................................................... 77

9.1  Configuration of customized barcode prefixes ................................................... 81

AIP-BMD_82.docx

Page 5 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

10  AIP2 -Local Configuration .......................................................................... 83

10.1  Local Configuration ctaip.ini .............................................................................. 83

10.2  PNG – Files / Bitmaps ....................................................................................... 87

10.2.1  File pict.zip ............................................................................................ 87

10.2.2  File pict_cust.zip .................................................................................... 87

10.3  Multilingualism (*.mld files) ................................................................................ 88

11  AIP2 - Central Configuration File hytnrcfg.ini ............................................. 89

11.1  Layout configuration .......................................................................................... 92

12  AIP2 - Local Configuration File keyboard.ini .............................................. 95

13  Start Menu Inst32 ....................................................................................... 98

13.1  Using the functions in Windows 7 .................................................................... 106

13.2

Installation of font types in Windows 7 ............................................................. 107

13.3  Date/time synchronization at the terminal ........................................................ 107

13.4  Control of special watchdog hardware ............................................................. 108

13.5

inst32.ini - Standard ........................................................................................ 109

13.6

inst32.ini - application selection ....................................................................... 110

13.7  Migration: CTWIN/AIP --> AIP 8.2 ................................................................... 115

14  Configuring the machine image for the AIP ............................................. 117

AIP-BMD_82.docx

Page 6 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

1  AIP Functions - Shop Floor Data/Machine Data

Purpose

The  AIP  features  contained  in  this  function  package  make  it  possible  to  enter  data  directly  in

production using shop floor terminals or shop floor PCs.

Implementation considerations

You use the function package if you:

  want to know the current status of each order/operation

  want to know about the progress of the order (time-related and/or quantity-based)

  want to record the activities performed (machine time, labor utilization, quantities) in order to

o  evaluate them, or

o  upload them to a higher-level ERP system.

  would  like  to  monitor  machines  or  would  like  to  enter  or  track  the  current  status  of  each

machine.

  want  to  electronically  move  information  such  as  documents  or  production  notes  into

Production.

Integration

AIP offers the ability to automatically transfer data from the machine, to record it and to forward it to

the server to be posted. Various interfaces are available for this purpose.

Data entered using AIP can be displayed or evaluated in various applications in MOC.

Features

Order-related data entry and posting functions

  Posting functions

o  Log on/log off, interruption and partial confirmation/upload of operations

  Entry of quantities

o  Entry of yield and scrap quantities

o  Entry of rework quantities or open quantities (customizing)

  Recording scrap reasons

o  Entry of scrap reasons

  Reasons for deviation

AIP-BMD_82.docx

Page 7 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

o  Entry of reasons for deviation in the event of over or underdelivery

  Displaying lists / icons

o  Basic  display  of  workplaces/machines  assigned  to  the  terminal  or  operations  logged

onto a selected workplace. Presentation in the form of a list or in icon view

  Display of order backlog data

o  Display  of  selected  operation-related  information  about  planned  operations  or  about

currently logged on operations: Order backlog data, material components, production

resources and tools

  Display of machine data

o  Display of machine master data and shift-related quantities

  Display notes

o  Display of operation-related notes entered on the client

  Modify default values

o  User dialog used to modify the default value for "target quantity"

  Entry of BDE comments

o  Entry  of  OP-related  comments  (free  texts)  added  to  any  particularities  documented

during the course of the order

  Status log

o  Display of operation or personnel postings made during the current shift

Personnel-related entry and posting functions

  Personnel logon/logoff

o  Personnel logons and logoffs to and from operations or the workplace

Machine monitoring and status recording

  Cycle/operating signal monitoring

o  Automatic monitoring of the production status of machines based on cycle signals or

operating signals (requires a connection from the machine to the shop floor terminal).

  Malfunction reason

o  Dialog in which to enter reasons for a disturbance detected by the machine monitoring

function

  Modify default values

o  User  dialog  used  to  modify  the  default  value  for  "target  cycle"  needed  for  the  cycle-

based machine monitoring function.

  Manual entry of machine status

o  Manual entry of machine states/statuses

  Status log

AIP-BMD_82.docx

Page 8 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

o  Display of the machine states/statuses posted during the current shift. Function for the

subsequent assignment of reasons to disturbances/malfunctions that had not yet been

given one.

Additional licenses might be needed in order to use the functions listed above.

AIP-BMD_82.docx

Page 9 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

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

 : If you click this button, the system jumps to the first  page of the next page navigation.

This means: If Page 10 ... Page 18 were displayed for the page navigation, the system jumps

to Page 9.

 : If you click this button, the system directly jumps to Page 1.

 : If you click this button, the system directly jumps to the last page.

You can select an operation using the mouse, touch screen, keyboard (arrow keys:'' or ''), scanner

or by entering it manually.

AIP-BMD_82.docx

Page 10 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

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

AIP-BMD_82.docx

Page 11 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

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

AIP-BMD_82.docx

Page 12 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

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

AIP-BMD_82.docx

Page 13 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

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

AIP-BMD_82.docx

Page 14 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

As  long  as  the  dialog  has  not  been  confirmed,  the  data  entered  can  be  changed  at  any  time  by

scrolling back and forth.

Filter field for the list

Status list

In the second view Select status, you select the workplace status that is set, when the operation has

been  interrupted.  You  can  select  the  status  from  the  status  list  displayed.  This  list  can  be  restricted

using  the  Filter  field.  Once  the  required  values  have  been  entered,  the  next  view/sub-dialog  can  be

opened by clicking Next (in our example it is the last view).

AIP-BMD_82.docx

Page 15 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

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

also possible, if the virtual keyboard is displayed. As a consequence, you cannot use the ESC

key to close the virtual keyboard.

AIP-BMD_82.docx

Page 16 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

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

AIP-BMD_82.docx

Page 17 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

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

AIP-BMD_82.docx

Page 18 of 120

08.09.20

3.2  Main view with "tiles"

List of workplaces

AIP Functions Shop Floor Data / Machine Data

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

AIP-BMD_82.docx

Page 19 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

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

AIP-BMD_82.docx

Page 20 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

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

AIP-BMD_82.docx

Page 21 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

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

AIP-BMD_82.docx

Page 22 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

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

AIP-BMD_82.docx

Page 23 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

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

AIP-BMD_82.docx

Page 24 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

In case  you have enabled  several lists,  you can switch between these lists in  the header line that  is

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

AIP-BMD_82.docx

Page 25 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

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

The AIP calculates and updates data at cyclic intervals. This may result in deviations between

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

AIP-BMD_82.docx

Page 26 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

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

AIP-BMD_82.docx

Page 27 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

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

AIP-BMD_82.docx

Page 28 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

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

AIP-BMD_82.docx

Page 29 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

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

AIP-BMD_82.docx

Page 30 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

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

AIP-BMD_82.docx

Page 31 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

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

AIP-BMD_82.docx

Page 32 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

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

AIP-BMD_82.docx

Page 33 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

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

AIP-BMD_82.docx

Page 34 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

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

AIP-BMD_82.docx

Page 35 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

5  BDE and MDE Functions

This document describes the different AIP functions used for the Shop Floor Data and Machine Data

Collection (BDE and MDE).

5.1  Logging on an operation

When you log on an operation, the following methods are available:

Separate logon of

Operations  and  staff  have  to  be  logged  on/off  separately.  You  have  to

orders and staff

enter the staff badge number with the function Log on operation. This is

a validation check only. The person must be logged on separately using

the function Log on person.

Log person on with order  The OP and the person are logged on in one posting process. You only

use the function  Log on person if further persons are logged on to  this

operation.

Make this setting in the terminal configuration on the client (Log user on with order option).

Posting process

Select a workplace before you log on an operation. When you then call the dialog, the workplace field

is already populated.

Calling the function Log on operation

Click the button Log operation on.

When the function is called, the user is guided through the input dialog.

Choose operation

Manual entry via keyboard

or

Selection via sequencing list (see the "Notes on the sequencing list")

or

Scan of bar code

With manual entry  or bar code scan, the operation is  not  automatically searched  and

positioned in the sequencing list.

AIP-BMD_82.docx

Page 36 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

Choose status

Enter or select the status number that must be set when the operation is logged on.

Staff badge number

The input field is also displayed if you have selected the “separated“ option for the "logon" in the

terminal  configuration  (client).  The  person  is  not  logged  on  with  the  order  but  is  only  used  for

validation. For this setting, go to the terminal configuration: authorizations on the terminal > log

OP on.

Confirmation Log on operation

You  use  the  button  Log  on  operation  to  log  on  a  new  operation. With  the  OP  logon,  the  run

times are booked to the different time accounts and the quantities are posted for the OP.

When the operation is logged on, the  Workplace field in the backlog of orders is filled with the

workplace  where  the  operation  is  logged  on.  If  the  operation  has  been  planned  for  another

workplace,  the  planned  workplace  is  then  overwritten.  As  a  result,  the  OP  is  implicitly  re-

planned.  This  re-planning  does  not  involve  any  further  actions  (e.g.  update  of  the  template,

rescheduling).

Notes on the sequencing list

You  can  limit  the  number  of  entries  in  the  sequencing  list  for  the  specific  workplace.  The  list

should  not  get  too  long  because  a  long  list  has  a  negative  effect  on  response  time  behavior,

operability  and  search  time  (recommendation:  not  more  than  50  entries,  less  with  remote

connections).

The same is valid for the functions Interrupt operation, Finish operation and Partial confirmation.

Here, running operations are displayed.

AIP-BMD_82.docx

Page 37 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

If an operation is already logged on to the workplace, then the system enters this workplace in

the  input  field  Operation.  If  you  do  not  want  this  and  if  the  system  should  preset  the  first

operation of the sequencing list in this field, then you must make the following configuration:

  Call the application Dynamic dialog configuration - Fields.

  Request data for the dialog "WF_AGL". If it is not the logon dialog A_AN or A_P_AN, then

identify the dialog.

  Select the field "ANR".

  Click the Edit button (note: this is only possible with terminal-specific or terminal group-

specific dialogs. It is not possible with AIPDEF 0 dialogs).

  Enter the value "SETVALUE" (without quotation marks) in one of the field attributes 1 to 8.

  Leave the field Default empty.

  Save your changes.

  Change to the application Dynamic dialog configuration.

  Restart the dialogs and then restart the terminals.

Displaying notes and texts

Via configuration in the application Order types, you can use the option Show OP info when logging on

OP to specify for a specific order type that after a successful order logon on the AIP either



the notes on the operation with an active option Visible on the terminal

or



the long texts of operations

are automatically displayed. The “OP info” dialog is then opened with the respective active page.

Note: To show the information, the AIP must be connected online to the server.

5.2  Logging an operation off

You  use  the  button  Log  off  operation  on  operation  level  to  log  off  an  operation.  The  posting  of  run

times and quantities is then finished for the OP. Once logged off, you cannot log on the OP again.

Posting process

Select the workplace and the operation that must be logged off in the main view. When the dialog is

called, these fields are then preassigned and cannot be changed.

AIP-BMD_82.docx

Page 38 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

Calling the function Log operation off

Click the Log operation off button.

When the function is called, the user is guided through the input dialog.

Yield

Enter the yield quantity that must be posted.

Scrap (input fields and display)

The  scrap  reasons  are  already  displayed  in  the  dialog  (see  also  AIP  operation).  Enter  the

produced scrap quantities for the relevant scrap reason. All scrap quantities entered are totaled

and displayed in the general display field.

Deviation reason

You  can  activate  an  overdelivery  or  underdelivery  check  for  operations  or  persons.  When  the

operation  is  logged  off,  the  system  then  checks  if  the  quantity  recorded  has  exceeded  the

overdelivery  limit  or  falls  short  of  the  underdelivery  limit.  If  the  check  has  a  positive  result,  the

quantities posted are rejected with the error message "Overdelivery" or "Underdelivery".

If  only  a  warning  is  activated  for  the  check,  the  user  can  force  the  system  to  accept  the

overdelivery or underdelivery by entering a deviation reason.

Status

Enter  or  select  the  number  of  the  workplace/machine  status  that  is  set  after  the  operation  is

logged off.

Estimated duration

Optionally enter the estimated duration of the selected workplace/machine status in minutes.

Note: Only make an entry here if the status is a downtime status (status <> production).

Comment

Enter  an  optional  comment  for  the  status  in  this  field  that  is  also  displayed  in  the  machine

history.

Staff badge number

The person entered must be authorized to log off the operation. The setting is made in the HR

master data. Go to: Shop floor data > BDE authorizations > Lop OP off.

Confirming Log off operation

The operation is logged off, once the dialog has been confirmed.  You cannot log the operation

on again.

AIP-BMD_82.docx

Page 39 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

5.3

Interrupting an operation

Click the button Interrupt operation to call this function. You use this function to stop collecting times

and quantities for an order. The reasons for the interruption can be a quantity upload, a shift change or

an interruption of the production for technical reasons.

The process of interrupting an operation and the layout of the input dialog are identical to the ones of

the operation logoff. The difference is that you can log on an interrupted operation at any time.

5.4  Uploading a part quantity for an operation

You  can  use  this  function  to  upload  a  part  quantity  for  the  order  without  interrupting  or  finishing  the

running  OP.  The  quantities  are  booked  for  the  relevant  OP  and  the  person  that  makes  the  posting.

Click the button Confirm partially to call this function.

Posting process

Select  the  workplace  and  the  operation  from  the  list.  When  you  then  call  the  dialog,  the  system

preassigns these fields and the values cannot be changed.

Calling the function Confirm partially

Click the button Confirm partially.

When the function is called, the user is guided through the input dialog.

Yield

Enter the yield quantity that you want to post.

Scrap (input fields and display)

The scrap reasons are already displayed in the dialog (see also AIP operation). You can enter

scrap  quantities  for  the  relevant  scrap  reason.  All  scrap  quantities  entered  are  totaled  and

displayed in the general display field.

Deviation reason

You can activate an overdelivery or underdelivery check for operations or persons. The system

then  checks  if  the  overdelivery  limit  is  exceeded  with  the  quantity  posted.  If  the  check  has  a

positive result, the quantity posted is rejected with the error message "Overdelivery".

If  only  a  warning  is  activated  for  the  check,  the  user  can  force  the  system  to  accept  the

overdelivery by entering a deviation reason.

Staff badge number

The person entered must be authorized to upload part quantities for the operation.

AIP-BMD_82.docx

Page 40 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

5.5  Log person on

Persons  are  logged  on  to  or  off from  a  workplace.  The  logging  of  persons  is  therefore made  on  the

workplace level.

You can only log on a person, if an operation has been logged on to the workplace.

You can only use this function to log on persons with single workplaces or production orders.

With  group  workplaces  or  overhead  cost  operations,  the  persons  are  logged  on  via  the

combined logon of order and persons when the operation is logged on. It must be guaranteed

here that a staff badge number can be entered during the posting process.

Posting process

Select the workplace where you want to log the person on or off and click the button Staff logging. The

system displays a  list of the  Registered  persons that  are already logged on to this  workplace. Close

this view by clicking Close information.

Calling the function Log person on

Click the button Log person on. A dialog including only one dialog step opens.

Staff badge number

To identify the person, also enter the staff badge number here.

Other notes

Via customization, you can optionally enter an operator position/function or a premium indicator.

You  specify  in  the  course  of  the  customization  how  the  value  is  entered:  only  a  field  with  a

selection list or a separate workflow.

You can configure that an advance logon for the next shift is possible within a configurable time

before  the  start  of  the  next  shift.  Configure  this  time  in  the  terminal  configuration  (tab:  MF

functions  >  Waiting  period  for  advance  logon  of  staff).  But  if  the  last  operation  is  logged  off

before  the  end  of  the  current  shift,  all  advance  logons  are  deleted.  And  you  cannot  log  off  a

person that is logged on in advance.

5.6  Log person off

Persons  are  logged  on  to  or  off from  a  workplace.  The  logging  of  persons  is  therefore made  on  the

workplace level. You can only log off a person that has been logged on to the workplace.

AIP-BMD_82.docx

Page 41 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

You can only use the function to log off persons with single workplaces or production orders.

With  group  workplaces  or  overhead  cost  operations,  the  persons  are  logged  off  via  the

combined logoff of order and persons when the operation is interrupted or logged off.

Posting process

Select the workplace where you want to log the person on or off and click the button Staff logging. The

system displays a  list of the  Registered  persons that  are already logged on to this  workplace. Close

this view by clicking Close information.

Calling the function Log person off

Click the button Log person off. A dialog including only one dialog step opens.

Yield

Enter the yield quantity that you want to post.

Scrap (input fields and display)

The scrap reasons are already displayed in the dialog (see also AIP operation). You can enter

scrap  quantities  for  the  relevant  scrap  reason.  All  scrap  quantities  entered  are  totaled  and

displayed in the general display field.

Staff badge number

To identify the person, also enter the staff badge number here.

5.7  Log off everyone

You can use this function to log off all persons in one posting that are logged on to a machine.

You assign the authorization to use this function in the HR master data. Activate the following option in

tab Shop floor data > BDE authorizations > Log all staff off.

Posting process

The posting process is in general identical to the dialog Log person off. The only difference is that you

cannot record quantities when using the dialog Log off everyone.

5.8  Change workplace/machine status

You can use this function to assign a new status to a workplace/machine. You might need this function

during setup of the workplace or in case of a malfunction, for example.

AIP-BMD_82.docx

Page 42 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

A  status  should  be  entered,  when  the  AIP  automatically  identifies  a  malfunction  and  the  status

changes to “not assigned” (also see "Monitoring of operating signals and cycle time").

You can configure that only persons can perform a status change that are already logged on. Enable

the  following  option  in  the  HR  master:  tab  Shop  floor  data  >  BDE  authorizations  >  Change  only  if

person is logged on.

Posting process

Select the workplace where you want to change the status and click the button Change status.

Status

Enter or select the status that you want to set for the workplace.

With  manual  entry  or  bar  code  scan,  the  status  is  not  automatically  searched  and

positioned in the selection list.

Estimated duration

You  can  enter  an  estimated  time  in  minutes  that  the  new  status  will  probably  take.  This  field

should only be filled for downtime statuses.

Comment

You can enter a comment for the status. This comment can be displayed in the machine history.

If the status lasts on and shifts change, then the comment is only assigned to the MDE

log record of the shift before shift change.

Staff badge number

Enter the badge number of the person that changes the status. The number is required for the

validation check. The person must be authorized to change the status.

Confirmation of the dialog

Once the dialog has been posted successfully, the new status is activated for the machine.

Other notes

It is possible to change from one status to another, unless the automatic status monitoring has

been  activated  for  the  workplace/machine  (workplace/resource  configuration  >  tab:  MDE

configuration > automatic  monitoring: cyclic or operating signal)  and the  workplace is  in status

“production”.

If you do not want to show a machine status in the status list (any more), then you must disable

the option Status manually at terminal in the machine status assignment.

AIP-BMD_82.docx

Page 43 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

Hierarchical statuses

You  can  build  a  status  hierarchy  as  of  HYDRA-MDE  7.2.  In  the  status  assignment,  you  store  the

status number of the direct superordinate status for a lower-level status. All statuses that you cannot

assign on the terminal and that are only used to show the hierarchy are called “hierarchy level”.

Hierarchy levels are displayed in blue font in the status list.

If you select a hierarchy level and double-click/touch the

 button, the list of “lower-level” statuses

opens. To get to the next higher hierarchy level, click/touch

.

You  can  only  select  a  status  in  the  status  list  that  can  be  assigned  manually.  The  following  error

message is shown, if a machine status change on a hierarchy level cannot be assigned.

5.9  Lock/unlock production status

The button Lock production status or Unlock production status is only active for a workplace if

the current status is not "production" and if one of the following conditions is fulfilled:

  The PCC receiving the machine data of the workplace runs in embedded mode and the

workplace is assigned to a terminal configured with "MDE operation".

  The PCC receiving the machine data of the workplace runs in stand-alone mode and the

INI configuration MDE-NOTIFICATION is activated for the workplace.

If  the  function  Lock  production  status  is  active,  the  terminal  cannot  automatically  change  to  status

"production" when the terminal identifies signals (pulses or operating signal).

If the production status is locked, this means:

  With  an  active  lock,  the  automatic  change  to  status  "production"  is  not  possible  and  the  status

currently set is kept despite machine pulses (e.g. "setup").



If  cycle  signals  are  recorded  during  the  lock  via  counter  inputs  configured  as  "yield",  then  the

relevant quantities are booked according to the Configuration of Posting during prod. lock:

o  as yield,

o  as scrap

o  or not at all.

  Click the button Unlock production status to remove the lock.

AIP-BMD_82.docx

Page 44 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

The production status can also be locked/unlocked when a specified workplace/machine status is set.

You  can  configure  the  behavior  in  the  configuration  Status  assignment  for  each  status  that  is  not

"production" (go to: Master data > Workplaces/machines > Status assignment).

Logging of the production lock

The manual lock or unlock of the production status is logged as event on the server and can be shown

in the Machine history. Note: the logging of the event is only performed if the status is manually locked

or unlocked.

But  if  the  production  status  is  locked  or  unlocked  via  status  change,  then  this  is  not  documented

explicitly as an event and is therefore not shown in the machine history.

If  the  production  status  is  locked  for  a  machine  and  the  terminal  software  is  restarted,  then  the

production lock is automatically removed after this restart. The changed production lock is not logged.

Authorization check when setting the production lock manually

You can configure that only if a relevant authorization is available, the person is allowed to manually

(explicitly) set or remove the production lock.

To do so, activate the dynamic dialog M_PSPERRE. If this dialog is activated, you must enter the staff

badge number.

If the dialog is activated, the dialog is displayed when the operator clicks the button  Lock production

status  or  Unlock  production  status.  Once  the  badge  number  has  been  entered,  the  system  checks

whether  this  person  is  authorized  to  lock/unlock  the  production  status.  The  system  checks,  if  the

option Change of production lock in the HR master data (tab Shop floor data) is enabled.

If  the  terminal  is  OFFLINE,  the  terminal  configuration  specifies  the  behavior  (option  Checking

required).

5.10  Change target cycle

The target cycle is the default value that is checked in case of a machine monitoring based on cycle

time. You can use this dialog to change the target cycle for the machine.

Posting process

Select the workplace where you want to change the target cycle. Click the button Change target cycle.

New target cycle

Specify the new target cycle in seconds/cycle

AIP-BMD_82.docx

Page 45 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

Staff badge number

The entry of the staff badge number is optional. If configured accordingly, a validation check is

performed

for

the  number.  (HR  master  data  >

tab:  Shop

floor  data  >  Change  of

cycle/partitioning).

Confirmation of the dialog

Once the dialog has been posted successfully, the new target cycle is activated for the machine.

5.11  Change partitioning

The partitioning (also called cavity) specifies the number of parts produced per machine cycle (clock).

You can use this dialog to change the partitioning. The automatic collection of quantities is then based

on this partitioning.

Posting process

Select  the  workplace  where  you  want  to  change  the  partitioning.  Then  click  the  button  Change

partitioning.

Partitioning

Enter the new partitioning.

Staff badge number

You  can  optionally  enter  the  staff  badge  number.  If  configured  in  the  HR  master  data,  a

validation  check  is  performed  for  this  number  (tab:  Shop  floor  data  >  BDE  authorizations  >

Change cycle/partitioning).

Confirmation of the dialog

Once  the  dialog  has  been  posted  successfully,  the  new  partitioning  is  used  for  all  running

operations at the machine.

5.12  Change target quantity

Use this dialog to change the target quantity based on operations (primary quantity unit).

Posting process

Select the operation where you want to change the target quantity and click the button Change target

quantity.

New target quantity

Enter the new target quantity that you want to store for the operation.

AIP-BMD_82.docx

Page 46 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

Staff badge number

You  can  optionally  enter  the  staff  badge  number.  If  configured  in  the  HR  master  data,  a

validation  check  is  performed  for  this  number  (tab:  Shop  floor  data  >  BDE  authorizations  >

Change target quantity).

Confirmation of the dialog

Once  the  dialog  has  been  posted  successfully,  the  new  target  quantity  is  stored  for  the

operation.

5.13

Information on operations (OP info)

General information

Use the button

 on operation level to call the OP info dialog3. Select the required operation. A

dialog  opens.  The  dialog  includes  several  pages  that  are  organized  in  tabs.  The  information  is  only

requested from the database when you call the relevant page.

The dialog includes the following tabs:

3 This function is also available at other places, e.g. in the Log operation on dialog.

AIP-BMD_82.docx

Page 47 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

Description

Current information on the current operation is displayed.

  Operation (MES order number)

  Article

  Article designation

  Remark 1

  Remark 2

  Planned duration

  Target quantity (of the operation)

  Yield

  Scrap

  Completion (in %)

At the bottom, the long text assigned to the operation is displayed.

Notes

The tab Notes displays the notes entered on the client (usually via the Graphic planning board) if the

option Display on terminal is enabled.

The table shows all notes of the operation that are configured to be displayed on the terminal. The list

is sorted by the editing date. The most recent note is on top and is displayed when you call the view.

If you click/touch a note of the list, the complete text is displayed in the field below.

5.13.1  SF comments

The tag SF comments displays the comments recorded during the Shop Floor Data Collection (BDE)

or you can record new comments.

AIP-BMD_82.docx

Page 48 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

The  comments  recorded  are  displayed  in  the  Order  information  dialog  on  the  client  or  can  be

forwarded via escalation management, e.g. by e-mail.

If an SF comment is recorded for an operation that has been merged on the MOC, then the SF

comment  is  only  relevant  for  this  merged  operation.  The  SF  comment  is  not  transferred  to  the

single operations.

You cannot record SF comments for the single operations because the single operations are not

displayed on the AIP.

With  split  operations,  the  SF  comment  is  only  stored  for  the  split  operation  where  the  SF

comment has been recorded. The SF comment is not transferred to the split master.

5.13.2  Documents

You  can  display  documents,  graphics  or  other  files  on  the  AIP,  which  are  listed  in  the  table  in  tab

Documents.

Select an entry in the list and touch/click the button Open document. The file is downloaded to the AIP

and displayed using an internal viewer or an external application (according to the file extension).

Internal viewer

Supported  formats  for  the  internal  viewer:  txt,  ini,  avi,  tif,  tiff,  jpg,  jpeg,  dcx,  eps,  ico,  pcx,  pcc,  png,

ppm, pgm, pbm, tga, vst, afi, wmf, emf, bmp.

Supported formats for external HTML viewer: htm, gif, wmv, mpg,

External applications

You  must  install  external  applications  if  other  file  formats  (file  extensions)  than  the  ones  mentioned

above are used (e.g. PDF files). The customer is responsible for the installation.

http links as document references

You  can  also  pass  http  links  to  a  browser  for  display  without  having  to  download  a  file  beforehand.

Use  a  path  with  the  ”http”  schema  (paths  are  configured  on  the  client  via  System  administration  >

System settings > Paths).

These links are displayed using the internal HTML viewer provided by the AIP. The file extension does

not affect the selection of the viewer.

Also the default browser configured in Windows can be used for the display. To do so, configure the

following option in the “hytnrcfg.ini” file:

AIP-BMD_82.docx

Page 49 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

[Terminal->USR 0]

HTTPBrowser=standard

This  setting  is  not  recommended  for  an  AIP  with  touch  screen,  because  the  operation  of  a  browser

can lead to problems.

5.13.3  Tools, Resources

The tab Tools, Resources displays the production resources and tools required for an operation.

Note: Documents are displayed separately in tab Documents.

5.13.4  Components

The tab Components displays the material components required for the operation.

5.13.5  Progress

The  tab  Progress  displays  information  on  the  status  of  the  different  operations  of  the  order  that

includes also the currently the selected operation. The below-mentioned data is shown:

  Order
  Operation
  Operation designation
  Color of the status according to the control indicator of the status:
  S – (no color), V – gray, L – light green, U – yellow, E – green

  Status (text) of the operation
  Target quantity of the operation
  Quantity unit of the operation
  Yield that has been posted so far for the operation
  Quantity unit of the operation
  Workplace that is assigned to the operation according to the order management. It does not

matter if the operation is planned for this workplace or not.

  Group the workplace is assigned to according to the workplace configuration.

5.13.6  Resource performance accounts

In  tab  Resource  performance  accounts,  the  following  information  is  displayed  for  the  resource

performance accounts (RPA) 1 to 11 of the current operation:

  RPA abbrev.

AIP-BMD_82.docx

Page 50 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

  RPA designation

  Posted duration in hours:minutes

  Total duration = total of all times of RPA 1...11

The durations are displayed in a graphic (to the right).

5.14  Machine information (machine info)

The machine information dialog provides the views and functions listed below.

5.14.1  Description

The tab Description shows information on the machine/workplace

Workplace/machine

Number of the workplace/machine according to configuration

AIP-BMD_82.docx

Page 51 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

Short name

Short name of the workplace/machine according to configuration

Group

Group the workplace/machine is assigned to according to configuration.

Partitioning

The current partitioning and the incoming cycles are used to calculate the number of parts per

cycle posted for the workplace/machine.

Target cycle

Current target cycle used to monitor the workplace/machine.

Status

Current status

Status since

Point in time that specifies the beginning of the current status.

Duration

The duration specifies how long the current status has been available.

Yield

If the workplace has been configured as MDE workplace, this field shows the yield that has been

posted in the current shift up to now.

Scrap

If  the  workplace  has  been  configured  as  MDE  workplace,  this  field  shows  the  scrap  that  has

been posted in the current shift up to now.

Cycles

If the workplace has been configured as MDE workplace, this field shows the cycles that have

been recorded in the current shift up to now.

AIP-BMD_82.docx

Page 52 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

5.14.2  Registered persons

This overview shows the staff currently logged on to the workplace.

Use the following buttons to perform postings for staff:

  Log on person,

  Log off person or

  Log off everyone (on the next button page)

Click Close information to get back to the main view.

AIP-BMD_82.docx

Page 53 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

5.14.3  Status log

At first, the table shows the following events of the current shift:

  All machine/workplace statuses

  Production lock (set manually, removed manually)

  Postings relating to orders (OP logged on, OP interrupted, OP logged off)

  Postings relating to staff (person logged on, person logged off)

Use the buttons

 and

 to scroll back and forth shift by shift. You can configure for the

specific  terminals  how  many  shifts  you  can  scroll  back  and  forth.  Use  the  following  option  in  the

hytnrcfg.ini (3 shifts by default):

AIP-BMD_82.docx

Page 54 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

[MDE->Options 0]

MSTAT.SKNRRANGE=3

In the above example, the  screen shows shift 1  if  you click

 in shift 3.  Scrolling  back has the

same behavior.

Subsequent assignment of reasons

If the machine monitoring function is active, the status switches to the “not assigned” status in case of

an absence of signals. When the malfunction has been removed, the machine immediately switches

into the production status. The operator cannot enter a reason for this status.

In the status log, you can now list these statuses without reason and subsequently assign a reason to

the statuses.

Statuses without reason are statuses that the system has automatically set from "not assigned"

to "production" in the course of an active machine monitoring. The production indicator “general

disturbance” is assigned to this status and the relevant time is posted for this status.

If  an  operator  manually  sets  a  status,  this  status  usually  has  a  reason  assigned,  also  if  the

operator uses the production indicator “general disturbance”.

If  you  enable  the  checkbox  Display  statuses  without  reason  only,  you  can  filter  the  list  and  directly

show the statuses without reason only (i.e. automatically assigned reasons). These statuses can then

be  changed.  Note: When  you  have  changed  the  selection,  you  must  reload  the  list  using  the  green

arrow button!

The  Change  status  button  gets  active  when  you  select  a  status  without  reason.  You  cannot  change

statuses set manually by the user. The button is grayed out (disabled).

If you click the Change status button, you can subsequently assign a reason to this status.

Note

Restriction:  Only  the  MDE  data  (log  records)  is  changed  when  you  subsequently  assign  a

reason. Postings of other objects (e.g. BDE log records) are not changed.

You cannot subsequently assign reasons to "Short-term disturbances/malfunctions".

AIP-BMD_82.docx

Page 55 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

5.15  Merged operations

General information

You  use  these  functions  to  create  or  to  end  “merged  operations”  (MOP)  on  the  AIP  terminal.  A

merged operation includes a group of single operations. The system records the time for the merged

OP and proportionally distributes the time to the single OPs. Each person can manage a maximum of

one merged operation.

You require a license to use the functions for merged operations on the AIP.

To  merge  operations,  you  must  click  the  button  Log  MOP  on  in  the  workplace  screen.  Merged

operations  are  logged  off  and  interrupted  like  single  operations  using  the  Interrupt  operation  or  Log

operation off buttons.

With  merged  operations  created  on  the  terminal,  you  can  only  perform  logon/logoff/interrupt

postings on the terminal. The same also applies to the single operations included in a merged

operation. Postings on the MOC are not possible.

Also  note  that  there  are  some  restrictions  for  merged  operations  that  are  described  in  the

documentation  MBL_CollectiveOperationProcessing.pdf.  Not  all  postings  are  possible  that  are

possible with normal operations.

5.15.1  Log merged operation on

You can combine up to 20 operations to form one merged operation. On the AIP, only one operation

(the new merged operation) is then displayed in the list of running operations..

Posting process

Select  a  workplace,  before  you  log  on  a  merged  operation.  When  you  then  call  the  dialog,  the

workplace field is already populated.

Calling the function Log MOP on

Click the Log MOP on button in the workplace dialog. The user is navigated through the dialog.

Choose status

Enter the status number. Optionally, you can also enter the estimated duration and a comment.

Choose operation

Select  all  single  operations  from  the  list  that  you  want  to  integrate  in  the  merged  operation.

Manually select the operations in the list as usual.

AIP-BMD_82.docx

Page 56 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

When  you  have  selected  the  single  operations,  click  the  button  Add  operation.  All  selected

operations are displayed in green in the list:

Staff badge number

Enter  the  staff  badge  number  here.  With  merged  operations,  the  person  is  always  logged  on

with the operation, i.e. a separate staff logon is not possible.

Confirmation via Start merged operation

The  specified  operations  are  immediately  logged  on.  If  the  terminal  is  ONLINE,  the  system

makes a validation check for all entries.

When  the  merged  operation  is  successfully  logged  on,  an  entry  in  the  order  overview  is

generated.  This  entry  includes  the  characters  “SAM-“  for  merged  operation  and  the  badge

number (e.g. 0160). The merged operation of the example would therefore be: SAM-0160.

5.15.2

Interrupt/log merged operation off

You  interrupt  or  log  off  a merged  operation  like  single  operations.  Select  an  operation  named  SAM-

<badge number> from the list of running operations.

AIP-BMD_82.docx

Page 57 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

Posting process

Select the workplace and the merged operation that you want to log off.

Calling the function

Click the button Interrupt operation or Log operation off.

Log merged operation off

Enter the badge number of the person who performs the logoff.

Choose status

Enter the status number. Optionally, you can also enter the estimated duration and a comment.

Choose operation

If the entry of quantities is configured for merged operations in the terminal configuration, a list

of  the  different  operations  is  displayed.  To  upload  part  quantities,  you  can  select  the  relevant

single  operation,  enter  the  required  quantity  and  click  the  button  Partial  confirmation.  The

system  does  not  immediately  upload  the  quantities  entered  here.  The  quantities  are  only

uploaded when you confirm the dialog by clicking the button Interrupt/Log off merged operation.

If  the  dialog  is  canceled  (ESC  key  or  Cancel  button),  the  dialog  is  closed  and  no  data  is

uploaded. The partial confirmation is discarded.

Confirmation of the dialog Log off/Interrupt merged operation

The merged operation is logged off or interrupted when you confirm the dialog.

If  the  order  is  properly  logged  off,  the  merged  operation  is  unmerged.  After  interruption,  the

single operations are available again in the sequencing list.

The quantities are posted according to the configuration and using the part quantities uploaded.

Further notes



If you do not enter a quantity with the function Interrupt merged operation, then no quantities

are posted. With the function Log merged operation off, the target quantity is booked as yield

quantity.



If you interrupt a merged operation, the system interrupts all single operations assigned to the

merged operation. As a result, the sequencing list does not include the merged operation after

interruption,  but  the  single  operations.  If  you  want  to  log  on  a  merged  operation  again,  you

must again select or assign the single operations.

AIP-BMD_82.docx

Page 58 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

6  Specific Features of Machine Data Collection

The  functions  described  in  the  paragraphs  that  follow  are  only  active  at  workplaces  that  fulfill  the

following requirements:

  The machine/workplace has been configured as “single workplace”

  The  machine/workplace  is  assigned  to  a  terminal,  which  is  configured  with  operation  mode

“MDE”.

If the AIP2 is in use, machine data collection and its functions are completely performed via PCC. The

following functions are visualized by the AIP2, but triggered and executed by the PCC.

These functions are not available for group workplaces.

To  ensure  proper  processing  and  posting,  terminals  with  "MDE"  operation  mode  must  not  be

switched off during times without shift.

6.1  Shift automatic

A shift model has to be assigned to each workplace/machine. Due to the information given by this shift

calendar,  the  PCC  is  able  to  identify  automatically  the  beginning  and  end  of  shifts  for  its  assigned

machines.

The shift automatic option activates functions facilitating data collection and operability:







the OP that is logged on is automatically interrupted at the end of the shift.

if configured accordingly, this OP is logged on again when the next shift starts.

staff can log on in advance to a terminal within a specified period of time before the beginning of

the shift. When the shift starts the next time, the terminal logs them on to the OP. This period of

time is defined in the Terminal configuration (option: Waiting period for advance logon of staff).

You must perform changes to the shift model at an early stage because the PCC reads the

shift data only at cyclic intervals from the HYDRA server (by default every 50 minutes).

The following diagram shows a time flow of logons and logoffs during a shift change.

AIP-BMD_82.docx

Page 59 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

Description of the process

1)

An OP was logged on during shift 1 and its production continues in the following shift 2.

2)

Person 1 logs on to the workplace.

3)

Person  2  arrives  shortly  before  the  shift  ends  and  logs  on  to  the  workplace.  Since  the  logon

takes place  within the 30  minutes of advance logon  time, the terminal recognizes an advance

logon.

4)

The registered OP is automatically interrupted when shifts end and staff logged on is logged off.

5)

The  OP  interrupted  beforehand,  is  logged  on  again  when  the  shift  starts.  Staff  logged  on  in

advance is still logged on.

6.2  Machine monitoring in general

If you connect a machine to a shop floor terminal, the automatic data collection is possible.

  Collection of production times and downtimes



  Direct  assignment  of  malfunction  reasons  by  collecting  operating  signals  from  machine

control systems

  Collection of quantities in different quantity accounts (yield, scrap, rework, open quantity)

AIP-BMD_82.docx

Page 60 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

If you want to use the machine monitoring function via a machine signal, you must first define relevant

machine  statuses.  In  addition  to  the  production  status,  all  status  reasons  that  are  relevant  for  the

HYDRA  collection  are  created  for  a  machine.  The  user  may  configure  them  individually.  By  default,

HYDRA only displays and posts one status at the time of consideration. Only this way, you can ensure

that production times and downtimes are considered in the correct chronological order.

The  monitoring  type  is  configured  in  the Workplace/machine  configuration  (tab  MDE  configuration  >

Monitoring type). The following values can be set:

Cyclic monitoring

monitoring cycle times

Monitoring via operating signal

Monitoring operating signals

No monitoring

Here,  it  is  possible  to  define  a  new  machine  status  at  all
times.  Also
the  “Production”  status  must  be  assigned
manually on the terminal.

6.3  Monitoring of cycle time

6.3.1.1

Terms and definitions

Target cycle

The target cycle is a planning value specifying the pulsing of a machine to produce an article. Its

value may depend on different factors, e.g. on the tool or material to be used.

The  target  cycle  does  not  depend  on  the  number  of  produced  parts.  In  HYDRA  it  is  recorded

and processed as duration per 1000 machine cycles.

For  the  cycle  time  monitoring,  the  value  of  the  target  cycle  is  used  as  default  setting  for  the

production of the operation.

Cycle extension

The cycle extension is a percentage to extend the target cycle. It can be entered in a range from

0  to  5000.  It  is  used  to  balance  possible  fluctuations  during  machine  monitoring.  The  cycle

extension is offset against the target cycle. A value less than 100 is a shortened cycle; a value

greater than 100 is an extended cycle.

The  Cycle  extension  is  configured  in  the  Workplace/machine  configuration  (tab  MDE

configuration > Cycle extension).

AIP-BMD_82.docx

Page 61 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

Minimum cycle time

The minimum cycle time is a kind of “minimum value” used for monitoring cycles, if the product

of  target  cycle  (set  manually  on  the  terminal  or  implicitly  with  OP  logon)  multiplied  by  cycle

extension is less than this  minimum cycle time. Thus, the minimum cycle time is configured at

the machine and independent of the article to be produced or tool to be used.

The  Minimum  cycle  time  is  configured  as  a  value  in  seconds  in  the  Workplace/machine

configuration (tab MDE configuration > Monitoring > Min. cycle/disturbance time).

Minimum cycle time: Special features when using DS-100

If  you  use  DS-100,  the  minimum  cycle  time  is  adapted  to  the  technical  communication

possibilities. Also the number of connected DS-100 devices to a terminal is considered.

The  system  (PCC)  identifies  the  number  of  connected  DS-100  devices  and  calculates  the  so-

called DS-100-Minimum cycle time:

DS-100-Minimum cycle time [sec] = <number of connected DS-100> * DS-100-factor

If  the  DS-100-Minimum  cycle  time  is  longer  than  the  configured  minimum  cycle  time,  the  DS-

100-Minimum cycle time is then used to calculate the default cycle time.

The DS-100-factor is by default: 1.0 [sec]. If necessary, it can be adapted in the mdeb2.ini, e.g.:

[INIT]

DS-100_MACHINE_COUNTCYCLEFACTOR = 0.8

Example

Five DS-100 are connected to one terminal.

The minimum cycle time stored in a workplace is 2 seconds.

DS-100-minimum cycle time = 5 x 1.0 second = 5 seconds

As  the  DS-100-Minimum  cycle  time  is  longer  than  the  minimum  cycle  time,  a  minimum  cycle

time of 5 seconds is then used in processing. This time is now used to define the default cycle

time.

6.3.1.2

Definition of the default cycle time for the machine monitoring

The longest target cycle is always determined from all OPs logged on to a machine for the  collection

of cycle times: max(SZYOP1..n)

Afterwards it is checked whether this target cycle multiplied by the cycle extension is greater or equal

to the minimum cycle time. If this is the case, this target cycle is multiplied by the cycle extension and

used  as  monitoring  cycle.  If,  however,  the  minimum  cycle  time  is  greater,  this  minimum  cycle  time

(without cycle extension) is used as monitoring cycle.

AIP-BMD_82.docx

Page 62 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

If both, the minimum cycle time and the target cycle stored for the operation, are 0, the default cycle

time is set to 60000 seconds [per 1000 machine clocks].

6.3.1.3

Processing

NOT
ASSIGNED

If the machine transfers counter pulses to the PCC via an interface, the PCC automatically switches to

the status "Production".

In the event counter pulses fail to appear, the PCC waits for the default cycle time z and sees if the

machine  still  sends  a  counter  pulse.  If  this  is  not  the  case,  the  PCC  interprets  this  as  a  malfunction

and  changes  the  status  of  the  machine  into  30000  “not  assigned"  [1].  This  status  refers  to  a

malfunction that has not been confirmed.

If  the  user  now  confirms  this  malfunction  by  assigning  a  specific  status  [2],  the  length  of  time  since

counter pulses failed to appear is posted back to this status.

If  the  machine  restarts  to  send  counter  pulses  to  the  PCC  via  an  interface  [3]  [6],  the  PCC

automatically switches to the status "Production".

If the operator did not assign a reason to this malfunction and if the PCC switches back to production

because  of  signals  [6],  this  length  of  time  without  malfunction  reason  is  posted  back  to  the  status

"General disturbance" [5].

AIP-BMD_82.docx

Page 63 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

If

the  machine  constantly  switches  between

the

"production"  and

the  "not

assigned/general  disturbance"  status,  you  must  check  the  machine  connection  or  the

combination  of  target  cycle  and  cycle  extension.  If  necessary,  you  must  adapt  the

minimum cycle time.

You can only enter or change a status, if the active status is not "production".

If  the  operation  with  the  longest  target  cycle  is  interrupted  or  finished,  the  operation  with  the  next

longest target cycle is used for collecting cycles. In this case, the logic described beforehand applies

again. Once the last operation is logged off, the last used target cycle is kept as target cycle.

6.4  Monitoring of operating signals

6.4.1.1

Terms and definitions

Minimum malfunction time

If you select the monitoring type Operating signal, the minimum disturbance time is specified in

this field.

The  minimum  disturbance

time

is  a

time

in  seconds.

It  defines

the

time

that  a

malfunction/disturbance must continue before the machine changes from the status "Production"

to the status "Not assigned".

If  operating  signals  are  monitored,  the  status  is  directly  changed.  You  can  use  the  following

explicit  option  in  the  MDEB2.ini  to  disable  this  behavior  (deactivation  of  direct  status  change).

Result: the status is only changed when the minimum disturbance time has expired:

MDEB2.INI

[INIT]
;Activating the direct status change (globally or for a specific machine)
SetMStatusDirect=1
SetMStatusDirect@<machine number>=1

;Deactivating the direct status change (globally or for a specific machine)
SetMStatusDirect=0
SetMStatusDirect@<machine number>=0

AIP-BMD_82.docx

Page 64 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

6.4.1.2

Processing

If  the  machine  sends  an  operating  signal  via  the  interface,  the  PCC  automatically  switches  to  the

status  "Production".  The  input  for  the  operating  signal  must  be  defined  in  the  status  assignment

(menu:  Master  data    Workplaces/Machines    Status  assignment,  tab  Status  change,  option

Automatically via digital input).

Processing with direct status change

If  this  signal  is  no  longer  available,  the  PCC  interprets  this  as  a  malfunction  and  changes  the

status of the machine to 30000 “not assigned" [1]. This status refers to a malfunction that has not

been confirmed.

Processing with deactivated direct status change

ctwin_Zeichnung_16.06.2005_II.VSD

If this signal is no longer available, the PCC waits for the minimum disturbance time d. If the signal

is  still  not  available,  the  PCC  interprets  this  as  a  disturbance  and  changes  the  status  of  the

machine  to  30000  “not  assigned"  [1].  This  status  refers  to  a  malfunction  that  has  not  been

confirmed.

AIP-BMD_82.docx

Page 65 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

If the operator now confirms the malfunction by assigning a specific status [2], the time since operating

signals have not been recorded ([1]) is posted back to this status.

If the machine restarts to send signals to the configured input [3],  the PCC automatically switches to

the status "production".

If  the  operator  did  not  assign  a  reason  to  this  malfunction  and  if  the  terminal  switches  back  to

production  because  of  signals,  this  length  of  time  without  malfunction  reason  is  posted  back  to  the

status "General disturbance".

If

the  machine  constantly  switches  between

the

"production"  and

the  "not

assigned/general  disturbance"  status,  you  must  check  the  machine  connection.  If

necessary, you must adapt the minimum disturbance time.

You can only enter or change a status, if the active status is not "production".

6.5  Lock production status (production lock)

During machine monitoring, the function Lock production status prevents the status "Production" from

being automatically set because of an incoming production signal (clock pulse, operating signal). The

production  lock  can  also  be  used  to  determine  whether  and  how  quantities  (counter  readings)  are

posted during this time.

Consequently, the status set here overrides the production signal until the production lock is manually

deactivated on the terminal. If the machine sends new signals, the PCC does not automatically switch

to the status "Production". Thus, switching to “production” is disabled (“production lock”).

If  a  workplace/machine  is  unable  to  switch  to  the  “production”  status,  the  terminal  visualizes  this  by

displaying an exclamation mark ("!") in the "machine information" dialog.

In this case, the current status remains – despite the machine pulses received.

All  items  produced  during  the  locked  status  are  either  posted  as  yield,  scrap  or  not  at  all.  That

depends on the configuration of the workplace.

The  production  lock  may  be  enabled  or  disabled  explicitly  by  clicking  the  button  "Lock  production

status".

If the workplace/machine status is configured accordingly (menu: Master data > Workplaces/machines

>  Status  assignment),  the  production  lock  may  also  be  set  automatically,  i.e.  along  with  setting  a

status.

AIP-BMD_82.docx

Page 66 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

Authorization check when setting the production lock manually

You can configure that only if a relevant authorization is available, the person is allowed to manually

(explicitly) set or remove the production lock.

For  this  purpose,  the  dynamic  dialog  M_PSPERRE  must  be  activated  (customizing).  If  this  dialog  is

activated, you must enter the staff badge number.

If the dialog is active, it opens when the operator clicks the button “lock production status”. Once the

badge number has been entered, it is checked  whether this person is  authorized to activate/remove

the production lock. The system checks, if the option Change of production lock in the HR master data

(tab Shop floor data) is enabled.

If  the  terminal  is  OFFLINE,  the  terminal  configuration  specifies  the  behavior  (option  Checking

required).

Logging of the production lock

The  manual  activation/deactivation  of  the  production  lock  is  recorded  as  an  event  in  the  server  and

may be evaluated in the machine history.

.

But if the production lock is enabled or disabled implicitly by a status change, no specific event will be

recorded and, as a result cannot be evaluated in the client.

In case a machine is locked for production and the AIP2 terminal together with the PCC are restarted,

the  production  lock  is  automatically  disabled  after  the  restart.  The  changed  production  lock  is  not

logged.

6.6  Machine lock

You  can  define  for  each  status  whether  it  should  trigger  a  “machine  lock”.  This  can  be  configured

(Status assignment > tab: Control > Set machine lock output).

If  you set a machine  lock, an output is  being set,  which may trigger  a relay. In this case, the  logical

output  is  defined  in  the  Workplace/machine  configuration  (tab:  MDE  configuration  >  inputs/outputs  >

machine lock).

Notes on using the machine lock on DS-100 terminals

The value “1” has to be entered in the field “Machine lock” of the Workplace configuration (tab: MDE

configuration > Inputs/outputs), provided that the relay is to be set for the DS-100 terminal.

AIP-BMD_82.docx

Page 67 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

The relay is set for all statuses assigned to the “machine lock” as well as for the “not assigned” status.

6.7  Output “Target quantity reached"

An output may be set to trigger a lamp via a relay (to be provided by the customer), when the target

quantity of the currently registered operation has been reached.

The logical output is defined and configured in the menu: Master data > Workplaces/machines > tab:

MDE configuration > Inputs/outputs > Target quantity reached.

The target quantities of a machine are checked:

  after restart

  after changing the target quantity using the corresponding posting dialog on the AIP2 terminal

  once an operation has been logged on, off or interrupted on the AIP2 terminal

  after posting manual quantities (partial confirmation) on the AIP2 terminal

  after local quantity events of the MDE product group (automatic quantities)

If several operations are logged on to a workplace/machine at the same time, the logical output is set

as soon as the target quantity has been reached for one of the orders. The signal will be reset if this

OP is interrupted.

6.8  Scrap reasons depending on status & production lock

Two scrap reasons can be defined for a status. One scrap reason is applied, if the production lock is

activated (see section  Lock production status (production lock)), the other scrap reason is applied, if

the  production  lock  is  inactive.  If  a  scrap  reason  is  defined  for  the  status  currently  available  at  the

machine, the counted scrap will be posted with this specified scrap reason.

If a scrap reason is configured at the counting input, this one takes priority. Consequently, if a specific

scrap  reason  is  assigned  to  a  counter,  this  scrap  reason  takes  priority  even  if  another  reason  is

configured for the currently available status.

AIP-BMD_82.docx

Page 68 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

6.9  Setting of outputs depending on status and posting

scenarios

By way of an advanced configuration, digital outputs of the machine may be set if a specific machine

status  and  a  defined  posting  scenario  coincide.  Further  details  on  this  configuration  can  be  found  in

the document entitled MDE_digital_output_depending_on_scenario.pdf.

Please note the following for the local administration of the machine status in the terminal:

If  status  changes  are  posted  using  SMA,  PDM  or  on  another  terminal,  the  machine  status  is  only

transferred  when  reloading  the  machine  list,  if  this  has  been  configured  explicitly  via  the

“FollowExternStatus“ option:

HYTNRCFG.INI

[Tnr Konfiguration 0]
FollowExternStatus=on

When  the  status  is  changed  by  reloading  the  list,  the  terminal  checks  the  configured  logical  outputs

and sets or resets them, if required.

6.10  Manually set status vs. automatically set status

A manually and an automatically set status result in different system behaviors.

A status that  is set manually takes priority to a certain degree and cannot  be overwritten by another

status if an input signal is available, for example. The only exception is status Production: This status

also  overwrites  the  manually  set  status.  A  status  that  is  set  automatically  can  be  overwritten  by  an

input signal (irrespective of the status).

The information whether a status is set manually or automatically is saved and remains available.

Special  feature  with  status  999:  If  a  status  999  was  set  manually  before  shift  change,

then the system changes this status to an automatically set status 999 with shift change

if this is activated for the day type (weekend automatic). The behavior after shift change

is then the standard behavior that applies with an automatically set status.

AIP-BMD_82.docx

Page 69 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

7  Barcode Input

A barcode is machine-readable information, which may also directly be generated within the shop floor

system. The principal reading devices used are: barcode scanners, swipe card readers or scanners.

By default, the terminal supports the barcodes "39", "128" as well as ”interleaved 2 of 5 "

Only  barcode  readers  connected  to  the  serial  interface  (COM  interface)  can  identify  barcodes

and assign them automatically to the respective  input fields at the terminal. This is impossible

for barcode readers “connected” via keyboard.

Barcode structure for operations

*AAAAAAAAAAAAGGGGG*

Place

Name

Min.

Max.

Example

length

length *

*

Asterisk

A

F

G

S

*

Order number

Sequence number

Operation number

Split number

Asterisk

1

1

0

1

0

1

Length of BDE order barcode without asterisk (example)

1

  *

12

  2

  4

  2

1

  8

  0

  3

  0

  *

11

* Depends on the configuration of field lengths in HYDRA's basic parameter settings

Barcode structure for machines/workplaces

*MMMMMMMM*

Place

Name

Min.

Max.

Example

*

Asterisk

M  Workplace/ machine number

length

length

1

8

1

8

*

8

AIP-BMD_82.docx

Page 70 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

Place

Name

Min.

Max.

Example

length

length

*

Asterisk

1

1

Length of machine/workplace barcodes without asterisks

*

8

To identify a barcode as a machine/workplace number, the barcode must be 8 characters long.

If the machine/workplace number is set to “numerical” in the basic parameter settings,  it has to

be

filled  up  with

leading  zeroes

to  reach  8  characters.

In  case  of  alphanumeric

machine/workplace  numbers,  they  have  to  be  filled  up  with  underscore  characters  ("_")  to  the

right.

Barcode structure for machine statuses

*NNNNN0*

Place

Name

Length

*

N

0

*

Asterisk

Machine status, with leading zeroes

Always "0"

Asterisk

Length of status barcodes without asterisks

1

5

1

1

6

AIP-BMD_82.docx

Page 71 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

8  AIP configuration of barcodes

8.1  Configuration in ctaip.ini

Readers are configured in section [comports] of the file ctaip.ini:

Section [comports]

COM1=0
COM2=0
COM3=0
COM4=0
COM5=0
COM6=0

Possible initializations of comports                                      COMx=0
=> is not used (by default)
COMx=BAR
COMx=PSTD             PLEASE NOTE! Only starting from reader
firmware 69355E
COMx=LEGIC
COMx=PLG
COMx=RFLESER                                                                                                                              COMx=MSS
Entry
"Schlagbaum"
COMx=SLGB
readers
U-Key
COMx=UKEY
Byte 12 and 13 set up the badge/ID card number
number
01010D01|0E020000|04000003|E7175600
999

e.g.:
03E7  
1756  company number  5974

number  

readers  of

company

badge

type

Byte

and

the

the

set

up

for

14

15

COMx=KABALEG

Kaba Benzing Legic
With Bedanet 9580 always COM4
7 bytes are transferred as of byte 15
XXXXFFFFKKKKKK
F:= company number
K=badge number

COMx=MBB-S6

COMx=DRV_UCR

Please  note!  This  reader

MBB-S6 reader
Attention!
requires
(ECHO=OFF RTS=High)
Comports masking has to be set for CLEA + DEUT
MBB-S6-MASK=XXXXXXXXXXKKKKKK

the  RS-485  converter

type
to  be  modified

New LEGIC Advant PZE/MF reader.
required  for  new  PZE  readers.  The  names  of  these
readers include "LGA".
Please  note:
If  badges/ID  cards  are  used  not
complying  with  MPDV's  standard  ID,  the  following
parameter  must  be  used
in  section
[Comports-Mask]:
DRV_UCR-MASK=....

for  masking

COMx=PLG-CRYPT  New LEGIC Advant ZKS reader

required  for  new  ZKS  readers.  The  names  of  these
readers include "LGA".
It might be necessary to customize the file plg_crypt.ini
for specific customers

Set this parameter if Kabalegic and badges/ID cards with MPDV
ID are used

AIP-BMD_82.docx

Page 72 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

  KABALEGM=ON
By default, the Kaba Benzing badge ID is used. In this case the
parameter is to be commented out

As of ctaip #V 2.0.2.27

Read out Kabalegic using configurable search string (e.g. 4F)
  KABALEG-SEARCHSTRING=XX
Correct configuration takes priority (2 places, values 0..9,A..F)

Section [Comports-Mask]

Example

LESERTYP+'-MASK' =Masking

applicable abbreviations for masking
'T'           = Telegram number
'L'           = Reader number
'F'           = Company number
'K'           = Badge/ID card number
'E'           = Replacement number
'P'           = Check digit (not implemented)
otherwise e.g. 'X' = Placeholder (character to be ignored)

Examples:
SLGB-MASK=TTTTLLFFFFFFKKKK

BAR-MASK=
MBB-S6-MASK=XXXXXXXXXXKKKKKK

Masking for readers of the type "Schlagbaum":

TTTTLLFFFFFKKKK  = Data string of the reader

The badge number may be recorded at every position of the data string
Please note!! Impossible for PLG // Status 15 October 2003 DB

The below section has been designed for the configuration of (PLG) Polling Legic Readers or (PSTD)

Polling Swipe Card Readers. These readers are mostly used for PZE/ZKS terminals (CT-380) or ZKS

terminals (CT-385).

Section [init]

AIP-BMD_82.docx

Page 73 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

PlgTimeOut=2

 TimeOut when starting polling

FreischaltungZyklus=3

 Cycle for activating/releasing access

MaxComError=15

UngueltigZyklus=300

InitComError=50

MSSImmediateWrite=false

Leser-4-Hupe-Aktiv=true

LnrErrorPCnt=100

PinCodeLen=4

ComResetTimer=5

ReInitComport=true

 Maximum number of communication errors until access is in
"malfunction"

 Cycle for sending the status "invalid“ (invalid badge) in order
to re-initialize the reader

  Number  of  communication  errors  in  order  to  re-initialize
Comport

  ZKS  immediately  activates  channels  for  MSS  connection
        ( true = not efficient)

  Enables  an  acoustic  signal  (buzzer/horn)  for  the  status
"valid" (valid badge)

  Polling  is  only  performed  with  every  n-th  attempt  if  the
reader
is
     in the status "malfunction=e". (priority polling)

 Length of PIN code input

 Minimum cycle for comport re-initialization
Activation of automatic comport re-initialization
 by default = false ( = without automatic re-initialization )

The  below  section  has  been  designed  to  configure  MBB  readers  triggered  via  a  thread  in  a  DLL.

These readers are only used for ZKS terminals (CT-385).

AIP-BMD_82.docx

Page 74 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

Section
[MBB-S6-configuration]

MinMSecDauerOeffner=200

 MinMSecDauerOeffner = Minimum duration "door opener"
      in MSec -> by default [ 200 ]

;****************************

;*** MBB-S6 - system settings (do not change) *******

ProcessMessages=true

ThreadSleep=20

 ProcessMessages = Processing of Windows messages
while
     waiting for the application result -> by default [ true ]

 ThreadSleep = Sleep in MSec of MBB-DLL while waiting
      for application result -> by default [ 20 ]
      range of values [10 .. X] -> changes might
       lead to increased CPU loads or bad response times

8.2  Configurations in hytnrcfg.ini

Entry

Comment

Section [Terminal->USR 0]

SuppressBarcodeError=On

OnBarcode=P_AN

BarcodePrefixChar=$

ON-KNR-CODE=<Dialog>

(By default "M_INFO.PERS“ )

Suppresses messages such as 'Barcode ... is wrong', etc.
Required  if  the  barcode  is  processed  in  the  script  and
normal
the
barcode

identification  processes  cannot

identify

If  the  AIP  basic  screen  is  opened  and  a  barcode  is  read
in,  the  dialog  P_AN  opens  instead  of  the  dialog  M_MST.
The scanned badge/ID card number is transferred.

Configuration  of  an  alternative  separator  for  barcode
prefixes.
Can  be  used  if  a  dot  not  used  as  prefix  identifier  is
included at the third place of a real barcode.

As of V# 2.0.2.57
Configures  the  dialog  that  opens  from  the  main  dialog
when  scanning  the  staff  badge/ID  card  number  using
readers such as Legic, Kabaleg, UKey, .

8.2.1  Notes/configurations for concurrent lengths

Entry

Comment

Section
and/or

[terminal configuration 0]
[terminal configuration 2XXX];

( general configuration )
( 2XXX terminal-specific configuration )

ANR-COMPLETE-BARCODE-ONLY=TRUE

Option
to  avoid  processing  of
barcodes. (e.g. AUNR,AUNR+AFOLG,…)
-> The option is set to <FALSE> by default

incomplete  order

AIP-BMD_82.docx

Page 75 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

RIVAL-BARCODE-LEN-INFO-MSG=FALSE  Option  disabling  messages  indicating  that  barcodes

cannot be processed due to concurrent lengths.
-> The option is set to <TRUE> by default

Please note for configuration: the section may only be inserted provided it does not yet exist.

Sample configuration (for all terminals)

[Tnr configuration 0]
ANR-COMPLETE-BARCODE-ONLY=TRUE
BARCODE-LEN-INFO-MSG=TRUE

The  above  configuration  prevents  incomplete  order  barcodes  from  being  processed  at  all  terminals
(configuration for one terminal  with [TNR configuration 2xxx]  xxx=terminal number including  leading
zeroes "0"). If this option is set, only complete order barcodes will be processed. Consequently, valid
(  Please  note:  //-  ANR  (order
lengths for order barcodes result from added partial order lengths
number) parts with (*) may have the length '0' )




AUNR + AFOLG(*) + AGNR + UAGNR(*)
AUNR + AFOLG(*) + AGNR + UAGNR(*) + SPLNR(*)

The following message is shown if a barcode cannot be processed due to concurrent lengths:

Note [concurrent length]

A barcode (<VAL>)<n>whose field assignment (<IDS>)<n>cannot clearly be defined, has been

scanned.<n><n>Processing is only possible<n>if one of the fields indicated is focused.

AIP-BMD_82.docx

Page 76 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

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

AIP-BMD_82.docx

Page 77 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

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

AIP-BMD_82.docx

Page 78 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

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

AIP-BMD_82.docx

Page 79 of 120

08.09.20

Prefix

16.

Barcode

*16.123456*

AIP Functions Shop Floor Data / Machine Data

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

AIP-BMD_82.docx

Page 80 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

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

AIP-BMD_82.docx

Page 81 of 120

08.09.20

AIP Functions Shop Floor Data / Machine Data

AIP-BMD_82.docx

Version: 1.1.23167

Page 82 of 120

AIP Functions Shop Floor Data / Machine Data

10  AIP2 -Local Configuration

10.1  Local Configuration ctaip.ini

The most important hardware and  system settings are defined for each terminal in the CTAIP.INI file of

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
(functions\*.dll)
the
terminal.

from  being  synchronized  when  starting

VirtScreenSize=640

All windows are started with the indicated resolution

AIP-BMD_82.docx

Version: 1.1.23167

Page 83 of 120

Entry

VirtScreenRatio=16:9

Section [SKIN]

Saturation=0

Hue=0

Name=mpdv

Active=false

AIP Functions Shop Floor Data / Machine Data

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

Watchdog=on

ON: Watchdog is activated
OFF: Watchdog is not activated

AIP-BMD_82.docx

Version: 1.1.23167

Page 84 of 120

AIP Functions Shop Floor Data / Machine Data

Entry

Comment

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

the counter pulses,  which  were recorded  when the terminal  was

closed, are posted or discarded. The dialog closes automatically

with  "Yes"  after  an  entered  time  has  elapsed;  in  this  case  the

counting impulses are posted.

This value configures the time in seconds the dialog is open.

If the terminal is switched off for less than 15 minutes, no dialog

is  opened;  the  counting  pulses  recorded  in  the  switch-off  phase

are accepted and posted without confirmation.

Please  note:  The  value  can  also  be  configured  in  hytnrcfg.ini.

Entries in the hytnrcfg.ini file take priority.

AIP-BMD_82.docx

Version: 1.1.23167

Page 85 of 120

AIP Functions Shop Floor Data / Machine Data

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

FieldKNRBarcodeOnly=Y

If  this  entry  is  set  the  tool  number  may  only  be  entered  using  a
scanner.
If this entry is set the cavity number may only be entered using a
scanner.
If  this  entry  is  set  the  number  may  only  be  entered  using  a
scanner.
If this entry is set the badge number may only be entered using a
scanner.

AIP-BMD_82.docx

Version: 1.1.23167

Page 86 of 120

AIP Functions Shop Floor Data / Machine Data

Entry

Comment

BarcodeWNR=

BarcodeNest=

BarcodeNumm=

This field specifies which acronym is entered into the tool number
field by the scanner.
This  field  specifies  which  acronym  is  entered  into  the  cavity
number field by the scanner.
This  field  specifies  which  acronym  is  entered  into  the  number
field by the scanner.

10.2  PNG – Files / Bitmaps

The use of PNC files is recommended by MPDV. By default PNG files have a size of 24 x 24 px.

10.2.1  File pict.zip

The file "pict.zip“ is updated by the installation tool "inst32.exe“ while downloading and includes all default

PNG files.

The  default  PNG  files  can  be  overwritten  in  the  file  pict_cust.zip.  Several  PNG  files  have  the  extension

".small.png" (e.g. aip.small.png). These PNG files are used with a screen resolution of 640x480.

10.2.2  File pict_cust.zip

The file "pict_cust.zip“ is loaded from the server directory (e.g. \<serverDir>\1\custom)  when starting the

program (as is the case for the hycust.mld).

Customized PNG files may be stored in this file and loaded by the AIP2 terminal. Default PNG files may

also be "overwritten".

Please note: file sizes are not adjusted.

Customize header

The  AIP  icon  displayed  in  the  header  can  be  replaced  by  storing  a  separate  AIP.png  file  in  the

pict_cust.zip file.

This AIP icon will also be replaced in the "About" dialog.

AIP-BMD_82.docx

Version: 1.1.23167

Page 87 of 120

Customize footer

AIP Functions Shop Floor Data / Machine Data

The  MPDV  icon  displayed  in  the  footer  can  be  replaced  by  storing  a  separate  company.png  file  in  the

pict_cust.zip file.

Customize PZE dialog

The MPDV icon displayed in the PZE dialog can be replaced by storing a separate pze_mpdv.png file in

the  pict_cust.zip  file.  In  case  the  PZE  terminal  is  operated  with  a  screen  resolution  of  640x480,  a

customized pze_mpdv.small.png file has to be integrated in the pict_cust.zip file.

10.3  Multilingualism (*.mld files)

The below-mentioned files are required for the translation of the application. The table shows the priorities

for the translation, ownership and the relevant storage locations.

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

AIP-BMD_82.docx

Version: 1.1.23167

Page 88 of 120

AIP Functions Shop Floor Data / Machine Data

11  AIP2 - Central Configuration File hytnrcfg.ini

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

OnlyInstallFontsAfterDownload=fal
se

[Terminal->USR 0]

Transfer of machine statuses when reloading machine list.
Useful if status change is set by PDM or another terminal

If set to "off", fonts are not installed during restart.
ON=DEFAULT

If “InstallFonts=on”:
If  true,  then  fonts  are  only  installed  directly  after  a
download.  If  false,  then  fonts  are  installed  every  time  the
terminal is restarted.
(false = DEFAULT)

AIP-BMD_82.docx

Version: 1.1.23167

Page 89 of 120

AIP Functions Shop Floor Data / Machine Data

Section / Entry

Comment

AttachedApplication=First

Displaying  documents  of  OP  info: With  this  configuration,
the  system  first  checks  whether  or  not  an  application  is
linked  in  Windows  that  matches  the  file  extension  of  the
document.  This  application  is  then  used  to  display  the
document.
If no link is available, the viewers configured in ctaip.ini (
[ext.  software])  and  internal  viewers  are  used.  If  an
extension  is  completely  unknown,  the  system  tries  to
display the document as text .
Different settings are possible:

First  search for linked application first

AfterUserViewer    If  a  UserViewer  is  configured,  this
one  overrides  the  linked  application  (also  applies  to
ExcelViewer, WordViewer and PowerpointViewer)

Last  Only if no ctaip.ini assignment is found for the file
extension,
linked
application (default).

the  system  searches

for  a

then

HTTPBrowser=standard

Off    The  system  does  not  search
application.

for  a

linked

Display of documents (via OP info):
If documents are configured with a path of schema "http",
the  file  is  not  downloaded  to  the  terminal,  but  the  link  is
transferred to a browser.
The  default  browser  for  the  terminal  is  htmview3.exe,  as
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

If  the  terminal  is  switched  off  longer  than  15  minutes,  a
dialog is displayed on terminal restart. The user must then
decide  whether  the  counter  pulses,  which  were  recorded
when  the  terminal  was  closed,  are  posted  or  discarded.
After  a  configurable  period  of  time,  the  dialog  closes
automatically with "Yes" (Yes, posting of pulses).
This  value  configures  the  time  in  seconds  the  dialog  is
open.

If the backup file for counter pulses on the terminal is older
than 5 minutes, then no dialog is opened and the backup
file  deleted.  Quantities  recorded  at  the  time  when  the
terminal was closed are not used/posted.

This  configuration  specifies  whether  or  not  the  field  User
can be edited on the terminal (by default: no editing)
true    activates  keyboard  input  for  field  User  on  the
terminal

AIP-BMD_82.docx

Version: 1.1.23167

Page 90 of 120

AIP Functions Shop Floor Data / Machine Data

Section / Entry

Comment

Transparency=255

ShowPosition=TR

USE_SERVICE_ACCOUNT=1

SIGNATURE_1_USER_TYPE=REPORTING_U
SER_READONLY

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

0  (default)  SSO:  ServiceAccount
is  not  used
(requirement: the terminal must be started with the domain
"user" (SSO)).
Note: ServiceAccount=1 can only be used if all users are
in the "root" domain. SubDomain users are not supported.

REPORTING_USER_READONLY

identification  using

the  Windows  user

The  user
is
activated.  The  Windows  user  is  then  preassigned  in  field
User. The User field is read-only.
Requirement:  The  "SSO"  option  must  be  enabled  for  all
reporting  users.  Otherwise,  successful  authentication  is
not possible.

REPORTING_USER_CHANGEABLE

identification  using

the  Windows  user

The  user
is
activated.  The  Windows  user  is  then  preassigned  in  field
User. The User field can be edited.
Requirement:  The  "SSO"  option  must  be  enabled  for  all
reporting  users.  Otherwise,  successful  authentication  is
not possible.

AIP-BMD_82.docx

Version: 1.1.23167

Page 91 of 120

AIP Functions Shop Floor Data / Machine Data

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

The TAB for the user identification via User is locked. The
Windows user must be used for identification purposes.
Requirement: The "SSO" option must be enabled for all
reporting users. Otherwise, successful authentication is
not possible.

MIXED_BUT_UNIQUE
The  setting  of  option  "SSO"  specifies  whether  the  user
login or the Windows login is used.

"SSO" enabled  Windows only
"SSO" disabled  user only

Identical  to  SIGNATURE_1_LOGON_TYPE  (see
above)

Used  for  signatures  on  the  terminal  with  quality  data
collection.

Configuration of the files that are provided from the AIP to
the  MDEB2  blade  in  ANSI  format  when  a  combined
operation is available.

The following lists are transferred by default if the entry is
not available.
counters.lst|schicht.lst|mnr.lst|mstat.lst|
anr.lst|pnr.lst

If  you  want  to  transfer  further  lists,  you  must  specify  the
standard lists and the additional lists.

SIGNATURE_2_LOGON_TYPE=HYDRA

ExtendedSignatureRecording=true

[MDE/Blade Configuration 0]

CONVERT-TO-ANSI-
FILE=<list1|list2>

11.1  Layout configuration

Entry

Comment

Section
and/or

[terminal configuration 0]
[terminal configuration 2XXX];

( general configuration )
( 2XXX terminal-specific configuration )

AUTO-CONFIRM-UHR-ERROR-
MESSAGE=TRUE

This setting specifies that in case of an error that occurred
reading  the  clock  (e.g.  when  activated  after  standby

AIP-BMD_82.docx

Version: 1.1.23167

Page 92 of 120

AIP Functions Shop Floor Data / Machine Data

Entry

Comment

mode), the time is transferred  without confirmation  dialog
and the terminal time is later synchronized with the server
time via PDM command.

SUPPRESS-MAXIMUM-NUMBER-OF-
MACHINES-WARNING=ON

CalcTargetYieldSinceLogon=2

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

to

the  main  view  after

As  of  AIP  8.2.2.28:  If  this  option  is  set,  the  display
automatically  changes
the
configured  time  if  no  other  interaction  was  performed  in
the meantime.
The  changing  display  is  configured  via  the  option  Show
machine/OP
tab  MF
functions.

the  Terminal  configuration,

in

  List:

o  Change  from  the  detail  views  or  function  menus

(operation, person, resource, etc.)

AIP-BMD_82.docx

Version: 1.1.23167

Page 93 of 120

AIP Functions Shop Floor Data / Machine Data

Entry

Comment



o  Change to the main view with "tiles"
Icons:
o  Change from the detail views or function menus or

from the main view with tiles

o  Change to the icon view of workplaces

The  configuration  is  specified  in  seconds.  Do  not  specify
less than 10 seconds.
An automatic change to the start screen is not made if an
input dialog is open.

AIP-BMD_82.docx

Version: 1.1.23167

Page 94 of 120

AIP Functions Shop Floor Data / Machine Data

12  AIP2 - Local Configuration File keyboard.ini

You  configure  the  virtual  keyboard  of  the  AIP2  terminal  in  the  keyboard.ini  file  in  the  directory

c:\mpdv\aip2 for the specific terminal.

To activate the changes in the configuration file, you must restart the terminal software.

Logic enabling the virtual keyboard:

The AIP2 terminal shows the keyboard if an input field is focused. The keyboard is placed with reference

to the field as described below:

Logic for placing the virtual keyboard:

It is tried to place the keyboard directly below the input field. If there is not enough space to the bottom of

the screen, it is tried to place the keyboard directly above  the input field. If the space above the control

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

AIP-BMD_82.docx

Version: 1.1.23167

Page 95 of 120

AIP Functions Shop Floor Data / Machine Data

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

AIP-BMD_82.docx

Version: 1.1.23167

Page 96 of 120

AIP Functions Shop Floor Data / Machine Data

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

AIP-BMD_82.docx

Version: 1.1.23167

Page 97 of 120

AIP Functions Shop Floor Data / Machine Data

13  Start Menu Inst32

The terminal software is installed on a local hard drive of the terminal or a shop floor PC. After booting the

terminal, the following selection menu appears:

The following selection options are available in the selection menu (start by key or clicking)

[ A ]  Hardware Test   >>

Submenu for different hardware tests

[ B ]

Load Application

After an update from the HYDRA server, the application programs can be easily updated.

[ C ]  Configuration

[ D ]  Delete Files   >>

Submenu for deleting different files (data directories, queues, logs, application)

[ E ]

Tools   >>

Submenu for opening or installing different tools

AIP-BMD_82.docx

Version: 1.1.23167

Page 98 of 120

AIP Functions Shop Floor Data / Machine Data

[ F ]

Program – Start

Opening the application program. If nothing is entered, it will be started automatically after 20 seconds.

The <D> and <E> buttons are only used for service purposes.

If no button is pressed, the AIP2 application starts automatically after 20  seconds. Once the application

has started, a few  notes are displayed indicating the  version number, hardware  configuration  and other

service information. If everything (configuration and terminal) is in order, the display switches to the basic

dialogs  described  in  more  detail  in  the  sections  that  follow.  If  the  terminal  detects  hardware  or

configuration errors, it alerts the user by sending messages in plain text.

Submenu for opening or installing further [A] Hardware Tests    >>

[ 1 ]  MSS Test

(Hardware test for the machine interface / MSS)

[ 2 ]

Reader Test

(Hardware test for different reader connections / BAR, LEGIC, PLG, ...)

 [ 3 ]  LAN Test

(Hardware test of the network connection)

 [ 4 ]  Test Apps  >>

(Test applications of any kind)

[ ESC ]  Main Menu

Back to the main menu

AIP-BMD_82.docx

Version: 1.1.23167

Page 99 of 120

Starting the function “Test Apps“ by the menu item ”[ 4 ] Test Apps  >>"

AIP Functions Shop Floor Data / Machine Data

When  starting  the  function  “test  apps“,  a  directory  list  of  the  HYDRA  server  directory

”./ctnet/win/testapps/“ is loaded.

The function creates an entry for each directory in the list that includes a file “testapp.ini”. If this file

already exists locally,  i.e.  it has already been loaded  earlier, the entry  will be highlighted in green

(e.g.

).

The selected “Testapp“ can be reloaded or updated by the function key ”Load“.

The selected “Testapp“ is started by the function key “Execute".

The list can be browsed by using the function keys “Page Up” and “Page Down”. The function is

exited by using the key “Close”.

The configuration file “testapp.ini“ is structured a follows.

  [APP]
  name=com32tst
  exe=com32tst.exe
  param=...
  [COMMENT]

; optional parameter to transfer call data

MSS Test Program

  [/COMMENT] [APP]

AIP-BMD_82.docx

Version: 1.1.23167

Page 100 of 120

AIP Functions Shop Floor Data / Machine Data

Submenu deleting or restarting/closing files using [D] Delete files

[ 1 ]

Delete spool directory

(deleting the ./spool directory of the terminal)

[ 2 ]

Delete queues

(deleting the queue in the ./spool directory of the terminal)

[ 3 ]

Delete logs

(deleting the log files in the ./spool directory of the terminal)

[ 4 ]

Delete application

(deleting the configured application)

[ ESC ]  Main menu

back to the main menu

The application / Windows can  be  exited or restarted in the following selection  dialog after entering the

password "mos6950" and clicking the button

.

AIP-BMD_82.docx

Version: 1.1.23167

Page 101 of 120

AIP Functions Shop Floor Data / Machine Data

Submenu for opening or installing further “[E] tools >>“

[ 1 ]  MSS-Loader install

[ 2 ]  MSS-Loader start

[ 3 ]

VNC install

[ 4 ]

HYDRA Fonts install

(loading and starting the installation package for Font Installation)

[ 5 ]   more Tools   >>

(Backup, Restore, Terminal Upload, Install 3rdParty)

[ ESC ]  Main Menu

Back to main menu

Submenu by starting "[ 5 ] more tools”

[ 1 ]

Backup

[ 2 ]

Restore

[ 3 ]

Installation 3rd Party

[ ESC ]  Main Menu

Back to the main menu

AIP-BMD_82.docx

Version: 1.1.23167

Page 102 of 120

AIP Functions Shop Floor Data / Machine Data

Menu item "[1]  Backup“

The server uses the file <hydradir>\ctnet\win\aip2backup.txt

or a terminal-specific file <hydradir>\ctnet\win\aip2backup2xxx.txt

(xxx is terminal number) for the backup. At first the system attempts to load a terminal-specific file.

If no terminal-specific file exists, the system will then attempt to load the file aip2backup.txt. This file

contains all of the files or registry entries that need to be backed up.

\aip2\*.ini

\aip2\*.cfi

\aip2\*.cfg

HKEY_LOCAL_MACHINE\SOFTWARE\MPDV\

A Zip file is created in the terminal and it is stored in the server.

The file is located in the server at:

The backup Zip file is given the name:  aip2backup2xxx.zip

 ->xxx = terminal number

(terminal-

specific for Hydra user 2xxx)

This backup file is then stored in the server under

<hydradir>\custom\backup\aip2\aip2backup2xxx.zip .

Menu item "[ 2 ] Restore“

There  will  first  be  a  query  asking  whether  you  would  like  to  run  a  restore.  "Restore"  attempts  to  load  a

backup file located in the server and then automatically restores all of the backed up files and any backed

up registry entries.

As already described in the backup section, a backup file is filed in the server directory:

<hydradir>\custom\backup\aip2\aip2backup2xxx.zip

AIP-BMD_82.docx

Version: 1.1.23167

Page 103 of 120

Menu item “[ 3] Installation 3rd Party“

AIP Functions Shop Floor Data / Machine Data

"Installation" button:

A list with all directories starting with the <hydradir>\ctnet\win\install directory is displayed. The

directories found will be offered for selection in a dialog. By confirming a directory, this directory is

downloaded and its contents are shown.

The <hydradir>\ctnet\win\install directory can therefore be expanded to include additional directories.

AIP-BMD_82.docx

Version: 1.1.23167

Page 104 of 120

Content of a directory selected beforehand

AIP Functions Shop Floor Data / Machine Data

Having  clicked  one  of  the  buttons  "copy  file"  or  "copy  all  files",  a  selection  screen  opens  where  a

directory may be chosen. The selected file or all files displayed are copied into this directory. In order to

copy a single file, first it needs to be selected in the list.

AIP-BMD_82.docx

Version: 1.1.23167

Page 105 of 120

AIP Functions Shop Floor Data / Machine Data

Execute  button:  A

file

from

the

list  may  be  executed  by  clicking

this  button.

The execution program defined in Windows is used to display or execute the selected file.

13.1  Using the functions in Windows 7

Availability  or  feasibility  of  individual  functions  of  the  “INST32”  installation  function  using  Windows  7

depends on the user type:

User Type

INST32 Function

Updating INST32 from the HYDRA
server

Installation of fonts

Loading the application (download)

Changing configuration settings

Installation MSS Loader

Installation VNC

Backup

Restore

Installation 3rd party components

Local User
Member of the
“administrators“
group

Local
administrator

Local User,
Member of the
“users“ group

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

No

Yes

Yes

No

No

Yes

Yes

No

AIP-BMD_82.docx

Version: 1.1.23167

Page 106 of 120

AIP Functions Shop Floor Data / Machine Data

User Type

Local User
Member of the
“administrators“
group

Local
administrator

Local User,
Member of the
“users“ group

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

Yes

No

No

No

Yes

INST32 Function

Deleting files

Starting MSS Loader

Starting hardware test

Starting reader test

Starting LAN test

13.2

Installation of font types in Windows 7

If  the  "Windows  7"  operating  system  is  used  the  required  font  types  can  no  longer  be  installed  by  the

application itself.

The  required  fonts  have  to  be  installed  once  using  the  above-mentioned  installation  program  "INST32",

menu item "HYDRA Fonts install". This is required to make sure the information is properly displayed on

the terminal.

13.3  Date/time synchronization at the terminal

The HYDRA terminal software automatically synchronizes the time of the local terminal PC with the time

of the HYDRA server. Usually, different Windows versions require administrative rights to be able to set

the time locally.

The message below is displayed once, every time the program is started if the respective Windows user

does not have the required rights.

AIP-BMD_82.docx

Version: 1.1.23167

Page 107 of 120

AIP Functions Shop Floor Data / Machine Data

The following entry in the [system] section of the local configuration file CTAIP.INI prevents the time from

being synchronized with the HYDRA server and, as a result, the above-mentioned error message is also

suppressed.

[system]
NoLocalWatchUpdate=on
NoLocalWatchWarning=on

But if this configuration is enabled, the user has to make sure that the time of the HYDRA terminal PC is

synchronized with another reliable source and that the time of the HYDRA terminal PC and the time of the

HYDRA server are synchronous.

The user is responsible for disabling the time synchronization function. Wrong time stamps at the terminal

may  lead  to  unintentional  problems  when  processing  data,  e.g.  incomplete  or  wrong  reports  and

evaluations or errors in posting times and durations.

13.4  Control of special watchdog hardware

New watchdog types are connected by a driver DLL, which is configured in ctaip.ini.

[DLL]

WdDLL=<Driver DLL>

Watchdog

AEC6810

Configuration

Required files

WdDLL= aaeondrv.dll

aaeondrv.dll

aaeonWdt.dll

AIP-BMD_82.docx

Version: 1.1.23167

Page 108 of 120

AIP Functions Shop Floor Data / Machine Data

Watchdog

Configuration

Required files

aaeonwrapper.dll

A watchdog may also be activated within the registry. The following entry has to be set:

HKEY_LOCAL_MACHINE\SOFTWARE\MPDV\CT\WdDLL=<Driver DLL>

In case both entries are set, the entry in the ctaip.ini file takes priority.

13.5

inst32.ini - Standard

Default settings for installing AIP2.

Entry

Comment

Section [install]

PrgIniFile=C:\MPDV\AIP2\ctaip.ini

Path of the ctaip.ini file

PrgExeFile= C:\MPDV\AIP2\ctaip

AIP2 program to be started.

DisplayName=AIP2

ConfigEditorFile=aip2.mkf

The option DisplayName may only be used
with an AIP2 terminal. The value AIP2 must
not be changed.

Configuration file for the configuration editor.
This file controls the GUI of the configuration
editor.

ConfigHelpFile=iniedit.ini

Help file for the configuration editor.

The default settings should be sufficient in the inst32.ini file.

AIP-BMD_82.docx

Version: 1.1.23167

Page 109 of 120

AIP Functions Shop Floor Data / Machine Data

13.6

inst32.ini - application selection

The  following  optional  configuration  can  be  used  if  a  terminal  PC  must  support  different  installations

during a transitional period (e.g. version upgrade from CTAIP to AIP2).

This configuration should only be used in exceptional cases.

Entry

Comment

Section [install]

ApplicationChoiceAvailable=on

The application to be supported can be selected using
this optional configuration.

Single  "install*"  sections  for  different  applications  must  be  configured  with  the  above-mentioned

configuration option.

Section for AIP2

Section [installaip2]

Entry

Comment

PrgIniFile=C:\MPDV\AIP2\ctaip.ini

Path of the ctaip.ini file

PrgExeFile= C:\MPDV\AIP2\ctaip

AIP2 program to be started.

DisplayName=AIP2

ConfigEditorFile=aip2.mkf

The option DisplayName may only be used
with an AIP2 terminal. The value AIP2 must
not be changed.

Configuration file for the configuration editor.
This file controls the GUI of the configuration
editor.

ConfigHelpFile=iniedit.ini

Help file for the configuration editor.

Section for CTAIP

Section [installaip]

Entry

Comment

PrgIniFile=C:ctaip\ctaip.ini

Path of the ctaip.ini file

PrgExeFile=C:\ctaip\ctaip

CTAIP program to be started.

Section for CTWIN

AIP-BMD_82.docx

Version: 1.1.23167

Page 110 of 120

AIP Functions Shop Floor Data / Machine Data

Entry

Comment

Section [installctwin]

PrgIniFile=C:\ctwin\ctaip.ini

Path of the ctwin.ini file

PrgExeFile= C:\ctwin\ctwin

CTWIN program to be started.

Default application

Entry

Comment

Section [system]

Default=installaip2

When starting inst32, AIP2 is supported by
default.

Sample configuration inst32.ini for AIP2/AIP:

The AIP2 has been designed to be configured by default. The AIP2 is selected by default when starting

inst32.exe. The application can be changed in inst32adm.

Using this configuration the GUI shows the supported application. By double clicking, the selection dialog

can be opened in inst32adm.

AIP-BMD_82.docx

Version: 1.1.23167

Page 111 of 120

AIP Functions Shop Floor Data / Machine Data

The application can be changed in the selection dialog.

Inst32 now supports CTAIP.

Sample configuration inst32.ini for AIP2/CTWIN:

The AIP2 has been designed to be configured by default. The AIP2 is selected by default when starting

inst32.exe. The application can be changed in inst32adm.

AIP-BMD_82.docx

Version: 1.1.23167

Page 112 of 120

AIP Functions Shop Floor Data / Machine Data

Using this configuration the GUI shows the supported application. By double clicking, the selection dialog

can be opened in inst32adm.

The application can be changed in the selection dialog.

AIP-BMD_82.docx

Version: 1.1.23167

Page 113 of 120

AIP Functions Shop Floor Data / Machine Data

Inst32 now supports CTWIN.

AIP-BMD_82.docx

Version: 1.1.23167

Page 114 of 120

AIP Functions Shop Floor Data / Machine Data

13.7  Migration: CTWIN/AIP --> AIP 8.2

The  program  "iniconverter.exe“  is  available  in  order  to  migrate  a  CTWIN/AIP  installation  to  an  AIP  8.2

installation.  This  program  transfers  relevant  INI  files  or  INI  entries.  This  program  can  be  loaded  and

started via the menu item "[A]  Hardware test  >>“ of the sub-menu "[ 4 ]  Test Apps >>“

and by selecting "[ iniconverter ]“.

A detailed description on how to operate "test apps" can be found in the chapter  "Start menu Inst32" of

section "Starting the function "test apps" using menu item "[ 4 ] Test apps    >>“.

The following application dialog is shown after loading and starting the test app "[ iniconverter ]".

While  starting  the  application,  the  required  entries  in"Source  (INI)“  and  "Target  (Path)“  are  assigned  by

default.

The following order applies for "Source (INI)":



c:\aip\ctaip.ini

  d:\aip\ctaip.ini



c:\ctwin\ctwin.ini

  d:\ctwin\ctwin.ini

  Registry "HKEY_LOCAL_MACHINE\SOFTWARE\[Wow6432Node\]Mpdv\CT\PATH\AIP“

  Registry „HKEY_LOCAL_MACHINE\SOFTWARE\[Wow6432Node\]Mpdv\CT\PATH\CTWIN“

The "Target (Path)" is pre-assigned via the following registry entry:

  Registry "HKEY_LOCAL_MACHINE\SOFTWARE\[Wow6432Node\]Mpdv\CT\PATH\AIP2“

AIP-BMD_82.docx

Version: 1.1.23167

Page 115 of 120

AIP Functions Shop Floor Data / Machine Data

If  the  values  assigned  by  default  are  incorrect,  they  can  be  revised  using  the  buttons

  behind

the input field.

The "Source (INI)" field can be changed using the standard dialog "open file".

The "Target (Path)" field can be changed using the standard dialog "search folder".

The button

 converts/transfers INI files from the "Source" directory to the "Target" directory.

This command can be executed several times. In case the "Target" directory already includes several INI

files, a dialog opens where updating/overwriting of these files must be confirmed. (Please note: all dialogs

can be confirmed provided that the AIP 8.2 terminal has not been implemented manually beforehand)

The transfer result is documented in a memo field and stored in the file "iniconverter.txt" of the  "Target"

directory.

Please note:

  The

configurations

of  PCC

drivers,

such

as

those

included

in

the

files

mssmpdv.ini, opcmdv.ini, etc.

must be checked and adjusted to the new installation, if necessary.

  The INI files used for the automatic transfer are filed together with the file "iniconverter.txt" in the

sub-directory ".\ini-srce\<yyyymmdd-hhmmss>\.“ of the "Target" directory.

AIP-BMD_82.docx

Version: 1.1.23167

Page 116 of 120

AIP Functions Shop Floor Data / Machine Data

14  Configuring the machine image for the AIP

Purpose

You  can  display  the  image  of  the  workplace  in  the  AIP  shop  floor  software  (in  the  following  "machine

image"):





In the machine info (AIP 8.1 and AIP 8.2)

In the main view (only AIP 8.2).

Requirements

The

following

image

formats  are  supported:

jpg,  gif,  png,

tif,  bmp,

ico,  emf,  and  wmf.

File the images (files) in a directory that may be accessed from the AIP terminal via the path ID "HYDRA"

within the path configuration.

Log  your  Windows  user  on  to  the  AIP  and  access  the  directory.  Your  user  must  have  the  respective

authorization to access the directory.

Procedure

1.  Store the file to be displayed in a central directory that you can access from the AIP. Make sure that

the Windows user in the AIP has the respective authorization to access the directory.

2.  Configure the logical path "HYDRA" in the Path configuration.

  Path: "HYDRA" (cannot be changed)

  Protocol: "file" (cannot be changed)

  Host: IP address or host name of the server where the graphic files are stored.

  Port: usually 0

  URL path: Enter the URL path as absolute path. Refer to the network directory where the graphic

files are stored.

In  case  of  a  HYDRA  server,  store  the  files  in  the  directory  <HYDRADIR>/<system>/grafik/bde

(<HYDRADIR>  is  the  directory  where  HYDRA  is  installed,  <system>  is  the  HYDRA  system

number).

Precede the URL path by a double backslash.

  User/password:  Enter  the  user  and  the  password  of  the Windows  user  to  access  the  server.  In

case of a HYDRA server, it is usually the user hydadm.

Sample path configuration

The graphic files are stored in the directory of the HYDRA server:

d:\hydra2\2\grafik\bde

AIP-BMD_82.docx

Version: 1.1.23167

Page 117 of 120

AIP Functions Shop Floor Data / Machine Data

Network share for the directory d:\hydra2 in the HYDRA server:

hydra2

Configuration:

3.  Enter  a  valid  file  name  in  the  field  "File  name"  of  the  application  Workplace  and  resource

configuration (tab Workplace configuration).

4.  Restart the terminal software.

AIP-BMD_82.docx

Version: 1.1.23167

Page 118 of 120

AIP Functions Shop Floor Data / Machine Data

Result

The machine info in the AIP displays the machine image.

With AIP 8.2, the main view displays the machine image:

Troubleshooting

If  the  main  view  of  the  AIP  8.2  does  not  display  the  machine  image  after  restart,  restart  the  AIP  8.2  a

second time.

If the image is still not displayed, try the following:

  The following entry must be available in the log file prot_ev.txt, e.g.

16-10-16 13:32:57.763[+Loc]12260:URLDownload:

file,hydadm,hydadm,SCC7,0,\\hydra2\2\grafik\bde\60610.jpg,c:\ctaip\spool\60610.jpg,

16-10-16 13:32:59.320[+Loc]12260:URLDownload: => Res=0

In the row "URLDownload", the return code is displayed that the communication software has returned

during  download.  The  return  code  must  be  0  (Res=0).  The  log  file  is  written  in  the  subdirectory

c:\ctaip\spool (if the terminal software is installed in c:\ctaip).

The  logging  of  the  log  file  must  be  explicitly  enabled  in  the  terminal  software.  Only  then,  the

entry is displayed in the log file prot_ev.txt:

  You must have entered an absolute URL path in the MOC path configuration.

  The  user  that  accesses  the  directory  of  the  HYDRA  server  from  the  terminal  software  must  have

sufficient (read) access to this directory.

AIP-BMD_82.docx

Version: 1.1.23167

Page 119 of 120

AIP Functions Shop Floor Data / Machine Data

Only one image is downloaded from the HYDRA server.  If you want to change the image, you must first

delete the file in the spool directory of the terminal. Or you can enter the image using a different name in

the Workplace/resource configuration.

AIP-BMD_82.docx

Version: 1.1.23167

Page 120 of 120

