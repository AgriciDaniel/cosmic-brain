Manual

Entry/Information Functions
for Shop Floor/Machine Data
Collection
AIP-BMD 8.1

Version 1.3.23049

Last changed on: 01.09.2020

Entry/Information Functions for Shop Floor/Machine Data Collection

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying  and  distribution  of this  documentation  or  any  part thereof,  for  any  purpose  or  in  any  form, is  prohibited  without  prior
written permission from MPDV Mikrolab GmbH.

AIP-BMD_81.docx

Page 2 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

The information contained in this documentation is subject to change without prior notice.

AIP-BMD_81.docx

Page 3 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

Contents

1  AIP Functions - Shop Floor Data/Machine Data .......................................... 7

2  Operation of AIP ......................................................................................... 10

2.1  Special control and display elements within AIP ................................................ 10

2.2  General description of the posting process with AIP .......................................... 12

3  Basic AIP Display ....................................................................................... 16

3.1  Basic displays – header and footer .................................................................... 16

3.2  Basic display “tabular view“ ............................................................................... 18

3.3

3.4

"Machine overview" basic display ...................................................................... 21

“Machines as icons” basic display ..................................................................... 24

4  BDE and MDE Functions ........................................................................... 26

4.1

4.2

4.3

Logging on an operation .................................................................................... 26

Logging an operation off .................................................................................... 28

Interrupting an operation ................................................................................... 30

4.4  Uploading a part quantity for an operation ......................................................... 30

4.5

4.6

4.7

Log person on ................................................................................................... 31

Log person off ................................................................................................... 31

Log off everyone ............................................................................................... 32

4.8  Change workplace/machine status .................................................................... 32

4.9

Lock/unlock production status ........................................................................... 34

4.10  Change target cycle .......................................................................................... 35

4.11  Change partitioning ........................................................................................... 36

4.12  Change target quantity ...................................................................................... 36

4.13

Information on operations (OP info) ................................................................... 37

4.13.1  SF comments ........................................................................................ 38

4.13.2  Documents ............................................................................................ 39

4.13.3  Tools, Resources .................................................................................. 40

4.13.4  Components .......................................................................................... 40

4.13.5  Progress ................................................................................................ 40

4.13.6  Resource performance accounts ........................................................... 40

AIP-BMD_81.docx

Page 4 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

4.14  Machine information (machine info) ................................................................... 41

4.14.1  Description ............................................................................................ 41

4.14.2  Registered persons ............................................................................... 43

4.14.3  Status log .............................................................................................. 44

4.15  Merged operations ............................................................................................ 46

4.15.1  Log merged operation on....................................................................... 46

4.15.2

Interrupt/log merged operation off .......................................................... 47

5  Specific Features of Machine Data Collection ........................................... 49

5.1  Shift automatic .................................................................................................. 49

5.2  Downtime monitoring ......................................................................................... 50

5.3

Lock production status (production lock) ........................................................... 52

5.4  Machine lock ..................................................................................................... 53

5.5  Output “target quantity reached" ........................................................................ 54

5.6  Scrap reasons depending on status & production lock ...................................... 55

5.7  Setting of outputs subject to the status and posting scenarios ........................... 55

6  Barcode Input ............................................................................................. 56

7  AIP configuration of barcodes .................................................................... 58

7.1  Configuration in ctaip.ini .................................................................................... 58

7.2  Configurations in hytnrcfg.ini ............................................................................. 61

7.2.1  Notes/configurations for concurrent lengths ........................................... 61

8  Barcode Input with Prefix ........................................................................... 63

8.1  Configuration of customized barcode prefixes ................................................... 67

9  Local Configuration File ctaip.ini ................................................................ 69

9.1  Basic configuration ............................................................................................ 69

10  Central Configuration File hytnrcfg.ini ........................................................ 73

10.1  Layout configuration .......................................................................................... 76

11  Local Configuration File keyboard.ini ......................................................... 78

12  Start Menu Inst32 ....................................................................................... 81

AIP-BMD_81.docx

Page 5 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

12.1  Using the functions in Windows 7 ...................................................................... 89

12.2

Installation of font types in Windows 7 ............................................................... 90

12.3  Date/time synchronization at the terminal .......................................................... 90

12.4  Control of special watchdog hardware ............................................................... 91

AIP-BMD_81.docx

Page 6 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

1

 AIP Functions - Shop Floor Data/Machine Data

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

AIP-BMD_81.docx

Page 7 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

  Reasons for deviation

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

AIP-BMD_81.docx

Page 8 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

  Status log

o  Display of the machine states/statuses posted during the current shift. Function for the

subsequent assignment of reasons to disturbances/malfunctions that had not yet been

given one.

Additional licenses might be needed in order to use the functions listed above.

AIP-BMD_81.docx

Page 9 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

2  Operation of AIP

2.1  Special control and display elements within AIP

Tables

Tables  are  displayed  in  a  uniform  way  within  AIP.  This  affects  the  basic  display  (workplaces,

operations, …) as well as the selection lists of posting dialogs.

  Provided  that  information  is  available  for  more  than  one  page,  the  page

numbers  are  displayed  below  the  table.  The  current  page  is  highlighted  in  bold  letters.  By

clicking/touching the user can directly switch to another page.

An  operation  may  be  selected  using  the  mouse,  touch  screen,  keyboard  (arrow  keys:''  or  ''),

scanner or by entering it manually.

The  content  of  tables  or  lists  depends  on  the  respective  context.  Please  find  the  following  example:

When  an  operation  is  logged  on,  those  operations  may  be  selected  that  are  included  in  the

sequencing  list  or  that  are  planned  for  the  corresponding  workplace  or  group.  However,  when

operations are interrupted, only running operations may be selected.

 Scrolling page by page (up or down) in the table.

  Scrolling  to  the  left  or  right.  Only  those  buttons  are  activated  that  are  reasonable  for  the

current situation. This figure shows that scrolling to the left has been deactivated.

AIP-BMD_81.docx

Page 10 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

A  “table  filter”  may  optionally  be  displayed  (customizing).  This  is  an  automatic  filter  that,  once  it  has

been  entered,  directly  affects  the  table  without  having  to  update  it.  This  process  is  realized  through

full-text search for (defined) columns. The search is case-insensitive.

Virtual keyboard

The virtual keyboard allows for data to be entered manually via touch screen or a connected mouse.

To make it easier for inexperienced users to find the required keys, the numeric key pad is organized

like  the  telephone  and  letters  are  aligned  in  alphabetical  order.  Consequently,  both  differ  from  the

computer keyboard which usually is aligned in the “QWERTZ keyboard layout”. The virtual keyboard is

displayed automatically as soon as an input field is focused.

Moving the
virtual keyboard

Hide keyboard
for 10 seconds

Delete

Tabulator

Space bar

The  driver  needs  to  be  configured  respectively  for  the  touch  screen  to  be  able  to  move  the

keyboard

(settings

in

the

control

panel

of

the

terminal/PC)!

The  virtual  keyboard  only  supports  the  characters  "0"  -  "9",  "A"  -  "Z"  and  "+“,  "-“  ,  ".“  and  ",“.

Other  characters  or  languages  are  not  supported.  It  is  recommendable  to  use  an  additional

keyboard if texts in other languages have to be entered.

The  start  position  of  the  virtual  keyboard  can  be  defined  by  a  setting  in  the  configuration  file

keyboard.ini. Subject to the screen resolution, the parameters xpos= and ypos= need to be enabled in

the configuration file.

If  the  virtual  keyboard  is  not  to  be  shown  in  general,  the  parameter  –t  needs  to  be  included  in  the

parameter bar parameters= of the configuration file ctaip.ini.

AIP-BMD_81.docx

Page 11 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

Date display

AIP supports a country-specific date format in dynamic dialogs. This can be configured in the "control

panel",  "regional  settings",  "short  date"  dialog  of  the  terminal/PC.  The  following  has  to  be  taken  into

account in this context:

  Years are always four characters long.

  Months and days are always 2 characters long.



“-“, “/“ and “.“ are allowed separators

  Blanks must not be included in the “short date” format, i.e. the <BLANK> separator is not allowed.

  The date separator “.” (dot) is only allowed in connection with the DD.MM.YYYY format.

  The date format, which might possibly be configured in dynamic dialogs, is ignored.

Examples

  English(USA)
  Danish
  Customer-specific 1
  Customer-specific 2
  Customer-specific 3

Please note

MM/DD/YYYY
MM-DD-YYYY
YYYY-MM-DD
YYYY/MM/DD
MM/YYYY/DD

If the date format does not correspond to conventions a note appears when the program is started and

the date format is set to MM/DD/YYYY.

The year is displayed only by two characters in the status bar.

2.2  General description of the posting process with AIP

In general, posting dialogs are divided into several visual views at AIP. These views (partial dialogs)

