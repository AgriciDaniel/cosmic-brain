Manual

Collection / Information
Functions for Material
AIP-MPL 8.2

Version 1.1.23049

Last changed on: 01.09.2020

Collection / Information Functions for Material

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying  and  distribution  of this  documentation  or  any  part thereof,  for  any  purpose  or  in  any  form, is  prohibited  without  prior
written permission from MPDV Mikrolab GmbH.

AIP-MPL_82.docx

Page 2 of 95

01.09.20

Collection / Information Functions for Material

The information contained in this documentation is subject to change without prior notice.

AIP-MPL_82.docx

Page 3 of 95

01.09.20

Collection / Information Functions for Material

Contents

1  Overview of Collection / Information Functions for Material ......................... 6

2  AIP2 Operation ............................................................................................. 7

2.1  Special Control and Display Elements on the AIP2 ............................................. 7

2.2  General description of the posting process on the AIP2 .................................... 10

3  Main View with Tiles ................................................................................... 14

3.1  Main view – header and footer .......................................................................... 14

3.2  Main view with "tiles" ......................................................................................... 16

3.3

Icon view of workplaces .................................................................................... 22

4  Basic Screen as List View .......................................................................... 24

4.1  Basic screens – header and footer .................................................................... 24

4.2  Basic screen “tabular view“ ............................................................................... 26

4.3  Basic screen "machine overview" ...................................................................... 29

4.4

“Machines as icons” basic display ..................................................................... 32

5  Barcode Input with Prefix ........................................................................... 33

5.1  Configuration of customized barcode prefixes ................................................... 37

6  AIP2 -Local Configuration .......................................................................... 39

6.1

Local Configuration ctaip.ini .............................................................................. 39

6.2  PNG – Files / Bitmaps ....................................................................................... 43

6.2.1  File pict.zip ............................................................................................ 43

6.2.2  File pict_cust.zip .................................................................................... 43

6.3  Multilingualism (*.mld files) ................................................................................ 44

7  AIP2 - Central Configuration File hytnrcfg.ini ............................................. 45

7.1

Layout configuration .......................................................................................... 48

8  Order Postings for Operations subject to Batch Management ................... 51

9

Input Batch Change ................................................................................... 54

AIP-MPL_82.docx

Page 4 of 95

01.09.20

Collection / Information Functions for Material

10  Output Batch Change ................................................................................. 57

11  Batch Information ....................................................................................... 60

12  Entry of Batch Attributes ............................................................................ 61

13  Enter Goods Receipt Batch ........................................................................ 62

14  Repost Batch .............................................................................................. 64

15  Display of "Produced Batches" in AIP ........................................................ 65

16  Settings for List of Produced Output Batches ............................................ 66

17  Advance Logon of Input Batches ............................................................... 68

18  Configuration: Advance Logon of Input Batches ........................................ 71

19  Throughput Batch Processing .................................................................... 74

20  Throughput Batch Processing .................................................................... 77

21  Configuration for Throughput Batch Processing ........................................ 78

22  Batch Consumption .................................................................................... 80

23  Discrete Consumption Input ....................................................................... 84

24  Discrete Consumption Input at AIP ............................................................ 86

25  Configuration of Discrete Consumption Input ............................................ 89

26  AIP - on-screen keyboard decimal symbol configuration ........................... 92

AIP-MPL_82.docx

Page 5 of 95

01.09.20

Collection / Information Functions for Material

1  Overview of Collection / Information Functions for Material

Purpose

The  AIP  features  contained  in  this  function  package  make  it  possible  to  enter  material-related  data

directly in production using shop floor terminals or data acquisition PCs.

Integration

The data entered by using AIP can be displayed and/or evaluated in different MOC applications. The

entered data can be uploaded via relevant interfaces.

Features

Order-related data acquisition and posting functions

  Consumable material (input batches) can be entered at the same time that operations are logged

on (configurable for each operation and workplace)

  Produced material (output batches) can be entered at the same time that operations are logged on

  Entry  and  validation  checking  of  input  and  output  batch  changes  while  the  operation  is  running

and/or the order is being processed

  Entry of goods receipt batches

  Automatic  generation  of  material  movements  (incoming  goods/outgoing  goods)  depending  on

material input or consumption

  Batch-related quantity and time input for the produced materials

  Entry of batch numbers via keyboard and/ or barcode

  A validation check as to whether documentation is required is run for consumable material when

the operation and/or the input batch is logged on

  A ticket/ label is automatically printed in HYDRA standard format using the assigned printer when

a new batch is generated

AIP-MPL_82.docx

Page 6 of 95

01.09.20

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Page 7 of 95

01.09.20

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Page 8 of 95

01.09.20

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Page 9 of 95

01.09.20

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Page 10 of 95

01.09.20

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Page 11 of 95

01.09.20

Collection / Information Functions for Material

As  long  as  the  dialog  has  not  been  confirmed,  the  data  entered  can  be  changed  at  any  time  by

scrolling back and forth.

Filter field for the list

Status list

In the second view Select status, you select the workplace status that is set, when the operation has

been  interrupted.  You  can  select  the  status  from  the  status  list  displayed.  This  list  can  be  restricted

using  the  Filter  field.  Once  the  required  values  have  been  entered,  the  next  view/sub-dialog  can  be

opened by clicking Next (in our example it is the last view).

AIP-MPL_82.docx

Page 12 of 95

01.09.20

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Page 13 of 95

01.09.20

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Page 14 of 95

01.09.20

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Page 15 of 95

01.09.20

3.2  Main view with "tiles"

List of workplaces

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Page 16 of 95

01.09.20

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Page 17 of 95

01.09.20

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Page 18 of 95

01.09.20

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Page 19 of 95

01.09.20

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Page 20 of 95

01.09.20

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Page 21 of 95

01.09.20

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Page 22 of 95

01.09.20

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Page 23 of 95

01.09.20

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Page 24 of 95

01.09.20

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Page 25 of 95

01.09.20

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Page 26 of 95

01.09.20

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Page 27 of 95

01.09.20

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Page 28 of 95

01.09.20

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Page 29 of 95

01.09.20

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Page 30 of 95

01.09.20

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Page 31 of 95

01.09.20

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Page 32 of 95

01.09.20

Collection / Information Functions for Material

5  Barcode Input with Prefix

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

AIP-MPL_82.docx

Page 33 of 95

01.09.20

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Page 34 of 95

01.09.20

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Page 35 of 95

01.09.20

Prefix

16.

Barcode

*16.123456*

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Page 36 of 95

01.09.20

Collection / Information Functions for Material

Prefix

50.

Barcode

*50.1337*

Raw data

KNR = 1337

5.1  Configuration of customized barcode prefixes

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

AIP-MPL_82.docx

Page 37 of 95

01.09.20

Collection / Information Functions for Material

AIP-MPL_82.docx

Version: 1.1.23049

Page 38 of 95

Collection / Information Functions for Material

