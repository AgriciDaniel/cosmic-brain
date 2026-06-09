Manual

Advanced Configurations:
MES Terminal AIP
EAT-AIP 8.1

Version 1.4.5987

Last changed on: 24.02.2016

Advanced Configurations: MES Terminal AIP

Copyright

©Copyright 2016 Alle Rechte vorbehalten.

SAP® und R/3® sind eingetragene Warenzeichen der SAP AG.

WINDOWS® ist eingetragenes Warenzeichen von Microsoft Corporation.

MPDV® und HYDRA® sind eingetragene Warenzeichen der MPDV Mikrolab GmbH.

ORACLE® ist ein eingetragenes Warenzeichen der  ORACLE Corporation, Kalifornien, USA.

Weitergabe und Vervielfältigung  dieser Dokumentation  oder  von Teilen  daraus sind,  zu  welchem Zweck und in  welcher Form
auch immer, ohne die ausdrückliche schriftliche Genehmigung durch MPDV nicht gestattet.

EAT-AIP_81.docx

Page 2 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

Alle Rechte vorbehalten.

EAT-AIP_81.docx

Page 3 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

Contents

1  Extended Application Training: MES Terminal............................................. 6

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

4  Local Configuration File ctaip.ini ................................................................ 23

4.1  Basic configuration ............................................................................................ 23

5  Central Configuration File hytnrcfg.ini ........................................................ 27

5.1

Layout configuration .......................................................................................... 30

6  Local Configuration File ctaiplay.ini............................................................ 32

6.1  Formulas used in grid layout ............................................................................. 36

6.2  Translations in grid layout .................................................................................. 39

6.3  Configuration of basic screens .......................................................................... 39

6.3.1  Available fields for the dialog configuration of basic screens ................. 41

6.4

Integrate dynamic dialogs in information dialog ................................................. 43

6.5  TextViewer in dynamic dialogs .......................................................................... 44

7  Local Configuration File ctaipbut.ini ........................................................... 47

8  Barcode Input with Prefix ........................................................................... 53

8.1  Configuration of customized barcode prefixes ................................................... 57

9  Extended Application Configuration ........................................................... 59

9.1  Overview of INI configuration files ..................................................................... 59

EAT-AIP_81.docx

Page 4 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

9.2  General ............................................................................................................. 59

9.2.1

Identification of lists / elements at the terminal ....................................... 59

9.3  Modifications to ctaipbut.ini ............................................................................... 60

9.3.1  General ................................................................................................. 60

9.3.2  Modifications to the toolbar .................................................................... 60

9.3.3  Modifications to button labeling.............................................................. 61

9.3.4  Modifications to icons ............................................................................ 62

9.4  Modifications to ctaiplay.ini ................................................................................ 63

9.4.1  General ................................................................................................. 63

9.4.2

Inserting user fields in table ................................................................... 63

9.4.3  Change order of columns in AIP ............................................................ 64

9.4.4  Changing the height of AIP lists ............................................................. 65

9.5  Modifications to ctaip.ini .................................................................................... 66

9.5.1  General ................................................................................................. 66

9.5.2  Displaying the actual machine cycle in AIP ............................................ 66

9.5.3  Start Third-Party Application from AIP ................................................... 66

9.5.4  Remember staff badge number ............................................................. 67

9.6  Virtual keyboard ................................................................................................ 68

9.6.1  Change / hide virtual keyboard .............................................................. 68

9.7  Dynamic dialogs ................................................................................................ 69

9.7.1  Overview ............................................................................................... 69

9.7.2  AIP dialog types .................................................................................... 69

9.7.3  Dialogs for specific terminal groups ....................................................... 70

9.7.4  Hide fields (for specific terminal groups) ................................................ 71

9.7.5  Default assignment in dialog fields (for specific terminal groups) ........... 73

9.7.6  Change field name (for a specific terminal group) .................................. 75

9.7.7  Activate simplified dialogs...................................................................... 76

9.8  Customizing files ............................................................................................... 77

9.8.1  Terminal script files................................................................................ 77

EAT-AIP_81.docx

Page 5 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

1  Extended Application Training: MES Terminal

Purpose

The  configuration  options  described  in  this  function  package  enable  varied  modifications  to  dialogs,

dialog  fields,  formats,  buttons  of  the  HYDRA  shop  floor  program  AIP  (Acquisition  and  Information

Panel).

Implementation notes

The function package is used if you would like to change

·

the dialog structure

·  dialog fields, labeling and units

·  data types of dialogs including value ranges

·  buttons and labeling

·

the presentation of columns and if you would like to add further columns to lists

Integration

The AIP terminal provides various options to change dialogs. Changes are either carried out directly at

the  shop  floor  client  or  in  the  dynamic  dialog  configuration  of  the  MOC  if  the  presentation  of  input

dialogs should be changed.

Features

·  General terminal configurations

·  Configuration of grid layout

·  Button configuration (basic screen)

·  Configurations for the virtual keyboard

·  Configurations for barcode input

·  Dynamic dialog configuration for input fields and dialog buttons

EAT-AIP_81.docx

Page 6 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

2  Operation of AIP

2.1  Special control and display elements within AIP

Tables

Tables  are  displayed  in  a  uniform  way  within  AIP.  This  affects  the  basic  display  (workplaces,

operations, …) as well as the selection lists of posting dialogs.

  Provided  that  information  is  available  for  more  than  one  page,  the  page

numbers  are  displayed  below  the  table.  The  current  page  is  highlighted  in  bold  letters.  By

clicking/touching the user can directly switch to another page.

An  operation  may  be  selected  using  the  mouse,  touch  screen,  keyboard  (arrow  keys:'á'  or  'â'),

scanner or by entering it manually.

The  content  of tables  or  lists  depends  on  the  respective  context.  Please  find  the following  example:

When  an  operation  is  logged  on,  those  operations  may  be  selected  that  are  included  in  the

sequencing  list  or  that  are  planned  for  the  corresponding  workplace  or  group.  However,  when

operations are interrupted, only running operations may be selected.

 Scrolling page by page (up or down) in the table.

  Scrolling  to  the left  or right.  Only those  buttons  are  activated  that  are  reasonable  for the

current situation. This figure shows that scrolling to the left has been deactivated.

EAT-AIP_81.docx

Page 7 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

A  “table filter” may  optionally  be  displayed  (customizing).  This  is  an  automatic filter that,  once it  has

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

EAT-AIP_81.docx

Page 8 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

Date display

AIP supports a country-specific date format in dynamic dialogs. This can be configured in the "control

panel",  "regional  settings",  "short  date"  dialog  of the  terminal/PC. The following  has  to  be  taken  into

account in this context:

·  Years are always four characters long.

·  Months and days are always 2 characters long.

·

“-“, “/“ and “.“ are allowed separators

·  Blanks must not be included in the “short date” format, i.e. the <BLANK> separator is not allowed.

·  The date separator “.” (dot) is only allowed in connection with the DD.MM.YYYY format.

·  The date format, which might possibly be configured in dynamic dialogs, is ignored.

Examples

·  English(USA)
·  Danish
·  Customer-specific 1
·  Customer-specific 2
·  Customer-specific 3

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

navigated through the posting dialog step by step. This process is described by  way of the following

example (interrupt operation). The other dialogs can be operated in the same way.

The “interrupt operation” function is executed. This task is started by clicking the “interrupt operation”

function from the second toolbar:

EAT-AIP_81.docx

Page 9 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

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

EAT-AIP_81.docx

Page 10 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

The  next  view  can  be  opened  either  by  clicking  the  “next”  button  or  by  clicking  another  tab  (in  our

example: “select status” or “confirm”). Please note in this context, that no view can be skipped  when

the views are navigated bottom up (view 1 à view 2 à view 3). This means: if you are in the first view

(enter  quantities)  and  you  click  the  third  view  (confirm),  the  second  view  (select  status)  will  be

displayed first.

Vice  versa,  when  navigating  top  down  (e.g.  from  the  “confirm”  view  to  the  “enter  quantities”  view),

every view may  directly  be  opened  by  clicking  at it. In  this  case, views  are  actually  skipped.  But  the

“back” button also allows for the views to be opened one after the other (top down).

As long as the dialog has not been confirmed, entered data may be changed at any time by scrolling

back and forth.

The workplace status that is to be set, once the operation has been interrupted, is determined in the

second view “select status”. This status may be chosen from the displayed status list. This list can be

restricted  using  the  “filter”  field.  Once  the  required values  have  been  entered,  the  next  view  can  be

opened by clicking “next” (in our example it is the last view).

EAT-AIP_81.docx

Page 11 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

The partial dialog “confirm” shows a summary of all values entered so far in the dialog. Provided that