cover  the  entire  screen  and  only  one  dialog  is  visible  at  a  time.  In  a  “workflow  concept”  the  user  is

navigated through the posting dialog step by step. This process is described by way of the following

example (interrupt operation). The other dialogs can be operated in the same way.

The “interrupt operation” function is executed. This task is started by clicking the “interrupt operation”

function from the second toolbar:

AIP-BMD_81.docx

Page 12 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

The  “interrupt  operation”  dialog  opens  and  the  first  view  is  displayed.  The  function  that  is  currently

being executed (in this case: interrupt operation) is shown in the header.

The  first  view  “enter  quantities”  provides  the  user  with  the  possibility  to  enter  the  produced  yield  or

scrap  quantities.  The  virtual  keyboard  is  shown  or  hidden  automatically,  subject  to  the  active  input

field.

Quantities  can  be  entered  using  the  virtual  keyboard  or  real  keyboard.  The  user  can  go  to  the  next

field using the tabulator key (which can also be found on the virtual keyboard). Once all values have

been entered in the first view, the next view can be opened by clicking the “next” button.

The  “cancel”  button  is  displayed  in  all  partial  dialogs  and  allows  for  the  entire  posting  dialog  to  be

cancelled/closed at any time.

AIP-BMD_81.docx

Page 13 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

The  next  view  can  be  opened  either  by  clicking  the  “next”  button  or  by  clicking  another  tab  (in  our

example: “select status” or “confirm”). Please note in this context, that no view can be skipped when

the views are navigated bottom up (view 1  view 2  view 3). This means: if you are in the first view

(enter  quantities)  and  you  click  the  third  view  (confirm),  the  second  view  (select  status)  will  be

displayed first.

Vice  versa,  when  navigating  top  down  (e.g.  from  the  “confirm”  view  to  the  “enter  quantities”  view),

every  view may  directly  be opened  by clicking at it.  In this case, views  are actually skipped. But the

“back” button also allows for the views to be opened one after the other (top down).

As long as the dialog has not been confirmed, entered data may be changed at any time by scrolling

back and forth.

The workplace status that is to be set, once the operation has been interrupted, is determined in the

second view “select status”. This status may be chosen from the displayed status list. This list can be

restricted  using  the  “filter”  field.  Once  the  required  values  have  been  entered,  the  next  view  can  be

opened by clicking “next” (in our example it is the last view).

AIP-BMD_81.docx

Page 14 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

The partial dialog “confirm” shows a summary of all values entered so far in the dialog. Provided that

the  user  agrees  with  the  entered  data,  the  “interrupt  operation”  dialog  can  be  confirmed,  once  the

badge number has been entered. Then the dialog including the data is sent to the server and posted.

If  an  input  field  of  the  dialog  is  not  filled  out  properly  (e.g.  a  mandatory  field  is  empty)  the  field  is

highlighted in red in the corresponding view and focused to enable the user to directly correct the field

content.

If a workflow dialog is opened it may directly be exited by clicking the ESC button. This is also

the case, if the virtual keyboard is opened. Thus, the ESC button cannot be used to close the

virtual keyboard.

AIP-BMD_81.docx

Page 15 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

3  Basic AIP Display



In  general,  AIP  has  been  designed  for  entries  to  be  made  via  touch  screen.  The  corresponding

functions  can  be  started,  selected  or  executed  by  touching  the  buttons  within  the  touch  screen  or

using the displayed virtual keyboard. Selection lists are provided in many cases, as an alternative to

manual entries. Required entries can easily be selected from these selection lists.

Barcodes can be imported/entered in the current dialog using barcode readers, handheld scanners, or

swipe  card  readers.  Subject  to  the  barcode  prefix,  certain  data  (e.g.  operation  data)  can  directly  be

assigned to the corresponding input field, without having to focus this input field explicitly.

It goes without saying that mouse and keyboard may also be used.

To  ensure  proper  processing  and  posting,  terminals  with  "MDE"  operation  mode  must  not  be

switched off during times without shift.

3.1  Basic displays – header and footer

Header

The AIP logo  is displayed  top  left of the screen,  which may be exchanged by a customer logo after

corresponding configuration.

Possible messages (e.g. if a dialog is opened for more than five minutes) are displayed to the right of

it.

A  separate  window  opens  to  display  error  messages  that  occur  during  data  collection  (e.g.  validity

checks).

AIP-BMD_81.docx

Page 16 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

Basic displays

A  maximum  of  16  workplaces  or  machines  can  be  assigned  to  the  AIP  terminal.  The  individual

workplaces  can  be  found  within  the  list  area  in  the  order  in  which  they  have  been  assigned  to  the

terminal in MOC.

As regards the basic display of the AIP terminal, the user can choose between a tabular view, field-

related  view  and  an  icon  view.  This  can  be  configured  within  the  terminal  configuration  at  the  client.

The individual basic views are described in the sections that follow.

Footer

The MPDV logo can be found at the bottom left of the screen. Double clicking the logo opens the info

dialog  where  further  administration  functions  can  be  started.  This  dialog  closes  automatically  after

approx. 5 seconds.

Further information is displayed in the center : the current terminal status, AIP version number, date of

the build, IP address of the server as well as the terminal number.

The current date and time are displayed to the right.

AIP status

Network connection has been established
The terminal is ONLINE. Server communication is
enabled. All saved data records have been transferred.

AIP-BMD_81.docx

Page 17 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

Commands are being transferred to the server

No network connection or no connection to the server.
The terminal is OFFLINE. Server communication is
interrupted. Online functions, such as the display of
information are disabled. But certain postings can be
recorded anyway. These postings are transferred to the
server, once data connection has been established.

Data are being received.
The terminal reads files from the server or writes data to
the server.

The terminal is sending stored data records to the server.

DEMO mode
The terminal is in the DEMO mode, i.e. server
communication is disabled.

3.2  Basic display “tabular view“

1st list
Workplaces
assigned to the
terminal

2nd list
List of
registered
operations

3rd list
(optional)
e.g. list of
registered staff

The tabular basic display consists of two or three tables, subject to the configurations made. While the

first  two  tables  are  always  displayed,  it  is  up  to  the  user  whether  or  not  the  third  table  is  shown

(optional display).

AIP-BMD_81.docx

Page 18 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

“Machines/workplaces" table

The upper table shows the workplaces assigned to the terminal. The following columns are displayed.

Machine/workplace

The machine or workplace number as well as the designation are displayed.

Status

The status is displayed in color and as status text. Coloring is as follows:

- green:

- yellow:

- red:

Production

Assigned status

Not assigned

Status since

Point in time since the status is available.

For ADE workplaces1 the point in time refers to the last manual status change, for MDE workplaces it

refers to the time when the last status change was identified (for machine connections), to the point in

time when the status was changed manually the last time or to the time of the last shift change.

Please note

It is indicated here if the “block production status” function is enabled for the machine/workplace.

Below the first list there is a row including the function buttons mainly relating to machines/workplaces.

These functions are described in more detail in the sections that follow.

Please note

By way of “customizing” services it is possible to adapt the layout of display lists, displayed data

fields,  sort  sequences,  etc.  according  to  the  customer’s  requirements.  For  technical  reasons,

however,  the  sort  sequence  of  display  lists  may  not  be  changed  in  the  basic  display  of

terminals. The software does not allow it.

Provided  that  the  "compensate  manual  quantities"  option  (e.g.  set  off  scrap  against  yield)  is

enabled and the machine list also shows shift-related quantities (no default setting), they will not

be updated immediately, once they have been entered but only once lists have been reloaded.

1  We talk of an MDE  workplace if this workplace is assigned to a terminal, which runs in the “MDE” operation

mode. In any other case, it is an ADE workplace.

AIP-BMD_81.docx

Page 19 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

"Operations at workplace" table

The  second  table  shows  the  operations  that  are  currently  logged  on  to  the  selected  workplace.  The

following columns are displayed:

Article

Article defined for the operation

Order and operation

Order number and operation number of the registered operation. Together they build the  MES order

number.

Target quantity

Target quantity that is defined for the operation.

Yield

Yield  which  has  already  been  produced  for  this  operation.  The  counters  of  possible  machine

connections are considered as well.

Scrap

Scrap quantity which has already been produced for this operation. The counters of possible machine

connections are taken into account as well.

N

It  is  indicated  here  if  a  note,  which  should  be  visible  at  the  terminal,  has  been  recorded  for  this

operation in the graphic planning board at the client.  The note(s) is/are displayed by clicking the OP

info button (

).

T

If a long text is defined for this operation it is indicated here. The long  text is displayed using the OP

info dialog (button

).

Below the second list there is a line that mainly includes function buttons relating to operations.

"3rd list" table

The third list is optional and may be configured respectively. Which information is displayed in this list

depends, among other things, on the workplace configuration.

The following lists can be displayed:

AIP-BMD_81.docx

Page 20 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

  Staff logged on to the currently selected workplace (BDE)

  Resources logged on to the currently selected workplace (WRM)

  Materials/input batches logged on to the currently selected workplace (MPL/TRT)

  List of output batches produced in the currently selected operation (MPL/TRT)

The buttons below the third list (to the left) allow for switching between these lists.

Please note

The  registered  staff  displayed  in  the  third  list  correspond  to  the  list  of  the  dialog  “F5  registered

persons…”. Selecting a person in the third list does  not affect selection of the operation in the list of

OPs running at the workplace and, as a result, it neither affects pre-assignment of the operation in the

corresponding posting dialogs.

Toolbar in the basic display

A toolbar, which may be configured by customizing, is assigned to each list in the basic display. This

makes the purpose of the function clear to the user. The “partial upload/confirmation” function can be

found, for example, below the list of registered operations.

In fact, the toolbar may include several “tabs”, which can be made visible by scrolling to the right/left at

the right/left end of the toolbar. A posting dialog (e.g. change partitioning) can be opened by clicking

the corresponding button.

Please note

The  displayed  buttons  depend  on  the  context  defined  by  the  respectively  selected  workplace.  Thus,

the displayed buttons may vary when selecting another workplace/machine.

3.3

"Machine overview" basic display

If  the  “change  view”  button  is  clicked  in  the  basic  display,  the  view  changes  to  the  following

presentation:

AIP-BMD_81.docx

Page 21 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

Toolbar of assigned machines

Machine information

Order information

This  presentation  gives  detailed  information  on  a  single  machine,  whereas  the  above  toolbar  still

provides an overview of all assigned machines and workplaces.

The presentation altogether has three areas:

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

AIP-BMD_81.docx

Page 22 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

Workplace/machine information

This  display  area  shows  information  relating  to  workplaces/machines  as  well  as  to  shifts  about  the

currently selected workplace.

Order information

This display area shows information on the registered order/OP. Provided that several orders/OPs are

logged on, it can be switched between them using arrow keys that are then shown additionally.

Notes on selected fields of the machine overview

Unit for yield and scrap

Provided  that  no  operation  is  logged  on,  the  primary  quantity  unit  from  the  workplace/machine

configuration is displayed as unit for yield and scrap. If an operation is logged on the primary quantity

unit of the operation is displayed.

Partitioning

The displayed partitioning is calculated as follows:

TLGM
DIVM
TLGAGi
The  resulting  partitioning  is  displayed  without  decimal  places,  provided  it  is  an  integer  value.

Partitioning of the machine (TLG in mnr.lst)
Pulse factor of the machine (IMPFAKT in mnr.lst)
Partitioning of the individual order (TLG in anr.lst)

Otherwise, 3 decimal places are shown.

In case partitioning or pulse factor of a machine or an order is 0, calculation is based on the value 1.

Having logged off all OPs, the machine continues working with the partitioning of the machine.

Target cycle

The largest target cycle of all operations running  at the machine is  always  displayed in the machine

overview at the terminal. If this OP is logged off the largest target cycle of the remaining OPs will be

displayed.

In  case  no  OP  is  logged  on,  the  target  cycle  from  the  machine  list  is  displayed.  Thus,  even  after  a

restart, the terminal may get the target cycle that applied at last.

The largest target cycle is also transferred to MDE for monitoring.

AIP-BMD_81.docx

Page 23 of 93

01.09.20

...2211OPOPOPOPMMDIVTLGDIVTLGDIVTLGngpartitioniDisplayed

Entry/Information Functions for Shop Floor/Machine Data Collection

Comment 1, comment 2

These two fields show the  user fields 53 and 54 (alphanumeric with 20 characters) at the operation.

To  be  able  to  edit  these  fields,  a  corresponding  user  field  key  containing  these  two  fields  must  be

defined for the operation.

Target since logon

The  production  quantity  to  be  expected  since  the  OP  has  been  logged  on  (depending  on  the  cycle

time,  partitioning  and  the  time  in  which  the  production  lock  of  the machine  has  not  been  active).  No

value can be calculated, in case the terminal program has been restarted since the OP was logged on.

Calculation:

TargetSinceLogon = NetRunningTime[sec] * Partitioning/TargetCycle[sec/stroke]

NetRunningTime:  Time  since  logon,  in  which  the  production  lock  has  not  been  set.  This  calculation

does not take into account any breaks that might be defined in the shift model or status times posted

on RPA 12 (resource performance account).

Deviation [%]

Deviation  (in  percent)  between  the  expected  target  quantity  since  logon  and  the  quantity  which  has

actually been produced “since logon”.

Calculation: Deviation[%] = 100% * (YieldSinceLogon - TargetSinceLogon) / TargetSinceLogon

Completion

The  bar  represents  the  proportion  of  “yield”,  which  has  been  produced  until  now,  compared  to  the

“target quantity”.

Machine icon:

Provided  that  the  WRM-WTK  license  has  been  purchased,  the  machine  icon  may  be  replaced  by  a

picture  showing  a  yellow  or  red  oilcan,  depending  on  the  maintenance  activity  that  is  required:

3.4

“Machines as icons” basic display

This view can be configured as the default display within the terminal configuration at the client. It has

the  advantage  that  the  user  can  tell  from  a  distance  whether  or  not  all  machines  are  in  the

“Production” status.

AIP-BMD_81.docx

Page 24 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

All MDE machines have their own buttons colored according to the corresponding status:

- green:

- yellow:

- red:

Production

Assigned status

Not assigned

The button includes details on the workplace/machine number, the registered operation, the yield and

scrap quantities as well as the status (text) of the workplace/machine.

If a button is touched, the “machine overview” basic display is shown for this workplace. From there,

postings for the selected workplace can be performed using the standard buttons.

By  clicking  the  “symbol”  button  (if  configured)  the  view  changes  from  the  “machine  overview”  to  the

“icon presentation of machines”.

AIP-BMD_81.docx

Page 25 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

4  BDE and MDE Functions

This document describes the different AIP functions used for the Shop Floor Data and Machine Data

Collection (BDE and MDE).

4.1  Logging on an operation

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

With manual entry  or bar code scan, the operation is  not  automatically searched and

positioned in the sequencing list.

AIP-BMD_81.docx

Page 26 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

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

AIP-BMD_81.docx

Page 27 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

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

4.2  Logging an operation off

You  use  the  button  Log  off  operation  on  operation  level  to  log  off  an  operation.  The  posting  of  run

times and quantities is then finished for the OP. Once logged off, you cannot log on the OP again.

Posting process

Select the workplace and the operation that must be logged off in the main view. When the dialog is

called, these fields are then preassigned and cannot be changed.

AIP-BMD_81.docx

Page 28 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

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

AIP-BMD_81.docx

Page 29 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

4.3

Interrupting an operation

Click the button Interrupt operation to call this function. You use this function to stop collecting times

and quantities for an order. The reasons for the interruption can be a quantity upload, a shift change or

an interruption of the production for technical reasons.

The process of interrupting an operation and the layout of the input dialog are identical to the ones of

the operation logoff. The difference is that you can log on an interrupted operation at any time.

4.4  Uploading a part quantity for an operation

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

AIP-BMD_81.docx

Page 30 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

4.5  Log person on

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

4.6  Log person off

Persons  are  logged  on  to  or  off from  a  workplace.  The  logging  of  persons  is  therefore made  on  the

workplace level. You can only log off a person that has been logged on to the workplace.

AIP-BMD_81.docx

Page 31 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

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

4.7  Log off everyone

You can use this function to log off all persons in one posting that are logged on to a machine.

You assign the authorization to use this function in the HR master data. Activate the following option in

tab Shop floor data > BDE authorizations > Log all staff off.

Posting process

The posting process is in general identical to the dialog Log person off. The only difference is that you

cannot record quantities when using the dialog Log off everyone.

4.8  Change workplace/machine status

You can use this function to assign a new status to a workplace/machine. You might need this function

during setup of the workplace or in case of a malfunction, for example.

AIP-BMD_81.docx

Page 32 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

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

AIP-BMD_81.docx

Page 33 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

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

4.9  Lock/unlock production status

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

AIP-BMD_81.docx

Page 34 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

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

4.10  Change target cycle

The target cycle is the default value that is checked in case of a machine monitoring based on cycle

time. You can use this dialog to change the target cycle for the machine.

Posting process

Select the workplace where you want to change the target cycle. Click the button Change target cycle.

New target cycle

Specify the new target cycle in seconds/cycle

AIP-BMD_81.docx

Page 35 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

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

4.11  Change partitioning

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

4.12  Change target quantity

Use this dialog to change the target quantity based on operations (primary quantity unit).

Posting process

Select the operation where you want to change the target quantity and click the button Change target

quantity.

New target quantity

Enter the new target quantity that you want to store for the operation.