6  AIP2 -Local Configuration

6.1  Local Configuration ctaip.ini

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

AIP-MPL_82.docx

Version: 1.1.23049

Page 39 of 95

Entry

VirtScreenRatio=16:9

Section [SKIN]

Saturation=0

Hue=0

Name=mpdv

Active=false

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Version: 1.1.23049

Page 40 of 95

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Version: 1.1.23049

Page 41 of 95

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Version: 1.1.23049

Page 42 of 95

Collection / Information Functions for Material

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

6.2  PNG – Files / Bitmaps

The use of PNC files is recommended by MPDV. By default PNG files have a size of 24 x 24 px.

6.2.1

File pict.zip

The file "pict.zip“ is updated by the installation tool "inst32.exe“ while downloading and includes all default

PNG files.

The  default  PNG  files  can  be  overwritten  in  the  file  pict_cust.zip.  Several  PNG  files  have  the  extension

".small.png" (e.g. aip.small.png). These PNG files are used with a screen resolution of 640x480.

6.2.2

File pict_cust.zip

The file "pict_cust.zip“ is loaded from the server directory (e.g. \<serverDir>\1\custom)  when starting the

program (as is the case for the hycust.mld).

Customized PNG files may be stored in this file and loaded by the AIP2 terminal. Default PNG files may

also be "overwritten".

Please note: file sizes are not adjusted.

Customize header

The  AIP  icon  displayed  in  the  header  can  be  replaced  by  storing  a  separate  AIP.png  file  in  the

pict_cust.zip file.

This AIP icon will also be replaced in the "About" dialog.

AIP-MPL_82.docx

Version: 1.1.23049

Page 43 of 95

Customize footer

Collection / Information Functions for Material

The  MPDV  icon  displayed  in  the  footer  can  be  replaced  by  storing  a  separate  company.png  file  in  the

pict_cust.zip file.

Customize PZE dialog

The MPDV icon displayed in the PZE dialog can be replaced by storing a separate pze_mpdv.png file in

the  pict_cust.zip  file.  In  case  the  PZE  terminal  is  operated  with  a  screen  resolution  of  640x480,  a

customized pze_mpdv.small.png file has to be integrated in the pict_cust.zip file.

6.3  Multilingualism (*.mld files)

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

AIP-MPL_82.docx

Version: 1.1.23049

Page 44 of 95

Collection / Information Functions for Material

7  AIP2 - Central Configuration File hytnrcfg.ini

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

AIP-MPL_82.docx

Version: 1.1.23049

Page 45 of 95

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Version: 1.1.23049

Page 46 of 95

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Version: 1.1.23049

Page 47 of 95

Collection / Information Functions for Material

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

7.1  Layout configuration

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

AIP-MPL_82.docx

Version: 1.1.23049

Page 48 of 95

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Version: 1.1.23049

Page 49 of 95

Collection / Information Functions for Material

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

AIP-MPL_82.docx

Version: 1.1.23049

Page 50 of 95

Collection / Information Functions for Material

8  Order Postings for Operations subject to Batch Management

Overview

In addition to logging the actual operation on, operations subject to batch management also enable to log

on relevant input batches.

Configuration

These  system  settings  must  be  carried  out  to  generally  use  operations  that  are  subject  to  batch

management.

Basic screen

Basic terminal screen when a machine is assigned in batch mode:

The  basic  display  shows  the  third  list  "Input  materials  currently  logged  on"  for  machines  for  which  the

“batch management” option is configured. All active input batches of the selected machine are displayed

in this list.

AIP-MPL_82.docx

Version: 1.1.23049

Page 51 of 95

Collection / Information Functions for Material

OP logon with input batches

A workflow including two tabs is opened by clicking the button highlighted with the red frame for logging

on operations. The operation to be logged on is selected in the first tab “select operation".

The “log on operation” tab is reached by clicking “Next” where in addition to the selected OP, the defined

material components are displayed in a list.

By entering a batch number in the "input batch" field and clicking the "report batch" function a batch may

be logged on as input material for a component. During the entry process, the terminal checks whether or

not the batch number is known to the system and may be logged on. This is also described in detail in the

document dealing with the Input batch change.

"Batch" field

When  an  OP  is  logged  on,  a  batch  number  is  created  simultaneously  for  the  next  output  batch  to  be

produced. The batch number may be assigned automatically or manually (please also see the settings of

"workplace configuration"). The generated batch is created with the batch number in the system and set

to the "running" status.

Provided that all required input materials are logged on, the OP may be started via the "OK" button in the

"OP  logon"  dialog.  Whether  input  material  has  to  be  logged  on  or  not,  can  be  defined  in  the  assigned

material type of the component.

Once  the  OP  has  been  logged  on  successfully,  all  active  input  batches  of  the  selected  machine  are

displayed in the material list.

If batches are logged on along with the OP and the user cancels the process or cannot log on the OP due

to validation checking, the input batches will be logged off automatically for this OP. In this case, batches

are  always  logged  off  without  indicating  the  consumption  quantity.  By  way  of  the  following  warning

message, the user may confirm the logoff process:

The  function  logging  off  input  batches  automatically  can  be  activated/deactivated  by  an  option  in  the

hyaipcfg.ini file:

HYAIPCFG.INI

AIP-MPL_82.docx

Version: 1.1.23049

Page 52 of 95

Collection / Information Functions for Material

[MPL-Options 0/2xxx]
ForceAutoLogOffInputBatches=0

Logon of unplanned input material

In  addition  to  planned  materials,  it  is  also  possible  to  log  on  “unplanned”  material  for  an  OP,  using  an

additional  feature  for  the  OP.  If  the  "replaceable"  option  is  set  to  "J",  the  user  is  able  to  assign  the

respective component manually, when batches are logged on. However, the logon is only allowed if the

material type of the input batch matches that of the component.

In  the  selection  list  the  components  are  filtered  by  the  material  number  and  displayed  as  follows  for

selection:

Logon of unknown batches

An  input  batch,  which  is  not  yet  known  to  the  system,  may  be  logged  on  for  an  OP  using  the  "create

unknown batches" option in the basic parameter settings.

In  this  case,  when  input  batches  are  logged  on,  the  system  searches  for  a  valid  assignment  of  input

material  to  the  material  type  of  the  selected  component.  Provided  that  a  matching  assignment  is  found

and  the  "allow  entry  of  unknown  input  batches"  option  is  configured  for  the  material  type  in  the  "input

batch processing" tab, the batch is generated by logging it on to the system. Then it is set to the "running"

status. The batch is initially created in a quantity of 1.000.000.000.

Logoff/interruption of OPs

A running OP may be interrupted or logged off by clicking the "logoff/interrupt OP" button. Then a dialog

opens, where the following selection can be made:

If "log off OP" is clicked the logoff dialog opens that contains the same input fields like the  Output batch

change dialog.

Thus, the output batch that is currently active is completed, when OPs are interrupted or logged off.

