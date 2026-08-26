Manual

Collection / Information
Functions for Material, ERP
Batches, MES Batches
AIP-MTR 8.1

Version 1.0.23049

Last changed on: 01.09.2020

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

AIP-MTR_81.docx

Page 2 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

The information contained in this documentation is subject to change without prior notice.

AIP-MTR_81.docx

Page 3 of 59

01.09.20

ERP Batches, MES Batches

Contents

Collection  /  Information  Functions  for  Material,

1  Overview of Collection / Info Functions for Material, ERP Batches

and MES Batches ............................................................................ 6

2  Operation of AIP ............................................................................... 8

2.1  Special control and display elements within AIP .................................... 8

2.2  General description of the posting process with AIP ............................ 10

3  Basic AIP Display ........................................................................... 14

3.1  Basic displays – header and footer ...................................................... 14

3.2  Basic display “tabular view“ ................................................................. 16

3.3

3.4

"Machine overview" basic display ........................................................ 19

“Machines as icons” basic display ....................................................... 22

4

Input Functions Relating to Batches .............................................. 24

4.1  Basic screen........................................................................................ 24

4.2  Order postings for operations subject to batch management ............... 25

OP logon with input batches ................................................................. 25

Logoff/interruption of OPs .................................................................... 26

4.3  Postings based on batches ................................................................. 26

Input batch change ............................................................................... 26

Log input batch off ................................................................................ 26

Log input batch on ................................................................................ 27

Logon of unplanned input material ....................................................... 28

Logon of unknown batches .................................................................. 28

Output batch change ............................................................................ 28

Entry of additional batch attributes ....................................................... 29

Enter goods receipt batch .................................................................... 30

Repost batch ........................................................................................ 31

4.4  Throughput batch mode ...................................................................... 31

4.5  Manual partial upload in HYDRA-MPL environment ............................ 32

4.6  Display of produced output batches .................................................... 33

4.7  Batch information ................................................................................ 34

AIP-MTR_81.docx

Page 4 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

4.8  Display of consumption balance .......................................................... 34

Display of consumption postings .......................................................... 35

Logging input batches off ..................................................................... 35

4.9  Advance logon of input batches........................................................... 35

General 36

Configuration ........................................................................................ 36

Process/procedure ............................................................................... 36

AIP usage ............................................................................................ 36

4.10  Recording of serial numbers ................................................................ 38

4.10.1  Entry of serial number for OPs that are not subject to batch

management (dialog A_SNR/ “E“) ........................................... 39

4.10.2  Entry of serial numbers for OPs subject to management in

batches (dialog A_SNR) .......................................................... 42

5  Barcode Input with Prefix ............................................................... 45

5.1  Configuration of customized barcode prefixes ..................................... 49

6  Local Configuration File ctaip.ini .................................................... 51

6.1  Basic configuration .............................................................................. 51

7  Central Configuration File hytnrcfg.ini ............................................ 55

7.1

Layout configuration ............................................................................ 58

AIP-MTR_81.docx

Page 5 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

1  Overview of Collection / Info Functions for Material, ERP

Batches and MES Batches

Purpose

The AIP features contained in this function package make it possible to enter batch-related data directly

in production using shop floor terminals or data collection PCs.

Integration

The data entered using the AIP can be displayed in various applications or evaluated in the MOC. The

data entered can also be uploaded via interfaces.

Features

Order-related data entry and posting functions

  Batches can be entered at the same time as operations can be posted

  Entry and validation check of input and output batch changes while the operation is running

  Entry of goods receipt batches and automatic generation of goods receipts/ goods issues

  Batch numbers can be entered at the same time that operations are logged on (configurable per

operation and workplace)

  A ticket/ label is automatically printed in HYDRA standard format using the assigned printer when a

new batch is generated

  A validation check for documentation requirement is run for batches when the operation is logged

on

  Entry of batch changes during order processing

  Entry of batch numbers via keyboard and/ or barcode.

  Batch-related quantity and time input

Functions to enter/generate and display series and serial numbers:

  Predefined series or serial numbers are transferred in HYDRA standard format via the HYDRA

ERP interface

  Serial numbers are entered or generated via a user-friendly posting function at the BDE terminal

  Possibility to assign components also identified by serial numbers

  Classification into yield/ scrap quantities with reasons

  Automatic generation of goods receipts/ goods issues

  Optional verification of serial numbers already defined for the order

AIP-MTR_81.docx

Page 6 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

  Entry of order-related series and serial numbers identifying the processed parts

  Validation check for already posted series or serial numbers

  Display of available and used series or serial numbers at workstation PCs (MES Operation Center)

  Upload  of  posted  series  and  serial  numbers  in  HYDRA  standard  format  via  the  HYDRA-ERP

interface

Additional licenses may be needed in order to use the functions listed above. Adding and coordinating

the specific requirements and implementing them are considered a customized HYDRA service.

AIP-MTR_81.docx

Page 7 of 59

01.09.20

ERP Batches, MES Batches

2  Operation of AIP

Collection  /  Information  Functions  for  Material,

2.1  Special control and display elements within AIP

Tables

Tables are displayed in a uniform way within AIP. This affects the basic display (workplaces, operations,

…) as well as the selection lists of posting dialogs.

 Provided that information is available for more than one page, the page numbers

are displayed below the table. The current page is highlighted in bold letters. By clicking/touching the

user can directly switch to another page.

An operation may be selected using the mouse, touch screen, keyboard (arrow keys:'' or ''), scanner

or by entering it manually.

The  content  of  tables  or  lists  depends  on  the  respective  context.  Please  find  the  following  example:

When an operation is logged on, those operations may be selected that are included in the sequencing

list  or  that  are  planned  for  the  corresponding  workplace  or  group.  However,  when  operations  are

interrupted, only running operations may be selected.

 Scrolling page by page (up or down) in the table.

  Scrolling  to  the  left  or  right.  Only  those  buttons  are  activated  that  are  reasonable  for  the

current situation. This figure shows that scrolling to the left has been deactivated.

AIP-MTR_81.docx

Page 8 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

A “table filter” may optionally be displayed (customizing). This is an automatic filter that, once it has been

entered, directly affects the table without having to update it. This process is realized through full-text

search for (defined) columns. The search is case-insensitive.

