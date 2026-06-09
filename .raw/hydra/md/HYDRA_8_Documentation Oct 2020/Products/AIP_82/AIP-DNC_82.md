Manual

Entry/Information Functions
for NC Programs / Setting
Data
AIP-DNC 8.2

Version 1.0.23049

Last changed on: 01.09.2020

Entry/Information Functions for NC Programs / Setting Data

Copyright

©Copyright 2020 All rights reserved.

SAP® and R/3® are registered trademarks of SAP AG.

WINDOWS® is a registered trademark of Microsoft Corporation.

MPDV® and HYDRA® are registered trademarks of MPDV Mikrolab GmbH.

ORACLE® is a registered trademark of ORACLE Corporation, California, USA.

Copying and distribution of this documentation or any part thereof, for any purpose or in any form, is prohibited without prior written
permission from MPDV Mikrolab GmbH.

The information contained in this documentation is subject to change without prior notice.

AIP-DNC_82.docx

Version: 1.0.23049

Page 2 of 23

Entry/Information Functions for NC Programs / Setting Data

Contents

1  Overview of Entry/Information Functions for NC Programs /Setting

Data .............................................................................................................. 4

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

3  AIP2 -Local Configuration .......................................................................... 12

3.1

Local Configuration ctaip.ini .............................................................................. 12

3.2  PNG – Files / Bitmaps ....................................................................................... 16

3.2.1  File pict.zip ............................................................................................ 16

3.2.2  File pict_cust.zip .................................................................................... 16

3.3  Multilingualism (*.mld files) ................................................................................ 17

4  AIP2 - Central Configuration File hytnrcfg.ini ............................................. 18

4.1

Layout configuration .......................................................................................... 21

AIP-DNC_82.docx

Version: 1.0.23049

Page 3 of 23

Entry/Information Functions for NC Programs / Setting Data

1  Overview of Entry/Information Functions for NC Programs

/Setting Data

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

AIP-DNC_82.docx

Version: 1.0.23049

Page 4 of 23

Entry/Information Functions for NC Programs / Setting Data

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

AIP-DNC_82.docx

Version: 1.0.23049

Page 5 of 23

Entry/Information Functions for NC Programs / Setting Data

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

AIP-DNC_82.docx

Version: 1.0.23049

Page 6 of 23

Entry/Information Functions for NC Programs / Setting Data

Filter fields

The four filter fields are shown here if the selection is based on the “by DNC family” option . Depending

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

AIP-DNC_82.docx

Version: 1.0.23049

Page 7 of 23

Entry/Information Functions for NC Programs / Setting Data

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

AIP-DNC_82.docx

Version: 1.0.23049

Page 8 of 23

Entry/Information Functions for NC Programs / Setting Data

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

AIP-DNC_82.docx

Version: 1.0.23049

Page 9 of 23

Entry/Information Functions for NC Programs / Setting Data

2.7  Lock DNC resource or change status

The resource status may be changed in this dialog.

The status change may be documented as event in the resource history.

2.8  Release DNC resource

When  a  resource  is  released  its  status  switches  to  the  status  assigned  to  the  processing  flag  “F”.

Consequently, the status does not have to be selected or entered.

AIP-DNC_82.docx

Version: 1.0.23049

Page 10 of 23

Entry/Information Functions for NC Programs / Setting Data

The status change is documented as event in the resource history.

Release of locked resources:

AIP-DNC_82.docx

Version: 1.0.23049

Page 11 of 23

Entry/Information Functions for NC Programs / Setting Data

3  AIP2 -Local Configuration

3.1  Local Configuration ctaip.ini

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

AIP-DNC_82.docx

Version: 1.0.23049

Page 12 of 23

Entry

VirtScreenRatio=16:9

Section [SKIN]

Saturation=0

Hue=0

Name=mpdv

Active=false

Entry/Information Functions for NC Programs / Setting Data

Comment

The  display  ratio  remains  if  the  configuration  VirtScreenSize  is
used to reduce the window.
The  width-to-height  (aspect)  ratio  can  be  changed  using
VirtScreenRatio. Consequently, the width-to-height ratio 16:9 can
be tested with a 4:3 monitor and vice versa.
The value can be configured as  "16:9"  or as floating  point  value
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

AIP-DNC_82.docx

Version: 1.0.23049

Page 13 of 23

Entry/Information Functions for NC Programs / Setting Data

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

AIP-DNC_82.docx

Version: 1.0.23049

Page 14 of 23

Entry/Information Functions for NC Programs / Setting Data

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

AIP-DNC_82.docx

Version: 1.0.23049

Page 15 of 23

Entry/Information Functions for NC Programs / Setting Data

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

3.2  PNG – Files / Bitmaps

The use of PNC files is recommended by MPDV. By default PNG files have a size of 24 x 24 px.

3.2.1

File pict.zip

The file "pict.zip“ is updated by the installation tool "inst32.exe“ while downloading and includes all default

PNG files.

The  default  PNG  files  can  be  overwritten  in  the  file  pict_cust.zip.  Several  PNG  files  have  the  extension

".small.png" (e.g. aip.small.png). These PNG files are used with a screen resolution of 640x480.

3.2.2

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

AIP-DNC_82.docx

Version: 1.0.23049

Page 16 of 23

Entry/Information Functions for NC Programs / Setting Data

Customize footer

The  MPDV  icon  displayed  in  the  footer  can  be  replaced  by  storing  a  separate  company.png  file  in  the

pict_cust.zip file.

Customize PZE dialog

The MPDV icon displayed in the PZE dialog can be replaced by storing a separate pze_mpdv.png file in

the  pict_cust.zip  file.  In  case  the  PZE  terminal  is  operated  with  a  screen  resolution  of  640x480,  a

customized pze_mpdv.small.png file has to be integrated in the pict_cust.zip file.

3.3  Multilingualism (*.mld files)

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

AIP-DNC_82.docx

Version: 1.0.23049

Page 17 of 23

Entry/Information Functions for NC Programs / Setting Data

4  AIP2 - Central Configuration File hytnrcfg.ini

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

AIP-DNC_82.docx

Version: 1.0.23049

Page 18 of 23

Entry/Information Functions for NC Programs / Setting Data

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

AIP-DNC_82.docx

Version: 1.0.23049

Page 19 of 23

Entry/Information Functions for NC Programs / Setting Data

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

AIP-DNC_82.docx

Version: 1.0.23049

Page 20 of 23

Entry/Information Functions for NC Programs / Setting Data

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

This setting specifies that in case of an error that occurred
reading  the  clock  (e.g.  when  activated  after  standby

AIP-DNC_82.docx

Version: 1.0.23049

Page 21 of 23

Entry/Information Functions for NC Programs / Setting Data

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

AIP-DNC_82.docx

Version: 1.0.23049

Page 22 of 23

Entry/Information Functions for NC Programs / Setting Data

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

AIP-DNC_82.docx

Version: 1.0.23049

Page 23 of 23