AIP-MPL_82.docx

Version: 1.1.23049

Page 53 of 95

Collection / Information Functions for Material

9

Input Batch Change

Summary

Input material and/or relevant input batches can be changed for a running OP if the "input batch change"

option is clicked.

Configuration

Further system configurations are not required to be able to use the input batch change dialog.

Dialog

Basic screen

Log input batch off:

Input  batches may  be changed  by  entering  a currently  active  batch number or by  entering a new batch

number. When logging batches off, it is also possible to enter the status and consumption of the batch to

be logged off.

AIP-MPL_82.docx

Version: 1.1.23049

Page 54 of 95

Collection / Information Functions for Material

Options when logging input batches off:

F1 - PROCESSED

The batch is set to the "processed" status and the remaining quantity that is still available is set to 0. A

consumption posting is generated as goods issue for the current, remaining quantity.

F2 - BLOCKED

The batch is set to the "blocked" status. A consumption entered additionally is deducted from the current,

remaining quantity as goods issue.

F3 - with remaining quantity

The  batch  is  set  to  the  "free"  status.  A  consumption  entered  additionally  is  deducted  from  the  current,

remaining quantity as goods issue. If the remaining quantity that is still available becomes <= 0, the batch

status automatically switches to "processed".

Consumption

The entered consumption (unit of the input material) is deducted from the remainder of the batch and a

goods movement is generated.

AIP-MPL_82.docx

Version: 1.1.23049

Page 55 of 95

Collection / Information Functions for Material

Comment on batch

The comment entered is saved as information for the batch.

Log input batch on:

Provided that the batch is known, batch data is displayed in an intermediate dialog where the logon may

be confirmed.

Provided that the batch could be logged on, it is taken over to the material list in "customer batch number"

and thus the change is completed.

However,  in  case  the  logon  is  inadmissible  as  the  input  material  does  not  correspond  to  that  of  the

component, the logon is rejected by an error message.

AIP-MPL_82.docx

Version: 1.1.23049

Page 56 of 95

Collection / Information Functions for Material

10  Output Batch Change

Summary

Output material may be changed for a running OP using the "output batch change" option.

Configuration

Further system configurations are not required to be able to use the output batch change dialog.

Dialog

The input batches that are logged on are displayed with their available remaining quantity in a list within

the output batch change dialog. The following data may be entered:

Target buffer

Material buffer for which the current batch is to be produced. The output material buffer of the machine is

pre-assigned as default value.

AIP-MPL_82.docx

Version: 1.1.23049

Page 57 of 95

Collection / Information Functions for Material

Transport unit

A transport unit defined within the system may be assigned here. The selection refers to transport units

that were assigned to the material type of the OP.

Comment on batch

In this field a comment may be saved for the batch to be produced.

Quantity

The batch to be produced is posted with the quantity entered here. The quantity is taken over as primary

quantity of entry to the order and machine and a goods movement is generated as goods receipt.

Quality

A  batch  may  be  classified  as  yield  or  scrap  quantity.  The  system  posts  yield  batches  with  the  "free"

status.  Scrap  batches  automatically  get  the  "blocked"  status.  When  scrap  is  selected,  a  valid  scrap

reason has to be assigned.

"Preceding batches" function key:

This button opens a list with output batches which have already been produced for this OP.

AIP-MPL_82.docx

Version: 1.1.23049

Page 58 of 95

Collection / Information Functions for Material

"Change inp. batch" function key:

Using this button the user can switch to the "input batch change" function.

New batch

When  a  current  output  batch  is  completed,  a  new  batch  number  is  simultaneously  created  for  the  next

batch. The batch number may be assigned automatically or manually. The batch generated in this way is

created with the batch number in the system and set to the "running" status.

AIP-MPL_82.docx

Version: 1.1.23049

Page 59 of 95

Collection / Information Functions for Material

11  Batch Information

Batch information

Batch information is displayed in a dialog, when the “batch info” icon is clicked.

AIP-MPL_82.docx

Version: 1.1.23049

Page 60 of 95

Collection / Information Functions for Material

12  Entry of Batch Attributes

Summary

In case batch attributes are defined to be recorded at the AIP terminal for the material type of the running

OP, another input dialog is opened, when the output batch is changed. The dialog opens additionally after

clicking "OK" in the output batch change function, interrupt OP and finish OP function.

Using batch attributes, numeric and alphanumeric values may be recorded which are then saved for the

produced output batch in an additional table.

Configuration

By  configuration  it  is  possible  to  record  any  number  of  additionally  required  batch  attributes  for  the

material type.

Dialog

Example when two additional batch attributes are collected for an output batch:

AIP-MPL_82.docx

Version: 1.1.23049

Page 61 of 95

13  Enter Goods Receipt Batch

Collection / Information Functions for Material

Summary

A new goods receipt batch may be created in the system via the "enter GR batch" button.

Configuration

Further system configurations are not required to enter goods receipt batches.

Dialog

Having clicked the "OK" button, the batch is created and the dialog remains open for further entries.

Batch numbers may be  generated automatically  or manually depending on the  configuration. Moreover,

the following data is saved at the batch.

Workplace

Machine where the batch was recorded

Operation

AIP-MPL_82.docx

Version: 1.1.23049

Page 62 of 95

Collection / Information Functions for Material

Order where the batch was recorded

Material

Material number of the batch

Quantity and unit

The batch is created with the quantity and unit entered here. A goods receipt is posted with the quantity.

Quality

A batch may be classified as yield or scrap quantity, rework or open quantity. The system creates yield

batches with the "free" status. Scrap batches automatically get the "blocked" status and the batch class

"scrap". When scrap is selected, a valid scrap reason has to be assigned additionally with respect to the

corresponding workplace.

Target buffer

Material buffer for which the current batch is to be produced. The output material buffer of the machine is

pre-assigned as default value.

Transport unit

A transport unit defined within the system may be assigned here.

Comment on batch

In this field a comment may be saved for the goods receipt batch.

AIP-MPL_82.docx

Version: 1.1.23049

Page 63 of 95

Collection / Information Functions for Material

14  Repost Batch

Summary

Using the "repost batch" button, an existing batch may be reposted to another material buffer.

Configuration

Further system configurations are not required to repost batches.

Dialog

Having  clicked  the  "OK"  button,  the  batch  is  reposted  to  a  new  material  buffer  and  the  dialog  remains

open for further entries.

As an alternative, the batch can also be reposted from yield to scrap.

AIP-MPL_82.docx

Version: 1.1.23049

Page 64 of 95

Collection / Information Functions for Material

15  Display of "Produced Batches" in AIP

Overview

Using  the  3rd  list  of  the  machine  master,  it  is  possible  to  display  the  output  batches  produced  for  a

running operation that is subject to batch management.

A default number of 20 output batches is displayed for each machine in the list. Output batches (yield and

scrap  batches)  are  shown,  which  have  been  produced  at  this  terminal  since  output  batches  were