the  user  agrees  with  the  entered  data,  the  “interrupt  operation”  dialog  can  be  confirmed,  once  the

badge number has been entered. Then the dialog including the data is sent to the server and posted.

If  an  input  field  of  the  dialog  is  not  filled  out  properly  (e.g.  a  mandatory  field  is  empty)  the  field  is

highlighted in red in the corresponding view and focused to enable the user to directly correct the field

content.

If a workflow dialog is opened it may directly be exited by clicking the ESC button. This is also

the case, if the virtual keyboard is opened. Thus, the ESC button cannot be used to close the

virtual keyboard.

EAT-AIP_81.docx

Page 12 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

3  Basic AIP Display

à

In  general,  AIP  has  been  designed  for  entries  to  be  made  via  touch  screen.  The  corresponding

functions  can  be  started,  selected  or  executed  by  touching  the  buttons  within  the  touch  screen  or

using the displayed virtual keyboard. Selection lists are provided in many cases, as  an alternative to

manual entries. Required entries can easily be selected from these selection lists.

Barcodes can be imported/entered in the current dialog using barcode readers, handheld scanners, or

swipe  card  readers.  Subject  to  the  barcode  prefix,  certain  data  (e.g.  operation  data)  can  directly  be

assigned to the corresponding input field, without having to focus this input field explicitly.

It goes without saying that mouse and keyboard may also be used.

To  ensure  proper  processing  and  posting,  terminals  with  "MDE"  operation  mode  must not  be

switched off during times without shift.

3.1  Basic displays – header and footer

Header

The AIP logo is  displayed  top left  of  the  screen,  which may  be  exchanged  by  a customer logo  after

corresponding configuration.

Possible messages (e.g. if a dialog is opened for more than five minutes) are displayed to the right of

it.

A  separate  window  opens  to  display  error  messages  that  occur  during  data  collection  (e.g.  validity

checks).

EAT-AIP_81.docx

Page 13 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

Basic displays

A  maximum  of  16  workplaces  or  machines  can  be  assigned  to  the  AIP  terminal.  The  individual

workplaces  can  be  found  within  the  list  area  in  the  order  in  which  they  have  been  assigned  to  the

terminal in MOC.

As regards the basic display of the AIP terminal, the user can choose between a tabular view, field-

related view  and  an  icon view.  This  can  be  configured  within  the terminal  configuration  at the  client.

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

EAT-AIP_81.docx

Page 14 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

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

EAT-AIP_81.docx

Page 15 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

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

1  We talk of an MDE workplace if this workplace is assigned to a terminal, which runs in the “MDE” operation

mode. In any other case, it is an ADE workplace.

EAT-AIP_81.docx

Page 16 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

"Operations at workplace" table

The  second  table  shows  the  operations  that  are  currently logged  on  to  the  selected  workplace.  The

following columns are displayed:

Article

Article defined for the operation

Order and operation

Order number and operation number of the registered operation. Together they build the MES order

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

operation in the graphic planning board at the client. The note(s) is/are displayed by clicking the OP

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

EAT-AIP_81.docx

Page 17 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

·  Staff logged on to the currently selected workplace (BDE)

·  Resources logged on to the currently selected workplace (WRM)

·  Materials/input batches logged on to the currently selected workplace (MPL/TRT)

·  List of output batches produced in the currently selected operation (MPL/TRT)

The buttons below the third list (to the left) allow for switching between these lists.

Please note

The  registered  staff  displayed  in  the  third  list  correspond  to  the  list  of  the  dialog  “F5  registered

persons…”. Selecting a person in the third list does not affect selection of the operation in the list of

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

EAT-AIP_81.docx

Page 18 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

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

EAT-AIP_81.docx

Page 19 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

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

Displayed

partitioni

ng

=

M

TLG
DIV
M

*

é
ê
ë

TLG
DIV

OP
1

OP
1

+

TLG
DIV

OP

OP

ù
...
ú
û

+

2

2

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

The  largest  target  cycle  of  all  operations  running  at the machine is  always  displayed  in  the machine

overview at the terminal. If this OP is logged off the largest target cycle of the remaining OPs will be

displayed.

In  case  no  OP  is  logged  on,  the  target  cycle  from  the  machine  list  is  displayed.  Thus,  even  after  a

restart, the terminal may get the target cycle that applied at last.

The largest target cycle is also transferred to MDE for monitoring.

EAT-AIP_81.docx

Page 20 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

Comment 1, comment 2

These two fields show the user fields 53 and 54 (alphanumeric with 20 characters)  at the operation.

To  be  able  to  edit  these  fields,  a  corresponding  user  field  key  containing  these  two  fields  must  be

defined for the operation.

Target since logon

The  production  quantity  to  be  expected  since  the  OP  has  been  logged  on  (depending  on  the  cycle

time,  partitioning  and  the time in  which  the  production  lock  of  the machine  has  not  been  active).  No

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

EAT-AIP_81.docx

Page 21 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

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

By  clicking  the  “symbol”  button  (if configured)  the view  changes  from  the  “machine  overview”  to  the

“icon presentation of machines”.

EAT-AIP_81.docx

Page 22 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

4  Local Configuration File ctaip.ini

The most important hardware and system settings are defined for each terminal in the CTAIP.INI file of

the c:\ctaip directory.

Changes  to  the  configuration  file  ctaip.ini  are  only  enabled  after  rebooting  the  terminal

software.

4.1  Basic configuration

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

In  offline mode, the  interval  after  which  online  access  should  be
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

ON: Watchdog is activated
OFF: Watchdog is not activated

‘on’: Offline demo mode; always off in the production environment

The –t parameter switches off the virtual keyboard

Timeout for CONNECT to the server
If not specified, default = 10 seconds

à Increase to 20 seconds for routing

Timeout for SEND to the server
If not specified, default = 10 seconds

à Increase to 20 seconds for routing

EAT-AIP_81.docx

Page 23 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

Entry

Comment

TMOUT_R=xxx

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

Timeout for RECEIVE of the server
If not specified, default = 120 seconds

Timeout for FILESERVER operations to the server
If not specified, default = 10 seconds

à Increase to 20 seconds for routing

Configuration of customized barcode prefixes.

BarKenn90 > defines the prefix (here: 90); The ID from the dialog

(= acronym) is assigned.

Assignment of serial interfaces to the connected devices
MSS – machine interface
BAR, LEGIC, RFLESER – various reading devices

Assignment of physical inputs of the MSS (machine interface) to
logical counters (ZAEHLER) according to configuration:
The first  connector  (labeled  “0”  on  the  MSS)  corresponds  to  the
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

EAT-AIP_81.docx

Page 24 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

Entry

Comment

WochenEnde_ProdCheck=ON

This function prevents the  weekend automatic from affecting the
“production“  status  and  the  workplace  from  being  set  to  status
999.
ON is set by default
In
switches to status 999.

case  WochenEnde_ProdCheck=OFF,

the  automatism

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

Operation as interface IOPßàDOS terminal (standard)
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

Slow down, to make events “visible”

EAT-AIP_81.docx

Page 25 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

Entry

FieldWNRBarcodeOnly=Y

FieldNestBarcodeOnly=Y

FieldNummBarcodeOnly=Y

FieldKNRBarcodeOnly=Y

BarcodeWNR=

BarcodeNest=

BarcodeNumm=

Comment

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
This  field  specifies  which  acronym  is  entered  into  the  cavity
number field by the scanner.
This  field  specifies  which  acronym  is  entered  into  the  number
field by the scanner.

EAT-AIP_81.docx

Page 26 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

5  Central Configuration File hytnrcfg.ini

This file includes different configurations for all or single terminals at a central place.

Each section is available in a generally accepted version

[section 0].

However,  entries  included  in  this  section  can  be  overwritten  by  entries  in  a  terminal-specific  section

[section <TNR-USER>]

 <TNR-USER>  =  HydraUser  =  Terminal  number  +  2000  e.g.  2010,2101,..)  for  exactly  one

terminal/HYDRA User

The hytnrcfg.ini file is loaded from the server every time the terminal is started.

Section / Entry

Comment

ààà

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
restart.
installed
ON=DEFAULT

during

the

“InstallFonts=on”:
If  true  then  fonts  will  only  be  installed
directly after a download. If false then fonts
will  be  installed  every  time  the  terminal  is
restarted.
(false = DEFAULT)

If “off” the LPT driver "tvicport.sys"  will not
be installed. It is required for HYDRA-ZKS.
ON = DEFAULT

EAT-AIP_81.docx

Page 27 of 77

24.02.16

AttachedApplication=First

HTTPBrowser=standard

SupressErrorMessage=70012

[SignatureRecording->User 0]

ManualBadgeInput=true

Advanced Configurations: MES Terminal AIP

