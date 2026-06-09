Manual

Input/Visualization Functions
for energy-related data
AIP-EMG 8.1

Version 1.2.23049

Last changed on: 01.09.2020

Input/Visualization Functions for energy-related data

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

AIP-EMG_81.docx

Version: 1.2.23049

Page 2 of 25

Input/Visualization Functions for energy-related data

Contents

1  Overview Input/Visualization Functions for energy-related data .................. 4

2  Operation of AIP ........................................................................................... 5

2.1  Special control and display elements within AIP .................................................. 5

2.2  General description of the posting process with AIP ............................................ 7

3  PDV Functions - Process Visualization in AIP ........................................... 11

3.1  Display of measuring channels .......................................................................... 11

3.2  Change default value ........................................................................................ 14

4  Local Configuration File ctaip.ini ................................................................ 17

4.1  Basic configuration ............................................................................................ 17

5  Central Configuration File hytnrcfg.ini ........................................................ 21

5.1

Layout configuration .......................................................................................... 24

AIP-EMG_81.docx

Version: 1.2.23049

Page 3 of 25

Input/Visualization Functions for energy-related data

1  Overview Input/Visualization Functions for energy-related

data

Purpose

The  AIP  features  contained  in  this  function  package  make  it  possible  to  display  energy-related

performance data directly in production using shop floor terminals or data entry PCs.

Implementation considerations

You use the function package if you:

  Want to monitor the values entered via energy-related data collection online at the terminal.

  Would like to visualize the system values in pointer instruments or trend lines.

  Would like to display system layouts using online measured values.

Integration

AIP offers the ability to connect to the data server used for input via the visualization components and to

display the values entered there online.

Features

Displays the input energy-related performance values as a pointer or bar chart



Illustrates the trends using the latest input values

  Dialog controlled option to change target values manually

  Creates  individual  layouts  independently  or  as  a  part  of  the  HYDRA  customizing  process  using  the

process visualization editor (MDS-PVE).

  Displays separate system layouts using the integrated measured values display and graphic display

elements (additional license).

Additional licenses are needed in order to use the functions listed above.

AIP-EMG_81.docx

Version: 1.2.23049

Page 4 of 25

Input/Visualization Functions for energy-related data

2  Operation of AIP

2.1  Special control and display elements within AIP

Tables

Tables are displayed in a uniform way within AIP. This affects the basic display (workplaces, operations,

…) as well as the selection lists of posting dialogs.

 Provided that information is available for more than one page, the page numbers

are displayed below the table. The current page is highlighted in bold letters. By clicking/touching the user

can directly switch to another page.

An operation may be selected using the mouse, touch screen, keyboard (arrow keys:'' or ''), scanner

or by entering it manually.

The content of tables or lists depends on the respective context. Please find the following example: When

an operation  is logged  on,  those operations may  be selected that are included  in the sequencing  list or

that  are  planned  for  the  corresponding  workplace  or  group.  However,  when  operations  are  interrupted,

only running operations may be selected.

 Scrolling page by page (up or down) in the table.

  Scrolling  to  the  left  or  right.  Only  those  buttons  are  activated  that  are  reasonable  for  the

current situation. This figure shows that scrolling to the left has been deactivated.

AIP-EMG_81.docx

Version: 1.2.23049

Page 5 of 25

Input/Visualization Functions for energy-related data

“table filter” may optionally be displayed (customizing). This is an automatic filter that,  once  it has been

entered,  directly  affects  the  table  without  having  to  update  it.  This  process  is  realized  through  full-text

search for (defined) columns. The search is case-insensitive.

  A

Virtual keyboard

The virtual keyboard allows for data to be entered manually via touch screen or a connected mouse. To

make it easier for inexperienced users to find the required keys, the numeric key pad is organized like the

telephone  and  letters  are  aligned  in  alphabetical  order.  Consequently,  both  differ  from  the  computer

keyboard  which  usually  is  aligned  in  the  “QWERTZ keyboard  layout”.  The  virtual  keyboard  is  displayed

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

The  virtual  keyboard  only  supports  the  characters  "0"  -  "9",  "A"  -  "Z"  and  "+“,  "-“  ,  ".“  and  ",“.

Other  characters  or  languages  are  not  supported.  It  is  recommendable  to  use  an  additional

keyboard if texts in other languages have to be entered.

The start position of the virtual keyboard can be defined by a setting in the configuration file keyboard.ini.

Subject to the screen resolution, the parameters xpos= and ypos= need to be enabled in the configuration

file.

If  the  virtual  keyboard  is  not  to  be  shown  in  general,  the  parameter  –t  needs  to  be  included  in  the