changed.

As this list is only kept locally by the terminal, it is not synchronized with the server, when AIP is started.

Configuration

The settings required to use the third list can be found in the document dealing with configuration.

Display

If several third lists are enabled, you can switch between the lists in the header line.

The list shows, among others, the article, article name and batch number. Some of the fields might not be

completed depending on the data collection scenario when generating output batches.

AIP-MPL_82.docx

Version: 1.1.23049

Page 65 of 95

Collection / Information Functions for Material

16  Settings for List of Produced Output Batches

Activation at the machine

For the purpose of activating the list of produced output batches in the basic screen of the terminal, the

display of the third list of the machine to be activated has to be activated in the  machine master record

(Workplace configuration  Entry  Display 3rd list).

Definition of the Number of Entries in the List

The number of entries in the list may be customized by extending the data provision for the machine list

(mnr.lst)  at  the  terminal  on  the  server  side  (extended  customizing).  For  this  purpose,  the  additional

column "MNR.NUMBER_OF_BATCHES" has to be provided at the server.

Customization of Visible Columns in the List

The list contents can be configured in section [ MNR_AMAT.LST ] of the file ctaiplay.ini.

Example:

CTAIPLAY.INI

[ MNR_AMAT.LST ]
GRID_FONT=Arial
GRID_FONTSIZE=9
GRID_COLOR=clBlack
GRID_BACKGROUND=clWhite
GRID_ORDER=ROW.IDX=-
GRID_CAPTION=Produzierte Ausgangslose

EXAMINE_SCANEXPR1=KLASSE=G
EXAMINE_SCANCOLOR1=clGreen
EXAMINE_SCANEXPR2=KLASSE=A
EXAMINE_SCANCOLOR2=clRed

; ROW.IDX=N10,50,R,Row
CNR=C20,150,L,Losnummer
;CNR=*CNR,Los
ATK=C25,125,L,Artikel
; ATK=*ATK
; KLASSE=C3,40,Z,*
MENGE=N12.0,70,R,Menge
EINH=C3,30,Z,ME
DAT=dd.mm.yyyy,70,L,Datum
ZEI=hh:mm:ss,60,L,Zeit
ATKBEZ=C30,200,L,Artikelbezeichnung

AIP-MPL_82.docx

Version: 1.1.23049

Page 66 of 95

Collection / Information Functions for Material

Configuration of Server-Based Comparison

The  server-based  comparison  is  activated  by  an  entry  in  the  customer-specific  configuration  file

"ctwinlisten.ini".  As  with  hytnrcfg.ini,  this  file  can  be  maintained  both  globally  (for  all  terminals),  on  a

terminal group level, and on terminal level.

Activation is effected by entering a LOADCYCLE larger than 0 (seconds).

CTLISTEN.INI