This  configuration  checks  whether  or  not
an  application  is  connected  in  Windows
that  matches  the  file  extension  of  the
document to be displayed from the OP info
dialog. If there is such an application, it will
be used for displaying the document.
is  no  connection,  viewers
If
configured  in  ctaip.ini  (à  [ext.  software])
and internal viewers  will be used. In case,
an  extension  is  completely  unknown  it  is
attempted to display it as text
Different settings may be configured:

there

First  à  search  for  connected  application
first

this

AfterUserViewer  à  If  a  UserViewer  is
configured
the
one
connected  application  (also  applies  for
ExcelViewer,
and
PowerpointViewer)

WordViewer

overrides

Last  à  Only  if  no  ctaip.ini  assignment  is
found  for  the  file  extension,  then  the
connected assignment will be searched for
(default).

type  "http",

Off  à  Connected  application  is  never
searched.
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
true  à  activates  keyboard  input  for  the
"user" field in the terminal

EAT-AIP_81.docx

Page 28 of 77

24.02.16

Transparency=255

ShowPosition=TR

USE_SERVICE_ACCOUNT=1

Advanced Configurations: MES Terminal AIP

is  0  %

The  signature  dialog  can  also  be
transparent.
255  à  Signature  dialog
transparent (not transparent)
1 à Signature dialog is 99% transparent
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

(default)  SSO:

0
use
ServiceAccount  (requires  the  terminal  to
be started with the "user" domain (SSO).
Please  note:  ServiceAccount=1  can  only
be  used  if  all  users  are  in  the  "root"
domain.  SubDomain  users  are  not
supported.

SIGNATURE_1_USER_TYPE=REPORTING_USER_READONLY  REPORTING_USER_READONLY

The  tab  identifying  users  via the Windows
user is activated and assigned to "user" by
default. The "user" field is read-only.
This requires, however, that in the HYDRA
HR  master  the  "SSO"  option  is  set  for  all
users  logging  in.  Otherwise,  successful
authentication is impossible.

REPORTING_USER_CHANGEABLE

The  tab  identifying  users  via the Windows
user is activated and assigned to "user" by
default. The "user" field can be modified.
This requires, however, that in the HYDRA
HR  master  the  "SSO"  option  is  set  for  all
users  logging  in.  Otherwise,  successful
authentication is impossible.

EAT-AIP_81.docx

Page 29 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

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

"SSO“ enabled à Windows only
"SSO“ disabled à HYDRA only

Identical
SIGNATURE_1_LOGON_TYPE
above)