AIP-BMD_81.docx

Page 36 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

Staff badge number

You  can  optionally  enter  the  staff  badge  number.  If  configured  in  the  HR  master  data,  a

validation  check  is  performed  for  this  number  (tab:  Shop  floor  data  >  BDE  authorizations  >

Change target quantity).

Confirmation of the dialog

Once  the  dialog  has  been  posted  successfully,  the  new  target  quantity  is  stored  for  the

operation.

4.13

Information on operations (OP info)

General information

Use the button

 on operation level to call the OP info dialog2. Select the required operation. A

dialog  opens.  The  dialog  includes  several  pages  that  are  organized  in  tabs.  The  information  is  only

requested from the database when you call the relevant page.

The dialog includes the following tabs:

2 This function is also available at other places, e.g. in the Log operation on dialog.

AIP-BMD_81.docx

Page 37 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

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

4.13.1  SF comments

The tag SF comments displays the comments recorded during the Shop Floor Data Collection (BDE)

or you can record new comments.

AIP-BMD_81.docx

Page 38 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

The  comments  recorded  are  displayed  in  the  Order  information  dialog  on  the  client  or  can  be

forwarded via escalation management, e.g. by e-mail.

If an SF comment is recorded for an operation that has been merged on the MOC, then the SF

comment  is  only  relevant  for  this  merged  operation.  The  SF  comment  is  not  transferred  to  the

single operations.

You cannot record SF comments for the single operations because the single operations are not

displayed on the AIP.

With  split  operations,  the  SF  comment  is  only  stored  for  the  split  operation  where  the  SF

comment has been recorded. The SF comment is not transferred to the split master.

4.13.2  Documents

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

AIP-BMD_81.docx

Page 39 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

[Terminal->USR 0]

HTTPBrowser=standard

This  setting  is  not  recommended  for  an  AIP  with  touch  screen,  because  the  operation  of  a  browser

can lead to problems.

4.13.3  Tools, Resources

The tab Tools, Resources displays the production resources and tools required for an operation.

Note: Documents are displayed separately in tab Documents.

4.13.4  Components

The tab Components displays the material components required for the operation.

4.13.5  Progress

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

4.13.6  Resource performance accounts

In  tab  Resource  performance  accounts,  the  following  information  is  displayed  for  the  resource

performance accounts (RPA) 1 to 11 of the current operation:

  RPA abbrev.

AIP-BMD_81.docx

Page 40 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

  RPA designation

  Posted duration in hours:minutes

  Total duration = total of all times of RPA 1...11

The durations are displayed in a graphic (to the right).

4.14  Machine information (machine info)

The machine information dialog provides the views and functions listed below.

4.14.1  Description

The tab Description shows information on the machine/workplace

Workplace/machine

Number of the workplace/machine according to configuration

AIP-BMD_81.docx

Page 41 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

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

AIP-BMD_81.docx

Page 42 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

4.14.2  Registered persons

This overview shows the staff currently logged on to the workplace.

Use the following buttons to perform postings for staff:

  Log on person,

  Log off person or

  Log off everyone (on the next button page)

Click Close information to get back to the main view.

AIP-BMD_81.docx

Page 43 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

4.14.3  Status log

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

AIP-BMD_81.docx

Page 44 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

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

AIP-BMD_81.docx

Page 45 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

4.15  Merged operations

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

4.15.1  Log merged operation on

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

AIP-BMD_81.docx

Page 46 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

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

4.15.2

Interrupt/log merged operation off

You  interrupt  or  log  off  a merged  operation  like  single  operations.  Select  an  operation  named  SAM-

<badge number> from the list of running operations.

AIP-BMD_81.docx

Page 47 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

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

AIP-BMD_81.docx

Page 48 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

5  Specific Features of Machine Data Collection

The  functions  described  in  the  paragraphs  that  follow  are  only  active  at  workplaces  meeting  the

following requirements:

  The machine/workplace has been configured as “individual workplace”

  The  machine/workplace  is  assigned  to  a  terminal,  which  has  been  configured  in  the  “MDE”

operation mode

These functions are not available at group workplaces.

To  ensure  proper  processing  and  posting,  terminals  with  "MDE"  operation  mode  must  not  be

switched off during times without shift.

5.1  Shift automatic

A shift model has to be assigned to each workplace/machine. Due to the information given by this shift

calendar,  the  terminal  is  able  to  determine  automatically  the  beginning  and  end  of  shifts  for  its

assigned machines.

By the shift automatic option, functions are activated that ease data collection as well as operability:





the OP that is logged on is automatically interrupted at the end of the shift.

this OP is logged on at the beginning of the next shift

  Staff can log on in advance to a terminal within a certain period of time prior to the beginning of

the shift. When the shift starts the next time, the terminal logs them on to the OP. This period of

time is defined within the terminal configuration (option: waiting period for advance logon of staff).

Since data collection at terminals must not be interrupted and it is impossible for all terminals to send

all  postings  simultaneously  at  the  end  of  the  shift,  log  records  are  buffered.  The  buffer  is  now

transferred to the server in short intervals. This process depends on the number of machines defined

for a terminal. Postings made during that time are buffered as well.

The following diagram shows a time flow of logons and logoffs during a change of shifts.

AIP-BMD_81.docx

Page 49 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

Description of the process

1)

An OP was logged on during shift 1 and its production is also to be continued in the following

shift 2.

2)

Person1 logs on to the workplace.

3)

Person  2  arrives  shortly  before  the  shift  ends  and  logs  on  to  the  workplace.  Since  the  logon

takes place  within the 30  minutes of advance logon  time, the terminal recognizes an advance

logon.

4)

The  registered  OP  is  automatically  interrupted  when  the  shifts  end  and  the  staff  logged  on  is

logged off.

5)

  The  OP,  which  was  interrupted  beforehand,  is  logged  on  again  when  the  shift  starts.

Moreover, the persons who logged on in advance are logged on as well.

5.2  Downtime monitoring