Virtual keyboard

The virtual keyboard allows for data to be entered manually via touch screen or a connected mouse. To

make it easier for inexperienced users to find the required keys, the numeric key pad is organized like

the telephone and letters are aligned in alphabetical order. Consequently, both differ from the computer

keyboard which usually is aligned in the “QWERTZ keyboard layout”. The virtual keyboard is displayed

automatically as soon as an input field is focused.

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

The virtual keyboard only supports the characters "0" - "9", "A" - "Z" and "+“, "-“ , ".“ and ",“. Other

characters or languages are not supported. It is recommendable to use an additional keyboard if

texts in other languages have to be entered.

The start position of the virtual keyboard can be defined by a setting in the configuration file keyboard.ini.

Subject  to  the  screen  resolution,  the  parameters  xpos=  and  ypos=  need  to  be  enabled  in  the

configuration file.

If  the  virtual  keyboard  is  not  to  be  shown  in  general,  the  parameter  –t  needs  to  be  included  in  the

parameter bar parameters= of the configuration file ctaip.ini.

AIP-MTR_81.docx

Page 9 of 59

01.09.20

ERP Batches, MES Batches

Date display

Collection  /  Information  Functions  for  Material,

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

AIP-MTR_81.docx

Page 10 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

The “interrupt operation” dialog opens and the first view is displayed. The function that is currently being

executed (in this case: interrupt operation) is shown in the header.

The first view “enter quantities” provides the user with the possibility to enter the produced yield or scrap

quantities. The virtual keyboard is shown or hidden automatically, subject to the active input field.

Quantities can be entered using the virtual keyboard or real keyboard. The user can go to the next field

using the tabulator key (which can also be found on the virtual keyboard). Once all values have been

entered in the first view, the next view can be opened by clicking the “next” button.

The  “cancel”  button  is  displayed  in  all  partial  dialogs  and  allows  for  the  entire  posting  dialog  to  be

cancelled/closed at any time.

AIP-MTR_81.docx

Page 11 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

The  next  view  can  be  opened  either  by  clicking  the  “next”  button  or  by  clicking  another  tab  (in  our

example: “select status” or “confirm”). Please note in this context, that no view can be skipped when the

views are navigated bottom up (view 1  view 2  view 3). This means: if you are in the first view (enter

quantities) and you click the third view (confirm), the second view (select status) will be displayed first.

Vice versa, when navigating top down (e.g. from the “confirm” view to the “enter quantities” view), every

view may directly be opened by clicking  at it. In this case, views are actually skipped. But the “back”

button also allows for the views to be opened one after the other (top down).

As long as the dialog has not been confirmed, entered data may be changed at any time by scrolling

back and forth.

The workplace status that is to be set, once the operation has been interrupted, is determined in the

second view “select status”. This status may be chosen from the displayed status list. This list can be

restricted  using  the  “filter”  field.  Once  the  required  values  have  been  entered,  the  next  view  can  be

opened by clicking “next” (in our example it is the last view).

AIP-MTR_81.docx

Page 12 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

The partial dialog “confirm” shows a summary of all values entered so far in the dialog. Provided that

the user agrees with the entered data, the “interrupt operation” dialog can be confirmed, once the badge

number has been entered. Then the dialog including the data is sent to the server and posted.

If  an  input  field  of  the  dialog  is  not  filled  out  properly  (e.g.  a  mandatory  field  is  empty)  the  field  is

highlighted in red in the corresponding view and focused to enable the user to directly correct the field

content.

If a workflow dialog is opened it may directly be exited by clicking the ESC button. This is also the

case, if the virtual keyboard is opened. Thus, the ESC button cannot be used to close the virtual

keyboard.

AIP-MTR_81.docx

Page 13 of 59

01.09.20

Collection  /  Information  Functions  for  Material,

ERP Batches, MES Batches

3  Basic AIP Display



In general, AIP has been designed for entries to be made via touch screen. The corresponding functions

can  be  started,  selected  or  executed  by  touching  the  buttons  within  the  touch  screen  or  using  the

displayed  virtual  keyboard.  Selection  lists  are  provided  in  many  cases,  as  an  alternative  to  manual

entries. Required entries can easily be selected from these selection lists.

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

Possible messages (e.g. if a dialog is opened for more than five minutes) are displayed to the right of it.

A  separate  window  opens  to  display  error  messages  that  occur  during  data  collection  (e.g.  validity

checks).

AIP-MTR_81.docx

Page 14 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

Basic displays

A  maximum  of  16  workplaces  or  machines  can  be  assigned  to  the  AIP  terminal.  The  individual

workplaces can be found within the list area in the order in which they have been assigned to the terminal

in MOC.

As regards the basic display of the AIP terminal, the user can choose between a tabular view, field-

related view and an icon view. This can be configured within the terminal configuration at the client. The

individual basic views are described in the sections that follow.

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

AIP-MTR_81.docx

Page 15 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

DEMO mode
The terminal is in the DEMO mode, i.e. server
communication is disabled.

3.2  Basic display “tabular view“

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

The tabular basic display consists of two or three tables, subject to the configurations made. While the

first two tables are always displayed, it is up to the user whether or not the third table is shown (optional

display).

“Machines/workplaces" table

The upper table shows the workplaces assigned to the terminal. The following columns are displayed.

Machine/workplace

The machine or workplace number as well as the designation are displayed.

AIP-MTR_81.docx

Page 16 of 59

01.09.20

ERP Batches, MES Batches

Status

The status is displayed in color and as status text. Coloring is as follows:

Collection  /  Information  Functions  for  Material,

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

however, the sort sequence of display lists may not be changed in the basic display of terminals.

The software does not allow it.

Provided  that  the  "compensate  manual  quantities"  option  (e.g.  set  off  scrap  against  yield)  is

enabled and the machine list also shows shift-related quantities (no default setting), they will not

be updated immediately, once they have been entered but only once lists have been reloaded.

"Operations at workplace" table

The  second  table  shows  the  operations  that  are  currently  logged  on  to  the  selected  workplace.  The

following columns are displayed:

1  We talk of an MDE workplace if this workplace is assigned to a terminal, which runs in the “MDE” operation mode.

In any other case, it is an ADE workplace.

AIP-MTR_81.docx

Page 17 of 59

01.09.20