to
(see

Used for signatures with the terminal in the
area of quality data collection.

SIGNATURE_2_LOGON_TYPE=HYDRA

ExtendedSignatureRecording=true

5.1  Layout configuration

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

In case of an error in reading the clock (e.g. after coming
out  of  standby  mode),  this  configuration  makes  sure  that
the  time  is  accepted  without  having  to  confirm  a  dialog.
Afterwards the terminal time will be synchronized with the
server time using a PDM command.

SUPPRESS-MAXIMUM-NUMBER-OF-
MACHINES-WARNING=ON

As of ctaip V# 2.0.2.23
Prevents  the  warning  after  restarting  the  terminal  if more

EAT-AIP_81.docx

Page 30 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

Entry

Comment

NetRuntimeMode=2

than  32  machines  are  assigned
(static/dynamic). (Default = OFF)

to

the

terminal

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

COMPLETE-..-EVENT=< Events >

COMPLETE-..-EVENT=#ALL#

COMPLETE-..-EVENT=A_AN|A_P_AN

Reloads the machine row for the configured <Events>, if
it is not available locally
=>  This  configuration  might  be  required/necessary  for  a
group workplace without machine assignment.

Reloads the order row for the configured <Events>, if it
is not available locally
è  This  option  has  been  implemented  to  access  order
data  within  the  master  data,  e.g.  when  logging  an  order
on.

Explanation on the configuration of <Events>
è  Using  <#ALL#>  the  row  (ANR/MNR)  that  is  not
available is reloaded for any event.
 è <A_AN|A_P_AN> restricts reloading of information to
the  specified  events.  The  ID  <DLGFAM>  is  preferred  to
the ID <DLG> in order to identify the <Event>.

EAT-AIP_81.docx

Page 31 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

6  Local Configuration File ctaiplay.ini

The layout is configured for specific terminals in the file ctaiplay.ini in the terminal directory c:\ctaip.

This file is basically used for the configuration of grids in AIP.

The server directory \hydra\ctnet\win\aip includes complete INI files pertaining to HYDRA

standard. Any deviations are developed in specific, customized directories e.g.

\hydra\1\custom\aip\tgrp_901.

The relevant, empty file (e.g. ctaiplay.ini) is created here. Modified sections are copied to

this file. Then configuration takes place in this file.

After restarting the terminal, files from the main directory \hydra\ctnet\win\aip are merged

with files from the customized directory \hydra\1\custom\aip\tgrp_901. Then the merged

file is transferred to the local terminal directory C:\aip.

Changes to the configuration file ctaiplay.ini will not take effect until the terminal software

has been restarted.

Entry

Section [OP info]
Deaktiviert=AG_Bmk,AG_Fort

Sortierung=AG_TechInfo,*

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

Sortierung=AG_Info,AG_AD_Satz,Text
File1,TextFile2,Bild1,*

Configuration of any texts and images that can be displayed in
the OP info dialog.

TextFile1=C:\LOGOPAK\druck.txt,druck
.txt

TextFile2=C:\LOGOPAK\druckerg.txt,dr
uckerg.txt

Bild1=C:\aip\spool\screen1.bmp
Section [main]
Nachkommastellen=0
Repaint_time=60

Decimal places for quantities in the order/machine overview
Cycle for updating the view (for machine list and machine info)

EAT-AIP_81.docx

Page 32 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

Entry

Comment

Buttonkonfigaktiv=0
layout=100
AuftragZusatzInfoFontSize=12
AuftragZusatzInfoFontName=Courier
New
PopupSize->EmptyQueue=300
PopupSize->ReloadPze=200
SymbolAdditionalInfo=MBEZK

SymbolSubstDesignation=MBEZK

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
[Eingangslosliste]

[Ausgangslosliste]
Syntax of table formatting
GRID_FONT=Arial
GRID_FONTSIZE=9
GRID_COLOR=clBlack
GRID_BACKGROUND=clWhite
GRID_FIXCOLS=0
GRID_ORDER=MSZEIB
GRID_ORDER=MSZEIB=-

GRID_FILTER=MGRP=0

GRID_LIST_TYP=MNR
GRID_LIST_TYP=ANR

Reserved
Reserved
Font size of texts in the "OP info" dialog
Font type of texts in the "OP info" dialog

Empty popup window size for quick queue
Reload popup window size for PZE configuration
Display of any field from the machine list in the icon view
between machine number and operation number
The machine number is replaced by the configured field if lines
and aggregates are configured.
The specified field replaces the machine number in the icon
view.

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
Font color
Background color
Number of fixed columns
Sorting
Sorting in descending order
Please  note:  If  several  criteria  are  indicated  (separated  by  |)
only  the  first  criterion  can  be  sorted  in  descending  order.  All
other criteria are sorted in ascending order.
Table filtering
Please note: NOT supported for script dialogs.
The  list  type  of  the  section  is  indicated  with  this  entry,  if fields
are displayed that need to be loaded additionally.
This entry also enables the search when starting.
The entry has to be entered above the IDs to be reloaded!!!
All IDs that can be reloaded can be found in the file headers.txt
within  the  "spool“  directory  of  the  terminal.  It  consists  of  four
lines:

1.  Fields that are always included in the machine list
2.  Fields that can be reloaded for the machine list
3.  Fields that are always included in the order list
4.  Fields that can be reloaded for the order list

EAT-AIP_81.docx

Page 33 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

Entry

Comment

The machine groups 71/72/73 are presented in green font color;
the groups 96/97/101 are displayed in red font color.

The  font  color  switches  from  clWhite  to  clSilver  every  time  the
MGRP value changes
Up to 8 colors can be defined.

All lines  with  BATTRIB=1  are  shown  in  blue  background  color;
rows with BATTRIB=2 are displayed in lime.
Up to 8 colors each can be defined.

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
Decimal, 10 places, 2 decimal places, ..
Displayed in the form "23.03.98"          (left-aligned)
Displayed in the form "08:24"
Displayed in the form "23.03.1998"
Displayed in the form "08:24:39"
Displayed in industrial time unit " 22,982"
TESTHEADER: new column caption

Specification  of  a  column  that  includes  the  color  value  for  the
row (e.g.: 0-Black; 255-Red, 16777215-White)
Setting  of  the  background  color  depends  on  whether  the  field
value reaches different threshold values.

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

KOPIE=
MNR=
N8,120,R,
TITEL
The first three characters from MNR are output

           new identification
ID in data file
Formatting
column caption in table

The second part separated by „ ; “ is output.
Example: „ 12;20;130 “ è „20“

Conversion of a value
Syntax: see below

EAT-AIP_81.docx

Page 34 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

Entry

Comment

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

GRID_POSITION=ON

GRID_CELLPAINT=ON

EXAMINE_CELLBKCOLOR=WTK:STA
,WTK:STA,0-clGreen|1-clBlue|2-
clYellow|3-clRed

can also be used with index:
EXAMINE_CELLBKCOLOR1..8

As of 2.0.2.64:
EXAMINE_CELLBKCOLOR1..20

As of ctaip V# 2.0.2.17

EXAMINE_CELLBKCOLOR=DMY,COL
OR
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

Complex calculations relating to several fields
Syntax: see below

only the active row is colored yellow
Requirements for coloring rows column by column
Cycle  for  updating  the  display  [ms]  à  lists  are  not  reloaded
from the server!
Recommended  if  a  constantly  changing  value  is  calculated
using an ALIAS function.
Display of the grid position

Limited/no  support  when  scrolling  using  scroll  bars  and  page
scrolling
One single column is colored in every cell subject to a value.
1st value: ID of the column to be colored.
2nd value: ID of the reference column
3rd value: Configuration (color for possible values)

Please note:

-  The  reference  column  MUST  be  shown  in  the  list,  if

required with length 0

-  The  values  are  converted  into  capital  letters  when  being

compared.

Take over the color directly from the "color" column.
The column <DMY> is shown in the color defined in the column
<COLOR>

Filling  of  a  virtual  "Case"  column  with  values  from  different
columns subject to the value of a reference column.

1st value:

Identification of the virtual "case" column

2nd value:

Identification of the reference column

3rd value:

Configuration
Reference value + ‚=’ + display column

Please  note:  the  virtual  "case"  column  needs  to  be  configured
as follows
<Identifier>=<Key word>,<Width>,<Alignment>,<Caption>
e.g.

CV1=CELLVALUE,150,Z,YST

EAT-AIP_81.docx

Page 35 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

Comment

This options randomly sorts the list.
Please  note:  If  this  option  is  active,  any  configured  sorting  will
be ignored.
This option copies data from a table/grid into the clipboard.

Activation of the calculation & display of the remaining run time

Activation  of  the  calculation  &  display  for  target  quantity
reached (column 'S‘: '*‘ if reached)

Activation  of  the  calculation  &  display  of  the  produced  pieces
per minute

Configuration of the PZE terminal

"Kundenbitmap=<File name>“ file with customer logo
When restarting the terminal, this file is copied from the server
directory ".\ctnet\win\aip\etc\“ into the application directory
".\etc\“.

"DienstGangTaste=1,3“ à Default [ empty ]
By entering the function key numbers (1...4), a check specifying
if the person is allowed to go on a business trip/ business
errand is performed during posting.

Configuration of the used font types/font sizes as well as the
layout of the date and time display.

Entry

GRID_RANDOMSORT=ON

GRID_CLIPBOARD=<BUTTON>@<SE
LECT>@<DATA>
Special entries
[Auftragsliste]
ALIAS Restlaufzeit=RLZ=
                 C4,44,R,RLZ
ALIAS SollErreicht=ZBV1=
                 C1,12,R,S
[Maschinenliste]
ALIAS StkProMin=IZYSM=
              N8,48,R,Stk/min
[layout pze]

KundenBitmap=kunde.bmp

DienstGangTaste=1,3

StdSchrift=Arial
StdDateSize=30
StdStatusSize=26
StdSpdBttnSize=16
InfoSchrift=Courier New
InfoSchriftSize=20
SmallStatusFontSize=16
DateTimeLayout=dd.mm.yyy hh:mm:ss

6.1  Formulas used in grid layout

Simple conversion of a value
Syntax:

 ALIAS <Alias>=(<formula>)=formatting

  <formula>: [1/]<KENN>[<Operator><Value2>]

    <KENN>: ID from list (The current value from the list is entered here

            in the formula)

<Operator>: + | - | * | / | ^

  <Value2>: 2nd Operand

EAT-AIP_81.docx

Page 36 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

Extensive formulas:
Formulas that can also relate to several table fields can be recognized by curly braces.

 Syntax: ALIAS <Alias>={<Formula>}
 <Formula>: (<Operand1>[<Operator><Operand2>])
 <Operand>: <Value> / <Function> / <Formula> / |ID|
<Operator>: |+|-|*|/|^|
   <Value>: Constant ('0'..'9','e','E','.','-')
    |Kenn|: reads a value from the table
<Function>: _<Fname>(<Operand>[,<Operand>[,...]])
           _DATETIME(<Date>,<Time>)

 <Date>: mm/dd/yyyy
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

EAT-AIP_81.docx

Page 37 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

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
    <Comp>: Limiting characters (<,>,<=,>=)
    <Val1>: Limit value (integer or Real or ID
            of a reference value for comparison purposes)
            alternative: (Akro) – column of limit value
    <Col1>: Color (Delphi name)

Threshold  values  are  searched  from  the  left  to  the  right.  If  a  "<“  or  a  "<=“  –  criterion  is  met,  the

corresponding color is  set and the evaluation/report is finished. If a ">“ or ">=“ criterion is met, it will

first be checked whether or not the condition that follows is also met.

The direct comparison with "=“ is not allowed. But the same function can be achieved by processing

the comparisons relating to "<“..„<=“ or „>“…“>=“.

An  identification  put  in  parentheses  may  also  be  indicated  instead  of  the  limit  value.  During  the

comparison, the current field content including the specified ID is read out from the same row as the

limit value.

All three fields (field to be colored, reference field and limit value field, if required) are to be configured

as fields to be displayed. The field width can be set to zero if one of these fields should not be visible.

The color value clWhite may be entered to prevent sections from being colored.

The values  are  compared  as  they  are  displayed.  The  actual values  0.5  and  1  are  considered  being

equal if displayed values are to be rounded to integer values.

Coloring of the field only works if the option "GRID_CELLPAINT=ON“ is set.

The  option  "GRID_BROWSEROW=0“  should  also  be  set  in  order  for  the  coloring  to  be  recognized

even if the row is selected.

Examples:
EXAMINE_CELLBKLEVEL1=MNR,MST,<=1*clLime|<=2*clYellow|>2*clRed
EXAMINE_CELLBKLEVEL2=FS,FS,<90*clLime|>=90*clYellow|>=100*clRed

EAT-AIP_81.docx

Page 38 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

EXAMINE_CELLBKLEVEL3=EGR:GUT,EGR:GUT,<(SGR:GUT)*clLime|>=(SGR:GUT)*clYellow

6.2  Translations in grid layout

Column contents can be configured to be translated and displayed by entering e.g. the configuration

<XYZ=T10,100,L> instead of < XYZ=C10,100,L> in the configured grid columns. A <#> character has

to be prefixed for these "resource strings" to provide for better classification. This modification can be

used in every INI file (hytnrcfg.ini,..) where grid layouts are configured.

Please note: The data do not include any translated values. In order for them to be displayed in e.g.

dynamic  dialog  fields,  an  explicit  translation  has  to  be  performed  using  the  VB  script  function  <

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

Please note: The data do not include any translated values. In order for them to be displayed in e.g.

dynamic  dialog  fields,  an  explicit  translation  has  to  be  performed  using  the  VB  script  function

vbsTranslateDataFields( “<columns>“ , “<data row>“ ) >.

6.3  Configuration of basic screens

The dialogs/screens are configured using dynamic dialogs. For this reason, the following dialogs are

always required:

EAT-AIP_81.docx

Page 39 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

MMINFO à Section referring to machines in the single machine view

MAINFO à Section referring to orders in the single machine view

MINFO à Description of the machine information

EAT-AIP_81.docx

Page 40 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

AINFO à Description of the order information

The  heights  of  the  individual  components  of  the  basic  dialogs  and,  as  a  result,  the  positions  of  the

button bar are configured in the ctaiplay.ini file using the below-mentioned parameters:

Section [MainView1]

Configuration of the basic screen

MachineGridHeight=415
OrderGridHeight=500
ButtonBarHeight=50

Section [MainView2]

MachineGridHeight=50
MachineInfoHeight=415
OrderInfoHeight=355
ButtonBarHeight=50

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

6.3.1  Available fields for the dialog configuration of basic

screens

A script function that fills the fields according to the customer's requirements is currently not available

(14 September 2009).

In general, the fields of the machine list and the order list are available. "MNR." or "ANR." has to be

prefixed for identification purposes.

EAT-AIP_81.docx

Page 41 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

Known quantity fields are formatted to match the configured number of decimal places.

Some fields are calculated. The following fields are additionally available:

ID

Description

ANR.SOLL_SEIT

Target quantity since login

The  value  is  determined  locally  at  the  terminal.  This  is  only  useful  for  MDE

machines.  However,  the  order must  be  logged  on  locally  after  restarting  the

terminal.

ANR.ABWEICH

Deviation [%]

Comparison of "target quantity since logon" and "actual quantity since logon“

MNR.SZY

Target cycle

As  of  AIP  2.0.2.85:  Field  is  transferred  including  "internal  decimal  places".

The  number  of  characters  displayed  is  determined  by  the  field  of  the  dialog

configuration.

MDE.IZY

Actual cycle

The machine's current actual cycle - only if MDE processing is active for the

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

Placeholder for the production lock

(corresponds  to  the  configuration  "TNRPSPERRE=U1,150,L,Hinweis“  in

ctaiplay.ini)

(the value J/N from the list can be found in MNR.TNRPSPERRE)

EAT-AIP_81.docx

Page 42 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

6.4

Integrate dynamic dialogs in information dialog

Dynamic dialogs can be integrated in information dialogs. The toolbar of the information dialog is then

shown below the toolbar of the dialog:

Definition of a dialog for the machine info (ctaiplay.ini):

[M-Info]

;;Dialog<n>=<DLG>,<Tab Caption>

Dialog1=WF_BDE_KOM_CHK,BDE comments

Sortierung=Dialog1,*

Up to 10 dialogs can be configured (Dialog1...Dialog10). The entry "Sortierung=...“ causes the tab with

the new dialog to be put at the beginning.

Configuration of the toolbar of the info dialog for the dialog (ctaipbut.ini):

[M_INFO.DIALOG1-Page1]

1=MI_CLOSE,L,close machine information

If  the  "cancel"  key  is  defined  in  the  dialog  as  described  in  the  above  example, it  will  have  no  effect

here.

EAT-AIP_81.docx

Page 43 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

It must be noted that the tabs are displayed over several rows if too many tabs have been inserted.

Consequently, the tabs are moved downwards. Relevant areas might reach beyond the display area.

To avoid this, the configurable caption texts of the tabs should be as short as possible.

6.4.1.1.1  Restrictions

A  dynamic  dialog  is  generated,  once  it  is  called.  Initially  selected  data  (machine  number,  order

number) are already available.

The  dialogs  integrated  in  the  information  dialogs  are  already  set  up  when  starting  the  application.

Consequently,  placeholders  included  in  text  fields  (e.g.  machine  <MNR>  <MBEZK>)  cannot  be

converted.  The  function  cannot  just  be  started  later,  as  the  placeholders  have  already  been

overwritten during initialization.

6.5  TextViewer in dynamic dialogs

Dialog configuration:

"General" tab:

EAT-AIP_81.docx

Page 44 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

Positioning by field X,Y

Size by unit X,Y

"Format" tab: selection of "grid"

"Functions" tab:

The field attribute "TEXTVIEW“ defines the exact type of the "grid" pre-selection.

The field "dialog list function" includes the section of the ctaiplay.ini file in which further configurations

are defined.

Ctaiplay.ini:

EAT-AIP_81.docx

Page 45 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

[TV@BDEBEM]

CMD=DLG=LIST;61|MNR=<MNR>|ANR=<ANR>|

FILE=BdeBem.lst

TEXTFILE=BdeBem.txt

CONVERSION=BDEBEM

FONTNAME=Arial

FONTSIZE=10

CMD: Command for loading the list. The placeholders <ANR>, <MNR> are replaced by the current

values. The values must be available in the dialog and pre-assigned to default values.

FILE: This file is loaded by the above-mentioned command

TEXTFILE: This file is displayed

CONVERSION: Rule for the conversion from FILE to TEXTFILE (up to now BDEBEM available only).

The file is only copied if nothing is entered.

FONTNAME, FONTSIZE: configuration of the font in the TextViewer

EAT-AIP_81.docx

Page 46 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

7  Local Configuration File ctaipbut.ini

Buttons are configured for specific terminals in the file ctaipbut.ini in the terminal directory c:\ctaip.

The button pages of the main view and the OP info dialog may be configured in the configuration file

ctaipbut.ini.

The  server  directory  \hydra\ctnet\win\aip  includes  complete  INI  files  pertaining  to  the

HYDRA  standard.  Any  deviations  from  that  are  developed  in  specific,  customized

directories e.g. \hydra\1\custom\aip\tgrp_901.

The  relevant,  empty  file  (e.g.:  ctaipbut.ini)  is  created  here. All  sections  e.g.  [ANR-ALL-

Page1] are copied to this file. Then configuration takes place in this file.

After restarting the terminal, files from the main directory \hydra\ctnet\win\aip are merged

with files from the customized directory \hydra\1\custom\aip\tgrp_901. Then the merged

file is transferred to the local terminal directory C:\aip.

All sections including the string "page" are imported.

Entry

Definition of sections

[ LST-MODUS-PageX.]

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

EAT-AIP_81.docx

Page 47 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

Entry

Comment

Sample configuration

General structure:

[MNR-...-Page1]
1=A_AN, L, log OP on
2=BLANK, L
3=$MPL-PAL$PAL_AN,L,log
on,

pallet

4=%BART:PZE=J%PZE,R,PZE,PZE.
BMP

x=<Function>,<Alignment>,<ButtonName>,<Icon>

e.g.
1=A_AN,L,log OP on,AGAN.PNG

A_AN
L or R (from the first "R“ on always "R“)

- Function
- Alignment
- ButtonName  Log OP on
- Icon

optional icon name
(PNG, resolution 24x24 px)

Please note:
the  numbering  of
In  one  section
entries  has  to  be  consecutive  1...n.  A
gap
the
in  numbering
completion of a page!

indicates

Special functions:

$...$ (e.g. $MPL-PAL$ )
License check  fails
à Button is deleted

%...% (e.g. %BART:PZE=J% . )
Check field with value in (T)terminal(K)label
è only show if they match

BLANK
Insert distance between buttons

Configuration  of
wildcards

functions  using

x=A_AN*,L, log OP on

x=A_UN*,R, interrupt OP

The dialog to be opened is located as described below if buttons
are configured using wildcards
ID A_AN*
  - calling dialog: A_AN
    - Determination of the machine type
dialog
    -

based

the

the

on

Supplementing
 machine type

    -  Check whether or not the dialog is available
       if this is the case - calling dialog: A_AN_MPL
  - evaluation of the posting type (only with A_AN)
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

EAT-AIP_81.docx

Page 48 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

Comment

Block production status
Switching of the basic view:
List view ßà presentation of individual machines
Calling  up  icon  view  (only  possible  if  configured  in  the  machine
configuration)
Calling up the actual value view of PDV
Input of BDE comments
Log merged operation on
Calling up the DNC startup screen
Minimizing of the terminal program (as of V2.0.2.23) à Windows
7 requires the compatibility mode XP

User-defined buttons to show and start external software
The  programs  are  configured  in  ctaip.ini  within  the  section  [ext.
software]

Consequently,  the  relevant  info  dialog  including  the  selected
page is opened in the foreground (with focus). Switching to other
pages is allowed.
M_INFO  may  be  used  to  show  the  info  page  in  the  foreground
(with focus):

M_INFO=M_INFO.INFO

Consequently,  the  relevant  info  dialog  including  the  selected
page is opened in the foreground (with focus). Switching to other
pages is allowed.
A_INFO  may  be  used  to  show  the  information  page  in  the
foreground:

A_INFO= A_INFO.INFO

Direct  call  of  user-defined  pages  configured  in  ctaiplay.ini  in  the
section [OP info].
Example:
Dialog1=WF_BDE_KOM_LIST,BDE comments
à A_INFO.DIALOG1,L,BDE comments

Entry

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

EAT-AIP_81.docx

Page 49 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

Entry

Comment

info

of
tabs,

Configuration of a function
with different modes
Just as is the case for the
the
configuration
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

In the configured examples, the dialog < RES_WART > is called
with the below-mentioned modes.
1 < MNR >
2 < RES >
3 without mode

The values can be read out as follows in the terminal script.
VPar(“BTN.FKT“)
VPar(“BTN.FUNC“)
VPar(“BTN.MODE“)  Mode

Function + mode
Function

Available  button  sections  and
buttons  for  pages  of  the  OP  info
dialog:

[A_INFO-Page1]

[A_INFO.DOKU-Page1]
3=AI_VIEW,R,open document
4=AI_VIEW_CLOSE,R,close
document

Overview

Document view

Production resources and tools

Components

[A_INFO.HILF-Page1]

Resource performance accounts

[A_INFO.KOMP-Page1]

Progress bar

[A_INFO.BMK-Page1]

[A_INFO.FORT-Page1]

[A_INFO.NOTIZ]

Notes (as of ADE 7.3)

Configuration  of  a  default  page  (is  used  if  no  section  is  defined
for the tab).

[A_INFO.DEFAULT-Page1]

The IDs may also be used for the keys within the dynamic dialog
(field "function").

Recommended for all pages:
1=AI_CLOSE,L,close
information

OP

EAT-AIP_81.docx

Page 50 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

Entry

Comment

Available  button  sections  and
buttons  for  pages  of  the  machine
info dialog:

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

Configuration  of  a  default  page  (is  used  if  no  section  is  defined
for the tab).

For all pages:
1=MI_CLOSE,L,close machine
information

EAT-AIP_81.docx

Page 51 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

Entry

Definition of sections
[ ButtonPanel ]

functionkey_visible=on

radiobuttonkey_visible=on

Comment

General  section  for  the  configuration  of  global  settings  for
all used button panels
à 2 in main view ( MNR , ANR )
à (W)ork(F)low

Shows  function  keys  (e.g.  "F3") in  button  panels  in  order for  the
selection to be performed using function keys (default = off ).

Presentation of function keys in radio group boxes of a workflow
(default = off).

functionkey_pze_visible=on

Display of function keys in PZE module ( default = off ).

Definition of sections
[ LIST3-ALL-Page1 ]

as of CTAIP V# 2.0.2.33
..=~<VISLIST-ID>~,L,,<BITMAP>

The  characters  "~“  (or  previously  "§“,
should no longer be used) have been
designed  to  identify  third  list  buttons.
Correct
processing/updating
(disabled/enabled) is only given in the
third grid list of the main screen.