[#LIST#TNR-ALOSE]
LOADCYCLE=900

The  prerequisite  for  the  server  comparison  is  the  default  configuration  file  "ctlisten.cfg",  which  contains

the application-specific configurations of the server list.

CTLISTEN.CFG

[#LIST#TNR-ALOSE]
CMD=DLG=LIST;13|MOD=P|
LOADCYCLE=0
QUEUEEMPTY=TRUE
FORCENOTIFY=TRUE

; (Default <ANZ=250>)

AIP-MPL_82.docx

Version: 1.1.23049

Page 67 of 95

17  Advance Logon of Input Batches

Collection / Information Functions for Material

Summary

The  process  might  require  an  input  batch  to  be  logged  on  in  advance  and  set  up  accordingly  on  a

machine, while the preceding input batch is still being used for a material.

This  situation  frequently  occurs  at  very  large  machines  processing,  for  example,  roles  or  belts  that  are

uncoiled as input batch at the beginning of the machine and coiled up as output batch at the end of the

machine.

As the users are mostly busy with activities at the end of the machine at the time when the input batch

actually  needs  to  be  changed,  they  cannot  perform  the  input  batch  change  and,  as  a  result,  they  are

provided with the opportunity to log the next input batch on already in advance for an order/OP.

Then the input batch can  actually be changed by  logging a new OP on or a project-specific call can be

established.

General / usage

The function for logging input batches on in advance is used to be able to "set up" and "log on" the next

input  batch  while  an  OP  and  input  batch  are  still  running.  This  next  input  batch  is  not  yet  running  but

assigned the "logged on in advance" flag.

An input batch may be logged on in advance for a currently running OP or a prepared OP.

Configuration

The settings required for using the function “advance logon of input batches” is described here.

Procedure

The procedure for using the function “advance logon of input batches“ or the logical process is described

here.

Dialog

Basic screen

The  basic  AIP  screen  shows  the  function  key  “Advance  logon  of  input  batch”  (preregistration  of  input

batch). The dialog for logging input batches on in advance may be used by clicking this function key.

AIP-MPL_82.docx

Version: 1.1.23049

Page 68 of 95

Collection / Information Functions for Material

Advance logon of input batches (CE_VWL_MPL)

The user selects the workplace to which an input batch is to be logged on in advance in the basic screen.

The  below  dialog  (CE_VWL_MPL)  opens  by  clicking  the  function  key  ”Advance  logon  of  input  batches”

(preregistration of input batch).

If an operation is currently running/logged on to the workplace, this one will be selected by default. The

input batch (that is to be logged on in advance) is entered/scanned for the selected BOM item. Advance

logon of input batches is started by clicking the button “post batch".

AIP-MPL_82.docx

Version: 1.1.23049

Page 69 of 95

Collection / Information Functions for Material

At first the input batch is checked for validity (dialog CE_VAN). The material number of the input batch is

checked against the material number of the component list or the BOM item. The input batch is logged on

in advance, once the button “log input batch on in advance” has been clicked:

Finally,  the  input  batch  that  has  been  logged  on  in  advance  is  displayed  in  purple  in  the  BOM  of  the

component.

The dialog can be closed with the “cancel” key.

AIP-MPL_82.docx

Version: 1.1.23049

Page 70 of 95

Collection / Information Functions for Material

18  Configuration: Advance Logon of Input Batches

Configuration: display of third list on the AIP (INI configuration)

Set  the  parameters/values  below  in  the  INI  configuration  to  display  the  input  batches  logged  on  in

advance in the third list on the AIP:



INI name:

MPL

  Section:

MPL_VANCNR

  Key/Value:

TNR_VANCNR =Y

When  you  have  made  the  settings  in  the  INI  configuration,  restart  the  terminal.  The  INI

configuration is only activated when the terminal is restarted.

Configuration: logon of input batches with OP logon on the AIP (INI

configuration)

Set the parameters/values below in the INI configuration to log on the input batches logged on in advance

at the same time with an OP on the AIP.



INI name:

MPL

  Section:

MPL_VANCNR

  Key/Value:

USE_VANCNR =Y

AIP-MPL_82.docx

Version: 1.1.23049

Page 71 of 95

Collection / Information Functions for Material

When  you  have  made  the  settings  in  the  INI  configuration,  restart  the  terminal.  The  INI

configuration is only activated when the terminal is restarted.

Configuration of keyboard layout on AIP2

To  define  the  function  key  "Advance  logon  of  input  batches",  copy  the  layout  gui\l_anr.xml  to

gui\l_anr_ln.xml and copy the key "BDE comments". Change the following entries in the configuration of

the copied key:

If you do not use the AIP2 tile view, define the function key in the file ctaipbut.ini:

[ANR-LN-Page2]

1=A_INFO.Dialog1,L,BDE-Kommentar,Attach Notes.png

2=A_SMG,L,Sollmenge ändern,Shipping Box Open Move Down Up.png

3=A_ELW,R,Eingangsloswechsel,CE_WL.png

4=CE_VWL_MPL,R,Eingangslosvoranmeldung,CE_WL.png

5=%BART:CAQ=J%CAQ_DC_T,R,Prüfung durchführen,Generators.png

AIP-MPL_82.docx

Version: 1.1.23049

Page 72 of 95

Collection / Information Functions for Material

Configuration: Highlighting the input batches logged on in advance on the

AIP (ctaiplay.ini)

To highlight the input batches logged on in advance in color in the list of input batches, material list and

BOM  on  the  AIP,  make  the  following  entry  in  the  configuration  file  "ctaiplay.ini".  Store  the  file  on  the

server.

Entry in Ctaiplay.ini:

Sections: [list of input batches], [material list] and [ PRT list (KOMBI) ].

...

EXAMINE_SCANEXPR1=CST=X

EXAMINE_SCANCOLOR1=ClPurple
...

Make sure that each key is only available once in a section.

If you want to store several rules, you can integrate this using sequence numbers at the end of
the keys:

EXAMINE_SCANEXPR1=ART=T|Z

EXAMINE_SCANCOLOR1=clBlue

EXAMINE_SCANEXPR2=ATKDIFF=F

EXAMINE_SCANCOLOR2=clGreen

EXAMINE_SCANEXPR3=ATKDIFF=J

EXAMINE_SCANCOLOR3=clRed

AIP-MPL_82.docx

Version: 1.1.23049

Page 73 of 95

Collection / Information Functions for Material

19 Throughput Batch Processing

Overview

Throughput  batch  processing  is  a  special  application  case  in  material  and  production  logistics.  In  this

case, an output batch is to adopt the visible batch number of the input batch used.

Usage/Procedure

In contrast to normal input and output batch processing in an operation requiring batch management, in

throughput batch processing an input batch with a batch number is used and this batch number is handed

down to the output batch.

Throughput batch processing is used for instance if the condition of a batch/material might change after a

work stage but the external batch number (e.g. on a label) is to be retained.

As a consequence, no new material will occur when the output batch is changed and the batch number

can even be handed down through several process steps.

The operator uses an input batch on a machine/operation. The output batch number is not changed and

hence remains identical to the input batch number.

The so-called throughput batch number (throughput batch number/external batch number) therefore

remains identical. Within the system, however, a unique batch number (HYDRA batch number/internal

batch number) is still used and/or generated for each production level/after each output batch change,

since every object within the system is unique.

AIP-MPL_82.docx

Version: 1.1.23049

Page 74 of 95

Collection / Information Functions for Material

If, for instance, a selection according to throughput batch numbers is made in the batch data overview,

several entries with different internal batch numbers will be obtained for each throughput batch number;

these internal batch numbers ensure unambiguity within the system and consequently allow for a historic

observation of the "throughput batch".

This means that a total of three different statuses are considered for the process description:

  Status 1: The batch as an input batch (prior to logon)
  Status 2: The batch status on the machine (running on OP)
  Status 3: The batch as an output batch (after logoff)

The batch as an input batch (prior to logon):

Prior  to  logging  on  the  batch,  the  information  on  the  batch  (e.g.  in  the  batch  data  overview)  reads  as

follows:






the throughput batch number dllosnr  "DLLOS01"  is identical to the batch number losnr
"DLLOS01"
the batch status is "F“ (free)
the throughput batch flag dll_kennz is "N“

The batch status on the machine (running on OP)

When an operation is logged on to the terminal, the material (the material number) is used according to

the component list from the OP in order to determine whether it is treated as a throughput batch on the

basis of the material type entered for this material. This procedure also enables logging on the throughput

batch  number  on  this  operation.  It  is  not  possible  to  log  on  more  than  one  input  batch/material  as

"throughput batches".

After

logging  on

the  batch  (with

throughput  batch  number/external  batch  number)  on

the

operation/machine, the information on the batch reads as follows:




the batch status is changed to "L" (running)
the batch receives the throughput batch flag dll_kennz "E“ (throughput input batch running)

After  logging  off  the  output  batch  on  the  OP/machine,  a  new  internal  object  is  created  in  the  system  to

take over the throughput batch number of the input batch.

The information on the new output batch then reads as follows:

AIP-MPL_82.docx

Version: 1.1.23049

Page 75 of 95

Collection / Information Functions for Material

  a new batch with losnr PR41E9C114 and dllosnr DLLOS01 is created in the output buffer


  The quantity on the new batch is identical to the quantity of the original input batch.

the status of the new batch is changed to "L" and
the batch receives the throughput batch flag "G".

Functionality: Console Evaluation of Throughput Batches

An operator can identify and trace a created batch via the external batch number (e.g. in order to be able

to forecast when a specific batch will leave production).

Material Movement Functionality

An operator can call up the material movements (goods issue/goods receipt) for an input batch/output

batch.

Batch History Functionality

An operator can list the batch history of an output product in order to be able to trace the manufacturing

process of a batch for analyses.

Batch Tracing Functionality

An operator can use the batch tracing functionality to verify through which machines/operations the

throughput batch was produced. The operator thus sees the material's route through production.

AIP-MPL_82.docx

Version: 1.1.23049

Page 76 of 95

Collection / Information Functions for Material

20  Throughput Batch Processing

Summary

A machine/workplace may also be configured in "throughput batch mode".

In  throughput  batch  mode  input  material  is  continued  being  processed  with  unchanged  number

(throughput batch number) using an OP.

Please note: At machines with “throughput batch mode” it is impossible to log operations on at the same

time.

Configuration

How to configure throughput batch processing is described here.

Dialog

The entry functions for throughput batch processing at the terminal are identical to those for active batch

tracing at the machine.

AIP-MPL_82.docx

Version: 1.1.23049

Page 77 of 95

21 Configuration for Throughput Batch Processing

Collection / Information Functions for Material

Overview

Usage

In material and production logistics, the batch number of an input batch can be handed down to an output

batch and thus make so-called throughput batch processing possible.

However,  in  order  to  enable  throughput  batch  processing,  the  following  configurations  are  required  on

various objects.

Machine Configuration

In  the  machine  configuration  (Master  data    Workplaces/machines    Workplace  configuration),  the

batch management in the Workplace configuration (MPL) tab is to be set to value "D".

When throughput batch processing is active on the machine, the "Automatic generation of batch number"

option  cannot  be  used,  since  in  this  case  the  batch  number  will  always  be  handed  down  by  the  input

batch.

The  entry  of  machine  cycles  in  combination  with  throughput  batch  processing  is  not  used  in

general,  since  there  is  always  a  1:1  transfer  of  input  batches  into  output  batches.  For  this

reason,  throughput  batch  recording  is  generally  only  used  in  connection  with  manual  unit

posting at the terminal (e.g. use in furnace, conditioning, etc.).

Configuration of Material Type

In the master data configuration (Master data  Material  Material type), the material type  is to be

configured in such a manner that the batch number is "handed down" and the input batch is only valid for

one output batch.

  Retrograde inventory management is generally not performed for the component whose

batch number is transferred as a throughput batch, since consumption is always 1:1.

  A parallel log-on of the input batch on several machines is not supported by the system.

  The entry of unknown input batches is not supported by the system.

Configuration at the Operation

The configured material type is to be entered as the material type at the operation.

AIP-MPL_82.docx

Version: 1.1.23049

Page 78 of 95

Collection / Information Functions for Material

The operation is to be identified as requiring batch management.

Configuration at the Operation - Component

The configured material type is to be selected as the material type at the component.

In addition to the component for which the batch number is to be handed down, other material

components can be maintained at the operation. These continue to be taken into account in the

usual way in the course of batch log-on and consumption recording.

AIP-MPL_82.docx

Version: 1.1.23049

Page 79 of 95

Collection / Information Functions for Material

22  Batch Consumption

Usage

Material is used and represented in the system by:

  material postings to regulate inventories with/without ERP and without tracing

  batch-related material postings to trace back the recorded parts/materials

Subject to the type in use, consumption can be recorded differently in the system.

Procedure

These types of consumption recording are used in MES:

Discrete consumption recording:

Discrete  consumption  recording  is  used  every  time  when  a  discrete  amount  of  consumption  can  be

entered  for  the  used  components  by  the  user  or  a  counter.  Data  is  only  entered  for  the

component/material number. Data may be collected:

  automatically (configuration of a consumption meter per material)

  manually (the user enters material consumption manually)

Batch-related consumption recording:

AIP-MPL_82.docx

Version: 1.1.23049

Page 80 of 95

Collection / Information Functions for Material

Batch-related consumption recording is used every time when batches are used for the components for

which a consumed quantity can be entered by the user or a meter. Data is collected regarding the input

batch. Data may be collected:

  manually (dialog to log off the input batch and to enter batch consumption manually)



in a retrograde manner/backflush (automatic calculation of batch consumption by generating the

output batch quantity)

  automatically (automatic collection of batch consumption by a consumption meter)

Discrete consumption - manual

How to enter discrete consumption is described here.

Discrete consumption - automatic

General

Automatically recorded consumption is collected by a meter configured at the machine. Data is collected

for a material type of materials included in the component list.

Configuration

These  configurations  have  to  be  set  in  the  system  if  material  consumed  discretely  is  to  be

indicated/counted by a meter:

  Component of the OP:

The "consumption type" has to be set to "D = discrete".

  Material type of the material:

The option "inventory management" has to be set to "N = No".

  Meter for the material type of the material:

Configure meter like MDE meters.

Option "compensation with material" = yes

Option "material type" = material type of the material that is consumed

Posting/result

A goods issue is generated for automatically recorded consumption in the system.

Manual batch consumption

General

AIP-MPL_82.docx

Version: 1.1.23049

Page 81 of 95

Collection / Information Functions for Material

Manual batch consumption is entered by the input batch change function. The user enters the consumed

quantity when logging the used input batch off.

Configuration

These configurations have to be set in the system if material is to be consumed manually as input batch:

  Component of the OP:

The option "consumption type" has to be set to "L = Backflush/with batch reference (retrograde)".

  Material type of the material:

The option "inventory management" has to be set to "E = Yes, when logging input batch off".

Posting/result

The consumed quantity is deducted from the remaining quantity of the input batch and the batch shows

the reduced "remaining quantity" and the initial quantity.

A goods issue is generated for consumption in the system.

How to enter batch-related consumption is described here.

Retrograde batch consumption

General

Retrograde  batch consumption is calculated continuously  as the  output batch quantity increases. When

logging  the  input  batch  off,  the  remaining  quantity  of  the  input  batch  is  reduced  by  the  calculated

consumption  quantity.  Usually,  the  user  does  no  longer  enter  a  quantity  when  logging  the  used  input

batch off.

Configuration

These configurations have to be set in the system if material is to be consumed in a retrograde manner

as input batch:

  Component of the OP:

The option "consumption type" has to be set to "L = Backflush/with batch reference (retrograde)".

  Material type of the material:

The  option  "inventory  management"  has  to  be  set  to  "R  =  Yes,  backflush  (retrograde)"  or  "G  =

Yes, backflush (only with YIELD batch), retrograde".

Posting/result

AIP-MPL_82.docx

Version: 1.1.23049

Page 82 of 95

Collection / Information Functions for Material

The quantity calculated in a retrograde manner is deducted from the remaining quantity of the input batch

and then the batch shows the reduced "remaining quantity" and the initial quantity.

A goods issue is generated for consumption in the system.

Automatic batch consumption

General

The automatically recorded batch consumption is collected continuously as the meter quantity increases.

When logging the input batch off, the remaining quantity of the input batch is reduced by the automatically

recorded consumption quantity. Usually, the user does no longer enter a quantity when logging the used

input batch off.

Configuration

  Component of the OP:

The option "consumption type" has to be set to "L = Backflush/with batch reference (retrograde)".

  Material type of the material:

The option "inventory management" has to be set to "R = yes, backflush (retrograde)".

  Meter for the material type/BOM item of the affected material:

Configure meter like MDE meters.

Option "compensation with material" = yes

Option "material type" = material type of the material that is consumed

or

Option BOM item = BOM item of the material that is consumed

If  the  BOM  item  is  used  within  meter  configuration,  it  is  important  that  within  the  OP's

component list the material is always used as the same BOM item (from ERP work plan).

Posting/result

The automatically recorded quantity is deducted from the remaining quantity of the input batch and then

the batch shows the reduced "remaining quantity" and the initial quantity.

A goods issue is generated for consumption in the system.

AIP-MPL_82.docx

Version: 1.1.23049

Page 83 of 95

23  Discrete Consumption Input

Collection / Information Functions for Material

Usage

Key input  values  when collecting shop floor data are  times and quantities. While times or durations are

used  to  describe  the  time  effort  that  was  required  to  manufacture  a  material,  quantities  document  the

entire scope of the produced material. The objective is to process or output the material quantities defined

in the order or the operation

In most cases, the quantities entered are sufficient to be able to execute the actions that will change stock

quantities in the upper-level ERP system accordingly:

  Goods receipt from production

The finished quantity will increase stock in the ERP system.

  Goods issue from production

Based on the finished quantity, the consumption of the material that flowed in (so-called input

material) can be calculated in reverse order of the production process in the ERP system, accounting

for the bill of materials the order is based on. This will lead to a reduction of stock in the ERP system.

However,  this  kind  of  consumption  calculation  is  oftentimes  not  enough  to  ensure  a  "clean"  inventory

management  in  the  upper-level  ERP  system.  Instead,  there  is  a  need  to  discretely  enter  order-related

material consumption and to then post the consumption later in the ERP system.

You  make  use  of  this  functions  package  if  you  would  like  to  enter  material  consumption  discretely  and

without a batch reference and upload it to an inventory management system.

Integration

The  function  can  be  integrated  into  a  system  dedicated  to  shop  floor  data  collection  (BDE),  or  also  be

used within the context of material and production logistics (MPL/ TRT).

These functions are used:

  Functions for discretely entering order-related material consumptions without a batch reference.

  Posting  dialog  at  the  Windows  Terminal  AIP  to  input  discrete  consumptions  relating  to  material

components during operation logoff, OP interruption or partial confirmation/upload.

  Entry based on the produced and manually entered total quantity or yield and/ or scrap.

AIP-MPL_82.docx

Version: 1.1.23049

Page 84 of 95

Collection / Information Functions for Material

  Providing material consumptions for confirmation/upload from HYDRA to the inventory management

system in HYDRA standard format (requires that the interface used to upload material and batch data

is licensed and activated).

AIP-MPL_82.docx

Version: 1.1.23049

Page 85 of 95

Collection / Information Functions for Material

24  Discrete Consumption Input at AIP



Summary

The  function  described  below  makes  it  possible  to  enter  material  consumption  at  the  AIP  shop  floor

terminal so that it can be uploaded via an interface in the form of goods movements.

Material  consumption  can  be  entered  at  the  AIP  shop  floor  terminal  while  an  operation  is  being

interrupted, while an operation is being logged off or when entering a partial confirmation/upload

Configuration

The document dealing with the configuration is to be taken into account for discrete consumption input.

Dialog and procedure

AIP provides the following features to enter material consumption based on the produced (total) quantity.

In the dialogs

  Log operation off (A_AB)



Interrupt operation (A_UN)

  Partial confirmation/upload for operation (A_TR)

an additional "consumption" button is available with which the "Component consumption posting" dialog

can be called up.

It  is  also  possible  to  make  the  button  available  that  is  used  to  call  up  the  "Component

consumption  posting"  dialog  from  the  MPL  specific  dialogs  used  for  operation  interruption

(A_UN_MPL,  A_UN_RF,  A_UN_RS)  or

for  operation

log  off  (A_AB_MPL,  A_AB_RF,

A_AB_RS). However, what needs to be considered in this regard is that in MPL, consumption of

batch-related material is posted differently.

Figure: "Partial confirmation/upload (A_TR)" dialog with "Consumption" button in AIP

AIP-MPL_82.docx

Version: 1.1.23049

Page 86 of 95

Collection / Information Functions for Material

The input dialog opens after the "Consumption" button is pressed.

The  status  information  shown  includes  the  workplace  displayed  in  the  dialog  from  which  the  function  is

called  up,  the  operation  and  also  the  yield  and  scrap  quantities  entered  in  the  dialog  from  which  the

function  is  called  up.  When  calling  up  from  an  MPL  dialog,  the  entered  quantity  is  displayed  based  on

whether classified ("Quality") as scrap or as yield.

Furthermore,  a  table  is  displayed  showing  the  components  that  are  flagged  in  the  component  list  as

consumption type "D". The following data is displayed in the table.

BOM item

BOM item

Input.Mat.No.

Material number of the material component.

Input.Mat.Des.

Material designation of the material component.

Consumption

Calculated  consumption  based  on  the  quantity  entered  in  the  dialog  from  which  the  function  is

called

up:

Only  yield  and  scrap  quantities  are  taken  into  account  when  calculating  the

consumption.

Quantities  are  not  set  off  against  each  other  (e.g.  scrap  set  off  against  yield)  when

the calculated consumption is determined.

Unit

Quantity unit (unit of the input quantity).

Input quantity

Input quantity required to produce one quantity unit of the output material.

When  a  component  is  selected  from  the  list,  the  calculated  consumption  is  proposed  in  the

"Consumption"  input  field.  If  the  actual  consumption  deviates  from  the  calculated  consumption,  the

operator  can  now  modify  this  quantity;  it  is  transferred  to  the  list.  Any  consumption  that  was  modified

manually is shown highlighted in "green" in the list (e.g.

).

By  pressing  the  "Reset"  key,  the  component  list  can  be  called  up  again;  this  will  recalculate  the

consumption quantities; any consumption quantities that were already modified will be overwritten.

AIP-MPL_82.docx

Version: 1.1.23049

Page 87 of 95

geEinsatzmenAusschussGutmengeVerbrauchrchnerische*Re

Collection / Information Functions for Material

After confirming this dialog and the dialog from which the function is called up, the consumption quantities

are updated and are thus transferred to the server via the posting . There, the consumption is updated as

the  status  in  the  component  list  at  the  operation.  In  addition,  one  material  movement  (goods  issue)  is

written for each component.

The  material  consumption  is  only  posted  as  a  goods  movement  if  the  dialog  was  called  up

explicitly.  Material  consumptions  that  were  not  posted  are  not  automatically  posted  when  the

operation is logged off or interrupted.

If the consumption input dialog is integrated in the partial upload dialog and if it is not called up when a

partial  upload  is  executed  or  when  the  entry  is  interrupted,  the  system  will  remember  the  calculated

consumption for all material components of the consumption type "D" and will account for it the next time

the consumption input dialog is called up.

Example (assumption: a material component with the input quantity 2 is defined at the operation):

  Call up the partial upload dialog (A_TR): Enter yield 9, scrap 1

  Call up the consumption input dialog (A_VERB)



(9 * 2 + 1 * 2 =) 20 is proposed as material consumption

  Cancel the dialog (do not click on OK to confirm)

  Confirm the partial confirmation/upload dialog (A_TR)

  The yield 9 and the scrap 1 are posted at the operation.

  The system remembers the calculated consumption of 20

  Call up the partial upload dialog (A_TR) once more: Enter yield of 5

  Call up the consumption input dialog (A_VERB)



(20 + 5 * 2 =) 30 is now proposed as material consumption

  Confirm with OK

  Confirm the partial confirmation/upload dialog (A_TR)

  The yield 5 is posted to the operation

  The consumption of 30 is posted as a goods movement

If  after  calling  up  the  consumption  input  dialog  it  is  canceled  and  thus  closed  and  the  quantity  is  then

modified  in  the  dialog  that  calls  up  the  function  and  if  then  the  consumption  input  dialog  is  once  again

called up, then the consumption quantities that  were proposed the first time it was called up  will still be

shown in this dialog. This is why the proposed material consumption will need to be updated by clicking

on the "Reset" button as the case may be.

AIP-MPL_82.docx

Version: 1.1.23049

Page 88 of 95

Collection / Information Functions for Material

25  Configuration of Discrete Consumption Input



Summary

Material  consumption  can  be  entered  at  the  AIP  shop  floor  terminal  while  an  operation  is  being

interrupted, while an operation is being logged off or when entering a partial confirmation/upload

System configuration

The  relevant  utilization  material  must  be  assigned  to  the  operation  in  order  to  discretely  record

consumption. The meaning of the following fields must be observed  in particular (logical consideration).

The material components can be assigned in HYDRA manually (Order management: edit components) or

from the upper level system

Material number

The material number uniquely identifies a material. In the component list, a material is only unique

in association with a BOM item.

BOM item

The BOM item combined with the material number forms a unique key for a material component at

an operation.

Material designation

The material designation is used to describe a material more exactly. It functions as commentary

and is displayed in the input dialog.

Material category (type)

The material category controls, among other things, the way a material is technically processed in

the  HYDRA  system.  Relating  to  the  material  consumption  input  (not  batch-related),  the  following

value is important:

"M"   Material component, should be entered in terms of consumption

Material type

The material type is another parameter used for processing control in HYDRA. The material type is

used  to  control  whether  goods  movement  created  from  the  material  consumption  should  be

uploaded  to  the  ERP  system  or  not.  Unless  defined  otherwise  assign  the  material  type  SYSTEM

here.

To assure that a goods issue is uploaded via the interface, the option "Transfer to interface"  must

be set at the material type that the utilization material is based on.

AIP-MPL_82.docx

Version: 1.1.23049

Page 89 of 95

Collection / Information Functions for Material

When  launching  HYDRA  for  the  first  time  or  during  discrete  consumption  input,  it  will  need  to  be

coordinated  whether  or  for  which  material  components  consumption  should  be  uploaded  to  the

ERP  system.  If  the  MPL  module  is  not  used,  this  configuration  is  to  be  made  during  the  HYDRA

customizing process.

Consumption type

Set  the  consumption  type  to  "D"  (discrete  consumption  input)  for  material  components  that  this

function is used for to collect material consumption.

It is  possible to transfer the consumption type using  the relevant component segment of

the ERP interface (EIS-ERP). When using the HYINFO interface as a part of the PP-PDC

interface, the consumption type is made available by customizing the system accordingly.

The interface necessary to upload material consumption is not a part of this function.

Input quantity

The  input  quantity  is  a  component  quantity  needed  to  manufacture  one  unit  (one  piece,  for

example) of the output material (article/item) being produced. It is used to calculate the theoretical

material consumption based on the produced quantity.

Unit

Quantity unit of the material component in which material consumption is recorded.

Dialog configuration

In addition to making the necessary programs available, please also consider the following:

  Activate the dynamic dialog A_VERB, accounting for existing terminal groups in some cases



Integrate the button used to call up the consumption input dialog in the relevant posting dialogs. The

following configurations are possible here, whereas a) can be seen as an alternative to b) and c):

