Manual

Data Collection/Information
Functions for ERP Batches,
MES Batches, Serial Numbers
AIP-TRT 8.1

Version 1.0.23049

Last changed on: 01.09.2020

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying  and  distribution  of this  documentation  or  any  part thereof,  for  any  purpose  or  in  any  form, is  prohibited  without  prior
written permission from MPDV Mikrolab GmbH.

AIP-TRT_81.docx

Page 2 of 77

01.09.20

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

The information contained in this documentation is subject to change without prior notice.

AIP-TRT_81.docx

Page 3 of 77

01.09.20

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

Contents

1  Overview of Data Collection/Information Functions for ERP

Batches, MES Batches, Serial Numbers ..................................................... 6

2  Operation of AIP ........................................................................................... 7

2.1  Special control and display elements within AIP .................................................. 7

2.2  General description of the posting process with AIP ............................................ 9

3  Basic AIP Display ....................................................................................... 13

3.1  Basic displays – header and footer .................................................................... 13

3.2  Basic display “tabular view“ ............................................................................... 15

3.3

3.4

"Machine overview" basic display ...................................................................... 18

“Machines as icons” basic display ..................................................................... 21

4  Barcode Input with Prefix ........................................................................... 23

4.1  Configuration of customized barcode prefixes ................................................... 27

5  Local Configuration File ctaip.ini ................................................................ 29

5.1  Basic configuration ............................................................................................ 29

6  Central Configuration File hytnrcfg.ini ........................................................ 33

6.1

Layout configuration .......................................................................................... 36

7  Order Postings for Operations Subject to Batch Management .................. 38

8

Input Batch Change ................................................................................... 41

9  Output Batch Change ................................................................................. 44

10  Batch Information ....................................................................................... 47

11  Entry of Batch Attributes ............................................................................ 48

12  Enter Goods Receipt Batch ........................................................................ 49

AIP-TRT_81.docx

Page 4 of 77

01.09.20

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

13  Repost Batch .............................................................................................. 51

14  Display of "Produced Batches" .................................................................. 52

15  Settings for List of Produced Output Batches ............................................ 53

16  Advance Logon of Input Batches ............................................................... 55

17  Configuration for Preregistered Input Batches ........................................... 58

18  Throughput Batch Processing .................................................................... 60

19  Throughput Batch Processing .................................................................... 63

20  Configuration for Throughput Batch Processing ........................................ 64

21  Batch Consumption .................................................................................... 66

22  Discrete Consumption Input ....................................................................... 70

23  Discrete Consumption Input at AIP ............................................................ 72

24  Configuration of Discrete Consumption Input ............................................ 75

AIP-TRT_81.docx

Page 5 of 77

01.09.20

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

1  Overview of Data Collection/Information Functions for ERP

Batches, MES Batches, Serial Numbers

Purpose

The  AIP  features  contained  in  this  function  package  make  it  possible  to  enter  batch-related  data

directly in production using shop floor terminals or data acquisition PCs.

Integration

Data  entered  via  the  AIP  terminal  can  be  displayed  and/or  evaluated  in  different  MOC  applications.

The collected data can be uploaded via relevant interfaces.

Functions

Order-related data acquisition and posting functions



Input  batches  can  be  entered  at  the  same  time  as  operations  are  logged  on  (configurable  per

operation and workplace)

  Produced output batches can be entered at the same time as operations are logged on

  Changing of input and output batches can be recorded and checked for validity while the operation

is running and/or the order is being processed

  Entry of goods receipt batches

  Automatic generation of material movements (incoming goods/outgoing goods) depending on the

receipt or consumption of input and/or output batches

  Batch-related collection of quantities and time for produced batches of material

  Entry of ERP or MES batch numbers using the keyboard and/ or barcode

  A  validation  check  to  ascertain  if  documentation  is  required  (documentation  obligation)  for

consumable material when the operation and/or the input batch is logged on

  A  ticket/  label  is  automatically  printed  in  the  HYDRA  standard  format  using  the  assigned  printer

when a new ERP or MES batch is generated

AIP-TRT_81.docx

Page 6 of 77

01.09.20

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Page 7 of 77

01.09.20

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Page 8 of 77

01.09.20

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Page 9 of 77

01.09.20

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Page 10 of 77

01.09.20

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Page 11 of 77

01.09.20

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

The partial dialog “confirm” shows a summary of all values entered so far in the dialog. Provided that

the  user  agrees  with  the  entered  data,  the  “interrupt  operation”  dialog  can  be  confirmed,  once  the

badge number has been entered. Then the dialog including the data is sent to the server and posted.