1=~M~,L,,PALETTE20x20.BMP

2=~P~,L,,PERSON20x20.BMP

3=~R~,L,,RESS20x20.BMP

General  section  for  the  configuration  of  functions  of  the
configurable third list of the main screen.
INFO:
The different types of the "3rd list" are configured in the machine
label. The layout of a "3rd list" is defined in the "hytnrcfg.ini".
è  All  used  lists  have  to  be  configured  with  their  identifier  „“  as
follows.
è When changing machines, the "3rd list" may be hidden/shown
and  buttons  for  the  "3rd  lists"  that  are  not  configured  may  be
disabled, if necessary.

Entry for "material list"
è "[ VISLIST3(M) ]“ from "hytnrcfg.ini“

Entry for "list of persons“
è "[ VISLIST3(P) ]“ from "hytnrcfg.ini“

Entry for "MNR_AMAT.LST“
è "[ VISLIST3(R) ]“ from "hytnrcfg.ini“ with the configured Bitmap
„“

4=~A~,L,,NUM.BMP

5=~G~,L,,PERSON20x20.BMP

Entry for "material list"
è "[ VISLIST3(A) ]“ from "hytnrcfg.ini“

Entry for "list of persons GWP“
è "[ VISLIST3(G) ]“ from "hytnrcfg.ini“