parameter bar parameters= of the configuration file ctaip.ini.

Date display

AIP  supports  a  country-specific  date  format  in  dynamic  dialogs.  This  can  be  configured  in  the  "control

panel",  "regional  settings",  "short  date"  dialog  of  the  terminal/PC.  The  following  has  to  be  taken  into

account in this context:

AIP-EMG_81.docx

Version: 1.2.23049

Page 6 of 25

Input/Visualization Functions for energy-related data

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

If the date format does not correspond to  conventions a note appears when the  program is started and

the date format is set to MM/DD/YYYY.

The year is displayed only by two characters in the status bar.

2.2  General description of the posting process with AIP

In  general,  posting  dialogs  are  divided  into  several  visual  views  at  AIP.  These  views  (partial  dialogs)

cover  the  entire  screen  and  only  one  dialog  is  visible  at  a  time.  In  a  “workflow  concept”  the  user  is

navigated  through  the  posting  dialog  step  by  step.  This  process  is  described  by  way  of  the  following

example (interrupt operation). The other dialogs can be operated in the same way.

The  “interrupt  operation”  function  is  executed.  This  task  is  started  by  clicking  the  “interrupt  operation”

function from the second toolbar:

The “interrupt operation” dialog opens and the first view is displayed. The function that is  currently being

executed (in this case: interrupt operation) is shown in the header.

AIP-EMG_81.docx

Version: 1.2.23049

Page 7 of 25

Input/Visualization Functions for energy-related data

The first view “enter quantities” provides the user with the possibility to enter the produced yield or scrap

quantities. The virtual keyboard is shown or hidden automatically, subject to the active input field.

Quantities can be entered using the virtual keyboard or real keyboard. The user can go to the next field

using  the  tabulator  key  (which  can  also  be  found  on  the  virtual  keyboard).  Once  all  values  have  been

entered in the first view, the next view can be opened by clicking the “next” button.

The  “cancel”  button  is  displayed  in  all  partial  dialogs  and  allows  for  the  entire  posting  dialog  to  be

cancelled/closed at any time.

The  next  view  can  be  opened  either  by  clicking  the  “next”  button  or  by  clicking  another  tab  (in  our

example: “select status” or “confirm”). Please note in this context, that no view can be skipped when the

views are navigated bottom up (view 1  view 2  view 3). This means: if you are in the first view (enter

quantities) and you click the third view (confirm), the second view (select status) will be displayed first.

Vice versa, when navigating top down (e.g. from the “confirm” view to the “enter quantities” view), every

view  may  directly  be  opened  by  clicking  at  it.  In  this  case,  views  are  actually  skipped.  But  the  “back”

button also allows for the views to be opened one after the other (top down).

As long as the dialog has not been confirmed, entered data may be changed at any time by scrolling back

and forth.

AIP-EMG_81.docx

Version: 1.2.23049

Page 8 of 25

Input/Visualization Functions for energy-related data

The  workplace  status  that  is  to  be  set,  once  the  operation  has  been  interrupted,  is  determined  in  the

second  view  “select  status”.  This  status  may  be  chosen  from  the  displayed  status  list.  This  list  can  be

restricted  using  the  “filter”  field.  Once  the  required  values  have  been  entered,  the  next  view  can  be

opened by clicking “next” (in our example it is the last view).

AIP-EMG_81.docx

Version: 1.2.23049

Page 9 of 25

Input/Visualization Functions for energy-related data

The partial dialog “confirm” shows a summary of all values entered so far in the dialog. Provided that the

user  agrees  with  the  entered  data,  the  “interrupt  operation”  dialog  can  be  confirmed,  once  the  badge

number has been entered. Then the dialog including the data is sent to the server and posted.

If  an  input  field  of  the  dialog  is  not  filled  out  properly  (e.g.  a  mandatory  field  is  empty)  the  field  is

highlighted  in  red  in  the  corresponding  view  and  focused  to  enable  the  user  to  directly  correct  the  field

content.

If a workflow dialog is opened it may directly be exited by clicking the ESC button. This is also

the case, if the virtual keyboard is opened. Thus, the ESC button cannot be used to close the

virtual keyboard.

AIP-EMG_81.docx

Version: 1.2.23049

Page 10 of 25

Input/Visualization Functions for energy-related data

3  PDV Functions - Process Visualization in AIP

Purpose

As a part of the basic HYDRA-PDV functionality, the AIP terminal program transfers inspection plans to

the respective interface via MWP2 or a driver DLL. Vice versa, the AIP terminal then transfers incoming

measured values to the HYDRA server.