If  an  input  field  of  the  dialog  is  not  filled  out  properly  (e.g.  a  mandatory  field  is  empty)  the  field  is

highlighted in red in the corresponding view and focused to enable the user to directly correct the field

content.

If a workflow dialog is opened it may directly be exited by clicking the ESC button. This is also

the case, if the virtual keyboard is opened. Thus, the ESC button cannot be used to close the

virtual keyboard.

AIP-TRT_81.docx

Page 12 of 77

01.09.20

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Page 13 of 77

01.09.20

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Page 14 of 77

01.09.20

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Page 15 of 77

01.09.20

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Page 16 of 77

01.09.20

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

If a long text is defined for this operation it is indicated here. The long text is displayed using the OP

info dialog (button

).

Below the second list there is a line that mainly includes function buttons relating to operations.

"3rd list" table

The third list is optional and may be configured respectively. Which information is displayed in this list

depends, among other things, on the workplace configuration.

The following lists can be displayed:

AIP-TRT_81.docx

Page 17 of 77

01.09.20

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Page 18 of 77

01.09.20

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Page 19 of 77

01.09.20

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Page 20 of 77

01.09.20

...2211OPOPOPOPMMDIVTLGDIVTLGDIVTLGngpartitioniDisplayed

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Page 21 of 77

01.09.20

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Page 22 of 77

01.09.20

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

4  Barcode Input with Prefix

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

AIP-TRT_81.docx

Page 23 of 77

01.09.20

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Page 24 of 77

01.09.20

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

Prefix

11.

12.

13.

14.

15.

22.

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

AIP-TRT_81.docx

Page 25 of 77

01.09.20

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Page 26 of 77

01.09.20

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

Prefix

50.

Barcode

*50.1337*

Raw data

KNR = 1337

4.1  Configuration of customized barcode prefixes

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

AIP-TRT_81.docx

Page 27 of 77

01.09.20

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

AIP-TRT_81.docx

Version: 1.0.23049

Page 28 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

5  Local Configuration File ctaip.ini

The most important hardware and system settings are defined for each terminal in the CTAIP.INI file of

the c:\ctaip directory.

Changes  to  the  configuration  file  ctaip.ini  are  only  enabled  after  rebooting  the  terminal

software.

5.1  Basic configuration

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

In offline mode, the  interval after  which online  access should  be
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

AIP-TRT_81.docx

Version: 1.0.23049

Page 29 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 30 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 31 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

Entry

Comment

BarcodeNest=

BarcodeNumm=

This  field  specifies  which  acronym  is  entered  into  the  cavity
number field by the scanner.
This  field  specifies  which  acronym  is  entered  into  the  number
field by the scanner.

AIP-TRT_81.docx

Version: 1.0.23049

Page 32 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

6  Central Configuration File hytnrcfg.ini

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 33 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

AttachedApplication=First

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

HTTPBrowser=standard

SupressErrorMessage=70012

[SignatureRecording->User 0]

ManualBadgeInput=true

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 34 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 35 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

6.1  Layout configuration

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 36 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 37 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

7  Order Postings for Operations Subject to Batch Management

Summary

In addition to logging the actual operation on, operations  subject to management in batches also enable

to log on relevant input batches.

Configuration

These  system  settings  have  to  be  made  to  be  able  to  generally  use  operations  that  are  subject  to

management in batches.

Basic screen

Basic terminal screen when a machine is assigned in batch mode:

The  basic  display  shows  the  third  list  "Input  materials  currently  logged  on"  for  machines  for  which  the

“batch management” option is configured. This list shows all active input batches of the selected machine.

OP logon with input batches

By clicking the "log OP on" button a workflow including two tabs is opened. The operation to be logged on

is selected in the first tab “select operation".

AIP-TRT_81.docx

Version: 1.0.23049

Page 38 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

The “log operation on” tab is reached by clicking the “Next” button where in addition to the selected OP,

the defined material components are displayed in a list.

By entering a batch number in the "input batch" field and clicking the "report batch" function a batch may

be logged on as input material for a component. During the entry process, the terminal checks whether or

not the batch number is known in the system and may be logged on. This is also described in detail within

the document dealing with the input batch change.

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

If batches are logged on along with the OP and the user cancels the process or cannot log the OP on due

to validation checking the input batches will be logged off automatically for this OP. In this case, batches

are  always  logged  off  without  indicating  the  consumption  quantity.  By  way  of  the  following  warning

message, the user may confirm the logoff process:

The  function  that  logs  input  batches  off  automatically  can  be  activated/deactivated  by  an  option  in  the