EAT-AIP_81.docx

Page 52 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

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
è 00. will be deleted and data “ABC123” will be passed to standard
processing
Action barcode
è Dialog cancelled or ended with OK button or Esc button.

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
(combined) Order/sequence/OP number à acronym <ANR>
Order (header) à acronym <AUNR>
Sequence à acronym <AFOLG>
OP à acronym <AGNR>
Suborder number -> Acronym <UAGNR>
Split no. à acronym <SPLNR>
Upload/confirmation number à Acronym <RMNR>

Machine à Acronym <MNR>
è Passed to dialog with MNR=EXTRUDER-7 or MNR=200
Machine status à Acronym <MST>
è Passed to dialog with MST=1 or MST=1001
Scrap reason à Acronym <EGG:AUS>
è Passed to dialog with EGG:AUS =1 or EGG:AUS=1001
Deviation reason à Acronym < EGG:GUT >
è Passed to dialog with EGG:GUT =1 or EGG:GUT=1001
Operator position à Acronym <BPOS>
è Passed to dialog with BPOS =1 or BPOS = MF
Wage and premium indicators à Acronym <LPKZ>

----HYDRA-WRM + HYDRA-DNC + HYDRA-PDV + HYDRA-MPL  ---
Destination à Acronym <ZLO>
è Passed to dialog with ZLO=100 or ZLO= MONTAGE
Transport unit à Acronym <TPE>
è Passed to dialog with TPE = KARTON or TPE = KISTE
Batch number à Acronym <CNR>àè
Throughput batch number à Acronym <DLL>àè
Alternative batch number à Acronym <CNR:ALT1>àè
Alternative batch number à Acronym <CNR:ALT2>
Alternative batch number à Acronym <CNR:ALT3>
Alternative batch number à Acronym <CNR:ALT4>
Alternative batch number à Acronym <CNR:ALT5>
Alternative batch number à Acronym <CNR:ALT6>

--------

--------------------

---- Mainly for the HYDRA-PZE module ---

EAT-AIP_81.docx

Page 53 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

Example

52.EDV
52.VERTRIEB
53.1
53.1001

Comment
--> processing
Badge number à Acronym <KNR>
Personnel number à Acronym <PNR>
Cost center à Acronym <KST>
è Passed to dialog with KST=EDV or KST=VERTRIEB
Absence reason à Acronym <FGR>
è Passed to dialog with FGR=1 or FGR=1001

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

EAT-AIP_81.docx

Page 54 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

Barcode

Raw data

AUNR = 12345678

*11.12345678*

*12.01*

*13.0100*

*14.0000*

AFOLG = 01

AGNR = 0100

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

EAT-AIP_81.docx

Page 55 of 77

24.02.16

Prefix

16.

17.

18.

19.

20.

21.

Advanced Configurations: MES Terminal AIP

Barcode

*16.123456*

*17.1122*

Raw data

MNR = 123456

MST = 1122

*18.1234*

EGG:AUS = 1234

*19.123456789*

EGG:GUT = 132456789

*20.13*

*21.1221*

BPOS = 13

LPKZ = 1221

EAT-AIP_81.docx

Page 56 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

Prefix

50.

Barcode

*50.1337*

Raw data

KNR = 1337

8.1  Configuration of customized barcode prefixes

The  barcode  prefixes  90...99  can  be  assigned  here according
to the customer's requirements. This means, if a barcode  with
the  relevant  prefix  is  used,  it  will  be  transferred  to  the  dialog
along with the assigned ID. Then the barcode has the following
structure:
<Prefix>.<Net barcode>
e.g.: "90.12345“ à SAPCNR=12345

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

EAT-AIP_81.docx

Page 57 of 77

24.02.16

Advanced Configurations: MES Terminal AIP

EAT-AIP_81.docx

Version: 1.4.5987

Page 58 of 77

Advanced Configurations: MES Terminal AIP

9  Extended Application Configuration

9.1

Overview of INI configuration files

INI file

ctaip.ini

ctaip.mld

ctaipbut.ini

ctaiplay.ini

Configurations

host  name,  terminal  number,  virtual  keyboard

(on/off), inputs/outputs

Translation (different languages)

Configuration  of  buttons:  order,  positioning,  icons,

if necessary license

Configuration of grid layout; basic screen: height of

tables  and  buttons;  layout  of  BDE  comments;  OP

info, machine info

dialog.ini

Configuration  of  the  font  type/size  in  dialogs  and

tab sizes in workflow dialogs

keyboard.ini

Configuration  of  virtual  keyboard:  positioning,

customized keys

9.2  General

9.2.1 Identification of lists / elements at the terminal

The following keyboard shortcut can be used to show information about available lists or elements at the

terminal:

CTRL + ALT + F6

or in

AIP DEBUG menu: Further debug functions à Activate hints (scroll down)

A tooltip is shown when moving the mouse over a table or element.

The value "table" identifies the list:

EAT-AIP_81.docx

Version: 1.4.5987

Page 59 of 77

Advanced Configurations: MES Terminal AIP

9.3  Modifications to ctaipbut.ini

9.3.1 General

The server directory \hydra\ctnet\win\aip includes complete INI files pertaining to the HYDRA standard.

Any

deviations

are

developed

in

specific,

customized

directories.

e.g. for customized terminal groups \hydra\<instance>\custom\aip\tgrp_xxx

(xxx = number of terminal group)

The  relevant,  empty  file  (ctaipbut.ini)  is  filed  in  these  directories.  All  sections  e.g.  [ANR-ALL-Page1],

which have been customized, are copied to this file. Then this file can be configured.

After restarting the terminal, files from the main directory \hydra\ctnet\win\aip are merged with files from