The  monitoring  type  is  configured  in  the  workplace/machine  configuration  (MDE  configuration  tab  >

Monitoring Type. The following values may be set:

Cyclic monitoring

Cycle time monitoring

Monitoring via operating signal

Operating signal monitoring

No monitoring

No automatic monitoring

AIP-BMD_81.docx

Page 50 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

If, after a production phase (cycle time monitoring), the specified target cycle time is exceeded for the

logged on order/OP, the terminal detects a downtime and expects a status to be entered. In this case

the  current  terminal  status  is  “NOT  ASSIGNED”.  The  same  principle  applies  to  operation  signal

monitoring.

Monitoring of cycle time

When counter pulses arrive, the status is switched to “Production".

The  cycle  time  is  calculated  from  the  target  cycle  of  the  OP  multiplied  by  the  value  entered  in  the

workplace/machine configuration (MDE Configuration tab > Monitoring type > Cycle extension”).

A disturbance/malfunction can only be entered, if the AIP terminal requests it (no production).

As a part of customizing, it is possible to activate a back posting for this terminal version, in order to

record the point in time when the last pulse arrives for cycle time monitoring or the point in time when

the operating signal stops for operating signal monitoring.

Operating signal monitoring

By setting the operating signal, status is changed to “Production”.

A  disturbance  has  to  last  for  a  certain  time,  before  it  will  be  identified  as  such  and  reported.  This

period is defined by “…MDE Configuration > Monitoring type > Minimum disturbance time”.

A disturbance can only be entered, if the terminal requests it (no production).

AIP-BMD_81.docx

Page 51 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

As a part of customizing, it is possible to activate a back posting for this terminal version, in order to

record the point in time when the last pulse arrives for cycle time monitoring or the point in time when

the operating signal stops for operating signal monitoring.

No automatic monitoring

It is possible at all times to define a new machine status. The “Production” status must also be

manually assigned.

5.3  Lock production status (production lock)

The “lock production status” button of the “workplaces/machines” section enables the user to prevent

the terminal from switching automatically to the “production” status, when new clock pulses arrive from

the machine. Thus, switching to “production” is disabled (“production lock”).

In case a workplace/machine is unable to switch to the “production” status, the “note” column shows

this by “production status locked”.

In this case, the current status remains – despite the machine pulses received.

All  items  produced  during  the  lock  are  either  posted  as  yield,  scrap  or  not  at  all,  depending  on  the

workplace configuration.

AIP-BMD_81.docx

Page 52 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

The  production  lock  may  be  enabled  or  disabled  explicitly  by  clicking  the  “lock  production  status”

button.

If the workplace/machine status is configured accordingly (menu: master data > machines/workplaces

> status assignment), the production lock may also be set automatically i.e. along with setting a status.

Authorization checking when setting the production lock manually

It  is  possible  to  allow  the  manual  (explicit)  setting  or  removing  of  the  production  lock  only  via  a

respective authorization.

For this purpose, the dynamic dialog M_PSPERRE is to be activated (customizing). The plant ID card

(staff badge number) must be entered in this dialog.

If  the  dialog  is  active  it  will  be  opened,  when  the  worker  clicks  the  “lock  production  status”  button.

Once  the  badge  number  has  been  entered,  it  is  checked  whether  this  person  is  authorized  to

activate/remove  the  production  lock.  This  is  checked  against  the  “change  of  production  lock”

authorization in the HR master (BDE tab).

The OFFLINE performance depends on the terminal configuration (“checking required" option).

Logging of the production lock

The manual activation/deactivation of the production lock is recorded as event at the server and may

be evaluated within the machine history.

Please note in this context, that only the event of setting/removing the production lock manually will be

recorded.

.

But if the production lock is enabled or disabled implicitly by a status change, no explicit event will be

recorded and, as a result it cannot be evaluated at the client.

In  case  a  machine  is  locked  for  production  and  the  AIP  terminal  is  restarted,  this  production  lock  is

automatically disabled after the restart. The process of changing the production lock is lock is neither

recorded.

5.4  Machine lock

It  can  be  defined  for  each  status  whether  or  not  a  “machine  lock”  is  to  be  enabled  as  soon  as  this

status is assigned. This can be configured in (status assignment > tab: control > other settings > set

machine lock output).

AIP-BMD_81.docx

Page 53 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

Setting  a  machine  lock  leads  to  an  output  being  set,  which  may  trigger  a  relay,  for  example.  In  this

case, the logical output is defined within the workplace/machine configuration (tab: MDE configuration

> inputs/outputs > machine lock).

Notes on using the machine lock at DS 100 terminals

The value “1” has to be entered in the “machine lock” field of the configuration of machines/workplaces

(tab: MDE configuration > inputs/outputs), provided that the relay is to be set at the DS100 terminal.

The relay is set for all statuses assigned to the “machine lock” as well as for the “not assigned” status.

5.5  Output “target quantity reached"

An  output  may  be  set  to  trigger  a  lamp,  for  example,  via  a  relay  (to  be  provided  by  the  customer),

when the target quantity of the currently registered operation has been reached.

The  logical  output  is  defined  in  the  menu:  master  data  >  machines/workplaces  >  inputs/outputs  >

target quantity reached.

The target quantity of a machine is checked:

  once the terminal program AIP has been restarted

  after changing the target quantity using the corresponding posting dialog

  once an operation has been logged on, off or interrupted

  after posting manual quantities (partial uploads)

  after local quantity events of the MDE module (automatic quantities)

  once the order list has been reloaded

If several operations are logged on to a workplace/machine at the same time the logical output is set

as soon as the target quantity has been reached for one of the orders. The signal will be reset if this

OP is interrupted.

AIP-BMD_81.docx

Page 54 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

5.6  Scrap reasons depending on status & production lock

Two scrap reasons can be defined for a status. One scrap reason applying for the active production

lock  (see  section  Error!  Reference  source  not  found.  Lock  production  status  (production  lock))  as

well as one scrap reason applying for an inactive production lock. If a scrap reason is defined for the

status  that  is  currently  available  at  the  machine  the  counted  scrap  will  be  posted  with  this  specified

scrap reason.

Provided that a scrap reason is configured at the counting input, this one takes priority. Consequently,

a counter that is assigned to a fixed scrap reason keeps this scrap reason even if another reason is

configured for the currently available status.









5.7  Setting of outputs subject to the status and posting

scenarios

By way of an advanced configuration, digital outputs of the machine may be set if a specific machine

status  and  a  defined  posting  scenario  coincide.  Further  details  on  this  configuration  can  be  found  in

the document entitled MDE_digital_output_depending_on_scenario.pdf.

Please note the following for the local administration of the machine status at the terminal:

If status changes are posted using PDM or at another terminal the machine status is only transferred

when  reloading  the  machine  list,  provided  that  this  has  been  configured  explicitly  by  the

“FollowExternStatus“ option:

HYTNRCFG.INI

[Tnr Konfiguration 0]
FollowExternStatus=on

When  the  status  is  changed  by  reloading  the  list,  the  terminal  checks  the  configured  logical  outputs

and sets or resets them, if required.

AIP-BMD_81.docx

Page 55 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

AIP-BMD_81.docx

Page 56 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

6  Barcode Input

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

AIP-BMD_81.docx

Page 57 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

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

If the machine/workplace number is set to “numerical” in the basic parameter settings, it has to

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

AIP-BMD_81.docx

Page 58 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

7  AIP configuration of barcodes

7.1  Configuration in ctaip.ini

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

AIP-BMD_81.docx

Page 59 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

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

AIP-BMD_81.docx

Page 60 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

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

AIP-BMD_81.docx

Page 61 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

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

7.2  Configurations in hytnrcfg.ini

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

7.2.1  Notes/configurations for concurrent lengths

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

AIP-BMD_81.docx

Page 62 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

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

AIP-BMD_81.docx

Page 63 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

8  Barcode Input with Prefix

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
 00. will be deleted and data “ABC123” will be passed to standard
processing
Action barcode
 Dialog cancelled or ended with OK button or Esc button.

--------------------

16.EXTRUDER-7
16.200
17.1
17.1001
18.1
18.1001
19.1
19.1001
20.1
20.MF

--------------------
40.100
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
Suborder number -> Acronym <UAGNR>
Split no.  acronym <SPLNR>
Upload/confirmation number  Acronym <RMNR>

Machine  Acronym <MNR>
 Passed to dialog with MNR=EXTRUDER-7 or MNR=200
Machine status  Acronym <MST>
 Passed to dialog with MST=1 or MST=1001
Scrap reason  Acronym <EGG:AUS>
 Passed to dialog with EGG:AUS =1 or EGG:AUS=1001
Deviation reason  Acronym < EGG:GUT >
 Passed to dialog with EGG:GUT =1 or EGG:GUT=1001
Operator position  Acronym <BPOS>
 Passed to dialog with BPOS =1 or BPOS = MF
Wage and premium indicators  Acronym <LPKZ>

----HYDRA-WRM + HYDRA-DNC + HYDRA-PDV + HYDRA-MPL  ---
Destination  Acronym <ZLO>
 Passed to dialog with ZLO=100 or ZLO= MONTAGE
Transport unit  Acronym <TPE>
 Passed to dialog with TPE = KARTON or TPE = KISTE
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

AIP-BMD_81.docx

Page 64 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

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
 Passed to dialog with KST=EDV or KST=VERTRIEB
Absence reason  Acronym <FGR>
 Passed to dialog with FGR=1 or FGR=1001

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

AIP-BMD_81.docx

Page 65 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

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

AIP-BMD_81.docx

Page 66 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

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

AIP-BMD_81.docx

Page 67 of 93

01.09.20

Entry/Information Functions for Shop Floor/Machine Data Collection

Prefix

50.

Barcode

*50.1337*

Raw data

KNR = 1337

8.1  Configuration of customized barcode prefixes

The  barcode  prefixes  90...99  can  be  assigned  here  according
to the customer's requirements. This means, if a barcode with
the  relevant  prefix  is  used,  it  will  be  transferred  to  the  dialog
along with the assigned ID. Then the barcode has the following
structure:
<Prefix>.<Net barcode>
e.g.: "90.12345“  SAPCNR=12345

Section [barcode]
BarKenn90=SAPCNR
BarKenn91=EGR:GUT

Firmly assigned barcode prefixes:
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
53:FGR

AIP-BMD_81.docx

Page 68 of 93

01.09.20

                                          Entry/Information  Functions

for  Shop  Floor/Machine  Data

Collection

AIP-BMD_81.docx

Version: 1.3.23049

Page 69 of 93

                                          Entry/Information  Functions

for  Shop  Floor/Machine  Data

Collection

9  Local Configuration File ctaip.ini

The most important hardware and system settings are defined for each terminal in the CTAIP.INI file of

the c:\ctaip directory.

Changes  to  the  configuration  file  ctaip.ini  are  only  enabled  after  rebooting  the  terminal

software.

9.1  Basic configuration

Entry

Section [system]

Comment

Entry

Comment

Section [system]

Usr=21

Hypath=d:\hydra\

Hypath=/usr/hydra/

Distinct terminal number

HYDRA server path:

Windows NT:
->  DOS  notation,  the  drive  is  the  local  drive  of  the  server  on
which HYDRA or xMES is installed
Unix:
->Unix notation

Hostname=192.9.200.24

Internet address of the server

Offlinetimeout=600

Showcursor=on

In offline mode, the  interval after  which online access should  be
attempted the next time. The interval is specified in seconds

Show  or  hide  mouse  pointer
on: mouse pointer active
off: mouse pointer inactive

in

terminal  application:

Loadfile=
ctnet\win\ctaip.txt

Configuration file for downloading the application from the server.
The path is relative to the server directory (i.e. within “hypath”)

Watchdog=on

Demo=off

parameters=-t

TMOUT_C=xxx

TMOUT_S=xxx

TMOUT_R=xxx

ON: Watchdog is activated
OFF: Watchdog is not activated

‘on’: Offline demo mode; always off in the production environment

The –t parameter switches off the virtual keyboard

Timeout for CONNECT to the server
If not specified, default = 10 seconds  

 Increase to 20 seconds for routing

Timeout for SEND to the server
If not specified, default = 10 seconds

 Increase to 20 seconds for routing

Timeout for RECEIVE of the server
If not specified, default = 120 seconds

AIP-BMD_81.docx

Version: 1.3.23049

Page 70 of 93

                                          Entry/Information  Functions

for  Shop  Floor/Machine  Data

Collection

Entry

TMOUT_F=xxx

Section [barcode]

BarKenn90=MNR4
...
BarKenn99=ANR3

Section [comports]

Com1=0
com2=MSS
com3=BAR
Com3=LEGIC
Com4=RFLESER

Section [MSS-INIT]

ZAEHLER=|1|2|3|4|5|6|7|8|

IN=|9|10|11|12|13|14|15|

CHARGE=|5|6|

MSSZyklusBerechnung=ON
MSSZyklusReferenz=0

CalculateCycle=ON

WochenEnde_ProdCheck=ON

Comment

Timeout for FILESERVER operations to the server
If not specified, default = 10 seconds


 Increase to 20 seconds for routing

Configuration of customized barcode prefixes.

BarKenn90 > defines the prefix (here: 90); The ID from the dialog

(= acronym) is assigned.

Assignment of serial interfaces to the connected devices
MSS – machine interface
BAR, LEGIC, RFLESER – various reading devices

Assignment of physical inputs of the MSS (machine interface) to
logical counters (ZAEHLER) according to configuration:
The  first connector  (labeled  “0”  on  the  MSS)  corresponds  to  the
logical counter no. 1
Please note: MSS1 has only 8 inputs
 If  digital  inputs  are  also
to  be  used  with  MSS1,  configuration  should  be  changed  as
follows:

ZAEHLER=|1|2|3|4|
IN=|5|6|7|8|

Assignment  of  physical  MSS  inputs  to  logical  inputs  as  per
configuration:
The ninth connector (labeled “8” on the MSS) corresponds to the
logical input no. 1

For batch recording:
Inputs for automatic batch changes
In  this  case,  the  connectors  5  and  6  are  the  inputs  for  the
automatic batch change.

Activates  reading  out  of  cycle  time  values  from  the  machine

interface (MSS).

Reference  for  cycle  calculation  (smallest  time  unit  of  the  MSS).
The  default  value  is  0,  if  the  parameter  is  not  specified.
0 corresponds to 100 ms.
2 corresponds to 20 ms.

The terminal itself calculates the actual cycle.
If  the  connected  control  does  not  provide  a  determined  actual
cycle, then a calculated actual cycle can be displayed:
This calculated value is also available for DS100 terminals.
Please note: The calculation cannot provide exact values.

This function prevents the weekend automatic from affecting the
“production“  status  and  the  workplace  from  being  set  to  status
999.
ON is set by default
In
switches to status 999.

case  WochenEnde_ProdCheck=OFF,

the  automatism

AIP-BMD_81.docx

Version: 1.3.23049

Page 71 of 93

                                          Entry/Information  Functions

for  Shop  Floor/Machine  Data

Collection

Entry

Comment

sFrom999ToNotAttributed=OFF  Only  affects  HYDRA-MDE  machines  with  operation  mode  =  "no

Section [ext. software]

Button=Editor
WindowName=Editor
SearchParts=On

monitoring".
If the weekend automatic function is enabled this option prevents
the machine from switching to the "not assigned" status when the
weekend automatic ends.
Reasons: The "not assigned" status may not be set manually for
machines that are configured with the “no monitoring” option. The
"not  assigned"  status  is  normally  only  set  for  machines  with
operation mode = "cyclic monitoring" or "monitoring by operating
signal".

Configuration  of  the  button  in  the  top  line:  A  previously  started
program can be called to the foreground at the push of a button.

Button: button caption
WindowName: Name of the program (e.g. from the taskbar).
SearchParts=On:  parts  of  WindowName  are
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

Section [PDV]

Modus=PDV
Modus=PDV,BDE

Terminals=121,122,123

PDVTerminalDir=c:\hsrv\spool
\
PDVIOPDir=c:\IOPSim\

For debug purposes only:

This option starts the program (ProgFileName) when starting the
terminal program.

Operation as interface IOPDOS terminal (standard)
Operation as shop floor terminal with PDV

CTDOS terminals “connected” by LAN.
Only required with Mode=PDV
Directory for communication with CTDOS terminals
Directory for communication with the IOP

InfoFenster=100

Number of lines of the “current” window (presentation of last PDV
actions)

SlowDown=600
;Supported barcodes
FieldWNRBarcodeOnly=Y

FieldNestBarcodeOnly=Y

FieldNummBarcodeOnly=Y

FieldKNRBarcodeOnly=Y

BarcodeWNR=

Slow down, to make events “visible”

If  this  entry  is  set  the  tool  number  may  only  be  entered  using  a
scanner.
If this entry is set the cavity number may only be entered using a
scanner.
If  this  entry  is  set  the  number  may  only  be  entered  using  a
scanner.
If this entry is set the badge number may only be entered using a
scanner.
This field specifies which acronym is entered into the tool number
field by the scanner.

AIP-BMD_81.docx

Version: 1.3.23049

Page 72 of 93

                                          Entry/Information  Functions

for  Shop  Floor/Machine  Data

Collection

Entry

Comment

BarcodeNest=

BarcodeNumm=

This  field  specifies  which  acronym  is  entered  into  the  cavity
number field by the scanner.
This  field  specifies  which  acronym  is  entered  into  the  number
field by the scanner.

AIP-BMD_81.docx

Version: 1.3.23049

Page 73 of 93

                                          Entry/Information  Functions

for  Shop  Floor/Machine  Data

Collection

10  Central Configuration File hytnrcfg.ini

This file includes different configurations for all or single terminals at a central place.

Each section is available in a generally accepted version

[section 0].

However,  entries  included  in  this  section  can  be  overwritten  by  entries  in  a  terminal-specific  section

[section <TNR-USER>]

 <TNR-USER>  =  HydraUser  =  Terminal  number  +  2000  e.g.  2010,2101,..)

for  exactly  one

terminal/HYDRA User

The hytnrcfg.ini file is loaded from the server every time the terminal is started.

Section / Entry

Comment



[Tnr configuration 0]

FollowExternStatus=on

[Terminal->Installation 0]

InstallFonts=on

OnlyInstallFontsAfterDownload=false

InstallTvicport=on

[Terminal->USR 0]

Transfer  of  machine  statuses  when
reloading machine list
Useful  if  status  change  is  set  by  PDM  or
another terminal

If  this  is  set  to  "off"  fonts  will  not  be
installed
restart.
ON=DEFAULT

during

the

“InstallFonts=on”:
If  true  then  fonts  will  only  be  installed
directly after a download. If false then fonts
will  be  installed  every  time  the  terminal  is
restarted.
(false = DEFAULT)

If “off” the LPT driver "tvicport.sys" will not
be installed. It is required for HYDRA-ZKS.
ON = DEFAULT

AIP-BMD_81.docx

Version: 1.3.23049

Page 74 of 93

                                          Entry/Information  Functions

for  Shop  Floor/Machine  Data

Collection

AttachedApplication=First

HTTPBrowser=standard

SupressErrorMessage=70012

[SignatureRecording->User 0]

ManualBadgeInput=true

This  configuration  checks  whether  or  not
an  application  is  connected  in  Windows
that  matches  the  file  extension  of  the
document to be displayed from the OP info
dialog. If there is such an application, it will
be used for displaying the document.
If
is  no  connection,  viewers
configured  in  ctaip.ini  (  [ext.  software])
and internal  viewers  will be used. In case,
an  extension  is  completely  unknown  it  is
attempted to display it as text
Different settings may be configured:

there

First    search  for  connected  application
first

this

AfterUserViewer    If  a  UserViewer  is
the
one
configured
connected  application  (also  applies  for
ExcelViewer,
and
PowerpointViewer)

WordViewer

overrides

Last    Only  if  no  ctaip.ini  assignment  is
found  for  the  file  extension,  then  the
connected assignment will be searched for
(default).

Off    Connected  application  is  never
searched.

type  "http",

Viewing of documents (via OP info):
If documents are configured with a path of
the
file  will  not  be
the
downloaded to the terminal, but the link will
only be transferred to a browser.
The  default  browser  for  the  terminal  is
htmview3.exe, as this one can be operated
by touchscreen.
If  this  entry  is  set,  the  default  browser
configured in Windows will be used.

Suppress  message
planned"

"material

is  not

This configuration specifies whether or not
the  field  "user"  can  be  edited  in  the
terminal (by default: no editing)
true    activates  keyboard  input  for  the
"user" field in the terminal

AIP-BMD_81.docx

Version: 1.3.23049

Page 75 of 93

                                          Entry/Information  Functions

for  Shop  Floor/Machine  Data

Collection

Transparency=255

ShowPosition=TR

USE_SERVICE_ACCOUNT=1

is  0  %

The  signature  dialog  can  also  be
transparent.
255    Signature  dialog
transparent (not transparent)
1  Signature dialog is 99% transparent
(maximum transparency)
(Default = 155)
Available  as  of  CTAIP  (V#  2.0.2.25)  /
CTWIN (V# 7.2.5.99)

Top – Left
Top – Middle
Top – Right
Middle – Left

The position of the signature dialog can be
adjusted as follows:
TL
TM
TR
ML
MM  Middle – Middle (Default)
MR
BL
BM
BR
Available as of CTAIP (V# 2.0.2.25)

Middle – Right
Bottom – Left
Bottom – Middle
Bottom – Right

do

not

SSO:

(default)

0
use
ServiceAccount  (requires  the  terminal  to
be started with the "user" domain (SSO).
Please  note:  ServiceAccount=1  can  only
be  used  if  all  users  are  in  the  "root"
domain.  SubDomain  users  are  not
supported.

SIGNATURE_1_USER_TYPE=REPORTING_USER_READONLY  REPORTING_USER_READONLY

The  tab  identifying  users  via  the Windows
user is activated and assigned to "user" by
default. The "user" field is read-only.
This requires, however, that in the HYDRA
HR  master  the  "SSO"  option  is  set  for  all
users  logging  in.  Otherwise,  successful
authentication is impossible.

REPORTING_USER_CHANGEABLE

The  tab  identifying  users  via  the Windows
user is activated and assigned to "user" by
default. The "user" field can be modified.
This requires, however, that in the HYDRA
HR  master  the  "SSO"  option  is  set  for  all
users  logging  in.  Otherwise,  successful
authentication is impossible.

AIP-BMD_81.docx

Version: 1.3.23049

Page 76 of 93

                                          Entry/Information  Functions

for  Shop  Floor/Machine  Data

Collection

SIGNATURE_1_LOGON_TYPE=HYDRA

“” / Not set / “EMPTY”

There
procedure.

is  also  an  alternative

login

HYDRA

The tab identifying users via the Windows
user is blocked. The HYDRA user must be
used for identification purposes.
This requires, however, that in the HYDRA
HR master all users logging in are created
and that the "SSO" option is not set.
Otherwise, successful authentication is
impossible.

ACTIVEDIRECTORY

The tab identifying users via the HYDRA
user is blocked. The Windows user must
be used for identification purposes. This
requires, however, that in the HYDRA HR
master the "SSO" option is set for all users
logging in. Otherwise, successful
authentication is impossible.

MIXED_BUT_UNIQUE
Either
login
the  HYDRA  or  Windows
procedure  is  available,  subject  to  whether
or  not  the  "SSO"  option  is  set  for  the
registered user in the HYDRA HR master.

"SSO“ enabled  Windows only
"SSO“ disabled  HYDRA only

Identical
SIGNATURE_1_LOGON_TYPE
above)

to
(see

Used for signatures with the terminal in the
area of quality data collection.

SIGNATURE_2_LOGON_TYPE=HYDRA

ExtendedSignatureRecording=true

10.1  Layout configuration

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

SUPPRESS-MAXIMUM-NUMBER-OF-
MACHINES-WARNING=ON

In case of an error in reading the clock (e.g. after coming
out  of  standby  mode),  this  configuration  makes  sure  that
the  time  is  accepted  without  having  to  confirm  a  dialog.
Afterwards the terminal time will be synchronized with the
server time using a PDM command.

As of ctaip V# 2.0.2.23
Prevents  the  warning  after  restarting  the  terminal  if  more
than  32  machines  are  assigned
terminal
(static/dynamic). (Default = OFF)

the

to

AIP-BMD_81.docx

Version: 1.3.23049

Page 77 of 93

                                          Entry/Information  Functions

for  Shop  Floor/Machine  Data

Collection

Entry

NetRuntimeMode=2

Comment

As of ctaip V# 2.0.2.50:
Alternative calculation of the target quantity since logon:
The net run time is not calculated from the times when the
production lock is enabled (PSperre=green) but only from
the shift times less the shift breaks.
Consequently,  it  can  also  be  displayed,  even  if  the
terminal program has been restarted.

Section
[ QRD-PRINTER->TICKET 0 ]
[ QRD-PRINTER->TICKET 2xxx ]

;( general configuration )

;( 2XXX configuration for a specific terminal )

COMPLETE-ABSENCE-OF-LOCAL-MNR-
DATA-FOR-EVENT=< Events >

COMPLETE-ABSENCE-OF-LOCAL-ANR-
DATA-FOR-EVENT=< Events >

Reloads the machine row for the configured <Events>, if
it is not available locally
=>  This  configuration  might  be  required/necessary  for  a
group workplace without machine assignment.

Reloads the order row for the configured <Events>, if it
is not available locally
  This  option  has  been  implemented  to  access  order
data  within  the  master  data,  e.g.  when  logging  an  order
on.

COMPLETE-..-EVENT=< Events >

Explanation on the configuration of <Events>

COMPLETE-..-EVENT=#ALL#

COMPLETE-..-EVENT=A_AN|A_P_AN

  Using  <#ALL#>  the  row  (ANR/MNR)  that  is  not
available is reloaded for any event.
  <A_AN|A_P_AN> restricts reloading of information to
the  specified  events.  The  ID  <DLGFAM>  is  preferred  to
the ID <DLG> in order to identify the <Event>.

AIP-BMD_81.docx

Version: 1.3.23049

Page 78 of 93

                                          Entry/Information  Functions

for  Shop  Floor/Machine  Data

Collection

11  Local Configuration File keyboard.ini

Settings  for  the  virtual  keyboard  are  configured  for  specific  AIP  terminals  in  the  keyboard.ini  file  of  the

directory c:\ctaip.

Changes to the configuration file will not take effect until after the terminal software has

been restarted.

Logic enabling the virtual keyboard:

The AIP terminal shows the keyboard for fields where data can be entered. The keyboard is positioned as

described below:

Logic for positioning of the virtual keyboard:

As soon as the activation command has been sent, the keyboard receives the coordinates for the center

as well as information on the height and width of the control element to which it is added.

At first, an attempt is made to attach the keyboard directly below the control element. If the  lower margin

is  not  sufficient,  an  attempt  is  made  to  place  the  keyboard  directly  above  the  control  field.  If  the  space

above the control element is not sufficient for the keyboard, an attempt is made to position the keyboard

at the bottom margin of the screen. In case the space above the control panel is three times as large as

the one below the control element, the keyboard will be positioned at the top margin of the screen.

These are the priorities for horizontal alignment:

-

-

-

to the right of the control

to the left of the control

to the screen margin that is farther from the control

If the “VirtScreenSize“ option is enabled, the virtual keyboard is not aligned within the virtual screen but

still within the real screen. Consequently, the keyboard may also reach beyond the terminal program.

Entry

Comment

Section [User]

General settings

AIP-BMD_81.docx

Version: 1.3.23049

Page 79 of 93

                                          Entry/Information  Functions

for  Shop  Floor/Machine  Data

Collection

Entry

Comment

Definition  of  additional  customer-specific  keys  displayed  in  the
upper row:

Key1=del,8,Delete
Key2=<,37,Cursor left
Key3=>,-39,Cursor right
Key4=<<,36,Cursor
at
beginning
Key5=/

the

Keys  are  configured  with  the  following  syntax  in  tasten32.ini
within the section [User]:
Key<i>=<CH>[,<Code>[,<Comment>]]
Key<i>:  Key1..Key5
<CH>: Characters displayed on the key and the code of which is
sent
successfully tested characters:
§=)/?`´{[]}#.;<>_*~:€äüöÖ²³@ªº¿®ÇüéâäæÆø£®½¼©¥ãµ
Characters that lead to errors while testing: !“$%(&,’
<Code>: Code that is sent instead of the character code
<Comment>: any comment

Show key "shift"
The  key  has  been  designed  for  switching  between  upper  case
and lower case letters
Starting from version 2.0.1.5 of keyboard.exe (30 April 2012), the
virtual  keyboard  automatically  shows  or  hides  letters.  This
depends on whether the current field is numeric or alphanumeric.
This  button  disables  the  function  so  that  the  virtual  keyboard  is
always "opened" ("dropped down").

ButtonShift=ON

ContextSensitive=off

AIP-BMD_81.docx

Version: 1.3.23049

Page 80 of 93

Collection

HideTime=10
HideTime=0

HideMode=1
HideMode=2

Trace=1

                                          Entry/Information  Functions

for  Shop  Floor/Machine  Data

Entry

Comment

Starting  from  version  2.0.1.5  of  keyboard.exe  (30  April  2012),
there  is  a  new  button  on  the  virtual  keyboard  allowing  to
disable/hide  the  keyboard  for  a  configurable  period  of  time  (by
default=10  sec.).  Once  switched  to  a  new  field,  the  virtual
keyboard will immediately appear at the new position even if the
hide period has not yet expired.
The "hide" button is removed by configuring HideTime=0.

HideMode=0  (by  default)  means  the  virtual  keyboard  appears,
once  another  dialog  (e.g.  a  message  indicating  "...  is  being
loaded...") is opened and the input focus returns to the dialog.
1: The virtual keyboard is hidden over the indicated period, even
though  another  AIP  dialog  is  opened.  The  virtual  keyboard  is
shown immediately after switching to another field of the dialog.
2:  Like  (1)  but  the  virtual  keyboard  remains  hidden  even  after
switching  to  another  field  of  the  dialog.  The  virtual  keyboard  is
only  shown  before  the  HideTime  has  expired,  if  the  dialog  is
closed and reopened.
Trace=1 enables logging (prot_kbd.txt) for the virtual keyboard.
(AIP 2.0.3.25 / keyboard 2.0.2.3)
Additional  scaling  factor  reducing  or  increasing  the  keyboard.
This  makes  it  possible  to  cover  as  less  information  as  possible
and to keep maximum user friendliness. This setting is useful, in
particular, for large screens with low resolution and vice versa.
(keyboard.exe  V2.0.1.5)
Alphanumeric mode based on the German typewriter keyboard
(keyboard.exe  V2.0.2.2)
General settings

Configuration of the skin (normally, default values are sufficient –
the section is not required)

Shows a button enabling and disabling the skin

ScaleMultiplier=0.7

KEYMODE=QWERTZ

Section [SKIN]

[SKIN]
Directory=..\..\..\tastatur\
skins
Name=mpdv
Saturation=0
Hue=0
SkinButton=on

AIP-BMD_81.docx

Version: 1.3.23049

Page 81 of 93

                                          Entry/Information  Functions

for  Shop  Floor/Machine  Data

Collection

12  Start Menu Inst32

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

AIP-BMD_81.docx

Version: 1.3.23049

Page 82 of 93

                                          Entry/Information  Functions

for  Shop  Floor/Machine  Data

Collection

[ F ]

Program – Start

Opening the application program. If nothing is entered, it will be started automatically after 20 seconds.

The <D> and <E> buttons are only used for service purposes.

If  no  button  is  pressed,  the  AIP  application  starts  automatically  after  20  seconds.  Once  the  application

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

AIP-BMD_81.docx

Version: 1.3.23049

Page 83 of 93

                                          Entry/Information  Functions

for  Shop  Floor/Machine  Data

Collection

Starting the function “Test Apps“ by the menu item ”[ 4 ] Test Apps  >>"

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

AIP-BMD_81.docx

Version: 1.3.23049

Page 84 of 93

                                          Entry/Information  Functions

for  Shop  Floor/Machine  Data

Collection

The configuration file “testapp.ini“ is structured as follows.

  [APP]
  name=com32tst
  exe=com32tst.exe
  param=...
  [COMMENT]

; optional parameter to transfer call data

MSS Test Program

  [/COMMENT] [APP]

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

AIP-BMD_81.docx

Version: 1.3.23049

Page 85 of 93

                                          Entry/Information  Functions

for  Shop  Floor/Machine  Data

Collection

The application / Windows can  be  exited or restarted in the following selection  dialog after entering the

password "mos6950" and clicking the button

.

AIP-BMD_81.docx

Version: 1.3.23049

Page 86 of 93

                                          Entry/Information  Functions

for  Shop  Floor/Machine  Data

Collection

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

Please

note

for

installation

tool

as

of

version

6.5.2.01:

The  "installation  3rd  party"  function  is  only  possible  in  connection  with  hyfserv  file  server  from

version 7.2.1.29 onwards

[ ESC ]  Main Menu

Back to the main menu

Menu item "[1] Backup“

The file <hydradir>\ctnet\win\ctaipbackup.txt

or a terminal-specific file <hydradir>\ctnet\win\ctaipbackup2xxx.txt

(xxx is the terminal number) is used by the server for the backup.

At first the system attempts to load a terminal-specific file.

If no terminal-specific file exists, the system will then attempt to load the file ctaipbackup.txt.

This file contains all of the files or registry entries that need to be backed up.

\ctaip\*.INI

\ctaip\*.cfg

\ctaip\cfg\*.*

HKEY_LOCAL_MACHINE\SOFTWARE\MPDV\

AIP-BMD_81.docx

Version: 1.3.23049

Page 87 of 93

                                          Entry/Information  Functions

for  Shop  Floor/Machine  Data

Collection

A Zip file is created in the terminal and it is stored in the server.

The file is located in the server at:

The backup Zip file is given the name:  ctaipbackup2xxx.zip

 ->xxx = terminal number

(terminal-

specific for Hydra user 2xxx)

This backup file is then stored in the server under

<hydradir>\custom\backup\ctaip\ctaipbackup2xxx.zip .

Menu item "[ 2 ] Restore“

There will first be a query asking whether you would like to run a restore.

"Restore"  attempts  to  load  a  backup  file  located  in  the  server  and  then  automatically  restores  all  of  the

backed up files and any backed up registry entries.

As already described in the backup section, a backup file is filed in the server directory:

<hydradir>\custom\backup\ctaip\ctaipbackup2xxx.zip

Menu item “[ 3] Installation 3rd Party“

Please note: Possible with file server hyfserv 7.2.1.29 only

AIP-BMD_81.docx

Version: 1.3.23049

Page 88 of 93

                                          Entry/Information  Functions

for  Shop  Floor/Machine  Data

Collection

"Installation" button:

A list with all directories starting with the <hydradir>\ctnet\win\install directory is displayed. The

directories found will be offered for selection in a dialog. By confirming a directory, this directory is

downloaded and its contents are shown.

The <hydradir>\ctnet\win\install directory can therefore be expanded to include additional directories.

Content of a directory selected beforehand

Having  clicked  one  of  the  buttons  "copy  file"  or  "copy  all  files",  a  selection  screen  opens  where  a

directory may be chosen. The selected file or all files displayed are copied into this directory. In order to

copy a single file, first it needs to be selected in the list.

AIP-BMD_81.docx

Version: 1.3.23049

Page 89 of 93

                                          Entry/Information  Functions

for  Shop  Floor/Machine  Data

Collection

Execute button: A file from the list may be executed by clicking this button. The execution program

defined in Windows is used to display or execute the selected file.

12.1  Using the functions in Windows 7

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

AIP-BMD_81.docx

Version: 1.3.23049

Page 90 of 93

                                          Entry/Information  Functions

for  Shop  Floor/Machine  Data

Collection

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

12.2

Installation of font types in Windows 7

If  the  "Windows  7"  operating  system  is  used  the  required  font  types  can  no  longer  be  installed  by  the

application itself.

The  required  fonts  have  to  be  installed  once  using  the  above-mentioned  installation  program  "INST32",

menu item "HYDRA Fonts install". This is required to make sure the information is properly displayed on

the terminal.

The following minimum versions are required if AIP is used with Windows 7.

Program

inst32.exe

ctaip.exe

hydra-fonts.msi

Version/date

7.0.0.7

2.0.2.10

2010-05-31

12.3  Date/time synchronization at the terminal

The HYDRA terminal software automatically synchronizes the time of the local terminal PC with the time

of the HYDRA server. Usually, different Windows versions require administrative rights to be able to set

the time locally.

The message below is displayed once, every time the program is started (as of version V# 2.0.2.10) if the

respective Windows user does not have the required rights.

AIP-BMD_81.docx

Version: 1.3.23049

Page 91 of 93

                                          Entry/Information  Functions

for  Shop  Floor/Machine  Data

Collection

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

12.4  Control of special watchdog hardware

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

AIP-BMD_81.docx

Version: 1.3.23049

Page 92 of 93

                                          Entry/Information  Functions

for  Shop  Floor/Machine  Data

Collection

Watchdog

Configuration

Required files

aaeonwrapper.dll

A watchdog may also be activated within the registry. The following entry has to be set:

HKEY_LOCAL_MACHINE\SOFTWARE\MPDV\CT\WdDLL=<Driver DLL>

In case both entries are set, the entry in the ctaip.ini file takes priority.

AIP-BMD_81.docx

Version: 1.3.23049

Page 93 of 93