hyaipcfg.ini file

HYAIPCFG.INI

[MPL-Options 0/2xxx]
ForceAutoLogOffInputBatches=0

AIP-TRT_81.docx

Version: 1.0.23049

Page 39 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

Logon of unplanned input material

In  addition  to  planned  materials,  it  is  also  possible  to  log  “unplanned”  material  on  for  an  OP,  using  an

additional feature at the component of the OP. If the "replaceable" option is set to "J" the user is able to

assign  the  respective  component  manually,  when  batches  are  logged  on.  However,  the  logon  is  only

allowed if the material type of the input batch corresponds to that of the component.

Within  the  selection  list  the  components  are  filtered  according  to  the  material  number  and  displayed  as

follows:

Logon of unknown batches

An  input  batch,  which  is  not  yet  known  in  the  system,  may  be  logged  on  for  an  OP  using  the  "create

unknown batches" option in the basic parameter settings.

In  this  case,  it  is  searched  for  a  valid  assignment  of  input  material  to  the  material  type  of  the  selected

component,  when input batches are logged on. Provided that a corresponding assignment is found and

the "allow entry of unknown input batches" option is configured in the "input batch processing" tab at the

material type, the batch is generated by logging it on to the system and set to the "running" status at the

same time. The batch is initially created in a quantity of 1.000.000.000.

Logoff/interruption of OPs

A running OP may be interrupted or logged off by clicking the "logoff/interrupt OP" button. Then a dialog

opens, where the following selection can be made:

If "log OP off" is clicked the logoff dialog opens that contains the same input fields like the  output batch

change dialog.

Thus, the output batch that is currently still active is completed, when OPs are interrupted or logged off.

AIP-TRT_81.docx

Version: 1.0.23049

Page 40 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

8

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 41 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 42 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

Comment on batch

The comment entered is saved as information for the batch.

Log input batch on:

Provided that the batch is known, batch data is displayed in an intermediate dialog where the logon may

be confirmed.

Provided that the batch could be logged on, it is taken over to the material list in "customer batch number"

and thus the change is completed.

However,  in  case  the  logon  is  inadmissible  as  the  input  material  does  not  correspond  to  that  of  the

component, the logon is rejected by an error message.

AIP-TRT_81.docx

Version: 1.0.23049

Page 43 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

9  Output Batch Change

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 44 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 45 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

"Change inp. batch" function key:

Using this button the user can switch to the "input batch change" function.

New batch

When  a  current  output  batch  is  completed,  a  new  batch  number  is  simultaneously  created  for  the  next

batch. The batch number may be assigned automatically or manually. The batch generated in this way is

created with the batch number in the system and set to the "running" status.

AIP-TRT_81.docx

Version: 1.0.23049

Page 46 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

10  Batch Information

Batch information

Batch information is displayed in a dialog, when the “batch info” icon is clicked.

AIP-TRT_81.docx

Version: 1.0.23049

Page 47 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

11  Entry of Batch Attributes

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 48 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

12  Enter Goods Receipt Batch

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 49 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 50 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

13  Repost Batch

Summary

Using the "repost batch" button, an existing batch may be reposted to another material buffer.

Configuration

Further system configurations are not required to repost batches.

Dialog

Having  clicked  the  "OK"  button,  the  batch  is  reposted  to  a  new  material  buffer  and  the  dialog  remains

open for further entries.

As an alternative, the batch can also be reposted from yield to scrap.

AIP-TRT_81.docx

Version: 1.0.23049

Page 51 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

14  Display of "Produced Batches"

Summary

Using  the  third  list,  it  is  possible  to  display  the  output  batches  produced  for  a  running  operation  that  is

subject to batch management within the machine master at the terminal.

A default number of 20 output batches is displayed for each machine in the list. Output batches (yield and

scrap  batches)  are  shown,  which  have  been  produced  at  this  terminal  since  output  batches  were

changed.

As this list is only kept locally by the respective terminal, it is not synchronized with the server, when AIP

is started.

Configuration

The settings required to use the third list can be found in the document dealing with the configuration.

Display

Figure: Display of the output batches produced

Using the

 icon, the user can switch to the display of output batches.

The list includes,  among other things, the article, article designation,  batch number, date, time, quantity

and  batch  class,  user  fields  as  well  as  alternative  batch  numbers.  Some  of  the  fields  might  not  be

assigned values depending on the entry scenario when output batches are generated.

AIP-TRT_81.docx

Version: 1.0.23049

Page 52 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

15  Settings for List of Produced Output Batches

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 53 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 54 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

16  Advance Logon of Input Batches

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 55 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