the customized directory (e.g. \hydra\<instance>\custom\aip\tgrp_xxx). Then the merged file is transferred

to the local terminal directory C:\aip.

The  directory  \hydra\ctnet\win\aip  must  not  be  changed,  otherwise  AIP  might  no  longer  work

properly. In addition, default files are stored there and any changes that might have been made

will be lost after updating (e.g. service pack)!

9.3.2 Modifications to the toolbar

A ctaipbut.ini file including the modified section is created in the customized terminal directory (e.g. if the

toolbar is to be changed for terminal groups \hydra\<instance>\custom\aip\tgrp_xxx\).

Example:

EAT-AIP_81.docx

Version: 1.4.5987

Page 60 of 77

Advanced Configurations: MES Terminal AIP

On the AIP basic screen the order of buttons should be changed in the "machines" section (position

"change status" button in front of "lock production status").

Original configuration

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

9.3.3 Modifications to button labeling

A ctaipbut.ini file including the modified section is created in the customized terminal directory (e.g. if

button labeling is to be changed for terminal groups \hydra\<instance>\custom\aip\tgrp_xxx\).

If a customized ctaipbut.ini file already exists, e.g. due to changes to the order of buttons, the required

sections can also be inserted.

Example:

Labeling of buttons in the "operation" section should be changed as follows:

·

·

·

"Partial confirmation" --> "Part. conf."

"Interrupt operation" --> "Interrupt OP"

"Log off operation" --> "Log off OP"

Original configuration

[ANR-ALL-Page1]

1=A_INFO,L,,InfoBlue.png

2=A_TR,R,Teilrückmeldung,SyBluAdd.png

3=A_UN*,R,Arbeitsgang unterbrechen,SyBluPau.png

4=A_AB*,R,Arbeitsgang abmelden,SyBluStp.png

EAT-AIP_81.docx

Version: 1.4.5987

Page 61 of 77

Advanced Configurations: MES Terminal AIP

New configuration

[ANR-ALL-Page1]

1=A_INFO,L,,InfoBlue.png

2=A_UN*,R,AG unterbrechen,SyBluPau.png

3=A_TR,R,Teilrück.,SyBluAdd.png

4=A_AB*,R,AG abmelden,SyBluStp.png

9.3.4 Modifications to icons

General

Copy

the

file  pic.zip

from

the

folder

\hydra\ctnet\win\aip

to

the  customized  directory,  e.g.

\hydra\<instance>\custom\aip\tgrp_xxx\

Then rename the file pic.zip as pict_cust.zip in the customized directory.

Please note:

The file pic.zip includes all icons that can be used for the terminal.

The file name for the button icon is to be changed in the customized section of ctaipbut.ini.

Example:

Changing the icon for the button "log on operation" from "SyBluPly.png" to "Tools.png"

Original configuration

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

3=P_SPERRE,L,Produktionsstatus sperren,Security Risk.png

4=M_MST,L,Status ändern,Status Flag Yellow.png

5=A_AN*,R,Arbeitsgang anmelden,Tools.png

EAT-AIP_81.docx

Version: 1.4.5987

Page 62 of 77

Advanced Configurations: MES Terminal AIP

9.4  Modifications to ctaiplay.ini

9.4.1 General

The server directory \hydra\ctnet\win\aip includes complete INI files pertaining to the HYDRA standard.

Any

deviations

are

developed

in

specific,

customized

directories.

e.g. for customized terminal groups \hydra\<instance>\custom\aip\tgrp_xxx

(xxx = number of terminal group)

The relevant, empty file (ctaiplay.ini) is filed in these directories. All sections e.g. [ANR-ALL-Page1], which

have been customized, are copied to this file. Then this file can be configured.

After restarting the terminal, files from the main directory \hydra\ctnet\win\aip are merged with files from

the customized directory (e.g. \hydra\<instance>\custom\aip\tgrp_xxx). Then the merged file is transferred

to the local terminal directory C:\aip.

The  directory  \hydra\ctnet\win\aip  must  not  be  changed,  otherwise  AIP  might  no  longer  work

properly. In addition, default files are stored there and any changes that might have been made

will be lost after updating (e.g. service pack)!

9.4.2 Inserting user fields in table

A ctaiplay.ini file including the modified section is created in the customized terminal directory (e.g. if

button labeling is to be changed for terminal groups \hydra\<instance>\custom\aip\tgrp_xxx\).

ctaiplay.ini is configured in two steps:

·  The field that should be activated has to be defined in the relevant section, e.g. [ User fields ANR

]

·  The field that should be displayed in the grid has to be configured in the relevant section (e.g. to

display an additional field in the order list),

e.g. [order list]

Example:

User field 65 should be named "article name 2" and added to the order list.

Step 1 è define the field in section [User fields ANR]

EAT-AIP_81.docx

Version: 1.4.5987

Page 63 of 77

Advanced Configurations: MES Terminal AIP

[ User fields ANR ]

GRID_LIST_TYP=ANR

; additional fields in order list

ANR_FU_65= ; Benutzerfeld 65 Arbeitsgang, Artikelbezeichnung 2

Step 2 è insert the field for the grid [order list]

[Order list]

GRID_FONT=Arial

; font type

GRID_FONTSIZE=9

; font size 9;

GRID_COLOR=clBlack

; font color

GRID_BACKGROUND=clWhite

; background color

GRID_LIST_TYP=ANR

EXAMINE_BITMAP1=B1,OPT_INFOAN,T=Attach Notes.png

EXAMINE_BITMAP2=B2,OPT_INFOAI,T=Text Document.png

ATK=C25,100,L,Artikel

ANR_FU_65=C30,150,L,Artikelbezeichnung 2

Explanation: SYNTAX of order list

ANR_FU_65 = user field 65

C30 = alphanumeric field with 30 characters

150 = number of pixels for the column

L = left-aligned

Artikelbezeichnung 2 = column caption

9.4.3 Change order of columns in AIP

A ctaiplay.ini file including the modified section is created in the customized terminal directory (e.g. if

button labeling is to be changed for terminal groups \hydra\<instance>\custom\aip\tgrp_xxx\).

If a customized ctaiplay.ini file already exists, e.g. due to changes to the order of buttons, the required

sections can be inserted there.

Example:

The "order" column should be displayed in front of the "article" column.

Original configuration

[Order list]

…

ATK=C25,100,L,Artikel

AUNR=C10,85,L,Auftrag

ANR_FU_65=C30,150,L,Artikelbezeichnung 2
AGNR=C4,39,R," "

EAT-AIP_81.docx

Version: 1.4.5987

Page 64 of 77

Advanced Configurations: MES Terminal AIP

list]

New configuration

[Order

…

AUNR=C10,85,L,Auftrag

ATK=C25,100,L,Artikel

ANR_FU_65=C30,150,L,Artikelbezeichnung2

AGNR=C4,39,R," „

9.4.4 Changing the height of AIP lists

Changing the height of lists (operation and machine list) in the basic screen [MainView1] of AIP.

The configured heights are scaled to the given height. Consequently, the total sum of entered

heights does not play a role.

EAT-AIP_81.docx

Version: 1.4.5987

Page 65 of 77

Advanced Configurations: MES Terminal AIP

The heights of components of the basic screen (machines, order grid, 3rd list, toolbar) can be configured

in section [MainView1] of the customized ctaiplay.ini file.

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

9.5  Modifications to ctaip.ini

9.5.1 General

The file ctaip.ini is not merged with a file stored in the server. The file must be edited locally in terminal.

9.5.2 Displaying the actual machine cycle in AIP

1.

If necessary, create the relevant section [MSS-INIT]

2.  Create INI option to call up the function calculating the actual cycle "CalculateCycle=ON"

Example of the section in the terminal file ctaip.ini:

[MSS-INIT]

CalculateCycle=ON

9.5.3 Start Third-Party Application from AIP

Starting a third-party application is configured as follows:

·  Configure a relevant button in the ctaipbut.ini file

·  Configure the function

AIP allows for the integration of buttons starting third-party applications in all toolbars. These buttons

EAT-AIP_81.docx

Version: 1.4.5987

Page 66 of 77

Advanced Configurations: MES Terminal AIP

- start third-party applications provided they are not running

- call third-party applications to the foreground when they are currently running

Configuration of buttons

The first button that may be used to call up third-party software is configured as "USER1" in ctaipbut.ini.

Further buttons starting third-party software can be configured as "USER2" until "USER9" in the

ctaipbut.ini file.

Example:

Configuration of a new button. The button is to be displayed for a specific terminal group in the

"machines" section of the AIP basic screen. This can be configured in the ctaipbut.ini file applicable for

the specific terminal group in the server.

\hydra\<instance>\custom\aip\tgrp_xxx\ctaipbut.ini)

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