The  process  visualization  function  allows  to  monitor  the  status  of  measurement  channels  at  the  AIP

terminal.

3.1  Display of measuring channels

By  pressing  the  "PDV"  button  in  the  “workplaces”  section  of  the  AIP  terminal  it may  be  switched  to  the

respective display. The measuring channels of the machine selected in the basic screen are shown. The

workplace may also be changed in the HYDRA-PDV view. An empty HYDRA-PDV dialog will be opened

if no measuring channels are configured for the selected machine.

The value range of all displays corresponds to the tolerance range of the respective measuring channel

configured within the inspection plan.

Different modes are available to display measuring channels. The mode may be chosen from the lower

button bar.

Pointer display

Measuring channels are displayed as pointers. All of the up to 16 configurable measuring channels

of a machine are also displayed at the same time.

AIP-EMG_81.docx

Version: 1.2.23049

Page 11 of 25

Input/Visualization Functions for energy-related data

Digital representation

Measuring channels are represented as digital values. All of the up to 16 configurable measuring

channels of a machine are also displayed at the same time.

AIP-EMG_81.docx

Version: 1.2.23049

Page 12 of 25

Input/Visualization Functions for energy-related data

Trend display

The progress including a corresponding legend is shown for each process parameter in a graphic.

The other process parameters can be reached by the arrow keys at the right margin of the screen.

Bar display

Measuring channels are displayed as bars. All of the up to 16 configurable measuring channels of a

machine are displayed at the same time:

AIP-EMG_81.docx

Version: 1.2.23049

Page 13 of 25

Input/Visualization Functions for energy-related data

3.2  Change default value

Default  values represent, among other things, a  decisive factor  when process data are displayed. They

may be changed by clicking the “change default value” button.

Posting procedure

The required workplace has to be selected, before changing default values.

Starting of the “change default value” function

The “change default value“ button is to be clicked. As soon as the function has been started, the user

is navigated through the dialog. The workplace has already been defined.

AIP-EMG_81.docx

Version: 1.2.23049

Page 14 of 25

Input/Visualization Functions for energy-related data

Select process parameter

The required process parameter, the default values of which have to be changed is to be chosen from the

available list.

Change default values

The individual values that are to be changed are entered in the dialog that opens. This dialog shows the

previous values as well as the new default values. The following values are concerned:

  Upper tolerance limit

AIP-EMG_81.docx

Version: 1.2.23049

Page 15 of 25

Input/Visualization Functions for energy-related data

  Upper process action limit

  Target value

  Lower process action limit

  Lower tolerance limit

Badge number

The badge number of the person changing the data is to be entered here.

Confirmation of “change default values”

The default values are updated in the system by confirming the dialog. They in turn affect HYDRA-

PDV display at the AIP terminal.

AIP-EMG_81.docx

Version: 1.2.23049

Page 16 of 25

Input/Visualization Functions for energy-related data

4  Local Configuration File ctaip.ini

The most important hardware and system settings are defined for each terminal in the CTAIP.INI  file of

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

AIP-EMG_81.docx

Version: 1.2.23049

Page 17 of 25

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

Input/Visualization Functions for energy-related data

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

AIP-EMG_81.docx

Version: 1.2.23049

Page 18 of 25

Input/Visualization Functions for energy-related data

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

AIP-EMG_81.docx

Version: 1.2.23049

Page 19 of 25

Input/Visualization Functions for energy-related data

Entry

Comment

BarcodeNest=

BarcodeNumm=

This  field  specifies  which  acronym  is  entered  into  the  cavity
number field by the scanner.
This  field  specifies  which  acronym  is  entered  into  the  number
field by the scanner.

AIP-EMG_81.docx

Version: 1.2.23049

Page 20 of 25

Input/Visualization Functions for energy-related data

5  Central Configuration File hytnrcfg.ini

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

AIP-EMG_81.docx

Version: 1.2.23049

Page 21 of 25

AttachedApplication=First

Input/Visualization Functions for energy-related data

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

AIP-EMG_81.docx

Version: 1.2.23049

Page 22 of 25

Transparency=255

ShowPosition=TR

USE_SERVICE_ACCOUNT=1

Input/Visualization Functions for energy-related data

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

AIP-EMG_81.docx

Version: 1.2.23049

Page 23 of 25

Input/Visualization Functions for energy-related data

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

AIP-EMG_81.docx

Version: 1.2.23049

Page 24 of 25

Entry

NetRuntimeMode=2

Input/Visualization Functions for energy-related data

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

AIP-EMG_81.docx

Version: 1.2.23049

Page 25 of 25