Collection  /  Information  Functions  for  Material,

ERP Batches, MES Batches

Article

Article defined for the operation

Order and operation

Order number and operation number of the registered operation. Together they build the  MES order

number.

Target quantity

Target quantity that is defined for the operation.

Yield

Yield which has already been produced for this operation. The counters of possible machine connections

are considered as well.

Scrap

Scrap quantity which has already been produced for this operation. The counters of possible machine

connections are taken into account as well.

N

It is indicated here if a note, which should be visible at the terminal, has been recorded for this operation

in the graphic planning board at the client. The note(s) is/are displayed by clicking the OP info button

).

(

T

If a long text is defined for this operation it is indicated here. The long text is displayed using the OP info

dialog (button

).

Below the second list there is a line that mainly includes function buttons relating to operations.

"3rd list" table

The third list is optional and may be configured respectively. Which information is displayed in this list

depends, among other things, on the workplace configuration.

The following lists can be displayed:

  Staff logged on to the currently selected workplace (BDE)

  Resources logged on to the currently selected workplace (WRM)

AIP-MTR_81.docx

Page 18 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

  Materials/input batches logged on to the currently selected workplace (MPL/TRT)

  List of output batches produced in the currently selected operation (MPL/TRT)

The buttons below the third list (to the left) allow for switching between these lists.

Please note

The  registered  staff  displayed  in  the  third  list  correspond  to  the  list  of  the  dialog  “F5  registered

persons…”. Selecting a person in the third list does not affect selection of the operation in the list of OPs

running  at  the  workplace  and,  as  a  result,  it  neither  affects  pre-assignment  of  the  operation  in  the

corresponding posting dialogs.

Toolbar in the basic display

A toolbar, which may be configured by customizing, is assigned to each list in the basic display. This

makes the purpose of the function clear to the user. The “partial upload/confirmation” function can be

found, for example, below the list of registered operations.

In fact, the toolbar may include several “tabs”, which can be made visible by scrolling to the right/left at

the right/left end of the toolbar. A posting dialog (e.g. change partitioning) can be opened by clicking the

corresponding button.

Please note

The displayed buttons depend on the context defined by the respectively selected workplace. Thus, the

displayed buttons may vary when selecting another workplace/machine.

3.3

"Machine overview" basic display

If the “change view” button is clicked in the basic display, the view changes to the following presentation:

AIP-MTR_81.docx

Page 19 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

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

AIP-MTR_81.docx

Page 20 of 59

01.09.20

ERP Batches, MES Batches

Workplace/machine information

Collection  /  Information  Functions  for  Material,

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
The resulting partitioning is displayed without decimal places, provided it is an integer value. Otherwise,

Partitioning of the machine (TLG in mnr.lst)
Pulse factor of the machine (IMPFAKT in mnr.lst)
Partitioning of the individual order (TLG in anr.lst)

3 decimal places are shown.

In case partitioning or pulse factor of a machine or an order is 0, calculation is based on the value 1.

Having logged off all OPs, the machine continues working with the partitioning of the machine.

Target cycle

The largest target cycle of all operations running  at the machine is  always  displayed in the machine

overview at the terminal. If this OP is logged off the largest target cycle of the remaining OPs will be

displayed.

In case no OP is logged on, the target cycle from the machine list is displayed. Thus, even after a restart,

the terminal may get the target cycle that applied at last.

The largest target cycle is also transferred to MDE for monitoring.

AIP-MTR_81.docx

Page 21 of 59

01.09.20

...2211OPOPOPOPMMDIVTLGDIVTLGDIVTLGngpartitioniDisplayed

ERP Batches, MES Batches

Comment 1, comment 2

Collection  /  Information  Functions  for  Material,

These two fields show the user fields 53 and 54 (alphanumeric with 20 characters) at the operation. To

be able to edit these fields, a corresponding user field key containing these two fields must be defined

for the operation.

Target since logon

The production quantity to be expected since the OP has been logged on (depending on the cycle time,

partitioning and the time in which the production lock of the machine has not been active). No value can

be calculated, in case the terminal program has been restarted since the OP was logged on.

Calculation:

TargetSinceLogon = NetRunningTime[sec] * Partitioning/TargetCycle[sec/stroke]

NetRunningTime: Time since logon, in which the production lock has not been set. This calculation does

not take into account any breaks that might be defined in the shift model or status times posted on RPA

12 (resource performance account).

Deviation [%]

Deviation  (in  percent)  between  the  expected  target  quantity  since  logon  and  the  quantity  which  has

actually been produced “since logon”.

Calculation: Deviation[%] = 100% * (YieldSinceLogon - TargetSinceLogon) / TargetSinceLogon

Completion

The bar represents the proportion of “yield”, which has been produced until now, compared to the “target

quantity”.

Machine icon:

Provided  that  the  WRM-WTK  license  has  been  purchased,  the  machine  icon  may  be  replaced  by  a

picture  showing  a  yellow  or  red  oilcan,  depending  on  the  maintenance  activity  that  is  required:

3.4

“Machines as icons” basic display

This view can be configured as the default display within the terminal configuration at the client. It has

the advantage that the user can tell from a distance whether or not all machines are in the “Production”

status.

AIP-MTR_81.docx

Page 22 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

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

By clicking the “symbol” button (if configured) the view changes from the “machine overview” to the “icon

presentation of machines”.

AIP-MTR_81.docx

Page 23 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

4

Input Functions Relating to Batches

4.1  Basic screen

Basic terminal screen when a machine is assigned in batch mode:

The basic display shows the third list "Input materials currently logged on" for  machines for which the

“batch  management”  option  is  configured.  This  list  shows  all  active  input  batches  of  the  selected

machine.

AIP-MTR_81.docx

Page 24 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

4.2  Order postings for operations subject to batch

management

OP logon with input batches

By clicking the "log OP on" button a workflow including two tabs is opened. The operation to be logged

on is selected in the first tab “select operation”.

The “log operation on” tab is reached by clicking the “Next” button where in addition to the selected OP,

the defined material components are displayed in a list.

By entering a batch number in the "input batch" field and clicking the "report batch" function a batch may

be logged on as input material for a component. During the entry process, the terminal checks whether

or not the batch number is known in the system and may be logged on. This is described in detail within

the “input batch change" section.

“Batch” field

When an OP is logged on, a batch number is created simultaneously for the next output batch to be

produced.  The  batch  number  may  be  assigned  automatically  or  manually  (please  also  see  machine

master settings --> MPL tab). The generated batch is created with the batch number in the system and

set to the "running" status.

Provided that all required input materials are logged on, the OP may be started via the "OK" button in

the "OP logon" dialog. Whether input material has to be logged on or not, can be defined in the assigned

material type of the component.

Once the OP has been logged on successfully, all active input batches  of the  selected machine  are

displayed in the material list.

As of HYDRA-MPL product version 7.2.5:

If batches are logged on along with the OP and the user cancels the process or cannot log the OP on

due to a plausibility check the input batches will be logged off automatically for this OP. In this case,

batches are always logged off without indicating the consumption quantity.

AIP-MTR_81.docx

Page 25 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

By way of the following warning message, the user may confirm the logoff process:

The function that logs input batches off automatically can be activated/deactivated by a button in the

hytnrcfg.ini file:

HYTNRCFG.INI

[MPL-Options 0/2xxx]
ForceAutoLogOffInputBatches=0

Please note: This is only available as of HYDRA-MPL product version 7.2.5 and CTAIP version 2.0.2.3.

Logoff/interruption of OPs

A running OP may be interrupted or logged off by clicking the "logoff/interrupt OP" button. Then a dialog

opens, where the following selection can be made:

If "log OP off" is clicked the logoff dialog opens that contains the same input fields like the "output batch

change" dialog (see next section).

Thus, the output batch that is currently still active is completed, when OPs are interrupted or logged off.

4.3  Postings based on batches

Input batch change

Input material can be changed for a running OP if the "input batch change" button is clicked.

Log input batch off

Input batches may be changed by entering a currently active batch number or by entering a new batch

number. When logging batches off, it is also possible to enter the status and consumption of the batch

to be logged off.

AIP-MTR_81.docx

Page 26 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

Options when logging input batches off:

F1 - PROCESSED

The batch is set to the "processed" status and the remaining quantity that is still available is set to 0. A

consumption posting is generated as goods issue for the current, remaining quantity.

F2 - BLOCKED

The batch is set to the "blocked" status. A consumption entered additionally is deducted from the current,

remaining quantity as goods issue.

F3 - with remaining quantity

The batch is set to the "free" status. A consumption entered additionally is deducted from the current,

remaining  quantity  as goods issue. If the remaining  quantity that  is still  available becomes <= 0, the

batch status automatically switches to "processed".

Consumption

The entered consumption (unit of the input material) is deducted from the remainder of the batch and a

goods movement is generated.

Comment on batch

The entered comment is saved as information for the batch.

Log input batch on

Provided that the batch is known, batch data are displayed in an intermediate dialog where the logon

may be confirmed.

Provided  that  the  batch  could  be  logged  on,  it  is  taken  over  to  the  material  list  in  "customer  batch

number" and thus the change is completed.

However,  in  case  the  logon  is  inadmissible  as  the  input  material  does  not  correspond  to  that  of  the

component, the logon is rejected by the following error message:

AIP-MTR_81.docx

Page 27 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

Logon of unplanned input material

In addition to planned materials, it is also possible to log “unplanned” material on for an OP, using an

additional feature at the component of the OP. If the "replaceable" option is set to "J" the user is able to

assign the respective component manually, when batches are logged on. However, the logon is only

allowed if the material type of the input batch corresponds to that of the component.

Within the selection list the components are filtered according to the material number and displayed as

follows:

Logon of unknown batches

An  input  batch,  which  is  not  yet  known  in  HYDRA,  may  be  logged  on  for  an  OP  using  the  "creating

unknown batches" option in the basic settings of HYDRA (in BDE --> settings 2 tab):

In this case, it is searched for a valid assignment of input material to the material type of the selected

component, when input batches are logged on. Provided that a corresponding assignment is found and

the "allow entry of unknown input batches" option is configured in the "input batch processing" tab at the

material type, the batch is generated by logging it on to the system and set to the "running" status at the

same time. The batch is initially created in a quantity of 1.000.000.000.

Output batch change

Output material may be changed for a running OP using the "output batch change" button.

The input batches that are logged on are displayed with their available remaining quantity in a list within

the output batch change dialog. The following data may be entered:

Target buffer

Material buffer for which the current batch is to be produced. The output material buffer of the machine

is pre-assigned as default value.

Transport unit

AIP-MTR_81.docx

Page 28 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

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

"Change inp. batch" function key:

Using this button the user can switch to the "input batch change" function.

New batch

When a current output batch is completed, a new batch number is simultaneously created for the next

batch. The batch number may be assigned automatically or manually. The batch generated in this way

is created with the batch number in the system and set to the "running" status.

Entry of additional batch attributes

Several additional batch attributes may  be recorded for a material type by the configuration MPL  -->

Master data --> Attributes.

AIP-MTR_81.docx

Page 29 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

In case attributes are defined to be recorded at the terminal for the material type of the running OP,

another input dialog is opened, when the output batch is changed. The dialog opens additionally after

clicking OK in the output batch change function, interrupt OP and finish OP function.

Example when two additional attributes are collected:

Using batch attributes, numeric and alphanumeric values may be recorded which are then saved for the

produced batch in an additional table.

Enter goods receipt batch

A new goods receipt batch may be created in the system by the "enter GR batch" button.

Having clicked the "OK" button, the batch is created and the dialog remains open for further entries.

Batch numbers may be generated automatically or manually depending on the configuration. Moreover,

the following data are saved at the batch.

Workplace

Machine where the batch was recorded

Operation

Order where the batch was recorded

Material

Material number of the batch

Quantity and unit

The batch is created with the quantity and unit entered here. A goods receipt is posted with this quantity.

Quality

AIP-MTR_81.docx

Page 30 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

A batch may be classified as yield or scrap quantity. The system creates yield batches with the "free"

status. Scrap batches automatically get the "blocked" status and the batch class "scrap". When scrap is

selected, a valid scrap reason relating to the corresponding workplace has to be assigned.

Target buffer

Material buffer for which the current batch is to be produced. The output material buffer of the machine

is pre-assigned as default value.

Transport unit

A transport unit defined within the system may be assigned here.

Comment on batch

A comment may be saved for the goods receipt batch in this field.

Repost batch

Using the "repost batch" button, an existing batch may be reposted to another material buffer.

Having clicked the "OK" button, the batch is rebooked to a new material buffer and the dialog remains

open for further entries.

As an alternative, the batch can also be reposted from yield to scrap.

4.4  Throughput batch mode

A HYDRA machine may also be configured in "throughput batch mode". In throughput batch mode input

material is continued being processed with unchanged number (throughput batch number) via an OP.

The entry functions for throughput batch processing at the terminal are identical to those for active batch

tracing at the machine.

Please note/restriction: At machines with “throughput batch mode” it is impossible to log operations

on at the same time.

AIP-MTR_81.docx

Page 31 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

4.5  Manual partial upload in HYDRA-MPL environment

Using the manual partial upload function of HYDRA-ADE (A_TR dialog), it is possible to record a partial

quantity for the current operation and thus for the active output batch.

The  following  performance  as  regards  the  entry  of  quantities  results  from  a  manual  partial

upload/confirmation:

  Scrap is only transferred to the active operation and not to the output batch

  Yield is accumulated on the current output batch



In  this  case,  log  records  of  the  record  type  “H“  are  also  generated  when  the  shift  changes,

provided that yield has been recorded beforehand.



In case yield has already been recorded as partial quantity for an output batch, it is no longer

possible to log the batch off as scrap, when the output batch is changed the next time. In this

case,  the  batch  assigned  to  the  “yield”  class  has  first  to  be  completed,  before  scrap  can  be

posted.

Effects on available retrograde material components are as follows:

  When a total quantity is recorded, scrap is not deducted in a retrograde manner

  When yield/scrap is recorded, withdrawal also takes place when it comes to scrap

  Negative values, which might result from quantity offsetting, are not considered

The following notes and restrictions are to be taken into account:

  Personal partial uploads (with P_AB) are not taken into account

  Scrap  quantities  are  only  uploaded  to  a  PPS  system,  provided  that  the  interface  has  been

configured for the “upload of partial confirmations”

  At the moment it is only supported to post quantities of the “yield” and “scrap” accounts.

AIP-MTR_81.docx

Page 32 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

  The partial upload itself does not trigger a goods movement. This is only the case, when the

output batch has been completed.

  The checks relating to the input quantity and the display within the consumption balance cannot

be used together with the "collect input quantity in relation to batches" configuration within the

material type, as the current output batch is not completed for partial quantities. This affects,

among other things, the collection of serial numbers with batches (MPL-SNR).

4.6  Display of produced output batches

Using the third list, it is possible to display the output batches produced for a running operation that is

subject to batch management within the machine master at the terminal.

A  maximum  number  of  20  output  batches  is  displayed  for  each  machine  in  the  list.  Yield  and  scrap

batches are shown, which have been produced at this terminal since output batches were changed.

As this list is only kept locally by the respective terminal, it is not synchronized with the server, when

AIP is started.

The list includes, among others, the article, article designation, batch number, date, time, quantity, batch

class, user fields and alternative batch numbers. Individual fields might not be assigned values, which

depends on the input scenario when generating output batches.

Configuration:

List contents can be configured via the [ MNR_AMAT.LST ] section in the ctaiplay.ini file.

Example:

CTAIPLAY.INI

[ MNR_AMAT.LST ]
GRID_FONT=Arial
GRID_FONTSIZE=9
GRID_COLOR=clBlack
GRID_BACKGROUND=clWhite
GRID_ORDER=ROW.IDX=-
GRID_CAPTION=produced output batches

EXAMINE_SCANEXPR1=KLASSE=G
EXAMINE_SCANCOLOR1=clGreen
EXAMINE_SCANEXPR2=KLASSE=A
EXAMINE_SCANCOLOR2=clRed

; ROW.IDX=N10,50,R,Row

AIP-MTR_81.docx

Page 33 of 59

01.09.20

Collection  /  Information  Functions  for  Material,

ERP Batches, MES Batches

CNR=C20,150,L,batch number
;CNR=*CNR,batch
ATK=C25,125,L,article
; ATK=*ATK
; KLASSE=C3,40,Z,*
MENGE=N12.0,70,R,quantity
EINH=C3,30,Z,ME
DAT=dd.mm.yyyy,70,L,date
ZEI=hh:mm:ss,60,L,time
ATKBEZ=C30,200,L,article designation

Display as third list:

Figure: Display of produced output batches

Using the

 button, the user can switch to the display of output batches.

Server-based comparison of produced output batches

As of the AIP  program version  V# 2.0.2.54 the  list of produced  output  batches  of a machine can be

synchronized with the server using a cyclic comparison function.

The server comparison [Technically: PDM list 13 with MOD=P] is enabled by the configuration within

the customized configuration file ”ctlisten.ini“.

Output batches recorded within the last three days at this terminal are only compared.

4.7  Batch information

Batch information is displayed in a dialog, when the “batch info” button is clicked.

4.8  Display of consumption balance

When logging an OP off, the “consumption balance” (V_BLZ dialog) may be displayed, which has to be

configured via the machine and the material type of the operation.

The consumption balance is shown, provided that this option has been activated at the machine and

material type.

AIP-MTR_81.docx

Page 34 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

The consumption balance shows the material consumption based on batches and the user is able to

log running batches off.

Figure: Consumption balance – V_BLZ

Configuration:

A special configuration (function = “DLG=V_BLZ;BREAK-ON-CANCEL“) has to be defined for the OK

button of the logoff dialog (e.g. A_AB_MPL) to make sure that the consumption balance is started, when

the OP is logged off.

Sample configuration of the OK button for starting the consumption balance:

Figure: Example for the OK button configuration including consumption balance

Display of consumption postings

The “show details” function allows for the consumption quantities, which have been collected so far, to

be displayed.

Figure: Display of consumption quantities – V_BLZ_DTL

Logging input batches off

By way of the “log batch off” function, the user can choose a currently running batch from the list and

log it off by entering the consumption.

Figure: Log batch off – V_BLZ_CEAB

4.9  Advance logon of input batches

AIP-MTR_81.docx

Page 35 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

The AIP terminal provides the following dialogs or functions to log input batches on in advance. The

function “advance logon of input batches” has been designed to be able to “set up” and log on the next

input batch,  while another OP and input  batch  are currently running. This next input  batch  is not  yet

active but assigned the flag “logged on in advance”.

An input batch can be logged on in advance for a currently running OP or for a prepared OP.

General

Usage

The  process  might  require  an  input  batch  to  be  logged  on  in  advance  and  set  up  accordingly  on  a

machine, while the preceding input batch is still being used for a material.

This situation frequently occurs at very large machines processing, for example, roles or belts that are

uncoiled as input batch at the beginning of the machine and coiled up as output batch at the end of the

machine.

As the users are mostly busy with activities at the end of the machine at the time when the input batch

actually needs to be changed, they cannot perform the input batch change and, as a result, they are

provided with the opportunity to log the next input batch on already in advance for an order/OP.

Then the input batch can actually be changed by logging a new OP on or a project-specific call can be

established.

Configuration

The settings required for using the function “advance logon of input batches” is described here.

Process/procedure

The procedure for using the function “advance logon of input batches“ or the logical process is described

here.

AIP usage

AIP basic screen

The basic AIP screen shows the function key “Advance logon of input batch” (preregistration of input

batch). The dialog for logging input batches on in advance may be used by clicking this function key.

AIP-MTR_81.docx

Page 36 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

Advance logon of input batches (CE_VWL_MPL)

The user selects the workplace to which an input batch is to be logged on in advance in the basic screen.

The below dialog (CE_VWL_MPL) opens by clicking the function key ”Advance logon of input batch”

(preregistration of input batch).

If an operation is currently running/logged on to the workplace, this one will be selected by default. The

input batch (that is to be logged on in advance) is entered/scanned for the selected BOM item. Advance

logon of input batches is started by clicking the button “post batch”.

At first the input batch is checked for validity (dialog CE_VAN). The material number of the input batch

is checked against the material number of the component list or the BOM item. The input batch is logged

on in advance, once the button “log input batch on in advance” has been clicked.

Finally, the input batch that has been logged on in advance is displayed in purple in the BOM of the

component. The dialog is exited by the “cancel” key.

Show third list

Besides the logged on/running input batches, the third list of the basic screen also shows the input batch

that has been logged on in advance and highlights it in purple.

Consequently, a BOM item can use a logged on/running input batch and an input batch logged on in

advance at the same time.

Log off batch logged on in advance

The dialog “advance logon of input batches“ also provides the opportunity to log off or reset an input

batch that has been logged on in advance.

To  do  so,  the  input  batch  that  has  been  logged  on  in  advance  is  selected  once  more  and  the  user

confirms the button “post batch“.

The input batch is logged off by the dialog CE_VAB.

AIP-MTR_81.docx

Page 37 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

Log on input batch logged on in advance with OP

When logging a prepared operation on, an input batch that already has been logged on in advance is

shown for a BOM item. The input batch that has been logged on in advance is logged on automatically

by logging the operation on.

If, however, another input batch is logged on for this BOM item, the input batch logged on in advance is

kept for the running OP.

When an OP  is logged off/interrupted, all input batches logged on in advance are also logged

off/reset automatically.

4.10  Recording of serial numbers

Serial  numbers  are  assigned  to  be  able  to  distinguish  between  individual  items  of  material.

Consequently, the combination of material number and serial number uniquely identifies an individual

item.

MES provides several variants including different features to record serial numbers:

  Variant 1: Entry of serial numbers for OPs that are not subject to batch management (dialog

A_SNR/“E“ only)

  Variant  2:  Entry  of  serial  numbers  for  OPs  that  are  subject  to  batch  management  (dialog

A_SNR)

o  Manual input of the serial number. It is assigned to a HYDRA batch number.

o  Automatic assignment of the serial number = HYDRA batch number

o  Automatic assignment of the serial number. It is assigned to a HYDRA batch number

AIP-MTR_81.docx

Page 38 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

4.10.1  Entry of serial number for OPs that are not subject to

batch management (dialog A_SNR/ “E“)

General/utilization

Serial numbers are assigned in ERP when creating a production order. The assigned serial numbers

are transferred as detailed information for the order header where they are managed accordingly in the

interface to HYDRA.

The  OP  of  the  order  that  is  not  subject  to  batch  management  is  logged  on  and  the  relevant  serial

numbers are recorded with the relevant quality (yield/scrap).

The serial number is entered manually (e.g. also barcode for the individual item) by the user on AIP. To

simplify data collection, the serial numbers that are still available for the order are shown in a list where

they can be selected. Please note that a serial number can occur as scrap only once.

The  quantity  recorded  for  the  order/OP  is  always  1  for  each  individual  item  and  is  posted  onto  the

relevant yield or scrap account of the order/OP subject to the quality.

Uploads  (goods  movements)  relating  to  serial  numbers  can  be  transferred  to  the  ERP  system  for

recorded serial numbers/individual items.

Configuration

The required settings for using the function “collection of serial numbers” (without orders that are subject

to management in batches) are described here.

Procedure

The procedure for using the function “collection of serial numbers” (without orders that are subject to

management in batches) or the logical process are described here.

Utilization with AIP

Basic AIP screen

The operator uses the dialog “serial numbers” (A_SNR). The relevant function key is configured in the

basic view of AIP.

AIP-MTR_81.docx

Page 39 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

Figure: Basic view including function key “serial number“ (A_SNR)

Entry of serial numbers (A_SNR )

Figure: Entry of serial numbers on the terminal (A_SNR/ “E“)

AIP-MTR_81.docx

Page 40 of 59

01.09.20

ERP Batches, MES Batches

Serial number

Collection  /  Information  Functions  for  Material,

The user enters the serial number. The serial number has to be part of the order. A validation check

takes place. If the serial number is not part of the order or if it already has a result (already recorded) it

cannot be used.

By clicking

, a selection list showing the “free“ serial numbers for the order is displayed.

Requesting the selection list simultaneously updates the list of serial numbers that have already been

recorded.

Grid

The  displayed  list  shows  all  serial  numbers  that  have  already  been  entered  including  their  relevant

quality (yield/scrap).

  Scrap is shown red

  Yield is shown green

Quality

If a serial number is entered, it has to be assigned quality. The following can be chosen:

  Yield

The serial number is entered with the quality “yield”. The operation quantity is increased by yield

= 1. The default value is “yield”.

  Scrap

The serial number is entered  with the  quality “scrap”. The operation quantity  is increased by

scrap quantity = 1.

  Scrap reason

If the quality is entered as scrap the user also has to enter or select a scrap reason.

“Capture“ function

By clicking this function, the entered serial number is recorded with the selected quality.

“List“ function

AIP-MTR_81.docx

Page 41 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

By clicking this function, the entire list of serial numbers that have already been entered including the

selected quality can be updated (e.g. if the dialog is opened anew).

Interrupt/finish OP for orders with serial numbers (A_UN/ A_AB)

Quantities are not entered when operations subject to management in serial numbers are logged off.

The quantity fields have to be disabled in these dialogs.

4.10.2  Entry of serial numbers for OPs subject to

management in batches (dialog A_SNR)

General/utilization

If an order/operation subject to management in batches is used to enter serial numbers, there are the

following alternatives to enter or assign the serial numbers for data collection:

o  Manual input of the serial number. It is assigned to a HYDRA batch number.

o  Automatic assignment of the serial number = HYDRA batch number

o  Automatic assignment of the serial number. It is assigned a HYDRA batch number

Configuration

The required settings to use the function “collection of serial numbers” (without orders that are subject

to management in batches) are described here.

Procedure

The  procedure  to  be  able  to  use  the  function  “collection  of  serial  numbers”  (without  orders  that  are

subject to management in batches) or the logical process are described here.

AIP usage

Entry of serial numbers (A_SNR ) including manual assignment of serial

numbers – characteristic “E“

If batch management requirement is enabled for the operation, a batch is created additionally for each

serial number in the material and production logistic.

AIP-MTR_81.docx

Page 42 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

Consequently,  the  relation  between  the  current  output  batch  and  the  serial  number  posted  in  the

database are saved for tracing. In this case, the output batch is considered as ID without quantity and,

as a result, it does not have a quantity.

Batch attributes that might be required to be recorded for OPs handled in batches are recorded by way

of the commonly used standard dialog before sending.

The “collection of serial numbers“ dialog is structured as described below. The serial number can be

entered. Batch assignment is performed in the background.

Entry of serial numbers (A_SNR ) including automatic assignment of

serial numbers – characteristic “G“

By using the option “serial number requirement” = “G” for the operation, output batches are entered as

serial number. In this case, the serial number is the output batch number.

The field “serial number“ is disabled and includes the current output batch. Posting is possible, once the

badge  number  has  been  entered  by  the  function  “capture”.  An  applicable  scrap  reason  has  to  be

entered, provided that a “quality indicator” unequal to “yield” has been chosen.

Exactly one batch with quantity 1 is created for each serial number and the serial number matches the

batch number in this case.

The function “list“ updates the list of serial numbers that have already been recorded.

Batch attributes that might be required to be entered for OPs handled in batches are recorded by the

common standard dialog before sending.

Entry of serial numbers (A_SNR) including automatic assignment of

serial numbers by the number range - characteristic - ”S“

Serial numbers in relation to a batch are recorded by the option “serial number requirement” = “S” at the

operation. For this purpose, the operation needs to be subject to batch management. An output batch

change (CA_WL) is triggered every time a serial number is posted. This output batch change creates a

batch with quantity 1 for the serial number in MPL.

AIP-MTR_81.docx

Page 43 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

By clicking the function

a new serial number is determined on the server and shown in the field

“serial number”. The new serial number is assigned uniquely for the entire system by the number range

SNR.

Batch attributes that might be required to be entered for OPs handled in batches are recorded by using

the standard dialog before sending.

Interrupt/finish operation for orders including serial number tracking

Quantities are not entered when operations subject to management in serial numbers are logged off.

The quantity fields are to be disabled in these dialogs.

AIP-MTR_81.docx

Page 44 of 59

01.09.20

ERP Batches, MES Batches

5  Barcode Input with Prefix

Collection  /  Information  Functions  for  Material,

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

AIP-MTR_81.docx

Page 45 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

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

In case barcodes are required, which actually have a dot at the third place (e.g. if the machine/workplace

number has a dot as third character), it is possible to define an alternative indicator for barcode prefixes

in the HyTnrCfg.ini terminal configuration, e.g.

[Terminal->USR 0]

BarcodePrefixChar=$

If another prefix is actually required, the respective barcode font in use must be able to represent

this prefix.

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

AIP-MTR_81.docx

Page 46 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

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

AIP-MTR_81.docx

Page 47 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

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

AIP-MTR_81.docx

Page 48 of 59

01.09.20

ERP Batches, MES Batches

Collection  /  Information  Functions  for  Material,

Prefix

50.

Barcode

*50.1337*

Raw data

KNR = 1337

5.1  Configuration of customized barcode prefixes

The barcode prefixes 90...99 can be assigned here according to
the customer's requirements. This means, if a barcode with the
relevant prefix is used, it will be transferred to the dialog along
with  the  assigned  ID.  Then  the  barcode  has  the  following
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

AIP-MTR_81.docx

Page 49 of 59

01.09.20

Collection / Information Functions for Material, ERP Batches, MES Batches

AIP-MTR_81.docx

Version: 1.0.23049

Page 50 of 59

Collection / Information Functions for Material, ERP Batches, MES Batches

6  Local Configuration File ctaip.ini

The most important hardware and system settings are defined for each terminal in the CTAIP.INI file of the

c:\ctaip directory.

Changes  to  the  configuration  file  ctaip.ini  are  only  enabled  after  rebooting  the  terminal

software.

6.1  Basic configuration

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
-> DOS notation, the drive is the local drive of the server on which
HYDRA or xMES is installed
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

AIP-MTR_81.docx

Version: 1.0.23049

Page 51 of 59

Collection / Information Functions for Material, ERP Batches, MES Batches

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
 If digital inputs are also to
be used with MSS1, configuration should be changed as follows:

ZAEHLER=|1|2|3|4|
IN=|5|6|7|8|

Assignment  of  physical  MSS  inputs  to  logical  inputs  as  per
configuration:
The ninth connector (labeled “8” on the MSS) corresponds to the
logical input no. 1

For batch recording:
Inputs for automatic batch changes
In this case, the connectors 5 and 6 are the inputs for the automatic
batch change.

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
“production“ status and the workplace from being set to status 999.
ON is set by default
In case WochenEnde_ProdCheck=OFF, the automatism switches
to status 999.

AIP-MTR_81.docx

Version: 1.0.23049

Page 52 of 59

Collection / Information Functions for Material, ERP Batches, MES Batches

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
The option "SearchParts=On" is recommended for programs such
as MSWord that change the title bar subject to the document that
is currently being loaded.

ProgFileName=c:\Programme\wi
ncmd\Wincmd32.exe

The program that is started if the program mentioned above cannot
be called to the foreground.

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
If this entry is set the number may only be entered using a scanner.
If this entry is set the badge number may only be entered using a
scanner.
This field specifies which acronym is entered into the tool number
field by the scanner.

AIP-MTR_81.docx

Version: 1.0.23049

Page 53 of 59

Collection / Information Functions for Material, ERP Batches, MES Batches

Entry

Comment

BarcodeNest=

BarcodeNumm=

This  field  specifies  which  acronym  is  entered  into  the  cavity
number field by the scanner.
This field specifies which acronym is entered into the number field
by the scanner.

AIP-MTR_81.docx

Version: 1.0.23049

Page 54 of 59

Collection / Information Functions for Material, ERP Batches, MES Batches

7  Central Configuration File hytnrcfg.ini

This file includes different configurations for all or single terminals at a central place.

Each section is available in a generally accepted version

[section 0].

However,  entries  included  in  this  section  can  be  overwritten  by  entries  in  a  terminal-specific  section

[section <TNR-USER>]

 <TNR-USER> = HydraUser = Terminal number + 2000 e.g. 2010,2101,..) for exactly one terminal/HYDRA