"SearchParts=“ è If this entry is set, it is sufficient to enter the program name only partly in

WindowName.

9.5.4 Remember staff badge number

When logging on an order, the person suggested by the terminal is only changed if the respective person

logs on along with the order. (A_P_AN instead of A_AN)

EAT-AIP_81.docx

Version: 1.4.5987

Page 67 of 77

Advanced Configurations: MES Terminal AIP

The stored person is removed from memory as soon as he/she has explicitly logged off from the machine

(the same is true for "log off everyone").

This  default  assignment  can  be  avoided  by  configuring  "Default=0"  and  setting  the  field  attribute

SETVALUE in the dialog configuration.

This  default  assignment  occurs  with  all  order  postings,  when  statuses  change  and  batches  are  posted

C_UMB, C_GEN, CA_WL

The stored staff is deleted for all machines when shifts change and/or at the beginning of a shift (Please

note: If shifts change for one machine connected to the terminal, staff of all other machines pertaining to

this terminal will be deleted as well)!

This can be configured via the entry "HoldPersonInfo=on" in section [SYSTEM] of the ctaip.ini file.

Example:

[System]
…..
HoldPersonInfo=on

9.6  Virtual keyboard

9.6.1 Change / hide virtual keyboard

The  QWERTZ  layout  can  be  configured  for  the  virtual  keyboard  by  entering  "KEYMODE=QWERTZ"  in

section [User] of the keyboard.ini file.

Example:

[User]

ViewKeysAlways=on

;AlignSize=on

; Show shift key

;ButtonShift=ON

; Disable automatic switching to numeric keyboard

;ContextSensitive=OFF

; Duration of hiding keyboard in sec

;HideTime=10

KEYMODE=QWERTZ

The virtual keyboard can also be hidden/disabled if it is not required as the terminal is connected to a

keyboard. This can be configured in section [SYSTEM] of the local ctaip.ini file.

Example:

[SYSTEM]

Parameters=-t

EAT-AIP_81.docx

Version: 1.4.5987

Page 68 of 77

Advanced Configurations: MES Terminal AIP

Syntax:

+t/-t --> enables/disables the virtual keyboard; irrespective of the terminal type)

9.7  Dynamic dialogs

9.7.1 Overview

9.7.2 AIP dialog types

AIP provides the following dialog types:

·  AIPDEF

– Default dialogs

(customizing)

·  AIPTGRP

– Dialogs for specific terminal groups

(configuration)

·  AIPTNR

– Dialogs for specific terminals

(customizing)

Only dialogs specific to terminal groups may be created / changed.

Existing terminal-specific dialogs may be changed.

But default dialogs cannot be changed.

The terminal has to be rebooted after having made changes to a dialog.

EAT-AIP_81.docx

Version: 1.4.5987

Page 69 of 77

Advanced Configurations: MES Terminal AIP

9.7.3 Dialogs for specific terminal groups

It is possible to perform configurations for specific terminal groups.

Before  starting  the  configuration,  a  backup  copy  of  the  concerned  dialogs  should  be  made in  a  backup

group (e.g. AIPTGRP 999). (In case old backups exist, delete them beforehand).

The newly added dialogs must be activated and the terminal must be rebooted.

Example:

Special posting dialogs should be used for a terminal group xxx. The workflows and dynamic dialogs are

assigned to this terminal group.

Procedure

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

EAT-AIP_81.docx

Version: 1.4.5987

Page 70 of 77

Dialog input: Type =AIPGRP ; User=xxx

Advanced Configurations: MES Terminal AIP

Please note:

All dialogs of a terminal group may be deleted at once by selecting all rows of the terminal group

(AIPTGRP).

9.7.4 Hide fields (for specific terminal groups)

Identify the dialogs used in AIP

Using the shortcut Ctrl + ALT + F6 a tooltip indicating the dialog name is shown.

General procedure:

·

Identify the dialog in which a field should be hidden

·  Change and activate dynamic dialogs of terminal group xxx.

Edit dynamic dialog (MOC)

Menu: System administration --> Terminals --> Dynamic dialogs

Select the dialog for a specific terminal group and start the edit mode via the menu tab "dynamic

dialogs - fields" and the button "edit fields"

Choose the required field and check the option "blocked"

EAT-AIP_81.docx

Version: 1.4.5987

Page 71 of 77

Advanced Configurations: MES Terminal AIP

Activate dialog (MOC)

Activate dialog for the specific terminal group

EAT-AIP_81.docx

Version: 1.4.5987

Page 72 of 77

Advanced Configurations: MES Terminal AIP

9.7.5 Default assignment in dialog fields (for specific terminal

groups)

General procedure:

·

Identify the dialog in which a field should be assigned with default values

·  Change and activate dynamic dialogs of terminal group xxx.

Edit dynamic dialog (MOC)

Menu: System administration --> Terminals --> Dynamic dialogs

Select the dialog for a specific terminal group and start the edit mode via the menu tab "dynamic

dialogs - fields" and the button "edit fields"

Set field "field attribute 2" to "SETVALUE"

Add field "default"

Allowed characters for dynamic dialog fields

The minus character "-" must always be placed at the end to prevent it from

being mistaken for the character used for the definition of "from" - "to" ranges.

Example:

a-z A-Z/-,.  is interpreted as range from a to z and A to Z but in this case also as

EAT-AIP_81.docx

Version: 1.4.5987

Page 73 of 77

Advanced Configurations: MES Terminal AIP

from "/" to ","

a-z A-Z/,.- is interpreted as range from a to z and A to Z and as the allowed

characters / , . and -

Activate dialog (MOC)

Activate dialogs for specific terminal groups

EAT-AIP_81.docx

Version: 1.4.5987

Page 74 of 77

Advanced Configurations: MES Terminal AIP

9.7.6 Change field name (for a specific terminal group)

General procedure:

·

Identify the dialog in which a field name should be changed

·  Change and activate dynamic dialogs of terminal group xxx.

Edit dynamic dialog (MOC)

Menu: System administration --> Terminals --> Dynamic dialogs

Select the dialog for a specific terminal group and start the edit mode via the menu tab "dynamic

dialogs - fields" and the button "edit fields"

Change field contents of the column "text"

EAT-AIP_81.docx

Version: 1.4.5987

Page 75 of 77

Advanced Configurations: MES Terminal AIP

Activate dialog (MOC)

Activate dialog for the specific terminal group

9.7.7 Activate simplified dialogs

There  are  simplified  dialogs  for:  logging  on  operations,  partial  confirmations/uploads  for  operations,

interrupting operations, logging off operations.

In order to use simplified dialogs, they may be defined for the default dialogs AIPDEF 0 in the workflow

via the "enable simple dialogs" button.

Procedure:

·  Menu: System administration --> Terminals --> Dynamic dialogs --> Button "Enable simple

dialogs"

·  Enable dialogs for AIPDEF 0

Only one dialog is entered in the workflow if simple dialogs are in use.

Once simplified dialogs have been activated, it cannot be undone by way of configuration. This

can only be changed by way of customizing the system, which has to be ordered from MPDV.

EAT-AIP_81.docx

Version: 1.4.5987

Page 76 of 77

Advanced Configurations: MES Terminal AIP

Simple dialogs can only be enabled for the HYDRA default dialogs AIPDEF 0.

9.8  Customizing files

9.8.1 Terminal script files

File names and directories of default/customized terminal scripts must be named as follows:

AIP

Description

MPDV

.\ctnet\win\ctaip\etc\aip_mpdv.zip

MPDV Standard (not used)

MPDV

.\ctnet\win\ctaip\etc\mpdv-aip.zip

MPDV Standard

CUST

.\custom\userexit\aip_<customer no.>.zip  Customization with customer number

CUST

.\custom\userexit\aip_<project>.zip

Customization with project abbreviation

“aip_” is added as prefix to terminal script files for the AIP:

PRIO  AIP

Description

MPDV

1

.\aip_system_mpdv.scr
.\aip_<dialog>_mpdv.scr

MPDV Standard (not used)

MPDV

2

.\aip_mpdv-system.scr
.\aip_mpdv-<dialog>.scr

MPDV Standard

CUST

1

.\aip_system_<customer no.>.zip
.\aip_<dialog>_<customer no.>.zip

Customization with customer number

CUST

2

.\aip_system_<project>.zip
.\aip_<dialog>_<project>.zip

Customization with project
abbreviation

ZIP  files  are  only  unpacked  in  live  operation,  once  they  have  been  successfully  downloaded  from  the

server. In the DEMO mode a ZIP file to be loaded is unpacked if it exists locally!

EAT-AIP_81.docx

Version: 1.4.5987

Page 77 of 77