Advance logon of input batches (CE_VWL_MPL)

The user selects the workplace to which an input batch is to be logged on in advance in the basic screen.

The  below  dialog  (CE_VWL_MPL)  opens  by  clicking  the  function  key  ”Advance  logon  of  input  batches”

(preregistration of input batch).

If an operation is currently running/logged on to the workplace, this one will be selected by default. The

input batch (that is to be logged on in advance) is entered/scanned for the selected BOM item. Advance

logon of input batches is started by clicking the button “post batch".

AIP-TRT_81.docx

Version: 1.0.23049

Page 56 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

At first the input batch is checked for validity (dialog CE_VAN). The material number of the input batch is

checked against the material number of the component list or the BOM item. The input batch is logged on

in advance, once the button “log input batch on in advance” has been clicked:

Finally,  the  input  batch  that  has  been  logged  on  in  advance  is  displayed  in  purple  in  the  BOM  of  the

component.

The dialog can be closed with the “cancel” key.

AIP-TRT_81.docx

Version: 1.0.23049

Page 57 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

17  Configuration for Preregistered Input Batches

Configuration for Display of Third List on AIP (INI Configuration)

Please set the following parameters/values in the INI configuration for displaying input batches logged on

in advance in the third list on AIP.



Ini name:

MPL

  Section:

MPL_VANCNR

  Key/Value:

TNR_VANCNR =Y

Configuration for Logging on Input Batches when Logging On an OP on

AIP (INI configuration)

Please set the following parameters/values in the INI configuration so that the input batches logged on in

advance are also logged on/considered when an OP is logged on to AIP.



Ini name:

MPL

  Section:

MPL_VANCNR

  Key/Value:

USE_VANCNR =Y

Configuration for Keyboard Layout on AIP (Ctaipbut.INI)

For  the  function  key  display  on  AIP  in  the  basic  view,  the  following  entry  must  be  made  in  the

configuration file Ctaipbut.ini. The file is to be saved accordingly on the server.

AIP-TRT_81.docx

Version: 1.0.23049

Page 58 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

Entry in Ctaipbut.ini:

[ANR-LN-Page2]

1=A_INFO.Dialog1,L,BDE-Kommentar,Attach Notes.png

2=A_SMG,L,Sollmenge ändern,Shipping Box Open Move Down Up.png

3=A_ELW,R,Eingangsloswechsel,CE_WL.png

4=CE_VWL_MPL,R,Eingangslosvoranmeldung,CE_WL.png

5=%BART:CAQ=J%CAQ_DC_T,R,Prüfung durchführen,Generators.png

Configuration for Marking Input Batches Logged On in Advance on AIP

(Ctaiplay.INI)

To enable color marking of the input batches logged on in advance in the input batch list, material list and

BOM on AIP, the following entry must be made in the configuration file Ctaiplay.ini. The file is to be saved

accordingly on the server.

Entry in Ctaiplay.ini:

Coloring of preregistered batches:

Sections [input batch list], [Material list] and [ FHM list (KOMBI) ]:

...

EXAMINE_SCANEXPR1=CST=X

EXAMINE_SCANCOLOR1=ClPurple
...

AIP-TRT_81.docx

Version: 1.0.23049

Page 59 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

18 Throughput Batch Processing

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 60 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 61 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 62 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

19  Throughput Batch Processing

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 63 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

20 Configuration for Throughput Batch Processing

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 64 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

The operation is to be identified as requiring batch management.

Configuration at the Operation - Component

The configured material type is to be selected as the material type at the component.

In addition to the component for which the batch number is to be handed down, other material

components can be maintained at the operation. These continue to be taken into account in the

usual way in the course of batch log-on and consumption recording.

AIP-TRT_81.docx

Version: 1.0.23049

Page 65 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

21  Batch Consumption

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 66 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 67 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 68 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 69 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

22  Discrete Consumption Input

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 70 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

  Providing material consumptions for confirmation/upload from HYDRA to the inventory management

system in HYDRA standard format (requires that the interface used to upload material and batch data

is licensed and activated).

AIP-TRT_81.docx

Version: 1.0.23049

Page 71 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

23  Discrete Consumption Input at AIP

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 72 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 73 of 77

geEinsatzmenAusschussGutmengeVerbrauchrchnerische*Re

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 74 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

24  Configuration of Discrete Consumption Input

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 75 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 76 of 77

Data Collection/Information Functions for ERP Batches, MES Batches, Serial Numbers

  Optional: Uploading the material consumption as goods movement

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

AIP-TRT_81.docx

Version: 1.0.23049

Page 77 of 77

