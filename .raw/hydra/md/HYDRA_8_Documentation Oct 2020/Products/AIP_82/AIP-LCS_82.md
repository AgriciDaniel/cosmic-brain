Manual

Special Collection Functions
for MES Batches, ERP
Batches, Serial Numbers
AIP-LCS 8.2

Version 1.1.23049

Last changed on: 01.09.2020

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying  and  distribution  of this  documentation  or  any  part thereof,  for  any  purpose  or  in  any  form, is  prohibited  without  prior
written permission from MPDV Mikrolab GmbH.

AIP-LCS_82.docx

Page 2 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

The information contained in this documentation is subject to change without prior notice.

AIP-LCS_82.docx

Page 3 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Contents

1  Special Data Collection Functions for Batches and Serial Numbers ........... 7

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

5  Barcode Input with Prefix ........................................................................... 35

5.1  Configuration of customized barcode prefixes ................................................... 39

6  AIP2 -Local Configuration .......................................................................... 41

6.1

Local Configuration ctaip.ini .............................................................................. 41

6.2  PNG – Files / Bitmaps ....................................................................................... 45

6.2.1  File pict.zip ............................................................................................ 45

6.2.2  File pict_cust.zip .................................................................................... 45

6.3  Multilingualism (*.mld files) ................................................................................ 46

7  AIP2 - Central Configuration File hytnrcfg.ini ............................................. 47

7.1

Layout configuration .......................................................................................... 50

8  Collection of Serial Numbers ...................................................................... 53

9  Collection of Serial Numbers at AIP ........................................................... 63

AIP-LCS_82.docx

Page 4 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

10  Configuration for the Collection of Serial Numbers .................................... 68

11  Merging Serial Numbers ............................................................................ 73

12  Merging Serial Numbers on the AIP .......................................................... 76

13  Configuration of Merging Serial Numbers .................................................. 83

14  Separate/Rebuild Serial Numbers.............................................................. 88

15  Separate/Rebuild Serial Numbers at AIP ................................................... 91

16  Configuration for Separating / Reposting Serial Numbers ......................... 96

17  Variants of Batch Grouping ...................................................................... 100

18  Create/Cancel Group Batch ..................................................................... 106

19  Create / Cancel Group Batch ................................................................... 110

20  Batch Grouping ........................................................................................ 114

21  Grouping of Batches ................................................................................ 117

22  Decision on Changing Input Batch ........................................................... 119

23  Decision on Changing Input Batch ........................................................... 121

24  Configuration of Decision on Changing Input Batch ................................ 123

25  Splitting Batches ...................................................................................... 124

26  AIP Batch Splitting ................................................................................... 126

27  Splitting Batches in the AIP ...................................................................... 132

28  Merging Batches ...................................................................................... 134

AIP-LCS_82.docx

Page 5 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

29  AIP Batch Merge ...................................................................................... 136

30  Configurations for Merging Batches in the AIP ........................................ 140

31  Advanced Batch Information .................................................................... 143

32  Additional Batch Information .................................................................... 150

33  Weighing Components ............................................................................. 153

34  Weighing of Components ......................................................................... 156

35  Configuration of Weighing Components .................................................. 162

36  Palletizing  and Packing on the AIP ......................................................... 164

37  Activating Palletizing/ Packaging/ Assembling ......................................... 171

38  Consumption Balance .............................................................................. 173

39  Configuration of Consumption Balance ................................................... 176

40  AIP - on-screen keyboard decimal symbol configuration ......................... 178

AIP-LCS_82.docx

Page 6 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

1  Special Data Collection Functions for Batches and Serial

Numbers

Purpose

The AIP features provided in this function package make it possible to enter batch-related data directly

in production using shop floor terminals or data acquisition PCs.

Integration

Data  entered  via  the  AIP  terminal  can  be  displayed  and/or  evaluated  in  different  MOC  applications.

Collected data can be uploaded via interfaces.

Features

Besides  batch  data,  HYDRA  shop  floor  clients  (AIP)  also  collect  and  generate  serial  numbers  to

provide  for  complete  documentation  and  traceability.  The  function  package  additionally  provides

further special features for palletizing, packaging, assembling/finishing and weighing of components.

Functions to collect and use serial numbers:

  Predefined series or serial numbers are transferred in HYDRA standard format via the HYDRA

  ERP interface

  Serial  numbers  are  entered  or  generated  via  a  user-friendly  posting  function  at  the  BDE

terminal

  Option to assign components also identified by serial numbers

  Classification into yield/ scrap quantities with reasons

  Automatic generation of goods receipts/ goods issues

  Optional verification of serial numbers already defined for the order

  Entry of order-related series and serial numbers in order to identify processed parts

  Validation check for already posted series or serial numbers

  Display  of  available  and  already  used  series  or  serial  numbers  at  workstation  PCs  (MES

Operation Center)

  Upload of posted series and serial numbers in HYDRA standard format via the HYDRA ERP

interface

Functions for palletizing / packaging / assembling/finishing:

  Mapping of specific data collection processes for palletizing and packaging at packing stations

AIP-LCS_82.docx

Page 7 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

  Generation of handling units at the BDE terminal

  Function  to  edit  handling  units  (e.g.  assigning  batches  and  removing  batches  from  handling

units)

Functions to weigh components:

  Display of the components to be weighed

  Management of multiple charges for each weighing order

  Presentation of target / actual quantities for each component and charge

  Weight recording via the interface connected to the scale

  Warning if tolerance quantities are exceeded or not reached

  Function to correct quantities and/or to change charge quantities for components

  Validation check for weighed batches

Additional licenses may be needed in order to use the functions listed above. Adding and coordinating

the specific requirements and implementing them are considered a customized HYDRA service.

AIP-LCS_82.docx

Page 8 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Page 9 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Page 10 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Page 11 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Page 12 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Page 13 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

As  long  as  the  dialog  has  not  been  confirmed,  the  data  entered  can  be  changed  at  any  time  by

scrolling back and forth.

Filter field for the list

Status list

In the second view Select status, you select the workplace status that is set, when the operation has

been  interrupted.  You  can  select  the  status  from  the  status  list  displayed.  This  list  can  be  restricted

using  the  Filter  field.  Once  the  required  values  have  been  entered,  the  next  view/sub-dialog  can  be

opened by clicking Next (in our example it is the last view).

AIP-LCS_82.docx

Page 14 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Page 15 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Page 16 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Page 17 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

3.2  Main view with "tiles"

List of workplaces

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

AIP-LCS_82.docx

Page 18 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Page 19 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Page 20 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Page 21 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Page 22 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Page 23 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Page 24 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Page 25 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Page 26 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Page 27 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Page 28 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Page 29 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Page 30 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Page 31 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Page 32 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Page 33 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Page 34 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Page 35 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Page 36 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Page 37 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Prefix

16.

Barcode

*16.123456*

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

AIP-LCS_82.docx

Page 38 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Page 39 of 181

01.09.20

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

AIP-LCS_82.docx

Version: 1.1.23049

Page 40 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

6  AIP2 -Local Configuration

6.1  Local Configuration ctaip.ini

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
(functions\*.dll)
the
terminal.

from  being  synchronized  when  starting

VirtScreenSize=640

All windows are started with the indicated resolution

AIP-LCS_82.docx

Version: 1.1.23049

Page 41 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Entry

VirtScreenRatio=16:9

Section [SKIN]

Saturation=0

Hue=0

Name=mpdv

Active=false

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

AIP-LCS_82.docx

Version: 1.1.23049

Page 42 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Version: 1.1.23049

Page 43 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Version: 1.1.23049

Page 44 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Version: 1.1.23049

Page 45 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Customize footer

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

AIP-LCS_82.docx

Version: 1.1.23049

Page 46 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Version: 1.1.23049

Page 47 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Version: 1.1.23049

Page 48 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Version: 1.1.23049

Page 49 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Version: 1.1.23049

Page 50 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Version: 1.1.23049

Page 51 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

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

AIP-LCS_82.docx

Version: 1.1.23049

Page 52 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

8  Collection of Serial Numbers

General

Serial  numbers  are  assigned  to  be  able  to  differentiate  between  individual  items  of  material.  Wikipedia

provides the following definition for serial numbers:

A  serial  number  (also  manufacturer's  serial  number  or  MSN)  is  a  unique,  alphanumeric  code

assigned  for  identification  of  a  single  unit.  Although  usually  called  a  number,  it  may  include

letters,  though  ending  with  digits.  Serial  numbers  are  used  to  identify  elements  pertaining  to

series  production  also  providing  information  about  production  conditions  and  thus  enabling

traceability of the used components, also for electronic products.

Serial numbers can be:

  generated/assigned at the end of the production process

  generated/assigned in earlier stages of the production process and monitored by the process



integrated as used components in the production process and monitored by the process

Merging serial numbers represents the assembly of several components listed by serial number

into one component part listed by serial number.

MES supports manufacturing businesses in many ways with the collection of serial numbers and enables

complete traceability based on the data recorded in MES.

Definition of the supported variants

MES provides different variants to record serial numbers:

Variant  Description of the variant  Description

Documentation

AIP-LCS_82.docx

Version: 1.1.23049

Page 53 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Variant  Description of the variant  Description

Documentation

1

Entry  of  serial  numbers  for

Recording  of  serial  numbers  for  operations

here

OPs  that  are  not  subject  to

that  are  not  managed  in  batches  enables

management in batches

the collection in relation to serial numbers if

incorporated  materials  their  batches  and

consumptions  are  not

required

to  be

recorded.

The  production  order  specifies  the  serial

numbers  to  be  processed  as  part  of  a

production order.

For  each  operation  the  user  identifies  the

serial

numbers

and

classifies

them

according  to  the  produced  quality.  The

system  makes  sure  that  this  process  can

only  be  performed  once  for  each  serial

number and operation.

2a

Entry  of  serial  numbers  for

The  user  enters  the  serial  number  and  the

here

OPs

that  are  subject

to

system is informed about it. In this case, the

management  in  batches  -

serial  number

is  generated

in  another

manual  input  of  the  serial

system.

number

The  recorded  serial  number  is  assigned  a

HYDRA batch number.

2b

Entry  of  serial  numbers  for

In this case, the system generates the serial

here

OPs

that  are  subject

to

number

in

an

unambiguous

format

management  in  batches  -

applicable

to

the  whole  system.  Serial

automatic  assignment  of

numbers  are  generated  according  to  the

serial numbers

rules  applying  for  the  generation  of  batch

numbers.

In  this  case,  the  serial  number matches  the

HYDRA batch number.

AIP-LCS_82.docx

Version: 1.1.23049

Page 54 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Variant  Description of the variant  Description

Documentation

2c

Entry  of  serial  numbers  for

In this case, the system generates the serial

Here

OPs

that  are  subject

to

number

in

an

unambiguous

format

management  in  batches  -

applicable

to

the  whole  system.  Serial

automatic  assignment  of

numbers  are  generated  according  to  the

serial numbers

rules  applying  for  the  generation  of  batch

numbers.

The  serial  number  is  assigned  a  HYDRA

batch number.

2d

Entry  of  serial  numbers  for

In addition, to the conventional generation of

This document

OPs

that  are  subject

to

output  batches,

the  system  particularly

management  in  batches  -

supports  the  generation  of  merged  batches

automatic  transfer  of  serial

including

individually

assigned

serial

numbers  by  using

input

numbers.  There

is  a  direct  connection

batches.

between  individual  serial  numbers  and  the

generated  output  batch  (merged  batch),

which

logically  embraces

the

serial

numbers.

Serial numbers are taken over as  individual

batches  provided  by

logging  an

input

batch/merged  batch  on.  The  serial  number

is the batch number.

In  addition,  individual  serial  numbers  are

assigned to a superordinate merged batch.

HYDRA batch number vs. serial number

In HYDRA the HYDRA batch number is unambiguous throughout the entire system. The serial number is

kept  throughout  the  complete  process,  provided  that  serial  numbers  have  not  been  merged.

Consequently, it is differentiated between the internal and external HYDRA batch number to represent the

collection of serial numbers:

HYDRA batch number

The HYDRA batch number is the ID by which the serial number is managed in HYDRA throughout

the complete collection process.

The HYDRA batch number is used on labels to identify the material.

AIP-LCS_82.docx

Version: 1.1.23049

Page 55 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

To  ensure  unambiguity  within  the  system,  an  internal  HYDRA  batch  number  is  assigned  and

managed for every HYDRA batch number when recording serial numbers.

Internal HYDRA batch number

The internal HYDRA batch number represents a system-wide, unambiguous ID identifying batches

and serial numbers as an alternative to the HYDRA batch number.

In  contrast  to  the  HYDRA  batch  number;  this  ID  has  to  be  changed  from  production  step  to

production step to keep unambiguity.

This example explains the procedure:

A production order has the following structure:

The  interface  provided  a  merged  batch  with  the  serial  number  "BXC6GF7H".  Upon  posting  this  serial

number, the HYDRA batch number and the internal HYDRA batch number change as follows:

AIP-LCS_82.docx

Version: 1.1.23049

Page 56 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Process step

Batch status  HYDRA  batch

Internal  HYDRA

Comment

number

batch number

Status after transferring the

FREE

BXC6GF7H

BXC6GF7H

Initial status when

number  to  MES  via  the

material interface and prior

to  logging  the  input  batch

on.

the HYDRA batch

number  and  the

internal  HYDRA

batch  number  are

identical.

Status  after

logging

the

RUNNING

BXC6GF7H

BXC6GF7H

No changes

merged  batch  on  to  OP

0010

Status  after  entering  the

Processed

BXC6GF7H

BXC6GF7H

The "old" batch is

serial number at OP 0010

assigned

the

"processed"

status.

FREE

BXC6GF7H

PR1111X112

The  "new"  batch

is  assigned

the

"free"  status,  the

same

HYDRA

batch

number

(serial

number)

and

a

new

HYDRA

internal

batch number

Status  after  entering  the

Processed

BXC6GF7H

BXC6GF7H

The "old" batch is

serial  number  for  the  OP

0020

assigned

the

"processed"

status.

Processed

BXC6GF7H

PR1111X112

The "old" batch is

assigned

the

"processed"

status.

AIP-LCS_82.docx

Version: 1.1.23049

Page 57 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Process step

Batch status  HYDRA  batch

Internal  HYDRA

Comment

number

batch number

Free

BXC6GF7H

PR1111X113

The  "new"  batch

is  assigned

the

"free"  status,  the

same

HYDRA

batch

number

(serial

number)

and

a

new

HYDRA

internal

batch number

Status  after  entering  the

Processed

BXC6GF7H

BXC6GF7H

The "old" batch is

serial  number  for  the  OP

0030

assigned

the

"processed"

status.

Processed

BXC6GF7H

PR1111X112

The "old" batch is

assigned

the

"processed"

status.

Processed

BXC6GF7H

PR1111X113

The "old" batch is

assigned

the

"processed"

status.

Free

BXC6GF7H

PR1111X114

The  "new"  batch

is  assigned

the

"free"  status,  the

same

HYDRA

batch

number

(serial

number)

and

a

new

HYDRA

internal

batch number

As  regards  a  HYDRA  batch  number  (serial  number),  there  might  exist  1-n  HYDRA  batches  at  different

times, whereas only one of the batches may be "free" or "running" at a time.

AIP-LCS_82.docx

Version: 1.1.23049

Page 58 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Please note for the supply via interface

Merged batches and serial numbers can be transferred from other systems (e.g. ERP systems) to MES

via the material staging interface. Some particularities have to be taken into account when transferring the

merged batch/combination of serial numbers:

  This order has to be observed when  transferring serial numbers and their merged batches from

Navision to HYDRA:

1.  Transfer of serial numbers

2.  Transfer of the merged batch record

  The  below  table  shows  how  specific  fields  are  assigned  differently  when  being  transferred  to

HYDRA.

Logical field

Interface field

Merged batch

Serial number

HYDRA internal batch
number

HY_LOSNR

Merged batch number
specified by ERP

Serial number
specified by ERP

HYDRA batch number

DLL

Merged batch number
specified by ERP

Serial number
specified by ERP

PPS batch

PPS batch

Batch number
specified by ERP

Batch number
specified by ERP

Merged batch number

MCNR

BLANK

Merged batch number
specified by ERP

Merged batch ID

SLOS

Fixed "J" (upper case
"j")

BLANK

Merged batch type

SLOSTYP

Fixed "J" (upper case
"j")

BLANK

AIP-LCS_82.docx

Version: 1.1.23049

Page 59 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Logical field

Interface field

Merged batch

Serial number

HU level

HULEVEL

1

0

Inventory type

BESTART

Fixed "H“

"S“

Number of individual
batches

SLOS

Number of included
serial numbers

0

Posting of serial numbers

If a merged batch with assigned serial numbers is finished, the system updates data and generates new

documents in the form of log records and goods movements.

Transfer of data from the operation

This  data  is  taken  over  from  the  running  operation  and  transferred  to  the  merged  batch  and  the

assigned serial numbers:

o  Material and material name

o  Material type

Transfer of entered data to serial numbers and the merged batch

The machine, producing operation, person performing the posting, material buffer and the transport

unit are transferred to the merged batch and the serial numbers included in the merged batch.

Any comment that might be entered is transferred to the merged batch as additional information on

the batch.

The status of the merged  batch and serial numbers is set subject to  the specified quality/class of

the output batch:

Selected class

Assigned batch status

Reason accepted

Yield

Scrap

Rework

Free

Locked

Free

No

Yes

Yes

AIP-LCS_82.docx

Version: 1.1.23049

Page 60 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Selected class

Assigned batch status

Reason accepted

Open quantity

Free

Yes

Batch  attributes  collected  in  relation  to  the  merged  batch  are  transferred  to  the  merged  batch  as

batch attributes.

Batch attributes collected in relation to the serial number are transferred to serial numbers as batch

attributes.

Document  links  collected  in  relation  to  the  merged  batch  are  transferred  to  the  merged  batch  as

document links.

Document  links  collected  in  relation  to  the  serial  number  are  transferred  to  serial  numbers  as

document links.

Quantities of the merged batch

The  generated  merged  batch  includes  the  total  quantities  of  the  serial  numbers  assigned  to  the

merged batch.

The  number  of  assigned  serial  numbers  is  defined  for  the  merged  batch  as  number  of  individual

batches.

Activities for serial numbers

New  batches  with  a  new,  internal  HYDRA  batch  number  are  generated  for  the  serial  numbers

included  in  the  merged  batch  (for  further  details  on  this  procedure,  please  see  section  HYDRA

batch number vs. serial number) and the preceding batches are assigned the "processed" status.

Generation of ADE log records

An H record is generated for the merged batch. This one includes the quantity(ies) of the merged

batch, which in turn result(s) from the quantities of the assigned serial numbers. The batch number

of the merged batch is stored at the H record.

Separate log records are not generated for serial numbers.

Generation of goods movements

The generation of goods movements can be controlled individually for consumptions as well as for

the output material on the level of serial numbers and merged batches.

Consequently, it is possible to adjust the upload of these goods movements to the conditions of the

relevant ERP system.

Details  on  how  to  configure  goods  movements  can  be  found  in  the  configuration  guidelines  for

serial number recording.

Tracing

Tracing information is updated for the merged batch and serial numbers in the system:

AIP-LCS_82.docx

Version: 1.1.23049

Page 61 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

o  The generated merged batch is connected with all integrated input batches logged on at the

time of logging the merged batch on (by logging the OP on or by completing a merged batch

beforehand) or that have been logged on since then.

o  The serial numbers included in the merged batch are also connected with all integrated input

batches  logged on  at the time of logging the merged batch on (by logging the OP on or by

completing a merged batch beforehand) or that have been logged on since then.

Establishing the connection between serial numbers and input batches can be disabled if required.

AIP-LCS_82.docx

Version: 1.1.23049

Page 62 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

9  Collection of Serial Numbers at AIP

Usage

You use the "enter serial number" dialog to enter and track serial numbers in the production process.

Prerequisite

Various configurations have to be made in the system to use the dialog. Further details can be found in

the document dealing with the Description of the configuration to use collection of serial numbers.

"Collection of serial numbers" dialog

The  "enter  serial  number"  dialog  (A_SNR_A)  consists  of  workflows  providing  extensive  possibilities  for

data collection. By default, the dialog includes the following workflow steps:

Workflow step/detailed dialog

Technical name

Usage

Collection of serial numbers

WF_A_SNR_A

This  workflow  step  shows  basic  data  of  the

serial number or the user can enter this data

here.

Merged batch attributes

WF_SNR_ATTR

Entry of batch attributes for the merged batch

Merged batch documents

WF_SNR_DOC

Entry of document links for the merged batch

Serial number data

SNR-DATA

Detailed  dialog

to  enter  additional  data

specific to serial numbers.

The detailed dialog can only be started for a

single serial number.

Depending on the active workflow step, different function keys are provided.

Basically, data is collected in two steps:

  Data collection for serial numbers

Data is collected for serial numbers until a new merged batch can be completed.

Data collection restarts, once a merged batch has been completed.

  Data collection for merged batches

Basically, data is collected for the merged batch when the merged batch is completed; but it may

also be started at an earlier point in time.

AIP-LCS_82.docx

Version: 1.1.23049

Page 63 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

The following diagram illustrates the two acquisition cycles:

Workflow step: "collection of serial numbers"

The  workflow  step  "collection  of  serial  numbers"  has  been  designed  to  enter  data  regarding  one  or

several serial numbers.

The dialog shows the following data that cannot be modified:

Workplace

Current workplace as selected in the basic screen of the terminal.

Operation

Currently running operation as selected in the basic screen of the terminal.

Material

Material produced by the operation as laid down in the operation's article/item.

Merged batch

Merged batch number as defined by the system for the next merged batch to be completed.

The user may enter the following data:

Serial number

Subject to the type of serial number collection, the "serial number" field can be used to:

AIP-LCS_82.docx

Version: 1.1.23049

Page 64 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

  enter serial numbers manually, instead of selecting them manually from the table of serial

numbers





scan serial numbers, instead of selecting them manually from the table of serial numbers

If serial numbers have to be entered manually, they can be entered or scanned manually.

Staff badge number

Entry of the staff badge number is mandatory.

Quality

The  user  may  define  the  quality.  A  reason  has  to  be  entered  for  the  ratings  "scrap",  "open"  and

"rework".

Material buffer (*1)

The material buffer defined for the machine is suggested as the target material buffer.

Comment (*1)

A comment may be entered for the merged batch.

Transport unit (*1)

Suggests the transport unit that is identified as the default unit in the assignment of material types

to transport units regarding the material type of the operation.

If nothing is assigned, "SYSTEM" is suggested.

Transfer (for each merged batch / all merged batches from now on)

For  the  fields  labeled  with  (*1)  it  may  be  specified  if  they  only  apply  for  the  merged  batch  that  is

currently being processed or for this and all future merged batches of this operation.

This definition applies until the operation is interrupted and/or logged off, even for different shifts.

The table of serial numbers shows the serial numbers of the registered input batch that have not yet been

classified for this operation. The quality status (Q status) of serial numbers may be filtered, provided this

status is set by quality data collection.

Single  serial  numbers  can  be  selected  by  double  clicking  the  table.  Selected  serial  numbers  are

highlighted  at  the  left-hand  side  of  the  table  by  an  "X"  with  green  background.  There  are  also  function

keys for mass selections.

There  is  a  number  of  function  keys  facilitating  dialog  handling,  to  input  data  for  serial  numbers  or  to

complete a posting:

Designation

Usage

Close

Closes the dialog.

AIP-LCS_82.docx

Version: 1.1.23049

Page 65 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Designation

Usage

Complete

The  currently  generated  merged  batch

is  completed

for

the

entered/assessed  serial  numbers.  The  merged  batch  number  is

displayed on the terminal.

If  the  user  confirms  it,  the  dialog  can  be  continued  and  remains

opened to enter additional merged batches.

Select all

All serial numbers displayed in the list of serial numbers are selected.

Unselect all

All  serial  numbers  displayed  in  the  list  of  serial  numbers  are

deselected.

Invert selection

Subject to the current state of selection, the system changes it:

  Selected serial numbers are unselected

  Unselected serial numbers are selected

Serial number data

Detailed  dialog to enter  data specific to serial numbers. The detailed

dialog can only be started for a single serial number.

Next

Leads to the next workflow step

Detailed dialog "serial number data - batch attributes"

Batch  attributes may be entered for the serial  number in  the  "serial  number attributes"  workflow step of

the "serial number data" detailed dialog.

The  "attributes"  function  key  allows  entering  attributes  for  a  batch  or  for  all  serial  numbers.  The  input

dialog suggests all attributes that are assigned the "Capture attribute while generating batch" option in the

configuration of batch attributes regarding the operation's material type.

The "go on" function key allows entering document links for serial numbers.

The  list  only  shows  the  recorded  batch  attributes;  batch  attributes  that  might  already  be

available are not shown.

Workflow step - merged batch attributes

Batch attributes may be entered for the serial number in the "merged batch attributes" workflow step.

AIP-LCS_82.docx

Version: 1.1.23049

Page 66 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

The  "attributes"  function  key  allows  entering  attributes  for  the  merged  batch  that  is  currently  being

processed  or  for  this  and  all  future  merged  batches  of  this  operation.  The  input  dialog  suggests  all

attributes  that  are  assigned  the  "Capture  attribute  while  generating  batch"  option  in  the  configuration  of

batch attributes regarding the operation's material type.

The "go on" function key allows entering document links for the serial number.

The list only shows the recorded document links; document links that might already be available

are not shown.

AIP-LCS_82.docx

Version: 1.1.23049

Page 67 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

10  Configuration for the Collection of Serial Numbers

Activation at machine/workplace

These  configurations  have  to  be  made  for  the  machine  /  workplace  to  enable  the  collection  of  serial

numbers:

Parameter name

Value

Workplace  configuration    Workplace  master

N

Machine

data  Workplace category

Workplace  configuration    Workplace  master

E

Single workplace

data  Workplace type

Workplace  configuration    MPL    Batch

L

Batch tracing (input/output batches)

management

Workplace  configuration    MPL    Preceding

If required, define a preceding material buffer.

material buffer

Workplace  configuration    MPL    Subsequent

If required, define a subsequent material buffer.

material buffer

Workplace  configuration    MPL    Automat.

J

Automatic  generation  of  batch  numbers

generation of batch numbers

for production batches (MPL) enabled

Maintain material types - for the operation

Maintain the material types to be defined for the operation and adapt them to your specific requirements

of data collection.

Maintain material types – for components

Maintain  the  material  types  to  be  defined  in  the  component  list  and  adapt  them  to  your  specific

requirements  of  data  collection.  Configure  at  least  the  following  values  for  the  component  that  is

integrated as merged batch including assigned serial numbers in the operation:

Parameter name

Value

AIP-LCS_82.docx

Version: 1.1.23049

Page 68 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Parameter name

Value

Input batch processing  Inventory management  R - Yes, backflush (retrograde)

General  Options  transferred at interface

Enable  this  option  if  you  expect  consumption

postings or final backflushes (notification of goods

receipts) for this material type.

Then another configuration can be used to control

the

transfer  of  merged  batches  and  serial

numbers separately.

Maintain reasons

Maintain  reasons  for  scrap  and  rework  as  well  as  reasons  for  open  quantities,  if  you  use  these  quality

classes.

Maintain transport units

Create transport units in the system if you want to use them for data collection. Assign transport unit ans

according material type.

Assign material types to transport units

If  you  want  to  use  transport  units  and  you  created  them  in  the  system,  you  may  assign  them  to  the

material  types  maintained  in  the  system  and  define  a  default  transport  unit  for  each  material  type.  This

one will then be selected in advance in the input dialog.

Perform the assignment in the assignment of TPU to material type.

Activation at the operation

These options have to be set for the operation.

Parameter name

Batch management requirement

Value

Yes

Serial number requirement

A

Collection of serial numbers

These options are available to edit this information:

AIP-LCS_82.docx

Version: 1.1.23049

Page 69 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Manual maintenance in the operation

Edit the options manually for the operation

Maintenance of processing code (customizing)

Edit the options for the processing code.

Maintenance of the template (customizing)

Edit the options of the processing code with value "A" - collection of serial numbers and assign the

processing code to an operation template.

Explicit specifications for the interface (recommended procedure)

Explicitly transfer the options for the operation at the interface.

Activation in components list

Maintain the input quantity in the component list by entering "1.0" units for components listed as merged

batch including assigned serials numbers. Assign the relevant material types to the components.

Activation of the link between serial number and input batch

For  tracing  it  is  necessary  to  link  the  incorporated  input  batches  with  the  produced  serial  numbers.  To

enable  this  processing, a configuration has to be enabled in  INI configuration. The entry  itself is part of

the default delivery and only needs to be enabled.

Parameter name

INI name

Section

Key

Value

Active

Value

MPL

SERIALNUMBER

CONNECT_SNR_CNR

Y

Enable the entry

Configure batch attributes for data collection when recording serial

numbers

If you want to enter batch attributes manually when collecting serial numbers, create the  batch attributes

to be recorded in the system in relation to the material type of the operation. To do so, maintain at least

these configurations:

AIP-LCS_82.docx

Version: 1.1.23049

Page 70 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Parameter name

Value

Options    Capture  attribute  while  generating

Enable the option.

batch

Options  Position

Specify  the  position  -  the  system  sorts  the

configured  attributes  in  an  ascending  numeric

order (bottom up).

Data type

Maintain the data type and length of the attribute

to be recorded

Control the generation of goods movements

Define  for  incorporated  merged  batches  and  serials  numbers  as  well  as  for  produced  merged  batches

and  serial  numbers  if  you  require  goods  movements  subject  to  uploads  to  be  provided.  To  do  so,

configure the following settings in advanced object configuration:

The goods movement option has to be enabled for the relevant material type to be able to use

this configuration.

Parameter name

Value

Configuration for goods issues (consumptions)

Object type

Object ID 1

Object ID 2

Object ID 3

Object ID 4

Parameter

MPL

SNR - serial number

SAM - merged batch

MATTYP

Material type the entry applies for

CMM_A

CREATE_MOVEMENT

Parameter value

Y

AIP-LCS_82.docx

Version: 1.1.23049

Page 71 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Parameter name

Value

Configuration for goods receipts (generated material)

Object type

Object ID 1

Object ID 2

Object ID 3

Object ID 4

Parameter

MPL

SNR - serial number

SAM - merged batch

MATTYP

Material type the entry applies for

CMM_E

CREATE_MOVEMENT

Parameter value

Y

AIP-LCS_82.docx

Version: 1.1.23049

Page 72 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

11 Merging Serial Numbers

Usage

Merging serial numbers allows for different material components listed by serial numbers to be combined

specifically  into  one  new  component  part.  The  serial  number  of  the  new  component  part  may  be  the

number of one of the incorporated serial numbers or assigned anew.

Process of merging serial numbers

Merging serial numbers is based on the management of serial numbers incorporated in  merged batches

registered  as  input  batches.  Incorporated  serial  numbers  are  assigned  based  on  the  serial  numbers

included in these merged batches.

This process also outputs a serial number. There are two strategies to get the serial number:

  An integrated serial number is continued keeping the ID

The  indicator  "superordinate  serial  number"  at  the  component  specifies  which  one  of  the

incorporated  components  includes  the  serial  number  ID  that  is  to  be  continued.  These

components and/or their serial numbers are designated as superordinate serial numbers.

For each operation only one component can be assigned the flag "superordinate serial number".

  A new serial number is assigned

If no component is identified as superordinate, the new serial number to be assigned can either

be specified or the system assigns a number automatically.

If a merged batch with assigned serial numbers is finished, the system updates data and generates new

documents in the form of log records and goods movements.

Posting of serial numbers

Transfer of data from the operation

This  data  is  taken  over  from  the  running  operation  and  transferred  to  the  merged  batch  and  the

assigned serial numbers:

o  Material and material name

o  Material type

Transfer of entered data to serial numbers and the merged batch

The machine, producing operation, person performing the posting, material buffer and the transport

unit are transferred to the merged batch and the serial numbers included in the merged batch.

AIP-LCS_82.docx

Version: 1.1.23049

Page 73 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Any comment that might be entered is transferred to the merged batch as additional information on

the batch.

The status of the merged  batch and serial numbers is set subject to  the specified quality/class of

the output batch:

Selected class

Assigned batch status

Reason accepted

Yield

Scrap

Rework

Open quantity

Free

Locked

Free

Free

No

Yes

Yes

Yes

Batch  attributes  collected  in  relation  to  the  merged  batch  are  transferred  to  the  merged  batch  as

batch attributes.

Batch attributes collected in relation to the serial number are transferred to serial numbers as batch

attributes.

Document  links  collected  in  relation  to  the  merged  batch  are  transferred  to  the  merged  batch  as

document links.

Document  links  collected  in  relation  to  the  serial  number  are  transferred  to  serial  numbers  as

document links.

Quantities of the merged batch

The  generated  merged  batch  includes  the  total  quantities  of  the  serial  numbers  assigned  to  the

merged batch.

The  number  of  assigned  serial  numbers  is  defined  for  the  merged  batch  as  number  of  individual

batches.

Activities for serial numbers

New  batches  with  a  new,  internal  HYDRA  batch  number  are  generated  for  the  serial  numbers

included  in  the  merged  batch  (for  further  details  on  this  procedure,  please  see  section  HYDRA

batch number vs. serial number) and the preceding batches are assigned the "processed" status.

Generation of ADE log records

An H record is generated for the merged batch. This one includes the quantity(ies) of the merged

batch, which in turn result(s) from the quantities of the assigned serial numbers. The batch number

of the merged batch is stored at the H record.

Separate log records are not generated for serial numbers.

AIP-LCS_82.docx

Version: 1.1.23049

Page 74 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Generation of goods movements

The generation of goods movements can be controlled individually for consumptions as well as for

the output material on the level of serial numbers and merged batches.

Consequently, it is possible to adjust the upload of these goods movements to the conditions of the

relevant ERP system.

Details  on  how  to  configure  goods  movements  can  be  found  in  configuration  instructions  for  the

collection of serial numbers.

Tracing

Tracing information is updated for the merged batch and serial numbers in the system:

o  The generated merged batch is connected with all integrated input batches logged on at the

time of logging the merged batch on (by logging the OP on or by completing a merged batch

beforehand) or that have been logged on since then.

o  The serial numbers included in the merged batch are also connected with all integrated input

batches  logged on  at the time of logging the merged batch on (by logging the OP on or by

completing a merged batch beforehand) or that have been logged on since then.

Establishing connections between serial numbers and the input batch can be disabled if required.

AIP-LCS_82.docx

Version: 1.1.23049

Page 75 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

12 Merging Serial Numbers on the AIP

Purpose

You use the dialog "Merge serial numbers" to group several materials that are listed by  serial numbers.

These  materials  are  then  listed  under  one  number  and  can  be  used  and  planned  more  easily  in  the

system. The system saves all serial numbers that are merged in one number.

Requirements

You  must make  different  configurations  in  the  system  to  use  the  dialog.  For  further  details,  refer  to  the

document Description of the configuration to use merged serial numbers.

Dialog Merge serial numbers

The "merge serial number" dialog (A_SNR_U) is a workflow dialog, which provides extensive possibilities

for data collection. By default, the dialog includes the following workflow steps:

Workflow step / dialog

Technical name

Purpose

Merge serial numbers

WF_A_SNR_A

This  workflow  step  shows  basic  data  of  the

serial number or the user can enter this data

here.

Merged batch attributes

WF_SNR_ATTR

Recording of batch attributes for the merged

batch

Merged batch documents

WF_SNR_DOC

Recording of document links for the merged

batch

Merge

A_SNR_MARRIED

Dialog  to  identify  and  assign  the  different

ingoing serial numbers

Serial number data

SNR_DATA_MARRIED  Dialog  to  enter  additional  data  specific  to

serial numbers.

The  dialog  can  only  be  started  for  a  single

serial number.

Depending on the active workflow step, different function keys are provided.

AIP-LCS_82.docx

Version: 1.1.23049

Page 76 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Basically, data is collected in two steps:

  Merge serial numbers

In  the  first  step  two  or  more  serial  numbers  are  merged.  This  process  is  completed  and  the

"merge serial number" workflow step is opened again showing the superordinate serial number in

the table.

Now either additional serial numbers can be added and merged or further data (batch attributes

and document links) is recorded for an already merged serial number.

  Collection for merged batches

Basically, data is collected for the merged batch when the merged batch is completed; but data

collection can also be started at an earlier point in time.

The following diagram illustrates the two cycles of data collection:

Workflow step: merge serial number

You use the workflow step "Collection of serial numbers" to enter data for one or several serial numbers.

The dialog shows the following data that cannot be modified:

Workplace

Current workplace that is selected in the main view on the terminal.

AIP-LCS_82.docx

Version: 1.1.23049

Page 77 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Operation

Currently running operation that is selected in the main view on the terminal.

Material

Material produced by the operation that is specified for the article of the operation.

Merged batch

Number that the system assigns to the next merged batch that is set up.

The user can enter the following data:

Staff badge number

The input of the staff badge number is mandatory.

Quality

The  user  can  specify  the  quality.  You  must  enter  a  reason  for  the  qualities  "scrap",  "open"  and

"rework".

Material buffer (*1)

The material buffer defined for the machine is suggested as the target material buffer.

Comment (*1)

You can enter a comment on the merged batch.

Transport unit (*1)

The system preassigns the transport unit that is identified as default unit for the material type of the

operation in the Assignment material type - transport unit.

If no assignment is available, "SYSTEM" is entered.

Transfer of data (for each merged batch / all merged batches from now on)

For the fields labeled with (*1), you can specify if the field specifications only apply for the merged

batch that is currently being processed or for this and all future merged batches of this operation.

This definition applies until the operation is interrupted and/or logged off, also if the shift changes.

The  serial  number  table  shows  the  superordinate  serial  numbers  that  have  already  been  merged  and,

therefore, are part of the currently running merged batch.

Single serial numbers can be selected in the table by clicking on the relevant row.

The  button  bar  provides  several  function  buttons.  Using  the  buttons,  you  can  record  data  for  a  serial

number or complete a posting:

Designation (name)

Purpose

AIP-LCS_82.docx

Version: 1.1.23049

Page 78 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Designation (name)

Purpose

Close

Closes the dialog.

Already merged serial numbers remain.

Complete

The  currently  generated  merged  batch

is  completed

for

the

entered/merged  serial  numbers.  The  merged  batch  number  is

displayed on the terminal.

If the user confirms it, the dialog remains open and the user can enter

additional data for merged batches.

Merge

Dialog to select and assign serial numbers that are to be merged.

Serial number data

Dialog  to  enter  data  for  a  specific  serial  number.  You  can  call  the

dialog for one specified serial  number only. The number can also be

the number of an already merged serial number from the grid of serial

numbers.

Next

Continues with the next workflow step

Dialog "Merge"

In  the  dialog  "Merge",  the  ingoing  serial  numbers  (of  the  available  merged  batches)  are  identified,

grouped  and  transferred  to  the  superordinate  serial  number.  You  must  call  the  dialog  for  each

superordinate serial number and enter the data in the dialog.

You must enter the following data:

Superordinate serial number

A selection list opens where the available, superordinate serial numbers may be chosen. You can

identify the superordinate serial number via the identifier Superordinate SNR = Superordinate in the

component list.

Assigned serial number

A selection list opens where you can select the available, ingoing serial numbers. All serial numbers

of  the  registered  merged  batches  are  offered  that  have  not  yet  been  assembled  and  that  do  not

pertain to the superordinate serial number.

1 – n serial numbers can be selected and taken over.

AIP-LCS_82.docx

Version: 1.1.23049

Page 79 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Overview grid

The  table  shows  the  selected  serial  numbers  that  are  to  be  merged.  For  each  serial  number  it  is

obvious if it is a superordinate serial number or an ingoing serial number.

The button bar provides several function buttons:

Designation

Purpose

(name)

Cancel

Exits the dialog without modifying, accepting or posting of data.

Accept

If the superordinate serial number or assigned serial number is entered manually

in the input field, this function key takes it over in the overview grid.

Delete

The  entire  assignment  is  deleted.  A  new  assignment  process  may  be  started

directly after deletion.

Complete

Directly posts the assignment made.

The  assignment  is  posted  on  the  terminal  and  server,  once  it  has

been  completed.  Corrections  can  only  be  made  via

the

Separating/Rebuilding Serial Numbers dialog.

Dialog "serial number data - batch attributes"

Batch  attributes may be entered for the serial  number in  the  "serial  number attributes"  workflow step of

the "serial number data" dialog.

The  "attributes"  function  key  allows  entering  attributes  for  a  batch  or  for  all  serial  numbers.  The  input

dialog  lists  all  attributes  where  the  option  "Capture  attribute  while  generating  batch"  is  enabled  for  the

material type in the Configuration of the batch attributes.

You can use the function key "Continue" to record document links for the serial number.

The list only shows recorded batch attributes. Other available batch attributes are not shown.

Dialog "serial number data – document links"

You can specify document links for a serial number using the dialog "serial number data", workflow step

"document links".

AIP-LCS_82.docx

Version: 1.1.23049

Page 80 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

The user selects one of the following input options:

o  For each serial number

If this option is enabled, the entered document links are only saved for this serial number.

The  entered  document  links  are  stored  and  suggested  the  next  time  a  serial  number  is

recorded.

o  All serial numbers in this merged batch

If  this  option  is  enabled,  the  entered  document  links are  saved  for  all  serial  numbers  of

this merged batch. The entered document links  are stored and suggested the  next time

when  the  serial  numbers  for  a  merged  batch  are  recorded.  It  is  helpful  to  enable  this

option  when  you  start  to  record  document  links.  This  way,  all  serial  numbers  in  the

merged  batch  include  the  document  links  and  you  need  not  specify  the  links  for  each

serial number.

The list only shows the document links recorded in this process. If document links of the serial

number are inherited from previous processes, these links are not shown.

You only use this dialog to record document links and not to show the links. You can display all

document  links  that  are  available  for  a  serial  number  or  a  batch/merged  batch  if  you  call  the

batch information (if configured accordingly in the document management).

You can only use this dialog to record document links (URL). Another function is currently not

available.

Workflow step - merged batch attributes

You can use the workflow step "merged batch attributes" to record batch attributes for merged batches.

You can use the "attributes" function key to enter attributes for the merged batch that is currently being

processed or for this and all future merged batches of this operation. The input dialog lists all attributes

where  the  option  "Capture  attribute  while  generating  batch"  is  enabled  for  the  material  type  in  the

Configuration of the batch attributes.

You can use the function key "Continue" to record document links for the merged batch.

The list only shows document links recorded, document links that might already be available are

not shown.

Workflow step - merged batch documents

You  can  record  document  links  for  a  merged  batch  in  the  workflow  step  "document  links"  of  the  dialog

main view.

AIP-LCS_82.docx

Version: 1.1.23049

Page 81 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

The user selects one of the following input options:

o  For each merged batch

If this option is enabled, the entered document links are saved for this merged batch only.

The  entered  document  links  are  stored  and  suggested  the  next  time  a merged  batch  is

recorded.

o  All merged batches from now on

If  this  option  is  enabled,  the  entered  document  links  are  saved  for  the  current  merged

batch. And the values are saved for all further merged batches (that are generated from

now on)

The list only shows the document links recorded in this process. If document links are inherited

from previous processes, these links are not shown.

You only use this dialog to record document links and not to show the links. You can display all

document  links  that  are  available  for  a  serial  number  or  a  batch/merged  batch  if  you  call  the

batch information (if configured accordingly in the document management).

You can only use this dialog to record document links (URL). Another function is currently not

available.

AIP-LCS_82.docx

Version: 1.1.23049

Page 82 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

13  Configuration of Merging Serial Numbers

Activation at machine/workplace

These  configurations  have  to  be  made  for  the  machine  /  workplace  to  enable  the  merge  of  serial

numbers:

Parameter name

Value

Workplace  configuration    Workplace  master

N

Machine

data  Workplace category

Workplace  configuration    Workplace  master

E

Single workplace

data  Workplace type

Workplace  configuration    MPL    Batch

L

Batch tracing (input/output batches)

management

Workplace  configuration    MPL    Preceding

If required, define a preceding material buffer.

material buffer

Workplace  configuration    MPL    Subsequent

If required, define a subsequent material buffer.

material buffer

Workplace  configuration    MPL    Automat.

J

Automatic  generation  of  batch  numbers

generation of batch numbers

for production batches (MPL) enabled

Maintain material types - for the operation

Maintain the material types to be defined for the operation and adapt them to your specific requirements

of data collection.

Maintain material types – for components

Maintain  the  material  types  to  be  defined  in  the  component  list  and  adapt  them  to  your  specific

requirements  of  data  collection.  Configure  at  least  the  following  values  for  the  component  that  is

integrated as merged batch including assigned serial numbers in the operation:

Parameter name

Value

AIP-LCS_82.docx

Version: 1.1.23049

Page 83 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Parameter name

Value

Input batch processing  Inventory management  R - Yes, backflush (retrograde)

General  Options  transferred at interface

Enable  this  option  if  you  expect  consumption

postings or final backflushes (notification of goods

receipts) for this material type.

Then another configuration can be used to control

the

transfer  of  merged  batches  and  serial

numbers separately.

Maintain reasons

Maintain  reasons  for  scrap  and  rework  as  well  as  reasons  for  open  quantities,  if  you  use  these  quality

classes.

Maintain transport units

Create transport units in the system if you want to use them for data collection.

Assign material types to transport units

If  you  want  to  use  transport  units  and  you  created  them  in  the  system,  you  may  assign  them  to  the

material  types  maintained  in  the  system  and  define  a  default  transport  unit  for  each  material  type.  This

one will then be selected in advance in the input dialog.

Perform the assignment in the assignment of TPU to material type.

Activation at the operation

These options have to be set for the operation.

Parameter name

Batch management requirement

Value

Yes

Serial number requirement

U

Merge serial numbers

These options are available to edit this information:

AIP-LCS_82.docx

Version: 1.1.23049

Page 84 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Manual maintenance for the operation

Edit the options manually for the operation

Maintenance of processing code (customizing)

Edit the options for the processing code.

Maintenance of the template (customizing)

Edit  the  options  of  the  processing  code  with  value  "U"  –  Merge  serial  numbers  and  assign  the

processing code to an operation template.

Explicit specifications for the interface (recommended procedure)

Explicitly transfer the options for the operation at the interface.

Activation in components list

Maintain the input quantity in the component list by entering "1.0" units for components listed as merged

batch including assigned serials numbers.

Verify whether or not the serial number of one of the incorporated components is to be continued. If this is

the case, assign the "superordinate serial number" flag to this component.

Parameter name

Value

Component  Superordinate serial number

F

Superordinate

Activation of the link between serial number and input batch

For  tracing  it  is  necessary  to  link  the  incorporated  input  batches  with  the  produced  serial  numbers.  To

enable  this  processing, a configuration has to be enabled in  INI configuration. The entry  itself is part of

the default delivery and only needs to be enabled.

Parameter name

INI name

Section

Key

Value

Active

Value

MPL

SERIALNUMBER

CONNECT_SNR_CNR

Y

Enable the entry

AIP-LCS_82.docx

Version: 1.1.23049

Page 85 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Configure batch attributes for data collection when recording serial

numbers

If you want to enter batch attributes manually when collecting serial numbers, create the  batch attributes

to be recorded in the system in relation to the material type of the operation. To do so, maintain at least

these configurations:

Parameter name

Value

Options    Capture  attribute  while  generating

Enable the option.

batch

Options  Position

Specify  the  position  -  the  system  sorts  the

configured  attributes  in  an  ascending  numeric

order (bottom up).

Data type

Maintain the data type and length of the attribute

to be recorded

Control the generation of goods movements

Define  for  incorporated  merged  batches  and  serials  numbers  as  well  as  for  produced  merged  batches

and  serial  numbers  if  you  require  goods  movements  subject  to  uploads  to  be  provided.  To  do  so,

configure the following settings in advanced object configuration:

The goods movement option has to be enabled for the relevant material type to be able to use

this configuration.

Parameter name

Value

Configuration for goods issues (consumptions)

Object type

Object ID 1

MPL

SNR - serial number

SAM - merged batch

Object ID 2

MATTYP

AIP-LCS_82.docx

Version: 1.1.23049

Page 86 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Parameter name

Value

Object ID 3

Object ID 4

Parameter

Material type the entry applies for

CMM_A

CREATE_MOVEMENT

Parameter value

Y

Configuration for goods receipts (generated material)

Object type

Object ID 1

Object ID 2

Object ID 3

Object ID 4

Parameter

MPL

SNR - serial number

SAM - merged batch

MATTYP

Material type the entry applies for

CMM_E

CREATE_MOVEMENT

Parameter value

Y

AIP-LCS_82.docx

Version: 1.1.23049

Page 87 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

14 Separate/Rebuild Serial Numbers

Usage

This function enables material components listed by serial numbers and already mounted in a component

to  be  exchanged  specifically.  Mounted  material  components  are  demounted  and  the  new  material

components  to  be  used  are  mounted.  Mounting  and  demounting  are  documented  in  the  system  and

recorded for the relevant serial number.

Procedure of separating/rebuilding serial numbers

In general, there might be two different situations requiring the exchange of components. At the moment,

the system does not differentiate between them.

1.  Components are demounted from a part while the process is running

An  operation  to  "merge"  serial  number  is  running  and  it  turns  out  that  a  serial  number  with  a

"damaged  part"  has  been  mounted.  The  serial  number  is  recorded  for  an  output  batch/merged

batch "as usual" and is ready to be demounted/rebuilt (batch status = free, class = yield, quality

status = free/open).

2.  Components are demounted in a subsequent or separate process step (e.g. rework)

The  serial  number  was  recorded  for  an  output  batch/merged  batch  and  is  ready  to  be

demounted/rebuilt.

Specific  identifiers  (customer-specific)  specify  when  a  serial  number  gets  to  this  process  (e.g.

batch  status  =  blocked,  class  =  rework/scrap,  quality  status  =  blocked).  But  by  default  these

indicators are set: (batch status = free, class = yield, quality status = free/open).

In both cases, the function does not require operations or input components to be logged on. The dialog

can be carried out at an independent workstation.

Posting of serial numbers

The below-mentioned postings have to be performed for the affected components listed by serial

numbers, once they have been rebuilt:

Serial number of the complete, finished component part

This serial number is still assigned to the merged batch from which it was removed.

All  relevant  data  (material  number,  material  type,  batch  status,  class,  quality  status)  remains

unchanged.

The connection to the demounted component is deleted. Now it is only included in the history. The

connection to the newly mounted part is added accordingly.

Serial number data (attributes, document links) can be entered for the rebuilt part.

AIP-LCS_82.docx

Version: 1.1.23049

Page 88 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Serial number of the demounted component part

This serial number is no longer connected to the entire part from which it was demounted.

For traceability purposes, an entry is made in the batch history (indicating that this component was

once mounted in this part).

The serial number of the removed component is not assigned to a new merged batch. It remains as

single part (batch with quantity 1) on stock (class = scrap and batch status = blocked).

The merged batch which the demounted serial number derives from also remains unchanged (the

inventory is not increased for this batch).

Serial number of the mounted component part

This  serial  number  is  taken  from  a  provided  merged  batch  the  inventory  of  which  is  reduced

accordingly.

As in this process no operation is logged on, no merged batch will be logged on as input batch. The

inventory of the merged batch is reduced in the background after mounting.

Batch  data  of  the  mounted  component  part  is  not  changed.  All  relevant  data  (material  number,

material type, batch status, class, quality status) remains unchanged.

A  connection  to  the  consumed  serial  numbers/merged  batches  is  established  for  traceability

purposes.

Generation of goods movements

These  goods  movements  are  performed  for  the  mounted/demounted  components,  the  complete

component part and for the corresponding merged batches.

Goods movements when merging components listed by serial numbers:

Goods movements when separating components listed by serial numbers:

AIP-LCS_82.docx

Version: 1.1.23049

Page 89 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Subject  to  configuration,  the  generation  of  goods  movements  can  be  controlled  individually  for

consumptions as well as for the output material on the level of serial numbers and merged batches.

Consequently, it is possible to adjust the upload of these goods movements to the conditions of the

relevant ERP system.

AIP-LCS_82.docx

Version: 1.1.23049

Page 90 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

15 Separate/Rebuild Serial Numbers at AIP

Usage

The  "separate/rebuild  serial  number"  function  is  used  to  demount  components  listed  by  serial  numbers

from  a  component  part  and  to  mount  a  new  component  as  a  replacement  during  assembly  processes.

The serial number of the component part remains and is continued as a numeric value. All ingoing and

outgoing serial numbers are to be identified.

Prerequisite

Various configurations have to be made in the system to use the dialog. Further details can be found in

the document dealing with description of the configuration to separate/rebuild serial numbers.

"Separate/rebuild serial numbers" dialog

The  "separate  serial  number"  dialog  (A_SNR_D)  consists  of  workflows  providing  extensive  possibilities

for data collection. By default, the dialog includes the following workflow steps:

Started by the workflow button "serial number data"   Dialog   SNR_DATA_D

Including the dialogs:

Workflow step/detailed dialog  Technical name

Usage

separate serial number

A_SNR_D

This  workflow  step  shows  basic  data  of  the

serial number or the user can enter this data

here.

Serial number data

SNR_DATA_D

Detailed  dialog  to  enter  additional  data

specific to serial numbers.

The detailed dialog can only be started for a

single serial number.

Serial number data - attributes  WF_SNR_ATTR_D

Starts  the  input  of  attributes  for  a  serial

number

Serial  number  data  -  document

WF_SNR_DOC_D

Starts  the  input  of  document  links  for  a

links

serial number

Depending on the active workflow step, different function keys are provided.

Basically, data is collected in two steps:

AIP-LCS_82.docx

Version: 1.1.23049

Page 91 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

  Separate/rebuild serial numbers

At  first  demounting  of  a  component  and  mounting  of  a  replacement  from/in  a  component  part

listed by serial number is documented. The reconstruction is recorded in the system, which leads

back to the "separate serial number" workflow step.

The  dialog  may  either  be  closed  or  additional  data  (batch  attributes  and  document  links)  is

entered for the component part listed by serial number.

  Data collection for the serial number of the finished component part

Basically, data is collected for the serial number when the serial number is completed.

"Separate/rebuild serial number" dialog

The following data is used in the dialog:

Superordinate serial number

The  serial  number  of  the  component  part  from  which  a  component  is  to  be  removed  has  to  be

entered (mandatory).

Demount serial number

The serial number of the component that is to be removed has to be entered (mandatory).

Mount serial number

The serial number of the component that is to be mounted has to be entered (mandatory).

Staff badge number

Entry of the staff badge number is mandatory.

The result list shows the components currently mounted in the serial number of the component part.

AIP-LCS_82.docx

Version: 1.1.23049

Page 92 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

There  is  a  number  of  function  keys  facilitating  dialog  handling,  to  input  data  for  serial  numbers  or  to

complete a posting:

Designation

Usage

Close

Complete

Closes the dialog.

If  the  user  confirms  it,  the  dialog  can  be  continued  and  remains

opened to enter additional merged batches.

Serial number data

Detailed  dialog to enter  data specific to serial numbers. The detailed

dialog  can  only  be  started  for  a  single  serial  number  and  refers  to

already mounted serial numbers.

Procedure of the "separate/rebuild serial numbers" function

  The user opens the dialog "separate/rebuild serial numbers" by the function key in the basic

terminal screen.

  The user enters the serial number (possibly by scanning) that is affected by separation/rebuilding.

  The result list shows all components mounted in this serial number (through the ”merge serial

numbers" function).

  The user enters the serial number of the component he/she wants to remove and/or takes it over

(by double clicking).

  The user enters the new serial number he/she has mounted.

  Then the user presses the "capture" function key and the serial number is posted along with new

component parts.

  The dialog remains opened until the user closes it explicitly. The entered "serial number" and

result list remains and/or is still displayed.



If several component parts need to be rebuilt, the dialog can still be used. Each exchanged

component is entered separately.

Detailed dialog Serial number data - batch attributes

Batch  attributes may be entered for the serial  number in  the  "serial  number attributes"  workflow step of

the "serial number data" detailed dialog.

The  "attributes"  function  key  allows  entering  attributes  for  a  batch  or  for  all  serial  numbers.  The  input

dialog suggests all attributes that are assigned the "Capture attribute while generating batch" option in the

configuration of batch attributes regarding the operation's material type.

The "go on" function key allows entering document links for serial numbers.

AIP-LCS_82.docx

Version: 1.1.23049

Page 93 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Detailed dialog "serial number data – document links (SNR_DATA_D)

The user may enter document links for each serial number (through configuration).

The procedure is as follows:

  The  user  presses  the  "serial  number  data"  function  key  in  the  basic  screen  of  the  collection  of

serial numbers dialog.

  The  user  enters  the  document  links.  The  entered/selected  document  links  are  displayed  as

assigned links in the result list.

  The user selects one of the following input options:

o  For each serial number

If this option is enabled, the entered document links are only saved for this serial number.

The  entered  document  links  are  stored  and  suggested  the  next  time  a  serial  number  is

recorded.

  Once the user has entered the document links for the serial number, he/she gets to the next

workflow of the dialog or back to the basic screen by "go on".

AIP-LCS_82.docx

Version: 1.1.23049

Page 94 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

AIP-LCS_82.docx

Version: 1.1.23049

Page 95 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

16  Configuration for Separating / Reposting Serial Numbers

Dialog configuration

Define  the  function  key  "separate/repost  serial  number"  by  copying  the  layout  gui\l_anr.xml  to

gui\l_anr_ln.xml  and  the  key  "BDE  comments".  Then  the  following  entries  must  be  changed  in  the

configuration of the copied key:

If you do not use tiles for the AIP2, define the function key in the file ctaipbut.ini:

[ANR-LN-Page2]

…

1=A_SNR_D,L,SNR trennen, SNR_trennen.png

The below-mentioned sections are required in the layout configuration of  ctaiplay.ini, irrespective of the

used design:

[A_SNR_D_GRID.LST ]
GRID_FONT=Arial
GRID_FONTSIZE=9
GRID_COLOR=clBlack
GRID_BACKGROUND=clWhite
GRID_ORDER=

AIP-LCS_82.docx

Version: 1.1.23049

Page 96 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

DLL=C20,110,L,SNR
ALIAS LEER2=(DUMMY1)=C1,10,L
CNR=C20,0,L,CNR
ALIAS LEER3=(DUMMY2)=C1,40,L
SAPCNR=C20,110,L,Charge
ALIAS LEER4=(DUMMY3)=C1,10,L
ATK=C20,110,L,Material

[WF@DOC_DATA_D]
FILTER=
SECTION=DOC_DATA_D.LST
DATAFIELDS=
FILE=doc_data_d.lst
AUTOFILTERCOL=
MODE=DATALOCKUNTILSHOW=TRUE|

[DOC_DATA_D.LST]
GRID_FONT=Arial
GRID_FONTSIZE=9
GRID_COLOR=clBlack
GRID_BACKGROUND=clWhite
GRID_ORDER=

LINK=C20,400,L,link/document

[WF@ATTR_DATA_D]
SECTION=ATTR_DATA_D.LST
DATAFIELDS=
FILE=attr_data_d.lst
AUTOFILTERCOL=
MODE=DATALOCKUNTILSHOW=TRUE|

[ATTR_DATA_D.LST]
GRID_FONT=Arial
GRID_FONTSIZE=9
GRID_COLOR=clBlack
GRID_BACKGROUND=clWhite
GRID_ORDER=

ATTR=C20,100,L,Attribut
VALUE=C20,80,L,Wert
EINH=C20,60,L,Einheit
TEXT=C20,200,L,Text

System configuration

Configuration of batch attributes for data collection

If you want to enter batch attributes manually when collecting serial numbers, create the  Batch attributes

to be recorded in the system in relation to the  Material type of the ready-mounted serial number. To do

so, maintain at least these configurations:

AIP-LCS_82.docx

Version: 1.1.23049

Page 97 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Parameter name

Value

Options    Capture  attribute  while  generating

Enable the option.

batch

Options  Position

Specify  the  position  -  the  system  sorts  the

configured  attributes  in  an  ascending  numeric

order (top down).

Data type

Maintain the data type and length of  the attribute

to be recorded

Control the generation of goods movements

Define  for  incorporated  merged  batches,  serials  numbers  and  produced  serial  numbers  if  you  require

goods movements subject to uploads. To do so, configure the following in Advanced object configuration:

The goods movement option must be enabled for the relevant material type in order to use this

configuration.

Parameter name

Value

Configuration for goods issues (consumptions)

Object type

Object ID 1

Object ID 2

Object ID 3

Object ID 4

Parameter

MPL

SNR - serial number

SAM - merged batch

MATTYP

Material type the entry applies for

CMM_A

CREATE_MOVEMENT

Parameter value

Y

Configuration for goods receipts (generated material)

AIP-LCS_82.docx

Version: 1.1.23049

Page 98 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Object type

Object ID 1

Object ID 2

Object ID 3

Object ID 4

Parameter

MPL

SNR - serial number

SAM - merged batch

MATTYP

Material type the entry applies for

CMM_E

CREATE_MOVEMENT

Parameter value

Y

AIP-LCS_82.docx

Version: 1.1.23049

Page 99 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

17  Variants of Batch Grouping

Summary

Batches are grouped and/or combined due to different situations:

  Not relevant to the process

It is assumed here that the identified material only switches positions and this movement

is  irrelevant  to  batch  tracing  (e.g.  picking  or  transfer  posting  of  batches  to  a  group  and

provision for production).

  Relevant to the process

This function facilitates posting processes allowing to log on many input batches at once

to  a  machine/OP,  guide  them  through  the  process  and  to  repost  them  afterwards  to

produced output batches for traceability purposes.

Variants

In general, there are the following two variants to group batches.





Illustration: irrelevant to process --> generate/cancel batch group

Illustration: relevant to process --> batch grouping

Generate/cancel group batch (not relevant to process)

General

The  function  is  used  every  time  when  it  is  necessary  to  combine  batches  of  different  or  identical

materials, which is to be resolved/canceled at a later point in time providing the batches "unaffected".

AIP-LCS_82.docx

Version: 1.1.23049

Page 100 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Prerequisites, restrictions

  Original batches remain and are not "consumed" by grouping.

  During  grouping,  original  batches  cannot  be  processed  or,  for  example,  archived  somewhere

else.

  No OP is required - groupings may be performed at any point in time.

  Batches may still be removed unless the grouping has been created finally.

  A label can be printed for the generated grouping.

  Groupings may only be cancelled altogether. Individual batches cannot be removed.

  All group members are affected if the grouping is reposted (change of material buffer).

  Tracing does not consider the grouping.

AIP procedure

There are two steps:

  Generate group batch

  Cancel group batch

Results

AIP-LCS_82.docx

Version: 1.1.23049

Page 101 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

The following results can be expected after generating the batch group:

  Batch characteristics

o

Individual batches still keep their material number, material type, material buffer, etc.

  Batch status

o  Once the "generate group batch" function has been executed, the single batches are in

the "running" status. The group batch is assigned the "running" status.

  Goods movements

o  No goods movements are posted for the single batches or the group batch.

  Traceability

o  The group of batches is not relevant to tracing.

  History

o  The group of batches is documented in the history of individual batches.

The following results can be expected after canceling the batch group:

  Batch characteristics

o

Individual batches still keep their material number, material type, material buffer, etc.

o  The  group  batch  has  taken  over  the  following  values  from  a  "system  batch"  (copy

template):

  Material number

  Material type

  Material buffer

o  The quantity of the group batch is the total amount of all assigned individual batches and,

therefore, is assigned the unit "PCE/pieces".

  Batch status

o  Once the "cancel group batch" function has been executed, the single batches are in the

"free"  status.  The  group  batch  is  assigned  the  "processed"  status.  The  "grouping"  no

longer exists.

  Goods movements

o  No goods movements are posted for the single batches or the group batch.

  Traceability

o  Cancelling group batches is not relevant to traceability.

  History

o  Cancelling the group batches is documented in the history of individual batches.

Batch grouping (relevant to process)

General

AIP-LCS_82.docx

Version: 1.1.23049

Page 102 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

The function is used every time when batches of different or identical materials are used in a process and

output batches are finally changed for all ingoing batches at a point in time.

Prerequisites, restrictions

  This function can only be  used if grouping  is directly performed "within the process". Groupings

cannot be performed beforehand as part of a preceding picking process.

  The machine has not been configured as MPL machine.



Input batches are "consumed" by grouping.

  During grouping, input batches cannot be processed or, for example, archived somewhere else.

  Operations are required: an OP appropriate for processing is searched via the order network or

by reservations affecting all orders.

AIP procedure

The AIP procedure is described here.

Results/ processing

The "batch grouping" dialog (U_GROUPING) provides several functions.

AIP-LCS_82.docx

Version: 1.1.23049

Page 103 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

  Add batch, start OP: CNRGRP.ADD

  Remove batch from list: CNRGRP.REMOVE:

  Complete group: CNRGRP.UNLOAD:

After executing the single functions, processing is performed in the dialog U_GROUPING.

Add batch/ start OP (CNRGRP.ADD)

This function adds the entered batch. To do so, the OP for the batch is logged on to the machine.

Inspections:

  General batch inspection:

o  The batch is available

o  The batch has the status "free"

  Automatic search for the operation matching the entered batch

o  OP is searched via the order network and batch assignment

  The batch was generated in an OP, which is provided as piece of information for

the  batch.  Due  to  the  order  network,  the  system  knows  the  next  OP  to  be

processed  within  the  order.  The  appropriate  OP  can  be  found  by  the  order

network.

o

If no OP is found via the network, it is searched using batch reservations.

  An error message appears if no OP is found.



If  an  OP  is  found,  it  will  only  be  started,  unless  it  is  already  running  at  the

machine.

  Further inspections:

o  Checking if the OP is planned for the machine and/or machine group.

o  Checking if the batch is reserved for another OP.

o  Checking if the batch can be logged on to the component.

  An error message occurs if no component is found.

  The component must be identical to the material number of the batch, otherwise

an error message occurs.

  An error message appears if the admissible number of OPs running at the machine is exceeded.

  Start OP:

AIP-LCS_82.docx

Version: 1.1.23049

Page 104 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

o  The OP is started and set to the "running" status.

o  The batch is reserved for the OP.

Remove batch (CNRGRP.REMOVE):

This function is used to cancel the reservation of the OP at the batch.

Inspections:

  The batch is available. Otherwise, an error message occurs.

Unload batch group (CNRGRP.UNLOAD):

This function is used to log on the reserved batches.

Inspections:

  Are there any running OPs including reserved batches at the machine?

Posting:

  Determination of all reserved batches

  Log output batch and input batch on.

o  At first generate a new batch number for the output batch

o  The new output batch is logged on with the reserved input batch.

  Log off output batch and input batch

o  The input batch is logged off

o  The output batch is logged off

o  The configured, alternative batch numbers and attributes are saved for the output batch.

o  The connection between input batch and output batch is saved for tracing purposes.

  This process is repeated for all batches included in the group.

AIP-LCS_82.docx

Version: 1.1.23049

Page 105 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

18  Create/Cancel Group Batch

Summary

Within the production area, it is necessary to compress batches to a group with one ID and to provide this

package/group within another area. It is assumed here that the identified material only switches positions

and this movement is irrelevant to batch tracing (e.g. picking or transfer posting of batches in a group and

provision for production or transport).

Usage

The  function  is  used  to  combine  batches  of  different  or  identical  materials,  which  is  to  be

resolved/canceled at a later point in time providing the batches "unaffected".

Prerequisite/configuration

The configuration for AIP is described here.

The configuration for AIP2 is described here.

The logical process and posting are described here.

Generate group batch

If  the  terminal  is  offline,  only  a  limited  number  of  posting  functions  is  provided  based  on

the available data. If the terminal is offline, errors are not displayed e.g. if posting failed on

the server.

Dialog

AIP-LCS_82.docx

Version: 1.1.23049

Page 106 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Description of display fields:

  Machine

Used workplace/machine

  Group batch

Generated group batch that is currently being created.

  Batch number

Entered number of the batch that is to be recorded for the group batch.

  Number of batches

Number of individual batches included in the group batch.

  Staff badge number

The user's staff badge number.

  Result list

List of all individual batches included in the group batch with batch number, material number etc.

Function keys

  Function key "cancel"

The function key terminates the dialog and rejects data input.

  Function key "add"

An individual batch may be assigned to the group batch using this function key.

  Function key "remove"

A selected individual batch may be removed from the group batch using this function key.

  Function key "complete"

AIP-LCS_82.docx

Version: 1.1.23049

Page 107 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

This function key completes the group batch, i.e. it is generated.

Procedure

For the user the procedure is as follows:

  The user opens the "create group batch" dialog in the basic screen of the terminal

  The user enters the batches (manually or by scanning) he/she wants to group

  The user may view the group batch number in the dialog

  The dialog's result list shows the entered batches that are to be grouped.



Individual  batches  may  still  be  removed  or  added,  as  long  as  the  user  has  not  confirmed  the

dialog by the "complete" key.

Cancel group batch

Dialog

Description of display fields:

  Machine

Used workplace/machine

  Target buffer

Material  buffer  to  which  the  batch  is  transferred.  If  the  field  remains  empty,  no  transfer  posting

takes place and the material buffer remains.

  Batch number

AIP-LCS_82.docx

Version: 1.1.23049

Page 108 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Entered number of the group batch that is to be canceled (re-posted).

  Staff badge number

The user's staff badge number.

  Result list

List of all individual batches included in the group batch with batch number, material number etc.

Function keys

  Function key "cancel"

The function key terminates the dialog and rejects data input.

  Function key "complete"

This function key cancels the group batch.

Procedure

For the user the procedure is as follows:

  The user opens the "cancel group batch" dialog in the basic screen of the terminal

  The user enters the group batch (manually or by scanning) he/she wants to cancel

  The dialog's result list shows the batches pertaining to the grouping.



In  the  "material  buffer"  field  the  user  may  enter  a  new  material  buffer  to  which  all  individual

batches of the group are to be re-posted.

o

If the user does not fill out the field, the material buffers of the individual batches remain

as before.

  As long as the user has not closed the dialog by "cancel group", it remains open and/or can be

cancelled. Data will be rejected.

AIP-LCS_82.docx

Version: 1.1.23049

Page 109 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

19  Create / Cancel Group Batch

Usage

The function can be used to combine several batches into a group of batches at the AIP terminal and to

cancel this grouping at a later point in time.

Dialog configuration

Dialog configuration (CNR.BATCH_GROUP_A)

AIP-LCS_82.docx

Version: 1.1.23049

Page 110 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Define the function keys "generate group of batches" and "cancel group of batches" by copying the layout

gui\l_anr.xml  to  gui\l_anr_ln.xml  and  by  copying  twice  the  key  "BDE  comments".  Then  the  following

entries must be changed in the configuration of the copied keys:

If you do not use tiles for the AIP2, define the function keys in the file ctaipbut.ini:

[ANR-LN-Page4]

…

1=BATCH_GROUP_A,L,Gruppenlos bilden,Losgruppe_bilden.png

2=BATCH_GROUP_C,L,Gruppenlos aufloesen,Losgruppe_aufloesen.png

AIP-LCS_82.docx

Version: 1.1.23049

Page 111 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

The  sections  [BATCH_GROUP_A.LST]  and  [BATCH_GROUP_C.LST]  are  required  in  the  layout

configuration of ctaiplay.ini, irrespective of the used design:

[BATCH_GROUP_A.LST]

GRID_FONT=Arial

GRID_FONTSIZE=9

GRID_COLOR=clBlack

GRID_BACKGROUND=clWhite

CNR=C20,100,L,Batch

ATK=C20,100,L,Material

ATKBEZ=C40,140,Designation

HZTYP=C40,150,L,Material Type

RESAUNR=C12,100,L,Order

RESAGNR=C4,50,L,OP

; for set then position

;U_POSITION=C8,60,R,Position

[BATCH_GROUP_C.LST]

GRID_FONT=Arial

GRID_FONTSIZE=9

GRID_COLOR=clBlack

GRID_BACKGROUND=clWhite

CNR=C20,100,L,Batch

ATK=C20,100,L,Material

ATKBEZ=C40,140,Designation

HZTYP=C40,150,L,Material Type

RESAUNR=C12,100,L,Order

RESAGNR=C4,50,L,OP

; for set then position

;U_POSITION=C8,60,R,Position

AIP-LCS_82.docx

Version: 1.1.23049

Page 112 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

System configuration

Further system configurations are not required in order to group/cancel batches.

AIP-LCS_82.docx

Version: 1.1.23049

Page 113 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

20  Batch Grouping

Summary

In  production  it  might  be  necessary  to  process  batches  at  once  in  one  process  (e.g.  heating  furnace,

conditioning system, washing machine). To this end, the user logs on the affected batches within a group

to AIP.

Usage

To the user the OP is not important to record times and after processing, users do not want to post every

single output batch in the system. Therefore, this function basically facilitates the posting process for the

user.

Prerequisite/configuration

The configuration is described here.

The logical process and posting are described here.

Batch grouping

If  the  terminal  is  offline,  only  a  limited  number  of  posting  functions  is  provided  based  on

the available data. If the terminal is offline, errors are not displayed e.g. if posting failed on

the server.

Dialog

AIP-LCS_82.docx

Version: 1.1.23049

Page 114 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Description of display fields:

  Machine

Used workplace/machine

  Batch number

Entered number of the batch that is to be recorded for the group.

  Staff badge number

The user's staff badge number.

  Result list "reserved batches"

List of all individual batches included in the group with batch number, material number etc.

Function keys

  Function key "cancel"

This function key terminates the dialog and rejects data input.

  Function key "add"

An individual batch may be added to the group using this function key.

  Function key "remove"

A selected individual batch may be removed from the group using this function key.

  Function key "unload batch"

This  function  key  cancels  the  group  and  output  batches  are  changed  automatically  for  all  input

batches and operations registered in the background.

AIP-LCS_82.docx

Version: 1.1.23049

Page 115 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Procedure

For the user the procedure is as follows:

  The user opens the "batch grouping" dialog in the basic screen of the terminal

  The user enters the batch (manually/by scanning) he/she wants to add

  The user presses "add" and confirms the entered batch.

  The entered batch is assigned to the group. The batch is reserved for the OP.

  The user enters further batches he/she adds to the group.

  The user closes the dialog unless he/she wants to add further batches.

  To cancel the group and/or when completing the process, the user opens the dialog and presses

the "unload batch" key. Consequently, the relevant registered operation is logged off and finished

for every included input batch and an output batch is completed.

AIP-LCS_82.docx

Version: 1.1.23049

Page 116 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

21  Grouping of Batches

Usage

The function is used to apply several batches of a group in AIP processes.

Dialog configuration

Dialog configuration (BATCH_GROUP_B)

Define the function key "generate batch group" by copying the layout gui\l_anr.xml to gui\l_anr_ln.xml and

the key "BDE comments". Then the following entries must be changed in the configuration of the copied

key:

If you do not use tiles for the AIP2, define the function key in the file ctaipbut.ini:

[ANR-LN-Page4]

…

3=BATCH_GROUP_B,L,Losgruppenbildung,Losgruppierung.png

The  below-mentioned  section  is  required  in  the  layout  configuration  of  ctaiplay.ini,  irrespective  of  the

used design:

[BATCH_GROUP_B.LST]

GRID_FONT=Arial

AIP-LCS_82.docx

Version: 1.1.23049

Page 117 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

GRID_FONTSIZE=9

GRID_COLOR=clBlack

GRID_BACKGROUND=clWhite

CNR=C20,100,L,

ATK=C20,100,L,

ATKBEZ=C40,140,

HZTYP=C40,150,L,

RESANR=C12,100,L,Operation

System configuration

Further system configurations are not required in order to group batches.

An appropriate OP must exist in the system to be able to use the batches in the dialog and in

order for an OP to be logged on in the background.

The relevant OP can be identified via:

o  a special batch reservation (across all orders)

o

the order network (sequence of OPs in an order)

AIP-LCS_82.docx

Version: 1.1.23049

Page 118 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

22  Decision on Changing Input Batch

Usage

For traceability reasons, every time an input batch is changed, a new merged batch/output  batch is to be

produced for material listed by serial numbers.

The function "decision on changing the input batch" is used every time when input batches are changed

and  it  has  to  be  ensured  that  the  reported  serial  numbers  deriving  from  different  input  batches  are  not

mixed up in one output batch.

Example:

Two input batches from different lots are used for one material. Input batches are changed, once the first

lot  of  the  input  batch  has  been  consumed.  The material/input  batch  of  the  first  lot  is  logged  off  and  the

material  of  the  second  lot  is  logged  on  as  input  batch.  There  must  be  at  least  two  different  merged

batches/output batches, as the serial numbers of two different input lots or input batches are assembled.

The  "decision  on  changing  the  input  batch"  function  and  the  relevant  posting  procedure  for  input  batch

changes make sure the right connections are generated between input and output batches and the user

is forced to "pay attention" and to post all serial numbers before logging an input batch off.

Example:

Prerequisite/configuration

The warning message can be enabled and/or disabled. The configuration is described here.

AIP-LCS_82.docx

Version: 1.1.23049

Page 119 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Results/inspections

The user is forced to make a decision when changing input batches:

  Log input batch off --> No

  Log input batch off --> Yes

The input batch is logged off by the system if the user decides to log off the input batch.

The dialog is executed and the input batch to be logged off is posted accordingly:

  Change the batch status (processed, free, blocked)

  Material movement (consumption --> goods issue (261))

  Connections between the output batch (merged batches and subordinate batches) and the input

batch are completed in batch tracing. The system has already established a connection between

the input batch to be logged off and the currently running output batch when the output batch was

generated.

If this connection is not required, an option of the material type "output batch connection = J/N"

makes sure the connection is deleted.

  The batch history is updated.

The user makes an entry (staff badge number) for the logged off input batch and the logged  in

input batch in the batch history. Consequently, one can trace back who decided to log on a new

input  batch  and  to  ignore  the  serial  numbers  mounted  with  the  old  input  batch.  These  serial

numbers are only posted with the new input batch, although they have not been produced by it.

This function can be applied in the "merge serial numbers" dialog and to "change output

batches". The text has to be adjusted specific to the project.

AIP-LCS_82.docx

Version: 1.1.23049

Page 120 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

23  Decision on Changing Input Batch

Summary

For traceability reasons, every time an input batch is changed, a new merged batch/output batch is to be

produced  for  material  kept  with  serial  numbers.  The  function  "Decision  on  changing  the  input  batch"  is

provided for this purpose.

Usage

This function is used  when input  batches are changed and it has to be ensured that the reported serial

numbers deriving from different input batches are not mixed up in one output batch.

Decision on changing the input batch - AIP warning

If  the  terminal  is  offline,  only  a  limited  number  of  posting  functions  is  provided  based  on

the available data. If the terminal is offline, errors are not displayed e.g. if posting failed on

the server.

Dialog

Step 1: Change input batch

Step 2: Decision on changing the input batch

The  user  receives  a  message  at  the  terminal  asking  whether  the  batch  to  be  changed  is  actually  to  be

logged off or if there are still remaining serial numbers to be entered. The dialog text can be customized.

AIP-LCS_82.docx

Version: 1.1.23049

Page 121 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Procedure

For the user the procedure is as follows:

  The user opens the "input batch change" dialog by pressing "input batch change" in the basic

screen of the terminal.

  Step 1: Change input batch

o  The user selects the input batch to be logged off and/or enters the new input batch to be

logged on and uses the "post batch" key.

  Step 2: Decision on changing the input batch

The user receives a message at the terminal asking whether the batch to be changed is

actually to be logged off or if there are still remaining serial numbers to be entered.

  Step 3: User decision

o  The user wants to enter further serial numbers for the running input batch and clicks

"No". The user has to enter his/her staff badge number.

o  The user decides to confirm the message by clicking "yes". Consequently, the input batch

is logged off.

AIP-LCS_82.docx

Version: 1.1.23049

Page 122 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

24  Configuration of Decision on Changing Input Batch

Usage

The function "decision on changing the input batch" is used when input batches are changed and it has to

be ensured that the reported serial numbers deriving from different input batches are not mixed up in one

output batch.

For  this  reason,  the  "decision  on  changing  the  input  batch"  alert  may  be  configured  as  an  intermediate

dialog when changing input batches.

System configuration

Material type:

These options have to be set for the material type:



Input batch processing > decision on changing the input batch = ON

If this option is enabled, the alert is shown in the "decision on changing the input batch" dialog.

  Output batch processing > delete batch assignment = ON

Using  this  option  deletes  the  most  recent  assignment  between  input  batch  and  current  output

batch.  This  deletion  is  necessary  as  the  assignment  is  established  immediately  after  the  input

batch has been logged on.

AIP-LCS_82.docx

Version: 1.1.23049

Page 123 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

25  Splitting Batches

Summary

The  "split  batch"  function  can  be  used  to  divide  an  existing  batch  into  several  individual  batches.  The

following "batch types" may be split:



"simple" batch (split off quantities with new batch numbers)

  merged batch (split off subordinate batches/serial numbers into new merged batches)

Prerequisite

In general, all batches to be split off have to be available.

The "split batch" function can only be applied to batches meeting the below-mentioned conditions:

·

·

only batches in the batch status "free" may be split

only batches assigned the batch class "yield" may be split

Variants

In general, there are the following two variants to split batches.

  Splitting batches at AIP

AIP provides a function to split the entered batches/merged batches into several batches/merged

batches. A label may be printed each for the batches/merged batches split off.

  Splitting batches at MOC

The MOC batch data overview provides a function to split the entered batches/merged batches

into several new batches/merged batches.

Result

The below-mentioned results can be expected after splitting batches at AIP or MOC:

Splitting "simple" batches:

·

·

·

the batches split off include the entered quantity

the batches split off are assigned the status "free"

If no remaining quantity is available, the old batch is in the "free" or "processed" status.

·  The old batch has the batch class "yield"

AIP-LCS_82.docx

Version: 1.1.23049

Page 124 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

·

the batch number of the old batch:

o

is a new batch number

o

is the original batch number

Splitting merged batches:

·

the  merged  batches  split  off  include  the  selected  subordinate  batches/serial  numbers  and  the

relevant quantity.

the merged batches split off are assigned the status "free"

If no remaining quantity is available, the old merged batch is in the "free" or "processed" status.

the  old  merged  batch  is  assigned  the  "yield"  batch  class  and  includes  all  subordinate

batches/serial numbers that have not been split off and/or no subordinate batches/serial numbers

·

·

·

if all of them were split off.

·

the batch number of the old merged batch:

o

is a new batch number

o

is the original batch number

AIP-LCS_82.docx

Version: 1.1.23049

Page 125 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

26  AIP Batch Splitting

Summary

Some production processes (e.g. goods issue) require a batch (e.g. with large quantities) to be spilt into

several batches (e.g. with smaller quantities) to be able to provide materials in smaller bins/containers at

machines/workplaces. With this function the terminal provides an opportunity to separate batches and to

print a label for the new batches.

Usage

These split variants are possible:

o

"Simple" batches

When splitting "simple" batches, the user separates the required quantities from the original batch

and generates new batches for these split quantities.

o  Merged batches

Wen  splitting  merged  batches,  the  dialog  shows  the  individual  sub-batches/serial  numbers

assigned to the merged batch. The user selects the sub-batches/serial numbers he/she wants to

split off to generate a new merged batch.

Prerequisite

The relevant configuration has to be made to be able to use this function.

Terminal functions

The function is triggered manually by using the key of the "split batch" dialog (BATCH_SPLIT).

If  the  terminal  is  offline,  only  a  limited  number  of  posting  functions  is  provided  based  on

the available data. If the terminal is offline, errors are not displayed e.g. if posting failed on

the server.

Dialog/start

The  dialog  opens  by  input  of  the  batch  number/merged  batch  number.  The  batch  information  on  the

batch/merged batch is shown.

AIP-LCS_82.docx

Version: 1.1.23049

Page 126 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Splitting "simple" batches

Description of display fields:

  Batch number

Entered number of the batch that is to be split.

  Class

Batch class of the batch to be split.

  Remaining quantity

Remaining quantity of the batch to be split. At the beginning, it is the original quantity.

AIP-LCS_82.docx

Version: 1.1.23049

Page 127 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

  Quantity

Quantity to be split off. The user enters this quantity.

  Class

Batch class of the quantity to be split off. This can be:

o  Yield

o  Scrap

o  Rework

o  Open quantity

  Reason

Reasons for the selected batch class.

  Repost remaining quantity to new batch

The remaining quantity of the original batch is reposted to a new batch.

  Reduce batch to the remaining quantity

The original batch is reduced to the remaining quantity.

  Result list

The  result  list  shows  all  batches  split  off  including  the  respective  quantity,  batch  class  and

reason.

Function keys

  Function key "add"

The result list shows the entered quantity as separate entry (later the batch split off).

  Function key "remove"

The concerned row of the result list is selected and can be removed. The envisaged quantity is

not split off and assigned again to the original batch.

  Function key "split"

When using the function key, all entries of the result list are split off including the relevant quantity

from the entered batch.

  Function key "cancel"

This function key deletes all entries and the dialog is closed.

Procedure:

  The user opens the "split batch" dialog in the basic screen of the terminal

  The user selects the batch he/she wants to split off.

  Batch data of the entered batch is displayed.

  The user enters the split quantity, batch class and the reason, if necessary.

  The "add" function key adds the quantity and/or batch to be split off to the result list and displays

it.

  The user may split off additional batch quantities

AIP-LCS_82.docx

Version: 1.1.23049

Page 128 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

  The result list shows all quantities/batches to be split off

  The user decides if the remaining quantity of the original batch is to be reposted to a new batch

or if it is to remain with the original batch.

  The user closes the dialog by the "split" function key and the split quantities will be posted.

Splitting merged batches

Description of display fields:

  Batch number

Entered number of the merged batch that is to be split.

  Class

Batch class of the merged batch to be split.

  Remaining quantity

Remaining quantity of the merged batch to be split. At the beginning, it is the original quantity.

  Class

Batch class of the merged batches to be split off. This can be:

o  Yield

o  Scrap

o  Rework

o  Open quantity

  Reason

Reasons for the selected batch class.

  Display list

The  display  list  shows  all  sub-batches/serial  numbers  including  the  relevant  quantity  and  article

number  assigned  to  the  entered  merged  batch.  Individual  sub-batches/serial  numbers  are

selected and split off into a new merged batch.

Function keys

  Function key "reload"

The display list is updated.

  Function key "reverse"

The selected sub-batches/serial numbers are unselected.

  Function key "split"

The selected sub-batches/serial numbers are assigned to a new merged batch and removed from

the existing merged batch.

  Function key "cancel"

AIP-LCS_82.docx

Version: 1.1.23049

Page 129 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

The dialog is closed by this function key.

Procedure:

  The user opens the "split batch" dialog in the basic screen of the terminal.

  The user selects the batch he/she wants to split off.

  Batch data of the entered batch is displayed:

o  Material

o  Quantity

o  Class

o  Reason

o  Batch status



If it is a "merged batch" (indicator at the batch), the result list shows the serial numbers/subordinate

batches assigned to this merged batch.

  The user chooses (multiple selection) the serial numbers/sub-batches he/she wants to split off into a

new merged batch.

  The  user  selects  the  class  for  the  new  merged  batch  (and  thus  for  the  newly  assigned  serial

numbers/sub-batches)

  The function key "split" generates the new merged batch with the split off serial numbers. The list of

serial numbers is reduced and additional merged batches  may be generated and, as a result, serial

numbers can be split off.

  The remaining serial numbers/sub-batches remain with the original merged batch (existing number).

  Then the user closes the dialog.

Result

Result when splitting "simple" batches:

  A new batch is generated for the quantity split off.

  The batch quality depends on the selection made

  Subject  to  the  selected  quality  (yield/scrap),  the  batch  status  of  the  new  batch  is  -->

released/blocked

  The quantity of the old batch is reduced by the quantities split off. If the quantity is zero, the batch

status of the old batch is "processed".

  Other  data  of  split  batches,  such  as  the  material  number,  designation,  material  type,  storage

location, material buffer, PPS batch is taken over from the original batch.

  The split event is displayed in the batch history (old batch and new batches).

  The graphic/tabular overview shows which batches have been split off from a batch.

Result when splitting a merged batch:

AIP-LCS_82.docx

Version: 1.1.23049

Page 130 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

  The  new  merged  batch  is  generated  and  includes  all  sub-batches/serial  numbers  selected  for

splitting

  The quality is identical for the merged batch and sub-batches/serial numbers (as defined)

  The  quantity  included  in  the  new  merged  batch  is  the  total  quantity  of  all  sub-batches/serial

numbers

  Subject  to  the  selected  quality  (yield/scrap),  the  batch  status  of  the  new  merged  batch  and  the

sub-batches/serial numbers is --> released/blocked

  The old merged batch is no longer connected to the sub-batches/serial numbers split off

  The  quantity  of  the  original  merged  batch  has  been  reduced  by  the  quantity  of  the  sub-

batches/serial  numbers  split  off.  If  the  quantity  is  zero  and/or  if  there  are  no  longer  sub-

batches/serial numbers, the batch status of the old batch is "processed".

  Other  data  of  sub-batches/serial  numbers  and  the  new  merged  batch,  such  as  the  material

number,  designation,  material  type,  storage  location,  material  buffer,  PPS  batch  are  taken  over

from the original batch.

  The  split  event  is  displayed  in  the  batch  history  (old  merged  batch  and  new  merged  batches  +

serial number).

  The  graphic/tabular  overview  shows  which  merged  batches  have  been  split  off  from  a  merged

batch.

This dialog does not allow entering attributes/document links for individual serial numbers/sub-

batches pertaining to the merged batch.

AIP-LCS_82.docx

Version: 1.1.23049

Page 131 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

27  Splitting Batches in the AIP

Usage

You use the function to split up a batch into several batches in the AIP terminal. Subject to the batch type,

batches may be split in the following ways:

  Splitting off quantities into individual batches

  Splitting off individual batches from existing merged batches into a new merged batch

Dialog configuration

Dialog configuration (CNR.SPLIT)

Define  the  function  key  "split  batch"  by  copying  the  layout  gui\l_anr.xml  to  gui\l_anr_ln.xml  and  the  key

"BDE comments". Then the following entries must be changed in the configuration of the copied key:

If you do not use tiles for the AIP2, define the function key in the file ctaipbut.ini:

[ANR-LN-Page3]

…

3=BATCH_INFO,L,Los splitten,Los_splitten.png

The  sections  [BATCH_S_SPLIT]  and  [BATCH_SPLIT]  are  required  for  the  layout  configuration  of

ctaiplay.ini, irrespective of the used design:

AIP-LCS_82.docx

Version: 1.1.23049

Page 132 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

[BATCH_S_SPLIT]

GRID_FONT=Arial

GRID_FONTSIZE=9

GRID_COLOR=clBlack

GRID_BACKGROUND=clWhite

GRID_CELLPAINT=ON

EXAMINE_CELLBKCOLOR=SELECT,SELECT,X-clLime

SELECT=C1,50,Z,*

DLL=C20,150,Z,batch

ATK=C20,150,L,article

SGR:REST=N12.0,100,R,quantity

EINH=C3,60,Z,unit

;CKL=C1,150,Z,class

[BATCH_SPLIT]

GRID_FONT=Arial

GRID_FONTSIZE=9

GRID_COLOR=clBlack

GRID_BACKGROUND=clWhite

GRID_CELLPAINT=ON

EXAMINE_CELLBKCOLOR=CKL,CKL,G-clLime|A-clRed|N-clBlue|O-clYellow

EGR=N12.3,250,R,quantity

CKL=C1,150,Z,class

EGG=C4,100,Z,reason

System configuration

Further system configurations are not required to split batches.

AIP-LCS_82.docx

Version: 1.1.23049

Page 133 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

28  Merging Batches

Summary

The  "merge  batches"  function  can  be  used  to  merge  existing  batches  into  one  common  batch.  The

following "batch types" may be combined:



"simple" batch and "simple" batch (adding up quantities)

  merged batch and merged batch (grouping of assigned subordinate batches/ serial numbers)

Prerequisite

In general, all batches to be merged have to be available.

The batch merge function can only be applied to batches meeting the below-mentioned conditions:

·  Only batches with the same material (material number) can be merged

·  Only batches with the same material type can be merged

·  All batches must have a positive remaining quantity (batch class = yield, remaining quantity > 0).

Consequently, scrap batches cannot be merged.

The following combinations are neither supported nor allowed:

·

·

combination of "simple" batches and merged batches

combination of an individual batch/serial number and a merged batch

·  Combination of an individual batch/serial number and an individual batch/serial number

Variants

In general, there are the following two variants to merge batches.

  Merge batches at AIP

AIP provides a function to merge the entered batches/merged batches into a new batch/merged

batch. A label can be printed for the merged batch.

  Merge batches at MOC

The MOC batch data overview provides a function to merge the entered batches/merged batches

into a new batch/merged batch.

Result

The below-mentioned results can be expected after merging batches at AIP or MOC:

AIP-LCS_82.docx

Version: 1.1.23049

Page 134 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Merging "simple" batches:

·  The merged batches have a remaining quantity of 0

·  The merged batches are assigned the status "processed"

·  The new batch has the status "free"

·  The new batch has the batch class "yield"

·  The batch number of the new batch:

o

is a new batch number

o

is a batch number pertaining to the merged batches

Grouping merged batches:

·

the  grouped  merged  batches  have  a  remaining  quantity  of  0  and  do  no  longer  include

subordinate batches/serial numbers

·

·

·

the combined merged batches are assigned the status "processed"

the new merged batch has the status "free"

the  new  merged  batch  is  assigned  the  "yield"  batch  class  and  includes  all  subordinate

batches/serial numbers of the combined merged batches

·  The batch number of the new merged batch:

o

is a new batch number

o

is a batch number pertaining to the combined merged batches

AIP-LCS_82.docx

Version: 1.1.23049

Page 135 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

29  AIP Batch Merge

Summary

In  production  partly  consumed  containers  with  the  same  material  are  often  combined  to  one  container.

However,  the  system  considers  the  materials  to  be  located  in  different  batches.  With  this  function  the

terminal provides an opportunity to merge batches and to print a label for the new batch.

Usage

At the moment, it is impossible to:

o  combine "normal" batches with merged batches and/or serial numbers

o  combine  merged  batches  and  serial  numbers  or  to  add  several  serial  numbers  to  one  merged

batch. The merged batch number including the serial number always has to be entered.

o  combine  individual  serial  numbers  into  one  merged  batch.  Their  merged  batch  number  always

has to be  entered. It  is also possible to use the standard function "collection of serial numbers"

A_SNR with the relevant configuration.

Prerequisite

The relevant configuration has to be made to be able to use this function.

Terminal functions

The function is triggered manually by using the key of the "merge batches" dialog (BATCH_MERGE).

If  the  terminal  is  offline,  only  a  limited  number  of  posting  functions  is  provided  based  on

the available data. If the terminal is offline, errors are not displayed e.g. if posting failed on

the server.

Dialog

AIP-LCS_82.docx

Version: 1.1.23049

Page 136 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Description of display fields:

  Batch

Batch number to be entered by the user (manually/by scanning)

  Generate new batch number / involved batch number

Specifies  whether  the  new  batch  is  to  be  generated  with  a  new  batch  number  or  if  an  involved

batch number is used for the new batch. If an involved batch number is used, this one has to be

entered.

  List of recorded batches

Shows the entered batches that are to be merged.

Procedure for the "merge batches" function:

  The user opens the "merge batches" dialog by the relevant function key in the basic screen of the

terminal



In the "batch" field the user enters the affected batches (manually or by scanning) he/she wants

to  merge.  Data  may  be  entered  manually  or  by  scanning.  If  batches  are  entered  manually,  the

input will be confirmed after each batch by

. This empties the field for the next input.

  The user specifies whether the new batch is to be  generated  with a  new  batch  number or if an

involved batch number is used for the new batch. If an involved batch number is used, this one

has to be entered.

  The  "list  of  recorded  batches"  shows  the  batches  the  user  has  already  entered  and  wants  to

merge.

AIP-LCS_82.docx

Version: 1.1.23049

Page 137 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

  The user applies the "complete" key. Then the "batch" field and the "list of recorded batches" are

emptied.  The  user  receives  an  intermediate  message  with  the  generated  batch  number  for  the

merged batch. Additional batches may be merged.

  The dialog remains opened until the user closes it explicitly by pressing "cancel". Then batches

are merged into a new batch.

  A label can be printed for the merged (new) batch.

Function keys

  Function key "cancel"

This  function  key  rejects  the  entered  data  and/or  empties  the  result  list.  New  data  may  be

entered. The dialog remains open.

  Function key "complete"

Entered batches are merged into one batch. By using this function key, the dialog is emptied (i.e.

no data included) and the new batch (batch number) is shown on the terminal. A label is printed

subject to configuration.

  Function key "reject"

Entered batches are not merged into one batch. The data input is rejected.

  Function key "additional data"

Subject  to  configuration,  this  function  leads  to  the  next  workflow  to  record  attributes  and/or

document links.

Result

  By the "cancel" function

The dialog remains open. All entered data are rejected. The input data are not posted. Data input

can be restarted.

  By the "complete" function

This  function  key  closes  the  dialog.  Entered  batches  are  merged  into  one  batch  and  data  are

posted  accordingly.  The  amount  of  merged  batches  is  reduced  accordingly  and  set  to  the

"processed"  batch  status.  The  new  batch  includes  the  merged  amount.  If  merged  batches  are

combined, the serial numbers will be assigned to the new merged batch. Label printing may be

triggered by this.

  By the "enter" function

Entered data are recorded for each batch but not yet posted.

This function key records the individual batches once they have been entered and displays them

in the result list. The dialog remains open.

  By the "additional data" function

AIP-LCS_82.docx

Version: 1.1.23049

Page 138 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Similar  to  the  output  batch  change,  it  is  possible  enter  attributes  and  document  links  for  each

combined batch/merged batch. If they are configured, relevant workflows are integrated for data

collection. Attributes and document links from previous batches are not taken over.

This dialog does not allow entering attributes/document links for individual serial numbers/sub-

batches pertaining to the merged batch.

In  addition,  the  event  is  also  shown  in  the  batch  history  (old  batches  and  new  batch  and  old

merged batches and new merged batch and serial number).

The graphic/tabular overview shows which batches have been merged into one batch.

AIP-LCS_82.docx

Version: 1.1.23049

Page 139 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

30  Configurations for Merging Batches in the AIP

Usage

You  use the function  to merge several  batches into  one batch at  the  AIP terminal.  Subject to the batch

type, batches may be merged in the following ways:

  Merging simple batches and/or their quantities to one batch

  Merging  individual  batches  belonging  to  an  already  existing  merged  batch  to  one  new  merged

batch

Dialog configuration

Dialog configuration (CNR.SUMMARIZE)

Define the function key "pool batches" by copying the layout gui\l_anr.xml to gui\l_anr_ln.xml and the key

"BDE comments". Then the following entries must be changed in the configuration of the copied key:

If you do not use tiles for the AIP2, define the function key in the file ctaipbut.ini:

[ANR-LN-Page3]

…

2=BATCH_MERGE,L,Lose zusammenfassen,Lose_zusammenfassen.png

AIP-LCS_82.docx

Version: 1.1.23049

Page 140 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

The  sections  [BATCH_MERGE]  and  [DOC_BATCH_MERGE.LST]  and  [ATTR_BATCH_MERGE.LST]

are required for the layout configuration of ctaiplay.ini, irrespective of the used design:

[BATCH_MERGE]

GRID_FONT=Arial

GRID_FONTSIZE=9

GRID_COLOR=clBlack

GRID_BACKGROUND=clWhite

EXAMINE_SCANEXPR1=SLOS=J

EXAMINE_SCANCOLOR1=clBlue

DLL=C20,150,Z,batch

ATK=C20,150,L,article

SGR:REST=N12.0,100,R,quantity

EINH=C3,60,Z,unit

[DOC_BATCH_MERGE.LST]

GRID_FONT=Arial

GRID_FONTSIZE=9

GRID_COLOR=clBlack

GRID_BACKGROUND=clWhite

LINK=C20,400,L,link/document

[ATTR_BATCH_MERGE.LST]

GRID_FONT=Arial

GRID_FONTSIZE=9

GRID_COLOR=clBlack

GRID_BACKGROUND=clWhite

;GRID_ORDER=DAT=-|ZEI=-|SNR

ATTR=C20,100,L,attribute

VALUE=C20,80,L,value

AIP-LCS_82.docx

Version: 1.1.23049

Page 141 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

EINH=C20,60,L,unit

TEXT=C20,200,L,text

System configuration

Further system configurations are not required in order to merge batches.

AIP-LCS_82.docx

Version: 1.1.23049

Page 142 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

31  Advanced Batch Information

Summary

Various batch information needs to be made available to manufacturing processes.

Usage

The function is used to display the information stored to the batch. This refers to:

  General batch information

  Batch quantities

  Batch attributes

  Alternative batch numbers

The dialog is structured in  workflows. These  workflows can be started  by clicking on the

individual tabs or by clicking "next" in each individual workflow.

Prerequisite

Batch attributes have to be configured for the batch to be able to display them.

Alternative batch numbers can only be displayed if they are used in specific projects.

Show general batch information

Dialog

If  the  terminal  is  offline,  only  a  limited  number  of  posting  functions  is  provided  based  on

the available data. If the terminal is offline, errors are not displayed e.g. if posting failed on

the server.

AIP-LCS_82.docx

Version: 1.1.23049

Page 143 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Description of display fields:

  Batch number

Entered number of the batch for which information is to be displayed.

  Material

Material number of the batch

  Designation

Material name of the batch

  Type

Material type of the batch

  Class

Batch class (yield, scrap, rework, open quantity)

  Operation

Operation that has produced the batch or which it is logged on to.

  Machine

Machine/workplace that has produced the batch or which it is logged on to.

  Material buffer

Material buffer that includes the batch.

  Manufacturing date

Manufacturing date of the batch

  Status

Batch status

  Q-status

AIP-LCS_82.docx

Version: 1.1.23049

Page 144 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Quality status of the batch.

  M-status

Material status of the batch.

Function keys

  Function key "cancel"

This function key terminates the dialog and rejects data input.

  Function key "go on"

This  function  key  leads  the  user  to  the  next  configured  workflow  of  the  dialog  (quantities,

attributes, alternative batch numbers).

Procedure

For the user the procedure is as follows:

  The user opens the "batch information" dialog in the basic screen of the terminal.

  The  user  enters  the  batch  (manually  or  by  scanning)  for  which  he/she  wants  to  view  batch

information.

  The user applies the "batch information" workflow.

Show quantities

Dialog

AIP-LCS_82.docx

Version: 1.1.23049

Page 145 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Description of display fields:

  Batch number

Entered number of the batch for which information is to be displayed.

  Quantity

Initial quantity of the batch.

  Remaining quantity

Current remaining quantity of the batch.

  Unit

Batch unit

  Activity (1-6)

Activity fields of the batch (to convert into other units)

Function keys

  Function key "cancel"

This function key terminates the dialog and rejects data input.

  Function key "go on"

This  function  key  leads  the  user  to  the  next  configured  workflow  of  the  dialog  (attributes,

alternative batch numbers).

  Function key "back"

This function key leads the user back to the  previously configured workflow of the dialog (batch

information, quantities, attributes, alternative batch numbers).

Procedure

For the user the procedure is as follows:

  The user opens the "batch information" dialog in the basic screen of the terminal.

  The  user  enters  the  batch  (manually  or  by  scanning)  for  which  he/she  wants  to  view  batch

information.

  The user applies the "quantities" workflow.

Show batch attributes

Dialog

AIP-LCS_82.docx

Version: 1.1.23049

Page 146 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Description of display fields:

  Batch number

Entered number of the batch for which information is to be displayed.

  Result list: attributes

Shows  the  configured  batch  attributes  for  the  material  type  of  the  batch  including  value  and

relevant captions. The displayed columns are configurable.

Function keys

  Function key "cancel"

This function key terminates the dialog and rejects data input.

  Function key "go on"

This  function  key  leads  the  user  to  the  next  configured  workflow  of  the  dialog  (attributes,

alternative batch numbers).

  Function key "back"

This function key leads the user back to the previously configured workflow of the dialog (batch

information, quantities, attributes, alternative batch numbers).

Procedure

For the user the procedure is as follows:

  The user opens the "batch information" dialog in the basic screen of the terminal.

  The  user  enters  the  batch  (manually  or  by  scanning)  for  which  he/she  wants  to  view  batch

information.

AIP-LCS_82.docx

Version: 1.1.23049

Page 147 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

  The user applies the "attributes" workflow.

Show alternative batch numbers

Dialog

Description of display fields:

  Batch number

Entered number of the batch for which information is to be displayed.

  Result list: alternative batch numbers

Shows the alternative batch numbers for the material type of the batch including relevant value.

Alternative batch numbers are optional and entered for specific projects.

Function keys

  Function key "cancel"

This function key terminates the dialog and rejects data input.

  Function key "back"

This function key leads the user back to the previously configured workflow of the dialog (batch

information, quantities, attributes, alternative batch numbers).

Procedure

For the user the procedure is as follows:

  The user opens the "batch information" dialog in the basic screen of the terminal.

AIP-LCS_82.docx

Version: 1.1.23049

Page 148 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

  The  user  enters  the  batch  (manually  or  by  scanning)  for  which  he/she  wants  to  view  batch

information.

  The user applies the "alternative batch numbers" workflow.

AIP-LCS_82.docx

Version: 1.1.23049

Page 149 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

32  Additional Batch Information

Usage

You use the function to view information about a batch in the AIP terminal. Additional batch information

include:

  General batch information

  Quantities

  Batch attributes

  Alternative batch numbers

Dialog configuration

Dialog configuration (LOS_INFOS)

Define the function key "batch information" by copying the layout gui\l_anr.xml to gui\l_anr_ln.xml and the

key "BDE comments". Then the following entries must be changed in the configuration of the copied key:

If you do not use tiles for the AIP2, define the function key in the file ctaipbut.ini:

[ANR-LN-Page3]

1=LOS_INFOS,L,Losinformation,Shipping Box Closed Information.png

AIP-LCS_82.docx

Version: 1.1.23049

Page 150 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

The sections [LOS_INFOS_ATTR.LST] and [LOS_INFOS_QUA.LST] and [LOS_INFOS_ALTER.LST] are

required for the layout configuration of ctaiplay.ini, irrespective of the used design.

[LOS_INFOS_ATTR.LST]

GRID_FONT=Arial

GRID_FONTSIZE=9

GRID_COLOR=clBlack

GRID_BACKGROUND=clWhite

KENNUNG=C20,100,L,attribute

ATTR_VAL=C20,80,L,Value

EINH=C20,80,L,unit

TXT=C20,80,L,

MATTYP=C40,140,

[LOS_INFOS_QUA.LST]

GRID_FONT=Arial

GRID_FONTSIZE=9

GRID_COLOR=clBlack

GRID_BACKGROUND=clWhite

KENN=C20,100,L,

ALIAS LEER1=(DUMMY1)=C1,30,L

MENGE=C20,80,R,

EINH=C4,40,R,

ALIAS LEER2=(DUMMY1)=C1,30,L

REST=C20,80,R,

AIP-LCS_82.docx

Version: 1.1.23049

Page 151 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

[LOS_INFOS_ALTER.LST]

GRID_FONT=Arial

GRID_FONTSIZE=9

GRID_COLOR=clBlack

GRID_BACKGROUND=clWhite

ALT=C20,100,L,

CNR=C20,200,L,

System configuration

Further system configurations are not required in order to display additional batch information.

AIP-LCS_82.docx

Version: 1.1.23049

Page 152 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

33  Weighing Components

Usage

For  operations  that  are  not  subject  to  batch  management,  it  is  possible  to  record  batches  in  relation  to

discrete material components. In this special case, batches may be entered in relation to the charge via a

special terminal function.

This entry function replaces the collection of quantities for the operation (e.g. partial upload) and records

material  consumption  in  relation  to  material  components.  This  consumption  is  also  posted  as  material

movement in the system.

Prerequisites

  The  function  can  weigh  more  than  one  charge.  In  this  case,  the  operation's  secondary  quantity

has to include the number of charges. The additional data fields of the components and operation

regarding the weighing function (e.g. target quantity per charge, tolerances, etc.) also need to be

taken into account.

  Every time an operation is changed, the target quantity for each charge is recalculated (formula:

target  quantity  per  charge  =  primary  target  quantity  /  secondary  target  quantity.  It  is  neither

possible to set the value for the target quantity per charge manually nor to display it on MOC. If

the secondary target quantity is not set, the value 1 is assumed by default and only one charge is

processed in the weighing operation.



In this case, the machine does not allow to enter automatic quantities additionally.

  All components have to be managed by the "weight" unit (kilogram).

The entry function cannot be used offline.

Configuration

The configuration document describes the configurations required to use and enable the entry function at

the terminal.

AIP-LCS_82.docx

Version: 1.1.23049

Page 153 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Posting

Data for label printing

The schema a_vbrkomp is provided in initial data for label printing.

This data can be printed on the label during weighing (dialog action KEW_RECORD):

Acronym

DLG.MNR

DLG.ANR

DLG.ATK

DLG.SLP

DLG.CHARGE

DLG.CST

DLG.SGR:GUT

DLG.SGE:GUT

DLG.EGR:GUT

DLG.EGE:GUT

Type

Length  Description

C

C

C

C

C

C

DEC

C

DEC

C

10

40

40

40

20

1

3

3

3

Machine

Operation

Material number

BOM item

Batch

Batch status F/S (free/blocked)

Target quantity

Unit of the target quantity

Actual quantity

Unit of the actual quantity

Input quantity

Unit of the input quantity

DLG.EGR:MENGE

DEC

DLG.EGE:MENGE

C

DLG.DAT

DLG.ZEI

DLG.KNR

DATE

ZEIT

Date of the posting

Time of the posting

C

10

The reporting person's badge number

This data can be printed on the label when completing the charge (dialog action KEW_ABSCHLUSS):

Acronym

DLG.MNR

DLG.ANR

DLG.ATK

DLG.ATKBEZ

DLG.CHARGE

Type

Length  Description

C

C

C

C

C

10

40

40

40

20

Machine

Operation

Material number

Material designation

Batch

DLG.EGR:GUT

DEC

Quantity of the batch

DLG.EGE:GUT

C

3

Unit

DLG.DAT

DLG.ZEI

DLG.KNR

DATE

ZEIT

Date of the posting

Time of the posting

C

10

The reporting person's badge number

AIP-LCS_82.docx

Version: 1.1.23049

Page 154 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Scale interfacing

The weight can also be entered in the weighing dialog by means of a connected scale. Upon opening the

KOMP_WIEG dialog,  the value is requested from the scale  via the PCC  driver interface and entered  in

the "input quantity" field.

This is an example for entering the scale value in the INI file of the driver:

<WAAGENTREIBER>.INI

V:WAAGE:NETTO=Nettogewicht_Waage

If  an  OPC  interfacing  is  used,  changed  scale  values  can  be  sent  automatically  by  the  OPC  server.

For  this  purpose,  the  below-mentioned  parameter  has  to  be  entered  in  the  file  "OPCMPDV.INI"

SETVALEVENTS=V:WAAGE:NETTO

<WAAGENTREIBER>.INI

SETVALEVENTS=V:WAAGE:NETTO

 additional entry

V:WAAGE:NETTO=Nettogewicht_Waage

AIP-LCS_82.docx

Version: 1.1.23049

Page 155 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

34  Weighing of Components

Summary

Some production areas require components to be weighed using  scales and to provide them for further

production processes.

Usage

The  function  is  always  used  when  the  user  prepares  charges  using  the  relevant material  quantities.  To

save time, users often weigh several charges at once.

The logical process and posting are described here.

Prerequisite/configuration

The configuration is described here.

Weighing components

Components for a charge are weighed by the AIP dialog A_VBRKOMP.

If  the  terminal  is  offline,  only  a  limited  number  of  posting  functions  is  provided  based  on

the available data. If the terminal is offline, errors are not displayed e.g. if posting failed on

the server.

The  "weighing"  function  at  the  terminal  provides  a  list  of  required  input  materials  (discrete  material

components). The component-related data collection can be opened from this list.

Once the operation to be weighed has been logged on, the "weighing components" dialog can be started

by the "weigh" function key from the toolbar of the basic screen of the terminal. After opening the dialog,

the terminal automatically generates a new batch for the order. This is presented as batch in the following

dialog.

Please note: The dialog only opens if "discrete" material components (consumption type = D) exist for the

running operation.

The actual weighing process of the relevant components is performed by the "weigh charge" function in a

detailed dialog (see below).

Dialog

AIP-LCS_82.docx

Version: 1.1.23049

Page 156 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Workplace

Weighing workplace to which the operation to be weighed is logged on.

Operation

Weighing order/operation

Batch

Batch number for the charge that is currently to be produced.

Material

Material number for the charge that is currently to be produced.

Status

Batch status for the charge that is currently to be produced after weighing. This can be:

  Free

  Locked

Staff badge number

The user's staff badge number.

Components list

The  component  list  shows  all  components  of  the  currently  registered  weighing  operation  that  are

relevant for the charge to be produced. These details for the component are displayed to perform

weighing:

AIP-LCS_82.docx

Version: 1.1.23049

Page 157 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

  Article number (material number of the component from the component list)

  Target quantity

  Actual quantity (quantity entered upon weighing, at first 0,000)

  Remaining quantity (computed remaining quantity after weighing, at first 0,000)

  Designation (component name from the component list)

  Tolerance (calculated, admissible tolerance of the component/component list)

  Deviation (calculated, admissible deviation of the component/component list)

Procedure:

The user selects the first component that is to be weighed and starts weighing.

  The  relevant  component  row  is  highlighted  in  green  if  the  component  is  within  the  variance

tolerance (at the component, percentage).

  Materials falling short of the variance tolerance are highlighted in red.

  Materials  the  weighing  result  of  which  exceeds  the  variance  tolerance  but  is  still  within  the

tolerances of quantity adjustment (of the component) are highlighted in blue.

  The row is shown in black font, provided that the component has not yet been weighed.



If  the  weight  value  is  beyond  the  variance  tolerance  but  within  the  tolerance  of  quantity

adjustment,  posting  will  be  accepted  but  the  user  has  to  adjust  quantities  for  the  other

components (automatically in the system). The input dialog cannot be closed if this modification is

not made.

Quantities have to be entered for all input materials included in the component list.

Functions

The paragraphs that follow describe the functions provided in the input dialog to weigh components:

"Weigh charge"

The "weigh charge" function opens the dialog to weigh a selected individual component (KOMP_WIEG).

AIP-LCS_82.docx

Version: 1.1.23049

Page 158 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

The  current  status  of  target  and  actual  quantity  is  presented  after  selecting  a  component  that  is  to  be

weighed. The user has to enter a relevant batch for consumption posting in the "component batch" input

field. The batch has to be available in HYDRA with the appropriate material and the status "free" and it

must have a remaining quantity >=0. The dialog can be closed by entering the weighing quantity and the

staff badge number (optional).

Successful weighing has the following additional effects on the system:



Indicators are recorded for the component

  The weighed quantity is added to the actual quantity of the component

  Material movements are generated for consumption (261)

  A batch assignment is generated for the batch  component batch.

  The article of the batch always has to match the article of the component.

  A component may also be weighed several times.

  The  amount  (stock)  of  component  batches  is  only  reduced  if  the  relevant

material type is assigned the "retrograde inventory collection" flag.

Once the weight has been entered, the displayed actual quantity and remaining quantity are updated.

The displayed component requirements are updated in the table once the component has been weighed

successfully.

AIP-LCS_82.docx

Version: 1.1.23049

Page 159 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

A warning message the user may skip is output if the value of the actual deviation is greater than the one

of the target deviation.

"Reject charge" function

Due  to  the  weighing  process,  it  might  be  the  case  that  an  entire  batch  cannot  be  used.  The  "reject

charge" function can be used to identify the current charge/batch as "scrap". The material  used for this

charge  is  uploaded  to  ERP  and  the  generated  scrap  quantity  (identified  as  charge  scrap  by  SYSTEM

reason 910) is posted to the order. The batch is generated with the "locked" status and the "scrap" batch

class (goods movement 531).

A confirmation prompt the user has to affirm comes up with this function.

Then the original target quantity for each charge is restored and the components are reset. Consequently,

the weighing process can be restarted for a new batch.

"Adjust quantity" function

Once  the  first  component  has  been  weighed,  the  user  can  apply  the  "adjust  quantity"  function  to

automatically  adjust  the  input  quantities  of  the  other  components  in  proportion  to  the  weighing  result  of

the first component and its default quantity. This function can only be used once for each charge.

AIP-LCS_82.docx

Version: 1.1.23049

Page 160 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

The function  adjusts  the  target  quantities  of  all  components  to  the  weighed  quantity  of  one  component.

Quantities are adjusted by changing the primary target quantity for each charge of the operation.

However, quantities may only be adjusted if the component is weighed within its tolerances.

"Complete charge" function

Using  this  function,  the  charge/batch  is  completed  (generated)  and  the  dialog  is  closed.  However,  the

charge/batch  can  only  be  completed,  once  all  components  have  been  weighed  and  are  within  their

specified tolerances.

Completed successfully, the charge/batch is generated and transferred as goods movement 101 to ERP.

Optionally,  the  charge/batch  is  assigned  a  minimum  shelf-life  (from  the  material  type  of  the  OP).

In  addition,  the  PPS  batch  from  the  order  is  determined  and  stored  as  PPS  batch  in  the  batch  of  the

charge (optionally).

The  quantity  of  the  generated  batch  results  from  the  input  quantity  recorded  as  consumption  for  each

component.

The user may also directly block the batch/charge by selecting a status from the component requirements

dialog. By default, the batch is always assigned the status "free".

AIP-LCS_82.docx

Version: 1.1.23049

Page 161 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

35  Configuration of Weighing Components

Usage

You use the "pass batch attributes on" function if attributes of input batches are to be transferred to the

generated output batch when changing output batches.

Dialog configuration

The input function is controlled by the dynamic dialogs A_VBRKOMP and KOMP_WIEG

Activation of the posting function at the terminal

Specific posting functions are enabled at AIP by an entry in the file ctaipbut.ini.

This is an example for the entry in ctwinbut.ini:

CTAIPBUT.INI

F1=A_VBRKOMP,weigh

The dynamic dialogs A_VBRKOMP and KOMP_WIEG must be available.

System configuration

Operation data

The following additional fields have be filled out for the operation using the PPS interface:

  No batch management requirement

  Target  quantity  per  charge

(calculated

form  primary

target  quantity

/  secondary

quantity)(ab.soll_menge_ansatz)

  Number of charges (secondary quantity in pieces) - default = 1

  Batch

Data included in component list

These parameters have to be filled out for discrete material components using the PPS interface:

  Tolerance (in percent)  mlst_hy.mengen_tol

  Deviation (absolute value)  mlst_hy.mengen_abweichung

AIP-LCS_82.docx

Version: 1.1.23049

Page 162 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers



Input quantity and unit of input quantity

  Component type must be D - discrete

AIP-LCS_82.docx

Version: 1.1.23049

Page 163 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

36  Palletizing  and Packing on the AIP

Log packing OP on

Use  the  input  function  (dialog  A_AN_HU  or  A_P_AN_HU)  to  log  on  a  packing  OP  requiring  batch

management to the terminal.

When logging the OP on, an operation is selected from the sequencing list and logged on to the machine.

The logon is performed without input material for OPs requiring batch management and posted using the

PDM command A_AN or A_P_AN.

If the machine is configured so that the person has to be logged on with the OP, the A_P_AN command is

used and the dialog has to include an input field for the badge number.

Assign batches

The  below  input  function  (dialog  CE_AN_HU)  is  used  on  the  terminal  to  assign  batches  to  the  current

TPU (running output batch) for a running OP requiring batch management:

Figure: "Assign batches" dialog - CE_AN_HU

Enter a batch number that is known in HYDRA and click the button  Assign batch to logically assign the

batch  to  the  current  TPU.  Once  assigned  successfully,  the  batch  is  set  to  the  "processed"  status  and

displayed in the list, which includes all batches assigned to the TPU.

Note: You can assign only batches of the same material.

AIP-LCS_82.docx

Version: 1.1.23049

Page 164 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Use the button Remove batch to cancel the assignment of a selected batch (double-click on the relevant

row). Then the batch changes back to the "free" status.

As  additional  status  information  on  the  current  TPU,  the  dialog  shows  the  number  of  assigned  batches

and their total quantity in kg.

You configure the contents of the "batches in transport unit" table in the section [ C_PAL_ZUORD.LST ]

of the file ctaiplay.ini.

Complete TPU

You use this input function (dialog CA_WL_HU) to complete the currently running output batch (TPU) on

the terminal.

Figure: "Complete TPU" dialog – CA_WL_HU

Using  the  function  Complete  TPU,  you  can  complete  a  TPU  and  enter  the  weight  and  the  status  yield,

locked, scrap. When  you complete the TPU, the relevant quantity (net  weight) is booked to the running

output batch and completed and a goods receipt (movement type 101) is posted. At the same time, the

next output batch is logged on to the OP.

You can collect the following data with this posting:

Target buffer

Material buffer where the TPU batch is posted. By default, this is the machine's output buffer.

Gross weight/tare weight/net weight

AIP-LCS_82.docx

Version: 1.1.23049

Page 165 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

By  default,  the  total  (in  kg)  of  the  assigned  single  batches  is  entered  as  net  weight.

If entered manually, it is calculated as follows:

Gross weight = Tare weight + Net weight

The values "gross weight" and "tare weight" are additionally saved as batch attributes for the TPU

batch:

  Gross weight

-  batch attribute 301 (ATTR:301)

Tare weight

-  batch attribute 302 (ATTR:302)

Transp. unit (transport unit)

A transport unit existing in the system can be assigned to the TPU batch.

Note: the weight stored for the transport unit is currently not taken over as tare weight to the input

dialog.

Status (free/locked/waste)

By using the status selection, you can assign a status to the generated TPU batch: status "free"

(yield material), status "locked" (class: yield material) or status "waste" (class: scrap).

In case of scrap, the quantity is posted as scrap for the operation and a scrap reason is entered.

Number of batches

Shows  the  number  of  batches  currently  assigned  to  the  TPU.  The  value  is  saved  as  batch

attribute 201 (ATTR:201).

Once the input has been confirmed by clicking OK, you can optionally enter further batch attributes if the

attributes have been defined for the material type of the operation.

Once the posting has been completed successfully, the TPU batch is generated as "merged  batch" and

the relevant quantity and the goods movement are posted for the operation.

Log OP off / Interrupt OP

The  packing  OP  can  be  interrupted  or  logged  off  on  the  terminal  using  this  input  function  (dialog

A_UN_HU or A_AB_HU).

Once selected, the user can interrupt or finish the packing OP:

AIP-LCS_82.docx

Version: 1.1.23049

Page 166 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Figure: "Interrupt packing OP" dialog – A_UN_HU

The running packing OP is interrupted/finished after confirming by clicking OK.

Notes / restrictions:

  The  last  active  output  batch  of  the  packing  OP  is  completed  without  quantity  and  with  status

"deleted".



If batches are still assigned to the TPU when you try to log the OP off, the logoff is rejected with

error message.

  The  ADE  checks  for  overdelivery/underdelivery  of  the  operation  are  not  active  when  you  use

these posting functions.

  Quantities cannot be posted using this function.

Unpack / Repack

Requirements

Service  pack  13  must  be  installed  and  activated.  The  document  Activating_MPL_TRT_Dialogs_(SP13)

describes how to use the dialog on the shop floor client.

AIP-LCS_82.docx

Version: 1.1.23049

Page 167 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

For  new  customers,  the  new/updated  MPL  or  TRT  dialogs  are  directly  available  once  the

service pack 13 has been released.

General

Using  this  dialog,  the  operator  can  enter  the  packed  handling  unit  and  unpack  selected  batches.  The

operator can also unpack all batches and therefore cancel the handling unit.

Terminal procedure - Unpack individual batches

You  start  the  function  "Unpack  TPU"  (Dialog:  CE_DEL_HU)  in  the  main  view  by  clicking  the  button

Unpack TPU.

The user enters the handling unit or merged batch number. The number can be entered manually or by

scanning the  barcode. If  you enter the number manually,  you must click the green arrow. If  you scan a

barcode, the system automatically performs the transfer and requests the detail data of the batch.

The list displays the data of the entered handling unit. You can double-click specific batches to select the

batches that you want to unpack. The selected batches are labeled in the list with an "x".  Double-click a

selected batch to deselect the batch. The display returns to normal ("-").

Use the button Unpack selected ones to unpack selected batches.

A confirmation prompt opens asking whether you want to execute the dialog:

  Click No to cancel execution. The user returns to the dialog.  The selected batches remain.

  Click OK to execute the dialog.

Then a message confirms that the unpacking process has been completed successfully. If you click  OK,

you get back to the dialog for further processing.

If you click Exit, the dialog closes. Selected unpacked batches remain unchanged in the handling unit.

Terminal procedure - Unpack all batches

You  start  the  function  "Unpack  TPU"  (Dialog:  CE_DEL_HU)  in  the  main  view  by  clicking  the  button

Unpack TPU.

The user enters the handling unit or merged batch number. The number can be entered manually or by

scanning the  barcode. If  you enter the number manually,  you must click the green arrow. If  you scan a

barcode, the system automatically performs the transfer and requests the detail data of the batch.

AIP-LCS_82.docx

Version: 1.1.23049

Page 168 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

The list displays the data of the entered handling unit. You can double-click specific batches to select the

batches that you want to unpack. The selected batches are labeled in the list with an "x".  Double-click a

selected batch to deselect the batch. The display returns to normal ("-").

The function key Unpack all unpacks all batches contained in the handling unit.

Then a message confirms that the unpacking process has been completed successfully. If you click OK,

the dialog is closed because there are no more batches.

Terminal procedure - Add new batch

You  start  the  function  "Unpack  TPU"  (Dialog:  CE_DEL_HU)  in  the  main  view  by  clicking  the  button

Unpack TPU.

The user enters the handling unit or merged batch number. The number can be entered manually or by

scanning the  barcode. If  you enter the number manually,  you must click the green arrow. If  you scan a

barcode, the system automatically performs the transfer and requests the detail data of the batch.

The list displays the data of the entered handling unit.

If you click the button Add, you can add batches to the handling unit. A dialog opens where you can enter

the batch number that is added, either manually or by scanning. After confirmation, the batch is added to

the handling unit.

Posting procedure - Unpack individual batches

If you want to remove child batches from a handling unit, the system checks the following:

  The child batches must exist, but can be archived.

  The handling unit must be available but not running or processed.

The following actions are performed for each unpacked child batch:

  The batch status of the child batch is set to the status of the handling unit.

  The  remaining  quantity  of  the  child  batch  is  calculated  from  the  total  quantity  of  the  goods

movements when the child batch is packed.

  An entry in the Batch history is generated.

  The connection between handling unit and child batch is removed

  The batch assignment between child batch and handling unit is removed.

Actions performed for the handling unit:

  The remaining quantity of the handling unit is reduced by the sum of all remaining quantities of all

unpacked batches.

AIP-LCS_82.docx

Version: 1.1.23049

Page 169 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers



If the remaining quantity of the handling unit is zero, the batch is set to status "A" (processed)

  A goods movement is generated specifying the reduced quantity.

Posting procedure - Unpack all batches

See above "Unpack individual batches". The same processing is applied. All batches are unpacked and

the handling unit with the remaining quantity = 0 is set to status "A" (processed).

Posting procedure - Add new batch

If you want to add child batches to an existing handling unit, the system checks the following:

  The handling unit must be available but not running or processed.

  The  batch  to  be  added  must  have  the  status  "F"  (free)  and  the  same  article  number  as  the

handling unit batch.

Note for the added child batch:

  All batch data of the handling unit is transferred to the child batch.

  The batch class of the child batch is identical to the batch class of the handling unit.

  The batch status is "A" (processed).

  The child batch is linked to the handling unit.

  An event „CE_AN_PA“ is added for the child batch in the batch history.

  The batch assignment between child batch and handling unit is generated.

  A goods movement (goods issue) is generated for the child batch.

Actions performed for the handling unit:

  The remaining quantity and the quantity of the handling unit increase by the remaining quantity of

the added child batch.

  The system generates a goods movement (goods receipt) with the new quantity of the handling

unit.

AIP-LCS_82.docx

Version: 1.1.23049

Page 170 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

37  Activating Palletizing/ Packaging/ Assembling

Requirements

Ensure that:

  The flag "Batch management requirement" is set at the operation

  The operation material type does not have the flag "Consumption balance"

  The primary quantity unit for the operation is "KG"

Ensure that at the workplace:

  The flag "Batch administration" is set

  The machine type "Packing location" is selected

  Machine monitoring is not activated

Procedure

Assign the workplace to a terminal. Reboot the terminal.

Results

The following specific dialogs are available at the terminal for the configured packing location:

Dialog

A_AN_HU

A_P_AN_HU

CE_AN_HU

CA_WL_HU

A_UN_HU

A_AB_HU

A_AUT_HU

C_VLOS_HU

Description

Log packing OP on (no input batches)

Log packing OP on (no input batches, with person)

Assign batch to running OP/ TPU

Complete TPU (output batch change)

Interrupt packing OP

Finish packing OP

Log off/ interrupt OP selection

Display preceding TPU

The TPU batch numbers created are permanently generated at the terminal with the prefix HU.

The prefix is not currently configurable.

There is no off-line entry capability

AIP-LCS_82.docx

Version: 1.1.23049

Page 171 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

AIP-LCS_82.docx

Version: 1.1.23049

Page 172 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

38  Consumption Balance

Summary

When  logging  an  OP  off,  the  “consumption  balance”  (V_BLZ  dialog)  can  be  displayed,  which  can  be

configured via the machine and the material type of the operation.

The consumption balance is shown if this option is active at the machine and material type.

The consumption balance shows the material consumption based on batches and the user is able to log

still running batches off.

Dialog

Figure: Consumption balance – V_BLZ

Display of consumption postings

The  “show  details”  function  allows  for  consumption  quantities,  which  have  been  collected  so  far,  to  be

displayed.

AIP-LCS_82.docx

Version: 1.1.23049

Page 173 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Figure: Display of consumption postings – V_BLZ_DTL

Logging input batches off

By way of the “log batch off” function, the user can choose a currently running batch from the list and log

it off by entering consumption.

AIP-LCS_82.docx

Version: 1.1.23049

Page 174 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Figure: Log batch off – V_BLZ_CEAB

AIP-LCS_82.docx

Version: 1.1.23049

Page 175 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

39  Configuration of Consumption Balance

Dialog configuration:

A  special  configuration  (function  =  “DLG=V_BLZ;BREAK-ON-CANCEL“)  has  to  be  defined  for  the  OK

button of the logoff dialog (e.g. A_AB_MPL) to make sure that the consumption balance is started when

the OP is logged off.

Sample configuration of the OK button for starting the consumption balance:

AIP-LCS_82.docx

Version: 1.1.23049

Page 176 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Figure: Example for the OK button configuration including consumption balance

AIP-LCS_82.docx

Version: 1.1.23049

Page 177 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

40  AIP - on-screen keyboard decimal symbol configuration

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

AIP-LCS_82.docx

Version: 1.1.23049

Page 178 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

Every time you start the on-screen keyboard, the keyboard identifies which decimal symbol is displayed

on  the  numeric  keypad.  The  on-screen  keyboard  gets  this  information  from  the  currently  selected

keyboard settings:

Integration

If you set both configurations correctly (see above), you can use the numeric on-screen keyboard to enter

decimals (see the following screenshot):

AIP-LCS_82.docx

Version: 1.1.23049

Page 179 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

If the configurations do not match, for example:

- you select the "comma" in the "region" tab of the Windows system settings and

- you select the "decimal point" in the keyboard settings

you cannot use the on-screen keyboard to enter the decimal symbol:

AIP-LCS_82.docx

Version: 1.1.23049

Page 180 of 181

Special Collection Functions for MES Batches, ERP Batches, Serial Numbers

AIP-LCS_82.docx

Version: 1.1.23049

Page 181 of 181