a.

Integration

into

the

workflow

step

WF_AA_QUA.

The button is found in the standard dialogs

  Interrupt OP (A_UN),

  Log off OP (A_AB), and

  Partial confirmation/upload (A_TR)

  in each workflow step in which quantities are entered manually.

b.

Integration

into

the

workflow

dialog

WF_AUN_CHK

The  button  is  available  in  the  standard  dialog  Interrupt  OP  (A_UN)  in  the  confirmation

workflow step.

c.

Integration

into

the

workflow

dialog

WF_AAB_CHK

The  button  is  available  in  the  standard  dialog  Log  off  OP  (A_AB)  in  the  confirmation

workflow step.



Integrating or checking the grid configuration for the dialog A_VERB (ctaiplay.ini)

AIP-MPL_82.docx

Version: 1.1.23049

Page 90 of 95

  Optional: Uploading the material consumption as goods movement

Collection / Information Functions for Material

  Determining  which material type  is transferred to the material component from the ERP

system (typically SYSTEM)

  Setting the flag "Transfer to interface" at the material type. Options:

  Directly via the master data configuration (only possible, if MPL/ TRT is active)

  Per

SQL

to

the

HYDRA

server

(hysql

-r

-):

update hz_typen set we_ext_kz = 'J' where hz_typ = 'SYSTEM';

  Per SQL via the SQL tester in MOC:

 update  hz_typen  set  we_ext_kz  =  'J'

