Manual

Entry/Information Functions
for NC Programs/ Setting Data
AIP-DNC 8.1

Version 1.2.23049

Last changed on: 01.09.2020

Entry/Information Functions for NC Programs/ Setting Data

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

AIP-DNC_81.docx

Version: 1.2.23049

Page 2 of 20

Entry/Information Functions for NC Programs/ Setting Data

Contents

1  Overview Input/Info Functions for NC Programs/Settings ........................... 4

2  DNC Functions of AIP .................................................................................. 5

2.1  General information / basic view of DNC ............................................................. 5

2.2  Update ................................................................................................................ 8

2.3  Show DNC resource ............................................................................................ 8

2.4  DNC documents .................................................................................................. 8

2.5  Upload................................................................................................................. 9

2.6  Download ............................................................................................................ 9

2.7

Lock DNC resource or change status ................................................................ 10

2.8  Release DNC resource ..................................................................................... 10

3  Local Configuration File ctaip.ini ................................................................ 12

3.1  Basic configuration ............................................................................................ 12

4  Central Configuration File hytnrcfg.ini ........................................................ 16

4.1

Layout configuration .......................................................................................... 19

AIP-DNC_81.docx

Version: 1.2.23049

Page 3 of 20

Entry/Information Functions for NC Programs/ Setting Data

1  Overview Input/Info Functions for NC Programs/Settings

Purpose

The  DNC  module  makes  functions  available  that  are  used  to  manage  DNC  programs,  to  download

programs onto a machine or to upload revised programs onto a machine.

Implementation considerations

You use the function package if you:

  Want to upload a resource onto a machine or download a resource from the machine.

  Want to display a machine's DNC resource.

  Would like to see documents allocated to a DNC resource.

  Would like to block, release or change the status of a DNC resource.

Features

The  Acquisition  Information  Panel  (AIP)  offers  a  wide  array  of  functions  for  DNC  operation  and  for

handling setting parameters to BDE/ MDE terminals, industrial PCs or PCs:

  Shows the NC or the setting data records in a list with numerous options to make selection easier

  The ability to select a data record and to transfer it to the machine control system (download)

  Function with which to transfer a selected or a new data record from the machine control system

to HYDRA (upload)

  Status  functions  (e.g.  blocking,  releasing)  with  which  to  maintain  and  manage  NC  programs  at

the terminal

  Visualization of NC records and setting parameters at the terminal in conjunction with the function

to display tooling sheets (DNC-AEB)

AIP-DNC_81.docx

Version: 1.2.23049

Page 4 of 20

Entry/Information Functions for NC Programs/ Setting Data

2  DNC Functions of AIP

2.1  General information / basic view of DNC

The  HYDRA-DNC  module  provides  functions  to  manage  DNC  programs,  to  download  DNC  programs

onto a machine or to upload changed programs from a machine.

Provided that the module is active, it can be opened in the “workplace” section using the “DNC” button.

The  DNC  function  is  started  for  the  machine  selected  in  the  basic  dialog.  However,  the  DNC  dialog

cannot be opened if a machine is selected that is not assigned to a DNC family.

The opened dialog (DNC basic dialog) shows the below-mentioned data.

Operation

Operation number and designation of the operation that is logged on and selected in the basic dialog.

Order

Order number of the operation logged on and selected in the basic dialog.

Article

Article/item number of the operation logged on and selected in the basic dialog.

Workplace

Workplace/machine number and short description.

Selection

By default, selection is made “by DNC family”. The configured filter fields displayed..

But  it  is  also  possible  to  define  another  type  of  selection  that  is  specific  to  the  machine  within  the

hytnrcfg.ini file (the entries to be made are written in brackets).

Selection by order (KEYTYP=A)

The  “search  term”  fields,  etc.  are  hidden.  The  filter  field  is  activated  instead  within  the  table.  DNC

resources are already loaded and displayed while the dialog is being opened. The information line below

the grid is hidden.

Selection by program (KEYTYP=P)

The table is empty at first. The “search term” field refers to the “DNC element”. Filtering refers to the DNC

element.

AIP-DNC_81.docx

Version: 1.2.23049

Page 5 of 20

Entry/Information Functions for NC Programs/ Setting Data

DNC family