User

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

If this is set to "off" fonts will not be installed
during
restart.
the
ON=DEFAULT

“InstallFonts=on”:
If  true  then  fonts  will  only  be  installed
directly after a download. If false then fonts
will  be  installed  every  time  the  terminal  is
restarted.
(false = DEFAULT)

If “off” the LPT driver "tvicport.sys" will not
be installed. It is required for HYDRA-ZKS.
ON = DEFAULT

AIP-MTR_81.docx

Version: 1.0.23049

Page 55 of 59

Collection / Information Functions for Material, ERP Batches, MES Batches

AttachedApplication=First

HTTPBrowser=standard

SupressErrorMessage=70012

[SignatureRecording->User 0]

ManualBadgeInput=true

Transparency=255

This configuration checks whether or not an
application  is  connected  in  Windows  that
matches the file extension of the document
to be  displayed from the OP info dialog. If
there is such an application, it will be used
for displaying the document.
If there is no connection, viewers configured
in  ctaip.ini  (  [ext.  software])  and  internal
viewers will be used. In case, an extension
is  completely  unknown  it  is  attempted  to
display it as text
Different settings may be configured:

First    search  for  connected  application
first

AfterUserViewer    If  a  UserViewer  is
configured this one overrides the connected
application  (also  applies  for  ExcelViewer,
WordViewer and PowerpointViewer)