where hz_typ = 'SYSTEM'

  Per BAPI to the HYDRA server (Observe system!):

hymwb -u9999 -

c"DLG=MATTYP.UPDATE|MATTYP.MATTYP=SYSTEM|MATTYP.WEEXT:GEN

=J|DAT=today|ZEI=now|"

  Check per SQL: select hz_typ, we_ext_kz from hz_typen

  Activate the material upload interface (see relevant documentation).

AIP-MPL_82.docx

Version: 1.1.23049

Page 91 of 95

26  AIP - on-screen keyboard decimal symbol configuration

Collection / Information Functions for Material

Overview

Menu

All AIP input screens

Transaction code

n/a

Function authorization

n/a

You  cannot  use  the  numeric  on-screen  keyboard  (virtual  keyboard)  to  enter  decimals,  if  you  configure

different decimal symbols in the keyboard settings and the regional settings of the operating system.

Solution: Keyboard settings and regional settings should match. Example: if you configure a comma "," as

the decimal symbol in the regional settings, you also have to select a comma as the decimal separator in

the keyboard settings.

Purpose

Every time you start the AIP, the application identifies which decimal symbol is displayed and expected in

the input field. The AIP application gets this information from the Windows system setting "region".

AIP-MPL_82.docx

Version: 1.1.23049

Page 92 of 95

Collection / Information Functions for Material

Every time you start the on-screen keyboard, the keyboard identifies which decimal symbol is displayed

on  the  numeric  keypad.  The  on-screen  keyboard  gets  this  information  from  the  currently  selected

keyboard settings:

Integration

If you set both configurations correctly (see above), you can use the numeric on-screen keyboard to enter

decimals (see the following screenshot):

AIP-MPL_82.docx

Version: 1.1.23049

Page 93 of 95

Collection / Information Functions for Material

If the configurations do not match, for example:

- you select the "comma" in the "region" tab of the Windows system settings and

- you select the "decimal point" in the keyboard settings

you cannot use the on-screen keyboard to enter the decimal symbol:

AIP-MPL_82.docx

Version: 1.1.23049

Page 94 of 95

Collection / Information Functions for Material

AIP-MPL_82.docx

Version: 1.1.23049

Page 95 of 95