The  DNC  family  which  the  currently  selected  machine  is  assigned  to  is  displayed  here.  Please  note:  A

machine should only be assigned to one DNC family. Any of the assigned DNC families will be displayed

here if the machine is assigned to more than one DNC family.

“Released” status only

If  this  checkbox  is  checked  only  DNC  resources  are  displayed  that  are  currently  assigned  to  the

“released” status.

Memorize

If this checkbox is checked the entered search term is saved, when the dialog is closed. In case nothing

is entered in the input field, the value “empty” is saved.

Table

The  table  of  the  “manage  DNC  elements”  dialog  is  already  filled  while  the  dialog  is  being  opened,

provided that selection is based on programs or orders. In case the “by DNC family” option is selected,

the list will only be loaded already while opening the dialog if at least one filter field is filled out.

The “manage DNC elements” dialog shows all available DNC resources:

AIP-DNC_81.docx

Version: 1.2.23049

Page 6 of 20

Entry/Information Functions for NC Programs/ Setting Data

Filter fields

The four filter fields are shown here if the selection is based on the “by DNC family” option  . Depending

on how the DNC family is configured, the fields will be assigned to default values of order and machine.

Provided that the “memorize” checkbox is checked, the entered filter criteria will already be assigned the

next time the dialog is opened. If, however, a default value is configured for a field in the DNC family, this

assignment takes priority.

The filter fields may be entered unless the “read-only” option has been configured. All filter fields can be

entered if no OP is logged on. In this case, the input is not mandatory. A configuration in the hytnrcfg.ini

dialog can prevent the fields from being released.

[Tnr Konfiguration 0]

DNCFreeSearchReadOnly=On

If the DNC dialog is started from the order sequencing list, filter fields react as it is the case if operations

are logged on, as the selected order is transferred as reference.

DNC element

When an entry is selected in the list, the respective DNC element is taken over to the input field. As an

alternative, the DNC element may also directly be written into the input field.

The  functions  that  can  be  started  using  the  buttons  down  right  generally  refer  to  the  DNC  element

displayed in this input field.

Badge number

The  staff  badge  number  has  been  designed  for  checking  authorizations  for  the  functions  that  are

displayed down right in the toolbar and that are described in the following:









 - Update/refresh

 - Show DNC resource

 - Show assigned documents: DNC documents

 - DNC upload machine  AIP

AIP-DNC_81.docx

Version: 1.2.23049

Page 7 of 20

Entry/Information Functions for NC Programs/ Setting Data







 - DNC download AIP  Machine

 - Lock DNC resource/change status

 - Release locked DNC resource

2.2  Update

This  function  updates

  the  list.  The  value  entered  in  the  “search  term”  input  field  is  taken  into

account  in  this  context.  The  file  size  of  DNC  resources  available  at  the  AIP  is  entered  in  the

corresponding column. Furthermore, the status of the DNC resource is displayed.

When  loading  the  list  by  touching/clicking  the  corresponding  button,  it  is  checked  whether  or  not  filter

fields  configured  as  “read-only”  for  the  upload  are  available  (configuration  of  user  fields  of  the  DNC

family). These fields have to be filled out in order for the list to be loaded.

2.3  Show DNC resource

The file content of the DNC resource is displayed. This function is only available, provided that the DNC-

VIS license has been purchased.

2.4  DNC documents

The “DNC documents” function is only available if the “DNC-AEB” license is active (HYDRA-DNC 7.2).

The terminal loads the list of documents assigned to the resource and displays them.

By selecting an entry in the list and clicking/touching the “open document” button, the file is downloaded

to  the  terminal  and  displayed  in  an  internal  or  external  viewer  –  depending  on  the  respective  file

extension.

AIP-DNC_81.docx

Version: 1.2.23049

Page 8 of 20

Entry/Information Functions for NC Programs/ Setting Data

2.5  Upload

The  “upload”  function  reads  a  resource  from  the  machine  and  copies  it  into  the  configured  target

directory. For this purpose, the element has to be released for the upload.

An  upload  may  always  be  performed  if  a  DNC  family  is  filtered  and  a  <new  element>  is  selected

afterwards. At first a dialog appears where element and file name may be entered. Moreover, other filter