Last    Only  if  no  ctaip.ini  assignment  is
found  for  the  file  extension,  then  the
connected assignment will be searched for
(default).

Off    Connected  application  is  never
searched.

type  "http",

Viewing of documents (via OP info):
If documents are configured with a path of
file  will  not  be
the
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
the field "user" can be edited in the terminal
(by default: no editing)
true    activates  keyboard  input  for  the
"user" field in the terminal

The  signature  dialog  can  also  be
transparent.
255  Signature dialog is 0 % transparent
(not transparent)
1    Signature dialog is 99% transparent
(maximum transparency)
(Default = 155)
Available  as  of  CTAIP  (V#  2.0.2.25)  /
CTWIN (V# 7.2.5.99)

AIP-MTR_81.docx

Version: 1.0.23049

Page 56 of 59

ShowPosition=TR

USE_SERVICE_ACCOUNT=1

Collection / Information Functions for Material, ERP Batches, MES Batches

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

(default)  SSO:

0
use
ServiceAccount (requires the terminal to be
started with the "user" domain (SSO).
Please  note:  ServiceAccount=1  can  only
be used if all users are in the "root" domain.
SubDomain users are not supported.

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

AIP-MTR_81.docx

Version: 1.0.23049

Page 57 of 59

Collection / Information Functions for Material, ERP Batches, MES Batches

SIGNATURE_1_LOGON_TYPE=HYDRA

“” / Not set / “EMPTY”

There is also an alternative login procedure.

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

SUPPRESS-MAXIMUM-NUMBER-OF-
MACHINES-WARNING=ON

In case of an error in reading the clock (e.g. after coming
out  of  standby  mode),  this  configuration  makes  sure  that
the  time  is  accepted  without  having  to  confirm  a  dialog.
Afterwards the terminal time will be synchronized with the
server time using a PDM command.

As of ctaip V# 2.0.2.23
Prevents  the  warning  after  restarting  the  terminal  if  more
terminal
than  32  machines  are  assigned
(static/dynamic). (Default = OFF)

the

to

AIP-MTR_81.docx

Version: 1.0.23049

Page 58 of 59

Collection / Information Functions for Material, ERP Batches, MES Batches

Entry

NetRuntimeMode=2

Comment

As of ctaip V# 2.0.2.50:
Alternative calculation of the target quantity since logon:
The net run time is not calculated from the times when the
production lock is enabled (PSperre=green) but only from
the shift times less the shift breaks.
Consequently, it can also be displayed, even if the terminal
program has been restarted.

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

Reloads the order row for the configured <Events>, if it is
not available locally
 This option has been implemented to access order data
within the master data, e.g. when logging an order on.

COMPLETE-..-EVENT=< Events >

Explanation on the configuration of <Events>

COMPLETE-..-EVENT=#ALL#

COMPLETE-..-EVENT=A_AN|A_P_AN

 Using <#ALL#> the row (ANR/MNR) that is not available
is reloaded for any event.
  <A_AN|A_P_AN> restricts reloading of information to
the specified events. The ID <DLGFAM> is preferred to the
ID <DLG> in order to identify the <Event>.

AIP-MTR_81.docx

Version: 1.0.23049

Page 59 of 59