criteria  may  be  entered.  The  four  lower  fields  of  the  upload  dialog  may  be  used  for  this  purpose.

Configuration of these fields is read out from the DNC family of the resource selected in the DNC dialog.

The fields may be configured as user fields at the client.

A field is only visible if at least one of the options “filter”, "mandatory field at upload", “pre-assignment at

upload” or “read-only” is set.

The field is initialized with default values if the "pre-assignment at upload" option is configured.

The  field  is  grayed  out,  provided  that  the  "not  alterable/read-only"  button  is  set.  But  the  field  remains

unchanged if the “mandatory field at upload” option is set at the same time.

A new line is displayed in the list after the upload.

The  upload  is  documented  as  event  in  the  resource  history.  Two  events  are  entered  with  the  upload.

They are to be distinguished by the dialog IDs:

-  N: Beginning of the upload; the resource record is entered or changed.

-  F: The file pertaining to the record has arrived the target directory.

The two events normally occur in very short intervals. In case the “F” event is missing, the transmission of

the file has been interrupted unexpectedly. A download only transfers the file. The record is not changed.

Consequently, only one event is entered in the history for the download.

2.6  Download

The “download” function collects a resource from the configured  directory and copies it to the machine.

Before  starting  the  download,  users  have  to  identify  themselves  by  their  badge  number.  It  is  checked

whether or not they are authorized to download programs.

The download process is documented as event in the resource history.

AIP-DNC_81.docx

Version: 1.2.23049

Page 9 of 20

Entry/Information Functions for NC Programs/ Setting Data

2.7  Lock DNC resource or change status

The resource status may be changed in this dialog.

The status change may be documented as event in the resource history.

2.8  Release DNC resource

When  a  resource  is  released  its  status  switches  to  the  status  assigned  to  the  processing  flag  “F”.

Consequently, the status does not have to be selected or entered.

AIP-DNC_81.docx

Version: 1.2.23049

Page 10 of 20

Entry/Information Functions for NC Programs/ Setting Data

The status change is documented as event in the resource history.

Release of locked resources:

AIP-DNC_81.docx

Version: 1.2.23049

Page 11 of 20

Entry/Information Functions for NC Programs/ Setting Data

3  Local Configuration File ctaip.ini

The most important hardware and system settings are  defined for each terminal in the CTAIP.INI file of

the c:\ctaip directory.

Changes  to  the  configuration  file  ctaip.ini  are  only  enabled  after  rebooting  the  terminal

software.

3.1  Basic configuration

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

AIP-DNC_81.docx

Version: 1.2.23049

Page 12 of 20

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

Entry/Information Functions for NC Programs/ Setting Data

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

AIP-DNC_81.docx

Version: 1.2.23049

Page 13 of 20

Entry/Information Functions for NC Programs/ Setting Data

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

AIP-DNC_81.docx

Version: 1.2.23049

Page 14 of 20

Entry/Information Functions for NC Programs/ Setting Data

Entry

Comment

BarcodeNest=

BarcodeNumm=

This  field  specifies  which  acronym  is  entered  into  the  cavity
number field by the scanner.
This  field  specifies  which  acronym  is  entered  into  the  number
field by the scanner.

AIP-DNC_81.docx

Version: 1.2.23049

Page 15 of 20

Entry/Information Functions for NC Programs/ Setting Data

4  Central Configuration File hytnrcfg.ini

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

AIP-DNC_81.docx

Version: 1.2.23049

Page 16 of 20

AttachedApplication=First

Entry/Information Functions for NC Programs/ Setting Data

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

AIP-DNC_81.docx

Version: 1.2.23049

Page 17 of 20

Transparency=255

ShowPosition=TR

USE_SERVICE_ACCOUNT=1

Entry/Information Functions for NC Programs/ Setting Data

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

AIP-DNC_81.docx

Version: 1.2.23049

Page 18 of 20

Entry/Information Functions for NC Programs/ Setting Data

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

4.1  Layout configuration

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

AIP-DNC_81.docx

Version: 1.2.23049

Page 19 of 20

Entry

NetRuntimeMode=2

Entry/Information Functions for NC Programs/ Setting Data

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

AIP-DNC_81.docx

Version: 1.2.23049

Page 20 of 20

